
import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, Sparkles } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "Apakah layanan service di Mitrafix memiliki garansi?",
      answer: "Tentu saja. Semua layanan kami (Service Printer, Hardware, & Instalasi Jaringan) memiliki garansi pengerjaan mulai dari 14 hingga 30 hari tergantung jenis perbaikannya. Kami menjamin kepuasan Anda."
    },
    {
      question: "Berapa lama waktu respon (SLA) teknisi untuk sampai ke lokasi?",
      answer: "Untuk layanan on-call di area Jakarta Selatan (Jagakarsa, Cilandak, dsb) dan Depok, rata-rata teknisi kami tiba dalam 2-4 jam. Untuk klien kontrak maintenance B2B, kami menyediakan prioritas SLA yang lebih cepat sesuai kesepakatan."
    },
    {
      question: "Area mana saja yang di-cover oleh layanan Mitrafix?",
      answer: "Fokus utama kami adalah Jakarta Selatan, Jakarta Timur, dan Depok. Namun, untuk proyek pengadaan infrastruktur IT atau kontrak maintenance perusahaan, kami melayani seluruh wilayah JABODETABEK."
    },
    {
      question: "Apakah Mitrafix melayani kontrak maintenance rutin untuk kantor (B2B)?",
      answer: "Ya, ini adalah salah satu spesialisasi kami. Kami menawarkan paket maintenance bulanan yang mencakup perawatan printer, pembersihan hardware, optimasi jaringan, hingga update keamanan sistem secara berkala dengan biaya yang jauh lebih hemat daripada hire IT internal."
    },
    {
      question: "Bagaimana sistem pembayaran layanan di Mitrafix?",
      answer: "Kami menerima pembayaran tunai (cash), transfer bank, serta sistem invoice khusus untuk klien korporasi (B2B) yang telah menjalin kerjasama kontrak maintenance."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-mitrafix-orange font-bold tracking-widest uppercase text-sm mb-3">Tanya Jawab (FAQ)</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Punya Pertanyaan? Kami Punya <span className="text-mitrafix-orange">Jawabannya</span>
          </h3>
          <p className="text-slate-600">
            Berikut adalah hal-hal yang paling sering ditanyakan oleh klien kami. Jika ada hal lain, tim kami siap membantu.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`group rounded-3xl border transition-all duration-300 overflow-hidden ${
                openIndex === index 
                  ? 'bg-white border-mitrafix-orange shadow-xl shadow-sky-400/10' 
                  : 'bg-white border-slate-100 hover:border-slate-200'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    openIndex === index ? 'bg-mitrafix-orange text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                  }`}>
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <span className={`font-bold text-lg md:text-xl transition-colors ${
                    openIndex === index ? 'text-slate-900' : 'text-slate-700'
                  }`}>
                    {faq.question}
                  </span>
                </div>
                <ChevronDown className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180 text-mitrafix-orange' : ''
                }`} />
              </button>
              
              <div className={`transition-all duration-500 ease-in-out ${
                openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
              }`}>
                <div className="px-6 pb-8 md:px-20 md:pb-10 text-slate-500 leading-relaxed text-base">
                  <div className="pt-2 border-t border-slate-50">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-slate-900 rounded-[2.5rem] p-8 md:p-10 text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-mitrafix-orange opacity-10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-1000" />
          <p className="text-slate-400 mb-6 relative z-10 font-medium">Masih ada pertanyaan lain yang belum terjawab?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <a 
              href="https://wa.me/6281999370857?text=Halo%20Mitrafix,%20saya%20punya%20pertanyaan%20mengenai%20layanan%20IT."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-mitrafix-orange text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-sky-400/20 hover:bg-sky-400 transition-all hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" /> Chat Admin Sekarang
            </a>
            <button 
              onClick={() => {
                const chatBtn = document.querySelector('button[aria-label="Toggle Menu"]') as HTMLElement;
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all"
            >
              <Sparkles className="w-5 h-5 text-mitrafix-orange" /> Butuh Solusi Cepat?
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
