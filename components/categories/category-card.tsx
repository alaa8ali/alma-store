'use client';

import Image from 'next/image';
import { Category } from '@/lib/supabase-data';

interface CategoryCardProps {
  category: Category;
  isSelected: boolean;
  onClick: () => void;
}

export function CategoryCard({ category, isSelected, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-xl transition-all duration-300
        ${isSelected 
          ? 'ring-3 ring-blue-500 shadow-lg scale-105' 
          : 'hover:shadow-md hover:scale-102'
        }
        bg-white
      `}
    >
      {/* صورة الفئة */}
      {category.image ? (
        <div className="relative h-32 w-full">
          <Image
            src={category.image}
            alt={category.name_ar}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          {/* طبقة تعتيم خفيفة */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent ${isSelected ? 'opacity-80' : 'opacity-60'}`} />
        </div>
      ) : (
        <div className={`h-32 w-full flex items-center justify-center ${
          isSelected 
            ? 'bg-gradient-to-br from-blue-500 to-sky-400' 
            : 'bg-gradient-to-br from-gray-100 to-gray-200'
        }`}>
          <span className="text-5xl">{category.icon}</span>
        </div>
      )}

      {/* المحتوى */}
      <div className={`p-4 ${category.image ? 'absolute inset-0 flex flex-col justify-end' : ''}`}>
        {/* الأيقونة - فقط إذا كانت هناك صورة */}
        {category.image && (
          <div className="text-3xl mb-2 drop-shadow-lg">
            {category.icon}
          </div>
        )}
        
        {/* الاسم */}
        <h4 className={`font-bold text-center ${
          category.image 
            ? 'text-white text-lg drop-shadow-lg' 
            : isSelected 
              ? 'text-blue-600 text-base' 
              : 'text-gray-900 text-base'
        }`}>
          {category.name_ar}
        </h4>

        {/* مؤشر التحديد */}
        {isSelected && !category.image && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        
        {isSelected && category.image && (
          <div className="absolute top-2 right-2 bg-white/90 text-blue-600 rounded-full p-1.5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
    </button>
  );
}

