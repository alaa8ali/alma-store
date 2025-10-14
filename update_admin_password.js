const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

// قراءة متغيرات البيئة من ملف .env.local
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

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ لم يتم العثور على متغيرات البيئة المطلوبة');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function updateAdminPassword() {
  try {
    console.log('🔄 جارٍ تحديث كلمة مرور المشرف...');

    // كلمة المرور الجديدة
    const newPassword = 'ali98myoo';
    const username = 'admin'; // اسم المستخدم الافتراضي

    // تشفير كلمة المرور الجديدة
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    console.log('✅ تم تشفير كلمة المرور الجديدة');

    // التحقق من وجود المستخدم
    const { data: existingUser, error: checkError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('username', username)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('❌ خطأ في التحقق من المستخدم:', checkError);
      throw checkError;
    }

    if (existingUser) {
      // تحديث كلمة المرور للمستخدم الموجود
      const { error: updateError } = await supabase
        .from('admin_users')
        .update({ password_hash: hashedPassword })
        .eq('username', username);

      if (updateError) {
        console.error('❌ خطأ في تحديث كلمة المرور:', updateError);
        throw updateError;
      }

      console.log('✅ تم تحديث كلمة المرور بنجاح للمستخدم:', username);
    } else {
      // إنشاء مستخدم جديد
      const { error: insertError } = await supabase
        .from('admin_users')
        .insert([
          {
            username: username,
            password_hash: hashedPassword,
            role: 'super_admin',
            is_active: true
          }
        ]);

      if (insertError) {
        console.error('❌ خطأ في إنشاء المستخدم:', insertError);
        throw insertError;
      }

      console.log('✅ تم إنشاء مستخدم جديد:', username);
    }

    // عرض معلومات تسجيل الدخول
    console.log('\n📋 معلومات تسجيل الدخول:');
    console.log('   اسم المستخدم: admin');
    console.log('   كلمة المرور: ali98myoo');
    console.log('\n✅ العملية اكتملت بنجاح!');

  } catch (error) {
    console.error('❌ حدث خطأ:', error);
    process.exit(1);
  }
}

updateAdminPassword();

