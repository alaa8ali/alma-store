import React from 'react';
import { Package, Wrench, ShoppingCart, TrendingUp, Users, Star } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export function AdminDashboard() {
  const { products, services, cart, settings } = useApp();
  
  const totalProducts = products.length;
  const totalServices = services.length;
  const featuredProducts = products.filter(p => p.featured).length;
  const lowStockProducts = products.filter(p => p.stock <= 5).length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const averagePrice = totalProducts > 0 ? totalValue / totalProducts : 0;

  const stats = [
    {
      title: 'إجمالي المنتجات',
      value: totalProducts,
      icon: Package,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'إجمالي الخدمات',
      value: totalServices,
      icon: Wrench,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    },
    {
      title: 'منتجات مميزة',
      value: featuredProducts,
      icon: Star,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700'
    },
    {
      title: 'منتجات قليلة المخزون',
      value: lowStockProducts,
      icon: TrendingUp,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">مرحباً بك في لوحة تحكم {settings.storeNameAr}</h2>
        <p className="text-sky-100">إدارة شاملة لمتجرك الإلكتروني</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`${stat.bgColor} rounded-2xl p-6 border border-opacity-20`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${stat.textColor} mb-1`}>{stat.title}</p>
                  <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Inventory Overview */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <Package className="h-5 w-5 ml-2 text-blue-600" />
            نظرة عامة على المخزون
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">قيمة المخزون الإجمالية</span>
              <span className="font-bold text-gray-800">
                {totalValue.toLocaleString()} {settings.currency}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">متوسط سعر المنتج</span>
              <span className="font-bold text-gray-800">
                {averagePrice.toLocaleString()} {settings.currency}
              </span>
            </div>
            
            {lowStockProducts > 0 && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-red-700 font-medium">تنبيه: منتجات قليلة المخزون</span>
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                    {lowStockProducts}
                  </span>
                </div>
                <p className="text-red-600 text-sm mt-1">يوجد منتجات بمخزون أقل من 5 قطع</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 ml-2 text-green-600" />
            إجراءات سريعة
          </h3>
          
          <div className="space-y-3">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-sky-50 rounded-lg border border-blue-100">
              <h4 className="font-semibold text-blue-800 mb-2">نصائح لتحسين المتجر</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• أضف صور حقيقية للمنتجات</li>
                <li>• ابدأ بعروض خاصة لجذب العملاء</li>
                <li>• حدث أوصاف المنتجات بانتظام</li>
                <li>• راقب مستويات المخزون</li>
              </ul>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
              <h4 className="font-semibold text-green-800 mb-2">معلومات المتجر</h4>
              <div className="text-sm text-green-700 space-y-1">
                <p><strong>الاسم:</strong> {settings.storeNameAr}</p>
                <p><strong>الموقع:</strong> {settings.locationAr}</p>
                <p><strong>الهاتف:</strong> {settings.whatsappNumber}</p>
                <p><strong>ساعات العمل:</strong> {settings.workingHoursAr}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <Users className="h-5 w-5 ml-2 text-purple-600" />
          نشاط حديث
        </h3>
        
        <div className="text-center py-8 text-gray-500">
          <Users className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <p>سيتم عرض النشاط الحديث هنا</p>
          <p className="text-sm mt-2">الطلبات، الزيارات، والأنشطة الأخرى</p>
        </div>
      </div>
    </div>
  );
}