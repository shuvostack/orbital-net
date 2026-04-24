'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, PackageOpen, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 
  
  const { addToCart } = useCartStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('প্রোডাক্ট লোড করতে সমস্যা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  const handleAddToCart = (product) => {

    addToCart({
      id: product._id,
      name: product.name,
      price: `৳${product.price.toLocaleString('en-IN')}`, 
      rawPrice: Number(product.price), 
      image: product.imageUrl,
    });
    
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'success',
      title: 'কার্টে যোগ করা হয়েছে!',
      showConfirmButton: false,
      timer: 1500,
      background: '#18181b', 
      color: '#f97316'     
    });
  };

  const categories = ['All', 'Networking', 'Security', 'Solar', 'Accessories', 'Others'];

  // Filter Logic
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-zinc-950 min-h-screen pb-24">
      
      <section className="relative pt-30 pb-16 overflow-hidden border-b border-zinc-900">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 tracking-tight">
              স্মার্ট ইন্টারনেট, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">স্মার্ট ডিভাইস</span>
            </h1>
            <p className="text-lg text-zinc-400 font-medium max-w-2xl mx-auto leading-relaxed">
              রাউটার থেকে শুরু করে অত্যাধুনিক সিসি ক্যামেরা এবং সোলার সিস্টেম— আপনার প্রয়োজনীয় সবকিছু পাচ্ছেন অরবিটাল স্টোরে।
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 sticky top-[80px] z-30 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.3)]'
                      : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:border-zinc-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="text"
                placeholder="প্রোডাক্ট খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-full pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-zinc-800 border-t-orange-500 rounded-full animate-spin mb-4"></div>
              <p className="text-zinc-500 font-medium">প্রোডাক্ট লোড হচ্ছে...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 bg-rose-500/5 border border-rose-500/20 rounded-3xl">
              <AlertCircle className="w-12 h-12 text-rose-500 mb-4" />
              <p className="text-rose-400 font-medium">{error}</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-zinc-900/40 border border-zinc-800 rounded-3xl">
              <PackageOpen className="w-16 h-16 text-zinc-600 mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">কোনো প্রোডাক্ট পাওয়া যায়নি</h3>
              <p className="text-zinc-500 text-sm">অন্য কোনো ক্যাটাগরি বা নাম লিখে সার্চ করুন।</p>
            </div>
          ) : (
            <>
              {/* Products List */}
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                  {currentProducts.map((product) => (
                    <motion.div
                      key={product._id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-5 hover:bg-zinc-800/80 transition-all duration-300 group flex flex-col h-full relative"
                    >
                      {/* Out of Stock Badge */}
                      {product.countInStock === 0 && (
                        <div className="absolute top-3 left-3 z-20 bg-zinc-950/80 backdrop-blur-sm border border-rose-500/50 text-rose-400 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                          Stock Out
                        </div>
                      )}

                      
                      <Link href={`/shop/${product._id}`} className="w-full h-48 bg-white rounded-2xl mb-5 flex items-center justify-center relative overflow-hidden group-hover:border-orange-500/30 transition-colors p-4 block">
                        <motion.img 
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                          src={product.imageUrl} 
                          alt={product.name}
                          className={`w-full h-full object-contain relative z-10 ${product.countInStock === 0 ? 'grayscale opacity-50' : ''}`}
                        />
                      </Link>

                      <div className="flex flex-col flex-grow">
                        <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                          {product.category}
                        </div>
                        
                        
                        <Link href={`/shop/${product._id}`} className="hover:text-orange-400 transition-colors">
                          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                            {product.name}
                          </h3>
                        </Link>
                        
                        <p className="text-zinc-400 text-sm mb-4 line-clamp-2" title={product.description}>
                          {product.description}
                        </p>
                      </div>

                      <div className="mt-auto pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                        <div>
                          <span className="text-zinc-500 text-sm">৳ </span>
                          <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">
                            {product.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                        
                        {/* Add to Cart Button */}
                        <button 
                          onClick={() => handleAddToCart(product)} 
                          disabled={product.countInStock === 0}
                          className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-300 group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-rose-500 group-hover:text-white transition-all shadow-lg group-hover:shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:group-hover:bg-zinc-800 disabled:group-hover:text-zinc-300"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-12 gap-2">
                  <button 
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => paginate(i + 1)}
                        className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${
                          currentPage === i + 1 
                          ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white border-transparent' 
                          : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </section>

    </div>
  );
}