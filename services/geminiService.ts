
import { GoogleGenAI } from "@google/genai";

// Initialize the GoogleGenAI client with the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIResponse = async (userPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
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
