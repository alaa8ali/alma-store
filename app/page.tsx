'use client';

import { useState, useEffect, useMemo } from 'react';
import { Header } from '@/components/layout/header';
import { BranchSelectorDynamic } from '@/components/branches/branch-selector-dynamic';
import { HomeMaintenanceCategoryView } from '@/components/home-maintenance/home-maintenance-category-view';
import { KitchenMenuView } from '@/components/kitchen/kitchen-menu-view';
import { HomeMaintenanceCategoryView } from '@/components/home-maintenance/home-maintenance-category-view';
import { CategoryFilterDynamic } from '@/components/categories/category-filter-dynamic';
import { ProductGrid } from '@/components/products/product-grid';
import { CartSidebar } from '@/components/cart/cart-sidebar';
import { Footer } from '@/components/layout/footer';
import { products } from '@/lib/products';
import { CartManager } from '@/lib/cart';
import { fetchCategoriesByBranch } from '@/lib/supabase-data';

export default function HomeDynamic() {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('store');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [productList, setProductList] = useState(products);
  const [branchCategories, setBranchCategories] = useState<any[]>([]);

  useEffect(() => {
    updateCartCount();
  }, []);

  useEffect(() => {
    loadBranchCategories();
  }, [selectedBranch]);

  const loadBranchCategories = async () => {
    const categories = await fetchCategoriesByBranch(selectedBranch);
    setBranchCategories(categories);
  };

  const updateCartCount = () => {
    setCartItemCount(CartManager.getCartCount());
  };

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

        {/* Branch Selector - Dynamic */}
        <BranchSelectorDynamic
          selectedBranch={selectedBranch}
          onBranchChange={setSelectedBranch}
        />

        {/* Category Filter - Dynamic - Only show for store branch */}
        {selectedBranch === 'store' && (
          <CategoryFilterDynamic
            branchId={selectedBranch}
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
            <HomeMaintenanceCategoryView categories={branchCategories} />
          </div>
        )}

        {selectedBranch === 'kitchen' && (
          <KitchenMenuView branchId={selectedBranch} />
        )}

        {selectedBranch === 'sweets-bakery' && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍰</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">الحلويات والمخبوزات</h2>
            <p className="text-xl text-gray-600 mb-8">
              حلويات ومخبوزات طازجة يومياً
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {branchCategories.map(category => (
                <div key={category.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                  {category.image ? (
                    <div className="relative h-40 w-full -mx-6 -mt-6 mb-4">
                      <img src={category.image} alt={category.name_ar} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-2 left-2 text-3xl">{category.icon}</div>
                    </div>
                  ) : (
                    <div className="text-4xl mb-2">{category.icon}</div>
                  )}
                  <h3 className="font-bold text-lg">{category.name_ar}</h3>
                  {category.description_ar && (
                    <p className="text-sm text-gray-600 mt-2">{category.description_ar}</p>
                  )}
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



// Minor change to trigger Vercel redeployment

