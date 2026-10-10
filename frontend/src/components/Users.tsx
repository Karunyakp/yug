import React from 'react';
import { Users as UsersIcon, Mail, CheckCircle2, Clock3 } from 'lucide-react';

const team = [
  { name: 'Prof. Verma', role: 'Administrator', status: 'Online', email: 'verma@college.edu', accent: 'bg-violet-500' },
  { name: 'Aditi Sharma', role: 'TA', status: 'Reviewing', email: 'aditi@college.edu', accent: 'bg-cyan-500' },
  { name: 'Rakesh Nair', role: 'Mentor', status: 'Available', email: 'rakesh@college.edu', accent: 'bg-emerald-500' },
  { name: 'Meera Iyer', role: 'Course Lead', status: 'Offline', email: 'meera@college.edu', accent: 'bg-amber-500' },
];

export default function Users() {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-white text-2xl font-bold">Users</h1>
          <p className="text-gray-400 mt-1">Monitor your teaching staff, mentors, and internal reviewers.</p>
        </div>
        <button className="bg-white text-black rounded-full px-4 py-2 font-medium hover:bg-gray-100 transition-colors">
          Invite User
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#1a1a24] p-5 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3 text-gray-400">
            <UsersIcon className="w-5 h-5 text-pink-400" />
            <span className="text-sm uppercase tracking-wider">Active Team</span>
          </div>
          <p className="text-3xl font-bold text-white mt-4">24</p>
          <p className="text-gray-400 mt-2 text-sm">Across teaching, review, and mentorship.</p>
        </div>
        <div className="bg-[#1a1a24] p-5 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3 text-gray-400">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-sm uppercase tracking-wider">Verified</span>
          </div>
          <p className="text-3xl font-bold text-white mt-4">18</p>
          <p className="text-gray-400 mt-2 text-sm">Profiles checked and approved this week.</p>
        </div>
        <div className="bg-[#1a1a24] p-5 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3 text-gray-400">
            <Clock3 className="w-5 h-5 text-amber-400" />
            <span className="text-sm uppercase tracking-wider">Pending</span>
          </div>
          <p className="text-3xl font-bold text-white mt-4">06</p>
          <p className="text-gray-400 mt-2 text-sm">Awaiting onboarding or access approval.</p>
        </div>
      </div>

      <div className="bg-[#1a1a24] rounded-2xl border border-white/5 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5">
          <h2 className="text-white font-semibold">Team Directory</h2>
        </div>
        <div className="divide-y divide-white/5">
          {team.map((member) => (
            <div key={member.name} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4">
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-full ${member.accent} flex items-center justify-center text-white font-semibold`}>
                  {member.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <p className="text-white font-medium">{member.name}</p>
                  <p className="text-gray-400 text-sm">{member.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <span className={`px-2.5 py-1 rounded-full ${member.status === 'Online' ? 'bg-emerald-500/20 text-emerald-300' : member.status === 'Reviewing' ? 'bg-pink-500/20 text-pink-300' : member.status === 'Available' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-gray-500/20 text-gray-300'}`}>
                  {member.status}
                </span>
                <div className="flex items-center gap-2 text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span>{member.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
