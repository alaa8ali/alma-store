import React from 'react';
import { Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Service } from '../../types';
import { useWhatsApp } from '../../hooks/useWhatsApp';
import { useApp } from '../../contexts/AppContext';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { contactService } = useWhatsApp();
  const { settings } = useApp();

  const handleContact = () => {
    contactService(service.name, service.nameAr);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-sky-100 overflow-hidden group">
      {/* Service Image */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sky-50 to-blue-50">
        <img
          src={service.image}
          alt={service.nameAr}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/300x200/e0f2fe/0369a1?text=خدمة';
          }}
        />
        
        {/* Available Badge */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${
          service.available 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {service.available ? 'متاح' : 'غير متاح'}
        </div>
      </div>

      {/* Service Info */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="font-bold text-gray-800 text-lg text-right">
            {service.nameAr}
          </h3>
          <p className="text-gray-600 text-sm text-right line-clamp-3">
            {service.descriptionAr}
          </p>
        </div>

        {/* Service Details */}
        <div className="space-y-2">
          {/* Price */}
          <div className="flex items-center justify-between py-2 border-t border-gray-100">
            <span className="text-sm text-gray-500">السعر من:</span>
            <span className="font-bold text-sky-600 text-lg">
              {service.price.toLocaleString()} {settings.currency}
            </span>
          </div>

          {/* Duration */}
          {service.durationAr && (
            <div className="flex items-center justify-between text-sm">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">{service.durationAr}</span>
            </div>
          )}

          {/* Service Areas */}
          <div className="flex items-start justify-between text-sm">
            <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="text-right text-gray-600">
              <span className="block">مناطق الخدمة:</span>
              <span className="text-xs">{service.serviceAreas.join(' - ')}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            onClick={handleContact}
            disabled={!service.available}
            className={`w-full flex items-center justify-center space-x-2 rtl:space-x-reverse py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 ${
              service.available
                ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            <MessageCircle className="h-4 w-4" />
            <span>{service.available ? 'تواصل عبر واتساب' : 'غير متاح حالياً'}</span>
          </button>
          
          <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse text-xs text-gray-500">
            <Phone className="h-3 w-3" />
            <span>{service.contactInfo}</span>
          </div>
        </div>
      </div>
    </div>
  );
}