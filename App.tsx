
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Products from './components/Products';
import About from './components/About';
import WhyUs from './components/WhyUs';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import ChatBot from './components/ChatBot';

const Footer: React.FC = () => (
  <footer className="bg-slate-900 pt-20 pb-10 text-slate-400">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 lg:col-span-1">
          <div className="flex items-center space-x-2 mb-6">
            <div className="bg-mitrafix-orange p-1 rounded-lg">
               <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-2xl font-extrabold text-white">Mitrafix</span>
          </div>
          <p className="text-sm leading-relaxed mb-6">
            "One place for all IT solutions to support your business growth". Partner terpercaya untuk efisiensi dan keamanan teknologi Anda.
          </p>
          <div className="flex gap-4">
            {['facebook', 'instagram', 'linkedin', 'twitter'].map(social => (
              <a key={social} href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-mitrafix-orange hover:text-white transition-all">
                <span className="sr-only">{social}</span>
                <div className="w-5 h-5 bg-slate-400 rounded-sm"></div>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h5 className="text-white font-bold mb-6">Layanan & Produk</h5>
          <ul className="space-y-4 text-sm">
            <li><a href="#services" className="hover:text-mitrafix-orange transition-colors">IT Maintenance Support</a></li>
            <li><a href="#products" className="hover:text-mitrafix-orange transition-colors">Katalog Printer & Tinta</a></li>
            <li><a href="#products" className="hover:text-mitrafix-orange transition-colors">Hardware PC & Laptop</a></li>
            <li><a href="#products" className="hover:text-mitrafix-orange transition-colors">Paket CCTV Murah</a></li>
            <li><a href="#products" className="hover:text-mitrafix-orange transition-colors">Aksesoris Jaringan</a></li>
          </ul>
        </div>

        <div>
          <h5 className="text-white font-bold mb-6">Perusahaan</h5>
          <ul className="space-y-4 text-sm">
            <li><a href="#about" className="hover:text-mitrafix-orange transition-colors">Tentang Kami</a></li>
            <li><a href="#why-us" className="hover:text-mitrafix-orange transition-colors">Keunggulan Kami</a></li>
            <li><a href="#" className="hover:text-mitrafix-orange transition-colors">Kebijakan Privasi</a></li>
            <li><a href="#" className="hover:text-mitrafix-orange transition-colors">Syarat & Ketentuan</a></li>
          </ul>
        </div>

        <div>
          <h5 className="text-white font-bold mb-6">Jam Operasional</h5>
          <ul className="space-y-4 text-sm">
            <li className="flex justify-between"><span>Senin - Jumat:</span> <span className="text-white">08:00 - 17:00</span></li>
            <li className="flex justify-between"><span>Sabtu:</span> <span className="text-white">08:00 - 15:00</span></li>
            <li className="flex justify-between"><span>Minggu:</span> <span className="text-white">Tutup (Layanan Emergency Ready)</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p>&copy; {new Date().getFullYear()} Mitrafix IT Solutions. All rights reserved.</p>
        <p>Made with ❤️ for IT Excellence in Indonesia</p>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Products />
      <WhyUs />
      <Testimonials />
      <Contact />
      <Footer />
      <ChatBot />
    </div>
  );
};

export default App;
