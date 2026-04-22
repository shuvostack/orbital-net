'use client';

import { motion } from 'framer-motion';
import { CreditCard, ExternalLink, ShieldCheck, Zap, PhoneCall, ArrowRight, Lock, Receipt, Smartphone, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function PayBillPage() {
  const selfCareLink = "https://selfcare.orbitalbd.net/customer/login";

  const features = [
    {
      icon: <Zap className="w-5 h-5 text-orange-500" />,
      title: 'ইনস্ট্যান্ট রিনিউ',
      desc: 'পেমেন্ট কনফার্ম হওয়ার সাথে সাথেই ইন্টারনেট সচল।'
    },
    {
      icon: <Receipt className="w-5 h-5 text-rose-500" />,
      title: 'ডিজিটাল ইনভয়েস',
      desc: 'ড্যাশবোর্ডে পূর্ববর্তী সকল বিলের ট্র্যাকিং ও রসিদ।'
    },
    {
      icon: <Smartphone className="w-5 h-5 text-orange-500" />,
      title: 'যেকোনো ডিভাইস',
      desc: 'মোবাইল বা পিসি থেকে খুব সহজেই পেমেন্ট করার সুবিধা।'
    }
  ];

  return (
    <div className="bg-zinc-950 min-h-screen pb-24 relative overflow-hidden">
      
      {/* Premium Tech Background with Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 md:pt-20">
        
        {/* Main Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center mb-24">
          
          {/* Left */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
            className="text-center lg:text-left pr-0 lg:pr-8"
          > 
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight">
              বিনা বাধায় <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">ইন্টারনেট উপভোগ</span> করুন
            </h1>
            
            <p className="text-lg text-zinc-400 font-medium leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Orbital Net এর SelfCare পোর্টালে লগইন করে আপনার মাসিক বিল পরিশোধ করুন একদম নিরাপদে। কোনো এক্সট্রা চার্জ নেই, ঘরে বসেই ২ মিনিটে পেমেন্ট সম্পন্ন করুন।
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 opacity-60">
              <span className="flex items-center gap-2 text-sm font-bold text-zinc-300"><ShieldCheck className="w-4 h-4 text-emerald-400" /> PCI DSS Compliant</span>
              <span className="flex items-center gap-2 text-sm font-bold text-zinc-300"><ShieldCheck className="w-4 h-4 text-emerald-400" /> SSL Secured</span>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full max-w-md mx-auto lg:ml-auto"
          >
            {/* Floating Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-orange-400 to-rose-500 rounded-full blur-2xl opacity-40 animate-pulse" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-rose-500 to-purple-600 rounded-full blur-3xl opacity-30 animate-pulse" />

            <div className="bg-zinc-900/80 backdrop-blur-2xl border border-zinc-700/50 p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10">
              <div className="flex justify-between items-start mb-8">
                
                {/* 3D Spinning Taka Coin */}
                <div className="w-16 h-16 bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 rounded-2xl flex items-center justify-center shadow-inner [perspective:1000px]">
                  <motion.div
                    animate={{ rotateY: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.6)] border-2 border-orange-300/50 relative"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <span 
                      className="text-white text-xl font-black drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]"
                      style={{ transform: "translateZ(1px)" }}
                    >
                      ৳
                    </span>
                  </motion.div>
                </div>
              </div>
              
              <h3 className="text-2xl font-black text-white mb-2">SelfCare Portal</h3>
              <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
                আপনার ড্যাশবোর্ড অ্যাক্সেস করতে এবং বিল পেমেন্ট করতে নিচের বাটনে ক্লিক করুন।
              </p>

              <a 
                href={selfCareLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group w-full flex items-center justify-between bg-gradient-to-r from-orange-500 to-rose-500 text-white px-6 py-4 rounded-xl font-black text-sm uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all shadow-[0_10px_20px_rgba(249,115,22,0.25)]"
              >
                <span>পোর্টালে প্রবেশ করুন</span>
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>

              <div className="mt-8 pt-6 border-t border-zinc-800">
                <p className="text-center text-xs text-zinc-500 font-medium mb-4 uppercase tracking-widest">Supported Methods</p>
                <div className="flex items-center justify-center gap-4 opacity-80">
                  <img src="/bkash-icon.png" alt="bKash" className="h-7 object-contain drop-shadow-md" />
                  <img src="/Nagad-png.png" alt="Nagad" className="h-7 object-contain drop-shadow-md" />
                  <img src="/mastercard.png" alt="Mastercard" className="h-8 object-contain drop-shadow-md" />
                  <img src="/visa.png" alt="Visa" className="h-6 object-contain drop-shadow-md" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-3xl hover:bg-zinc-800/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-inner">
                {feature.icon}
              </div>
              <h4 className="text-white font-bold text-base mb-2">{feature.title}</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Minimal Support Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-4xl mx-auto bg-gradient-to-r from-zinc-900 to-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-sm"
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 rounded-full flex items-center justify-center shrink-0 shadow-inner">
              <HelpCircle className="w-5 h-5 text-zinc-400" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-1">যেকোনো সাপোর্টের জন্য</h4>
              <p className="text-zinc-500 text-xs font-medium">আইডি বা পাসওয়ার্ড ভুলে গেলে কল করুন</p>
            </div>
          </div>
          
          <Link href="/contact" className="group flex items-center gap-2 text-orange-400 font-bold text-sm hover:text-orange-300 transition-colors">
            সাপোর্ট সেন্টারে যান <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}