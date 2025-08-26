import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import { uploadImage } from '@/lib/database';

function checkAdminAuth(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;
  
  if (!token) {
    return { isAuthenticated: false };
  }

  return verifyAdminToken(token);
}

export async function POST(request: NextRequest) {
  const auth = checkAdminAuth(request);
  
  if (!auth.isAuthenticated) {
    return NextResponse.json(
      { success: false, error: 'غير مصرح' },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'products';

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'لم يتم اختيار ملف' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'نوع الملف غير مدعوم. يرجى اختيار صورة (JPG, PNG, WebP)' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'حجم الملف كبير جداً. الحد الأقصى 5 ميجابايت' },
        { status: 400 }
      );
    }

    const result = await uploadImage(file, folder);
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        url: result.url,
        message: 'تم رفع الصورة بنجاح'
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { success: false, error: 'خطأ في رفع الصورة' },
      { status: 500 }
    );
  }
}