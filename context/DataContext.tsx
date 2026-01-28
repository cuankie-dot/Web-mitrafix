import React, { createContext, useContext, useState, useEffect } from 'react';
import { ServiceItem, Product, Testimonial } from '../types';
import { SERVICES as INITIAL_SERVICES, PRODUCTS as INITIAL_PRODUCTS, TESTIMONIALS as INITIAL_TESTIMONIALS } from '../constants';
import { supabase } from '../lib/supabase';

interface DataContextType {
  services: ServiceItem[];
  products: Product[];
  testimonials: Testimonial[];
  isLoading: boolean;
}

const DataContext = createContext<DataContextType>({
  services: [],
  products: [],
  testimonials: [],
  isLoading: true,
});

export const useData = () => useContext(DataContext);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        // Access import.meta.env safely by casting to any to avoid TS errors
        const env = (import.meta as any).env;

        // Cek apakah env variable sudah diset
        if (!env?.VITE_SUPABASE_URL || env?.VITE_SUPABASE_URL.includes('your-project-url')) {
          console.log("Menggunakan data lokal (Supabase belum dikonfigurasi)");
          throw new Error("Supabase not configured");
        }

        // 1. Fetch Services
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('*')
          .order('id');
        
        if (servicesError) throw servicesError;

        // 2. Fetch Products
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .order('id');
          
        if (productsError) throw productsError;

        // 3. Fetch Testimonials
        const { data: testimonialsData, error: testimonialsError } = await supabase
          .from('testimonials')
          .select('*')
          .order('id');

        if (testimonialsError) throw testimonialsError;

        setServices(servicesData as ServiceItem[]);
        setProducts(productsData as Product[]);
        setTestimonials(testimonialsData as Testimonial[]);

      } catch (error) {
        console.warn("Gagal mengambil data dari Supabase, menggunakan data lokal (constants.tsx).", error);
        // Fallback ke data statis jika koneksi gagal atau belum disetup
        setServices(INITIAL_SERVICES);
        setProducts(INITIAL_PRODUCTS);
        setTestimonials(INITIAL_TESTIMONIALS);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <DataContext.Provider value={{ services, products, testimonials, isLoading }}>
      {children}
    </DataContext.Provider>
  );
};