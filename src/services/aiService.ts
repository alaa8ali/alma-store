// خدمة الذكاء الاصطناعي
export class AIService {
  private static readonly API_BASE = 'https://api.openai.com/v1';
  private static readonly API_KEY = process.env.VITE_OPENAI_API_KEY;

  // شات بوت للعملاء
  static async chatWithCustomer(message: string, context: any) {
    try {
      const response = await fetch(`${this.API_BASE}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `أنت مساعد ذكي لمتجر Alma الإلكتروني. 
              المتجر يبيع: مواد غذائية، ملابس، إلكترونيات.
              كن مفيداً ومهذباً واستخدم اللغة العربية.
              المنتجات المتوفرة: ${JSON.stringify(context.products)}`
            },
            {
              role: 'user',
              content: message
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('AI Chat Error:', error);
      return 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.';
    }
  }

  // توصيات المنتجات
  static async getProductRecommendations(userProfile: any, currentProduct: any) {
    try {
      const prompt = `
        بناءً على المعلومات التالية:
        - المنتج الحالي: ${currentProduct.nameAr}
        - تاريخ المشتريات: ${JSON.stringify(userProfile.purchaseHistory)}
        - التفضيلات: ${JSON.stringify(userProfile.preferences)}
        
        اقترح 4 منتجات مناسبة من قائمة المنتجات المتوفرة.
        أرجع النتيجة كـ JSON array مع معرفات المنتجات.
      `;

      const response = await this.chatWithCustomer(prompt, { products: [] });
      return JSON.parse(response);
    } catch (error) {
      console.error('Recommendations Error:', error);
      return [];
    }
  }

  // تحليل المبيعات
  static async analyzeSalesData(salesData: any[], products: any[]) {
    try {
      const prompt = `
        حلل بيانات المبيعات التالية وقدم رؤى ذكية:
        ${JSON.stringify({ salesData, products })}
        
        أريد:
        1. توقع المبيعات للشهر القادم
        2. أفضل أوقات المبيعات
        3. المنتجات الأكثر ربحية
        4. توصيات لتحسين المبيعات
        
        أرجع النتيجة كـ JSON.
      `;

      const response = await this.chatWithCustomer(prompt, {});
      return JSON.parse(response);
    } catch (error) {
      console.error('Sales Analysis Error:', error);
      return null;
    }
  }

  // بحث ذكي
  static async smartSearch(query: string, products: any[]) {
    try {
      const prompt = `
        المستخدم يبحث عن: "${query}"
        
        من قائمة المنتجات التالية، اختر المنتجات الأكثر صلة:
        ${JSON.stringify(products)}
        
        فهم نية البحث وأرجع المنتجات المناسبة مع درجة الصلة.
        أرجع النتيجة كـ JSON array.
      `;

      const response = await this.chatWithCustomer(prompt, {});
      return JSON.parse(response);
    } catch (error) {
      console.error('Smart Search Error:', error);
      return products.slice(0, 5); // fallback للبحث العادي
    }
  }

  // مساعد إداري
  static async adminAssistant(question: string, storeContext: any) {
    try {
      const prompt = `
        أنت مساعد إداري ذكي لمتجر Alma.
        
        بيانات المتجر:
        - عدد المنتجات: ${storeContext.products}
        - عدد الطلبات: ${storeContext.orders}
        - الإيرادات: ${storeContext.revenue}
        
        السؤال: ${question}
        
        قدم إجابة مفيدة وعملية باللغة العربية.
      `;

      return await this.chatWithCustomer(prompt, {});
    } catch (error) {
      console.error('Admin Assistant Error:', error);
      return 'عذراً، لا أستطيع الإجابة على هذا السؤال حالياً.';
    }
  }

  // تحسين الأسعار
  static async optimizePricing(products: any[], marketData: any) {
    try {
      const prompt = `
        حلل الأسعار التالية واقترح تحسينات:
        المنتجات: ${JSON.stringify(products)}
        بيانات السوق: ${JSON.stringify(marketData)}
        
        اقترح:
        1. تعديلات الأسعار
        2. استراتيجيات التسعير
        3. المنتجات التي تحتاج تخفيض/زيادة
        
        أرجع النتيجة كـ JSON.
      `;

      const response = await this.chatWithCustomer(prompt, {});
      return JSON.parse(response);
    } catch (error) {
      console.error('Price Optimization Error:', error);
      return null;
    }
  }
}
