import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ChevronRight, ArrowRight } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans selection:bg-pink-500/30">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] bg-pink-600/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] bg-violet-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-2.5 rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.3)]">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">CodeGuard AI</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link to="/signup" className="text-sm font-medium bg-white text-black px-5 py-2.5 rounded-full hover:bg-gray-100 transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300 mb-8 backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-pink-500 animate-pulse"></span>
          The new standard for academic integrity
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[1.1] mb-8">
          Protect originality.<br />
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 bg-clip-text text-transparent">
            Empower educators.
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mb-12 leading-relaxed font-light">
          Editorial-grade plagiarism detection built specifically for computer science departments. Advanced AST analysis meets consumer-app polish.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link to="/signup" className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white px-8 py-4 rounded-full font-medium text-lg transition-all shadow-[0_0_30px_rgba(236,72,153,0.3)] hover:shadow-[0_0_40px_rgba(236,72,153,0.4)] hover:-translate-y-0.5">
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/features" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-full font-medium text-lg transition-all">
            Explore Features
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </main>
      
      {/* Footer / Trust Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-12 mt-20 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm text-gray-500">Trusted by top universities worldwide.</p>
        <div className="flex gap-8 text-sm font-medium text-gray-400">
          <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
          <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
          <span className="hover:text-white cursor-pointer transition-colors">Contact</span>
        </div>
      </div>
    </div>
  );
}
