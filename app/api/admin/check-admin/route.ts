import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email') || 'diarhyseni4@gmail.com'

    // Check if admin exists (don't filter by is_active in case it's NULL)
    const { data: adminDataArray, error: adminError } = await supabase
      .from('admin')
      .select('id, email, password_hash, name, role, is_active, created_at')
      .eq('email', email)
      .limit(1)
    
    const adminData = adminDataArray && adminDataArray.length > 0 ? adminDataArray[0] : null

    if (adminError) {
      return NextResponse.json({
        error: adminError.message,
        code: adminError.code,
        details: adminError.details,
        hint: adminError.hint
      }, { status: 500 })
    }

    if (!adminData) {
      // Try to find any admin users
      const { data: allAdmins, error: allError } = await supabase
        .from('admin')
        .select('email, is_active')
        .limit(10)

      return NextResponse.json({
        found: false,
        searched_email: email,
        all_admins_in_db: allAdmins || [],
        error: allError?.message,
        note: 'Admin not found. Check if email matches exactly (case-sensitive)'
      }, { status: 404 })
    }

    const admin = adminData

    return NextResponse.json({
      found: true,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        is_active: admin.is_active,
        created_at: admin.created_at,
        password_hash_preview: admin.password_hash ? admin.password_hash.substring(0, 20) + '...' : 'NULL'
      }
    })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack
    }, { status: 500 })
  }
}

