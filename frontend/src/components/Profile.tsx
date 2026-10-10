import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BadgeCheck, MapPin, Mail, Phone, Sparkles } from 'lucide-react';

const skills = ['Plagiarism detection', 'Code review', 'ML moderation', 'AST analysis'];

const activity = [
  { label: 'Reviewed 12 submissions', time: 'Today • 09:45 AM' },
  { label: 'Uploaded final report snapshot', time: 'Yesterday • 04:10 PM' },
  { label: 'Updated assignment rubric', time: 'Mon • 11:30 AM' },
];

export default function Profile() {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-white text-2xl font-bold">Profile</h1>
          <p className="text-gray-400 mt-1">Personal overview, contact details, and activity snapshot.</p>
        </div>
        <Link to="/" className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-2 text-sm text-gray-200 hover:bg-white/5 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="bg-[#1a1a24] rounded-3xl border border-white/5 overflow-hidden">
        <div className="bg-gradient-to-r from-pink-600/30 via-purple-600/20 to-transparent p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center text-2xl font-bold text-white">
                PV
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-white">Prof. Verma</h2>
                  <BadgeCheck className="w-5 h-5 text-pink-300" />
                </div>
                <p className="text-gray-300">Head of Academic Integrity & Review</p>
              </div>
            </div>

            <button className="bg-white text-black rounded-full px-5 py-2.5 font-medium hover:bg-gray-100 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6 p-6">
          <div className="space-y-6">
            <div className="bg-[#111118] rounded-2xl p-5 border border-white/5">
              <h3 className="text-white font-semibold mb-4">About</h3>
              <p className="text-gray-400 leading-relaxed">
                Oversees academic integrity processes across computer science courses, analyzes high-similarity submissions, and coordinates faculty review workflows for institution-wide fairness and compliance.
              </p>
            </div>

            <div className="bg-[#111118] rounded-2xl p-5 border border-white/5">
              <h3 className="text-white font-semibold mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="bg-white/5 text-gray-200 border border-white/10 rounded-full px-3 py-1.5 text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#111118] rounded-2xl p-5 border border-white/5">
              <h3 className="text-white font-semibold mb-4">Recent activity</h3>
              <div className="space-y-4">
                {activity.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="mt-1 w-2 h-2 rounded-full bg-pink-500" />
                    <div>
                      <p className="text-white">{item.label}</p>
                      <p className="text-gray-400 text-sm mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111118] rounded-2xl p-5 border border-white/5">
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-pink-300" />
                  <span>verma@college.edu</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-pink-300" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-pink-300" />
                  <span>Academic Block A, Room 203</span>
                </div>
              </div>
            </div>

            <div className="bg-[#111118] rounded-2xl p-5 border border-white/5">
              <h3 className="text-white font-semibold mb-4">Performance</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-300 mb-1">
                    <span>Review accuracy</span>
                    <span>96%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full w-[96%] rounded-full bg-gradient-to-r from-pink-500 to-purple-500" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-300 mb-1">
                    <span>Cases resolved</span>
                    <span>88%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full w-[88%] rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-600/15 to-violet-600/10 rounded-2xl p-5 border border-pink-500/20">
              <div className="flex items-center gap-2 text-pink-300 mb-2">
                <Sparkles className="w-4 h-4" />
                <span className="font-medium">Faculty spotlight</span>
              </div>
              <p className="text-gray-200 text-sm leading-relaxed">
                Maintains a strong institutional review workflow and high confidence in academic integrity decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
