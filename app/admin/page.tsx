import { createClient } from '@/lib/supabase/server';
import AdminPanelClient from './AdminPanelClient';
import { Product } from '@/lib/products'; // We'll need to adjust this type

// Define a more accurate type for the data we fetch
export type ProductWithCategory = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  stock: number;
  sku: string | null;
  category_id: string | null;
  categories: {
    id: string;
    name: string;
  } | null;
};

export default async function AdminPage() {
  const supabase = createClient();

  // Fetch initial data from Supabase
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select(`
      *,
      categories (
        id,
        name
      )
    `)
    .order('created_at', { ascending: false });

  const { data: categories, error: categoriesError } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (productsError) console.error('Error fetching products:', productsError.message);
  if (categoriesError) console.error('Error fetching categories:', categoriesError.message);

  return (
    <AdminPanelClient
      serverProducts={products || []}
      serverCategories={categories || []}
    />
  );
}