'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, ShoppingCart, Users, Box, AlertCircle, Info, ToggleRight, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import axios from 'axios';

export default function AdminDashboardPage() {
  const { user, token } = useAuthStore();
  const [loading, setLoading] = useState(true);
  
  // 💡 Dashboard States
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    totalProducts: 0,
    totalPackages: 0,
    totalCustomers: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [ordersRes, productsRes, packagesRes] = await Promise.all([
          axios.get('http://localhost:5000/api/orders', config),
          axios.get('http://localhost:5000/api/products'),
          axios.get('http://localhost:5000/api/packages')
        ]);

        const orders = ordersRes.data;
        const products = productsRes.data;
        const packages = packagesRes.data;

        // 💡 data processing and calculation
        let sales = 0;
        let pending = 0;
        let delivered = 0;
        
        // unique customer
        const uniqueCustomers = new Set(); 

        orders.forEach(order => {
          if (order.status === 'Completed' || order.paymentStatus === 'Paid') {
            sales += order.totalAmount;
          }
          if (order.status === 'Pending') pending += 1;
          if (order.status === 'Completed') delivered += 1;
          if (order.phone) uniqueCustomers.add(order.phone);
        });

        // set data to state
        setStats({
          totalSales: sales,
          totalOrders: orders.length,
          pendingOrders: pending,
          deliveredOrders: delivered,
          totalProducts: products.length,
          totalPackages: packages.length,
          totalCustomers: uniqueCustomers.size
        });

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchDashboardData();
  }, [token]);

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
      </div>
    );
  }

  // 💡 Chart Data ( random for now )
  const chartData = [40, 70, 45, 90, 65, 80, 55, 100, 75, 50];

  return (
    <div className="max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">Dashboard Overview</h1>
        <p className="text-zinc-500 text-sm">Welcome back, {user?.name || 'Admin'}!</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Main Chart Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-6">Sales & Revenue</h2>
            
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

            <div className="grid grid-cols-2 gap-4 border-t border-zinc-800/50 pt-6">
              <div>
                <p className="text-emerald-400 font-bold text-sm mb-1">Total Verified Sales</p>
                <p className="text-2xl font-black text-white">৳ {stats.totalSales.toLocaleString('en-IN')}</p>
              </div>
              <div className="text-right">
                <p className="text-blue-400 font-bold text-sm mb-1">Total Requests</p>
                <p className="text-2xl font-black text-white">{stats.totalOrders}</p>
              </div>
              <div className="mt-4">
                <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">Pending Orders</p>
                <p className="text-orange-400 font-medium">{stats.pendingOrders} Needs Attention</p>
              </div>
              <div className="mt-4 text-right">
                <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">Total Customers</p>
                <p className="text-zinc-300 font-medium">{stats.totalCustomers}</p>
              </div>
            </div>
          </motion.div>

          {/* Grid of 4 Items */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="text-lg font-bold text-white mb-4">Database Overview</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-center transition-colors hover:border-orange-500/50">
                <div className="flex justify-center mb-3 text-orange-500"><Box className="w-6 h-6" /></div>
                <p className="text-center text-zinc-400 text-xs font-bold uppercase mb-1">Shop Products</p>
                <p className="text-center text-xl font-black text-white">{stats.totalProducts}</p>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-center transition-colors hover:border-blue-500/50">
                <div className="flex justify-center mb-3 text-blue-500"><Package className="w-6 h-6" /></div>
                <p className="text-center text-zinc-400 text-xs font-bold uppercase mb-1">ISP Packages</p>
                <p className="text-center text-xl font-black text-white">{stats.totalPackages}</p>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-center transition-colors hover:border-emerald-500/50">
                <div className="flex justify-center mb-3 text-emerald-500"><ShoppingCart className="w-6 h-6" /></div>
                <p className="text-center text-zinc-400 text-xs font-bold uppercase mb-1">Completed</p>
                <p className="text-center text-xl font-black text-white">{stats.deliveredOrders}</p>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-center transition-colors hover:border-purple-500/50">
                <div className="flex justify-center mb-3 text-purple-500"><Users className="w-6 h-6" /></div>
                <p className="text-center text-zinc-400 text-xs font-bold uppercase mb-1">Customers</p>
                <p className="text-center text-xl font-black text-white">{stats.totalCustomers}</p>
              </div>

            </div>
          </motion.div>

          {/* Action Banner */}
          {stats.pendingOrders > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-orange-500/5 border border-dashed border-orange-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-orange-200">
                <AlertCircle className="w-8 h-8 text-orange-500 shrink-0" />
                <p className="text-sm">
                  Dear Admin, you have <strong className="text-white">{stats.pendingOrders} pending orders</strong> that need to be processed. Please check the order management section.
                </p>
              </div>
              <Link href="/admin/orders" className="shrink-0 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider hover:scale-105 transition-transform shadow-lg shadow-orange-500/20">
                Manage Orders
              </Link>
            </motion.div>
          )}

        </div>

        {/* Right Column */}
        <div className="xl:col-span-1 space-y-6">
          
          {/* Circular Status */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white mb-2">Pending Tasks</h2>
              <p className="text-zinc-500 text-sm mb-4">Orders waiting for review</p>
              <Link href="/admin/orders" className="text-orange-500 text-xs font-bold uppercase tracking-wider hover:text-orange-400">VIEW ORDERS</Link>
            </div>
            {/* Circle UI */}
            <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center transition-colors ${stats.pendingOrders > 0 ? 'border-zinc-800 border-t-orange-500 border-r-orange-500' : 'border-zinc-800 border-t-emerald-500 border-r-emerald-500'}`}>
              <span className="text-2xl font-black text-white">{stats.pendingOrders}</span>
            </div>
          </motion.div>

          {/* Account/Store Status */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-6">System Status</h2>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-emerald-400 font-bold">Online & Active</p>
                <p className="text-zinc-500 text-xs">All APIs are running normally</p>
              </div>
              <ToggleRight className="w-10 h-10 text-emerald-500" />
            </div>
            <div className="pt-4 border-t border-zinc-800/50">
              <p className="text-zinc-400 text-sm mb-1">Database Load (Estimated)</p>
              <div className="w-full bg-zinc-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-orange-500 to-rose-500 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
              <p className="text-right text-xs text-zinc-500 mt-1">15% Used</p>
            </div>
          </motion.div>

          {/* Important Notice */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
              <Info className="w-5 h-5 text-orange-500" /> Quick Tips
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              This admin dashboard allows you to fully manage your ISP website and e-commerce store. 
            </p>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">•</span> 
                Add new routers or cables from the Shop Products page.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">•</span> 
                Update ISP Packages to reflect them on the Home page instantly.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">•</span> 
                Check Order Management daily to process new connection requests.
              </li>
            </ul>
          </motion.div>

        </div>
      </div>

    </div>
  );
}