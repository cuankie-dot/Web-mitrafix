
import React from 'react';
import { ChevronRight, ShieldCheck, Zap, Globe } from 'lucide-react';
import { SERVICES, SERVICE_ICONS } from '../constants';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 h-full w-full -z-10 bg-baby-blue/50" />
      <div className="absolute top-[-10%] right-[-5%] h-[400px] w-[400px] -z-10 rounded-full bg-mitrafix-orange/10 blur-3xl" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col items-center gap-12 lg:flex-row">
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-6 inline-flex items-center space-x-2 rounded-full bg-orange-100 px-4 py-1.5 text-sm font-bold text-orange-600">
              <Zap className="h-4 w-4" />
              <span>Partner IT Terpercaya Jakarta Selatan</span>
            </div>
            
            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">
              Solusi IT Terintegrasi untuk <span className="text-mitrafix-orange">Pertumbuhan Bisnis</span> Anda
            </h1>
            
            <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-600 lg:mx-0">
              Mitrafix hadir sebagai partner strategis untuk kebutuhan printer, perangkat keras, jaringan, hingga maintenance sistem IT Anda di wilayah Jakarta dan sekitarnya.
              <span className="font-semibold text-slate-900"> Profesional, Cepat, dan Berorientasi Hasil.</span>
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <a 
                href="https://wa.me/6281999970857?text=Halo%20Mitrafix,%20saya%20ingin%20konsultasi%20kebutuhan%20IT%20bisnis%20saya."
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-mitrafix-orange px-8 py-4 text-lg font-bold text-white shadow-xl shadow-orange-500/20 transition-all hover:bg-orange-600 sm:w-auto"
                aria-label="Konsultasi IT Gratis via WhatsApp"
              >
                Konsultasi Gratis Sekarang
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a 
                href="#services" 
                className="w-full rounded-xl border border-slate-200 bg-white px-8 py-4 text-lg font-bold text-slate-900 transition-all hover:bg-slate-50 sm:w-auto"
              >
                Lihat Layanan
              </a>
            </div>

            <div className="mt-10 flex items-center justify-center gap-8 opacity-70 lg:justify-start">
              <div className="flex items-center gap-2 text-sm font-medium">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                <span>Garansi Resmi & Terjamin</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Globe className="h-5 w-5 text-blue-500" />
                <span>Support Area Jabodetabek</span>
              </div>
            </div>
          </div>
          
          <div className="relative flex-1">
            <div className="relative z-10 transform overflow-hidden rounded-2xl shadow-2xl shadow-slate-200 transition-transform duration-500 hover:rotate-0 lg:rotate-2">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop" 
                alt="Mitrafix IT Solutions Team Working on Infrastructure" 
                className="h-[400px] w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="mb-1 text-sm font-bold uppercase tracking-widest text-orange-400">Infrastruktur Modern</p>
                <p className="text-xl font-bold">Solusi IT Terlengkap di Jagakarsa</p>
              </div>
            </div>
            {/* Float Cards */}
            <div className="absolute -bottom-6 -left-6 z-20 flex animate-bounce items-center gap-3 rounded-xl bg-white p-4 shadow-xl">
              <div className="rounded-full bg-green-100 p-2 text-green-600">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Response Time</p>
                <p className="text-sm font-bold">&lt; 20 Menit</p>
              </div>
            </div>
          </div>
        </div>

        {/* Services Highlight Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {SERVICES.map((service) => (
            <a 
              key={service.id}
              href="#services"
              className="group rounded-2xl border border-white bg-white/80 p-5 backdrop-blur-md transition-all hover:border-mitrafix-orange hover:shadow-lg hover:shadow-orange-500/10"
            >
              <div className="mb-3 text-mitrafix-orange transition-transform duration-300 group-hover:scale-110">
                {React.cloneElement(SERVICE_ICONS[service.icon] as React.ReactElement<any>, { className: 'w-6 h-6' })}
              </div>
              <h4 className="text-sm font-bold leading-tight text-slate-800">
                {service.title}
              </h4>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
