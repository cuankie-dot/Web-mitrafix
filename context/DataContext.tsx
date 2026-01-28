import React, { createContext, useContext, useState, useEffect } from 'react';
import { ServiceItem, Product, Testimonial } from '../types';
import { SERVICES as INITIAL_SERVICES, PRODUCTS as INITIAL_PRODUCTS, TESTIMONIALS as INITIAL_TESTIMONIALS } from '../constants';
import { supabase, isConfigured } from '../lib/supabase';

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
      // Kita langsung mencoba fetch ke Supabase tanpa pengecekan manual env variable.
      // Supabase client di lib/supabase.ts sudah pintar menangani fallback.
      
      const [servicesRes, productsRes, testimonialsRes] = await Promise.all([
        supabase.from('services').select('*').order('id'),
        supabase.from('products').select('*').order('id'),
        supabase.from('testimonials').select('*').order('id')
      ]);

      // Cek error dari response Supabase
      if (servicesRes.error) throw servicesRes.error;
      if (productsRes.error) throw productsRes.error;
      if (testimonialsRes.error) throw testimonialsRes.error;

      // SMART DATA HANDLING:
      // Jika koneksi sukses TAPI datanya kosong (karena database baru dibuat),
      // kita tampilkan data template (INITIAL_...) agar website tetap terlihat bagus.
      // Jika ada data, kita pakai data dari database.

      const dbServices = servicesRes.data as ServiceItem[];
      const dbProducts = productsRes.data as Product[];
      const dbTestimonials = testimonialsRes.data as Testimonial[];

      setServices(dbServices.length > 0 ? dbServices : INITIAL_SERVICES);
      setProducts(dbProducts.length > 0 ? dbProducts : INITIAL_PRODUCTS);
      setTestimonials(dbTestimonials.length > 0 ? dbTestimonials : INITIAL_TESTIMONIALS);
      
      // Jika database kosong, kita anggap masih menggunakan fallback data secara visual
      // meskipun koneksi database sukses (agar user tidak bingung kenapa kosong)
      const isEmptyDB = dbServices.length === 0 && dbProducts.length === 0;
      setIsUsingFallback(!isConfigured || isEmptyDB);

      if (isConfigured && isEmptyDB) {
        console.log("[DataContext] Koneksi DB Sukses tapi data kosong. Menampilkan Template Data.");
      }

    } catch (error) {
      console.warn("[DataContext] Gagal mengambil data. Mengaktifkan Mode Offline/Statis.", error);
      // Fallback total jika terjadi error jaringan atau konfigurasi salah
      setServices(INITIAL_SERVICES);
      setProducts(INITIAL_PRODUCTS);
      setTestimonials(INITIAL_TESTIMONIALS);
      setIsUsingFallback(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    // Subscribe ke perubahan Realtime
    const channel = supabase.channel('public:db_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public' },
        (payload: any) => {
          console.log('Update Realtime diterima:', payload);
          loadData();
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
