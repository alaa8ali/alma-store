const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://yqnvdurconsjesnampmj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxbnZkdXJjb25zamVzbmFtcG1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2ODM2NTgsImV4cCI6MjA0NDI1OTY1OH0.3rD8dYRbPLkCOp9KPq6_hUWPTJGHPfSCwkYKjxCjqHk';

console.log('🔍 اختبار الاتصال بـ Supabase...\n');
console.log('URL:', supabaseUrl);
console.log('Anon Key (first 50 chars):', supabaseAnonKey.substring(0, 50) + '...\n');

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
      console.log('   Status:', error.status);
      console.log('   التفاصيل الكاملة:', JSON.stringify(error, null, 2));
    } else {
      console.log('✅ تسجيل الدخول نجح!');
      console.log('   المستخدم:', data.user?.email);
      console.log('   UID:', data.user?.id);
    }
  } catch (err) {
    console.log('❌ خطأ في الاتصال:', err.message);
    console.log('   التفاصيل:', err);
  }
}

testConnection();

