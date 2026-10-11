import { Link } from 'react-router-dom';
import {
  Plus,
  ChevronRight,
  Share2,
  Sparkles
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const kpis = [
  { title: 'Total Assignments', value: '12', subtitle: '4 Active this week', change: '+2', color: '#00D2D3' },
  { title: 'Submissions Tracked', value: '248', subtitle: '98% on-time submission rate', change: '+18 today', color: '#8A63D2' },
  { title: 'Flagged for Viva', value: '18', subtitle: '3 High-confidence clusters', change: 'Action required', color: '#E02875' },
  { title: 'Pending Faculty Reviews', value: '7', subtitle: 'Avg turnaround: 1.8 days', change: '-4 this week', color: '#10B981' },
];

const barData = [
  { name: 'Jun', total: 65, high: 28 },
  { name: 'Jul', total: 59, high: 48 },
  { name: 'Aug', total: 80, high: 40 },
  { name: 'Sep', total: 81, high: 19 },
  { name: 'Oct', total: 56, high: 36 },
  { name: 'Nov', total: 55, high: 27 },
];

const pieData = [
  { name: '0-20% Baseline Clean', value: 42, color: '#10B981' },
  { name: '20-40% Normal Variance', value: 22, color: '#00D2D3' },
  { name: '40-60% Moderate Similarity', value: 16, color: '#F59E0B' },
  { name: '60-80% Elevated Overlap', value: 12, color: '#8A63D2' },
  { name: '80-100% Critical AST Match', value: 8, color: '#E02875' },
];

const recentSubmissions = [
  { id: 1, initials: 'AS', name: 'Aarav Sharma', assignment: 'Sorting Visualizer', date: '24 Nov, 10:42 AM', similarity: '92%', status: 'Flagged for Viva', cluster: 'Cluster A' },
  { id: 2, initials: 'RM', name: 'Rohan Mehta', assignment: 'Sorting Visualizer', date: '24 Nov, 09:12 AM', similarity: '92%', status: 'Flagged for Viva', cluster: 'Cluster A' },
  { id: 3, initials: 'VJ', name: 'Vivaan Joshi', assignment: 'Sorting Visualizer', date: '23 Nov, 4:20 PM', similarity: '88%', status: 'Under Review', cluster: 'Cluster A' },
  { id: 4, initials: 'KG', name: 'Karan Gupta', assignment: 'Graph Algorithms', date: '23 Nov, 11:02 AM', similarity: '89%', status: 'Under Review', cluster: 'Cluster B' },
  { id: 5, initials: 'AR', name: 'Ananya Rao', assignment: 'A* Implementation', date: '22 Nov, 6:30 PM', similarity: '8%', status: 'Clean Baseline', cluster: 'None' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 pb-16 text-[#F3F4F6]">
      {/* Header and Quick Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Department Overview</h1>
          <p className="text-xs text-[#8E99B7] mt-1">
            Welcome back, Prof. Verma. 3 high-similarity cases require viva schedule determination today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/network"
            className="px-4 py-2 rounded-xl bg-[#15192B] border border-[#1F263E] text-xs font-semibold text-[#DCE1EE] hover:text-white flex items-center gap-2 transition-all"
          >
            <Share2 size={14} className="text-[#00D2D3]" /> Collusion Network
          </Link>
          <Link
            to="/compare"
            className="px-4 py-2 rounded-xl bg-[#E02875] hover:bg-[#C2185B] text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-md shadow-[#E02875]/25"
          >
            <Plus size={14} /> New Code Comparison
          </Link>
        </div>
      </div>

      {/* Advisory Banner */}
      <div className="bg-[#101422] border border-[#1F263E] rounded-3xl p-6 relative overflow-hidden shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E02875]/10 border border-[#E02875]/20 text-[#E02875] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles size={12} /> Live Evaluator Recommendation
            </div>
            <h2 className="text-xl font-bold text-white">
              Cluster A (CS-204) Flagged for Systematic Identifier Mutation
            </h2>
            <p className="text-xs text-[#8E99B7] mt-1.5 leading-relaxed">
              3 submissions (Sharma, Mehta, Joshi) share 92% AST control-flow isomorphism despite varied variable names. Exclude starter code to view isolated student diffs.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              to="/compare"
              className="px-4 py-2.5 rounded-xl bg-[#E02875] text-white text-xs font-semibold hover:bg-[#C2185B] transition-all"
            >
              Inspect Cluster Diff
            </Link>
            <Link
              to="/reports"
              className="px-4 py-2.5 rounded-xl bg-[#15192B] border border-[#1F263E] text-xs text-[#DCE1EE] hover:text-white transition-all"
            >
              Export Report
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-[#101422] rounded-3xl p-5 border border-[#1F263E] shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-[#8E99B7] uppercase tracking-wider">{kpi.title}</span>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: kpi.color }}></span>
              </div>
              <p className="text-3xl font-extrabold font-mono text-white tracking-tight">{kpi.value}</p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#1F263E] flex items-center justify-between text-xs">
              <span className="text-[#8E99B7]">{kpi.subtitle}</span>
              <span className="font-semibold text-white font-mono">{kpi.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submission Trends Bar Chart */}
        <div className="bg-[#101422] rounded-3xl p-6 border border-[#1F263E] shadow-xl flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Submission & Similarity Volume</h3>
              <p className="text-xs text-[#8E99B7]">Total submissions vs elevated similarity (&gt;60%)</p>
            </div>
            <select className="bg-[#15192B] border border-[#1F263E] text-xs rounded-xl px-3 py-1.5 text-white outline-none">
              <option>Fall 2026</option>
              <option>Spring 2026</option>
            </select>
          </div>

          <div className="flex-1 min-h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F263E" vertical={false} />
                <XAxis dataKey="name" stroke="#69759B" tick={{ fill: '#8E99B7', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#69759B" tick={{ fill: '#8E99B7', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: '#15192B' }}
                  contentStyle={{ backgroundColor: '#101422', border: '1px solid #1F263E', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="total" fill="#252D48" radius={[6, 6, 0, 0]} barSize={16} />
                <Bar dataKey="high" fill="#E02875" radius={[6, 6, 0, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-[#1F263E] text-xs text-[#8E99B7]">
            <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#252D48]"></span> Total Submissions</span>
            <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#E02875]"></span> Elevated Similarity</span>
          </div>
        </div>

        {/* Similarity Distribution Pie Chart */}
        <div className="bg-[#101422] rounded-3xl p-6 border border-[#1F263E] shadow-xl flex flex-col relative">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Cohort Similarity Distribution</h3>
              <p className="text-xs text-[#8E99B7]">Calibrated against starter code deduplication</p>
            </div>
            <span className="text-xs font-mono font-bold text-[#00D2D3] bg-[#00D2D3]/10 px-2 py-0.5 rounded border border-[#00D2D3]/20">
              248 Submissions
            </span>
          </div>

          <div className="flex-1 flex items-center justify-between min-h-[240px]">
            <div className="w-1/2 relative h-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#101422', border: '1px solid #1F263E', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-white text-xl font-bold font-mono">248</span>
                <span className="text-[#8E99B7] text-[10px] uppercase font-bold">TOTAL</span>
              </div>
            </div>

            <div className="w-1/2 space-y-2 pl-4 text-xs">
              {pieData.map((d, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></span>
                    <span className="text-[#8E99B7] truncate max-w-[120px]">{d.name}</span>
                  </div>
                  <span className="font-mono font-semibold text-white">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Review Queue Table */}
      <div className="bg-[#101422] rounded-3xl border border-[#1F263E] overflow-hidden shadow-2xl">
        <div className="px-6 py-5 border-b border-[#1F263E] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">High-Priority Review Queue</h3>
            <p className="text-xs text-[#8E99B7] mt-0.5">Cases with structural congruence exceeding academic tolerance</p>
          </div>
          <Link to="/submissions" className="text-xs font-semibold text-[#E02875] hover:underline flex items-center gap-1">
            View All 248 Submissions <ChevronRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#1F263E] bg-[#15192B]/50 text-[#8E99B7] uppercase tracking-wider">
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Assignment</th>
                <th className="px-6 py-4">Submitted</th>
                <th className="px-6 py-4 text-center">Similarity</th>
                <th className="px-6 py-4">Status & Action</th>
                <th className="px-6 py-4 text-right">Review</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F263E]">
              {recentSubmissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-[#15192B]/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#1F263E] to-[#2A3352] flex items-center justify-center text-white font-bold text-xs">
                        {sub.initials}
                      </div>
                      <div>
                        <span className="text-white font-semibold block">{sub.name}</span>
                        <span className="text-[10px] text-[#8E99B7]">{sub.cluster}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#8E99B7]">{sub.assignment}</td>
                  <td className="px-6 py-4 text-[#8E99B7] font-mono">{sub.date}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`font-mono font-bold px-2 py-0.5 rounded ${
                      parseInt(sub.similarity) >= 80
                        ? 'bg-[#E02875]/15 text-[#E02875] border border-[#E02875]/25'
                        : 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/25'
                    }`}>
                      {sub.similarity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      sub.status.includes('Viva')
                        ? 'bg-[#E02875]/20 text-[#E02875]'
                        : sub.status.includes('Review')
                        ? 'bg-[#F59E0B]/20 text-[#F59E0B]'
                        : 'bg-[#10B981]/20 text-[#10B981]'
                    }`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to="/compare"
                      className="px-3 py-1.5 rounded-lg bg-[#15192B] border border-[#1F263E] text-white hover:bg-[#E02875] hover:border-[#E02875] transition-all font-medium inline-block"
                    >
                      Inspect AST
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
