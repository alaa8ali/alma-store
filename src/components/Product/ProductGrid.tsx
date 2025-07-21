import React from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { Package } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  title?: string;
  showTitle?: boolean;
  emptyMessage?: string;
}

export function ProductGrid({ 
  products, 
  title = 'المنتجات', 
  showTitle = true,
  emptyMessage = 'لا توجد منتجات متاحة حالياً'
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <Package className="h-24 w-24 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">{emptyMessage}</h3>
        <p className="text-gray-500">جرب البحث عن شيء آخر أو تصفح جميع الفئات</p>
      </div>
    );
  }

  return (
    <section className="py-8">
      {showTitle && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">{title}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto rounded-full"></div>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}