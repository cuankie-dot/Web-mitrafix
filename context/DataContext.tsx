
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ServiceItem, Product, Testimonial, Partner } from '../types';
import { 
  SERVICES as INITIAL_SERVICES, 
  SERVICES, 
  PRODUCTS as INITIAL_PRODUCTS, 
  TESTIMONIALS as INITIAL_TESTIMONIALS,
  PARTNERS as INITIAL_PARTNERS 
} from '../constants';
import { supabase, isConfigured } from '../lib/supabase';

interface DataContextType {
  services: ServiceItem[];
  products: Product[];
  testimonials: Testimonial[];
  partners: Partner[];
  isLoading: boolean;
  isUsingFallback: boolean;
  // Chat Integration States
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  pendingChatMessage: string | null;
  setPendingChatMessage: (msg: string | null) => void;
}

const DataContext = createContext<DataContextType>({
  services: [],
  products: [],
  testimonials: [],
  partners: [],
  isLoading: true,
  isUsingFallback: false,
  isChatOpen: false,
  setIsChatOpen: () => {},
  pendingChatMessage: null,
  setPendingChatMessage: () => {},
});

export const useData = () => useContext(DataContext);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  
  // Chat States
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [pendingChatMessage, setPendingChatMessage] = useState<string | null>(null);

  const loadData = async () => {
    if (!isConfigured) {
      setServices(INITIAL_SERVICES);
      setProducts(INITIAL_PRODUCTS);
      setTestimonials(INITIAL_TESTIMONIALS);
      setPartners(INITIAL_PARTNERS);
      setIsUsingFallback(true);
      setIsLoading(false);
      return;
    }

    try {
      const [servicesRes, productsRes, testimonialsRes, partnersRes] = await Promise.all([
        supabase.from('services').select('*').order('id'),
        supabase.from('products').select('*').order('id'),
        supabase.from('testimonials').select('*').order('id'),
        supabase.from('partners').select('*').order('id')
      ]);

      if (servicesRes.error) throw servicesRes.error;
      if (productsRes.error) throw productsRes.error;
      if (testimonialsRes.error) throw testimonialsRes.error;

      const dbServices = servicesRes.data as ServiceItem[];
      const dbProducts = productsRes.data as Product[];
      const dbTestimonials = testimonialsRes.data as Testimonial[];
      const dbPartners = partnersRes.data as Partner[];

      setServices(dbServices && dbServices.length > 0 ? dbServices : INITIAL_SERVICES);
      setProducts(dbProducts && dbProducts.length > 0 ? dbProducts : INITIAL_PRODUCTS);
      setTestimonials(dbTestimonials && dbTestimonials.length > 0 ? dbTestimonials : INITIAL_TESTIMONIALS);
      setPartners(dbPartners && dbPartners.length > 0 ? dbPartners : INITIAL_PARTNERS);
      
      const isEmptyDB = (!dbServices || dbServices.length === 0) && (!dbProducts || dbProducts.length === 0);
      setIsUsingFallback(isEmptyDB);

    } catch (error) {
      setServices(INITIAL_SERVICES);
      setProducts(INITIAL_PRODUCTS);
      setTestimonials(INITIAL_TESTIMONIALS);
      setPartners(INITIAL_PARTNERS);
      setIsUsingFallback(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    if (isConfigured) {
      const channel = supabase.channel('public:db_changes')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public' },
          (payload: any) => {
            loadData();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, []);

  return (
    <DataContext.Provider value={{ 
      services, products, testimonials, partners, isLoading, isUsingFallback,
      isChatOpen, setIsChatOpen, pendingChatMessage, setPendingChatMessage
    }}>
      {children}
    </DataContext.Provider>
  );
};
