export interface Product {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  image: string;
  category: string;
  categoryAr: string;
  section: string; // New: main section (food, clothing, electronics)
  sectionAr: string;
  inStock?: boolean;
  description?: string;
  descriptionAr?: string;
  stockQuantity?: number;
  salesCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
  brand?: string;
  brandAr?: string;
  size?: string;
  color?: string;
  colorAr?: string;
  weight?: string;
  dimensions?: string;
  warranty?: string;
  warrantyAr?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  section: string; // Which main section this category belongs to
  order?: number;
  isActive?: boolean;
  createdAt?: Date;
}

export interface Section {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  color: string;
  order: number;
  isActive: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerInfo?: {
    name?: string;
    phone?: string;
    location?: {
      latitude: number;
      longitude: number;
      address?: string;
    };
  };
  status: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt?: Date;
  notes?: string;
  deliveryTime?: Date;
  paymentMethod?: 'cash' | 'card' | 'online';
}

export interface AdminUser {
  id: string;
  username: string;
  role: 'admin' | 'employee';
  permissions: string[];
  createdAt: Date;
  lastLogin?: Date;
}

export interface DashboardStats {
  todayOrders: number;
  todayRevenue: number;
  totalOrders: number;
  totalRevenue: number;
  topProducts: Array<{
    product: Product;
    salesCount: number;
    revenue: number;
  }>;
  lowStockProducts: Product[];
  recentOrders: Order[];
  ordersByStatus: Record<Order['status'], number>;
  monthlyRevenue: Array<{
    month: string;
    revenue: number;
    orders: number;
  }>;
  sectionStats: Array<{
    section: Section;
    totalProducts: number;
    totalRevenue: number;
    topCategory: string;
  }>;
}

export interface ImageUploadResult {
  url: string;
  filename: string;
  size: number;
}