'use client';

import { motion } from 'framer-motion';
import { Home, ShieldCheck, Briefcase, Server, Network, Camera, Database, Globe, Sun } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Home className="w-8 h-8 text-orange-500" />,
      title: 'হোম ব্রডব্যান্ড ইন্টারনেট',
      description: 'অরবিটাল নেট টাঙ্গাইল জুড়ে সবচেয়ে দ্রুতগতির ব্রডব্যান্ড ইন্টারনেট প্রদান করছে, যা গেমার এবং সাধারণ ব্যবহারকারী উভয়ের জন্যই শতভাগ নির্ভরযোগ্য।',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-rose-500" />,
      title: 'নেটওয়ার্ক সিকিউরিটি',
      description: 'ভিপিএন (VPN), অ্যান্টিভাইরাস এবং সিসিটিভি আইপি সার্ভিল্যান্স সলিউশনের মাধ্যমে আমরা আপনার সর্বোচ্চ এন্ড-টু-এন্ড নিরাপত্তা নিশ্চিত করি।',
    },
    {
      icon: <Briefcase className="w-8 h-8 text-orange-400" />,
      title: 'কর্পোরেট/এসএমই ইন্টারনেট',
      description: 'কর্পোরেট এবং SME গ্রাহকদের নেটওয়ার্ক স্থিতিশীলতা নিশ্চিত করতে ২৪/৭ ডেডিকেটেড সাপোর্ট সহ বিশেষ ইন্টারনেট এবং নেটওয়ার্ক সলিউশন।',
    },
    {
      icon: <Server className="w-8 h-8 text-rose-400" />,
      title: 'ডেডিকেটেড সার্ভার হোস্টিং',
      description: 'আপনার প্রাত্যহিক প্রাতিষ্ঠানিক চাহিদা মেটাতে উন্নত নেটওয়ার্ক রাউটিং এবং কনফিগারেশন সহ একটি ডেডিকেটেড সার্ভার হোস্টিং গ্রহণ করুন।',
    },
    {
      icon: <Network className="w-8 h-8 text-orange-500" />,
      title: 'নেটওয়ার্ক সলিউশনস',
      description: 'আমরা ল্যান (LAN) এবং ওয়্যান (WAN) উভয় নেটওয়ার্ক সলিউশন প্রদান করি। আমাদের দক্ষ ইঞ্জিনিয়ারদের সহায়তায় পান সবচেয়ে কার্যকর সমাধান।',
    },
    {
      icon: <Camera className="w-8 h-8 text-rose-500" />,
      title: 'সিসিটিভি সিস্টেম সলিউশনস',
      description: 'আবাসিক, বাণিজ্যিক এবং শিল্পপ্রতিষ্ঠানের নিরাপত্তার জন্য অরবিটাল নেট প্রদান করে অত্যাধুনিক সিসিটিভি এবং আইপি সার্ভিল্যান্স সলিউশন।',
    },
    {
      icon: <Database className="w-8 h-8 text-orange-400" />,
      title: 'ডেটা কানেক্টিভিটি',
      description: 'সর্বশেষ প্রযুক্তির সাথে আমাদের সিস্টেমকে আপডেট রেখে, আমরা ক্লায়েন্টদের জন্য সবচেয়ে দ্রুত এবং নিরাপদ ডেটা কানেক্টিভিটি নিশ্চিত করি।',
    },
    {
      icon: <Globe className="w-8 h-8 text-rose-400" />,
      title: 'ডেডিকেটেড ইন্টারনেট',
      description: '৯৯.৯% আপটাইম নিশ্চিত করতে মাল্টিপল আপস্ট্রিম সাপোর্ট এবং একাধিক ব্যাকআপ লিংক সহ ডেডিকেটেড হাই-স্পিড ইন্টারনেট কানেক্টিভিটি।',
    },
    {
      icon: <Sun className="w-8 h-8 text-orange-500" />,
      title: 'সোলার সিস্টেম সলিউশনস',
      description: 'নিরবচ্ছিন্ন ইন্টারনেট কানেক্টিভিটি এবং আবাসিক ও বাণিজ্যিক বিদ্যুতের চাহিদা মেটাতে সম্পূর্ণ পরিবেশবান্ধব সোলার পাওয়ার সলিউশন।',
    },
  ];

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, 
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      
      {/* Background Subtle Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-3 block"
          >
            আমাদের সার্বিক সেবাসমূহ
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tight"
          >
            সর্বোচ্চ পারফরম্যান্সের জন্য <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">আমরাই সেরা</span>
          </motion.h2>
        </div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className="group relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 p-8 rounded-3xl hover:bg-zinc-800/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(249,115,22,0.1)] overflow-hidden"
            >
              {/* Hover Top Glow Effect */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-rose-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              
              <div className="bg-zinc-950 border border-zinc-800 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 group-hover:border-orange-500/30 transition-all duration-300">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-zinc-100 mb-3">{feature.title}</h3>
              <p className="text-zinc-400 leading-relaxed text-sm font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}