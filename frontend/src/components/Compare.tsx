import React, { useState } from 'react';
import { Play, AlertCircle, FileCode } from 'lucide-react';

const API_BASE = 'http://localhost:8000/api';

export default function Compare() {
  const [code1, setCode1] = useState('def calculate_sum(a, b):\n    # Calculates the sum\n    total = a + b\n    return total\n');
  const [code2, setCode2] = useState('def get_sum(x, y):\n    # Re-named variables\n    result = x + y\n    return result\n');
  
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runAnalysis = async () => {
    setLoading(true);
    try {
      // Create course/assignment/submissions for MVP testing
      const courseRes = await fetch(`${API_BASE}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Hackathon Demo' })
      });
      const course = await courseRes.json();

      const assignRes = await fetch(`${API_BASE}/assignments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Test Task', language: 'python', course_id: course.id })
      });
      const assign = await assignRes.json();

      const sub1Res = await fetch(`${API_BASE}/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_name: 'Student A', source_code: code1, assignment_id: assign.id })
      });
      const sub1 = await sub1Res.json();

      const sub2Res = await fetch(`${API_BASE}/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_name: 'Student B', source_code: code2, assignment_id: assign.id })
      });
      const sub2 = await sub2Res.json();

      const compareRes = await fetch(`${API_BASE}/analysis/compare?sub1_id=${sub1.id}&sub2_id=${sub2.id}`, {
        method: 'POST'
      });
      const compare = await compareRes.json();
      setResult(compare);

    } catch (err) {
      console.error(err);
      alert('Analysis failed. Make sure backend is running.');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Code Analysis Workspace</h2>
        <button 
          onClick={runAnalysis}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium disabled:opacity-50"
        >
          <Play size={18} />
          {loading ? 'Analyzing...' : 'Run Analysis'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="font-semibold flex items-center gap-2">
            <FileCode size={18} /> Submission A
          </label>
          <textarea 
            className="w-full h-80 font-mono text-sm p-4 border rounded bg-slate-50 focus:ring focus:ring-blue-200 focus:outline-none"
            value={code1}
            onChange={(e) => setCode1(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="font-semibold flex items-center gap-2">
            <FileCode size={18} /> Submission B
          </label>
          <textarea 
            className="w-full h-80 font-mono text-sm p-4 border rounded bg-slate-50 focus:ring focus:ring-blue-200 focus:outline-none"
            value={code2}
            onChange={(e) => setCode2(e.target.value)}
          />
        </div>
      </div>

      {result && (
        <div className="bg-white border rounded-lg p-6 shadow-sm mt-6">
          <h3 className="text-xl font-bold mb-4 border-b pb-2">Analysis Results</h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-slate-50 rounded text-center">
              <div className="text-sm text-slate-500 font-medium">Overall Similarity</div>
              <div className="text-3xl font-bold text-blue-600">{(result.overall_similarity * 100).toFixed(1)}%</div>
            </div>
            <div className="p-4 bg-slate-50 rounded text-center">
              <div className="text-sm text-slate-500 font-medium">Baseline (Lexical)</div>
              <div className="text-xl font-semibold text-slate-700">{(result.baseline_similarity * 100).toFixed(1)}%</div>
            </div>
            <div className="p-4 bg-slate-50 rounded text-center">
              <div className="text-sm text-slate-500 font-medium">Structural (AST)</div>
              <div className="text-xl font-semibold text-slate-700">{(result.structural_similarity * 100).toFixed(1)}%</div>
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded p-4 flex gap-3 text-amber-800">
            <AlertCircle className="shrink-0" />
            <div>
              <strong className="block mb-1">Evidence Summary</strong>
              {result.evidence_json ? JSON.parse(result.evidence_json).explanation : "No evidence available."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
