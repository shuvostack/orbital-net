'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Film, Tv, ExternalLink, MonitorPlay, Smartphone, AlertCircle, PlayCircle } from 'lucide-react';

export default function MediaServerPage() {
  const [activeTab, setActiveTab] = useState('All');

  const mediaLinks = [
    // FTP Servers
    { id: 1, name: 'ICC FTP Server', url: 'http://10.16.100.244/dashboard.php?session=39c1927a4ea9141832e7d0e4783ae433ddba3be2a6faed02f3bf1b7db34ef75b', type: 'FTP Server', icon: <Server className="w-8 h-8" /> },
    { id: 2, name: 'Dhaka Flix', url: 'http://172.16.50.4/', type: 'FTP Server', icon: <Film className="w-8 h-8" /> },
    { id: 3, name: 'Circle FTP', url: 'https://circleftp.net/', type: 'FTP Server', icon: <Server className="w-8 h-8" /> },
    { id: 4, name: 'Dhaka Movie', url: 'http://dhakamovie.com/', type: 'FTP Server', icon: <Film className="w-8 h-8" /> },
    { id: 5, name: 'WOW FTP', url: 'http://172.27.27.84/', type: 'FTP Server', icon: <MonitorPlay className="w-8 h-8" /> },
    
    // Live TV
    { id: 6, name: 'Live TV 1', url: 'http://172.17.50.112/', type: 'Live TV', icon: <Tv className="w-8 h-8" /> },
    { id: 7, name: 'DIS TV 2', url: 'http://iptvidn.com/', type: 'Live TV', icon: <PlayCircle className="w-8 h-8" /> },
    { id: 8, name: 'Live TV 3', url: 'http://10.10.10.2/', type: 'Live TV', icon: <Tv className="w-8 h-8" /> },
    { id: 9, name: 'BDIX IP TV List', url: 'https://bdiptv.net/', type: 'Live TV', icon: <MonitorPlay className="w-8 h-8" /> },
    { id: 10, name: 'Live TV App', url: 'https://app.iptvidn.xyz/', type: 'Live TV', icon: <Smartphone className="w-8 h-8" /> },
    { id: 11, name: 'Live TV 4', url: 'https://iptv.prisma.net.bd/play', type: 'Live TV', icon: <Tv className="w-8 h-8" /> },
    { id: 12, name: 'Live TV 5', url: 'http://10.10.10.2/', type: 'Live TV', icon: <Tv className="w-8 h-8" /> },
  ];

  const tabs = ['All', 'FTP Server', 'Live TV'];

  const filteredLinks = activeTab === 'All' 
    ? mediaLinks 
    : mediaLinks.filter(link => link.type === activeTab);

  return (
    <div className="bg-zinc-950 min-h-screen pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="pt-25 pb-12 relative z-10 text-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 tracking-tight">
            আল্ট্রা ফাস্ট <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">এন্টারটেইনমেন্ট</span>
          </h1>
          <p className="text-lg text-zinc-400 font-medium max-w-2xl mx-auto leading-relaxed">
            কোনো বাফারিং ছাড়াই উপভোগ করুন হাজারো মুভি, ওয়েব সিরিজ এবং হাই ডেফিনেশন লাইভ টিভি।
          </p>
        </motion.div>
      </section>

      {/* Network Warning */}
      <section className="max-w-3xl mx-auto px-4 relative z-10 mb-10">
        <div className="flex items-start gap-4 bg-orange-500/10 border border-orange-500/20 p-4 rounded-2xl">
          <AlertCircle className="w-6 h-6 text-orange-500 shrink-0 mt-0.5" />
          <p className="text-sm text-orange-200/80 leading-relaxed">
            <strong className="text-orange-400">গুরুত্বপূর্ণ:</strong> এই সার্ভারগুলোর বেশিরভাগই BDIX বা লোকাল আইপি (Local IP) ভিত্তিক। তাই লিংকে প্রবেশ করার জন্য অবশ্যই অরবিটাল নেটের ইন্টারনেট সংযোগ ব্যবহার করতে হবে। অন্য নেটওয়ার্কে এগুলো কাজ নাও করতে পারে।
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex justify-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]' 
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:border-zinc-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Links Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredLinks.map((item) => (
              <motion.a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group block bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 hover:bg-zinc-800/60 hover:border-orange-500/30 transition-all duration-300 relative overflow-hidden" 
              >
                {/* Hover Glow */}
                <div className="absolute -inset-px bg-gradient-to-r from-orange-500 to-rose-500 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" /> 
                
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors shadow-inner
                    ${item.type === 'FTP Server' ? 'bg-orange-500/10 text-orange-400 group-hover:bg-orange-500 group-hover:text-white' : 'bg-rose-500/10 text-rose-400 group-hover:bg-rose-500 group-hover:text-white'}
                  `}>
                    {item.icon}
                  </div>
                  <div className="w-8 h-8 bg-zinc-950 rounded-full flex items-center justify-center text-zinc-500 group-hover:text-white group-hover:bg-zinc-800 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1.5">
                    {item.type}
                  </div>
    
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-rose-400 transition-all">
                    {item.name}
                  </h3>
                  <p className="text-zinc-500 text-xs font-mono truncate opacity-70">
                    {item.url.replace(/^https?:\/\//, '')}
                  </p>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

    </div>
  );
}