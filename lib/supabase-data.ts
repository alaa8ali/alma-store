import { supabase } from '@/lib/supabase';

export interface Branch {
  id: string;
  name_ar: string;
  name_en: string;
  icon: string;
  description_ar?: string;
  description_en?: string;
  image?: string;
  display_order: number;
}

export interface Category {
  id: string;
  branch_id: string;
  name_ar: string;
  name_en: string;
  icon: string;
  description_ar?: string;
  description_en?: string;
  image?: string;
  display_order: number;
}

// Cache للبيانات
let branchesCache: Branch[] | null = null;
let categoriesCache: Category[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 دقائق

/**
 * جلب جميع الفروع من قاعدة البيانات
 */
export async function fetchBranches(): Promise<Branch[]> {
  // استخدام الكاش إذا كان موجوداً وصالحاً
  const now = Date.now();
  if (branchesCache && (now - cacheTimestamp < CACHE_DURATION)) {
    return branchesCache;
  }

  try {
    const { data, error } = await supabase
      .from('branches')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching branches:', error);
      return [];
    }

    branchesCache = data || [];
    cacheTimestamp = now;
    return branchesCache;
  } catch (error) {
    console.error('Error fetching branches:', error);
    return [];
  }
}

/**
 * جلب جميع الفئات من قاعدة البيانات
 */
export async function fetchCategories(): Promise<Category[]> {
  // استخدام الكاش إذا كان موجوداً وصالحاً
  const now = Date.now();
  if (categoriesCache && (now - cacheTimestamp < CACHE_DURATION)) {
    return categoriesCache;
  }

  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    categoriesCache = data || [];
    cacheTimestamp = now;
    return categoriesCache;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * جلب الفئات الخاصة بفرع معين
 */
export async function fetchCategoriesByBranch(branchId: string): Promise<Category[]> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('branch_id', branchId)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching categories by branch:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching categories by branch:', error);
    return [];
  }
}

/**
 * جلب فرع محدد بواسطة ID
 */
export async function fetchBranchById(id: string): Promise<Branch | null> {
  try {
    const { data, error } = await supabase
      .from('branches')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching branch:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching branch:', error);
    return null;
  }
}

/**
 * مسح الكاش
 */
export function clearCache() {
  branchesCache = null;
  categoriesCache = null;
  cacheTimestamp = 0;
}

