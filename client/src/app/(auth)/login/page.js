'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // api call
    console.log('Login Data:', formData);
  };

  return (
    <div className="bg-zinc-950 min-h-screen flex items-center justify-center py-24 px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
              <ShieldCheck className="w-8 h-8 text-orange-500" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2">স্বাগতম!</h2>
            <p className="text-zinc-400 text-sm">আপনার অরবিটাল নেট অ্যাকাউন্টে লগইন করুন</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-zinc-400 text-xs font-bold uppercase tracking-wider ml-1">ইমেইল অ্যাড্রেস</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors placeholder:text-zinc-600"
                  placeholder="example@email.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-zinc-400 text-xs font-bold uppercase tracking-wider">পাসওয়ার্ড</label>
                <Link href="#" className="text-orange-500 text-xs font-bold hover:text-orange-400">পাসওয়ার্ড ভুলে গেছেন?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors placeholder:text-zinc-600"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all shadow-[0_10px_20px_rgba(249,115,22,0.2)] mt-4"
            >
              লগইন করুন
              <LogIn className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-zinc-500 text-sm mt-8">
            অ্যাকাউন্ট নেই? {' '}
            <Link href="/register" className="text-orange-500 font-bold hover:text-orange-400 transition-colors">
              নতুন তৈরি করুন
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}