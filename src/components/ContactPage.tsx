import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, Mail } from 'lucide-react';

const ContactPage: React.FC = () => {
  const handleWhatsAppContact = () => {
    const phoneNumber = '+963983012001';
    const message = 'مرحباً، أود الاستفسار عن خدمات متجر Alma';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-cyan-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">اتصل بنا</h1>
          <p className="text-xl text-gray-600">
            نحن هنا لخدمتكم والإجابة على جميع استفساراتكم
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* WhatsApp Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="text-white" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">واتساب</h2>
              <p className="text-gray-600">الطريقة الأسرع للتواصل معنا</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-center text-lg font-medium text-gray-700">
                <Phone className="mr-3 text-green-500" size={20} />
                +963 983 012 001
              </div>
            </div>
            
            <button
              onClick={handleWhatsAppContact}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              تواصل عبر واتساب
            </button>
          </div>

          {/* Phone Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="text-white" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">الهاتف</h2>
              <p className="text-gray-600">للاتصال المباشر والاستفسار</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-center text-lg font-medium text-gray-700">
                <Phone className="mr-3 text-sky-500" size={20} />
                0983 012 001
              </div>
            </div>
            
            <a
              href="tel:+963983012001"
              className="block w-full bg-gradient-to-r from-sky-500 to-cyan-500 text-white py-4 rounded-xl font-bold text-lg hover:from-sky-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
            >
              اتصل الآن
            </a>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">معلومات إضافية</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <MapPin className="text-white" size={24} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">المنطقة</h3>
              <p className="text-gray-600">الساحل السوري</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Clock className="text-white" size={24} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">ساعات العمل</h3>
              <p className="text-gray-600">يومياً من 9 ص - 10 م</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Mail className="text-white" size={24} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">الاستجابة</h3>
              <p className="text-gray-600">خلال دقائق معدودة</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-sky-500 to-cyan-500 rounded-3xl shadow-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">هل لديك سؤال أو استفسار؟</h2>
          <p className="text-lg opacity-90 mb-6">
            لا تتردد في التواصل معنا، فريقنا مستعد لمساعدتك في أي وقت
          </p>
          <button
            onClick={handleWhatsAppContact}
            className="bg-white text-sky-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center space-x-2"
          >
            <MessageCircle size={20} />
            <span>تواصل معنا الآن</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;