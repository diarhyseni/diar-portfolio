# Supabase Environment Variables Guide

## ⚠️ Important: You Need TWO Different Sets of Variables

### 1. For Direct Database Access (PostgreSQL)
These are what you currently have:
- `DATABASE_URL` - Direct PostgreSQL connection string
- `DIRECT_URL` - Direct database URL

### 2. For Supabase JavaScript Client (What We Need)
These are what the admin panel needs:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon/public key

## How to Get the Correct Values:

1. **Go to your Supabase Dashboard**: https://supabase.com/dashboard
2. **Select your project**
3. **Go to Settings → API**
4. **Copy these values:**
   - **Project URL** → This is your `NEXT_PUBLIC_SUPABASE_URL`
     - Format: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public** key → This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - Format: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (long JWT token)

## Your `.env.local` Should Have:

```env
# Direct Database Access (you already have these)
DATABASE_URL=postgresql://postgres:[password]@[host]:[port]/postgres
DIRECT_URL=postgresql://postgres:[password]@[host]:[port]/postgres

# Supabase Client Access (ADD THESE)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# NextAuth Secret
NEXTAUTH_SECRET=FMuUotKt2D76NT36pWCCFuKOj8iO1JqFrKmlGKDIxzA=
```

## Why Both?

- `DATABASE_URL` / `DIRECT_URL` = For direct SQL queries (server-side only)
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` = For Supabase JavaScript client (works in browser)

The admin panel uses the Supabase JavaScript client, so you **must** add the `NEXT_PUBLIC_*` variables.




