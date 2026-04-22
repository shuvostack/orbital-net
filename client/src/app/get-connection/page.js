'use client';

import { useState, useEffect } from 'react'; 
import { motion } from 'framer-motion';
import { User, Phone, MapPin, Package, Send, Zap, MessageCircle } from 'lucide-react';
import Swal from 'sweetalert2';

export default function GetConnectionPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    area: '',
    address: '',
    selectedPackage: 'Bronze+ (30 Mbps - 630 Tk)', 
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const packages = [
    'Brass+ (20 Mbps - 525 Tk)',
    'Bronze+ (30 Mbps - 630 Tk)',
    'Silver+ (50 Mbps - 840 Tk)',
    'Gold+ (60 Mbps - 1050 Tk)',
    'Platinum+ (80 Mbps - 1260 Tk)',
    'Diamond+ (100 Mbps - 1575 Tk)',
    'Sapphire+ (150 Mbps - 2100 Tk)',
    'Star+ (200 Mbps - 3150 Tk)',
    'Sky+ (300 Mbps - 4200 Tk)'
  ];

  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pkgQuery = params.get('package');
    
    if (pkgQuery) {
      const matchedPackage = packages.find(p => p.startsWith(pkgQuery));
      if (matchedPackage) {
        setFormData(prev => ({ ...prev, selectedPackage: matchedPackage }));
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const adminWhatsAppNumber = '8801717171081'; 

    const message = `নতুন কানেকশন রিকোয়েস্ট (Orbital Net) \n\n*নাম:* ${formData.name}\n*ফোন:* ${formData.phone}\n*এলাকা:* ${formData.area}\n*বিস্তারিত ঠিকানা:* ${formData.address}\n*পছন্দের প্যাকেজ:* ${formData.selectedPackage}\n\nঅনুগ্রহ করে আমার সাথে দ্রুত যোগাযোগ করুন।`;

    const whatsappUrl = `https://wa.me/${adminWhatsAppNumber}?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      window.open(whatsappUrl, '_blank');

      Swal.fire({
        title: 'রিকোয়েস্ট পাঠানো হয়েছে!',
        text: 'আমাদের প্রতিনিধি খুব শিগগিরই আপনার সাথে যোগাযোগ করবেন।',
        icon: 'success',
        background: '#18181b',
        color: '#fff',
        confirmButtonColor: '#f97316',
      }).then(() => {
        setFormData({
          name: '', phone: '', area: '', address: '', selectedPackage: 'Bronze+ (30 Mbps - 630 Tk)'
        });
      });
    }, 1000);
  };

  return (
    <div className="bg-zinc-950 min-h-screen pb-24 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Header Section */}
      <section className="pt-32 pb-12 relative z-10 text-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
            নতুন <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">কানেকশন</span> রিকোয়েস্ট
          </h1>
          <p className="text-zinc-400 font-medium max-w-xl mx-auto">
            নিচের ফর্মটি পূরণ করুন। আমাদের টিম দ্রুত আপনার সাথে যোগাযোগ করে লাইন চালু করার ব্যবস্থা করবে।
          </p>
        </motion.div>
      </section>

      {/* Form Section */}
      <section className="relative z-10 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl mx-auto bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 md:p-10 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-zinc-400 text-xs font-bold uppercase tracking-wider ml-1">আপনার নাম <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors placeholder:text-zinc-600" placeholder="সম্পূর্ণ নাম লিখুন" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-400 text-xs font-bold uppercase tracking-wider ml-1">ফোন নাম্বার <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors placeholder:text-zinc-600" placeholder="017XXXXXXXX" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-zinc-400 text-xs font-bold uppercase tracking-wider ml-1">এলাকা (যেমন: সাবালিয়া) <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input type="text" name="area" value={formData.area} onChange={handleChange} required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors placeholder:text-zinc-600" placeholder="এলাকার নাম" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-400 text-xs font-bold uppercase tracking-wider ml-1">পছন্দের প্যাকেজ <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-500" />
                  <select 
                    name="selectedPackage" value={formData.selectedPackage} onChange={handleChange} 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors appearance-none cursor-pointer"
                  >
                    {packages.map((pkg, index) => (
                      <option key={index} value={pkg} className="bg-zinc-900 text-white">{pkg}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-400 text-xs font-bold uppercase tracking-wider ml-1">বিস্তারিত ঠিকানা <span className="text-rose-500">*</span></label>
              <textarea 
                name="address" value={formData.address} onChange={handleChange} required rows="3"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors placeholder:text-zinc-600 resize-none" 
                placeholder="বাসার নাম্বার, রাস্তার নাম, ল্যান্ডমার্ক ইত্যাদি বিস্তারিত লিখুন..." 
              ></textarea>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all shadow-[0_10px_20px_rgba(249,115,22,0.2)] mt-6 disabled:opacity-70 disabled:cursor-not-allowed group">
              {isSubmitting ? 'প্রসেস হচ্ছে...' : (
                <>রিকোয়েস্ট পাঠান <MessageCircle className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
            <p className="text-center text-zinc-500 text-xs mt-3">সাবমিট করলে এটি সরাসরি আমাদের হোয়াটসঅ্যাপে চলে যাবে।</p>

          </form>
        </motion.div>
      </section>
    </div>
  );
}