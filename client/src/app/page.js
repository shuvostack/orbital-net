"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Zap, ShieldCheck, Activity } from "lucide-react";
import Features from "@/components/Features";
import Packages from '@/components/Packages';
import ShopTeaser from '@/components/ShopTeaser';
import Partners from "@/components/Partners";
import PayBill from '@/components/PayBill';
import CoverageTeaser from "@/components/CoverageTeaser";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <div>
    {/* hero section */}
      <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden bg-zinc-950 mb-8">
        {/* Dynamic Background Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[150px] pointer-events-none opacity-50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Column: Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Live Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-bold text-xs uppercase tracking-widest mt-5 mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                #1 High-Speed Network in Tangail
              </div>

              {/* Main Title */}
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white leading-[1.05]">
                Experience the <br />
                <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-rose-600 bg-clip-text text-transparent">
                  Blazing Speed
                </span>
              </h1>

              <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-lg leading-relaxed font-medium">
                Experience zero-lag gaming, buffer-free 4K streaming, and
                ultra-fast BDIX speeds with our premium fiber optic connection.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-5 mb-16">
                <Link
                  href="/packages"
                  className="group relative flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-rose-600 text-white px-10 py-4 rounded-2xl font-black text-lg shadow-[0_10px_30px_rgba(249,115,22,0.3)] hover:shadow-[0_15px_40px_rgba(249,115,22,0.4)] transition-all hover:-translate-y-1"
                >
                  Explore Packages
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/products"
                  className="flex items-center justify-center gap-2 px-10 py-4 rounded-2xl font-bold text-lg text-zinc-300 border border-zinc-800 hover:bg-zinc-900 hover:text-white transition-all"
                >
                  Hardware Shop
                </Link>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-3 gap-8 border-t border-zinc-800/60 pt-10">
                <div className="space-y-1">
                  <Activity className="w-6 h-6 text-orange-500 mb-2" />
                  <p className="text-3xl font-black text-white">99.9%</p>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    Uptime Guarantee
                  </p>
                </div>
                <div className="space-y-1">
                  <Zap className="w-6 h-6 text-rose-500 mb-2" />
                  <p className="text-3xl font-black text-white">1ms</p>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    Gaming Latency
                  </p>
                </div>
                <div className="space-y-1">
                  <ShieldCheck className="w-6 h-6 text-emerald-500 mb-2" />
                  <p className="text-3xl font-black text-white">24/7</p>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    Priority Support
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: The 3D Floating Router */}
            <div className="relative flex items-center justify-center lg:justify-end">
              <motion.div
                animate={{ y: [0, -25, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-20 w-full max-w-[500px]"
              >
                {/* Router Image */}
                <div className="relative drop-shadow-[0_35px_50px_rgba(249,115,22,0.2)]">
                  <img
                    src="/router_img_1.png"
                    alt="Futuristic 3D Router"
                    className="w-full h-auto object-contain select-none"
                  />

                  {/* Floating Speed Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="absolute -top-4 -right-4 md:top-10 md:right-10 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-4 shadow-2xl"
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-bold text-orange-400 uppercase tracking-tighter">
                        BDIX Tested
                      </span>
                      <span className="text-2xl font-black text-white">
                        1 Gbps
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Background Glow behind router */}
              <div className="absolute w-[80%] h-[80%] bg-orange-500/20 rounded-full blur-[100px] -z-10" />
            </div>
          </div>
        </div>
      </div>

    {/* why choose us section */}
      <div>
        <Features></Features>
      </div>

    {/* packages section */}
      <div>
        <Packages></Packages>
      </div>

    {/* shop teaser section */}
      <div>
        <ShopTeaser></ShopTeaser>
      </div>


    {/* Pay bill section */}
      <div>
        <PayBill></PayBill>
      </div>

    {/* collaboration section */}
      <div>
        <Partners></Partners>
      </div>

    {/* coverage teaser section */}
      <div>
        <CoverageTeaser></CoverageTeaser>
      </div>

    {/* FAQ section */}
      <div>
        <FAQ></FAQ>
      </div>
    </div>
  );
}
