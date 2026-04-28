"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Server,
  CheckCircle2,
  ChevronRight,
  Home,
  Briefcase,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import axios from "axios";

export default function PackagesPage() {
  const [activeTab, setActiveTab] = useState("home");
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 💡 ডাটাবেস থেকে প্যাকেজগুলো আনা হচ্ছে
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data } = await axios.get(
          "https://orbital-backend-9y6q.onrender.com/api/packages",
        );
        setPackages(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching packages:", err);
        setError(
          "প্যাকেজ লোড করতে সমস্যা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।",
        );
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  // 💡 ডাটাবেসের type অনুযায়ী ফিল্টার করা হচ্ছে
  const homePackages = packages.filter((pkg) => pkg.type === "Broadband");
  const smePackages = packages.filter(
    (pkg) => pkg.type === "Corporate" || pkg.type === "Gaming",
  );

  const currentPackages = activeTab === "home" ? homePackages : smePackages;

  return (
    <div className="bg-zinc-950 min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative pt-28 pb-12 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 tracking-tight">
              সবার জন্য <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">
                পারফেক্ট ইন্টারনেট
              </span>
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed">
              আপনার বাসা কিংবা অফিসের জন্য বেছে নিন সবচেয়ে মানানসই প্যাকেজ।
              কোনো লুকায়িত চার্জ নেই, যখন ইচ্ছে আপগ্রেড করুন।
            </p>
          </motion.div>
        </div>
      </section>

      {/* Animated Tab Switcher */}
      <section className="pb-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="flex p-1.5 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-2xl relative shadow-xl overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab("home")}
              className={`relative z-10 flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 rounded-xl font-bold text-xs md:text-sm uppercase tracking-wider transition-colors duration-300 min-w-[150px] ${activeTab === "home" ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              <Home className="w-4 h-4" /> Home Internet
            </button>
            <button
              onClick={() => setActiveTab("sme")}
              className={`relative z-10 flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 rounded-xl font-bold text-xs md:text-sm uppercase tracking-wider transition-colors duration-300 min-w-[150px] ${activeTab === "sme" ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              <Briefcase className="w-4 h-4" /> SME Internet
            </button>
            <div
              className={`absolute top-1.5 bottom-1.5 w-[calc(50%-0.375rem)] bg-gradient-to-r from-orange-500 to-rose-500 rounded-xl transition-all duration-500 ease-out shadow-[0_0_20px_rgba(249,115,22,0.4)] ${activeTab === "home" ? "left-1.5" : "left-[calc(50%+0.375rem)]"}`}
            ></div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-zinc-800 border-t-orange-500 rounded-full animate-spin mb-4"></div>
              <p className="text-zinc-500 font-medium">প্যাকেজ লোড হচ্ছে...</p>
            </div>
          ) : error ? (
            /* Error State */
            <div className="flex flex-col items-center justify-center py-20 bg-rose-500/5 border border-rose-500/20 rounded-3xl">
              <AlertCircle className="w-12 h-12 text-rose-500 mb-4" />
              <p className="text-rose-400 font-medium">{error}</p>
            </div>
          ) : currentPackages.length === 0 ? (
            /* Empty State */
            <div className="text-center py-20 bg-zinc-900/40 border border-zinc-800 rounded-3xl">
              <h3 className="text-white font-bold text-lg mb-2">
                কোনো প্যাকেজ পাওয়া যায়নি
              </h3>
              <p className="text-zinc-500 text-sm">
                আপাতত এই ক্যাটাগরিতে কোনো প্যাকেজ নেই।
              </p>
            </div>
          ) : (
            /* Packages Grid */
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center"
              >
                {currentPackages.map((pkg) => (
                  <div
                    key={pkg._id}
                    className={`relative bg-zinc-900/40 rounded-[2.5rem] p-8 md:p-10 transition-all duration-300 hover:-translate-y-2 group ${pkg.popular ? "border-2 border-orange-500 shadow-[0_0_40px_rgba(249,115,22,0.15)] z-10 scale-[1.02]" : "border border-zinc-800 hover:border-zinc-700"}`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                        Most Popular
                      </div>
                    )}

                    <div className="text-center mb-8 border-b border-zinc-800 pb-8 relative">
                      <div className="absolute top-0 right-0 opacity-10">
                        {activeTab === "home" ? (
                          <Zap className="w-20 h-20 text-orange-500" />
                        ) : (
                          <Server className="w-20 h-20 text-orange-500" />
                        )}
                      </div>
                      <h3 className="text-zinc-400 font-bold uppercase tracking-widest text-sm mb-4">
                        {pkg.name}
                      </h3>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                          {pkg.speed}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-zinc-500 font-medium">৳</span>
                        <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">
                          {pkg.price}
                        </span>
                        <span className="text-zinc-500 font-medium">/ মাস</span>
                      </div>
                    </div>

                    <ul className="space-y-4 mb-10">
                      {pkg.features &&
                        pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2
                              className={`w-5 h-5 shrink-0 mt-0.5 ${pkg.popular ? "text-orange-500" : "text-zinc-600 group-hover:text-emerald-500 transition-colors"}`}
                            />
                            <span className="text-zinc-300 font-medium text-sm leading-relaxed">
                              {feature}
                            </span>
                          </li>
                        ))}
                    </ul>

                    <Link
                      href={`/get-connection?package=${encodeURIComponent(pkg.name)}`}
                      className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-black text-sm uppercase tracking-wider transition-all
                        ${pkg.popular ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg hover:shadow-orange-500/25 hover:scale-[1.02]" : "bg-zinc-800/50 text-white hover:bg-zinc-800"}
                      `}
                    >
                      প্যাকেজটি নিন
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </div>
  );
}
