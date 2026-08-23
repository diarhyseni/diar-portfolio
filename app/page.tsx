import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ExperienceSection } from "@/components/experience-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SiteSidebar } from "@/components/site-sidebar"
import { SectionNavigation } from "@/components/section-navigation"

export default function Page() {
  return (
    <SidebarProvider className="bg-background">
      <style dangerouslySetInnerHTML={{
        __html: `
          .header-below-1500 {
            display: flex;
          }
          
          @media (min-width: 1500px) {
            .header-below-1500 {
              display: none;
            }
          }

          @media (max-width: 768px) {
            .mobile-site-header {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              z-index: 100;
              width: 100%;
              max-width: 100vw;
              background: rgba(8, 9, 13, 0.96) !important;
              border-bottom: 1px solid rgba(255, 255, 255, 0.12);
              backdrop-filter: blur(16px);
              -webkit-backdrop-filter: blur(16px);
            }

            [data-slot="sidebar-inset"] {
              padding-top: 4rem;
              min-height: 100dvh;
              height: 100dvh;
            }

            [data-slot="sidebar-wrapper"] {
              min-height: 100dvh;
              height: 100dvh;
            }
          }

          /* Prevent horizontal scrolling */
          html, body {
            overflow-x: hidden !important;
            max-width: 100vw !important;
            width: 100% !important;
          }
          
          @media (max-width: 768px) {
            #home {
              min-height: 70vh !important;
              height: auto !important;
              max-height: none !important;
              max-width: 100vw !important;
              overflow-x: hidden !important;
              overflow-y: visible !important;
              box-sizing: border-box;
            }

            #about,
            #experience,
            #skills,
            #projects,
            #contact {
              min-height: 100vh !important;
              height: auto !important;
              max-height: none !important;
              max-width: 100vw !important;
              overflow-x: hidden !important;
              overflow-y: visible !important;
              box-sizing: border-box;
            }

            #about > div,
            #experience > div,
            #skills > div,
            #projects > div,
            #contact > div {
              padding-left: 1rem !important;
              padding-right: 1rem !important;
              width: 100%;
              max-width: 100%;
              box-sizing: border-box;
            }
          }

          /* Add large gaps between sections on tablet only */
          @media (min-width: 768px) and (max-width: 1499px) {
            #home,
            #about,
            #experience,
            #skills,
            #projects,
            #contact {
              margin-bottom: 25vh;
            }

            #contact {
              margin-bottom: 0;
            }
          }

          /* Remove spacing on mobile */
          @media (max-width: 767px) {
            #home,
            #about,
            #experience,
            #skills,
            #projects,
            #contact {
              margin-bottom: 0;
            }
          }
        `
      }} />
      <SiteSidebar />
      <SidebarInset className="flex h-screen flex-col overflow-hidden bg-background">
        <header className="mobile-site-header header-below-1500 sticky top-0 z-20 flex h-16 shrink-0 items-center gap-4 border-b border-border/60 bg-background/80 px-4 backdrop-blur">
          <SidebarTrigger />
          <div className="flex flex-col">
            <span className="text-xs uppercase text-muted-foreground">Navigate</span>
            <span className="text-base font-semibold">Diar Hyseni</span>
          </div>
        </header>

        <div id="main-scroll" className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain md:h-screen md:snap-y md:snap-mandatory w-full" style={{ scrollPaddingTop: '0px', maxWidth: '100vw', WebkitOverflowScrolling: 'touch' }}>
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </div>
        <SectionNavigation />
      </SidebarInset>
    </SidebarProvider>
  )
}
