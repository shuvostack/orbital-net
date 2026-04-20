import Link from 'next/link';
import { motion } from 'framer-motion';
import { XCircle, ShoppingBag } from 'lucide-react';

export default function PaymentFail() {
  return (
    <div className="bg-zinc-950 min-h-screen flex items-center justify-center py-24 px-4">
      <div className="bg-zinc-900/60 border border-rose-500/30 rounded-3xl p-10 max-w-lg text-center shadow-[0_0_50px_rgba(244,63,94,0.1)]">
        <XCircle className="w-24 h-24 text-rose-500 mx-auto mb-6" />
        <h1 className="text-3xl font-black text-white mb-2">পেমেন্ট ব্যর্থ হয়েছে!</h1>
        <p className="text-zinc-400 mb-6">কোনো কারণে আপনার পেমেন্টটি সম্পন্ন হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন অথবা Cash on Delivery সিলেক্ট করুন।</p>
        <Link href="/checkout" className="inline-flex items-center gap-2 bg-rose-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-rose-600 transition-colors">
          <ShoppingBag className="w-5 h-5" /> আবার চেকআউট করুন
        </Link>
      </div>
    </div>
  );
}