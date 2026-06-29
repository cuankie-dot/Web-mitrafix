
import React, { useState, useEffect } from 'react';
import { X, Trash2, Download, ExternalLink, Calendar, Briefcase, User, Phone, Lock, LogOut, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Session } from '@supabase/supabase-js';

interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  needs: string;
  details: string;
  created_at?: string; // Supabase timestamp
  date?: string; // Display date
  status: string;
}

interface LeadDashboardProps {
  onClose: () => void;
}

const LeadDashboard: React.FC<LeadDashboardProps> = ({ onClose }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Auth state
  const [session, setSession] = useState<Session | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Periksa session yang ada & dengarkan perubahan auth
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthChecked(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setAuthError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setPassword('');
    } catch (err: any) {
      setAuthError(err?.message === 'Invalid login credentials'
        ? 'Email atau password salah.'
        : (err?.message || 'Gagal masuk. Coba lagi.'));
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setLeads([]);
  };

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        // Format date untuk tampilan
        const formattedData = data.map((item: any) => ({
          ...item,
          date: new Date(item.created_at).toLocaleString('id-ID', {
            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
          })
        }));
        setLeads(formattedData);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
      setLeads([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Hanya ambil data & dengarkan realtime jika sudah login
    if (!session) return;

    fetchLeads();

    // Setup Realtime Listener untuk Lead Baru
    const channel = supabase.channel('realtime leads')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'leads' },
        (payload) => {
           console.log('New lead received!', payload);
           fetchLeads(); // Refresh list saat ada data masuk
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session]);

  const deleteLead = async (id: number) => {
    if (confirm('Hapus laporan ini permanen dari Database?')) {
      try {
        const { error } = await supabase.from('leads').delete().eq('id', id);
        
        if (error) throw error;

        // Update UI optimistic
        setLeads(leads.filter(l => l.id !== id));
      } catch (err) {
        console.error("Gagal menghapus:", err);
        alert("Gagal menghapus data. Cek koneksi internet.");
      }
    }
  };

  // Gerbang autentikasi: tampilkan layar login jika belum masuk
  if (!session) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200">
          <div className="bg-slate-900 p-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-mitrafix-orange p-3 rounded-2xl shadow-lg shadow-sky-400/20">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-white font-extrabold text-xl tracking-tight">Akses Admin</h2>
                <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-bold mt-1">Login Diperlukan</p>
              </div>
            </div>
            <button onClick={onClose} className="bg-white/10 p-3 rounded-2xl text-white hover:bg-white/20 transition-all" aria-label="Tutup">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-5">
            {!authChecked ? (
              <p className="text-center text-slate-400 text-sm py-4">Memeriksa sesi...</p>
            ) : (
              <>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Halaman ini berisi data pelanggan yang bersifat rahasia. Silakan masuk dengan akun admin Anda.
                </p>

                {authError && (
                  <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-600">{authError}</p>
                  </div>
                )}

                <div>
                  <label htmlFor="admin-email" className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Email</label>
                  <input
                    id="admin-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@mitrafix.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-mitrafix-orange focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="admin-password" className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Password</label>
                  <input
                    id="admin-password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-mitrafix-orange focus:border-transparent transition-all"
                  />
                </div>

                <button
                  disabled={isAuthenticating}
                  type="submit"
                  className="w-full bg-mitrafix-orange text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-sky-400 transition-all disabled:opacity-50"
                >
                  {isAuthenticating ? 'Memverifikasi...' : 'Masuk'}
                  <Lock className="w-4 h-4" />
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[3rem] shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-slate-900 p-8 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="bg-mitrafix-orange p-3 rounded-2xl shadow-lg shadow-sky-400/20">
              <Download className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-white font-extrabold text-2xl tracking-tight">Lead Center Mitrafix</h2>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-bold">
                  {isLoading ? 'Memuat Data...' : 'Database Supabase Active'}
                </p>
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/10 px-4 py-3 rounded-2xl text-white text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-all"
              title="Keluar dari sesi admin"
            >
              <LogOut className="w-4 h-4" /> Keluar
            </button>
            <button onClick={onClose} className="bg-white/10 p-3 rounded-2xl text-white hover:bg-white/20 transition-all" aria-label="Tutup">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
          
          {isLoading ? (
            <div className="flex items-center justify-center h-64 text-slate-400">
              Memuat data dari database...
            </div>
          ) : leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-80 text-slate-400">
              <div className="bg-white p-8 rounded-full mb-6 shadow-sm">
                <Briefcase className="w-16 h-16 opacity-10" />
              </div>
              <p className="font-bold text-slate-600 text-xl">Belum Ada Permintaan Masuk</p>
              <p className="text-sm text-slate-400 mt-2">Data dari calon klien akan muncul otomatis di sini.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {leads.map((lead) => (
                <div key={lead.id} className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 -mr-16 -mt-16 rounded-full group-hover:bg-sky-50 transition-colors" />
                  
                  <div className="flex flex-col lg:flex-row justify-between gap-8 relative z-10">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="bg-slate-900 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.15em]">
                          {lead.needs}
                        </span>
                        <span className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-widest bg-slate-100 px-3 py-1.5 rounded-full">
                          <Calendar className="w-3.5 h-3.5" />
                          {lead.date || '-'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex items-center gap-4">
                          <div className="bg-sky-50 p-3 rounded-2xl text-mitrafix-orange">
                            <User className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Klien / Bisnis</p>
                            <p className="text-slate-900 font-extrabold text-lg">{lead.name}</p>
                            <p className="text-slate-500 text-xs font-medium">{lead.company}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                            <Phone className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Hubungi Langsung</p>
                            <p className="text-slate-900 font-extrabold text-lg">{lead.phone}</p>
                            <p className="text-slate-500 text-xs font-medium truncate max-w-[150px]">{lead.email}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 p-6 bg-slate-50 rounded-[1.5rem] border border-slate-100/50">
                        <p className="text-[10px] font-black text-slate-400 uppercase mb-3 tracking-[0.2em]">Pesan Klien:</p>
                        <p className="text-sm text-slate-700 leading-relaxed italic font-medium">"{lead.details || 'Tidak ada catatan tambahan.'}"</p>
                      </div>
                    </div>

                    <div className="flex flex-row lg:flex-col gap-3 justify-end items-center">
                      <a 
                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`} 
                        target="_blank"
                        className="flex-1 lg:flex-none bg-green-500 text-white p-5 rounded-2xl hover:bg-green-600 transition-all shadow-xl shadow-green-500/20 hover:scale-110"
                        title="Balas via WhatsApp"
                      >
                        <ExternalLink className="w-6 h-6" />
                      </a>
                      <button 
                        onClick={() => deleteLead(lead.id)}
                        className="flex-1 lg:flex-none bg-white text-red-500 p-5 rounded-2xl border border-red-100 hover:bg-red-50 transition-all hover:scale-110"
                        title="Hapus Lead dari DB"
                      >
                        <Trash2 className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 bg-white border-t border-slate-100 text-center flex justify-center items-center gap-2">
           <div className="w-2 h-2 bg-mitrafix-orange rounded-full" />
           <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Mitrafix Database System • Secure Connection</p>
        </div>
      </div>
    </div>
  );
};

export default LeadDashboard;
