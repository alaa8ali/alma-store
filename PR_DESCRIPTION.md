# 🔐 feat: Replace password authentication with GitHub OAuth

## 📝 الوصف

تم استبدال نظام تسجيل الدخول اليدوي (كلمة المرور) بنظام **GitHub OAuth** احترافي باستخدام **NextAuth.js** لتوفير:

- ✅ **أمان أفضل**: لا حاجة لتخزين كلمات مرور
- ✅ **تجربة مستخدم محسّنة**: تسجيل دخول بنقرة واحدة
- ✅ **تحكم دقيق**: الوصول محصور بالبريد الإلكتروني المصرح به فقط

---

## 🎯 التغييرات الرئيسية

### ✅ ما تم إضافته

1. **NextAuth.js Integration**
   - تم تثبيت `next-auth` و `react-icons`
   - إنشاء API route: `/app/api/auth/[...nextauth]/route.ts`
   - إعداد GitHub Provider مع callback للتحقق من البريد

2. **Middleware للحماية**
   - ملف `/middleware.ts` لحماية صفحات الإدارة
   - إعادة توجيه تلقائية لغير المصرح لهم

3. **صفحة تسجيل دخول جديدة**
   - واجهة حديثة مع زر GitHub OAuth
   - إعادة توجيه تلقائية بعد تسجيل الدخول الناجح

4. **Session Management**
   - `SessionProvider` wrapper في `app/providers.tsx`
   - دمج مع `LanguageProvider` الموجود مسبقاً

5. **TypeScript Types**
   - ملف `/types/next-auth.d.ts` لتوسيع أنواع NextAuth

### ❌ ما تم إزالته

1. **نظام كلمة المرور القديم**
   - حذف `/app/api/admin/login/route.ts`
   - إزالة `ADMIN_PASSWORD` و `ADMIN_PASSWORD_HASH`
   - إزالة `JWT_SECRET` (لم يعد مستخدماً)

2. **دوال التحقق اليدوية**
   - `verifyPassword()`
   - `createHash()`
   - `generateAdminToken()`

---

## 🔧 متغيرات البيئة المطلوبة

يجب إضافة المتغيرات التالية في **Vercel**:

```env
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
NEXTAUTH_URL=https://alma-store.vercel.app
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
ADMIN_ALLOWED_EMAILS=alaa4mange1@gmail.com
```

> 📖 **دليل الإعداد الكامل**: [`docs/GITHUB_AUTH_SETUP.md`](./docs/GITHUB_AUTH_SETUP.md)

---

## 🧪 كيفية الاختبار

### الاختبار المحلي

1. **إعداد GitHub OAuth App للتطوير:**
   - Homepage URL: `http://localhost:3000`
   - Callback URL: `http://localhost:3000/api/auth/callback/github`

2. **إضافة المتغيرات إلى `.env.local`:**
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-local-secret
   GITHUB_CLIENT_ID=your-dev-client-id
   GITHUB_CLIENT_SECRET=your-dev-client-secret
   ADMIN_ALLOWED_EMAILS=alaa4mange1@gmail.com
   ```

3. **تشغيل المشروع:**
   ```bash
   npm install
   npm run dev
   ```

4. **اختبار تسجيل الدخول:**
   - افتح: `http://localhost:3000/admin/login`
   - اضغط "تسجيل الدخول عبر GitHub"
   - سجل دخول بحساب `alaa4mange1@gmail.com`
   - تحقق من الوصول إلى `/admin/dashboard`

### الاختبار على الإنتاج

1. **إعداد GitHub OAuth App للإنتاج:**
   - Homepage URL: `https://alma-store.vercel.app`
   - Callback URL: `https://alma-store.vercel.app/api/auth/callback/github`

2. **إضافة المتغيرات في Vercel:**
   - اذهب إلى Settings → Environment Variables
   - أضف جميع المتغيرات المذكورة أعلاه

3. **إعادة النشر:**
   - سيتم النشر تلقائياً عند دمج هذا PR

4. **اختبار تسجيل الدخول:**
   - افتح: `https://alma-store.vercel.app/admin/login`
   - اضغط "تسجيل الدخول عبر GitHub"
   - تحقق من الوصول الناجح

---

## ✅ Checklist

- [x] تثبيت NextAuth.js وإعداده
- [x] إنشاء GitHub OAuth Provider
- [x] إضافة Middleware للحماية
- [x] تحديث صفحة تسجيل الدخول
- [x] حذف نظام كلمة المرور القديم
- [x] اختبار البناء محلياً (Build successful ✅)
- [x] إنشاء توثيق شامل
- [x] تحديث `.env.example`
- [ ] إعداد GitHub OAuth App (يتطلب صلاحيات المالك)
- [ ] إضافة متغيرات البيئة في Vercel
- [ ] اختبار على الإنتاج

---

## 📚 الملفات المهمة

| الملف | الوصف |
|-------|-------|
| `docs/GITHUB_AUTH_SETUP.md` | دليل إعداد شامل خطوة بخطوة |
| `app/api/auth/[...nextauth]/route.ts` | NextAuth API route |
| `middleware.ts` | حماية صفحات الإدارة |
| `app/admin/login/page.tsx` | صفحة تسجيل الدخول الجديدة |
| `app/providers.tsx` | Session + Language providers |
| `types/next-auth.d.ts` | TypeScript type definitions |

---

## 🔒 الأمان

- ✅ **لا تخزين لكلمات المرور**: الاعتماد الكامل على GitHub OAuth
- ✅ **التحقق من البريد الإلكتروني**: فقط `alaa4mange1@gmail.com` مصرح له
- ✅ **Session آمنة**: JWT tokens مع انتهاء صلاحية بعد 7 أيام
- ✅ **Middleware Protection**: حماية تلقائية لجميع صفحات الإدارة

---

## 📖 المراجع

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [GitHub OAuth Apps Guide](https://docs.github.com/en/apps/oauth-apps)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)

---

**المطور**: Manus AI  
**التاريخ**: 11 أكتوبر 2025  
**الفرع**: `feat/github-auth`  
**الحالة**: ✅ جاهز للمراجعة والدمج

