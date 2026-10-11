import { ArrowUpRight, FolderKanban, Clock3, CheckCircle2 } from 'lucide-react';

const projects = [
  {
    name: 'Sorting Visualizer',
    code: 'CS-204',
    status: 'In Review',
    progress: 78,
    members: 5,
    due: 'Due in 2 days',
    color: 'bg-pink-500/20 text-pink-300 border border-pink-500/30',
  },
  {
    name: 'Database Design Lab',
    code: 'DB-118',
    status: 'Active',
    progress: 64,
    members: 4,
    due: 'Due in 5 days',
    color: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
  },
  {
    name: 'A* Pathfinding',
    code: 'AI-041',
    status: 'Needs Update',
    progress: 42,
    members: 3,
    due: 'Due in 1 week',
    color: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
  },
];

export default function Projects() {
  return (
    <div className="legacy-dark-page space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-white text-2xl font-bold">Projects</h1>
          <p className="text-gray-400 mt-1">Track every assignment cohort, review progress, and sync deadlines.</p>
        </div>
        <button onClick={() => window.alert('Create new project modal will appear here.')} className="bg-pink-600 hover:bg-pink-500 text-white px-4 py-2 rounded-full font-medium transition-colors">
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.name} className="bg-[#1a1a24] rounded-2xl p-5 border border-white/5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#111118] p-2.5 rounded-xl border border-white/5">
                  <FolderKanban className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <h2 className="text-white font-semibold">{project.name}</h2>
                  <p className="text-gray-400 text-xs mt-1">{project.code}</p>
                </div>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full ${project.color}`}>
                {project.status}
              </span>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="h-2.5 bg-[#111118] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="bg-[#111118] rounded-xl p-3 border border-white/5">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Clock3 className="w-4 h-4" />
                  <span>Deadline</span>
                </div>
                <p className="text-white font-medium">{project.due}</p>
              </div>
              <div className="bg-[#111118] rounded-xl p-3 border border-white/5">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Members</span>
                </div>
                <p className="text-white font-medium">{project.members} active</p>
              </div>
            </div>

            <button onClick={() => window.alert('Opening project workspace for ' + project.name)} className="mt-6 w-full flex items-center justify-center gap-2 text-white hover:text-pink-300 border border-white/10 rounded-xl py-2.5 text-sm transition-colors">
              Open project
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
