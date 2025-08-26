'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { products, categories, Product, ProductVariant } from '@/lib/products';
import Image from 'next/image';

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [productList, setProductList] = useState<Product[]>(products);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const ADMIN_PASSWORD = 'alma2024admin'; // في بيئة الإنتاج، يجب استخدام نظام أمان أقوى

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('alma-admin-auth', 'true');
    } else {
      alert('كلمة المرور غير صحيحة');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('alma-admin-auth');
    setPassword('');
  };

  useEffect(() => {
    const savedAuth = localStorage.getItem('alma-admin-auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const filteredProducts = productList.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      product.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.nameEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSaveProduct = (product: Product) => {
    if (isAddingNew) {
      setProductList([...productList, { ...product, id: Date.now().toString() }]);
    } else {
      setProductList(productList.map(p => p.id === product.id ? product : p));
    }
    setEditingProduct(null);
    setIsAddingNew(false);
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      setProductList(productList.filter(p => p.id !== productId));
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(productList, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'alma-products.json';
    link.click();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-blue-600">
              🔐 لوحة تحكم alma
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
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="أدخل كلمة المرور"
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              دخول
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
              <h1 className="text-2xl font-bold text-blue-600">
                🛠️ لوحة تحكم alma
              </h1>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {productList.length} منتج
              </Badge>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Button variant="outline" onClick={exportData}>
                تصدير البيانات
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                تسجيل خروج
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
    available: true
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else if (isNew) {
      setFormData({
        nameAr: '',
        nameEn: '',
        category: 'drinks',
        price: 0,
        unit: 'piece',
        image: '',
        available: true
      });
    }
  }, [product, isNew]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameAr || !formData.nameEn || !formData.image) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    
    onSave({
      id: product?.id || '',
      nameAr: formData.nameAr!,
      nameEn: formData.nameEn!,
      category: formData.category!,
      price: formData.price!,
      unit: formData.unit as 'piece' | 'carton',
      image: formData.image!,
      available: formData.available!
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isNew ? 'إضافة منتج جديد' : 'تعديل المنتج'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div>
            <Label htmlFor="image">رابط الصورة *</Label>
            <Input
              id="image"
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              placeholder="https://example.com/image.jpg"
              required
            />
            {formData.image && (
              <div className="mt-2 relative aspect-video w-32 rounded-lg overflow-hidden">
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

          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Switch
              id="available"
              checked={formData.available}
              onCheckedChange={(checked) => setFormData({...formData, available: checked})}
            />
            <Label htmlFor="available">متوفر للبيع</Label>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
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