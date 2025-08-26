'use client';

import { useState, useEffect, useMemo } from 'react';
import { Header } from '@/components/layout/header';
import { CategoryFilter } from '@/components/products/category-filter';
import { ProductGrid } from '@/components/products/product-grid';
import { CartSidebar } from '@/components/cart/cart-sidebar';
import { Footer } from '@/components/layout/footer';
import { products } from '@/lib/products';
import { CartManager } from '@/lib/cart';
import { fetchProducts } from '@/lib/database';

export default function Home() {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [productList, setProductList] = useState(products);

  useEffect(() => {
    updateCartCount();
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const dbProducts = await fetchProducts();
      if (dbProducts.length > 0) {
        setProductList(dbProducts);
      }
    } catch (error) {
      console.error('Error loading products from database:', error);
      // Fallback to static products
    }
  };

  const updateCartCount = () => {
    setCartItemCount(CartManager.getCartCount());
  };

  const filteredProducts = useMemo(() => {
    let filtered = productList;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product => 
        product.nameAr.toLowerCase().includes(query) ||
        product.nameEn.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <Header
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-sky-400 rounded-full mb-6 text-white text-3xl font-bold">
            🛒
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            مرحباً بك في alma
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            متجرك الإلكتروني المفضل للمنتجات الاستهلاكية اليومية
          </p>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Products Grid */}
        <ProductGrid
          products={filteredProducts}
          onAddToCart={updateCartCount}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCartUpdate={updateCartCount}
      />
    </div>
  );
}