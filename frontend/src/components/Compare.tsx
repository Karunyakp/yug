import { useState } from 'react';
import {
  Play,
  ChevronLeft,
  Download,
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
import { identifyCommonAlgorithm, runLocalMultiLayerComparison, type CodeAnalysisResult } from '../services/analysisEngine';
import { analyzeCodeWithGemini, generateVivaQuestionsWithGemini, type AnalysisOutput } from '../services/gemini';
import { recordAuditEvent } from '../services/localAuditLog';
import ToggleSwitch from './ToggleSwitch';

export default function Compare() {
  const [code1, setCode1] = useState('');
  const [code2, setCode2] = useState('');
  const [starterCode, setStarterCode] = useState('');
  const [showStarterConfig, setShowStarterConfig] = useState(false);
  
  const [result, setResult] = useState<CodeAnalysisResult | null>(null);
  const [geminiInsights, setGeminiInsights] = useState<AnalysisOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState('');
  const [activeTab, setActiveTab] = useState<'evidence' | 'metrics' | 'viva' | 'patterns'>('evidence');
  const [allowCodeToGemini, setAllowCodeToGemini] = useState(false);
  const [vivaQuestions, setVivaQuestions] = useState<string[]>([]);
  const [vivaError, setVivaError] = useState('');
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [shareStudentView, setShareStudentView] = useState(false);
  const [allowLocalEvidenceShare, setAllowLocalEvidenceShare] = useState(false);
  const [shareError, setShareError] = useState('');
  const [auditWarning, setAuditWarning] = useState('');

  // Reviewer Notes state
  const [reviewerNotes, setReviewerNotes] = useState('');
  const [decision, setDecision] = useState<'needs_review' | 'viva_scheduled' | 'dismissed' | 'reviewed'>('needs_review');

  const logActivity = (action: string, detail: string) => {
    try {
      recordAuditEvent(action, detail);
      setAuditWarning('');
    } catch (error) {
      setAuditWarning(error instanceof Error ? error.message : 'Unable to save activity in this browser.');
    }
  };

  const runAnalysis = async () => {
    if (!code1.trim() || !code2.trim()) {
      setAnalysisError('Enter code in both fields before running a comparison.');
      return;
    }
    setLoading(true);
    setAnalysisError('');
    try {
      const activeStarterCode = showStarterConfig ? starterCode : undefined;
      const localResult = runLocalMultiLayerComparison(code1, code2, activeStarterCode);
      setResult(localResult);
      logActivity('Comparison run', `Local overlap review; common-pattern context: ${localResult.commonAlgorithm ?? 'none detected'}.`);

      if (!allowCodeToGemini) {
        setGeminiInsights(null);
        return;
      }
      try {
        const aiData = await analyzeCodeWithGemini(code1, code2, activeStarterCode);
        setGeminiInsights(aiData);
      } catch (error) {
        const reason = error instanceof Error ? error.message : 'Gemini analysis failed.';
        setGeminiInsights({
          source: 'local-fallback',
          fallbackReason: reason,
          explanation: 'Gemini was unavailable. The findings below are generated only from the local comparison heuristics.',
          ai_analysis: [
            `Local lexical similarity: ${Math.round(localResult.lexical_similarity * 100)}%.`,
            `Local structural similarity: ${Math.round(localResult.structural_similarity * 100)}%.`,
            'Local heuristics do not assess AI authorship and are not proof of misconduct.',
          ],
        });
      }
    } catch (err) {
      setAnalysisError(err instanceof Error ? err.message : 'Unable to run the local comparison.');
    } finally {
      setLoading(false);
    }
  };

  const simScore = result ? Math.round(result.overall_similarity * 100) : 0;
  const generateVivaQuestions = async () => {
    if (!allowCodeToGemini) {
      setVivaError('Turn on Gemini consent first. Only code1 will be sent to Google for question generation.');
      return;
    }
    setIsGeneratingQuestions(true);
    setVivaError('');
    try {
      setVivaQuestions(await generateVivaQuestionsWithGemini(code1));
    } catch (error) {
      setVivaError(error instanceof Error ? error.message : 'Unable to generate questions.');
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  const prepareStudentResponseView = () => {
    if (!result || !allowLocalEvidenceShare) return;
    const payload = {
      assignment: '',
      similarity: simScore,
      lexicalSimilarity: Math.round((result?.lexical_similarity ?? 0) * 100),
      structuralSimilarity: Math.round((result?.structural_similarity ?? 0) * 100),
      commonAlgorithm: result?.commonAlgorithm ?? null,
      lineEvidence: result?.lineEvidence ?? [],
      submittedAt: new Date().toISOString(),
      source: 'CodeGuard AI',
      code1,
      code2,
    };
    try {
      localStorage.setItem('codeguard:student-review-share', JSON.stringify(payload));
      logActivity('Student evidence prepared', 'Saved comparison context and code samples to this browser for student review.');
      setShareStudentView(true);
      setShareError('');
    } catch (error) {
      setShareError(error instanceof Error ? error.message : 'Unable to save the evidence view in this browser.');
    }
  };

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
            {showStarterConfig ? 'Hide Starter Code Filter' : 'Configure Starter Code Filter'}
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
      <div className="rounded-xl border border-[#E3E7E0] bg-white px-4 py-3 print-hidden">
        <label className="flex items-start gap-3 text-xs leading-5 text-[#5E6961]">
          <ToggleSwitch
            checked={allowCodeToGemini}
            onChange={setAllowCodeToGemini}
            label="Allow sending code to Google Gemini for optional analysis"
            className="mt-0.5"
          />
          <span>
            <strong className="text-[#202923]">Optional Gemini analysis:</strong> turn this on to send both code samples and, when enabled, the starter-code text to Google Gemini. Without consent, comparison runs locally in this browser. Do not submit student code or personal data unless authorized.
          </span>
        </label>
      </div>
      {geminiInsights && (
        <div className={`rounded-xl border px-4 py-3 text-xs leading-5 print-hidden ${
          geminiInsights.source === 'gemini'
            ? 'border-[#C3E4CF] bg-[#E4F1E9] text-[#174C3C]'
            : 'border-[#F6E0B5] bg-[#FFF1D6] text-[#7C5315]'
        }`}>
          <strong>{geminiInsights.source === 'gemini' ? 'Gemini response received.' : 'Gemini unavailable — showing local fallback findings.'}</strong>
          {geminiInsights.source === 'local-fallback' && (
            <span> Local results are heuristic only and are not AI findings. {geminiInsights.fallbackReason}</span>
          )}
        </div>
      )}

      {/* Starter Code Filter */}
      {showStarterConfig && (
        <div className="bg-white border border-[#E3E7E0] rounded-2xl p-5 space-y-3 shadow-xs print-hidden animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#202923] uppercase tracking-wider">
              <ShieldCheck size={16} className="text-[#174C3C]" /> Exact Starter N-gram Filter
            </div>
            <span className="text-[11px] text-[#707A72]">Only exact shared token 3-grams found here are ignored</span>
          </div>
          <textarea
            className="w-full h-24 bg-[#F7F6F0] border border-[#E3E7E0] rounded-xl p-3 font-mono text-xs text-[#202923] outline-none focus:border-[#174C3C]"
            value={starterCode}
            onChange={e => setStarterCode(e.target.value)}
            placeholder="Paste instructor-provided starter code here"
          />
        </div>
      )}

      {/* Main Printable Content */}
      <div id="pdf-content" className="space-y-6">
        {/* Case Header Card */}
        <div className="bg-white border border-[#E3E7E0] p-6 rounded-2xl shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold tracking-tight text-[#202923]">Pairwise Code Comparison</h2>
            </div>
            <p className="text-xs text-[#707A72] mt-1 leading-relaxed max-w-xl">
              Local token and control-construct overlap, plus optional AI code-reading assistance. This is not parsed AST analysis or a validated chance estimate.
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
                <span className="text-[10px] text-[#707A72] uppercase tracking-wider block font-bold">After starter filter</span>
                <span className="text-base font-bold text-[#174C3C]">{Math.round(result.boilerplate_filtered_similarity * 100)}%</span>
              </div>
              <div className="h-6 w-px bg-[#E3E7E0]"></div>
              <div className="text-center">
                <span className="text-[10px] uppercase tracking-wider block font-bold text-[#707A72]">Combined Overlap</span>
                <span className="text-xl font-extrabold text-[#174C3C]">
                  {simScore}%
                </span>
              </div>
            </div>
          )}
        </div>

        {identifyCommonAlgorithm(code1, code2) && (
          <div className="rounded-xl border border-[#F6E0B5] bg-[#FFF9EC] px-4 py-3 text-xs leading-5 text-[#684713]">
            <strong>Common algorithm context: {identifyCommonAlgorithm(code1, code2)}.</strong> This heuristic label is a prompt to consider assignment context, not proof that the samples are independent. The overlap measurements are unchanged; no validated chance baseline is available.
          </div>
        )}
        {auditWarning && <p role="alert" className="rounded-lg border border-[#F5C7C3] bg-[#FBE8E6] p-3 text-xs text-[#A82A2A]">{auditWarning}</p>}

        {/* Side-by-Side Code Editors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Submission 1 */}
          <div className="bg-white rounded-2xl border border-[#E3E7E0] overflow-hidden flex flex-col shadow-xs">
            <div className="bg-[#F7F6F0] border-b border-[#E3E7E0] px-4 py-3 flex justify-between items-center">
              <div>
                <span className="font-semibold text-xs text-[#202923]">First code sample</span>
              </div>
              <span className="text-[11px] text-[#707A72]">Enter code to compare</span>
            </div>
            <textarea 
              className="w-full h-[340px] font-mono text-xs p-4 bg-white text-[#202923] focus:outline-none resize-none leading-relaxed"
              value={code1}
              onChange={(e) => { setCode1(e.target.value); setShareStudentView(false); }}
              placeholder="Paste the first code sample here"
              spellCheck="false"
            />
          </div>

          {/* Submission 2 */}
          <div className="bg-white rounded-2xl border border-[#E3E7E0] overflow-hidden flex flex-col shadow-xs">
            <div className="bg-[#F7F6F0] border-b border-[#E3E7E0] px-4 py-3 flex justify-between items-center">
              <div>
                <span className="font-semibold text-xs text-[#202923]">Second code sample</span>
              </div>
              <span className="text-[11px] text-[#707A72]">Enter code to compare</span>
            </div>
            <textarea 
              className="w-full h-[340px] font-mono text-xs p-4 bg-white text-[#202923] focus:outline-none resize-none leading-relaxed"
              value={code2}
              onChange={(e) => { setCode2(e.target.value); setShareStudentView(false); }}
              placeholder="Paste the second code sample here"
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
                className={`px-6 py-3.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'patterns' ? 'border-[#174C3C] text-[#174C3C] bg-white' : 'border-transparent text-[#707A72] hover:text-[#202923]'}`}
                onClick={() => setActiveTab('patterns')}
              >
                <Flame size={14} /> Observed Patterns
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
                      {(geminiInsights ? geminiInsights.ai_analysis : result.observations).map((pt: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#707A72]">
                          <span className="text-[#174C3C] font-bold">•</span>
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>

                    <section className="mt-5 rounded-xl border border-[#E3E7E0] bg-white p-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#174C3C]">Paired exact-line evidence</h4>
                      <p className="mt-1 text-[11px] leading-5 text-[#707A72]">Whitespace and letter case are normalized. This is a direct line comparison, not AST matching; missing matches do not mean code is unrelated.</p>
                      {result.lineEvidence.length ? (
                        <ul className="mt-3 space-y-2">
                          {result.lineEvidence.map((item, index) => (
                            <li key={`${item.firstLine}-${item.secondLine}-${index}`} className="rounded-lg bg-[#F7F6F0] p-3 font-mono text-[11px] text-[#354139]">
                              <span className="mb-1 block font-sans font-semibold text-[#707A72]">Sample A line {item.firstLine} ↔ Sample B line {item.secondLine}</span>
                              <code>{item.excerpt}</code>
                            </li>
                          ))}
                        </ul>
                      ) : <p className="mt-3 text-xs text-[#707A72]">No identical non-comment lines were found by this simple check.</p>}
                    </section>

                    <div className="mt-4 pt-4 border-t border-[#E3E7E0] flex items-center justify-between print-hidden">
                      <span className="text-[11px] text-[#707A72]">
                        {geminiInsights?.source === 'gemini'
                          ? 'Local comparison plus optional Google Gemini response.'
                          : 'Local heuristic comparison only; AI was not enabled or is unavailable.'}
                      </span>
                      <Link to="/student-response" className="px-4 py-2 rounded-xl border border-[#D9DED8] bg-white text-[#174C3C] text-xs font-semibold hover:border-[#174C3C]">
                        Student evidence & response
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Component Metrics Tab */}
              {activeTab === 'metrics' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-[#F7F6F0] border border-[#E3E7E0]">
                    <span className="text-[10px] text-[#707A72] uppercase font-bold tracking-wider">Lexical 3-Gram</span>
                    <p className="text-xl font-bold text-[#202923] mt-1">{Math.round(result.lexical_similarity * 100)}%</p>
                    <p className="text-[11px] text-[#707A72] mt-1">Direct token correspondence</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F7F6F0] border border-[#E3E7E0]">
                    <span className="text-[10px] text-[#707A72] uppercase font-bold tracking-wider">Control-construct overlap</span>
                    <p className="text-xl font-bold text-[#174C3C] mt-1">{Math.round(result.structural_similarity * 100)}%</p>
                    <p className="text-[11px] text-[#707A72] mt-1">Simple line-pattern comparison</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F7F6F0] border border-[#E3E7E0]">
                    <span className="text-[10px] text-[#707A72] uppercase font-bold tracking-wider">Exact n-gram filter</span>
                    <p className="text-xl font-bold text-[#174C3C] mt-1">{Math.round(result.boilerplate_filtered_similarity * 100)}%</p>
                    <p className="text-[11px] text-[#707A72] mt-1">Exact shared token 3-grams removed</p>
                  </div>
                  <div className="rounded-xl border border-[#F6E0B5] bg-[#FFF9EC] p-4 md:col-span-3">
                    <p className="text-sm font-semibold text-[#684713]">Coincidence score unavailable</p>
                    <p className="mt-1 text-xs leading-5 text-[#7C5315]">There is no validated independent-solution baseline for this assignment. These overlap percentages cannot estimate how likely the similarity is by chance.</p>
                  </div>
                </div>
              )}

              {/* Observed Patterns Tab */}
              {activeTab === 'patterns' && (
                <div className="space-y-3">
                  {result.observations.map((observation, idx) => (
                    <div key={idx} className="rounded-xl border border-[#E3E7E0] bg-[#F7F6F0] p-4 text-sm leading-6 text-[#5E6961]">
                      <span className="mr-2 font-semibold text-[#174C3C]">{idx + 1}.</span>{observation}
                    </div>
                  ))}
                  <div className="rounded-xl border border-[#E3E7E0] bg-white p-4 text-xs leading-5 text-[#707A72]">
                    This analysis does not calculate code authorship, intent, plagiarism probability, or a statistical coincidence score.
                  </div>
                </div>
              )}

              {/* Viva Tab */}
              {activeTab === 'viva' && (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-[#F7F6F0] border border-[#E3E7E0]">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#174C3C] uppercase tracking-wider mb-2">
                      <HelpCircle size={14} /> Explain Your Code
                    </div>
                    <p className="text-xs text-[#707A72] mb-3">
                      Generate 3–5 neutral, code-grounded questions for a student conversation. Understanding answers do not prove authorship; difficulty answering is not proof of misconduct. Responses are not timed or automatically scored.
                    </p>
                    <button
                      type="button"
                      onClick={generateVivaQuestions}
                      disabled={isGeneratingQuestions}
                      className="rounded-lg bg-[#174C3C] px-4 py-2 text-xs font-semibold text-white hover:bg-[#10382D] disabled:cursor-wait disabled:opacity-60"
                    >
                      {isGeneratingQuestions ? 'Generating questions…' : 'Generate questions from first code sample'}
                    </button>
                    <p className="mt-2 text-[11px] leading-5 text-[#707A72]">
                      Requires Gemini consent above. Only the first code sample is sent to Google for question generation.
                    </p>
                    {vivaError && <p role="alert" className="mt-3 rounded-lg border border-[#F5C7C3] bg-[#FBE8E6] p-3 text-xs text-[#A82A2A]">{vivaError}</p>}
                    {vivaQuestions.length > 0 && <div className="mt-4 space-y-2">
                      {vivaQuestions.map((question, idx) => (
                        <div key={idx} className="p-3 rounded-lg bg-white border border-[#E3E7E0] text-xs text-[#202923]">
                          {idx + 1}. {question}
                        </div>
                      ))}
                    </div>}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reviewer Decision Controls */}
        <div className="bg-white border border-[#E3E7E0] rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#202923] uppercase tracking-wider">Review Process</h3>
            <span className="text-[11px] text-[#707A72]">Saved in this screen only</span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {[
              { id: 'needs_review', label: 'Context review' },
              { id: 'viva_scheduled', label: 'Student conversation planned' },
              { id: 'dismissed', label: 'Common pattern considered' },
              { id: 'reviewed', label: 'Review completed' }
            ].map(d => (
              <button
                key={d.id}
                onClick={() => {
                  const nextDecision = d.id as typeof decision;
                  setDecision(nextDecision);
                  logActivity('Review state changed', `Review state changed to ${d.label}.`);
                }}
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
              placeholder="Add notes about this comparison"
            />
          </div>
          <div className="rounded-xl border border-[#E3E7E0] bg-[#F7F6F0] p-4 print-hidden">
            <p className="text-sm font-semibold text-[#202923]">Give the student a chance to respond</p>
            <p className="mt-1 text-xs leading-5 text-[#707A72]">Prepare a same-browser view with both code samples and their overlap measurements. Nothing is synced; the code and response are saved in this browser only.</p>
            <label className="mt-3 flex items-start gap-2 text-xs leading-5 text-[#5E6961]">
              <ToggleSwitch
                checked={allowLocalEvidenceShare}
                onChange={checked => { setAllowLocalEvidenceShare(checked); setShareStudentView(false); }}
                label="Authorize saving both code samples in this browser"
                className="mt-0.5"
              />
              <span>I am authorized to save both code samples in this browser so they can be reviewed from this device.</span>
            </label>
            <button type="button" onClick={prepareStudentResponseView} disabled={!result || !allowLocalEvidenceShare} className="mt-3 rounded-lg border border-[#D9DED8] bg-white px-3 py-2 text-xs font-semibold text-[#174C3C] hover:border-[#174C3C] disabled:cursor-not-allowed disabled:opacity-50">
              Prepare student evidence view
            </button>
            {shareStudentView && <Link to="/student-response" className="ml-3 inline-flex items-center gap-1 text-xs font-semibold text-[#174C3C] hover:underline">Open response page <ChevronLeft className="rotate-180" size={13} /></Link>}
            {shareError && <p role="alert" className="mt-2 text-xs text-[#A82A2A]">{shareError}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
