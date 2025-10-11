# دليل النشر على Vercel

هذا الدليل يشرح كيفية نشر مشروع Alma Store على منصة Vercel بشكل صحيح.

---

## المشكلة التي تم حلها

كان المشروع يستخدم `output: 'export'` في ملف `next.config.js`، مما يجعله Static Export ولا يدعم API Routes. تم إزالة هذا الإعداد لدعم API Routes بشكل كامل.

---

## خطوات النشر على Vercel

### الخطوة 1: تحضير المشروع

تأكد من أن جميع التعديلات مرفوعة على GitHub:

```bash
git add -A
git commit -m "fix: Remove static export to support API routes"
git push origin main
```

### الخطوة 2: ربط المشروع بـ Vercel

1. اذهب إلى [vercel.com](https://vercel.com)
2. سجل الدخول أو أنشئ حساب جديد
3. اضغط على "Add New Project"
4. اختر مستودع `alaa8ali/alma-store` من GitHub
5. اضغط على "Import"

### الخطوة 3: إعداد متغيرات البيئة

في صفحة إعدادات المشروع، أضف المتغيرات التالية:

#### متغيرات Supabase (إلزامية)

```
NEXT_PUBLIC_SUPABASE_URL=https://yqnvdurconsjesnampqj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxbnZkdXJjb25zamVzbmFtcG1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNjQ5NjUsImV4cCI6MjA3MTc0MDk2NX0.nYDOKVvJH940jvidtLE1d5WGz1i7xJL51MiQj-xpS4o
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxbnZkdXJjb25zamVzbmFtcG1qIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjE2NDk2NSwiZXhwIjoyMDcxNzQwOTY1fQ.tBVWl8UhcLHNZJTU5jmfc0iLEAbdFFc2C9A7OkBfaNY
```

#### متغيرات المصادقة (إلزامية)

```
JWT_SECRET=alma-store-secret-key-2025-change-in-production
```

#### كلمة المرور (اختر واحدة فقط)

**للإنتاج (موصى به)**: استخدم SHA256 hash

```
ADMIN_PASSWORD_HASH=aa01dee2e4aa9d10dc039ad90b1bfbf827104b7cd79d51478319d4fe2809d49c
```

هذا هو hash لكلمة المرور `ali98myoo`

**أو للتطوير**: استخدم كلمة المرور المباشرة

```
ADMIN_PASSWORD=ali98myoo
```

> **ملاحظة**: إذا أضفت كلاهما، سيتم استخدام `ADMIN_PASSWORD_HASH` أولاً.

### الخطوة 4: إعدادات البناء

Vercel سيكتشف تلقائياً أن المشروع Next.js، لكن تأكد من:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build` (افتراضي)
- **Output Directory**: `.next` (افتراضي)
- **Install Command**: `npm install` (افتراضي)

### الخطوة 5: النشر

اضغط على "Deploy" وانتظر حتى يكتمل البناء (عادة 2-3 دقائق).

---

## توليد Hash جديد لكلمة المرور

إذا أردت تغيير كلمة المرور، استخدم الأمر التالي:

```bash
echo -n "كلمة_المرور_الجديدة" | sha256sum
```

مثال:
```bash
echo -n "ali98myoo" | sha256sum
# النتيجة: aa01dee2e4aa9d10dc039ad90b1bfbf827104b7cd79d51478319d4fe2809d49c
```

ثم أضف الـ hash إلى متغيرات البيئة في Vercel:
```
ADMIN_PASSWORD_HASH=aa01dee2e4aa9d10dc039ad90b1bfbf827104b7cd79d51478319d4fe2809d49c
```

---

## الوصول إلى لوحة التحكم بعد النشر

بعد نشر المشروع، ستحصل على رابط مثل:
```
https://alma-store.vercel.app
```

للوصول إلى لوحة التحكم:
```
https://alma-store.vercel.app/admin/login
```

**كلمة المرور**: `ali98myoo`

---

## التحقق من عمل API Routes

بعد النشر، يمكنك التحقق من عمل API بزيارة:
```
https://alma-store.vercel.app/api/admin/login
```

يجب أن ترى رسالة خطأ (لأنك لم ترسل POST request)، وهذا يعني أن API يعمل.

---

## استكشاف الأخطاء

### خطأ: "API route not found"

**السبب**: لا يزال `output: 'export'` موجوداً في `next.config.js`

**الحل**: تأكد من أن ملف `next.config.js` لا يحتوي على `output: 'export'`

### خطأ: "كلمة المرور غير صحيحة"

**السبب**: الـ hash غير صحيح أو لم يتم إضافة متغير البيئة

**الحل**: 
1. تحقق من أن `ADMIN_PASSWORD_HASH` مضاف في Vercel
2. تأكد من أن الـ hash صحيح (استخدم الأمر أعلاه)
3. أعد نشر المشروع بعد تحديث المتغيرات

### خطأ: "حدث خطأ في الخادم"

**السبب**: مشكلة في API route أو متغيرات البيئة

**الحل**: 
1. افتح Vercel Dashboard → Project → Logs
2. ابحث عن الأخطاء في سجلات الخادم
3. تأكد من إضافة جميع متغيرات البيئة المطلوبة

---

## إعادة النشر بعد التعديلات

إذا قمت بتعديلات على الكود:

```bash
git add -A
git commit -m "وصف التعديل"
git push origin main
```

Vercel سيقوم بإعادة النشر تلقائياً.

---

## ملاحظات مهمة

1. **لا تشارك متغيرات البيئة** مع أي شخص، خاصة `SUPABASE_SERVICE_ROLE_KEY`
2. **غير JWT_SECRET** في الإنتاج إلى قيمة عشوائية قوية
3. **استخدم HTTPS** دائماً في الإنتاج (Vercel يوفره تلقائياً)
4. **راجع السجلات** بانتظام في Vercel Dashboard

---

## الدعم

إذا واجهت أي مشاكل:
1. راجع سجلات Vercel
2. تحقق من متغيرات البيئة
3. تأكد من أن قاعدة البيانات Supabase تعمل
4. تواصل مع الدعم الفني

---

**تم التحديث**: 11 أكتوبر 2025  
**الإصدار**: 2.0

