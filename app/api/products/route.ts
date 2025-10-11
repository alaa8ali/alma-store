import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const branchId = searchParams.get('branch_id');
    const categoryId = searchParams.get('category_id');

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Build query
    let query = supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        branch:branches(*),
        variants:product_variants(*)
      `)
      .eq('is_available', true)
      .order('created_at', { ascending: false });

    // Apply filters
    if (branchId) {
      query = query.eq('branch_id', branchId);
    }
    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    const { data: products, error } = await query;

    if (error) {
      console.error('Products fetch error:', error);
      return NextResponse.json(
        { error: 'فشل في جلب المنتجات' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      products: products || []
    });

  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم' },
      { status: 500 }
    );
  }
}

