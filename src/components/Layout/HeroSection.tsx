import React from 'react';
import { Truck, Search, Clock, Shield } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 py-12 lg:py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-600 transform rotate-12 scale-150"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 text-center lg:text-right">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight">
              مرحباً بكم في
              <span className="block bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent mt-2">
                متجر ألما
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
              متجركم الإلكتروني الشامل في الساحل السوري
              <br />
              بقالة • ملابس • إلكترونيات • خدمات منزلية
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-end gap-4 text-sm">
              <div className="flex items-center space-x-2 rtl:space-x-reverse bg-white bg-opacity-80 px-4 py-2 rounded-full">
                <Truck className="h-5 w-5 text-sky-600" />
                <span className="text-gray-700 font-medium">توصيل سريع</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse bg-white bg-opacity-80 px-4 py-2 rounded-full">
                <Search className="h-5 w-5 text-sky-600" />
                <span className="text-gray-700 font-medium">بحث ذكي</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse bg-white bg-opacity-80 px-4 py-2 rounded-full">
                <Clock className="h-5 w-5 text-sky-600" />
                <span className="text-gray-700 font-medium">خدمة 24/7</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse bg-white bg-opacity-80 px-4 py-2 rounded-full">
                <Shield className="h-5 w-5 text-sky-600" />
                <span className="text-gray-700 font-medium">شراء آمن</span>
              </div>
            </div>
            
            <div className="pt-4">
              <div className="bg-white bg-opacity-90 rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">
                  ساعات العمل
                </h3>
                <p className="text-gray-600 text-center">
                  يومياً من 9 صباحاً حتى 10 مساءً
                </p>
                <div className="mt-3 text-center">
                  <a 
                    href="https://wa.me/963983012001" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl font-medium transition-colors duration-300"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.108"/>
                    </svg>
                    <span>+963 983 012 001</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <div className="relative transform lg:scale-110">
              <img
                src="/images/hero-banner.jpg"
                alt="متجر ألما"
                className="w-full h-64 lg:h-96 object-cover rounded-3xl shadow-2xl"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/600x400/e0f2fe/0369a1?text=متجر+ألما';
                }}
              />
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-xl font-bold text-sm animate-bounce">
                🔥 عروض خاصة
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-green-500 text-white px-4 py-2 rounded-xl font-bold text-sm">
                🚚 توصيل مجاني
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}