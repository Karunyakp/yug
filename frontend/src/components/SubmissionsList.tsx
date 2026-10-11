import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon } from 'lucide-react';
import { recordAuditEvent } from '../services/localAuditLog';

const submissionsData = [
  { id: 1, student: 'Aarav Sharma', initials: 'AS', color: 'bg-[#E4F1E9] text-[#174C3C]', assignment: 'CS-204 Sorting Visualizer', file: 'bubble_sort.py', date: '24 Oct 2026, 10:42 AM', similarity: 92, status: 'Context review' },
  { id: 2, student: 'Rohan Mehta', initials: 'RM', color: 'bg-[#E4F1E9] text-[#174C3C]', assignment: 'CS-204 Sorting Visualizer', file: 'sort.py', date: '24 Oct 2026, 09:12 AM', similarity: 92, status: 'Context review' },
  { id: 3, student: 'Ishita Patel', initials: 'IP', color: 'bg-[#EDE8FF] text-[#6549D8]', assignment: 'OOP-104 OOP Lab 4 - Polymorphism', file: 'shape.java', date: '23 Oct 2026, 4:20 PM', similarity: 12, status: 'No active review' },
  { id: 4, student: 'Kabir Singh', initials: 'KS', color: 'bg-[#EDE8FF] text-[#6549D8]', assignment: 'DBMS Project', file: 'schema.sql', date: '23 Oct 2026, 11:02 AM', similarity: 64, status: 'Context review' },
  { id: 5, student: 'Ananya Rao', initials: 'AR', color: 'bg-[#E4F1E9] text-[#174C3C]', assignment: 'CS-204 Sorting Visualizer', file: 'sort_practice.py', date: '22 Oct 2026, 6:30 PM', similarity: 8, status: 'No active review' },
  { id: 6, student: 'Vivaan Joshi', initials: 'VJ', color: 'bg-[#EDE8FF] text-[#6549D8]', assignment: 'CS-204 Sorting Visualizer', file: 'sort_visualizer.py', date: '22 Oct 2026, 2:15 PM', similarity: 88, status: 'Context review' },
  { id: 7, student: 'Karan Gupta', initials: 'KG', color: 'bg-[#EDE8FF] text-[#6549D8]', assignment: 'CS-301 Graph Algorithms', file: 'graph.py', date: '22 Oct 2026, 10:00 AM', similarity: 89, status: 'Context review' },
  { id: 8, student: 'Neha Reddy', initials: 'NR', color: 'bg-[#EDE8FF] text-[#6549D8]', assignment: 'CS-301 Graph Algorithms', file: 'shortest_path.py', date: '22 Oct 2026, 10:15 AM', similarity: 89, status: 'Context review' },
  { id: 9, student: 'Priya Nair', initials: 'PN', color: 'bg-[#EDE8FF] text-[#6549D8]', assignment: 'CS-205 Data Structures', file: 'linked_list.java', date: '21 Oct 2026, 1:20 PM', similarity: 76, status: 'Context review' },
  { id: 10, student: 'Sneha Iyer', initials: 'SI', color: 'bg-[#EDE8FF] text-[#6549D8]', assignment: 'CS-205 Data Structures', file: 'list_ops.java', date: '21 Oct 2026, 1:45 PM', similarity: 76, status: 'Context review' },
  { id: 11, student: 'Arjun Nair', initials: 'AN', color: 'bg-[#E4F1E9] text-[#174C3C]', assignment: 'OOP-104 OOP Lab 4 - Polymorphism', file: 'polymorphism.cpp', date: '21 Oct 2026, 9:40 AM', similarity: 5, status: 'No active review' },
];

interface SubmissionState {
  reviewer?: string;
  commonPattern?: boolean;
}

const STATE_KEY = 'codeguard:submission-review-state';
const REVIEWERS = ['Unassigned', 'Demo reviewer A', 'Demo reviewer B'];

function readSubmissionState(): Record<number, SubmissionState> {
  const raw = localStorage.getItem(STATE_KEY);
  if (!raw) return {};
  const parsed: unknown = JSON.parse(raw);
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed) || Object.values(parsed).some(value =>
    typeof value !== 'object' || value === null ||
    (value.reviewer !== undefined && typeof value.reviewer !== 'string') ||
    (value.commonPattern !== undefined && typeof value.commonPattern !== 'boolean')
  )) {
    throw new Error('Saved submission review state is invalid. Clear this site’s browser storage to reset the demo.');
  }
  return parsed as Record<number, SubmissionState>;
}

export default function SubmissionsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [overlapFilter, setOverlapFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selected, setSelected] = useState<number[]>([]);
  const [{ initialState, initialError }] = useState(() => {
    try {
      return { initialState: readSubmissionState(), initialError: '' };
    } catch (error) {
      return { initialState: {}, initialError: error instanceof Error ? error.message : 'Unable to load saved demo review state.' };
    }
  });
  const [reviewState, setReviewState] = useState<Record<number, SubmissionState>>(initialState);
  const [feedback, setFeedback] = useState(initialError);

  const filteredSubmissions = useMemo(() => submissionsData
    .filter(sub => `${sub.student} ${sub.assignment} ${sub.file} ${sub.status}`.toLowerCase().includes(searchTerm.trim().toLowerCase()))
    .filter(sub => statusFilter === 'all' || (statusFilter === 'review' ? sub.status === 'Context review' : statusFilter === 'none' ? sub.status === 'No active review' : Boolean(reviewState[sub.id]?.commonPattern) || /sorting visualizer/i.test(sub.assignment)))
    .filter(sub => overlapFilter === 'all' || (overlapFilter === 'under30' ? sub.similarity < 30 : sub.similarity >= 30))
    .sort((a, b) => sortOrder === 'high' ? b.similarity - a.similarity : sortOrder === 'low' ? a.similarity - b.similarity : b.id - a.id),
  [searchTerm, statusFilter, overlapFilter, sortOrder, reviewState]);

  const persistState = (nextState: Record<number, SubmissionState>, action: string) => {
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify(nextState));
      setReviewState(nextState);
      recordAuditEvent(action, `Updated ${selected.length} illustrative submission record(s) in this browser.`);
      setFeedback('');
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Unable to save these demo changes in this browser.');
    }
  };

  const updateSelectedReviewer = (reviewer: string) => {
    if (!selected.length) return;
    const nextState = { ...reviewState };
    selected.forEach(id => { nextState[id] = { ...nextState[id], reviewer }; });
    persistState(nextState, 'Bulk reviewer assignment');
  };

  const markCommonPattern = () => {
    if (!selected.length) return;
    const nextState = { ...reviewState };
    selected.forEach(id => { nextState[id] = { ...nextState[id], commonPattern: true }; });
    persistState(nextState, 'Common-pattern context marked');
  };

  const getStatusStyle = (status: string) => status === 'Context review'
    ? 'bg-[#FFF1D6] text-[#684713] border border-[#F6E0B5]'
    : 'bg-[#F7F6F0] text-[#707A72] border border-[#E3E7E0]';

  const toggleSelection = (id: number) => {
    setSelected(current => current.includes(id) ? current.filter(value => value !== id) : [...current, id]);
  };
  const visibleSelected = filteredSubmissions.length > 0 && filteredSubmissions.every(sub => selected.includes(sub.id));

  return (
    <div className="legacy-dark-page space-y-5 text-[#202923]">
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#E3E7E0] bg-white p-3 shadow-sm">
        <div className="flex min-w-[220px] flex-1 items-center">
          <SearchIcon className="ml-2 mr-2 h-5 w-5 text-[#707A72]" />
          <input
            type="text"
            placeholder="Search sample submissions..."
            className="flex-1 border-none bg-transparent text-sm text-[#202923] outline-none placeholder:text-[#8A938B]"
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
          />
        </div>
        <select aria-label="Filter by review status" value={statusFilter} onChange={event => setStatusFilter(event.target.value)} className="rounded-lg border border-[#E3E7E0] bg-white px-3 py-2 text-xs">
          <option value="all">All review states</option><option value="review">Context review</option><option value="none">No active review</option><option value="common">Common-pattern context</option>
        </select>
        <select aria-label="Filter by overlap" value={overlapFilter} onChange={event => setOverlapFilter(event.target.value)} className="rounded-lg border border-[#E3E7E0] bg-white px-3 py-2 text-xs">
          <option value="all">All overlap</option><option value="under30">Under 30%</option><option value="30plus">30% and over</option>
        </select>
        <select aria-label="Sort submissions" value={sortOrder} onChange={event => setSortOrder(event.target.value)} className="rounded-lg border border-[#E3E7E0] bg-white px-3 py-2 text-xs">
          <option value="newest">Demo order</option><option value="high">Highest overlap</option><option value="low">Lowest overlap</option>
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[#E3E7E0] bg-white p-3">
        <span className="text-xs font-semibold text-[#354139]">{selected.length} selected</span>
        <select aria-label="Assign selected to reviewer" defaultValue="" onChange={event => { updateSelectedReviewer(event.target.value); event.target.value = ''; }} className="rounded-lg border border-[#E3E7E0] bg-white px-3 py-2 text-xs">
          <option value="" disabled>Assign selected…</option>
          {REVIEWERS.map(reviewer => <option key={reviewer} value={reviewer}>{reviewer}</option>)}
        </select>
        <button type="button" onClick={markCommonPattern} disabled={!selected.length} className="rounded-lg border border-[#E3E7E0] px-3 py-2 text-xs font-semibold text-[#174C3C] disabled:opacity-40">Add common-pattern context</button>
        <span className="text-[11px] text-[#707A72]">Demo actions persist in this browser only; context tags do not change overlap values.</span>
      </div>
      {feedback && <p role="alert" className="rounded-lg border border-[#F5C7C3] bg-[#FBE8E6] p-3 text-xs text-[#A82A2A]">{feedback}</p>}

      <div className="overflow-hidden rounded-2xl border border-[#E3E7E0] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse text-left">
            <thead><tr className="border-b border-[#E3E7E0] bg-[#F7F6F0]">
              <th className="px-4 py-4"><input aria-label="Select all visible submissions" type="checkbox" checked={visibleSelected} onChange={() => setSelected(visibleSelected ? selected.filter(id => !filteredSubmissions.some(sub => sub.id === id)) : [...new Set([...selected, ...filteredSubmissions.map(sub => sub.id)])])} /></th>
              {['Student', 'Assignment', 'File', 'Submitted On', 'Overlap', 'Status', 'Reviewer', 'Action'].map(label => <th key={label} className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-[#707A72]">{label}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-[#E3E7E0]">
              {filteredSubmissions.map(sub => (
                <tr key={sub.id} className="transition-colors hover:bg-[#F7F6F0]">
                  <td className="px-4 py-4"><input aria-label={`Select ${sub.student}`} type="checkbox" checked={selected.includes(sub.id)} onChange={() => toggleSelection(sub.id)} /></td>
                  <td className="px-4 py-4"><div className="flex items-center gap-3"><div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${sub.color}`}>{sub.initials}</div><span className="text-sm font-medium">{sub.student}</span></div></td>
                  <td className="px-4 py-4 text-sm text-[#5E6961]">{sub.assignment}</td>
                  <td className="px-4 py-4 font-mono text-xs text-[#5E6961]">{sub.file}</td>
                  <td className="px-4 py-4 text-sm text-[#5E6961]">{sub.date}</td>
                  <td className="px-4 py-4 text-center"><span className="font-semibold text-[#174C3C]">{sub.similarity}%</span></td>
                  <td className="px-4 py-4"><span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(sub.status)}`}>{sub.status}</span>{(/sorting visualizer/i.test(sub.assignment) || reviewState[sub.id]?.commonPattern) && <span className="mt-1 block text-[11px] text-[#684713]">Common algorithm assignment context</span>}</td>
                  <td className="px-4 py-4 text-xs text-[#5E6961]">{reviewState[sub.id]?.reviewer ?? 'Unassigned'}</td>
                  <td className="px-4 py-4 text-right"><Link to="/compare" className="text-sm font-medium text-[#174C3C] hover:underline">Inspect</Link></td>
                </tr>
              ))}
              {!filteredSubmissions.length && <tr><td colSpan={9} className="px-6 py-10 text-center text-sm text-[#707A72]">No illustrative submissions match these filters.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="border-t border-[#E3E7E0] p-4"><p className="text-sm text-[#707A72]">Showing {filteredSubmissions.length} illustrative rows from a 203-submission demo cohort. Local changes are not an institutional record.</p></div>
      </div>
    </div>
  );
}
