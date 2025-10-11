#!/usr/bin/env python3
"""
Setup Supabase Database Schema
This script executes the SQL schema on Supabase database
"""

import os
import requests
import sys

# Supabase configuration
SUPABASE_URL = "https://yqnvdurconsjesnampqj.supabase.co"
SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxbnZkdXJjb25zamVzbmFtcG1qIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjE2NDk2NSwiZXhwIjoyMDcxNzQwOTY1fQ.tBVWl8UhcLHNZJTU5jmfc0iLEAbdFFc2C9A7OkBfaNY"

def read_sql_file(filename):
    """Read SQL file content"""
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        print(f"❌ File not found: {filename}")
        sys.exit(1)

def execute_sql(sql_content):
    """Execute SQL on Supabase using REST API"""
    # Supabase REST API endpoint for executing SQL
    url = f"{SUPABASE_URL}/rest/v1/rpc/exec_sql"
    
    headers = {
        "apikey": SUPABASE_SERVICE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
        "Content-Type": "application/json"
    }
    
    # Note: Supabase doesn't have a direct SQL execution endpoint via REST API
    # We need to use PostgREST or connect via PostgreSQL client
    print("⚠️  Direct SQL execution via REST API is not available in Supabase")
    print("📝 Please execute the SQL manually in Supabase SQL Editor")
    print()
    print("Steps:")
    print("1. Go to https://supabase.com/dashboard")
    print("2. Select your project: yqnvdurconsjesnampqj")
    print("3. Go to SQL Editor")
    print("4. Copy the content of sql/new_schema.sql")
    print("5. Paste and click 'Run'")
    print()
    return False

def create_storage_bucket():
    """Create storage bucket for product images"""
    url = f"{SUPABASE_URL}/storage/v1/bucket"
    
    headers = {
        "apikey": SUPABASE_SERVICE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
        "Content-Type": "application/json"
    }
    
    data = {
        "id": "products",
        "name": "products",
        "public": True,
        "file_size_limit": 5242880,  # 5MB
        "allowed_mime_types": ["image/jpeg", "image/png", "image/webp"]
    }
    
    try:
        response = requests.post(url, json=data, headers=headers)
        if response.status_code == 200 or response.status_code == 201:
            print("✅ Storage bucket 'products' created successfully")
            return True
        elif response.status_code == 409:
            print("✅ Storage bucket 'products' already exists")
            return True
        else:
            print(f"❌ Failed to create storage bucket: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Error creating storage bucket: {e}")
        return False

def main():
    print("=" * 60)
    print("🚀 Supabase Database Setup")
    print("=" * 60)
    print()
    
    # Read SQL file
    print("📖 Reading SQL schema file...")
    sql_content = read_sql_file("sql/new_schema.sql")
    print(f"✅ SQL file loaded ({len(sql_content)} characters)")
    print()
    
    # Execute SQL
    print("🔧 Setting up database schema...")
    execute_sql(sql_content)
    print()
    
    # Create storage bucket
    print("📦 Creating storage bucket for images...")
    create_storage_bucket()
    print()
    
    print("=" * 60)
    print("✅ Setup instructions displayed")
    print("=" * 60)

if __name__ == "__main__":
    main()

