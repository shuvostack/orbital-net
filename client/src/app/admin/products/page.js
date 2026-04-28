"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Package,
  Search,
  Image as ImageIcon,
  UploadCloud,
} from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuthStore } from "@/store/authStore";

export default function AdminProductsPage() {
  const { token } = useAuthStore();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Router",
    countInStock: "",
    description: "",
    imageUrl: "",
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://orbital-backend-9y6q.onrender.com/api/products",
      );
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageData = new FormData();
    imageData.append("image", file);

    try {
      setUploadingImage(true);
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=40c78111c3ae7df9ae88ee7a36a788d3`,
        imageData,
      );

      setFormData({ ...formData, imageUrl: data.data.display_url });

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "ইমেজ আপলোড হয়েছে!",
        showConfirmButton: false,
        timer: 1500,
        background: "#18181b",
        color: "#fff",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ইমেজ আপলোড ফেইল করেছে!",
        background: "#18181b",
        color: "#fff",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingId(product._id);
      setFormData({
        name: product.name,
        price: product.price,
        category: product.category,
        countInStock: product.countInStock,
        description: product.description,
        imageUrl: product.imageUrl,
      });
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        price: "",
        category: "Router",
        countInStock: "",
        description: "",
        imageUrl: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      if (editingId) {
        await axios.put(
          `https://orbital-backend-9y6q.onrender.com/api/products/${editingId}`,
          formData,
          config,
        );
        Swal.fire({
          icon: "success",
          title: "আপডেট সফল!",
          background: "#18181b",
          color: "#fff",
          confirmButtonColor: "#f97316",
        });
      } else {
        await axios.post(
          "https://orbital-backend-9y6q.onrender.com/api/products",
          formData,
          config,
        );
        Swal.fire({
          icon: "success",
          title: "প্রোডাক্ট অ্যাড হয়েছে!",
          background: "#18181b",
          color: "#fff",
          confirmButtonColor: "#10b981",
        });
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "সমস্যা হয়েছে!",
        text: error.response?.data?.message || "Something went wrong",
        background: "#18181b",
        color: "#fff",
      });
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "ডিলিট করলে এই প্রোডাক্ট আর ফেরত পাওয়া যাবে না!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3f3f46",
      confirmButtonText: "হ্যাঁ, ডিলিট করুন!",
      background: "#18181b",
      color: "#fff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const config = { headers: { Authorization: `Bearer ${token}` } };
          await axios.delete(
            `https://orbital-backend-9y6q.onrender.com/api/products/${id}`,
            config,
          );
          Swal.fire({
            icon: "success",
            title: "ডিলিট হয়েছে!",
            background: "#18181b",
            color: "#fff",
            confirmButtonColor: "#f97316",
          });
          fetchProducts();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "সমস্যা হয়েছে!",
            background: "#18181b",
            color: "#fff",
          });
        }
      }
    });
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Package className="text-orange-500" /> Shop Products
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            আপনার স্টোরের সব প্রোডাক্ট ম্যানেজ করুন
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all shadow-lg shadow-orange-500/25"
        >
          <Plus className="w-5 h-5" /> Add New Product
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
        <input
          type="text"
          placeholder="প্রোডাক্ট খুঁজুন..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-orange-500 transition-colors"
        />
      </div>

      {/* Products Table */}
      <div className="bg-zinc-900/40 rounded-3xl border border-zinc-800 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-zinc-800 border-t-orange-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-950/50 text-zinc-400 text-xs uppercase tracking-wider">
                  <th className="p-5 font-bold">Image</th>
                  <th className="p-5 font-bold">Name</th>
                  <th className="p-5 font-bold">Category</th>
                  <th className="p-5 font-bold">Price</th>
                  <th className="p-5 font-bold">Stock</th>
                  <th className="p-5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {filteredProducts.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-zinc-800/30 transition-colors group"
                  >
                    <td className="p-5">
                      <div className="w-12 h-12 rounded-xl bg-zinc-800 overflow-hidden border border-zinc-700 flex items-center justify-center">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-zinc-500" />
                        )}
                      </div>
                    </td>
                    <td className="p-5 font-bold text-white">{product.name}</td>
                    <td className="p-5">
                      <span className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-xs font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="p-5 font-black text-orange-400">
                      ৳{product.price}
                    </td>
                    <td className="p-5">
                      <span
                        className={`font-bold ${product.countInStock > 0 ? "text-emerald-400" : "text-rose-400"}`}
                      >
                        {product.countInStock > 0
                          ? `${product.countInStock} in stock`
                          : "Out of Stock"}
                      </span>
                    </td>
                    <td className="p-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openModal(product)}
                          className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredProducts.length === 0 && (
              <div className="text-center py-12 text-zinc-500">
                কোনো প্রোডাক্ট পাওয়া যায়নি।
              </div>
            )}
          </div>
        )}
      </div>

      {/* 💡 BULLETPROOF CSS MODAL (Fixed Position Approach) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Content - Force Max Height on the Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-zinc-950 border border-zinc-800 rounded-3xl w-full max-w-2xl relative z-10 shadow-2xl"
              style={{
                maxHeight: "90vh",
                display: "flex",
                flexDirection: "column",
              }} // Inline CSS for strict enforcement
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-zinc-800 shrink-0">
                <h2 className="text-xl font-bold text-white">
                  {editingId
                    ? "প্রোডাক্ট এডিট করুন"
                    : "নতুন প্রোডাক্ট যোগ করুন"}
                </h2>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Body (Form Elements Only) - This must scroll */}
              <div
                className="p-6 space-y-6 custom-scrollbar"
                style={{ overflowY: "auto", flexGrow: 1 }} // Inline CSS to guarantee scrolling
              >
                {/* Image Upload */}
                <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-zinc-800 rounded-2xl bg-zinc-900/50 hover:border-orange-500/50 transition-colors relative group">
                  {formData.imageUrl ? (
                    <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-zinc-700">
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, imageUrl: "" })
                        }
                        className="absolute top-1 right-1 bg-black/50 p-1 rounded-md text-white hover:bg-rose-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <UploadCloud className="w-10 h-10 text-zinc-500 mb-2 group-hover:text-orange-500 transition-colors" />
                      <p className="text-sm font-bold text-zinc-400 group-hover:text-white">
                        এখানে ক্লিক করে ছবি আপলোড করুন
                      </p>
                      <p className="text-xs text-zinc-600 mt-1">
                        PNG, JPG up to 5MB
                      </p>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-wait"
                  />
                  {uploadingImage && (
                    <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                      <div className="w-8 h-8 border-4 border-zinc-800 border-t-orange-500 rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>

                {/* Grid Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 text-xs font-bold uppercase mb-2">
                      প্রোডাক্টের নাম
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 text-xs font-bold uppercase mb-2">
                      ক্যাটাগরি
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500"
                    >
                      <option value="Router">Router</option>
                      <option value="ONU">ONU / Media Converter</option>
                      <option value="Cable">Cable & Accessories</option>
                      <option value="Networking">Networking</option>
                      <option value="Security">Security</option>
                      <option value="Solar">Solar</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-zinc-400 text-xs font-bold uppercase mb-2">
                      দাম (টাকা)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 text-xs font-bold uppercase mb-2">
                      স্টক (পিস)
                    </label>
                    <input
                      type="number"
                      name="countInStock"
                      value={formData.countInStock}
                      onChange={handleChange}
                      required
                      className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-zinc-400 text-xs font-bold uppercase mb-2">
                    ডেসক্রিপশন
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500"
                  ></textarea>
                </div>
              </div>

              {/* Footer - Fixed */}
              <div className="p-6 border-t border-zinc-800 shrink-0 bg-zinc-950 rounded-b-3xl">
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 rounded-xl font-bold text-zinc-400 hover:bg-zinc-900 transition-colors"
                  >
                    বাতিল
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={uploadingImage}
                    className="px-6 py-3 rounded-xl font-bold bg-orange-500 text-white hover:bg-orange-600 transition-colors disabled:opacity-50"
                  >
                    {editingId ? "আপডেট করুন" : "অ্যাড করুন"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
