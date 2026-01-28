
export interface ServiceItem {
  id: string;
  title: string;
  problem: string;
  solution: string;
  benefit: string;
  icon: string;
  image: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'printer' | 'hardware' | 'accessories' | 'cctv';
  description: string;
  price: string;
  image: string;
  isPopular?: boolean;
  tokopediaUrl?: string;
  shopeeUrl?: string;
}
