'use client'

import * as React from 'react'
import Image from 'next/image'
import {
  Home,
  UserRound,
  Briefcase,
  Sparkles,
  FolderKanban,
  Mail,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

const NAV_SECTIONS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: UserRound },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Sparkles },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'contact', label: 'Contact', icon: Mail },
] as const

export function SiteSidebar({ className }: { className?: string }) {
  const { setOpenMobile } = useSidebar()
  const [activeSection, setActiveSection] = React.useState<string>('home')

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find all intersecting sections
        const intersectingSections = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => ({
            id: entry.target.id,
            ratio: entry.intersectionRatio,
            top: entry.boundingClientRect.top,
            bottom: entry.boundingClientRect.bottom,
            height: entry.boundingClientRect.height,
          }))

        if (intersectingSections.length > 0) {
          // Prioritize sections that are more centered in the viewport
          const viewportCenter = window.innerHeight / 2
          const sortedSections = intersectingSections.sort((a, b) => {
            // Calculate distance from viewport center
            const aCenter = a.top + a.height / 2
            const bCenter = b.top + b.height / 2
            const aDistanceFromCenter = Math.abs(aCenter - viewportCenter)
            const bDistanceFromCenter = Math.abs(bCenter - viewportCenter)
            
            // Prefer section closer to center, then by intersection ratio
            if (Math.abs(aDistanceFromCenter - bDistanceFromCenter) < 50) {
              return b.ratio - a.ratio
            }
            return aDistanceFromCenter - bDistanceFromCenter
          })

          const activeId = sortedSections[0].id
          setActiveSection(activeId)
        }
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1], rootMargin: '-100px 0px -50%' },
    )

    NAV_SECTIONS.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const handleNavigate = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      // Immediately set the clicked section as active
      setActiveSection(id)
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setOpenMobile(false)
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          [data-sidebar="sidebar"],
          [data-sidebar="sidebar"] *,
          .sidebar-menu-item,
          .sidebar-menu-item * {
            font-family: "Science Gothic", sans-serif !important;
            font-weight: 250;
          }
          
          [data-sidebar="sidebar"] {
            background-color: black !important;
          }
          
          [data-sidebar="sidebar"] [data-sidebar="separator"] {
            width: 100% !important;
            max-width: 100% !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            overflow: hidden !important;
          }
        `
      }} />
      <Sidebar
        collapsible="icon"
        className={cn(
          'border-r border-border bg-black',
          className,
        )}
      >
      <SidebarHeader className="px-3 py-4">
        <div className="flex items-center gap-3">
          <div className="relative size-11 overflow-hidden rounded-full   bg-black">
            <Image
              src="/logo.png"
              alt="Site logo"
              fill
              sizes="44px"
              className="object-contain p-1"
            />
          </div>
          <div className="transition-opacity duration-200 group-data-[collapsible=icon]/sidebar:opacity-0 group-data-[collapsible=icon]/sidebar:translate-x-2">
            <p className="text-base font-semibold tracking-tight">
              Diar Hyseni
            </p>
            <p className="text-sm text-muted-foreground">Full-Stack Dev</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarSeparator className="mx-0 w-full max-w-full" />
      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_SECTIONS.map(({ id, label, icon: Icon }) => (
                <SidebarMenuItem key={id} className="sidebar-menu-item">
                  <SidebarMenuButton
                    asChild
                    tooltip={label}
                    isActive={activeSection === id}
                    className="text-base sidebar-menu-item"
                  >
                    <button
                      type="button"
                      onClick={() => handleNavigate(id)}
                      className="flex items-center gap-3 sidebar-menu-item"
                    >
                      <Icon className="size-4 shrink-0" />
                      <span className="sidebar-menu-item">{label}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-border/60 pt-4">
        <p className="text-xs text-muted-foreground group-data-[collapsible=icon]/sidebar:hidden">
          © {new Date().getFullYear()} Diar Hyseni. All rights reserved.
        </p>
      </SidebarFooter>
    </Sidebar>
    </>
  )
}

