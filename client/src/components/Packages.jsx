"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShieldCheck, Loader2 } from "lucide-react";
import Link from "next/link";
import axios from "axios";

export default function Packages() {
  const [activeTab, setActiveTab] = useState("Broadband");
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch package from database
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data } = await axios.get(
          "https://orbital-backend-9y6q.onrender.com/api/packages",
        );
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  // category (type)
  const categories = [...new Set(packages.map((pkg) => pkg.type))];

  useEffect(() => {
    if (categories.length > 0 && !categories.includes(activeTab)) {
      setActiveTab(categories[0]);
    }
  }, [categories, activeTab]);

  const activePackages = packages.filter((pkg) => pkg.type === activeTab);

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Choose Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">
              Best Plan
            </span>
          </h2>

          {/* 💡 Dynamic Tabs Toggle */}
          <div className="inline-flex p-1.5 bg-zinc-900 border border-zinc-800 rounded-2xl mb-12 flex-wrap justify-center gap-2">
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg"
                    : "text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <AnimatePresence mode="wait">
              {activePackages.map((pkg, index) => (
                <motion.div
                  key={pkg._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`relative group p-8 rounded-[2.5rem] border transition-all duration-500 ${
                    pkg.popular
                      ? "bg-zinc-900 border-orange-500/50 scale-105 shadow-[0_20px_50px_rgba(249,115,22,0.15)] z-20"
                      : "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 z-10"
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-8">
                    <h3 className="text-zinc-400 font-bold uppercase tracking-widest text-xs mb-2">
                      {pkg.name}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-black text-white">
                        {pkg.speed.split(" ")[0]}
                      </span>
                      <span className="text-xl font-bold text-zinc-500 uppercase">
                        {pkg.speed.split(" ")[1] || "Mbps"}
                      </span>
                    </div>
                  </div>

                  <div className="mb-8 border-b border-zinc-800 pb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white">
                        ৳{pkg.price}
                      </span>
                      <span className="text-zinc-500 font-medium">
                        / Monthly
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-10">
                    {pkg.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-zinc-400 text-sm font-medium"
                      >
                        <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-orange-500" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/get-connection?package=${encodeURIComponent(pkg.name)}`}
                    className={`w-full flex items-center justify-center py-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-all duration-300 ${
                      pkg.popular
                        ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-1"
                        : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
                    }`}
                  >
                    Connect Now
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* 💡 BTRC Approved Tariff Button Section */}
        <div className="mt-20 flex flex-col items-center justify-center text-center">
          <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-zinc-800 to-zinc-900 border border-zinc-800 shadow-xl">
            <div className="bg-zinc-950 px-8 py-6 rounded-xl flex flex-col sm:flex-row items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
                </div>
                <div className="text-left">
                  <h4 className="text-white font-bold">BTRC Approved</h4>
                  <p className="text-zinc-500 text-xs mt-0.5">
                    100% Legal & Transparent Pricing
                  </p>
                </div>
              </div>

              <div className="w-px h-12 bg-zinc-800 hidden sm:block"></div>

              <a
                href="/Orbital_Net.pdf"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl font-bold text-sm bg-zinc-800 hover:bg-zinc-700 text-white transition-colors border border-zinc-700 flex items-center gap-2"
              >
                View Tariff PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
