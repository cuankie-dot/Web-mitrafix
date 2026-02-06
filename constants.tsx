
import React from 'react';
import { 
  Printer, Monitor, Video, Network, ShieldCheck, Briefcase, Wifi, 
  Server, Cloud, Smartphone, Wrench, Code, Database, Zap 
} from 'lucide-react';
import { ServiceItem, NavLink, Testimonial, Product, Partner } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Beranda', href: 'home' },
  { label: 'Tentang Kami', href: 'about' },
  { label: 'Layanan IT', href: 'services' },
  { label: 'Katalog Produk', href: 'products' },
  { label: 'Keunggulan', href: 'why-us' },
  { label: 'Kontak Admin', href: 'contact' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'printer',
    title: 'Service Printer & Refill Tinta Jakarta',
    problem: 'Biaya cetak membengkak dan operasional terhambat karena printer rusak atau tinta habis mendadak di kantor.',
    solution: 'Kami melayani service printer panggilan, sewa printer kantor (B2B), dan refill tinta berkualitas tinggi untuk semua merk.',
    benefit: 'Hemat biaya operasional hingga 40% dengan jaminan printer tetap prima setiap saat.',
    icon: 'printer',
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c4603e1?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'hardware',
    title: 'Hardware Komputer & IT Procurement',
    problem: 'Perangkat PC atau Laptop lemot menghambat produktivitas karyawan dan operasional perusahaan.',
    solution: 'Pengadaan unit PC, Laptop, dan server kantor orisinal dengan spesifikasi yang disesuaikan anggaran bisnis Anda.',
    benefit: 'Efisiensi kerja maksimal dengan perangkat IT yang andal, baru, dan bergaransi resmi.',
    icon: 'monitor',
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cctv',
    title: 'Instalasi CCTV Jakarta',
    problem: 'Kurangnya pengawasan keamanan pada aset kantor, gudang, atau rumah saat Anda sedang tidak di lokasi.',
    solution: 'Pemasangan paket CCTV IP Camera & Analog dengan fitur remote monitoring via Smartphone 24/7.',
    benefit: 'Pantau aset secara real-time dari mana saja, memberikan ketenangan pikiran bagi pemilik bisnis.',
    icon: 'video',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'network',
    title: 'Instalasi Jaringan LAN & Wifi',
    problem: 'Koneksi internet kantor tidak stabil atau sinyal WiFi tidak merata (dead zone) di area kerja.',
    solution: 'Pemasangan jaringan LAN, setup Mikrotik, dan WiFi Mesh profesional untuk kantor, cafe, dan rumah.',
    benefit: 'Konektivitas internet stabil tanpa hambatan untuk mendukung kolaborasi tim secara digital.',
    icon: 'network',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bbcbf?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'maintenance',
    title: 'Kontrak Maintenance IT Kantor',
    problem: 'Sering terjadi kendala IT mendadak tapi tidak memiliki tim IT internal yang standby setiap saat.',
    solution: 'Layanan IT Support panggilan dan kontrak perawatan (maintenance) rutin bulanan untuk seluruh sistem IT kantor.',
    benefit: 'Operasional bisnis berjalan lancar tanpa gangguan teknis dengan biaya jauh lebih hemat daripada hire tim IT.',
    icon: 'shield-check',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a783?q=80&w=800&auto=format&fit=crop'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Epson EcoTank L3210 Original',
    category: 'printer',
    description: 'Printer multifungsi terbaik untuk kantor UMKM dengan sistem tangki tinta ultra hemat.',
    price: 'Hubungi Admin',
    image: 'https://715udgq2n1apqtj8.public.blob.vercel-storage.com/image/products/epson-l3210.jpg', 
    isPopular: true,
    tokopediaUrl: 'https://www.tokopedia.com',
    shopeeUrl: 'https://shopee.co.id'
  },
  {
    id: 'c1',
    name: 'Paket CCTV Hikvision 2MP',
    category: 'cctv',
    description: 'Paket keamanan lengkap 4 kamera dengan infrared untuk pantauan jernih siang dan malam.',
    price: 'Promo Khusus',
    image: 'https://715udgq2n1apqtj8.public.blob.vercel-storage.com/image/products/cctv-hikvision.jpg',
    isPopular: true,
    tokopediaUrl: 'https://www.tokopedia.com',
    shopeeUrl: 'https://shopee.co.id'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Budi Santoso",
    role: "CEO",
    company: "PT. Maju Digital Jakarta",
    quote: "Mitrafix adalah vendor IT terbaik di Jakarta Selatan. Respon cepat untuk service printer panggilan sangat membantu operasional kantor kami.",
    image: "https://i.pravatar.cc/150?u=budi"
  },
  {
    id: 2,
    name: "Siti Aminah",
    role: "Operational Manager",
    company: "Resto Senja Jagakarsa",
    quote: "Pemasangan CCTV dan WiFi di resto kami sangat rapi. Tim teknisinya sangat paham seluk beluk jaringan. Recommended!",
    image: "https://i.pravatar.cc/150?u=siti"
  }
];

// Data Dummy Partner (Logo Brand IT Populer)
export const PARTNERS: Partner[] = [
  { id: 1, name: "Epson", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Epson_logo_2017.svg" },
  { id: 2, name: "Canon", logo: "https://upload.wikimedia.org/wikipedia/commons/3/36/Canon_svg_logo.svg" },
  { id: 3, name: "HP", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg" },
  { id: 4, name: "Hikvision", logo: "https://upload.wikimedia.org/wikipedia/commons/2/22/Hikvision_logo.svg" },
  { id: 5, name: "Dahua", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Dahua_Technology_logo.svg" },
  { id: 6, name: "Mikrotik", logo: "https://upload.wikimedia.org/wikipedia/commons/3/36/MikroTik_Logo.svg" },
  { id: 7, name: "TP-Link", logo: "https://upload.wikimedia.org/wikipedia/commons/e/ee/TP-Link_Logo.svg" },
  { id: 8, name: "Lenovo", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg" }
];

export const SERVICE_ICONS: Record<string, React.ReactNode> = {
  printer: <Printer className="w-8 h-8" />,
  monitor: <Monitor className="w-8 h-8" />,
  cctv: <Video className="w-8 h-8" />,
  video: <Video className="w-8 h-8" />,
  wifi: <Wifi className="w-8 h-8" />,
  network: <Network className="w-8 h-8" />,
  'shield-check': <ShieldCheck className="w-8 h-8" />,
  briefcase: <Briefcase className="w-8 h-8" />,
  server: <Server className="w-8 h-8" />,
  cloud: <Cloud className="w-8 h-8" />,
  phone: <Smartphone className="w-8 h-8" />,
  maintenance: <Wrench className="w-8 h-8" />,
  code: <Code className="w-8 h-8" />,
  database: <Database className="w-8 h-8" />,
  default: <Zap className="w-8 h-8" />
};
