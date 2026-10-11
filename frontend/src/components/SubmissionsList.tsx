import { Link } from 'react-router-dom';
import { FileCode2 } from 'lucide-react';

export default function SubmissionsList() {
  return (
    <div className="space-y-5 text-[#202923]">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Submissions</h1>
        <p className="mt-1 text-sm text-[#707A72]">Submission records are not stored in this browser.</p>
      </div>

      <div className="rounded-2xl border border-[#E3E7E0] bg-white p-8 text-center">
        <FileCode2 className="mx-auto text-[#707A72]" size={28} />
        <h2 className="mt-3 text-lg font-semibold">No submissions available</h2>
        <p className="mt-2 text-sm text-[#707A72]">
          Start a comparison with code you provide. Results are not saved as submission records.
        </p>
        <Link
          to="/compare"
          className="mt-5 inline-flex rounded-xl bg-[#174C3C] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#10382D]"
        >
          Open code analysis
        </Link>
      </div>
    </div>
  );
}
