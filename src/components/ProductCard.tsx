import React from 'react';
import { Plus, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl border border-gray-100">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.nameAr}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-800 mb-2 text-right leading-tight">
          {product.nameAr}
        </h3>
        <p className="text-gray-600 text-sm mb-3 text-right">{product.name}</p>
        
        <div className="flex items-center justify-between">
          <button
            onClick={() => onAddToCart(product)}
            className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white p-3 rounded-xl hover:from-sky-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
          >
            <Plus size={18} />
            <ShoppingCart size={18} />
          </button>
          
          <div className="text-right">
            <p className="text-2xl font-bold text-sky-600">{product.price}</p>
            <p className="text-sm text-gray-500">ليرة سورية</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;