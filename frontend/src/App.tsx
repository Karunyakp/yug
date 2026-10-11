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
  Search,
  Bell,
  Command,
  Share2,
  Mail,
  Shield,
  Menu,
  X
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
import EmailCenter from './components/EmailCenter';
import CommandPalette from './components/CommandPalette';
import AssistantChat from './components/AssistantChat';
import { NotFound, PageMetadata, PrivacyPolicy, TermsAndConditions } from './components/PublicPages';

import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';

const Sidebar = ({ isMobileOpen, onCloseMobile }: { isMobileOpen: boolean; onCloseMobile: () => void }) => {
  const location = useLocation();
  const path = location.pathname;

  const isActive = (p: string) => path === p;

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs md:hidden"
        />
      )}

      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#E3E7E0] flex flex-col transition-transform duration-200 ease-in-out shrink-0 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        {/* Brand Header */}
        <div className="p-6 border-b border-[#E3E7E0] flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#174C3C] text-white flex items-center justify-center font-bold shadow-xs">
              <Shield size={20} />
            </div>
            <div>
              <h1 className="text-[#202923] font-bold text-base leading-none">CodeGuard AI</h1>
              <span className="text-[10px] text-[#707A72] font-semibold tracking-wider uppercase mt-1 block">ACADEMIC INTEGRITY</span>
            </div>
          </Link>
          <button onClick={onCloseMobile} className="md:hidden text-[#707A72] hover:text-[#202923]">
            <X size={18} />
          </button>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          <div>
            <p className="text-[11px] font-bold text-[#707A72] uppercase tracking-wider mb-2 px-3">CORE MODULES</p>
            <nav className="space-y-1">
              <NavItem to="/dashboard" icon={<LayoutDashboard size={17} />} label="Overview" active={isActive('/dashboard')} />
              <NavItem to="/submissions" icon={<FolderKanban size={17} />} label="Submissions" active={isActive('/submissions')} badge="248" />
              <NavItem to="/compare" icon={<SplitSquareHorizontal size={17} />} label="Code Analysis" active={isActive('/compare')} />
              <NavItem to="/network" icon={<Share2 size={17} />} label="Collaboration Graph" active={isActive('/network')} />
              <NavItem to="/reports" icon={<FileBarChart size={17} />} label="Reports & Evidence" active={isActive('/reports')} />
              <NavItem to="/email-center" icon={<Mail size={17} />} label="Email Center" active={isActive('/email-center')} badge="Live" />
            </nav>
          </div>

          <div>
            <p className="text-[11px] font-bold text-[#707A72] uppercase tracking-wider mb-2 px-3">COURSES & REVIEWS</p>
            <nav className="space-y-1">
              <NavItem to="/assignments" icon={<FileText size={17} />} label="Assignments" active={isActive('/assignments')} badge="12" />
              <NavItem to="/projects" icon={<FolderKanban size={17} />} label="Courses" active={isActive('/projects')} />
              <NavItem to="/users" icon={<Users size={17} />} label="Review Staff" active={isActive('/users')} />
            </nav>
          </div>

          <div>
            <p className="text-[11px] font-bold text-[#707A72] uppercase tracking-wider mb-2 px-3">SYSTEM</p>
            <nav className="space-y-1">
              <NavItem to="/settings" icon={<Settings size={17} />} label="Settings & Rules" active={isActive('/settings')} />
              <NavItem to="/privacy" icon={<Shield size={17} />} label="Privacy Policy" active={isActive('/privacy')} />
              <NavItem to="/terms" icon={<FileText size={17} />} label="Terms & Conditions" active={isActive('/terms')} />
            </nav>
          </div>
        </div>

        {/* User Card at bottom */}
        <div className="p-4 border-t border-[#E3E7E0] bg-[#F7F6F0]">
          <Link to="/profile" className="flex items-center gap-3 p-2 rounded-xl hover:bg-white transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#174C3C] text-white flex items-center justify-center font-bold text-xs">
              PV
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-[#202923] truncate">Prof. Verma</p>
              <p className="text-[10px] text-[#707A72] truncate">Lead Academic Reviewer</p>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
};

const NavItem = ({ to, icon, label, active, badge }: { to: string; icon: React.ReactNode; label: string; active?: boolean; badge?: string }) => {
  return (
    <Link
      to={to}
      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
        active 
          ? 'bg-[#E4F1E9] text-[#174C3C] font-bold shadow-2xs' 
          : 'text-[#707A72] hover:text-[#202923] hover:bg-[#F7F6F0]'
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span>{label}</span>
      </div>
      {badge !== undefined && (
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${active ? 'bg-[#174C3C] text-white' : 'bg-[#E3E7E0] text-[#707A72]'}`}>
          {badge}
        </span>
      )}
    </Link>
  );
};

const Header = ({ onOpenCommandPalette, onOpenMobile }: { onOpenCommandPalette: () => void; onOpenMobile: () => void }) => {
  return (
    <header className="h-16 bg-white border-b border-[#E3E7E0] flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4">
        <button onClick={onOpenMobile} className="md:hidden text-[#707A72] hover:text-[#202923]">
          <Menu size={20} />
        </button>

        <div 
          onClick={onOpenCommandPalette}
          className="w-72 sm:w-80 relative group cursor-pointer"
        >
          <div className="flex items-center justify-between px-3.5 py-2 bg-[#F7F6F0] border border-[#E3E7E0] hover:border-[#D2D7CF] rounded-xl text-xs text-[#707A72] transition-colors">
            <div className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5" />
              <span>Search submissions, cases...</span>
            </div>
            <div className="bg-white border border-[#E3E7E0] rounded text-[10px] text-[#707A72] px-1.5 py-0.5 flex items-center gap-1 font-mono">
              <Command className="w-2.5 h-2.5" /> K
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link 
          to="/email-center" 
          className="hidden sm:flex px-3 py-1.5 rounded-xl bg-[#E4F1E9] border border-[#C3E4CF] text-[#174C3C] text-xs font-semibold items-center gap-1.5 hover:bg-[#D4E8DC] transition-all"
        >
          <Mail size={13} /> Email Center
        </Link>

        <button onClick={() => window.alert('You have 3 flagged cases awaiting viva review.')} className="relative text-[#707A72] hover:text-[#202923] transition-colors p-1">
          <Bell className="w-4 h-4" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-[#B96F52]"></span>
        </button>

        <div className="flex items-center gap-3 border-l border-[#E3E7E0] pl-4">
          <button 
            onClick={() => {
              localStorage.removeItem('isAuthenticated');
              localStorage.removeItem('currentUserEmail');
              window.location.href = '/login';
            }}
            className="text-xs font-semibold text-[#707A72] hover:text-[#202923] px-3 py-1.5 rounded-lg border border-[#E3E7E0] hover:bg-[#F7F6F0] transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F7F6F0] overflow-hidden font-sans">
      <Sidebar isMobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onOpenCommandPalette={() => setCmdOpen(true)} 
          onOpenMobile={() => setMobileOpen(true)} 
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F7F6F0] p-6 text-[#202923]">
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
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F6F0] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-9 h-9 border-3 border-[#174C3C] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs text-[#707A72] font-semibold tracking-wider uppercase">Loading CodeGuard...</p>
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
      <PageMetadata />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />

        <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
        <Route path="/submissions" element={<ProtectedRoute><Layout><SubmissionsList /></Layout></ProtectedRoute>} />
        <Route path="/compare" element={<ProtectedRoute><Layout><Compare /></Layout></ProtectedRoute>} />
        <Route path="/network" element={<ProtectedRoute><Layout><NetworkGraph /></Layout></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Layout><Reports /></Layout></ProtectedRoute>} />
        <Route path="/email-center" element={<ProtectedRoute><Layout><EmailCenter /></Layout></ProtectedRoute>} />
        <Route path="/assignments" element={<ProtectedRoute><Layout><Assignments /></Layout></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute><Layout><Projects /></Layout></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><Layout><UsersPage /></Layout></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Layout><SettingsPage /></Layout></ProtectedRoute>} />
        <Route path="/features" element={<Features />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <AssistantChat />
    </Router>
  );
}

export default App;
