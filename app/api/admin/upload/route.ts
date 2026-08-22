import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

// Disable body parsing, Next.js will handle it
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("admin_session")

    if (!sessionCookie) {
      console.error("Upload failed: No admin session cookie")
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    console.log("📤 Starting file upload...")
    const formData = await request.formData()
    const files = formData.getAll("files") as File[]
    
    console.log(`📁 Received ${files.length} file(s)`)

    if (files.length === 0) {
      console.error("Upload failed: No files in formData")
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
      console.log(`Processing file: ${file.name}, type: ${file.type}, size: ${file.size} bytes`)
      
      if (!file.type.startsWith("image/")) {
        console.warn(`Skipping non-image file: ${file.name} (type: ${file.type})`)
        continue // Skip non-image files
      }

      try {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Generate unique filename
        const timestamp = Date.now()
        const randomStr = Math.random().toString(36).substring(2, 8)
        const extension = file.name.split(".").pop() || "jpg"
        const filename = `project-${timestamp}-${randomStr}.${extension}`
        const filepath = join(uploadDir, filename)

        console.log(`Writing file to: ${filepath}`)
        await writeFile(filepath, buffer)
        uploadedFiles.push(`/projects/${filename}`)
        console.log(`✓ Successfully uploaded: ${filename}`)
      } catch (fileError: any) {
        console.error(`Error processing file ${file.name}:`, fileError)
        // Continue with other files
      }
    }

    if (uploadedFiles.length === 0) {
      console.error("Upload failed: No valid image files were processed")
      return NextResponse.json(
        { error: "No valid image files uploaded" },
        { status: 400 }
      )
    }

    console.log(`✅ Upload complete: ${uploadedFiles.length} file(s) uploaded successfully`)
    return NextResponse.json({ files: uploadedFiles })
  } catch (error: any) {
    console.error("❌ Upload error:", error)
    console.error("Error stack:", error.stack)
    return NextResponse.json(
      { error: "Failed to upload files", details: error.message },
      { status: 500 }
    )
  }
}

