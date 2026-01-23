"use client"

import { useState, useEffect, useRef } from "react"

interface Experience {
  period: string
  company: string
  position: string
  location: string
}

interface Education {
  period: string
  institution: string
  degree: string
  location: string
}

export function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [educations, setEducations] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expRes, eduRes] = await Promise.all([
          fetch("/api/experience"),
          fetch("/api/education"),
        ])

        if (expRes.ok) {
          const expData = await expRes.json()
          setExperiences(expData)
        }

        if (eduRes.ok) {
          const eduData = await eduRes.json()
          setEducations(eduData)
        }
      } catch (error) {
        console.error("Failed to fetch experience/education:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          :root {
            --exp-hue1: 120;
            --exp-hue2: 55;
            --exp-border: 1px;
            --exp-border-color: hsl(var(--exp-hue2), 12%, 20%);
            --exp-radius: 22px;
            --exp-ease: cubic-bezier(0.5, 1, 0.89, 1);
          }

          #experience {
            min-height: 100vh;
            display: flex;
            align-items: center;
            padding: 0;
            scroll-snap-align: start;
            background: #000;
           background-image: url(https://i.ibb.co/PvXj31RZ/pexels-marek-piwnicki-3907296-9202300.jpg), linear-gradient(to right in oklab, hsl(var(--exp-hue2) 50% 70%), hsl(var(--exp-hue1) 50% 70%));
            background-size: cover;
            background-position: center;
            background-blend-mode: hard-light;
          }

          .exp-card {
            position: relative;
            border-radius: var(--exp-radius);
            border: var(--exp-border) solid var(--exp-border-color);
            background: linear-gradient(235deg, hsl(var(--exp-hue1) 50% 10% / 0.9), hsl(var(--exp-hue1) 50% 10% / 0) 25%), 
                        linear-gradient(45deg, hsl(var(--exp-hue2) 50% 10% / 0.9), hsl(var(--exp-hue2) 50% 10% / 0) 25%), 
                        linear-gradient(hsl(220deg 25% 0% / 0.85));
            backdrop-filter: blur(40px);
            -webkit-backdrop-filter: blur(40px);
            box-shadow: hsl(var(--exp-hue2) 50% 2%) 0px 10px 16px -8px, hsl(var(--exp-hue2) 50% 4%) 0px 20px 36px -14px;
            overflow: visible;
            padding: 1.5rem;
            max-width: 100%;
          }

          @media (min-width: 1367px) {
            .exp-grid {
              max-width: 1000px;
              margin: 0 auto;
            }
          }

          @media (max-width: 1500px) {
            #experience {
              min-height: 100vh;
              padding: 0;
            }

            .exp-card {
              padding: 1.35rem; /* 1.5rem * 0.9 = 10% reduction */
            }

            .exp-grid {
              gap: 0.675rem; /* 0.75rem * 0.9 = 10% reduction */
            }

            .exp-section-title {
              font-size: 16.2px; /* 18px * 0.9 = 10% reduction */
              margin-bottom: 1.35rem; /* 1.5rem * 0.9 = 10% reduction */
            }

            .exp-item {
              margin-bottom: 0.9rem !important; /* 1rem * 0.9 = 10% reduction */
              padding-bottom: 0.9rem !important; /* 1rem * 0.9 = 10% reduction */
            }

            .exp-period {
              font-size: 12.6px; /* 14px * 0.9 = 10% reduction */
              margin-bottom: 0.45rem; /* 0.5rem * 0.9 = 10% reduction */
            }

            .exp-company {
              font-size: 18px; /* 20px * 0.9 = 10% reduction */
              margin-bottom: 0.225rem; /* 0.25rem * 0.9 = 10% reduction */
            }

            .exp-position {
              font-size: 14.4px; /* 16px * 0.9 = 10% reduction */
              margin-bottom: 0.225rem; /* 0.25rem * 0.9 = 10% reduction */
            }

            .exp-location {
              font-size: 12.6px; /* 14px * 0.9 = 10% reduction */
            }
          }

          /* Tablet specific styles (iPad) */
          @media (min-width: 768px) and (max-width: 1024px) {
            #experience {
              padding: 0;
              min-height: 100vh;
              height: 100vh;
              display: flex;
              align-items: center;
            }

            #experience > div {
              max-width: 56rem;
              width: 36rem;
            }

            .exp-card {
              padding: 1.425rem; /* 1.5rem * 0.95 = 5% reduction */
            }

            .exp-grid {
              grid-template-columns: 1fr !important;
              gap: 1rem;
            }

            .exp-grid > div {
              width: 100%;
              max-width: 100%;
              margin-left: 0;
              margin-right: 0;
            }

            .exp-section-title {
              font-size: 17.1px; /* 18px * 0.95 = 5% reduction */
              margin-bottom: 1.425rem; /* 1.5rem * 0.95 = 5% reduction */
            }

            .exp-item {
              margin-bottom: 0.95rem !important; /* 1rem * 0.95 = 5% reduction */
              padding-bottom: 0.95rem !important; /* 1rem * 0.95 = 5% reduction */
            }

            .exp-period {
              font-size: 13.3px; /* 14px * 0.95 = 5% reduction */
              margin-bottom: 0.475rem; /* 0.5rem * 0.95 = 5% reduction */
            }

            .exp-company {
              font-size: 19px; /* 20px * 0.95 = 5% reduction */
              margin-bottom: 0.2375rem; /* 0.25rem * 0.95 = 5% reduction */
            }

            .exp-position {
              font-size: 15.2px; /* 16px * 0.95 = 5% reduction */
              margin-bottom: 0.2375rem; /* 0.25rem * 0.95 = 5% reduction */
            }

            .exp-location {
              font-size: 13.3px; /* 14px * 0.95 = 5% reduction */
            }
          }

          .exp-card .shine,
          .exp-card .shine::before,
          .exp-card .shine::after {
            pointer-events: none;
            border-radius: 0;
            border-top-right-radius: inherit;
            border-bottom-left-radius: inherit;
            border: none;
            display: block;
            position: absolute;
            z-index: 1;
            --start: 12%;
            background: conic-gradient(
              from var(--conic, -45deg) at center in oklch,
              transparent var(--start, 0%), 
              hsl(var(--hue), 80%, 60%), 
              transparent var(--end,30%)
            ) border-box;
            mask: linear-gradient(transparent), linear-gradient(black);
            mask-repeat: no-repeat;
            mask-clip: padding-box, border-box;
            mask-composite: subtract;
            opacity: 1;
          }
          
          .exp-card .shine-top {
            right: calc(var(--exp-border) * -1);
            top: calc(var(--exp-border) * -1);
            left: calc(var(--exp-border) * -1);
            width: 100%;
            height: 50%;
            --hue: var(--exp-hue1);
            --conic: -45deg;
          }
          
          .exp-card .shine-bottom {
            bottom: calc(var(--exp-border) * -1);
            left: calc(var(--exp-border) * -1);
            right: calc(var(--exp-border) * -1);
            top: auto;
            width: 100%;
            height: 50%;
            --hue: var(--exp-hue2);
            --conic: 135deg;
          }

          .exp-card .shine::before,
          .exp-card .shine::after {
            content: "";
            width: auto;
            inset: -2px;
            mask: none;
          }

          .exp-card .shine::after {
            z-index: 2;
            --start: 17%;
            --end: 33%;
            background: conic-gradient(
              from var(--conic, -45deg) at center in oklch,
              transparent var(--start, 0%), 
              hsl(var(--hue), 80%, 85%), 
              transparent var(--end, 50%)
            );
          }

          .exp-card .glow {
            pointer-events: none;
            border-top-right-radius: calc(var(--exp-radius) * 2.5);
            border-bottom-left-radius: calc(var(--exp-radius) * 2.5);
            border: calc(var(--exp-radius) * 1.25) solid transparent;
            display: block;
            position: absolute;
            mask: url('https://assets.codepen.io/13471/noise-base.png');
            mask-mode: luminance;
            mask-size: 29%;
            opacity: 0.8;
            filter: blur(12px) saturate(1.25) brightness(0.5);
            mix-blend-mode: plus-lighter;
            z-index: 3;
          }
          
          .exp-card .glow-top {
            left: calc(var(--exp-radius) * -2);
            bottom: auto;
            right: calc(var(--exp-radius) * -2);
            top: calc(var(--exp-radius) * -2);
            width: calc(100% + var(--exp-radius) * 4);
            height: calc(50% + var(--exp-radius) * 2);
            --hue: var(--exp-hue1);
            --conic: -45deg;
          }
          
          .exp-card .glow-bottom {
            bottom: calc(var(--exp-radius) * -2);
            left: calc(var(--exp-radius) * -2);
            right: calc(var(--exp-radius) * -2);
            top: auto;
            width: calc(100% + var(--exp-radius) * 4);
            height: calc(50% + var(--exp-radius) * 2);
            --hue: var(--exp-hue2);
            --conic: 135deg;
          }

          .exp-card .glow::before,
          .exp-card .glow::after {
            content: "";
            position: absolute;
            inset: 0;
            border: inherit;
            border-radius: inherit;
            background: conic-gradient(
              from var(--conic, -45deg) at center in oklch,
              transparent var(--start, 0%), 
              hsl(var(--hue), 95%, 60%), 
              transparent var(--end, 50%)
            ) border-box;
            mask: linear-gradient(transparent), linear-gradient(black);
            mask-repeat: no-repeat;
            mask-clip: padding-box, border-box;
            mask-composite: subtract;
            filter: saturate(2) brightness(1);
          }

          .exp-card .glow::after {
            --lit: 70%;
            --sat: 100%;
            --start: 15%;
            --end: 35%;
            border-width: calc(var(--exp-radius) * 1.75);
            border-radius: calc(var(--exp-radius) * 2.75);
            inset: calc(var(--exp-radius) * -0.25);
            z-index: 4;
            opacity: 0.75;
          }

          .exp-card .glow-bright {
            --lit: 80%;
            --sat: 100%;
            --start: 13%;
            --end: 37%;
            border-width: 5px;
            border-radius: calc(var(--exp-radius) + 2px);
            filter: blur(2px) brightness(0.66);
            opacity: 0.9;
          }
          
          .exp-card .glow-bright.glow-top {
            left: -7px;
            bottom: auto;
            right: -7px;
            top: -7px;
            width: calc(100% + 14px);
            height: calc(50% + 7px);
            --hue: var(--exp-hue1);
            --conic: -45deg;
          }
          
          .exp-card .glow-bright.glow-bottom {
            bottom: -7px;
            left: -7px;
            right: -7px;
            top: auto;
            width: calc(100% + 14px);
            height: calc(50% + 7px);
            --hue: var(--exp-hue2);
            --conic: 135deg;
          }

          .exp-card .glow-bright::after {
            content: none;
          }

          .exp-card .shine,
          .exp-card .glow {
            opacity: 1;
          }
          
          .exp-card .shine-top,
          .exp-card .glow-top {
            --hue: var(--exp-hue1);
            opacity: 1;
          }
          
          .exp-card .shine-bottom,
          .exp-card .glow-bottom {
            --hue: var(--exp-hue2);
            --conic: 135deg;
            opacity: 1;
          }

          .exp-section-title {
            font-family: "Science Gothic", sans-serif;
            font-size: 18px;
            text-transform: uppercase;
            letter-spacing: 0.3em;
            color: rgba(255, 255, 255, 0.7);
            font-weight: 300;
            display: inline-block;
            margin-bottom: 1.5rem;
          }

          .exp-item {
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .exp-item:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
          }

          .exp-period {
            font-family: "Science Gothic", sans-serif;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.6);
            font-weight: 300;
            margin-bottom: 0.5rem;
          }

          .exp-company {
            font-family: "Science Gothic", sans-serif;
            font-size: 20px;
            font-weight: 400;
            color: white;
            margin-bottom: 0.25rem;
          }

          .exp-position {
            font-family: "Science Gothic", sans-serif;
            font-size: 16px;
            font-weight: 300;
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 0.25rem;
          }

          .exp-location {
            font-family: "Science Gothic", sans-serif;
            font-size: 14px;
            font-weight: 300;
            color: rgba(255, 255, 255, 0.6);
          }

          .exp-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.75rem;
          }

          @media (max-width: 1366px) {
            .exp-card {
              padding: 1.2rem; /* 1.5rem * 0.8 = 20% reduction */
            }

            #experience > div {
              max-width: 56rem; /* max-w-4xl = 56rem (replacing max-w-6xl = 72rem) */
            }

            .exp-grid {
              grid-template-columns: 1fr 1fr;
              gap: 0.6rem; /* 0.75rem * 0.8 = 20% reduction */
            }

            .exp-grid > div {
              width: 100%;
              max-width: 100%;
              margin-left: 0;
              margin-right: 0;
            }

            .exp-section-title {
              font-size: 14.4px; /* 18px * 0.8 = 20% reduction */
              margin-bottom: 1.2rem; /* 1.5rem * 0.8 = 20% reduction */
            }

            .exp-item {
              margin-bottom: 0.8rem !important; /* 1rem * 0.8 = 20% reduction */
              padding-bottom: 0.8rem !important; /* 1rem * 0.8 = 20% reduction */
            }

            .exp-period {
              font-size: 11.2px; /* 14px * 0.8 = 20% reduction */
              margin-bottom: 0.4rem; /* 0.5rem * 0.8 = 20% reduction */
            }

            .exp-company {
              font-size: 16px; /* 20px * 0.8 = 20% reduction */
              margin-bottom: 0.2rem; /* 0.25rem * 0.8 = 20% reduction */
            }

            .exp-position {
              font-size: 12.8px; /* 16px * 0.8 = 20% reduction */
              margin-bottom: 0.2rem; /* 0.25rem * 0.8 = 20% reduction */
            }

            .exp-location {
              font-size: 11.2px; /* 14px * 0.8 = 20% reduction */
            }
          }

          @media (max-width: 1024px) {
            .exp-grid > div {
              width: 100%;
              max-width: 100%;
            }
          }

          @media (max-width: 768px) {
            .exp-grid {
              grid-template-columns: 1fr;
              gap: 0;
            }

            .exp-grid > div {
              width: 100%;
              max-width: 100%;
            }
          }
        `
      }} />
      <section id="experience" aria-label="Experience and Education" ref={sectionRef}>
        <div className="max-w-6xl mx-auto w-full">
          {loading ? (
            <div className="text-center text-white/60 py-20">Loading...</div>
          ) : (
            <div className="exp-grid">
              {/* Experience Column */}
              <div className={`space-y-6 ${isVisible ? 'animate-in fade-in slide-in-from-left duration-1200' : 'opacity-0'}`}>
                <div className="exp-card">
                  <span className="shine shine-top"></span>
                  <span className="shine shine-bottom"></span>
                  <span className="glow glow-top"></span>
                  <span className="glow glow-bottom"></span>
                  <span className="glow glow-bright glow-top"></span>
                  <span className="glow glow-bright glow-bottom"></span>
                  <p className="exp-section-title">Experience</p>
                  {experiences.length > 0 ? (
                    experiences.map((exp, index) => (
                      <div key={index} className={`exp-item ${isVisible ? 'animate-in fade-in slide-in-from-bottom duration-700' : 'opacity-0'}`} style={isVisible ? { animationDelay: `${index * 100}ms` } : {}}>
                        <div className="exp-period">{exp.period}</div>
                        <div className="exp-company">{exp.company}</div>
                        <div className="exp-position">{exp.position}</div>
                        <div className="exp-location">{exp.location}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-white/40 text-sm">No experience data available</div>
                  )}
                </div>
              </div>

              {/* Education Column */}
              <div className={`space-y-6 ${isVisible ? 'animate-in fade-in slide-in-from-right duration-1200 delay-300' : 'opacity-0'}`}>
                <div className="exp-card">
                  <span className="shine shine-top"></span>
                  <span className="shine shine-bottom"></span>
                  <span className="glow glow-top"></span>
                  <span className="glow glow-bottom"></span>
                  <span className="glow glow-bright glow-top"></span>
                  <span className="glow glow-bright glow-bottom"></span>
                  <p className="exp-section-title">Education</p>
                  {educations.length > 0 ? (
                    educations.map((edu, index) => (
                      <div key={index} className={`exp-item ${isVisible ? 'animate-in fade-in slide-in-from-bottom duration-700' : 'opacity-0'}`} style={isVisible ? { animationDelay: `${index * 100}ms` } : {}}>
                        <div className="exp-period">{edu.period}</div>
                        <div className="exp-company">{edu.institution}</div>
                        <div className="exp-position">{edu.degree}</div>
                        <div className="exp-location">{edu.location}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-white/40 text-sm">No education data available</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

