import type { Metadata } from "next"
import { CvDocument } from "@/components/cv-document"

export const metadata: Metadata = {
  title: "CV | Diar Hyseni",
  description:
    "Curriculum Vitae of Diar Hyseni — Full-Stack Developer. Work experience, education, skills, and languages.",
  alternates: {
    canonical: "/cv",
  },
  openGraph: {
    title: "CV | Diar Hyseni",
    description:
      "Curriculum Vitae of Diar Hyseni — Full-Stack Developer. Work experience, education, skills, and languages.",
    url: "/cv",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "CV | Diar Hyseni",
    description:
      "Curriculum Vitae of Diar Hyseni — Full-Stack Developer. Work experience, education, skills, and languages.",
  },
}

export default function CvPage() {
  return <CvDocument />
}
