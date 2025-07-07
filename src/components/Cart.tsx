import React from 'react';
import { X, Minus, Plus, Trash2, MessageCircle } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  items: CartItem[];
  total: number;
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onSendOrder: () => void;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  items,
  total,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onSendOrder
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white p-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">سلة المشتريات</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-lg font-medium">السلة فارغة</p>
              <p className="text-sm">ابدأ بإضافة المنتجات</p>
            </div>
          ) : (
            <div className="p-4 space-y-4 pb-32">
              {items.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-start space-x-3">
                    <img
                      src={item.image}
                      alt={item.nameAr}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-800 text-right mb-1">
                        {item.nameAr}
                      </h3>
                      <p className="text-sm text-sky-600 font-medium text-right">
                        {item.price} ل.س
                      </p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 size={16} />
                        </button>
                        
                        <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-300">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-medium min-w-[2rem] text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {items.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="w-full py-3 text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-colors duration-200 font-medium"
                >
                  إفراغ السلة
                </button>
              )}
            </div>
          )}
        </div>

        {/* Fixed Footer with WhatsApp Button */}
        {items.length > 0 && (
          <div className="fixed bottom-0 right-0 w-full max-w-md bg-white border-t border-gray-200 p-4 shadow-2xl">
            {/* Total */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold text-gray-800">المجموع الكلي:</span>
              <span className="text-2xl font-bold text-sky-600">{total.toLocaleString()} ل.س</span>
            </div>
            
            {/* WhatsApp Button */}
            <button
              onClick={onSendOrder}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <MessageCircle size={24} />
              <span>إرسال الطلب عبر واتساب</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;