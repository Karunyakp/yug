import { useState } from 'react';
import {
  FileText,
  Download
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Link } from 'react-router-dom';
import { getLocalAccountsForExport } from '../services/localAuth';

function csvCell(value: string | number): string {
  const text = String(value);
  const safeText = /^[=+\-@\t\r]/.test(text) ? `'${text}` : text;
  return `"${safeText.replace(/"/g, '""')}"`;
}

function downloadCSV(filename: string, rows: (string | number)[][]): void {
  const csv = rows.map(row => row.map(csvCell).join(',')).join('\r\n');
  const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export default function Reports() {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Top Matches' | 'Dossier'>('Overview');

  const similarityTrendData = [
    { month: 'Jun', similarity: 22 },
    { month: 'Jul', similarity: 25 },
    { month: 'Aug', similarity: 30 },
    { month: 'Sep', similarity: 28 },
    { month: 'Oct', similarity: 24 },
    { month: 'Nov', similarity: 26 },
  ];

  const languageDistributionData = [
    { name: 'Python', value: 42, color: '#E02875' },
    { name: 'Java', value: 28, color: '#8A63D2' },
    { name: 'C++', value: 18, color: '#00D2D3' },
    { name: 'JavaScript', value: 12, color: '#10B981' },
  ];

  const topSimilarityCases = [
    { id: 1, student1: 'Aarav Sharma', student2: 'Rohan Mehta', assignment: 'Sorting Visualizer', similarity: 92, status: 'Viva Scheduled' },
    { id: 2, student1: 'Karan Gupta', student2: 'Neha Reddy', assignment: 'Graph Algorithms', similarity: 89, status: 'Pending Review' },
    { id: 3, student1: 'Priya Nair', student2: 'Sneha Iyer', assignment: 'Data Structures', similarity: 76, status: 'Resolved Clean' },
    { id: 4, student1: 'Arjun Singh', student2: 'Isha Patel', assignment: 'Dynamic Programming', similarity: 71, status: 'Under Review' },
  ];
  const localAccounts = getLocalAccountsForExport();

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleDownloadCSV = () => {
    downloadCSV('codeguard_academic_integrity_report.csv', [
      ['Case ID', 'Student 1', 'Student 2', 'Assignment', 'Similarity %', 'Status'],
      ...topSimilarityCases.map(item => [
        item.id,
        item.student1,
        item.student2,
        item.assignment,
        item.similarity,
        item.status,
      ]),
    ]);
  };

  const handleExportAccounts = () => {
    const accounts = getLocalAccountsForExport();
    downloadCSV('codeguard-local-accounts.csv', [
      ['Name', 'Email', 'Created at'],
      ...accounts.map(account => [account.name, account.email, account.createdAt]),
    ]);
  };

  return (
    <div className="legacy-dark-page space-y-6 pb-16 text-[#F3F4F6]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print-hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E02875]/10 border border-[#E02875]/20 text-[#E02875] text-xs font-semibold uppercase tracking-wider mb-2">
            <FileText size={13} /> Institutional Records
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Reports & Evidentiary Dossiers</h1>
          <p className="text-xs text-[#8E99B7] mt-1">
            Generate formal, auditable academic integrity documentation for departmental review committees.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleDownloadCSV}
            className="px-4 py-2.5 rounded-xl bg-[#15192B] border border-[#1F263E] text-xs font-semibold text-[#DCE1EE] hover:text-white flex items-center gap-2 transition-all cursor-pointer"
          >
            <Download size={14} /> Export CSV
          </button>
          <button
            onClick={handleExportAccounts}
            disabled={localAccounts.length === 0}
            title={localAccounts.length === 0 ? 'No locally created accounts to export' : 'Export local account names and email addresses'}
            className="px-4 py-2.5 rounded-xl bg-white border border-[#E3E7E0] text-xs font-semibold text-[#174C3C] hover:bg-[#F7F6F0] flex items-center gap-2 transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download size={14} /> Export Accounts ({localAccounts.length})
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-5 py-2.5 rounded-xl bg-[#E02875] hover:bg-[#C2185B] text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-md shadow-[#E02875]/20 cursor-pointer"
          >
            <Download size={14} /> One-Click PDF Report
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#1F263E] flex gap-8 text-xs font-semibold print-hidden">
        {['Overview', 'Top Matches', 'Dossier'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`py-3 transition-colors border-b-2 cursor-pointer ${
              activeTab === tab
                ? 'border-[#E02875] text-[#E02875]'
                : 'border-transparent text-[#8E99B7] hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'Overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Trend Chart */}
            <div className="bg-[#101422] rounded-3xl p-6 border border-[#1F263E] shadow-xl">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Monthly Similarity Trajectory</h3>
              <p className="text-xs text-[#8E99B7] mb-6">Median similarity recorded across introductory courses</p>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={similarityTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1F263E" vertical={false} />
                    <XAxis dataKey="month" stroke="#69759B" tick={{ fill: '#8E99B7', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis stroke="#69759B" tick={{ fill: '#8E99B7', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#101422', border: '1px solid #1F263E', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                    <Line type="monotone" dataKey="similarity" stroke="#E02875" strokeWidth={3} dot={{ fill: '#E02875', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Language Distribution */}
            <div className="bg-[#101422] rounded-3xl p-6 border border-[#1F263E] shadow-xl">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Programming Language Breakdown</h3>
              <p className="text-xs text-[#8E99B7] mb-6">Volume of code evaluated by runtime grammar</p>
              <div className="h-[220px] flex items-center justify-between">
                <div className="w-1/2 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={languageDistributionData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value">
                        {languageDistributionData.map((e, idx) => (
                          <Cell key={idx} fill={e.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#101422', border: '1px solid #1F263E', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-1/2 space-y-2 text-xs">
                  {languageDistributionData.map(l => (
                    <div key={l.name} className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-[#8E99B7]">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }}></span>
                        {l.name}
                      </span>
                      <span className="font-mono font-bold text-white">{l.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Matches Tab */}
      {activeTab === 'Top Matches' && (
        <div className="bg-[#101422] border border-[#1F263E] rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#1F263E] bg-[#15192B]/50 text-[#8E99B7] uppercase tracking-wider">
                  <th className="px-6 py-4">Submission Pair</th>
                  <th className="px-6 py-4">Assignment</th>
                  <th className="px-6 py-4 text-center">Similarity</th>
                  <th className="px-6 py-4">Review Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F263E]">
                {topSimilarityCases.map(c => (
                  <tr key={c.id} className="hover:bg-[#15192B]/40 transition-colors">
                    <td className="px-6 py-4 font-semibold text-white">
                      {c.student1} <span className="text-[#8E99B7] font-normal">vs</span> {c.student2}
                    </td>
                    <td className="px-6 py-4 text-[#8E99B7]">{c.assignment}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-mono font-bold px-2 py-0.5 rounded bg-[#E02875]/15 text-[#E02875] border border-[#E02875]/20">
                        {c.similarity}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#15192B] border border-[#1F263E] text-[#DCE1EE]">
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link to="/compare" className="text-[#E02875] hover:underline font-semibold">
                        View Dossier →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Formal PDF Report Dossier View (Clean, printable academic layout) */}
      {activeTab === 'Dossier' && (
        <div className="bg-[#101422] border border-[#1F263E] rounded-3xl p-8 space-y-6 shadow-2xl">
          <div className="border-b border-[#1F263E] pb-6 flex justify-between items-start">
            <div>
              <p className="text-[11px] font-mono uppercase tracking-widest text-[#E02875]">Department of Computer Science • CodeGuard Academic Integrity</p>
              <h2 className="text-2xl font-bold text-white mt-1">Official Review Dossier #AR-2026-084</h2>
              <p className="text-xs text-[#8E99B7] mt-1">Generated on 11 Oct 2026 • Lead Reviewer: Prof. Verma</p>
            </div>
            <button onClick={handleDownloadPDF} className="px-4 py-2 bg-[#E02875] text-white text-xs font-semibold rounded-xl print-hidden">
              Print / Save PDF
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#15192B] border border-[#1F263E]">
              <span className="text-[#8E99B7] uppercase font-bold text-[10px]">Subject Assignment</span>
              <p className="text-white font-semibold mt-1">CS-204: Sorting Visualizer</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#15192B] border border-[#1F263E]">
              <span className="text-[#8E99B7] uppercase font-bold text-[10px]">Submissions Evaluated</span>
              <p className="text-white font-semibold mt-1">Aarav Sharma & Rohan Mehta</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#15192B] border border-[#1F263E]">
              <span className="text-[#8E99B7] uppercase font-bold text-[10px]">AST Congruence Index</span>
              <p className="text-[#E02875] font-mono font-bold mt-1">92% (High Correlation)</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#15192B] border border-[#1F263E] text-xs space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Methodology & Evidentiary Findings</h4>
            <p className="text-[#DCE1EE] leading-relaxed">
              Submissions were canonicalized through multi-pass AST alpha-conversion and lexical token 3-gram indexing. Instructor starter boilerplate code was excluded. The inner loop boundaries and temporary variable mutation sequence display 100% logic preservation across identifier substitutions.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0B0D14] border border-[#1F263E] text-xs space-y-2">
            <h4 className="font-bold text-[#E02875] uppercase text-[11px] tracking-wider">Academic Integrity Committee Recommendation</h4>
            <p className="text-[#8E99B7] leading-relaxed">
              Schedule oral viva examination. The student should be asked to explain memory state mutations during the inner loop pass without external notes.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
