import { Link } from 'react-router-dom';
import { FolderKanban } from 'lucide-react';

export default function Projects() {
  return (
    <div className="space-y-6 pb-12 text-[#202923]">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">Courses</h1>
          <p className="mt-1 text-sm text-[#707A72]">Course records are not stored in this browser.</p>
        </div>
        <Link
          to="/assignments"
          className="rounded-full bg-[#174C3C] px-4 py-2 font-medium text-white transition-colors hover:bg-[#10382D]"
        >
          View assignments
        </Link>
      </div>

      <div className="rounded-2xl border border-[#E3E7E0] bg-white p-8 text-center">
        <FolderKanban className="mx-auto text-[#707A72]" size={28} />
        <h2 className="mt-3 text-lg font-semibold">No courses available</h2>
        <p className="mt-2 text-sm text-[#707A72]">No course records are available to display.</p>
      </div>
    </div>
  );
}
