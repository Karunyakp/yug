import React from 'react';
import { Bell, ShieldCheck, SlidersHorizontal, PlugZap, Sparkles } from 'lucide-react';

const settings = [
  {
    icon: <Bell className="w-5 h-5 text-pink-400" />,
    title: 'Notifications',
    description: 'Email and in-app alerts for assignment reviews and plagiarism reports.',
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    title: 'Security',
    description: 'Access control, role permissions, and audit trail visibility.',
  },
  {
    icon: <SlidersHorizontal className="w-5 h-5 text-cyan-400" />,
    title: 'Workspace Preferences',
    description: 'Customize similarity thresholds and dashboard layout preferences.',
  },
  {
    icon: <PlugZap className="w-5 h-5 text-violet-400" />,
    title: 'Integrations',
    description: 'Connect LMS, file exports, and institutional reporting tools.',
  },
];

export default function Settings() {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-white text-2xl font-bold">Settings</h1>
        <p className="text-gray-400 mt-1">Tune the platform for your institute workflows and review policies.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {settings.map((item) => (
          <div key={item.title} className="bg-[#1a1a24] rounded-2xl p-5 border border-white/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-[#111118] p-2.5 rounded-xl border border-white/5">{item.icon}</div>
              <h2 className="text-white font-semibold">{item.title}</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
            <button className="mt-5 text-pink-400 hover:text-pink-300 text-sm font-medium transition-colors">
              Configure
            </button>
          </div>
        ))}
      </div>

      <div className="bg-[#1a1a24] rounded-2xl border border-white/5 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-pink-500/20 p-2 rounded-xl">
            <Sparkles className="w-5 h-5 text-pink-300" />
          </div>
          <h2 className="text-white font-semibold">Institute usage summary</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#111118] rounded-xl p-4 border border-white/5">
            <p className="text-gray-400 text-xs uppercase tracking-wider">Similarity threshold</p>
            <p className="text-white text-2xl font-bold mt-2">18%</p>
          </div>
          <div className="bg-[#111118] rounded-xl p-4 border border-white/5">
            <p className="text-gray-400 text-xs uppercase tracking-wider">Review SLA</p>
            <p className="text-white text-2xl font-bold mt-2">48 hrs</p>
          </div>
          <div className="bg-[#111118] rounded-xl p-4 border border-white/5">
            <p className="text-gray-400 text-xs uppercase tracking-wider">Report exports</p>
            <p className="text-white text-2xl font-bold mt-2">Enabled</p>
          </div>
        </div>
      </div>
    </div>
  );
}
