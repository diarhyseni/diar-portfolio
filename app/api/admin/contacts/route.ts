import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated (you can add proper auth check here)
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("admin_session")

    if (!sessionCookie) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching contacts:", error)
      return NextResponse.json(
        { error: "Failed to fetch contacts", details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data || [])
  } catch (error: any) {
    console.error("Contacts fetch error:", error)
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

    const { id, read } = await request.json()

    if (id === undefined || read === undefined) {
      return NextResponse.json(
        { error: "id and read are required" },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from("contacts")
      .update({ read })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating contact:", error)
      return NextResponse.json(
        { error: "Failed to update contact", details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error("Contact update error:", error)
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
        { error: "id is required" },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from("contacts")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("Error deleting contact:", error)
      return NextResponse.json(
        { error: "Failed to delete contact", details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: "Contact deleted successfully" })
  } catch (error: any) {
    console.error("Contact delete error:", error)
    return NextResponse.json(
      { error: "An error occurred", details: error.message },
      { status: 500 }
    )
  }
}

