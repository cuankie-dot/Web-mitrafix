
import React from 'react';
import { Printer, Monitor, Video, Network, ShieldCheck, Briefcase } from 'lucide-react';
import { ServiceItem, NavLink, Testimonial, Product } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Beranda', href: 'home' },
  { label: 'Tentang Kami', href: 'about' },
  { label: 'Layanan', href: 'services' },
  { label: 'Produk', href: 'products' },
  { label: 'Kenapa Kami', href: 'why-us' },
  { label: 'Kontak', href: 'contact' },
];

/* 
  PANDUAN MENGGANTI GAMBAR:
  
  OPSI 1 (TERBAIK - LOKAL):
  1. Masukkan file gambar ke folder proyek: public/images/services/nama-file.jpg
  2. Ubah 'image' menjadi: '/images/services/nama-file.jpg'
  
  OPSI 2 (GOOGLE DRIVE):
  1. Pastikan akses file di GDrive "Anyone with the link".
  2. Ambil ID file dari link share. 
     Contoh Link: https://drive.google.com/file/d/123456AbCdEfG/view
     ID nya adalah: 123456AbCdEfG
  3. Gunakan format ini: 'https://drive.google.com/uc?export=view&id=ID_FILE_ANDA'
*/

export const SERVICES: ServiceItem[] = [
  {
    id: 'printer',
    title: 'Printer Solution & Refill',
    problem: 'Biaya cetak membengkak dan operasional terhambat karena printer rusak atau tinta habis mendadak.',
    solution: 'Kami menyediakan penyewaan printer korporat, penjualan unit baru, dan isi ulang tinta berkualitas tinggi.',
    benefit: 'Efisiensi biaya operasional hingga 40% dan jaminan kelancaran dokumen bisnis Anda.',
    icon: 'printer',
    // Ganti URL di bawah dengan Link GDrive Anda atau '/images/services/printer.jpg'
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c4603e1?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'hardware',
    title: 'Computer Hardware & Acc',
    problem: 'Perangkat lemot dan spesifikasi yang tidak sesuai menghambat produktivitas karyawan.',
    solution: 'Pengadaan PC, Laptop, dan aksesoris IT orisinal dengan spesifikasi tepat guna untuk kebutuhan bisnis.',
    benefit: 'Peningkatan produktivitas tim dengan perangkat yang andal dan bergaransi resmi.',
    icon: 'monitor',
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cctv',
    title: 'CCTV & Security System',
    problem: 'Rasa tidak aman terhadap aset fisik kantor atau rumah saat tidak dipantau secara langsung.',
    solution: 'Instalasi sistem keamanan CCTV berbasis IP atau Analog dengan fitur pemantauan remote via smartphone.',
    benefit: 'Keamanan 24/7 dan ketenangan pikiran dengan sistem monitoring aset yang cerdas.',
    icon: 'video',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'network',
    title: 'Network Infrastructure',
    problem: 'Koneksi internet tidak stabil, WiFi "dead zone", dan keamanan jaringan yang rentan serangan.',
    solution: 'Instalasi jaringan LAN, sistem WiFi Mesh, dan konfigurasi sistem keamanan jaringan (firewall/mikrotik).',
    benefit: 'Konektivitas tanpa hambatan yang mendukung kolaborasi digital dan keamanan data perusahaan.',
    icon: 'network',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bbcbf?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'maintenance',
    title: 'IT Support & Maintenance',
    problem: 'Tidak memiliki tim IT internal namun sering mengalami kendala teknis yang mengganggu operasional.',
    solution: 'Layanan IT support panggilan (on-call) dan kontrak maintenance rutin untuk menjaga stabilitas sistem.',
    benefit: 'Solusi IT instan tanpa biaya gaji tim internal, memastikan operasional tetap berjalan 24/7.',
    icon: 'shield-check',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a783?q=80&w=800&auto=format&fit=crop'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Epson EcoTank L3210',
    category: 'printer',
    description: 'Printer multifungsi (Print, Scan, Copy) dengan sistem tangki tinta hemat biaya.',
    price: 'Rp 2.xxx.xxx',
    // Contoh jika pakai GDrive: 'https://drive.google.com/uc?export=view&id=1A2B3C...'
    image: '/images/products/epson-l3210.jpg', 
    isPopular: true,
    tokopediaUrl: 'https://www.tokopedia.com',
    shopeeUrl: 'https://shopee.co.id'
  },
  {
    id: 'p2',
    name: 'HP LaserJet Pro M12w',
    category: 'printer',
    description: 'Printer laser monochrome cepat dengan konektivitas WiFi untuk kantor.',
    price: 'Rp 1.xxx.xxx',
    image: '/images/products/hp-laserjet.jpg',
    tokopediaUrl: 'https://www.tokopedia.com',
    shopeeUrl: 'https://shopee.co.id'
  },
  {
    id: 'h1',
    name: 'ASUS ExpertBook B1',
    category: 'hardware',
    description: 'Laptop bisnis tangguh dengan performa tinggi untuk produktivitas tim.',
    price: 'Rp 7.xxx.xxx',
    image: '/images/products/asus-expertbook.jpg',
    isPopular: true,
    tokopediaUrl: 'https://www.tokopedia.com',
    shopeeUrl: 'https://shopee.co.id'
  },
  {
    id: 'h2',
    name: 'PC Desktop Business Core i5',
    category: 'hardware',
    description: 'Set komputer desktop optimal untuk admin dan manajemen kantor.',
    price: 'Rp 5.xxx.xxx',
    image: '/images/products/pc-desktop.jpg',
    tokopediaUrl: 'https://www.tokopedia.com',
    shopeeUrl: 'https://shopee.co.id'
  },
  {
    id: 'c1',
    name: 'Hikvision IP Cam 2MP',
    category: 'cctv',
    description: 'Kamera pengawas Full HD dengan infrared untuk pantauan malam hari.',
    price: 'Rp 4xx.xxx',
    image: '/images/products/cctv-hikvision.jpg',
    isPopular: true,
    tokopediaUrl: 'https://www.tokopedia.com',
    shopeeUrl: 'https://shopee.co.id'
  },
  {
    id: 'c2',
    name: 'Dahua 4CH DVR Kit',
    category: 'cctv',
    description: 'Paket lengkap 4 kamera analog HD untuk keamanan rumah & toko.',
    price: 'Rp 2.xxx.xxx',
    image: '/images/products/dahua-dvr.jpg',
    tokopediaUrl: 'https://www.tokopedia.com',
    shopeeUrl: 'https://shopee.co.id'
  },
  {
    id: 'a1',
    name: 'Logitech MK220 Wireless',
    category: 'accessories',
    description: 'Set keyboard dan mouse wireless hemat ruang dengan baterai tahan lama.',
    price: 'Rp 2xx.xxx',
    image: '/images/products/keyboard-logitech.jpg',
    tokopediaUrl: 'https://www.tokopedia.com',
    shopeeUrl: 'https://shopee.co.id'
  },
  {
    id: 'a2',
    name: 'TP-Link Archer AX10',
    category: 'accessories',
    description: 'Router WiFi 6 terbaru untuk koneksi internet ultra cepat dan stabil.',
    price: 'Rp 6xx.xxx',
    image: '/images/products/router-tplink.jpg',
    tokopediaUrl: 'https://www.tokopedia.com',
    shopeeUrl: 'https://shopee.co.id'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Budi Santoso",
    role: "CEO",
    company: "PT. Digital Maju Utama",
    quote: "Mitrafix sangat membantu pengadaan hardware kantor kami. Proses cepat dan teknisinya sangat handal. Rekomendasi utama untuk partner IT B2B.",
    image: "https://i.pravatar.cc/150?u=budi"
  },
  {
    id: 2,
    name: "Siti Aminah",
    role: "Operational Manager",
    company: "Cafe Kopi Senja",
    quote: "Pemasangan CCTV dan WiFi di cafe kami sangat rapi. Sekarang pantau bisnis jadi lebih tenang dari mana saja lewat HP. Supportnya sangat responsif!",
    image: "https://i.pravatar.cc/150?u=siti"
  },
  {
    id: 3,
    name: "Andi Wijaya",
    role: "IT Admin",
    company: "Sekolah Harapan Bangsa",
    quote: "Layanan kontrak maintenance printer Mitrafix sangat efisien. Tidak ada lagi kendala cetak dokumen mendadak di sekolah. Tinta selalu ready.",
    image: "https://i.pravatar.cc/150?u=andi"
  }
];

export const SERVICE_ICONS: Record<string, React.ReactNode> = {
  printer: <Printer className="w-8 h-8" />,
  monitor: <Monitor className="w-8 h-8" />,
  video: <Video className="w-8 h-8" />,
  network: <Network className="w-8 h-8" />,
  'shield-check': <ShieldCheck className="w-8 h-8" />,
  briefcase: <Briefcase className="w-8 h-8" />,
};
