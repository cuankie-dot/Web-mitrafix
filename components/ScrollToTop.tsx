
import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Calculate half of the total scrollable height
      const totalHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollableDistance = totalHeight - viewportHeight;
      
      // Show button only if user scrolled more than 50% of the total page height
      if (window.scrollY > totalHeight / 6) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    // Initial check in case page is already scrolled on load
    toggleVisibility();
    
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-28 right-8 z-[55] w-12 h-12 flex items-center justify-center rounded-full bg-slate-900 text-white shadow-2xl transition-all duration-500 transform hover:bg-mitrafix-orange hover:scale-110 active:scale-95 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      title="Kembali ke Atas"
      aria-label="Scroll back to top"
    >
      <ChevronUp className="w-6 h-6 transition-transform group-hover:-translate-y-1" />
      {/* Visual accent matching the brand */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-mitrafix-orange rounded-full border-2 border-slate-900" />
    </button>
  );
};

export default ScrollToTop;
