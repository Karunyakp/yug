import { useState } from 'react';
import { Search, Plus, Calendar, Eye, Edit2, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockAssignments = [
  { id: 1, title: 'Sorting Algorithms', tags: ['py', 'java'], description: 'Implement quicksort and mergesort with step-b...', dueDate: '28 Nov 2024', submissions: 45, total: 60, status: 'Active' },
  { id: 2, title: 'OOP Lab 4 - Polymorphism', tags: ['java', '.cpp'], description: 'Design a shape hierarchy with abstract classes a...', dueDate: '02 Dec 2024', submissions: 32, total: 60, status: 'Active' },
  { id: 3, title: 'DBMS Project: ER to Relational', tags: ['.sql'], description: 'Convert given ER diagram into relational schem...', dueDate: '15 Nov 2024', submissions: 60, total: 60, status: 'Archived' },
  { id: 4, title: 'AI Search - A* Implementation', tags: ['.py'], description: 'Implement A* search for 8-puzzle with admissibi...', dueDate: '10 Dec 2024', submissions: 5, total: 60, status: 'Draft' },
  { id: 5, title: 'Web Dev - E-commerce Clone UI', tags: ['.js', '.py'], description: 'Recreate e-commerce product listing page with filters...', dueDate: '05 Dec 2024', submissions: 22, total: 60, status: 'Active' },
];

const getTagColor = (tag: string) => {
  const t = tag.toLowerCase().replace('.', '');
  switch (t) {
    case 'py': return 'bg-teal-500/15 text-teal-700 border border-teal-500/20';
    case 'java': return 'bg-orange-500/15 text-orange-700 border border-orange-500/20';
    case 'cpp': return 'bg-blue-500/15 text-blue-700 border border-blue-500/20';
    case 'sql': return 'bg-green-500/15 text-green-700 border border-green-500/20';
    case 'js': return 'bg-yellow-500/15 text-yellow-700 border border-yellow-500/20';
    default: return 'bg-gray-500/15 text-gray-600 border border-gray-500/20';
  }
};

const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active': return 'bg-[#E4F1E9] text-[#174C3C] border border-[#C3E4CF]';
    case 'draft': return 'bg-[#F7F6F0] text-[#707A72] border border-[#E3E7E0]';
    case 'archived': return 'bg-[#F7F6F0] text-[#A3AA9D] border border-[#E3E7E0]';
    default: return 'bg-[#F7F6F0] text-[#707A72] border border-[#E3E7E0]';
  }
};

export default function Assignments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = ['All', 'Active', 'Draft', 'Archived'];
  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredAssignments = mockAssignments.filter((assignment) => {
    const matchesTab = activeTab === 'All' || assignment.status === activeTab;
    if (!matchesTab) return false;

    if (!normalizedSearch) return true;

    const queryText = [
      assignment.title,
      assignment.description,
      assignment.status,
      ...assignment.tags,
    ]
      .join(' ')
      .toLowerCase();

    return queryText.includes(normalizedSearch);
  });

  return (
    <div className="w-full max-w-[1200px] mx-auto text-[#202923]">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-semibold mb-1">Assignments</h1>
          <p className="text-[#707A72] text-sm">Create, manage and monitor all coursework in one editorial view.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#174C3C] hover:bg-[#10382D] text-white px-5 py-2.5 rounded-full font-medium flex items-center gap-2 transition-colors shrink-0"
        >
          <Plus size={18} />
          Create Assignment
        </button>
      </div>

      {/* FILTER ROW */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A3AA9D]" size={18} />
          <input
            type="text"
            placeholder="Search assignments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white text-[#202923] pl-11 pr-4 py-2.5 rounded-full border border-[#E3E7E0] focus:outline-none focus:border-[#174C3C]/50 transition-colors"
          />
        </div>
        
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-full border border-[#E3E7E0] overflow-x-auto w-full md:w-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-[#174C3C] text-white'
                  : 'text-[#707A72] hover:text-[#202923]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ASSIGNMENTS TABLE */}
      <div className="bg-white rounded-2xl border border-[#E3E7E0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E3E7E0] bg-[#F7F6F0]">
                <th className="py-4 px-6 text-xs uppercase text-[#707A72] font-semibold tracking-wider">Title</th>
                <th className="py-4 px-6 text-xs uppercase text-[#707A72] font-semibold tracking-wider hidden md:table-cell">Description</th>
                <th className="py-4 px-6 text-xs uppercase text-[#707A72] font-semibold tracking-wider">Due Date</th>
                <th className="py-4 px-6 text-xs uppercase text-[#707A72] font-semibold tracking-wider">Submissions</th>
                <th className="py-4 px-6 text-xs uppercase text-[#707A72] font-semibold tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs uppercase text-[#707A72] font-semibold tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssignments.map((assignment) => (
                <tr key={assignment.id} className="border-b border-[#E3E7E0] hover:bg-[#F7F6F0]/60 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-medium text-[#202923] mb-2">{assignment.title}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {assignment.tags.map((tag) => (
                        <span key={tag} className={`text-[10px] rounded px-1.5 py-0.5 font-medium ${getTagColor(tag)}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-[#707A72] hidden md:table-cell max-w-[200px] truncate">
                    {assignment.description}
                  </td>
                  <td className="py-4 px-6 text-sm text-[#202923] whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-[#A3AA9D]" />
                      {assignment.dueDate}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-1.5 w-32">
                      <div className="flex justify-between items-center text-xs text-[#707A72]">
                        <span>{assignment.submissions}/{assignment.total}</span>
                        <span>{Math.round((assignment.submissions / assignment.total) * 100)}%</span>
                      </div>
                      <div className="h-1.5 bg-[#E3E7E0] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#174C3C] rounded-full transition-all duration-500"
                          style={{ width: `${(assignment.submissions / assignment.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap ${getStatusStyle(assignment.status)}`}>
                      {assignment.status === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-[#174C3C]"></span>}
                      {assignment.status === 'Draft' && <span className="w-1.5 h-1.5 rounded-full bg-[#A3AA9D]"></span>}
                      {assignment.status === 'Archived' && <span className="w-1.5 h-1.5 rounded-full bg-[#A3AA9D]"></span>}
                      {assignment.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4 text-sm font-medium">
                      <Link to="/submissions" className="text-[#707A72] hover:text-[#202923] transition-colors flex items-center gap-1.5">
                        <Eye size={14} />
                        View
                      </Link>
                      <button onClick={() => setIsModalOpen(true)} className="text-[#707A72] hover:text-[#202923] transition-colors flex items-center gap-1.5">
                        <Edit2 size={14} />
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#202923]/40 backdrop-blur-sm">
          <div className="bg-white border border-[#E3E7E0] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-[#E3E7E0] flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#202923]">Create Assignment</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-[#707A72] hover:text-[#202923] transition-colors bg-[#F7F6F0] hover:bg-[#E3E7E0] rounded-full p-2"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#202923] mb-1.5">Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Sorting Algorithms" 
                  className="w-full bg-[#F7F6F0] border border-[#E3E7E0] rounded-xl px-4 py-2.5 text-[#202923] placeholder-[#A3AA9D] focus:outline-none focus:border-[#174C3C]/50 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#202923] mb-1.5">Description</label>
                <textarea 
                  rows={3}
                  placeholder="Provide instructions and context..." 
                  className="w-full bg-[#F7F6F0] border border-[#E3E7E0] rounded-xl px-4 py-2.5 text-[#202923] placeholder-[#A3AA9D] focus:outline-none focus:border-[#174C3C]/50 transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#202923] mb-1.5">Due Date</label>
                  <input 
                    type="date" 
                    className="w-full bg-[#F7F6F0] border border-[#E3E7E0] rounded-xl px-4 py-2.5 text-[#202923] focus:outline-none focus:border-[#174C3C]/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#202923] mb-1.5">Languages</label>
                  <input 
                    type="text" 
                    placeholder="e.g. .py, .java" 
                    className="w-full bg-[#F7F6F0] border border-[#E3E7E0] rounded-xl px-4 py-2.5 text-[#202923] placeholder-[#A3AA9D] focus:outline-none focus:border-[#174C3C]/50 transition-colors"
                  />
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-[#E3E7E0] bg-[#F7F6F0] flex justify-end gap-3 mt-auto">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl font-medium text-[#707A72] hover:text-[#202923] hover:bg-white transition-colors"
              >
                Cancel
              </button>
              <button className="bg-[#174C3C] hover:bg-[#10382D] text-white px-6 py-2.5 rounded-xl font-medium transition-colors">
                Save Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
