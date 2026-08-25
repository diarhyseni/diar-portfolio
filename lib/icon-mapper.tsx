"use client"

import { Bot, Search, Server, Sparkles } from "lucide-react"
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
  SiHubspot,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiN8N,
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

const VapiIcon = ({ className }: { className?: string }) => (
  <Bot className={className} aria-hidden="true" />
)

const OpenClawIcon = ({ className }: { className?: string }) => (
  <Sparkles className={className} aria-hidden="true" />
)

const HostingIcon = ({ className }: { className?: string }) => (
  <Server className={className} aria-hidden="true" />
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
  SiHubspot,
  SiAccuweather,
  SiN8N,
  VapiIcon,
  OpenClawIcon,
  HostingIcon,
  SeoIcon,
}

export function getIconComponent(iconName: string | null): ComponentType<{ className?: string }> | null {
  if (!iconName) return null
  return iconMap[iconName] ?? null
}
