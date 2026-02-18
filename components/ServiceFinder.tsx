
import React, { useState, useEffect } from 'react';
import { 
  X, ChevronRight, ChevronLeft, 
  User, Building2, Building, 
  Printer, Shield, Wifi, Wrench, 
  CheckCircle2, Rocket, ArrowRight, MessageCircle,
  AlertCircle, Lightbulb, TrendingUp
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { optimizeImage } from '../utils/imageOptimizer';

interface Question {
  id: string;
  text: string;
  options: Option[];
}

interface Option {
  id: string;
  label: string;
  desc: string;
  icon: React.ReactNode;
  value: string;
}

interface ServiceFinderProps {
  isOpen: boolean;
  onClose: () => void;
}

const ServiceFinder: React.FC<ServiceFinderProps> = ({ isOpen, onClose }) => {
  const { services } = useData();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendation, setRecommendation] = useState<any>(null);

  const totalSteps = 3;

  const questions: Question[] = [
    {
      id: 'business_type',
      text: 'Apa profil entitas/kebutuhan Anda?',
      options: [
        { id: 'p', label: 'Personal / Rumah', desc: 'Penggunaan pribadi atau freelance.', icon: <User className="w-6 h-6" />, value: 'personal' },
        { id: 's', label: 'UMKM / Startup', desc: 'Kantor kecil dengan 5-15 orang.', icon: <Building2 className="w-6 h-6" />, value: 'small' },
        { id: 'e', label: 'Enterprise / Corporate', desc: 'Perusahaan besar atau instansi.', icon: <Building className="w-6 h-6" />, value: 'enterprise' }
      ]
    },
    {
      id: 'pain_point',
      text: 'Apa kendala atau kebutuhan utama Anda?',
      options: [
        { id: 'pr', label: 'Masalah Printer', desc: 'Tinta habis, paper jam, atau rusak.', icon: <Printer className="w-6 h-6" />, value: 'printer' },
        { id: 'sec', label: 'Keamanan (CCTV)', desc: 'Pasang baru atau perbaikan CCTV.', icon: <Shield className="w-6 h-6" />, value: 'cctv' },
        { id: 'net', label: 'Internet / WiFi', desc: 'Sinyal lemot atau tidak merata.', icon: <Wifi className="w-6 h-6" />, value: 'network' },
        { id: 'mnt', label: 'Maintenance Rutin', desc: 'Butuh teknisi IT standby.', icon: <Wrench className="w-6 h-6" />, value: 'maintenance' }
      ]
    },
    {
      id: 'urgency',
      text: 'Seberapa mendesak kebutuhan ini?',
      options: [
        { id: 'u1', label: 'Sangat Mendesak', desc: 'Butuh ditangani hari ini juga.', icon: <Rocket className="w-6 h-6" />, value: 'urgent' },
        { id: 'u2', label: 'Rencana Mendatang', desc: 'Masih dalam tahap cari penawaran.', icon: <CheckCircle2 className="w-6 h-6" />, value: 'planned' }
      ]
    }
  ];

  const handleSelect = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    if (step < totalSteps) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      calculateRecommendation({ ...answers, [questionId]: value });
    }
  };

  const calculateRecommendation = (finalAnswers: any) => {
    const pain = finalAnswers.pain_point;
    const type = finalAnswers.business_type;
    
    // Logic pemetaan
    let recommendedService = services.find(s => s.id === pain);
    
    // Overlap logic: jika enterprise butuh apapun, prioritaskan maintenance kontrak
    if (type === 'enterprise' && pain === 'maintenance') {
        recommendedService = services.find(s => s.id === 'maintenance');
    }

    if (!recommendedService) {
        recommendedService = services[0]; // Fallback
    }

    setRecommendation(recommendedService);
    setStep(4); // Result step
  };

  const resetQuiz = () => {
    setStep(1);
    setAnswers({});
    setRecommendation(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 p-6 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-mitrafix-orange p-2 rounded-xl">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-lg leading-tight">Smart Service Finder</p>
              <p className="text-slate-400 text-xs">Temukan solusi IT terbaik dalam 30 detik</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        {step <= totalSteps && (
          <div className="h-1.5 w-full bg-slate-100 shrink-0">
            <div 
              className="h-full bg-mitrafix-orange transition-all duration-500" 
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        )}

        <div className="p-8 md:p-10 overflow-y-auto">
          {step <= totalSteps ? (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-4 mb-8">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-100 text-sky-600 font-bold text-sm">
                  {step}
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900">
                  {questions[step - 1].text}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {questions[step - 1].options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(questions[step - 1].id, option.value)}
                    className={`flex items-center gap-5 p-5 rounded-2xl border-2 text-left transition-all group ${
                      answers[questions[step - 1].id] === option.value 
                        ? 'border-mitrafix-orange bg-sky-50 shadow-md shadow-sky-400/10' 
                        : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`p-4 rounded-xl transition-colors ${
                      answers[questions[step - 1].id] === option.value 
                        ? 'bg-mitrafix-orange text-white' 
                        : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                    }`}>
                      {option.icon}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 mb-0.5">{option.label}</p>
                      <p className="text-xs text-slate-500">{option.desc}</p>
                    </div>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className="w-5 h-5 text-slate-300" />
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-10 flex items-center justify-between">
                <button 
                  onClick={() => step > 1 && setStep(step - 1)}
                  disabled={step === 1}
                  className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-600 disabled:opacity-0 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" /> Kembali
                </button>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                  Step {step} of {totalSteps}
                </p>
              </div>
            </div>
          ) : (
            /* Result Step */
            <div className="animate-in zoom-in duration-500">
              <div className="text-center mb-8">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-1">Solusi Ditemukan!</h3>
                <p className="text-slate-500 text-sm">Hasil diagnosis sistem Mitrafix untuk kebutuhan Anda:</p>
              </div>

              {/* Enhanced Result Card */}
              <div className="bg-white border-2 border-slate-100 rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50 mb-8">
                <div className="h-40 relative">
                  <img 
                    src={optimizeImage(recommendation.image, 800)} 
                    alt={recommendation.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent flex items-end p-6">
                    <h4 className="text-white text-xl font-black uppercase tracking-tight">{recommendation.title}</h4>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Problem Description */}
                  <div className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-500">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Analisis Masalah</p>
                      <p className="text-sm text-slate-600 italic leading-relaxed">"{recommendation.problem}"</p>
                    </div>
                  </div>

                  {/* Solution Description */}
                  <div className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center text-mitrafix-orange">
                      <Lightbulb className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Solusi Rekomendasi</p>
                      <p className="text-sm text-slate-700 font-medium leading-relaxed">{recommendation.solution}</p>
                    </div>
                  </div>

                  {/* Benefit Section */}
                  <div className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Manfaat Utama</p>
                      <p className="text-sm font-bold text-slate-900">{recommendation.benefit}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href={`https://wa.me/6281999370857?text=Halo%20Mitrafix,%20saya%20sudah%20mencoba%20Finder%20Tool%20dan%20ingin%20konsultasi%20layanan%20*${encodeURIComponent(recommendation.title)}*.%0A%0AAnalisis%20Masalah:%20${encodeURIComponent(recommendation.problem)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-mitrafix-orange text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-sky-400/30 hover:bg-sky-400 transition-all"
                >
                  <MessageCircle className="w-5 h-5" /> Konsultasi Sekarang
                </a>
                <button 
                  onClick={resetQuiz}
                  className="flex items-center justify-center gap-2 bg-slate-100 text-slate-600 px-8 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                >
                  Cek Kebutuhan Lain
                </button>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-4 opacity-50">
                <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <Shield className="w-3 h-3" /> Bergaransi
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <Wrench className="w-3 h-3" /> Teknisi Ahli
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceFinder;
