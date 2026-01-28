import React, { createContext, useContext, useState, useEffect } from 'react';
import { ServiceItem, Product, Testimonial } from '../types';
import { SERVICES as INITIAL_SERVICES, PRODUCTS as INITIAL_PRODUCTS, TESTIMONIALS as INITIAL_TESTIMONIALS } from '../constants';
import { supabase } from '../lib/supabase';

interface DataContextType {
  services: ServiceItem[];
  products: Product[];
  testimonials: Testimonial[];
  isLoading: boolean;
  isUsingFallback: boolean;
}

const DataContext = createContext<DataContextType>({
  services: [],
  products: [],
  testimonials: [],
  isLoading: true,
  isUsingFallback: false,
});

export const useData = () => useContext(DataContext);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  const loadData = async () => {
    try {
      // Access import.meta.env safely by casting to any to avoid TS errors
      const env = (import.meta as any).env;

      // Cek apakah env variable sudah diset
      if (!env?.VITE_SUPABASE_URL || env?.VITE_SUPABASE_URL.includes('your-project-url')) {
        throw new Error("Supabase not configured");
      }

      // Fetch semua data secara paralel
      const [servicesRes, productsRes, testimonialsRes] = await Promise.all([
        supabase.from('services').select('*').order('id'),
        supabase.from('products').select('*').order('id'),
        supabase.from('testimonials').select('*').order('id')
      ]);

      // Cek error satu per satu
      if (servicesRes.error) throw servicesRes.error;
      if (productsRes.error) throw productsRes.error;
      if (testimonialsRes.error) throw testimonialsRes.error;

      // Jika sukses, set data dari database
      // PENTING: Jika tabel kosong (0 rows), ini akan mereturn array kosong [], bukan error.
      // Website akan terlihat kosong di bagian produk/service jika data DB belum diisi.
      setServices(servicesRes.data as ServiceItem[]);
      setProducts(productsRes.data as Product[]);
      setTestimonials(testimonialsRes.data as Testimonial[]);
      setIsUsingFallback(false);

    } catch (error) {
      console.warn("Gagal connect ke Supabase. Mengaktifkan Fallback Mode (Data Lokal).", error);
      // Fallback ke data statis
      setServices(INITIAL_SERVICES);
      setProducts(INITIAL_PRODUCTS);
      setTestimonials(INITIAL_TESTIMONIALS);
      setIsUsingFallback(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 1. Load data pertama kali
    loadData();

    // 2. Subscribe ke perubahan Realtime (Live Update)
    // Fitur ini membuat website otomatis update saat Anda edit data di Supabase Dashboard
    const channel = supabase.channel('public:db_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public' },
        (payload) => {
          console.log('Ada perubahan data di database:', payload);
          loadData(); // Refresh data otomatis
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <DataContext.Provider value={{ services, products, testimonials, isLoading, isUsingFallback }}>
      {children}
    </DataContext.Provider>
  );
};