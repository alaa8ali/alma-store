'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ar: {
    // Header
    'site.title': 'alma',
    'language.toggle': 'English',
    'cart.items': 'عنصر',
    
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.products': 'المنتجات',
    'nav.cart': 'السلة',
    
    // Categories
    'category.drinks': 'مشروبات',
    'category.sweets': 'حلويات',
    'category.biscuits': 'بسكويت',
    'category.cleaning': 'منظفات',
    'category.food': 'مواد غذائية',
    'category.all': 'جميع المنتجات',
    
    // Product
    'product.add': 'إضافة للسلة',
    'product.price': 'ل.س',
    'product.unit': 'قطعة',
    'product.carton': 'كرتونة',
    'product.viewDetails': 'عرض التفاصيل',
    'product.variants': 'الأنواع المتاحة',
    'product.selectVariant': 'اختر النوع',
    
    // Search
    'search.placeholder': 'ابحث عن منتج...',
    'search.noResults': 'لا توجد منتجات مطابقة لبحثك',
    
    // Cart
    'cart.title': 'سلة المشتريات',
    'cart.empty': 'سلتك فارغة',
    'cart.total': 'المجموع',
    'cart.quantity': 'الكمية',
    'cart.remove': 'حذف',
    'cart.sendWhatsapp': 'إرسال الطلب عبر واتساب',
    'cart.shareLocation': 'مشاركة الموقع',
    
    // WhatsApp
    'whatsapp.orderHeader': 'طلب جديد من alma',
    'whatsapp.products': 'المنتجات:',
    'whatsapp.total': 'المجموع الكلي:',
    'whatsapp.currency': 'ل.س',
    'whatsapp.location': 'الموقع الجغرافي:',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ',
    'common.retry': 'إعادة المحاولة',
  },
  en: {
    // Header
    'site.title': 'alma',
    'language.toggle': 'العربية',
    'cart.items': 'items',
    
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.cart': 'Cart',
    
    // Categories
    'category.drinks': 'Drinks',
    'category.sweets': 'Sweets',
    'category.biscuits': 'Biscuits',
    'category.cleaning': 'Cleaning',
    'category.food': 'Food',
    'category.all': 'All Products',
    
    // Product
    'product.add': 'Add to Cart',
    'product.price': 'SYP',
    'product.unit': 'piece',
    'product.carton': 'carton',
    'product.viewDetails': 'View Details',
    'product.variants': 'Available Types',
    'product.selectVariant': 'Select Type',
    
    // Search
    'search.placeholder': 'Search for a product...',
    'search.noResults': 'No products match your search',
    
    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.total': 'Total',
    'cart.quantity': 'Quantity',
    'cart.remove': 'Remove',
    'cart.sendWhatsapp': 'Send Order via WhatsApp',
    'cart.shareLocation': 'Share Location',
    
    // WhatsApp
    'whatsapp.orderHeader': 'New Order from alma',
    'whatsapp.products': 'Products:',
    'whatsapp.total': 'Total Amount:',
    'whatsapp.currency': 'SYP',
    'whatsapp.location': 'Location:',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.retry': 'Retry',
  }
};

export function Providers({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('alma-language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
    
    // Update document direction and lang
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    const newLanguage = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLanguage);
    localStorage.setItem('alma-language', newLanguage);
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLanguage;
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ar']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}