"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getIconComponent } from "@/lib/icon-mapper"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Project {
  id: string
  title: string
  description: string
  short_description?: string
  gallery: string[]
  technologies: string[] // Array of icon names like "SiReact", "SiNextdotjs", etc.
  year: string
  github_url?: string
  live_url?: string
}

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [maxProjects, setMaxProjects] = useState(8)

  useEffect(() => {
    const handleResize = () => {
      setMaxProjects(window.innerWidth >= 1920 ? 8 : 9)
    }

    // Set initial value
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects")
        if (response.ok) {
          const data = await response.json()
          // Normalize data to match interface
          const normalizedProjects = data.map((project: any) => ({
            id: project.id,
            title: project.title,
            description: project.description,
            short_description: project.short_description,
            gallery: Array.isArray(project.gallery) ? project.gallery : [],
            technologies: Array.isArray(project.technologies) ? project.technologies : [],
            year: project.year,
            github_url: project.github_url,
            live_url: project.live_url,
          }))
          setProjects(normalizedProjects)
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
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
            --projects-radius: 22px;
          }

          #projects {
            min-height: 130vh;
            display: flex;
            align-items: center;
            padding: 2rem 2rem;
            scroll-snap-align: start;
            scroll-snap-stop: always;
            background: #000000;
          /* background-image: url(https://assets.codepen.io/13471/abstract-light.jpg), linear-gradient(to right in oklab, hsl(var(--projects-hue2) 50% 75%), hsl(var(--projects-hue1) 50% 75%));*/
            background-size: cover;
            background-position: center;
            background-blend-mode: hard-light;
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

          @media (max-width: 1024px) {
            #projects {
              padding: 2rem 2rem;
            }
          }

          @media (max-width: 768px) {
            #projects {
              padding: 2rem 1rem;
            }
          }

          .project-card {
            position: relative;
            border-radius: 12px;
            border: var(--projects-border) solid var(--projects-border-color);
            background: linear-gradient(235deg, hsl(var(--projects-hue1) 50% 10% / 0.9), hsl(var(--projects-hue1) 50% 10% / 0) 25%), 
                        linear-gradient(45deg, hsl(var(--projects-hue2) 50% 10% / 0.9), hsl(var(--projects-hue2) 50% 10% / 0) 25%), 
                        linear-gradient(hsl(220deg 25% 0% / 0.85));
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            box-shadow: hsl(var(--projects-hue2) 50% 2%) 0px 10px 16px -8px, hsl(var(--projects-hue2) 50% 4%) 0px 20px 36px -14px;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
          }

          .project-card:hover {
            transform: translateY(-4px);
            box-shadow: hsl(var(--projects-hue2) 50% 4%) 0px 20px 32px -12px, hsl(var(--projects-hue2) 50% 6%) 0px 30px 48px -18px;
          }

          .project-image-wrapper {
            position: relative;
            width: 100%;
            aspect-ratio: 16/9;
            overflow: hidden;
            background: rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .project-year-badge {
            position: absolute;
            top: 0.75rem;
            right: 0.75rem;
            padding: 0.375rem 0.75rem;
            background: rgba(200, 200, 200, 0.6);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-radius: 8px;
            border: 1px solid rgb(173, 173, 173);
            font-family: "Science Gothic", sans-serif;
            font-size: 0.75rem;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.9);
            z-index: 10;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          }

          .project-image {
            width: 100%;
            height: 100%;
            object-fit: container;
            transition: transform 0.5s ease;
          }

          .project-card:hover .project-image {
            transform: scale(1.05);
          }

          .project-content {
            padding: 1.0rem;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            justify-content: space-between;
          }

          .project-title {
            font-family: "Science Gothic", sans-serif;
            font-size: 1.4rem;
            font-weight: 300;
            color: white;
            margin-bottom: 0.4rem;
            line-height: 1.2em;
            height: 2.4em; 
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .project-description {
            font-family: "Science Gothic", sans-serif;
            font-size: 0.9rem;
            font-weight: 300;
            color: rgba(255, 255, 255, 0.7);
            line-height: 1.6;
            margin-bottom: 1rem;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .project-tech {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
           
            align-items: center;
          }

          .project-tech-icon {
            width: 1.2rem;
            height: 1.2rem;
            color: rgba(255, 255, 255, 0.9);
            transition: all 0.3s ease;
          }

          .project-tech-icon:hover {
            transform: scale(1.1);
            color: white;
          }

          .project-view-btn {
            font-family: "Science Gothic", sans-serif;
            font-size: 0.8rem;
            padding: 0.5rem 1rem;
            background: transparent;
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 8px;
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            width: auto;
            justify-content: center;
            margin-left: auto;
            font-weight: 300;
          }

          .project-view-btn:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.5);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            animation: none;
          }

          @keyframes wiggle {
            0%, 100% { transform: rotate(0deg) translateY(0); }
            25% { transform: rotate(-3deg) translateY(-2px); }
            75% { transform: rotate(3deg) translateY(-2px); }
          }

          .project-card:hover .project-view-btn {
            animation: wiggle 0.5s ease-in-out infinite;
          }

          .project-card:hover .project-view-btn:hover {
            animation: none;
            transform: translateY(-2px);
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
            height: 90vh;
            overflow: hidden;
            background: rgba(0, 0, 0, 0.3);
            margin: 0;
            padding: 0;
          }

          .gallery-image {
            width: 100%;
            height: 100%;
            object-fit: contain;
            background: rgba(0, 0, 0, 0.5);
            display: block;
            margin: 0;
            padding: 0;
          }

          .gallery-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: transparent;
            border: none;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 20;
            padding: 0;
          }

          .gallery-nav:hover {
            transform: translateY(-50%) scale(1.2);
            opacity: 0.8;
          }

          .gallery-nav svg {
            width: 3rem;
            height: 3rem;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
          }

          .gallery-nav.prev {
            left: 1.5rem;
          }

          .gallery-nav.next {
            right: 1.5rem;
          }

          .gallery-gradient-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0) 100%);
            padding: 6rem 2rem 2rem;
            min-height: 200px;
            z-index: 15;
          }

          .modal-content-wrapper {
            max-height: 90vh;
            overflow: hidden;
            padding: 0;
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

          /* Override Dialog default max-width to make it wider */
          [data-slot="dialog-content"] {
            max-width: 90vw !important;
            width: 85vw !important;
            padding: 0 !important;
            margin: 0 !important;
            gap: 0 !important;
            border-radius: 12px !important;
          }

          /* Make close button larger */
          [data-slot="dialog-close"] {
            width: 2.5rem !important;
            height: 2.5rem !important;
            top: 1rem !important;
            right: 1rem !important;
          }

          [data-slot="dialog-close"] svg {
            width: 1.5rem !important;
            height: 1.5rem !important;
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
            }
          }

          @media (min-width: 1920px) {
            .projects-grid {
              grid-template-columns: repeat(4, minmax(0, 1fr));
            }
          }

          @media (max-width: 768px) {
            [data-slot="dialog-content"] {
              max-width: 90vw !important;
              width: 90vw !important;
            }

            .gallery-container {
              height: 90vh;
            }

            .gallery-nav svg {
              width: 2rem;
              height: 2rem;
            }

            .gallery-nav.prev {
              left: 0.75rem;
            }

            .gallery-nav.next {
              right: 0.75rem;
            }

            .gallery-gradient-overlay {
              padding: 2rem 1.5rem 1.5rem;
            }

            .gallery-gradient-overlay h2 {
              font-size: 1.5rem;
            }
          }
        `
      }} />
      <section id="projects" aria-label="Projects">
        <div className=" mx-auto w-full py-3">
        <div className="text-center mb-4 space-y-4">
            <p className="projects-section-title">Selected Projects</p>
            <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Science Gothic', sans-serif", fontWeight: 300 }}>
            A selection of recent work that showcases my skills and expertise
          </p>
        </div>

          {loading ? (
            <div className="text-center text-white/60 py-20">Loading projects...</div>
          ) : projects.length === 0 ? (
            <div className="text-center text-white/60 py-20">No projects available yet</div>
          ) : (
            <>
            <div className="projects-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {projects.slice(0, maxProjects).map((project, index) => (
            <div
                key={project.id}
                className="project-card animate-in fade-in slide-in-from-bottom"
              style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => openProject(project)}
            >
                <div className="project-image-wrapper">
                <img
                    src={project.gallery[0] || "/placeholder.svg"}
                  alt={project.title}
                    className="project-image"
                />
                  <div className="project-year-badge">
                    {project.year}
              </div>
                </div>
                <div className="project-content">
                  <div>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">
                      {project.short_description || project.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4">
                    <div className="project-tech">
                      {project.technologies.slice(0, 4).map((techIconName) => {
                        const IconComponent = getIconComponent(techIconName)
                        if (!IconComponent) return null
                        return (
                          <div
                            key={techIconName}
                            title={techIconName.replace('Si', '').replace(/([A-Z])/g, ' $1').trim()}
                          >
                            <IconComponent className="project-tech-icon" />
                          </div>
                        )
                      })}
                      {project.technologies.length > 4 && (
                        <span className="text-white/60 text-xs" style={{ fontFamily: "'Science Gothic', sans-serif", fontWeight: 300 }}>
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                    <button className="project-view-btn">
                      View Details
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
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
          )}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <Dialog open={!!selectedProject} onOpenChange={closeProject}>
            <DialogContent className="!max-w-[90vw] !w-[85vw] max-h-[90vh] bg-black border-white/10 text-white p-0 overflow-hidden">
              <div className="modal-content-wrapper">
                {/* Gallery Section with Gradient Overlay */}
                <div className="gallery-container">
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
                  
                  {/* Gradient Overlay with Content */}
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
