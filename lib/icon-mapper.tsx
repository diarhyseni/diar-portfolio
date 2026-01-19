"use client"

import Image from "next/image"
import { Search } from "lucide-react"
import * as SiIcons from "react-icons/si"
import { ComponentType, useMemo } from "react"

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

// Custom icon mapping for non-react-icons icons
const customIcons: Record<string, ComponentType<{ className?: string }>> = {
  'JavaIcon': JavaIcon,
  'SeoIcon': SeoIcon,
}

// Dynamic icon loader - automatically loads any icon from react-icons/si by name
export function getIconComponent(iconName: string | null): ComponentType<{ className?: string }> | null {
  if (!iconName) return null
  
  // Check custom icons first
  if (customIcons[iconName]) {
    return customIcons[iconName]
  }
  
  // Dynamically get icon from react-icons/si
  // @ts-ignore - SiIcons is a dynamic object with icon names as keys
  const IconComponent = SiIcons[iconName]
  
  if (IconComponent && typeof IconComponent === 'function') {
    return IconComponent as ComponentType<{ className?: string }>
  }
  
  // Icon not found
  return null
}

// List of available icons for admin panel
export const availableIcons = [
  { value: 'SiHtml5', label: 'HTML 5' },
  { value: 'SiCss3', label: 'CSS 3' },
  { value: 'SiJavascript', label: 'JavaScript' },
  { value: 'SiTypescript', label: 'TypeScript' },
  { value: 'SiReact', label: 'React' },
  { value: 'SiNextdotjs', label: 'Next.js' },
  { value: 'SiVuedotjs', label: 'Vue.js' },
  { value: 'SiTailwindcss', label: 'Tailwind CSS' },
  { value: 'SiNodedotjs', label: 'Node.js' },
  { value: 'SiExpress', label: 'Express' },
  { value: 'JavaIcon', label: 'Java (Custom)' },
  { value: 'SiPhp', label: 'PHP' },
  { value: 'SiDotnet', label: '.NET Core' },
  { value: 'SiMongodb', label: 'MongoDB' },
  { value: 'SiPostgresql', label: 'PostgreSQL' },
  { value: 'SiMysql', label: 'MySQL' },
  { value: 'SiRedis', label: 'Redis' },
  { value: 'SiWordpress', label: 'WordPress' },
  { value: 'SiShopify', label: 'Shopify' },
  { value: 'SiSupabase', label: 'Supabase' },
  { value: 'SiGit', label: 'Git' },
  { value: 'SiDocker', label: 'Docker' },
  { value: 'SiFigma', label: 'Figma' },
  { value: 'SiAccuweather', label: 'Accuweather' },
  { value: 'SeoIcon', label: 'SEO' },
]

