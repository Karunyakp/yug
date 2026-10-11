import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Plus,
  FileText
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
  { title: 'Total Submissions', value: '248', subtitle: '4 courses evaluated', badge: '+18 today', badgeColor: 'bg-[#E4F1E9] text-[#10382D]' },
  { title: 'Flagged Submissions', value: '18', subtitle: 'Above 75% similarity', badge: 'Action Required', badgeColor: 'bg-[#FBE8E6] text-[#A82A2A]' },
  { title: 'High Similarity Cases', value: '3', subtitle: 'Multi-student clusters', badge: 'High Priority', badgeColor: 'bg-[#FFF1D6] text-[#7C5315]' },
  { title: 'Pending Reviews', value: '7', subtitle: 'Awaiting viva determination', badge: '1.8d turnaround', badgeColor: 'bg-[#F7F6F0] text-[#707A72]' },
];

const barData = [
  { name: 'Jun', total: 65, flagged: 18 },
  { name: 'Jul', total: 59, flagged: 22 },
  { name: 'Aug', total: 80, flagged: 28 },
  { name: 'Sep', total: 81, flagged: 15 },
  { name: 'Oct', total: 56, flagged: 24 },
  { name: 'Nov', total: 55, flagged: 18 },
];

const pieData = [
  { name: 'Clean Work (<25%)', value: 58, color: '#174C3C' },
  { name: 'Low Variance (25-50%)', value: 24, color: '#3A7061' },
  { name: 'Moderate Overlap (50-75%)', value: 12, color: '#B96F52' },
  { name: 'Severe Match (>75%)', value: 6, color: '#D9534F' },
];

const recentSubmissions = [
  { id: 1, initials: 'AS', name: 'Aarav Sharma', assignment: 'CS-204: Sorting Visualizer', date: '24 Nov, 10:42 AM', similarity: '92%', status: 'Needs Review', statusStyle: 'bg-[#FBE8E6] text-[#A82A2A] border border-[#F5C7C3]' },
  { id: 2, initials: 'RM', name: 'Rohan Mehta', assignment: 'CS-204: Sorting Visualizer', date: '24 Nov, 09:12 AM', similarity: '92%', status: 'Needs Review', statusStyle: 'bg-[#FBE8E6] text-[#A82A2A] border border-[#F5C7C3]' },
  { id: 3, initials: 'VJ', name: 'Vivaan Joshi', assignment: 'CS-204: Sorting Visualizer', date: '23 Nov, 4:20 PM', similarity: '88%', status: 'Under Review', statusStyle: 'bg-[#FFF1D6] text-[#7C5315] border border-[#F6E0B5]' },
  { id: 4, initials: 'KG', name: 'Karan Gupta', assignment: 'CS-301: Graph Algorithms', date: '23 Nov, 11:02 AM', similarity: '89%', status: 'Under Review', statusStyle: 'bg-[#FFF1D6] text-[#7C5315] border border-[#F6E0B5]' },
  { id: 5, initials: 'AR', name: 'Ananya Rao', assignment: 'CS-402: A* Implementation', date: '22 Nov, 6:30 PM', similarity: '8%', status: 'Reviewed', statusStyle: 'bg-[#E4F1E9] text-[#10382D] border border-[#C3E4CF]' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 pb-16 text-[#202923]">
      {/* Page Title & Primary Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202923]">Academic Integrity Overview</h1>
          <p className="text-xs text-[#707A72] mt-1">
            Department review workspace for introductory and advanced computer science tracks.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/reports"
            className="px-4 py-2 rounded-xl bg-white border border-[#E3E7E0] hover:bg-[#F7F6F0] text-xs font-semibold text-[#202923] flex items-center gap-2 transition-all shadow-xs"
          >
            <FileText size={14} className="text-[#174C3C]" /> View Reports
          </Link>
          <Link
            to="/compare"
            className="px-5 py-2 rounded-xl bg-[#174C3C] hover:bg-[#10382D] text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-xs"
          >
            <Plus size={14} /> Analyze Submission
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 border border-[#E3E7E0] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#707A72] uppercase tracking-wider">{kpi.title}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${kpi.badgeColor}`}>
                  {kpi.badge}
                </span>
              </div>
              <p className="text-3xl font-bold text-[#202923] tracking-tight">{kpi.value}</p>
            </div>
            <p className="text-xs text-[#707A72] mt-3 pt-3 border-t border-[#E3E7E0]">
              {kpi.subtitle}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6">
        {/* Activity Volume */}
        <div className="bg-white rounded-2xl p-6 border border-[#E3E7E0] shadow-xs flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-sm font-bold text-[#202923] uppercase tracking-wider">Analysis Activity Volume</h3>
              <p className="text-xs text-[#707A72]">Submissions vs elevated similarity volume</p>
            </div>
            <span className="text-xs font-semibold text-[#707A72] bg-[#F7F6F0] px-3 py-1.5 rounded-lg border border-[#E3E7E0]">
              Fall Semester 2026
            </span>
          </div>

          <div className="flex-1 min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F2ED" vertical={false} />
                <XAxis dataKey="name" stroke="#8E99B7" tick={{ fill: '#707A72', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#8E99B7" tick={{ fill: '#707A72', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: '#F7F6F0' }}
                  contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E3E7E0', borderRadius: '10px', fontSize: '12px' }}
                />
                <Bar dataKey="total" fill="#E3E7E0" radius={[4, 4, 0, 0]} barSize={16} />
                <Bar dataKey="flagged" fill="#174C3C" radius={[4, 4, 0, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-[#E3E7E0] text-xs text-[#707A72]">
            <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#E3E7E0]"></span> Total Ingested</span>
            <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#174C3C]"></span> Flagged for Review</span>
          </div>
        </div>

        {/* Similarity Proportions */}
        <div className="bg-white rounded-2xl p-6 border border-[#E3E7E0] shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#202923] uppercase tracking-wider">Similarity Distribution</h3>
            <p className="text-xs text-[#707A72]">Filtered against instructor starter code</p>
          </div>

          <div className="my-4 h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" stroke="none">
                  {pieData.map((e, idx) => (
                    <Cell key={idx} fill={e.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E3E7E0', borderRadius: '10px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-4 border-t border-[#E3E7E0] text-xs">
            {pieData.map((d, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#707A72]">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></span>
                  {d.name}
                </span>
                <span className="font-bold text-[#202923]">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Queue Table */}
      <div className="bg-white rounded-2xl border border-[#E3E7E0] overflow-hidden shadow-xs">
        <div className="p-5 border-b border-[#E3E7E0] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 className="text-sm font-bold text-[#202923] uppercase tracking-wider">Active Review Queue</h3>
            <p className="text-xs text-[#707A72] mt-0.5">High-similarity submissions awaiting faculty determination</p>
          </div>
          <Link to="/submissions" className="text-xs font-semibold text-[#174C3C] hover:underline flex items-center gap-1">
            View All Submissions <ChevronRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E3E7E0] bg-[#F7F6F0] text-[#707A72] uppercase tracking-wider font-semibold">
                <th className="px-6 py-3.5">Student</th>
                <th className="px-6 py-3.5">Assignment</th>
                <th className="px-6 py-3.5">Submitted</th>
                <th className="px-6 py-3.5 text-center">Similarity</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E7E0]">
              {recentSubmissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-[#F7F6F0]/60 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#E4F1E9] text-[#174C3C] flex items-center justify-center font-bold text-xs">
                        {sub.initials}
                      </div>
                      <span className="font-semibold text-[#202923]">{sub.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#707A72]">{sub.assignment}</td>
                  <td className="px-6 py-4 text-[#707A72]">{sub.date}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-bold text-xs text-[#174C3C] bg-[#E4F1E9] px-2.5 py-1 rounded-md">
                      {sub.similarity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${sub.statusStyle}`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to="/compare"
                      className="px-3.5 py-1.5 rounded-lg bg-white border border-[#E3E7E0] text-[#202923] hover:bg-[#174C3C] hover:text-white hover:border-[#174C3C] font-semibold transition-all inline-block shadow-2xs"
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
