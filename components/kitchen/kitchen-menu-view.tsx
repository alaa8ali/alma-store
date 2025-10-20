
'use client';

import { useState, useEffect } from 'react';
import { fetchDailyMenuItems } from '@/lib/supabase-data'; // سنقوم بإنشاء هذه الدالة لاحقًا

interface DailyMenuItem {
  id: string;
  name_ar: string;
  description_ar?: string;
  price: number;
  image?: string;
}

interface KitchenMenuViewProps {
  branchId: string;
}

export function KitchenMenuView({ branchId }: KitchenMenuViewProps) {
  const [dailyMenuItems, setDailyMenuItems] = useState<DailyMenuItem[]>([]);
  const [activeTab, setActiveTab] = useState<'dailyMenu' | 'customOrder'>('dailyMenu');
  const [selectedItems, setSelectedItems] = useState<DailyMenuItem[]>([]);
  const whatsappNumber = '+963983012001';

  useEffect(() => {
    if (activeTab === 'dailyMenu') {
      loadDailyMenuItems();
    }
  }, [activeTab]);

  const loadDailyMenuItems = async () => {
    const items = await fetchDailyMenuItems();
    setDailyMenuItems(items);
  };

  const toggleItemSelection = (item: DailyMenuItem) => {
    setSelectedItems(prev => 
      prev.some(i => i.id === item.id) 
        ? prev.filter(i => i.id !== item.id) 
        : [...prev, item]
    );
  };

  const handleOrderViaWhatsApp = () => {
    let message = 'مرحباً، أود تقديم طلب من قائمة المطبخ اليومية:\n\n';
    if (selectedItems.length > 0) {
      selectedItems.forEach(item => {
        message += `- ${item.name_ar} (السعر: ${item.price} ل.س)\n`;
      });
      message += '\nالرجاء تحديد موقعي: [أدخل موقعك هنا]';
    } else {
      message = 'مرحباً، أود الاستفسار عن قائمة المطبخ اليومية. الرجاء تحديد موقعي: [أدخل موقعك هنا]';
    }
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCustomOrderViaWhatsApp = () => {
    const message = 'مرحباً، أود تقديم طلب مخصص للمطبخ. الرجاء تحديد موقعي: [أدخل موقعك هنا] ووصف طلبك: [اكتب طلبك المخصص هنا]';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">👨‍🍳</div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">المطبخ</h2>
      <p className="text-xl text-gray-600 mb-8">
        اطلب وجباتك المفضلة أو قدم طلب مخصص
      </p>

      <div className="flex justify-center mb-8">
        <button
          onClick={() => setActiveTab('dailyMenu')}
          className={`py-2 px-6 rounded-l-lg text-lg font-medium ${activeTab === 'dailyMenu' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          القائمة اليومية
        </button>
        <button
          onClick={() => setActiveTab('customOrder')}
          className={`py-2 px-6 rounded-r-lg text-lg font-medium ${activeTab === 'customOrder' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          طلبات مخصصة
        </button>
      </div>

      {activeTab === 'dailyMenu' && (
        <div className="max-w-4xl mx-auto">
          {dailyMenuItems.length === 0 ? (
            <p className="text-gray-600 text-lg">لا توجد عناصر في القائمة اليومية حالياً. يرجى التحقق لاحقاً.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dailyMenuItems.map(item => (
                <div 
                  key={item.id} 
                  className={`bg-white p-6 rounded-xl shadow-md transition-all duration-300 ${selectedItems.some(i => i.id === item.id) ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'}`}
                  onClick={() => toggleItemSelection(item)}
                >
                  {item.image && (
                    <div className="relative h-40 w-full mb-4 rounded-lg overflow-hidden">
                      <img src={item.image} alt={item.name_ar} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <h3 className="font-bold text-xl mb-2">{item.name_ar}</h3>
                  {item.description_ar && (
                    <p className="text-sm text-gray-600 mb-2">{item.description_ar}</p>
                  )}
                  <p className="text-lg font-semibold text-green-600">{item.price} ل.س</p>
                </div>
              ))}
            </div>
          )}
          {dailyMenuItems.length > 0 && (
            <button
              onClick={handleOrderViaWhatsApp}
              className="mt-8 bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition-colors text-xl"
            >
              طلب عبر واتساب ({selectedItems.length} عناصر محددة)
            </button>
          )}
        </div>
      )}

      {activeTab === 'customOrder' && (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold mb-4">تقديم طلب مخصص</h3>
          <p className="text-gray-700 mb-6">
            يمكنك التواصل معنا مباشرة عبر واتساب لتقديم طلب مخصص يناسب احتياجاتك. يرجى تزويدنا بتفاصيل طلبك وموقعك.
          </p>
          <button
            onClick={handleCustomOrderViaWhatsApp}
            className="bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition-colors text-xl"
          >
            طلب مخصص عبر واتساب
          </button>
        </div>
      )}
    </div>
  );
}

