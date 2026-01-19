import { NextResponse } from 'next/server'

export async function GET() {
  const hasSupabaseUrl = !!(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL)
  const hasSupabaseKey = !!(
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
    process.env.SUPABASE_ANON_KEY
  )
  const hasDatabaseUrl = !!process.env.DATABASE_URL
  const hasDirectUrl = !!process.env.DIRECT_URL
  const hasNextAuthSecret = !!process.env.NEXTAUTH_SECRET

  return NextResponse.json({
    env_loaded: true,
    variables: {
      NEXT_PUBLIC_SUPABASE_URL: {
        exists: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        preview: process.env.NEXT_PUBLIC_SUPABASE_URL 
          ? process.env.NEXT_PUBLIC_SUPABASE_URL.substring(0, 30) + '...' 
          : 'NOT SET'
      },
      NEXT_PUBLIC_SUPABASE_ANON_KEY: {
        exists: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        preview: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY 
          ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 20) + '...' 
          : 'NOT SET'
      },
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: {
        exists: !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
        preview: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY 
          ? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY.substring(0, 20) + '...' 
          : 'NOT SET'
      },
      DATABASE_URL: {
        exists: hasDatabaseUrl,
        preview: hasDatabaseUrl ? 'SET (but not used for client)' : 'NOT SET'
      },
      DIRECT_URL: {
        exists: hasDirectUrl,
        preview: hasDirectUrl ? 'SET (but not used for client)' : 'NOT SET'
      },
      NEXTAUTH_SECRET: {
        exists: hasNextAuthSecret,
        preview: hasNextAuthSecret ? 'SET' : 'NOT SET'
      }
    },
    all_set: hasSupabaseUrl && hasSupabaseKey,
    note: 'DATABASE_URL and DIRECT_URL are for direct database access. For Supabase client, you need NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY from Supabase Dashboard → Settings → API'
  })
}

