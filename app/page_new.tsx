'use client';

import { useState, useEffect, useMemo } from 'react';
import { Header } from '@/components/layout/header';
import { BranchSelector } from '@/components/branches/branch-selector';
import { CategoryFilter } from '@/components/products/category-filter';
import { ProductGrid } from '@/components/products/product-grid';
import { CartSidebar } from '@/components/cart/cart-sidebar';
import { Footer } from '@/components/layout/footer';
import { products } from '@/lib/products';
import { branches, getCategoriesByBranch } from '@/lib/branches';
import { CartManager } from '@/lib/cart';

export default function Home() {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('store');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [productList, setProductList] = useState(products);

  useEffect(() => {
    updateCartCount();
    // TODO: Load products from Supabase based on branch
  }, [selectedBranch]);

  const updateCartCount = () => {
    setCartItemCount(CartManager.getCartCount());
  };

  // Get categories for selected branch
  const branchCategories = useMemo(() => {
    return getCategoriesByBranch(selectedBranch);
  }, [selectedBranch]);

  // Filter products based on branch, category, and search
  const filteredProducts = useMemo(() => {
    let filtered = productList;

    // Filter by category (only for store branch for now)
    if (selectedBranch === 'store') {
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
    } else {
      // For other branches, show empty for now
      filtered = [];
    }

    return filtered;
  }, [selectedBranch, selectedCategory, searchQuery, productList]);

  // Reset category when branch changes
  useEffect(() => {
    setSelectedCategory('all');
  }, [selectedBranch]);

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
            متجرك الشامل للمنتجات والخدمات
          </p>
        </div>

        {/* Branch Selector */}
        <BranchSelector
          branches={branches}
          selectedBranch={selectedBranch}
          onBranchChange={setSelectedBranch}
        />

        {/* Category Filter - Only show for store branch */}
        {selectedBranch === 'store' && (
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        )}

        {/* Content based on branch */}
        {selectedBranch === 'store' && (
          <ProductGrid
            products={filteredProducts}
            onAddToCart={updateCartCount}
          />
        )}

        {selectedBranch === 'home-maintenance' && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔧</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">خدمات صيانة المنازل</h2>
            <p className="text-xl text-gray-600 mb-8">
              اختر نوع الخدمة التي تحتاجها
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {branchCategories.map(category => (
                <div key={category.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <h3 className="font-bold text-lg">{category.nameAr}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedBranch === 'kitchen' && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">👨‍🍳</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">المطبخ</h2>
            <p className="text-xl text-gray-600 mb-8">
              اطلب وجباتك المفضلة أو قدم طلب مخصص
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {branchCategories.map(category => (
                <div key={category.id} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h3 className="font-bold text-2xl mb-2">{category.nameAr}</h3>
                  <p className="text-gray-600">{category.descriptionAr || 'قريباً...'}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedBranch === 'sweets-bakery' && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍰</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">الحلويات والمخبوزات</h2>
            <p className="text-xl text-gray-600 mb-8">
              حلويات ومخبوزات طازجة يومياً
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {branchCategories.map(category => (
                <div key={category.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <h3 className="font-bold text-lg">{category.nameAr}</h3>
                </div>
              ))}
            </div>
          </div>
        )}
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
