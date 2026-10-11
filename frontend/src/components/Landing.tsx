import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, Upload, ScanSearch, FileCheck2 } from 'lucide-react';

export default function Landing() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#FCFBF8] text-[#141413] selection:bg-[#EDE8FF] selection:text-[#3B2B7A]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .font-serif { font-family: 'Fraunces', serif; letter-spacing: -0.01em; }
        .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
        .bg-paper {
          background-image: 
            radial-gradient(at 20% 10%, rgba(124,92,252,0.08) 0, transparent 50%),
            radial-gradient(at 90% 30%, rgba(255,214,150,0.18) 0, transparent 40%);
        }
        .report-tilt {
          transform: perspective(2000px) rotateX(6deg) rotateY(-1.5deg);
          transform-origin: center bottom;
        }
      `}</style>

      {/* Header */}
      <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-[#FCFBF8]/90 backdrop-blur-xl border-b border-[#E8E3DB]' : 'bg-transparent'}`}>
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 md:px-8">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2.5">
              <img src="/logo.jpg" alt="CodeGuard" className="h-8 w-8 rounded-full border border-[#E8E3DB] shadow-sm" />
              <span className="font-sans text-[15px] font-semibold tracking-tight">CodeGuard AI</span>
            </div>
            <nav className="hidden items-center gap-7 md:flex">
              <a href="#how" className="font-sans text-[13.5px] font-medium text-[#6B6B78] transition hover:text-[#141413]">How it works</a>
              <a href="#features" className="font-sans text-[13.5px] font-medium text-[#6B6B78] transition hover:text-[#141413]">Features</a>
              <a href="#departments" className="font-sans text-[13.5px] font-medium text-[#6B6B78] transition hover:text-[#141413]">For Departments</a>
              <a href="#pricing" className="font-sans text-[13.5px] font-medium text-[#6B6B78] transition hover:text-[#141413]">Pricing</a>
            </nav>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <Link to="/login" className="font-sans text-[13.5px] font-medium text-[#141413] hover:opacity-70">Sign In</Link>
            <Link to="/signup" className="rounded-full bg-[#141413] px-5 py-2 font-sans text-[13.5px] font-semibold text-white transition hover:bg-black">Get Started</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="bg-paper pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto flex max-w-[820px] flex-col items-center text-center px-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E8E3DB] bg-white px-4 py-1.5 shadow-sm mb-8">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#7C5CFC]"></span>
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-[#6B6B78]">The new standard for academic integrity</span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl font-semibold leading-[0.95] tracking-tight mb-6">
            <span className="block text-[#141413]">Protect originality.</span>
            <span className="block bg-gradient-to-r from-[#7C5CFC] to-[#B69CFF] bg-clip-text text-transparent mt-2">Empower educators.</span>
          </h1>
          
          <p className="max-w-2xl font-sans text-lg text-[#6B6B78] mb-10 leading-relaxed">
            Editorial-grade plagiarism detection built specifically for computer science departments. Advanced AST analysis meets consumer-app polish.
          </p>
          
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Link to="/signup" className="group inline-flex items-center gap-2 rounded-full bg-[#141413] px-8 py-4 font-sans text-[15px] font-semibold text-white transition hover:bg-black hover:shadow-lg hover:shadow-black/10">
              Start Free Trial
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/compare" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-sans text-[15px] font-medium text-[#141413] ring-1 ring-[#E8E3DB] transition hover:bg-[#F5F5F5] hover:shadow-sm">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#141413]">
                <Play className="h-3 w-3 ml-0.5 fill-white text-white" />
              </span>
              Watch Live Demo
            </Link>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mx-auto w-full max-w-[1000px] px-5 mt-20">
          <div className="report-tilt group relative overflow-hidden rounded-[20px] border border-[#E8E3DB] bg-white shadow-[0_32px_80px_-16px_rgba(20,20,20,0.18)]">
            <div className="flex items-center justify-between border-b border-[#F0EBE3] px-6 py-4 bg-[#FCFBF8]">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#FF5F56]"></span>
                  <span className="h-3 w-3 rounded-full bg-[#FFBD2E]"></span>
                  <span className="h-3 w-3 rounded-full bg-[#27CA40]"></span>
                </div>
                <span className="ml-4 text-xs font-medium text-[#9A958E] tracking-wide">CS 101 — Assignment 3 • Analysis complete • 2.4s</span>
              </div>
              <div className="flex gap-2">
                <span className="rounded-full bg-[#141413] px-3 py-1 text-[11px] font-bold tracking-wide text-white">FERPA SAFE</span>
                <span className="rounded-full bg-[#EDE8FF] px-3 py-1 text-[11px] font-bold tracking-wide text-[#7C5CFC]">AST MATCH 87%</span>
              </div>
            </div>
            
            <div className="flex h-[400px]">
              {/* Sidebar */}
              <div className="w-[280px] border-r border-[#F0EBE3] bg-[#FCFBF8] p-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#9A958E] mb-4">Submissions</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2.5 shadow-sm ring-1 ring-[#E8E3DB]">
                    <span className="text-[13px] font-semibold text-[#141413]">a.smith_hw3.py</span>
                    <span className="rounded-full bg-[#FFE4E4] px-2 py-0.5 text-[10px] font-bold text-[#C03A3A]">87%</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-white transition-colors">
                    <span className="text-[13px] font-medium text-[#6B6B78]">j.doe_hw3.py</span>
                    <span className="rounded-full bg-[#FFE4E4] px-2 py-0.5 text-[10px] font-bold text-[#C03A3A]">87%</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-white transition-colors">
                    <span className="text-[13px] font-medium text-[#6B6B78]">r.kumar_hw3.py</span>
                    <span className="rounded-full bg-[#EDE8FF] px-2 py-0.5 text-[10px] font-bold text-[#7C5CFC]">12%</span>
                  </div>
                </div>
              </div>
              
              {/* Code Compare */}
              <div className="flex-1 flex flex-col">
                <div className="flex flex-1 divide-x divide-[#F0EBE3] overflow-hidden">
                  <div className="flex-1 bg-white flex flex-col">
                    <div className="border-b border-[#F0EBE3] bg-[#FCFBF8]/50 px-4 py-2 flex justify-between items-center">
                      <span className="text-xs font-semibold text-[#6B6B78]">a.smith_hw3.py</span>
                      <div className="w-2 h-2 rounded-full bg-[#7C5CFC]"></div>
                    </div>
                    <div className="p-4 font-mono text-[13px] text-[#2A2A2E] leading-relaxed">
                      <div className="text-[#9A958E]">01  <span className="text-[#2A2A2E]">def solve(n, k):</span></div>
                      <div className="bg-[#EDE8FF]/60 border-l-2 border-[#7C5CFC] -mx-4 px-4 text-[#9A958E]">02  <span className="text-[#3B2B7A] font-semibold">    dp = [0]*(n+1)</span></div>
                      <div className="bg-[#EDE8FF]/60 border-l-2 border-[#7C5CFC] -mx-4 px-4 text-[#9A958E]">03  <span className="text-[#3B2B7A] font-semibold">    dp[0]=1</span></div>
                      <div className="text-[#9A958E]">04  <span className="text-[#2A2A2E]">    for i in range(1,n+1):</span></div>
                      <div className="bg-[#EDE8FF]/60 border-l-2 border-[#7C5CFC] -mx-4 px-4 text-[#9A958E]">05  <span className="text-[#3B2B7A] font-semibold">        for j in range(k):</span></div>
                      <div className="bg-[#EDE8FF]/60 border-l-2 border-[#7C5CFC] -mx-4 px-4 text-[#9A958E]">06  <span className="text-[#3B2B7A] font-semibold">            dp[i]+=dp[i-j-1]</span></div>
                    </div>
                  </div>
                  <div className="flex-1 bg-white flex flex-col">
                    <div className="border-b border-[#F0EBE3] bg-[#FCFBF8]/50 px-4 py-2 flex justify-between items-center">
                      <span className="text-xs font-semibold text-[#6B6B78]">j.doe_hw3.py</span>
                    </div>
                    <div className="p-4 font-mono text-[13px] text-[#2A2A2E] leading-relaxed">
                      <div className="text-[#9A958E]">01  <span className="text-[#2A2A2E]">def countways(total, limit):</span></div>
                      <div className="bg-[#EDE8FF]/60 border-l-2 border-[#7C5CFC] -mx-4 px-4 text-[#9A958E]">02  <span className="text-[#3B2B7A] font-semibold">    memo = [0]*(total+1)</span></div>
                      <div className="bg-[#EDE8FF]/60 border-l-2 border-[#7C5CFC] -mx-4 px-4 text-[#9A958E]">03  <span className="text-[#3B2B7A] font-semibold">    memo[0]=1</span></div>
                      <div className="text-[#9A958E]">04  <span className="text-[#2A2A2E]">    for x in range(1,total+1):</span></div>
                      <div className="bg-[#EDE8FF]/60 border-l-2 border-[#7C5CFC] -mx-4 px-4 text-[#9A958E]">05  <span className="text-[#3B2B7A] font-semibold">        for y in range(limit):</span></div>
                      <div className="bg-[#EDE8FF]/60 border-l-2 border-[#7C5CFC] -mx-4 px-4 text-[#9A958E]">06  <span className="text-[#3B2B7A] font-semibold">            memo[x]+=memo[x-y-1]</span></div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-[#F0EBE3] bg-[#FCFBF8] p-4 flex justify-between items-center">
                  <div>
                    <h4 className="text-[13px] font-bold text-[#141413]">AI pattern detected + AST logic match</h4>
                    <p className="text-xs text-[#6B6B78] mt-0.5">Same control flow, renamed identifiers, stripped comments. Not string match.</p>
                  </div>
                  <div className="flex gap-2">
                    <Link to="/compare" className="px-4 py-1.5 bg-[#141413] text-white text-xs font-semibold rounded-full hover:bg-black">View defensible report</Link>
                    <button className="px-4 py-1.5 bg-white text-[#141413] border border-[#E8E3DB] text-xs font-semibold rounded-full hover:bg-gray-50">Dismiss</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Logos */}
      <section className="border-y border-[#E8E3DB] bg-white py-8">
        <div className="mx-auto max-w-[1240px] px-5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[#9A958E]">Trusted by CS departments at</p>
          <div className="flex gap-8 flex-wrap justify-center font-serif text-xl text-[#9A958E] opacity-80">
            <span>MIT</span>
            <span>Stanford</span>
            <span>IIT Bombay</span>
            <span>NUS</span>
            <span>ETH Zürich</span>
            <span>U of T</span>
          </div>
        </div>
      </section>

      {/* Feature section */}
      <section id="departments" className="py-24 bg-[#FCFBF8]">
        <div className="mx-auto max-w-[1240px] px-5">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-4">
              AI made copying easy.<br/>
              <span className="text-[#7C5CFC] italic">We made catching it humane.</span>
            </h2>
            <p className="text-[#6B6B78] text-lg">Legacy tools were built for essays, not abstract syntax trees. They punish good pedagogy with noise and false alarms.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-[#E8E3DB] shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold tracking-widest text-[#9A958E]">01</span>
                <span className="bg-[#FCF6F0] text-[#8A7260] px-3 py-1 rounded-full text-xs font-semibold">Moss: 12% similarity</span>
              </div>
              <h3 className="font-serif text-2xl mb-3">String matching fails</h3>
              <p className="text-[#6B6B78] leading-relaxed">Renaming variables, reordering loops, translating Python to Java — old tools see different text. Same logic slips through.</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-[#E8E3DB] shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold tracking-widest text-[#9A958E]">02</span>
                <span className="bg-[#FCF6F0] text-[#8A7260] px-3 py-1 rounded-full text-xs font-semibold">Hours lost to appeals</span>
              </div>
              <h3 className="font-serif text-2xl mb-3">False positives hurt trust</h3>
              <p className="text-[#6B6B78] leading-relaxed">Boilerplate, starter code, and common patterns flagged as cheating. Students lose faith, faculty lose time.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#E8E3DB] shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold tracking-widest text-[#9A958E]">03</span>
                <span className="bg-[#FCF6F0] text-[#8A7260] px-3 py-1 rounded-full text-xs font-semibold">Not defensible in review</span>
              </div>
              <h3 className="font-serif text-2xl mb-3">Reports are unreadable</h3>
              <p className="text-[#6B6B78] leading-relaxed">Walls of highlighted text with no defensible logic. No professor wants to start that conversation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps section */}
      <section id="how" className="py-24 bg-white border-t border-[#E8E3DB]">
        <div className="mx-auto max-w-[1240px] px-5">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-[#7C5CFC] uppercase bg-[#EDE8FF] px-4 py-1.5 rounded-full mb-6 inline-block">How it works</span>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">Three steps to defensible<br/>integrity.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-6 left-16 right-16 h-px bg-[#E8E3DB] -z-10"></div>
            
            <div>
              <div className="w-12 h-12 bg-white border border-[#E8E3DB] rounded-full flex items-center justify-center mb-6 shadow-sm mx-auto md:mx-0">
                <Upload className="w-5 h-5 text-[#141413]" />
              </div>
              <h4 className="text-xs font-bold text-[#7C5CFC] mb-2">01</h4>
              <h3 className="font-serif text-2xl mb-3">Upload assignments</h3>
              <p className="text-[#6B6B78] leading-relaxed">Drag a zip, connect GitHub Classroom, or sync Canvas. We dedupe starter code automatically.</p>
            </div>

            <div>
              <div className="w-12 h-12 bg-white border border-[#E8E3DB] rounded-full flex items-center justify-center mb-6 shadow-sm mx-auto md:mx-0">
                <ScanSearch className="w-5 h-5 text-[#141413]" />
              </div>
              <h4 className="text-xs font-bold text-[#7C5CFC] mb-2">02</h4>
              <h3 className="font-serif text-2xl mb-3">AST fingerprinting</h3>
              <p className="text-[#6B6B78] leading-relaxed">We normalize identifiers, strip comments, and build language-agnostic logic graphs. No string matching.</p>
            </div>

            <div>
              <div className="w-12 h-12 bg-white border border-[#E8E3DB] rounded-full flex items-center justify-center mb-6 shadow-sm mx-auto md:mx-0">
                <FileCheck2 className="w-5 h-5 text-[#141413]" />
              </div>
              <h4 className="text-xs font-bold text-[#7C5CFC] mb-2">03</h4>
              <h3 className="font-serif text-2xl mb-3">Get defensible report</h3>
              <p className="text-[#6B6B78] leading-relaxed">Human-readable, side-by-side diffs with pedagogical language. Export to PDF for academic review.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-[#141413] text-white py-12 text-center">
         <p className="text-gray-400 font-sans text-sm">© 2026 CodeGuard AI. The new standard for academic integrity.</p>
      </footer>
    </div>
  );
}
