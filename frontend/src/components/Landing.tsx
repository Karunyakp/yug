import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, Code2, Fingerprint, Lock, Zap } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#030303] text-white font-sans selection:bg-pink-500/30 overflow-x-hidden relative">
      <style>{`
        @keyframes float-hero {
          0% { transform: translateY(0px) rotateX(10deg) rotateY(-5deg); }
          50% { transform: translateY(-20px) rotateX(12deg) rotateY(-3deg); }
          100% { transform: translateY(0px) rotateX(10deg) rotateY(-5deg); }
        }
        @keyframes float-element {
          0% { transform: translateY(0px) translateZ(0px); }
          50% { transform: translateY(-15px) translateZ(30px); }
          100% { transform: translateY(0px) translateZ(0px); }
        }
        @keyframes scroll-grid {
          0% { transform: perspective(1000px) rotateX(60deg) translateY(0); }
          100% { transform: perspective(1000px) rotateX(60deg) translateY(50px); }
        }
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 40px rgba(236,72,153,0.2); }
          50% { box-shadow: 0 0 80px rgba(236,72,153,0.5); }
          100% { box-shadow: 0 0 40px rgba(236,72,153,0.2); }
        }
        .animate-float-hero {
          animation: float-hero 6s ease-in-out infinite;
          transform-style: preserve-3d;
        }
        .animate-float-element-1 { animation: float-element 5s ease-in-out infinite; }
        .animate-float-element-2 { animation: float-element 7s ease-in-out infinite reverse; }
        .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
        
        .bg-grid-3d {
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: scroll-grid 3s linear infinite;
          transform-origin: 50% 0%;
        }
        
        .glass-panel {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.02);
        }
      `}</style>

      {/* 3D Background Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[40%] left-0 right-0 h-[150vh] bg-grid-3d [mask-image:linear-gradient(to_bottom,transparent,black_20%,transparent_80%)]" />
        {/* Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-pink-600/20 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute top-1/3 right-1/4 w-[35rem] h-[35rem] bg-indigo-600/20 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto backdrop-blur-md border-b border-white/5 bg-black/10 rounded-b-3xl mb-12">
        <div className="flex items-center gap-3">
          <img src="/logo.jpg" alt="CodeGuard" className="w-10 h-10 rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.3)] animate-pulse-glow" />
          <span className="text-xl font-bold tracking-tight bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">CodeGuard AI</span>
        </div>
        <div className="flex items-center gap-8">
          <Link to="/features" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Platform</Link>
          <Link to="/features" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Technology</Link>
          <div className="h-4 w-px bg-white/20"></div>
          <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link to="/signup" className="text-sm font-medium bg-white text-black px-6 py-2.5 rounded-full hover:bg-gray-200 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            Start Free Trial
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center pt-10 pb-32 px-4 text-center max-w-[1400px] mx-auto">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-panel text-sm font-medium text-gray-300 mb-10 hover:border-pink-500/30 transition-colors cursor-default transform hover:-translate-y-1">
          <span className="flex h-2.5 w-2.5 rounded-full bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.8)] animate-pulse"></span>
          <span className="bg-gradient-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent font-bold">CodeGuard 2.0</span> is now live with 3D AST Visualization
        </div>
        
        <h1 className="text-6xl md:text-[5.5rem] font-extrabold tracking-tighter leading-[1.05] mb-8 max-w-5xl">
          The Future of <br/>
          <span className="relative inline-block pb-2">
            <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 blur-xl opacity-30"></span>
            <span className="relative bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Academic Integrity
            </span>
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mb-14 leading-relaxed font-light">
          Deep structural code analysis powered by neural networks. We detect logic obfuscation, variable swapping, and structural plagiarism instantly.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-24 relative z-20">
          <Link to="/signup" className="group relative flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105">
            <div className="absolute inset-0 bg-white rounded-full blur-md opacity-30 group-hover:opacity-60 transition-opacity"></div>
            <span className="relative z-10">Start Analyzing Code</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/features" className="flex items-center gap-2 glass-panel hover:bg-white/5 text-white px-8 py-4 rounded-full font-medium text-lg transition-all hover:scale-105">
            View Live Demo
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        {/* 3D Dashboard Showcase */}
        <div className="relative w-full max-w-6xl aspect-video mx-auto mt-10 perspective-[2000px] z-10">
          
          {/* Floating Elements Around Dashboard */}
          <div className="absolute -left-12 top-1/4 glass-panel p-4 rounded-2xl animate-float-element-1 flex items-center gap-4 z-20">
            <div className="bg-pink-500/20 p-3 rounded-xl border border-pink-500/30">
              <Fingerprint className="text-pink-400 w-6 h-6" />
            </div>
            <div className="text-left hidden md:block">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">AST Signature</p>
              <p className="text-sm font-medium text-white">99.8% Match Found</p>
            </div>
          </div>

          <div className="absolute -right-8 bottom-1/3 glass-panel p-4 rounded-2xl animate-float-element-2 flex items-center gap-4 z-20">
            <div className="bg-indigo-500/20 p-3 rounded-xl border border-indigo-500/30">
              <Code2 className="text-indigo-400 w-6 h-6" />
            </div>
            <div className="text-left hidden md:block">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Obfuscation</p>
              <p className="text-sm font-medium text-white">Variables Renamed</p>
            </div>
          </div>

          {/* The Main 3D Tilted Dashboard Mockup */}
          <div className="w-full h-full glass-panel rounded-3xl animate-float-hero shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border-t border-l border-white/20 relative overflow-hidden flex flex-col">
            {/* Mockup Header */}
            <div className="h-12 bg-black/40 border-b border-white/10 flex items-center px-6 gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="mx-auto flex items-center gap-2 px-3 py-1 bg-white/5 rounded-md text-xs text-gray-400 font-mono">
                <Lock size={12} /> app.codeguard.ai/compare
              </div>
            </div>
            
            {/* Mockup Body */}
            <div className="flex-1 p-8 flex gap-6 bg-gradient-to-br from-[#0a0a0f] to-[#12121a]">
              {/* Fake Sidebar */}
              <div className="w-48 hidden lg:flex flex-col gap-4">
                <div className="h-8 bg-white/5 rounded-lg w-full mb-4"></div>
                {[1,2,3,4,5].map(i => <div key={i} className="h-8 bg-white/5 rounded-lg w-3/4"></div>)}
              </div>
              
              {/* Fake Comparison View */}
              <div className="flex-1 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <div className="h-10 bg-white/10 rounded-lg w-64"></div>
                  <div className="h-10 bg-pink-600/80 rounded-lg w-32 shadow-[0_0_15px_rgba(236,72,153,0.5)]"></div>
                </div>
                
                <div className="flex-1 flex gap-4">
                  <div className="flex-1 glass-panel rounded-xl p-4 border border-white/10 relative">
                     <div className="h-4 bg-white/10 rounded w-1/3 mb-6"></div>
                     <div className="space-y-3">
                       <div className="h-3 bg-white/20 rounded w-3/4"></div>
                       <div className="h-3 bg-white/10 rounded w-1/2 ml-4"></div>
                       <div className="h-3 bg-white/10 rounded w-5/6 ml-4"></div>
                       <div className="h-3 bg-pink-500/40 rounded w-2/3 ml-8"></div>
                       <div className="h-3 bg-pink-500/40 rounded w-3/4 ml-8"></div>
                     </div>
                  </div>
                  <div className="flex-1 glass-panel rounded-xl p-4 border border-white/10">
                     <div className="h-4 bg-white/10 rounded w-1/3 mb-6"></div>
                     <div className="space-y-3">
                       <div className="h-3 bg-white/20 rounded w-3/4"></div>
                       <div className="h-3 bg-white/10 rounded w-1/2 ml-4"></div>
                       <div className="h-3 bg-white/10 rounded w-5/6 ml-4"></div>
                       <div className="h-3 bg-pink-500/40 rounded w-1/2 ml-8"></div>
                       <div className="h-3 bg-pink-500/40 rounded w-5/6 ml-8"></div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer / Trust Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-12 mt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 glass-panel rounded-t-3xl">
        <div className="flex items-center gap-4">
          <Zap className="text-yellow-400 w-5 h-5" />
          <p className="text-sm text-gray-400 font-medium">Trusted by top 500 universities worldwide.</p>
        </div>
        <div className="flex gap-8 text-sm font-medium text-gray-500">
          <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer transition-colors">System Status</span>
        </div>
      </div>
    </div>
  );
}
