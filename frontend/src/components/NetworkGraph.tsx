import { Link } from 'react-router-dom';
import { Network } from 'lucide-react';

export default function NetworkGraph() {
  return (
    <div className="space-y-6 pb-12 text-[#202923]">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Submission Overlap Graph</h1>
        <p className="mt-1 text-sm text-[#707A72]">Comparison history is not stored in this browser.</p>
      </div>

      <div className="rounded-2xl border border-[#E3E7E0] bg-white p-8 text-center">
        <Network className="mx-auto text-[#707A72]" size={28} />
        <h2 className="mt-3 text-lg font-semibold">No comparison relationships available</h2>
        <p className="mt-2 text-sm text-[#707A72]">
          No saved comparison records are available to create a graph.
        </p>
        <Link
          to="/compare"
          className="mt-5 inline-flex rounded-xl bg-[#174C3C] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#10382D]"
        >
          Start a comparison
        </Link>
      </div>
    </div>
  );
}
