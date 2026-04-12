'use client';

import { motion } from 'framer-motion';
import { Cable, Zap, Gamepad2, Headset } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Cable className="w-8 h-8 text-orange-500" />,
      title: 'Pure FTTH Connection',
      description: '১০০% অপটিক্যাল ফাইবার সরাসরি আপনার বাসা পর্যন্ত। রোদ-বৃষ্টিতেও ইন্টারনেট থাকবে নিরবচ্ছিন্ন।',
    },
    {
      icon: <Zap className="w-8 h-8 text-rose-500" />,
      title: 'Superfast BDIX & FTP',
      description: 'বাফারিং ছাড়া YouTube, Facebook এবং মুভি সার্ভার উপভোগ করার জন্য আনলিমিটেড স্পিড।',
    },
    {
      icon: <Gamepad2 className="w-8 h-8 text-orange-400" />,
      title: 'Real Public IP',
      description: 'জিরো ল্যাগ এবং ওপেন NAT টাইপ। ভ্যালোরেন্ট বা পাবজি খেলার জন্য একদম পারফেক্ট রাউটিং।',
    },
    {
      icon: <Headset className="w-8 h-8 text-rose-400" />,
      title: '24/7 Expert Support',
      description: 'টাঙ্গাইলের সেরা সাপোর্ট টিম। যেকোনো সমস্যায় সরাসরি কল করুন, সমাধান হবে দ্রুত।',
    },
  ];

  // Framer Motion Variants for Staggered Animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, 
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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
            Why Choose Orbital Net
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tight"
          >
            Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">Extreme Performance</span>
          </motion.h2>
        </div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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