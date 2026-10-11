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
  { title: 'Demo submissions', value: '203', subtitle: 'Illustrative counts across 7 assignments', badge: 'Sample data', badgeColor: 'bg-[#E4F1E9] text-[#10382D]' },
  { title: 'Overlap indicators', value: '18', subtitle: '8.9% in the illustrative ≥75% band; not findings', badge: 'Context required', badgeColor: 'bg-[#FFF1D6] text-[#7C5315]' },
  { title: 'Example groups', value: '3', subtitle: 'Illustrative graph groups', badge: 'Not case findings', badgeColor: 'bg-[#F7F6F0] text-[#707A72]' },
  { title: 'Context reviews', value: '7', subtitle: 'Example cohort entries for human review', badge: 'No automated decisions', badgeColor: 'bg-[#F7F6F0] text-[#707A72]' },
];

const barData = [
  { name: 'Aug', total: 65, flagged: 5 },
  { name: 'Sep', total: 68, flagged: 6 },
  { name: 'Oct', total: 70, flagged: 7 },
];

const pieData = [
  { name: 'Overlap <25%', value: 115, color: '#174C3C' },
  { name: 'Overlap 25–49%', value: 48, color: '#3A7061' },
  { name: 'Overlap 50–74%', value: 22, color: '#B96F52' },
  { name: 'Overlap ≥75%', value: 18, color: '#8A63D2' },
];

const recentSubmissions = [
  { id: 1, initials: 'AS', name: 'Aarav Sharma', assignment: 'CS-204: Sorting Visualizer', date: '24 Oct 2026, 10:42 AM', similarity: '92%', status: 'Context review', statusStyle: 'bg-[#F7F6F0] text-[#684713] border border-[#E3E7E0]' },
  { id: 2, initials: 'RM', name: 'Rohan Mehta', assignment: 'CS-204: Sorting Visualizer', date: '24 Oct 2026, 09:12 AM', similarity: '92%', status: 'Context review', statusStyle: 'bg-[#F7F6F0] text-[#684713] border border-[#E3E7E0]' },
  { id: 3, initials: 'VJ', name: 'Vivaan Joshi', assignment: 'CS-204: Sorting Visualizer', date: '22 Oct 2026, 2:15 PM', similarity: '88%', status: 'Context review', statusStyle: 'bg-[#F7F6F0] text-[#684713] border border-[#E3E7E0]' },
  { id: 4, initials: 'KG', name: 'Karan Gupta', assignment: 'CS-301: Graph Algorithms', date: '22 Oct 2026, 10:00 AM', similarity: '89%', status: 'Context review', statusStyle: 'bg-[#F7F6F0] text-[#684713] border border-[#E3E7E0]' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 pb-16 text-[#202923]">
      {/* Page Title & Primary Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202923]">Academic Integrity Overview</h1>
          <p className="text-xs text-[#707A72] mt-1">
            Illustrative frontend demo data only. Similarity indicates overlap, not authorship or misconduct.
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
              Aug–Oct 2026 · Sample
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
            <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#174C3C]"></span> Overlap indicators</span>
          </div>
        </div>

        {/* Similarity Proportions */}
        <div className="bg-white rounded-2xl p-6 border border-[#E3E7E0] shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#202923] uppercase tracking-wider">Similarity Distribution</h3>
            <p className="text-xs text-[#707A72]">Illustrative distribution by overlap band · 203 samples</p>
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
                <span className="font-bold text-[#202923]">{d.value} · {((d.value / 203) * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Queue Table */}
      <div className="bg-white rounded-2xl border border-[#E3E7E0] overflow-hidden shadow-xs">
        <div className="p-5 border-b border-[#E3E7E0] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 className="text-sm font-bold text-[#202923] uppercase tracking-wider">Example context review queue</h3>
            <p className="text-xs text-[#707A72] mt-0.5">Sample entries for human review; overlap alone is not a finding.</p>
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
                      Inspect sample
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
