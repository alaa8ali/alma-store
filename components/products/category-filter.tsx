'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/providers/providers';
import { categories, Category } from '@/lib/products';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const { language, t } = useLanguage();

  const allCategories: (Category & { id: string })[] = [
    { id: 'all', nameAr: 'جميع المنتجات', nameEn: 'All Products', icon: '📦' },
    ...categories
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {allCategories.map((category) => {
        const isSelected = selectedCategory === category.id;
        const categoryName = language === 'ar' ? category.nameAr : category.nameEn;
        
        return (
          <Button
            key={category.id}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
            className={`flex items-center gap-2 transition-all ${
              isSelected 
                ? 'alma-gradient text-white shadow-lg scale-105' 
                : 'hover:scale-105 hover:shadow-md'
            }`}
          >
            <span className="text-lg">{category.icon}</span>
            <span>{categoryName}</span>
          </Button>
        );
      })}
    </div>
  );
}