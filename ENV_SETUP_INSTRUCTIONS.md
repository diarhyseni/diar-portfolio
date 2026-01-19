# Environment Variables Setup

## ⚠️ IMPORTANT: File Name Must Be `.env.local` (not `.env/local`)

The file must be in the **root directory** of your project with the exact name `.env.local` (with a dot, not a slash).

## Steps to Create `.env.local`:

1. **In the root directory** of your project (same folder as `package.json`), create a file named `.env.local`

2. **Add the following content:**

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXTAUTH_SECRET=FMuUotKt2D76NT36pWCCFuKOj8iO1JqFrKmlGKDIxzA=
```

3. **Get your Supabase credentials:**
   - Go to https://supabase.com/dashboard
   - Select your project
   - Go to Settings → API
   - Copy:
     - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
     - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. **After creating/updating `.env.local`:**
   - **Stop** your dev server (Ctrl+C)
   - **Restart** with `npm run dev`

## Verify it's working:

Check your terminal - you should NOT see the error "Missing Supabase environment variables" anymore.

## Common Mistakes:

❌ `.env/local` (wrong - this is a folder)
❌ `.env` (wrong - Next.js doesn't read this by default)
✅ `.env.local` (correct - in root directory)




