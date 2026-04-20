'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageSquare, Clock, HeadphonesIcon } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'new_connection',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // পরবর্তীতে এখানে ব্যাকএন্ডের API বসানো হবে
    alert('আপনার মেসেজটি সফলভাবে পাঠানো হয়েছে! আমাদের টিম দ্রুত আপনার সাথে যোগাযোগ করবে।');
    setFormData({ name: '', phone: '', service: 'new_connection', message: '' });
  };

  const contactCards = [
    {
      icon: <HeadphonesIcon className="w-6 h-6 text-orange-500" />,
      title: 'হেল্পলাইন নাম্বার',
      details: '+880 1717171081',
      subText: '২৪/৭ সাপোর্ট'
    },
    {
      icon: <Mail className="w-6 h-6 text-rose-500" />,
      title: 'ইমেইল অ্যাড্রেস',
      details: 'info.orbitalnet@gmail.com',
      subText: 'যেকোনো জিজ্ঞাসায়'
    },
    {
      icon: <MapPin className="w-6 h-6 text-emerald-500" />,
      title: 'অফিসের ঠিকানা',
      details: 'আশেকপুর, টাঙ্গাইল সদর',
      subText: 'টাঙ্গাইল, বাংলাদেশ'
    }
  ];

  return (
    <div className="bg-zinc-950 min-h-screen pb-24">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-rose-600/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 tracking-tight">
              যেকোনো প্রয়োজনে <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">আমরা আছি ২৪/৭</span>
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed">
              নতুন কানেকশন, বিল পেমেন্ট বা টেকনিক্যাল সাপোর্ট— আপনার যেকোনো প্রশ্নের উত্তর দিতে আমাদের এক্সপার্ট টিম সবসময় প্রস্তুত।
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl hover:bg-zinc-800/80 transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  {card.icon}
                </div>
                <h3 className="text-zinc-400 font-bold text-sm uppercase tracking-widest mb-2">{card.title}</h3>
                <p className="text-2xl font-black text-white mb-2">{card.details}</p>
                <p className="text-zinc-500 text-sm font-medium">{card.subText}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form & Map */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-[3rem] overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              
              {/* Contact Form */}
              <div className="p-8 md:p-12 lg:p-16 relative">
                <h3 className="text-3xl font-black text-white mb-2">মেসেজ পাঠান</h3>
                <p className="text-zinc-400 mb-8 font-medium">নিচের ফর্মটি পূরণ করুন, আমরা খুব দ্রুত আপনার সাথে যোগাযোগ করবো।</p>
                
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-zinc-400 text-sm font-bold ml-1">আপনার নাম <span className="text-rose-500">*</span></label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                        placeholder="যেমন: মেহেদী হাসান"
                      />
                    </div>
                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-zinc-400 text-sm font-bold ml-1">ফোন নাম্বার <span className="text-rose-500">*</span></label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                        placeholder="017XXXXXXXX"
                      />
                    </div>
                  </div>

                  {/* Service Type (Dropdown) */}
                  <div className="space-y-2">
                    <label className="text-zinc-400 text-sm font-bold ml-1">কী ধরনের সহায়তা প্রয়োজন? <span className="text-rose-500">*</span></label>
                    <select 
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors appearance-none"
                    >
                      <option value="new_connection">নতুন কানেকশন নিতে চাই</option>
                      <option value="technical_support">ইন্টারনেটে সমস্যা (টেকনিক্যাল সাপোর্ট)</option>
                      <option value="billing">বিলিং বা পেমেন্ট সংক্রান্ত</option>
                      <option value="package_change">প্যাকেজ পরিবর্তন</option>
                      <option value="others">অন্যান্য</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-zinc-400 text-sm font-bold ml-1">বিস্তারিত লিখুন</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors resize-none"
                      placeholder="আপনার সমস্যা বা চাহিদার কথা বিস্তারিতভাবে লিখুন..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all shadow-[0_10px_20px_rgba(249,115,22,0.2)]"
                  >
                    মেসেজ সেন্ড করুন
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>

              {/* Map & Office Hours */}
              <div className="bg-zinc-950 relative overflow-hidden min-h-[400px] lg:min-h-full flex flex-col">
                
                {/* Office Hours Overlay Box */}
                <div className="absolute top-6 right-6 z-20 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-orange-400" />
                    <span className="text-white font-bold text-sm">অফিস সময়সূচী</span>
                  </div>
                  <div className="text-zinc-400 text-xs font-medium space-y-1">
                    <p>রবিবার - বৃহস্পতিবার: সকাল ৯টা - রাত ৮টা</p>
                    <p>শুক্রবার - শনিবার: সকাল ১০টা - সন্ধ্যা ৬টা</p>
                    <p className="text-emerald-400 mt-2">সাপোর্ট হটলাইন: ২৪/৭ খোলা</p>
                  </div>
                </div>

                {/* Google Maps Embed */}
                <div className="w-full h-full flex-grow relative">
                  <iframe 
                    src="https://maps.google.com/maps?q=24.248841,89.933166&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 filter grayscale contrast-125 opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-700"
                  ></iframe>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}