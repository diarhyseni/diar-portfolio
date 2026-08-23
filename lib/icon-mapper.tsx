"use client"

import { Search } from "lucide-react"
import { FaJava } from "react-icons/fa"
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

const JavaIcon = ({ className }: { className?: string }) => (
  <FaJava className={className} aria-hidden="true" />
)

const SeoIcon = ({ className }: { className?: string }) => (
  <Search className={className} aria-hidden="true" />
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
