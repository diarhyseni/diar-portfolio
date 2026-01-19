import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, direction } = body // direction: 'up' or 'down'

    if (!id || !direction) {
      return NextResponse.json(
        { error: 'ID and direction are required' },
        { status: 400 }
      )
    }

    // Get current item
    const { data: currentItem, error: currentError } = await supabase
      .from('experience')
      .select('id, sort_order')
      .eq('id', id)
      .single()

    if (currentError || !currentItem) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      )
    }

    const currentOrder = currentItem.sort_order ?? 0
    
    // Get all items ordered by sort_order
    const { data: allItems, error: allError } = await supabase
      .from('experience')
      .select('id, sort_order')
      .order('sort_order', { ascending: true })

    if (allError) {
      return NextResponse.json(
        { error: 'Failed to fetch items' },
        { status: 500 }
      )
    }

    const currentIndex = allItems.findIndex(item => item.id === id)
    if (currentIndex === -1) {
      return NextResponse.json(
        { error: 'Item not found in list' },
        { status: 404 }
      )
    }

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (newIndex < 0 || newIndex >= allItems.length) {
      return NextResponse.json(
        { error: 'Cannot move item in that direction' },
        { status: 400 }
      )
    }

    const swapItem = allItems[newIndex]
    
    // Swap the sort orders
    await supabase
      .from('experience')
      .update({ sort_order: swapItem.sort_order ?? newIndex })
      .eq('id', id)

    await supabase
      .from('experience')
      .update({ sort_order: currentOrder })
      .eq('id', swapItem.id)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to reorder experience' },
      { status: 500 }
    )
  }
}

