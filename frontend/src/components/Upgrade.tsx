
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
          <Sparkles className="w-4 h-4" /> PRO EDITION
        </div>
        <h1 className="text-5xl font-bold mb-6">Unlock Unlimited Potential</h1>
        <p className="text-xl text-gray-400 leading-relaxed">
          Upgrade to Pro for unlimited AST comparisons, bulk exporting, and enterprise-grade PDF reports.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto px-4">
        {/* Basic Plan */}
        <div className="bg-[#16161e] border border-gray-800 rounded-3xl p-8 flex-1">
          <h3 className="text-2xl font-bold mb-2">Free</h3>
          <p className="text-gray-400 mb-6">Perfect for small classes.</p>
          <div className="text-4xl font-bold mb-8">$0<span className="text-xl text-gray-500 font-medium">/mo</span></div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="w-5 h-5 text-gray-600" /> Up to 50 submissions/mo</li>
            <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="w-5 h-5 text-gray-600" /> Basic Lexical Analysis</li>
            <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="w-5 h-5 text-gray-600" /> 7-day history</li>
          </ul>
          <button disabled className="w-full bg-gray-800 text-gray-400 rounded-xl py-3 font-semibold cursor-not-allowed">Current Plan</button>
        </div>

        {/* Pro Plan */}
        <div className="bg-gradient-to-b from-[#1a1a24] to-[#111118] border border-pink-500/30 rounded-3xl p-8 flex-1 relative shadow-[0_0_40px_rgba(236,72,153,0.15)]">
          <div className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider">RECOMMENDED</div>
          <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Pro</h3>
          <p className="text-gray-400 mb-6">For university departments.</p>
          <div className="text-4xl font-bold mb-8">$29<span className="text-xl text-gray-500 font-medium">/mo</span></div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-5 h-5 text-pink-500" /> Unlimited submissions</li>
            <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-5 h-5 text-pink-500" /> Advanced AST Deep-scan</li>
            <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-5 h-5 text-pink-500" /> Infinite history</li>
            <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-5 h-5 text-pink-500" /> Bulk Export to PDF/CSV</li>
          </ul>
          <button onClick={() => alert('Upgrade flow coming soon!')} className="w-full bg-white text-black hover:bg-gray-200 rounded-xl py-3 font-semibold transition-colors">Upgrade to Pro</button>
        </div>
      </div>
    </div>
  );
}
