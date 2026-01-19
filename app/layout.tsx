import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Diar Hyseni - Full-Stack Developer",
  description:
    "Portfolio of Diar Hyseni, a full-stack developer specializing in modern web applications with React, Next.js, and Node.js",
  generator: "v0.app",
  icons: {
    icon: "/logo1.png",
    apple: "/logo1.png",
  },
  other: {
    'preconnect-googlefonts': 'https://fonts.googleapis.com',
    'preconnect-gstatic': 'https://fonts.gstatic.com',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Science+Gothic:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
