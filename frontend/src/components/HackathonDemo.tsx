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
    <div className="space-y-8 pb-16 text-[#F3F4F6]">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#E02875]/20 via-[#8A63D2]/15 to-[#00D2D3]/10 border border-[#E02875]/30 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E02875] text-white text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles size={13} /> Evaluator Sandbox
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              CodeGuard AI — Guided Evaluation Walkthrough
            </h1>
            <p className="text-[#8E99B7] text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
              Step through our 6-stage end-to-end workflow designed for computer science faculty and academic review committees. Experience how deterministic AST fingerprinting pairs with Google Gemini 3.8 Flash.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/compare"
              className="px-5 py-3 rounded-2xl bg-[#E02875] hover:bg-[#C2185B] text-white font-semibold text-sm flex items-center gap-2 transition-all shadow-lg shadow-[#E02875]/25"
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
                  ? 'bg-[#15192B] border-[#E02875] shadow-lg shadow-[#E02875]/10'
                  : isDone
                  ? 'bg-[#101422] border-[#10B981]/30 text-[#8E99B7]'
                  : 'bg-[#101422] border-[#1F263E] text-[#69759B]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-[#E02875] text-white' : isDone ? 'bg-[#10B981]/20 text-[#10B981]' : 'bg-[#1F263E] text-[#8E99B7]'}`}>
                  0{s.step}
                </span>
                {isDone && <CheckCircle2 size={15} className="text-[#10B981]" />}
              </div>
              <p className={`text-xs font-bold leading-tight ${isActive ? 'text-white' : 'text-[#DCE1EE]'}`}>
                {s.title}
              </p>
            </button>
          );
        })}
      </div>

      {/* Interactive Step Preview Panel */}
      <div className="bg-[#101422] border border-[#1F263E] rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-[#1F263E]">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#E02875]">Stage 0{currentStep} Focus</span>
            <h2 className="text-2xl font-bold text-white mt-1">{steps[currentStep - 1].title}</h2>
            <p className="text-sm text-[#8E99B7] mt-1">{steps[currentStep - 1].desc}</p>
          </div>

          <div className="flex items-center gap-3">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(c => c - 1)}
                className="px-4 py-2 rounded-xl bg-[#15192B] border border-[#1F263E] text-xs font-medium text-[#8E99B7] hover:text-white"
              >
                Previous Step
              </button>
            )}
            {currentStep < 6 ? (
              <button
                onClick={() => setCurrentStep(c => c + 1)}
                className="px-5 py-2.5 rounded-xl bg-[#E02875] hover:bg-[#C2185B] text-xs font-semibold text-white flex items-center gap-2 shadow-md shadow-[#E02875]/20"
              >
                Next Stage <ArrowRight size={14} />
              </button>
            ) : (
              <Link
                to="/reports"
                className="px-5 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-xs font-semibold text-white flex items-center gap-2"
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
              <div className="p-5 rounded-2xl bg-[#15192B] border border-[#1F263E] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded bg-[#E02875]/20 text-[#E02875] font-mono font-bold text-xs">CRITICAL MATCH: 92%</span>
                    <span className="text-sm font-semibold text-white">Aarav Sharma vs Rohan Mehta</span>
                  </div>
                  <p className="text-xs text-[#8E99B7] mt-1.5">Assignment: CS-204 (Sorting Visualizer) • Python 3.12</p>
                </div>
                <Link to="/compare" className="px-4 py-2 rounded-xl bg-[#E02875] text-xs font-semibold text-white">
                  Inspect in Diff Studio →
                </Link>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="bg-[#0B0D14] p-4 rounded-2xl border border-[#1F263E]">
                <p className="text-[#8E99B7] font-sans font-bold pb-2 border-b border-[#1F263E] mb-3">a.smith_sort.py (Original)</p>
                <div className="text-emerald-400">def bubble_sort(arr):</div>
                <div className="text-gray-400">&nbsp;&nbsp;n = len(arr)</div>
                <div className="text-[#E02875] bg-[#E02875]/10">&nbsp;&nbsp;for i in range(n):</div>
                <div className="text-[#E02875] bg-[#E02875]/10">&nbsp;&nbsp;&nbsp;&nbsp;for j in range(0, n-i-1):</div>
                <div className="text-cyan-400">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[j], arr[j+1] = arr[j+1], arr[j]</div>
              </div>
              <div className="bg-[#0B0D14] p-4 rounded-2xl border border-[#1F263E]">
                <p className="text-[#8E99B7] font-sans font-bold pb-2 border-b border-[#1F263E] mb-3">r.mehta_sort.py (Transformed)</p>
                <div className="text-emerald-400">def sort_array(a):</div>
                <div className="text-gray-400">&nbsp;&nbsp;n = len(a)</div>
                <div className="text-[#E02875] bg-[#E02875]/10">&nbsp;&nbsp;for i in range(n):</div>
                <div className="text-[#E02875] bg-[#E02875]/10">&nbsp;&nbsp;&nbsp;&nbsp;for j in range(n-i-1):</div>
                <div className="text-cyan-400">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;temp = a[j]; a[j] = a[j+1]; a[j+1] = temp</div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#15192B] border border-[#1F263E]">
                <p className="text-xs font-bold text-[#E02875] uppercase">Identifier Normalization</p>
                <p className="text-xs text-[#DCE1EE] mt-2">Mapped <code>arr</code> to <code>a</code>; function names canonicalized to <code>Func_0</code> in AST pass.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#15192B] border border-[#1F263E]">
                <p className="text-xs font-bold text-[#8A63D2] uppercase">Syntax Desugaring</p>
                <p className="text-xs text-[#DCE1EE] mt-2">Tuple swap operation desugared into temporary variable state mutation with 100% logic preservation.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#15192B] border border-[#1F263E]">
                <p className="text-xs font-bold text-[#00D2D3] uppercase">Boilerplate Filtering</p>
                <p className="text-xs text-[#DCE1EE] mt-2">Instructor-provided helper signatures removed prior to similarity index compilation.</p>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="p-6 rounded-2xl bg-[#15192B] border border-[#1F263E] space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#E02875]">
                <Bot size={18} /> Viva Evaluation Questions Drafted by Gemini 3.8 Flash
              </div>
              <ul className="space-y-2 text-xs text-[#DCE1EE]">
                <li className="p-3 rounded-xl bg-[#0B0D14] border border-[#1F263E]">
                  1. "Can you explain why the inner loop bounds run to <code>n-i-1</code> rather than <code>n-1</code>?"
                </li>
                <li className="p-3 rounded-xl bg-[#0B0D14] border border-[#1F263E]">
                  2. "What happens to the time complexity if the array is already sorted?"
                </li>
                <li className="p-3 rounded-xl bg-[#0B0D14] border border-[#1F263E]">
                  3. "Walk through how you would optimize this with a swapped flag boolean."
                </li>
              </ul>
            </div>
          )}

          {currentStep === 5 && (
            <div className="p-6 rounded-2xl bg-[#15192B] border border-[#1F263E] flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-white">Cohort Collusion Cluster Identified</p>
                <p className="text-xs text-[#8E99B7] mt-1">3 students linked via mutual 85%+ structural overlap in Assignment CS-204.</p>
              </div>
              <Link to="/network" className="px-4 py-2 rounded-xl bg-[#8A63D2] text-xs font-semibold text-white">
                Open Network Graph View →
              </Link>
            </div>
          )}

          {currentStep === 6 && (
            <div className="p-6 rounded-2xl bg-[#15192B] border border-[#1F263E] flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-white">Academic Integrity Evidentiary Packet Ready</p>
                <p className="text-xs text-[#8E99B7] mt-1">Includes AST diff timestamps, reviewer annotations, viva rubric, and institutional disclaimer.</p>
              </div>
              <Link to="/reports" className="px-4 py-2 rounded-xl bg-[#10B981] text-xs font-semibold text-white">
                Export Formal Report →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
