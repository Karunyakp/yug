import React, { useEffect, useState } from 'react';
import { Users, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const API_BASE = 'http://localhost:8000/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    total_projects: 0,
    total_assignments: 0,
    total_submissions: 0,
    total_analyses: 0,
    pending_reviews: 0
  });

  useEffect(() => {
    fetch(`${API_BASE}/dashboard/summary`)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(console.error);
  }, []);

  const data = [
    { name: 'Safe', count: Math.max(0, stats.total_analyses - stats.pending_reviews) },
    { name: 'Flagged', count: stats.pending_reviews },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-center gap-4 text-blue-600 mb-2">
            <FileText size={24} />
            <h3 className="font-semibold text-lg text-slate-700">Submissions</h3>
          </div>
          <p className="text-3xl font-bold">{stats.total_submissions}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-center gap-4 text-green-600 mb-2">
            <CheckCircle size={24} />
            <h3 className="font-semibold text-lg text-slate-700">Analyses Done</h3>
          </div>
          <p className="text-3xl font-bold">{stats.total_analyses}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-center gap-4 text-amber-600 mb-2">
            <AlertTriangle size={24} />
            <h3 className="font-semibold text-lg text-slate-700">Pending Review</h3>
          </div>
          <p className="text-3xl font-bold">{stats.pending_reviews}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 h-96">
        <h3 className="font-semibold text-lg text-slate-700 mb-6">Analysis Status Distribution</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
