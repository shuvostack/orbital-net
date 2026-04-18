import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users'; 

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,      
      isLoading: false, 

      // --- Login Action ---
      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const res = await axios.post(`${API_URL}/login`, { email, password });
          set({ user: res.data, isLoading: false });
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { 
            success: false, 
            message: error.response?.data?.message || 'লগইন ব্যর্থ হয়েছে!' 
          };
        }
      },

      // --- Register Action ---
      register: async (userData) => {
        set({ isLoading: true });
        try {
          const res = await axios.post(API_URL, userData);
          set({ user: res.data, isLoading: false });
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { 
            success: false, 
            message: error.response?.data?.message || 'রেজিস্ট্রেশন ব্যর্থ হয়েছে!' 
          };
        }
      },

      // --- Logout Action ---
      logout: () => {
        set({ user: null });
      },
    }),
    {
      name: 'orbital-auth', 
    }
  )
);