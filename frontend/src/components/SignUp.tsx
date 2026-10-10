import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';

export default function SignUp() {
  return (
    <div className="min-h-screen bg-[#0f0f14] flex flex-col items-center justify-center font-sans text-white relative">
      <div className="absolute top-8 left-8">
        <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
      
      <div className="w-full max-w-md bg-[#1a1a24] p-10 rounded-3xl border border-white/10 shadow-2xl">
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-xl">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-2">Create Account</h2>
        <p className="text-gray-400 text-center mb-8">Join the academic integrity revolution.</p>
        
        <form className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 font-semibold mb-1">Full Name</label>
            <input type="text" className="w-full bg-[#0a0a10] border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-pink-500 outline-none" placeholder="Prof. Jane Doe" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 font-semibold mb-1">University Email</label>
            <input type="email" className="w-full bg-[#0a0a10] border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-pink-500 outline-none" placeholder="you@university.edu" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 font-semibold mb-1">Password</label>
            <input type="password" className="w-full bg-[#0a0a10] border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-pink-500 outline-none" placeholder="••••••••" />
          </div>
          <button type="button" onClick={() => alert('Sign up feature coming soon!')} className="w-full bg-white text-black font-semibold rounded-xl py-4 hover:bg-gray-200 transition-colors mt-4">
            Sign Up
          </button>
        </form>
        
        <p className="mt-6 text-center text-gray-500 text-sm">
          Already have an account? <Link to="/login" className="text-pink-500 hover:text-pink-400">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
