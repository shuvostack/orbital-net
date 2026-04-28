"use client";

import { useState, useEffect } from "react";
import {
  ShoppingCart,
  Search,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  Package,
} from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuthStore } from "@/store/authStore";

export default function AdminOrdersPage() {
  const { token } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const fetchOrders = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get(
        "https://orbital-backend-9y6q.onrender.com/api/orders",
        config,
      );
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(
        `https://orbital-backend-9y6q.onrender.com/api/orders/${id}/status`,
        { status: newStatus },
        config,
      );
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "স্ট্যাটাস আপডেট হয়েছে",
        showConfirmButton: false,
        timer: 1500,
        background: "#18181b",
        color: "#fff",
      });
      fetchOrders();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "সমস্যা হয়েছে",
        background: "#18181b",
        color: "#fff",
      });
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "ডিলিট করলে এই অর্ডারটি মুছে যাবে!",
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
            `https://orbital-backend-9y6q.onrender.com/api/orders/${id}`,
            config,
          );
          Swal.fire({
            icon: "success",
            title: "ডিলিট হয়েছে!",
            background: "#18181b",
            color: "#fff",
          });
          fetchOrders();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "সমস্যা হয়েছে",
            background: "#18181b",
            color: "#fff",
          });
        }
      }
    });
  };

  // ফিল্টার লজিক
  const filteredOrders = orders.filter((order) => {
    // 💡 সেফটি চেক: ডাটাবেসে নাম বা ফোন নাম্বার না থাকলে অ্যাপ যেন ক্র্যাশ না করে
    const safeName = order.customerName || "";
    const safePhone = order.phone || ""; // 💡 customerPhone এর বদলে শুধু phone হবে

    const matchesSearch =
      safeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      safePhone.includes(searchTerm);

    const matchesStatus =
      filterStatus === "All" || order.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return (
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold flex items-center gap-1 w-max">
            <CheckCircle className="w-3 h-3" /> Completed
          </span>
        );
      case "Processing":
        return (
          <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold flex items-center gap-1 w-max">
            <Package className="w-3 h-3" /> Processing
          </span>
        );
      case "Cancelled":
        return (
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full text-xs font-bold flex items-center gap-1 w-max">
            <XCircle className="w-3 h-3" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-full text-xs font-bold flex items-center gap-1 w-max">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <ShoppingCart className="text-orange-500" /> Order Management
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            সব অর্ডার এবং কানেকশন রিকোয়েস্ট ম্যানেজ করুন
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            placeholder="নাম বা ফোন নাম্বার দিয়ে খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-orange-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-zinc-900/50 border border-zinc-800 text-white rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500"
        >
          <option value="All">সব স্ট্যাটাস</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="bg-zinc-900/40 rounded-3xl border border-zinc-800 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-zinc-800 border-t-orange-500 rounded-full animate-spin"></div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-12 text-zinc-500">
            কোনো অর্ডার পাওয়া যায়নি।
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-950/50 text-zinc-400 text-xs uppercase tracking-wider">
                  <th className="p-5 font-bold">Customer</th>
                  <th className="p-5 font-bold">Item / Type</th>
                  <th className="p-5 font-bold">Date</th>
                  <th className="p-5 font-bold">Status</th>
                  <th className="p-5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {filteredOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-zinc-800/30 transition-colors"
                  >
                    <td className="p-5">
                      <p className="text-white font-bold">
                        {order.customerName}
                      </p>
                      <p className="text-zinc-500 text-sm">
                        {order.customerPhone}
                      </p>
                      <p
                        className="text-zinc-600 text-xs mt-1 max-w-[200px] truncate"
                        title={order.address}
                      >
                        {order.address}
                      </p>
                    </td>
                    <td className="p-5">
                      <p className="text-orange-400 font-bold">
                        {order.itemName}
                      </p>
                      <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-[10px] uppercase">
                        {order.orderType}
                      </span>
                    </td>
                    <td className="p-5 text-sm text-zinc-400">
                      {new Date(order.createdAt).toLocaleDateString("bn-BD")}
                    </td>
                    <td className="p-5">{getStatusBadge(order.status)}</td>
                    <td className="p-5 text-right">
                      <div className="flex justify-end items-center gap-3">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                          className="bg-zinc-950 border border-zinc-700 text-white text-xs rounded-lg px-2 py-1.5 focus:outline-none"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <button
                          onClick={() => handleDelete(order._id)}
                          className="p-1.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
