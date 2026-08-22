'use client'

import { useState, useEffect } from 'react'

const SECTIONS = ['home', 'about', 'experience', 'skills', 'projects', 'contact'] as const

function NavArrow({ direction }: { direction: 'up' | 'down' }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d={direction === 'up' ? 'M7 11V3M4 6.5L7 3L10 6.5' : 'M7 3V11M4 7.5L7 11L10 7.5'}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

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
            isolation: isolate;
            background: #0a0a0f;
            border: 1px solid rgba(255, 255, 255, 0.14);
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.55);
          }

          .section-nav-button {
            width: 2.75rem;
            height: 2.75rem;
            border: none;
            border-radius: 0;
            background: #0a0a0f;
            color: rgba(255, 255, 255, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            padding: 0;
            transition: background-color 0.2s ease, color 0.2s ease;
          }

          .section-nav-divider {
            height: 1px;
            background: rgba(255, 255, 255, 0.12);
            flex-shrink: 0;
          }

          .section-nav-button:hover:not(:disabled) {
            background: #14141c;
            color: #ffffff;
          }

          .section-nav-button:active:not(:disabled) {
            background: #1a1a24;
          }

          .section-nav-button:focus-visible {
            outline: 2px solid rgba(255, 255, 255, 0.45);
            outline-offset: -2px;
          }

          .section-nav-button:disabled {
            cursor: not-allowed;
            color: rgba(255, 255, 255, 0.2);
            background: #0a0a0f;
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
      <nav className="section-nav" aria-label="Section navigation">
        <button
          type="button"
          className="section-nav-button"
          onClick={goToPrevious}
          disabled={currentSectionIndex === 0}
          aria-label="Previous section"
        >
          <NavArrow direction="up" />
        </button>
        <span className="section-nav-divider" aria-hidden="true" />
        <button
          type="button"
          className="section-nav-button"
          onClick={goToNext}
          disabled={currentSectionIndex === SECTIONS.length - 1}
          aria-label="Next section"
        >
          <NavArrow direction="down" />
        </button>
      </nav>
    </>
  )
}
