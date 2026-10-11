import { Link } from 'react-router-dom';
import { workspaceSubmissions } from '../services/workspaceRecords';

export default function SubmissionsList() {
  return (
    <div className="space-y-5 text-[#202923]">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Submissions</h1>
        <p className="mt-1 text-sm text-[#707A72]">Review incoming work across your courses.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#E3E7E0] bg-white">
        <div className="hidden grid-cols-[130px_minmax(0,1fr)_minmax(0,1fr)_150px_140px] gap-4 border-b border-[#E3E7E0] bg-[#F7F8F5] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#707A72] md:grid">
          <span>Submission</span><span>Learner</span><span>Assignment</span><span>Received</span><span>Status</span>
        </div>
        <div className="divide-y divide-[#E3E7E0]">
          {workspaceSubmissions.map(submission => {
            const reviewed = submission.status === 'Reviewed';
            return (
              <article key={submission.id} className="grid gap-3 px-5 py-4 md:grid-cols-[130px_minmax(0,1fr)_minmax(0,1fr)_150px_140px] md:items-center md:gap-4">
                <span className="text-xs font-semibold text-[#174C3C]">{submission.id}</span>
                <div><h2 className="text-sm font-medium">{submission.learner}</h2><p className="mt-1 text-xs text-[#8A938B]">{submission.course}</p></div>
                <p className="text-sm text-[#59645C]">{submission.assignment}</p>
                <time className="text-sm text-[#59645C]" dateTime={submission.submittedAt}>{new Date(submission.submittedAt).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</time>
                <span className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${reviewed ? 'bg-[#E4F1E9] text-[#174C3C]' : 'bg-[#FFF3D9] text-[#8A641F]'}`}>{submission.status}</span>
              </article>
            );
          })}
        </div>
      </div>

      <Link to="/compare" className="inline-flex rounded-xl bg-[#174C3C] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#10382D]">Open code analysis</Link>
    </div>
  );
}
