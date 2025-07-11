import React from 'react';
import { 
  TrendingUp, 
  ShoppingCart, 
  Package, 
  AlertTriangle,
  Calendar,
  DollarSign,
  Users,
  Clock,
  Layers
} from 'lucide-react';
import { useDashboardStats } from '../../hooks/useDashboardStats';
import { Order, Product, Section } from '../../types';

interface DashboardStatsProps {
  orders: Order[];
  products: Product[];
  sections: Section[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ orders, products, sections }) => {
  const stats = useDashboardStats(orders, products);

  const statCards = [
    {
      title: 'طلبات اليوم',
      value: stats.todayOrders,
      icon: Calendar,
      color: 'from-blue-500 to-cyan-500',
      change: '+12%'
    },
    {
      title: 'مبيعات اليوم',
      value: `${stats.todayRevenue.toLocaleString()} ل.س`,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      change: '+8%'
    },
    {
      title: 'إجمالي الطلبات',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'from-purple-500 to-pink-500',
      change: '+25%'
    },
    {
      title: 'إجمالي المبيعات',
      value: `${stats.totalRevenue.toLocaleString()} ل.س`,
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500',
      change: '+15%'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                  <p className="text-sm text-green-600 font-medium">{card.change}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${card.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sections Overview */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Layers className="mr-3 text-indigo-500" size={24} />
          نظرة عامة على الأقسام
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.filter(section => section.isActive).map((section) => {
            const sectionProducts = products.filter(p => p.section === section.id);
            const sectionRevenue = orders
              .filter(order => order.status === 'delivered')
              .reduce((total, order) => {
                const sectionItems = order.items.filter(item => item.section === section.id);
                return total + sectionItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
              }, 0);

            return (
              <div key={section.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200">
                <div className={`w-12 h-12 bg-gradient-to-r ${section.color} rounded-xl flex items-center justify-center mb-3`}>
                  <span className="text-white text-xl">{section.icon}</span>
                </div>
                <h4 className="font-bold text-gray-800 mb-2">{section.nameAr}</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>المنتجات: {sectionProducts.length}</p>
                  <p>المبيعات: {sectionRevenue.toLocaleString()} ل.س</p>
                  <p>المتوفر: {sectionProducts.filter(p => p.inStock).length}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Package className="mr-3 text-sky-500" size={24} />
            المنتجات الأكثر مبيعاً
          </h3>
          <div className="space-y-4">
            {stats.topProducts.slice(0, 5).map((item, index) => (
              <div key={item.product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
                    <span className="text-sky-600 font-bold">{index + 1}</span>
                  </div>
                  <img
                    src={item.product.image}
                    alt={item.product.nameAr}
                    className="w-10 h-10 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-medium text-gray-800 text-right">{item.product.nameAr}</p>
                    <p className="text-sm text-gray-600">{item.salesCount} مبيعة</p>
                  </div>
                </div>
                <p className="font-bold text-green-600">{item.revenue.toLocaleString()} ل.س</p>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <AlertTriangle className="mr-3 text-orange-500" size={24} />
            تنبيهات نقص المخزون
          </h3>
          {stats.lowStockProducts.length === 0 ? (
            <div className="text-center py-8">
              <Package className="mx-auto text-gray-400 mb-3" size={48} />
              <p className="text-gray-500">جميع المنتجات متوفرة بكمية كافية</p>
            </div>
          ) : (
            <div className="space-y-4">
              {stats.lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.image}
                      alt={product.nameAr}
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-medium text-gray-800 text-right">{product.nameAr}</p>
                      <p className="text-sm text-orange-600">متبقي: {product.stockQuantity || 0}</p>
                    </div>
                  </div>
                  <button className="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-orange-600 transition-colors duration-200">
                    تجديد المخزون
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Clock className="mr-3 text-purple-500" size={24} />
          الطلبات الأخيرة
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-right py-3 px-4 font-medium text-gray-600">رقم الطلب</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">العميل</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">المبلغ</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">الحالة</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.slice(0, 5).map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-right">#{order.id}</td>
                  <td className="py-3 px-4 text-right">{order.customerInfo?.name || 'عميل'}</td>
                  <td className="py-3 px-4 text-right font-medium">{order.total.toLocaleString()} ل.س</td>
                  <td className="py-3 px-4 text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status === 'delivered' ? 'مكتمل' :
                       order.status === 'pending' ? 'معلق' :
                       order.status === 'preparing' ? 'قيد التحضير' : order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString('ar-SA')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Revenue Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <TrendingUp className="mr-3 text-green-500" size={24} />
          المبيعات الشهرية
        </h3>
        <div className="grid grid-cols-6 gap-4">
          {stats.monthlyRevenue.map((month, index) => {
            const maxRevenue = Math.max(...stats.monthlyRevenue.map(m => m.revenue));
            const height = maxRevenue > 0 ? (month.revenue / maxRevenue) * 200 : 0;
            
            return (
              <div key={index} className="text-center">
                <div className="relative h-48 flex items-end justify-center mb-2">
                  <div
                    className="w-8 bg-gradient-to-t from-sky-500 to-cyan-400 rounded-t-lg transition-all duration-500 hover:from-sky-600 hover:to-cyan-500"
                    style={{ height: `${height}px` }}
                  />
                </div>
                <p className="text-xs font-medium text-gray-800">{month.month}</p>
                <p className="text-xs text-gray-600">{month.revenue.toLocaleString()}</p>
                <p className="text-xs text-gray-500">{month.orders} طلب</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
