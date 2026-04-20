'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Phone, MapPin, Send, ShoppingBag, Truck, CreditCard, CheckCircle2, Globe } from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useCartStore } from '@/store/cartStore';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getCartTotal, clearCart } = useCartStore();
  
  const [formData, setFormData] = useState({ name: '', phone: '', altPhone: '', address: '' });
  const [paymentMethod, setPaymentMethod] = useState('cod'); 
  const [trxData, setTrxData] = useState({ senderNumber: '', trxId: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (cart.length === 0) router.push('/shop');
  }, [cart, router]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleTrxChange = (e) => setTrxData({ ...trxData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // prepare data to send backend
    const orderPayload = {
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      cart: cart,
      totalAmount: getCartTotal(),
      paymentMethod: paymentMethod === 'sslcommerz' ? 'SSLCommerz' : 'COD' 
    };

    try {
      // hit backend api
      const res = await axios.post('http://localhost:5000/api/orders', orderPayload);

      if (paymentMethod === 'sslcommerz') {
        window.location.replace(res.data.url);
      } else {
        const adminWhatsAppNumber = '8801717171081'; 
        let orderDetails = '*নতুন হার্ডওয়্যার অর্ডার (COD)!* 🛒\n\n*🛍️ অর্ডারের বিবরণ:*\n';
        cart.forEach((item, i) => { orderDetails += `${i + 1}. ${item.name} - ${item.quantity} পিস\n`; });
        orderDetails += `\n*সর্বমোট বিল:* ৳${getCartTotal().toLocaleString('en-IN')}\n\n*👤 কাস্টমার ইনফো:*\n*নাম:* ${formData.name}\n*ফোন:* ${formData.phone}\n*ঠিকানা:* ${formData.address}\n\n*💳 পেমেন্ট মেথড:* Cash on Delivery\n\nঅনুগ্রহ করে অর্ডারটি কনফার্ম করুন।`;
        
        const whatsappUrl = `https://wa.me/${adminWhatsAppNumber}?text=${encodeURIComponent(orderDetails)}`;

        Swal.fire({
          title: 'অর্ডার প্লেস হয়েছে!',
          text: 'আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করে ডেলিভারি কনফার্ম করবেন।',
          icon: 'success',
          background: '#18181b', color: '#fff', confirmButtonColor: '#f97316',
        }).then(() => {
          window.open(whatsappUrl, '_blank');
          clearCart();
          router.push('/');
        });
      }
    } catch (error) {
      setIsSubmitting(false);
      Swal.fire({
        title: 'দুঃখিত!',
        text: 'অর্ডারটি প্রসেস করতে সমস্যা হচ্ছে। একটু পর আবার চেষ্টা করুন।',
        icon: 'error',
        background: '#18181b', color: '#fff', confirmButtonColor: '#f43f5e',
      });
    }
  };

  if (cart.length === 0) return null;

  return (
    <div className="bg-zinc-950 min-h-screen pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none" />

      <section className="pt-32 pb-12 relative z-10 text-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-4">
            নিরাপদ <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">চেকআউট</span>
          </h1>
          <p className="text-zinc-400 font-medium">আপনার ডেলিভারি এবং পেমেন্ট ইনফরমেশন প্রদান করুন</p>
        </motion.div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
          
          <div className="flex-1 space-y-8">
            {/* Delivery Info Form */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-zinc-800 pb-4">
                <Truck className="w-5 h-5 text-orange-500" /> ডেলিভারি ইনফরমেশন
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-zinc-400 text-xs font-bold uppercase ml-1">আপনার নাম <span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-12 pr-4 py-3.5 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500" placeholder="সম্পূর্ণ নাম" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-zinc-400 text-xs font-bold uppercase ml-1">ফোন নাম্বার <span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-12 pr-4 py-3.5 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500" placeholder="017XXXXXXXX" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-zinc-400 text-xs font-bold uppercase ml-1">বিকল্প ফোন</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input type="tel" name="altPhone" value={formData.altPhone} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-12 pr-4 py-3.5 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500" placeholder="01XXXXXXXXX" />
                  </div>
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-zinc-400 text-xs font-bold uppercase ml-1">বিস্তারিত ঠিকানা <span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-zinc-500" />
                    <textarea name="address" value={formData.address} onChange={handleChange} required rows="3" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-12 pr-4 py-3.5 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 resize-none" placeholder="বাসা/হোল্ডিং, রাস্তা, এলাকা..."></textarea>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Payment Method Selection */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-zinc-800 pb-4">
                <CreditCard className="w-5 h-5 text-rose-500" /> পেমেন্ট মেথড
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Online Payment (SSLCommerz) */}
                <div onClick={() => setPaymentMethod('sslcommerz')} className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center justify-center gap-3 transition-all ${paymentMethod === 'sslcommerz' ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'}`}>
                  <Globe className={`w-8 h-8 ${paymentMethod === 'sslcommerz' ? 'text-indigo-400' : 'text-zinc-500'}`} />
                  <span className={`font-black text-sm uppercase tracking-wider ${paymentMethod === 'sslcommerz' ? 'text-indigo-400' : 'text-zinc-400'}`}>Online Payment</span>
                  <span className="text-xs text-zinc-500 text-center">বিকাশ, নগদ, ভিসা ও মাস্টারকার্ডের মাধ্যমে পেমেন্ট করুন</span>
                </div>

                {/* Cash on Delivery */}
                <div onClick={() => setPaymentMethod('cod')} className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center justify-center gap-3 transition-all ${paymentMethod === 'cod' ? 'border-orange-500 bg-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'}`}>
                  <Truck className={`w-8 h-8 ${paymentMethod === 'cod' ? 'text-orange-500' : 'text-zinc-500'}`} />
                  <span className={`font-black text-sm uppercase tracking-wider ${paymentMethod === 'cod' ? 'text-orange-500' : 'text-zinc-400'}`}>Cash on Delivery</span>
                  <span className="text-xs text-zinc-500 text-center">প্রোডাক্ট হাতে পেয়ে মূল্য পরিশোধ করুন</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[400px]">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 md:p-8 sticky top-32">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-zinc-800 pb-4">
                <ShoppingBag className="w-5 h-5 text-orange-500" /> অর্ডার সামারি
              </h2>
              
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white line-clamp-1">{item.name}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">{item.quantity} পিস × ৳{item.rawPrice.toLocaleString('en-IN')}</p>
                    </div>
                    <p className="text-sm font-bold text-orange-400">৳{(item.rawPrice * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-zinc-800 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-lg pt-3 border-t border-zinc-800">
                  <span className="text-white font-black">সর্বমোট বিল</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500 font-black">
                    ৳{getCartTotal().toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white py-4 rounded-xl font-black uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all shadow-[0_10px_20px_rgba(249,115,22,0.2)] disabled:opacity-70 group">
                {isSubmitting ? 'প্রসেস হচ্ছে...' : (
                  <>অর্ডার কনফার্ম করুন <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform" /></>
                )}
              </button>
            </motion.div>
          </div>

        </form>
      </section>
    </div>
  );
}