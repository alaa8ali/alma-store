import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Package, 
  Truck, 
  MapPin,
  Phone,
  Calendar,
  Filter,
  Search,
  Download,
  Eye,
  User
} from 'lucide-react';
import { useOrderManager } from '../../hooks/useOrderManager';
import { Order } from '../../types';

const OrderManager: React.FC = () => {
  const { 
    orders, 
    updateOrderStatus, 
    deleteOrder, 
    getOrdersByStatus,
    getOrderStats 
  } = useOrderManager();
  
  const [filterStatus, setFilterStatus] = useState<Order['status'] | 'all'>('all');
  const [filterDate, setFilterDate] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const stats = getOrderStats();

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = searchTerm === '' || 
                         order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (order.customerInfo?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (order.customerInfo?.phone || '').includes(searchTerm);
    
    let matchesDate = true;
    if (filterDate !== 'all') {
      const orderDate = new Date(order.createdAt);
      const today = new Date();
      
      switch (filterDate) {
        case 'today':
          matchesDate = orderDate.toDateString() === today.toDateString();
          break;
        case 'week':
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = orderDate >= weekAgo;
          break;
        case 'month':
          const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          matchesDate = orderDate >= monthAgo;
          break;
      }
    }
    
    return matchesStatus && matchesSearch && matchesDate;
  });

  const statusConfig = {
    pending: { label: 'معلق', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    confirmed: { label: 'مؤكد', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
    preparing: { label: 'قيد التحضير', color: 'bg-purple-100 text-purple-800', icon: Package },
    delivering: { label: 'قيد التوصيل', color: 'bg-orange-100 text-orange-800', icon: Truck },
    delivered: { label: 'تم التوصيل', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    cancelled: { label: 'ملغي', color: 'bg-red-100 text-red-800', icon: XCircle }
  };

  const handleBulkStatusUpdate = (status: Order['status']) => {
    selectedOrders.forEach(orderId => {
      updateOrderStatus(orderId, status);
    });
    setSelectedOrders([]);
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(order => order.id));
    }
  };

  const exportOrders = () => {
    const csvContent = [
      ['رقم الطلب', 'العميل', 'الهاتف', 'المبلغ', 'الحالة', 'التاريخ', 'المنتجات'].join(','),
      ...filteredOrders.map(order => [
        order.id,
        order.customerInfo?.name || 'غير محدد',
        order.customerInfo?.phone || 'غير محدد',
        order.total,
        statusConfig[order.status].label,
        new Date(order.createdAt).toLocaleDateString('ar-SA'),
        order.items.map(item => `${item.nameAr} (${item.quantity})`).join('; ')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `orders_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">إدارة الطلبات</h2>
          <div className="flex space-x-3">
            <button
              onClick={exportOrders}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <Download size={18} />
              <span>تصدير</span>
            </button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          {Object.entries(statusConfig).map(([status, config]) => {
            const Icon = config.icon;
            const count = status === 'pending' ? stats.pending :
                         status === 'confirmed' ? stats.confirmed :
                         status === 'preparing' ? stats.preparing :
                         status === 'delivering' ? stats.delivering :
                         status === 'delivered' ? stats.delivered :
                         stats.cancelled;
            
            return (
              <div key={status} className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{config.label}</p>
                    <p className="text-2xl font-bold text-gray-800">{count}</p>
                  </div>
                  <Icon className="text-gray-400" size={24} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="البحث برقم الطلب أو اسم العميل..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-right"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as Order['status'] | 'all')}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-right"
          >
            <option value="all">جميع الحالات</option>
            {Object.entries(statusConfig).map(([status, config]) => (
              <option key={status} value={status}>{config.label}</option>
            ))}
          </select>

          <select
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-right"
          >
            <option value="all">جميع التواريخ</option>
            <option value="today">اليوم</option>
            <option value="week">آخر أسبوع</option>
            <option value="month">آخر شهر</option>
          </select>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
              onChange={handleSelectAll}
              className="w-5 h-5 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
            />
            <span className="text-sm text-gray-700">تحديد الكل ({selectedOrders.length})</span>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedOrders.length > 0 && (
          <div className="flex items-center space-x-3 p-3 bg-sky-50 rounded-xl">
            <span className="text-sm font-medium text-sky-800">
              {selectedOrders.length} طلب محدد
            </span>
            <div className="flex space-x-2">
              {Object.entries(statusConfig).map(([status, config]) => (
                <button
                  key={status}
                  onClick={() => handleBulkStatusUpdate(status as Order['status'])}
                  className={`px-3 py-1 rounded-lg text-xs font-medium ${config.color} hover:opacity-80 transition-opacity duration-200`}
                >
                  {config.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-xl text-gray-500">لا توجد طلبات تطابق البحث</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              statusConfig={statusConfig}
              isSelected={selectedOrders.includes(order.id)}
              onSelect={(selected) => {
                if (selected) {
                  setSelectedOrders(prev => [...prev, order.id]);
                } else {
                  setSelectedOrders(prev => prev.filter(id => id !== order.id));
                }
              }}
              onUpdateStatus={updateOrderStatus}
              onDelete={deleteOrder}
            />
          ))
        )}
      </div>
    </div>
  );
};

const OrderCard: React.FC<{
  order: Order;
  statusConfig: any;
  isSelected: boolean;
  onSelect: (selected: boolean) => void;
  onUpdateStatus: (id: string, status: Order['status']) => void;
  onDelete: (id: string) => void;
}> = ({ order, statusConfig, isSelected, onSelect, onUpdateStatus, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);
  const config = statusConfig[order.status];
  const StatusIcon = config.icon;

  const handleWhatsAppContact = () => {
    const phoneNumber = order.customerInfo?.phone || '+963983012001';
    const message = `بخصوص الطلبية رقم ${order.id}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleDeleteOrder = () => {
    if (window.confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
      onDelete(order.id);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelect(e.target.checked)}
              className="w-5 h-5 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
            />
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color} flex items-center space-x-1`}>
              <StatusIcon size={16} />
              <span>{config.label}</span>
            </span>
            <span className="text-sm text-gray-500 flex items-center space-x-1">
              <Calendar size={16} />
              <span>{new Date(order.createdAt).toLocaleDateString('ar-SA')}</span>
              <span>{new Date(order.createdAt).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}</span>
            </span>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-600">رقم الطلبية</p>
            <p className="font-bold text-gray-800">#{order.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">العميل</p>
            <div className="flex items-center space-x-2">
              <User size={16} className="text-gray-400" />
              <p className="font-medium">{order.customerInfo?.name || 'عميل'}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-600 mb-1">عدد المنتجات</p>
            <p className="font-medium">{order.items.length} منتج</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-600 mb-1">إجمالي المبلغ</p>
            <p className="font-bold text-sky-600">{order.total.toLocaleString()} ل.س</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-600 mb-1">طريقة الدفع</p>
            <p className="font-medium">{order.paymentMethod === 'cash' ? 'نقداً' : 'بطاقة'}</p>
          </div>
        </div>

        {/* Order Items Preview */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">المنتجات:</p>
          <div className="flex flex-wrap gap-2">
            {order.items.slice(0, 3).map((item, index) => (
              <span key={index} className="bg-gray-100 px-3 py-1 rounded-lg text-sm">
                {item.nameAr} × {item.quantity}
              </span>
            ))}
            {order.items.length > 3 && (
              <span className="bg-gray-100 px-3 py-1 rounded-lg text-sm">
                +{order.items.length - 3} أخرى
              </span>
            )}
          </div>
        </div>

        {/* Customer Info & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {order.customerInfo?.phone && (
            <div>
              <p className="text-sm text-gray-600 mb-1">رقم الهاتف</p>
              <button
                onClick={handleWhatsAppContact}
                className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors duration-200"
              >
                <Phone size={16} />
                <span>{order.customerInfo.phone}</span>
              </button>
            </div>
          )}
          
          {order.customerInfo?.location && (
            <div>
              <p className="text-sm text-gray-600 mb-1">الموقع</p>
              <a
                href={`https://maps.google.com/maps?q=${order.customerInfo.location.latitude},${order.customerInfo.location.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                <MapPin size={16} />
                <span>عرض على الخريطة</span>
              </a>
            </div>
          )}
        </div>

        {/* Notes */}
        {order.notes && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
            <p className="text-sm text-gray-600 mb-1">ملاحظات:</p>
            <p className="text-sm text-gray-800">{order.notes}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
          <select
            value={order.status}
            onChange={(e) => onUpdateStatus(order.id, e.target.value as Order['status'])}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          >
            {Object.entries(statusConfig).map(([status, config]) => (
              <option key={status} value={status}>{config.label}</option>
            ))}
          </select>
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm flex items-center space-x-1"
          >
            <Eye size={16} />
            <span>{showDetails ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}</span>
          </button>
          
          <button
            onClick={handleWhatsAppContact}
            className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors duration-200 text-sm flex items-center space-x-1"
          >
            <Phone size={16} />
            <span>تواصل مع العميل</span>
          </button>
          
          <button
            onClick={handleDeleteOrder}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200 text-sm"
          >
            حذف
          </button>
        </div>

        {/* Detailed Items */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="font-medium text-gray-800 mb-3">تفاصيل المنتجات:</h4>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.nameAr}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-medium text-right">{item.nameAr}</p>
                      <p className="text-sm text-gray-600 text-right">{item.name}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{item.quantity} × {item.price.toLocaleString()} ل.س</p>
                    <p className="text-sm text-gray-600">{(item.quantity * item.price).toLocaleString()} ل.س</p>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-between items-center pt-3 border-t border-gray-200 font-bold text-lg">
                <span>المجموع الكلي:</span>
                <span className="text-sky-600">{order.total.toLocaleString()} ل.س</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManager; 
