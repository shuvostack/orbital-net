import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      
      user: null, 
      token: null,

      // login function
      login: (userData, token) => set({ user: userData, token: token }),

      // logout function
      logout: () => set({ user: null, token: null }),

      // check user 
      isAuthenticated: () => !!get().token,
      
      // check admin
      isAdmin: () => get().user?.isAdmin === true,
    }),
    {
      name: 'orbital-auth', 
    }
  )
);