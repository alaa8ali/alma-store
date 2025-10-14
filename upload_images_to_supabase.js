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

async function uploadImages() {
  try {
    console.log('🚀 بدء رفع الصور إلى Supabase Storage...\n');

    // إنشاء bucket إذا لم يكن موجوداً
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('❌ خطأ في قراءة buckets:', listError);
      throw listError;
    }

    const bucketExists = buckets.some(b => b.name === 'images');
    
    if (!bucketExists) {
      console.log('📦 إنشاء bucket جديد: images');
      const { error: createError } = await supabase.storage.createBucket('images', {
        public: true,
        fileSizeLimit: 5242880 // 5MB
      });
      
      if (createError) {
        console.error('❌ خطأ في إنشاء bucket:', createError);
        throw createError;
      }
      console.log('✅ تم إنشاء bucket بنجاح\n');
    } else {
      console.log('✅ bucket موجود مسبقاً\n');
    }

    // رفع صور الفروع
    console.log('📤 رفع صور الفروع...');
    const branchesDir = path.join(__dirname, 'supabase-images', 'branches');
    const branchFiles = fs.readdirSync(branchesDir);

    for (const file of branchFiles) {
      const filePath = path.join(branchesDir, file);
      const fileBuffer = fs.readFileSync(filePath);
      const fileName = `branches/${file}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, fileBuffer, {
          contentType: 'image/jpeg',
          upsert: true
        });

      if (uploadError) {
        console.error(`❌ خطأ في رفع ${file}:`, uploadError);
      } else {
        console.log(`✅ تم رفع: ${file}`);
      }
    }

    // رفع صور الفئات
    console.log('\n📤 رفع صور الفئات...');
    const categoriesDir = path.join(__dirname, 'supabase-images', 'categories');
    const categoryFiles = fs.readdirSync(categoriesDir);

    for (const file of categoryFiles) {
      const filePath = path.join(categoriesDir, file);
      const fileBuffer = fs.readFileSync(filePath);
      const fileName = `categories/${file}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, fileBuffer, {
          contentType: 'image/jpeg',
          upsert: true
        });

      if (uploadError) {
        console.error(`❌ خطأ في رفع ${file}:`, uploadError);
      } else {
        console.log(`✅ تم رفع: ${file}`);
      }
    }

    console.log('\n🎉 تم رفع جميع الصور بنجاح!');
    console.log('\n📋 روابط الصور:');
    console.log(`   Base URL: ${supabaseUrl}/storage/v1/object/public/images/`);

  } catch (error) {
    console.error('❌ حدث خطأ:', error);
    process.exit(1);
  }
}

uploadImages();

