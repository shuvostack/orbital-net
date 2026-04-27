'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, X, Wifi, Search, Star, Loader2 } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuthStore } from '@/store/authStore';

export default function AdminPackagesPage() {
  const { token } = useAuthStore();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); 
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // form data
  const [formData, setFormData] = useState({
    name: '', speed: '', price: '', type: 'Broadband', popular: false, features: ''
  });

  // fetch data from database
  const fetchPackages = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('http://localhost:5000/api/packages');
      setPackages(data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const openModal = (pkg = null) => {
    if (pkg) {
      setEditingId(pkg._id);
      setFormData({
        name: pkg.name, speed: pkg.speed, price: pkg.price, type: pkg.type,
        popular: pkg.popular || false, 
        features: Array.isArray(pkg.features) ? pkg.features.join(', ') : pkg.features
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', speed: '', price: '', type: 'Broadband', popular: false, features: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } };

    const formattedData = {
        ...formData,
        features: formData.features.split(',').map(f => f.trim()).filter(f => f !== '')
    };

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/packages/${editingId}`, formattedData, config);
        Swal.fire({ icon: 'success', title: 'আপডেট সফল!', background: '#18181b', color: '#fff', confirmButtonColor: '#f97316' });
      } else {
        await axios.post('http://localhost:5000/api/packages', formattedData, config);
        Swal.fire({ icon: 'success', title: 'প্যাকেজ অ্যাড হয়েছে!', background: '#18181b', color: '#fff', confirmButtonColor: '#10b981' });
      }
      setIsModalOpen(false);
      fetchPackages(); 
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'সমস্যা হয়েছে!', text: error.response?.data?.message || 'Something went wrong!', background: '#18181b', color: '#fff' });
    } finally {
      setIsSubmitting(false); 
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'আপনি কি নিশ্চিত?',
      text: "ডিলিট করলে এই প্যাকেজটি আর ফেরত পাওয়া যাবে না!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#3f3f46',
      confirmButtonText: 'হ্যাঁ, ডিলিট করুন!',
      background: '#18181b', color: '#fff'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const config = { headers: { Authorization: `Bearer ${token}` } };
          await axios.delete(`http://localhost:5000/api/packages/${id}`, config);
          Swal.fire({ icon: 'success', title: 'ডিলিট হয়েছে!', background: '#18181b', color: '#fff', confirmButtonColor: '#f97316' });
          fetchPackages();
        } catch (error) {
          Swal.fire({ icon: 'error', title: 'সমস্যা হয়েছে!', background: '#18181b', color: '#fff' });
        }
      }
    });
  };

  const filteredPackages = packages.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Wifi className="text-orange-500" /> Internet Packages
          </h1>
          <p className="text-zinc-500 text-sm mt-1">আপনার ইন্টারনেট প্যাকেজগুলো ম্যানেজ করুন</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all shadow-lg shadow-orange-500/25">
          <Plus className="w-5 h-5" /> Add New Package
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
        <input type="text" placeholder="প্যাকেজ খুঁজুন..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-orange-500 transition-colors" />
      </div>

      {/* Packages Grid */}
      <div className="bg-zinc-900/40 rounded-3xl border border-zinc-800 p-6">
        {loading ? (
          <div className="flex justify-center items-center h-40"><div className="w-10 h-10 border-4 border-zinc-800 border-t-orange-500 rounded-full animate-spin"></div></div>
        ) : filteredPackages.length === 0 ? (
           <div className="text-center py-12 text-zinc-500">কোনো প্যাকেজ পাওয়া যায়নি। দয়া করে নতুন প্যাকেজ অ্যাড করুন।</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => (
              <div key={pkg._id} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 relative group hover:border-orange-500/50 transition-all">
                
                {pkg.popular && (
                   <div className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                     <Star className="w-3 h-3 fill-current" /> Popular
                   </div>
                )}

                <div className="flex justify-between items-start mb-4">
                   <div>
                      <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{pkg.type}</span>
                      <h3 className="text-xl font-black text-white">{pkg.name}</h3>
                   </div>
                   <div className="text-right">
                      <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">৳{pkg.price}</div>
                      <span className="text-xs text-zinc-500 font-medium">/ মাস</span>
                   </div>
                </div>

                <div className="flex items-center gap-3 mb-6 bg-zinc-900/50 rounded-xl p-3 border border-zinc-800/50">
                    <Wifi className="w-5 h-5 text-orange-500" />
                    <span className="text-lg font-bold text-white">{pkg.speed}</span>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex justify-between gap-2">
                   <button onClick={() => openModal(pkg)} className="flex-1 py-2.5 bg-blue-500/10 text-blue-400 font-bold rounded-xl hover:bg-blue-500 hover:text-white transition-colors flex items-center justify-center gap-2">
                     <Edit className="w-4 h-4" /> এডিট
                   </button>
                   <button onClick={() => handleDelete(pkg._id)} className="flex-1 py-2.5 bg-rose-500/10 text-rose-400 font-bold rounded-xl hover:bg-rose-500 hover:text-white transition-colors flex items-center justify-center gap-2">
                     <Trash2 className="w-4 h-4" /> ডিলিট
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Package Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div key="package-modal-backdrop" className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-zinc-950 border border-zinc-800 rounded-3xl w-full max-w-2xl relative z-10 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
              
              <div className="flex justify-between items-center p-6 border-b border-zinc-800 shrink-0">
                <h2 className="text-xl font-bold text-white">{editingId ? 'প্যাকেজ এডিট করুন' : 'নতুন প্যাকেজ যোগ করুন'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white"><X className="w-6 h-6" /></button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 text-xs font-bold uppercase mb-2">প্যাকেজের নাম</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500" placeholder="e.g. Starter Pack" />
                  </div>
                  <div>
                    <label className="block text-zinc-400 text-xs font-bold uppercase mb-2">স্পিড</label>
                    <input type="text" name="speed" value={formData.speed} onChange={handleChange} required className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500" placeholder="e.g. 10 Mbps" />
                  </div>
                  <div>
                    <label className="block text-zinc-400 text-xs font-bold uppercase mb-2">মাসিক বিল (টাকা)</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500" placeholder="e.g. 500" />
                  </div>
                  <div>
                    <label className="block text-zinc-400 text-xs font-bold uppercase mb-2">প্যাকেজের ধরন</label>
                    <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500">
                      <option value="Broadband">Broadband</option>
                      <option value="Corporate">Corporate</option>
                      <option value="Gaming">Gaming / Dedicated</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 text-xs font-bold uppercase mb-2">প্যাকেজের সুবিধা (কমা দিয়ে লিখুন)</label>
                  <textarea name="features" value={formData.features} onChange={handleChange} required rows="3" className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500" placeholder="e.g. Free BDIX, 24/7 Support, Real IP..."></textarea>
                </div>

                <div className="flex items-center gap-3 pt-2">
                   <input type="checkbox" id="popular" name="popular" checked={formData.popular} onChange={handleChange} className="w-5 h-5 accent-orange-500 cursor-pointer" />
                   <label htmlFor="popular" className="text-zinc-300 text-sm font-bold cursor-pointer">এটি কি পপুলার প্যাকেজ? (ওয়েবসাইটে হাইলাইট হবে)</label>
                </div>

                <div className="pt-6 flex justify-end gap-3 pb-2 border-t border-zinc-800/50 mt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl font-bold text-zinc-400 hover:bg-zinc-900 transition-colors">বাতিল</button>
                  <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-orange-500 text-white hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isSubmitting ? 'প্রসেস হচ্ছে...' : (editingId ? 'আপডেট করুন' : 'অ্যাড করুন')}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}