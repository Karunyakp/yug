import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';

export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="mb-6 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-4 border border-[#E3E7E0] shadow-lg shadow-[#174C3C]/5">
          <Sparkles className="w-8 h-8 text-[#174C3C]" />
        </div>
      </div>

      <h1 className="text-[#202923] text-xl font-semibold text-center max-w-md mb-3 leading-snug">
        Crafting this page with extreme attention to detail
      </h1>

      <p className="text-[#707A72] text-sm text-center max-w-lg mb-8 leading-relaxed">
        We are giving projects the same editorial love as Dashboard and Assignments. No generic tables. Coming soon with micro-interactions, grain, and polished active states.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 border border-[#E3E7E0] text-[#202923] hover:bg-[#F7F6F0] rounded-full px-6 py-2 text-sm font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4 text-[#707A72]" />
        <span>Back to Dashboard</span>
      </Link>
    </div>
  );
}
