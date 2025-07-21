import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppState, Product, Service, CartItem, Category, Settings, User } from '../types';
import { storage } from '../utils/storage';
import { initializeSampleData } from '../data/sampleData';

interface AppContextType {
  // State
  products: Product[];
  services: Service[];
  categories: Category[];
  cart: CartItem[];
  settings: Settings;
  currentUser: User | null;
  
  // UI State
  isCartOpen: boolean;
  isAdminMode: boolean;
  
  // Actions
  setIsCartOpen: (open: boolean) => void;
  setIsAdminMode: (mode: boolean) => void;
  
  // Product actions
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => boolean;
  deleteProduct: (id: string) => boolean;
  
  // Service actions
  addService: (service: Omit<Service, 'id'>) => Service;
  updateService: (id: string, updates: Partial<Service>) => boolean;
  deleteService: (id: string) => boolean;
  
  // Cart actions
  addToCart: (productId: string, quantity?: number) => boolean;
  updateCartItem: (productId: string, quantity: number) => boolean;
  removeFromCart: (productId: string) => boolean;
  clearCart: () => void;
  getCartTotal: () => number;
  
  // Order actions
  createOrder: (customerInfo: any) => any;
  
  // Data management
  exportData: () => string;
  importData: (jsonData: string) => boolean;
  resetData: () => void;
  
  // Settings
  updateSettings: (updates: Partial<Settings>) => void;
  
  // Refresh data
  refreshData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [settings, setSettings] = useState<Settings>(storage.getSettings());
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // UI State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Initialize data on mount
  useEffect(() => {
    initializeSampleData();
    refreshData();
  }, []);

  const refreshData = () => {
    const state = storage.getState();
    setProducts(state.products);
    setServices(state.services);
    setCategories(state.categories);
    setCart(state.cart);
    setSettings(state.settings);
    setCurrentUser(state.currentUser);
  };

  // Product actions
  const addProduct = (product: Omit<Product, 'id'>): Product => {
    const newProduct = storage.addProduct(product);
    refreshData();
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>): boolean => {
    const success = storage.updateProduct(id, updates);
    if (success) refreshData();
    return success;
  };

  const deleteProduct = (id: string): boolean => {
    const success = storage.deleteProduct(id);
    if (success) refreshData();
    return success;
  };

  // Service actions
  const addService = (service: Omit<Service, 'id'>): Service => {
    const newService = storage.addService(service);
    refreshData();
    return newService;
  };

  const updateService = (id: string, updates: Partial<Service>): boolean => {
    const success = storage.updateService(id, updates);
    if (success) refreshData();
    return success;
  };

  const deleteService = (id: string): boolean => {
    const success = storage.deleteService(id);
    if (success) refreshData();
    return success;
  };

  // Cart actions
  const addToCart = (productId: string, quantity: number = 1): boolean => {
    const success = storage.addToCart(productId, quantity);
    if (success) refreshData();
    return success;
  };

  const updateCartItem = (productId: string, quantity: number): boolean => {
    const success = storage.updateCartItem(productId, quantity);
    if (success) refreshData();
    return success;
  };

  const removeFromCart = (productId: string): boolean => {
    const success = storage.removeFromCart(productId);
    if (success) refreshData();
    return success;
  };

  const clearCart = (): void => {
    storage.clearCart();
    refreshData();
  };

  const getCartTotal = (): number => {
    return storage.getCartTotal();
  };

  // Order actions
  const createOrder = (customerInfo: any) => {
    const order = storage.createOrder(customerInfo);
    refreshData();
    return order;
  };

  // Data management
  const exportData = (): string => {
    return storage.exportData();
  };

  const importData = (jsonData: string): boolean => {
    const success = storage.importData(jsonData);
    if (success) refreshData();
    return success;
  };

  const resetData = (): void => {
    storage.resetData();
    refreshData();
  };

  // Settings
  const updateSettings = (updates: Partial<Settings>): void => {
    storage.updateSettings(updates);
    refreshData();
  };

  const value: AppContextType = {
    // State
    products,
    services,
    categories,
    cart,
    settings,
    currentUser,
    
    // UI State
    isCartOpen,
    isAdminMode,
    
    // Actions
    setIsCartOpen,
    setIsAdminMode,
    
    // Product actions
    addProduct,
    updateProduct,
    deleteProduct,
    
    // Service actions
    addService,
    updateService,
    deleteService,
    
    // Cart actions
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartTotal,
    
    // Order actions
    createOrder,
    
    // Data management
    exportData,
    importData,
    resetData,
    
    // Settings
    updateSettings,
    
    // Refresh
    refreshData
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}