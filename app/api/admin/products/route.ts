import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '@/lib/database';

function checkAdminAuth(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;
  
  if (!token) {
    return { isAuthenticated: false };
  }

  return verifyAdminToken(token);
}

export async function GET(request: NextRequest) {
  const auth = checkAdminAuth(request);
  
  if (!auth.isAuthenticated) {
    return NextResponse.json(
      { success: false, error: 'غير مصرح' },
      { status: 401 }
    );
  }

  try {
    const products = await fetchProducts();
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'خطأ في جلب المنتجات' },
      { status: 500 }
    );
  }
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
    const product = await request.json();
    const result = await createProduct(product);
    
    if (result.success) {
      return NextResponse.json({ success: true, message: 'تم إنشاء المنتج بنجاح' });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, error: 'خطأ في إنشاء المنتج' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const auth = checkAdminAuth(request);
  
  if (!auth.isAuthenticated) {
    return NextResponse.json(
      { success: false, error: 'غير مصرح' },
      { status: 401 }
    );
  }

  try {
    const product = await request.json();
    const result = await updateProduct(product);
    
    if (result.success) {
      return NextResponse.json({ success: true, message: 'تم تحديث المنتج بنجاح' });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { success: false, error: 'خطأ في تحديث المنتج' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const auth = checkAdminAuth(request);
  
  if (!auth.isAuthenticated) {
    return NextResponse.json(
      { success: false, error: 'غير مصرح' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('id');

    if (!productId) {
      return NextResponse.json(
        { success: false, error: 'معرف المنتج مطلوب' },
        { status: 400 }
      );
    }

    const result = await deleteProduct(productId);
    
    if (result.success) {
      return NextResponse.json({ success: true, message: 'تم حذف المنتج بنجاح' });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { success: false, error: 'خطأ في حذف المنتج' },
      { status: 500 }
    );
  }
}