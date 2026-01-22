
import React from 'react';
import { Target, Eye, Shield } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
             <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
               <img 
                src="https://picsum.photos/800/800?team-work" 
                alt="Tim Teknisi Mitrafix Melayani Solusi IT di Jakarta Selatan" 
                className="w-full h-auto"
                loading="lazy" 
               />
               <div className="absolute inset-0 bg-mitrafix-orange/20 mix-blend-multiply" />
             </div>
             {/* Decorative blob */}
             <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-baby-blue rounded-full -z-10 blur-2xl" />
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-mitrafix-orange font-bold tracking-widest uppercase text-sm mb-3">Tentang Mitrafix</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
              Partner IT Terpercaya Sejak 2014 di Jagakarsa, Jakarta Selatan
            </h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Mitrafix lahir dari visi untuk menyederhanakan kompleksitas teknologi bagi pelaku bisnis dan individu. Kami percaya bahwa setiap masalah IT memiliki solusi yang efisien jika ditangani oleh ahlinya. 
              Sebagai penyedia layanan IT <span className="font-bold text-slate-900">One-Stop Solution</span>, kami mengintegrasikan pengadaan barang, instalasi CCTV, perbaikan printer, hingga perawatan jaringan WiFi secara profesional.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-orange-100 p-3 rounded-2xl text-mitrafix-orange h-fit">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Visi Kami</h4>
                  <p className="text-sm text-slate-500">Menjadi pusat solusi IT nomor satu di Jakarta yang mengutamakan kepuasan pelanggan melalui teknologi tepat guna.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-blue-100 p-3 rounded-2xl text-blue-600 h-fit">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Misi Kami</h4>
                  <p className="text-sm text-slate-500">Memberikan layanan IT profesional, responsif, dan bergaransi demi kenyamanan operasional bisnis klien kami.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-green-100 p-3 rounded-2xl text-green-600 h-fit">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Keunggulan Lokal</h4>
                  <p className="text-sm text-slate-500">Kombinasi antara teknisi panggilan yang cepat sampai lokasi dan kualitas hardware orisinal dengan harga kompetitif.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
