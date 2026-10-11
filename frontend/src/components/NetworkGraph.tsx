import { useMemo, useState } from 'react';
import { ArrowUpRight, BarChart3, Network, Users } from 'lucide-react';
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
  const assignmentInsights = useMemo(() => [...new Set(submissions.map(submission => submission.assignment))]
    .map(assignment => {
      const assignmentSubmissions = submissions.filter(submission => submission.assignment === assignment);
      const assignmentIds = new Set(assignmentSubmissions.map(submission => submission.id));
      const assignmentLinks = links.filter(link => assignmentIds.has(link.source) && assignmentIds.has(link.target));
      const averageOverlap = assignmentLinks.length
        ? Math.round(assignmentLinks.reduce((total, link) => total + link.overlap, 0) / assignmentLinks.length)
        : 0;
      return {
        assignment,
        course: assignmentSubmissions[0]?.course ?? '',
        submissions: assignmentSubmissions.length,
        links: assignmentLinks.length,
        averageOverlap,
      };
    }), [submissions, links]);
  const reviewStatuses = useMemo(() => [
    { label: 'Needs review', color: '#C47731' },
    { label: 'Submitted', color: '#73927B' },
    { label: 'Reviewed', color: '#174C3C' },
  ].map(status => ({
    ...status,
    count: submissions.filter(submission => submission.status === status.label).length,
  })), [submissions]);
  const overlapDistribution = useMemo(() => [
    { label: '15–29%', minimum: 15, maximum: 29, color: '#C5D2C7' },
    { label: '30–49%', minimum: 30, maximum: 49, color: '#73927B' },
    { label: '50%+', minimum: 50, maximum: 101, color: '#C47731' },
  ].map(range => ({
    ...range,
    count: links.filter(link => link.overlap >= range.minimum && link.overlap < range.maximum).length,
  })), [links]);
  const connectedSubmissions = useMemo(() => submissions.map(submission => ({
    ...submission,
    connections: links.filter(link => link.source === submission.id || link.target === submission.id).length,
  }))
    .filter(submission => submission.connections > 0)
    .sort((first, second) => second.connections - first.connections || first.learner.localeCompare(second.learner))
    .slice(0, 5), [submissions, links]);
  const maxAssignmentSubmissions = Math.max(1, ...assignmentInsights.map(item => item.submissions));
  const maxConnections = Math.max(1, ...connectedSubmissions.map(item => item.connections));
  const maxOverlapRangeCount = Math.max(1, ...overlapDistribution.map(item => item.count));
  const statusTotal = Math.max(1, reviewStatuses.reduce((total, item) => total + item.count, 0));

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

      <section className="grid gap-4 xl:grid-cols-2">
        <article className="rounded-2xl border border-[#E3E7E0] bg-white p-5">
          <div className="flex items-center gap-2">
            <BarChart3 size={18} className="text-[#174C3C]" />
            <div>
              <h2 className="font-semibold">Submissions by assignment</h2>
              <p className="mt-1 text-xs text-[#707A72]">Current records and connected pairs in this course filter.</p>
            </div>
          </div>
          <div className="mt-5 space-y-4">
            {assignmentInsights.map(item => (
              <div key={item.assignment}>
                <div className="flex items-start justify-between gap-3 text-xs">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-[#354139]">{item.assignment}</p>
                    <p className="mt-0.5 text-[#89938B]">{item.course} · {item.links} connected pairs</p>
                  </div>
                  <span className="shrink-0 font-semibold tabular-nums text-[#354139]">{item.submissions}</span>
                </div>
                <div
                  className="mt-2 h-2 overflow-hidden rounded-full bg-[#EEF1ED]"
                  role="img"
                  aria-label={`${item.submissions} submissions for ${item.assignment}`}
                >
                  <div className="h-full rounded-full bg-[#4F8067]" style={{ width: `${(item.submissions / maxAssignmentSubmissions) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-[#E3E7E0] bg-white p-5">
          <div className="flex items-center gap-2">
            <Users size={18} className="text-[#174C3C]" />
            <div>
              <h2 className="font-semibold">Review status</h2>
              <p className="mt-1 text-xs text-[#707A72]">{submissions.length} submissions in the selected view.</p>
            </div>
          </div>
          <div
            className="mt-6 flex h-4 overflow-hidden rounded-full bg-[#EEF1ED]"
            role="img"
            aria-label={reviewStatuses.map(item => `${item.count} ${item.label}`).join(', ')}
          >
            {reviewStatuses.map(item => item.count > 0 && (
              <div key={item.label} style={{ width: `${(item.count / statusTotal) * 100}%`, backgroundColor: item.color }} />
            ))}
          </div>
          <ul className="mt-5 space-y-3">
            {reviewStatuses.map(item => (
              <li key={item.label} className="flex items-center justify-between text-sm">
                <span className="inline-flex items-center gap-2 text-[#59645C]">
                  <i className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.label}
                </span>
                <span className="font-semibold tabular-nums">{item.count}<span className="ml-2 text-xs font-normal text-[#89938B]">{Math.round((item.count / statusTotal) * 100)}%</span></span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Relationship insights</h2>
          <p className="mt-1 text-sm text-[#707A72]">Additional views of the submission connections visible in the graph.</p>
        </div>
        <div className="grid gap-4 xl:grid-cols-2">
          <article className="rounded-2xl border border-[#E3E7E0] bg-white p-5">
            <div className="flex items-center gap-2">
              <BarChart3 size={18} className="text-[#174C3C]" />
              <div>
                <h3 className="font-semibold">Overlap strength distribution</h3>
                <p className="mt-1 text-xs text-[#707A72]">Connected pairs currently shown, grouped by overlap score.</p>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {overlapDistribution.map(range => (
                <div key={range.label} className="grid grid-cols-[58px_minmax(0,1fr)_28px] items-center gap-3 text-xs">
                  <span className="font-medium text-[#59645C]">{range.label}</span>
                  <div
                    className="h-3 overflow-hidden rounded-full bg-[#EEF1ED]"
                    role="img"
                    aria-label={`${range.count} connected pairs in ${range.label} overlap range`}
                  >
                    <div className="h-full rounded-full transition-all" style={{ width: `${(range.count / maxOverlapRangeCount) * 100}%`, backgroundColor: range.color }} />
                  </div>
                  <span className="text-right font-semibold tabular-nums text-[#354139]">{range.count}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 border-t border-[#E3E7E0] pt-3 text-[11px] leading-5 text-[#89938B]">
              The overlap slider and selected course filter both apply to these counts.
            </p>
          </article>

          <article className="rounded-2xl border border-[#E3E7E0] bg-white p-5">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-[#174C3C]" />
              <div>
                <h3 className="font-semibold">Most connected submissions</h3>
                <p className="mt-1 text-xs text-[#707A72]">Count of visible links for each submission.</p>
              </div>
            </div>
            {connectedSubmissions.length ? (
              <ol className="mt-5 space-y-4">
                {connectedSubmissions.map((submission, index) => (
                  <li key={submission.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedSubmissionId(submission.id)}
                      className="w-full text-left"
                      aria-label={`Show ${submission.learner}, ${submission.connections} connections`}
                    >
                      <span className="flex items-center justify-between gap-3 text-xs">
                        <span className="truncate font-medium text-[#354139]">{index + 1}. {submission.learner} <span className="font-normal text-[#89938B]">{submission.id}</span></span>
                        <span className="shrink-0 font-semibold tabular-nums text-[#354139]">{submission.connections} links</span>
                      </span>
                      <span className="mt-2 block h-2 overflow-hidden rounded-full bg-[#EEF1ED]">
                        <span className="block h-full rounded-full bg-[#4F8067] transition-all" style={{ width: `${(submission.connections / maxConnections) * 100}%` }} />
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-5 rounded-xl bg-[#F7F8F5] p-4 text-sm text-[#707A72]">No submissions have connections at this overlap threshold.</p>
            )}
          </article>
        </div>
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
