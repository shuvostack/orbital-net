'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Package, ShoppingCart, Users, Box, AlertCircle, Info, ToggleRight, Settings } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-zinc-800 border-t-orange-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // dummy data chart
  const chartData = [40, 70, 45, 90, 65, 80, 55, 100, 75, 50];

  return (
    <div className="max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">Dashboard</h1>
        <p className="text-zinc-500 text-sm">Welcome back, {user?.name || 'Admin'}!</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Main Chart Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-6">Sales & Orders Overview</h2>
            
            {/* CSS Bar Chart Simulation */}
            <div className="h-48 flex items-end justify-between gap-2 mb-8 px-2">
              {chartData.map((height, i) => (
                <div key={i} className="w-full bg-zinc-800/50 rounded-t-sm relative group flex items-end justify-center h-full">
                  <div 
                    style={{ height: `${height}%` }} 
                    className="w-full bg-gradient-to-t from-orange-500 to-rose-500 rounded-t-sm group-hover:opacity-80 transition-opacity"
                  ></div>
                </div>
              ))}
            </div>

            {/* Bottom Stats of Chart */}
            <div className="grid grid-cols-2 gap-4 border-t border-zinc-800/50 pt-6">
              <div>
                <p className="text-emerald-400 font-bold text-sm mb-1">Total Sales</p>
                <p className="text-2xl font-black text-white">৳ 1,54,500</p>
              </div>
              <div className="text-right">
                <p className="text-blue-400 font-bold text-sm mb-1">Total Orders</p>
                <p className="text-2xl font-black text-white">324</p>
              </div>
              <div className="mt-4">
                <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">This Month</p>
                <p className="text-zinc-300 font-medium">৳ 45,200</p>
              </div>
              <div className="mt-4 text-right">
                <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">Active Users</p>
                <p className="text-zinc-300 font-medium">1,204</p>
              </div>
            </div>
          </motion.div>

          {/* Grid of 4 Items */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="text-lg font-bold text-white mb-4">Store Overview</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              {/* Box 1: Products */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-center">
                <div className="flex justify-center mb-3 text-orange-500"><Box className="w-6 h-6" /></div>
                <p className="text-center text-zinc-400 text-xs font-bold uppercase mb-1">Products</p>
                <p className="text-center text-xl font-black text-white">128</p>
              </div>

              {/* Packages */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-center">
                <div className="flex justify-center mb-3 text-blue-500"><Package className="w-6 h-6" /></div>
                <p className="text-center text-zinc-400 text-xs font-bold uppercase mb-1">Packages</p>
                <p className="text-center text-xl font-black text-white">12</p>
              </div>

              {/* Total Orders */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-center">
                <div className="flex justify-center mb-3 text-emerald-500"><ShoppingCart className="w-6 h-6" /></div>
                <p className="text-center text-zinc-400 text-xs font-bold uppercase mb-1">Delivered</p>
                <p className="text-center text-xl font-black text-white">290</p>
              </div>

              {/* Customers */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-center">
                <div className="flex justify-center mb-3 text-purple-500"><Users className="w-6 h-6" /></div>
                <p className="text-center text-zinc-400 text-xs font-bold uppercase mb-1">Customers</p>
                <p className="text-center text-xl font-black text-white">845</p>
              </div>

            </div>
          </motion.div>

          {/* Action Banner */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-orange-500/5 border border-dashed border-orange-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-orange-200">
              <AlertCircle className="w-8 h-8 text-orange-500 shrink-0" />
              <p className="text-sm">
                Dear Admin, you have <strong className="text-white">12 pending orders</strong> that need to be processed. Please check the order management section.
              </p>
            </div>
            <Link href="/admin/orders" className="shrink-0 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider hover:scale-105 transition-transform shadow-lg shadow-orange-500/20">
              Manage Orders
            </Link>
          </motion.div>

        </div>

        {/* Right */}
        <div className="xl:col-span-1 space-y-6">
          
          {/* Circular Status */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white mb-2">Pending Tasks</h2>
              <p className="text-zinc-500 text-sm mb-4">Orders to be processed</p>
              <Link href="/admin/orders" className="text-orange-500 text-xs font-bold uppercase tracking-wider hover:text-orange-400">VIEW ORDERS</Link>
            </div>
            {/* Circle UI */}
            <div className="w-20 h-20 rounded-full border-4 border-zinc-800 border-t-orange-500 border-r-orange-500 flex items-center justify-center">
              <span className="text-2xl font-black text-white">12</span>
            </div>
          </motion.div>

          {/* Account/Store Status */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-6">Store Status</h2>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-emerald-400 font-bold">Online</p>
                <p className="text-zinc-500 text-xs">System is running normally</p>
              </div>
              <ToggleRight className="w-10 h-10 text-emerald-500" />
            </div>
            <div className="pt-4 border-t border-zinc-800/50">
              <p className="text-zinc-400 text-sm mb-1">Database Usage</p>
              <div className="w-full bg-zinc-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-orange-500 to-rose-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <p className="text-right text-xs text-zinc-500 mt-1">45% Used</p>
            </div>
          </motion.div>

          {/* Important Notice */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
              <Info className="w-5 h-5 text-orange-500" /> Important Notice
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              This admin dashboard allows you to fully manage your ISP website and e-commerce store. 
            </p>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">•</span> 
                Add, Edit, or Remove Products from the Shop page.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">•</span> 
                Update ISP Packages shown on the Home and Packages page.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">•</span> 
                Process and manage customer orders.
              </li>
            </ul>
          </motion.div>

        </div>
      </div>

    </div>
  );
}