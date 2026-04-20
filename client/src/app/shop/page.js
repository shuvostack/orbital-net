'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Router, Video, Sun, Battery, Monitor, Lock, Cpu } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import Swal from 'sweetalert2';

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const { addToCart } = useCartStore();

  const handleAddToCart = (product) => {
    addToCart(product);
    
    // SweetAlert Toast Notification
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'success',
      title: 'কার্টে যোগ করা হয়েছে!',
      showConfirmButton: false,
      timer: 1500,
      background: '#18181b', 
      color: '#f97316'     
    });
  };

  // Dummy product data
  const products = [
    // Broadband & Networking
    { id: 1, category: 'Networking', name: 'TP-Link Archer C6 AC1200 Router', price: '৩,২০০', specs: 'Gigabit Ports, MU-MIMO', icon: <Router className="w-16 h-16 text-orange-400" /> },
    { id: 2, category: 'Networking', name: 'V-SOL XPON ONU (1 GE + 1 FE)', price: '১,১৫০', specs: 'Dual Mode (EPON/GPON)', icon: <Cpu className="w-16 h-16 text-orange-400" /> },
    { id: 3, category: 'Networking', name: 'Netis W1 300Mbps Router', price: '১,১০০', specs: 'High Gain Antennas', icon: <Router className="w-16 h-16 text-orange-400" /> },
    { id: 4, category: 'Networking', name: 'Fiber Drop Cable (100 Meter)', price: '৫০০', specs: 'Single Core Optic Fiber', icon: <Router className="w-16 h-16 text-orange-400" /> },

    // Security System
    { id: 5, category: 'Security', name: 'Dahua 2MP Full HD Dome Camera', price: '১,৪৫০', specs: 'Night Vision, 1080p', icon: <Video className="w-16 h-16 text-rose-400" /> },
    { id: 6, category: 'Security', name: 'Hikvision 4-Channel HD DVR', price: '৩,৫০০', specs: 'Supports up to 4 Cameras', icon: <Cpu className="w-16 h-16 text-rose-400" /> },
    { id: 7, category: 'Security', name: 'Xiaomi Smart Door Lock E10', price: '১৮,৫০০', specs: 'Fingerprint, Password, App', icon: <Lock className="w-16 h-16 text-rose-400" /> },
    { id: 8, category: 'Security', name: 'Dahua 22" FHD LED Monitor', price: '৮,৫০০', specs: 'Perfect for CCTV setup', icon: <Monitor className="w-16 h-16 text-rose-400" /> },

    // Solar & IPS 
    { id: 9, category: 'Solar', name: 'Luminous Eco Watt+ 1050 Inverter', price: '১২,৫০০', specs: 'Square Wave, 900VA', icon: <Battery className="w-16 h-16 text-yellow-400" /> },
    { id: 10, category: 'Solar', name: 'Eastern 150Ah Tubular Battery', price: '১৬,৫০০', specs: 'Heavy Duty, Long Life', icon: <Battery className="w-16 h-16 text-yellow-400" /> },
    { id: 11, category: 'Solar', name: 'Rahimafrooz 150W Solar Panel', price: '৬,০০০', specs: 'Monocrystalline', icon: <Sun className="w-16 h-16 text-yellow-400" /> },
    { id: 12, category: 'Solar', name: 'Smart Solar Charge Controller', price: '১,২০০', specs: 'PWM 30A 12V/24V Auto', icon: <Cpu className="w-16 h-16 text-yellow-400" /> },
  ];

  const categories = ['All', 'Networking', 'Security', 'Solar'];

  // category filter logic
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="bg-zinc-950 min-h-screen pb-24">
      
      {/* Hero Banner */}
      <section className="relative pt-30 pb-16 overflow-hidden border-b border-zinc-900">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 tracking-tight">
              স্মার্ট ইন্টারনেট, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">স্মার্ট ডিভাইস</span>
            </h1>
            <p className="text-lg text-zinc-400 font-medium max-w-2xl mx-auto leading-relaxed">
              রাউটার থেকে শুরু করে অত্যাধুনিক সিসি ক্যামেরা এবং সোলার সিস্টেম— আপনার প্রয়োজনীয় সবকিছু পাচ্ছেন অরবিটাল স্টোরে।
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter Buttons */}
      <section className="py-12 sticky top-[80px] z-30 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.3)]'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:border-zinc-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-5 hover:bg-zinc-800/80 transition-all duration-300 group flex flex-col h-full"
                >
                  {/* Product Image Placeholder */}
                  <div className="w-full h-48 bg-zinc-950 border border-zinc-800/50 rounded-2xl mb-5 flex items-center justify-center relative overflow-hidden group-hover:border-orange-500/30 transition-colors">
                    {/* Background glow matching the category */}
                    <div className={`absolute inset-0 opacity-20 blur-2xl transition-opacity group-hover:opacity-40
                      ${product.category === 'Networking' ? 'bg-orange-500' : 
                        product.category === 'Security' ? 'bg-rose-500' : 'bg-yellow-500'}
                    `}></div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="relative z-10"
                    >
                      {product.icon}
                    </motion.div>
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-col flex-grow">
                    <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                      {product.category}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-zinc-400 text-sm mb-4">
                      {product.specs}
                    </p>
                  </div>

                  {/* Price and CTA */}
                  <div className="mt-auto pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-zinc-500 text-sm">৳ </span>
                      <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">
                        {product.price}
                      </span>
                    </div>
                    
                    {/* Add to Cart Button */}
                    <button 
                      onClick={() => handleAddToCart(product)} 
                      className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-300 group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-rose-500 group-hover:text-white transition-all shadow-lg group-hover:shadow-orange-500/25"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

    </div>
  );
}