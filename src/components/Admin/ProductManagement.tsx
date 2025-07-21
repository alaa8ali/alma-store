import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Upload, Eye, EyeOff } from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../contexts/AppContext';

export function ProductManagement() {
  const { products, categories, addProduct, updateProduct, deleteProduct, settings } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    nameAr: '',
    description: '',
    descriptionAr: '',
    price: 0,
    category: '',
    categoryAr: '',
    image: '',
    stock: 0,
    featured: false,
    discount: 0,
    unit: '',
    unitAr: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      nameAr: '',
      description: '',
      descriptionAr: '',
      price: 0,
      category: '',
      categoryAr: '',
      image: '',
      stock: 0,
      featured: false,
      discount: 0,
      unit: '',
      unitAr: ''
    });
  };

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        nameAr: product.nameAr,
        description: product.description,
        descriptionAr: product.descriptionAr,
        price: product.price,
        category: product.category,
        categoryAr: product.categoryAr,
        image: product.image,
        stock: product.stock,
        featured: product.featured || false,
        discount: product.discount || 0,
        unit: product.unit,
        unitAr: product.unitAr
      });
    } else {
      setEditingProduct(null);
      resetForm();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nameAr || !formData.price || !formData.category) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const selectedCategory = categories.find(c => c.id === formData.category);
    const productData = {
      ...formData,
      categoryAr: selectedCategory?.nameAr || formData.categoryAr,
      image: formData.image || `https://via.placeholder.com/300x200/e0f2fe/0369a1?text=${encodeURIComponent(formData.nameAr)}`
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      alert('تم تحديث المنتج بنجاح!');
    } else {
      addProduct(productData);
      alert('تم إضافة المنتج بنجاح!');
    }

    closeModal();
  };

  const handleDelete = (productId: string, productName: string) => {
    if (confirm(`هل أنت متأكد من حذف المنتج "${productName}"؟`)) {
      deleteProduct(productId);
      alert('تم حذف المنتج بنجاح!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">إدارة المنتجات</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center space-x-2 rtl:space-x-reverse bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300"
        >
          <Plus className="h-5 w-5" />
          <span>إضافة منتج جديد</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">صورة</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">اسم المنتج</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">الفئة</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">السعر</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">المخزون</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">الحالة</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img
                      src={product.image}
                      alt={product.nameAr}
                      className="w-12 h-12 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/48x48/e0f2fe/0369a1?text=صورة';
                      }}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-right">
                      <div className="font-semibold text-gray-800">{product.nameAr}</div>
                      <div className="text-sm text-gray-500">{product.name}</div>
                      {product.featured && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
                          ⭐ مميز
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-gray-700">{product.categoryAr}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="font-semibold text-gray-800">
                      {product.price.toLocaleString()} {settings.currency}
                    </div>
                    {product.discount && product.discount > 0 && (
                      <div className="text-sm text-red-600">خصم {product.discount}%</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      product.stock <= 5 
                        ? 'bg-red-100 text-red-800' 
                        : product.stock <= 20 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {product.stock} {product.unitAr}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock > 0 ? 'متوفر' : 'غير متوفر'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <button
                        onClick={() => openModal(product)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                        title="تعديل"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id, product.nameAr)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                        title="حذف"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {products.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">لا توجد منتجات حالياً</div>
            <button
              onClick={() => openModal()}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              أضف أول منتج
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  {editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}
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
                      اسم المنتج (عربي) *
                    </label>
                    <input
                      type="text"
                      value={formData.nameAr}
                      onChange={(e) => setFormData({...formData, nameAr: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                      dir="rtl"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      اسم المنتج (انجليزي)
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right h-20 resize-none"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      السعر *
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      المخزون *
                    </label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      نسبة الخصم (%)
                    </label>
                    <input
                      type="number"
                      value={formData.discount}
                      onChange={(e) => setFormData({...formData, discount: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الفئة *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">اختر الفئة</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.nameAr}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الوحدة (عربي)
                    </label>
                    <input
                      type="text"
                      value={formData.unitAr}
                      onChange={(e) => setFormData({...formData, unitAr: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                      placeholder="قطعة، كيلو، لتر..."
                      dir="rtl"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الوحدة (انجليزي)
                    </label>
                    <input
                      type="text"
                      value={formData.unit}
                      onChange={(e) => setFormData({...formData, unit: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="piece, kg, liter..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رابط الصورة
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                    منتج مميز (سيظهر في الصفحة الرئيسية)
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
                    className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
                  >
                    <Save className="h-4 w-4" />
                    <span>{editingProduct ? 'حفظ التغييرات' : 'إضافة المنتج'}</span>
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