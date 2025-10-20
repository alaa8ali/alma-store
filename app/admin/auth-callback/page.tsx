
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

// تهيئة عميل Supabase على جانب العميل
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    async function handleSession() {
      // Supabase SDK يقرأ الرمز تلقائياً من الـ URL إذا استعملت signInWithOtp
      const { data, error } = await supabase.auth.getSessionFromUrl();

      if (error) {
        console.error('Error getting session from URL:', error);
        router.push('/admin/login?error=' + encodeURIComponent(error.message));
        return;
      }

      if (data.session) {
        // تم تسجيل الجلسة بنجاح، أعد التوجيه إلى لوحة التحكم
        router.push('/admin/dashboard');
      } else {
        // لا توجد جلسة، ربما لم يتم تأكيد البريد الإلكتروني بعد أو حدث خطأ آخر
        router.push('/admin/login?message=' + encodeURIComponent('فشل تسجيل الدخول أو لم يتم تأكيد البريد الإلكتروني.'));
      }
    }

    handleSession();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <p className="text-xl text-gray-700">جارٍ تأكيد الدخول...</p>
    </div>
  );
}

