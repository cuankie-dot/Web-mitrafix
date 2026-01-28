
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SERVICES, SERVICE_ICONS } from '../constants';

const Services: React.FC = () => {
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-mitrafix-orange font-bold tracking-widest uppercase text-sm mb-3">Layanan Kami</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Solusi Tepat Guna untuk Setiap <br className="hidden md:block" /> Tantangan IT Anda
          </h3>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Kami tidak hanya menjual produk, kami memberikan solusi yang mendukung efisiensi operasional dan keamanan bisnis Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div 
              key={service.id} 
              className="group rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col h-full overflow-hidden"
            >
              {/* Image Header */}
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-300" />
              </div>

              {/* Content Container */}
              <div className="p-8 flex flex-col flex-grow relative">
                {/* Floating Icon */}
                <div className="absolute -top-10 left-8 bg-white w-20 h-20 rounded-2xl flex items-center justify-center text-mitrafix-orange shadow-lg group-hover:bg-mitrafix-orange group-hover:text-white transition-colors duration-300">
                   {/* Clone element to slightly increase icon size inside this larger container if needed, or keep standard */}
                   {React.cloneElement(SERVICE_ICONS[service.icon] as React.ReactElement<any>, { className: 'w-10 h-10' })}
                </div>
                
                <div className="mt-8 mb-4">
                  <h4 className="text-xl font-bold text-slate-900 group-hover:text-mitrafix-orange transition-colors">
                    {service.title}
                  </h4>
                </div>
                
                <div className="space-y-4 mb-8 flex-grow">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Masalah</p>
                    <p className="text-sm text-slate-500 italic">"{service.problem}"</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-mitrafix-orange uppercase tracking-wider mb-1">Solusi Mitrafix</p>
                    <p className="text-sm text-slate-700 leading-relaxed">{service.solution}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200">
                  <p className="text-sm font-bold text-slate-900 mb-4">
                    <span className="text-green-600">Benefit:</span> {service.benefit}
                  </p>
                  <a 
                    href={`https://wa.me/6281999970857?text=Halo%20Mitrafix,%20saya%20tertarik%20dengan%20layanan%20${encodeURIComponent(service.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-mitrafix-orange hover:gap-3 transition-all"
                  >
                    Minta Penawaran Sekarang <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* B2B Callout */}
        <div className="mt-20 bg-slate-900 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-mitrafix-orange opacity-10 rounded-full -mr-20 -mt-20 blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">Punya Kebutuhan Corporate Skala Besar?</h4>
              <p className="text-slate-400">Kami siap menangani kontrak maintenance dan pengadaan infrastruktur B2B dengan harga kompetitif.</p>
            </div>
            <a 
              href="#contact"
              onClick={scrollToContact}
              className="bg-white text-slate-900 px-10 py-4 rounded-full font-bold shadow-lg hover:bg-slate-100 transition-all whitespace-nowrap cursor-pointer"
            >
              Hubungi Tim Enterprise
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
