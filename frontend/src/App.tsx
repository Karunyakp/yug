import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Shield, LayoutDashboard, FolderKanban, FileText, SplitSquareHorizontal, FileBarChart, Users, Settings, Sparkles, Search, Bell, Command } from 'lucide-react';

import Dashboard from './components/Dashboard';
import Compare from './components/Compare';
import Assignments from './components/Assignments';
import Login from './components/Login';
import Reports from './components/Reports';
import SubmissionsList from './components/SubmissionsList';
import ComingSoon from './components/ComingSoon';

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  const isActive = (p: string) => path === p;

  return (
    <aside className="w-64 bg-[#111118] h-screen flex flex-col border-r border-gray-800 text-gray-300">
      {/* Top logo */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="bg-pink-600 p-2 rounded-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl leading-none">CodeGuard AI</h1>
            <span className="text-[10px] text-gray-500 font-semibold tracking-wider">MYNTRA EDITION</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-8">
        <div>
          <p className="text-xs font-semibold text-gray-500 tracking-widest mb-4 px-2">MENU</p>
          <nav className="space-y-1">
            <NavItem to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" active={isActive('/')} />
            <NavItem to="/projects" icon={<FolderKanban size={20} />} label="Projects" active={isActive('/projects')} badge={3} />
            <NavItem to="/assignments" icon={<FileText size={20} />} label="Assignments" active={isActive('/assignments')} badge={12} />
            <NavItem to="/submissions" icon={<FileText size={20} />} label="Submissions" active={isActive('/submissions')} badge={248} />
            <NavItem to="/compare" icon={<SplitSquareHorizontal size={20} />} label="Comparison" active={isActive('/compare')} />
            <NavItem to="/reports" icon={<FileBarChart size={20} />} label="Reports" active={isActive('/reports')} />
          </nav>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-500 tracking-widest mb-4 px-2">WORKSPACE</p>
          <nav className="space-y-1">
            <NavItem to="/users" icon={<Users size={20} />} label="Users" active={isActive('/users')} />
            <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" active={isActive('/settings')} />
          </nav>
        </div>
      </div>

      <div className="p-4 mt-auto">
        <div className="bg-[#1a1a24] rounded-xl p-4 border border-gray-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-10">
            <Sparkles size={48} />
          </div>
          <div className="flex items-center gap-2 mb-2 relative z-10">
            <Sparkles className="w-5 h-5 text-pink-500" />
            <h3 className="text-white font-medium text-sm">Upgrade to Pro</h3>
          </div>
          <p className="text-xs text-gray-400 mb-4 relative z-10 leading-relaxed">
            Unlimited AST comparisons, bulk export, Myntra-grade reports.
          </p>
          <button className="w-full py-2 px-4 rounded-lg border border-gray-600 text-sm font-medium text-white hover:bg-white/5 transition-colors relative z-10">
            Upgrade now
          </button>
        </div>
      </div>
    </aside>
  );
};

const NavItem = ({ to, icon, label, active, badge }: { to: string; icon: React.ReactNode; label: string; active?: boolean; badge?: number }) => {
  return (
    <Link
      to={to}
      className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
        active ? 'bg-pink-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium text-sm">{label}</span>
      </div>
      {badge !== undefined && (
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${active ? 'bg-white/20 text-white' : 'bg-pink-600 text-white'}`}>
          {badge}
        </span>
      )}
    </Link>
  );
};

const Header = () => {
  return (
    <header className="h-16 bg-[#111118] border-b border-gray-800 flex items-center justify-between px-6 shrink-0">
      <div className="w-96 relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-500" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-12 py-2 border border-gray-700 rounded-lg leading-5 bg-[#0a0a10] text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 sm:text-sm transition-colors"
          placeholder="Search assignments, students, reports..."
        />
        <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
          <div className="bg-gray-800 border border-gray-700 rounded text-gray-400 px-1.5 py-0.5 flex items-center gap-1">
            <Command className="w-3 h-3" />
            <span className="text-[10px] font-medium leading-none">K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-gray-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#111118]"></span>
        </button>

        <div className="flex items-center gap-3 border-l border-gray-800 pl-6">
          <div className="text-right">
            <p className="text-sm font-medium text-white leading-none mb-1">Prof. Verma</p>
            <p className="text-xs text-gray-500 leading-none">Administrator</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold text-sm border-2 border-[#111118] shadow-sm">
            PV
          </div>
        </div>
      </div>
    </header>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-[#0a0a10] overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0a0a10] p-6 text-gray-300">
          <div className="max-w-[1200px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/projects" element={<Layout><ComingSoon /></Layout>} />
        <Route path="/assignments" element={<Layout><Assignments /></Layout>} />
        <Route path="/submissions" element={<Layout><SubmissionsList /></Layout>} />
        <Route path="/compare" element={<Layout><Compare /></Layout>} />
        <Route path="/reports" element={<Layout><Reports /></Layout>} />
        <Route path="/users" element={<Layout><ComingSoon /></Layout>} />
        <Route path="/settings" element={<Layout><ComingSoon /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
