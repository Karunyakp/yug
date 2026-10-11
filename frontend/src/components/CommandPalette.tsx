import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  LayoutDashboard,
  FileText,
  SplitSquareHorizontal,
  FileBarChart,
  Users,
  Settings,
  FolderKanban,
  Share2,
  Download,
  Plus,
  X
} from 'lucide-react';

interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Actions' | 'Tools';
  icon: any;
  action: () => void;
  shortcut?: string;
}

export default function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle or open
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const items: CommandItem[] = [
    {
      id: 'dash',
      title: 'Go to Dashboard & Overview',
      category: 'Navigation',
      icon: LayoutDashboard,
      action: () => { navigate('/dashboard'); onClose(); },
      shortcut: 'G D'
    },
    {
      id: 'compare',
      title: 'Open Code Comparison & AST Diff Studio',
      category: 'Navigation',
      icon: SplitSquareHorizontal,
      action: () => { navigate('/compare'); onClose(); },
      shortcut: 'G C'
    },
    {
      id: 'network',
      title: 'Open Collusion & Cluster Network Graph',
      category: 'Tools',
      icon: Share2,
      action: () => { navigate('/network'); onClose(); },
      shortcut: 'G N'
    },
    {
      id: 'assignments',
      title: 'Manage Assignments & Starter Code',
      category: 'Navigation',
      icon: FileText,
      action: () => { navigate('/assignments'); onClose(); }
    },
    {
      id: 'submissions',
      title: 'View Student Submissions Queue',
      category: 'Navigation',
      icon: FolderKanban,
      action: () => { navigate('/submissions'); onClose(); }
    },
    {
      id: 'reports',
      title: 'Generate Academic Integrity PDF Reports',
      category: 'Tools',
      icon: FileBarChart,
      action: () => { navigate('/reports'); onClose(); }
    },
    {
      id: 'new_assignment',
      title: 'Create New Assignment Rubric',
      category: 'Actions',
      icon: Plus,
      action: () => { navigate('/assignments'); onClose(); }
    },
    {
      id: 'export',
      title: 'Export Review Evidence to PDF/CSV',
      category: 'Actions',
      icon: Download,
      action: () => { navigate('/reports'); onClose(); }
    },
    {
      id: 'users',
      title: 'Teaching Staff & Reviewer Permissions',
      category: 'Navigation',
      icon: Users,
      action: () => { navigate('/users'); onClose(); }
    },
    {
      id: 'settings',
      title: 'Platform Thresholds & Boilerplate Settings',
      category: 'Navigation',
      icon: Settings,
      action: () => { navigate('/settings'); onClose(); }
    }
  ];

  const filtered = items.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 bg-[#202923]/40 backdrop-blur-sm px-4">
      <div 
        className="w-full max-w-xl bg-white border border-[#E3E7E0] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3.5 border-b border-[#E3E7E0] bg-[#F7F6F0]">
          <Search className="w-5 h-5 text-[#707A72] mr-3 shrink-0" />
          <input
            type="text"
            className="w-full bg-transparent text-[#202923] text-sm placeholder-[#A3AA9D] outline-none"
            placeholder="Search commands, navigate pages, run actions... (Esc to close)"
            value={query}
            onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
            autoFocus
          />
          <button 
            onClick={onClose}
            className="text-[#707A72] hover:text-[#202923] p-1 rounded-md transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sm text-[#707A72]">
              No matching actions or pages found.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm transition-all ${
                    isSelected
                      ? 'bg-[#E4F1E9] text-[#174C3C] border border-[#174C3C]/20'
                      : 'text-[#707A72] hover:text-[#202923] hover:bg-[#F7F6F0] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-[#174C3C] text-white' : 'bg-[#F7F6F0] text-[#707A72]'}`}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className={`font-medium ${isSelected ? 'text-[#174C3C]' : 'text-[#202923]'}`}>{item.title}</p>
                      <p className="text-[11px] text-[#A3AA9D] uppercase font-mono">{item.category}</p>
                    </div>
                  </div>
                  {item.shortcut && (
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#F7F6F0] border border-[#E3E7E0] text-[#707A72]">
                      {item.shortcut}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>

        <div className="px-4 py-2.5 bg-[#F7F6F0] border-t border-[#E3E7E0] flex items-center justify-between text-[11px] text-[#707A72]">
          <span>Tip: Press <kbd className="px-1 py-0.5 rounded bg-white border border-[#E3E7E0] text-[#202923]">Ctrl + K</kbd> anytime to open</span>
          <span><kbd className="px-1 py-0.5 rounded bg-white border border-[#E3E7E0] text-[#202923]">↵</kbd> to select</span>
        </div>
      </div>
    </div>
  );
}
