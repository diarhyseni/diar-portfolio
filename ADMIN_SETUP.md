# Admin Panel Setup Guide

## Prerequisites

1. Supabase project set up
2. Database tables created (run `supabase_schema.sql`)
3. Password verification function created (run `supabase_functions.sql`)
4. Admin user created (run `insert_admin.sql`)

## Environment Variables

**IMPORTANT:** Next.js requires environment variables to be in `.env.local` (not `.env`)

Create a `.env.local` file in the root directory with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXTAUTH_SECRET=FMuUotKt2D76NT36pWCCFuKOj8iO1JqFrKmlGKDIxzA=
```

You can find the Supabase values in your Supabase project settings under "API":
1. Go to your Supabase project dashboard
2. Click on "Settings" (gear icon)
3. Click on "API"
4. Copy the "Project URL" and "anon public" key

**After creating/updating `.env.local`, restart your dev server!**

## Database Setup

### Step 1: Create Tables
Run the SQL from `supabase_schema.sql` in your Supabase SQL Editor.

### Step 2: Create Password Verification Function
Run the SQL from `supabase_functions.sql` in your Supabase SQL Editor.

### Step 3: Create Admin User
Run the SQL from `insert_admin.sql` in your Supabase SQL Editor.

**Default Admin Credentials:**
- Email: `diarhyseni4@gmail.com`
- Password: `Mitrovica1.`

## Accessing the Admin Panel

1. Navigate to `/diarhyseni` in your browser
2. Login with the admin credentials
3. You can now manage Experience, Education, and Skills

## Features

- **Experience Management**: Add, edit, and delete work experience entries
- **Education Management**: Add, edit, and delete education entries
- **Skills Management**: Add, edit, and delete skills with categories (frontend, backend, technologies)

## Security Notes

- The admin panel uses cookie-based session management
- All API routes require authentication
- Passwords are hashed using PostgreSQL's `crypt` function with bcrypt
- Row Level Security (RLS) is enabled on all tables

## Troubleshooting

### Login not working?
1. Verify the password hash in the database matches the format from `insert_admin.sql`
2. Ensure `verify_crypt_password` function exists in Supabase
3. Check browser console for errors
4. Verify environment variables are set correctly

### API errors?
1. Check Supabase connection in browser network tab
2. Verify RLS policies allow authenticated users to write
3. Check Supabase logs for detailed error messages

