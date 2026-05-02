'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Target, Zap, ShieldCheck, Users, Activity, ChevronRight, CheckCircle2, FileText, MapPin, Building2, UserCircle } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { value: '৫+', label: 'বছরের অভিজ্ঞতা' },
    { value: '১০k+', label: 'সন্তুষ্ট গ্রাহক' },
    { value: '৩০০+', label: 'কি.মি. ফাইবার কভারেজ' },
    { value: '৯৯.৯%', label: 'নেটওয়ার্ক আপটাইম' },
  ];

  const values = [
    {
      icon: <Zap className="w-6 h-6 text-orange-500" />,
      title: 'এক্সট্রিম স্পিড',
      desc: 'আমাদের "Fiber Blaze" টেকনোলজি নিশ্চিত করে জিরো বাফারিং এবং আনলিমিটেড ব্যান্ডউইথ।'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      title: 'সর্বোচ্চ নিরাপত্তা',
      desc: 'ব্যাংক-গ্রেড এনক্রিপশন এবং সিকিউর রাউটিংয়ের মাধ্যমে আপনার ডেটা থাকে সম্পূর্ণ সুরক্ষিত।'
    },
    {
      icon: <Users className="w-6 h-6 text-rose-500" />,
      title: 'গ্রাহক অগ্রাধিকার',
      desc: '২৪/৭ এক্সপার্ট সাপোর্ট টিম সবসময় প্রস্তুত আপনার যেকোনো সমস্যার দ্রুত সমাধান দিতে।'
    }
  ];

  return (
    <div className="bg-zinc-950 min-h-screen">
      
      {/* Banner Section */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-zinc-900">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 tracking-tight">
              টাঙ্গাইলের ডিজিটাল <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">কানেক্টিভিটির রূপকার</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed">
              অরবিটাল নেট শুধু একটি ইন্টারনেট সংযোগ নয়, এটি একটি প্রতিশ্রুতি। আমরা টাঙ্গাইলবাসীর জন্য নিয়ে এসেছি ওয়ার্ল্ড-ক্লাস ফাইবার অপটিক নেটওয়ার্ক।
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">আমাদের পথচলা</h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                কয়েক বছর আগে যখন টাঙ্গাইলের মানুষ ধীরগতির ইন্টারনেট এবং বারবার লাইন কেটে যাওয়ার সমস্যায় ভুগছিল, তখন আমরা সিদ্ধান্ত নিই একটি সত্যিকার প্রিমিয়াম নেটওয়ার্ক গড়ে তোলার। সেই লক্ষ্য থেকেই জন্ম নেয় <strong className="text-white">Orbital Net</strong>।
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                আজ আমরা গর্ব করে বলতে পারি, আমাদের ১০০% পিওর FTTH (Fiber To The Home) কানেকশন গেমার, ফ্রিল্যান্সার এবং কর্পোরেট অফিসগুলোর প্রথম পছন্দ।
              </p>
              
              <ul className="space-y-4 mb-10">
                {['Direct BDIX Connectivity', '1:1 Dedicated Bandwidth', 'No Data Caps or Throttling'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-300 font-bold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] rounded-3xl bg-zinc-900/50 border border-zinc-800 overflow-hidden flex items-center justify-center group"
            >
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]"></div>
              
              {/* image */}
              <div className="relative z-10 w-full h-full flex items-center justify-center p-12">
                <Image 
                  src="/internet.png" 
                  alt="Fiber Blaze Data Core Bundle"
                  width={800} 
                  height={500}
                  className="object-contain drop-shadow-[0_0_30px_rgba(249,115,22,0.2)]" 
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Trust Milestones */}
      <section className="py-16 bg-zinc-900/30 border-y border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-zinc-400 text-sm font-bold uppercase tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">আমাদের মূল আদর্শ</h2>
            <p className="text-zinc-500 text-lg max-w-2xl mx-auto">আমরা শুধুমাত্র ব্যবসা করি না, আমরা একটি বিশ্বস্ত ডিজিটাল কমিউনিটি গড়ে তুলতে কাজ করি।</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl hover:bg-zinc-800/60 transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-zinc-400 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/*  Trade License Section */}
      <section className="py-24 bg-zinc-900/20 border-t border-zinc-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-zinc-950 border border-zinc-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-[100px] rounded-full pointer-events-none" />
              
              <div className="flex flex-col md:flex-row items-center gap-6 mb-10 pb-10 border-b border-zinc-800/80">
                <div className="w-16 h-16 bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 rounded-2xl flex items-center justify-center shadow-inner shrink-0">
                  <FileText className="w-8 h-8 text-orange-500" />
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Business Compliance</h2>
                  <p className="text-zinc-500 text-sm font-medium">Official Trade License Information</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Info Block 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 mt-1">
                    <Building2 className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Company Name</p>
                    <p className="text-lg font-bold text-white">Orbital Net</p>
                    <p className="text-sm text-zinc-400 mt-1">Category: Internet Service Provider</p>
                  </div>
                </div>

                {/* Info Block 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 mt-1">
                    <FileText className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Trade License No</p>
                    <p className="text-lg font-bold text-orange-400 font-mono tracking-wider">15-092-5054</p>
                    <p className="text-sm text-zinc-400 mt-1">Issued by Tangail Pourashava</p>
                  </div>
                </div>

                {/* Info Block 3 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 mt-1">
                    <UserCircle className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Owner Name</p>
                    <p className="text-lg font-bold text-white">Md. Maruful Islam Siddique</p>
                  </div>
                </div>

                {/* Info Block 4 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 mt-1">
                    <MapPin className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Registered Address</p>
                    <p className="text-base font-medium text-white leading-relaxed">
                      Shamsur Rahman Khan Pouro Super Market, Tangail
                    </p>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-900/10 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-black text-white mb-6">
            এক্সট্রিম পারফরম্যান্সের জন্য প্রস্তুত?
          </h2>
          <p className="text-zinc-400 text-lg mb-10">
            আজই আমাদের প্যাকেজগুলো ঘুরে দেখুন এবং আপনার ডিজিটাল লাইফস্টাইলকে দিন নতুন মাত্রা।
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/packages" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-wider hover:scale-105 transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)]">
              প্যাকেজসমূহ দেখুন
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-900 border border-zinc-700 text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-wider hover:bg-zinc-800 transition-all">
              যোগাযোগ করুন
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}