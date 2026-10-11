import { ArrowRight, BadgeCheck, BrainCircuit, Gauge, Layers3, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const featureCards = [
  {
    icon: <BrainCircuit className="w-5 h-5 text-[#B96F52]" />,
    title: 'AI-first code integrity engine',
    text: 'Compares code structure, behavior patterns, and similarity signals across assignments in real time to catch suspicious work early.',
  },
  {
    icon: <Gauge className="w-5 h-5 text-[#174C3C]" />,
    title: 'Lightning-fast review loops',
    text: 'Turns raw code comparisons into explainable evidence, highlighting exactly where similarities appear and why they matter.',
  },
  {
    icon: <Layers3 className="w-5 h-5 text-[#3A7CA5]" />,
    title: 'Academic workflow, not just detection',
    text: 'Designed for professors and TA teams with dashboards for submissions, review queues, analytics, and institutional reporting.',
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-[#6B4FA0]" />,
    title: 'Trustworthy and explainable',
    text: 'Every match is surfaced with context, confidence scoring, and review-ready summaries so staff can act confidently.',
  },
];

const differentiators = [
  'Multi-layered similarity scoring across syntax, structure, and logic patterns.',
  'Instant review pipeline for faculty instead of manual code inspection overhead.',
  'Built for educational institutions, computer science labs, and universities with a polished admin UX.',
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
      <div className="bg-gradient-to-r from-[#174C3C]/10 via-[#E4F1E9] to-[#F7F6F0] rounded-3xl border border-[#C3E4CF] p-6 md:p-8">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#174C3C]/20 bg-[#174C3C]/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#174C3C]">
              <Sparkles className="w-3.5 h-3.5" />
              USP: AI Code Integrity Studio
            </div>
            <h1 className="mt-4 text-3xl md:text-5xl font-black text-[#202923] leading-tight">
              The platform that turns plagiarism detection into academic trust.
            </h1>
            <p className="mt-4 text-[#707A72] text-base md:text-lg max-w-xl leading-relaxed">
              CodeGuard AI helps institutions catch suspicious coding patterns, surface review-ready evidence, and keep learning outcomes fair — all in one elegant workflow.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/dashboard" className="bg-[#174C3C] hover:bg-[#10382D] text-white rounded-full px-5 py-2.5 font-medium transition-colors text-center">
                Demo workflow
              </Link>
              <Link to="/reports" className="border border-[#E3E7E0] bg-white hover:bg-[#F7F6F0] text-[#202923] rounded-full px-5 py-2.5 font-medium transition-colors text-center">
                See analytics
              </Link>
            </div>
          </div>

          <div className="w-full max-w-md bg-white border border-[#E3E7E0] rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-sm text-[#707A72]">
              <span className="font-medium">Review confidence</span>
              <span className="text-[#174C3C] font-semibold">94%</span>
            </div>
            <div className="mt-4 h-2.5 rounded-full bg-[#E3E7E0] overflow-hidden">
              <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-[#174C3C] via-[#6B4FA0] to-[#3A7CA5]" />
            </div>

            <div className="mt-6 space-y-4">
              {roadmap.map((step) => (
                <div key={step.name} className="flex items-center justify-between rounded-xl bg-[#F7F6F0] border border-[#E3E7E0] px-3 py-2">
                  <span className="text-[#202923] font-medium text-sm">{step.name}</span>
                  <span className="text-xs text-[#174C3C] bg-[#E4F1E9] px-2 py-1 rounded-full">{step.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {featureCards.map((feature) => (
          <div key={feature.title} className="bg-white border border-[#E3E7E0] rounded-2xl p-5">
            <div className="bg-[#F7F6F0] border border-[#E3E7E0] rounded-xl p-2.5 w-fit mb-4">{feature.icon}</div>
            <h2 className="text-[#202923] text-lg font-semibold">{feature.title}</h2>
            <p className="mt-3 text-[#707A72] text-sm leading-relaxed">{feature.text}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="bg-white rounded-2xl border border-[#E3E7E0] p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-[#B96F52]" />
            <h2 className="text-[#202923] text-xl font-semibold">Why institutions choose CodeGuard</h2>
          </div>

          <div className="space-y-4">
            {differentiators.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl bg-[#F7F6F0] border border-[#E3E7E0] px-4 py-3">
                <BadgeCheck className="w-5 h-5 text-[#174C3C] mt-0.5" />
                <p className="text-[#707A72] leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E3E7E0] p-6">
          <h2 className="text-[#202923] text-xl font-semibold mb-4">Impact snapshot</h2>
          <div className="space-y-4">
            <div className="bg-[#F7F6F0] border border-[#E3E7E0] rounded-xl p-4">
              <p className="text-[#707A72] text-xs uppercase tracking-wider">Time saved</p>
              <p className="mt-2 text-3xl font-bold text-[#202923]">8x</p>
              <p className="text-sm text-[#707A72] mt-1">faster review workflows for faculty teams.</p>
            </div>
            <div className="bg-[#F7F6F0] border border-[#E3E7E0] rounded-xl p-4">
              <p className="text-[#707A72] text-xs uppercase tracking-wider">Risk detection</p>
              <p className="mt-2 text-3xl font-bold text-[#202923]">94%</p>
              <p className="text-sm text-[#707A72] mt-1">confidence in suspicious code clustering.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E3E7E0] p-6 md:p-8">
        <h2 className="text-[#202923] text-2xl font-bold">The product story</h2>
        <p className="mt-3 text-[#707A72] max-w-3xl leading-relaxed">
          We did not build another static plagiarism checker. We built a decision-support system for academic integrity: it combines intelligent code similarity analysis, reviewer-first analytics, and elegant institutional reporting into a single experience that feels premium, credible, and enterprise-ready.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-[#B96F52]/20 bg-[#B96F52]/10 px-3 py-1.5 text-[#B96F52] text-sm">Faster review</span>
          <span className="rounded-full border border-[#3A7CA5]/20 bg-[#3A7CA5]/10 px-3 py-1.5 text-[#3A7CA5] text-sm">Explainable AI</span>
          <span className="rounded-full border border-[#174C3C]/20 bg-[#174C3C]/10 px-3 py-1.5 text-[#174C3C] text-sm">Institution-grade UX</span>
        </div>

        <Link to="/dashboard" className="mt-8 inline-flex items-center justify-center gap-2 bg-[#174C3C] text-white rounded-full px-5 py-2.5 font-medium hover:bg-[#10382D] transition-colors">
          Explore Platform
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
