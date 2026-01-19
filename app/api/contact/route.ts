import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // Save to database
    const { data, error } = await supabase
      .from("contacts")
      .insert([
        {
          name,
          email,
          message,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error inserting contact:", error)
      return NextResponse.json(
        { error: "Failed to submit contact form", details: error.message },
        { status: 500 }
      )
    }

    // Send email notification (don't fail if email fails)
    try {
      const recipientEmail = process.env.CONTACT_NOTIFICATION_EMAIL || "diarhyseni4@gmail.com"
      const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"

      await resend.emails.send({
        from: fromEmail,
        to: recipientEmail,
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  color: #333;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  border: 1px solid #ddd;
                  border-radius: 8px;
                }
                .header {
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  color: white;
                  padding: 20px;
                  border-radius: 8px 8px 0 0;
                  margin: -20px -20px 20px -20px;
                }
                .content {
                  padding: 20px 0;
                }
                .field {
                  margin-bottom: 15px;
                }
                .label {
                  font-weight: bold;
                  color: #667eea;
                  margin-bottom: 5px;
                  display: block;
                }
                .value {
                  padding: 10px;
                  background: #f5f5f5;
                  border-radius: 4px;
                  border-left: 3px solid #667eea;
                }
                .footer {
                  margin-top: 20px;
                  padding-top: 20px;
                  border-top: 1px solid #ddd;
                  font-size: 12px;
                  color: #666;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>New Contact Form Submission</h2>
                </div>
                <div class="content">
                  <div class="field">
                    <span class="label">Name:</span>
                    <div class="value">${name}</div>
                  </div>
                  <div class="field">
                    <span class="label">Email:</span>
                    <div class="value">${email}</div>
                  </div>
                  <div class="field">
                    <span class="label">Message:</span>
                    <div class="value">${message.replace(/\n/g, '<br>')}</div>
                  </div>
                </div>
                <div class="footer">
                  <p>This is an automated notification from your portfolio contact form.</p>
                  <p>Submitted at: ${new Date().toLocaleString()}</p>
                </div>
              </div>
            </body>
          </html>
        `,
      })
      console.log("Email notification sent successfully")
    } catch (emailError: any) {
      // Log email error but don't fail the request
      console.error("Failed to send email notification:", emailError)
      // Continue - the contact was saved successfully
    }

    return NextResponse.json(
      { message: "Contact submitted successfully", data },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Contact submission error:", error)
    return NextResponse.json(
      { error: "An error occurred", details: error.message },
      { status: 500 }
    )
  }
}

