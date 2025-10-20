
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// تهيئة عميل Supabase على جانب الخادم (Server-side)
// هذا يتطلب استخدام Supabase SDK الخاص بالخادم أو التعامل مع الكوكيز يدوياً
// نظراً لأن `createClient` من `@supabase/supabase-js` هو للجانب العميل،
// سنقوم هنا بالتحقق من الكوكيز مباشرة.

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // إذا لم يكن المسار يبدأ بـ /admin، فدع الطلب يمر
  if (!url.pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // استثناء صفحة تسجيل الدخول وصفحة رد الاتصال من التحقق
  if (url.pathname === '/admin/login' || url.pathname === '/admin/auth-callback') {
    return NextResponse.next();
  }

  // التحقق من وجود كوكي الجلسة (Supabase يستخدم عادةً sb-<project-ref>-auth-token)
  // يجب استبدال <project-ref> بمعرف مشروعك الفعلي (yqnvdurconsjesnampmj)
  const supabaseAuthToken = req.cookies.get('sb-yqnvdurconsjesnampmj-auth-token');

  // إذا كان هناك كوكي جلسة، اسمح بالوصول
  if (supabaseAuthToken) {
    return NextResponse.next();
  }

  // إذا لم يكن هناك كوكي جلسة، أعد التوجيه إلى صفحة تسجيل الدخول
  return NextResponse.redirect(new URL('/admin/login', req.url));
}

export const config = {
  matcher: ['/admin/:path*'],
};

