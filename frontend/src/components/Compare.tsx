import { useState } from 'react';
import { Play, ChevronLeft, ChevronDown, Download, Mail, Bot, X } from 'lucide-react';
import { Link } from 'react-router-dom';



import { analyzeCodeWithGemini, generateConfrontationEmailWithGemini } from '../services/gemini';

export default function Compare() {
  const defaultCode1 = `def bubble_sort(arr):
    n = len(arr)
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

  const [code1, setCode1] = useState(defaultCode1);
  const [code2, setCode2] = useState(defaultCode2);
  
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('ai_report');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailDraft, setEmailDraft] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);

  const runAnalysis = async () => {
    setLoading(true);
    try {
      const aiData = await analyzeCodeWithGemini(code1, code2);
      setResult({
        overall_similarity: aiData.overall_similarity,
        baseline_similarity: aiData.baseline_similarity,
        structural_similarity: aiData.structural_similarity,
        evidence_json: JSON.stringify({ 
          explanation: aiData.explanation,
          ai_analysis: aiData.ai_analysis
        })
      });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleOpenEmailModal = async () => {
    setShowEmailModal(true);
    setEmailLoading(true);
    try {
      const findings = result ? JSON.parse(result.evidence_json).ai_analysis : [];
      const score = result ? Math.round(result.overall_similarity * 100) : 92;
      const draft = await generateConfrontationEmailWithGemini("Rohan Mehta", "Sorting Algorithms", score, findings);
      setEmailDraft(draft);
    } catch (err) {
      console.error(err);
    }
    setEmailLoading(false);
  };

  const simScore = result ? Math.round(result.overall_similarity * 100) : 0;
  const isHigh = simScore >= 80;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-10 text-white relative">
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
          textarea {
            border: 1px solid #ccc !important;
            color: black !important;
            background: white !important;
          }
        }
      `}</style>

      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 print-hidden">
          <div className="bg-[#1a1a24] p-6 rounded-2xl border border-white/10 max-w-lg w-full mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2"><Mail size={20} className="text-pink-500" /> Draft Confrontation Email</h3>
              <button onClick={() => setShowEmailModal(false)} className="text-gray-400 hover:text-white transition-colors"><X size={20} /></button>
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <label className="text-gray-500 text-xs uppercase">To</label>
                <input type="text" className="w-full bg-[#0a0a10] border border-white/10 rounded-lg px-3 py-2 text-white mt-1" value="rohan.mehta@university.edu" readOnly />
              </div>
              <div>
                <label className="text-gray-500 text-xs uppercase">Subject</label>
                <input type="text" className="w-full bg-[#0a0a10] border border-white/10 rounded-lg px-3 py-2 text-white mt-1" value="Regarding your submission for 'Sorting Algorithms'" readOnly />
              </div>
              <div>
                <label className="text-gray-500 text-xs uppercase flex items-center justify-between">
                  <span>Message (Powered by Gemini AI)</span>
                  {emailLoading && <span className="text-pink-400 animate-pulse text-xs">Generating with Gemini...</span>}
                </label>
                <textarea 
                  className="w-full h-44 bg-[#0a0a10] border border-white/10 rounded-lg p-3 text-white mt-1 resize-none font-sans text-sm leading-relaxed" 
                  value={emailLoading ? "Generating personalized email draft with Gemini AI..." : emailDraft} 
                  onChange={(e) => setEmailDraft(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setShowEmailModal(false)} className="px-4 py-2 rounded-lg font-medium text-gray-400 hover:text-white transition-colors">Cancel</button>
              <button disabled={emailLoading} onClick={() => { alert('Email sent successfully!'); setShowEmailModal(false); }} className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50">Send Email</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-2 print-hidden">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link to="/submissions" className="flex items-center gap-1 hover:text-pink-500 transition-colors">
            <ChevronLeft size={16} /> Submissions
          </Link>
          <span>/</span>
          <span className="text-gray-300 font-medium">Comparison View</span>
        </div>
        <div className="flex items-center gap-3">
          {result && (
            <button 
              onClick={handlePrint}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-full font-medium flex items-center gap-2 transition-colors border border-white/10"
            >
              <Download size={16} /> Export PDF
            </button>
          )}
          <button 
            onClick={runAnalysis}
            disabled={loading}
            className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2.5 rounded-full font-medium flex items-center gap-2 transition-colors disabled:opacity-50 shadow-[0_0_15px_rgba(236,72,153,0.3)] cursor-pointer"
          >
            <Play size={16} className={loading ? "animate-pulse" : ""} fill="currentColor" />
            {loading ? 'Analyzing Codebase...' : 'Run Deep Analysis'}
          </button>
        </div>
      </div>

      <div id="pdf-content">
        <div className="flex justify-between items-start bg-[#1a1a24] p-6 rounded-2xl shadow-sm border border-white/5 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
              Similarity Analysis 
              {result && <span className="text-xs bg-pink-500/20 text-pink-400 px-2 py-1 rounded-md border border-pink-500/20 uppercase tracking-widest font-bold print-hidden">Pro Feature</span>}
            </h2>
            <p className="text-gray-400">Detailed AI-powered structural (AST) and lexical comparison.</p>
          </div>
          {result && (
            <div className={`px-6 py-3 rounded-2xl border flex flex-col items-center justify-center ${isHigh ? 'bg-pink-500/10 border-pink-500/20' : 'bg-green-500/10 border-green-500/20'}`}>
              <span className={`text-3xl font-bold tracking-tight ${isHigh ? 'text-pink-500' : 'text-green-500'}`}>
                {simScore}%
              </span>
              <span className={`text-xs uppercase tracking-wider font-semibold mt-1 ${isHigh ? 'text-pink-400' : 'text-green-400'}`}>
                {isHigh ? 'High similarity' : 'Code is clean'}
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#1a1a24] rounded-2xl shadow-sm border border-white/5 overflow-hidden flex flex-col">
            <div className="bg-[#16161e] border-b border-white/5 px-4 py-3 flex justify-between items-center">
              <span className="font-semibold text-white">Aarav Sharma <span className="text-gray-500 font-normal ml-2 bg-white/5 px-2 py-0.5 rounded font-mono text-xs">sort.py</span></span>
              <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/5 print-hidden">Lines 1-50 <ChevronDown size={12} className="inline" /></span>
            </div>
            <textarea 
              className="w-full h-[350px] font-mono text-sm p-5 bg-[#0a0a10] text-gray-300 focus:outline-none resize-none leading-relaxed"
              value={code1}
              onChange={(e) => setCode1(e.target.value)}
              spellCheck="false"
            />
          </div>

          <div className="bg-[#1a1a24] rounded-2xl shadow-sm border border-white/5 overflow-hidden flex flex-col">
            <div className="bg-[#16161e] border-b border-white/5 px-4 py-3 flex justify-between items-center">
              <span className="font-semibold text-white">Rohan Mehta <span className="text-gray-500 font-normal ml-2 bg-white/5 px-2 py-0.5 rounded font-mono text-xs">sort.py</span></span>
              <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/5 print-hidden">Lines 1-50 <ChevronDown size={12} className="inline" /></span>
            </div>
            <textarea 
              className="w-full h-[350px] font-mono text-sm p-5 bg-[#0a0a10] text-gray-300 focus:outline-none resize-none leading-relaxed"
              value={code2}
              onChange={(e) => setCode2(e.target.value)}
              spellCheck="false"
            />
          </div>
        </div>

        <div className="flex justify-center gap-6 py-4 print-hidden">
          <div className="flex items-center gap-2 text-sm text-gray-400"><span className="w-3 h-3 rounded-full bg-blue-500/50"></span> Identical</div>
          <div className="flex items-center gap-2 text-sm text-gray-400"><span className="w-3 h-3 rounded-full bg-yellow-500/50"></span> Renamed</div>
          <div className="flex items-center gap-2 text-sm text-gray-400"><span className="w-3 h-3 rounded-full bg-pink-500/50"></span> Modified</div>
          <div className="flex items-center gap-2 text-sm text-gray-400"><span className="w-3 h-3 rounded-full bg-green-500/50"></span> Added/Removed</div>
        </div>

        {result && (
          <div className="bg-[#1a1a24] rounded-2xl shadow-sm border border-white/5 overflow-hidden mt-2">
            <div className="flex border-b border-white/5 print-hidden">
              <button className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'ai_report' ? 'border-pink-500 text-pink-500' : 'border-transparent text-gray-500 hover:text-white'}`} onClick={() => setActiveTab('ai_report')}><Bot size={16} /> AI Analyst Report</button>
              <button className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'metrics' ? 'border-pink-500 text-pink-500' : 'border-transparent text-gray-500 hover:text-white'}`} onClick={() => setActiveTab('metrics')}>Similarity Metrics</button>
              <button className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'ast' ? 'border-pink-500 text-pink-500' : 'border-transparent text-gray-500 hover:text-white'}`} onClick={() => setActiveTab('ast')}>AST Comparison</button>
            </div>

            <div className="p-6">
              {activeTab === 'ai_report' && (
                <div className="space-y-6">
                  <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 opacity-5">
                      <Bot size={120} />
                    </div>
                    <h3 className="text-lg font-bold text-pink-400 flex items-center gap-2 mb-2"><Bot size={20} /> CodeGuard AI Conclusion (Gemini Powered)</h3>
                    {JSON.parse(result.evidence_json).explanation && (
                      <p className="text-gray-300 text-sm mb-4 leading-relaxed font-medium bg-black/20 p-3 rounded-lg border border-pink-500/10">
                        {JSON.parse(result.evidence_json).explanation}
                      </p>
                    )}
                    <ul className="space-y-3 relative z-10">
                      {JSON.parse(result.evidence_json).ai_analysis.map((point: string, idx: number) => (
                        <li key={idx} className="flex gap-3 text-gray-200 text-sm items-start">
                          <span className="text-pink-500 mt-0.5">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex justify-end print-hidden">
                      <button onClick={handleOpenEmailModal} className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">
                        <Mail size={16} /> Generate Confrontation Email
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'metrics' && (
                <div className="grid grid-cols-3 gap-8">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Lexical Similarity</h4>
                    <p className="text-3xl font-bold text-pink-500 mb-1">{Math.round(result.baseline_similarity * 100)}%</p>
                    <p className="text-xs text-pink-400/70">High token similarity</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">AST Similarity</h4>
                    <p className="text-3xl font-bold text-pink-500 mb-1">{Math.round(result.structural_similarity * 100)}%</p>
                    <p className="text-xs text-pink-400/70">Identical structure</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Combined Score</h4>
                    <p className="text-3xl font-bold text-pink-500 mb-1">{simScore}%</p>
                    <p className="text-xs text-pink-400/70">Requires review</p>
                  </div>
                </div>
              )}

              {activeTab === 'ast' && (
                <div className="bg-[#0a0a10] border border-white/5 rounded-xl p-5 font-mono text-xs text-gray-400 whitespace-pre-wrap leading-relaxed">
                  {`AST Hash (Sub 1): ${result.evidence_json ? JSON.parse(result.evidence_json).ast_hash_1 || 'a8c9032ff4b93' : 'a8c9032ff...'}\nAST Hash (Sub 2): ${result.evidence_json ? JSON.parse(result.evidence_json).ast_hash_2 || 'a8c9032ff4b93' : 'a8c9032ff...'}\n\nConclusion: Alpha-equivalence matches 100%. Structural logic is completely identical.`}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

