'use client';

import { MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/providers/providers';

export function Footer() {
  const { t } = useLanguage();

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent('مرحباً، أريد الاستفسار عن منتجاتكم');
    window.open(`https://wa.me/963983012001?text=${message}`, '_blank');
  };

  const handlePhoneCall = () => {
    window.open('tel:+963983012001', '_self');
  };

  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-6">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <h2 className="text-3xl font-bold alma-gradient bg-clip-text text-transparent">
              alma
            </h2>
          </div>

          {/* Description */}
          <p className="text-gray-600 max-w-md mx-auto">
            متجرك الإلكتروني المفضل للمنتجات الاستهلاكية اليومية
          </p>

          {/* Contact Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleWhatsAppContact}
              className="alma-gradient hover:scale-105 transition-transform flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              تواصل معنا عبر واتساب
            </Button>
            
            <Button
              variant="outline"
              onClick={handlePhoneCall}
              className="flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <Phone className="h-4 w-4" />
              +963 98 301 2001
            </Button>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              © 2024 alma. جميع الحقوق محفوظة
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}