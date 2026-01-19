'use client'

import { useState, useEffect } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

const SECTIONS = ['home', 'about', 'experience', 'skills', 'projects', 'contact'] as const

export function SectionNavigation() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            const index = SECTIONS.indexOf(sectionId as typeof SECTIONS[number])
            if (index !== -1) {
              setCurrentSectionIndex(index)
            }
          }
        })
      },
      { threshold: 0.5 }
    )

    SECTIONS.forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (index: number) => {
    const sectionId = SECTIONS[index]
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const goToPrevious = () => {
    if (currentSectionIndex > 0) {
      scrollToSection(currentSectionIndex - 1)
    }
  }

  const goToNext = () => {
    if (currentSectionIndex < SECTIONS.length - 1) {
      scrollToSection(currentSectionIndex + 1)
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .section-nav {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            z-index: 50;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }

          .section-nav-button {
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            background: linear-gradient(235deg, hsl(290 55% 15% / 0.9), hsl(290 55% 15% / 0) 50%), 
                        linear-gradient(45deg, hsl(240 55% 15% / 0.9), hsl(240 55% 15% / 0) 50%), 
                        linear-gradient(hsl(220deg 25% 0% / 0.1));
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 0.5px solid rgba(255, 255, 255, 0.09);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: visible;
          }

          .section-nav-button::before {
            content: "";
            position: absolute;
            inset: -2px;
            border: 2px solid;
            border-top-color: hsl(290, 80%, 60%, 0.7);
            border-right-color: hsl(290, 80%, 60%, 0.7);
            border-bottom-color: hsl(240, 80%, 60%, 0.7);
            border-left-color: hsl(240, 80%, 60%, 0.7);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .section-nav-button:hover::before {
            opacity: 1;
          }

          .section-nav-button:hover {
            transform: translateY(-2px);
            background: linear-gradient(235deg, hsl(290 60% 20% / 0.9), hsl(290 60% 20% / 0) 40%), 
                        linear-gradient(45deg, hsl(240 60% 20% / 0.9), hsl(240 60% 20% / 0) 40%), 
                        linear-gradient(hsl(220deg 25% 0% / 0.6));
          }

          .section-nav-button:disabled {
            opacity: 0.3;
            cursor: not-allowed;
            pointer-events: none;
          }

          .section-nav-button svg {
            width: 1.5rem;
            height: 1.5rem;
          }

          @media (max-width: 768px) {
            .section-nav {
              bottom: 1rem;
              right: 1rem;
              display: none;
            }
          }
        `
      }} />
      <div className="section-nav">
        <button
          className="section-nav-button"
          onClick={goToPrevious}
          disabled={currentSectionIndex === 0}
          aria-label="Previous section"
        >
          <ChevronUp />
        </button>
        <button
          className="section-nav-button"
          onClick={goToNext}
          disabled={currentSectionIndex === SECTIONS.length - 1}
          aria-label="Next section"
        >
          <ChevronDown />
        </button>
      </div>
    </>
  )
}
