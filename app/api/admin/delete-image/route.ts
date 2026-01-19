import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { unlink } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

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
    const imagePath = searchParams.get("path")

    if (!imagePath) {
      return NextResponse.json(
        { error: "Image path is required" },
        { status: 400 }
      )
    }

    // Security: Only allow deleting files from /projects directory
    if (!imagePath.startsWith("/projects/")) {
      return NextResponse.json(
        { error: "Invalid image path" },
        { status: 400 }
      )
    }

    // Remove leading slash and join with public directory
    const filepath = join(process.cwd(), "public", imagePath.substring(1))

    // Additional security check
    if (!filepath.startsWith(join(process.cwd(), "public", "projects"))) {
      return NextResponse.json(
        { error: "Invalid file path" },
        { status: 400 }
      )
    }

    if (!existsSync(filepath)) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      )
    }

    await unlink(filepath)

    return NextResponse.json({ message: "File deleted successfully" })
  } catch (error: any) {
    console.error("Delete error:", error)
    return NextResponse.json(
      { error: "Failed to delete file", details: error.message },
      { status: 500 }
    )
  }
}

