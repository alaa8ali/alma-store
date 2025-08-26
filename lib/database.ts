import { supabase, supabaseAdmin, DatabaseProduct, DatabaseVariant, DatabaseCategory } from './supabase';
import { Product, ProductVariant, Category } from './products';

// Convert database product to app product format
export function convertDatabaseProduct(dbProduct: DatabaseProduct, variants?: DatabaseVariant[]): Product {
  const convertedVariants = variants?.map(variant => ({
    id: variant.id,
    nameAr: variant.name_ar,
    nameEn: variant.name_en,
    price: variant.price,
    image: variant.image,
    available: variant.available
  }));

  return {
    id: dbProduct.id,
    nameAr: dbProduct.name_ar,
    nameEn: dbProduct.name_en,
    category: dbProduct.category,
    price: dbProduct.price,
    unit: dbProduct.unit,
    image: dbProduct.image,
    available: dbProduct.available,
    variants: convertedVariants
  };
}

// Convert app product to database format
export function convertToDatabase(product: Product): Omit<DatabaseProduct, 'created_at' | 'updated_at'> {
  return {
    id: product.id,
    name_ar: product.nameAr,
    name_en: product.nameEn,
    category: product.category,
    price: product.price,
    unit: product.unit,
    image: product.image,
    available: product.available
  };
}

// Fetch all products with variants
export async function fetchProducts(): Promise<Product[]> {
  if (!supabase) {
    console.warn('Supabase not configured, returning empty products array');
    return [];
  }

  try {
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (productsError) throw productsError;

    const { data: variants, error: variantsError } = await supabase
      .from('product_variants')
      .select('*');

    if (variantsError) throw variantsError;

    return products.map(product => {
      const productVariants = variants.filter(v => v.product_id === product.id);
      return convertDatabaseProduct(product, productVariants);
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Fetch categories
export async function fetchCategories(): Promise<Category[]> {
  if (!supabase) {
    console.warn('Supabase not configured, returning empty categories array');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name_ar');

    if (error) throw error;

    return data.map(cat => ({
      id: cat.id,
      nameAr: cat.name_ar,
      nameEn: cat.name_en,
      icon: cat.icon
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Admin functions (using service role key)
export async function createProduct(product: Omit<Product, 'id'>): Promise<{ success: boolean; error?: string }> {
  if (!supabaseAdmin) {
    return { success: false, error: 'Supabase admin client not configured' };
  }

  try {
    const productId = `product_${Date.now()}`;
    const dbProduct = {
      ...convertToDatabase({ ...product, id: productId }),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { error: productError } = await supabaseAdmin
      .from('products')
      .insert([dbProduct]);

    if (productError) throw productError;

    // Insert variants if any
    if (product.variants && product.variants.length > 0) {
      const dbVariants = product.variants.map(variant => ({
        id: `variant_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        product_id: productId,
        name_ar: variant.nameAr,
        name_en: variant.nameEn,
        price: variant.price,
        image: variant.image,
        available: variant.available,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));

      const { error: variantsError } = await supabaseAdmin
        .from('product_variants')
        .insert(dbVariants);

      if (variantsError) throw variantsError;
    }

    return { success: true };
  } catch (error) {
    console.error('Error creating product:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function updateProduct(product: Product): Promise<{ success: boolean; error?: string }> {
  if (!supabaseAdmin) {
    return { success: false, error: 'Supabase admin client not configured' };
  }

  try {
    const dbProduct = {
      ...convertToDatabase(product),
      updated_at: new Date().toISOString()
    };

    const { error: productError } = await supabaseAdmin
      .from('products')
      .update(dbProduct)
      .eq('id', product.id);

    if (productError) throw productError;

    // Delete existing variants
    await supabaseAdmin
      .from('product_variants')
      .delete()
      .eq('product_id', product.id);

    // Insert new variants if any
    if (product.variants && product.variants.length > 0) {
      const dbVariants = product.variants.map(variant => ({
        id: variant.id.startsWith('variant_') ? variant.id : `variant_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        product_id: product.id,
        name_ar: variant.nameAr,
        name_en: variant.nameEn,
        price: variant.price,
        image: variant.image,
        available: variant.available,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));

      const { error: variantsError } = await supabaseAdmin
        .from('product_variants')
        .insert(dbVariants);

      if (variantsError) throw variantsError;
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating product:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function deleteProduct(productId: string): Promise<{ success: boolean; error?: string }> {
  if (!supabaseAdmin) {
    return { success: false, error: 'Supabase admin client not configured' };
  }

  try {
    // Delete variants first
    await supabaseAdmin
      .from('product_variants')
      .delete()
      .eq('product_id', productId);

    // Delete product
    const { error } = await supabaseAdmin
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error deleting product:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Upload image to Supabase Storage
export async function uploadImage(file: File, folder: string = 'products'): Promise<{ success: boolean; url?: string; error?: string }> {
  if (!supabaseAdmin) {
    return { success: false, error: 'Supabase admin client not configured' };
  }

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

    const { data, error } = await supabaseAdmin.storage
      .from('product-images')
      .upload(fileName, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('product-images')
      .getPublicUrl(fileName);

    return { success: true, url: publicUrl };
  } catch (error) {
    console.error('Error uploading image:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}