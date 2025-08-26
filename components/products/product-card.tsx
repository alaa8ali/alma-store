'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus, Minus, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/components/providers/providers';
import { Product, ProductVariant } from '@/lib/products';
import { CartManager } from '@/lib/cart';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { language, t } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

  const productName = language === 'ar' ? product.nameAr : product.nameEn;
  const unitText = t(`product.${product.unit}`);
  const hasVariants = product.variants && product.variants.length > 0;
  
  const currentProduct = selectedVariant || product;
  const currentPrice = selectedVariant?.price || product.price;

  const handleAddToCart = async () => {
    setIsAdding(true);
    const productId = product.id; // استخدام معرف المنتج الأساسي فقط
    console.log('Adding product to cart:', productId, 'quantity:', quantity);
    CartManager.addToCart(productId, quantity);
    onAddToCart();
    
    // Visual feedback
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
      setSelectedVariant(null); // إعادة تعيين المتغير المختار
    }, 500);
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={productName}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          
          {/* Overlay with price */}
          <div className="absolute top-2 right-2 rtl:right-auto rtl:left-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
            <span className="text-sm font-bold text-primary">
              {currentPrice} {t('product.price')}
            </span>
          </div>
          
          {hasVariants && (
            <div className="absolute top-2 left-2 rtl:left-auto rtl:right-2">
              <Badge variant="secondary" className="text-xs">
                +{product.variants!.length} نوع
              </Badge>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-1">
              {productName}
            </h3>
            <p className="text-sm text-gray-500">
              {unitText}
            </p>
            {selectedVariant && (
              <p className="text-xs text-blue-600 font-medium">
                {language === 'ar' ? selectedVariant.nameAr : selectedVariant.nameEn}
              </p>
            )}
          </div>

          {/* Actions Row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="h-8 w-8 p-0"
              >
                <Minus className="h-3 w-3" />
              </Button>
              
              <span className="font-semibold min-w-[2rem] text-center">
                {quantity}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
                className="h-8 w-8 p-0"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            <div className="flex gap-1">
              {hasVariants && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDetails(true)}
                  className="h-8 px-2"
                >
                  <Eye className="h-3 w-3" />
                </Button>
              )}
              
              <Button
                onClick={handleAddToCart}
                disabled={!product.available || isAdding}
                size="sm"
                className={`transition-all ${
                  isAdding 
                    ? 'alma-gradient scale-110 shadow-lg' 
                    : 'hover:alma-gradient hover:scale-105'
                }`}
              >
                {isAdding ? '✓' : t('product.add')}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      
      {/* Product Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {productName}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Main Product Image */}
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={currentProduct.image}
                alt={productName}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            {/* Product Info */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{productName}</h3>
              <p className="text-gray-600">{unitText}</p>
              <p className="text-2xl font-bold text-primary">
                {currentPrice} {t('product.price')}
              </p>
            </div>
            
            {/* Variants */}
            {hasVariants && (
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">{t('product.variants')}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Main Product Option */}
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      !selectedVariant ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedVariant(null)}
                  >
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={product.image}
                          alt={productName}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium">{productName}</h5>
                        <p className="text-sm text-gray-600">{product.price} {t('product.price')}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Variant Options */}
                  {product.variants!.map((variant) => (
                    <div 
                      key={variant.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedVariant?.id === variant.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedVariant(variant)}
                    >
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                          <Image
                            src={variant.image}
                            alt={language === 'ar' ? variant.nameAr : variant.nameEn}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium">
                            {language === 'ar' ? variant.nameAr : variant.nameEn}
                          </h5>
                          <p className="text-sm text-gray-600">{variant.price} {t('product.price')}</p>
                          {!variant.available && (
                            <Badge variant="destructive" className="text-xs mt-1">
                              غير متوفر
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Add to Cart Section */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="h-8 w-8 p-0"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                
                <span className="font-semibold min-w-[2rem] text-center">
                  {quantity}
                </span>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              
              <Button
                onClick={() => {
                  handleAddToCart();
                  setShowDetails(false);
                }}
                disabled={!currentProduct.available || isAdding}
                className="alma-gradient hover:scale-105 transition-transform"
              >
                {isAdding ? '✓ تمت الإضافة' : `${t('product.add')} - ${(currentPrice * quantity)} ${t('product.price')}`}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}