"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, KeyRound, ShieldCheck, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { login, isAuthenticated, isAdmin } = useAuthStore();

  // if user is already authenticated then redirect to admin portal
  useEffect(() => {
    if (isAuthenticated() && isAdmin()) {
      router.push("/admin/dashboard");
    }
  }, [isAuthenticated, isAdmin, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "https://orbital-backend-9y6q.onrender.com/api/users/login",
        { email, password },
        config,
      );

      if (!data.isAdmin) {
        setError("আপনার অ্যাডমিন এক্সেস নেই।");
        setLoading(false);
        return;
      }

      // save data to zustand store
      login(
        {
          _id: data._id,
          name: data.name,
          email: data.email,
          isAdmin: data.isAdmin,
        },
        data.token,
      );

      // success mssg and redirect to dashboard
      Swal.fire({
        icon: "success",
        title: "লগিন সফল হয়েছে!",
        text: "অ্যাডমিন প্যানেলে স্বাগতম",
        background: "#18181b",
        color: "#fff",
        confirmButtonColor: "#f97316",
      });

      router.push("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "লগিন করতে সমস্যা হচ্ছে। ইমেইল বা পাসওয়ার্ড চেক করুন।",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-2xl font-black text-white uppercase tracking-wider mb-2">
              অ্যাডমিন লগিন
            </h2>
            <p className="text-zinc-500 text-sm font-medium">
              কন্ট্রোল প্যানেলে প্রবেশ করুন
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-start gap-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl mb-6 text-sm"
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p>{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2 ml-1">
                ইমেইল অ্যাড্রেস
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors placeholder:text-zinc-600"
                  placeholder="admin@orbital.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2 ml-1">
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <KeyRound className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors placeholder:text-zinc-600"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white py-4 rounded-xl font-black uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-orange-500/25 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <Lock className="w-5 h-5" /> লগিন করুন
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-zinc-500 text-sm font-medium hover:text-white transition-colors"
          >
            &larr; ওয়েবসাইটে ফিরে যান
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
