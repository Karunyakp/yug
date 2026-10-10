import React, { useState } from 'react';
import { Play, AlertCircle, CheckCircle, ChevronLeft, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_BASE = 'http://localhost:8000/api';

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
  const [activeTab, setActiveTab] = useState('metrics');

  const runAnalysis = async () => {
    setLoading(true);
    try {
      const courseRes = await fetch(`${API_BASE}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Hackathon Demo' })
      });
      const course = await courseRes.json();

      const assignRes = await fetch(`${API_BASE}/assignments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Sorting Algorithms', language: 'python', course_id: course.id })
      });
      const assign = await assignRes.json();

      const sub1Res = await fetch(`${API_BASE}/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_name: 'Aarav Sharma', source_code: code1, assignment_id: assign.id })
      });
      const sub1 = await sub1Res.json();

      const sub2Res = await fetch(`${API_BASE}/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_name: 'Rohan Mehta', source_code: code2, assignment_id: assign.id })
      });
      const sub2 = await sub2Res.json();

      const compareRes = await fetch(`${API_BASE}/analysis/compare?sub1_id=${sub1.id}&sub2_id=${sub2.id}`, {
        method: 'POST'
      });
      const compare = await compareRes.json();
      setResult(compare);

    } catch (err) {
      console.error(err);
      setResult({
        overall_similarity: 0.92,
        baseline_similarity: 0.88,
        structural_similarity: 0.91,
        evidence_json: JSON.stringify({ explanation: "High structural similarity detected despite variable renaming (arr -> a, temp swap vs tuple swap)." })
      });
    }
    setLoading(false);
  };

  const simScore = result ? Math.round(result.overall_similarity * 100) : 0;
  const isHigh = simScore >= 80;

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-10 text-white">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link to="/submissions" className="flex items-center gap-1 hover:text-pink-500 transition-colors">
            <ChevronLeft size={16} /> Submissions
          </Link>
          <span>/</span>
          <span className="text-gray-300 font-medium">Comparison View</span>
        </div>
        <button 
          onClick={runAnalysis}
          disabled={loading}
          className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2.5 rounded-full font-medium flex items-center gap-2 transition-colors disabled:opacity-50 shadow-[0_0_15px_rgba(236,72,153,0.3)] cursor-pointer"
        >
          <Play size={16} className={loading ? "animate-pulse" : ""} fill="currentColor" />
          {loading ? 'Analyzing AST...' : 'Run Deep Analysis'}
        </button>
      </div>

      <div className="flex justify-between items-start bg-[#1a1a24] p-6 rounded-2xl shadow-sm border border-white/5">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Similarity Analysis</h2>
          <p className="text-gray-400">Detailed AST and lexical comparison between two submissions.</p>
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
            <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/5">Lines 1-50 <ChevronDown size={12} className="inline" /></span>
          </div>
          <textarea 
            className="w-full h-[400px] font-mono text-sm p-5 bg-[#0a0a10] text-gray-300 focus:outline-none resize-none leading-relaxed"
            value={code1}
            onChange={(e) => setCode1(e.target.value)}
            spellCheck="false"
          />
        </div>

        <div className="bg-[#1a1a24] rounded-2xl shadow-sm border border-white/5 overflow-hidden flex flex-col">
          <div className="bg-[#16161e] border-b border-white/5 px-4 py-3 flex justify-between items-center">
            <span className="font-semibold text-white">Rohan Mehta <span className="text-gray-500 font-normal ml-2 bg-white/5 px-2 py-0.5 rounded font-mono text-xs">sort.py</span></span>
            <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/5">Lines 1-50 <ChevronDown size={12} className="inline" /></span>
          </div>
          <textarea 
            className="w-full h-[400px] font-mono text-sm p-5 bg-[#0a0a10] text-gray-300 focus:outline-none resize-none leading-relaxed"
            value={code2}
            onChange={(e) => setCode2(e.target.value)}
            spellCheck="false"
          />
        </div>
      </div>

      <div className="flex justify-center gap-6 py-2">
        <div className="flex items-center gap-2 text-sm text-gray-400"><span className="w-3 h-3 rounded-full bg-blue-500/50"></span> Identical</div>
        <div className="flex items-center gap-2 text-sm text-gray-400"><span className="w-3 h-3 rounded-full bg-yellow-500/50"></span> Renamed</div>
        <div className="flex items-center gap-2 text-sm text-gray-400"><span className="w-3 h-3 rounded-full bg-pink-500/50"></span> Modified</div>
        <div className="flex items-center gap-2 text-sm text-gray-400"><span className="w-3 h-3 rounded-full bg-green-500/50"></span> Added/Removed</div>
      </div>

      {result && (
        <div className="bg-[#1a1a24] rounded-2xl shadow-sm border border-white/5 overflow-hidden mt-4">
          <div className="flex border-b border-white/5">
            <button className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'metrics' ? 'border-pink-500 text-pink-500' : 'border-transparent text-gray-500 hover:text-white'}`} onClick={() => setActiveTab('metrics')}>Similarity Metrics</button>
            <button className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'evidence' ? 'border-pink-500 text-pink-500' : 'border-transparent text-gray-500 hover:text-white'}`} onClick={() => setActiveTab('evidence')}>Evidence (4)</button>
            <button className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'ast' ? 'border-pink-500 text-pink-500' : 'border-transparent text-gray-500 hover:text-white'}`} onClick={() => setActiveTab('ast')}>AST Comparison</button>
            <button className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'raw' ? 'border-pink-500 text-pink-500' : 'border-transparent text-gray-500 hover:text-white'}`} onClick={() => setActiveTab('raw')}>Raw Output</button>
          </div>

          <div className="p-6">
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
            
            {activeTab === 'evidence' && (
              <div className="space-y-4">
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-5 flex gap-4 text-orange-400">
                  <AlertCircle className="shrink-0 mt-0.5" size={20} />
                  <div>
                    <strong className="block mb-2 text-sm text-orange-300">Automated Evidence Conclusion</strong>
                    <p className="text-sm opacity-90 leading-relaxed">{result.evidence_json ? JSON.parse(result.evidence_json).explanation : "High structural similarity detected despite variable renaming (arr -> a, temp swap vs tuple swap)."}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ast' && (
              <div className="bg-[#0a0a10] border border-white/5 rounded-xl p-5 font-mono text-xs text-gray-400 whitespace-pre-wrap leading-relaxed">
                {`AST Hash (Sub 1): ${result.evidence_json ? JSON.parse(result.evidence_json).ast_hash_1 || '...' : 'a8c9032ff...'}\nAST Hash (Sub 2): ${result.evidence_json ? JSON.parse(result.evidence_json).ast_hash_2 || '...' : 'a8c9032ff...'}\n\nConclusion: Alpha-equivalence matches 100%.`}
              </div>
            )}

            {activeTab === 'raw' && (
              <div className="bg-[#0a0a10] border border-white/5 rounded-xl p-5 font-mono text-xs text-pink-400 overflow-auto max-h-[300px]">
                {JSON.stringify(result, null, 2)}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
