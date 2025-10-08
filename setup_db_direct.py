#!/usr/bin/env python3
"""
Setup Supabase Database Schema using Direct PostgreSQL Connection
"""

import requests
import json

# Supabase credentials
SUPABASE_URL = "https://yqnvdurconsjesnampqj.supabase.co"
SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxbnZkdXJjb25zamVzbmFtcG1qIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjE2NDk2NSwiZXhwIjoyMDcxNzQwOTY1fQ.tBVWl8UhcLHNZJTU5jmfc0iLEAbdFFc2C9A7OkBfaNY"

def execute_sql_via_api(sql_statement):
    """Execute SQL via Supabase REST API"""
    headers = {
        "apikey": SUPABASE_SERVICE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
    }
    
    # For table creation, we'll use the REST API endpoints
    # But since we need raw SQL execution, we'll document the manual process
    return None

def main():
    print("=" * 60)
    print("🗄️  ALMA STORE - DATABASE SETUP INSTRUCTIONS")
    print("=" * 60)
    print()
    print("Since Supabase requires SQL to be executed through their dashboard,")
    print("please follow these steps:")
    print()
    print("1. Open Supabase SQL Editor:")
    print("   https://supabase.com/dashboard/project/yqnvdurconsjesnampqj/sql")
    print()
    print("2. Create a new query")
    print()
    print("3. Copy the entire content of: sql/new_schema.sql")
    print()
    print("4. Paste it into the SQL editor")
    print()
    print("5. Click 'Run' to execute")
    print()
    print("=" * 60)
    print()
    
    # Read and display the SQL file
    print("📄 SQL Schema Preview:")
    print("-" * 60)
    with open('sql/new_schema.sql', 'r', encoding='utf-8') as f:
        content = f.read()
        # Show first 50 lines
        lines = content.split('\n')[:50]
        for line in lines:
            print(line)
    print()
    print(f"... (Total: {len(content.split(chr(10)))} lines)")
    print("-" * 60)
    print()
    
    # Test connection
    print("🔍 Testing Supabase connection...")
    try:
        headers = {
            "apikey": SUPABASE_SERVICE_KEY,
            "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
        }
        
        response = requests.get(
            f"{SUPABASE_URL}/rest/v1/",
            headers=headers
        )
        
        if response.status_code < 400:
            print("✅ Connection successful!")
            print(f"   Supabase URL: {SUPABASE_URL}")
        else:
            print(f"⚠️  Connection issue: {response.status_code}")
            
    except Exception as e:
        print(f"❌ Connection error: {str(e)}")
    
    print()
    print("After executing the SQL, press Enter to continue...")
    input()
    
    # Verify setup
    print("\n🔍 Verifying database setup...")
    try:
        from supabase import create_client
        supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
        
        # Check branches
        branches = supabase.table('branches').select("*").execute()
        print(f"✅ Branches table: {len(branches.data)} records")
        
        # Check categories
        categories = supabase.table('categories').select("*").execute()
        print(f"✅ Categories table: {len(categories.data)} records")
        
        print("\n🎉 Database setup verified successfully!")
        
    except Exception as e:
        print(f"⚠️  Verification failed: {str(e)}")
        print("   Please make sure you executed the SQL in Supabase dashboard")

if __name__ == "__main__":
    main()
