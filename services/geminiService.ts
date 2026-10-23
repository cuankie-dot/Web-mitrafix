import { GoogleGenAI } from "@google/genai";

// Read the API key lazily so a missing key never crashes the app at import time.
const getApiKey = (): string | undefined => {
  const fromEnv = (import.meta as any)?.env?.VITE_GEMINI_API_KEY;
  if (typeof fromEnv === 'string' && fromEnv.trim()) return fromEnv.trim();

  // Fallback for environments where the key is injected at build time.
  if (typeof process !== 'undefined' && (process as any)?.env?.API_KEY) {
    return String((process as any).env.API_KEY).trim();
  }

  return undefined;
};

let ai: GoogleGenAI | null = null;

const getClient = (): GoogleGenAI | null => {
  const apiKey = getApiKey();
  if (!apiKey) return null;
  if (!ai) ai = new GoogleGenAI({ apiKey });
  return ai;
};

const OFFLINE_MESSAGE =
  "Layanan AI sedang tidak tersedia saat ini. Silakan hubungi tim kami via WhatsApp untuk konsultasi langsung.";

export const getAIResponse = async (userPrompt: string) => {
  const client = getClient();
  if (!client) {
    console.warn('[MitraAI] VITE_GEMINI_API_KEY belum diset — chatbot berjalan dalam mode offline.');
    return OFFLINE_MESSAGE;
  }

  try {
    const response = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `Anda adalah "MitraAI", asisten virtual profesional dari Mitrafix IT Solutions. 
        Tugas Anda adalah membantu pengunjung website dengan menjawab pertanyaan seputar layanan Mitrafix:
        1. Printer & Refill (Jual/Sewa/Isi Ulang)
        2. Hardware Komputer (PC/Laptop/Aksesoris)
        3. CCTV & Keamanan (Instalasi & Produk)
        4. Infrastruktur Jaringan (LAN/WiFi/Network)
        5. IT Maintenance (Kontrak maintenance & On-call support)
        
        Gunakan bahasa Indonesia yang sopan, profesional, dan persuasif. 
        Jika ditanya lokasi, beri tahu alamat: Jl. Timbul No.4, RW.4, Cipedak, Kec. Jagakarsa, Jakarta Selatan.
        Arahkan pengguna untuk menghubungi WhatsApp (tombol yang ada di web) untuk konsultasi lebih mendalam.
        Berikan jawaban yang ringkas namun informatif.`,
      },
    });
    // Extract text directly from the response property as per guidelines.
    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "Maaf, saat ini saya sedang mengalami kendala teknis. Silakan hubungi tim kami via WhatsApp untuk bantuan langsung.";
  }
};
