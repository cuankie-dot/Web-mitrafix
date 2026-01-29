
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-white/80 backdrop-blur-md py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <a 
            href="#home" 
            onClick={(e) => scrollToSection(e, 'home')}
            className="flex items-center"
          >
            {!logoError ? (
              <img 
                src="https://715udgq2n1apqtj8.public.blob.vercel-storage.com/image/fav_ico/android-chrome-512x512.png" 
                alt="Mitrafix Logo" 
                className="h-16 md:h-20 w-auto object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className="text-2xl font-extrabold tracking-tight text-slate-900 ml-2">Mitrafix</span>
            )}
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={`#${link.href}`}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-sm font-bold text-slate-900 hover:text-mitrafix-orange transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://wa.me/6281999970857"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-mitrafix-orange text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all transform hover:-translate-y-0.5"
            >
              Konsultasi Gratis
            </a>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900" aria-label="Toggle Menu">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden absolute w-full bg-white shadow-xl transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 py-6' : 'max-h-0'}`}>
        <div className="flex flex-col items-center space-y-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={`#${link.href}`}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-slate-900 font-bold hover:text-mitrafix-orange transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/6281999970857"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-mitrafix-orange text-white px-8 py-3 rounded-full font-bold w-4/5 text-center"
          >
            WhatsApp Kami
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
