'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, MessageCircleQuestion } from 'lucide-react';
import Link from 'next/link';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      question: "নতুন কানেকশন নিতে কতক্ষণ সময় লাগে?",
      answer: "আমাদের ওয়েবসাইটে ফর্ম সাবমিট করার ২৪ ঘণ্টার মধ্যেই আমাদের টেকনিক্যাল টিম আপনার বাসায় গিয়ে ফাইবার অপটিক ক্যাবল টেনে লাইন সচল করে দিয়ে আসবে।"
    },
    {
      question: "রাউটার কি আপনারা দেন, নাকি আমার কিনতে হবে?",
      answer: "আপনি চাইলে আমাদের হার্ডওয়্যার শপ থেকে সাশ্রয়ী মূল্যে প্রিমিয়াম ডুয়াল-ব্যান্ড রাউটার কিনতে পারেন। এছাড়া আপনার নিজের কেনা রাউটার থাকলেও আমরা কনফিগার করে দেব।"
    },
    {
      question: "মাসের মাঝখানে কি প্যাকেজ পরিবর্তন করা যায়?",
      answer: "হ্যাঁ, অবশ্যই! আপনি যেকোনো সময় আমাদের কাস্টমার সাপোর্টে কল করে অথবা ক্লায়েন্ট পোর্টাল থেকে আপনার বর্তমান প্যাকেজটি আপগ্রেড বা ডাউনগ্রেড করতে পারবেন।"
    },
    {
      question: "ইন্টারনেট স্পিড বা সংযোগে সমস্যা হলে সাপোর্ট পাবো কীভাবে?",
      answer: "আমাদের এক্সপার্ট সাপোর্ট টিম ২৪/৭ প্রস্তুত। যেকোনো সমস্যায় সরাসরি ফোন কল, হোয়াটসঅ্যাপ অথবা আমাদের ওয়েবসাইটে কমপ্লেন টিকেট খোলার মাধ্যমে দ্রুত সাপোর্ট পাবেন।"
    },
    {
      question: "কোনো হিডেন চার্জ বা ইনস্টলেশন ফি আছে কি?",
      answer: "আমাদের কোনো হিডেন চার্জ নেই। তবে এরিয়া এবং প্যাকেজ ভেদে একটি সামান্য এককালীন ইনস্টলেশন ফি প্রযোজ্য হতে পারে, যা আপনাকে আগেই পরিষ্কারভাবে জানিয়ে দেওয়া হবে।"
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      
      {/* Background Subtle Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-24">
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                কোনো প্রশ্ন আছে? <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">উত্তরগুলো জেনে নিন</span>
              </h2>
              
              <p className="text-zinc-400 text-lg mb-10 leading-relaxed font-medium">
                নতুন ইন্টারনেট কানেকশন বা আমাদের সেবাসমূহ নিয়ে গ্রাহকদের মনে থাকা সবচেয়ে সাধারণ প্রশ্নগুলোর উত্তর এখানে দেওয়া হলো।
              </p>

              <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
                <h4 className="text-white font-bold mb-2">আরও কিছু জানার আছে?</h4>
                <p className="text-zinc-500 text-sm mb-6">আমাদের সাপোর্ট টিম আপনার যেকোনো প্রশ্নের উত্তর দিতে ২৪/৭ প্রস্তুত।</p>
                <Link href="/contact" className="inline-flex items-center justify-center w-full py-3.5 rounded-xl bg-zinc-100 text-zinc-950 font-black text-sm uppercase tracking-wider hover:bg-white transition-all hover:scale-[1.02] active:scale-95 shadow-md">
                  সরাসরি যোগাযোগ করুন
                </Link>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-7">
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isActive = activeIndex === index;

                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${
                      isActive 
                        ? 'bg-zinc-900/80 border-orange-500/30 shadow-[0_10px_30px_rgba(249,115,22,0.05)]' 
                        : 'bg-zinc-900/30 border-zinc-800/80 hover:bg-zinc-900/50 hover:border-zinc-700'
                    }`}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                    >
                      <h3 className={`font-bold pr-8 transition-colors duration-300 ${isActive ? 'text-orange-400' : 'text-zinc-200'}`}>
                        {faq.question}
                      </h3>
                      <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isActive ? 'bg-orange-500/20 text-orange-500' : 'bg-zinc-800 text-zinc-400'}`}>
                        {isActive ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-6 pt-2 text-zinc-400 leading-relaxed text-sm font-medium border-t border-zinc-800/50 mt-2">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}