'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Edit, Trash2, Save, X, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import type { User } from '@supabase/supabase-js';
import { type ProductWithCategory } from './page';

// Define a simple Category type for the client
type Category = {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
};

interface AdminPanelClientProps {
  serverProducts: ProductWithCategory[];
  serverCategories: Category[];
}

export default function AdminPanelClient({ serverProducts, serverCategories }: AdminPanelClientProps) {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [productList, setProductList] = useState(serverProducts);
  const [categoryList, setCategoryList] = useState(serverCategories);

  const [editingProduct, setEditingProduct] = useState<ProductWithCategory | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy state and handlers for category management UI
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);


  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(`خطأ في تسجيل الدخول: ${error.message}`);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const filteredProducts = productList.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category_id === selectedCategory;
    const matchesSearch = !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleSaveProduct = async (productFormData: Partial<ProductWithCategory>) => {
    const { id, categories, ...dataToSave } = productFormData;

    if (isAddingNew) {
      const { data: newProduct, error } = await supabase
        .from('products')
        .insert(dataToSave)
        .select('*, categories(*)')
        .single();

      if (error) {
        alert(`خطأ في إضافة المنتج: ${error.message}`);
      } else if (newProduct) {
        setProductList([newProduct, ...productList]);
      }
    } else if (editingProduct) {
      const { data: updatedProduct, error } = await supabase
        .from('products')
        .update(dataToSave)
        .eq('id', editingProduct.id)
        .select('*, categories(*)')
        .single();

      if (error) {
        alert(`خطأ في تحديث المنتج: ${error.message}`);
      } else if (updatedProduct) {
        setProductList(productList.map(p => p.id === updatedProduct.id ? updatedProduct : p));
      }
    }

    setEditingProduct(null);
    setIsAddingNew(false);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) {
        alert(`خطأ في حذف المنتج: ${error.message}`);
      } else {
        setProductList(productList.filter(p => p.id !== productId));
      }
    }
  };

  const handleSaveCategory = async (categoryFormData: Partial<Category>) => {
    const { id, ...dataToSave } = categoryFormData;
    if (isAddingCategory) {
      const { data: newCategory, error } = await supabase
        .from('categories')
        .insert(dataToSave)
        .select()
        .single();
      if (error) {
        alert(`خطأ في إضافة الفئة: ${error.message}`);
      } else if (newCategory) {
        setCategoryList([newCategory, ...categoryList]);
      }
    } else if (editingCategory) {
      const { data: updatedCategory, error } = await supabase
        .from('categories')
        .update(dataToSave)
        .eq('id', editingCategory.id)
        .select()
        .single();
      if (error) {
        alert(`خطأ في تحديث الفئة: ${error.message}`);
      } else if (updatedCategory) {
        setCategoryList(categoryList.map(c => c.id === updatedCategory.id ? updatedCategory : c));
      }
    }
    setEditingCategory(null);
    setIsAddingCategory(false);
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الفئة؟ سيؤدي هذا إلى إلغاء ربطها من جميع المنتجات.')) {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId);
      if (error) {
        alert(`خطأ في حذف الفئة: ${error.message}`);
      } else {
        setCategoryList(categoryList.filter(c => c.id !== categoryId));
      }
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-blue-600">🔐 لوحة تحكم alma</CardTitle>
            <p className="text-gray-600">يرجى تسجيل الدخول للمتابعة</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@alma.com" />
            </div>
            <div>
              <Label htmlFor="password">كلمة المرور</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleLogin()} />
            </div>
            <Button onClick={handleLogin} className="w-full"><LogIn className="h-4 w-4 mr-2" />تسجيل الدخول</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <h1 className="text-2xl font-bold text-blue-600">🛠️ لوحة تحكم alma</h1>
              <Badge variant="secondary" className="bg-green-100 text-green-800">{productList.length} منتج</Badge>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <span className="text-sm text-gray-600 hidden sm:block">{user.email}</span>
              <Button variant="outline" onClick={handleLogout}><LogOut className="h-4 w-4 mr-2" />تسجيل الخروج</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>إدارة الفئات</CardTitle>
            <Button size="sm" onClick={() => setIsAddingCategory(true)}>
              <Plus className="h-4 w-4 mr-2" />
              إضافة فئة جديدة
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {categoryList.map(category => (
                <div key={category.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100">
                  <div>
                    <p className="font-medium">{category.name}</p>
                    <p className="text-sm text-gray-500">{category.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => setEditingCategory(category)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteCategory(category.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <h2 className="text-xl font-semibold mb-4">إدارة المنتجات</h2>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Input placeholder="البحث في المنتجات..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1" />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="اختر الفئة" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الفئات</SelectItem>
              {categoryList.map(category => (<SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>))}
            </SelectContent>
          </Select>
          <Button onClick={() => setIsAddingNew(true)} className="bg-blue-600 hover:bg-blue-700"><Plus className="h-4 w-4 mr-2" />إضافة منتج جديد</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative aspect-square"><Image src={product.image_url || '/placeholder.png'} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" /></div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-600">{product.price} ل.س</span>
                    <Badge variant="outline">{product.categories?.name}</Badge>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" onClick={() => setEditingProduct(product)} className="flex-1"><Edit className="h-3 w-3 mr-1" />تعديل</Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteProduct(product.id)} className="text-red-600 hover:text-red-700"><Trash2 className="h-3 w-3" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <ProductDialog product={editingProduct} isOpen={!!editingProduct || isAddingNew} onClose={() => { setEditingProduct(null); setIsAddingNew(false); }} onSave={handleSaveProduct} isNew={isAddingNew} categories={categoryList} />
        <CategoryDialog category={editingCategory} isOpen={!!editingCategory || isAddingCategory} onClose={() => { setEditingCategory(null); setIsAddingCategory(false); }} onSave={handleSaveCategory} isNew={isAddingCategory} />
      </main>
    </div>
  );
}

interface ProductDialogProps {
  product: ProductWithCategory | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Partial<ProductWithCategory>) => void;
  isNew: boolean;
  categories: Category[];
}

function ProductDialog({ product, isOpen, onClose, onSave, isNew, categories }: ProductDialogProps) {
  const [formData, setFormData] = useState<Partial<ProductWithCategory>>({});

  useEffect(() => {
    if (isOpen) {
      if (product) setFormData(product);
      else setFormData({ name: '', description: '', category_id: categories[0]?.id, price: 0, image_url: '', stock: 0 });
    }
  }, [product, isOpen, isNew, categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert('يرجى ملء الحقول المطلوبة');
      return;
    }
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{isNew ? 'إضافة منتج جديد' : 'تعديل المنتج'}</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">اسم المنتج *</Label>
            <Input id="name" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          </div>
          <div>
            <Label htmlFor="description">الوصف</Label>
            <Input id="description" value={formData.description || ''} onChange={(e) => setFormData({...formData, description: e.target.value})} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">الفئة</Label>
              <Select value={formData.category_id || ''} onValueChange={(value) => setFormData({...formData, category_id: value})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {categories.map(category => (<SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="price">السعر (ل.س)</Label>
              <Input id="price" type="number" step="1" value={formData.price || 0} onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})} required />
            </div>
          </div>
          <div>
            <Label htmlFor="image">رابط الصورة</Label>
            <Input id="image" type="url" value={formData.image_url || ''} onChange={(e) => setFormData({...formData, image_url: e.target.value})} placeholder="https://example.com/image.jpg" />
            {formData.image_url && <div className="mt-2 relative aspect-video w-32 rounded-lg overflow-hidden"><Image src={formData.image_url} alt="معاينة" fill className="object-cover" sizes="128px" /></div>}
          </div>
          <div>
            <Label htmlFor="stock">الكمية المتاحة</Label>
            <Input id="stock" type="number" value={formData.stock || 0} onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value, 10)})} />
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1"><Save className="h-4 w-4 mr-2" />{isNew ? 'إضافة المنتج' : 'حفظ التغييرات'}</Button>
            <Button type="button" variant="outline" onClick={onClose}><X className="h-4 w-4 mr-2" />إلغاء</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface CategoryDialogProps {
  category: Category | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: Partial<Category>) => void;
  isNew: boolean;
}

function CategoryDialog({ category, isOpen, onClose, onSave, isNew }: CategoryDialogProps) {
  const [formData, setFormData] = useState<Partial<Category>>({});

  useEffect(() => {
    if (isOpen) {
      if (category) setFormData(category);
      else setFormData({ name: '', description: '' });
    }
  }, [category, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      alert('يرجى إدخال اسم الفئة');
      return;
    }
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader><DialogTitle>{isNew ? 'إضافة فئة جديدة' : 'تعديل الفئة'}</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="cat-name">اسم الفئة *</Label>
            <Input id="cat-name" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          </div>
          <div>
            <Label htmlFor="cat-desc">الوصف</Label>
            <Input id="cat-desc" value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1"><Save className="h-4 w-4 mr-2" />{isNew ? 'إضافة الفئة' : 'حفظ التغييرات'}</Button>
            <Button type="button" variant="outline" onClick={onClose}><X className="h-4 w-4 mr-2" />إلغاء</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}