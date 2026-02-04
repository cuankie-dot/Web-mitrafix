
import React, { useState } from 'react';
import { Mail, MapPin, Phone, MessageSquare, Send, CheckCircle, Cloud, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
    setErrorMessage(null);
    
    // 1. Simpan ke Supabase (Database Utama) agar data aman
    try {
      const { error } = await supabase.from('leads').insert([
        {
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          needs: formData.needs,
          details: formData.details,
          status: 'New'
        }
      ]);

      if (error) {
        throw error;
      }

      console.log("Data saved to Supabase");
      // Setelah sukses simpan di DB, kirim notifikasi ke WA Admin
      handleSuccessAndRedirect();

    } catch (err: any) {
      console.error("Submission Failed:", err);
      
      // Error Handling: Jika error network/fetch, kita tetap lanjut ke WA 
      // agar user tidak kecewa (tetap bisa order meski database down)
      if (err.message && (err.message.includes('fetch') || err.message.includes('network'))) {
        console.warn("Network error detected. Switching to offline success mode.");
        handleSuccessAndRedirect();
      } else {
        setErrorMessage(err.message || "Terjadi kesalahan sistem. Silakan hubungi via WhatsApp.");
        setIsSyncing(false);
      }
    }
  };

  // Fungsi khusus untuk handle sukses UI + Redirect WA dengan detail lengkap
  const handleSuccessAndRedirect = () => {
    setIsSubmitted(true);
    setIsSyncing(false);

    // Nomor Admin Mitrafix sesuai request
    const businessNumber = "6281999370857"; 

    // Format Pesan Notifikasi Lengkap untuk Admin
    const message = `*NOTIFIKASI LEAD BARU - WEBSITE MITRAFIX* 🚀

Halo Admin, saya baru saja mengisi formulir penawaran di website. Berikut detail data saya:

👤 *DATA PELANGGAN*
• Nama: ${formData.name}
• Perusahaan: ${formData.company}
• Email: ${formData.email}
• No HP: ${formData.phone}

🛠 *KEBUTUHAN LAYANAN*
• Kategori: ${formData.needs}
• Detail Request: 
"${formData.details || '-'}"

Mohon dicek dan dibantu proses penawarannya. Terima kasih.`;

    // Encode URL agar karakter khusus (spasi, enter, emoji) terbaca dengan benar
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${businessNumber}?text=${encodedMessage}`;

    // Buka WhatsApp di tab baru setelah jeda singkat (agar UI sukses terlihat dulu)
    setTimeout(() => {
      window.open(waUrl, '_blank');
      // Reset form setelah terkirim
      setFormData({ name: '', company: '', email: '', phone: '', needs: '', details: '' });
    }, 1500);

    // Reset status sukses UI setelah 5 detik
    setTimeout(() => {
      if (isSubmitted) setIsSubmitted(false);
    }, 5000);
  };

  const inputClasses = "w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-mitrafix-orange focus:border-transparent transition-all";

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
                    <p className="text-slate-400 text-sm leading-relaxed">Jl. Timbul No.4, RW.4, Cipedak, Kec. Jagakarsa, Jakarta Selatan 12630</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-slate-800 p-3 rounded-xl text-mitrafix-orange">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg mb-1">Telepon & WhatsApp</p>
                    <p className="text-slate-400 text-sm leading-relaxed">+62 819-9993-70857</p>
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
              <a href="https://wa.me/6281999370857" target="_blank" className="inline-flex items-center gap-3 bg-mitrafix-orange text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-sky-400/20 hover:scale-105 transition-all">
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
                <p className="text-slate-400 text-sm mb-4">Anda akan dialihkan ke WhatsApp Admin...</p>
                <div className="flex gap-3 justify-center">
                    <button 
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2 bg-slate-800 rounded-xl text-sm font-bold text-white hover:bg-slate-700 transition-all"
                    >
                    Kembali
                    </button>
                    <a 
                      href={`https://wa.me/6281999370857?text=${encodeURIComponent(`Halo Mitrafix, saya sudah isi form atas nama ${formData.name}.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-2 bg-green-600 rounded-xl text-sm font-bold text-white hover:bg-green-500 transition-all"
                    >
                      Buka WhatsApp
                    </a>
                </div>
              </div>
            ) : null}

            <div className="flex justify-between items-center mb-8">
               <h4 className="text-2xl font-bold text-white">Minta Penawaran</h4>
               <div className="flex items-center gap-2 text-[10px] text-green-400 font-bold uppercase tracking-widest bg-green-400/10 px-3 py-1 rounded-full">
                 <Cloud className="w-3 h-3" /> System Ready
               </div>
            </div>

            {errorMessage && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-400">{errorMessage}</p>
              </div>
            )}
            
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
              
              <button disabled={isSyncing} type="submit" className="w-full bg-mitrafix-orange text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-sky-400 transition-all disabled:opacity-50">
                {isSyncing ? 'Mengirim Data...' : 'Kirim & Chat WhatsApp'} <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Google Maps */}
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
