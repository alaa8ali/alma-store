const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '/home/ubuntu/alma-store/.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔍 اختبار الاتصال بـ Supabase...\n');
console.log('URL:', supabaseUrl);
console.log('Anon Key (first 50 chars):', supabaseAnonKey?.substring(0, 50) + '...\n');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// اختبار الاتصال
async function testConnection() {
  try {
    console.log('📡 محاولة الاتصال...');
    
    // محاولة تسجيل الدخول
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'alaa4mange1@gmail.com',
      password: 'TestPassword123'
    });
    
    if (error) {
      console.log('❌ خطأ في تسجيل الدخول:', error.message);
      console.log('   التفاصيل:', error);
    } else {
      console.log('✅ تسجيل الدخول نجح!');
      console.log('   المستخدم:', data.user?.email);
    }
  } catch (err) {
    console.log('❌ خطأ في الاتصال:', err.message);
  }
}

testConnection();

