const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

const supabaseUrl = 'https://yqnvdurconsjesnampmj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxbnZkdXJjb25zamVzbmFtcG1qIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjE2NDk2NSwiZXhwIjoyMDcxNzQwOTY1fQ.tBVWl8UhcLHNZJTU5jmfc0iLEAbdFFc2C9A7OkBfaNY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdmin() {
  try {
    // Check if admin exists
    const { data: existingAdmins, error: checkError } = await supabase
      .from('admin_users')
      .select('*');

    if (checkError) {
      console.error('Error checking admins:', checkError);
      return;
    }

    console.log('Existing admins:', existingAdmins);

    if (existingAdmins && existingAdmins.length > 0) {
      console.log('Admin already exists!');
      return;
    }

    // Create new admin
    const username = 'admin';
    const password = 'Admin@2025';
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from('admin_users')
      .insert([
        {
          username,
          password_hash: hashedPassword
        }
      ])
      .select();

    if (error) {
      console.error('Error creating admin:', error);
      return;
    }

    console.log('✅ Admin created successfully!');
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Data:', data);
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

createAdmin();

