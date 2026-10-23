
import React, { useState } from 'react';
import { ShoppingCart, ExternalLink, Zap, MessageCircle, Search, PackageX, CheckCircle, AlertTriangle, Clock, XCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import { optimizeImage } from '../utils/imageOptimizer';
import { Product } from '../types';

const categories = [
  { id: 'all', label: 'Semua Produk' },
  { id: 'printer', label: 'Printer' },
  { id: 'hardware', label: 'Hardware' },
  { id: 'cctv', label: 'CCTV' },
  { id: 'network', label: 'Network' },
  { id: 'accessories', label: 'Aksesoris' }
];

const AvailabilityBadge: React.FC<{ status?: Product['availability'] }> = ({ status }) => {
  switch (status) {
    case 'ready':
      return (
        <div className="flex items-center gap-1.5 bg-green-50 dark:bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-green-100 dark:border-green-500/20 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Stok Tersedia
        </div>
      );
    case 'limited':
      return (
        <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-amber-100 dark:border-amber-500/20 shadow-sm">
          <AlertTriangle className="w-3 h-3" />
          Stok Terbatas
        </div>
      );
    case 'oos':
      return (
        <div className="flex items-center gap-1.5 bg-red-50 dark:bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-red-100 dark:border-red-500/20 shadow-sm grayscale opacity-70">
          <XCircle className="w-3 h-3" />
          Stok Habis
        </div>
      );
    case 'preorder':
      return (
        <div className="flex items-center gap-1.5 bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-300 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-sky-100 dark:border-sky-500/20 shadow-sm">
          <Clock className="w-3 h-3" />
          Pre-order
        </div>
      );
    default:
      return null;
  }
};

const ProductImage: React.FC<{ src?: string; alt: string; className?: string }> = ({ src, alt, className = '' }) => {
  const [failed, setFailed] = useState(false);
  const hasImage = Boolean(src && src.trim()) && !failed;

  if (!hasImage) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 text-slate-400 dark:text-slate-500">
        <PackageX className="w-14 h-14" strokeWidth={1.5} />
        <span className="text-[10px] font-bold uppercase tracking-widest">Gambar belum tersedia</span>
      </div>
    );
  }

  return (
    <img
      src={optimizeImage(src as string, 800)}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      fetchPriority="low"
      onError={() => setFailed(true)}
    />
  );
};

const Products: React.FC = () => {
  const { products, isLoading } = useData();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Logika Filter Ganda: Kategori AND Search Query
  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(query) || 
                          p.description.toLowerCase().includes(query);
    
    return matchesCategory && matchesSearch;
  });

  if (isLoading) {
    return <section className="py-24 bg-slate-50 dark:bg-slate-950 text-center">Loading products...</section>;
  }

  return (
    <section id="products" className="py-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-mitrafix-orange font-bold tracking-widest uppercase text-sm mb-3">Katalog Produk IT</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Perangkat IT <span className="text-mitrafix-orange">Terbaik</span> Original & Bergaransi
          </h3>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Kami hanya menyediakan produk IT orisinal mulai dari Printer, PC Business, hingga sistem CCTV dengan garansi resmi.
          </p>
        </div>

        {/* Search Bar Section */}
        <div className="max-w-md mx-auto mb-8 relative">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-mitrafix-orange transition-colors" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl leading-5 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-mitrafix-orange focus:border-transparent transition-all shadow-sm"
              placeholder="Cari nama produk (misal: Epson, CCTV, Kabel)..."
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border-2 ${
                activeCategory === cat.id 
                  ? 'bg-mitrafix-orange border-mitrafix-orange text-slate-900 shadow-lg shadow-sky-400/20' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-mitrafix-orange hover:text-mitrafix-orange'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className={`bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-slate-200 dark:hover:shadow-black/40 transition-all duration-300 group flex flex-col ${product.availability === 'oos' ? 'opacity-80' : ''}`}
              >
                {/* Image Container */}
                <div className={`relative h-64 overflow-hidden border-b border-slate-50 dark:border-slate-800 p-6 flex items-center justify-center ${product.image ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-900/60'}`}>
                  <ProductImage
                    src={product.image}
                    alt={`${product.name} - Jual & Service di Mitrafix Jakarta`}
                    className={`w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 ${product.availability === 'oos' ? 'grayscale' : ''}`}
                  />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isPopular && (
                      <div className="bg-slate-900 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider shadow-md w-fit">
                        <Zap className="w-3 h-3 fill-mitrafix-orange text-mitrafix-orange" />
                        Terlaris
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-2 rounded-xl text-slate-900 dark:text-white shadow-sm border border-slate-100 dark:border-slate-800">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-mitrafix-orange uppercase tracking-widest">{product.category}</span>
                    <AvailabilityBadge status={product.availability} />
                  </div>
                  
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-tight group-hover:text-mitrafix-orange transition-colors mb-2">
                    {product.name}
                  </h4>
                  
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-6 flex-grow">
                    {product.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-50 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estimasi Harga</p>
                        <p className={`text-xl font-extrabold ${product.availability === 'oos' ? 'text-slate-400' : 'text-slate-900 dark:text-white'}`}>{product.price}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      {product.tokopediaUrl && (
                        <a 
                          href={product.tokopediaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col items-center justify-center gap-1 bg-[#42B549] text-white p-2 rounded-xl hover:bg-[#389e3f] transition-all shadow-sm"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span className="text-[8px] font-bold">TOKOPEDIA</span>
                        </a>
                      )}
                      
                      {product.shopeeUrl && (
                        <a 
                          href={product.shopeeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col items-center justify-center gap-1 bg-[#EE4D2D] text-white p-2 rounded-xl hover:bg-[#d14327] transition-all shadow-sm"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span className="text-[8px] font-bold">SHOPEE</span>
                        </a>
                      )}
                      
                      <a 
                        href={`https://wa.me/6281999370857?text=Halo%20Mitrafix,%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(product.name)}%20(${product.availability === 'oos' ? 'Tanya Stok Baru' : 'Cek Ketersediaan'}).`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center gap-1 bg-slate-900 text-white p-2 rounded-xl hover:bg-mitrafix-orange hover:text-slate-900 transition-all shadow-sm"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-[8px] font-bold">WHATSAPP</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full mb-4">
              <PackageX className="w-12 h-12 text-slate-400" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Produk Tidak Ditemukan</h4>
            <p className="text-slate-500 dark:text-slate-400 max-w-md">
              Maaf, kami tidak menemukan produk dengan kata kunci "<span className="font-semibold text-slate-700 dark:text-slate-300">{searchQuery}</span>" di kategori ini.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="mt-6 text-mitrafix-orange font-bold hover:underline"
            >
              Lihat Semua Produk
            </button>
          </div>
        )}

        {/* Custom Order Callout */}
        <div className="mt-16 bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-dashed border-slate-300 dark:border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="bg-sky-50 dark:bg-sky-500/10 p-4 rounded-2xl text-mitrafix-orange">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <div>
              <h5 className="font-bold text-slate-900 dark:text-white text-lg">Cari Produk IT Spesifik?</h5>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Kami melayani pengadaan unit khusus (B2B) untuk kebutuhan kantor atau instansi Anda.</p>
            </div>
          </div>
          <a 
            href="https://wa.me/6281999370857?text=Halo%20Mitrafix,%20saya%20ingin%20tanya%20ketersediaan%20produk%20IT%20spesifik."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 dark:shadow-black/40 cursor-pointer"
            aria-label="Tanya Stok Produk IT via WhatsApp"
          >
            Tanya Ketersediaan Produk
          </a>
        </div>
      </div>
    </section>
  );
};

export default Products;
