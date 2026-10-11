import { Link } from 'react-router-dom';
import { BookOpen, Users } from 'lucide-react';
import { workspaceCourses } from '../services/workspaceRecords';

export default function Projects() {
  return (
    <div className="space-y-6 pb-12 text-[#202923]">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">Courses</h1>
          <p className="mt-1 text-sm text-[#707A72]">Manage course activity and track learner progress.</p>
        </div>
        <Link
          to="/assignments"
          className="rounded-full bg-[#174C3C] px-4 py-2 font-medium text-white transition-colors hover:bg-[#10382D]"
        >
          View assignments
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {workspaceCourses.map(course => (
          <article key={course.id} className="rounded-2xl border border-[#E3E7E0] bg-white p-5">
            <div className="flex items-start justify-between gap-3">
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${course.color}`}><BookOpen size={20} /></span>
              <span className="rounded-full bg-[#F2F4F0] px-2.5 py-1 text-xs font-semibold text-[#59645C]">{course.code}</span>
            </div>
            <h2 className="mt-4 font-semibold">{course.name}</h2>
            <p className="mt-1 text-sm text-[#707A72]">{course.instructor}</p>
            <div className="mt-5 flex items-center justify-between border-t border-[#E3E7E0] pt-4 text-sm text-[#59645C]">
              <span className="inline-flex items-center gap-2"><Users size={15} /> {course.learners} learners</span>
              <span>{course.assignments} assignments</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
