import { useApp } from '../contexts/AppContext';
import { CartItem } from '../types';

export function useWhatsApp() {
  const { cart, settings, getCartTotal } = useApp();

  const sendOrderToWhatsApp = (customerInfo: {
    name: string;
    phone: string;
    address: string;
    notes?: string;
  }) => {
    if (cart.length === 0) {
      alert('السلة فارغة! يرجى إضافة منتجات قبل إرسال الطلب.');
      return;
    }

    const total = getCartTotal();
    const orderDetails = cart.map((item: CartItem) => {
      const price = item.product.discount 
        ? item.product.price * (1 - item.product.discount / 100)
        : item.product.price;
      return `• ${item.product.nameAr} x${item.quantity} - ${(price * item.quantity).toLocaleString()} ${settings.currency}`;
    }).join('\n');

    const message = `🛒 طلب جديد من متجر ${settings.storeNameAr}

👤 معلومات العميل:
الاسم: ${customerInfo.name}
الهاتف: ${customerInfo.phone}
العنوان: ${customerInfo.address}
${customerInfo.notes ? `ملاحظات: ${customerInfo.notes}\n` : ''}
📦 تفاصيل الطلب:
${orderDetails}

💰 إجمالي المبلغ: ${total.toLocaleString()} ${settings.currency}

⏰ وقت الطلب: ${new Date().toLocaleString('ar-SY')}

شكراً لثقتكم بنا! 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const contactService = (serviceName: string, serviceNameAr: string) => {
    const message = `مرحباً، أرغب في الاستفسار عن خدمة: ${serviceNameAr}

يرجى التواصل معي لمزيد من التفاصيل.

شكراً لكم.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return {
    sendOrderToWhatsApp,
    contactService
  };
}