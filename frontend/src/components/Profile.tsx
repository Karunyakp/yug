import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const skills = ['Local code comparison', 'Human-led review', 'Browser demo'];

const activity = [
  { label: 'Opened the review workspace', time: 'Illustrative activity' },
  { label: 'Viewed a sample report', time: 'Illustrative activity' },
  { label: 'Viewed demo assignment settings', time: 'Illustrative activity' },
];

export default function Profile() {
  return (
    <div className="legacy-dark-page space-y-6 pb-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-white text-2xl font-bold">Profile</h1>
          <p className="text-gray-400 mt-1">Illustrative profile for the frontend demonstration.</p>
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
                  <h2 className="text-2xl font-bold text-white">Demo reviewer</h2>
                </div>
                <p className="text-gray-300">Sample profile · no connected account</p>
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
                This sample page demonstrates a reviewer profile layout. It does not represent a real faculty member or track review outcomes.
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
              <p className="text-sm leading-relaxed text-gray-400">No contact information is connected in this demo.</p>
            </div>

            <div className="bg-[#111118] rounded-2xl p-5 border border-white/5">
              <h3 className="text-white font-semibold mb-4">Performance metrics</h3>
              <p className="text-sm leading-relaxed text-gray-400">Not available. The demo does not measure reviewer accuracy or resolution rates.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
