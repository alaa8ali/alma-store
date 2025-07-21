import React from 'react';
import { Phone, MapPin, Clock, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export function Footer() {
  const { settings } = useApp();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Store Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <img 
                src="/images/logo.png" 
                alt="Alma Store" 
                className="h-12 w-auto rounded-lg"
              />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                {settings.storeNameAr}
              </h3>
            </div>
            
            <p className="text-gray-300 text-right leading-relaxed">
              متجركم الإلكتروني الشامل لجميع احتياجاتكم اليومية.
              بقالة، ملابس، إلكترونيات، وخدمات منزلية
              بجودة عالية وأسعار منافسة.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <a 
                href="#" 
                className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-sky-500 hover:bg-sky-600 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-right mb-6">معلومات التواصل</h4>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone className="h-5 w-5 text-sky-400 flex-shrink-0" />
                <div className="text-right">
                  <p className="text-gray-300">هاتف وواتساب</p>
                  <a 
                    href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                    className="text-green-400 hover:text-green-300 font-medium transition-colors duration-300"
                  >
                    {settings.whatsappNumber}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <MapPin className="h-5 w-5 text-sky-400 flex-shrink-0" />
                <div className="text-right">
                  <p className="text-gray-300">الموقع</p>
                  <p className="text-white font-medium">{settings.locationAr}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Clock className="h-5 w-5 text-sky-400 flex-shrink-0" />
                <div className="text-right">
                  <p className="text-gray-300">ساعات العمل</p>
                  <p className="text-white font-medium">{settings.workingHoursAr}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail className="h-5 w-5 text-sky-400 flex-shrink-0" />
                <div className="text-right">
                  <p className="text-gray-300">البريد الإلكتروني</p>
                  <a 
                    href="mailto:info@alma-store.com"
                    className="text-sky-400 hover:text-sky-300 font-medium transition-colors duration-300"
                  >
                    info@alma-store.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-right mb-6">روابط سريعة</h4>
            
            <div className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-300 text-right py-1">
                🛒 بقالة ومواد غذائية
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-300 text-right py-1">
                👕 ملابس وأزياء
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-300 text-right py-1">
                📱 إلكترونيات وتقنية
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-300 text-right py-1">
                🧼 منظفات وعناية
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-300 text-right py-1">
                🛠️ خدمات منزلية
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors duration-300 text-right py-1">
                🔥 عروض وتخفيضات
              </a>
            </div>
            
            {/* Features */}
            <div className="mt-6 pt-6 border-t border-gray-700">
              <h5 className="text-lg font-semibold text-right mb-3">مميزات متجرنا</h5>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">توصيل سريع ومجاني</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">جودة عالية مضمونة</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">أسعار منافسة</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">خدمة عملاء ممتازة</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-right text-gray-400 text-sm">
              <p>
                © {currentYear} {settings.storeNameAr} - جميع الحقوق محفوظة
              </p>
              <p className="mt-1">
                مدعوم بأحدث التقنيات لتجربة تسوق مميزة
              </p>
            </div>
            
            <div className="text-center md:text-left text-gray-400 text-sm">
              <p>تم التطوير بواسطة MiniMax Agent</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}