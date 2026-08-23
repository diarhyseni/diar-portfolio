"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react"
import { getIconComponent } from "@/lib/icon-mapper"
import { projects, type Project } from "@/lib/projects-data"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useReveal } from "@/hooks/use-reveal"

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [maxProjects, setMaxProjects] = useState(8)
  const headerReveal = useReveal<HTMLDivElement>()
  const gridReveal = useReveal<HTMLDivElement>({ threshold: 0.08 })

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768
      setMaxProjects(isMobile ? 6 : window.innerWidth >= 1920 ? 8 : 9)
    }

    // Set initial value
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const openProject = (project: Project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
  }

  const closeProject = () => {
    setSelectedProject(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.gallery.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.gallery.length - 1 : prev - 1
      )
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          :root {
            --projects-hue1: 270;
            --projects-hue2: 220;
            --projects-border: 1px;
            --projects-border-color: hsl(var(--projects-hue2), 12%, 20%);
            --projects-radius: 16px;
          }

          #projects {
            position: relative;
            isolation: isolate;
            min-height: 130vh;
            display: flex;
            align-items: center;
            padding: 2rem 2rem;
            scroll-snap-align: start;
            scroll-snap-stop: always;
            background: #000;
            background-image: url(/abract_light_55.jpg), linear-gradient(to right in oklab, hsl(var(--projects-hue2) 50% 70%), hsl(var(--projects-hue1) 50% 70%));
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-blend-mode: hard-light;
          }

          #projects::after {
            content: "";
            position: absolute;
            inset: 0;
            z-index: 0;
            pointer-events: none;
            background: rgba(0, 0, 0, 0.3);
          }

          #projects > div {
            position: relative;
            z-index: 1;
          }

          @media (min-width: 768px) and (max-width: 1024px) {
            #projects {
              padding: 0;
              min-height: 100vh;
              height: 100vh;
              display: flex;
              align-items: center;
            }

            .projects-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
          }

          @media (min-width: 1024px) {
            #projects {
              padding: 2rem 3rem;
            }
          }

          @media (min-width: 1400px) {
            #projects {
              padding: 2rem 4rem;
            }
          }

          @media (min-width: 769px) and (max-width: 1024px) {
            #projects {
              padding: 2rem 2rem;
            }
          }

          @media (max-width: 768px) {
            #projects {
              height: auto;
              min-height: 100vh;
              padding: 3rem 0;
              display: flex;
              align-items: center;
            }
          }

          .projects-grid {
            grid-template-columns: repeat(1, minmax(0, 1fr));
            gap: 1.25rem;
          }

          .project-card {
            position: relative;
            isolation: isolate;
            border-radius: var(--projects-radius);
            border: 1px solid rgba(255, 255, 255, 0.08);
            background:
              linear-gradient(160deg, hsl(var(--projects-hue1) 45% 14% / 0.55), transparent 42%),
              linear-gradient(320deg, hsl(var(--projects-hue2) 45% 12% / 0.45), transparent 38%),
              linear-gradient(180deg, rgba(12, 12, 18, 0.96), rgba(4, 4, 8, 0.98));
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            box-shadow:
              0 12px 28px rgba(0, 0, 0, 0.35),
              inset 0 1px 0 rgba(255, 255, 255, 0.06);
            overflow: hidden;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            min-height: 100%;
            transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.35s ease, box-shadow 0.35s ease;
          }

          .project-card::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: inherit;
            padding: 1px;
            background: linear-gradient(135deg, hsl(var(--projects-hue1) 70% 65% / 0.45), transparent 40%, hsl(var(--projects-hue2) 70% 60% / 0.35));
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.35s ease;
          }

          .project-card:hover,
          .project-card:focus-visible {
            transform: translateY(-6px);
            border-color: rgba(255, 255, 255, 0.14);
            box-shadow:
              0 20px 40px rgba(0, 0, 0, 0.45),
              0 0 0 1px rgba(255, 255, 255, 0.04),
              0 0 32px hsl(var(--projects-hue1) 80% 55% / 0.12);
          }

          .project-card:hover::before,
          .project-card:focus-visible::before {
            opacity: 1;
          }

          .project-card:focus-visible {
            outline: 2px solid hsl(var(--projects-hue1) 80% 65%);
            outline-offset: 3px;
          }

          .project-image-wrapper {
            position: relative;
            width: 100%;
            aspect-ratio: 16 / 9;
            overflow: hidden;
            background: hsl(220 20% 6%);
          }

          .project-image {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center center;
            transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
          }

          .project-card:hover .project-image,
          .project-card:focus-visible .project-image {
            transform: scale(1.05);
          }

          .project-year-badge {
            position: absolute;
            top: 0.85rem;
            left: 0.85rem;
            padding: 0.35rem 0.7rem;
            background: rgba(0, 0, 0, 0.62);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-radius: 999px;
            border: 1px solid rgba(255, 255, 255, 0.12);
            font-family: "Science Gothic", sans-serif;
            font-size: 0.72rem;
            font-weight: 400;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.92);
            z-index: 3;
          }

          .project-content {
            padding: 1.1rem 1.1rem 1.15rem;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            gap: 0.85rem;
          }

          .project-title {
            font-family: "Science Gothic", sans-serif;
            font-size: 1.15rem;
            font-weight: 400;
            color: white;
            line-height: 1.35;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .project-description {
            font-family: "Science Gothic", sans-serif;
            font-size: 0.88rem;
            font-weight: 300;
            color: rgba(255, 255, 255, 0.68);
            line-height: 1.55;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .project-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.75rem;
            margin-top: auto;
            padding-top: 0.85rem;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
          }

          .project-tech {
            display: flex;
            flex-wrap: wrap;
            gap: 0.45rem;
            align-items: center;
          }

          .project-tech-pill {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 1.85rem;
            height: 1.85rem;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.08);
            transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease;
          }

          .project-card:hover .project-tech-pill,
          .project-card:focus-visible .project-tech-pill {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.14);
          }

          .project-tech-icon {
            width: 1rem;
            height: 1rem;
            color: rgba(255, 255, 255, 0.92);
          }

          .project-tech-more {
            font-family: "Science Gothic", sans-serif;
            font-size: 0.72rem;
            font-weight: 300;
            color: rgba(255, 255, 255, 0.55);
            padding: 0.2rem 0.45rem;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.05);
          }

          .project-view-btn {
            font-family: "Science Gothic", sans-serif;
            font-size: 0.78rem;
            padding: 0.48rem 0.85rem;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid hsl(var(--projects-hue1) 45% 45% / 0.28);
            border-radius: 999px;
            color: rgba(255, 255, 255, 0.9);
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            font-weight: 400;
            letter-spacing: 0.03em;
            white-space: nowrap;
            transition: transform 0.25s ease, background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease;
          }

          .project-card:hover .project-view-btn,
          .project-card:focus-visible .project-view-btn {
            color: white;
            background: hsl(var(--projects-hue1) 55% 42% / 0.2);
            border-color: hsl(var(--projects-hue1) 60% 58% / 0.45);
          }

          .project-view-btn svg {
            width: 0.9rem;
            height: 0.9rem;
            transition: transform 0.25s ease;
          }

          .project-card:hover .project-view-btn svg,
          .project-card:focus-visible .project-view-btn svg {
            transform: translate(2px, -2px);
          }

          .projects-section-title {
            font-family: "Science Gothic", sans-serif;
            font-size: 28px;
            text-transform: uppercase;
            letter-spacing: 0.3em;
            color: rgba(255, 255, 255, 0.7);
            font-weight: 300;
            display: block;
            text-align: center;
            margin-bottom: 1rem;
          }

          .gallery-container {
            position: relative;
            width: 100%;
            height: auto;
            overflow: hidden;
            background: #000;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
          }

          .gallery-media {
            position: relative;
            width: 100%;
            flex: none;
            overflow: hidden;
            background: #000;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 12rem;
            max-height: min(75vh, calc(100dvh - 14rem));
          }

          .gallery-image {
            display: block;
            width: 100%;
            height: auto;
            max-height: min(75vh, calc(100dvh - 14rem));
            object-fit: contain;
            object-position: center center;
            background: #000;
            margin: 0;
            padding: 0;
          }

          .gallery-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: transparent;
            border: none;
            border-radius: 0;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 20;
            padding: 0;
            box-shadow: none;
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
          }

          .gallery-nav:hover,
          .gallery-nav:focus-visible {
            transform: translateY(-50%);
            background: transparent;
            box-shadow: none;
            outline: none;
          }

          .gallery-nav svg {
            width: 3rem;
            height: 3rem;
            filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.85));
          }

          .gallery-nav.prev svg,
          .gallery-nav.next svg {
            filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.85));
          }

          .gallery-nav.prev {
            left: 1.5rem;
          }

          .gallery-nav.next {
            right: 1.5rem;
          }

          .gallery-gradient-overlay {
            position: relative;
            flex-shrink: 0;
            background: rgba(0, 0, 0, 0.95);
            padding: 1.25rem 1.5rem 1.5rem;
            z-index: 15;
          }

          .modal-content-wrapper {
            height: auto;
            max-height: calc(100dvh - 2rem);
            overflow-x: hidden;
            overflow-y: auto;
            padding: 0;
            display: flex;
            flex-direction: column;
          }

          .modal-content-wrapper::-webkit-scrollbar {
            width: 8px;
          }

          .modal-content-wrapper::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
          }

          .modal-content-wrapper::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 4px;
          }

          .modal-content-wrapper::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.3);
          }

          /* Centered popup: content height only (16:9 image + overlay), equal side margins */
          .project-detail-dialog[data-slot="dialog-content"] {
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            translate: none !important;
            width: calc(100vw - 2rem) !important;
            max-width: min(56rem, calc(100vw - 2rem)) !important;
            height: auto !important;
            max-height: calc(100dvh - 2rem) !important;
            padding: 0 !important;
            margin: 0 !important;
            gap: 0 !important;
            border-radius: 12px !important;
            overflow: hidden !important;
            display: block !important;
          }

          /* Close button — no background or hover effects */
          .project-detail-dialog [data-slot="dialog-close"] {
            width: 2.5rem !important;
            height: 2.5rem !important;
            top: 1rem !important;
            right: 1rem !important;
            background: transparent !important;
            opacity: 1 !important;
            transition: none !important;
            box-shadow: none !important;
          }

          .project-detail-dialog [data-slot="dialog-close"]:hover,
          .project-detail-dialog [data-slot="dialog-close"]:focus,
          .project-detail-dialog [data-slot="dialog-close"]:focus-visible,
          .project-detail-dialog [data-slot="dialog-close"][data-state="open"] {
            background: transparent !important;
            opacity: 1 !important;
            outline: none !important;
            box-shadow: none !important;
          }

          .project-detail-dialog [data-slot="dialog-close"] svg {
            width: 1.5rem !important;
            height: 1.5rem !important;
            color: white;
            filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.85));
          }

          .modal-content-wrapper {
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          .gallery-container {
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          .projects-grid {
            grid-template-columns: repeat(1, minmax(0, 1fr));
          }

          @media (min-width: 768px) {
            .projects-grid {
              grid-template-columns: repeat(3, minmax(0, 1fr));
              gap: 1.35rem;
            }
          }

          @media (min-width: 1920px) {
            .projects-grid {
              grid-template-columns: repeat(4, minmax(0, 1fr));
            }
          }

          @media (max-width: 768px) {
            .project-detail-dialog .gallery-gradient-overlay {
              padding: 1rem 1rem max(1rem, env(safe-area-inset-bottom));
            }

            .project-detail-dialog .gallery-gradient-overlay [data-slot="dialog-title"] {
              font-size: 1.25rem !important;
            }

            .project-detail-dialog .gallery-gradient-overlay .flex.items-center.justify-between {
              flex-direction: column;
              align-items: flex-start;
              gap: 0.75rem;
            }

            .project-detail-dialog .gallery-nav svg {
              width: 2rem;
              height: 2rem;
            }

            .project-detail-dialog .gallery-nav.prev {
              left: 0.5rem;
            }

            .project-detail-dialog .gallery-nav.next {
              right: 0.5rem;
            }
          }

          /* Mobile padding must match about/experience/skills/contact */
          @media (max-width: 768px) {
            #projects {
              min-height: 100vh;
              height: auto;
              padding: 3rem 0 !important;
              margin-left: 0 !important;
              margin-right: 0 !important;
              display: flex;
              align-items: center;
            }

            #projects > div {
              padding-left: 1rem !important;
              padding-right: 1rem !important;
              width: 100%;
              max-width: 100%;
              box-sizing: border-box;
            }
          }
        `
      }} />
      <section id="projects" aria-label="Projects">
        <div className="max-w-6xl mx-auto w-full py-3">
        <div
          ref={headerReveal.ref}
          className={`text-center mb-4 space-y-4 reveal-up ${headerReveal.revealClass}`}
        >
            <p className="projects-section-title">Selected Projects</p>
            <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Science Gothic', sans-serif", fontWeight: 300 }}>
            A selection of recent work that showcases my skills and expertise
          </p>
        </div>

          <>
            <div
              ref={gridReveal.ref}
              className={`projects-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 reveal-stagger ${gridReveal.revealClass}`}
            >
          {[...projects]
            .sort((a, b) => Number(b.year) - Number(a.year))
            .slice(0, maxProjects)
            .map((project, index) => (
            <article
                key={project.id}
                className="project-card reveal-item"
              style={{ transitionDelay: gridReveal.isVisible ? `${Math.min(index, 9) * 60}ms` : undefined }}
                onClick={() => openProject(project)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault()
                    openProject(project)
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View project: ${project.title}`}
            >
                <div className="project-image-wrapper">
                <img
                    src={project.gallery[0] || "/placeholder.svg"}
                  alt={project.title}
                    className="project-image"
                    loading="lazy"
                    decoding="async"
                    width={640}
                    height={360}
                />
                  <div className="project-year-badge">
                    {project.year}
              </div>
                </div>
                <div className="project-content">
                  <div className="space-y-2">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">
                      {project.short_description || project.description}
                    </p>
                  </div>
                  <div className="project-footer">
                    <div className="project-tech">
                      {project.technologies.slice(0, 4).map((techIconName) => {
                        const IconComponent = getIconComponent(techIconName)
                        if (!IconComponent) return null
                        return (
                          <div
                            key={techIconName}
                            className="project-tech-pill"
                            title={techIconName.replace('Si', '').replace(/([A-Z])/g, ' $1').trim()}
                          >
                            <IconComponent className="project-tech-icon" />
                          </div>
                        )
                      })}
                      {project.technologies.length > 4 && (
                        <span className="project-tech-more">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                    <span className="project-view-btn">
                      View
                      <ArrowUpRight aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
            </div>
            <div className="text-center mt-12 mb-24">
              <p className="text-white/70" style={{ fontFamily: "'Science Gothic', sans-serif", fontWeight: 300 }}>
                + 30 projects more,{" "}
                <button
                  onClick={() => {
                    const section = document.getElementById('contact');
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="text-white hover:text-white/80 underline transition-colors inline"
                  style={{ fontFamily: "'Science Gothic', sans-serif", fontWeight: 300 }}
                >
                  request to view all
                </button>
              </p>
            </div>
          </>
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <Dialog open={!!selectedProject} onOpenChange={closeProject}>
            <DialogContent className="project-detail-dialog bg-black border-white/10 text-white p-0">
              <div className="modal-content-wrapper">
                <div className="gallery-container">
                  <div className="gallery-media">
                    <img
                      src={selectedProject.gallery[currentImageIndex]}
                      alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                      className="gallery-image"
                    />
                    {selectedProject.gallery.length > 1 && (
                      <>
                        <button
                          className="gallery-nav prev"
                          onClick={(e) => {
                            e.stopPropagation()
                            prevImage()
                          }}
                          aria-label="Previous image"
                        >
                          <ChevronLeft />
                        </button>
                        <button
                          className="gallery-nav next"
                          onClick={(e) => {
                            e.stopPropagation()
                            nextImage()
                          }}
                          aria-label="Next image"
                        >
                          <ChevronRight />
                        </button>
                      </>
                    )}
                  </div>

                  <div className="gallery-gradient-overlay">
                    <DialogHeader className="text-left">
                      <DialogTitle className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Science Gothic', sans-serif", fontWeight: 400 }}>
                        {selectedProject.title}
                      </DialogTitle>
                    </DialogHeader>

                    {/* Technologies and Buttons in one line */}
                    <div className="flex items-center justify-between gap-4">
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.technologies.map((techIconName) => {
                          const IconComponent = getIconComponent(techIconName)
                          if (!IconComponent) return null
                          return (
                            <div
                              key={techIconName}
                              className="flex items-center"
                              title={techIconName.replace('Si', '').replace(/([A-Z])/g, ' $1').trim()}
                            >
                              <IconComponent
                                className="w-6 h-6 text-white hover:scale-110 transition-transform"
                              />
                            </div>
                          )
                        })}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 flex-shrink-0">
                        {selectedProject.live_url && (
                          <Button
                            asChild
                            className="bg-white text-black hover:bg-white/90 border-white"
                            style={{ fontFamily: "'Science Gothic', sans-serif", fontWeight: 300 }}
                          >
                            <a href={selectedProject.live_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Live Demo
                            </a>
                          </Button>
                        )}
                        {selectedProject.github_url && (
                          <Button
                            asChild
                            variant="outline"
                            className="border-white/20 bg-white/5 hover:bg-white/10 text-white p-3"
                            style={{ fontFamily: "'Science Gothic', sans-serif", fontWeight: 300 }}
                          >
                            <a href={selectedProject.github_url} target="_blank" rel="noopener noreferrer">
                              <Github className="w-7 h-7 text-white hover:text-white" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
    </section>
    </>
  )
}
