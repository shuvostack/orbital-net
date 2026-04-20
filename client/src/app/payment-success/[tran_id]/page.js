'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Home } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useEffect } from 'react';

export default function PaymentSuccess({ params }) {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart(); 
  }, [clearCart]);

  return (
    <div className="bg-zinc-950 min-h-screen flex items-center justify-center py-24 px-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-zinc-900/60 border border-emerald-500/30 rounded-3xl p-10 max-w-lg text-center shadow-[0_0_50px_rgba(16,185,129,0.1)]">
        <CheckCircle className="w-24 h-24 text-emerald-500 mx-auto mb-6" />
        <h1 className="text-3xl font-black text-white mb-2">পেমেন্ট সফল হয়েছে!</h1>
        <p className="text-zinc-400 mb-6">আপনার ট্রানজেকশন আইডি: <strong className="text-emerald-400">{params.tran_id}</strong><br/>খুব শিগগিরই আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করবেন।</p>
        <Link href="/" className="inline-flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-colors">
          <Home className="w-5 h-5" /> হোম পেজে ফিরে যান
        </Link>
      </motion.div>
    </div>
  );
}