"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ChevronRight } from "lucide-react";
import axios from "axios";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await axios.get(
          "https://orbital-backend-9y6q.onrender.com/api/settings",
        );
        setSettings(data);
      } catch (error) {
        console.error("Error fetching settings for footer:", error);
      }
    };
    fetchSettings();
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-zinc-950 pt-20 pb-10 border-t border-zinc-900 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-orange-600/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6 relative">
              <Image
                src="/logo_1.png"
                alt="Orbital Net Logo"
                width={200}
                height={80}
                className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              />
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed mb-8 pr-4">
              টাঙ্গাইলের সেরা ফাইবার অপটিক ইন্টারনেট সার্ভিস প্রোভাইডার।
              নিরবচ্ছিন্ন কানেক্টিভিটি এবং এক্সট্রিম পারফরম্যান্সের প্রতিশ্রুতি
              নিয়ে আমরা আছি আপনার পাশে।
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {settings?.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              )}
              {settings?.whatsapp && (
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-rose-500 hover:border-rose-500 transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </a>
              )}
              {settings?.youtube && (
                <a
                  href={settings.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                  </svg>
                </a>
              )}
              <a
                href="https://github.com/shuvostack"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 hover:border-zinc-700 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {[
                { name: "Home", link: "/" },
                { name: "Packages", link: "/packages" },
                { name: "Hardware Shop", link: "/shop" },
                { name: "Get Connection", link: "/get-connection" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.link}
                    className="text-zinc-400 hover:text-orange-400 text-sm font-medium transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-3 h-3 text-zinc-700 group-hover:text-orange-400 transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">
              SUPPORT
            </h4>
            <ul className="space-y-4">
              {[
                "Help Center / FAQ",
                "Contact Us",
                "Privacy Policy",
                "Terms of Service",
                "Refund Policy",
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-rose-400 text-sm font-medium transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-3 h-3 text-zinc-700 group-hover:text-rose-400 transition-colors" />
                    {item}
                  </Link>
                </li>
              ))}

              {/* BTRC Approved Tariff Link */}
              <li>
                <a
                  href="/Orbital_Net.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="text-orange-400 hover:text-orange-300 text-sm font-bold transition-colors flex items-center gap-2 group mt-2"
                >
                  <ChevronRight className="w-3 h-3 text-orange-500 group-hover:translate-x-1 transition-transform" />
                  BTRC Approved Tariff
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">
              CONNECTIONS
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-zinc-400 text-sm leading-relaxed whitespace-pre-line">
                  {settings?.address ||
                    "আশেকপুর, টাঙ্গাইল সদর,\nটাঙ্গাইল, বাংলাদেশ।"}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                <a
                  href={`tel:${settings?.phone || "+8801717171081"}`}
                  className="text-zinc-400 hover:text-white text-sm font-medium transition-colors"
                >
                  {settings?.phone || "+880 1717171081"}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500 shrink-0" />
                <a
                  href={`mailto:${settings?.email || "info.orbitalnet@gmail.com"}`}
                  className="text-zinc-400 hover:text-white text-sm font-medium transition-colors"
                >
                  {settings?.email || "info.orbitalnet@gmail.com"}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Single Image Payment Strip */}
        <div className="pt-8 pb-4 flex flex-col xl:flex-row items-center justify-center gap-4 xl:gap-6 border-t border-zinc-800/80">
          <div className="flex items-center justify-center flex-1 w-full max-w-[1000px]">
            <img
              src="/ssl-commerze-2.jpg"
              alt="Payment Methods"
              className="w-full h-auto max-h-[40px] object-contain"
            />
          </div>
        </div>

        {/* Developer Credit */}
        <div className="pt-6 mt-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="bg-zinc-900/50 w-full py-4 px-6 rounded-xl border border-zinc-800 flex flex-col md:flex-row items-center justify-between">
            <p className="text-zinc-500 text-xs font-medium">
              © {currentYear} Orbital Net. All rights reserved.
            </p>
            <p className="text-zinc-500 text-xs font-medium mt-2 md:mt-0 flex items-center gap-1">
              Developed by
              <a
                href="https://github.com/shuvostack"
                target="_blank"
                rel="noreferrer"
                className="text-zinc-300 hover:text-orange-500 font-bold transition-colors ml-1"
              >
                Mehedi Hasan Shuvo
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
