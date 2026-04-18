'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, MapPin, UserPlus, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { useAuthStore } from '@/store/authStore';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', password: '' });
  const { register, isLoading } = useAuthStore();
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await register(formData);

    if (result.success) {
      Swal.fire({
        title: 'অভিনন্দন!',
        text: 'আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।',
        icon: 'success',
        background: '#18181b',
        color: '#fff',
        confirmButtonColor: '#f97316',
      }).then(() => {
        router.push('/dashboard'); 
      });
    } else {
      Swal.fire({
        title: 'ত্রুটি!',
        text: result.message,
        icon: 'error',
        background: '#18181b',
        color: '#fff',
        confirmButtonColor: '#f43f5e',
      });
    }
  };

  return (
    <div className="bg-zinc-950 min-h-screen flex items-center justify-center py-24 px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-rose-600/10 blur-[150px] rounded-full pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-lg relative z-10">
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
              <UserPlus className="w-8 h-8 text-rose-500" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2">নতুন অ্যাকাউন্ট</h2>
            <p className="text-zinc-400 text-sm">ড্যাশবোর্ড অ্যাক্সেস পেতে রেজিস্ট্রেশন করুন</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-zinc-400 text-xs font-bold uppercase tracking-wider ml-1">আপনার নাম <span className="text-rose-500">*</span></label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors" placeholder="সম্পূর্ণ নাম লিখুন" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-zinc-400 text-xs font-bold uppercase tracking-wider ml-1">ইমেইল <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors" placeholder="example@mail.com" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-zinc-400 text-xs font-bold uppercase tracking-wider ml-1">ফোন নাম্বার <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors" placeholder="017XXXXXXXX" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-400 text-xs font-bold uppercase tracking-wider ml-1">ঠিকানা <span className="text-rose-500">*</span></label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input type="text" name="address" value={formData.address} onChange={handleChange} required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors" placeholder="আপনার বর্তমান ঠিকানা" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-400 text-xs font-bold uppercase tracking-wider ml-1">পাসওয়ার্ড <span className="text-rose-500">*</span></label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input type="password" name="password" value={formData.password} onChange={handleChange} required minLength="6" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors" placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড" />
              </div>
            </div>

            <button 
              type="submit" disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-orange-500 text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all shadow-[0_10px_20px_rgba(244,63,94,0.2)] mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><UserPlus className="w-4 h-4" /> রেজিস্টার করুন</>}
            </button>
          </form>

          <p className="text-center text-zinc-500 text-sm mt-8">
            ইতোমধ্যেই অ্যাকাউন্ট আছে? <Link href="/login" className="text-rose-500 font-bold hover:text-rose-400 transition-colors">লগইন করুন</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}