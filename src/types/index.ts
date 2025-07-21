export interface Product {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  category: string;
  categoryAr: string;
  image: string;
  stock: number;
  featured?: boolean;
  discount?: number;
  unit: string;
  unitAr: string;
}

export interface Service {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  category: string;
  categoryAr: string;
  image: string;
  available: boolean;
  contactInfo: string;
  serviceAreas: string[];
  duration?: string;
  durationAr?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerInfo: {
    name: string;
    phone: string;
    address: string;
    notes?: string;
  };
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  image: string;
  color: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'employee';
  createdAt: Date;
}

export interface Settings {
  storeName: string;
  storeNameAr: string;
  whatsappNumber: string;
  workingHours: string;
  workingHoursAr: string;
  location: string;
  locationAr: string;
  currency: string;
  taxRate: number;
  deliveryFee: number;
}

export interface AppState {
  products: Product[];
  services: Service[];
  categories: Category[];
  cart: CartItem[];
  orders: Order[];
  users: User[];
  settings: Settings;
  currentUser: User | null;
}