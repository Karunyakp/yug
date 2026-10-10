import { ArrowRight, BadgeCheck, BrainCircuit, Gauge, Layers3, ShieldCheck, Sparkles, Zap } from 'lucide-react';

const featureCards = [
  {
    icon: <BrainCircuit className="w-5 h-5 text-pink-300" />,
    title: 'AI-first code integrity engine',
    text: 'Compares code structure, behavior patterns, and similarity signals across assignments in real time to catch suspicious work early.',
  },
  {
    icon: <Gauge className="w-5 h-5 text-emerald-300" />,
    title: 'Lightning-fast review loops',
    text: 'Turns raw code comparisons into explainable evidence, highlighting exactly where similarities appear and why they matter.',
  },
  {
    icon: <Layers3 className="w-5 h-5 text-cyan-300" />,
    title: 'Academic workflow, not just detection',
    text: 'Designed for professors and TA teams with dashboards for submissions, review queues, analytics, and institutional reporting.',
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-violet-300" />,
    title: 'Trustworthy and explainable',
    text: 'Every match is surfaced with context, confidence scoring, and review-ready summaries so staff can act confidently.',
  },
];

const differentiators = [
  'Multi-layered similarity scoring across syntax, structure, and logic patterns.',
  'Instant review pipeline for faculty instead of manual code inspection overhead.',
  'Built for educational institutions, labs, and hackathons with a polished admin UX.',
  'Actionable analytics that show risk clusters, trends, and at-risk batches in one screen.',
];

const roadmap = [
  { name: 'Submission intake', value: '01' },
  { name: 'AI comparison', value: '02' },
  { name: 'Risk scoring', value: '03' },
  { name: 'Faculty review', value: '04' },
];

export default function Features() {
  return (
    <div className="space-y-8 pb-12">
      <div className="bg-gradient-to-r from-pink-600/20 via-violet-600/10 to-transparent rounded-3xl border border-pink-500/20 p-6 md:p-8">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/20 bg-pink-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-pink-200">
              <Sparkles className="w-3.5 h-3.5" />
              USP: AI Code Integrity Studio
            </div>
            <h1 className="mt-4 text-3xl md:text-5xl font-black text-white leading-tight">
              The platform that turns plagiarism detection into academic trust.
            </h1>
            <p className="mt-4 text-gray-300 text-base md:text-lg max-w-xl leading-relaxed">
              CodeGuard AI helps institutions catch suspicious coding patterns, surface review-ready evidence, and keep learning outcomes fair — all in one elegant workflow.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="bg-pink-600 hover:bg-pink-500 text-white rounded-full px-5 py-2.5 font-medium transition-colors">
                Demo workflow
              </button>
              <button className="border border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-full px-5 py-2.5 font-medium transition-colors">
                See analytics
              </button>
            </div>
          </div>

          <div className="w-full max-w-md bg-[#111118] border border-white/5 rounded-2xl p-5 shadow-2xl shadow-pink-900/10">
            <div className="flex items-center justify-between text-sm text-gray-300">
              <span className="font-medium">Review confidence</span>
              <span className="text-pink-300 font-semibold">94%</span>
            </div>
            <div className="mt-4 h-2.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-400" />
            </div>

            <div className="mt-6 space-y-4">
              {roadmap.map((step) => (
                <div key={step.name} className="flex items-center justify-between rounded-xl bg-white/3 border border-white/5 px-3 py-2">
                  <span className="text-white font-medium text-sm">{step.name}</span>
                  <span className="text-xs text-pink-200 bg-pink-500/10 px-2 py-1 rounded-full">{step.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {featureCards.map((feature) => (
          <div key={feature.title} className="bg-[#1a1a24] border border-white/5 rounded-2xl p-5">
            <div className="bg-[#111118] border border-white/5 rounded-xl p-2.5 w-fit mb-4">{feature.icon}</div>
            <h2 className="text-white text-lg font-semibold">{feature.title}</h2>
            <p className="mt-3 text-gray-400 text-sm leading-relaxed">{feature.text}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="bg-[#1a1a24] rounded-2xl border border-white/5 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-pink-300" />
            <h2 className="text-white text-xl font-semibold">Why this wins a hackathon</h2>
          </div>

          <div className="space-y-4">
            {differentiators.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl bg-[#111118] border border-white/5 px-4 py-3">
                <BadgeCheck className="w-5 h-5 text-emerald-400 mt-0.5" />
                <p className="text-gray-300 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1a1a24] rounded-2xl border border-white/5 p-6">
          <h2 className="text-white text-xl font-semibold mb-4">Impact snapshot</h2>
          <div className="space-y-4">
            <div className="bg-[#111118] border border-white/5 rounded-xl p-4">
              <p className="text-gray-400 text-xs uppercase tracking-wider">Time saved</p>
              <p className="mt-2 text-3xl font-bold text-white">8x</p>
              <p className="text-sm text-gray-400 mt-1">faster review workflows for faculty teams.</p>
            </div>
            <div className="bg-[#111118] border border-white/5 rounded-xl p-4">
              <p className="text-gray-400 text-xs uppercase tracking-wider">Risk detection</p>
              <p className="mt-2 text-3xl font-bold text-white">94%</p>
              <p className="text-sm text-gray-400 mt-1">confidence in suspicious code clustering.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1a1a24] rounded-2xl border border-white/5 p-6 md:p-8">
        <h2 className="text-white text-2xl font-bold">The product story</h2>
        <p className="mt-3 text-gray-400 max-w-3xl leading-relaxed">
          We did not build another static plagiarism checker. We built a decision-support system for academic integrity: it combines intelligent code similarity analysis, reviewer-first analytics, and elegant institutional reporting into a single experience that feels premium, credible, and hackathon-ready.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-pink-500/20 bg-pink-500/10 px-3 py-1.5 text-pink-200 text-sm">Faster review</span>
          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 text-cyan-200 text-sm">Explainable AI</span>
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-emerald-200 text-sm">Institution-grade UX</span>
        </div>

        <button className="mt-8 inline-flex items-center gap-2 bg-white text-black rounded-full px-5 py-2.5 font-medium hover:bg-gray-200 transition-colors">
          Pitch this product
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
