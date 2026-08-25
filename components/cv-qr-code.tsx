"use client"

import { useEffect, useState } from "react"
import QRCode from "qrcode"

type CvQrCodeProps = {
  url: string
  label?: string
  caption?: string
}

export function CvQrCode({ url, label, caption }: CvQrCodeProps) {
  const [qrSrc, setQrSrc] = useState<string>("")

  useEffect(() => {
    let active = true

    QRCode.toDataURL(url, {
      width: 128,
      margin: 1,
      color: {
        dark: "#0f172a",
        light: "#ffffff",
      },
    })
      .then((dataUrl) => {
        if (active) setQrSrc(dataUrl)
      })
      .catch(() => {
        if (active) setQrSrc("")
      })

    return () => {
      active = false
    }
  }, [url])

  if (!qrSrc) return null

  return (
    <div className="cv-qr">
      <img
        src={qrSrc}
        alt={`QR code for ${url}`}
        width={64}
        height={64}
        className="cv-qr-image"
      />
      {label ? <span className="cv-qr-label">{label}</span> : null}
      {caption ? <span className="cv-qr-caption">{caption}</span> : null}
    </div>
  )
}
