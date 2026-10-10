import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, TrendingUp, AlertTriangle, Users, Calendar, ArrowRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Reports() {
  const [activeTab, setActiveTab] = useState('Overview');

  const similarityTrendData = [
    { month: 'Jan', similarity: 22 },
    { month: 'Feb', similarity: 25 },
    { month: 'Mar', similarity: 30 },
    { month: 'Apr', similarity: 28 },
    { month: 'May', similarity: 26 },
    { month: 'Jun', similarity: 28 },
  ];

  const languageDistributionData = [
    { name: 'Python', value: 42, color: '#ec4899' },
    { name: 'Java', value: 28, color: '#3b82f6' },
    { name: 'C++', value: 18, color: '#10b981' },
    { name: 'JavaScript', value: 12, color: '#eab308' },
  ];

  const topSimilarityCases = [
    { id: 1, student1: 'Aarav Sharma', student2: 'Rohan Mehta', assignment: 'Sorting Algorithms', similarity: 92 },
    { id: 2, student1: 'Karan Gupta', student2: 'Neha Reddy', assignment: 'Graph Algorithms', similarity: 89 },
    { id: 3, student1: 'Priya Nair', student2: 'Sneha Iyer', assignment: 'Data Structures', similarity: 76 },
    { id: 4, student1: 'Arjun Singh', student2: 'Isha Patel', assignment: 'Dynamic Programming', similarity: 71 },
    { id: 5, student1: 'Aarav Sharma', student2: 'Arjun Singh', assignment: 'Data Structures', similarity: 68 },
  ];

  return (
    <div className="text-white space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-gray-400 mt-1 text-sm">Visualize trends and generate reports.</p>
        </div>
        <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2 transition-colors shadow-[0_0_15px_rgba(236,72,153,0.3)] cursor-pointer text-sm">
          📥 Export Report
        </button>
      </div>

      <div className="border-b border-white/10">
        <nav className="flex space-x-8">
          {['Overview', 'Top Matches', 'Assignment Report', 'Download'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
                activeTab === tab ? 'border-pink-500 text-pink-500' : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'Overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'TOTAL SUBMISSIONS', value: '248', icon: FileText, color: 'text-blue-400 bg-blue-400/10' },
              { label: 'AVG SIMILARITY', value: '28%', icon: TrendingUp, color: 'text-green-400 bg-green-400/10' },
              { label: 'HIGH SIMILARITY', value: '186', icon: AlertTriangle, color: 'text-pink-500 bg-pink-500/10' },
              { label: 'UNIQUE STUDENTS', value: '64', icon: Users, color: 'text-purple-400 bg-purple-400/10' },
            ].map((stat, i) => (
              <div key={i} className="bg-[#1a1a24] p-5 rounded-2xl border border-white/5 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#1a1a24] p-6 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-semibold text-white">Similarity Trend</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Monthly average similarity % (Jan - Jun)</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                  <Calendar size={14} /> Jan - Jun
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={similarityTrendData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} domain={[0, 40]} tickFormatter={(val) => `${val}%`} />
                    <Tooltip contentStyle={{ backgroundColor: '#16161e', border: '1px solid #ffffff10', borderRadius: '8px', color: '#fff' }} />
                    <Line type="monotone" dataKey="similarity" stroke="#ec4899" strokeWidth={3} dot={{ r: 4, fill: '#ec4899', strokeWidth: 2, stroke: '#1a1a24' }} activeDot={{ r: 6, fill: '#f43f5e' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-[#1a1a24] p-6 rounded-2xl border border-white/5 relative">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-semibold text-white">Language Distribution</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Submitted code by programming language</p>
                </div>
                <span className="text-xs font-medium text-gray-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                  4 Active Languages
                </span>
              </div>
              <div className="h-64 flex items-center">
                <div className="w-1/2 relative h-full flex justify-center items-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={languageDistributionData} cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={3} dataKey="value" stroke="none">
                        {languageDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#16161e', border: '1px solid #ffffff10', borderRadius: '8px', color: '#fff' }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-bold text-white">248</span>
                    <span className="text-xs text-gray-400">Total</span>
                  </div>
                </div>
                <div className="w-1/2 flex flex-col justify-center gap-3.5 pl-4">
                  {languageDistributionData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm text-gray-300 font-medium">{item.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-white">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a24] rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-white text-lg">Top 5 High Similarity Cases</h3>
                <p className="text-xs text-gray-400 mt-0.5">Submissions flagged with the highest pairwise overlap</p>
              </div>
              <button onClick={() => setActiveTab('Top Matches')} className="text-sm text-pink-500 hover:text-pink-400 font-medium inline-flex items-center gap-1 cursor-pointer">
                View all matches <ArrowRight size={14} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-transparent text-gray-500 text-[10px] uppercase font-bold tracking-wider">
                  <tr className="border-b border-white/5">
                    <th className="px-6 py-4">Student 1</th>
                    <th className="px-6 py-4">Student 2</th>
                    <th className="px-6 py-4">Assignment</th>
                    <th className="px-6 py-4 text-center">Similarity</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {topSimilarityCases.map((match) => (
                    <tr key={match.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center text-xs font-bold">
                            {match.student1.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="font-medium text-gray-200">{match.student1}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">
                            {match.student2.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="font-medium text-gray-200">{match.student2}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400 font-medium">
                        {match.assignment}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${match.similarity >= 80 ? 'border-pink-500/20 text-pink-400 bg-pink-500/10' : 'border-orange-500/20 text-orange-400 bg-orange-500/10'}`}>
                          {match.similarity}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link to="/compare" className="text-pink-500 hover:text-pink-400 font-medium text-sm inline-flex items-center gap-1 transition-colors">
                          View &rarr;
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'Top Matches' && (
        <div className="bg-[#1a1a24] rounded-2xl border border-white/5 overflow-hidden p-6">
          <h3 className="font-semibold text-white text-lg mb-4">All High Similarity Cases</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-transparent text-gray-500 text-[10px] uppercase font-bold tracking-wider">
                <tr className="border-b border-white/5">
                  <th className="px-6 py-4">Student 1</th>
                  <th className="px-6 py-4">Student 2</th>
                  <th className="px-6 py-4">Assignment</th>
                  <th className="px-6 py-4 text-center">Similarity</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {topSimilarityCases.map((match) => (
                  <tr key={match.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center text-xs font-bold">
                          {match.student1.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium text-gray-200">{match.student1}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">
                          {match.student2.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium text-gray-200">{match.student2}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400 font-medium">{match.assignment}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${match.similarity >= 80 ? 'border-pink-500/20 text-pink-400 bg-pink-500/10' : 'border-orange-500/20 text-orange-400 bg-orange-500/10'}`}>
                        {match.similarity}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link to="/compare" className="text-pink-500 hover:text-pink-400 font-medium text-sm inline-flex items-center gap-1 transition-colors">
                        View &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'Assignment Report' && (
        <div className="bg-[#1a1a24] rounded-2xl border border-white/5 overflow-hidden p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-white text-lg">Assignment-Specific Reports</h3>
            <select className="bg-[#111118] border border-white/10 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-pink-500">
              <option>Sorting Algorithms</option>
              <option>Graph Algorithms</option>
              <option>Data Structures</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
             <div className="bg-[#111118] p-5 rounded-xl border border-white/5">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Total Submissions</p>
                <p className="text-3xl font-bold text-white">45</p>
             </div>
             <div className="bg-[#111118] p-5 rounded-xl border border-white/5">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Avg Similarity</p>
                <p className="text-3xl font-bold text-white">22%</p>
             </div>
             <div className="bg-[#111118] p-5 rounded-xl border border-white/5">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Flagged for Review</p>
                <p className="text-3xl font-bold text-pink-500">3</p>
             </div>
          </div>
          <button onClick={() => window.alert('Generating detailed report...')} className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors">
            Generate Full Report
          </button>
        </div>
      )}

      {activeTab === 'Download' && (
        <div className="bg-[#1a1a24] rounded-2xl border border-white/5 overflow-hidden p-6">
          <h3 className="font-semibold text-white text-lg mb-6">Data Exports & Downloads</h3>
          <div className="space-y-4">
            {[
              { title: 'Full Plagiarism Audit (Last 30 Days)', desc: 'Includes all flagged matches and reviewer notes.' },
              { title: 'Student Risk Matrix', desc: 'CSV format of students mapped against similarity thresholds.' },
              { title: 'Executive Summary Report', desc: 'High-level PDF for department heads.' }
            ].map((report, idx) => (
              <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-[#111118] border border-white/5 rounded-xl gap-4">
                <div>
                  <h4 className="text-white font-medium">{report.title}</h4>
                  <p className="text-sm text-gray-400 mt-1">{report.desc}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => window.alert('Downloading CSV...')} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">CSV</button>
                  <button onClick={() => window.alert('Downloading PDF...')} className="px-4 py-2 bg-pink-600 rounded-lg text-sm font-medium hover:bg-pink-500 transition-colors">PDF</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

