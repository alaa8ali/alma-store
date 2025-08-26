'use client';

import { ProductCard } from './product-card';
import { useLanguage } from '@/components/providers/providers';
import { Product } from '@/lib/products';

interface ProductGridProps {
  products: Product[];
  onAddToCart: () => void;
}

export function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  const { t } = useLanguage();

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🔍</div>
        <p className="text-gray-500 text-lg">{t('search.noResults')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}