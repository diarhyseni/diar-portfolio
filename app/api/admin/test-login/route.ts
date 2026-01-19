import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Test 1: Check if admin exists
    const { data: adminData, error: adminError } = await supabase
      .from('admin')
      .select('id, email, password_hash, name, role, is_active')
      .eq('email', email)
      .single()

    if (adminError) {
      return NextResponse.json({
        step: 'admin_lookup',
        error: adminError.message,
        details: adminError
      }, { status: 400 })
    }

    if (!adminData) {
      return NextResponse.json({
        step: 'admin_lookup',
        error: 'Admin not found'
      }, { status: 404 })
    }

    // Test 2: Try verify_crypt_password RPC
    const { data: verify1, error: verifyError1 } = await supabase
      .rpc('verify_crypt_password', {
        p_password: password,
        p_hash: adminData.password_hash
      })

    // Test 3: Try verify_password_direct RPC
    const { data: verify2, error: verifyError2 } = await supabase
      .rpc('verify_password_direct', {
        p_email: email,
        p_password: password
      })

    return NextResponse.json({
      admin_found: true,
      admin_email: adminData.email,
      admin_active: adminData.is_active,
      password_hash_preview: adminData.password_hash.substring(0, 20) + '...',
      verify_crypt_password: {
        result: verify1,
        error: verifyError1?.message || null
      },
      verify_password_direct: {
        result: verify2,
        error: verifyError2?.message || null
      }
    })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack
    }, { status: 500 })
  }
}




