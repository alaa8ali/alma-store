'use client';

import Image from 'next/image';
import { Branch } from '@/lib/supabase-data';

interface BranchCardProps {
  branch: Branch;
  isSelected: boolean;
  onClick: () => void;
}

export function BranchCard({ branch, isSelected, onClick }: BranchCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl transition-all duration-300 transform
        ${isSelected 
          ? 'ring-4 ring-blue-500 shadow-2xl scale-105' 
          : 'hover:shadow-xl hover:scale-102 shadow-md'
        }
      `}
    >
      {/* صورة الخلفية */}
      {branch.image ? (
        <div className="relative h-48 w-full">
          <Image
            src={branch.image}
            alt={branch.name_ar}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* طبقة تعتيم */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent ${isSelected ? 'opacity-90' : 'opacity-70'}`} />
        </div>
      ) : (
        <div className={`h-48 w-full bg-gradient-to-br ${
          isSelected 
            ? 'from-blue-600 to-sky-500' 
            : 'from-blue-500 to-sky-400'
        }`} />
      )}

      {/* المحتوى */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
        {/* الأيقونة */}
        <div className={`text-6xl mb-3 transition-transform ${isSelected ? 'scale-110' : ''}`}>
          {branch.icon}
        </div>
        
        {/* الاسم */}
        <h3 className="text-2xl font-bold mb-2 text-center drop-shadow-lg">
          {branch.name_ar}
        </h3>
        
        {/* الوصف */}
        {branch.description_ar && (
          <p className="text-sm text-center text-white/90 line-clamp-2 drop-shadow">
            {branch.description_ar}
          </p>
        )}

        {/* مؤشر التحديد */}
        {isSelected && (
          <div className="absolute top-4 right-4 bg-blue-500 text-white rounded-full p-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
    </button>
  );
}

