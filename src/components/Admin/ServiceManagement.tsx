import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, MapPin, Phone } from 'lucide-react';
import { Service } from '../../types';
import { useApp } from '../../contexts/AppContext';

export function ServiceManagement() {
  const { services, categories, addService, updateService, deleteService, settings } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    nameAr: '',
    description: '',
    descriptionAr: '',
    price: 0,
    category: '5', // Default to Home Services
    categoryAr: 'خدمات منزلية',
    image: '',
    available: true,
    contactInfo: settings.whatsappNumber,
    serviceAreas: ['اللاذقية'],
    duration: '',
    durationAr: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      nameAr: '',
      description: '',
      descriptionAr: '',
      price: 0,
      category: '5',
      categoryAr: 'خدمات منزلية',
      image: '',
      available: true,
      contactInfo: settings.whatsappNumber,
      serviceAreas: ['اللاذقية'],
      duration: '',
      durationAr: ''
    });
  };

  const openModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name,
        nameAr: service.nameAr,
        description: service.description,
        descriptionAr: service.descriptionAr,
        price: service.price,
        category: service.category,
        categoryAr: service.categoryAr,
        image: service.image,
        available: service.available,
        contactInfo: service.contactInfo,
        serviceAreas: service.serviceAreas,
        duration: service.duration || '',
        durationAr: service.durationAr || ''
      });
    } else {
      setEditingService(null);
      resetForm();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nameAr || !formData.price || !formData.contactInfo) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const serviceData = {
      ...formData,
      image: formData.image || '/images/category-services.jpg'
    };

    if (editingService) {
      updateService(editingService.id, serviceData);
      alert('تم تحديث الخدمة بنجاح!');
    } else {
      addService(serviceData);
      alert('تم إضافة الخدمة بنجاح!');
    }

    closeModal();
  };

  const handleDelete = (serviceId: string, serviceName: string) => {
    if (confirm(`هل أنت متأكد من حذف الخدمة "${serviceName}"؟`)) {
      deleteService(serviceId);
      alert('تم حذف الخدمة بنجاح!');
    }
  };

  const handleServiceAreasChange = (value: string) => {
    const areas = value.split('،').map(area => area.trim()).filter(area => area);
    setFormData({...formData, serviceAreas: areas});
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">إدارة الخدمات</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center space-x-2 rtl:space-x-reverse bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300"
        >
          <Plus className="h-5 w-5" />
          <span>إضافة خدمة جديدة</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <img
                src={service.image}
                alt={service.nameAr}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/images/category-services.jpg';
                }}
              />
              <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold ${
                service.available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
              }`}>
                {service.available ? 'متاح' : 'غير متاح'}
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-bold text-gray-800 text-lg text-right">{service.nameAr}</h3>
                <p className="text-gray-600 text-sm text-right line-clamp-2">{service.descriptionAr}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">السعر:</span>
                  <span className="font-bold text-orange-600">
                    {service.price.toLocaleString()} {settings.currency}
                  </span>
                </div>
                
                {service.durationAr && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">المدة:</span>
                    <span className="text-gray-700">{service.durationAr}</span>
                  </div>
                )}
                
                <div className="flex items-start justify-between text-sm">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="text-right text-gray-600">
                    <span className="text-xs">{service.serviceAreas.join(' - ')}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{service.contactInfo}</span>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 rtl:space-x-reverse pt-3 border-t border-gray-100">
                <button
                  onClick={() => openModal(service)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                  title="تعديل"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(service.id, service.nameAr)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                  title="حذف"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Add New Service Card */}
        <div 
          onClick={() => openModal()}
          className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center text-gray-500 hover:text-orange-600 hover:border-orange-300 hover:bg-orange-50 cursor-pointer transition-all duration-300 min-h-[300px]"
        >
          <Plus className="h-12 w-12 mb-4" />
          <span className="text-lg font-medium">إضافة خدمة جديدة</span>
        </div>
      </div>

      {services.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">لا توجد خدمات حالياً</div>
          <button
            onClick={() => openModal()}
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            أضف أول خدمة
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  {editingService ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}
                </h3>
                <button
                  onClick={closeModal}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      اسم الخدمة (عربي) *
                    </label>
                    <input
                      type="text"
                      value={formData.nameAr}
                      onChange={(e) => setFormData({...formData, nameAr: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-right"
                      dir="rtl"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      اسم الخدمة (انجليزي)
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الوصف (عربي)
                    </label>
                    <textarea
                      value={formData.descriptionAr}
                      onChange={(e) => setFormData({...formData, descriptionAr: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-right h-20 resize-none"
                      dir="rtl"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الوصف (انجليزي)
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 h-20 resize-none"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      السعر *
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      min="0"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      رقم التواصل *
                    </label>
                    <input
                      type="tel"
                      value={formData.contactInfo}
                      onChange={(e) => setFormData({...formData, contactInfo: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      مدة الخدمة (عربي)
                    </label>
                    <input
                      type="text"
                      value={formData.durationAr}
                      onChange={(e) => setFormData({...formData, durationAr: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-right"
                      placeholder="1-2 ساعة"
                      dir="rtl"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      مدة الخدمة (انجليزي)
                    </label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="1-2 hours"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    مناطق الخدمة (مفصولة بفاصلة)
                  </label>
                  <input
                    type="text"
                    value={formData.serviceAreas.join('، ')}
                    onChange={(e) => handleServiceAreasChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-right"
                    placeholder="اللاذقية، طرطوس، بانياس، جبلة"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رابط الصورة
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="https://example.com/service-image.jpg"
                  />
                </div>

                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <input
                    type="checkbox"
                    id="available"
                    checked={formData.available}
                    onChange={(e) => setFormData({...formData, available: e.target.checked})}
                    className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <label htmlFor="available" className="text-sm font-medium text-gray-700">
                    الخدمة متاحة حالياً
                  </label>
                </div>

                <div className="flex justify-end space-x-3 rtl:space-x-reverse pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition-colors duration-200"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors duration-200"
                  >
                    <Save className="h-4 w-4" />
                    <span>{editingService ? 'حفظ التغييرات' : 'إضافة الخدمة'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}