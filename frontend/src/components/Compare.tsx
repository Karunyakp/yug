import { useState } from 'react';
import {
  Play,
  ChevronLeft,
  Download,
  Mail,
  Bot,
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
import { analyzeCodeWithGemini, type AnalysisOutput } from '../services/gemini';

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
  const [geminiInsights, setGeminiInsights] = useState<AnalysisOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState('');
  const [activeTab, setActiveTab] = useState<'evidence' | 'metrics' | 'viva' | 'obfuscation'>('evidence');

  // Reviewer Notes state
  const [reviewerNotes, setReviewerNotes] = useState('High structural congruence noted in sorting logic despite variable mutations. Recommended for oral viva inquiry.');
  const [decision, setDecision] = useState<'needs_review' | 'viva_scheduled' | 'dismissed' | 'reviewed'>('needs_review');

  const runAnalysis = async () => {
    setLoading(true);
    setAnalysisError('');
    try {
      const localResult = runLocalMultiLayerComparison(code1, code2, starterCode);
      setResult(localResult);

      try {
        const aiData = await analyzeCodeWithGemini(code1, code2, starterCode);
        setGeminiInsights(aiData);
      } catch (error) {
        const reason = error instanceof Error ? error.message : 'Gemini analysis failed.';
        setGeminiInsights({
          source: 'local-fallback',
          fallbackReason: reason,
          overall_similarity: localResult.overall_similarity,
          baseline_similarity: localResult.lexical_similarity,
          structural_similarity: localResult.structural_similarity,
          cross_language_similarity: localResult.cross_language_similarity,
          explanation: 'Gemini was unavailable. The findings below are generated only from the local comparison heuristics.',
          ai_analysis: [
            `Local lexical similarity: ${Math.round(localResult.lexical_similarity * 100)}%.`,
            `Local structural similarity: ${Math.round(localResult.structural_similarity * 100)}%.`,
            ...localResult.obfuscation_signals.map(signal => signal.description),
            'Local heuristics do not assess AI authorship and are not proof of misconduct.',
          ],
          ai_patterns: {
            observed_characteristics: [],
            limitations: 'Gemini could not be reached. These are local rule-based indicators only; no AI-authorship assessment was performed.',
            viva_questions: [
              'Can you explain the control-flow and loop boundaries in your implementation?',
              'What alternative approaches did you consider for this problem?',
              'How would you test this implementation with edge-case inputs?',
            ],
          },
        });
      }
    } catch (err) {
      setAnalysisError(err instanceof Error ? err.message : 'Unable to run the local comparison.');
    } finally {
      setLoading(false);
    }
  };

  const simScore = result ? Math.round(result.overall_similarity * 100) : 0;
  const isHigh = simScore >= 75;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-[1240px] mx-auto pb-16 text-[#202923] relative">
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

      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print-hidden">
        <div className="flex items-center gap-2 text-xs text-[#707A72]">
          <Link to="/submissions" className="flex items-center gap-1 hover:text-[#202923] transition-colors">
            <ChevronLeft size={14} /> Submissions
          </Link>
          <span>/</span>
          <span className="text-[#202923] font-semibold">Code Analysis & Diff Studio</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowStarterConfig(!showStarterConfig)}
            className="bg-white hover:bg-[#F7F6F0] text-xs text-[#202923] px-3.5 py-2 rounded-xl border border-[#E3E7E0] flex items-center gap-2 transition-all shadow-2xs"
          >
            <Filter size={13} className="text-[#174C3C]" />
            {showStarterConfig ? 'Hide Starter Code' : 'Exclude Starter Code'}
          </button>
          {result && (
            <button 
              onClick={handlePrint}
              className="bg-white hover:bg-[#F7F6F0] text-[#202923] px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all border border-[#E3E7E0] shadow-2xs"
            >
              <Download size={13} /> Printable Report
            </button>
          )}
          <button 
            onClick={runAnalysis}
            disabled={loading}
            className="bg-[#174C3C] hover:bg-[#10382D] text-white px-5 py-2 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all disabled:opacity-50 shadow-xs cursor-pointer"
          >
            <Play size={13} className={loading ? "animate-pulse" : ""} fill="currentColor" />
            {loading ? 'Analyzing submissions...' : 'Run Comparative Analysis'}
          </button>
        </div>
      </div>

      {analysisError && (
        <div role="alert" className="rounded-xl border border-[#F5C7C3] bg-[#FBE8E6] px-4 py-3 text-sm text-[#A82A2A] print-hidden">
          {analysisError}
        </div>
      )}
      {geminiInsights && (
        <div className={`rounded-xl border px-4 py-3 text-xs leading-5 print-hidden ${
          geminiInsights.source === 'gemini'
            ? 'border-[#C3E4CF] bg-[#E4F1E9] text-[#174C3C]'
            : 'border-[#F6E0B5] bg-[#FFF1D6] text-[#7C5315]'
        }`}>
          <strong>{geminiInsights.source === 'gemini' ? 'Gemini API analysis completed.' : 'Gemini unavailable — showing local fallback findings.'}</strong>
          {geminiInsights.source === 'local-fallback' && (
            <span> Local results are heuristic only and are not AI findings. {geminiInsights.fallbackReason}</span>
          )}
        </div>
      )}

      {/* Starter Code Exclusion Config */}
      {showStarterConfig && (
        <div className="bg-white border border-[#E3E7E0] rounded-2xl p-5 space-y-3 shadow-xs print-hidden animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#202923] uppercase tracking-wider">
              <ShieldCheck size={16} className="text-[#174C3C]" /> Instructor Starter Code Exclusion
            </div>
            <span className="text-[11px] text-[#707A72]">Submissions matching this code block will be deducted from similarity score</span>
          </div>
          <textarea
            className="w-full h-24 bg-[#F7F6F0] border border-[#E3E7E0] rounded-xl p-3 font-mono text-xs text-[#202923] outline-none focus:border-[#174C3C]"
            value={starterCode}
            onChange={e => setStarterCode(e.target.value)}
          />
        </div>
      )}

      {/* Main Printable Content */}
      <div id="pdf-content" className="space-y-6">
        {/* Case Header Card */}
        <div className="bg-white border border-[#E3E7E0] p-6 rounded-2xl shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold tracking-tight text-[#202923]">Pairwise Code Analysis Dossier</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#E4F1E9] text-[#174C3C] font-semibold border border-[#C3E4CF]">
                CS-204
              </span>
            </div>
            <p className="text-xs text-[#707A72] mt-1 leading-relaxed max-w-xl">
              Deterministic AST structure analysis, variable normalization, and AI-assisted qualitative findings.
            </p>
          </div>

          {result && (
            <div className="flex items-center gap-6 bg-[#F7F6F0] p-3.5 rounded-xl border border-[#E3E7E0]">
              <div className="text-center">
                <span className="text-[10px] text-[#707A72] uppercase tracking-wider block font-bold">Lexical</span>
                <span className="text-base font-bold text-[#202923]">{Math.round(result.lexical_similarity * 100)}%</span>
              </div>
              <div className="h-6 w-px bg-[#E3E7E0]"></div>
              <div className="text-center">
                <span className="text-[10px] text-[#707A72] uppercase tracking-wider block font-bold">Boilerplate Excl.</span>
                <span className="text-base font-bold text-[#174C3C]">{Math.round(result.boilerplate_filtered_similarity * 100)}%</span>
              </div>
              <div className="h-6 w-px bg-[#E3E7E0]"></div>
              <div className="text-center">
                <span className="text-[10px] uppercase tracking-wider block font-bold text-[#B96F52]">Overall Match</span>
                <span className={`text-xl font-extrabold ${isHigh ? 'text-[#D9534F]' : 'text-[#174C3C]'}`}>
                  {simScore}%
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Side-by-Side Code Editors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Submission 1 */}
          <div className="bg-white rounded-2xl border border-[#E3E7E0] overflow-hidden flex flex-col shadow-xs">
            <div className="bg-[#F7F6F0] border-b border-[#E3E7E0] px-4 py-3 flex justify-between items-center">
              <div>
                <span className="font-semibold text-xs text-[#202923]">Aarav Sharma</span>
                <span className="ml-2 font-mono text-[11px] text-[#707A72] bg-white px-2 py-0.5 rounded border border-[#E3E7E0]">
                  bubble_sort.py
                </span>
              </div>
              <span className="text-[11px] text-[#707A72]">Submission #841</span>
            </div>
            <textarea 
              className="w-full h-[340px] font-mono text-xs p-4 bg-white text-[#202923] focus:outline-none resize-none leading-relaxed"
              value={code1}
              onChange={(e) => setCode1(e.target.value)}
              spellCheck="false"
            />
          </div>

          {/* Submission 2 */}
          <div className="bg-white rounded-2xl border border-[#E3E7E0] overflow-hidden flex flex-col shadow-xs">
            <div className="bg-[#F7F6F0] border-b border-[#E3E7E0] px-4 py-3 flex justify-between items-center">
              <div>
                <span className="font-semibold text-xs text-[#202923]">Rohan Mehta</span>
                <span className="ml-2 font-mono text-[11px] text-[#707A72] bg-white px-2 py-0.5 rounded border border-[#E3E7E0]">
                  sort_array.py
                </span>
              </div>
              <span className="text-[11px] text-[#707A72]">Submission #842</span>
            </div>
            <textarea 
              className="w-full h-[340px] font-mono text-xs p-4 bg-white text-[#202923] focus:outline-none resize-none leading-relaxed"
              value={code2}
              onChange={(e) => setCode2(e.target.value)}
              spellCheck="false"
            />
          </div>
        </div>

        {/* Evidence Navigation Tabs */}
        {result && (
          <div className="bg-white border border-[#E3E7E0] rounded-2xl overflow-hidden shadow-xs">
            <div className="flex border-b border-[#E3E7E0] bg-[#F7F6F0]/60 print-hidden">
              <button 
                className={`px-6 py-3.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'evidence' ? 'border-[#174C3C] text-[#174C3C] bg-white' : 'border-transparent text-[#707A72] hover:text-[#202923]'}`} 
                onClick={() => setActiveTab('evidence')}
              >
                <Bot size={14} /> Evidence & Qualitative Analysis
              </button>
              <button 
                className={`px-6 py-3.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'metrics' ? 'border-[#174C3C] text-[#174C3C] bg-white' : 'border-transparent text-[#707A72] hover:text-[#202923]'}`} 
                onClick={() => setActiveTab('metrics')}
              >
                <FileCode size={14} /> Component Metrics
              </button>
              <button 
                className={`px-6 py-3.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'obfuscation' ? 'border-[#174C3C] text-[#174C3C] bg-white' : 'border-transparent text-[#707A72] hover:text-[#202923]'}`} 
                onClick={() => setActiveTab('obfuscation')}
              >
                <Flame size={14} /> Obfuscation Shield
              </button>
              <button 
                className={`px-6 py-3.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'viva' ? 'border-[#174C3C] text-[#174C3C] bg-white' : 'border-transparent text-[#707A72] hover:text-[#202923]'}`} 
                onClick={() => setActiveTab('viva')}
              >
                <MessageSquare size={14} /> Viva Inquiry Rubric
              </button>
            </div>

            <div className="p-6">
              {/* Evidence Tab */}
              {activeTab === 'evidence' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#F7F6F0] border border-[#E3E7E0]">
                    <h3 className="text-xs font-bold text-[#174C3C] uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Sparkles size={14} /> Evaluation Finding Summary
                    </h3>
                    <p className="text-xs text-[#202923] leading-relaxed mb-4">
                      {geminiInsights?.explanation || result.explanation}
                    </p>

                    <div className="space-y-2">
                      {(geminiInsights ? geminiInsights.ai_analysis : result.obfuscation_signals.map(o => o.description)).map((pt: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#707A72]">
                          <span className="text-[#174C3C] font-bold">•</span>
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-[#E3E7E0] flex items-center justify-between print-hidden">
                      <span className="text-[11px] text-[#707A72]">
                        {geminiInsights?.source === 'gemini'
                          ? 'Local comparison plus live Google Gemini API analysis.'
                          : 'Local heuristic comparison; AI results are not available.'}
                      </span>
                      <Link
                        to="/email-center"
                        className="px-4 py-2 rounded-xl bg-[#174C3C] hover:bg-[#10382D] text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
                      >
                        <Mail size={13} /> Compose Viva Invitation
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Component Metrics Tab */}
              {activeTab === 'metrics' && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-[#F7F6F0] border border-[#E3E7E0]">
                    <span className="text-[10px] text-[#707A72] uppercase font-bold tracking-wider">Lexical 3-Gram</span>
                    <p className="text-xl font-bold text-[#202923] mt-1">{Math.round(result.lexical_similarity * 100)}%</p>
                    <p className="text-[11px] text-[#707A72] mt-1">Direct token correspondence</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F7F6F0] border border-[#E3E7E0]">
                    <span className="text-[10px] text-[#707A72] uppercase font-bold tracking-wider">AST Structural</span>
                    <p className="text-xl font-bold text-[#174C3C] mt-1">{Math.round(result.structural_similarity * 100)}%</p>
                    <p className="text-[11px] text-[#707A72] mt-1">Control-flow isomorphism</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F7F6F0] border border-[#E3E7E0]">
                    <span className="text-[10px] text-[#707A72] uppercase font-bold tracking-wider">Boilerplate Excl.</span>
                    <p className="text-xl font-bold text-[#174C3C] mt-1">{Math.round(result.boilerplate_filtered_similarity * 100)}%</p>
                    <p className="text-[11px] text-[#707A72] mt-1">Template discount applied</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F7F6F0] border border-[#E3E7E0]">
                    <span className="text-[10px] text-[#707A72] uppercase font-bold tracking-wider">Cross-Language</span>
                    <p className="text-xl font-bold text-[#707A72] mt-1">{result.cross_language_similarity ? `${Math.round(result.cross_language_similarity * 100)}%` : 'N/A'}</p>
                    <p className="text-[11px] text-[#707A72] mt-1">{result.is_cross_language ? 'Cross-syntax match' : 'Single runtime'}</p>
                  </div>
                </div>
              )}

              {/* Obfuscation Tab */}
              {activeTab === 'obfuscation' && (
                <div className="space-y-3">
                  {result.obfuscation_signals.map((sig, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#F7F6F0] border border-[#E3E7E0] flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <Flame size={15} className="text-[#B96F52]" />
                          <h4 className="text-xs font-bold text-[#202923]">{sig.type}</h4>
                        </div>
                        <p className="text-xs text-[#707A72] mt-1">{sig.description}</p>
                      </div>
                      <span className="text-xs font-bold text-[#10382D] bg-[#E4F1E9] px-2.5 py-1 rounded-lg border border-[#C3E4CF]">
                        {Math.round(sig.confidence * 100)}% Confidence
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Viva Tab */}
              {activeTab === 'viva' && (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-[#F7F6F0] border border-[#E3E7E0]">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#174C3C] uppercase tracking-wider mb-2">
                      <HelpCircle size={14} /> Oral Inquiry Questions
                    </div>
                    <p className="text-xs text-[#707A72] mb-4">
                      Instructors are encouraged to pose these specific conceptual questions during student viva to verify code authorship.
                    </p>
                    <div className="space-y-2">
                      {(geminiInsights?.ai_patterns?.viva_questions || [
                        "Can you explain why the inner loop bounds run to n-i-1 rather than n-1?",
                        "What is the space complexity of this sorting routine and why?",
                        "How would this function behave with duplicate array elements?"
                      ]).map((q: string, idx: number) => (
                        <div key={idx} className="p-3 rounded-lg bg-white border border-[#E3E7E0] text-xs text-[#202923]">
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

        {/* Reviewer Decision Controls */}
        <div className="bg-white border border-[#E3E7E0] rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#202923] uppercase tracking-wider">Faculty Determination Record</h3>
            <span className="text-[11px] text-[#707A72]">Logged by Prof. Verma (#FAC-019)</span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {[
              { id: 'needs_review', label: 'Needs Review' },
              { id: 'viva_scheduled', label: 'Viva Oral Exam Scheduled' },
              { id: 'dismissed', label: 'Dismiss as Common Pattern' },
              { id: 'reviewed', label: 'Reviewed & Cleared' }
            ].map(d => (
              <button
                key={d.id}
                onClick={() => setDecision(d.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  decision === d.id
                    ? 'bg-[#174C3C] text-white shadow-2xs'
                    : 'bg-[#F7F6F0] text-[#707A72] hover:text-[#202923] border border-[#E3E7E0]'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          <div>
            <label className="text-[11px] text-[#707A72] font-semibold uppercase tracking-wider block mb-1">
              Internal Review Notes
            </label>
            <textarea
              className="w-full h-20 bg-[#F7F6F0] border border-[#E3E7E0] rounded-xl p-3 text-xs text-[#202923] outline-none focus:border-[#174C3C]"
              value={reviewerNotes}
              onChange={e => setReviewerNotes(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
