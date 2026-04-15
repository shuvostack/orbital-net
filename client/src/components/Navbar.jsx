'use client';

import Link from 'next/link';
import Image from 'next/image'; 
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, ShoppingCart, User, CreditCard } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About us', href: '/about' },
    { name: 'Packages', href: '/packages' },
    { name: 'Shop', href: '/products' },
    { name: 'Pay bill', href: '/pay-bill', icon: <CreditCard className="w-3.5 h-3.5" /> },
    { name: 'Coverage', href: '/coverage' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-zinc-950/80 border-b border-zinc-800/50 shadow-lg shadow-orange-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/logo_1.png" 
              alt="Orbital Net Logo"
              width={120} 
              height={40} 
              className="object-contain" 
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden xl:flex space-x-6 items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={`text-[13px] uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 relative group
                    ${link.name === 'Pay bill' 
                      ? (isActive ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'text-emerald-500 hover:text-emerald-400')
                      : (isActive ? 'text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]' : 'text-zinc-300 hover:text-orange-400')
                    }`}
                >
                  {link.icon && link.icon}
                  {link.name}
                  
                  {isActive && (
                    <span className={`absolute -bottom-2 left-0 w-full h-[2px] rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)] ${link.name === 'Pay bill' ? 'bg-emerald-400' : 'bg-orange-500'}`}></span>
                  )}
                </Link>
              )
            })}
            
            <div className="h-6 w-px bg-zinc-800 mx-2"></div>

            {/* Icons & Action */}
            <div className="flex items-center gap-5">
              <Link href="/cart" className={`transition-colors relative ${pathname === '/cart' ? 'text-orange-400' : 'text-zinc-300 hover:text-orange-400'}`}>
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-rose-500 text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white">0</span>
              </Link>
              
              <Link href="/login" className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-5 py-2.5 rounded-full hover:scale-105 transition-all font-bold text-sm shadow-lg shadow-orange-500/25">
                <User className="w-4 h-4" /> Sign In
              </Link>
            </div>
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="xl:hidden flex items-center gap-4">
             <Link href="/cart" className="text-zinc-300 mr-2 relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-rose-500 text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white">0</span>
             </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-300 p-2 hover:text-orange-400 transition-colors">
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="xl:hidden bg-zinc-900/98 backdrop-blur-2xl border-b border-zinc-800 animate-in slide-in-from-top duration-300">
          <div className="px-6 py-8 space-y-4 flex flex-col">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-semibold border-b border-zinc-800/50 pb-2 transition-all flex items-center gap-2
                    ${isActive ? 'text-orange-400 pl-4 border-orange-500/50' : 'text-zinc-300 hover:text-orange-400'}
                  `}
                >
                  {link.icon && link.icon}
                  {link.name}
                </Link>
              )
            })}
            <Link 
              href="/login" 
              onClick={() => setIsOpen(false)}
              className="mt-4 flex justify-center items-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white py-4 rounded-xl font-bold shadow-lg shadow-orange-500/20"
            >
              <User className="w-5 h-5" /> Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}