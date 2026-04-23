'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, Send } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';

export default function CartDrawer() {
  const [isMounted, setIsMounted] = useState(false);
  const { isCartOpen, closeCart, cart, updateQuantity, removeFromCart, getCartTotal } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    closeCart();
    router.push('/checkout');
  };

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Black Overlay Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-[90]"
          />

          {/* Sliding Drawer */}
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 border-l border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-[100] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg font-black text-white uppercase tracking-wider">আপনার কার্ট</h2>
              </div>
              <button onClick={closeCart} className="p-2 text-zinc-400 hover:text-rose-500 transition-colors rounded-full hover:bg-zinc-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-600 space-y-4">
                  <ShoppingBag className="w-16 h-16 opacity-20" />
                  <p className="font-medium">কার্ট সম্পূর্ণ খালি!</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800/50 group">
                    
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-zinc-950 rounded-xl border border-zinc-800/50 flex items-center justify-center overflow-hidden shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2 mix-blend-screen" />
                      ) : (
                        <ShoppingBag className="w-6 h-6 text-zinc-700" />
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-1">
                      {/* Product Name */}
                      <h3 className="text-white font-bold text-sm leading-snug line-clamp-2">
                        {item.name}
                      </h3>
                      
                      {/* Price */}
                      <div className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500 font-black text-sm mt-1">
                        ৳{(Number(item.rawPrice) * item.quantity).toLocaleString('en-IN')}
                      </div>
                      
                      {/* Controls Row */}
                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 bg-zinc-950 rounded-lg border border-zinc-800 px-2 py-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-zinc-400 hover:text-white transition-colors"><Minus className="w-3.5 h-3.5" /></button>
                          <span className="text-white text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-zinc-400 hover:text-white transition-colors"><Plus className="w-3.5 h-3.5" /></button>
                        </div>
                       
                        <button 
                          onClick={() => removeFromCart(item.id)} 
                          className="p-1 text-zinc-600 hover:text-rose-500 transition-colors"
                          title="রিমুভ করুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Checkout */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-zinc-400 font-medium text-sm">সর্বমোট বিল:</span>
                  <span className="text-2xl font-black text-white">৳{getCartTotal().toLocaleString('en-IN')}</span>
                </div>
                <button onClick={handleCheckout} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white py-4 rounded-xl font-black uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all shadow-[0_10px_20px_rgba(249,115,22,0.2)]">
                  চেকআউট করুন <Send className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}