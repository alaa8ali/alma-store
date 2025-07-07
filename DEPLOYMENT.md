# دليل النشر - متجر Alma

هذا الدليل يوضح كيفية نشر متجر Alma على منصات مختلفة.

## 🚀 النشر على Vercel (الأسهل والأسرع)

### الطريقة الأولى: من خلال GitHub
1. ارفع المشروع إلى GitHub
2. اذهب إلى [vercel.com](https://vercel.com)
3. سجل دخول بحساب GitHub
4. اضغط "New Project"
5. اختر مستودع alma-store
6. اضغط "Deploy"

### الطريقة الثانية: من خلال CLI
```bash
# تثبيت Vercel CLI
npm install -g vercel

# تسجيل الدخول
vercel login

# النشر
vercel

# للنشر في الإنتاج
vercel --prod
```

## 🌐 النشر على Netlify

### من خلال GitHub
1. ارفع المشروع إلى GitHub
2. اذهب إلى [netlify.com](https://netlify.com)
3. اضغط "New site from Git"
4. اختر GitHub واختر المستودع
5. إعدادات البناء:
   - Build command: `npm run build`
   - Publish directory: `dist`

### من خلال Drag & Drop
```bash
# بناء المشروع
npm run build

# ارفع مجلد dist إلى netlify.com
```

## 📄 النشر على GitHub Pages

```bash
# تثبيت gh-pages
npm install --save-dev gh-pages

# إضافة scripts في package.json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

# النشر
npm run deploy
```

## 🐳 النشر باستخدام Docker

### إنشاء Dockerfile
```dockerfile
# استخدام Node.js كصورة أساسية
FROM node:18-alpine

# تعيين مجلد العمل
WORKDIR /app

# نسخ ملفات package
COPY package*.json ./

# تثبيت التبعيات
RUN npm ci --only=production

# نسخ الكود المصدري
COPY . .

# بناء التطبيق
RUN npm run build

# تثبيت serve لتشغيل التطبيق
RUN npm install -g serve

# تعريض المنفذ
EXPOSE 3000

# تشغيل التطبيق
CMD ["serve", "-s", "dist", "-l", "3000"]
```

### بناء وتشغيل الحاوية
```bash
# بناء الصورة
docker build -t alma-store .

# تشغيل الحاوية
docker run -p 3000:3000 alma-store
```

## ☁️ النشر على AWS S3 + CloudFront

### 1. إنشاء S3 Bucket
```bash
# تثبيت AWS CLI
npm install -g aws-cli

# تكوين AWS
aws configure

# إنشاء bucket
aws s3 mb s3://alma-store-bucket
```

### 2. رفع الملفات
```bash
# بناء المشروع
npm run build

# رفع إلى S3
aws s3 sync dist/ s3://alma-store-bucket --delete
```

### 3. تكوين CloudFront
- إنشاء توزيع CloudFront
- ربطه بـ S3 bucket
- تعيين index.html كصفحة افتراضية

## 🔧 إعدادات البيئة للإنتاج

### متغيرات البيئة
```bash
# .env.production
VITE_API_URL=https://api.alma-store.com
VITE_WHATSAPP_NUMBER=+963983012001
VITE_STORE_NAME=متجر Alma
```

### تحسين الأداء
```javascript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', 'react-hot-toast']
        }
      }
    }
  }
});
```

## 📊 مراقبة الأداء

### Google Analytics
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

### Sentry للأخطاء
```bash
npm install @sentry/react @sentry/tracing
```

## 🔒 الأمان في الإنتاج

### إخفاء معلومات التطوير
- إزالة console.log
- تشفير المتغيرات الحساسة
- استخدام HTTPS
- تعيين CSP headers

### حماية لوحة التحكم
- تغيير كلمات المرور الافتراضية
- استخدام JWT tokens
- تفعيل 2FA
- مراقبة محاولات الدخول

## 📱 PWA (Progressive Web App)

### إضافة Service Worker
```bash
npm install vite-plugin-pwa
```

### تكوين PWA
```javascript
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ]
});
```

## 🌍 النطاقات المخصصة

### Vercel
```bash
# إضافة نطاق مخصص
vercel domains add alma-store.com
```

### Netlify
1. اذهب إلى Site settings
2. Domain management
3. Add custom domain

### Cloudflare
1. إضافة النطاق إلى Cloudflare
2. تحديث DNS records
3. تفعيل SSL

## 📈 تحسين SEO

### Meta tags
```html
<meta name="description" content="متجر Alma - وجهتك للتسوق الإلكتروني">
<meta name="keywords" content="متجر إلكتروني, مواد غذائية, ملابس, إلكترونيات">
<meta property="og:title" content="متجر Alma">
<meta property="og:description" content="وجهتك للتسوق الإلكتروني">
```

### Sitemap
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://alma-store.com</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

**نصائح مهمة:**
- اختبر التطبيق محلياً قبل النشر
- استخدم HTTPS دائماً في الإنتاج
- راقب الأداء والأخطاء
- احتفظ بنسخ احتياطية منتظمة