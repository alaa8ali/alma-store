export interface ProductVariant {
  id: string;
  nameAr: string;
  nameEn: string;
  price: number;
  image: string;
  available: boolean;
}

export interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  category: string;
  price: number;
  unit: 'piece' | 'carton';
  image: string;
  available: boolean;
  variants?: ProductVariant[];
}

export interface Category {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: string;
}

export const categories: Category[] = [
  { id: 'drinks', nameAr: 'مشروبات', nameEn: 'Drinks', icon: '🥤' },
  { id: 'sweets', nameAr: 'حلويات', nameEn: 'Sweets', icon: '🍬' },
  { id: 'biscuits', nameAr: 'بسكويت', nameEn: 'Biscuits', icon: '🍪' },
  { id: 'cleaning', nameAr: 'منظفات', nameEn: 'Cleaning', icon: '🧽' },
  { id: 'food', nameAr: 'مواد غذائية', nameEn: 'Food', icon: '🥫' },
];

// Products array is now empty - all products will be managed through Supabase
// Use the admin dashboard to add new products
export const products: Product[] = [];

