import { createClient } from '@supabase/supabase-js';

// الحصول على المتغيرات البيئية
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yqnvdurconsjesnampqj.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxbnZkdXJjb25zamVzbmFtcG1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNjQ5NjUsImV4cCI6MjA3MTc0MDk2NX0.nYDOKVvJH940jvidtLE1d5WGz1i7xJL51MiQj-xpS4o';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxbnZkdXJjb25zamVzbmFtcG1qIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjE2NDk2NSwiZXhwIjoyMDcxNzQwOTY1fQ.tBVWl8UhcLHNZJTU5jmfc0iLEAbdFFc2C9A7OkBfaNY';

// Client for public operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client with service role key for admin operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

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

// New database types for branches system
export interface DatabaseBranch {
    id: string;
    name_ar: string;
    name_en: string;
    icon?: string;
    description_ar?: string;
    description_en?: string;
    is_active: boolean;
    display_order: number;
    created_at: string;
    updated_at: string;
}

export interface DatabaseOrder {
    id: string;
    order_number: string;
    user_id?: string;
    branch_id: string;
    items: any;
    subtotal: number;
    delivery_fee: number;
    total: number;
    status: string;
    payment_method: string;
    payment_status: string;
    currency: string;
    delivery_address?: any;
    customer_notes?: string;
    assigned_driver_id?: string;
    estimated_delivery_time?: string;
    delivered_at?: string;
    created_at: string;
    updated_at: string;
}

export interface DatabaseCustomOrder {
    id: string;
    user_id?: string;
    title: string;
    description: string;
    requirements?: any;
    estimated_price?: number;
    final_price?: number;
    status: string;
    admin_notes?: string;
    images?: any;
    created_at: string;
    updated_at: string;
}

export interface DatabaseServiceRequest {
    id: string;
    user_id?: string;
    category_id: string;
    title: string;
    description: string;
    location?: any;
    preferred_date?: string;
    status: string;
    assigned_worker_id?: string;
    estimated_cost?: number;
    final_cost?: number;
    images?: any;
    admin_notes?: string;
    created_at: string;
    updated_at: string;
}

export interface DatabaseWorker {
    id: string;
    name: string;
    phone: string;
    category_id: string;
    is_available: boolean;
    rating: number;
    total_jobs: number;
    metadata?: any;
    created_at: string;
    updated_at: string;
}

export interface DatabaseSettings {
    key: string;
    value: any;
    description?: string;
    updated_at: string;
}
