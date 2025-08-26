import { createClient } from '@supabase/supabase-js';

// الحصول على المتغيرات البيئية
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// التحقق من وجود المتغيرات البيئية
if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables are not configured. Using fallback mode.');
}

// Client for public operations - only create if env vars are available
export const supabase = supabaseUrl && supabaseAnonKey 
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Admin client with service role key for admin operations
export const supabaseAdmin = supabaseUrl && supabaseServiceKey 
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null;

// Database types
export interface DatabaseProduct {
    id: string;
    name_ar: string;
    name_en: string;
    category: string;
    price: number;
    unit: 'piece' | 'carton';
    image: string;
    available: boolean;
    created_at: string;
    updated_at: string;
}

export interface DatabaseVariant {
    id: string;
    product_id: string;
    name_ar: string;
    name_en: string;
    price: number;
    image: string;
    available: boolean;
    created_at: string;
    updated_at: string;
}

export interface DatabaseCategory {
    id: string;
    name_ar: string;
    name_en: string;
    icon: string;
    created_at: string;
    updated_at: string;
}
