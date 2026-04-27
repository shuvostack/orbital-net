'use client';

import { useState, useEffect } from 'react';
// 💡 এখানে Facebook এবং Youtube এর বদলে Share2 এবং PlaySquare ব্যবহার করা হয়েছে
import { Settings, Save, Phone, Mail, MapPin, Share2, PlaySquare, MessageCircle, ShieldAlert, Lock, Loader2 } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuthStore } from '@/store/authStore';

export default function AdminSettingsPage() {
  const { token } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  // Settings State
  const [formData, setFormData] = useState({
    phone: '', email: '', address: '', facebook: '', whatsapp: '', youtube: '', maintenanceMode: false, acceptOrders: true
  });

  // Password State
  const [passData, setPassData] = useState({ newPassword: '', confirmPassword: '' });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/settings');
        setFormData(data);
      } catch (error) {
        console.error('Error fetching settings', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSettingsChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSettingsSave = async (e) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put('http://localhost:5000/api/settings', formData, config);
      Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'সেটিংস সেভ হয়েছে!', showConfirmButton: false, timer: 1500, background: '#18181b', color: '#fff' });
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'সমস্যা হয়েছে!', background: '#18181b', color: '#fff' });
    } finally {
      setSavingSettings(false);
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    if (passData.newPassword !== passData.confirmPassword) {
      return Swal.fire({ icon: 'error', title: 'পাসওয়ার্ড মিলেনি!', text: 'নতুন এবং কনফার্ম পাসওয়ার্ড একই হতে হবে।', background: '#18181b', color: '#fff' });
    }
    if (passData.newPassword.length < 6) {
      return Swal.fire({ icon: 'warning', title: 'পাসওয়ার্ড ছোট!', text: 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।', background: '#18181b', color: '#fff' });
    }

    setSavingPassword(true);
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put('http://localhost:5000/api/settings/password', { password: passData.newPassword }, config);
      Swal.fire({ icon: 'success', title: 'পাসওয়ার্ড চেঞ্জ হয়েছে!', text: 'পরবর্তী লগইনে নতুন পাসওয়ার্ড ব্যবহার করুন।', background: '#18181b', color: '#fff', confirmButtonColor: '#f97316' });
      setPassData({ newPassword: '', confirmPassword: '' });
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'সমস্যা হয়েছে!', background: '#18181b', color: '#fff' });
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-[80vh]"><div className="w-12 h-12 border-4 border-zinc-800 border-t-orange-500 rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800 flex items-center gap-3">
        <Settings className="w-8 h-8 text-orange-500" />
        <div>
          <h1 className="text-2xl font-black text-white">System Settings</h1>
          <p className="text-zinc-500 text-sm">ওয়েবসাইটের ডাটা এবং সিকিউরিটি ম্যানেজ করুন</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: General Info & Social */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Form 1: Website Information */}
          <form onSubmit={handleSettingsSave} className="bg-zinc-900/40 p-6 md:p-8 rounded-3xl border border-zinc-800 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-6 border-b border-zinc-800 pb-4">
              <Phone className="w-5 h-5 text-orange-500" /> Website Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-zinc-400 text-xs font-bold uppercase mb-2">Support Phone</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input type="text" name="phone" value={formData.phone} onChange={handleSettingsChange} className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl pl-11 pr-4 py-3 focus:border-orange-500 outline-none transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-zinc-400 text-xs font-bold uppercase mb-2">Official Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input type="email" name="email" value={formData.email} onChange={handleSettingsChange} className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl pl-11 pr-4 py-3 focus:border-orange-500 outline-none transition-colors" />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-zinc-400 text-xs font-bold uppercase mb-2">Office Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 w-4 h-4 text-zinc-500" />
                  <textarea name="address" rows="2" value={formData.address} onChange={handleSettingsChange} className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl pl-11 pr-4 py-3 focus:border-orange-500 outline-none transition-colors custom-scrollbar" />
                </div>
              </div>
            </div>

            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-6 mt-8 border-b border-zinc-800 pb-4">
              {/* 💡 এখানে Share2 ব্যবহার করা হয়েছে */}
              <Share2 className="w-5 h-5 text-blue-500" /> Social Media Links
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-zinc-400 text-xs font-bold uppercase mb-2">Facebook Page</label>
                <div className="relative">
                  <Share2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                  <input type="text" name="facebook" value={formData.facebook} onChange={handleSettingsChange} placeholder="https://facebook.com/..." className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl pl-11 pr-4 py-3 focus:border-orange-500 outline-none transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-zinc-400 text-xs font-bold uppercase mb-2">WhatsApp Number</label>
                <div className="relative">
                  <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                  <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleSettingsChange} placeholder="e.g. +8801..." className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl pl-11 pr-4 py-3 focus:border-orange-500 outline-none transition-colors" />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-zinc-400 text-xs font-bold uppercase mb-2">YouTube Channel</label>
                <div className="relative">
                  {/* 💡 এখানে PlaySquare ব্যবহার করা হয়েছে */}
                  <PlaySquare className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-500" />
                  <input type="text" name="youtube" value={formData.youtube} onChange={handleSettingsChange} placeholder="https://youtube.com/..." className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl pl-11 pr-4 py-3 focus:border-orange-500 outline-none transition-colors" />
                </div>
              </div>
            </div>

            <div className="pt-6 flex justify-end border-t border-zinc-800">
              <button type="submit" disabled={savingSettings} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-orange-500 text-white hover:bg-orange-600 transition-colors disabled:opacity-50">
                {savingSettings ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Emergency & Security */}
        <div className="space-y-8">
          
          {/* Emergency Switches */}
          <div className="bg-zinc-900/40 p-6 md:p-8 rounded-3xl border border-rose-500/20 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-6 border-b border-zinc-800 pb-4">
              <ShieldAlert className="w-5 h-5 text-rose-500" /> Emergency Switches
            </h2>
            
            {/* Toggle 1 */}
            <div className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
              <div>
                <p className="text-white font-bold text-sm">Maintenance Mode</p>
                <p className="text-zinc-500 text-xs mt-0.5">অফ করে রাখুন ওয়েবসাইট আপডেট করার সময়</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="maintenanceMode" checked={formData.maintenanceMode} onChange={handleSettingsChange} className="sr-only peer" />
                <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
              </label>
            </div>

            {/* Toggle 2 */}
            <div className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
              <div>
                <p className="text-white font-bold text-sm">Accept Orders</p>
                <p className="text-zinc-500 text-xs mt-0.5">ওয়েবসাইট থেকে অর্ডার নেওয়া বন্ধ/চালু</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="acceptOrders" checked={formData.acceptOrders} onChange={handleSettingsChange} className="sr-only peer" />
                <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            <button onClick={handleSettingsSave} disabled={savingSettings} className="w-full py-3 rounded-xl font-bold bg-zinc-800 text-white hover:bg-zinc-700 transition-colors">
              Update Switches
            </button>
          </div>

          {/* Admin Security */}
          <form onSubmit={handlePasswordSave} className="bg-zinc-900/40 p-6 md:p-8 rounded-3xl border border-zinc-800 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-6 border-b border-zinc-800 pb-4">
              <Lock className="w-5 h-5 text-purple-500" /> Admin Security
            </h2>
            <div>
              <label className="block text-zinc-400 text-xs font-bold uppercase mb-2">New Password</label>
              <input type="password" value={passData.newPassword} onChange={(e) => setPassData({...passData, newPassword: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:border-purple-500 outline-none transition-colors" placeholder="••••••••" required />
            </div>
            <div>
              <label className="block text-zinc-400 text-xs font-bold uppercase mb-2">Confirm Password</label>
              <input type="password" value={passData.confirmPassword} onChange={(e) => setPassData({...passData, confirmPassword: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:border-purple-500 outline-none transition-colors" placeholder="••••••••" required />
            </div>
            <button type="submit" disabled={savingPassword} className="w-full flex justify-center items-center gap-2 py-3 rounded-xl font-bold bg-purple-500 text-white hover:bg-purple-600 transition-colors disabled:opacity-50">
              {savingPassword ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Change Password'}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}