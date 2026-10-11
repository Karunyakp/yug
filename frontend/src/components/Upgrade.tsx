
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function Upgrade() {
  return (
    <div className="legacy-dark-page min-h-screen bg-[#0a0a10] flex flex-col items-center py-20 font-sans text-white relative">
      <div className="absolute top-8 left-8">
        <Link to="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </div>
      
      <div className="text-center max-w-2xl mx-auto px-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" /> DEMO ONLY
        </div>
        <h1 className="text-5xl font-bold mb-6">Plans are not available</h1>
        <p className="text-xl text-gray-400 leading-relaxed">
          This frontend demo has no subscription, payment, or upgrade service. The cards below describe the current demo and unimplemented ideas only.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto px-4">
        {/* Basic Plan */}
        <div className="bg-[#16161e] border border-gray-800 rounded-3xl p-8 flex-1">
          <h3 className="text-2xl font-bold mb-2">Current demo</h3>
          <p className="text-gray-400 mb-6">Browser-based demonstration; not a service plan.</p>
          <div className="text-2xl font-bold mb-8">No billing</div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="w-5 h-5 text-gray-600" /> Local overlap heuristics</li>
            <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="w-5 h-5 text-gray-600" /> Optional AI assistance with consent</li>
            <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="w-5 h-5 text-gray-600" /> Illustrative sample records</li>
          </ul>
          <button disabled className="w-full bg-gray-800 text-gray-400 rounded-xl py-3 font-semibold cursor-not-allowed">Demo</button>
        </div>

        {/* Pro Plan */}
        <div className="bg-gradient-to-b from-[#1a1a24] to-[#111118] border border-pink-500/30 rounded-3xl p-8 flex-1 relative shadow-[0_0_40px_rgba(236,72,153,0.15)]">
          <div className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider">ROADMAP IDEA</div>
          <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Future capabilities</h3>
          <p className="text-gray-400 mb-6">Not implemented or available for purchase.</p>
          <div className="text-2xl font-bold mb-8">Not available</div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-5 h-5 text-pink-500" /> Validated assignment baselines</li>
            <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-5 h-5 text-pink-500" /> Student-controlled provenance tools</li>
            <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-5 h-5 text-pink-500" /> In-browser AST analysis</li>
          </ul>
          <button disabled className="w-full bg-gray-800 text-gray-400 rounded-xl py-3 font-semibold cursor-not-allowed">Not available</button>
        </div>
      </div>
    </div>
  );
}
