import React, { useState, useMemo, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Header from './components/Header';
import SectionTabs from './components/SectionTabs';
import CategoryFilter from './components/CategoryFilter';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import ChatBot from './components/ai/ChatBot';
import SmartSearch from './components/ai/SmartSearch';
import { useCart } from './hooks/useCart';
import { useWhatsApp } from './hooks/useWhatsApp';
import { useAdmin } from './hooks/useAdmin';
import { useProductManager } from './hooks/useProductManager';
import { useOrderManager } from './hooks/useOrderManager';
import { Product } from './types';

function App() {
  const [activeSection, setActiveSection] = useState('food');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState('home');
  const [searchResults, setSearchResults] = useState<Product[] | null>(null);
  
  const {
    cartItems,
    cartTotal,
    cartCount,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    closeCart
  } = useCart();

  const { sendOrder } = useWhatsApp();
  const { isAuthenticated, currentUser, login, logout, checkAuth } = useAdmin();
  const { products, categories, sections } = useProductManager();
  const { addOrder } = useOrderManager();

  // Check authentication on app load
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Check for admin access ONLY from URL parameter (hidden method)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setCurrentPage('admin');
      // Clean URL to hide the parameter
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Reset category when section changes
  useEffect(() => {
    setActiveCategory('all');
    setSearchResults(null); // Clear search results when section changes
  }, [activeSection]);

  const filteredProducts = useMemo(() => {
    // If there are search results, show them instead
    if (searchResults) {
      return searchResults.filter(product => 
        product.section === activeSection && product.inStock !== false
      );
    }

    let filtered = products.filter(product => 
      product.section === activeSection && product.inStock !== false
    );

    if (activeCategory !== 'all') {
      filtered = filtered.filter(product => product.category === activeCategory);
    }

    return filtered;
  }, [activeSection, activeCategory, products, searchResults]);

  const filteredCategories = useMemo(() => {
    return categories.filter(category => 
      category.section === activeSection || category.id === 'all'
    );
  }, [activeSection, categories]);

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast.success(`تم إضافة ${product.nameAr} إلى السلة`, {
      position: 'top-center',
      duration: 2000,
      style: {
        background: '#10B981',
        color: 'white',
        fontFamily: 'Cairo, Arial, sans-serif',
        direction: 'rtl'
      }
    });
  };

  const handleSendOrder = async () => {
    if (cartItems.length === 0) return;
    
    try {
      // Add order to admin system
      addOrder({
        items: cartItems,
        total: cartTotal,
        status: 'pending',
        notes: 'طلبية من الموقع الإلكتروني',
        customerInfo: {
          name: 'عميل من الموقع'
        },
        paymentMethod: 'cash'
      });

      await sendOrder(cartItems, cartTotal);
      toast.success('تم إرسال الطلب بنجاح!', {
        position: 'top-center',
        duration: 3000,
        style: {
          background: '#10B981',
          color: 'white',
          fontFamily: 'Cairo, Arial, sans-serif',
          direction: 'rtl'
        }
      });
      clearCart();
      closeCart();
    } catch (error) {
      toast.error('حدث خطأ في إرسال الطلب', {
        position: 'top-center',
        duration: 3000,
        style: {
          background: '#EF4444',
          color: 'white',
          fontFamily: 'Cairo, Arial, sans-serif',
          direction: 'rtl'
        }
      });
    }
  };

  const handleSearchResults = (results: Product[]) => {
    setSearchResults(results);
    // Show a toast with results count
    toast.success(`تم العثور على ${results.length} منتج`, {
      position: 'top-center',
      duration: 2000,
      style: {
        background: '#8B5CF6',
        color: 'white',
        fontFamily: 'Cairo, Arial, sans-serif',
        direction: 'rtl'
      }
    });
  };

  // Admin page logic
  if (currentPage === 'admin') {
    if (!isAuthenticated) {
      return <AdminLogin onLogin={login} />;
    }
    return (
      <AdminDashboard 
        onLogout={() => {
          logout();
          setCurrentPage('home');
        }}
        currentUser={currentUser!}
      />
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-sky-50 to-cyan-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Welcome Section */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                  مرحباً بكم في متجر Alma
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  وجهتكم المفضلة للتسوق الإلكتروني - مواد غذائية، ملابس، إلكترونيات وأكثر
                </p>
                <div className="flex justify-center items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span>متوفر الآن</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>توصيل سريع</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span>بحث ذكي</span>
                  </div>
                </div>
              </div>

              {/* Smart Search */}
              <div className="mb-8">
                <SmartSearch onResults={handleSearchResults} />
                {searchResults && (
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => setSearchResults(null)}
                      className="text-purple-600 hover:text-purple-800 underline"
                    >
                      مسح نتائج البحث وعرض جميع المنتجات
                    </button>
                  </div>
                )}
              </div>

              {/* Section Tabs */}
              <SectionTabs
                sections={sections}
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />

              {/* Category Filter */}
              <CategoryFilter
                categories={filteredCategories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                activeSection={activeSection}
              />

              {/* Products Grid */}
              <ProductGrid
                products={filteredProducts}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Toaster />
      
      <Header
        cartCount={cartCount}
        onCartToggle={toggleCart}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {renderPage()}

      <Cart
        isOpen={isCartOpen}
        items={cartItems}
        total={cartTotal}
        onClose={closeCart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        onSendOrder={handleSendOrder}
      />

      {/* AI ChatBot */}
      <ChatBot />

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Alma</h3>
                <p className="text-sm text-gray-300">متجر التسوق الإلكتروني</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h4 className="font-bold mb-3">التواصل</h4>
                <p className="text-gray-300">واتساب: 0983 012 001</p>
                <p className="text-gray-300">الساحل السوري</p>
              </div>
              
              <div>
                <h4 className="font-bold mb-3">ساعات العمل</h4>
                <p className="text-gray-300">يومياً من 9 صباحاً</p>
                <p className="text-gray-300">حتى 10 مساءً</p>
              </div>
              
              <div>
                <h4 className="font-bold mb-3">خدماتنا</h4>
                <p className="text-gray-300">بحث ذكي بالـ AI</p>
                <p className="text-gray-300">مساعد شخصي ذكي</p>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-6">
              <p className="text-gray-400">
                © 2024 Alma Store. جميع الحقوق محفوظة.
              </p>
              <p className="text-gray-500 text-sm mt-2">
                مدعوم بالذكاء الاصطناعي لتجربة تسوق أفضل
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
