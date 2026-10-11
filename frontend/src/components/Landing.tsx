import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Upload, ScanSearch, FileCheck2, Sparkles, Download, Mail, UsersRound, Code2 } from 'lucide-react';
import { PolicyLink } from './PublicPages';

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
              Create account
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/features" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-sans text-[15px] font-medium text-[#141413] ring-1 ring-[#E8E3DB] transition hover:bg-[#F5F5F5] hover:shadow-sm">
              Explore all features <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-3xl px-5 text-center">
          <p className="font-sans text-sm leading-6 text-[#6B6B78]">
            Start with your own code. Comparison results are generated only from the code you provide.
          </p>
        </div>
      </main>

      {/* No institutional endorsements are claimed. */}
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
              <p className="mt-2 text-sm leading-6 text-[#6B6B78]">Print comparison results or export account information from your workspace.</p>
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
            <p className="text-[#6B6B78] text-lg">An educator-focused review workspace. Similarity signals can be incomplete or wrong, so every result needs careful human review.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-[#E8E3DB] shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold tracking-widest text-[#9A958E]">01</span>
                <span className="bg-[#FCF6F0] text-[#8A7260] px-3 py-1 rounded-full text-xs font-semibold">Compare</span>
              </div>
              <h3 className="font-serif text-2xl mb-3">Inspect code side by side</h3>
              <p className="text-[#6B6B78] leading-relaxed">Compare code you provide, inspect similarity metrics, and review the context behind the findings.</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-[#E8E3DB] shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold tracking-widest text-[#9A958E]">02</span>
                <span className="bg-[#FCF6F0] text-[#8A7260] px-3 py-1 rounded-full text-xs font-semibold">Optional AI</span>
              </div>
              <h3 className="font-serif text-2xl mb-3">Use AI as an assistant</h3>
              <p className="text-[#6B6B78] leading-relaxed">When configured and authorized, Gemini can add observations. Local analysis remains available without AI.</p>
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
              <p className="text-[#6B6B78] leading-relaxed">Open a review workspace and enter the code you are authorized to analyze.</p>
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
              <p className="text-[#6B6B78] leading-relaxed">Interpret findings yourself, then print comparison results or export available account information.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-[#E8E3DB] bg-[#F7F6F0] px-5 py-10 text-center">
         <p className="font-sans text-sm text-[#6B6B78]">© 2026 CodeGuard AI. A human-led academic review workspace.</p>
         <nav aria-label="Legal" className="mt-4 flex justify-center gap-5 font-sans text-xs text-[#6B6B78]">
           <PolicyLink to="/privacy" className="transition hover:text-[#174C3C]">Privacy Policy</PolicyLink>
           <PolicyLink to="/terms" className="transition hover:text-[#174C3C]">Terms and Conditions</PolicyLink>
         </nav>
      </footer>
    </div>
  );
}
