"use client"

import Image from "next/image"
import { Search } from "lucide-react"
import {
  SiAccuweather,
  SiCss3,
  SiDocker,
  SiDotnet,
  SiExpress,
  SiFigma,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiShopify,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
  SiWordpress,
} from "react-icons/si"
import { ComponentType } from "react"

// Custom Java Icon Component
const JavaIcon = ({ className }: { className?: string }) => (
  <Image
    src="/java.png"
    alt="Java"
    width={40}
    height={40}
    className={className}
    style={{ width: '2.5rem', height: '2.5rem', objectFit: 'contain' }}
  />
)

// SEO Icon Component
const SeoIcon = ({ className }: { className?: string }) => (
  <Search className={className} style={{ width: '2.5rem', height: '2.5rem' }} />
)

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  JavaIcon,
  SiPhp,
  SiDotnet,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiWordpress,
  SiShopify,
  SiSupabase,
  SiGit,
  SiDocker,
  SiFigma,
  SiAccuweather,
  SeoIcon,
}

export function getIconComponent(iconName: string | null): ComponentType<{ className?: string }> | null {
  if (!iconName) return null
  return iconMap[iconName] ?? null
}
