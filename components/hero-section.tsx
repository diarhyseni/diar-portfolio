'use client'

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { ArrowRight, Mail } from "lucide-react"

const HERO_ROLES = ["Next.js Developer", "React Developer", "Full-Stack Developer"] as const

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const currentRole = HERO_ROLES[roleIndex]

    const isComplete = displayText === currentRole
    const isEmpty = displayText === ""

    const typingDelay = isDeleting ? 60 : 120
    const pauseDelay = 1200
    const delay = !isDeleting && isComplete ? pauseDelay : typingDelay

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (!isComplete) {
          setDisplayText(currentRole.slice(0, displayText.length + 1))
        } else {
          setIsDeleting(true)
        }
      } else if (!isEmpty) {
        setDisplayText(currentRole.slice(0, displayText.length - 1))
      } else {
        setIsDeleting(false)
        setRoleIndex((prev) => (prev + 1) % HERO_ROLES.length)
      }
    }, delay)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, roleIndex, isMounted])

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        :root {
          --hero-hue1: 290;
          --hero-hue2: 240;
          --hero-border: 1px;
          --hero-border-color: hsl(var(--hero-hue2), 12%, 20%);
          --hero-radius: 22px;
          --hero-ease: cubic-bezier(0.5, 1, 0.89, 1);
        }

        /* Force Science Gothic on all figure elements */
        .hero-section-wrapper figure,
        .hero-section-wrapper figure * {
          font-family: "Science Gothic", sans-serif !important;
        }
        
        /* Ensure font loads before rendering */
        .hero-section-wrapper figure {
          font-display: swap;
        }
        
        .hero-section-wrapper {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          scroll-snap-align: start;
          scroll-snap-stop: always;
        }

        .hero-section-wrapper picture {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }

        .hero-section-wrapper picture img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-section-wrapper picture::before {
          position: absolute;
          top: 0;
          left: 0;
          width: 25%;
          height: 25%;
          background-color: transparent;
          content: "";
          animation: hero-a 30s ease infinite;
          z-index: 1;
        }

        @keyframes hero-a {
          0% {
            width: 25%;
            height: 25%;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            backdrop-filter: blur(2vmin) hue-rotate(0deg);
            -webkit-backdrop-filter: blur(2vmin) hue-rotate(0deg);
          }
          12.49% {
            left: 0;
          }
          12.5% {
            width: 100%;
            left: unset;
            backdrop-filter: blur(0vmin) hue-rotate(150deg);
            -webkit-backdrop-filter: blur(0vmin) hue-rotate(150deg);
          }
          25% {
            width: 25%;
            height: 25%;
            backdrop-filter: blur(2vmin) hue-rotate(300deg);
            -webkit-backdrop-filter: blur(2vmin) hue-rotate(300deg);
          }
          37.49% {
            top: 0;
            bottom: 0;
          }
          37.5% {
            top: unset;
            height: 100%;
            backdrop-filter: blur(0vmin) hue-rotate(150deg);
            -webkit-backdrop-filter: blur(0vmin) hue-rotate(150deg);
          }
          50% {
            width: 25%;
            height: 25%;
            backdrop-filter: blur(2vmin) hue-rotate(0deg);
            -webkit-backdrop-filter: blur(2vmin) hue-rotate(0deg);
          }
          62.49% {
            left: unset;
            right: 0;
          }
          62.5% {
            right: unset;
            width: 100%;
            height: 100%;
            backdrop-filter: blur(0vmin) hue-rotate(150deg);
            -webkit-backdrop-filter: blur(0vmin) hue-rotate(150deg);
          }
          74.9% {
            top: unset;
            bottom: 0;
          }
          75% {
            width: 25%;
            height: 25%;
            backdrop-filter: blur(2vmin) hue-rotate(300deg);
            -webkit-backdrop-filter: blur(2vmin) hue-rotate(300deg);
          }
          87.49% {
            top: unset;
            bottom: 0;
          }
          87.5% {
            height: 100%;
            top: 0;
            backdrop-filter: blur(0vmin) hue-rotate(150deg);
            -webkit-backdrop-filter: blur(0vmin) hue-rotate(150deg);
          }
          100% {
            width: 25%;
            height: 25%;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            backdrop-filter: blur(2vmin) hue-rotate(0deg);
            -webkit-backdrop-filter: blur(2vmin) hue-rotate(0deg);
          }
        }

        .hero-section-wrapper picture::after {
          position: absolute;
          top: 0;
          left: 0;
          width: 25%;
          height: 25%;
          background-color: transparent;
          content: "";
          animation: hero-b 30s ease infinite;
          z-index: 1;
        }

        @keyframes hero-b {
          0% {
            width: 25%;
            height: 25%;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            backdrop-filter: blur(2vmin) hue-rotate(0deg);
            -webkit-backdrop-filter: blur(2vmin) hue-rotate(0deg);
          }
          12.49% {
            top: 0;
          }
          12.5% {
            height: 100%;
            top: unset;
            backdrop-filter: blur(0vmin) hue-rotate(150deg);
            -webkit-backdrop-filter: blur(0vmin) hue-rotate(150deg);
          }
          25% {
            width: 25%;
            height: 25%;
            backdrop-filter: blur(2vmin) hue-rotate(300deg);
            -webkit-backdrop-filter: blur(2vmin) hue-rotate(300deg);
          }
          37.49% {
            left: 0;
            right: 0;
          }
          37.5% {
            left: unset;
            width: 100%;
            backdrop-filter: blur(0vmin) hue-rotate(150deg);
            -webkit-backdrop-filter: blur(0vmin) hue-rotate(150deg);
          }
          50% {
            width: 25%;
            height: 25%;
            backdrop-filter: blur(2vmin) hue-rotate(0deg);
            -webkit-backdrop-filter: blur(2vmin) hue-rotate(0deg);
          }
          62.49% {
            top: unset;
            bottom: 0;
          }
          62.5% {
            top: 0;
            height: 100%;
            backdrop-filter: blur(0vmin) hue-rotate(150deg);
            -webkit-backdrop-filter: blur(0vmin) hue-rotate(150deg);
          }
          74.9% {
            bottom: unset;
            right: 0;
          }
          75% {
            width: 25%;
            height: 25%;
            left: unset;
            backdrop-filter: blur(2vmin) hue-rotate(300deg);
            -webkit-backdrop-filter: blur(2vmin) hue-rotate(300deg);
          }
          87.49% {
            left: unset;
            right: 0;
          }
          87.5% {
            width: 100%;
            left: 0;
            backdrop-filter: blur(0vmin) hue-rotate(150deg);
            -webkit-backdrop-filter: blur(0vmin) hue-rotate(150deg);
          }
          100% {
            width: 25%;
            height: 25%;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            backdrop-filter: blur(2vmin) hue-rotate(0deg);
            -webkit-backdrop-filter: blur(2vmin) hue-rotate(0deg);
          }
        }

        .hero-section-wrapper figure {
          position: relative;
          width: 100%;
          max-width: 700px;
          border-radius: var(--hero-radius);
          border: var(--hero-border) solid var(--hero-border-color);
          padding: 30px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          background: black;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: hsl(var(--hero-hue2) 50% 2%) 0px 10px 16px -8px, hsl(var(--hero-hue2) 50% 4%) 0px 20px 36px -14px;
          overflow: visible;
          z-index: 2;
          font-family: "Science Gothic", sans-serif;
          font-weight: 300;
        }

        .hero-section-wrapper figure .shine,
        .hero-section-wrapper figure .shine::before,
        .hero-section-wrapper figure .shine::after {
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
        
        .hero-section-wrapper figure .shine-top {
          right: calc(var(--hero-border) * -1);
          top: calc(var(--hero-border) * -1);
          left: calc(var(--hero-border) * -1);
          width: 100%;
          height: 50%;
          --hue: var(--hero-hue1);
          --conic: -45deg;
        }
        
        .hero-section-wrapper figure .shine-bottom {
          bottom: calc(var(--hero-border) * -1);
          left: calc(var(--hero-border) * -1);
          right: calc(var(--hero-border) * -1);
          top: auto;
          width: 100%;
          height: 50%;
          --hue: var(--hero-hue2);
          --conic: 135deg;
        }

        .hero-section-wrapper figure .shine::before,
        .hero-section-wrapper figure .shine::after {
          content: "";
          width: auto;
          inset: -2px;
          mask: none;
        }

        .hero-section-wrapper figure .shine::after {
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

        .hero-section-wrapper figure .glow {
          pointer-events: none;
          border-top-right-radius: calc(var(--hero-radius) * 2.5);
          border-bottom-left-radius: calc(var(--hero-radius) * 2.5);
          border: calc(var(--hero-radius) * 1.25) solid transparent;
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
        
        .hero-section-wrapper figure .glow-top {
          left: calc(var(--hero-radius) * -2);
          bottom: auto;
          right: calc(var(--hero-radius) * -2);
          top: calc(var(--hero-radius) * -2);
          width: calc(100% + var(--hero-radius) * 4);
          height: calc(50% + var(--hero-radius) * 2);
          --hue: var(--hero-hue1);
          --conic: -45deg;
        }
        
        .hero-section-wrapper figure .glow-bottom {
          bottom: calc(var(--hero-radius) * -2);
          left: calc(var(--hero-radius) * -2);
          right: calc(var(--hero-radius) * -2);
          top: auto;
          width: calc(100% + var(--hero-radius) * 4);
          height: calc(50% + var(--hero-radius) * 2);
          --hue: var(--hero-hue2);
          --conic: 135deg;
        }

        .hero-section-wrapper figure .glow::before,
        .hero-section-wrapper figure .glow::after {
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

        .hero-section-wrapper figure .glow::after {
          --lit: 70%;
          --sat: 100%;
          --start: 15%;
          --end: 35%;
          border-width: calc(var(--hero-radius) * 1.75);
          border-radius: calc(var(--hero-radius) * 2.75);
          inset: calc(var(--hero-radius) * -0.25);
          z-index: 4;
          opacity: 0.75;
        }

        .hero-section-wrapper figure .glow-bright {
          --lit: 80%;
          --sat: 100%;
          --start: 13%;
          --end: 37%;
          border-width: 5px;
          border-radius: calc(var(--hero-radius) + 2px);
          filter: blur(2px) brightness(0.66);
          opacity: 0.9;
        }
        
        .hero-section-wrapper figure .glow-bright.glow-top {
          left: -7px;
          bottom: auto;
          right: -7px;
          top: -7px;
          width: calc(100% + 14px);
          height: calc(50% + 7px);
          --hue: var(--hero-hue1);
          --conic: -45deg;
        }
        
        .hero-section-wrapper figure .glow-bright.glow-bottom {
          bottom: -7px;
          left: -7px;
          right: -7px;
          top: auto;
          width: calc(100% + 14px);
          height: calc(50% + 7px);
          --hue: var(--hero-hue2);
          --conic: 135deg;
        }

        .hero-section-wrapper figure .glow-bright::after {
          content: none;
        }

        .hero-section-wrapper figure .shine,
        .hero-section-wrapper figure .glow {
          opacity: 1;
        }
        
        .hero-section-wrapper figure .shine-top,
        .hero-section-wrapper figure .glow-top {
          --hue: var(--hero-hue1);
          opacity: 1;
        }
        
        .hero-section-wrapper figure .shine-bottom,
        .hero-section-wrapper figure .glow-bottom {
          --hue: var(--hero-hue2);
          --conic: 135deg;
          opacity: 1;
        }

       
        @keyframes hero-d {
          from {
            filter: hue-rotate(0deg) brightness(1.5);
            transform: rotateZ(0deg);
            border-radius: 0;
          }
          50% {
            border-radius: 49%;
            filter: hue-rotate(180deg) brightness(1.5);
          }
          to {
            filter: hue-rotate(360deg) brightness(1.5);
            transform: rotateZ(360deg);
            border-radius: 0;
          }
        }

        .hero-section-wrapper figure h1 {
          font-family: "Science Gothic", sans-serif;
          font-size: 40px;
          line-height: 1.5cap;
          text-wrap: balance;
          color: white;
          margin-bottom: 0px;
          font-weight: 300;
        }

        .hero-section-wrapper figure .hero-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
        }

        .hero-section-wrapper figure .hero-intro {
          font-family: "Science Gothic", sans-serif;
          font-size: 18px;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 300;
        }

        .hero-section-wrapper figure .hero-name {
          font-family: "Science Gothic", sans-serif;
          font-size: 40px;
          line-height: 1.2;
          color: white;
          font-weight: 300;
        }

        .hero-section-wrapper figure .hero-role {
          font-family: "Science Gothic", sans-serif;
          font-size: 24px;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 300;
        }

        .hero-section-wrapper figure .hero-typing-text {
          font-size: 30px;
          background: linear-gradient(135deg, 
            hsl(0, 0.00%, 67.80%) 15%,
            hsl(0, 0.00%, 100.00%) 50%,
            hsl(0, 0.00%, 100.00%) 75%,
            hsl(0, 0.00%, 64.70%) 85%
          );
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: hero-typing-gradient 3s ease infinite;
        }

        @media (max-width: 768px) {
          .hero-section-wrapper figure .hero-typing-text {
            font-size: 20px;
          }
        }

        @keyframes hero-typing-gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .hero-section-wrapper figure .hero-description {
          font-family: "Science Gothic", sans-serif;
          font-size: 18px;
          font-weight: 300;
          line-height: 1.8;
          text-wrap: pretty;
          padding-left: 30px;
          border-left: 1px solid white;
          color: #bbb;
        }

        .hero-section-wrapper figure .hero-buttons {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          margin-top: 10px;
        }

        .hero-section-wrapper figure .hero-buttons button {
          position: relative;
          padding: 14px 32px;
          border: 0.5px solidrgba(255, 255, 255, 0.09);
          background: linear-gradient(235deg, hsl(290 55% 15% / 0.9), hsl(290 55% 15% / 0) 50%), 
                      linear-gradient(45deg, hsl(240 55% 15% / 0.9), hsl(240 55% 15% / 0) 50%), 
                      linear-gradient(hsl(220deg 25% 0% / 0.1));
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          color: white;
          font-family: "Science Gothic", sans-serif;
          font-weight: 300;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 0 !important;
          overflow: visible;
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
        }
        
        .hero-section-wrapper figure .hero-buttons button::before {
          content: "";
          position: absolute;
          inset: -2px;
          border: 2px solid;
          border-top-color: hsl(var(--hero-hue1), 80%, 60%);
          border-right-color: hsl(var(--hero-hue1), 80%, 60%);
          border-bottom-color: hsl(var(--hero-hue2), 80%, 60%);
          border-left-color: hsl(var(--hero-hue2), 80%, 60%);
          clip-path: polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px));
          pointer-events: none;
          z-index: -1;
        }

        .hero-section-wrapper figure .hero-buttons button::after {
          content: "";
          position: absolute;
          top: -2px;
          right: -2px;
          width: 14px;
          height: 14px;
          border-top: 2px solid hsl(var(--hero-hue1), 80%, 60%);
          border-right: 2px solid hsl(var(--hero-hue1), 80%, 60%);
          pointer-events: none;
          z-index: 1;
          clip-path: polygon(0 0, 100% 0, 100% 12px, calc(100% - 12px) 0);
        }
        
        .hero-section-wrapper figure .hero-buttons button:hover::before {
          border-bottom-color: hsl(var(--hero-hue2), 80%, 70%);
          border-left-color: hsl(var(--hero-hue2), 80%, 70%);
          border-top-color: hsl(var(--hero-hue1), 80%, 70%);
          border-right-color: hsl(var(--hero-hue1), 80%, 70%);
        }

        .hero-section-wrapper figure .hero-buttons button:hover::after {
          border-top-color: hsl(var(--hero-hue1), 80%, 70%);
          border-right-color: hsl(var(--hero-hue1), 80%, 70%);
        }
        
        .hero-section-wrapper figure .hero-buttons button:hover {
          background: linear-gradient(235deg, hsl(290 60% 20% / 0.9), hsl(290 60% 20% / 0) 40%), 
                      linear-gradient(45deg, hsl(240 60% 20% / 0.9), hsl(240 60% 20% / 0) 40%), 
                      linear-gradient(hsl(220deg 25% 0% / 0.6));
          color: white;
          transform: translateY(-2px);
        }
        

        .hero-section-wrapper figure .hero-buttons button:active {
          transform: translateY(0);
        }


        @media (min-width: 640px) {
          .hero-section-wrapper figure .hero-buttons {
            flex-direction: row;
          }
        }

        @media (max-width: 780px) {
          .hero-section-wrapper figure {
            max-width: 90%;
            padding: 20px;
          }
        }

        @media (max-width: 600px) {
          .hero-section-wrapper figure h1,
          .hero-section-wrapper figure .hero-name {
            font-size: 32px;
          }
          .hero-section-wrapper figure .hero-description {
            font-size: 16px;
            padding-left: 20px;
          }
          .hero-section-wrapper figure .hero-role {
            font-size: 20px;
          }
        }
      `
      }} />
    <section
      id="home"
      aria-label="Hero"
        className="hero-section-wrapper"
    >
        <picture>
        <img src="https://i.imgur.com/gIWOMuW.jpeg" width="3840" height="2160" alt="background" />
      </picture>
      <figure>
        <span className="shine shine-top"></span>
        <span className="shine shine-bottom"></span>
        <span className="glow glow-top"></span>
        <span className="glow glow-bottom"></span>
        <span className="glow glow-bright glow-top"></span>
        <span className="glow glow-bright glow-bottom"></span>
        <div className="hero-content">
          <p className="hero-intro">Hello, my name is</p>
          <h1 className="hero-name">Diar Hyseni</h1>
          <p className="hero-role">
            I&apos;m a{" "}
            <span className="hero-typing-text">
              {displayText}
            </span>
          </p>
          <p className="hero-description">
            Building polished software and web experiences with attention to detail and performance.
          </p>
          <div className="hero-buttons">
            <button onClick={() => {
              const section = document.getElementById('projects');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}>
              View my Projects
            <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => {
              const section = document.getElementById('contact');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}>
            <Mail className="w-4 h-4" />
            Contact Me
            </button>
          </div>
        </div>
      </figure>
    </section>
    </>
  )
}
