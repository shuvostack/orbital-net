"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  ArrowLeft,
  ShieldCheck,
  Truck,
  RotateCcw,
  AlertCircle,
  Plus,
  Minus,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import Swal from "sweetalert2";
import axios from "axios";
import Link from "next/link";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCartStore();

  // fetch selected product from api
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `https://orbital-backend-9y6q.onrender.com/api/products/${id}`,
        );
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError("প্রোডাক্ট খুঁজে পাওয়া যায়নি অথবা সংযোগে সমস্যা হয়েছে।");
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product._id,
        name: product.name,
        price: `৳${product.price.toLocaleString("en-IN")}`,
        rawPrice: Number(product.price),
        image: product.imageUrl,
      });
    }

    Swal.fire({
      toast: true,
      position: "bottom-end",
      icon: "success",
      title: `${quantity}টি আইটেম কার্টে যোগ করা হয়েছে!`,
      showConfirmButton: false,
      timer: 2000,
      background: "#18181b",
      color: "#f97316",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-zinc-800 border-t-orange-500 rounded-full animate-spin mb-4"></div>
        <p className="text-zinc-500 font-medium">প্রোডাক্ট লোড হচ্ছে...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 text-center">
        <AlertCircle className="w-16 h-16 text-rose-500 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">দুঃখিত!</h2>
        <p className="text-zinc-400 mb-6">{error}</p>
        <Link
          href="/shop"
          className="px-6 py-3 bg-zinc-900 border border-zinc-800 text-white rounded-xl hover:bg-zinc-800 transition-colors"
        >
          শপে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 min-h-screen pb-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-rose-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 md:pt-32">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>শপে ফিরে যান</span>
        </button>

        {/* Product Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-zinc-900/40 border border-zinc-800/80 rounded-[2.5rem] p-8 md:p-12 relative group"
          >
            {product.countInStock === 0 && (
              <div className="absolute top-6 left-6 z-20 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full backdrop-blur-md">
                Out of Stock
              </div>
            )}

            <div className="aspect-square relative flex items-center justify-center">
              {/* Image Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-rose-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <img
                src={product.imageUrl}
                alt={product.name}
                className={`w-full h-full object-contain relative z-10 drop-shadow-2xl transition-transform duration-500 group-hover:scale-105 ${product.countInStock === 0 ? "grayscale opacity-70" : ""}`}
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-bold uppercase tracking-widest w-max mb-6">
              {product.category}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
              {product.name}
            </h1>

            <div className="flex items-end gap-3 mb-6">
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">
                ৳{product.price.toLocaleString("en-IN")}
              </span>
              <span className="text-zinc-500 font-medium mb-1 line-through">
                ৳{(product.price + product.price * 0.1).toLocaleString("en-IN")}
              </span>
            </div>

            <div className="prose prose-invert max-w-none mb-10">
              <p className="text-zinc-400 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Add to Cart Section */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 mb-8 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {/* Quantity Control */}
                <div className="flex items-center gap-4">
                  <span className="text-zinc-400 font-medium text-sm">
                    পরিমাণ:
                  </span>
                  <div className="flex items-center gap-3 bg-zinc-950 rounded-xl border border-zinc-800 p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={product.countInStock === 0}
                      className="p-2 text-zinc-400 hover:text-white disabled:opacity-50 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-white font-bold w-6 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(
                          Math.min(product.countInStock, quantity + 1),
                        )
                      }
                      disabled={
                        product.countInStock === 0 ||
                        quantity >= product.countInStock
                      }
                      className="p-2 text-zinc-400 hover:text-white disabled:opacity-50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="w-full sm:w-px sm:h-12 bg-zinc-800 hidden sm:block"></div>

                {/* Status */}
                <div>
                  <span className="text-zinc-400 font-medium text-sm block mb-1">
                    স্ট্যাটাস:
                  </span>
                  <span
                    className={`font-bold ${product.countInStock > 0 ? "text-emerald-400" : "text-rose-500"}`}
                  >
                    {product.countInStock > 0
                      ? `In Stock (${product.countInStock})`
                      : "Out of Stock"}
                  </span>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
                className="w-full mt-6 flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-8 py-4 rounded-xl font-black text-lg uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all shadow-[0_10px_20px_rgba(249,115,22,0.25)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none"
              >
                <ShoppingCart className="w-5 h-5" />
                কার্টে যোগ করুন
              </button>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 text-zinc-400 bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800/50">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                <span className="text-sm font-medium leading-tight">
                  100%
                  <br />
                  অরিজিনাল
                </span>
              </div>
              <div className="flex items-center gap-3 text-zinc-400 bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800/50">
                <Truck className="w-6 h-6 text-blue-400" />
                <span className="text-sm font-medium leading-tight">
                  দ্রুত
                  <br />
                  ডেলিভারি
                </span>
              </div>
              <div className="flex items-center gap-3 text-zinc-400 bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800/50">
                <RotateCcw className="w-6 h-6 text-purple-400" />
                <span className="text-sm font-medium leading-tight">
                  রিটার্ন
                  <br />
                  পলিসি
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
