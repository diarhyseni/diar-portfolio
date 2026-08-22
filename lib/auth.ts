import { cookies } from 'next/headers'
import { supabase } from './supabase'

export interface AdminUser {
  id: string
  email: string
  name: string | null
  role: string
}

export async function verifyPassword(email: string, password: string): Promise<AdminUser | null> {
  try {
    // Step 1: Get admin from database
    console.log('🔍 Looking for admin with email:', email)
    const { data: adminDataArray, error: adminError } = await supabase
      .from('admin')
      .select('id, email, password_hash, name, role, is_active')
      .eq('email', email)
      .limit(1)
    
    // Filter by is_active in JavaScript instead of SQL (in case column is NULL)
    const activeAdmin = adminDataArray?.find(admin => admin.is_active !== false) || adminDataArray?.[0]

    if (adminError) {
      console.error('❌ Admin lookup error:', adminError.message)
      console.error('Error code:', adminError.code)
      console.error('Error details:', adminError.details)
      console.error('Error hint:', adminError.hint)
      return null
    }

    if (!activeAdmin) {
      console.error('❌ No active admin found with email:', email)
      console.error('🔍 Checking if any admins exist...')
      
      // Debug: Check if any admins exist at all
      const { data: allAdmins, error: allError } = await supabase
        .from('admin')
        .select('email, is_active')
        .limit(5)
      
      if (!allError && allAdmins) {
        console.log('📋 Found admins in database:', allAdmins)
        if (adminDataArray && adminDataArray.length > 0) {
          console.log('⚠️  Admin found but is_active is false:', adminDataArray[0])
        }
      } else {
        console.error('❌ Could not query admin table:', allError?.message)
      }
      
      return null
    }

    const adminData = activeAdmin

    console.log('✓ Admin found:', adminData.email)

    // Step 2: Try RPC function first (if it exists)
    let isValid = false
    const { data: rpcResult, error: rpcError } = await supabase
      .rpc('verify_crypt_password', {
        p_password: password,
        p_hash: adminData.password_hash
      })

    if (!rpcError && rpcResult === true) {
      isValid = true
      console.log('✓ Password verified via RPC function')
    } else if (rpcError) {
      console.warn('⚠️  RPC function error (may not exist):', rpcError.message)
      console.log('⚠️  Attempting alternative verification method...')
      
      // Try verify_password_direct as fallback
      const { data: directResult, error: directError } = await supabase
        .rpc('verify_password_direct', {
          p_email: email,
          p_password: password
        })
      
      if (!directError && directResult === true) {
        isValid = true
        console.log('✓ Password verified via direct RPC function')
      } else {
        console.error('❌ All password verification methods failed')
        console.error('RPC error:', rpcError?.message)
        console.error('Direct RPC error:', directError?.message)
        console.error('⚠️  Make sure you have run supabase_functions_updated.sql in Supabase SQL Editor')
        return null
      }
    } else {
      console.error('❌ Password verification returned false')
      return null
    }

    if (!isValid) {
      console.error('❌ Password is invalid')
      return null
    }

    // Step 3: Update last_login
    await supabase
      .from('admin')
      .update({ last_login: new Date().toISOString() })
      .eq('id', adminData.id)

    console.log('✓ Login successful for:', adminData.email)

    return {
      id: adminData.id,
      email: adminData.email,
      name: adminData.name,
      role: adminData.role
    }
  } catch (error: any) {
    console.error('❌ Login error:', error.message)
    return null
  }
}

export async function getSession(): Promise<AdminUser | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('admin_session')
  
  if (!sessionCookie?.value) {
    return null
  }

  try {
    const session = JSON.parse(sessionCookie.value)
    return session as AdminUser
  } catch {
    return null
  }
}

export async function setSession(user: AdminUser) {
  const cookieStore = await cookies()
  cookieStore.set('admin_session', JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  })
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
}

