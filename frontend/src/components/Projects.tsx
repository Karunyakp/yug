import { ArrowUpRight, FolderKanban, Clock3, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';

const courses = [
  { name: 'Sorting Visualizer', code: 'CS-204', status: 'Active', submissions: 45, enrolled: 60, due: 'Due 28 Oct 2026' },
  { name: 'OOP Lab 4 - Polymorphism', code: 'OOP-104', status: 'Active', submissions: 32, enrolled: 60, due: 'Due 02 Nov 2026' },
  { name: 'DBMS Project: ER to Relational', code: 'DB-118', status: 'Archived', submissions: 60, enrolled: 60, due: 'Closed 15 Sep 2026' },
  { name: 'AI Search - A* Implementation', code: 'AI-041', status: 'Draft', submissions: 0, enrolled: 60, due: 'Planned 10 Dec 2026' },
  { name: 'Web Dev - E-commerce Clone UI', code: 'WEB-210', status: 'Active', submissions: 22, enrolled: 60, due: 'Due 05 Nov 2026' },
  { name: 'Graph Algorithms', code: 'CS-301', status: 'Active', submissions: 20, enrolled: 60, due: 'Due 06 Nov 2026' },
  { name: 'Data Structures', code: 'CS-205', status: 'Active', submissions: 24, enrolled: 60, due: 'Due 08 Nov 2026' },
];

export default function Projects() {
  return (
    <div className="legacy-dark-page space-y-6 pb-12 text-[#202923]">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#202923]">Courses</h1>
          <p className="mt-1 text-sm text-[#707A72]">Illustrative course workspace. Counts and deadlines are demo data.</p>
        </div>
        <Link to="/assignments" className="rounded-full bg-[#174C3C] px-4 py-2 font-medium text-white transition-colors hover:bg-[#10382D]">
          View assignments
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {courses.map(course => {
          const progress = Math.round((course.submissions / course.enrolled) * 100);
          return (
            <article key={course.code} className="rounded-2xl border border-[#E3E7E0] bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-[#C3E4CF] bg-[#E4F1E9] p-2.5 text-[#174C3C]"><FolderKanban size={20} /></div>
                  <div>
                    <h2 className="font-semibold text-[#202923]">{course.name}</h2>
                    <p className="mt-1 text-xs text-[#707A72]">{course.code}</p>
                  </div>
                </div>
                <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                  course.status === 'Active'
                    ? 'border-[#C3E4CF] bg-[#E4F1E9] text-[#174C3C]'
                    : 'border-[#E3E7E0] bg-[#F7F6F0] text-[#707A72]'
                }`}>{course.status}</span>
              </div>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-xs text-[#707A72]">
                  <span>Submissions received</span>
                  <span>{course.submissions}/{course.enrolled}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-[#E3E7E0]">
                  <div className="h-full rounded-full bg-[#174C3C]" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border border-[#E3E7E0] bg-[#F7F6F0] p-3">
                  <div className="mb-1 flex items-center gap-2 text-[#707A72]"><Clock3 size={15} /><span>Schedule</span></div>
                  <p className="font-medium text-[#202923]">{course.due}</p>
                </div>
                <div className="rounded-xl border border-[#E3E7E0] bg-[#F7F6F0] p-3">
                  <div className="mb-1 flex items-center gap-2 text-[#707A72]"><UsersRound size={15} /><span>Enrolled</span></div>
                  <p className="font-medium text-[#202923]">{course.enrolled} students</p>
                </div>
              </div>

              <Link to="/assignments" className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-[#D9DED8] py-2.5 text-sm font-medium text-[#174C3C] transition-colors hover:border-[#174C3C] hover:bg-[#F7F6F0]">
                Open assignments <ArrowUpRight size={16} />
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
