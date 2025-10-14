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

const baseImageUrl = `${supabaseUrl}/storage/v1/object/public/images`;

async function seedData() {
  try {
    console.log('🌱 بدء إدخال البيانات الأولية...\n');

    // 1. تحديث الفروع مع الصور
    console.log('📦 تحديث الفروع...');
    const branches = [
      {
        id: 'store',
        name_ar: 'المتجر',
        name_en: 'Store',
        icon: '🛒',
        description_ar: 'جميع المنتجات الاستهلاكية والمواد الغذائية',
        description_en: 'All consumer products and groceries',
        image: `${baseImageUrl}/branches/store.jpg`,
        display_order: 1
      },
      {
        id: 'home-maintenance',
        name_ar: 'صيانة المنازل',
        name_en: 'Home Maintenance',
        icon: '🔧',
        description_ar: 'خدمات صيانة وإصلاح المنازل الشاملة',
        description_en: 'Comprehensive home repair and maintenance services',
        image: `${baseImageUrl}/branches/home-maintenance.jpg`,
        display_order: 2
      },
      {
        id: 'kitchen',
        name_ar: 'المطبخ',
        name_en: 'Kitchen',
        icon: '👨‍🍳',
        description_ar: 'طلبات الطعام المخصصة والوجبات اليومية الطازجة',
        description_en: 'Custom food orders and fresh daily meals',
        image: `${baseImageUrl}/branches/kitchen.jpg`,
        display_order: 3
      },
      {
        id: 'sweets-bakery',
        name_ar: 'الحلويات والمخبوزات',
        name_en: 'Sweets & Bakery',
        icon: '🍰',
        description_ar: 'حلويات شرقية وغربية ومخبوزات طازجة يومياً',
        description_en: 'Oriental and western sweets with fresh daily baked goods',
        image: `${baseImageUrl}/branches/sweets-bakery.jpg`,
        display_order: 4
      }
    ];

    for (const branch of branches) {
      const { error } = await supabase
        .from('branches')
        .upsert(branch, { onConflict: 'id' });
      
      if (error) {
        console.error(`❌ خطأ في تحديث الفرع ${branch.name_ar}:`, error);
      } else {
        console.log(`✅ تم تحديث: ${branch.name_ar}`);
      }
    }

    // 2. تحديث الفئات مع الصور
    console.log('\n📂 تحديث الفئات...');
    const categories = [
      // فئات المتجر
      {
        id: 'drinks',
        branch_id: 'store',
        name_ar: 'مشروبات',
        name_en: 'Drinks',
        icon: '🥤',
        description_ar: 'مشروبات غازية، عصائر، ومشروبات طاقة',
        description_en: 'Soft drinks, juices, and energy drinks',
        image: `${baseImageUrl}/categories/drinks.jpg`,
        display_order: 1
      },
      {
        id: 'sweets',
        branch_id: 'store',
        name_ar: 'حلويات',
        name_en: 'Sweets',
        icon: '🍬',
        description_ar: 'شوكولاتة، حلوى، وسكاكر متنوعة',
        description_en: 'Chocolates, candies, and assorted sweets',
        image: `${baseImageUrl}/categories/sweets.jpg`,
        display_order: 2
      },
      {
        id: 'biscuits',
        branch_id: 'store',
        name_ar: 'بسكويت',
        name_en: 'Biscuits',
        icon: '🍪',
        description_ar: 'بسكويت، كوكيز، ومقرمشات',
        description_en: 'Biscuits, cookies, and crackers',
        image: `${baseImageUrl}/categories/biscuits.jpg`,
        display_order: 3
      },
      {
        id: 'cleaning',
        branch_id: 'store',
        name_ar: 'منظفات',
        name_en: 'Cleaning',
        icon: '🧽',
        description_ar: 'منظفات ومواد تنظيف منزلية',
        description_en: 'Cleaning supplies and household products',
        image: `${baseImageUrl}/categories/cleaning.jpg`,
        display_order: 4
      },
      {
        id: 'food',
        branch_id: 'store',
        name_ar: 'مواد غذائية',
        name_en: 'Food',
        icon: '🥫',
        description_ar: 'معلبات، أرز، معكرونة، وبقوليات',
        description_en: 'Canned goods, rice, pasta, and legumes',
        display_order: 5
      },
      // فئات الصيانة
      {
        id: 'plumbing',
        branch_id: 'home-maintenance',
        name_ar: 'السباكة',
        name_en: 'Plumbing',
        icon: '🚰',
        description_ar: 'إصلاح وتركيب الأنابيب والصنابير',
        description_en: 'Pipe and faucet repair and installation',
        display_order: 1
      },
      {
        id: 'electrical',
        branch_id: 'home-maintenance',
        name_ar: 'الكهرباء',
        name_en: 'Electrical',
        icon: '💡',
        description_ar: 'صيانة كهربائية وتركيب إنارة',
        description_en: 'Electrical maintenance and lighting installation',
        display_order: 2
      },
      {
        id: 'cleaning-services',
        branch_id: 'home-maintenance',
        name_ar: 'النظافة',
        name_en: 'Cleaning Services',
        icon: '🧹',
        description_ar: 'خدمات تنظيف شاملة للمنازل',
        description_en: 'Comprehensive house cleaning services',
        display_order: 3
      },
      {
        id: 'carpentry',
        branch_id: 'home-maintenance',
        name_ar: 'النجارة',
        name_en: 'Carpentry',
        icon: '🪚',
        description_ar: 'أعمال النجارة والأثاث',
        description_en: 'Carpentry and furniture work',
        display_order: 4
      },
      {
        id: 'painting',
        branch_id: 'home-maintenance',
        name_ar: 'الدهان',
        name_en: 'Painting',
        icon: '🎨',
        description_ar: 'دهان الجدران والديكور',
        description_en: 'Wall painting and decoration',
        display_order: 5
      },
      // فئات المطبخ
      {
        id: 'daily-menu',
        branch_id: 'kitchen',
        name_ar: 'القائمة اليومية',
        name_en: 'Daily Menu',
        icon: '📋',
        description_ar: 'وجبات يومية طازجة',
        description_en: 'Fresh daily meals',
        display_order: 1
      },
      {
        id: 'custom-orders',
        branch_id: 'kitchen',
        name_ar: 'طلبات مخصصة',
        name_en: 'Custom Orders',
        icon: '✨',
        description_ar: 'اطلب وجبتك المخصصة',
        description_en: 'Order your custom meal',
        display_order: 2
      },
      // فئات الحلويات
      {
        id: 'oriental-sweets',
        branch_id: 'sweets-bakery',
        name_ar: 'حلويات شرقية',
        name_en: 'Oriental Sweets',
        icon: '🧁',
        description_ar: 'بقلاوة، كنافة، ومعمول',
        description_en: 'Baklava, kunafa, and maamoul',
        image: `${baseImageUrl}/categories/oriental-sweets.jpg`,
        display_order: 1
      },
      {
        id: 'western-sweets',
        branch_id: 'sweets-bakery',
        name_ar: 'حلويات غربية',
        name_en: 'Western Sweets',
        icon: '🍰',
        description_ar: 'كيك، تارت، وإكلير',
        description_en: 'Cakes, tarts, and eclairs',
        image: `${baseImageUrl}/categories/western-sweets.jpg`,
        display_order: 2
      },
      {
        id: 'cakes',
        branch_id: 'sweets-bakery',
        name_ar: 'كيك',
        name_en: 'Cakes',
        icon: '🎂',
        description_ar: 'كيك للمناسبات والأعياد',
        description_en: 'Cakes for occasions and celebrations',
        display_order: 3
      },
      {
        id: 'pastries',
        branch_id: 'sweets-bakery',
        name_ar: 'معجنات',
        name_en: 'Pastries',
        icon: '🥐',
        description_ar: 'معجنات طازجة يومياً',
        description_en: 'Fresh daily pastries',
        display_order: 4
      },
      {
        id: 'bread',
        branch_id: 'sweets-bakery',
        name_ar: 'خبز',
        name_en: 'Bread',
        icon: '🍞',
        description_ar: 'خبز طازج بأنواعه',
        description_en: 'Fresh bread varieties',
        display_order: 5
      }
    ];

    for (const category of categories) {
      const { error } = await supabase
        .from('categories')
        .upsert(category, { onConflict: 'id' });
      
      if (error) {
        console.error(`❌ خطأ في تحديث الفئة ${category.name_ar}:`, error);
      } else {
        console.log(`✅ تم تحديث: ${category.name_ar}`);
      }
    }

    console.log('\n🎉 تم إدخال جميع البيانات بنجاح!');
    console.log('\n📊 الإحصائيات:');
    console.log(`   - الفروع: ${branches.length}`);
    console.log(`   - الفئات: ${categories.length}`);
    console.log(`\n🔗 رابط الصور: ${baseImageUrl}`);

  } catch (error) {
    console.error('❌ حدث خطأ:', error);
    process.exit(1);
  }
}

seedData();

