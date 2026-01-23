"use client"

import { useState, useEffect } from "react"
import { getIconComponent } from "@/lib/icon-mapper"

type SkillCategory = "all" | "frontend" | "backend" | "technologies"

interface Skill {
  name: string
  categories: string[]
  icon_name: string | null
}

export function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState<SkillCategory>("all")
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("/api/skills")
        if (response.ok) {
          const data = await response.json()
          setSkills(data)
        }
      } catch (error) {
        console.error("Failed to fetch skills:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  // Transform skills for display with icons
  const skillsWithIcons = skills.map(skill => {
    const IconComponent = getIconComponent(skill.icon_name)
    
    return {
      name: skill.name,
      icon: IconComponent,
      categories: Array.isArray(skill.categories) ? skill.categories : [],
    }
  })

  // Show all skills, but mark which ones match the filter
  const displaySkills = skillsWithIcons.map(skill => ({
    ...skill,
    isHighlighted: activeFilter === "all" || skill.categories.includes(activeFilter)
  }))

  const filters: { label: string; value: SkillCategory }[] = [
    { label: "All", value: "all" },
    { label: "Frontend", value: "frontend" },
    { label: "Backend", value: "backend" },
    { label: "Technologies", value: "technologies" },
  ]

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          :root {
            --skills-hue1: 1;
            --skills-hue2: 25;
            --skills-border: 1px;
            --skills-border-color: hsl(var(--skills-hue2), 12%, 20%);
            --skills-radius: 22px;
            --skills-ease: cubic-bezier(0.5, 1, 0.89, 1);
          }

          #skills {
            position: relative;
            z-index: 1;
            isolation: isolate;
            height: 100vh;
            display: flex;
            align-items: center;
            padding: 2rem 1rem;
            scroll-snap-align: start;
            scroll-snap-stop: always;
            background: #000000;
           background-image: url(https://assets.codepen.io/13471/abstract-light.jpg), linear-gradient(to right in oklab, hsl(var(--skills-hue2) 70% 75%), hsl(var(--skills-hue1) 50% 75%));            background-size: cover;background-size: cover;
            background-position: center;
            background-blend-mode: hard-light;
            overflow: hidden;
          }

          @media (max-width: 1600px) {
            #skills {
              padding: 1.5rem 0.75rem;
            }
          }

          @media (max-width: 1500px) {
            #skills {
              padding: 1.25rem 0.5rem;
            }
          }

          @media (min-width: 768px) and (max-width: 1024px) {
            #skills {
              padding: 0;
              height: 100vh;
              display: flex;
              align-items: center;
            }

            #skills > div:first-child {
              max-width: 48rem; /* max-w-3xl = 48rem (replacing max-w-6xl = 72rem) */
            }

            .skills-grid {
              grid-template-columns: repeat(4, 1fr) !important;
            }
          }

          @media (max-width: 768px) {
            #skills {
              height: auto;
              min-height: 100vh;
              padding: 2rem 1rem;
              overflow: visible;
            }
          }

          .skills-card {
            position: relative;
            border-radius: var(--skills-radius);
            border: var(--skills-border) solid var(--skills-border-color);
            background: linear-gradient(235deg, hsl(var(--skills-hue1) 50% 10% / 0.9), hsl(var(--skills-hue1) 50% 10% / 0) 25%), 
                        linear-gradient(45deg, hsl(var(--skills-hue2) 50% 10% / 0.9), hsl(var(--skills-hue2) 50% 10% / 0) 25%), 
                        linear-gradient(hsl(220deg 25% 0% / 0.85));
            backdrop-filter: blur(40px);
            -webkit-backdrop-filter: blur(40px);
            box-shadow: hsl(var(--skills-hue2) 50% 2%) 0px 10px 16px -8px, hsl(var(--skills-hue2) 50% 4%) 0px 20px 36px -14px;
            overflow: visible;
            padding: 2rem;
          }

          @media (max-width: 1600px) {
            .skills-card {
              padding: 1.5rem;
            }

            .skill-icon {
              font-size: 2rem !important;
            }

            .skill-item {
              padding: 1rem 0.25rem !important;
            }
          }

          @media (max-width: 1366px) {
            #skills {
              padding: 1rem 0.4rem; /* 1.25rem 0.5rem * 0.8 = 20% reduction from 1500px */
            }

            .skills-card {
              padding: 1.28rem; /* 1.6rem * 0.8 = 20% reduction from 1500px */
            }

            .skills-section-title {
              font-size: 11.52px; /* 14.4px * 0.8 = 20% reduction from 1500px */
              margin-bottom: 0.96rem; /* 1.2rem * 0.8 = 20% reduction from 1500px */
            }

            .skills-filters {
              margin-bottom: 1.28rem; /* 1.6rem * 0.8 = 20% reduction from 1500px */
              gap: 0.48rem; /* 0.6rem * 0.8 = 20% reduction from 1500px */
            }

            .skills-grid {
              grid-template-columns: repeat(6, 1fr);
              gap: 0.64rem; /* 0.8rem * 0.8 = 20% reduction from 1500px */
            }

            .skill-item {
              padding: 0.64rem 0.48rem !important; /* 0.8rem 0.6rem * 0.8 = 20% reduction from 1500px */
              gap: 0.48rem; /* 0.6rem * 0.8 = 20% reduction from 1500px */
            }

            .skill-icon {
              font-size: 1.6rem; /* 2rem * 0.8 = 20% reduction from 1500px */
            }

            .skill-name {
              font-size: 8.96px; /* 11.2px * 0.8 = 20% reduction from 1500px */
            }

            .skills-filter-btn {
              padding: 6.4px 16px; /* 8px 20px * 0.8 = 20% reduction */
              font-size: 11.2px; /* 14px * 0.8 = 20% reduction */
            }
          }

          @media (max-width: 1500px) {
            #skills {
              padding: 1.25rem 0.5rem;
            }

            .skills-card {
              padding: 1.6rem; /* 2rem * 0.8 = 20% reduction */
            }

            .skills-section-title {
              font-size: 14.4px; /* 18px * 0.8 = 20% reduction */
              margin-bottom: 1.2rem; /* 1.5rem * 0.8 = 20% reduction */
            }

            .skills-filters {
              margin-bottom: 1.6rem; /* 2rem * 0.8 = 20% reduction */
              gap: 0.6rem; /* 0.75rem * 0.8 = 20% reduction */
            }

            .skills-grid {
              grid-template-columns: repeat(6, 1fr);
              gap: 0.8rem; /* 1rem * 0.8 = 20% reduction */
            }

            .skill-item {
              padding: 0.8rem 0.6rem !important; /* 1rem 0.75rem * 0.8 = 20% reduction */
              gap: 0.6rem; /* 0.75rem * 0.8 = 20% reduction */
            }

            .skill-icon {
              font-size: 2rem; /* 2.5rem * 0.8 = 20% reduction */
            }

            .skill-name {
              font-size: 11.2px; /* 14px * 0.8 = 20% reduction */
            }
          }

          .skills-card .shine,
          .skills-card .shine::before,
          .skills-card .shine::after {
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
          
          .skills-card .shine-top {
            right: calc(var(--skills-border) * -1);
            top: calc(var(--skills-border) * -1);
            left: calc(var(--skills-border) * -1);
            width: 100%;
            height: 50%;
            --hue: var(--skills-hue1);
            --conic: -45deg;
          }
          
          .skills-card .shine-bottom {
            bottom: calc(var(--skills-border) * -1);
            left: calc(var(--skills-border) * -1);
            right: calc(var(--skills-border) * -1);
            top: auto;
            width: 100%;
            height: 50%;
            --hue: var(--skills-hue2);
            --conic: 135deg;
          }

          .skills-card .shine::before,
          .skills-card .shine::after {
            content: "";
            width: auto;
            inset: -2px;
            mask: none;
          }

          .skills-card .shine::after {
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

          .skills-card .glow {
            pointer-events: none;
            border-top-right-radius: calc(var(--skills-radius) * 2.5);
            border-bottom-left-radius: calc(var(--skills-radius) * 2.5);
            border: calc(var(--skills-radius) * 1.25) solid transparent;
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
          
          .skills-card .glow-top {
            left: calc(var(--skills-radius) * -2);
            bottom: auto;
            right: calc(var(--skills-radius) * -2);
            top: calc(var(--skills-radius) * -2);
            width: calc(100% + var(--skills-radius) * 4);
            height: calc(50% + var(--skills-radius) * 2);
            --hue: var(--skills-hue1);
            --conic: -45deg;
          }
          
          .skills-card .glow-bottom {
            bottom: calc(var(--skills-radius) * -2);
            left: calc(var(--skills-radius) * -2);
            right: calc(var(--skills-radius) * -2);
            top: auto;
            width: calc(100% + var(--skills-radius) * 4);
            height: calc(50% + var(--skills-radius) * 2);
            --hue: var(--skills-hue2);
            --conic: 135deg;
          }

          .skills-card .glow::before,
          .skills-card .glow::after {
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

          .skills-card .glow::after {
            --lit: 70%;
            --sat: 100%;
            --start: 15%;
            --end: 35%;
            border-width: calc(var(--skills-radius) * 1.75);
            border-radius: calc(var(--skills-radius) * 2.75);
            inset: calc(var(--skills-radius) * -0.25);
            z-index: 4;
            opacity: 0.75;
          }

          .skills-card .glow-bright {
            --lit: 80%;
            --sat: 100%;
            --start: 13%;
            --end: 37%;
            border-width: 5px;
            border-radius: calc(var(--skills-radius) + 2px);
            filter: blur(2px) brightness(0.66);
            opacity: 0.9;
          }
          
          .skills-card .glow-bright.glow-top {
            left: -7px;
            bottom: auto;
            right: -7px;
            top: -7px;
            width: calc(100% + 14px);
            height: calc(50% + 7px);
            --hue: var(--skills-hue1);
            --conic: -45deg;
          }
          
          .skills-card .glow-bright.glow-bottom {
            bottom: -7px;
            left: -7px;
            right: -7px;
            top: auto;
            width: calc(100% + 14px);
            height: calc(50% + 7px);
            --hue: var(--skills-hue2);
            --conic: 135deg;
          }

          .skills-card .glow-bright::after {
            content: none;
          }

          .skills-card .shine,
          .skills-card .glow {
            opacity: 1;
          }
          
          .skills-card .shine-top,
          .skills-card .glow-top {
            --hue: var(--skills-hue1);
            opacity: 1;
          }
          
          .skills-card .shine-bottom,
          .skills-card .glow-bottom {
            --hue: var(--skills-hue2);
            --conic: 135deg;
            opacity: 1;
          }

          .skills-section-title {
            font-family: "Science Gothic", sans-serif;
            font-size: 18px;
            text-transform: uppercase;
            letter-spacing: 0.3em;
            color: rgba(255, 255, 255, 0.88);
            font-weight: 300;
            display: block;
            text-align: center;
            margin-bottom: 1.5rem;
          }

          .skills-filters {
            display: flex;
            gap: 0.75rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
            justify-content: center;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .skills-filters::-webkit-scrollbar {
            display: none;
          }

          @media (max-width: 768px) {
            .skills-filters {
              flex-wrap: nowrap;
              justify-content: flex-start;
              padding-bottom: 0.5rem;
            }
          }

          .skills-filter-btn {
            position: relative;
            padding: 8px 20px;
            border: 1px solid transparent;
            background: linear-gradient(235deg, hsl(var(--skills-hue1) 50% 10% / 0.5), hsl(var(--skills-hue1) 50% 10% / 0) 25%), 
                        linear-gradient(45deg, hsl(var(--skills-hue2) 50% 10% / 0.5), hsl(var(--skills-hue2) 50% 10% / 0) 25%), 
                        linear-gradient(hsl(220deg 25% 0% / 0.3));
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            color: rgba(255, 255, 255, 0.7);
            font-family: "Science Gothic", sans-serif;
            font-weight: 300;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
            border-radius: calc(var(--skills-radius) * 0.3);
          }

          .skills-filter-btn::before {
            content: "";
            position: absolute;
            inset: -1px;
            border: 1px solid;
            border-image: linear-gradient(135deg, 
              hsl(var(--skills-hue1), 80%, 60%) 0%,
              hsl(var(--skills-hue1), 80%, 40%) 25%,
              hsl(var(--skills-hue2), 80%, 40%) 50%,
              hsl(var(--skills-hue2), 80%, 40%) 75%,
              hsl(var(--skills-hue2), 80%, 60%) 100%
            ) 1;
            border-radius: inherit;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: -1;
          }

          .skills-filter-btn.active {
            background: linear-gradient(235deg, hsl(var(--skills-hue1) 50% 10% / 0.9), hsl(var(--skills-hue1) 50% 10% / 0) 25%), 
                        linear-gradient(45deg, hsl(var(--skills-hue2) 50% 10% / 0.9), hsl(var(--skills-hue2) 50% 10% / 0) 25%), 
                        linear-gradient(hsl(220deg 25% 0% / 0.6));
            color: white;
          }

          .skills-filter-btn.active::before {
            opacity: 1;
          }

          .skills-filter-btn:hover {
            color: white;
          
          }

          .skills-filter-btn:hover::before {
            opacity: 0.6;
          }

          .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 1rem;
          }

          .skill-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            padding: 1.0rem 0.75rem !important;
            border-radius: calc(var(--skills-radius) * 0.5);
            transition: all 0.3s ease;
          }

          .skill-item .skill-icon {
            opacity: 0.2;
            transition: opacity 0.3s ease;
          }

          .skill-item.highlighted .skill-icon {
            opacity: 1;
          }

          .skill-item:not(.highlighted) {
            opacity: 0.3;
          }

          .skill-item.highlighted {
            opacity: 1;
          }

          .skill-item:not(.highlighted) .skill-name {
            opacity: 0.4;
          }

          .skill-item.highlighted .skill-name {
            opacity: 1;
          }

          .skill-item:hover {
            transform: translateY(-4px);
          }

          .skill-icon {
            font-size: 2.5rem;
            color: white;
            transition: transform 0.3s ease;
          }

          .skill-item:hover .skill-icon {
            transform: scale(1.1);
          }

          .skill-name {
            font-family: "Science Gothic", sans-serif;
            font-size: 14px;
            font-weight: 300;
            color: white;
            text-align: center;
          }

          @media (max-width: 768px) {
            .skills-grid {
              grid-template-columns: repeat(3, 1fr);
              gap: 0.5rem;
            }

            .skill-item {
              padding: 0.75rem 0.5rem;
              gap: 0.5rem;
            }

            .skill-icon {
              font-size: 1.75rem;
            }

            .skill-name {
              font-size: 11px;
            }
          }
        `
      }} />
      <section id="skills" aria-label="Skills">
        <div className="max-w-6xl mx-auto w-full">
          <div className="skills-card">
            <span className="shine shine-top"></span>
            <span className="shine shine-bottom"></span>
            <span className="glow glow-top"></span>
            <span className="glow glow-bottom"></span>
            <span className="glow glow-bright glow-top"></span>
            <span className="glow glow-bright glow-bottom"></span>
            <p className="skills-section-title">Skills</p>
            <div className="skills-filters">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  className={`skills-filter-btn ${activeFilter === filter.value ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter.value)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <div className="skills-grid">
              {loading ? (
                <div className="col-span-full text-center text-white/60 py-10">Loading skills...</div>
              ) : displaySkills.length > 0 ? (
                displaySkills.map((skill) => {
                  const IconComponent = skill.icon
                  return (
                  <div
                    key={skill.name}
                    className={`skill-item ${skill.isHighlighted ? 'highlighted' : ''}`}
                  >
                      {IconComponent ? (
                        <IconComponent className="skill-icon" />
                      ) : (
                        <div className="skill-icon" style={{ fontSize: '2.5rem', color: 'white' }}>?</div>
                      )}
                      <span className="skill-name">{skill.name}</span>
                  </div>
                  )
                })
              ) : (
                <div className="col-span-full text-center text-white/40 py-10">No skills available</div>
              )}
            </div>
        </div>
      </div>
    </section>
    </>
  )
}
