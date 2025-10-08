#!/usr/bin/env python3
"""
Migrate existing products data to Supabase
"""

import json
from supabase import create_client, Client

# Supabase credentials
SUPABASE_URL = "https://yqnvdurconsjesnampqj.supabase.co"
SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxbnZkdXJjb25zamVzbmFtcG1qIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjE2NDk2NSwiZXhwIjoyMDcxNzQwOTY1fQ.tBVWl8UhcLHNZJTU5jmfc0iLEAbdFFc2C9A7OkBfaNY"

# Sample products data (from lib/products.ts)
products_data = [
    {
        'id': 'pepsi-can',
        'category_id': 'drinks',
        'name_ar': 'بيبسي علبة',
        'name_en': 'Pepsi Can',
        'price': 750,
        'unit': 'piece',
        'image': 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg',
        'stock': 100,
        'is_available': True
    },
    {
        'id': 'water-bottle',
        'category_id': 'drinks',
        'name_ar': 'مياه معبأة',
        'name_en': 'Water Bottle',
        'price': 300,
        'unit': 'piece',
        'image': 'https://images.pexels.com/photos/327090/pexels-photo-327090.jpeg',
        'stock': 200,
        'is_available': True
    },
    {
        'id': 'juice-box',
        'category_id': 'drinks',
        'name_ar': 'عصير مشكل',
        'name_en': 'Mixed Juice',
        'price': 900,
        'unit': 'piece',
        'image': 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg',
        'stock': 150,
        'is_available': True
    },
    {
        'id': 'chocolate-bar',
        'category_id': 'sweets',
        'name_ar': 'شوكولاتة',
        'name_en': 'Chocolate Bar',
        'price': 1350,
        'unit': 'piece',
        'image': 'https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg',
        'stock': 120,
        'is_available': True
    },
    {
        'id': 'candy-pack',
        'category_id': 'sweets',
        'name_ar': 'حلوى مشكلة',
        'name_en': 'Mixed Candy',
        'price': 2400,
        'unit': 'piece',
        'image': 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg',
        'stock': 80,
        'is_available': True
    },
    {
        'id': 'oreo-pack',
        'category_id': 'biscuits',
        'name_ar': 'بسكويت أوريو',
        'name_en': 'Oreo Cookies',
        'price': 1950,
        'unit': 'piece',
        'image': 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg',
        'stock': 90,
        'is_available': True
    },
    {
        'id': 'dish-soap',
        'category_id': 'cleaning',
        'name_ar': 'سائل جلي',
        'name_en': 'Dish Soap',
        'price': 3600,
        'unit': 'piece',
        'image': 'https://images.pexels.com/photos/4239032/pexels-photo-4239032.jpeg',
        'stock': 60,
        'is_available': True
    },
    {
        'id': 'rice-bag',
        'category_id': 'food',
        'name_ar': 'أرز أبيض',
        'name_en': 'White Rice',
        'price': 4500,
        'unit': 'piece',
        'image': 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg',
        'stock': 50,
        'is_available': True
    }
]

def main():
    print("=" * 60)
    print("🚀 ALMA STORE - DATA MIGRATION")
    print("=" * 60)
    print()
    
    try:
        # Create Supabase client
        print("📡 Connecting to Supabase...")
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
        print("✅ Connected successfully!")
        print()
        
        # Check if tables exist
        print("🔍 Checking database tables...")
        try:
            result = supabase.table('branches').select("*").limit(1).execute()
            print(f"✅ Tables exist! Found {len(result.data)} branches")
        except Exception as e:
            print(f"❌ Error: Tables not found. Please run the SQL schema first!")
            print(f"   Error details: {str(e)}")
            print()
            print("Please follow these steps:")
            print("1. Go to https://supabase.com/dashboard/project/yqnvdurconsjesnampqj/sql")
            print("2. Run the SQL from sql/new_schema.sql")
            print("3. Then run this script again")
            return
        
        print()
        
        # Migrate products
        print("📦 Migrating products...")
        success_count = 0
        error_count = 0
        
        for product in products_data:
            try:
                # Check if product already exists
                existing = supabase.table('products').select("*").eq('id', product['id']).execute()
                
                if existing.data:
                    print(f"⚠️  Product '{product['name_ar']}' already exists, skipping...")
                    continue
                
                # Insert product
                result = supabase.table('products').insert(product).execute()
                print(f"✅ Added: {product['name_ar']}")
                success_count += 1
                
            except Exception as e:
                print(f"❌ Error adding {product['name_ar']}: {str(e)}")
                error_count += 1
        
        print()
        print("=" * 60)
        print(f"✅ Migration complete!")
        print(f"   Success: {success_count}")
        print(f"   Errors: {error_count}")
        print(f"   Skipped: {len(products_data) - success_count - error_count}")
        print("=" * 60)
        
    except Exception as e:
        print(f"❌ Fatal error: {str(e)}")
        print()
        print("Please make sure:")
        print("1. Supabase project is accessible")
        print("2. Service role key is correct")
        print("3. SQL schema has been executed")

if __name__ == "__main__":
    main()
