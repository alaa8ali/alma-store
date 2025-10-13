import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // السماح بالوصول إلى صفحة تسجيل الدخول و API
  if (pathname === '/admin/login' || pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // التحقق من جلسة المدير للصفحات المحمية
  if (pathname.startsWith('/admin')) {
    const adminSession = request.cookies.get('admin-session');

    if (!adminSession) {
      // إعادة التوجيه إلى صفحة تسجيل الدخول
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      // التحقق من صحة الجلسة
      const session = JSON.parse(adminSession.value);
      if (!session.username || !session.role) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    } catch (error) {
      // إذا كانت الجلسة غير صالحة
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

