import React from 'react';
import { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  activeSection: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  activeCategory, 
  onCategoryChange,
  activeSection
}) => {
  // Filter categories based on active section
  const filteredCategories = categories.filter(category => 
    category.section === activeSection || category.id === 'all'
  );

  if (filteredCategories.length <= 1) {
    return null; // Don't show if only "all" category
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">تصفح حسب التصنيف</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {filteredCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`p-4 rounded-xl text-center transition-all duration-300 transform hover:scale-105 ${
              activeCategory === category.id
                ? 'bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-lg'
                : 'bg-gray-50 hover:bg-sky-50 text-gray-700 hover:text-sky-600 border border-gray-200 hover:border-sky-200'
            }`}
          >
            <div className="text-2xl mb-2">{category.icon}</div>
            <div className="font-medium text-sm">{category.nameAr}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;