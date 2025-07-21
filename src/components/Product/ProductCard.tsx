import React from 'react';
import { ShoppingCart, Star, Tag } from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../contexts/AppContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, settings } = useApp();
  
  const originalPrice = product.price;
  const discountedPrice = product.discount 
    ? originalPrice * (1 - product.discount / 100) 
    : originalPrice;
  
  const handleAddToCart = () => {
    if (product.stock <= 0) {
      alert('المنتج غير متوفر حالياً');
      return;
    }
    
    if (addToCart(product.id)) {
      // Success feedback can be added here
    } else {
      alert('لا يمكن إضافة المزيد من هذا المنتج');
    }
  };

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-sky-100 overflow-hidden">
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sky-50 to-blue-50">
        <img
          src={product.image}
          alt={product.nameAr}
          className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/300x200/e0f2fe/0369a1?text=صورة+المنتج';
          }}
        />
        
        {/* Discount Badge */}
        {product.discount && product.discount > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1 rtl:space-x-reverse animate-pulse">
            <Tag className="h-3 w-3" />
            <span>خصم {product.discount}%</span>
          </div>
        )}
        
        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1 rtl:space-x-reverse">
            <Star className="h-3 w-3 fill-current" />
            <span>مميز</span>
          </div>
        )}
        
        {/* Stock Status */}
        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm">
              غير متوفر
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="font-bold text-gray-800 text-lg leading-tight line-clamp-2 text-right">
            {product.nameAr}
          </h3>
          <p className="text-gray-500 text-sm text-right line-clamp-2">
            {product.descriptionAr}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="text-right">
            <div className="flex items-center space-x-2 rtl:space-x-reverse justify-end">
              {product.discount ? (
                <>
                  <span className="text-xl font-bold text-sky-600">
                    {discountedPrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    {originalPrice.toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-xl font-bold text-sky-600">
                  {originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-sm text-gray-500">{settings.currency}</span>
            </div>
            <div className="text-xs text-gray-400 text-right mt-1">
              {product.unitAr}
            </div>
          </div>
          
          {/* Stock Info */}
          <div className="text-left">
            <div className="text-xs text-gray-500">
              متوفر: {product.stock}
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className={`w-full flex items-center justify-center space-x-2 rtl:space-x-reverse py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 ${
            product.stock <= 0
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95'
          }`}
        >
          <ShoppingCart className="h-4 w-4" />
          <span>{product.stock <= 0 ? 'غير متوفر' : 'أضف للسلة'}</span>
        </button>
      </div>
    </div>
  );
}