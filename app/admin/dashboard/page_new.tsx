'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Dashboard sections
type Section = 'overview' | 'branches' | 'categories' | 'products' | 'orders' | 'services' | 'kitchen' | 'settings';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const menuItems = [
    { id: 'overview', icon: '📊', label: 'نظرة عامة', color: 'blue' },
    { id: 'branches', icon: '🏢', label: 'الفروع', color: 'purple' },
    { id: 'categories', icon: '📂', label: 'الفئات', color: 'green' },
    { id: 'products', icon: '📦', label: 'المنتجات', color: 'orange' },
    { id: 'orders', icon: '🛒', label: 'الطلبات', color: 'red' },
    { id: 'services', icon: '🔧', label: 'طلبات الصيانة', color: 'yellow' },
    { id: 'kitchen', icon: '👨‍🍳', label: 'طلبات المطبخ', color: 'pink' },
    { id: 'settings', icon: '⚙️', label: 'الإعدادات', color: 'gray' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="text-2xl">🛒</div>
              <h1 className="text-xl font-bold text-gray-900">لوحة التحكم - Alma</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <span>تسجيل الخروج</span>
              <span>🚪</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg min-h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as Section)}
                className={`
                  w-full flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg transition-all
                  ${activeSection === item.id
                    ? 'bg-blue-500 text-white shadow-md transform scale-105'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeSection === 'overview' && <OverviewSection />}
          {activeSection === 'branches' && <BranchesSection />}
          {activeSection === 'categories' && <CategoriesSection />}
          {activeSection === 'products' && <ProductsSection />}
          {activeSection === 'orders' && <OrdersSection />}
          {activeSection === 'services' && <ServicesSection />}
          {activeSection === 'kitchen' && <KitchenSection />}
          {activeSection === 'settings' && <SettingsSection />}
        </main>
      </div>
    </div>
  );
}

// Overview Section
function OverviewSection() {
  const stats = [
    { label: 'إجمالي الطلبات', value: '0', icon: '🛒', color: 'blue' },
    { label: 'المنتجات', value: '0', icon: '📦', color: 'green' },
    { label: 'طلبات الصيانة', value: '0', icon: '🔧', color: 'yellow' },
    { label: 'طلبات المطبخ', value: '0', icon: '👨‍🍳', color: 'purple' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">نظرة عامة</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl">{stat.icon}</span>
              <span className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</span>
            </div>
            <h3 className="text-gray-600 font-medium">{stat.label}</h3>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">إجراءات سريعة</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <div className="text-3xl mb-2">➕</div>
            <div className="text-sm font-medium text-gray-700">إضافة منتج</div>
          </button>
          <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <div className="text-3xl mb-2">📂</div>
            <div className="text-sm font-medium text-gray-700">إضافة فئة</div>
          </button>
          <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <div className="text-3xl mb-2">🏢</div>
            <div className="text-sm font-medium text-gray-700">إدارة الفروع</div>
          </button>
          <button className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
            <div className="text-3xl mb-2">⚙️</div>
            <div className="text-sm font-medium text-gray-700">الإعدادات</div>
          </button>
        </div>
      </div>
    </div>
  );
}

// Branches Section
function BranchesSection() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">إدارة الفروع</h2>
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2 space-x-reverse">
          <span>➕</span>
          <span>إضافة فرع جديد</span>
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-gray-600 text-center py-8">سيتم تحميل الفروع من قاعدة البيانات...</p>
      </div>
    </div>
  );
}

// Categories Section
function CategoriesSection() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">إدارة الفئات</h2>
        <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2 space-x-reverse">
          <span>➕</span>
          <span>إضافة فئة جديدة</span>
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-gray-600 text-center py-8">سيتم تحميل الفئات من قاعدة البيانات...</p>
      </div>
    </div>
  );
}

// Products Section
function ProductsSection() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">إدارة المنتجات</h2>
        <button className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2 space-x-reverse">
          <span>➕</span>
          <span>إضافة منتج جديد</span>
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-gray-600 text-center py-8">سيتم تحميل المنتجات من قاعدة البيانات...</p>
      </div>
    </div>
  );
}

// Orders Section
function OrdersSection() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">إدارة الطلبات</h2>
      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-gray-600 text-center py-8">سيتم تحميل الطلبات من قاعدة البيانات...</p>
      </div>
    </div>
  );
}

// Services Section
function ServicesSection() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">طلبات الصيانة</h2>
      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-gray-600 text-center py-8">سيتم تحميل طلبات الصيانة من قاعدة البيانات...</p>
      </div>
    </div>
  );
}

// Kitchen Section
function KitchenSection() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">طلبات المطبخ</h2>
      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-gray-600 text-center py-8">سيتم تحميل طلبات المطبخ من قاعدة البيانات...</p>
      </div>
    </div>
  );
}

// Settings Section
function SettingsSection() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">الإعدادات</h2>
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">إعدادات العملة</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">العملة الأساسية</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option value="SYP">ليرة سورية (SYP)</option>
                  <option value="USD">دولار أمريكي (USD)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">سعر الصرف</label>
                <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="15000" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">إعدادات التوصيل</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">رسوم التوصيل الافتراضية</label>
                <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="5000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">توصيل مجاني فوق</label>
                <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="50000" />
              </div>
            </div>
          </div>

          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            حفظ الإعدادات
          </button>
        </div>
      </div>
    </div>
  );
}
