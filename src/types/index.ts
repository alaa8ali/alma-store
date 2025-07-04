export interface Product {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  image: string;
  category: string;
  categoryAr: string;
  inStock?: boolean;
  description?: string;
  descriptionAr?: string;
  stockQuantity?: number;
  salesCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  order?: number;
  isActive?: boolean;
  createdAt?: Date;
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
}

export interface ImageUploadResult {
  url: string;
  filename: string;
  size: number;
}