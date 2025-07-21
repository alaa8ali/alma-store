import React, { useState } from 'react';
import { Save, Phone, MapPin, Clock, Store, DollarSign } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export function AdminSettings() {
  const { settings, updateSettings } = useApp();
  const [formData, setFormData] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      updateSettings(formData);
      alert('تم حفظ الإعدادات بنجاح!');
    } catch (error) {
      alert('حدث خطأ أثناء حفظ الإعدادات');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">إعدادات المتجر</h2>
      </div>

      {/* Settings Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Store Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Store className="h-5 w-5 ml-2 text-blue-600" />
                معلومات المتجر
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اسم المتجر (عربي) *
                  </label>
                  <input
                    type="text"
                    value={formData.storeNameAr}
                    onChange={(e) => setFormData({...formData, storeNameAr: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                    dir="rtl"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اسم المتجر (انجليزي) *
                  </label>
                  <input
                    type="text"
                    value={formData.storeName}
                    onChange={(e) => setFormData({...formData, storeName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Phone className="h-5 w-5 ml-2 text-green-600" />
                معلومات التواصل
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رقم الواتساب *
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({...formData, whatsappNumber: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="+963983012001"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">بتنسيق دولي مع رمز البلد</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الموقع (عربي) *
                  </label>
                  <input
                    type="text"
                    value={formData.locationAr}
                    onChange={(e) => setFormData({...formData, locationAr: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                    dir="rtl"
                    required
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الموقع (انجليزي)
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Working Hours */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Clock className="h-5 w-5 ml-2 text-purple-600" />
                ساعات العمل
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ساعات العمل (عربي) *
                  </label>
                  <input
                    type="text"
                    value={formData.workingHoursAr}
                    onChange={(e) => setFormData({...formData, workingHoursAr: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-right"
                    dir="rtl"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ساعات العمل (انجليزي)
                  </label>
                  <input
                    type="text"
                    value={formData.workingHours}
                    onChange={(e) => setFormData({...formData, workingHours: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Financial Settings */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <DollarSign className="h-5 w-5 ml-2 text-yellow-600" />
                إعدادات مالية
              </h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عملة المتجر *
                  </label>
                  <input
                    type="text"
                    value={formData.currency}
                    onChange={(e) => setFormData({...formData, currency: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-right"
                    dir="rtl"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    معدل الضريبة (%)
                  </label>
                  <input
                    type="number"
                    value={formData.taxRate}
                    onChange={(e) => setFormData({...formData, taxRate: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رسوم التوصيل
                  </label>
                  <input
                    type="number"
                    value={formData.deliveryFee}
                    onChange={(e) => setFormData({...formData, deliveryFee: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">ملاحظات مهمة:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• رقم الواتساب يجب أن يكون بتنسيق دولي مع رمز البلد</li>
                <li>• هذه الإعدادات ستظهر في جميع أنحاء المتجر</li>
                <li>• تأكد من صحة جميع المعلومات قبل الحفظ</li>
                <li>• بعد حفظ الإعدادات، قد تحتاج إعادة تحميل الصفحة</li>
              </ul>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSaving}
                className={`flex items-center space-x-2 rtl:space-x-reverse px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isSaving
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                <Save className="h-5 w-5" />
                <span>{isSaving ? 'جاري الحفظ...' : 'حفظ الإعدادات'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">معاينة الإعدادات</h3>
          
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">اسم المتجر:</span>
              <span className="font-medium text-gray-800">{formData.storeNameAr}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">الموقع:</span>
              <span className="font-medium text-gray-800">{formData.locationAr}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">رقم الواتساب:</span>
              <a 
                href={`https://wa.me/${formData.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-green-600 hover:text-green-700"
              >
                {formData.whatsappNumber}
              </a>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">ساعات العمل:</span>
              <span className="font-medium text-gray-800">{formData.workingHoursAr}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">العملة:</span>
              <span className="font-medium text-gray-800">{formData.currency}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}