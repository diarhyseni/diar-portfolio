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

          /* Prevent horizontal scrolling */
          html, body {
            overflow-x: hidden !important;
            max-width: 100vw !important;
            width: 100% !important;
          }
          
          @media (max-width: 768px) {
            #home,
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
      <SidebarInset className="h-screen overflow-hidden">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border/60 bg-background/80 px-4 backdrop-blur header-below-1500">
          <SidebarTrigger />
          <div className="flex flex-col">
            <span className="text-xs uppercase text-muted-foreground">Navigate</span>
            <span className="text-base font-semibold">Diar Hyseni</span>
          </div>
        </header>

        <div className="md:snap-y md:snap-mandatory overflow-y-scroll overflow-x-hidden h-auto md:h-screen w-full" style={{ scrollPaddingTop: '0px', maxWidth: '100vw' }}>
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
