-- ====================================
-- إضافة أعمدة الصور إلى الجداول
-- ====================================

-- إضافة عمود image إلى جدول branches
ALTER TABLE branches ADD COLUMN IF NOT EXISTS image TEXT;

-- إضافة عمود image إلى جدول categories  
ALTER TABLE categories ADD COLUMN IF NOT EXISTS image TEXT;

-- تحديث الفروع مع الصور
UPDATE branches SET image = 'https://yqnvdurconsjesnampmj.supabase.co/storage/v1/object/public/images/branches/store.jpg' WHERE id = 'store';
UPDATE branches SET image = 'https://yqnvdurconsjesnampmj.supabase.co/storage/v1/object/public/images/branches/home-maintenance.jpg' WHERE id = 'home-maintenance';
UPDATE branches SET image = 'https://yqnvdurconsjesnampmj.supabase.co/storage/v1/object/public/images/branches/kitchen.jpg' WHERE id = 'kitchen';
UPDATE branches SET image = 'https://yqnvdurconsjesnampmj.supabase.co/storage/v1/object/public/images/branches/sweets-bakery.jpg' WHERE id = 'sweets-bakery';

-- تحديث الفئات مع الصور
UPDATE categories SET image = 'https://yqnvdurconsjesnampmj.supabase.co/storage/v1/object/public/images/categories/drinks.jpg' WHERE id = 'drinks';
UPDATE categories SET image = 'https://yqnvdurconsjesnampmj.supabase.co/storage/v1/object/public/images/categories/sweets.jpg' WHERE id = 'sweets';
UPDATE categories SET image = 'https://yqnvdurconsjesnampmj.supabase.co/storage/v1/object/public/images/categories/biscuits.jpg' WHERE id = 'biscuits';
UPDATE categories SET image = 'https://yqnvdurconsjesnampmj.supabase.co/storage/v1/object/public/images/categories/cleaning.jpg' WHERE id = 'cleaning';
UPDATE categories SET image = 'https://yqnvdurconsjesnampmj.supabase.co/storage/v1/object/public/images/categories/oriental-sweets.jpg' WHERE id = 'oriental-sweets';
UPDATE categories SET image = 'https://yqnvdurconsjesnampmj.supabase.co/storage/v1/object/public/images/categories/western-sweets.jpg' WHERE id = 'western-sweets';

