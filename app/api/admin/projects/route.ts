import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("admin_session")

    if (!sessionCookie) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching projects:", error)
      return NextResponse.json(
        { error: "Failed to fetch projects", details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data || [])
  } catch (error: any) {
    console.error("Projects fetch error:", error)
    return NextResponse.json(
      { error: "An error occurred", details: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("admin_session")

    if (!sessionCookie) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, description, short_description, gallery, technologies, year, github_url, live_url, sort_order } = body

    if (!title || !description || !year) {
      return NextResponse.json(
        { error: "Title, description, and year are required" },
        { status: 400 }
      )
    }

    if (!Array.isArray(gallery) || gallery.length === 0) {
      return NextResponse.json(
        { error: "At least one gallery image is required" },
        { status: 400 }
      )
    }

    if (!Array.isArray(technologies) || technologies.length === 0) {
      return NextResponse.json(
        { error: "At least one technology is required" },
        { status: 400 }
      )
    }

    // Get max sort_order to add new project at the end
    const { data: maxData } = await supabase
      .from("projects")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1)
      .single()

    const newSortOrder = sort_order !== undefined ? sort_order : ((maxData?.sort_order || 0) + 1)

    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          title,
          description,
          short_description: short_description || description.substring(0, 150),
          gallery,
          technologies,
          year,
          github_url: github_url || null,
          live_url: live_url || null,
          sort_order: newSortOrder,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error creating project:", error)
      return NextResponse.json(
        { error: "Failed to create project", details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error: any) {
    console.error("Project creation error:", error)
    return NextResponse.json(
      { error: "An error occurred", details: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("admin_session")

    if (!sessionCookie) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { id, title, description, short_description, gallery, technologies, year, github_url, live_url, sort_order } = body

    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      )
    }

    if (!title || !description || !year) {
      return NextResponse.json(
        { error: "Title, description, and year are required" },
        { status: 400 }
      )
    }

    if (!Array.isArray(gallery) || gallery.length === 0) {
      return NextResponse.json(
        { error: "At least one gallery image is required" },
        { status: 400 }
      )
    }

    if (!Array.isArray(technologies) || technologies.length === 0) {
      return NextResponse.json(
        { error: "At least one technology is required" },
        { status: 400 }
      )
    }

    const updateData: any = {
      title,
      description,
      short_description: short_description || description.substring(0, 150),
      gallery,
      technologies,
      year,
      github_url: github_url || null,
      live_url: live_url || null,
    }

    if (sort_order !== undefined) {
      updateData.sort_order = sort_order
    }

    const { data, error } = await supabase
      .from("projects")
      .update(updateData)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating project:", error)
      return NextResponse.json(
        { error: "Failed to update project", details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error("Project update error:", error)
    return NextResponse.json(
      { error: "An error occurred", details: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("admin_session")

    if (!sessionCookie) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("Error deleting project:", error)
      return NextResponse.json(
        { error: "Failed to delete project", details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: "Project deleted successfully" })
  } catch (error: any) {
    console.error("Project delete error:", error)
    return NextResponse.json(
      { error: "An error occurred", details: error.message },
      { status: 500 }
    )
  }
}

