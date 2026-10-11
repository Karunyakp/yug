import { useMemo, useState } from 'react';
import { ArrowUpRight, Network, Users } from 'lucide-react';
import { workspaceCourses, workspaceOverlapLinks, workspaceSubmissions } from '../services/workspaceRecords';

const NODE_POSITIONS: Record<string, { x: number; y: number }> = {
  'SUB-2048': { x: 100, y: 118 },
  'SUB-2044': { x: 200, y: 210 },
  'SUB-2043': { x: 120, y: 315 },
  'SUB-2046': { x: 350, y: 118 },
  'SUB-2042': { x: 450, y: 210 },
  'SUB-2041': { x: 370, y: 315 },
  'SUB-2047': { x: 600, y: 118 },
  'SUB-2040': { x: 700, y: 210 },
  'SUB-2039': { x: 620, y: 315 },
  'SUB-2045': { x: 850, y: 118 },
  'SUB-2038': { x: 950, y: 210 },
  'SUB-2037': { x: 870, y: 315 },
};

function strengthColor(overlap: number): string {
  if (overlap >= 50) return '#C47731';
  if (overlap >= 30) return '#73927B';
  return '#C5D2C7';
}

export default function NetworkGraph() {
  const [courseFilter, setCourseFilter] = useState('All courses');
  const [minimumOverlap, setMinimumOverlap] = useState(15);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);

  const submissions = useMemo(() => workspaceSubmissions.filter(submission =>
    courseFilter === 'All courses' || submission.course === courseFilter
  ), [courseFilter]);
  const submissionIds = useMemo(() => new Set(submissions.map(submission => submission.id)), [submissions]);
  const links = useMemo(() => workspaceOverlapLinks.filter(link =>
    submissionIds.has(link.source) && submissionIds.has(link.target) && link.overlap >= minimumOverlap
  ), [submissionIds, minimumOverlap]);
  const selectedSubmission = submissions.find(submission => submission.id === selectedSubmissionId);
  const selectedConnections = selectedSubmission
    ? links.filter(link => link.source === selectedSubmission.id || link.target === selectedSubmission.id)
    : [];

  const handleCourseChange = (course: string) => {
    setCourseFilter(course);
    setSelectedSubmissionId(null);
  };

  return (
    <div className="space-y-6 pb-12 text-[#202923]">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#56806A]">Review workspace</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">Collaboration Graph</h1>
          <p className="mt-1 text-sm text-[#707A72]">Explore code-pattern relationships between submissions in the same assignment.</p>
        </div>
        <label className="flex items-center gap-3 text-sm font-medium text-[#59645C]">
          Course
          <select
            value={courseFilter}
            onChange={event => handleCourseChange(event.target.value)}
            className="rounded-xl border border-[#DCE3DA] bg-white px-3 py-2.5 text-sm text-[#202923] outline-none focus:border-[#56806A] focus:ring-2 focus:ring-[#E4F1E9]"
          >
            <option>All courses</option>
            {workspaceCourses.map(course => <option key={course.id}>{course.code}</option>)}
          </select>
        </label>
      </header>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          ['Submissions', submissions.length],
          ['Connections', links.length],
          ['Assignments', new Set(submissions.map(submission => submission.assignment)).size],
          ['Courses', new Set(submissions.map(submission => submission.course)).size],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-[#E3E7E0] bg-white px-4 py-3.5">
            <p className="text-xs font-medium text-[#707A72]">{label}</p>
            <p className="mt-1 text-xl font-semibold">{value}</p>
          </div>
        ))}
      </section>

      <section className="overflow-hidden rounded-2xl border border-[#E3E7E0] bg-white">
        <div className="flex flex-col justify-between gap-4 border-b border-[#E3E7E0] px-5 py-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold">Submission relationships</h2>
            <p className="mt-1 text-xs text-[#707A72]">Select a learner node to inspect its connected submissions.</p>
          </div>
          <label className="flex items-center gap-3 text-xs font-medium text-[#59645C]">
            Minimum overlap <span className="w-9 text-right tabular-nums">{minimumOverlap}%</span>
            <input
              type="range"
              min="15"
              max="65"
              step="5"
              value={minimumOverlap}
              onChange={event => setMinimumOverlap(Number(event.target.value))}
              aria-label="Minimum overlap percentage"
              className="w-28 accent-[#174C3C]"
            />
          </label>
        </div>

        <div className="overflow-x-auto bg-[#FBFCFA]">
          <svg viewBox="0 0 1080 440" role="img" aria-label={`Graph showing ${submissions.length} submissions and ${links.length} code-pattern relationships`} className="block h-auto min-w-[880px] w-full">
            <defs>
              <filter id="node-shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#174C3C" floodOpacity="0.12" />
              </filter>
            </defs>
            {[...new Set(submissions.map(submission => submission.assignment))].map(assignment => {
              const related = submissions.filter(submission => submission.assignment === assignment);
              const firstPosition = NODE_POSITIONS[related[0]?.id];
              if (!firstPosition) return null;
              const centerX = firstPosition.x + 70;
              return (
                <g key={assignment}>
                  <rect x={centerX - 90} y="26" width="180" height="29" rx="14.5" fill="#EAF1EB" />
                  <text x={centerX} y="45" textAnchor="middle" fill="#456450" fontSize="11" fontWeight="600">{assignment.length > 23 ? `${assignment.slice(0, 21)}…` : assignment}</text>
                </g>
              );
            })}
            {links.map(link => {
              const source = NODE_POSITIONS[link.source];
              const target = NODE_POSITIONS[link.target];
              if (!source || !target) return null;
              return (
                <g key={`${link.source}-${link.target}`}>
                  <line x1={source.x} y1={source.y} x2={target.x} y2={target.y} stroke={strengthColor(link.overlap)} strokeWidth={Math.max(2, link.overlap / 18)} strokeOpacity="0.75" />
                  <rect x={(source.x + target.x) / 2 - 20} y={(source.y + target.y) / 2 - 10} width="40" height="20" rx="10" fill="white" stroke="#E3E7E0" />
                  <text x={(source.x + target.x) / 2} y={(source.y + target.y) / 2 + 4} textAnchor="middle" fill="#59645C" fontSize="10" fontWeight="600">{link.overlap}%</text>
                </g>
              );
            })}
            {submissions.map(submission => {
              const position = NODE_POSITIONS[submission.id];
              if (!position) return null;
              const selected = selectedSubmissionId === submission.id;
              return (
                <g
                  key={submission.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`${submission.learner}, ${submission.id}, ${submission.assignment}`}
                  aria-pressed={selected}
                  onClick={() => setSelectedSubmissionId(selected ? null : submission.id)}
                  onKeyDown={event => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setSelectedSubmissionId(selected ? null : submission.id);
                    }
                  }}
                  className="cursor-pointer outline-none"
                >
                  <circle cx={position.x} cy={position.y} r="28" fill={selected ? '#174C3C' : '#FFFFFF'} stroke={selected ? '#174C3C' : '#9AB4A0'} strokeWidth="2" filter="url(#node-shadow)" />
                  <text x={position.x} y={position.y + 4} textAnchor="middle" fill={selected ? '#FFFFFF' : '#174C3C'} fontSize="12" fontWeight="700">
                    {submission.learner.split(/\s+/).map(part => part[0]).slice(0, 2).join('')}
                  </text>
                  <text x={position.x} y={position.y + 45} textAnchor="middle" fill="#354139" fontSize="10" fontWeight="600">{submission.learner}</text>
                  <text x={position.x} y={position.y + 59} textAnchor="middle" fill="#89938B" fontSize="9">{submission.id}</text>
                  <title>{`${submission.learner} — ${submission.assignment}`}</title>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#E3E7E0] px-5 py-3 text-xs text-[#707A72]">
          <span className="font-semibold text-[#59645C]">Overlap strength</span>
          <span className="inline-flex items-center gap-2"><i className="h-0.5 w-5 bg-[#C47731]" /> 50%+</span>
          <span className="inline-flex items-center gap-2"><i className="h-0.5 w-5 bg-[#73927B]" /> 30–49%</span>
          <span className="inline-flex items-center gap-2"><i className="h-0.5 w-5 bg-[#C5D2C7]" /> Below 30%</span>
        </div>
      </section>

      {selectedSubmission ? (
        <section className="rounded-2xl border border-[#DCE7DC] bg-white p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#56806A]">Selected submission</p>
              <h2 className="mt-1 text-lg font-semibold">{selectedSubmission.learner}</h2>
              <p className="mt-1 text-sm text-[#707A72]">{selectedSubmission.id} · {selectedSubmission.assignment} · {selectedSubmission.course}</p>
            </div>
            <span className="rounded-full bg-[#EAF1EB] px-3 py-1.5 text-xs font-semibold text-[#456450]">{selectedConnections.length} connections</span>
          </div>
          {selectedConnections.length ? (
            <ul className="mt-4 divide-y divide-[#E3E7E0]">
              {selectedConnections.map(link => {
                const counterpartId = link.source === selectedSubmission.id ? link.target : link.source;
                const counterpart = submissions.find(submission => submission.id === counterpartId);
                if (!counterpart) return null;
                return (
                  <li key={`${link.source}-${link.target}`} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
                    <span className="inline-flex items-center gap-2"><Users size={15} className="text-[#56806A]" /> {counterpart.learner} <span className="text-xs text-[#89938B]">{counterpart.id}</span></span>
                    <span className="inline-flex items-center gap-3"><span className="text-[#707A72]">{link.evidence}</span><strong className="text-[#174C3C]">{link.overlap}%</strong></span>
                  </li>
                );
              })}
            </ul>
          ) : <p className="mt-4 text-sm text-[#707A72]">No connections meet the current overlap threshold.</p>}
        </section>
      ) : (
        <p className="inline-flex items-start gap-2 rounded-xl bg-[#FFF9EC] px-4 py-3 text-xs leading-5 text-[#684713]">
          <Network size={15} className="mt-0.5 shrink-0" />
          Similar code patterns are a prompt for human review, not proof of collaboration or misconduct.
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <a href="/submissions" className="inline-flex items-center gap-2 text-sm font-semibold text-[#174C3C] hover:underline">Browse submissions <ArrowUpRight size={15} /></a>
        <a href="/reports" className="inline-flex items-center gap-2 text-sm font-semibold text-[#174C3C] hover:underline">Open reports <ArrowUpRight size={15} /></a>
      </div>
    </div>
  );
}
