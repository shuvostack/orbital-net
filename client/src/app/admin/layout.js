'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Box, PackageOpen, ShoppingCart, Users, LogOut, Menu, X, Settings } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import Image from 'next/image';

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { user, logout, isAuthenticated, isAdmin } = useAuthStore();

  useEffect(() => {
    setIsMounted(true);
    if (pathname !== '/admin/login' && (!isAuthenticated() || !isAdmin())) {
      router.push('/admin/login');
    }
  }, [pathname, isAuthenticated, isAdmin, router]);

  if (!isMounted) {
    return <div className="min-h-screen bg-zinc-950">{children}</div>;
  }

  if (pathname === '/admin/login') return <>{children}</>;

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Shop Products', href: '/admin/products', icon: <Box className="w-5 h-5" /> },
    { name: 'ISP Packages', href: '/admin/packages', icon: <PackageOpen className="w-5 h-5" /> },
    { name: 'Order Management', href: '/admin/orders', icon: <ShoppingCart className="w-5 h-5" /> },
    // { name: 'Customers', href: '/admin/customers', icon: <Users className="w-5 h-5" /> },
    { name: 'Settings', href: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="flex min-h-screen w-full bg-[#0a0a0c] selection:bg-orange-500/30">
      
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-40 lg:hidden" />
        )}
      </AnimatePresence>

      {/* Sidebar (Left Side) */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-zinc-950 border-r border-zinc-800/50 z-50 flex flex-col shrink-0 transition-all duration-300 ${!isSidebarOpen && 'lg:hidden lg:-ml-64'}`}
      >
        <div className="h-20 shrink-0 flex items-center justify-between px-8 border-b border-zinc-800/50">
          <Link href="/admin/dashboard">
             <Image src="/logo_1.png" alt="Logo" width={120} height={40} className="object-contain" />
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-zinc-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname.includes(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold text-sm transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500/10 to-rose-500/10 text-orange-400 border border-orange-500/20 shadow-inner'
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-white border border-transparent'
                }`}
              >
                <div className={`${isActive ? 'text-orange-400' : 'text-zinc-500 group-hover:text-white'} transition-colors`}>
                  {item.icon}
                </div>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 shrink-0 border-t border-zinc-800/50">
          <button onClick={handleLogout} className="flex items-center gap-4 w-full px-4 py-3.5 rounded-xl font-bold text-sm text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area (Right Side) */}
      <main className="flex-1 flex flex-col min-w-0 min-h-screen relative">
        
        {/* Header (Mobile Only) */}
        <header className="h-20 shrink-0 flex items-center px-6 z-10 lg:hidden border-b border-zinc-800/50 bg-zinc-950">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-zinc-400 hover:text-white bg-zinc-900 p-2 rounded-lg">
            <Menu className="w-5 h-5" />
          </button>
        </header>
        
        
        <div className="flex-1 w-full p-4 sm:p-6 lg:p-10 pb-20">
          {children}
        </div>
        
      </main>

    </div>
  );
}