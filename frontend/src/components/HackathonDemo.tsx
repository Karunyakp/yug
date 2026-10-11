import { useState } from 'react';
import {
  Play,
  CheckCircle2,
  ArrowRight,
  Bot,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    step: 1,
    title: 'Review Flagged Dashboard Case',
    desc: 'Notice an alert for Aarav Sharma vs Rohan Mehta with 92% structural similarity on CS-204.'
  },
  {
    step: 2,
    title: 'Inspect Matching AST Fragments',
    desc: 'Verify normalized AST loops, statement reorderings, and renamed variables side-by-side.'
  },
  {
    step: 3,
    title: 'Examine Cross-Language & Obfuscation Signals',
    desc: 'Observe the Obfuscation Shield detecting variable mutation and loop inversion.'
  },
  {
    step: 4,
    title: 'Consult AI Review Copilot (Gemini 3.8 Flash)',
    desc: 'Request pedagogical viva questions to evaluate student algorithmic comprehension.'
  },
  {
    step: 5,
    title: 'Trace Cohort Collusion Network Graph',
    desc: 'Inspect the cluster graph to see that Vivaan Joshi is also connected in the same ring.'
  },
  {
    step: 6,
    title: 'Record Decision & Export PDF Evidence',
    desc: 'Formally record human reviewer notes and export a defensible academic report.'
  }
];

export default function HackathonDemo() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="space-y-8 pb-16 text-[#202923]">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#174C3C]/10 via-[#E4F1E9] to-[#F7F6F0] border border-[#C3E4CF] rounded-3xl p-6 md:p-8 shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#174C3C] text-white text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles size={13} /> Evaluator Sandbox
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#202923]">
              CodeGuard AI — Guided Evaluation Walkthrough
            </h1>
            <p className="text-[#707A72] text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
              Step through our 6-stage end-to-end workflow designed for computer science faculty and academic review committees. Experience how deterministic AST fingerprinting pairs with Google Gemini 3.8 Flash.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/compare"
              className="px-5 py-3 rounded-2xl bg-[#174C3C] hover:bg-[#10382D] text-white font-semibold text-sm flex items-center gap-2 transition-all shadow-lg shadow-[#174C3C]/15"
            >
              <Play size={16} fill="white" /> Launch Live Diff
            </Link>
          </div>
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        {steps.map((s) => {
          const isActive = currentStep === s.step;
          const isDone = currentStep > s.step;
          return (
            <button
              key={s.step}
              onClick={() => setCurrentStep(s.step)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isActive
                  ? 'bg-[#E4F1E9] border-[#174C3C] shadow-lg shadow-[#174C3C]/10'
                  : isDone
                  ? 'bg-white border-[#C3E4CF] text-[#707A72]'
                  : 'bg-white border-[#E3E7E0] text-[#A3AA9D]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-[#174C3C] text-white' : isDone ? 'bg-[#D4E8DC] text-[#174C3C]' : 'bg-[#E3E7E0] text-[#707A72]'}`}>
                  0{s.step}
                </span>
                {isDone && <CheckCircle2 size={15} className="text-[#174C3C]" />}
              </div>
              <p className={`text-xs font-bold leading-tight ${isActive ? 'text-[#174C3C]' : 'text-[#202923]'}`}>
                {s.title}
              </p>
            </button>
          );
        })}
      </div>

      {/* Interactive Step Preview Panel */}
      <div className="bg-white border border-[#E3E7E0] rounded-3xl p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-[#E3E7E0]">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#174C3C]">Stage 0{currentStep} Focus</span>
            <h2 className="text-2xl font-bold text-[#202923] mt-1">{steps[currentStep - 1].title}</h2>
            <p className="text-sm text-[#707A72] mt-1">{steps[currentStep - 1].desc}</p>
          </div>

          <div className="flex items-center gap-3">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(c => c - 1)}
                className="px-4 py-2 rounded-xl bg-[#F7F6F0] border border-[#E3E7E0] text-xs font-medium text-[#707A72] hover:text-[#202923]"
              >
                Previous Step
              </button>
            )}
            {currentStep < 6 ? (
              <button
                onClick={() => setCurrentStep(c => c + 1)}
                className="px-5 py-2.5 rounded-xl bg-[#174C3C] hover:bg-[#10382D] text-xs font-semibold text-white flex items-center gap-2 shadow-md shadow-[#174C3C]/15"
              >
                Next Stage <ArrowRight size={14} />
              </button>
            ) : (
              <Link
                to="/reports"
                className="px-5 py-2.5 rounded-xl bg-[#174C3C] hover:bg-[#10382D] text-xs font-semibold text-white flex items-center gap-2"
              >
                View Final Report <CheckCircle2 size={14} />
              </Link>
            )}
          </div>
        </div>

        {/* Step-specific content card */}
        <div className="mt-8">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[#F7F6F0] border border-[#E3E7E0] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded bg-[#B96F52]/15 text-[#B96F52] font-mono font-bold text-xs">CRITICAL MATCH: 92%</span>
                    <span className="text-sm font-semibold text-[#202923]">Aarav Sharma vs Rohan Mehta</span>
                  </div>
                  <p className="text-xs text-[#707A72] mt-1.5">Assignment: CS-204 (Sorting Visualizer) • Python 3.12</p>
                </div>
                <Link to="/compare" className="px-4 py-2 rounded-xl bg-[#174C3C] text-xs font-semibold text-white">
                  Inspect in Diff Studio →
                </Link>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="bg-[#F7F6F0] p-4 rounded-2xl border border-[#E3E7E0]">
                <p className="text-[#707A72] font-sans font-bold pb-2 border-b border-[#E3E7E0] mb-3">a.smith_sort.py (Original)</p>
                <div className="text-[#174C3C]">def bubble_sort(arr):</div>
                <div className="text-[#707A72]">&nbsp;&nbsp;n = len(arr)</div>
                <div className="text-[#B96F52] bg-[#B96F52]/10">&nbsp;&nbsp;for i in range(n):</div>
                <div className="text-[#B96F52] bg-[#B96F52]/10">&nbsp;&nbsp;&nbsp;&nbsp;for j in range(0, n-i-1):</div>
                <div className="text-[#174C3C]">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[j], arr[j+1] = arr[j+1], arr[j]</div>
              </div>
              <div className="bg-[#F7F6F0] p-4 rounded-2xl border border-[#E3E7E0]">
                <p className="text-[#707A72] font-sans font-bold pb-2 border-b border-[#E3E7E0] mb-3">r.mehta_sort.py (Transformed)</p>
                <div className="text-[#174C3C]">def sort_array(a):</div>
                <div className="text-[#707A72]">&nbsp;&nbsp;n = len(a)</div>
                <div className="text-[#B96F52] bg-[#B96F52]/10">&nbsp;&nbsp;for i in range(n):</div>
                <div className="text-[#B96F52] bg-[#B96F52]/10">&nbsp;&nbsp;&nbsp;&nbsp;for j in range(n-i-1):</div>
                <div className="text-[#174C3C]">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;temp = a[j]; a[j] = a[j+1]; a[j+1] = temp</div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#F7F6F0] border border-[#E3E7E0]">
                <p className="text-xs font-bold text-[#B96F52] uppercase">Identifier Normalization</p>
                <p className="text-xs text-[#202923] mt-2">Mapped <code>arr</code> to <code>a</code>; function names canonicalized to <code>Func_0</code> in AST pass.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#F7F6F0] border border-[#E3E7E0]">
                <p className="text-xs font-bold text-[#6B4FA0] uppercase">Syntax Desugaring</p>
                <p className="text-xs text-[#202923] mt-2">Tuple swap operation desugared into temporary variable state mutation with 100% logic preservation.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#F7F6F0] border border-[#E3E7E0]">
                <p className="text-xs font-bold text-[#174C3C] uppercase">Boilerplate Filtering</p>
                <p className="text-xs text-[#202923] mt-2">Instructor-provided helper signatures removed prior to similarity index compilation.</p>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="p-6 rounded-2xl bg-[#F7F6F0] border border-[#E3E7E0] space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#174C3C]">
                <Bot size={18} /> Viva Evaluation Questions Drafted by Gemini 3.8 Flash
              </div>
              <ul className="space-y-2 text-xs text-[#202923]">
                <li className="p-3 rounded-xl bg-white border border-[#E3E7E0]">
                  1. "Can you explain why the inner loop bounds run to <code>n-i-1</code> rather than <code>n-1</code>?"
                </li>
                <li className="p-3 rounded-xl bg-white border border-[#E3E7E0]">
                  2. "What happens to the time complexity if the array is already sorted?"
                </li>
                <li className="p-3 rounded-xl bg-white border border-[#E3E7E0]">
                  3. "Walk through how you would optimize this with a swapped flag boolean."
                </li>
              </ul>
            </div>
          )}

          {currentStep === 5 && (
            <div className="p-6 rounded-2xl bg-[#F7F6F0] border border-[#E3E7E0] flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[#202923]">Cohort Collusion Cluster Identified</p>
                <p className="text-xs text-[#707A72] mt-1">3 students linked via mutual 85%+ structural overlap in Assignment CS-204.</p>
              </div>
              <Link to="/network" className="px-4 py-2 rounded-xl bg-[#6B4FA0] hover:bg-[#5A3E8A] text-xs font-semibold text-white">
                Open Network Graph View →
              </Link>
            </div>
          )}

          {currentStep === 6 && (
            <div className="p-6 rounded-2xl bg-[#F7F6F0] border border-[#E3E7E0] flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[#202923]">Academic Integrity Evidentiary Packet Ready</p>
                <p className="text-xs text-[#707A72] mt-1">Includes AST diff timestamps, reviewer annotations, viva rubric, and institutional disclaimer.</p>
              </div>
              <Link to="/reports" className="px-4 py-2 rounded-xl bg-[#174C3C] hover:bg-[#10382D] text-xs font-semibold text-white">
                Export Formal Report →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
