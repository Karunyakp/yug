import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  SplitSquareHorizontal,
  FileBarChart,
  Users,
  Settings,
  Sparkles,
  Search,
  Bell,
  Command,
  UserCircle2,
  Gem,
  Share2,
  Play
} from 'lucide-react';

import Dashboard from './components/Dashboard';
import Compare from './components/Compare';
import Assignments from './components/Assignments';
import Login from './components/Login';
import Reports from './components/Reports';
import SubmissionsList from './components/SubmissionsList';
import Projects from './components/Projects';
import UsersPage from './components/Users';
import SettingsPage from './components/Settings';
import Profile from './components/Profile';
import Features from './components/Features';
import Landing from './components/Landing';
import NetworkGraph from './components/NetworkGraph';
import HackathonDemo from './components/HackathonDemo';
import CommandPalette from './components/CommandPalette';

import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  const isActive = (p: string) => path === p;

  return (
    <aside className="w-64 bg-[#101422] h-screen flex flex-col border-r border-[#1F263E] text-[#8E99B7] shrink-0">
      {/* Top logo */}
      <div className="p-6">
        <Link to="/dashboard" className="flex items-center gap-3">
          <img src="/logo.jpg" alt="CodeGuard" className="w-9 h-9 rounded-xl border border-[#232A44]" />
          <div>
            <h1 className="text-white font-bold text-lg leading-none">CodeGuard AI</h1>
            <span className="text-[10px] text-[#E02875] font-semibold tracking-wider uppercase">ACADEMIC EDITION</span>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
        <div>
          <p className="text-[11px] font-bold text-[#69759B] uppercase tracking-wider mb-3 px-2">INTEGRITY SUITE</p>
          <nav className="space-y-1">
            <NavItem to="/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" active={isActive('/dashboard')} />
            <NavItem to="/compare" icon={<SplitSquareHorizontal size={18} />} label="Diff & AST Studio" active={isActive('/compare')} />
            <NavItem to="/network" icon={<Share2 size={18} />} label="Collusion Network" active={isActive('/network')} badge="NEW" />
            <NavItem to="/submissions" icon={<FolderKanban size={18} />} label="Submissions" active={isActive('/submissions')} badge="248" />
            <NavItem to="/assignments" icon={<FileText size={18} />} label="Assignments" active={isActive('/assignments')} badge="12" />
            <NavItem to="/reports" icon={<FileBarChart size={18} />} label="PDF Reports" active={isActive('/reports')} />
          </nav>
        </div>

        <div>
          <p className="text-[11px] font-bold text-[#69759B] uppercase tracking-wider mb-3 px-2">HACKATHON & DEMO</p>
          <nav className="space-y-1">
            <NavItem to="/demo" icon={<Play size={18} className="text-[#00D2D3]" />} label="Judge Demo Mode" active={isActive('/demo')} badge="DEMO" />
            <NavItem to="/features" icon={<Gem size={18} />} label="Architecture & USP" active={isActive('/features')} />
          </nav>
        </div>

        <div>
          <p className="text-[11px] font-bold text-[#69759B] uppercase tracking-wider mb-3 px-2">INSTITUTION</p>
          <nav className="space-y-1">
            <NavItem to="/projects" icon={<FolderKanban size={18} />} label="Courses" active={isActive('/projects')} />
            <NavItem to="/users" icon={<Users size={18} />} label="Faculty & TAs" active={isActive('/users')} />
            <NavItem to="/profile" icon={<UserCircle2 size={18} />} label="Profile" active={isActive('/profile')} />
            <NavItem to="/settings" icon={<Settings size={18} />} label="Settings" active={isActive('/settings')} />
          </nav>
        </div>
      </div>

      <div className="p-4 mt-auto">
        <div className="bg-[#15192B] rounded-2xl p-4 border border-[#1F263E] relative overflow-hidden group">
          <div className="flex items-center gap-2 mb-2 relative z-10">
            <Sparkles className="w-4 h-4 text-[#E02875]" />
            <h3 className="text-white font-semibold text-xs">Gemini 3.8 Flash Active</h3>
          </div>
          <p className="text-[11px] text-[#8E99B7] mb-3 relative z-10 leading-relaxed">
            Multi-signal AST canonicalization + qualitative pedagogical viva prompts.
          </p>
          <Link to="/compare" className="block text-center w-full py-1.5 px-3 rounded-xl bg-[#1F263E] text-xs font-semibold text-white hover:bg-[#2A3352] transition-colors relative z-10">
            Run Analysis
          </Link>
        </div>
      </div>
    </aside>
  );
};

const NavItem = ({ to, icon, label, active, badge }: { to: string; icon: React.ReactNode; label: string; active?: boolean; badge?: string }) => {
  return (
    <Link
      to={to}
      className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
        active ? 'bg-[#E02875] text-white shadow-md shadow-[#E02875]/20 font-semibold' : 'text-[#8E99B7] hover:text-[#F3F4F6] hover:bg-[#15192B]'
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-xs font-medium">{label}</span>
      </div>
      {badge !== undefined && (
        <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full ${active ? 'bg-white/20 text-white' : 'bg-[#1F263E] text-[#8E99B7]'}`}>
          {badge}
        </span>
      )}
    </Link>
  );
};

const Header = ({ onOpenCommandPalette }: { onOpenCommandPalette: () => void }) => {
  return (
    <header className="h-16 bg-[#101422] border-b border-[#1F263E] flex items-center justify-between px-6 shrink-0">
      <div 
        onClick={onOpenCommandPalette}
        className="w-80 relative group cursor-pointer"
      >
        <div className="flex items-center justify-between px-3.5 py-2 bg-[#0B0D14] border border-[#1F263E] hover:border-[#2A3352] rounded-xl text-xs text-[#69759B] transition-colors">
          <div className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5" />
            <span>Search or jump to...</span>
          </div>
          <div className="bg-[#15192B] border border-[#232A44] rounded text-[10px] text-[#8E99B7] px-1.5 py-0.5 flex items-center gap-1 font-mono">
            <Command className="w-2.5 h-2.5" /> K
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <Link 
          to="/demo" 
          className="px-3 py-1.5 rounded-xl bg-[#00D2D3]/10 border border-[#00D2D3]/20 text-[#00D2D3] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#00D2D3]/20 transition-all"
        >
          <Play size={12} fill="currentColor" /> Demo Mode
        </Link>

        <button onClick={() => window.alert('You have 3 flagged cases awaiting viva review.')} className="relative text-[#8E99B7] hover:text-white transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 block h-2 w-2 rounded-full bg-[#E02875]"></span>
        </button>

        <div className="flex items-center gap-3 border-l border-[#1F263E] pl-5">
          <Link to="/profile" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="text-right">
              <p className="text-xs font-semibold text-white leading-none mb-1">Prof. Verma</p>
              <p className="text-[10px] text-[#8E99B7] leading-none">Dept of Computer Science</p>
            </div>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#E02875] to-[#8A63D2] flex items-center justify-center text-white font-bold text-xs shadow-sm">
              PV
            </div>
          </Link>
          <button 
            onClick={() => {
              localStorage.removeItem('isAuthenticated');
              window.location.href = '/login';
            }}
            className="text-xs font-medium text-[#8E99B7] hover:text-white px-2.5 py-1.5 rounded-lg border border-[#1F263E] hover:bg-[#15192B] transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [cmdOpen, setCmdOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0B0D14] overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onOpenCommandPalette={() => setCmdOpen(true)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0B0D14] p-6 text-[#F3F4F6]">
          <div className="max-w-[1240px] mx-auto">
            {children}
          </div>
        </main>
      </div>
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
    </div>
  );
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0D14] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-[#E02875] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs text-[#8E99B7] font-semibold tracking-wider uppercase">Loading CodeGuard AI...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
        <Route path="/features" element={<ProtectedRoute><Layout><Features /></Layout></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute><Layout><Projects /></Layout></ProtectedRoute>} />
        <Route path="/assignments" element={<ProtectedRoute><Layout><Assignments /></Layout></ProtectedRoute>} />
        <Route path="/submissions" element={<ProtectedRoute><Layout><SubmissionsList /></Layout></ProtectedRoute>} />
        <Route path="/compare" element={<ProtectedRoute><Layout><Compare /></Layout></ProtectedRoute>} />
        <Route path="/network" element={<ProtectedRoute><Layout><NetworkGraph /></Layout></ProtectedRoute>} />
        <Route path="/demo" element={<ProtectedRoute><Layout><HackathonDemo /></Layout></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Layout><Reports /></Layout></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><Layout><UsersPage /></Layout></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Layout><SettingsPage /></Layout></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
