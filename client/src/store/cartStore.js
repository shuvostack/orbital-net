import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,

      toggleCart: () => set({ isCartOpen: !get().isCartOpen }),
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),

      addToCart: (product) => {
        const cart = get().cart;
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
          set({ 
            cart: cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item),
          });
        } else {
          set({ 
            cart: [...cart, { ...product, quantity: 1, rawPrice: Number(product.rawPrice) }],
          });
        }
      },

      removeFromCart: (productId) => {
        set({ cart: get().cart.filter(item => item.id !== productId) });
      },

      updateQuantity: (productId, qty) => {
        if (qty < 1) {
           set({ cart: get().cart.filter(item => item.id !== productId) });
           return;
        }
        set({ cart: get().cart.map(item => item.id === productId ? { ...item, quantity: qty } : item) });
      },

      clearCart: () => set({ cart: [] }),

      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + (Number(item.rawPrice) * item.quantity), 0);
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