import React, { useState } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { Header } from './components/Layout/Header';
import { Navigation } from './components/Layout/Navigation';
import { Footer } from './components/Layout/Footer';
import { CartSidebar } from './components/Cart/CartSidebar';
import { ProductGrid } from './components/Product/ProductGrid';
import { ServiceGrid } from './components/Service/ServiceGrid';
import { HomePage } from './pages/HomePage';
import { AdminLayout } from './components/Admin/AdminLayout';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { ProductManagement } from './components/Admin/ProductManagement';
import { ServiceManagement } from './components/Admin/ServiceManagement';
import { AdminSettings } from './components/Admin/AdminSettings';
import { useSearch } from './hooks/useSearch';
import './index.css';

function AppContent() {
  const { 
    products, 
    services, 
    categories, 
    isAdminMode 
  } = useApp();
  
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
    filteredServices
  } = useSearch(products, services);
  
  const [adminActiveTab, setAdminActiveTab] = useState('dashboard');
  
  // Show only services for Home Services category
  const showServices = selectedCategory === '5';
  const showProducts = !showServices;
  
  // Admin Mode
  if (isAdminMode) {
    return (
      <AdminLayout activeTab={adminActiveTab} onTabChange={setAdminActiveTab}>
        {adminActiveTab === 'dashboard' && <AdminDashboard />}
        {adminActiveTab === 'products' && <ProductManagement />}
        {adminActiveTab === 'services' && <ServiceManagement />}
        {adminActiveTab === 'settings' && <AdminSettings />}
      </AdminLayout>
    );
  }
  
  // Customer Mode
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" dir="rtl">
      <Header 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
      />
      
      <Navigation 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />
      
      <main className="flex-1">
        {/* Show homepage when no search query and no category selected */}
        {!searchQuery && !selectedCategory && (
          <HomePage />
        )}
        
        {/* Show filtered content when searching or category selected */}
        {(searchQuery || selectedCategory) && (
          <div className="container mx-auto px-4 py-8 space-y-8">
            {/* Search Results Header */}
            {searchQuery && (
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  نتائج البحث عن: "{searchQuery}"
                </h1>
                <p className="text-gray-600">
                  تم العثور على {filteredProducts.length + filteredServices.length} نتيجة
                </p>
              </div>
            )}
            
            {/* Category Header */}
            {selectedCategory && !searchQuery && (
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  {categories.find(c => c.id === selectedCategory)?.nameAr}
                </h1>
              </div>
            )}
            
            {/* Products */}
            {showProducts && filteredProducts.length > 0 && (
              <ProductGrid 
                products={filteredProducts}
                title={searchQuery ? 'المنتجات' : undefined}
                showTitle={searchQuery ? true : false}
                emptyMessage="لا توجد منتجات تطابق بحثك"
              />
            )}
            
            {/* Services */}
            {showServices && filteredServices.length > 0 && (
              <ServiceGrid 
                services={filteredServices}
                title={searchQuery ? 'الخدمات' : undefined}
                showTitle={searchQuery ? true : false}
              />
            )}
            
            {/* Both Products and Services for search results */}
            {searchQuery && (
              <>
                {filteredServices.length > 0 && (
                  <ServiceGrid 
                    services={filteredServices}
                    title="الخدمات"
                    showTitle={true}
                  />
                )}
              </>
            )}
            
            {/* No Results */}
            {(searchQuery || selectedCategory) && 
             filteredProducts.length === 0 && 
             (showProducts || filteredServices.length === 0) && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  لم يتم العثور على نتائج
                </h3>
                <p className="text-gray-500 mb-6">
                  جرب البحث بكلمات أخرى أو تصفح جميع الفئات
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('');
                  }}
                  className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
                >
                  عرض جميع المنتجات
                </button>
              </div>
            )}
          </div>
        )}
      </main>
      
      <Footer />
      <CartSidebar />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;