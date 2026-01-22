
import React from 'react';
import { Quote, Star } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-mitrafix-orange font-bold tracking-widest uppercase text-sm mb-3">Testimonial Klien</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Apa Kata Mereka Tentang <span className="text-mitrafix-orange">Layanan Mitrafix</span>
          </h3>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Kepercayaan klien adalah prioritas utama kami. Berikut adalah pengalaman nyata dari mereka yang telah bermitra dengan Mitrafix.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 relative group"
            >
              <Quote className="absolute top-6 right-8 w-12 h-12 text-slate-200 group-hover:text-orange-100 transition-colors" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                ))}
              </div>

              <p className="text-slate-700 leading-relaxed mb-8 relative z-10 italic">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-2xl object-cover shadow-sm grayscale hover:grayscale-0 transition-all"
                />
                <div>
                  <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
            <div className="inline-flex items-center gap-2 bg-baby-blue/50 px-6 py-3 rounded-full text-slate-700 font-semibold text-sm">
                <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span>Rata-rata rating 4.9/5 dari ratusan proyek IT</span>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
