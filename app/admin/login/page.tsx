
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();

  useEffect(() => {
    // إعادة توجيه مباشرة إلى لوحة التحكم لتجاوز صفحة تسجيل الدخول
    // هذا التعديل لغرض التجريب فقط كما طلب المستخدم
    router.push('/admin/dashboard');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <p className="text-xl text-gray-700">جارٍ التوجيه إلى لوحة التحكم...</p>
    </div>
  );
}

