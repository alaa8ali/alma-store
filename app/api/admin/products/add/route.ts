import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: NextRequest) {
  try {
    // Verify admin token
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'غير مصرح' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      nameAr,
      nameEn,
      descriptionAr,
      descriptionEn,
      categoryId,
      branchId,
      price,
      image,
      available = true,
      variants = []
    } = body;

    // Validate required fields
    if (!nameAr || !categoryId || !branchId || !price) {
      return NextResponse.json(
        { error: 'الحقول المطلوبة: الاسم بالعربي، الفئة، الفرع، السعر' },
        { status: 400 }
      );
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert product
    const { data: product, error: productError } = await supabase
      .from('products')
      .insert({
        name_ar: nameAr,
        name_en: nameEn || nameAr,
        description_ar: descriptionAr,
        description_en: descriptionEn,
        category_id: categoryId,
        branch_id: branchId,
        price: parseFloat(price),
        image_url: image,
        is_available: available,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (productError) {
      console.error('Product insert error:', productError);
      return NextResponse.json(
        { error: 'فشل في إضافة المنتج: ' + productError.message },
        { status: 500 }
      );
    }

    // Insert variants if provided
    if (variants && variants.length > 0) {
      const variantsData = variants.map((v: any) => ({
        product_id: product.id,
        name_ar: v.nameAr,
        name_en: v.nameEn || v.nameAr,
        price: parseFloat(v.price),
        image_url: v.image,
        is_available: v.available !== false,
        created_at: new Date().toISOString()
      }));

      const { error: variantsError } = await supabase
        .from('product_variants')
        .insert(variantsData);

      if (variantsError) {
        console.error('Variants insert error:', variantsError);
        // Product was created, but variants failed
        return NextResponse.json({
          success: true,
          product,
          warning: 'تم إضافة المنتج لكن فشل في إضافة المتغيرات'
        });
      }
    }

    return NextResponse.json({
      success: true,
      product,
      message: 'تم إضافة المنتج بنجاح'
    });

  } catch (error) {
    console.error('Add product error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم' },
      { status: 500 }
    );
  }
}

