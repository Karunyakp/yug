import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';

export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="mb-6 flex items-center justify-center">
        <div className="bg-[#1a1a24] rounded-2xl p-4 border border-white/5 shadow-lg shadow-black/20">
          <Sparkles className="w-8 h-8 text-pink-500" />
        </div>
      </div>

      <h1 className="text-white text-xl font-semibold text-center max-w-md mb-3 leading-snug">
        Crafting this page like Myntra crafts a product drop
      </h1>

      <p className="text-gray-400 text-sm text-center max-w-lg mb-8 leading-relaxed">
        We are giving projects the same editorial love as Dashboard and Assignments. No generic tables. Coming soon with micro-interactions, grain, and pink pill active states.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 border border-white/10 text-white hover:bg-white/5 rounded-full px-6 py-2 text-sm font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4 text-gray-400" />
        <span>Back to Dashboard</span>
      </Link>
    </div>
  );
}
