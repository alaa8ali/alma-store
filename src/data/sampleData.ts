import { Product, Service } from '../types';
import { storage } from '../utils/storage';

// Sample products data
const sampleProducts: Omit<Product, 'id'>[] = [
  // Grocery items
  {
    name: 'Pepsi Cola 250ml',
    nameAr: 'بيبسي كولا 250 مل',
    description: 'Refreshing cola drink',
    descriptionAr: 'مشروب كولا منعش',
    price: 2500,
    category: '1', // Grocery
    categoryAr: 'بقالة',
    image: '/images/products/pepsi.JPG',
    stock: 50,
    featured: true,
    unit: 'bottle',
    unitAr: 'زجاجة'
  },
  {
    name: 'Arabic Bread',
    nameAr: 'خبز عربي',
    description: 'Fresh traditional Arabic pita bread',
    descriptionAr: 'خبز عربي تقليدي طازج',
    price: 1500,
    category: '1',
    categoryAr: 'بقالة',
    image: '/images/products/bread.jpg',
    stock: 30,
    unit: 'pack',
    unitAr: 'عبوة'
  },
  {
    name: 'Extra Virgin Olive Oil',
    nameAr: 'زيت زيتون بكر ممتاز',
    description: 'Premium quality extra virgin olive oil',
    descriptionAr: 'زيت زيتون بكر ممتاز عالي الجودة',
    price: 15000,
    category: '1',
    categoryAr: 'بقالة',
    image: '/images/products/olive-oil.png',
    stock: 25,
    featured: true,
    unit: 'bottle',
    unitAr: 'زجاجة'
  },
  {
    name: 'Premium Rice 5kg',
    nameAr: 'أرز فاخر 5 كيلو',
    description: 'High quality long grain rice',
    descriptionAr: 'أرز حبة طويلة عالي الجودة',
    price: 12000,
    category: '1',
    categoryAr: 'بقالة',
    image: '/images/products/rice.jpg',
    stock: 20,
    unit: 'kg',
    unitAr: 'كيلو'
  },
  
  // Clothing items
  {
    name: 'Men\'s Casual Shirt',
    nameAr: 'قميص رجالي كاجوال',
    description: 'Comfortable cotton casual shirt',
    descriptionAr: 'قميص قطني مريح للارتداء اليومي',
    price: 25000,
    category: '2', // Clothing
    categoryAr: 'ملابس',
    image: '/images/products/shirt.jpg',
    stock: 15,
    unit: 'piece',
    unitAr: 'قطعة'
  },
  {
    name: 'Women\'s Elegant Dress',
    nameAr: 'فستان نسائي أنيق',
    description: 'Beautiful elegant dress for special occasions',
    descriptionAr: 'فستان أنيق وجميل للمناسبات الخاصة',
    price: 45000,
    category: '2',
    categoryAr: 'ملابس',
    image: '/images/products/dress.jpg',
    stock: 8,
    featured: true,
    discount: 20,
    unit: 'piece',
    unitAr: 'قطعة'
  },
  
  // Electronics
  {
    name: 'Samsung Galaxy Smartphone',
    nameAr: 'هاتف ذكي سامسونغ غالاكسي',
    description: 'Latest Samsung Galaxy smartphone with advanced features',
    descriptionAr: 'هاتف ذكي من سامسونغ غالاكسي بمميزات متطورة',
    price: 350000,
    category: '3', // Electronics
    categoryAr: 'إلكترونيات',
    image: '/images/products/smartphone.jpg',
    stock: 5,
    featured: true,
    unit: 'piece',
    unitAr: 'قطعة'
  },
  
  // Cleaning products
  {
    name: 'Washing Powder 3kg',
    nameAr: 'مسحوق غسيل 3 كيلو',
    description: 'Powerful cleaning washing powder',
    descriptionAr: 'مسحوق غسيل قوي التنظيف',
    price: 8000,
    category: '4', // Cleaning
    categoryAr: 'منظفات',
    image: '/images/products/detergent.jpeg',
    stock: 40,
    unit: 'kg',
    unitAr: 'كيلو'
  }
];

// Sample services data
const sampleServices: Omit<Service, 'id'>[] = [
  {
    name: 'Electrical Repair Service',
    nameAr: 'خدمة إصلاح كهربائي',
    description: 'Professional electrical repair and installation service',
    descriptionAr: 'خدمة إصلاح وتركيب كهربائي احترافية',
    price: 5000,
    category: '5', // Home Services
    categoryAr: 'خدمات منزلية',
    image: '/images/services/electrician.jpg',
    available: true,
    contactInfo: '+963983012001',
    serviceAreas: ['اللاذقية', 'طرطوس', 'بانياس'],
    duration: '1-2 hours',
    durationAr: '1-2 ساعة'
  },
  {
    name: 'Plumbing Service',
    nameAr: 'خدمة سباكة',
    description: 'Expert plumbing repair and maintenance',
    descriptionAr: 'خدمة إصلاح وصيانة سباكة متخصصة',
    price: 7000,
    category: '5',
    categoryAr: 'خدمات منزلية',
    image: '/images/services/plumber.jpg',
    available: true,
    contactInfo: '+963983012001',
    serviceAreas: ['اللاذقية', 'طرطوس', 'بانياس', 'جبلة'],
    duration: '1-3 hours',
    durationAr: '1-3 ساعة'
  },
  {
    name: 'House Cleaning Service',
    nameAr: 'خدمة تنظيف منزلي',
    description: 'Complete house cleaning service',
    descriptionAr: 'خدمة تنظيف منزلي شاملة',
    price: 15000,
    category: '5',
    categoryAr: 'خدمات منزلية',
    image: '/images/category-cleaning.png',
    available: true,
    contactInfo: '+963983012001',
    serviceAreas: ['اللاذقية', 'طرطوس'],
    duration: '3-5 hours',
    durationAr: '3-5 ساعة'
  },
  {
    name: 'Furniture Moving Service',
    nameAr: 'خدمة نقل عفش',
    description: 'Professional furniture moving and transportation',
    descriptionAr: 'خدمة نقل وترحيل عفش احترافية',
    price: 25000,
    category: '5',
    categoryAr: 'خدمات منزلية',
    image: '/images/delivery.jpeg',
    available: true,
    contactInfo: '+963983012001',
    serviceAreas: ['الساحل السوري'],
    duration: '2-6 hours',
    durationAr: '2-6 ساعة'
  }
];

export function initializeSampleData(): void {
  const currentProducts = storage.getProducts();
  const currentServices = storage.getServices();
  
  // Add sample products if none exist
  if (currentProducts.length === 0) {
    sampleProducts.forEach(product => {
      storage.addProduct(product);
    });
  }
  
  // Add sample services if none exist
  if (currentServices.length === 0) {
    sampleServices.forEach(service => {
      storage.addService(service);
    });
  }
}