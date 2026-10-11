import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Upload, ScanSearch, FileCheck2, Sparkles, Download, Mail, UsersRound, Code2 } from 'lucide-react';

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
              <Link to="/features" className="font-sans text-[13.5px] font-medium text-[#6B6B78] transition hover:text-[#141413]">All Features</Link>
              <a href="#how" className="font-sans text-[13.5px] font-medium text-[#6B6B78] transition hover:text-[#141413]">How it works</a>
              <a href="#approach" className="font-sans text-[13.5px] font-medium text-[#6B6B78] transition hover:text-[#141413]">Our approach</a>
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
            A browser-based code review workspace for comparing submissions, organizing review, and exploring optional AI assistance. Review indicators are designed to support—not replace—educator judgment.
          </p>
          
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Link to="/signup" className="group inline-flex items-center gap-2 rounded-full bg-[#141413] px-8 py-4 font-sans text-[15px] font-semibold text-white transition hover:bg-black hover:shadow-lg hover:shadow-black/10">
              Start Free Trial
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/features" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-sans text-[15px] font-medium text-[#141413] ring-1 ring-[#E8E3DB] transition hover:bg-[#F5F5F5] hover:shadow-sm">
              Explore all features <ArrowRight className="h-4 w-4" />
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
                <span className="ml-4 text-xs font-medium text-[#9A958E] tracking-wide">Sample analysis • Human review required</span>
              </div>
              <div className="flex gap-2">
                <span className="rounded-full bg-[#F0EBE3] px-3 py-1 text-[11px] font-bold tracking-wide text-[#6B6B78]">DEMO DATA</span>
                <span className="rounded-full bg-[#EDE8FF] px-3 py-1 text-[11px] font-bold tracking-wide text-[#7C5CFC]">DEMO OVERLAP 87%</span>
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
                    <h4 className="text-[13px] font-bold text-[#141413]">Similar structure in this sample</h4>
                    <p className="text-xs text-[#6B6B78] mt-0.5">Common assignment requirements can produce similar solutions. This overlap is not evidence of misconduct.</p>
                  </div>
                  <div className="flex gap-2">
                    <Link to="/compare" className="px-4 py-1.5 bg-[#141413] text-white text-xs font-semibold rounded-full hover:bg-black">View comparison details</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* No institutional endorsements are claimed; this is a demo product. */}
      <section className="border-y border-[#E8E3DB] bg-white py-6">
        <p className="mx-auto max-w-[1240px] px-5 text-center text-sm font-medium text-[#6B6B78]">
          Built to support transparent, human-led code review in computer science education.
        </p>
      </section>

      {/* Product features */}
      <section id="features" className="bg-white py-24">
        <div className="mx-auto max-w-[1240px] px-5">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="mb-6 inline-block rounded-full bg-[#EDE8FF] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#7C5CFC]">Features</span>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">A clearer workflow for code review.</h2>
            <p className="mt-4 text-lg leading-relaxed text-[#6B6B78]">Practical tools for comparing submissions, organizing review, and communicating with care.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-3xl border border-[#E8E3DB] bg-[#FCFBF8] p-7">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#EDE8FF] text-[#6549D8]"><Code2 size={22} /></div>
              <h3 className="font-serif text-xl">Side-by-side comparisons</h3>
              <p className="mt-2 text-sm leading-6 text-[#6B6B78]">Compare code submissions and review matched sections alongside the original context.</p>
            </article>
            <article className="rounded-3xl border border-[#E8E3DB] bg-[#FCFBF8] p-7">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E4F1E9] text-[#174C3C]"><Sparkles size={22} /></div>
              <h3 className="font-serif text-xl">Optional Gemini insights</h3>
              <p className="mt-2 text-sm leading-6 text-[#6B6B78]">Request AI-generated observations to support review. Results are indicators, not proof, and require human judgment.</p>
            </article>
            <article className="rounded-3xl border border-[#E8E3DB] bg-[#FCFBF8] p-7">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#FCF6F0] text-[#9B5C37]"><Download size={22} /></div>
              <h3 className="font-serif text-xl">Exportable reports</h3>
              <p className="mt-2 text-sm leading-6 text-[#6B6B78]">Download report data as CSV or use your browser’s print dialog to save a PDF.</p>
            </article>
            <article className="rounded-3xl border border-[#E8E3DB] bg-[#FCFBF8] p-7">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#EDE8FF] text-[#6549D8]"><UsersRound size={22} /></div>
              <h3 className="font-serif text-xl">Organized review workspace</h3>
              <p className="mt-2 text-sm leading-6 text-[#6B6B78]">Keep submissions, assignments, projects, and review activity together in one dashboard.</p>
            </article>
            <article className="rounded-3xl border border-[#E8E3DB] bg-[#FCFBF8] p-7">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E4F1E9] text-[#174C3C]"><Mail size={22} /></div>
              <h3 className="font-serif text-xl">Instructor email composer</h3>
              <p className="mt-2 text-sm leading-6 text-[#6B6B78]">Draft and send review communications through the configured EmailJS service.</p>
            </article>
            <article className="rounded-3xl border border-[#E8E3DB] bg-[#FCFBF8] p-7">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#FCF6F0] text-[#9B5C37]"><FileCheck2 size={22} /></div>
              <h3 className="font-serif text-xl">Human-led decisions</h3>
              <p className="mt-2 text-sm leading-6 text-[#6B6B78]">Review evidence in context. Similarity scores and AI outputs should never decide a case on their own.</p>
            </article>
          </div>
          <div className="mt-10 text-center">
            <Link to="/features" className="inline-flex items-center gap-2 rounded-full border border-[#D9DED8] bg-white px-5 py-3 text-sm font-semibold text-[#174C3C] transition hover:border-[#174C3C]">
              See the complete feature guide <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature section */}
      <section id="approach" className="py-24 bg-[#FCFBF8]">
        <div className="mx-auto max-w-[1240px] px-5">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-4">
              Review code with context.<br/>
              <span className="text-[#7C5CFC] italic">Keep people in the decision.</span>
            </h2>
            <p className="text-[#6B6B78] text-lg">CodeGuard AI is a frontend demonstration of an educator-focused review workflow. Similarity signals can be incomplete or wrong, so every result needs careful human review.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-[#E8E3DB] shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold tracking-widest text-[#9A958E]">01</span>
                <span className="bg-[#FCF6F0] text-[#8A7260] px-3 py-1 rounded-full text-xs font-semibold">Compare</span>
              </div>
              <h3 className="font-serif text-2xl mb-3">Inspect code side by side</h3>
              <p className="text-[#6B6B78] leading-relaxed">Use the comparison workspace to review code samples, similarity metrics, and the context behind the findings.</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-[#E8E3DB] shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold tracking-widest text-[#9A958E]">02</span>
                <span className="bg-[#FCF6F0] text-[#8A7260] px-3 py-1 rounded-full text-xs font-semibold">Optional AI</span>
              </div>
              <h3 className="font-serif text-2xl mb-3">Use AI as an assistant</h3>
              <p className="text-[#6B6B78] leading-relaxed">When configured, Gemini can add observations. If it is unavailable, the app labels local fallback findings clearly.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#E8E3DB] shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold tracking-widest text-[#9A958E]">03</span>
                <span className="bg-[#FCF6F0] text-[#8A7260] px-3 py-1 rounded-full text-xs font-semibold">Human review</span>
              </div>
              <h3 className="font-serif text-2xl mb-3">Keep decisions accountable</h3>
              <p className="text-[#6B6B78] leading-relaxed">Treat scores and AI output as limited indicators—not proof—and make decisions through your own academic process.</p>
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
              <h3 className="font-serif text-2xl mb-3">Open a review workspace</h3>
              <p className="text-[#6B6B78] leading-relaxed">Explore the sample review screens or enter code in the comparison workspace to try the analysis flow.</p>
            </div>

            <div>
              <div className="w-12 h-12 bg-white border border-[#E8E3DB] rounded-full flex items-center justify-center mb-6 shadow-sm mx-auto md:mx-0">
                <ScanSearch className="w-5 h-5 text-[#141413]" />
              </div>
              <h4 className="text-xs font-bold text-[#7C5CFC] mb-2">02</h4>
              <h3 className="font-serif text-2xl mb-3">Compare and inspect</h3>
              <p className="text-[#6B6B78] leading-relaxed">Review locally calculated similarity indicators, with optional Gemini observations when the AI service is configured.</p>
            </div>

            <div>
              <div className="w-12 h-12 bg-white border border-[#E8E3DB] rounded-full flex items-center justify-center mb-6 shadow-sm mx-auto md:mx-0">
                <FileCheck2 className="w-5 h-5 text-[#141413]" />
              </div>
              <h4 className="text-xs font-bold text-[#7C5CFC] mb-2">03</h4>
              <h3 className="font-serif text-2xl mb-3">Review and export</h3>
              <p className="text-[#6B6B78] leading-relaxed">Interpret findings yourself, then export available report data as CSV or print a report to PDF.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-[#E8E3DB] bg-[#F7F6F0] px-5 py-10 text-center">
         <p className="font-sans text-sm text-[#6B6B78]">© 2026 CodeGuard AI. A human-led academic review workspace.</p>
         <nav aria-label="Legal" className="mt-4 flex justify-center gap-5 font-sans text-xs text-[#6B6B78]">
           <Link to="/privacy" className="transition hover:text-[#174C3C]">Privacy Policy</Link>
           <Link to="/terms" className="transition hover:text-[#174C3C]">Terms and Conditions</Link>
         </nav>
      </footer>
    </div>
  );
}
