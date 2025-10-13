import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'يرجى إدخال اسم المستخدم وكلمة المرور' },
        { status: 400 }
      );
    }

    // ✅ تحقق هل يوجد مدير من قبل
    const { data: existingAdmins, error: checkError } = await supabase
      .from('admin_users')
      .select('id');

    if (checkError) {
      console.error('Database error:', checkError);
      throw checkError;
    }

    // ✅ الحالة الأولى: لا يوجد مدير -> إنشاء أول مدير
    if (!existingAdmins || existingAdmins.length === 0) {
      const hashedPassword = await bcrypt.hash(password, 12);
      const { error: insertError } = await supabase.from('admin_users').insert([
        {
          username,
          password_hash: hashedPassword,
          role: 'super_admin',
          is_active: true
        }
      ]);

      if (insertError) {
        console.error('Insert error:', insertError);
        throw insertError;
      }

      // إنشاء جلسة للمدير الجديد
      const response = NextResponse.json({
        success: true,
        message: 'تم إنشاء حساب المدير بنجاح! جارٍ تسجيل الدخول...',
        user: { username, role: 'super_admin' }
      });

      response.cookies.set('admin-session', JSON.stringify({ username, role: 'super_admin' }), {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 // 24 ساعة
      });

      return response;
    }

    // ✅ الحالة الثانية: يوجد مدير -> تحقق من كلمة المرور
    const { data: user, error: userError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('username', username)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { success: false, error: 'اسم المستخدم غير موجود' },
        { status: 404 }
      );
    }

    if (!user.is_active) {
      return NextResponse.json(
        { success: false, error: 'هذا الحساب معطل' },
        { status: 403 }
      );
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'كلمة المرور غير صحيحة' },
        { status: 401 }
      );
    }

    // ✅ نجاح تسجيل الدخول
    const response = NextResponse.json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
      user: { username: user.username, role: user.role }
    });

    // إنشاء كوكي لتوثيق الجلسة
    response.cookies.set('admin-session', JSON.stringify({ username: user.username, role: user.role }), {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 // 24 ساعة
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ غير متوقع في الخادم' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'تم تسجيل الخروج بنجاح' });
  response.cookies.delete('admin-session');
  return response;
}

