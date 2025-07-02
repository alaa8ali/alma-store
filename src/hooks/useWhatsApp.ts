import { useCallback } from 'react';
import { CartItem } from '../types';

export const useWhatsApp = () => {
  const sendOrder = useCallback(async (cartItems: CartItem[], total: number) => {
    const phoneNumber = '+963983012001';
    
    let message = `🛍️ *طلبية جديدة من متجر Alma*\n\n`;
    message += `📦 *تفاصيل الطلبية:*\n`;
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.nameAr}\n`;
      message += `   💰 السعر: ${item.price} ل.س\n`;
      message += `   📊 الكمية: ${item.quantity}\n`;
      message += `   💵 المجموع: ${item.price * item.quantity} ل.س\n\n`;
    });
    
    message += `💳 *إجمالي الفاتورة: ${total} ل.س*\n\n`;
    
    // Try to get user location
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
          enableHighAccuracy: true
        });
      });
      
      const { latitude, longitude } = position.coords;
      message += `📍 *الموقع:*\n`;
      message += `https://maps.google.com/maps?q=${latitude},${longitude}\n\n`;
    } catch (error) {
      message += `📍 *الموقع:* لم يتم تحديد الموقع\n\n`;
    }
    
    message += `🙏 شكراً لاختياركم متجر Alma`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  }, []);

  return { sendOrder };
};