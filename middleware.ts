import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // السماح بالوصول إلى جميع مسارات /admin بدون التحقق من الجلسة
  // هذا يلغي تفعيل المصادقة للوحة التحكم كما طلب المستخدم
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

