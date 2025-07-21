# 📚 دليل النشر والتشغيل - متجر ألما الإلكتروني

## 🚀 الرابط المباشر
**رابط المتجر:** https://2zwheslxdw8r.space.minimax.io

## 📋 متطلبات النظام

### للتطوير:
- Node.js (الإصدار 18 أو أحدث)
- npm أو pnpm (مفضل)
- محرر نصوص (VS Code موصى به)
- Git للتحكم في الإصدارات

### للتشغيل:
- متصفح ويب حديث يدعم ES6+
- اتصال بالإنترنت
- دعم JavaScript مفعل

## 🔧 تثبيت وتشغيل المشروع محلياً

### 1. استنساخ المشروع
```bash
git clone [repository-url]
cd alma-store
```

### 2. تثبيت التبعيات
```bash
# باستخدام pnpm (مفضل)
pnpm install

# أو باستخدام npm
npm install
```

### 3. تشغيل الخادم المحلي للتطوير
```bash
# باستخدام pnpm
pnpm dev

# أو باستخدام npm
npm run dev
```

سيتم تشغيل الخادم على العنوان: `http://localhost:5173`

### 4. بناء المشروع للإنتاج
```bash
# باستخدام pnpm
pnpm build

# أو باستخدام npm
npm run build
```

### 5. معاينة البناء النهائي
```bash
# باستخدام pnpm
pnpm preview

# أو باستخدام npm
npm run preview
```

## 📁 هيكل المشروع

```
alma-store/
├── public/                 # الملفات العامة والصور
│   ├── images/            # صور المتجر
│   │   ├── category-*.jpg # صور الفئات
│   │   ├── products/      # صور المنتجات
│   │   └── services/      # صور الخدمات
│   └── logo.png          # شعار المتجر
├── src/                   # الكود المصدري
│   ├── components/        # المكونات
│   │   ├── Admin/        # مكونات لوحة التحكم
│   │   ├── Cart/         # مكونات السلة
│   │   ├── Layout/       # مكونات التخطيط
│   │   ├── Product/      # مكونات المنتجات
│   │   └── Service/      # مكونات الخدمات
│   ├── contexts/         # React Context
│   ├── data/            # البيانات الافتراضية
│   ├── hooks/           # Custom Hooks
│   ├── pages/           # الصفحات
│   ├── types/           # تعريفات TypeScript
│   ├── utils/           # أدوات مساعدة
│   ├── App.tsx          # المكون الرئيسي
│   ├── main.tsx         # نقطة الدخول
│   └── index.css        # الأنماط الرئيسية
├── dist/                # ملفات البناء النهائي
├── package.json         # إعدادات المشروع
├── tsconfig.json        # إعدادات TypeScript
├── tailwind.config.js   # إعدادات Tailwind CSS
└── vite.config.ts       # إعدادات Vite
```

## 🛠️ التقنيات المستخدمة

### Frontend Framework:
- **React 18.3** - مكتبة واجهة المستخدم
- **TypeScript 5.6** - لطباعة البيانات وتحسين التطوير
- **Vite 6.0** - أداة البناء والتطوير السريعة

### Styling:
- **Tailwind CSS 3.4** - إطار عمل CSS المساعد
- **Lucide React** - مكتبة الأيقونات
- **Google Fonts (Tajawal)** - خط عربي جميل

### State Management:
- **React Context API** - إدارة الحالة العامة
- **LocalStorage** - تخزين البيانات محلياً
- **Custom Hooks** - منطق قابل لإعادة الاستخدام

### Features:
- **PWA Ready** - جاهز لتطبيق الويب التقدمي
- **Responsive Design** - تصميم متجاوب
- **RTL Support** - دعم اللغة العربية
- **Dark Mode Ready** - جاهز للوضع الليلي

## 🌐 عملية النشر

### 1. النشر التلقائي:
```bash
# بناء المشروع
npm run build

# نشر المجلد dist
# يتم النشر تلقائياً على منصة MiniMax
```

### 2. النشر على منصات أخرى:

#### Netlify:
```bash
# تثبيت Netlify CLI
npm install -g netlify-cli

# بناء ونشر
npm run build
netlify deploy --prod --dir=dist
```

#### Vercel:
```bash
# تثبيت Vercel CLI
npm install -g vercel

# بناء ونشر
npm run build
vercel --prod
```

#### GitHub Pages:
```bash
# إضافة gh-pages
npm install --save-dev gh-pages

# إضافة script في package.json
"deploy": "gh-pages -d dist"

# نشر
npm run build
npm run deploy
```

## 🔧 إعدادات التخصيص

### 1. تغيير الألوان:
عدل ملف `tailwind.config.js`:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      }
    }
  }
}
```

### 2. تغيير الخط:
عدل ملف `src/index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;600;700;900&display=swap');

body {
  font-family: 'Cairo', sans-serif;
}
```

### 3. إضافة لغات جديدة:
- أضف ملفات الترجمة في `src/locales/`
- استخدم مكتبة مثل `react-i18next`
- عدل المكونات لدعم اللغات المتعددة

## 📊 مراقبة الأداء

### 1. أدوات التحليل المدمجة:
- Lighthouse audit للأداء
- Web Vitals monitoring
- Bundle analyzer للحجم

### 2. إضافة Google Analytics:
```html
<!-- في index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔒 أمان البيانات

### 1. LocalStorage Security:
- البيانات مشفرة قبل التخزين
- تنظيف البيانات عند انتهاء الجلسة
- التحقق من صحة البيانات قبل الاستخدام

### 2. Content Security Policy:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline' fonts.googleapis.com; 
               font-src fonts.gstatic.com;">
```

## 🐛 استكشاف الأخطاء وإصلاحها

### مشاكل شائعة:

#### 1. خطأ في البناء:
```bash
# تنظيف cache
rm -rf node_modules/.vite
rm -rf dist

# إعادة تثبيت
npm install
npm run build
```

#### 2. مشاكل الأداء:
```bash
# تحليل Bundle
npx vite-bundle-analyzer dist

# تحسين الصور
npx imagemin-cli images/* --out-dir=optimized
```

#### 3. مشاكل الـ TypeScript:
```bash
# فحص الأنواع
npx tsc --noEmit

# إصلاح تلقائي
npx eslint src --fix
```

## 📱 اختبار على الأجهزة المختلفة

### 1. اختبار محلي:
```bash
# اختبار على شبكة محلية
npm run dev -- --host
# ثم فتح http://[your-ip]:5173 على أي جهاز
```

### 2. أدوات الاختبار:
- Chrome DevTools للتجربة على أجهزة مختلفة
- BrowserStack للاختبار على متصفحات مختلفة
- Responsive Design Mode في Firefox

## 📈 تحسين الأداء

### 1. تحسين الصور:
```bash
# ضغط الصور تلقائياً
npm install --save-dev vite-plugin-imagemin
```

### 2. تقسيم الكود:
```javascript
// في vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react']
        }
      }
    }
  }
})
```

### 3. Lazy Loading:
```typescript
// في المكونات
const AdminPanel = lazy(() => import('./components/Admin/AdminPanel'));

// في App.tsx
<Suspense fallback={<div>Loading...</div>}>
  <AdminPanel />
</Suspense>
```

## 🔄 تحديثات وصيانة

### 1. تحديث التبعيات:
```bash
# فحص التحديثات
npm outdated

# تحديث آمن
npm update

# تحديث major versions
npx npm-check-updates -u
npm install
```

### 2. نسخ احتياطية:
- استخدم خاصية تصدير البيانات في لوحة التحكم
- احفظ ملفات JSON دورياً
- استخدم Git للتحكم في إصدارات الكود

## 📞 الدعم والمساعدة

لأي استفسارات أو مشاكل تقنية:
- راجع وثائق المشروع في `README.md`
- تحقق من ملفات السجل في console المتصفح
- تواصل مع فريق التطوير عبر البريد الإلكتروني

---

**تم إعداد هذا الدليل بواسطة:** MiniMax Agent  
**آخر تحديث:** 2025-07-20  
**الإصدار:** 1.0.0