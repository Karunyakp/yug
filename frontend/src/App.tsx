import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Compare from './components/Compare';
import { Shield, LayoutDashboard, FileCode2 } from 'lucide-react';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 text-white flex flex-col">
          <div className="p-4 flex items-center gap-2 border-b border-slate-700">
            <Shield className="text-blue-400" />
            <span className="font-bold text-xl">CodeGuard AI</span>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <Link to="/" className="flex items-center gap-3 p-3 rounded hover:bg-slate-800 transition-colors">
              <LayoutDashboard size={20} />
              Dashboard
            </Link>
            <Link to="/compare" className="flex items-center gap-3 p-3 rounded hover:bg-slate-800 transition-colors">
              <FileCode2 size={20} />
              Analysis Workspace
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          <header className="bg-white border-b px-8 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-800">Academic Integrity Portal</h2>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                Admin
              </div>
            </div>
          </header>
          
          <div className="flex-1 p-8 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/compare" element={<Compare />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
