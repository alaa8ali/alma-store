const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

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

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function verifyImages() {
  console.log('🔍 التحقق من إضافة الصور...\n');
  
  // التحقق من الفروع
  console.log('📦 الفروع:');
  const { data: branches, error: branchesError } = await supabase
    .from('branches')
    .select('id, name_ar, image');
  
  if (branchesError) {
    console.error('❌ خطأ:', branchesError.message);
  } else {
    branches.forEach(b => {
      const status = b.image ? '✅' : '❌';
      console.log(`${status} ${b.name_ar}: ${b.image ? 'موجودة' : 'غير موجودة'}`);
    });
  }
  
  // التحقق من الفئات
  console.log('\n📂 الفئات:');
  const { data: categories, error: categoriesError } = await supabase
    .from('categories')
    .select('id, name_ar, image');
  
  if (categoriesError) {
    console.error('❌ خطأ:', categoriesError.message);
  } else {
    const withImages = categories.filter(c => c.image);
    console.log(`✅ ${withImages.length} من ${categories.length} فئة لديها صور`);
    
    categories.slice(0, 5).forEach(c => {
      const status = c.image ? '✅' : '❌';
      console.log(`${status} ${c.name_ar}: ${c.image ? 'موجودة' : 'غير موجودة'}`);
    });
  }
}

verifyImages();
