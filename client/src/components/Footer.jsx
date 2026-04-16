'use client';

import Link from 'next/link';
import Image from 'next/image'; 
import { Phone, Mail, MapPin, ChevronRight } from 'lucide-react'; 

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 pt-20 pb-10 border-t border-zinc-900 relative overflow-hidden">
      
      {/* Background Subtle Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-orange-600/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6 relative">
              {/* --- Logo --- */}
              <Image 
                src="/logo_1.png" 
                alt="Orbital Net Logo"
                width={200}
                height={80}
                className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              />
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed mb-8 pr-4">
              টাঙ্গাইলের সেরা ফাইবার অপটিক ইন্টারনেট সার্ভিস প্রোভাইডার। নিরবচ্ছিন্ন কানেক্টিভিটি এবং এক্সট্রিম পারফরম্যান্সের প্রতিশ্রুতি নিয়ে আমরা আছি আপনার পাশে।
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {/* Facebook */}
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              {/* Twitter */}
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-rose-500 hover:border-rose-500 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              {/* Github */}
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 hover:border-zinc-700 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Packages', 'Coverage Area', 'Hardware Shop', 'Pay Bill'].map((item, index) => (
                <li key={index}>
                  <Link href="#" className="text-zinc-400 hover:text-orange-400 text-sm font-medium transition-colors flex items-center gap-2 group">
                    <ChevronRight className="w-3 h-3 text-zinc-700 group-hover:text-orange-400 transition-colors" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">SUPPORT</h4>
            <ul className="space-y-4">
              {['Help Center / FAQ', 'Contact Us', 'Privacy Policy', 'Terms of Service', 'Refund Policy'].map((item, index) => (
                <li key={index}>
                  <Link href="#" className="text-zinc-400 hover:text-rose-400 text-sm font-medium transition-colors flex items-center gap-2 group">
                    <ChevronRight className="w-3 h-3 text-zinc-700 group-hover:text-rose-400 transition-colors" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">CONNECTIONS</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-zinc-400 text-sm leading-relaxed">
                  মেইন রোড, টাঙ্গাইল সদর,<br />টাঙ্গাইল, বাংলাদেশ।
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                <a href="tel:+8801700000000" className="text-zinc-400 hover:text-white text-sm font-medium transition-colors">
                  +880 1717171081
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500 shrink-0" />
                <a href="mailto:support@orbitalnet.com" className="text-zinc-400 hover:text-white text-sm font-medium transition-colors">
                  support@orbitalnet.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright & Developer Credit */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-xs font-medium">
            © {currentYear} Orbital Net. All rights reserved.
          </p>
          <p className="text-zinc-500 text-xs font-medium flex items-center gap-1">
            Developed by 
            <a href="https://github.com/shuvostack" target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-orange-400 font-bold transition-colors ml-1">
              Mehedi Hasan Shuvo
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}