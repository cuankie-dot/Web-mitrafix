
import React, { useState } from 'react';
import { Mail, MapPin, Phone, MessageSquare, Send, Map as MapIcon, CheckCircle, Cloud } from 'lucide-react';

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    needs: '',
    details: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSyncing(true);
    
    // 1. Ambil data lama & URL GSheet dari localStorage
    const existingLeads = JSON.parse(localStorage.getItem('mitrafix_leads') || '[]');
    const gSheetUrl = localStorage.getItem('mitrafix_gsheet_url');
    
    // 2. Tambah data baru dengan timestamp
    const newLead = {
      ...formData,
      id: Date.now(),
      date: new Date().toLocaleString('id-ID'),
      status: 'New'
    };
    
    // 3. Simpan ke LocalStorage (sebagai backup)
    const updatedLeads = [newLead, ...existingLeads];
    localStorage.setItem('mitrafix_leads', JSON.stringify(updatedLeads));

    // 4. Kirim ke Google Sheets jika URL dikonfigurasi
    if (gSheetUrl) {
      try {
        await fetch(gSheetUrl, {
          method: 'POST',
          mode: 'no-cors', // Penting untuk Apps Script
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newLead)
        });
        console.log("Synced to Google Sheets");
      } catch (err) {
        console.error("GSheet Sync Error:", err);
      }
    }

    setIsSyncing(false);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', company: '', email: '', phone: '', needs: '', details: '' });
    }, 3000);
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
          {/* Info Card - Tetap sama seperti sebelumnya */}
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
                    <p className="text-slate-400 text-sm leading-relaxed">Jl. Timbul No.4, RW.4, Cipedak, Kec. Jagakarsa, Jakarta Selatan 12630</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-slate-800 p-3 rounded-xl text-mitrafix-orange">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg mb-1">Telepon & WhatsApp</p>
                    <p className="text-slate-400 text-sm leading-relaxed">+62 819-9997-0857</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-slate-800 p-3 rounded-xl text-mitrafix-orange">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg mb-1">Email Business</p>
                    <p className="text-slate-400 text-sm leading-relaxed">info@mitrafix.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-slate-800">
              <a href="https://wa.me/6281999970857" target="_blank" className="inline-flex items-center gap-3 bg-mitrafix-orange text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-orange-500/20 hover:scale-105 transition-all">
                <MessageSquare className="w-5 h-5" /> Chat via WhatsApp
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-slate-900 rounded-[2.5rem] p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
            {isSubmitted ? (
              <div className="absolute inset-0 bg-slate-900 z-20 flex flex-col items-center justify-center text-center p-8 animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Permintaan Terkirim!</h4>
                <p className="text-slate-400 text-sm">Terima kasih {formData.name}, data Anda telah tersinkronisasi ke sistem kami.</p>
              </div>
            ) : null}

            <div className="flex justify-between items-center mb-8">
               <h4 className="text-2xl font-bold text-white">Minta Penawaran</h4>
               {localStorage.getItem('mitrafix_gsheet_url') && (
                 <div className="flex items-center gap-2 text-[10px] text-green-400 font-bold uppercase tracking-widest bg-green-400/10 px-3 py-1 rounded-full">
                   <Cloud className="w-3 h-3" /> Cloud Linked
                 </div>
               )}
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Nama Lengkap" className={inputClasses} />
                <input type="text" required value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} placeholder="Perusahaan" className={inputClasses} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Email" className={inputClasses} />
                <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="WhatsApp" className={inputClasses} />
              </div>
              <select required value={formData.needs} onChange={(e) => setFormData({...formData, needs: e.target.value})} className={inputClasses}>
                <option value="" disabled>Pilih Layanan...</option>
                <option value="Printer Solution">Solusi Printer & Refill</option>
                <option value="Computer Hardware">Hardware & Komputer</option>
                <option value="CCTV Installation">Instalasi CCTV</option>
                <option value="Network Infrastructure">Infrastruktur Jaringan</option>
                <option value="IT Maintenance">Maintenance & Support</option>
              </select>
              <textarea value={formData.details} onChange={(e) => setFormData({...formData, details: e.target.value})} placeholder="Detail kebutuhan Anda..." rows={3} className={inputClasses} />
              
              <button disabled={isSyncing} type="submit" className="w-full bg-mitrafix-orange text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all">
                {isSyncing ? 'Memproses...' : 'Kirim Permintaan'} <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Google Maps - Tetap ada */}
        <div className="mt-10">
          <div className="w-full h-[350px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100">
            <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3965.719601198428!2d106.80201804476303!3d-6.350045192932447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwMjEnMDAuMiJTIDEwNsKwNDgnMDcuMyJF!5e0!3m2!1sid!2sid!4v1715600000000!5m2!1sid!2sid" width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" title="Lokasi Kantor"></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
