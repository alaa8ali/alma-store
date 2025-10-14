#!/bin/bash

# قراءة متغيرات البيئة
source .env.local

# استعلامات SQL
SQL_QUERY="
ALTER TABLE branches ADD COLUMN IF NOT EXISTS image TEXT;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS image TEXT;

UPDATE branches SET image = 'https://yqnvdurconsjesnampmj.supabase.co/storage/v1/object/public/images/branches/store.jpg' WHERE id = 'store';
UPDATE branches SET image = 'https://yqnvdurconsjesnampmj.supabase.co/storage/v1/object/public/images/branches/home-maintenance.jpg' WHERE id = 'home-maintenance';
UPDATE branches SET image = 'https://yqnvdurconsjesnampmj.supabase.co/storage/v1/object/public/images/branches/kitchen.jpg' WHERE id = 'kitchen';
UPDATE branches SET image = 'https://yqnvdurconsjesnampmj.supabase.co/storage/v1/object/public/images/branches/sweets-bakery.jpg' WHERE id = 'sweets-bakery';

UPDATE categories SET image = 'https://yqnvdurconsjesnampmj.supabase.co/storage/v1/object/public/images/categories/drinks.jpg' WHERE id = 'drinks';
UPDATE categories SET image = 'https://yqnvdurconsjesnampmj.supabase.co/storage/v1/object/public/images/categories/sweets.jpg' WHERE id = 'sweets';
UPDATE categories SET image = 'https://yqnvdurconsjesnampmj.supabase.co/storage/v1/object/public/images/categories/biscuits.jpg' WHERE id = 'biscuits';
UPDATE categories SET image = 'https://yqnvdurconsjesnampmj.supabase.co/storage/v1/object/public/images/categories/cleaning.jpg' WHERE id = 'cleaning';
UPDATE categories SET image = 'https://yqnvdurconsjesnampmj.supabase.co/storage/v1/object/public/images/categories/oriental-sweets.jpg' WHERE id = 'oriental-sweets';
UPDATE categories SET image = 'https://yqnvdurconsjesnampmj.supabase.co/storage/v1/object/public/images/categories/western-sweets.jpg' WHERE id = 'western-sweets';
"

echo "🔧 تنفيذ استعلامات SQL..."

# تنفيذ الاستعلام عبر HTTP
curl -X POST "${NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/exec" \
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Content-Type: application/json" \
  -d "{\"query\": \"${SQL_QUERY}\"}"

echo ""
echo "✅ تم إرسال الاستعلامات"

