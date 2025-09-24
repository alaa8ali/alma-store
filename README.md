# مشروع Alma Store

هذا المشروع يهدف إلى بناء نظام متكامل لربط WhatsApp، Telegram Bot، Supabase، وAI لاستقبال طلبات العملاء، تحليل النوايا، إنشاء الطلبات، تعيين السائقين، وإرسال التأكيدات.

## 1. الإعداد

### المتطلبات المسبقة

- Node.js (18+)
- Docker و Docker Compose (اختياري، للنشر)
- حساب Supabase
- حساب OpenAI/Gemini API Key
- حساب WhatsApp Cloud API
- حساب Telegram Bot API
- Redis (لـ BullMQ)

### إعداد متغيرات البيئة

قم بإنشاء ملف `.env` في مجلد `backend` بناءً على ملف `.env.example` واملأ المتغيرات المطلوبة:

```
PORT=3000
BASE_URL=https://yourdomain.com

SUPABASE_URL=https://<your-project-id>.supabase.co
SUPABASE_KEY=<your-supabase-service-role-key>

OPENAI_API_KEY=sk-...
OPAL_API_KEY=opal-...   # إذا متوفر، وإلا استخدم Gemini/OpenAI

TELEGRAM_BOT_TOKEN=123456:ABC-...
TELEGRAM_WEBHOOK_SECRET=telegram_webhook_secret

WHATSAPP_PHONE_ID=1234567890
WHATSAPP_TOKEN=EAAJ...

HMAC_SECRET=super-secret-for-verifying-opal-or-other-webhooks
QUEUE_REDIS_URL=redis://localhost:6379
```

### إعداد قاعدة البيانات

1. اذهب إلى مشروعك في Supabase.
2. نفّذ السكربت الموجود في `sql/schema.sql` لإنشاء الجداول.
3. نفّذ السكربت الموجود في `sql/seeds.sql` لإضافة بيانات أولية (منتجات وسائقين).

## 2. التشغيل المحلي

### تشغيل الـ Backend

1. انتقل إلى مجلد `backend`:
   ```bash
   cd backend
   ```
2. ثبّت التبعيات:
   ```bash
   npm install
   ```
3. شغّل الخادم:
   ```bash
   npm start
   ```
   أو باستخدام `nodemon` للتطوير:
   ```bash
   npm install -g nodemon
   nodemon index.js
   ```

### التشغيل باستخدام Docker Compose

1. تأكد من أن Docker و Docker Compose مثبتان لديك.
2. في المجلد الرئيسي للمشروع، قم بتشغيل:
   ```bash
   docker-compose up --build
   ```
   هذا سيقوم ببناء وتشغيل الـ backend و Redis.

## 3. النشر (Deployment)

يمكن نشر الـ backend باستخدام Docker على منصات مثل Cloud Run أو أي VPS.

### مثال لـ Dockerfile (موجود في `backend/Dockerfile`)

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
```

### CI/CD (مثال لـ GitHub Actions)

سيتم توفير مثال لـ GitHub Actions لاحقًا لتشغيل الاختبارات وبناء صور Docker ونشرها على بيئات Staging/Production.

## 4. واجهات برمجية (API Endpoints)

- `GET /health`: للتحقق من صحة الخدمة.
- `POST /webhook/whatsapp`: لاستقبال إشعارات WhatsApp.
- `POST /webhook/telegram`: لاستقبال تحديثات Telegram.
- `POST /opal/tools/create-order`: لإنشاء الطلبات (يُستدعى من Opal أو الـ backend).
- `POST /opal/tools/send-message`: لإرسال الرسائل (يُستدعى من Opal أو الـ backend).
- `POST /drivers/:id/update-location`: لتحديث موقع السائق.

## 5. تكامل الـ AI

يستخدم المشروع OpenAI/Gemini (أو Opal) لاستخراج النوايا والكيانات من رسائل العملاء.

### Prompt لاستخراج النوايا والكيانات

```json
{
  "intent": "<intent_name>",
  "entities": { ... }
}
```

## 6. الاختبارات

سيتم توفير Postman collection واختبارات الوحدة والتكامل لاحقًا.

## 7. التسليم

عند الانتهاء، سيتم تسليم رابط GitHub repo، Postman collection، ملفات prompts، وتقرير الاختبارات.

