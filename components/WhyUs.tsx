
import React from 'react';
import { CheckCircle2, Award, Clock, Users } from 'lucide-react';

const WhyUs: React.FC = () => {
  const highlights = [
    {
      title: 'One-Stop IT Solution',
      desc: 'Satu pintu untuk semua kebutuhan IT. Tidak perlu mencari banyak vendor, hemat waktu dan biaya koordinasi.',
      icon: <Award className="w-6 h-6" />
    },
    {
      title: 'Profesional & Responsif',
      desc: 'Tim teknisi bersertifikat yang siap menangani kendala Anda dalam waktu singkat dengan standar operasional tinggi.',
      icon: <Clock className="w-6 h-6" />
    },
    {
      title: 'Fleksibel (B2B & B2C)',
      desc: 'Melayani mulai dari perorangan (rumah), toko, kantor UMKM, hingga instansi besar dengan skema yang dapat disesuaikan.',
      icon: <Users className="w-6 h-6" />
    },
    {
      title: 'Efisien & Skalabel',
      desc: 'Solusi yang kami berikan dirancang untuk tumbuh bersama bisnis Anda, memastikan investasi IT Anda tidak sia-sia.',
      icon: <CheckCircle2 className="w-6 h-6" />
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-baby-blue/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-mitrafix-orange font-bold tracking-widest uppercase text-sm mb-3">Mengapa Mitrafix?</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              Lebih Dari Sekadar Vendor IT, Kami Adalah <span className="text-mitrafix-orange">Growth Partner</span> Anda.
            </h3>
            <p className="text-slate-600 mb-8">
              Kami memahami bahwa IT bukan hanya soal perangkat keras, tapi soal bagaimana teknologi membantu bisnis Anda berjalan lebih lancar dan menguntungkan.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {highlights.map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-mitrafix-orange mb-4">{item.icon}</div>
                  <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-lg h-64">
                <img src="https://picsum.photos/400/600?office-1" className="w-full h-full object-cover" alt="Office 1" />
              </div>
              <div className="bg-mitrafix-orange p-8 rounded-2xl text-white text-center">
                <p className="text-4xl font-extrabold mb-1">500+</p>
                <p className="text-sm font-medium opacity-80 uppercase tracking-widest">Klien Puas</p>
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="bg-slate-900 p-8 rounded-2xl text-white text-center">
                <p className="text-4xl font-extrabold mb-1">10+</p>
                <p className="text-sm font-medium opacity-80 uppercase tracking-widest">Tahun Pengalaman</p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg h-64">
                <img src="https://picsum.photos/400/600?server-room" className="w-full h-full object-cover" alt="Server Room" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
