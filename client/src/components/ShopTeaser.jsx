'use client';

import Link from 'next/link';
import Image from 'next/image'; 
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Tag, Star } from 'lucide-react';

export default function ShopTeaser() {
  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background Separation Line & Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-[3rem] p-8 md:p-16 overflow-hidden relative">
          
          {/* Inner Glow */}
          <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-rose-500/10 blur-[80px] rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 font-bold text-xs uppercase tracking-widest mb-6">
                <Tag className="w-3.5 h-3.5" />
                Limited Time Offer
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">10% OFF</span> on <br />
                Gaming Routers!
              </h2>
              
              <p className="text-zinc-400 text-lg mb-10 max-w-md leading-relaxed font-medium">
                Max out your Fiber connection with our premium range of dual-band routers, ONUs, and networking gears. Perfect for 4K streaming and zero-ping gaming.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products" className="inline-flex items-center justify-center gap-2 bg-white text-zinc-950 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-zinc-200 transition-all hover:scale-105">
                  <ShoppingBag className="w-4 h-4" />
                  Shop Hardware
                </Link>
                <Link href="/products" className="inline-flex items-center justify-center gap-2 text-zinc-300 px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider hover:text-white transition-all group">
                  View All Specs
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Floating Product Cards */}
            <div className="relative h-[400px] lg:h-[500px] flex items-center justify-center lg:justify-end">
              
              {/* Card 1 */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -5 }}
                viewport={{ once: true }}
                animate={{
                  y: [0, 8, 0], 
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2,
                  y: { duration: 6, repeat: Infinity, ease: "easeInOut" } 
                }}
                className="absolute right-10 md:right-32 top-10 w-64 bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl opacity-60 scale-90"
              >
                <div className="w-full h-32 bg-zinc-900 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                  <div className="w-20 h-20 bg-zinc-800 rounded-lg blur-md absolute"></div>
                  
                  <Image 
                    src="/onu.png" 
                    alt="ONU Device" 
                    fill 
                    className="object-contain p-4 z-10"
                    onError={(e) => e.target.style.display='none'}
                  />
                  <span className="text-zinc-500 text-xs font-bold z-0 absolute">XPON ONU</span>
                </div>
                <h3 className="text-white font-bold text-lg">Dual-Band ONU</h3>
                <p className="text-rose-400 font-black mt-1">৳ ২,২০০</p>
              </motion.div>

              {/* Card 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                animate={{ 
                  y: [-12, 12, -12], 
                  x: [-3, 3, -3],   
                  rotateZ: [-1.5, 1.5, -1.5] 
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.1,
                  y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }, 
                  x: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 },
                  rotateZ: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 },
                }}
                className="absolute right-0 md:right-10 z-10 w-72 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-orange-500/30 rounded-3xl p-6 shadow-[0_20px_50px_rgba(249,115,22,0.15)] backdrop-blur-xl group"
              >
                <div className="absolute top-4 right-4 bg-orange-500 text-white text-[10px] font-black uppercase px-2 py-1 rounded-md z-20">
                  Hot
                </div>
                
                {/* Image Container */}
                <div className="w-full h-40 bg-zinc-950 rounded-2xl mb-5 relative flex items-center justify-center p-4 border border-zinc-800 shadow-inner overflow-hidden">
                 
                  <Image 
                    src="/tp_link.png" 
                    alt="TP-Link Archer AX53"
                    fill
                    className="object-contain p-3 z-10 drop-shadow-[0_10px_15px_rgba(249,115,22,0.2)] transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => e.target.style.display='none'}
                  />
                  
                </div>

                <div className="space-y-1">
                  <div className="flex gap-1 mb-2">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="w-3 h-3 text-orange-400 fill-orange-400" />
                    ))}
                  </div>
                  <h3 className="text-xl font-black text-white leading-tight">TP-Link Archer AX53</h3>
                  <p className="text-zinc-400 text-xs font-medium">AX3000 Dual Band Gigabit</p>
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-zinc-800">
                    <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">৳ ৫,৫০০</p>
                    <p className="text-sm font-medium text-zinc-500 line-through">৳ ৬,০০০</p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}