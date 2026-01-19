import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

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

    const formData = await request.formData()
    const files = formData.getAll("files") as File[]

    if (files.length === 0) {
      return NextResponse.json(
        { error: "No files provided" },
        { status: 400 }
      )
    }

    const uploadDir = join(process.cwd(), "public", "projects")
    
    // Create directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    const uploadedFiles: string[] = []

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        continue // Skip non-image files
      }

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Generate unique filename
      const timestamp = Date.now()
      const randomStr = Math.random().toString(36).substring(2, 8)
      const extension = file.name.split(".").pop() || "jpg"
      const filename = `project-${timestamp}-${randomStr}.${extension}`
      const filepath = join(uploadDir, filename)

      await writeFile(filepath, buffer)
      uploadedFiles.push(`/projects/${filename}`)
    }

    if (uploadedFiles.length === 0) {
      return NextResponse.json(
        { error: "No valid image files uploaded" },
        { status: 400 }
      )
    }

    return NextResponse.json({ files: uploadedFiles })
  } catch (error: any) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { error: "Failed to upload files", details: error.message },
      { status: 500 }
    )
  }
}

