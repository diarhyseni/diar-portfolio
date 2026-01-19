import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('name', { ascending: true })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
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
    const { name, categories, category, icon_name, display_order } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    // Support both single category (for backward compatibility) and multiple categories
    let categoriesArray: string[] = []
    if (categories && Array.isArray(categories)) {
      categoriesArray = categories
    } else if (category) {
      categoriesArray = [category]
    } else {
      return NextResponse.json(
        { error: 'At least one category is required' },
        { status: 400 }
      )
    }

    // Validate categories
    const validCategories = ['frontend', 'backend', 'technologies']
    const invalidCategories = categoriesArray.filter(cat => !validCategories.includes(cat))
    if (invalidCategories.length > 0) {
      return NextResponse.json(
        { error: `Invalid categories: ${invalidCategories.join(', ')}` },
        { status: 400 }
      )
    }

    // Ensure at least one category is provided
    if (categoriesArray.length === 0) {
      return NextResponse.json(
        { error: 'At least one category is required' },
        { status: 400 }
      )
    }

    // Get max sort_order and add 1 for new item
    const { data: maxData } = await supabase
      .from('skills')
      .select('sort_order')
      .order('sort_order', { ascending: false })
      .limit(1)
      .single()

    const newSortOrder = maxData?.sort_order ? maxData.sort_order + 1 : 1

    const insertData: any = { 
      name, 
      categories: categoriesArray, 
      sort_order: newSortOrder
    }
    
    // Only include icon_name if it's not empty
    if (icon_name && icon_name.trim() !== '') {
      insertData.icon_name = icon_name
    }

    console.log('Inserting skill with data:', insertData)
    console.log('Categories array:', categoriesArray, 'Type:', typeof categoriesArray, 'Is Array:', Array.isArray(categoriesArray))

    const { data, error } = await supabase
      .from('skills')
      .insert([insertData])
      .select()
      .single()

    console.log('Insert result - data:', data, 'error:', error)

    if (error) {
      console.error('Supabase insert error:', error)
      console.error('Error code:', error.code)
      console.error('Error message:', error.message)
      console.error('Error details:', error.details)
      console.error('Error hint:', error.hint)
      return NextResponse.json(
        { 
          error: error.message || 'Failed to create skill',
          details: error.details || error.hint || error.code || 'Check RLS policies in Supabase'
        },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Skill creation error:', error)
    console.error('Error type:', typeof error)
    console.error('Error keys:', Object.keys(error || {}))
    return NextResponse.json(
      { 
        error: error?.message || String(error) || 'Failed to create skill',
        details: error?.details || error?.hint || 'Unknown error occurred'
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
    const { id, name, categories, category, icon_name, display_order } = body

    if (!id || !name) {
      return NextResponse.json(
        { error: 'ID and name are required' },
        { status: 400 }
      )
    }

    // Support both single category (for backward compatibility) and multiple categories
    let categoriesArray: string[] = []
    if (categories && Array.isArray(categories)) {
      categoriesArray = categories
    } else if (category) {
      categoriesArray = [category]
    } else {
      return NextResponse.json(
        { error: 'At least one category is required' },
        { status: 400 }
      )
    }

    // Validate categories
    const validCategories = ['frontend', 'backend', 'technologies']
    const invalidCategories = categoriesArray.filter(cat => !validCategories.includes(cat))
    if (invalidCategories.length > 0) {
      return NextResponse.json(
        { error: `Invalid categories: ${invalidCategories.join(', ')}` },
        { status: 400 }
      )
    }

    // Ensure at least one category is provided
    if (categoriesArray.length === 0) {
      return NextResponse.json(
        { error: 'At least one category is required' },
        { status: 400 }
      )
    }

    const updateData: any = { 
      name, 
      categories: categoriesArray
      // Note: sort_order is not updated here - use reorder endpoint instead
    }
    
    // Only include icon_name if it's not empty
    if (icon_name && icon_name.trim() !== '') {
      updateData.icon_name = icon_name
    } else {
      updateData.icon_name = null
    }

    console.log('Updating skill with data:', updateData)
    console.log('Categories array:', categoriesArray, 'Type:', typeof categoriesArray, 'Is Array:', Array.isArray(categoriesArray))

    const { data, error } = await supabase
      .from('skills')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    console.log('Update result - data:', data, 'error:', error)

    if (error) {
      console.error('Supabase update error:', error)
      console.error('Error code:', error.code)
      console.error('Error message:', error.message)
      console.error('Error details:', error.details)
      console.error('Error hint:', error.hint)
      return NextResponse.json(
        { 
          error: error.message || 'Failed to update skill',
          details: error.details || error.hint || error.code || 'Check RLS policies in Supabase'
        },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Skill update error:', error)
    return NextResponse.json(
      { 
        error: error.message || 'Failed to update skill',
        details: error.details || error.hint || 'Check RLS policies in Supabase'
      },
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
      .from('skills')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase delete error:', error)
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Skill delete error:', error)
    return NextResponse.json(
      { 
        error: error.message || 'Failed to delete skill',
        details: error.details || error.hint || 'Check RLS policies in Supabase'
      },
      { status: 500 }
    )
  }
}

