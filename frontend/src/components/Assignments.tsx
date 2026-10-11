import { FileText } from 'lucide-react';

export default function Assignments() {
  return (
    <div className="space-y-6 pb-12 text-[#202923]">
      <div>
        <h1 className="text-2xl font-semibold">Assignments</h1>
        <p className="mt-1 text-sm text-[#707A72]">Assignments appear here when they are available.</p>
      </div>

      <div className="rounded-2xl border border-[#E3E7E0] bg-white p-8 text-center">
        <FileText className="mx-auto text-[#707A72]" size={28} />
        <h2 className="mt-3 text-lg font-semibold">No assignments available</h2>
        <p className="mt-2 text-sm text-[#707A72]">No assignment records are currently available to display.</p>
      </div>
    </div>
  );
}
