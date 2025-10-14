'use client';

import { useEffect, useState } from 'react';
import { Category, fetchCategoriesByBranch } from '@/lib/supabase-data';
import { CategoryCard } from './category-card';

interface CategoryFilterDynamicProps {
  branchId: string;
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export function CategoryFilterDynamic({ branchId, selectedCategory, onCategoryChange }: CategoryFilterDynamicProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, [branchId]);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await fetchCategoriesByBranch(branchId);
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">الفئات</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return null;
  }

  // إضافة خيار "الكل"
  const allCategory: Category = {
    id: 'all',
    branch_id: branchId,
    name_ar: 'الكل',
    name_en: 'All',
    icon: '📦',
    display_order: 0
  };

  const allCategories = [allCategory, ...categories];

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4">الفئات</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {allCategories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            isSelected={selectedCategory === category.id}
            onClick={() => onCategoryChange(category.id)}
          />
        ))}
      </div>
    </div>
  );
}

