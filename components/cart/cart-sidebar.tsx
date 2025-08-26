'use client';

import { useState, useEffect } from 'react';
import { X, Plus, Minus, Trash2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/components/providers/providers';
import { CartManager, CartProduct } from '@/lib/cart';
import { products, ProductVariant } from '@/lib/products';
import Image from 'next/image';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCartUpdate: () => void;
}

export function CartSidebar({ isOpen, onClose, onCartUpdate }: CartSidebarProps) {
  const { language, t } = useLanguage();
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadCartProducts();
    }
  }, [isOpen]);

  const loadCartProducts = () => {
    const cart = CartManager.getCart();
    const cartWithProducts: CartProduct[] = cart.map(item => {
      const product = products.find(p => p.id === item.productId);
      if (!product) {
        console.log('Product not found for ID:', item.productId);
        CartManager.removeFromCart(item.productId);
        return null;
      }
      
      return {
        ...item,
        nameAr: product.nameAr,
        nameEn: product.nameEn,
        price: product.price,
        unit: t(`product.${product.unit}`),
        image: product.image
      };
    }).filter(Boolean) as CartProduct[];

    console.log('Cart items:', cart);
    console.log('Cart with products:', cartWithProducts);
    setCartProducts(cartWithProducts);
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    CartManager.updateQuantity(productId, newQuantity);
    loadCartProducts();
    onCartUpdate();
  };

  const removeItem = (productId: string) => {
    CartManager.removeFromCart(productId);
    loadCartProducts();
    onCartUpdate();
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert('الموقع الجغرافي غير متاح في متصفحك');
      return;
    }

    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setIsGettingLocation(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsGettingLocation(false);
        alert('لم نتمكن من الحصول على موقعك');
      }
    );
  };

  const total = cartProducts.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const sendToWhatsApp = () => {
    if (cartProducts.length === 0) return;

    const orderHeader = t('whatsapp.orderHeader');
    const productsHeader = t('whatsapp.products');
    const totalHeader = t('whatsapp.total');
    const currency = t('whatsapp.currency');
    
    let message = `*${orderHeader}*\n\n`;
    message += `${productsHeader}\n`;
    
    cartProducts.forEach((item, index) => {
      const productName = language === 'ar' ? item.nameAr : item.nameEn;
      message += `${index + 1}. ${productName}\n`;
      message += `   الكمية: ${item.quantity} ${item.unit}\n`;
      message += `   السعر: ${item.price * item.quantity} ${currency}\n\n`;
    });
    
    message += `*${totalHeader} ${total.toFixed(2)} ${currency}*\n\n`;
    
    if (location) {
      message += `${t('whatsapp.location')} https://maps.google.com/?q=${location.lat},${location.lng}\n\n`;
    }
    
    message += 'شكراً لكم ❤️';
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '963983012001';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`fixed top-0 ${language === 'ar' ? 'right-0' : 'left-0'} h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform ${isOpen ? 'translate-x-0' : language === 'ar' ? 'translate-x-full' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold">{t('cart.title')}</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🛒</div>
                <p className="text-gray-500">{t('cart.empty')}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartProducts.map((item) => {
                  const productName = language === 'ar' ? item.nameAr : item.nameEn;
                  
                  return (
                    <Card key={item.productId}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                            <Image
                              src={item.image}
                              alt={productName}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm truncate">
                              {productName}
                            </h4>
                            {item.variantName && (
                              <p className="text-xs text-blue-600 font-medium truncate">
                                {item.variantName}
                              </p>
                            )}
                            <p className="text-xs text-gray-500 mb-2">
                              {item.price} {t('product.price')} / {item.unit}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="h-6 w-6 p-0"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                
                                <span className="font-semibold text-sm min-w-[1.5rem] text-center">
                                  {item.quantity}
                                </span>
                                
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                  className="h-6 w-6 p-0"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              
                              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <span className="font-bold text-sm">
                                  {(item.price * item.quantity).toFixed(2)} {t('product.price')}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeItem(item.productId)}
                                  className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartProducts.length > 0 && (
            <div className="border-t p-4 space-y-4">
              {/* Total */}
              <div className="flex items-center justify-between text-lg font-bold">
                <span>{t('cart.total')}</span>
                <span>{total.toFixed(2)} {t('product.price')}</span>
              </div>

              {/* Location Button */}
              <Button
                variant="outline"
                onClick={getLocation}
                disabled={isGettingLocation}
                className="w-full flex items-center gap-2"
              >
                <MapPin className="h-4 w-4" />
                {location ? '✓ تم مشاركة الموقع' : t('cart.shareLocation')}
              </Button>

              {/* WhatsApp Button */}
              <Button
                onClick={sendToWhatsApp}
                className="w-full alma-gradient hover:scale-105 transition-transform"
                size="lg"
              >
                {t('cart.sendWhatsapp')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}