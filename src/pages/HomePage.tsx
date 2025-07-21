import React from 'react';
import { HeroSection } from '../components/Layout/HeroSection';
import { ProductGrid } from '../components/Product/ProductGrid';
import { ServiceGrid } from '../components/Service/ServiceGrid';
import { useApp } from '../contexts/AppContext';
import { useSearch } from '../hooks/useSearch';

export function HomePage() {
  const { products, services } = useApp();
  const { getFeaturedProducts, getDiscountedProducts, getProductsByCategory } = useSearch(products, services);
  
  const featuredProducts = getFeaturedProducts();
  const discountedProducts = getDiscountedProducts();
  const groceryProducts = getProductsByCategory('1', 4); // Grocery category
  const clothingProducts = getProductsByCategory('2', 4); // Clothing category
  const electronicsProducts = getProductsByCategory('3', 4); // Electronics category
  
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="container mx-auto px-4">
          <ProductGrid 
            products={featuredProducts} 
            title="منتجات مميزة" 
            showTitle={true}
          />
        </section>
      )}
      
      {/* Discounted Products */}
      {discountedProducts.length > 0 && (
        <section className="container mx-auto px-4 bg-gradient-to-r from-red-50 to-pink-50 py-16 rounded-3xl">
          <ProductGrid 
            products={discountedProducts} 
            title="🔥 عروض وتخفيضات" 
            showTitle={true}
          />
        </section>
      )}
      
      {/* Category Sections */}
      {groceryProducts.length > 0 && (
        <section className="container mx-auto px-4">
          <ProductGrid 
            products={groceryProducts} 
            title="🛒 بقالة ومواد غذائية" 
            showTitle={true}
          />
        </section>
      )}
      
      {clothingProducts.length > 0 && (
        <section className="container mx-auto px-4 bg-gradient-to-r from-purple-50 to-pink-50 py-16 rounded-3xl">
          <ProductGrid 
            products={clothingProducts} 
            title="👕 ملابس وأزياء" 
            showTitle={true}
          />
        </section>
      )}
      
      {electronicsProducts.length > 0 && (
        <section className="container mx-auto px-4">
          <ProductGrid 
            products={electronicsProducts} 
            title="📱 إلكترونيات وتقنية" 
            showTitle={true}
          />
        </section>
      )}
      
      {/* Home Services */}
      {services.length > 0 && (
        <section className="container mx-auto px-4 bg-gradient-to-r from-orange-50 to-yellow-50 py-16 rounded-3xl">
          <ServiceGrid 
            services={services} 
            title="🛠️ خدمات منزلية متخصصة" 
            showTitle={true}
          />
        </section>
      )}
      
      {/* Contact Section */}
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-sky-600 to-blue-700 rounded-3xl p-8 lg:p-12 text-white text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">هل تحتاج مساعدة؟</h2>
          <p className="text-xl text-sky-100 mb-8">
            نحن هنا لمساعدتك! تواصل معنا عبر الواتساب للحصول على أفضل خدمة
          </p>
          <a 
            href="https://wa.me/963983012001" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 rtl:space-x-reverse bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.108"/>
            </svg>
            <span>تواصل عبر الواتساب</span>
          </a>
        </div>
      </section>
    </div>
  );
}