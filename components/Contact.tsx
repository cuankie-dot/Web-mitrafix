
import React, { useState } from 'react';
import { Mail, MapPin, Phone, MessageSquare, Send, Map as MapIcon } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    needs: '',
    details: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Terima kasih ${formData.name}! Permintaan Anda mengenai ${formData.needs} telah diterima. Tim kami akan menghubungi Anda di nomor ${formData.phone} segera.`);
    setFormData({ name: '', company: '', email: '', phone: '', needs: '', details: '' });
  };

  const inputClasses = "w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-mitrafix-orange focus:border-transparent transition-all";
  const labelClasses = "block text-sm font-bold text-slate-300 mb-2";

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-mitrafix-orange font-bold tracking-widest uppercase text-sm mb-3">Kontak Kami</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Konsultasikan Kebutuhan IT Anda Sekarang</h3>
          <p className="text-slate-600">Tim kami siap memberikan solusi IT terbaik yang sesuai dengan anggaran dan kebutuhan bisnis Anda.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
          {/* Info Card */}
          <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 relative overflow-hidden flex flex-col justify-between shadow-xl">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-mitrafix-orange opacity-20 rounded-full -mb-10 -mr-10" />
            
            <div>
              <h4 className="text-2xl font-bold mb-8">Informasi Hubungi</h4>
              
              <div className="space-y-8 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="bg-slate-800 p-3 rounded-xl text-mitrafix-orange">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg mb-1">Alamat Kantor</p>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Jl. Timbul No.4, RW.4, Cipedak, Kec. Jagakarsa,<br />
                      Kota Jakarta Selatan, DKI Jakarta 12630
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-slate-800 p-3 rounded-xl text-mitrafix-orange">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg mb-1">Telepon & WhatsApp</p>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      +62 819-9997-0857 (CS Utama)<br />
                      +62 21-123-4567 (Office)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-slate-800 p-3 rounded-xl text-mitrafix-orange">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg mb-1">Email Business</p>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      info@mitrafix.com<br />
                      sales@mitrafix.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-800">
              <p className="text-sm text-slate-400 mb-4">Hubungi Kami Secara Instan:</p>
              <a 
                href="https://wa.me/6281999970857" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-mitrafix-orange text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-orange-500/20 hover:scale-105 transition-all"
              >
                <MessageSquare className="w-5 h-5" />
                Chat via WhatsApp
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-slate-900 rounded-[2.5rem] p-10 border border-slate-800 shadow-2xl">
            <h4 className="text-2xl font-bold text-white mb-8">Minta Penawaran Harga</h4>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClasses}>Nama Lengkap</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Contoh: Budi Santoso"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className={labelClasses}>Perusahaan/Instansi</label>
                  <input 
                    type="text" 
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder="Contoh: PT. Maju Bersama"
                    className={inputClasses}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClasses}>Email Aktif</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="budi@email.com"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className={labelClasses}>Nomor WhatsApp / HP</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="Contoh: 08123456789"
                    className={inputClasses}
                  />
                </div>
              </div>

              <div>
                <label className={labelClasses}>Layanan Utama</label>
                <select 
                  required
                  value={formData.needs}
                  onChange={(e) => setFormData({...formData, needs: e.target.value})}
                  className={`${inputClasses} appearance-none cursor-pointer`}
                >
                  <option value="" disabled className="bg-slate-800">Pilih Layanan...</option>
                  <option value="printer" className="bg-slate-800">Solusi Printer & Refill</option>
                  <option value="hardware" className="bg-slate-800">Hardware & Komputer</option>
                  <option value="cctv" className="bg-slate-800">Instalasi CCTV</option>
                  <option value="network" className="bg-slate-800">Infrastruktur Jaringan</option>
                  <option value="maintenance" className="bg-slate-800">Maintenance & Support</option>
                </select>
              </div>

              <div>
                <label className={labelClasses}>Detail Kebutuhan Spesifik</label>
                <textarea 
                  value={formData.details}
                  onChange={(e) => setFormData({...formData, details: e.target.value})}
                  placeholder="Ceritakan detail spesifikasi atau kendala yang Anda hadapi agar kami bisa memberikan solusi lebih akurat..."
                  rows={3}
                  className={inputClasses}
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-mitrafix-orange text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20"
              >
                Kirim Permintaan <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Google Maps Integration */}
        <div className="mt-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-100 p-2 rounded-lg text-mitrafix-orange">
              <MapIcon className="w-5 h-5" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Kunjungi Kantor Kami</h4>
          </div>
          <div className="w-full h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 relative group">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3965.719601198428!2d106.80201804476303!3d-6.350045192932447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwMjEnMDAuMiJTIDEwNsKwNDgnMDcuMyJF!5e0!3m2!1sid!2sid!4v1715600000000!5m2!1sid!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Kantor Mitrafix Jagakarsa"
              className="grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
            ></iframe>
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-slate-100">
               <p className="text-[10px] font-bold text-slate-900 flex items-center gap-2">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                 Ready to Visit (Jagakarsa)
               </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-8">
             <div className="flex items-center gap-2 text-slate-500 text-sm">
               <div className="w-1.5 h-1.5 bg-mitrafix-orange rounded-full" />
               Akses mudah via Tol Desari
             </div>
             <div className="flex items-center gap-2 text-slate-500 text-sm">
               <div className="w-1.5 h-1.5 bg-mitrafix-orange rounded-full" />
               Parkir Luas & Aman
             </div>
             <div className="flex items-center gap-2 text-slate-500 text-sm">
               <div className="w-1.5 h-1.5 bg-mitrafix-orange rounded-full" />
               Dekat Stasiun Lenteng Agung
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
