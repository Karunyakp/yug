import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, ChevronRight } from 'lucide-react';
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
  { title: 'TOTAL ASSIGNMENTS', value: '12', subtitle: '+2 this week', dotColor: 'bg-orange-500', subtitleDot: 'bg-green-500' },
  { title: 'TOTAL SUBMISSIONS', value: '248', subtitle: '+18 today', dotColor: 'bg-blue-500', subtitleDot: 'bg-blue-500' },
  { title: 'HIGH SIMILARITY', value: '18', subtitle: '3 urgent', dotColor: 'bg-red-500', subtitleDot: 'bg-red-500' },
  { title: 'PENDING REVIEWS', value: '24', subtitle: 'Requires action', dotColor: 'bg-yellow-500', subtitleDot: 'bg-yellow-500' },
];

const barData = [
  { name: 'Jun', total: 65, high: 28 },
  { name: 'Jul', total: 59, high: 48 },
  { name: 'Aug', total: 80, high: 40 },
  { name: 'Sep', total: 81, high: 19 },
  { name: 'Oct', total: 56, high: 86 },
  { name: 'Nov', total: 55, high: 27 },
];

const pieData = [
  { name: '0-20% Clean', value: 42, color: '#22c55e' },
  { name: '20-40% Low', value: 22, color: '#3b82f6' },
  { name: '40-60% Medium', value: 16, color: '#eab308' },
  { name: '60-80% High', value: 12, color: '#ef4444' },
  { name: '80-100% Critical', value: 8, color: '#6b7280' },
];

const recentSubmissions = [
  { id: 1, initials: 'AS', name: 'Aarav Sharma', assignment: 'Sorting Visualizer', date: '24 Nov, 10:42 AM', similarity: '92%', simColor: 'bg-pink-500/20 text-pink-500', status: 'High', statusColor: 'bg-red-500/20 text-red-400', avatarColor: 'bg-emerald-500' },
  { id: 2, initials: 'RM', name: 'Rohan Mehta', assignment: 'Sorting Visualizer', date: '24 Nov, 09:12 AM', similarity: '92%', simColor: 'bg-pink-500/20 text-pink-500', status: 'High', statusColor: 'bg-red-500/20 text-red-400', avatarColor: 'bg-amber-500' },
  { id: 3, initials: 'IP', name: 'Ishita Patel', assignment: 'OOP Lab 4', date: '23 Nov, 4:20 PM', similarity: '12%', simColor: 'bg-green-500/20 text-green-500', status: 'Clean', statusColor: 'bg-green-500/20 text-green-400', avatarColor: 'bg-violet-500' },
  { id: 4, initials: 'KS', name: 'Kabir Singh', assignment: 'DBMS Project', date: '23 Nov, 11:02 AM', similarity: '64%', simColor: 'bg-orange-500/20 text-orange-500', status: 'Moderate', statusColor: 'bg-orange-500/20 text-orange-400', avatarColor: 'bg-blue-500' },
  { id: 5, initials: 'AR', name: 'Ananya Rao', assignment: 'A* Implementation', date: '22 Nov, 6:30 PM', similarity: '8%', simColor: 'bg-green-500/20 text-green-500', status: 'Clean', statusColor: 'bg-green-500/20 text-green-400', avatarColor: 'bg-rose-500' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-white text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back, Prof. Verma. Here is what is happening in your classes today.</p>
        </div>
        <Link to="/assignments" className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full font-medium hover:bg-gray-100 transition-colors">
          <Plus size={18} />
          New Assignment
        </Link>
      </div>

      <div className="bg-gradient-to-r from-pink-600/20 via-violet-600/10 to-transparent rounded-2xl border border-pink-500/20 p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-pink-200">Hackathon USP</p>
            <h2 className="mt-2 text-2xl font-bold text-white">AI Code Integrity Studio for ethical academic review</h2>
          </div>
          <Link to="/features" className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-500 text-white rounded-full px-4 py-2 text-sm font-medium transition-colors">
            Explore product story
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-[#1a1a24] rounded-2xl p-6 border border-white/5 relative">
            <div className={`absolute top-6 right-6 w-2 h-2 rounded-full ${kpi.dotColor}`}></div>
            <p className="text-gray-400 text-xs font-semibold tracking-wider uppercase">{kpi.title}</p>
            <p className="text-white text-3xl font-bold mt-3">{kpi.value}</p>
            <div className="flex items-center gap-2 mt-2">
              <div className={`w-1.5 h-1.5 rounded-full ${kpi.subtitleDot}`}></div>
              <p className="text-gray-400 text-sm">{kpi.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Bar Chart */}
        <div className="bg-[#1a1a24] rounded-2xl p-6 border border-white/5 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white font-semibold">Submission Overview</h2>
            <select className="bg-[#16161e] text-gray-400 text-sm border border-white/5 rounded-lg px-3 py-1.5 outline-none">
              <option>Last 6 months</option>
              <option>This Year</option>
            </select>
          </div>
          
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: '#ffffff05' }}
                  contentStyle={{ backgroundColor: '#1a1a24', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="total" fill="#ec4899" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="high" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#ec4899]"></div>
              <span className="text-gray-400 text-sm">Total</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#f43f5e]"></div>
              <span className="text-gray-400 text-sm">High similarity</span>
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-[#1a1a24] rounded-2xl p-6 border border-white/5 flex flex-col relative">
          <h2 className="text-white font-semibold mb-6">Similarity Distribution</h2>
          <div className="flex-1 flex items-center justify-between min-h-[250px]">
            <div className="w-1/2 relative h-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1a1a24', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-white text-xl font-bold">248</span>
                <span className="text-gray-400 text-xs">TOTAL</span>
              </div>
            </div>
            <div className="w-1/2 flex flex-col justify-center gap-3 pl-4">
              {pieData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-400 text-sm">{item.name}</span>
                  </div>
                  <span className="text-white text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="bg-[#1a1a24] rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b border-white/5">
          <h2 className="text-white font-semibold">Recent Submissions</h2>
          <Link to="/submissions" className="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors">
            View all <ChevronRight size={16} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#16161e]">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Assignment</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Submitted On</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Similarity</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentSubmissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium ${sub.avatarColor}`}>
                        {sub.initials}
                      </div>
                      <span className="text-white font-medium">{sub.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{sub.assignment}</td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{sub.date}</td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center justify-center px-2 py-1 rounded text-xs font-medium ${sub.simColor}`}>
                      {sub.similarity}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${sub.statusColor}`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link to="/compare" className="text-rose-400 hover:text-rose-300 text-sm font-medium transition-colors">
                      Review
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
};

export default Dashboard;
