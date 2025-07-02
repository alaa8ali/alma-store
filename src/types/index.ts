export interface Product {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  image: string;
  category: string;
  categoryAr: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
}