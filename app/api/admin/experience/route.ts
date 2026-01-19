import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch experience' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { period, company, position, location } = body

    if (!period || !company || !position || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get max sort_order and add 1 for new item
    const { data: maxData } = await supabase
      .from('experience')
      .select('sort_order')
      .order('sort_order', { ascending: false })
      .limit(1)
      .single()

    const newSortOrder = maxData?.sort_order ? maxData.sort_order + 1 : 1

    const { data, error } = await supabase
      .from('experience')
      .insert([{ period, company, position, location, sort_order: newSortOrder }])
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      throw error
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Experience creation error:', error)
    return NextResponse.json(
      { 
        error: error.message || 'Failed to create experience',
        details: error.details || error.hint || 'Check RLS policies in Supabase'
      },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, period, company, position, location } = body

    if (!id || !period || !company || !position || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('experience')
      .update({ period, company, position, location })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update experience' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('experience')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to delete experience' },
      { status: 500 }
    )
  }
}

