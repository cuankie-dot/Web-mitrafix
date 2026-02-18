
import React, { useState } from 'react';
import { 
  ArrowRight, Zap, X, AlertCircle, Lightbulb, 
  TrendingUp, MessageCircle, Shield, Wrench, ChevronRight,
  Sparkles
} from 'lucide-react';
import { SERVICE_ICONS } from '../constants';
import { useData } from '../context/DataContext';
import { optimizeImage } from '../utils/imageOptimizer';
import { ServiceItem } from '../types';

const Services: React.FC = () => {
  const { services, isLoading, setIsChatOpen, setPendingChatMessage } = useData();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAskAI = (e: React.MouseEvent, serviceTitle: string) => {
    e.stopPropagation(); // Prevent opening the detail modal
    setIsChatOpen(true);
    setPendingChatMessage(`Halo MitraAI, saya ingin tahu lebih detail mengenai layanan "${serviceTitle}". Apa saja keunggulan dan prosedurnya?`);
  };

  if (isLoading) {
    return <section className="py-24 bg-white text-center">Loading services...</section>;
  }

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-mitrafix-orange font-bold tracking-widest uppercase text-sm mb-3">Layanan Kami</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Solusi Tepat Guna untuk Setiap <br className="hidden md:block" /> Tantangan IT Anda
          </h3>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Kami tidak hanya menjual produk, kami memberikan solusi yang mendukung efisiensi operasional dan keamanan bisnis Anda. Klik layanan untuk detail lengkap.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service) => {
            const IconComponent = SERVICE_ICONS[service.icon] || <Zap className="w-10 h-10" />;

            return (
              <div 
                key={service.id} 
                onClick={() => setSelectedService(service)}
                className="group cursor-pointer rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-mitrafix-orange/30 hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(143,217,251,0.25)] hover:-translate-y-3 hover:scale-[1.03] transition-all duration-500 ease-out flex flex-col h-full overflow-hidden"
              >
                {/* Image Header */}
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={optimizeImage(service.image, 800)} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-300" />
                  
                  {/* Quick AI Trigger Icon on Image */}
                  <button 
                    onClick={(e) => handleAskAI(e, service.title)}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2.5 rounded-xl text-mitrafix-orange shadow-lg hover:bg-mitrafix-orange hover:text-white transition-all transform hover:scale-110 active:scale-90 z-20"
                    title="Tanya AI tentang layanan ini"
                  >
                    <Sparkles className="w-5 h-5" />
                  </button>
                </div>

                {/* Content Container */}
                <div className="p-8 flex flex-col flex-grow relative">
                  {/* Floating Icon */}
                  <div className="absolute -top-10 left-8 bg-white w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-mitrafix-orange shadow-xl border border-slate-50 group-hover:bg-mitrafix-orange group-hover:text-white group-hover:rotate-6 transition-all duration-500">
                    {React.isValidElement(IconComponent) 
                      ? React.cloneElement(IconComponent as React.ReactElement<any>, { className: 'w-10 h-10' })
                      : <Zap className="w-10 h-10" />
                    }
                  </div>
                  
                  <div className="mt-8 mb-4">
                    <h4 className="text-xl font-bold text-slate-900 group-hover:text-mitrafix-orange transition-colors duration-300">
                      {service.title}
                    </h4>
                  </div>
                  
                  <div className="space-y-4 mb-8 flex-grow">
                    <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
                      {service.solution}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                       <button 
                        onClick={(e) => handleAskAI(e, service.title)}
                        className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-mitrafix-orange transition-colors"
                       >
                         <MessageCircle className="w-3.5 h-3.5" /> Tanya AI
                       </button>
                       <div className="text-mitrafix-orange flex items-center gap-1 text-xs font-bold group-hover:gap-2 transition-all">
                         Detail <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* B2B Callout */}
        <div className="mt-20 bg-slate-900 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group/callout">
          <div className="absolute top-0 right-0 w-64 h-64 bg-mitrafix-orange opacity-10 rounded-full -mr-20 -mt-20 blur-3xl group-hover/callout:scale-150 transition-transform duration-1000" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">Punya Kebutuhan Corporate Skala Besar?</h4>
              <p className="text-slate-400">Kami siap menangani kontrak maintenance dan pengadaan infrastruktur B2B dengan harga kompetitif.</p>
            </div>
            <a 
              href="#contact"
              onClick={scrollToContact}
              className="bg-white text-slate-900 px-10 py-4 rounded-full font-bold shadow-lg hover:bg-mitrafix-orange hover:text-white hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              Hubungi Tim Enterprise
            </a>
          </div>
        </div>
      </div>

      {/* Service Detail Modal (Keep as is, already highly interactive) */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedService(null)}
          />
          <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh]">
            <div className="bg-slate-900 p-6 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-mitrafix-orange p-2 rounded-xl">
                  {React.isValidElement(SERVICE_ICONS[selectedService.icon]) 
                    ? React.cloneElement(SERVICE_ICONS[selectedService.icon] as React.ReactElement<any>, { className: 'w-5 h-5 text-white' })
                    : <Zap className="w-5 h-5 text-white" />
                  }
                </div>
                <div>
                  <p className="font-bold text-lg leading-tight">Detail Layanan</p>
                  <p className="text-slate-400 text-xs">Informasi lengkap solusi Mitrafix</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedService(null)} 
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto">
              <div className="bg-white border-2 border-slate-100 rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50 mb-8">
                <div className="h-48 relative">
                  <img 
                    src={optimizeImage(selectedService.image, 800)} 
                    alt={selectedService.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent flex items-end p-6">
                    <h4 className="text-white text-xl font-black uppercase tracking-tight">{selectedService.title}</h4>
                  </div>
                  <button 
                    onClick={(e) => handleAskAI(e, selectedService.title)}
                    className="absolute top-6 right-6 bg-white p-3 rounded-2xl text-mitrafix-orange shadow-2xl hover:scale-110 transition-transform"
                    title="Tanya AI tentang layanan ini"
                  >
                    <Sparkles className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-500">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Masalah Umum</p>
                      <p className="text-sm text-slate-600 italic leading-relaxed">"{selectedService.problem}"</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center text-mitrafix-orange">
                      <Lightbulb className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Solusi Mitrafix</p>
                      <p className="text-sm text-slate-700 font-medium leading-relaxed">{selectedService.solution}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Manfaat Bagi Anda</p>
                      <p className="text-sm font-bold text-slate-900">{selectedService.benefit}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href={`https://wa.me/6281999370857?text=Halo%20Mitrafix,%20saya%20tertarik%20ingin%20tanya%20lebih%20lanjut%20layanan%20*${encodeURIComponent(selectedService.title)}*.%0A%0AMasalah%20saya:%20${encodeURIComponent(selectedService.problem)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-mitrafix-orange text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-sky-400/30 hover:bg-sky-400 transition-all"
                >
                  <MessageCircle className="w-5 h-5" /> Minta Penawaran Sekarang
                </a>
                <button 
                  onClick={() => setSelectedService(null)}
                  className="flex items-center justify-center gap-2 bg-slate-100 text-slate-600 px-8 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                >
                  Tutup
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-6 opacity-40">
                <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <Shield className="w-3.5 h-3.5" /> Bergaransi
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <Wrench className="w-3.5 h-3.5" /> Teknisi Ahli
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
