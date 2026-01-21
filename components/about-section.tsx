'use client'

import { Briefcase, Code, Users, Zap, FileDown, Handshake, Sparkles, Target, GitBranch } from "lucide-react"

export function AboutSection() {
  // Calculate years of experience - increments in January each year
  const calculateYearsOfExperience = () => {
    const startDate = new Date(2022, 0, 1); // January 2022 (month is 0-indexed)
    const currentDate = new Date();
    
    let years = currentDate.getFullYear() - startDate.getFullYear();
    
    // If we haven't reached January yet this year, subtract 1
    if (currentDate.getMonth() < startDate.getMonth() || 
        (currentDate.getMonth() === startDate.getMonth() && currentDate.getDate() < startDate.getDate())) {
      years--;
    }
    
    return Math.max(0, years); // Ensure non-negative
  };

  const yearsOfExperience = calculateYearsOfExperience();

  const strengths = [
    {
      icon: Sparkles,
      title: "Clean Code",
      description: "Writing maintainable and scalable solutions",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimizing for speed and efficiency",
    },
    {
      icon: GitBranch,
      title: "Collaboration",
      description: "Working seamlessly with teams",
    },
    {
      icon: Target,
      title: "Problem Solving",
      description: "Turning challenges into opportunities",
    },
  ]

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          :root {
            --about-hue1: 290;
            --about-hue2: 240;
            --about-border: 1px;
            --about-border-color: hsl(var(--about-hue2), 12%, 20%);
            --about-radius: 22px;
            --about-ease: cubic-bezier(0.5, 1, 0.89, 1);
          }

          #about {
            background: #000;
            background-image: url(https://assets.codepen.io/13471/abstract-light.jpg), linear-gradient(to right in oklab, hsl(var(--about-hue2) 50% 75%), hsl(var(--about-hue1) 50% 75%));
           */ background-size: cover;
            background-position: center;
            background-blend-mode: hard-light;
            min-height: auto;
            padding: 2rem 1rem;
            display: flex;
            align-items: center;
            scroll-snap-align: start;
            scroll-snap-stop: always;
          }

          @media (min-width: 768px) {
            #about {
              min-height: 100vh;
              height: 100vh;
              padding: 0;
            }
          }

          @media (max-width: 1200px) {
            #about {
              height: auto;
              min-height: auto;
              padding: 2rem 1rem;
            }

            .about-grid {
              grid-template-columns: 1fr !important;
            }

            .about-grid > div {
              width: 50%;
              max-width: 50%;
              margin-left: auto;
              margin-right: auto;
            }
          }

          @media (max-width: 1024px) {
            .about-grid > div {
              width: 75%;
              max-width: 75%;
            }
          }

          @media (max-width: 768px) {
            .about-grid > div {
              width: 100%;
              max-width: 100%;
            }
          }
          
          #about * {
            font-family: "Science Gothic", sans-serif !important;
            font-weight: 300 !important;
          }

          .about-card {
            position: relative;
            border-radius: var(--about-radius);
            border: var(--about-border) solid var(--about-border-color);
            background: linear-gradient(235deg, hsl(var(--about-hue1) 50% 10% / 0.9), hsl(var(--about-hue1) 50% 10% / 0) 25%), 
                        linear-gradient(45deg, hsl(var(--about-hue2) 50% 10% / 0.9), hsl(var(--about-hue2) 50% 10% / 0) 25%), 
                        linear-gradient(hsl(220deg 25% 0% / 0.9));
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            box-shadow: hsl(var(--about-hue2) 50% 2%) 0px 10px 16px -8px, hsl(var(--about-hue2) 50% 4%) 0px 20px 36px -14px;
            overflow: visible;
            padding: 1.5rem;
            max-width: 100%;
          }

          @media (min-width: 1201px) {
            .about-grid {
              max-width: 1000px;
              margin: 0 auto;
            }
          }

          .about-card-top {
            transform: translateY(-20px);
          }

          .about-card-bottom {
            transform: translateY(20px);
          }

          @media (max-width: 767px) {
            .about-card {
              padding: 12px !important;
            }
            .about-text-card.about-card {
              padding: 20px !important;
            }
          }

          .about-card .shine,
          .about-card .shine::before,
          .about-card .shine::after {
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
          
          .about-card .shine-top {
            right: calc(var(--about-border) * -1);
            top: calc(var(--about-border) * -1);
            left: calc(var(--about-border) * -1);
            width: 100%;
            height: 50%;
            --hue: var(--about-hue1);
            --conic: -45deg;
          }
          
          .about-card .shine-bottom {
            bottom: calc(var(--about-border) * -1);
            left: calc(var(--about-border) * -1);
            right: calc(var(--about-border) * -1);
            top: auto;
            width: 100%;
            height: 50%;
            --hue: var(--about-hue2);
            --conic: 135deg;
          }

          .about-card .shine::before,
          .about-card .shine::after {
            content: "";
            width: auto;
            inset: -2px;
            mask: none;
          }

          .about-card .shine::after {
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

          .about-card .glow {
            pointer-events: none;
            border-top-right-radius: calc(var(--about-radius) * 2.5);
            border-bottom-left-radius: calc(var(--about-radius) * 2.5);
            border: calc(var(--about-radius) * 1.25) solid transparent;
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
          
          .about-card .glow-top {
            left: calc(var(--about-radius) * -2);
            bottom: auto;
            right: calc(var(--about-radius) * -2);
            top: calc(var(--about-radius) * -2);
            width: calc(100% + var(--about-radius) * 4);
            height: calc(50% + var(--about-radius) * 2);
            --hue: var(--about-hue1);
            --conic: -45deg;
          }
          
          .about-card .glow-bottom {
            bottom: calc(var(--about-radius) * -2);
            left: calc(var(--about-radius) * -2);
            right: calc(var(--about-radius) * -2);
            top: auto;
            width: calc(100% + var(--about-radius) * 4);
            height: calc(50% + var(--about-radius) * 2);
            --hue: var(--about-hue2);
            --conic: 135deg;
          }

          .about-card .glow::before,
          .about-card .glow::after {
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

          .about-card .glow::after {
            --lit: 70%;
            --sat: 100%;
            --start: 15%;
            --end: 35%;
            border-width: calc(var(--about-radius) * 1.75);
            border-radius: calc(var(--about-radius) * 2.75);
            inset: calc(var(--about-radius) * -0.25);
            z-index: 4;
            opacity: 0.75;
          }

          .about-card .glow-bright {
            --lit: 80%;
            --sat: 100%;
            --start: 13%;
            --end: 37%;
            border-width: 5px;
            border-radius: calc(var(--about-radius) + 2px);
            filter: blur(2px) brightness(0.66);
            opacity: 0.9;
          }
          
          .about-card .glow-bright.glow-top {
            left: -7px;
            bottom: auto;
            right: -7px;
            top: -7px;
            width: calc(100% + 14px);
            height: calc(50% + 7px);
            --hue: var(--about-hue1);
            --conic: -45deg;
          }
          
          .about-card .glow-bright.glow-bottom {
            bottom: -7px;
            left: -7px;
            right: -7px;
            top: auto;
            width: calc(100% + 14px);
            height: calc(50% + 7px);
            --hue: var(--about-hue2);
            --conic: 135deg;
          }

          .about-card .glow-bright::after {
            content: none;
          }

          .about-card .shine,
          .about-card .glow {
            opacity: 1;
          }
          
          .about-card .shine-top,
          .about-card .glow-top {
            --hue: var(--about-hue1);
            opacity: 1;
          }
          
          .about-card .shine-bottom,
          .about-card .glow-bottom {
            --hue: var(--about-hue2);
            --conic: 135deg;
            opacity: 1;
          }

          @keyframes about-glow {
            0% {
              opacity: 0;
            }
            3% {
              opacity: 1;
            }
            10% {
              opacity: 0;
            }
            12% {
              opacity: 0.7;
            }
            16% {
              opacity: 0.3;
              animation-timing-function: var(--about-ease);
            }
            100% {
              opacity: 1;
              animation-timing-function: var(--about-ease);
            }
          }

          @keyframes about-glow-intense {
            0%, 100% {
              opacity: 0.8;
              filter: brightness(1);
            }
            50% {
              opacity: 1;
              filter: brightness(1.3);
            }
          }

          .about-text-card,
          .about-text-card.about-card {
            position: relative;
            border-radius: var(--about-radius);
            border: var(--about-border) solid var(--about-border-color);
            background: linear-gradient(235deg, hsl(var(--about-hue1) 50% 10% / 0.9), hsl(var(--about-hue1) 50% 10% / 0) 25%), 
                        linear-gradient(45deg, hsl(var(--about-hue2) 50% 10% / 0.9), hsl(var(--about-hue2) 50% 10% / 0) 25%), 
                        linear-gradient(hsl(220deg 25% 0% / 0.9));
            backdrop-filter: blur(4S0px) !important;
            -webkit-backdrop-filter: blur(40px) !important;
            box-shadow: hsl(var(--about-hue2) 50% 2%) 0px 10px 16px -8px, hsl(var(--about-hue2) 50% 4%) 0px 20px 36px -14px;
            overflow: visible;
            padding: 1.5rem;
          }

          @media (min-width: 1201px) {
            .about-grid {
              max-width: 1200px;
              margin: 0 auto;
            }
            
            .about-card {
              padding: 1.5rem;
            }
          }

          .about-text-card .shine,
          .about-text-card .shine::before,
          .about-text-card .shine::after {
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
          
          .about-text-card .shine-top {
            right: calc(var(--about-border) * -1);
            top: calc(var(--about-border) * -1);
            left: calc(var(--about-border) * -1);
            width: 100%;
            height: 50%;
            --hue: var(--about-hue1);
            --conic: -45deg;
          }
          
          .about-text-card .shine-bottom {
            bottom: calc(var(--about-border) * -1);
            left: calc(var(--about-border) * -1);
            right: calc(var(--about-border) * -1);
            top: auto;
            width: 100%;
            height: 50%;
            --hue: var(--about-hue2);
            --conic: 135deg;
          }

          .about-text-card .shine::before,
          .about-text-card .shine::after {
            content: "";
            width: auto;
            inset: -2px;
            mask: none;
          }

          .about-text-card .shine::after {
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

          .about-text-card .glow {
            pointer-events: none;
            border-top-right-radius: calc(var(--about-radius) * 2.5);
            border-bottom-left-radius: calc(var(--about-radius) * 2.5);
            border: calc(var(--about-radius) * 1.25) solid transparent;
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
          
          .about-text-card .glow-top {
            left: calc(var(--about-radius) * -2);
            bottom: auto;
            right: calc(var(--about-radius) * -2);
            top: calc(var(--about-radius) * -2);
            width: calc(100% + var(--about-radius) * 4);
            height: calc(50% + var(--about-radius) * 2);
            --hue: var(--about-hue1);
            --conic: -45deg;
          }
          
          .about-text-card .glow-bottom {
            bottom: calc(var(--about-radius) * -2);
            left: calc(var(--about-radius) * -2);
            right: calc(var(--about-radius) * -2);
            top: auto;
            width: calc(100% + var(--about-radius) * 4);
            height: calc(50% + var(--about-radius) * 2);
            --hue: var(--about-hue2);
            --conic: 135deg;
          }

          .about-text-card .glow::before,
          .about-text-card .glow::after {
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

          .about-text-card .glow::after {
            --lit: 70%;
            --sat: 100%;
            --start: 15%;
            --end: 35%;
            border-width: calc(var(--about-radius) * 1.75);
            border-radius: calc(var(--about-radius) * 2.75);
            inset: calc(var(--about-radius) * -0.25);
            z-index: 4;
            opacity: 0.75;
          }

          .about-text-card .glow-bright {
            --lit: 80%;
            --sat: 100%;
            --start: 13%;
            --end: 37%;
            border-width: 5px;
            border-radius: calc(var(--about-radius) + 2px);
            filter: blur(2px) brightness(0.66);
            opacity: 0.9;
          }
          
          .about-text-card .glow-bright.glow-top {
            left: -7px;
            bottom: auto;
            right: -7px;
            top: -7px;
            width: calc(100% + 14px);
            height: calc(50% + 7px);
            --hue: var(--about-hue1);
            --conic: -45deg;
          }
          
          .about-text-card .glow-bright.glow-bottom {
            bottom: -7px;
            left: -7px;
            right: -7px;
            top: auto;
            width: calc(100% + 14px);
            height: calc(50% + 7px);
            --hue: var(--about-hue2);
            --conic: 135deg;
          }

          .about-text-card .glow-bright::after {
            content: none;
          }

          .about-text-card .shine,
          .about-text-card .glow {
            opacity: 1;
          }
          
          .about-text-card .shine-top,
          .about-text-card .glow-top {
            --hue: var(--about-hue1);
            opacity: 1;
          }
          
          .about-text-card .shine-bottom,
          .about-text-card .glow-bottom {
            --hue: var(--about-hue2);
            --conic: 135deg;
            opacity: 1;
          }
          
          .about-info-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
            margin: 0.5rem 0 1.5rem 0;
            padding: 1.5rem 0;
          }
          
          .about-info-item {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }

          .about-info-item-row {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          @media (min-width: 640px) {
            .about-info-item-row {
              grid-template-columns: 1fr 1fr;
            }
          }
          
          .about-info-label {
            font-weight: 700;
            color: rgba(255, 255, 255, 0.95);
            font-size: 15px;
          }
          
          .about-info-value {
            color: rgba(255, 255, 255, 0.7);
            font-size: 15px;
            font-weight: 400;
          }
          
          .about-buttons {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-top: 1.5rem;
            justify-content: center;
            width: 100%;
          }

          @media (min-width: 640px) {
            .about-buttons {
              flex-direction: row;
            }
          }
          
          .about-button {
            position: relative;
            padding: 14px 32px;
            border: 0.5px solidrgba(255, 255, 255, 0.09);
            background: linear-gradient(235deg, hsl(var(--about-hue1) 55% 15% / 0.9), hsl(var(--about-hue1) 55% 15% / 0) 50%), 
                        linear-gradient(45deg, hsl(var(--about-hue2) 55% 15% / 0.9), hsl(var(--about-hue2) 55% 15% / 0) 50%), 
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
            width: 100%;
          }

          @media (min-width: 640px) {
            .about-button {
              width: auto;
            }
          }
          
          .about-button::before {
            content: "";
            position: absolute;
            inset: -2px;
            border: 2px solid;
            border-top-color: hsl(var(--about-hue1), 80%, 60%);
            border-right-color: hsl(var(--about-hue1), 80%, 60%);
            border-bottom-color: hsl(var(--about-hue2), 80%, 60%);
            border-left-color: hsl(var(--about-hue2), 80%, 60%);
            clip-path: polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px));
            pointer-events: none;
            z-index: -1;
          } 
          
         
   
          /* Download CV Button - Using --about-hue1 (290) with 0.7 opacity */
          .about-button-cv::before {
            border-top-color: hsl(var(--about-hue1), 80%, 60%, 0.7);
            border-right-color: hsl(var(--about-hue1), 80%, 60%, 0.7);
            border-bottom-color: hsl(var(--about-hue1), 80%, 60%, 0.7);
            border-left-color: hsl(var(--about-hue1), 80%, 60%, 0.7);
          }

          .about-button-cv::after {
            border-top-color: hsl(var(--about-hue1), 80%, 60%, 0.7);
            border-right-color: hsl(var(--about-hue1), 80%, 60%, 0.7);
          }

          .about-button-cv:hover::before {
            border-top-color: hsl(var(--about-hue1), 80%, 70%, 0.7);
            border-right-color: hsl(var(--about-hue1), 80%, 70%, 0.7);
            border-bottom-color: hsl(var(--about-hue1), 80%, 70%, 0.7);
            border-left-color: hsl(var(--about-hue1), 80%, 70%, 0.7);
          }

          .about-button-cv:hover::after {
            border-top-color: hsl(var(--about-hue1), 80%, 70%, 0.7);
            border-right-color: hsl(var(--about-hue1), 80%, 70%, 0.7);
          }

          /* Hire Me Button - Using --about-hue2 (240) with 0.7 opacity */
          .about-button-hire::before {
            border-top-color: hsl(var(--about-hue2), 80%, 60%, 0.7);
            border-right-color: hsl(var(--about-hue2), 80%, 60%, 0.7);
            border-bottom-color: hsl(var(--about-hue2), 80%, 60%, 0.7);
            border-left-color: hsl(var(--about-hue2), 80%, 60%, 0.7);
          }

          .about-button-hire::after {
            border-top-color: hsl(var(--about-hue2), 80%, 60%, 0.7);
            border-right-color: hsl(var(--about-hue2), 80%, 60%, 0.7);
          }

          .about-button-hire:hover::before {
            border-top-color: hsl(var(--about-hue2), 80%, 70%, 0.7);
            border-right-color: hsl(var(--about-hue2), 80%, 70%, 0.7);
            border-bottom-color: hsl(var(--about-hue2), 80%, 70%, 0.7);
            border-left-color: hsl(var(--about-hue2), 80%, 70%, 0.7);
          }

          .about-button-hire:hover::after {
            border-top-color: hsl(var(--about-hue2), 80%, 70%, 0.7);
            border-right-color: hsl(var(--about-hue2), 80%, 70%, 0.7);
          }
          
          .about-button:hover::before {
            border-bottom-color: hsl(var(--about-hue2), 80%, 70%);
            border-left-color: hsl(var(--about-hue2), 80%, 70%);
          }

          .about-button:hover::after {
            border-top-color: hsl(var(--about-hue1), 80%, 70%);
            border-right-color: hsl(var(--about-hue1), 80%, 70%);
          }
          
          .about-button:hover {
            background: linear-gradient(235deg, hsl(var(--about-hue1) 60% 20% / 0.9), hsl(var(--about-hue1) 60% 20% / 0) 40%), 
                        linear-gradient(45deg, hsl(var(--about-hue2) 60% 20% / 0.9), hsl(var(--about-hue2) 60% 20% / 0) 40%), 
                        linear-gradient(hsl(220deg 25% 0% / 0.6));
            color: white;
            transform: translateY(-2px);
          }
          
          @keyframes about-button-glow {
            0%, 100% {
              filter: brightness(1) drop-shadow(0 0 5px hsl(var(--about-hue1), 80%, 50%, 0.3));
            }
            50% {
              filter: brightness(1.5) drop-shadow(0 0 10px hsl(var(--about-hue2), 80%, 60%, 0.6));
            }
          }
          
          .about-text-card .hero-intro {
            font-family: "Science Gothic", sans-serif;
            font-size: 18px;
            text-transform: uppercase;
            letter-spacing: 0.3em;
            color: rgba(255, 255, 255, 0.7);
            font-weight: 300;
            display: inline-block;
          }

          @keyframes icon-blink {
            0%, 90%, 100% {
              opacity: 1;
              transform: scale(1);
            }
            8%, 12% {
              opacity: 0.5;
              transform: scale(1.1);
            }
            10% {
              opacity: 1;
              transform: scale(1.25);
              filter: brightness(1.5);
            }
          }

          .strength-icon {
            animation: icon-blink 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            transition: color 0.3s ease;
          }

          .strength-icon.blue {
            color: white;
          }

          .strength-icon.purple {
            color: white;
          }

          .strength-icon.blue:hover {
            color: white;
          }

          .strength-icon.purple:hover {
            color: white;
          }
        `
      }} />
      <section id="about" aria-label="About" className="px-4">
        <div className="max-w-5xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-8 items-center about-grid">
          {/* Left side - Text content */}
          <div className="space-y-6 animate-in fade-in slide-in-from-left duration-700">
            <div className="about-text-card about-card">
              <span className="shine shine-top"></span>
              <span className="shine shine-bottom"></span>
              <span className="glow glow-top"></span>
              <span className="glow glow-bottom"></span>
              <span className="glow glow-bright glow-top"></span>
              <span className="glow glow-bright glow-bottom"></span>
              <p className="hero-intro mb-6">About Me</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance mb-4 text-white">Diar Hyseni</h2>
              <p className="text-base text-white/80 leading-relaxed mb-3">
                I'm a passionate full-stack developer with over {yearsOfExperience} {yearsOfExperience === 1 ? 'year' : 'years'} of experience building modern web applications.
              </p>

              {/* Contact and Education Info */}
              <div className="about-info-grid">
                <div className="about-info-item">
                  <span className="about-info-label">Email</span>
                  <span className="about-info-value">diarhyseni4@gmail.com</span>
                </div>
                <div className="about-info-item">
                  <span className="about-info-label">Degree</span>
                  <span className="about-info-value">Computer Science & Engineering</span>
                </div>
                <div className="about-info-item-row">
                  <div className="about-info-item">
                    <span className="about-info-label">Phone</span>
                    <span className="about-info-value">+38344910403</span>
                  </div>
                  <div className="about-info-item">
                    <span className="about-info-label">City</span>
                    <span className="about-info-value">Mitrovica</span>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="about-buttons">
                <button className="about-button about-button-cv">
                 
                  Download CV
                </button>
                <button 
                  className="about-button about-button-hire"
                  onClick={() => {
                    const section = document.getElementById('contact');
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
              
                  Hire Me
                </button>
              </div>
            </div>
          </div>

          {/* Right side - Strengths grid */}
          <div className="space-y-6 animate-in fade-in slide-in-from-right duration-700 delay-200">
            {/* Strengths grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
              {strengths.map((strength, index) => (
                <div
                  key={strength.title}
                  className={`about-card p-3 md:p-6 group ${index % 2 === 0 ? 'about-card-top' : 'about-card-bottom'}`}
                >
                  <span className="shine shine-top"></span>
                  <span className="shine shine-bottom"></span>
                  <span className="glow glow-top"></span>
                  <span className="glow glow-bottom"></span>
                  <span className="glow glow-bright glow-top"></span>
                  <span className="glow glow-bright glow-bottom"></span>
                  <strength.icon 
                    className={`strength-icon w-10 h-10 mb-4 group-hover:scale-110 transition-transform ${index % 2 === 0 ? 'blue' : 'purple'}`} 
                    style={{ animationDelay: `${index * 1}s` }} 
                  />
                  <h3 className="font-semibold mb-2 text-white">{strength.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{strength.description}</p>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
