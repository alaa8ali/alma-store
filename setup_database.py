#!/usr/bin/env python3
"""
Setup Supabase Database Schema
This script executes the SQL schema on Supabase
"""

import os
from supabase import create_client, Client

# Supabase credentials
SUPABASE_URL = "https://yqnvdurconsjesnampqj.supabase.co"
SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxbnZkdXJjb25zamVzbmFtcG1qIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjE2NDk2NSwiZXhwIjoyMDcxNzQwOTY1fQ.tBVWl8UhcLHNZJTU5jmfc0iLEAbdFFc2C9A7OkBfaNY"

def main():
    print("🚀 Setting up Supabase database...")
    
    # Create Supabase client
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    
    # Read SQL schema
    print("📖 Reading SQL schema...")
    with open('sql/new_schema.sql', 'r', encoding='utf-8') as f:
        sql_content = f.read()
    
    # Split SQL into individual statements
    statements = [stmt.strip() for stmt in sql_content.split(';') if stmt.strip() and not stmt.strip().startswith('--')]
    
    print(f"📝 Found {len(statements)} SQL statements")
    
    # Execute each statement
    success_count = 0
    error_count = 0
    
    for i, statement in enumerate(statements, 1):
        try:
            # Skip comments and empty statements
            if not statement or statement.startswith('--'):
                continue
                
            print(f"⚙️  Executing statement {i}/{len(statements)}...")
            
            # Execute via RPC call to execute raw SQL
            # Note: Supabase Python client doesn't support raw SQL directly
            # We need to use the REST API
            import requests
            
            response = requests.post(
                f"{SUPABASE_URL}/rest/v1/rpc/exec_sql",
                headers={
                    "apikey": SUPABASE_SERVICE_KEY,
                    "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
                    "Content-Type": "application/json"
                },
                json={"query": statement}
            )
            
            if response.status_code < 400:
                success_count += 1
            else:
                print(f"⚠️  Warning on statement {i}: {response.text[:200]}")
                error_count += 1
                
        except Exception as e:
            print(f"❌ Error on statement {i}: {str(e)[:200]}")
            error_count += 1
    
    print(f"\n✅ Setup complete!")
    print(f"   Success: {success_count}")
    print(f"   Errors: {error_count}")
    
    # Verify tables were created
    print("\n🔍 Verifying tables...")
    try:
        # Try to query branches table
        result = supabase.table('branches').select("*").limit(1).execute()
        print(f"✅ Tables created successfully! Found {len(result.data)} branches")
    except Exception as e:
        print(f"⚠️  Could not verify tables: {str(e)}")
        print("\n📋 Please execute the SQL manually in Supabase SQL Editor:")
        print("   1. Go to https://supabase.com/dashboard/project/yqnvdurconsjesnampqj/sql")
        print("   2. Copy the content of sql/new_schema.sql")
        print("   3. Paste and run it in the SQL editor")

if __name__ == "__main__":
    main()
