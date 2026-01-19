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

          /* Add large gaps between sections on tablet and mobile */
          @media (max-width: 1499px) {
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

        <div className="md:snap-y md:snap-mandatory overflow-y-scroll h-auto md:h-screen" style={{ scrollPaddingTop: '0px' }}>
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
