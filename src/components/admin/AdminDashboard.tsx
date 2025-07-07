import React, { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  LogOut,
  Settings,
  Plus,
  Shield,
  Layers
} from 'lucide-react';
import ProductManager from './ProductManager';
import OrderManager from './OrderManager';
import DashboardStats from './DashboardStats';
import SectionManager from './SectionManager';
import { useOrderManager } from '../../hooks/useOrderManager';
import { useProductManager } from '../../hooks/useProductManager';

interface AdminDashboardProps {
  onLogout: () => void;
  currentUser: { username: string; role: string };
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, currentUser }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { orders } = useOrderManager();
  const { products, sections } = useProductManager();

  const tabs = [
    { id: 'dashboard', name: 'لوحة المعلومات', icon: BarChart3 },
    { id: 'sections', name: 'إدارة الأقسام', icon: Layers },
    { id: 'products', name: 'إدارة المنتجات', icon: Package },
    { id: 'orders', name: 'إدارة الطلبات', icon: ShoppingCart },
    { id: 'users', name: 'إدارة المستخدمين', icon: Users, adminOnly: true },
    { id: 'settings', name: 'الإعدادات', icon: Settings }
  ];

  const visibleTabs = tabs.filter(tab => 
    !tab.adminOnly || currentUser.role === 'admin'
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'sections':
        return <SectionManager />;
      case 'products':
        return <ProductManager />;
      case 'orders':
        return <OrderManager />;
      case 'users':
        return <UserManager />;
      case 'settings':
        return <SettingsPanel currentUser={currentUser} />;
      default:
        return <DashboardStats orders={orders} products={products} sections={sections} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">لوحة تحكم Alma</h1>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-gray-600">مرحباً، {currentUser.username}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    currentUser.role === 'admin' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {currentUser.role === 'admin' ? 'مدير' : 'موظف'}
                  </span>
                </div>
              </div>
            </div>
            
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <LogOut size={18} />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="bg-white rounded-2xl shadow-lg p-4">
              <div className="space-y-2">
                {visibleTabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{tab.name}</span>
                      {tab.adminOnly && (
                        <Shield size={16} className="text-purple-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* Quick Stats */}
            <div className="mt-6 bg-white rounded-2xl shadow-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3">إحصائيات سريعة</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">الأقسام</span>
                  <span className="font-bold text-indigo-600">{sections.filter(s => s.isActive).length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">المنتجات</span>
                  <span className="font-bold text-sky-600">{products.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">الطلبات</span>
                  <span className="font-bold text-green-600">{orders.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">طلبات اليوم</span>
                  <span className="font-bold text-orange-600">
                    {orders.filter(order => {
                      const today = new Date().toDateString();
                      return new Date(order.createdAt).toDateString() === today;
                    }).length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

const UserManager: React.FC = () => {
  const [users] = useState([
    { id: '1', username: 'admin', role: 'admin', lastLogin: new Date(), isActive: true },
    { id: '2', username: 'employee1', role: 'employee', lastLogin: new Date(), isActive: true },
    { id: '3', username: 'employee2', role: 'employee', lastLogin: null, isActive: false }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">إدارة المستخدمين</h2>
        <button className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-sky-600 hover:to-cyan-600 transition-colors duration-200 flex items-center space-x-2">
          <Plus size={18} />
          <span>إضافة مستخدم</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-right py-3 px-6 font-medium text-gray-600">اسم المستخدم</th>
              <th className="text-right py-3 px-6 font-medium text-gray-600">الدور</th>
              <th className="text-right py-3 px-6 font-medium text-gray-600">آخر دخول</th>
              <th className="text-right py-3 px-6 font-medium text-gray-600">الحالة</th>
              <th className="text-right py-3 px-6 font-medium text-gray-600">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-6 text-right font-medium">{user.username}</td>
                <td className="py-4 px-6 text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.role === 'admin' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role === 'admin' ? 'مدير' : 'موظف'}
                  </span>
                </td>
                <td className="py-4 px-6 text-right text-sm text-gray-600">
                  {user.lastLogin 
                    ? new Date(user.lastLogin).toLocaleDateString('ar-SA')
                    : 'لم يسجل دخول'
                  }
                </td>
                <td className="py-4 px-6 text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.isActive ? 'نشط' : 'غير نشط'}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">تعديل</button>
                    <button className="text-red-600 hover:text-red-800 text-sm">حذف</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SettingsPanel: React.FC<{ currentUser: any }> = ({ currentUser }) => {
  const [settings, setSettings] = useState({
    storeName: 'متجر Alma',
    whatsappNumber: '+963983012001',
    currency: 'ل.س',
    taxRate: 0,
    deliveryFee: 0,
    minOrderAmount: 0,
    workingHours: {
      start: '09:00',
      end: '22:00'
    },
    notifications: {
      newOrders: true,
      lowStock: true,
      dailyReports: false
    }
  });

  const handleSave = () => {
    // Save settings logic here
    alert('تم حفظ الإعدادات بنجاح');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">الإعدادات</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Store Settings */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">إعدادات المتجر</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">اسم المتجر</label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) => setSettings(prev => ({ ...prev, storeName: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-right"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">رقم الواتساب</label>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) => setSettings(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-right"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ساعة البداية</label>
                <input
                  type="time"
                  value={settings.workingHours.start}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    workingHours: { ...prev.workingHours, start: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ساعة النهاية</label>
                <input
                  type="time"
                  value={settings.workingHours.end}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    workingHours: { ...prev.workingHours, end: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Financial Settings */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">الإعدادات المالية</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">العملة</label>
              <select
                value={settings.currency}
                onChange={(e) => setSettings(prev => ({ ...prev, currency: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-right"
              >
                <option value="ل.س">ليرة سورية (ل.س)</option>
                <option value="$">دولار أمريكي ($)</option>
                <option value="€">يورو (€)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نسبة الضريبة (%)</label>
              <input
                type="number"
                value={settings.taxRate}
                onChange={(e) => setSettings(prev => ({ ...prev, taxRate: Number(e.target.value) }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-right"
                min="0"
                max="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">رسوم التوصيل</label>
              <input
                type="number"
                value={settings.deliveryFee}
                onChange={(e) => setSettings(prev => ({ ...prev, deliveryFee: Number(e.target.value) }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-right"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الحد الأدنى للطلب</label>
              <input
                type="number"
                value={settings.minOrderAmount}
                onChange={(e) => setSettings(prev => ({ ...prev, minOrderAmount: Number(e.target.value) }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-right"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">إعدادات التنبيهات</h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">تنبيهات الطلبات الجديدة</span>
              <input
                type="checkbox"
                checked={settings.notifications.newOrders}
                onChange={(e) => setSettings(prev => ({ 
                  ...prev, 
                  notifications: { ...prev.notifications, newOrders: e.target.checked }
                }))}
                className="w-5 h-5 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
              />
            </label>

            <label className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">تنبيهات نقص المخزون</span>
              <input
                type="checkbox"
                checked={settings.notifications.lowStock}
                onChange={(e) => setSettings(prev => ({ 
                  ...prev, 
                  notifications: { ...prev.notifications, lowStock: e.target.checked }
                }))}
                className="w-5 h-5 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
              />
            </label>

            <label className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">التقارير اليومية</span>
              <input
                type="checkbox"
                checked={settings.notifications.dailyReports}
                onChange={(e) => setSettings(prev => ({ 
                  ...prev, 
                  notifications: { ...prev.notifications, dailyReports: e.target.checked }
                }))}
                className="w-5 h-5 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
              />
            </label>
          </div>
        </div>

        {/* User Profile */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">الملف الشخصي</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">اسم المستخدم</label>
              <input
                type="text"
                value={currentUser.username}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-right"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الدور</label>
              <input
                type="text"
                value={currentUser.role === 'admin' ? 'مدير' : 'موظف'}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-right"
              />
            </div>

            <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-colors duration-200">
              تغيير كلمة المرور
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white px-8 py-3 rounded-xl hover:from-sky-600 hover:to-cyan-600 transition-colors duration-200 font-medium"
        >
          حفظ جميع الإعدادات
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;