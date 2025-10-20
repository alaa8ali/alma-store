
'use client';

import { useState } from 'react';

interface Category {
  id: string;
  name_ar: string;
  description_ar?: string;
  image?: string;
  icon?: string;
}

interface HomeMaintenanceCategoryViewProps {
  categories: Category[];
}

export function HomeMaintenanceCategoryView({ categories }: HomeMaintenanceCategoryViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleWhatsAppClick = () => {
    if (selectedCategory) {
      const message = `مرحباً، أرغب في طلب خدمة في فئة: ${selectedCategory.name_ar}. موقعي هو: [يرجى إدخال موقعك هنا]`;
      const whatsappUrl = `https://wa.me/963983012001?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">🔧</div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">خدمات صيانة المنازل</h2>
      <p className="text-xl text-gray-600 mb-8">
        اختر نوع الخدمة التي تحتاجها
      </p>

      {selectedCategory ? (
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg mx-auto animate-fade-in">
          <h3 className="text-2xl font-bold mb-4">طلب خدمة: {selectedCategory.name_ar}</h3>
          <p className="text-gray-700 mb-6">سيتم تحويلك إلى واتساب للتواصل معنا مباشرة. يرجى تزويدنا بموقعك لتسهيل عملية الخدمة.</p>
          <button
            onClick={handleWhatsAppClick}
            className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors"
          >
            متابعة إلى واتساب
          </button>
          <button
            onClick={() => setSelectedCategory(null)}
            className="mt-4 text-gray-600 hover:text-gray-800"
          >
            العودة إلى الفئات
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {categories.map(category => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            >
              {category.image ? (
                <div className="relative h-32 w-full mb-4 rounded-lg overflow-hidden">
                  <img src={category.image} alt={category.name_ar} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="text-4xl mb-2">{category.icon || '🔧'}</div>
              )}
              <h3 className="font-bold text-lg">{category.name_ar}</h3>
              {category.description_ar && (
                <p className="text-sm text-gray-600 mt-2">{category.description_ar}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

