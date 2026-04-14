'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Partners() {
  
  const partners = [
    { name: 'Grameenphone' },
    { name: 'Banglalink' },
    { name: 'Citycell' },
    { name: 'Juniper Networks' },
    { name: 'Cisco' },
    { name: 'BTCL' },
    { name: 'MikroTik' },
    { name: 'BDIX' },
    { name: 'TP-Link' },
    { name: 'BD Hub Limited' },
  ];

  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-16 bg-zinc-950 relative overflow-hidden border-y border-zinc-800/50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center relative z-10">
        <p className="text-zinc-500 font-bold text-sm uppercase tracking-widest">
          Trusted by Industry Leaders & Technology Partners
        </p>
      </div>

      {/* Marquee Container with Fade Edges */}
      <div 
        className="relative flex overflow-hidden group"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}
      >
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            ease: 'linear',
            duration: 40, 
            repeat: Infinity,
          }}
          className="flex whitespace-nowrap items-center flex-nowrap"
        >
          {duplicatedPartners.map((partner, index) => (
            <div 
              key={index} 
              className="mx-8 md:mx-16 flex items-center justify-center shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            >
              
              <div className="text-2xl md:text-3xl font-black text-zinc-300 uppercase tracking-tighter">
                {partner.name}
              </div>
              
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}