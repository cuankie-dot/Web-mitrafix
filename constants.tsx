
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

export const SERVICES: ServiceItem[] = [
  {
    id: 'printer',
    title: 'Printer Solution & Refill',
    problem: 'Biaya cetak membengkak dan operasional terhambat karena printer rusak atau tinta habis mendadak.',
    solution: 'Kami menyediakan penyewaan printer korporat, penjualan unit baru, dan isi ulang tinta berkualitas tinggi.',
    benefit: 'Efisiensi biaya operasional hingga 40% dan jaminan kelancaran dokumen bisnis Anda.',
    icon: 'printer'
  },
  {
    id: 'hardware',
    title: 'Computer Hardware & Acc',
    problem: 'Perangkat lemot dan spesifikasi yang tidak sesuai menghambat produktivitas karyawan.',
    solution: 'Pengadaan PC, Laptop, dan aksesoris IT orisinal dengan spesifikasi tepat guna untuk kebutuhan bisnis.',
    benefit: 'Peningkatan produktivitas tim dengan perangkat yang andal dan bergaransi resmi.',
    icon: 'monitor'
  },
  {
    id: 'cctv',
    title: 'CCTV & Security System',
    problem: 'Rasa tidak aman terhadap aset fisik kantor atau rumah saat tidak dipantau secara langsung.',
    solution: 'Instalasi sistem keamanan CCTV berbasis IP atau Analog dengan fitur pemantauan remote via smartphone.',
    benefit: 'Keamanan 24/7 dan ketenangan pikiran dengan sistem monitoring aset yang cerdas.',
    icon: 'video'
  },
  {
    id: 'network',
    title: 'Network Infrastructure',
    problem: 'Koneksi internet tidak stabil, WiFi "dead zone", dan keamanan jaringan yang rentan serangan.',
    solution: 'Instalasi jaringan LAN, sistem WiFi Mesh, dan konfigurasi sistem keamanan jaringan (firewall/mikrotik).',
    benefit: 'Konektivitas tanpa hambatan yang mendukung kolaborasi digital dan keamanan data perusahaan.',
    icon: 'network'
  },
  {
    id: 'maintenance',
    title: 'IT Support & Maintenance',
    problem: 'Tidak memiliki tim IT internal namun sering mengalami kendala teknis yang mengganggu operasional.',
    solution: 'Layanan IT support panggilan (on-call) dan kontrak maintenance rutin untuk menjaga stabilitas sistem.',
    benefit: 'Solusi IT instan tanpa biaya gaji tim internal, memastikan operasional tetap berjalan 24/7.',
    icon: 'shield-check'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Epson EcoTank L3210',
    category: 'printer',
    description: 'Printer multifungsi (Print, Scan, Copy) dengan sistem tangki tinta hemat biaya.',
    price: 'Rp 2.xxx.xxx',
    // Ganti file di folder: public/images/products/epson-l3210.jpg
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
    // Ganti file di folder: public/images/products/hp-laserjet.jpg
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
    // Ganti file di folder: public/images/products/asus-expertbook.jpg
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
    // Ganti file di folder: public/images/products/pc-desktop.jpg
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
    // Ganti file di folder: public/images/products/cctv-hikvision.jpg
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
    // Ganti file di folder: public/images/products/dahua-dvr.jpg
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
    // Ganti file di folder: public/images/products/keyboard-logitech.jpg
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
    // Ganti file di folder: public/images/products/router-tplink.jpg
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
