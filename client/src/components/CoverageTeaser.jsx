'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Crosshair } from 'lucide-react';

export default function CoverageTeaser() {
  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Banner Card */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-[3rem] overflow-hidden relative shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-10 md:p-16 flex flex-col justify-center relative z-20"
            >
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6 tracking-tight">
                আপনার এলাকায় কি <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">আমাদের নেটওয়ার্ক</span> আছে?
              </h2>
              
              <p className="text-zinc-400 text-lg mb-10 leading-relaxed font-medium max-w-md">
                অরবিটাল নেট-এর সুপারফাস্ট ফাইবার অপটিক ক্যাবল টাঙ্গাইলের প্রায় সব জায়গায় পৌঁছে গেছে। আপনার ঠিকানায় আমাদের কভারেজ আছে কিনা তা এক ক্লিকেই চেক করে নিন।
              </p>

              <div>
                <Link href="/coverage" className="group relative inline-flex items-center justify-center gap-3 bg-white text-zinc-950 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-zinc-200 transition-all hover:-translate-y-1 active:scale-95 shadow-lg">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  Check Coverage Area
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Right */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative min-h-[300px] lg:min-h-full w-full bg-zinc-950 overflow-hidden"
            >
              {/* Fade Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/40 via-transparent to-transparent z-10 lg:block hidden"></div>
              <div className="absolute inset-0 bg-zinc-950/30 z-10"></div>
              
              {/* Background Image */}
              <Image 
                src="/city-map.png"
                alt="Tangail City Coverage"
                fill
                className="object-cover opacity-60 scale-105"
                onError={(e) => e.target.style.display='none'}
              />

              {/* --- Glowing Map Pins --- */}
              
              {/* Pin 1 */}
              <motion.div 
                animate={{ y: [-5, 5, -5] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[20%] left-[20%] z-20 flex flex-col items-center"
              >
                <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-orange-500 rounded-full blur-md opacity-50 animate-pulse"></div>
                  <MapPin className="w-4 h-4 text-orange-400 relative z-10" />
                </div>
              </motion.div>

              {/* Pin 2 */}
              <motion.div 
                animate={{ y: [5, -5, 5] }} 
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[25%] right-[25%] z-20 flex flex-col items-center"
              >
                <div className="w-10 h-10 bg-rose-500/20 rounded-full flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-rose-500 rounded-full blur-md opacity-50 animate-ping" style={{ animationDuration: '3s' }}></div>
                  <MapPin className="w-5 h-5 text-rose-400 relative z-10" />
                </div>
              </motion.div>

              {/* Pin 3 */}
              <motion.div 
                animate={{ y: [-3, 3, -3] }} 
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-[15%] right-[15%] z-20 flex flex-col items-center"
              >
                <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-emerald-500 rounded-full blur-md opacity-40 animate-pulse"></div>
                  <MapPin className="w-3 h-3 text-emerald-400 relative z-10" />
                </div>
              </motion.div>

              {/* Pin 4 */}
              <motion.div 
                animate={{ y: [4, -4, 4] }} 
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-[50%] left-[40%] z-20 flex flex-col items-center"
              >
                <div className="w-7 h-7 bg-cyan-500/20 rounded-full flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-cyan-500 rounded-full blur-sm opacity-50 animate-pulse" style={{ animationDuration: '2s' }}></div>
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 relative z-10" />
                </div>
              </motion.div>

              {/* Pin 5 */}
              <motion.div 
                animate={{ y: [-4, 4, -4] }} 
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute bottom-[15%] left-[15%] z-20 flex flex-col items-center"
              >
                <div className="w-5 h-5 bg-orange-500/20 rounded-full flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-orange-500 rounded-full blur-sm opacity-60"></div>
                  <MapPin className="w-2.5 h-2.5 text-orange-300 relative z-10" />
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}