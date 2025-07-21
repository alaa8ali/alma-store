import React from 'react';
import { Category } from '../../types';

interface NavigationProps {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

export function Navigation({ categories, selectedCategory, onCategorySelect }: NavigationProps) {
  return (
    <nav className="bg-white shadow-md border-b border-sky-100 sticky top-16 lg:top-20 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-1 rtl:space-x-reverse overflow-x-auto scrollbar-hide py-3">
          {/* All Products */}
          <button
            onClick={() => onCategorySelect('')}
            className={`flex-shrink-0 flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 whitespace-nowrap ${
              selectedCategory === '' 
                ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg transform scale-105' 
                : 'bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200'
            }`}
          >
            <span className="text-lg">🛍️</span>
            <span>جميع المنتجات</span>
          </button>

          {/* Category Buttons */}
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`flex-shrink-0 flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 whitespace-nowrap ${
                selectedCategory === category.id 
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg transform scale-105' 
                  : 'bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.nameAr}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}