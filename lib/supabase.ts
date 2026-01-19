import { createClient } from '@supabase/supabase-js'

// Try multiple possible environment variable names
const supabaseUrl = 
  process.env.NEXT_PUBLIC_SUPABASE_URL || 
  process.env.SUPABASE_URL || 
  ''

// Extract URL from DATABASE_URL if it's a Supabase connection string
let extractedUrl = supabaseUrl
if (!extractedUrl && process.env.DATABASE_URL) {
  // DATABASE_URL format: postgresql://postgres:[password]@[host]:[port]/postgres
  // We need to extract the Supabase project URL from it
  const dbUrl = process.env.DATABASE_URL
  const match = dbUrl.match(/@([^:]+)/)
  if (match) {
    const host = match[1]
    // Convert database host to Supabase project URL
    extractedUrl = `https://${host.replace('.supabase.co', '').split('.')[0]}.supabase.co`
  }
}

const supabaseAnonKey = 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
  process.env.SUPABASE_ANON_KEY || 
  ''

if (!extractedUrl || !supabaseAnonKey) {
  if (process.env.NODE_ENV === 'development') {
    console.error('⚠️  Missing Supabase environment variables!')
    console.error('Found DATABASE_URL:', !!process.env.DATABASE_URL)
    console.error('Found DIRECT_URL:', !!process.env.DIRECT_URL)
    console.error('Please add to .env.local:')
    console.error('NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co')
    console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key')
    console.error('OR')
    console.error('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-publishable-key')
    console.error('')
    console.error('Get these from: Supabase Dashboard → Settings → API')
  }
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

export const supabase = createClient(extractedUrl, supabaseAnonKey)

