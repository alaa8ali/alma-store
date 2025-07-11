import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, Filter, Image, Package, AlertCircle } from 'lucide-react';
import { useProductManager } from '../../hooks/useProductManager';
import { Product, Category } from '../../types';
import ImageUpload from './ImageUpload';

const ProductManager: React.FC = () => {
  const {
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory
  } = useProductManager();

  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStock, setFilterStock] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.nameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
      const matchesStock = filterStock === 'all' || 
                          (filterStock === 'inStock' && product.inStock) ||
                          (filterStock === 'outOfStock' && !product.inStock) ||
                          (filterStock === 'lowStock' && (product.stockQuantity || 0) < 10);
      return matchesSearch && matchesCategory && matchesStock;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'stock':
          return (b.stockQuantity || 0) - (a.stockQuantity || 0);
        case 'sales':
          return (b.salesCount || 0) - (a.salesCount || 0);
        default:
          return a.nameAr.localeCompare(b.nameAr);
      }
    });

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      deleteProduct(id);
    }
  };

  const handleDeleteCategory = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا التصنيف؟ سيتم حذف جميع المنتجات المرتبطة به.')) {
      deleteCategory(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">إدارة المنتجات</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowAddCategory(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus size={18} />
            <span>إضافة تصنيف</span>
          </button>
          <button
            onClick={() => setShowAddProduct(true)}
            className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-sky-600 hover:to-cyan-600 transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus size={18} />
            <span>إضافة منتج</span>
          </button>
        </div>
      </div>

      {/* Categories Management */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">إدارة التصنيفات</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.filter(cat => cat.id !== 'all').map((category) => (
            <div key={category.id} className="relative group">
              <div className="bg-gray-50 p-4 rounded-xl text-center border border-gray-200 hover:border-sky-300 transition-colors duration-200">
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className="font-medium text-sm text-gray-800">{category.nameAr}</div>
                <div className="text-xs text-gray-500">{category.name}</div>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-1">
                <button
                  onClick={() => setEditingCategory(category)}
                  className="bg-blue-500 text-white p-1 rounded text-xs hover:bg-blue-600"
                >
                  <Edit size={12} />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="bg-red-500 text-white p-1 rounded text-xs hover:bg-red-600"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="البحث في المنتجات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-right"
            />
          </div>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-right"
          >
            <option value="all">جميع التصنيفات</option>
            {categories.filter(cat => cat.id !== 'all').map(category => (
              <option key={category.id} value={category.id}>
                {category.nameAr}
              </option>
            ))}
          </select>

          <select
            value={filterStock}
            onChange={(e) => setFilterStock(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-right"
          >
            <option value="all">جميع المنتجات</option>
            <option value="inStock">متوفر</option>
            <option value="outOfStock">غير متوفر</option>
            <option value="lowStock">مخزون منخفض</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-right"
          >
            <option value="name">ترتيب حسب الاسم</option>
            <option value="price">ترتيب حسب السعر</option>
            <option value="stock">ترتيب حسب المخزون</option>
            <option value="sales">ترتيب حسب المبيعات</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            categories={categories}
            onEdit={setEditingProduct}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📦</div>
          <p className="text-xl text-gray-500">لا توجد منتجات تطابق البحث</p>
        </div>
      )}

      {/* Modals */}
      {(showAddProduct || editingProduct) && (
        <ProductModal
          product={editingProduct}
          categories={categories}
          onSave={(productData) => {
            if (editingProduct) {
              updateProduct(editingProduct.id, productData);
              setEditingProduct(null);
            } else {
              addProduct(productData);
              setShowAddProduct(false);
            }
          }}
          onClose={() => {
            setShowAddProduct(false);
            setEditingProduct(null);
          }}
        />
      )}

      {(showAddCategory || editingCategory) && (
        <CategoryModal
          category={editingCategory}
          onSave={(categoryData) => {
            if (editingCategory) {
              updateCategory(editingCategory.id, categoryData);
              setEditingCategory(null);
            } else {
              addCategory(categoryData);
              setShowAddCategory(false);
            }
          }}
          onClose={() => {
            setShowAddCategory(false);
            setEditingCategory(null);
          }}
        />
      )}
    </div>
  );
};

const ProductCard: React.FC<{
  product: Product;
  categories: Category[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}> = ({ product, categories, onEdit, onDelete }) => {
  const category = categories.find(cat => cat.id === product.category);
  const isLowStock = (product.stockQuantity || 0) < 10;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={product.image}
          alt={product.nameAr}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 flex space-x-2">
          <span className="bg-black/50 text-white px-2 py-1 rounded-lg text-xs">
            {category?.nameAr}
          </span>
          {!product.inStock && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs">
              غير متوفر
            </span>
          )}
          {isLowStock && product.inStock && (
            <span className="bg-orange-500 text-white px-2 py-1 rounded-lg text-xs flex items-center space-x-1">
              <AlertCircle size={12} />
              <span>مخزون منخفض</span>
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-1 text-right">
          {product.nameAr}
        </h3>
        <p className="text-gray-600 text-sm mb-2 text-right">{product.name}</p>
        
        <div className="flex justify-between items-center mb-3">
          <div className="text-right">
            <p className="text-2xl font-bold text-sky-600">{product.price} ل.س</p>
            {product.salesCount && (
              <p className="text-xs text-gray-500">{product.salesCount} مبيعة</p>
            )}
          </div>
          <div className="text-left">
            <p className="text-sm text-gray-600">المخزون</p>
            <p className={`font-medium ${isLowStock ? 'text-orange-600' : 'text-green-600'}`}>
              {product.stockQuantity || 0}
            </p>
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={() => onDelete(product.id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <Trash2 size={18} />
          </button>
          <button
            onClick={() => onEdit(product)}
            className="p-2 text-sky-500 hover:bg-sky-50 rounded-lg transition-colors duration-200"
          >
            <Edit size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductModal: React.FC<{
  product?: Product | null;
  categories: Category[];
  onSave: (product: Omit<Product, 'id'>) => void;
  onClose: () => void;
}> = ({ product, categories, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    nameAr: product?.nameAr || '',
    price: product?.price || 0,
    image: product?.image || '',
    category: product?.category || '',
    categoryAr: product?.categoryAr || '',
    description: product?.description || '',
    descriptionAr: product?.descriptionAr || '',
    inStock: product?.inStock ?? true,
    stockQuantity: product?.stockQuantity || 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCategory = categories.find(cat => cat.id === formData.category);
    onSave({
      ...formData,
      categoryAr: selectedCategory?.nameAr || formData.categoryAr
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {product ? 'تعديل المنتج' : 'إضافة منتج جديد'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Product Image */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  صورة المنتج
                </label>
                <ImageUpload
                  currentImage={formData.image}
                  onImageUpload={(url) => setFormData(prev => ({ ...prev, image: url }))}
                />
              </div>

              {/* Basic Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  اسم المنتج بالعربية *
                </label>
                <input
                  type="text"
                  value={formData.nameAr}
                  onChange={(e) => setFormData(prev => ({ ...prev, nameAr: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-right"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  اسم المنتج بالإنجليزية *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  السعر (ليرة سورية) *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-right"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  التصنيف *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-right"
                  required
                >
                  <option value="">اختر التصنيف</option>
                  {categories.filter(cat => cat.id !== 'all').map(category => (
                    <option key={category.id} value={category.id}>
                      {category.nameAr}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  كمية المخزون
                </label>
                <input
                  type="number"
                  value={formData.stockQuantity}
                  onChange={(e) => setFormData(prev => ({ ...prev, stockQuantity: Number(e.target.value) }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-right"
                  min="0"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData(prev => ({ ...prev, inStock: e.target.checked }))}
                    className="w-5 h-5 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
                  />
                  <span className="text-sm font-medium text-gray-700">متوفر في المخزن</span>
                </label>
              </div>

              {/* Descriptions */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  وصف المنتج بالعربية
                </label>
                <textarea
                  value={formData.descriptionAr}
                  onChange={(e) => setFormData(prev => ({ ...prev, descriptionAr: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-right"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-xl hover:from-sky-600 hover:to-cyan-600 transition-colors duration-200"
              >
                {product ? 'تحديث' : 'إضافة'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const CategoryModal: React.FC<{
  category?: Category | null;
  onSave: (category: Omit<Category, 'id'>) => void;
  onClose: () => void;
}> = ({ category, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: category?.name || '',
    nameAr: category?.nameAr || '',
    icon: category?.icon || '📦',
    order: category?.order || 0,
    isActive: category?.isActive ?? true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const commonIcons = ['🥤', '🍬', '🍪', '🛒', '🧴', '📦', '🍞', '🥛', '🧀', '🥩', '🍎', '🥕', '🍕', '🍔', '🍟', '🌮'];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md">
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {category ? 'تعديل التصنيف' : 'إضافة تصنيف جديد'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                اسم التصنيف بالعربية *
              </label>
              <input
                type="text"
                value={formData.nameAr}
                onChange={(e) => setFormData(prev => ({ ...prev, nameAr: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-right"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                اسم التصنيف بالإنجليزية *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                أيقونة التصنيف
              </label>
              <div className="grid grid-cols-8 gap-2 mb-3">
                {commonIcons.map(icon => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, icon }))}
                    className={`p-2 text-xl border rounded-lg hover:bg-gray-50 transition-colors duration-200 ${
                      formData.icon === icon ? 'border-sky-500 bg-sky-50' : 'border-gray-300'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-center"
                placeholder="أو أدخل إيموجي مخصص"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                ترتيب العرض
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData(prev => ({ ...prev, order: Number(e.target.value) }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-right"
                min="0"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="w-5 h-5 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
                />
                <span className="text-sm font-medium text-gray-700">تصنيف نشط</span>
              </label>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-colors duration-200"
              >
                {category ? 'تحديث' : 'إضافة'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductManager;
