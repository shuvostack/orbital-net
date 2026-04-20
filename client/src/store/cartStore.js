import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const convertToNumber = (str) => {
  const banglaToEnglish = { '০': 0, '১': 1, '২': 2, '৩': 3, '৪': 4, '৫': 5, '৬': 6, '৭': 7, '৮': 8, '৯': 9 };
  let engStr = str.replace(/,/g, '').replace(/[০-৯]/g, match => banglaToEnglish[match]);
  return Number(engStr) || 0;
};

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,

      toggleCart: () => set({ isCartOpen: !get().isCartOpen }),
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),

      addToCart: (product) => {
        // ম্যাজিক এখানে: React Icon টাকে আলাদা করে বাদ দিয়ে বাকি ডেটা (productToSave) নিচ্ছি
        const { icon, ...productToSave } = product; 
        
        const cart = get().cart;
        const existingItem = cart.find(item => item.id === productToSave.id);
        
        if (existingItem) {
          set({ cart: cart.map(item => item.id === productToSave.id ? { ...item, quantity: item.quantity + 1 } : item) });
        } else {
          set({ cart: [...cart, { ...productToSave, quantity: 1, rawPrice: convertToNumber(productToSave.price) }] });
        }
      },

      removeFromCart: (productId) => {
        set({ cart: get().cart.filter(item => item.id !== productId) });
      },

      updateQuantity: (productId, qty) => {
        if (qty < 1) return;
        set({ cart: get().cart.map(item => item.id === productId ? { ...item, quantity: qty } : item) });
      },

      clearCart: () => set({ cart: [] }),

      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + (item.rawPrice * item.quantity), 0);
      },
      
      getCartCount: () => {
         return get().cart.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    { 
      name: 'orbital-cart' 
    }
  )
);