'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Zap, Crown, Flame } from 'lucide-react';

export default function Packages() {
  const [activeTab, setActiveTab] = useState('Premium');

  const categories = ['Standard', 'Premium', 'Extreme'];

  const packageData = {
    Standard: [
      { name: 'Brass+', speed: '20 Mbps', price: '525', popular: false },
      { name: 'Bronze+', speed: '30 Mbps', price: '630', popular: true },
      { name: 'Silver+', speed: '50 Mbps', price: '840', popular: false },
    ],
    Premium: [
      { name: 'Gold+', speed: '60 Mbps', price: '1050', popular: false },
      { name: 'Platinum+', speed: '80 Mbps', price: '1260', popular: true },
      { name: 'Diamond+', speed: '100 Mbps', price: '1575', popular: false },
    ],
    Extreme: [
      { name: 'Sapphire+', speed: '150 Mbps', price: '2100', popular: false },
      { name: 'Star+', speed: '200 Mbps', price: '3150', popular: true },
      { name: 'Sky+', speed: '300 Mbps', price: '4200', popular: false },
    ],
  };

  const commonFeatures = [
    'High speed BDIX and CDN connectivity',
    '4K Youtube & FB Stream',
    'Optical Fiber Connection',
    'IPv6 Public IP Only',
    '24/7 Priority Support',
    '1:8 Contention Ratio',
  ];

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">Best Plan</span>
          </h2>
          
          {/* Tabs Toggle */}
          <div className="inline-flex p-1.5 bg-zinc-900 border border-zinc-800 rounded-2xl mb-12">
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeTab === tab 
                  ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg' 
                  : 'text-zinc-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <AnimatePresence mode="wait">
            {packageData[activeTab].map((pkg, index) => (
              <motion.div
                key={`${activeTab}-${pkg.name}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`relative group p-8 rounded-[2.5rem] border transition-all duration-500 ${
                  pkg.popular 
                  ? 'bg-zinc-900 border-orange-500/50 scale-105 shadow-[0_20px_50px_rgba(249,115,22,0.15)] z-20' 
                  : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 z-10'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-zinc-400 font-bold uppercase tracking-widest text-xs mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black text-white">{pkg.speed.split(' ')[0]}</span>
                    <span className="text-xl font-bold text-zinc-500 uppercase">{pkg.speed.split(' ')[1]}</span>
                  </div>
                </div>

                <div className="mb-8 border-b border-zinc-800 pb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white">৳{pkg.price}</span>
                    <span className="text-zinc-500 font-medium">/ Monthly</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-10">
                  {commonFeatures.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-zinc-400 text-sm font-medium">
                      <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-orange-500" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-all duration-300 ${
                  pkg.popular 
                  ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-1' 
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
                }`}>
                  Connect Now
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}