import { Product, Category, Section } from '../types';

export const sections: Section[] = [
  { 
    id: 'food', 
    name: 'Food & Groceries', 
    nameAr: 'مواد غذائية وبقالة', 
    icon: '🛒', 
    color: 'from-green-500 to-emerald-500',
    order: 1,
    isActive: true
  },
  { 
    id: 'clothing', 
    name: 'Clothing & Fashion', 
    nameAr: 'ملابس وأزياء', 
    icon: '👕', 
    color: 'from-purple-500 to-pink-500',
    order: 2,
    isActive: true
  },
  { 
    id: 'electronics', 
    name: 'Electronics & Tech', 
    nameAr: 'إلكترونيات وتقنية', 
    icon: '📱', 
    color: 'from-blue-500 to-cyan-500',
    order: 3,
    isActive: true
  }
];

export const categories: Category[] = [
  { id: 'all', name: 'All Products', nameAr: 'جميع المنتجات', icon: '📦', section: 'all' },
  
  // Food Categories
  { id: 'drinks', name: 'Drinks', nameAr: 'مشروبات', icon: '🥤', section: 'food', order: 1 },
  { id: 'sweets', name: 'Sweets', nameAr: 'حلويات متنوعة', icon: '🍬', section: 'food', order: 2 },
  { id: 'biscuits', name: 'Biscuits', nameAr: 'بسكويت', icon: '🍪', section: 'food', order: 3 },
  { id: 'groceries', name: 'Basic Groceries', nameAr: 'بقالة أساسية', icon: '🛒', section: 'food', order: 4 },
  { id: 'care', name: 'Personal Care', nameAr: 'منظفات وعناية شخصية', icon: '🧴', section: 'food', order: 5 },
  { id: 'dairy', name: 'Dairy Products', nameAr: 'منتجات الألبان', icon: '🥛', section: 'food', order: 6 },
  { id: 'meat', name: 'Meat & Poultry', nameAr: 'لحوم ودواجن', icon: '🥩', section: 'food', order: 7 },
  { id: 'fruits', name: 'Fruits & Vegetables', nameAr: 'فواكه وخضار', icon: '🍎', section: 'food', order: 8 },
  
  // Clothing Categories
  { id: 'men-clothing', name: 'Men\'s Clothing', nameAr: 'ملابس رجالية', icon: '👔', section: 'clothing', order: 1 },
  { id: 'women-clothing', name: 'Women\'s Clothing', nameAr: 'ملابس نسائية', icon: '👗', section: 'clothing', order: 2 },
  { id: 'kids-clothing', name: 'Kids Clothing', nameAr: 'ملابس أطفال', icon: '👶', section: 'clothing', order: 3 },
  { id: 'sports-clothing', name: 'Sports Wear', nameAr: 'ملابس رياضية', icon: '🏃', section: 'clothing', order: 4 },
  { id: 'shoes', name: 'Shoes', nameAr: 'أحذية', icon: '👟', section: 'clothing', order: 5 },
  { id: 'accessories', name: 'Accessories', nameAr: 'إكسسوارات', icon: '👜', section: 'clothing', order: 6 },
  
  // Electronics Categories
  { id: 'phones', name: 'Mobile Phones', nameAr: 'هواتف ذكية', icon: '📱', section: 'electronics', order: 1 },
  { id: 'chargers', name: 'Chargers & Cables', nameAr: 'شواحن وكابلات', icon: '🔌', section: 'electronics', order: 2 },
  { id: 'headphones', name: 'Headphones & Audio', nameAr: 'سماعات وصوتيات', icon: '🎧', section: 'electronics', order: 3 },
  { id: 'computers', name: 'Computers & Laptops', nameAr: 'حاسوب ولابتوب', icon: '💻', section: 'electronics', order: 4 },
  { id: 'gaming', name: 'Gaming', nameAr: 'ألعاب إلكترونية', icon: '🎮', section: 'electronics', order: 5 },
  { id: 'smart-home', name: 'Smart Home', nameAr: 'منزل ذكي', icon: '🏠', section: 'electronics', order: 6 }
];

export const products: Product[] = [
  // Food Products
  {
    id: '1',
    name: 'Pepsi 250ml',
    nameAr: 'بيبسي 250 مل',
    price: 150,
    image: 'https://images.pexels.com/photos/2775860/pexels-photo-2775860.jpeg',
    category: 'drinks',
    categoryAr: 'مشروبات',
    section: 'food',
    sectionAr: 'مواد غذائية وبقالة',
    stockQuantity: 50,
    inStock: true
  },
  {
    id: '2',
    name: 'Mirinda Orange 330ml',
    nameAr: 'ميرندا برتقال 330 مل',
    price: 200,
    image: 'https://images.pexels.com/photos/1292294/pexels-photo-1292294.jpeg',
    category: 'drinks',
    categoryAr: 'مشروبات',
    section: 'food',
    sectionAr: 'مواد غذائية وبقالة',
    stockQuantity: 30,
    inStock: true
  },
  {
    id: '3',
    name: 'Kinder Chocolate',
    nameAr: 'شوكولا كيندر',
    price: 300,
    image: 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg',
    category: 'sweets',
    categoryAr: 'حلويات متنوعة',
    section: 'food',
    sectionAr: 'مواد غذائية وبقالة',
    stockQuantity: 25,
    inStock: true
  },
  {
    id: '4',
    name: 'Fresh Milk 1L',
    nameAr: 'حليب طازج 1 لتر',
    price: 400,
    image: 'https://images.pexels.com/photos/236834/pexels-photo-236834.jpeg',
    category: 'dairy',
    categoryAr: 'منتجات الألبان',
    section: 'food',
    sectionAr: 'مواد غذائية وبقالة',
    stockQuantity: 20,
    inStock: true
  },
  {
    id: '5',
    name: 'Fresh Apples 1kg',
    nameAr: 'تفاح طازج 1 كيلو',
    price: 500,
    image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg',
    category: 'fruits',
    categoryAr: 'فواكه وخضار',
    section: 'food',
    sectionAr: 'مواد غذائية وبقالة',
    stockQuantity: 15,
    inStock: true
  },

  // Clothing Products
  {
    id: '6',
    name: 'Men\'s Cotton T-Shirt',
    nameAr: 'تيشيرت رجالي قطني',
    price: 2500,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
    category: 'men-clothing',
    categoryAr: 'ملابس رجالية',
    section: 'clothing',
    sectionAr: 'ملابس وأزياء',
    stockQuantity: 12,
    inStock: true,
    size: 'M, L, XL',
    color: 'أزرق، أسود، أبيض',
    colorAr: 'أزرق، أسود، أبيض'
  },
  {
    id: '7',
    name: 'Women\'s Summer Dress',
    nameAr: 'فستان نسائي صيفي',
    price: 4500,
    image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg',
    category: 'women-clothing',
    categoryAr: 'ملابس نسائية',
    section: 'clothing',
    sectionAr: 'ملابس وأزياء',
    stockQuantity: 8,
    inStock: true,
    size: 'S, M, L',
    color: 'وردي، أزرق، أبيض',
    colorAr: 'وردي، أزرق، أبيض'
  },
  {
    id: '8',
    name: 'Kids Cartoon T-Shirt',
    nameAr: 'تيشيرت أطفال كرتوني',
    price: 1800,
    image: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg',
    category: 'kids-clothing',
    categoryAr: 'ملابس أطفال',
    section: 'clothing',
    sectionAr: 'ملابس وأزياء',
    stockQuantity: 20,
    inStock: true,
    size: '2-4, 4-6, 6-8 سنوات',
    color: 'أحمر، أزرق، أصفر',
    colorAr: 'أحمر، أزرق، أصفر'
  },
  {
    id: '9',
    name: 'Sports Running Shoes',
    nameAr: 'حذاء رياضي للجري',
    price: 8500,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
    category: 'shoes',
    categoryAr: 'أحذية',
    section: 'clothing',
    sectionAr: 'ملابس وأزياء',
    stockQuantity: 6,
    inStock: true,
    size: '40, 41, 42, 43, 44',
    color: 'أسود، أبيض، رمادي',
    colorAr: 'أسود، أبيض، رمادي'
  },

  // Electronics Products
  {
    id: '10',
    name: 'Samsung Galaxy A54',
    nameAr: 'سامسونج جالاكسي A54',
    price: 450000,
    image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg',
    category: 'phones',
    categoryAr: 'هواتف ذكية',
    section: 'electronics',
    sectionAr: 'إلكترونيات وتقنية',
    stockQuantity: 3,
    inStock: true,
    brand: 'Samsung',
    brandAr: 'سامسونج',
    warranty: '1 year',
    warrantyAr: 'سنة واحدة'
  },
  {
    id: '11',
    name: 'iPhone 15 Pro',
    nameAr: 'آيفون 15 برو',
    price: 1200000,
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
    category: 'phones',
    categoryAr: 'هواتف ذكية',
    section: 'electronics',
    sectionAr: 'إلكترونيات وتقنية',
    stockQuantity: 2,
    inStock: true,
    brand: 'Apple',
    brandAr: 'آبل',
    warranty: '1 year',
    warrantyAr: 'سنة واحدة'
  },
  {
    id: '12',
    name: 'USB-C Fast Charger',
    nameAr: 'شاحن سريع USB-C',
    price: 3500,
    image: 'https://images.pexels.com/photos/4526414/pexels-photo-4526414.jpeg',
    category: 'chargers',
    categoryAr: 'شواحن وكابلات',
    section: 'electronics',
    sectionAr: 'إلكترونيات وتقنية',
    stockQuantity: 25,
    inStock: true,
    warranty: '6 months',
    warrantyAr: '6 أشهر'
  },
  {
    id: '13',
    name: 'Wireless Bluetooth Headphones',
    nameAr: 'سماعات بلوتوث لاسلكية',
    price: 12000,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
    category: 'headphones',
    categoryAr: 'سماعات وصوتيات',
    section: 'electronics',
    sectionAr: 'إلكترونيات وتقنية',
    stockQuantity: 10,
    inStock: true,
    color: 'أسود، أبيض، أزرق',
    colorAr: 'أسود، أبيض، أزرق',
    warranty: '1 year',
    warrantyAr: 'سنة واحدة'
  },
  {
    id: '14',
    name: 'Gaming Laptop',
    nameAr: 'لابتوب ألعاب',
    price: 850000,
    image: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg',
    category: 'computers',
    categoryAr: 'حاسوب ولابتوب',
    section: 'electronics',
    sectionAr: 'إلكترونيات وتقنية',
    stockQuantity: 1,
    inStock: true,
    brand: 'ASUS',
    brandAr: 'أسوس',
    warranty: '2 years',
    warrantyAr: 'سنتان'
  }
]; 
