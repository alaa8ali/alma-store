# 🔐 دليل إعداد GitHub OAuth للوحة التحكم

تم تحويل نظام تسجيل الدخول من كلمة مرور بسيطة إلى **GitHub OAuth** باستخدام **NextAuth.js** لتوفير أمان أفضل وتجربة مستخدم احترافية.

---

## 📋 المتطلبات

- حساب GitHub نشط
- صلاحيات الوصول إلى إعدادات Vercel
- البريد الإلكتروني المصرح له: `alaa4mange1@gmail.com`

---

## 🚀 خطوات الإعداد

### 1️⃣ إنشاء GitHub OAuth App

1. اذهب إلى: [https://github.com/settings/developers](https://github.com/settings/developers)
2. اضغط على **"New OAuth App"**
3. املأ الحقول التالية:

| الحقل | القيمة (للإنتاج) | القيمة (للتطوير المحلي) |
|-------|------------------|------------------------|
| **Application name** | Alma Store Admin | Alma Store Admin (Dev) |
| **Homepage URL** | `https://alma-store.vercel.app` | `http://localhost:3000` |
| **Authorization callback URL** | `https://alma-store.vercel.app/api/auth/callback/github` | `http://localhost:3000/api/auth/callback/github` |

4. اضغط **"Register application"**
5. انسخ **Client ID**
6. اضغط **"Generate a new client secret"** وانسخ **Client Secret**

> ⚠️ **مهم**: احتفظ بـ Client Secret في مكان آمن، لن تتمكن من رؤيته مرة أخرى!

---

### 2️⃣ إضافة المتغيرات البيئية في Vercel

1. اذهب إلى: [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. اختر مشروع **alma-store**
3. اذهب إلى **Settings** → **Environment Variables**
4. أضف المتغيرات التالية:

| المتغير | القيمة | البيئة |
|---------|--------|--------|
| `GITHUB_CLIENT_ID` | (القيمة من الخطوة 1) | Production, Preview |
| `GITHUB_CLIENT_SECRET` | (القيمة من الخطوة 1) | Production, Preview |
| `NEXTAUTH_URL` | `https://alma-store.vercel.app` | Production |
| `NEXTAUTH_URL` | `https://alma-store-git-[branch].vercel.app` | Preview |
| `NEXTAUTH_SECRET` | (مفتاح عشوائي - انظر أدناه) | Production, Preview |
| `ADMIN_ALLOWED_EMAILS` | `alaa4mange1@gmail.com` | Production, Preview |

**لتوليد NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

5. احفظ التغييرات
6. أعد نشر المشروع

---

### 3️⃣ الاختبار المحلي (Development)

#### أ. إعداد المتغيرات المحلية

أنشئ ملف `.env.local` في جذر المشروع:

```env
# Supabase (موجود مسبقاً)
NEXT_PUBLIC_SUPABASE_URL=https://yqnvdurconsjesnampqj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-local-secret-key

# GitHub OAuth (استخدم OAuth App منفصل للتطوير)
GITHUB_CLIENT_ID=your-dev-client-id
GITHUB_CLIENT_SECRET=your-dev-client-secret

# Admin Emails
ADMIN_ALLOWED_EMAILS=alaa4mange1@gmail.com
```

#### ب. تشغيل المشروع

```bash
npm install
npm run dev
```

#### ج. اختبار تسجيل الدخول

1. افتح المتصفح: `http://localhost:3000/admin/login`
2. اضغط على **"تسجيل الدخول عبر GitHub"**
3. سجل الدخول بحساب GitHub الخاص بـ `alaa4mange1@gmail.com`
4. سيتم توجيهك إلى `/admin/dashboard`

---

## 🔒 كيف يعمل النظام؟

### التحقق من الصلاحيات

عند محاولة تسجيل الدخول:

1. يتم توجيه المستخدم إلى GitHub للمصادقة
2. GitHub يعيد المستخدم مع معلومات الحساب
3. NextAuth يتحقق من البريد الإلكتروني مقابل `ADMIN_ALLOWED_EMAILS`
4. إذا كان البريد مصرحاً، يتم إنشاء جلسة (Session)
5. إذا لم يكن مصرحاً، يتم رفض الدخول

### حماية الصفحات

تم إضافة **Middleware** لحماية جميع صفحات الإدارة:

```typescript
// middleware.ts
export const config = {
  matcher: ["/admin/dashboard/:path*", "/admin/products/:path*", "/admin/orders/:path*"],
};
```

أي محاولة للوصول إلى هذه الصفحات بدون تسجيل دخول سيتم توجيهها إلى `/admin/login`.

---

## 🧪 اختبار شامل

### ✅ السيناريوهات المطلوب اختبارها

1. **تسجيل دخول ناجح**
   - استخدم حساب `alaa4mange1@gmail.com`
   - تحقق من الوصول إلى لوحة التحكم

2. **رفض دخول غير مصرح**
   - حاول تسجيل الدخول بحساب GitHub آخر
   - تحقق من رفض الدخول

3. **حماية الصفحات**
   - حاول الوصول إلى `/admin/dashboard` بدون تسجيل دخول
   - تحقق من التوجيه إلى `/admin/login`

4. **تسجيل الخروج**
   - سجل الدخول ثم اضغط تسجيل الخروج
   - تحقق من العودة إلى صفحة تسجيل الدخول

---

## 🗑️ ما تم إزالته

تم حذف جميع الملفات والكود المتعلق بنظام كلمة المرور القديم:

- ✅ `app/api/admin/login/route.ts` (API القديم)
- ✅ `ADMIN_PASSWORD` و `ADMIN_PASSWORD_HASH` (متغيرات البيئة)
- ✅ `JWT_SECRET` (لم يعد مستخدماً)
- ✅ دوال `verifyPassword` و `generateToken`

---

## 🆘 استكشاف الأخطاء

### المشكلة: "Sign in failed. Check the details you provided are correct."

**الحل:**
- تحقق من أن `ADMIN_ALLOWED_EMAILS` يحتوي على البريد الصحيح
- تأكد من عدم وجود مسافات إضافية في المتغير

### المشكلة: "Callback URL mismatch"

**الحل:**
- تحقق من أن **Authorization callback URL** في GitHub OAuth App يطابق:
  - Production: `https://alma-store.vercel.app/api/auth/callback/github`
  - Development: `http://localhost:3000/api/auth/callback/github`

### المشكلة: "NEXTAUTH_URL is not defined"

**الحل:**
- أضف `NEXTAUTH_URL` إلى متغيرات البيئة في Vercel
- للتطوير المحلي، أضفه إلى `.env.local`

---

## 📚 مراجع مفيدة

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [GitHub OAuth Apps](https://docs.github.com/en/apps/oauth-apps)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)

---

**تم الإعداد بواسطة**: Manus AI  
**التاريخ**: 11 أكتوبر 2025  
**الحالة**: ✅ جاهز للاستخدام

