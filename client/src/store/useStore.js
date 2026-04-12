import { create } from 'zustand';

const useStore = create((set) => ({
  // User State
  userInfo: null, 
  
  // Set user after login
  login: (userData) => set({ userInfo: userData }),
  
  // Remove userInfo after logout
  logout: () => set({ userInfo: null }),

  // Cart State
  cartItems: [],
  addToCart: (product) => set((state) => ({ 
    cartItems: [...state.cartItems, product] 
  })),
}));

export default useStore;