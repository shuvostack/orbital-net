'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, ArrowRight, Smartphone, Activity, CreditCard, Lock, Clock } from 'lucide-react';

export default function PayBill() {
  
  const paymentFeatures = [
    { icon: <Zap className="w-4 h-4 text-orange-400" />, text: "Instant Line Activation" },
    { icon: <Lock className="w-4 h-4 text-emerald-400" />, text: "Secure Encrypted Gateway" },
    { icon: <Clock className="w-4 h-4 text-rose-400" />, text: "24/7 Automated System" },
  ];

  const vortexRotate = {
    animate: {
      rotate: 360,
      transition: { duration: 40, ease: 'linear', repeat: Infinity },
    },
  };

  const vortexCounterRotate = {
    animate: {
      rotate: -360,
      transition: { duration: 30, ease: 'linear', repeat: Infinity },
    },
  };

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden border-t border-zinc-900">
      
      {/* Background Separation & Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        
        {/* Section Headline */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 relative"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-zinc-100 leading-[1.1]">
            Already a Customer? <br />
            <span className="bg-gradient-to-r from-orange-400 to-rose-500 bg-clip-text text-transparent drop-shadow-sm">
              Pay Bill Effortlessly.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-500 mt-6 max-w-xl mx-auto font-medium">
             Don't let your connection interrupt. Use our automated portal to clear your dues securely in seconds.
          </p>
        </motion.div>

        {/* The Performance Vortex Area */}
        <div className="relative h-[450px] md:h-[520px] w-full flex items-center justify-center">
          
          {/* Vortex Rings */}
          <motion.div variants={vortexRotate} animate="animate" className="absolute w-[400px] h-[400px] md:w-[550px] md:h-[550px] border border-orange-500/10 rounded-full flex items-center justify-center">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-orange-500 rounded-full blur-[2px]"></div>
          </motion.div>
          <motion.div variants={vortexCounterRotate} animate="animate" className="absolute w-[280px] h-[280px] md:w-[400px] md:h-[400px] border border-zinc-800 rounded-full" />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            animate={{ 
              y: [-15, 15, -15], 
              rotateZ: [-1.2, 1.2, -1.2] 
            }}
            transition={{ 
              y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              rotateZ: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            }}
            className="relative z-20 w-80 bg-zinc-950/90 backdrop-blur-2xl border border-orange-500/20 rounded-[2.5rem] p-8 shadow-[0_40px_80px_rgba(0,0,0,0.7)] overflow-hidden group"
          >
            {/* Top Glow bar */}
            <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
            
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 shadow-inner group-hover:border-orange-500/30 transition-colors">
                <CreditCard className="w-7 h-7 text-orange-400" />
              </div>
              <h3 className="text-white font-black text-xl tracking-tight">Seamless Payment</h3>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">Fiber Blaze Network</p>
            </div>

            {/* Benefit List inside Card */}
            <div className="space-y-4 mb-8">
              {paymentFeatures.map((feat, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50 group-hover:border-zinc-700 transition-all">
                  <div className="shrink-0">{feat.icon}</div>
                  <span className="text-zinc-300 text-xs font-bold">{feat.text}</span>
                </div>
              ))}
            </div>

            {/* Payment Gateways Mockup */}
            <div className="flex justify-between items-center px-2 py-3 border-t border-zinc-800/80 mt-4 opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500">
               <div className="text-[10px] font-black text-zinc-500">bKash</div>
               <div className="text-[10px] font-black text-zinc-500">Nagad</div>
               <div className="text-[10px] font-black text-zinc-500">Rocket</div>
               <div className="text-[10px] font-black text-zinc-500">Card</div>
            </div>
            
            {/* Card Texture */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none"></div>
          </motion.div>

        </div>

        {/* Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 z-30"
        >
          <Link href="#" className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-10 py-5 rounded-2xl font-black text-xl shadow-[0_15px_30px_rgba(249,115,22,0.25)] hover:shadow-[0_25px_50px_rgba(249,115,22,0.4)] transition-all hover:-translate-y-1.5 active:scale-95">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-rose-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-60 transition-opacity duration-500"></div>
            
            <Smartphone className="w-5 h-5 text-white z-10" />
            <span className="z-10 relative">Access Payment Portal</span>
            <ArrowRight className="w-5 h-5 text-white z-10 group-hover:translate-x-1.5 transition-transform" />
          </Link>
          <p className="text-zinc-600 text-sm mt-5 text-center font-medium">Line auto-activation takes only 5 seconds!</p>
        </motion.div>

      </div>
    </section>
  );
}