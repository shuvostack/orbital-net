'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, CheckCircle2, AlertCircle, ArrowRight, Zap, RadioTower } from 'lucide-react';

export default function CoveragePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  // location
  const activeLocations = [
    { name: 'টাঙ্গাইল পৌরসভা', aliases: ['tangail pouroshova', 'pouroshova', 'porosova', 'municipality', 'পৌরসভা'] },
    { name: 'মীরের বেতকা', aliases: ['mirer betka', 'mirerbetka', 'mirer batka', 'মিরের বেতকা'] },
    { name: 'করের বেতকা', aliases: ['korer betka', 'korerbatka', 'korerbetka'] },
    { name: 'নগরজলফাই', aliases: ['nogorjolphy', 'nagar jolfai', 'nogor jolphy', 'নগর জলফাই'] },
    { name: 'বিসিক তারটিয়া', aliases: ['bisik', 'bscic', 'tarotia', 'tarutia', 'বিসিক', 'তারটিয়া'] },
    { name: 'সারুটিয়া', aliases: ['sarutia', 'sharutia', 'sarotia'] },
    { name: 'দরুন', aliases: ['dorun', 'darun'] },
    { name: 'আটপুকুর', aliases: ['atpukur', 'aat pukur', '8 pukur'] },
    { name: 'বোয়ালি', aliases: ['boali', 'boyali', 'bowali', 'বোয়ালী'] },
    { name: 'গোডাউন বিরিজ', aliases: ['godown bridge', 'godawn', 'biriz', 'brij', 'গোডাউন ব্রিজ'] },
    { name: 'পুরাতন বাস স্ট্যান্ড', aliases: ['old bus stand', 'puraton bus stand', 'puran stand', 'old bustand', 'পুরান বাস স্ট্যান্ড', 'পুরান স্ট্যান্ড'] },
    { name: 'তুহিন রোড', aliases: ['tuhin road', 'tuhin rod'] },
    { name: 'ভিক্টোরিয়া রোড', aliases: ['victoria road', 'viktoria', 'ভিক্টোরিয়া রোড'] },
    { name: 'পাওয়ার হাউস', aliases: ['power house', 'powerhouse', 'paoar haus', 'পাওয়ার হাউজ'] },
    { name: 'জেলা সদর রোড', aliases: ['zilla sadar road', 'jela sodor', 'sadar road', 'সদর রোড'] },
    { name: 'ভাসানী হল', aliases: ['bhashani hall', 'vasani hall', 'bhasani hol'] },
    { name: 'বিন্দুবাসিনী বালক বিদ্যালয়', aliases: ['bindubashini boys', 'bb boys', 'bindubasini balok', 'বিন্দুবাসিনী বালক', 'বিন্দু বাসিনী'] },
    { name: 'বিন্দুবাসিনী বালিকা বিদ্যালয়', aliases: ['bindubashini girls', 'bb girls', 'bindubasini balika', 'বিন্দুবাসিনী বালিকা'] },
    { name: 'পুরাতন কোর্ট মসজিদ', aliases: ['old court mosque', 'puraton court', 'court mosjid', 'কোর্ট মসজিদ'] },
    { name: 'টাঙ্গাইল পৌর উদ্যান', aliases: ['pouro udyan', 'pouro uddan', 'porosova park', 'পৌর পার্ক'] },
    { name: 'টাঙ্গাইল স্টেডিয়াম', aliases: ['tangail stadium', 'stadum', 'stediam', 'স্টेडियम'] },
    { name: 'কুমুদিনী সরকারি কলেজ', aliases: ['kumudini college', 'kumudini', 'কুমুদিনী কলেজ'] },
    { name: 'শেখ হাসিনা মেডিকেল কলেজ', aliases: ['sheikh hasina medical', 'shmc', 'medical college', 'medikal', 'মেডিকেল কলেজ'] },
    { name: 'পার্ক বাজার', aliases: ['park bazar', 'perk bazar'] },
    { name: 'ক্যাপসুল মার্কেট', aliases: ['capsule market', 'capsul market', 'capsol'] },
    { name: 'নতুন বাসস্ট্যান্ড', aliases: ['new bus stand', 'notun stand', 'natun busstand', 'নতুন স্ট্যান্ড'] },
    { name: 'বটতলা বাজার', aliases: ['bottola bazar', 'bot tola'] },
    { name: 'সাবালিয়া পাঞ্জাপাড়া রোড', aliases: ['sabaliya', 'sabalia', 'shabalia', 'panjapara', 'সাবালিয়া', 'পাঞ্জাপাড়া'] },
    { name: 'ময়মনসিংহ রোড', aliases: ['mymensingh road', 'moimonsingha', 'mymenshing', 'মোমেনশাহী রোড'] },
    { name: 'পুলিশ লাইন রোড', aliases: ['police line', 'pulish line', 'পুলিশ লাইনস'] },
    { name: 'বটতলা রোড', aliases: ['bottola road', 'bot tola road'] },
    { name: 'রেলস্টেশন রোড', aliases: ['railway station', 'rail station', 'rel station', 'istishon', 'রেল স্টেশন'] },
    { name: 'আশিকপুর চক্ষু হাসপাতাল', aliases: ['ashekpur', 'asekpur', 'eye hospital', 'chokhu hashpatal', 'আশেকপুর', 'চক্ষু হাসপাতাল'] },
    { name: 'ডিসি লেক', aliases: ['dc lake', 'disi lake', 'd c lake'] },
    { name: 'ডিসি সার্কিট হাউজ', aliases: ['circuit house', 'dc circuit', 'sarkit haus', 'সার্কিট হাউজ'] }
  ];

  // search logic
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.toLowerCase().replace(/\s+/g, ' ').trim();

    const isFound = activeLocations.some(loc => {
      if (loc.name.toLowerCase().includes(query)) return true;
      
      return loc.aliases.some(alias => 
        alias.includes(query) || query.includes(alias)
      );
    });

    setSearchResult(isFound ? 'found' : 'not_found');
  };

  return (
    <div className="bg-zinc-950 min-h-screen pb-24">
      
      {/* Smart Checker Section */}
      <section className="relative pt-30 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 tracking-tight">
              আপনার এলাকায় কি <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">অরবিটাল নেট</span> আছে?
            </h1>
            <p className="text-lg text-zinc-400 font-medium leading-relaxed mb-12">
              টাঙ্গাইলের সেরা ফাইবার অপটিক নেটওয়ার্ক দ্রুত ছড়িয়ে পড়ছে। নিচে আপনার এলাকার নাম লিখে চেক করুন আমাদের সার্ভিস সেখানে আছে কিনা।
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-8">
              <div className="relative flex items-center">
                <MapPin className="absolute left-6 w-6 h-6 text-zinc-500" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if(searchResult) setSearchResult(null);
                  }}
                  placeholder="এলাকার নাম লিখুন (যেমন: সাবালিয়া বা Sabaliya)..."
                  className="w-full bg-zinc-900/80 border border-zinc-700 text-white px-16 py-5 rounded-2xl text-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all shadow-xl placeholder:text-zinc-500"
                />
                <button 
                  type="submit"
                  className="absolute right-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  <span className="hidden sm:block">চেক করুন</span>
                </button>
              </div>
            </form>

            {/* Dynamic Search Results */}
            <AnimatePresence>
              {searchResult === 'found' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="max-w-2xl mx-auto bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-left flex flex-col sm:flex-row items-center gap-6"
                >
                  <div className="w-16 h-16 shrink-0 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-emerald-400 mb-1">দুর্দান্ত খবর!</h3>
                    <p className="text-zinc-300 text-sm leading-relaxed mb-3">
                      আপনার এলাকা <strong className="text-white">"{searchQuery}"</strong>-এ আমাদের সুপারফাস্ট ফাইবার অপটিক কভারেজ রয়েছে।
                    </p>
                    <Link href="/packages" className="inline-flex items-center gap-2 text-emerald-400 font-bold text-sm hover:text-emerald-300 transition-colors group">
                      প্যাকেজগুলো দেখুন 
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              )}

              {searchResult === 'not_found' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="max-w-2xl mx-auto bg-orange-500/10 border border-orange-500/30 rounded-2xl p-6 text-left flex flex-col sm:flex-row items-center gap-6"
                >
                  <div className="w-16 h-16 shrink-0 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-orange-400 mb-1">আমরা আসছি!</h3>
                    <p className="text-zinc-300 text-sm leading-relaxed mb-3">
                      দুঃখিত, এই মুহূর্তে <strong className="text-white">"{searchQuery}"</strong>-এ আমাদের কভারেজ নেই। তবে আমাদের নেটওয়ার্ক সম্প্রসারণের কাজ চলছে।
                    </p>
                    <Link href="/contact" className="inline-flex items-center gap-2 text-orange-400 font-bold text-sm hover:text-orange-300 transition-colors group">
                      কানেকশন রিকোয়েস্ট দিয়ে রাখুন 
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </div>
      </section>

      {/* Interactive Map Visual */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-[400px] md:h-[500px] w-full bg-zinc-900 border border-zinc-800 rounded-[3rem] overflow-hidden shadow-2xl group">
            
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10"></div>
            <div className="absolute inset-0 bg-orange-900/10 z-10 group-hover:bg-transparent transition-colors duration-700"></div>
            
            <Image 
              src="/city-map.png"
              alt="Tangail Coverage Map"
              fill
              className="object-cover opacity-50 grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700 scale-105"
            />

            <div className="absolute inset-0 z-20">
              <div className="absolute top-[30%] left-[40%] animate-[bounce_4s_infinite]">
                <MapPin className="w-8 h-8 text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)]" />
              </div>
              <div className="absolute top-[45%] left-[55%] animate-[bounce_5s_infinite_0.5s]">
                <MapPin className="w-6 h-6 text-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.8)]" />
              </div>
              <div className="absolute top-[60%] left-[35%] animate-[bounce_6s_infinite_1s]">
                <MapPin className="w-10 h-10 text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)]" />
              </div>
              <div className="absolute top-[25%] left-[65%] animate-[bounce_4.5s_infinite_0.2s]">
                <MapPin className="w-7 h-7 text-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.8)]" />
              </div>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-orange-500/20 rounded-full animate-ping opacity-70"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full shadow-[0_0_20px_rgba(249,115,22,1)]"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Active Zones Grid */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-4 flex items-center justify-center gap-3">
              আমাদের বর্তমান এরিয়াসমূহ
            </h2>
            <p className="text-zinc-500 font-medium">নিচের এলাকাগুলোতে আমাদের ফাইবার অপটিক নেটওয়ার্ক শতভাগ সচল আছে।</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {activeLocations.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }} 
                className="bg-zinc-900/50 border border-zinc-800/80 p-4 rounded-2xl flex items-center gap-3 hover:bg-zinc-800 hover:border-orange-500/50 transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-orange-500" />
                </div>
                <span className="text-zinc-300 font-bold text-sm md:text-base group-hover:text-white transition-colors">
                  {location.name} 
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}