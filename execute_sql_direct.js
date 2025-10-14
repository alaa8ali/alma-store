const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// قراءة متغيرات البيئة
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

const envVars = {};
envContent.split('\n').forEach(line => {
  if (line && !line.startsWith('#')) {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      envVars[key.trim()] = valueParts.join('=').trim();
    }
  }
});

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = envVars.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ لم يتم العثور على متغيرات البيئة المطلوبة');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function executeSQLDirectly() {
  try {
    console.log('🔧 تنفيذ استعلامات SQL...\n');

    const baseImageUrl = `${supabaseUrl}/storage/v1/object/public/images`;

    // تحديث الفروع مع الصور (بدون إضافة العمود لأنه قد يكون موجوداً)
    console.log('📦 تحديث الفروع مع الصور...');
    
    const branchesData = [
      { id: 'store', image: `${baseImageUrl}/branches/store.jpg`, description_ar: 'جميع المنتجات الاستهلاكية والمواد الغذائية', description_en: 'All consumer products and groceries' },
      { id: 'home-maintenance', image: `${baseImageUrl}/branches/home-maintenance.jpg`, description_ar: 'خدمات صيانة وإصلاح المنازل الشاملة', description_en: 'Comprehensive home repair and maintenance services' },
      { id: 'kitchen', image: `${baseImageUrl}/branches/kitchen.jpg`, description_ar: 'طلبات الطعام المخصصة والوجبات اليومية الطازجة', description_en: 'Custom food orders and fresh daily meals' },
      { id: 'sweets-bakery', image: `${baseImageUrl}/branches/sweets-bakery.jpg`, description_ar: 'حلويات شرقية وغربية ومخبوزات طازجة يومياً', description_en: 'Oriental and western sweets with fresh daily baked goods' }
    ];

    for (const branch of branchesData) {
      const { error } = await supabase
        .from('branches')
        .update({ 
          image: branch.image,
          description_ar: branch.description_ar,
          description_en: branch.description_en
        })
        .eq('id', branch.id);
      
      if (error) {
        console.error(`❌ خطأ في تحديث ${branch.id}:`, error.message);
      } else {
        console.log(`✅ تم تحديث: ${branch.id}`);
      }
    }

    // تحديث الفئات مع الصور
    console.log('\n📂 تحديث الفئات مع الصور...');
    
    const categoriesData = [
      { id: 'drinks', image: `${baseImageUrl}/categories/drinks.jpg`, description_ar: 'مشروبات غازية، عصائر، ومشروبات طاقة', description_en: 'Soft drinks, juices, and energy drinks' },
      { id: 'sweets', image: `${baseImageUrl}/categories/sweets.jpg`, description_ar: 'شوكولاتة، حلوى، وسكاكر متنوعة', description_en: 'Chocolates, candies, and assorted sweets' },
      { id: 'biscuits', image: `${baseImageUrl}/categories/biscuits.jpg`, description_ar: 'بسكويت، كوكيز، ومقرمشات', description_en: 'Biscuits, cookies, and crackers' },
      { id: 'cleaning', image: `${baseImageUrl}/categories/cleaning.jpg`, description_ar: 'منظفات ومواد تنظيف منزلية', description_en: 'Cleaning supplies and household products' },
      { id: 'oriental-sweets', image: `${baseImageUrl}/categories/oriental-sweets.jpg`, description_ar: 'بقلاوة، كنافة، ومعمول', description_en: 'Baklava, kunafa, and maamoul' },
      { id: 'western-sweets', image: `${baseImageUrl}/categories/western-sweets.jpg`, description_ar: 'كيك، تارت، وإكلير', description_en: 'Cakes, tarts, and eclairs' }
    ];

    for (const category of categoriesData) {
      const { error } = await supabase
        .from('categories')
        .update({ 
          image: category.image,
          description_ar: category.description_ar,
          description_en: category.description_en
        })
        .eq('id', category.id);
      
      if (error) {
        console.error(`❌ خطأ في تحديث ${category.id}:`, error.message);
      } else {
        console.log(`✅ تم تحديث: ${category.id}`);
      }
    }

    console.log('\n🎉 تم تحديث جميع البيانات بنجاح!');
    console.log('\n📋 ملاحظة: إذا ظهرت أخطاء بسبب عدم وجود عمود image،');
    console.log('   يرجى تنفيذ الاستعلام التالي في Supabase SQL Editor:');
    console.log('\n   ALTER TABLE branches ADD COLUMN IF NOT EXISTS image TEXT;');
    console.log('   ALTER TABLE categories ADD COLUMN IF NOT EXISTS image TEXT;');

  } catch (error) {
    console.error('❌ حدث خطأ:', error);
    process.exit(1);
  }
}

executeSQLDirectly();

