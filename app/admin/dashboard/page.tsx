'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, Eye, EyeOff, LogOut, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { categories, Product, ProductVariant } from '@/lib/products';
import Image from 'next/image';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/admin/products');
      if (response.ok) {
        setIsAuthenticated(true);
        loadProducts();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        setPassword('');
        loadProducts();
      } else {
        alert(data.error || 'فشل في تسجيل الدخول');
      }
    } catch (error) {
      alert('خطأ في الاتصال بالخادم');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
      setIsAuthenticated(false);
      setProducts([]);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/admin/products');
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const handleSaveProduct = async (product: Product) => {
    try {
      const method = isAddingNew ? 'POST' : 'PUT';
      const response = await fetch('/api/admin/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });

      const data = await response.json();

      if (data.success) {
        loadProducts();
        setEditingProduct(null);
        setIsAddingNew(false);
        alert(data.message);
      } else {
        alert(data.error || 'فشل في حفظ المنتج');
      }
    } catch (error) {
      alert('خطأ في الاتصال بالخادم');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;

    try {
      const response = await fetch(`/api/admin/products?id=${productId}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        loadProducts();
        alert(data.message);
      } else {
        alert(data.error || 'فشل في حذف المنتج');
      }
    } catch (error) {
      alert('خطأ في الاتصال بالخادم');
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      product.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.nameEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-12 w-12 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-blue-600">
              لوحة تحكم alma الآمنة
            </CardTitle>
            <p className="text-gray-600">يرجى إدخال كلمة المرور للمتابعة</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleLogin()}
                placeholder="أدخل كلمة المرور"
                disabled={isLoading}
              />
            </div>
            <Button 
              onClick={handleLogin} 
              className="w-full" 
              disabled={isLoading || !password}
            >
              {isLoading ? 'جاري التحقق...' : 'دخول آمن'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-blue-600">
                لوحة تحكم alma المتكاملة
              </h1>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {products.length} منتج
              </Badge>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                تسجيل خروج آمن
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="البحث في المنتجات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="اختر الفئة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الفئات</SelectItem>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.nameAr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button 
            onClick={() => setIsAddingNew(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            إضافة منتج جديد
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={product.image}
                  alt={product.nameAr}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-2 right-2 rtl:right-auto rtl:left-2">
                  <Badge variant={product.available ? "default" : "secondary"}>
                    {product.available ? 'متوفر' : 'غير متوفر'}
                  </Badge>
                </div>
                {product.variants && product.variants.length > 0 && (
                  <div className="absolute top-2 left-2 rtl:left-auto rtl:right-2">
                    <Badge variant="outline" className="bg-white/90">
                      +{product.variants.length} نوع
                    </Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{product.nameAr}</h3>
                  <p className="text-sm text-gray-600">{product.nameEn}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-600">
                      {product.price} ل.س
                    </span>
                    <Badge variant="outline">
                      {categories.find(c => c.id === product.category)?.nameAr}
                    </Badge>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingProduct(product)}
                      className="flex-1"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      تعديل
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add/Edit Product Dialog */}
        <ProductDialog
          product={editingProduct}
          isOpen={!!editingProduct || isAddingNew}
          onClose={() => {
            setEditingProduct(null);
            setIsAddingNew(false);
          }}
          onSave={handleSaveProduct}
          isNew={isAddingNew}
        />
      </main>
    </div>
  );
}

interface ProductDialogProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  isNew: boolean;
}

function ProductDialog({ product, isOpen, onClose, onSave, isNew }: ProductDialogProps) {
  const [formData, setFormData] = useState<Partial<Product>>({
    nameAr: '',
    nameEn: '',
    category: 'drinks',
    price: 0,
    unit: 'piece',
    image: '',
    available: true,
    variants: []
  });

  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData(product);
      setVariants(product.variants || []);
    } else if (isNew) {
      setFormData({
        nameAr: '',
        nameEn: '',
        category: 'drinks',
        price: 0,
        unit: 'piece',
        image: '',
        available: true,
        variants: []
      });
      setVariants([]);
    }
  }, [product, isNew]);

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'products');

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormData(prev => ({ ...prev, image: data.url }));
      } else {
        alert(data.error || 'فشل في رفع الصورة');
      }
    } catch (error) {
      alert('خطأ في رفع الصورة');
    } finally {
      setIsUploading(false);
    }
  };

  const addVariant = () => {
    const newVariant: ProductVariant = {
      id: `variant_${Date.now()}`,
      nameAr: '',
      nameEn: '',
      price: formData.price || 0,
      image: formData.image || '',
      available: true
    };
    setVariants([...variants, newVariant]);
  };

  const updateVariant = (index: number, field: keyof ProductVariant, value: any) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: value };
    setVariants(updated);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameAr || !formData.nameEn || !formData.image) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    
    const productToSave: Product = {
      id: product?.id || `product_${Date.now()}`,
      nameAr: formData.nameAr!,
      nameEn: formData.nameEn!,
      category: formData.category!,
      price: formData.price!,
      unit: formData.unit as 'piece' | 'carton',
      image: formData.image!,
      available: formData.available!,
      variants: variants.length > 0 ? variants : undefined
    };

    onSave(productToSave);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isNew ? 'إضافة منتج جديد' : 'تعديل المنتج'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Product Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nameAr">الاسم بالعربية *</Label>
              <Input
                id="nameAr"
                value={formData.nameAr}
                onChange={(e) => setFormData({...formData, nameAr: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="nameEn">الاسم بالإنجليزية *</Label>
              <Input
                id="nameEn"
                value={formData.nameEn}
                onChange={(e) => setFormData({...formData, nameEn: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="category">الفئة</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData({...formData, category: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.nameAr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="price">السعر (ل.س)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                required
              />
            </div>
            <div>
              <Label htmlFor="unit">وحدة البيع</Label>
              <Select 
                value={formData.unit} 
                onValueChange={(value) => setFormData({...formData, unit: value as 'piece' | 'carton'})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="piece">قطعة</SelectItem>
                  <SelectItem value="carton">كرتونة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <Label htmlFor="image">صورة المنتج *</Label>
            <div className="space-y-2">
              <Input
                id="image"
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                placeholder="رابط الصورة أو ارفع صورة جديدة"
              />
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                  disabled={isUploading}
                />
                {isUploading && <span className="text-sm text-gray-500">جاري الرفع...</span>}
              </div>
              {formData.image && (
                <div className="relative aspect-video w-32 rounded-lg overflow-hidden">
                  <Image
                    src={formData.image}
                    alt="معاينة"
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Variants Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold">المتغيرات والنكهات</Label>
              <Button type="button" onClick={addVariant} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                إضافة متغير
              </Button>
            </div>
            
            {variants.map((variant, index) => (
              <Card key={variant.id} className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label>الاسم بالعربية</Label>
                    <Input
                      value={variant.nameAr}
                      onChange={(e) => updateVariant(index, 'nameAr', e.target.value)}
                      placeholder="مثال: بيبسي كلاسيك"
                    />
                  </div>
                  <div>
                    <Label>الاسم بالإنجليزية</Label>
                    <Input
                      value={variant.nameEn}
                      onChange={(e) => updateVariant(index, 'nameEn', e.target.value)}
                      placeholder="Example: Pepsi Classic"
                    />
                  </div>
                  <div>
                    <Label>السعر (ل.س)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={variant.price}
                      onChange={(e) => updateVariant(index, 'price', parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Switch
                        checked={variant.available}
                        onCheckedChange={(checked) => updateVariant(index, 'available', checked)}
                      />
                      <Label className="text-sm">متوفر</Label>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeVariant(index)}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-4">
                  <Label>رابط صورة المتغير</Label>
                  <Input
                    type="url"
                    value={variant.image}
                    onChange={(e) => updateVariant(index, 'image', e.target.value)}
                    placeholder="رابط صورة المتغير (اختياري)"
                  />
                </div>
              </Card>
            ))}
          </div>

          {/* Available Switch */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Switch
              id="available"
              checked={formData.available}
              onCheckedChange={(checked) => setFormData({...formData, available: checked})}
            />
            <Label htmlFor="available">متوفر للبيع</Label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1" disabled={isUploading}>
              <Save className="h-4 w-4 mr-2" />
              {isNew ? 'إضافة المنتج' : 'حفظ التغييرات'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              إلغاء
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}