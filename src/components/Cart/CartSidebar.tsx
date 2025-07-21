import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, Send, ShoppingBag } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useWhatsApp } from '../../hooks/useWhatsApp';

export function CartSidebar() {
  const { cart, isCartOpen, setIsCartOpen, updateCartItem, removeFromCart, clearCart, getCartTotal, settings } = useApp();
  const { sendOrderToWhatsApp } = useWhatsApp();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  const total = getCartTotal();

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartItem(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('السلة فارغة!');
      return;
    }
    setIsCheckingOut(true);
  };

  const handleSendOrder = () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    
    sendOrderToWhatsApp(customerInfo);
    clearCart();
    setIsCheckingOut(false);
    setIsCartOpen(false);
    setCustomerInfo({ name: '', phone: '', address: '', notes: '' });
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
        onClick={() => {
          setIsCartOpen(false);
          setIsCheckingOut(false);
        }}
      />
      
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center space-x-2 rtl:space-x-reverse">
            <ShoppingBag className="h-6 w-6" />
            <span>سلة التسوق</span>
          </h2>
          <button
            onClick={() => {
              setIsCartOpen(false);
              setIsCheckingOut(false);
            }}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {!isCheckingOut ? (
            /* Cart Items */
            <div className="p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">السلة فارغة</p>
                  <p className="text-gray-400 text-sm mt-2">ابدأ بإضافة منتجات للسلة</p>
                </div>
              ) : (
                cart.map((item) => {
                  const price = item.product.discount 
                    ? item.product.price * (1 - item.product.discount / 100)
                    : item.product.price;
                  
                  return (
                    <div key={item.productId} className="bg-sky-50 rounded-xl p-4 border border-sky-100">
                      <div className="flex items-start space-x-3 rtl:space-x-reverse">
                        <img
                          src={item.product.image}
                          alt={item.product.nameAr}
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/64x64/e0f2fe/0369a1?text=صورة';
                          }}
                        />
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 text-right">
                            {item.product.nameAr}
                          </h3>
                          <div className="flex items-center justify-between mt-2">
                            <div className="text-right">
                              <span className="font-bold text-sky-600">
                                {(price * item.quantity).toLocaleString()} {settings.currency}
                              </span>
                              {item.product.discount && (
                                <div className="text-xs text-gray-500 line-through">
                                  {(item.product.price * item.quantity).toLocaleString()}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-3">
                            <button
                              onClick={() => removeFromCart(item.productId)}
                              className="p-1 text-red-500 hover:bg-red-100 rounded transition-colors duration-200"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                            
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <button
                                onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center bg-sky-100 hover:bg-sky-200 text-sky-600 rounded-lg transition-colors duration-200"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              
                              <span className="w-8 text-center font-semibold text-gray-800">
                                {item.quantity}
                              </span>
                              
                              <button
                                onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                                disabled={item.quantity >= item.product.stock}
                                className="w-8 h-8 flex items-center justify-center bg-sky-100 hover:bg-sky-200 text-sky-600 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          ) : (
            /* Checkout Form */
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4 text-right">معلومات التوصيل</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                    الاسم *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 text-right"
                    placeholder="ادخل اسمك الكامل"
                    dir="rtl"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                    رقم الهاتف *
                  </label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 text-right"
                    placeholder="09XX XXX XXX"
                    dir="rtl"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                    عنوان التوصيل *
                  </label>
                  <textarea
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 text-right h-20 resize-none"
                    placeholder="ادخل عنوانك بالتفصيل"
                    dir="rtl"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                    ملاحظات إضافية
                  </label>
                  <textarea
                    value={customerInfo.notes}
                    onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 text-right h-16 resize-none"
                    placeholder="أي ملاحظات إضافية"
                    dir="rtl"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="bg-gray-50 border-t border-gray-200 p-4 space-y-4">
            {!isCheckingOut ? (
              <>
                {/* Total */}
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-gray-700">الإجمالي:</span>
                  <span className="text-sky-600">{total.toLocaleString()} {settings.currency}</span>
                </div>
                
                {/* Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse"
                  >
                    <Send className="h-5 w-5" />
                    <span>إرسال الطلب</span>
                  </button>
                  
                  <button
                    onClick={clearCart}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl font-medium transition-colors duration-300"
                  >
                    إفراغ السلة
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <div className="bg-sky-100 p-3 rounded-lg">
                  <div className="text-sm text-sky-700 text-center font-medium">
                    إجمالي الطلب: {total.toLocaleString()} {settings.currency}
                  </div>
                </div>
                
                <div className="flex space-x-3 rtl:space-x-reverse">
                  <button
                    onClick={() => setIsCheckingOut(false)}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-xl font-medium transition-colors duration-300"
                  >
                    عودة
                  </button>
                  <button
                    onClick={handleSendOrder}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse"
                  >
                    <Send className="h-4 w-4" />
                    <span>إرسال</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}