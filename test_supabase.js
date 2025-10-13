const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://yqnvdurconsjesnampmj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxbnZkdXJjb25zamVzbmFtcG1qIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjE2NDk2NSwiZXhwIjoyMDcxNzQwOTY1fQ.tBVWl8UhcLHNZJTU5jmfc0iLEAbdFFc2C9A7OkBfaNY'
);

async function test() {
  try {
    console.log('Testing Supabase connection...');
    
    const { data, error } = await supabase
      .from('admin_users')
      .select('id');
    
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Success! Data:', data);
      console.log('Number of admins:', data.length);
    }
  } catch (err) {
    console.error('Exception:', err);
  }
}

test();

