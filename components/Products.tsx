
import React, { useState } from 'react';
import { ShoppingCart, ExternalLink, Zap, MessageCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

const categories = [
  { id: 'all', label: 'Semua Produk' },
  { id: 'printer', label: 'Printer' },
  { id: 'hardware', label: 'Hardware' },
  { id: 'cctv', label: 'CCTV' },
  { id: 'accessories', label: 'Aksesoris' }
];

const Products: React.FC = () => {
  const { products, isLoading } = useData();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  if (isLoading) {
    return <section className="py-24 bg-slate-50 text-center">Loading products...</section>;
  }

  return (
    <section id="products" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-mitrafix-orange font-bold tracking-widest uppercase text-sm mb-3">Katalog Produk IT</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Perangkat IT <span className="text-mitrafix-orange">Terbaik</span> Original & Bergaransi
          </h3>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Kami hanya menyediakan produk IT orisinal mulai dari Printer, PC Business, hingga sistem CCTV dengan garansi resmi.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border-2 ${
                activeCategory === cat.id 
                  ? 'bg-mitrafix-orange border-mitrafix-orange text-white shadow-lg shadow-orange-500/20' 
                  : 'bg-white border-slate-200 text-slate-600 hover:border-mitrafix-orange hover:text-mitrafix-orange'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-300 group flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <img 
                  src={product.image} 
                  alt={`${product.name} - Jual & Service di Mitrafix Jakarta`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {product.isPopular && (
                  <div className="absolute top-4 left-4 bg-mitrafix-orange text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider">
                    <Zap className="w-3 h-3 fill-current" />
                    Terlaris
                  </div>
                )}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/90 backdrop-blur-sm p-2 rounded-xl text-slate-900">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-2">
                  <span className="text-[10px] font-bold text-mitrafix-orange uppercase tracking-widest">{product.category}</span>
                  <h4 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-mitrafix-orange transition-colors">
                    {product.name}
                  </h4>
                </div>
                
                <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-grow">
                  {product.description}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-50">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Mulai Dari</p>
                      <p className="text-lg font-extrabold text-slate-900">{product.price}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {/* Tokopedia Button */}
                    {product.tokopediaUrl && (
                      <a 
                        href={product.tokopediaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center gap-1 bg-[#42B549] text-white p-2 rounded-xl hover:bg-[#389e3f] transition-all shadow-sm"
                        title={`Beli ${product.name} di Tokopedia`}
                        aria-label={`Beli ${product.name} di Tokopedia`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span className="text-[8px] font-bold">TOKOPEDIA</span>
                      </a>
                    )}
                    
                    {/* Shopee Button */}
                    {product.shopeeUrl && (
                      <a 
                        href={product.shopeeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center gap-1 bg-[#EE4D2D] text-white p-2 rounded-xl hover:bg-[#d14327] transition-all shadow-sm"
                        title={`Beli ${product.name} di Shopee`}
                        aria-label={`Beli ${product.name} di Shopee`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span className="text-[8px] font-bold">SHOPEE</span>
                      </a>
                    )}
                    
                    {/* WhatsApp Button */}
                    <a 
                      href={`https://wa.me/6281999970857?text=Halo%20Mitrafix,%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(product.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center gap-1 bg-slate-900 text-white p-2 rounded-xl hover:bg-mitrafix-orange transition-all shadow-sm"
                      title="Tanya via WhatsApp"
                      aria-label="Konsultasi Produk via WhatsApp"
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

        {/* Custom Order Callout */}
        <div className="mt-16 bg-white p-8 rounded-[2rem] border border-dashed border-slate-300 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="bg-orange-50 p-4 rounded-2xl text-mitrafix-orange">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <div>
              <h5 className="font-bold text-slate-900 text-lg">Cari Produk IT Spesifik?</h5>
              <p className="text-slate-500 text-sm">Kami melayani pengadaan unit khusus (B2B) untuk kebutuhan kantor atau instansi Anda.</p>
            </div>
          </div>
          <a 
            href="https://wa.me/6281999970857?text=Halo%20Mitrafix,%20saya%20ingin%20tanya%20ketersediaan%20produk%20IT%20spesifik."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 cursor-pointer"
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
