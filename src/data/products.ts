import { Product, Category } from '../types';

export const categories: Category[] = [
  { id: 'all', name: 'All Products', nameAr: 'جميع المنتجات', icon: '📦' },
  { id: 'drinks', name: 'Drinks', nameAr: 'مشروبات', icon: '🥤' },
  { id: 'sweets', name: 'Sweets', nameAr: 'حلويات متنوعة', icon: '🍬' },
  { id: 'biscuits', name: 'Biscuits', nameAr: 'بسكويت', icon: '🍪' },
  { id: 'groceries', name: 'Basic Groceries', nameAr: 'بقالة أساسية', icon: '🛒' },
  { id: 'care', name: 'Personal Care', nameAr: 'منظفات وعناية شخصية', icon: '🧴' },
  { id: 'others', name: 'Others', nameAr: 'أخرى / متفرقات', icon: '📦' }
];

export const products: Product[] = [
  // Drinks
  {
    id: '1',
    name: 'Pepsi 250ml',
    nameAr: 'بيبسي 250 مل',
    price: 150,
    image: 'https://images.pexels.com/photos/2775860/pexels-photo-2775860.jpeg',
    category: 'drinks',
    categoryAr: 'مشروبات'
  },
  {
    id: '2',
    name: 'Mirinda Orange 330ml',
    nameAr: 'ميرندا برتقال 330 مل',
    price: 200,
    image: 'https://images.pexels.com/photos/1292294/pexels-photo-1292294.jpeg',
    category: 'drinks',
    categoryAr: 'مشروبات'
  },
  
  // Sweets
  {
    id: '3',
    name: 'Kinder Chocolate',
    nameAr: 'شوكولا كيندر',
    price: 300,
    image: 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg',
    category: 'sweets',
    categoryAr: 'حلويات متنوعة'
  },
  {
    id: '4',
    name: 'Kit Kat Chunky',
    nameAr: 'كيت كات شانكي',
    price: 250,
    image: 'https://images.pexels.com/photos/4113700/pexels-photo-4113700.jpeg',
    category: 'sweets',
    categoryAr: 'حلويات متنوعة'
  },
  
  // Biscuits
  {
    id: '5',
    name: 'Ulker Biscuits',
    nameAr: 'بسكويت أولكر',
    price: 180,
    image: 'https://images.pexels.com/photos/2067536/pexels-photo-2067536.jpeg',
    category: 'biscuits',
    categoryAr: 'بسكويت'
  },
  {
    id: '6',
    name: 'Dima Roll Biscuits',
    nameAr: 'بسكويت ديمه رول',
    price: 220,
    image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg',
    category: 'biscuits',
    categoryAr: 'بسكويت'
  },
  
  // Groceries
  {
    id: '7',
    name: 'Zara Pasta 500g',
    nameAr: 'معكرونة زارا 500غ',
    price: 350,
    image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg',
    category: 'groceries',
    categoryAr: 'بقالة أساسية'
  },
  {
    id: '8',
    name: 'Afia Oil 1.5L',
    nameAr: 'زيت عافية 1.5 لتر',
    price: 800,
    image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg',
    category: 'groceries',
    categoryAr: 'بقالة أساسية'
  },
  
  // Personal Care
  {
    id: '9',
    name: 'Head & Shoulders Shampoo',
    nameAr: 'شامبو هيد أند شولدرز',
    price: 450,
    image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg',
    category: 'care',
    categoryAr: 'منظفات وعناية شخصية'
  },
  {
    id: '10',
    name: 'Dettol Soap',
    nameAr: 'صابون ديتول',
    price: 120,
    image: 'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg',
    category: 'care',
    categoryAr: 'منظفات وعناية شخصية'
  },
  
  // Others
  {
    id: '11',
    name: 'Nescafe 3 in 1',
    nameAr: 'نسكافيه 3 في 1',
    price: 280,
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
    category: 'others',
    categoryAr: 'أخرى / متفرقات'
  },
  {
    id: '12',
    name: 'Nestle Cerelac',
    nameAr: 'سيريلاك نستله',
    price: 650,
    image: 'https://images.pexels.com/photos/236834/pexels-photo-236834.jpeg',
    category: 'others',
    categoryAr: 'أخرى / متفرقات'
  }
];