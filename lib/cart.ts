export interface CartItem {
  productId: string;
  quantity: number;
  variantId?: string;
}

export interface CartProduct extends CartItem {
  nameAr: string;
  nameEn: string;
  price: number;
  unit: string;
  image: string;
  variantName?: string;
}

export class CartManager {
  private static readonly STORAGE_KEY = 'alma-cart';

  static getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  static saveCart(cart: CartItem[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Handle storage error silently
    }
  }

  static addToCart(productId: string, quantity: number = 1): void {
    const cart = this.getCart();
    console.log('Adding to cart:', productId, 'quantity:', quantity);
    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
      console.log('Updated existing item:', existingItem);
    } else {
      const newItem = { productId, quantity };
      cart.push(newItem);
      console.log('Added new item:', newItem);
    }

    console.log('Final cart:', cart);
    this.saveCart(cart);
  }

  static updateQuantity(productId: string, quantity: number): void {
    const cart = this.getCart();
    const item = cart.find(item => item.productId === productId);

    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.saveCart(cart);
      }
    }
  }

  static removeFromCart(productId: string): void {
    const cart = this.getCart().filter(item => item.productId !== productId);
    this.saveCart(cart);
  }

  static clearCart(): void {
    this.saveCart([]);
  }

  static getCartCount(): number {
    return this.getCart().reduce((total, item) => total + item.quantity, 0);
  }
}