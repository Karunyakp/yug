import { CalendarDays, Check, Clock3 } from 'lucide-react';
import { workspaceAssignments } from '../services/workspaceRecords';

export default function Assignments() {
  return (
    <div className="space-y-6 pb-12 text-[#202923]">
      <div>
        <h1 className="text-2xl font-semibold">Assignments</h1>
        <p className="mt-1 text-sm text-[#707A72]">Track due dates, submissions, and review progress.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#E3E7E0] bg-white">
        <div className="hidden grid-cols-[minmax(0,1fr)_130px_160px_150px] gap-4 border-b border-[#E3E7E0] bg-[#F7F8F5] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#707A72] md:grid">
          <span>Assignment</span><span>Due date</span><span>Submissions</span><span>Status</span>
        </div>
        <div className="divide-y divide-[#E3E7E0]">
          {workspaceAssignments.map(assignment => {
            const progress = Math.round((assignment.submitted / assignment.total) * 100);
            const statusClass = assignment.status === 'In review' ? 'bg-[#FFF3D9] text-[#8A641F]' : assignment.status === 'Closed' ? 'bg-[#EAF0FA] text-[#365B91]' : 'bg-[#E4F1E9] text-[#174C3C]';
            return (
              <article key={assignment.id} className="grid gap-3 px-5 py-4 md:grid-cols-[minmax(0,1fr)_130px_160px_150px] md:items-center md:gap-4">
                <div>
                  <h2 className="font-medium">{assignment.title}</h2>
                  <p className="mt-1 text-xs text-[#8A938B]">{assignment.course}</p>
                </div>
                <div className="inline-flex items-center gap-2 text-sm text-[#59645C]"><CalendarDays size={15} /> {new Date(assignment.dueAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</div>
                <div>
                  <div className="flex justify-between text-xs text-[#59645C]"><span>{assignment.submitted} of {assignment.total}</span><span>{progress}%</span></div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E8ECE7]"><div className="h-full rounded-full bg-[#4F8067]" style={{ width: `${progress}%` }} /></div>
                </div>
                <span className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass}`}>
                  {assignment.status === 'Closed' ? <Check size={13} /> : <Clock3 size={13} />}{assignment.status}
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
