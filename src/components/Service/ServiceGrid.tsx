import React from 'react';
import { Service } from '../../types';
import { ServiceCard } from './ServiceCard';
import { Wrench } from 'lucide-react';

interface ServiceGridProps {
  services: Service[];
  title?: string;
  showTitle?: boolean;
}

export function ServiceGrid({ 
  services, 
  title = 'الخدمات المنزلية',
  showTitle = true 
}: ServiceGridProps) {
  if (services.length === 0) {
    return (
      <div className="text-center py-16">
        <Wrench className="h-24 w-24 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">لا توجد خدمات متاحة حالياً</h3>
        <p className="text-gray-500">سيتم إضافة الخدمات قريباً</p>
      </div>
    );
  }

  return (
    <section className="py-8">
      {showTitle && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">{title}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto rounded-full"></div>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}