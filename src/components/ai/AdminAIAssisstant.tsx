import React, { useState } from 'react';
import { Brain, Send, TrendingUp, Package, ShoppingCart } from 'lucide-react';
import { useOrderManager } from '../../hooks/useOrderManager';
import { useProductManager } from '../../hooks/useProductManager';

const AdminAIAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { orders } = useOrderManager();
  const { products } = useProductManager();

  const quickQuestions = [
    'ما هي أفضل المنتجات مبيعاً هذا الشهر؟',
    'كيف يمكنني زيادة المبيعات؟',
    'ما هي المنتجات التي تحتاج تجديد مخزون؟',
    'اقترح أسعار جديدة للمنتجات',
    'ما هو أفضل وقت لإطلاق عروض؟',
    'كيف أحسن تجربة العملاء؟'
  ];

  const handleAIQuery = async (question: string) => {
    if (!question.trim()) return;

    setIsLoading(true);
    
    // محاكاة رد الذكاء الاصطناعي
    setTimeout(() => {
      let aiResponse = '';
      
      if (question.includes('مبيعاً') || question.includes('أفضل المنتجات')) {
        aiResponse = `بناءً على تحليل بيانات المبيعات:

📈 **أفضل المنتجات مبيعاً:**
1. الهواتف الذكية - ${Math.floor(Math.random() * 50 + 20)} مبيعة
2. الملابس الرجالية - ${Math.floor(Math.random() * 40 + 15)} مبيعة  
3. المواد الغذائية - ${Math.floor(Math.random() * 60 + 30)} مبيعة

💡 **توصياتي:**
- ركز على الترويج للهواتف الذكية
- أضف المزيد من الملابس الرجالية
- حافظ على مخزون المواد الغذائية`;

      } else if (question.includes('زيادة المبيعات')) {
        aiResponse = `🚀 **استراتيجيات زيادة المبيعات:**

1. **العروض والخصومات:**
   - عروض "اشتري 2 واحصل على 1 مجاناً"
   - خصم 15% على الطلبات فوق 50,000 ل.س

2. **تحسين تجربة العملاء:**
   - تسريع عملية الطلب عبر واتساب
   - إضافة خدمة التوصيل المجاني

3. **التسويق الرقمي:**
   - استخدام وسائل التواصل الاجتماعي
   - برنامج إحالة العملاء`;

      } else if (question.includes('مخزون') || question.includes('تجديد')) {
        const lowStockProducts = products.filter(p => (p.stockQuantity || 0) < 10);
        aiResponse = `📦 **المنتجات التي تحتاج تجديد مخزون:**

${lowStockProducts.length > 0 ? 
  lowStockProducts.map((p, i) => `${i + 1}. ${p.nameAr} - متبقي: ${p.stockQuantity || 0}`).join('\n') :
  'جميع المنتجات متوفرة بكمية كافية! 👍'
}

💡 **نصائح إدارة المخزون:**
- اطلب المخزون عندما تصل الكمية إلى 5 قطع
- راقب المنتجات سريعة البيع أسبوعياً`;

      } else if (question.includes('أسعار')) {
        aiResponse = `💰 **اقتراحات تحسين الأسعار:**

📊 **تحليل الأسعار الحالية:**
- متوسط سعر المنتجات: ${Math.floor(products.reduce((sum, p) => sum + p.price, 0) / products.length).toLocaleString()} ل.س
- أعلى سعر: ${Math.max(...products.map(p => p.price)).toLocaleString()} ل.س
- أقل سعر: ${Math.min(...products.map(p => p.price)).toLocaleString()} ل.س

🎯 **توصيات:**
- زيادة أسعار المنتجات عالية الطلب بـ 5-10%
- تخفيض أسعار المنتجات بطيئة البيع بـ 15%
- إنشاء فئات سعرية متدرجة`;

      } else {
        aiResponse = `شكراً لسؤالك! 🤖

أنا مساعدك الذكي وأستطيع مساعدتك في:
- تحليل المبيعات والأداء
- اقتراح استراتيجيات التسويق
- إدارة المخزون والأسعار
- تحسين تجربة العملاء
- توقع الاتجاهات المستقبلية

جرب أحد الأسئلة السريعة أعلاه للحصول على تحليل مفصل! 📈`;
      }

      setResponse(aiResponse);
      setIsLoading(false);
    }, 2000);
  };

  const stats = [
    {
      title: 'إجمالي المنتجات',
      value: products.length,
      icon: Package,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'إجمالي الطلبات',
      value: orders.length,
      icon: ShoppingCart,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'الإيرادات الكلية',
      value: `${orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()} ل.س`,
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* رأس المساعد الذكي */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Brain size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">مساعدك الإداري الذكي</h2>
            <p className="opacity-90">اسأل أي شيء عن متجرك وستحصل على إجابات ذكية</p>
          </div>
        </div>

        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white/10 rounded-xl p-4 text-center">
                <Icon className="mx-auto mb-2" size={24} />
                <p className="text-sm opacity-90">{stat.title}</p>
                <p className="font-bold">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* منطقة السؤال */}
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAIQuery(query)}
              placeholder="اسأل مساعدك الذكي... (مثل: 'كيف يمكنني زيادة المبيعات؟')"
              className="flex-1 px-4 py-3 rounded-xl text-gray-800 focus:ring-2 focus:ring-white/50 focus:outline-none"
            />
            <button
              onClick={() => handleAIQuery(query)}
              disabled={isLoading || !query.trim()}
              className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-medium hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Send size={20} />
              )}
            </button>
          </div>

          {/* أسئلة سريعة */}
          <div className="grid grid-cols-2 gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => {
                  setQuery(question);
                  handleAIQuery(question);
                }}
                className="p-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors duration-200 text-right"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* منطقة الإجابة */}
      {response && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Brain className="text-white" size={16} />
            </div>
            <h3 className="font-bold text-gray-800">إجابة المساعد الذكي</h3>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-right">
              {response}
            </p>
          </div>

          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => setResponse('')}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              مسح
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(response)}
              className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors duration-200"
            >
              نسخ الإجابة
            </button>
          </div>
        </div>
      )}

      {/* نصائح للاستخدام */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
        <h3 className="font-bold text-yellow-800 mb-3">💡 نصائح للحصول على أفضل النتائج</h3>
        <ul className="space-y-2 text-yellow-700 text-sm">
          <li>• كن محدداً في أسئلتك (مثل: "ما هي أفضل 5 منتجات مبيعاً في قسم الإلكترونيات؟")</li>
          <li>• اسأل عن اتجاهات المبيعات والتوقعات المستقبلية</li>
          <li>• اطلب اقتراحات لتحسين الأداء والمبيعات</li>
          <li>• استفسر عن استراتيجيات التسويق والتسعير</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminAIAssistant;
