import React from 'react';
import { Link } from 'react-router-dom';
import { KeyRound, ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-[#0f0f14] flex flex-col items-center justify-center font-sans text-white relative">
      <div className="absolute top-8 left-8">
        <Link to="/login" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </Link>
      </div>
      
      <div className="w-full max-w-md bg-[#1a1a24] p-10 rounded-3xl border border-white/10 shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="bg-pink-500/20 p-4 rounded-full">
            <KeyRound className="w-8 h-8 text-pink-500" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-2">Reset Password</h2>
        <p className="text-gray-400 text-center mb-8">Enter your email and we'll send you a reset link.</p>
        
        <form className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2">University Email</label>
            <input type="email" className="w-full bg-[#0a0a10] border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-pink-500 outline-none" placeholder="you@university.edu" />
          </div>
          <button type="button" onClick={() => alert('Reset link sent! (Mock)')} className="w-full bg-pink-600 hover:bg-pink-500 text-white font-semibold rounded-xl py-4 transition-colors">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
