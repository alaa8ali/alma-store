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

async function addImageColumns() {
  try {
    console.log('🔧 إضافة أعمدة الصور إلى الجداول...\n');

    // إضافة عمود image إلى جدول branches
    console.log('📦 إضافة عمود image إلى جدول branches...');
    const { error: branchesError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE branches ADD COLUMN IF NOT EXISTS image TEXT;'
    });

    if (branchesError) {
      console.log('⚠️  سنحاول طريقة أخرى...');
      // محاولة باستخدام SQL مباشر
      const { error: error1 } = await supabase
        .from('branches')
        .select('image')
        .limit(1);
      
      if (error1 && error1.code === 'PGRST204') {
        console.log('✅ يجب إضافة العمود يدوياً في Supabase Dashboard');
        console.log('   الانتقال إلى: Table Editor > branches > Add Column');
        console.log('   اسم العمود: image');
        console.log('   النوع: text');
      }
    } else {
      console.log('✅ تم إضافة عمود image إلى branches');
    }

    // إضافة عمود image إلى جدول categories
    console.log('\n📂 إضافة عمود image إلى جدول categories...');
    const { error: categoriesError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE categories ADD COLUMN IF NOT EXISTS image TEXT;'
    });

    if (categoriesError) {
      console.log('⚠️  سنحاول طريقة أخرى...');
      const { error: error2 } = await supabase
        .from('categories')
        .select('image')
        .limit(1);
      
      if (error2 && error2.code === 'PGRST204') {
        console.log('✅ يجب إضافة العمود يدوياً في Supabase Dashboard');
        console.log('   الانتقال إلى: Table Editor > categories > Add Column');
        console.log('   اسم العمود: image');
        console.log('   النوع: text');
      }
    } else {
      console.log('✅ تم إضافة عمود image إلى categories');
    }

    console.log('\n📋 استعلامات SQL للتنفيذ في Supabase SQL Editor:');
    console.log('\n-- إضافة عمود image إلى branches');
    console.log('ALTER TABLE branches ADD COLUMN IF NOT EXISTS image TEXT;');
    console.log('\n-- إضافة عمود image إلى categories');
    console.log('ALTER TABLE categories ADD COLUMN IF NOT EXISTS image TEXT;');

  } catch (error) {
    console.error('❌ حدث خطأ:', error);
  }
}

addImageColumns();

