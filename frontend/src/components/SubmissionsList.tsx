import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon } from 'lucide-react';

const submissionsData = [
  { id: 1, student: 'Rohan Mehta', initials: 'RM', color: 'bg-blue-500', assignment: 'Sorting Visualizer', file: 'sort.py', date: '24 Nov, 09:12 AM', similarity: 92, status: 'High' },
  { id: 2, student: 'Ishita Patel', initials: 'IP', color: 'bg-purple-500', assignment: 'OOP Lab 4', file: 'shape.java', date: '23 Nov, 4:20 PM', similarity: 12, status: 'Clean' },
  { id: 3, student: 'Kabir Singh', initials: 'KS', color: 'bg-blue-500', assignment: 'DBMS Project', file: 'schema.sql', date: '23 Nov, 11:02 AM', similarity: 64, status: 'Moderate' },
  { id: 4, student: 'Ananya Rao', initials: 'AR', color: 'bg-pink-500', assignment: 'A* Implementation', file: 'astar.py', date: '22 Nov, 6:30 PM', similarity: 8, status: 'Clean' },
  { id: 5, student: 'Vivaan Joshi', initials: 'VJ', color: 'bg-purple-500', assignment: 'Myntra Clone', file: 'App.js', date: '22 Nov, 2:15 PM', similarity: 88, status: 'High' },
  { id: 6, student: 'Diya Kapoor', initials: 'DK', color: 'bg-gray-500', assignment: 'Sorting Visualizer', file: 'merge.py', date: '22 Nov, 10:00 AM', similarity: 34, status: 'Moderate' },
  { id: 7, student: 'Arjun Nair', initials: 'AN', color: 'bg-blue-500', assignment: 'OOP Lab 4', file: 'polymorphism.cpp', date: '21 Nov, 9:40 AM', similarity: 5, status: 'Clean' },
];

export default function SubmissionsList() {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'High': return 'bg-red-500/20 text-red-400 border border-red-500/20';
      case 'Moderate': return 'bg-orange-500/20 text-orange-400 border border-orange-500/20';
      case 'Clean': return 'bg-green-500/20 text-green-400 border border-green-500/20';
      default: return 'bg-gray-500/20 text-gray-400 border border-gray-500/20';
    }
  };
  
  const getSimColor = (similarity: number) => {
    if (similarity >= 70) return 'text-pink-500';
    if (similarity >= 30) return 'text-orange-500';
    return 'text-green-500';
  };

  return (
    <div className="text-white space-y-6">
      <div className="bg-[#1a1a24] rounded-full p-2 flex items-center border border-white/5 shadow-sm max-w-2xl mx-auto md:mx-0">
        <SearchIcon className="w-5 h-5 text-gray-400 ml-3 mr-2" />
        <input 
          type="text" 
          placeholder="Search assignments, students, reports..." 
          className="bg-transparent border-none outline-none flex-1 text-white placeholder-gray-500 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="px-3 py-1 bg-[#232332] rounded-md text-gray-400 text-xs font-mono mr-1">⌘K</div>
      </div>

      <div className="bg-[#1a1a24] rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/5 bg-transparent">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Assignment</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">File</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Submitted On</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Similarity</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {submissionsData.map((sub) => (
                <tr key={sub.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${sub.color}`}>
                        {sub.initials}
                      </div>
                      <span className="font-medium text-sm text-gray-200">{sub.student}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">{sub.assignment}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-black text-xs font-medium font-mono">
                      {sub.file}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">{sub.date}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`font-semibold ${getSimColor(sub.similarity)}`}>{sub.similarity}%</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(sub.status)}`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link to="/compare" className="text-pink-500 hover:text-pink-400 font-medium text-sm transition-colors">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-white/5 flex items-center justify-between">
          <p className="text-sm text-gray-400">Showing 1 to 8 of 248 submissions</p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-white/5 transition-colors">&lt;</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-500 text-white font-medium shadow-[0_0_15px_rgba(236,72,153,0.4)] transition-colors">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-colors">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-colors">4</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-colors">5</button>
            <span className="text-gray-400 px-1">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-colors">31</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-white/5 transition-colors">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}
