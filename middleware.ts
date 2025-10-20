import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // السماح بالوصول إلى جميع مسارات /admin بدون التحقق من الجلسة
  // هذا يلغي تفعيل المصادقة للوحة التحكم كما طلب المستخدم
  return NextResponse.next();
}

// لا حاجة لـ `matcher` إذا كنا نريد تطبيق الـ middleware على كل شيء أو لا نستخدمه للمصادقة
// إذا كان الهدف هو تعطيل المصادقة لـ /admin، فإن `NextResponse.next()` كافٍ.
// سنقوم بتعطيل الـ matcher مؤقتًا للتأكد من أن الـ middleware لا يتدخل في أي شيء.
export const config = {
  matcher: [], // تعطيل الـ matcher لتجنب أي تداخلات غير مرغوبة
};

