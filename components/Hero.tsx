
import React from 'react';
import { ChevronRight, ShieldCheck, Zap, Globe } from 'lucide-react';
import { SERVICE_ICONS } from '../constants';
import { useData } from '../context/DataContext';
import { optimizeImage } from '../utils/imageOptimizer';

const Hero: React.FC = () => {
  const { services, partners } = useData();

  // Menduplikasi array partners untuk menciptakan efek loop infinite
  const sliderPartners = [...partners, ...partners];

  const scrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative pt-32 pb-16 lg:pt-48 lg:pb-20 overflow-hidden" aria-label="Beranda Mitrafix">
      {/* Styles for animation */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Background Decor */}
      <div className="absolute top-0 left-0 h-full w-full -z-10 bg-baby-blue/50" />
      <div className="absolute top-[-10%] right-[-5%] h-[400px] w-[400px] -z-10 rounded-full bg-mitrafix-orange/10 blur-3xl" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col items-center gap-12 lg:flex-row">
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-6 inline-flex items-center space-x-2 rounded-full bg-sky-100 px-4 py-1.5 text-sm font-bold text-sky-600">
              <Zap className="h-4 w-4" />
              <span>Partner IT Terpercaya</span>
            </div>
            
            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">
              Jasa IT & <span className="text-mitrafix-orange">Service Printer Jakarta</span> Bergaransi
            </h1>
            
            <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-600 lg:mx-0">
              Mitrafix hadir sebagai solusi IT satu pintu (One-Stop Solution) untuk kebutuhan printer, CCTV, jaringan, dan maintenance kantor di wilayah Jagakarsa dan sekitarnya.
              <span className="font-semibold text-slate-900 block mt-2"> Cepat, Profesional, dan Berorientasi Hasil.</span>
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <a 
                href="https://wa.me/6281999370857?text=Halo%20Mitrafix,%20saya%20ingin%20konsultasi%20jasa%20IT%20panggilan."
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-mitrafix-orange px-8 py-4 text-lg font-bold text-white shadow-xl shadow-sky-400/30 transition-all hover:bg-sky-400 sm:w-auto"
                aria-label="Konsultasi IT Jakarta via WhatsApp"
              >
                Konsultasi Gratis Sekarang
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a 
                href="#services" 
                onClick={scrollToServices}
                className="w-full rounded-xl border border-slate-200 bg-white px-8 py-4 text-lg font-bold text-slate-900 transition-all hover:bg-slate-50 sm:w-auto"
              >
                Cek Layanan IT
              </a>
            </div>

            <div className="mt-10 flex items-center justify-center gap-8 opacity-70 lg:justify-start">
              <div className="flex items-center gap-2 text-sm font-medium">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                <span>Teknisi Berpengalaman</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Globe className="h-5 w-5 text-blue-500" />
                <span>Area JABODETABEK Dan Sekitarnya</span>
              </div>
            </div>
          </div>
          
          <div className="relative flex-1">
            <div className="relative z-10 transform overflow-hidden rounded-2xl shadow-2xl shadow-slate-200 transition-transform duration-500 hover:rotate-0 lg:rotate-2">
              <img 
                src={optimizeImage("https://715udgq2n1apqtj8.public.blob.vercel-storage.com/image/it%20solution.jpeg", 1200)} 
                alt="Jasa IT Solution Terlengkap di Jakarta" 
                className="h-[400px] w-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="mb-1 text-sm font-bold uppercase tracking-widest text-sky-400">Pusat Jasa IT Jakarta</p>
                <p className="text-xl font-bold">Respon Cepat & Bergaransi</p>
              </div>
            </div>
            {/* Float Cards */}
            <div className="absolute -bottom-6 -left-6 z-20 flex animate-bounce items-center gap-3 rounded-xl bg-white p-4 shadow-xl">
              <div className="rounded-full bg-green-100 p-2 text-green-600">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Uptime Support</p>
                <p className="text-sm font-bold">24/7 Monitoring</p>
              </div>
            </div>
          </div> 
        </div>

        {/* Services Highlight Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 mb-16">
          {services.map((service) => (
            <a 
              key={service.id}
              href="#services"
              onClick={scrollToServices}
              className="group rounded-2xl border border-white bg-white/80 p-5 backdrop-blur-md transition-all hover:border-mitrafix-orange hover:shadow-lg hover:shadow-sky-400/20 cursor-pointer"
              title={`Layanan ${service.title}`}
            >
              <div className="mb-3 text-mitrafix-orange transition-transform duration-300 group-hover:scale-110">
                 {SERVICE_ICONS[service.icon] ? (
                      React.cloneElement(SERVICE_ICONS[service.icon] as React.ReactElement<any>, { className: 'w-6 h-6' })
                   ) : null}
              </div>
              <h4 className="text-sm font-bold leading-tight text-slate-800">
                {service.title}
              </h4>
            </a>
          ))}
        </div>

        {/* Partners Marquee Section (Moved Here) */}
        <div className="border-t border-slate-200/60 pt-8">
          <p className="text-center text-xs font-bold text-slate-400 mb-6 uppercase tracking-widest">
            Sparepart Original & Authorized Partner
          </p>
          <div className="relative w-full overflow-hidden">
             {/* Gradient Masks for seamless effect */}
             <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-baby-blue to-transparent z-10 opacity-50" />
             <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-baby-blue to-transparent z-10 opacity-50" />
            
             <div className="flex w-max animate-scroll">
              {sliderPartners.map((partner, index) => (
                <div 
                  key={`${partner.id}-${index}`} 
                  className="mx-6 w-24 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                >
                  <img 
                    src={optimizeImage(partner.logo, 150)} 
                    alt={`${partner.name} Partner`} 
                    className="max-w-full max-h-full object-contain"
                    title={`Mitrafix Partner: ${partner.name}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
