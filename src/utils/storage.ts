import { AppState, Product, Service, Category, CartItem, Order, User, Settings } from '../types';

const STORAGE_KEY = 'alma_store_data';

// Default settings
const defaultSettings: Settings = {
  storeName: 'Alma Store',
  storeNameAr: 'متجر ألما',
  whatsappNumber: '+963983012001',
  workingHours: 'Daily from 9 AM to 10 PM',
  workingHoursAr: 'يومياً من 9 صباحاً حتى 10 مساءً',
  location: 'Syrian Coast',
  locationAr: 'الساحل السوري',
  currency: 'ليرة سورية',
  taxRate: 0,
  deliveryFee: 0
};

// Default categories
const defaultCategories: Category[] = [
  {
    id: '1',
    name: 'Grocery',
    nameAr: 'بقالة',
    icon: '🛒',
    image: '/images/category-grocery.jpg',
    color: 'bg-green-500'
  },
  {
    id: '2',
    name: 'Clothing',
    nameAr: 'ملابس',
    icon: '👕',
    image: '/images/category-clothes.jpg',
    color: 'bg-purple-500'
  },
  {
    id: '3',
    name: 'Electronics',
    nameAr: 'إلكترونيات',
    icon: '📱',
    image: '/images/category-electronics.jpg',
    color: 'bg-blue-500'
  },
  {
    id: '4',
    name: 'Cleaning',
    nameAr: 'منظفات',
    icon: '🧼',
    image: '/images/category-cleaning.png',
    color: 'bg-cyan-500'
  },
  {
    id: '5',
    name: 'Home Services',
    nameAr: 'خدمات منزلية',
    icon: '🛠️',
    image: '/images/category-services.jpg',
    color: 'bg-orange-500'
  },
  {
    id: '6',
    name: 'Offers',
    nameAr: 'عروض',
    icon: '🔥',
    image: '/images/category-offers.jpg',
    color: 'bg-red-500'
  }
];

// Default admin user
const defaultUser: User = {
  id: '1',
  name: 'مدير المتجر',
  email: 'admin@alma-store.com',
  role: 'admin',
  createdAt: new Date()
};

// Initial state
const initialState: AppState = {
  products: [],
  services: [],
  categories: defaultCategories,
  cart: [],
  orders: [],
  users: [defaultUser],
  settings: defaultSettings,
  currentUser: defaultUser
};

export class StorageManager {
  private static instance: StorageManager;
  private state: AppState;

  private constructor() {
    this.state = this.loadFromStorage();
  }

  public static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }

  private loadFromStorage(): AppState {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure all required properties exist
        return {
          ...initialState,
          ...parsed,
          // Convert date strings back to Date objects
          orders: parsed.orders?.map((order: any) => ({
            ...order,
            createdAt: new Date(order.createdAt)
          })) || [],
          users: parsed.users?.map((user: any) => ({
            ...user,
            createdAt: new Date(user.createdAt)
          })) || [defaultUser]
        };
      }
    } catch (error) {
      console.error('Error loading data from storage:', error);
    }
    return initialState;
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (error) {
      console.error('Error saving data to storage:', error);
    }
  }

  // Export data as JSON
  public exportData(): string {
    return JSON.stringify(this.state, null, 2);
  }

  // Import data from JSON
  public importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      this.state = {
        ...initialState,
        ...data,
        // Convert date strings back to Date objects
        orders: data.orders?.map((order: any) => ({
          ...order,
          createdAt: new Date(order.createdAt)
        })) || [],
        users: data.users?.map((user: any) => ({
          ...user,
          createdAt: new Date(user.createdAt)
        })) || [defaultUser]
      };
      this.saveToStorage();
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  // Reset to initial state
  public resetData(): void {
    this.state = { ...initialState };
    this.saveToStorage();
  }

  // Getters
  public getState(): AppState {
    return { ...this.state };
  }

  public getProducts(): Product[] {
    return [...this.state.products];
  }

  public getServices(): Service[] {
    return [...this.state.services];
  }

  public getCategories(): Category[] {
    return [...this.state.categories];
  }

  public getCart(): CartItem[] {
    return [...this.state.cart];
  }

  public getOrders(): Order[] {
    return [...this.state.orders];
  }

  public getSettings(): Settings {
    return { ...this.state.settings };
  }

  // Products
  public addProduct(product: Omit<Product, 'id'>): Product {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString()
    };
    this.state.products.push(newProduct);
    this.saveToStorage();
    return newProduct;
  }

  public updateProduct(id: string, updates: Partial<Product>): boolean {
    const index = this.state.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.state.products[index] = { ...this.state.products[index], ...updates };
      this.saveToStorage();
      return true;
    }
    return false;
  }

  public deleteProduct(id: string): boolean {
    const index = this.state.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.state.products.splice(index, 1);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Services
  public addService(service: Omit<Service, 'id'>): Service {
    const newService: Service = {
      ...service,
      id: Date.now().toString()
    };
    this.state.services.push(newService);
    this.saveToStorage();
    return newService;
  }

  public updateService(id: string, updates: Partial<Service>): boolean {
    const index = this.state.services.findIndex(s => s.id === id);
    if (index !== -1) {
      this.state.services[index] = { ...this.state.services[index], ...updates };
      this.saveToStorage();
      return true;
    }
    return false;
  }

  public deleteService(id: string): boolean {
    const index = this.state.services.findIndex(s => s.id === id);
    if (index !== -1) {
      this.state.services.splice(index, 1);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Cart
  public addToCart(productId: string, quantity: number = 1): boolean {
    const product = this.state.products.find(p => p.id === productId);
    if (!product || product.stock < quantity) {
      return false;
    }

    const existingItem = this.state.cart.find(item => item.productId === productId);
    if (existingItem) {
      if (product.stock >= existingItem.quantity + quantity) {
        existingItem.quantity += quantity;
      } else {
        return false;
      }
    } else {
      this.state.cart.push({ productId, quantity, product });
    }

    this.saveToStorage();
    return true;
  }

  public updateCartItem(productId: string, quantity: number): boolean {
    const item = this.state.cart.find(item => item.productId === productId);
    if (!item) return false;

    if (quantity <= 0) {
      return this.removeFromCart(productId);
    }

    if (item.product.stock >= quantity) {
      item.quantity = quantity;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  public removeFromCart(productId: string): boolean {
    const index = this.state.cart.findIndex(item => item.productId === productId);
    if (index !== -1) {
      this.state.cart.splice(index, 1);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  public clearCart(): void {
    this.state.cart = [];
    this.saveToStorage();
  }

  public getCartTotal(): number {
    return this.state.cart.reduce((total, item) => {
      const price = item.product.discount 
        ? item.product.price * (1 - item.product.discount / 100)
        : item.product.price;
      return total + (price * item.quantity);
    }, 0);
  }

  // Orders
  public createOrder(customerInfo: Order['customerInfo']): Order {
    const order: Order = {
      id: Date.now().toString(),
      items: [...this.state.cart],
      total: this.getCartTotal(),
      customerInfo,
      status: 'pending',
      createdAt: new Date()
    };

    this.state.orders.push(order);
    this.clearCart();
    this.saveToStorage();
    return order;
  }

  public updateOrderStatus(orderId: string, status: Order['status']): boolean {
    const order = this.state.orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Settings
  public updateSettings(updates: Partial<Settings>): void {
    this.state.settings = { ...this.state.settings, ...updates };
    this.saveToStorage();
  }
}

export const storage = StorageManager.getInstance();