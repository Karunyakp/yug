import { useState } from 'react';
import {
  Play,
  ChevronLeft,
  Download,
  Mail,
  Bot,
  X,
  FileCode,
  ShieldCheck,
  Filter,
  Sparkles,
  HelpCircle,
  MessageSquare,
  Flame
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { runLocalMultiLayerComparison, type CodeAnalysisResult } from '../services/analysisEngine';
import { analyzeCodeWithGemini, generateConfrontationEmailWithGemini } from '../services/gemini';

export default function Compare() {
  const defaultCode1 = `def bubble_sort(arr):
    n = len(arr)
    # Loop through all elements
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

# Driver code
arr = [64, 34, 25, 12, 22, 11, 90]
print(bubble_sort(arr))`;

  const defaultCode2 = `def sort_array(a):
    n = len(a)
    for i in range(n):
        for j in range(n-i-1):
            if a[j] > a[j+1]:
                temp = a[j]
                a[j] = a[j+1]
                a[j+1] = temp
    return a

# Test
data = [64, 34, 25, 12, 22, 11, 90]
print(sort_array(data))`;

  const defaultStarter = `# Starter template provided by Instructor
def solve(items):
    # Student code starts here
    pass`;

  const [code1, setCode1] = useState(defaultCode1);
  const [code2, setCode2] = useState(defaultCode2);
  const [starterCode, setStarterCode] = useState(defaultStarter);
  const [showStarterConfig, setShowStarterConfig] = useState(false);
  
  const [result, setResult] = useState<CodeAnalysisResult | null>(null);
  const [geminiInsights, setGeminiInsights] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'evidence' | 'metrics' | 'viva' | 'obfuscation'>('evidence');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailDraft, setEmailDraft] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);

  // Reviewer Notes state
  const [reviewerNotes, setReviewerNotes] = useState('Reviewed by Prof. Verma. High probability of identifier renaming. Recommended for viva.');
  const [decision, setDecision] = useState<'pending' | 'flagged' | 'dismissed' | 'viva_scheduled'>('flagged');

  const runAnalysis = async () => {
    setLoading(true);
    try {
      // 1. Run deterministically via local AST/Lexical engine
      const localResult = runLocalMultiLayerComparison(code1, code2, starterCode);
      setResult(localResult);

      // 2. Request Gemini 3.8 Flash for qualitative viva questions and natural language reasoning
      const aiData = await analyzeCodeWithGemini(code1, code2, starterCode);
      setGeminiInsights(aiData);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleOpenEmailModal = async () => {
    setShowEmailModal(true);
    setEmailLoading(true);
    try {
      const findings = geminiInsights ? geminiInsights.ai_analysis : (result ? result.obfuscation_signals.map(o => o.description) : []);
      const score = result ? Math.round(result.overall_similarity * 100) : 92;
      const draft = await generateConfrontationEmailWithGemini("Rohan Mehta", "Sorting Algorithms", score, findings);
      setEmailDraft(draft);
    } catch (err) {
      console.error(err);
    }
    setEmailLoading(false);
  };

  const simScore = result ? Math.round(result.overall_similarity * 100) : 0;
  const isHigh = simScore >= 75;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-[1240px] mx-auto pb-16 text-[#F3F4F6] relative">
      <style>{`
        @media print {
          body * {
            visibility: hidden;
            background-color: white !important;
            color: black !important;
          }
          #pdf-content, #pdf-content * {
            visibility: visible;
          }
          #pdf-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 20px;
          }
          .print-hidden {
            display: none !important;
          }
        }
      `}</style>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm print-hidden px-4">
          <div className="bg-[#121626] p-6 md:p-8 rounded-3xl border border-[#232A44] max-w-xl w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold flex items-center gap-2.5 text-white">
                <Mail size={18} className="text-[#E02875]" /> Academic Integrity Viva Invitation
              </h3>
              <button onClick={() => setShowEmailModal(false)} className="text-[#8E99B7] hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4 text-xs">
              <div>
                <label className="text-[#8E99B7] uppercase tracking-wider font-semibold">Recipient (Student)</label>
                <input type="text" className="w-full bg-[#0B0D14] border border-[#1F263E] rounded-xl px-3 py-2 text-white mt-1 outline-none" value="rohan.mehta@university.edu" readOnly />
              </div>
              <div>
                <label className="text-[#8E99B7] uppercase tracking-wider font-semibold">Subject</label>
                <input type="text" className="w-full bg-[#0B0D14] border border-[#1F263E] rounded-xl px-3 py-2 text-white mt-1 outline-none" value="Academic Review: Discussion regarding CS-204 Submission" readOnly />
              </div>
              <div>
                <label className="text-[#8E99B7] uppercase tracking-wider font-semibold flex items-center justify-between">
                  <span>Pedagogical Email Draft</span>
                  {emailLoading && <span className="text-[#E02875] animate-pulse">Drafting with Gemini 3.8 Flash...</span>}
                </label>
                <textarea 
                  className="w-full h-48 bg-[#0B0D14] border border-[#1F263E] rounded-xl p-3.5 text-white mt-1 resize-none font-sans text-xs leading-relaxed outline-none focus:border-[#E02875]" 
                  value={emailLoading ? "Generating structured, respectful academic inquiry with Gemini AI..." : emailDraft} 
                  onChange={(e) => setEmailDraft(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setShowEmailModal(false)} className="px-4 py-2 rounded-xl text-xs font-semibold text-[#8E99B7] hover:text-white transition-colors">
                Cancel
              </button>
              <button
                disabled={emailLoading}
                onClick={() => { alert('Email dispatched through institutional SMTP.'); setShowEmailModal(false); }}
                className="bg-[#E02875] hover:bg-[#C2185B] text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition-all disabled:opacity-50 shadow-md shadow-[#E02875]/20"
              >
                Send Meeting Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Nav Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print-hidden">
        <div className="flex items-center gap-2 text-xs text-[#8E99B7]">
          <Link to="/submissions" className="flex items-center gap-1 hover:text-white transition-colors">
            <ChevronLeft size={14} /> Submissions Queue
          </Link>
          <span>/</span>
          <span className="text-white font-medium">AST & Cross-Language Diff Studio</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowStarterConfig(!showStarterConfig)}
            className="bg-[#15192B] hover:bg-[#1F263E] text-xs text-[#DCE1EE] px-4 py-2.5 rounded-xl border border-[#1F263E] flex items-center gap-2 transition-all"
          >
            <Filter size={14} className="text-[#00D2D3]" />
            {showStarterConfig ? 'Hide Starter Code' : 'Exclude Starter Code'}
          </button>
          {result && (
            <button 
              onClick={handlePrint}
              className="bg-[#15192B] hover:bg-[#1F263E] text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all border border-[#1F263E]"
            >
              <Download size={14} /> Export Evidentiary PDF
            </button>
          )}
          <button 
            onClick={runAnalysis}
            disabled={loading}
            className="bg-[#E02875] hover:bg-[#C2185B] text-white px-6 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all disabled:opacity-50 shadow-lg shadow-[#E02875]/25 cursor-pointer"
          >
            <Play size={14} className={loading ? "animate-pulse" : ""} fill="currentColor" />
            {loading ? 'Evaluating AST Graphs...' : 'Run Multi-Layer Analysis'}
          </button>
        </div>
      </div>

      {/* Starter Code Exclusion Config */}
      {showStarterConfig && (
        <div className="bg-[#101422] border border-[#1F263E] rounded-2xl p-5 space-y-3 animate-in fade-in duration-200 print-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
              <ShieldCheck size={16} className="text-[#00D2D3]" /> Instructor Starter Code Exclusion
            </div>
            <span className="text-[11px] text-[#8E99B7]">Tokens matching this block will be discounted from final score</span>
          </div>
          <textarea
            className="w-full h-24 bg-[#0B0D14] border border-[#1F263E] rounded-xl p-3 font-mono text-xs text-[#DCE1EE] outline-none focus:border-[#00D2D3]"
            value={starterCode}
            onChange={e => setStarterCode(e.target.value)}
          />
        </div>
      )}

      {/* Printable Report Wrapper */}
      <div id="pdf-content" className="space-y-6">
        {/* Score & Case Summary */}
        <div className="bg-[#101422] border border-[#1F263E] p-6 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight text-white">Comparative Evidence Dossier</h2>
              <span className="text-xs px-2.5 py-1 rounded-md bg-[#1F263E] border border-[#2A3352] text-[#8E99B7] font-mono">
                CS-204 • Fall 2026
              </span>
            </div>
            <p className="text-xs text-[#8E99B7] mt-1.5 leading-relaxed max-w-xl">
              Multi-signal structural, AST lexical, and cross-language evaluation calibrated for academic computer science departments.
            </p>
          </div>

          {result && (
            <div className="flex items-center gap-6 bg-[#15192B] p-4 rounded-2xl border border-[#1F263E]">
              <div className="text-center">
                <span className="text-xs text-[#8E99B7] uppercase tracking-wider block font-semibold">Raw Score</span>
                <span className="text-lg font-bold font-mono text-[#DCE1EE]">{Math.round(result.lexical_similarity * 100)}%</span>
              </div>
              <div className="h-8 w-px bg-[#1F263E]"></div>
              <div className="text-center">
                <span className="text-xs text-[#8E99B7] uppercase tracking-wider block font-semibold">Boilerplate Excl.</span>
                <span className="text-lg font-bold font-mono text-[#00D2D3]">{Math.round(result.boilerplate_filtered_similarity * 100)}%</span>
              </div>
              <div className="h-8 w-px bg-[#1F263E]"></div>
              <div className="text-center">
                <span className="text-xs uppercase tracking-wider block font-bold text-[#E02875]">Overall Similarity</span>
                <span className={`text-2xl font-extrabold font-mono ${isHigh ? 'text-[#E02875]' : 'text-[#10B981]'}`}>
                  {simScore}%
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Side-by-Side Code Workspace */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Submission 1 */}
          <div className="bg-[#101422] rounded-3xl border border-[#1F263E] overflow-hidden flex flex-col shadow-xl">
            <div className="bg-[#15192B] border-b border-[#1F263E] px-5 py-3.5 flex justify-between items-center">
              <div>
                <span className="font-semibold text-sm text-white">Aarav Sharma</span>
                <span className="ml-2 font-mono text-xs text-[#8E99B7] bg-[#0B0D14] px-2 py-0.5 rounded border border-[#1F263E]">
                  bubble_sort.py
                </span>
              </div>
              <span className="text-xs text-[#8E99B7]">Submission #841</span>
            </div>
            <textarea 
              className="w-full h-[360px] font-mono text-xs p-5 bg-[#0B0D14] text-[#DCE1EE] focus:outline-none resize-none leading-relaxed"
              value={code1}
              onChange={(e) => setCode1(e.target.value)}
              spellCheck="false"
            />
          </div>

          {/* Submission 2 */}
          <div className="bg-[#101422] rounded-3xl border border-[#1F263E] overflow-hidden flex flex-col shadow-xl">
            <div className="bg-[#15192B] border-b border-[#1F263E] px-5 py-3.5 flex justify-between items-center">
              <div>
                <span className="font-semibold text-sm text-white">Rohan Mehta</span>
                <span className="ml-2 font-mono text-xs text-[#8E99B7] bg-[#0B0D14] px-2 py-0.5 rounded border border-[#1F263E]">
                  sort_array.py
                </span>
              </div>
              <span className="text-xs text-[#8E99B7]">Submission #842</span>
            </div>
            <textarea 
              className="w-full h-[360px] font-mono text-xs p-5 bg-[#0B0D14] text-[#DCE1EE] focus:outline-none resize-none leading-relaxed"
              value={code2}
              onChange={(e) => setCode2(e.target.value)}
              spellCheck="false"
            />
          </div>
        </div>

        {/* Evidence Navigation Tabs */}
        {result && (
          <div className="bg-[#101422] border border-[#1F263E] rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex border-b border-[#1F263E] bg-[#15192B]/50 print-hidden">
              <button 
                className={`px-6 py-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'evidence' ? 'border-[#E02875] text-[#E02875]' : 'border-transparent text-[#8E99B7] hover:text-white'}`} 
                onClick={() => setActiveTab('evidence')}
              >
                <Bot size={15} /> Evidence & AI Summary
              </button>
              <button 
                className={`px-6 py-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'metrics' ? 'border-[#E02875] text-[#E02875]' : 'border-transparent text-[#8E99B7] hover:text-white'}`} 
                onClick={() => setActiveTab('metrics')}
              >
                <FileCode size={15} /> Component Metrics
              </button>
              <button 
                className={`px-6 py-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'obfuscation' ? 'border-[#E02875] text-[#E02875]' : 'border-transparent text-[#8E99B7] hover:text-white'}`} 
                onClick={() => setActiveTab('obfuscation')}
              >
                <Flame size={15} /> Obfuscation Shield
              </button>
              <button 
                className={`px-6 py-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'viva' ? 'border-[#E02875] text-[#E02875]' : 'border-transparent text-[#8E99B7] hover:text-white'}`} 
                onClick={() => setActiveTab('viva')}
              >
                <MessageSquare size={15} /> Viva Rubric & Questions
              </button>
            </div>

            <div className="p-6 md:p-8">
              {/* Tab 1: Evidence & AI Analysis */}
              {activeTab === 'evidence' && (
                <div className="space-y-6">
                  <div className="bg-[#15192B] border border-[#1F263E] rounded-2xl p-6 relative">
                    <h3 className="text-sm font-bold text-[#E02875] flex items-center gap-2 mb-3">
                      <Sparkles size={16} /> CodeGuard Evaluator Conclusion
                    </h3>
                    <p className="text-xs text-[#DCE1EE] leading-relaxed mb-4 font-medium">
                      {result.explanation}
                    </p>

                    <div className="space-y-2.5">
                      {(geminiInsights ? geminiInsights.ai_analysis : result.obfuscation_signals.map(o => o.description)).map((point: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-[#DCE1EE]">
                          <span className="text-[#E02875] font-bold">•</span>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#1F263E] flex items-center justify-between print-hidden">
                      <div className="text-[11px] text-[#8E99B7]">
                        Signal verification backed by Google Gemini 3.8 Flash Interactions API.
                      </div>
                      <button 
                        onClick={handleOpenEmailModal}
                        className="px-4 py-2 rounded-xl bg-[#E02875] hover:bg-[#C2185B] text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-md shadow-[#E02875]/20"
                      >
                        <Mail size={14} /> Draft Viva Meeting Email
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Component Metrics */}
              {activeTab === 'metrics' && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-[#15192B] border border-[#1F263E]">
                    <span className="text-[11px] text-[#8E99B7] uppercase font-bold tracking-wider">Lexical 3-Gram</span>
                    <p className="text-2xl font-mono font-bold text-white mt-2">{Math.round(result.lexical_similarity * 100)}%</p>
                    <p className="text-[11px] text-[#8E99B7] mt-1">Direct token overlap</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#15192B] border border-[#1F263E]">
                    <span className="text-[11px] text-[#8E99B7] uppercase font-bold tracking-wider">AST Structural</span>
                    <p className="text-2xl font-mono font-bold text-[#E02875] mt-2">{Math.round(result.structural_similarity * 100)}%</p>
                    <p className="text-[11px] text-[#8E99B7] mt-1">Control-flow isomorphism</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#15192B] border border-[#1F263E]">
                    <span className="text-[11px] text-[#8E99B7] uppercase font-bold tracking-wider">Boilerplate Excl.</span>
                    <p className="text-2xl font-mono font-bold text-[#00D2D3] mt-2">{Math.round(result.boilerplate_filtered_similarity * 100)}%</p>
                    <p className="text-[11px] text-[#8E99B7] mt-1">Normalized after template dedupe</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#15192B] border border-[#1F263E]">
                    <span className="text-[11px] text-[#8E99B7] uppercase font-bold tracking-wider">Cross-Language</span>
                    <p className="text-2xl font-mono font-bold text-[#8A63D2] mt-2">{result.cross_language_similarity ? `${Math.round(result.cross_language_similarity * 100)}%` : 'N/A'}</p>
                    <p className="text-[11px] text-[#8E99B7] mt-1">{result.is_cross_language ? 'Cross-syntax match' : 'Single-language'}</p>
                  </div>
                </div>
              )}

              {/* Tab 3: Obfuscation Detection Shield */}
              {activeTab === 'obfuscation' && (
                <div className="space-y-4">
                  {result.obfuscation_signals.map((sig, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#15192B] border border-[#1F263E] flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <Flame size={16} className="text-[#E02875]" />
                          <h4 className="text-xs font-bold text-white">{sig.type}</h4>
                        </div>
                        <p className="text-xs text-[#8E99B7] mt-1">{sig.description}</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#E02875] bg-[#E02875]/10 px-2.5 py-1 rounded-lg border border-[#E02875]/20">
                        {Math.round(sig.confidence * 100)}% Confidence
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 4: Viva Rubric */}
              {activeTab === 'viva' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#15192B] border border-[#1F263E]">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#00D2D3] uppercase tracking-wider mb-2">
                      <HelpCircle size={15} /> Recommended Viva Questions
                    </div>
                    <p className="text-xs text-[#8E99B7] mb-4">
                      Academic integrity guidelines state students should be given an opportunity to articulate their mental model before disciplinary determinations are rendered.
                    </p>
                    <div className="space-y-2.5">
                      {(geminiInsights?.ai_patterns?.viva_questions || [
                        "Can you explain why the inner loop bounds run to n-i-1 rather than n-1?",
                        "What is the space complexity of this sorting routine and why?",
                        "How would this function behave with duplicate array elements?"
                      ]).map((q: string, idx: number) => (
                        <div key={idx} className="p-3 rounded-xl bg-[#0B0D14] border border-[#1F263E] text-xs text-[#DCE1EE]">
                          {idx + 1}. {q}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Human Faculty Decision & Reviewer Notes */}
        <div className="bg-[#101422] border border-[#1F263E] rounded-3xl p-6 md:p-8 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Faculty Review Decision</h3>
            <span className="text-xs text-[#8E99B7]">Recorded by Prof. Verma (ID: #FAC-019)</span>
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              { id: 'flagged', label: 'Flag for Department Review' },
              { id: 'viva_scheduled', label: 'Viva Oral Exam Scheduled' },
              { id: 'dismissed', label: 'Dismiss as Common Pattern' },
              { id: 'pending', label: 'Mark Under Investigation' }
            ].map(d => (
              <button
                key={d.id}
                onClick={() => setDecision(d.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  decision === d.id
                    ? 'bg-[#E02875] text-white shadow-md shadow-[#E02875]/25'
                    : 'bg-[#15192B] text-[#8E99B7] hover:text-white border border-[#1F263E]'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          <div>
            <label className="text-xs text-[#8E99B7] font-semibold uppercase tracking-wider">Reviewer Notes (Persisted to Case Record)</label>
            <textarea
              className="w-full h-20 bg-[#0B0D14] border border-[#1F263E] rounded-xl p-3 text-xs text-white mt-1 outline-none focus:border-[#E02875]"
              value={reviewerNotes}
              onChange={e => setReviewerNotes(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
