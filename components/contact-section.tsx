"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Github, Linkedin } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ name: "", email: "", message: "" })
      } else {
        toast.error(data.error || "Failed to send message. Please try again.")
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error("Error submitting contact form:", error)
      toast.error("An error occurred. Please try again.")
      setIsSubmitting(false)
    }
  }

  const socialLinks = [
    { icon: Mail, href: "mailto:diarhyseni4@gmail.com", label: "Email" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ]

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          :root {
            --contact-hue1: 60;
            --contact-hue2: 180;
            --contact-border: 1px;
            --contact-border-color: hsl(var(--contact-hue2), 12%, 20%);
            --contact-radius: 22px;
            --contact-ease: cubic-bezier(0.5, 1, 0.89, 1);
          }

          #contact {
            min-height: 100vh;
            display: flex;
            align-items: center;
            padding: 2rem 1rem;
            scroll-snap-align: start;
            background: #08090d;
            background-image: url(https://assets.codepen.io/13471/abstract-light.jpg), linear-gradient(to right in oklab, hsl(var(--contact-hue2) 50% 75%), hsl(var(--contact-hue1) 50% 75%));
            background-size: cover;
            background-position: center;
            background-blend-mode: hard-light;
          }

          #contact * {
            font-family: "Science Gothic", sans-serif !important;
            font-weight: 300 !important;
          }

          .contact-card {
            position: relative;
            border-radius: var(--contact-radius);
            border: var(--contact-border) solid var(--contact-border-color);
            background: linear-gradient(235deg, hsl(var(--contact-hue1) 50% 10% / 0.9), hsl(var(--contact-hue1) 50% 10% / 0) 25%), 
                        linear-gradient(45deg, hsl(var(--contact-hue2) 50% 10% / 0.9), hsl(var(--contact-hue2) 50% 10% / 0) 25%), 
                        linear-gradient(hsl(220deg 25% 0% / 0.6));
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            box-shadow: hsl(var(--contact-hue2) 50% 2%) 0px 10px 16px -8px, hsl(var(--contact-hue2) 50% 4%) 0px 20px 36px -14px;
            overflow: visible;
            padding: 2rem;
          }

          @media (max-width: 768px) {
            .contact-card {
              padding: 24px;
            }

            .contact-heading {
              font-size: 24px;
            }
          }

          .contact-card .shine,
          .contact-card .shine::before,
          .contact-card .shine::after {
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
          
          .contact-card .shine-top {
            right: calc(var(--contact-border) * -1);
            top: calc(var(--contact-border) * -1);
            left: calc(var(--contact-border) * -1);
            width: 100%;
            height: 50%;
            --hue: var(--contact-hue1);
            --conic: -45deg;
          }
          
          .contact-card .shine-bottom {
            bottom: calc(var(--contact-border) * -1);
            left: calc(var(--contact-border) * -1);
            right: calc(var(--contact-border) * -1);
            top: auto;
            width: 100%;
            height: 50%;
            --hue: var(--contact-hue2);
            --conic: 135deg;
          }

          .contact-card .shine::before,
          .contact-card .shine::after {
            content: "";
            width: auto;
            inset: -2px;
            mask: none;
          }

          .contact-card .shine::after {
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

          .contact-card .glow {
            pointer-events: none;
            border-top-right-radius: calc(var(--contact-radius) * 2.5);
            border-bottom-left-radius: calc(var(--contact-radius) * 2.5);
            border: calc(var(--contact-radius) * 1.25) solid transparent;
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
          
          .contact-card .glow-top {
            left: calc(var(--contact-radius) * -2);
            bottom: auto;
            right: calc(var(--contact-radius) * -2);
            top: calc(var(--contact-radius) * -2);
            width: calc(100% + var(--contact-radius) * 4);
            height: calc(50% + var(--contact-radius) * 2);
            --hue: var(--contact-hue1);
            --conic: -45deg;
          }
          
          .contact-card .glow-bottom {
            bottom: calc(var(--contact-radius) * -2);
            left: calc(var(--contact-radius) * -2);
            right: calc(var(--contact-radius) * -2);
            top: auto;
            width: calc(100% + var(--contact-radius) * 4);
            height: calc(50% + var(--contact-radius) * 2);
            --hue: var(--contact-hue2);
            --conic: 135deg;
          }

          .contact-card .glow::before,
          .contact-card .glow::after {
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

          .contact-card .glow::after {
            --lit: 70%;
            --sat: 100%;
            --start: 15%;
            --end: 35%;
            border-width: calc(var(--contact-radius) * 1.75);
            border-radius: calc(var(--contact-radius) * 2.75);
            inset: calc(var(--contact-radius) * -0.25);
            z-index: 4;
            opacity: 0.75;
          }

          .contact-card .glow-bright {
            --lit: 80%;
            --sat: 100%;
            --start: 13%;
            --end: 37%;
            border-width: 5px;
            border-radius: calc(var(--contact-radius) + 2px);
            filter: blur(2px) brightness(0.66);
            opacity: 0.9;
          }
          
          .contact-card .glow-bright.glow-top {
            left: -7px;
            bottom: auto;
            right: -7px;
            top: -7px;
            width: calc(100% + 14px);
            height: calc(50% + 7px);
            --hue: var(--contact-hue1);
            --conic: -45deg;
          }
          
          .contact-card .glow-bright.glow-bottom {
            bottom: -7px;
            left: -7px;
            right: -7px;
            top: auto;
            width: calc(100% + 14px);
            height: calc(50% + 7px);
            --hue: var(--contact-hue2);
            --conic: 135deg;
          }

          .contact-card .glow-bright::after {
            content: none;
          }

          .contact-card .shine,
          .contact-card .glow {
            opacity: 1;
          }
          
          .contact-card .shine-top,
          .contact-card .glow-top {
            --hue: var(--contact-hue1);
            opacity: 1;
          }
          
          .contact-card .shine-bottom,
          .contact-card .glow-bottom {
            --hue: var(--contact-hue2);
            --conic: 135deg;
            opacity: 1;
          }

          .contact-section-title {
            font-family: "Science Gothic", sans-serif;
            font-size: 18px;
            text-transform: uppercase;
            letter-spacing: 0.3em;
            color: rgba(255, 255, 255, 0.7);
            font-weight: 300;
            display: inline-block;
            margin-bottom: 1rem;
          }

          .contact-form-group {
            margin-bottom: 1.5rem;
          }

          .contact-form-label {
            display: block;
            font-family: "Science Gothic", sans-serif;
            font-size: 14px;
            font-weight: 300;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 0.5rem;
          }

          .contact-form-input,
          .contact-form-textarea {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid hsl(var(--contact-hue2), 12%, 20%);
            border-radius: calc(var(--contact-radius) * 0.3);
            background: linear-gradient(235deg, hsl(var(--contact-hue1) 50% 10% / 0.5), hsl(var(--contact-hue1) 50% 10% / 0) 25%), 
                        linear-gradient(45deg, hsl(var(--contact-hue2) 50% 10% / 0.5), hsl(var(--contact-hue2) 50% 10% / 0) 25%), 
                        linear-gradient(hsl(220deg 25% 0% / 0.3));
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            color: white;
            font-family: "Science Gothic", sans-serif;
            font-weight: 300;
            font-size: 14px;
            transition: all 0.3s ease;
          }

          .contact-form-input:focus,
          .contact-form-textarea:focus {
            outline: none;
            border-color: hsl(var(--contact-hue1), 80%, 60%);
            box-shadow: 0 0 0 3px hsl(var(--contact-hue1), 80%, 60%, 0.2);
          }

          .contact-form-input::placeholder,
          .contact-form-textarea::placeholder {
            color: rgba(255, 255, 255, 0.5);
          }

          .contact-form-textarea {
            min-height: 100px;
            resize: vertical;
          }

          .contact-button {
            position: relative;
            padding: 14px 32px;
            border: 0.5px solidrgba(255, 255, 255, 0.09);
            background: linear-gradient(235deg, hsl(var(--contact-hue1) 55% 15% / 0.9), hsl(var(--contact-hue1) 55% 15% / 0) 50%), 
                        linear-gradient(45deg, hsl(var(--contact-hue2) 55% 15% / 0.9), hsl(var(--contact-hue2) 55% 15% / 0) 50%), 
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
          
          .contact-button::before {
            content: "";
            position: absolute;
            inset: -2px;
            border: 2px solid;
            border-top-color: hsl(var(--contact-hue1), 80%, 60%);
            border-right-color: hsl(var(--contact-hue1), 80%, 60%);
            border-bottom-color: hsl(var(--contact-hue2), 80%, 60%);
            border-left-color: hsl(var(--contact-hue2), 80%, 60%);
            clip-path: polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px));
            pointer-events: none;
            z-index: -1;
          }

          .contact-button::after {
            content: "";
            position: absolute;
            top: -2px;
            right: -2px;
            width: 14px;
            height: 14px;
            border-top: 2px solid hsl(var(--contact-hue1), 80%, 60%);
            border-right: 2px solid hsl(var(--contact-hue1), 80%, 60%);
            pointer-events: none;
            z-index: 1;
            clip-path: polygon(0 0, 100% 0, 100% 12px, calc(100% - 12px) 0);
          }
          
          .contact-button:hover::before {
            border-bottom-color: hsl(var(--contact-hue2), 80%, 70%);
            border-left-color: hsl(var(--contact-hue2), 80%, 70%);
            border-top-color: hsl(var(--contact-hue1), 80%, 70%);
            border-right-color: hsl(var(--contact-hue1), 80%, 70%);
          }

          .contact-button:hover::after {
            border-top-color: hsl(var(--contact-hue1), 80%, 70%);
            border-right-color: hsl(var(--contact-hue1), 80%, 70%);
          }
          
          .contact-button:hover {
            background: linear-gradient(235deg, hsl(var(--contact-hue1) 60% 20% / 0.9), hsl(var(--contact-hue1) 60% 20% / 0) 40%), 
                        linear-gradient(45deg, hsl(var(--contact-hue2) 60% 20% / 0.9), hsl(var(--contact-hue2) 60% 20% / 0) 40%), 
                        linear-gradient(hsl(220deg 25% 0% / 0.6));
            transform: translateY(-2px);
          }

          .contact-social-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            border-radius: calc(var(--contact-radius) * 0.3);
            background: linear-gradient(235deg, hsl(var(--contact-hue1) 50% 10% / 0.5), hsl(var(--contact-hue1) 50% 10% / 0) 25%), 
                        linear-gradient(45deg, hsl(var(--contact-hue2) 50% 10% / 0.5), hsl(var(--contact-hue2) 50% 10% / 0) 25%), 
                        linear-gradient(hsl(220deg 25% 0% / 0.3));
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid hsl(var(--contact-hue2), 12%, 20%);
            color: white;
            text-decoration: none;
            transition: all 0.3s ease;
            margin-bottom: 0.75rem;
          }

          .contact-social-item:hover {
            border-color: hsl(var(--contact-hue1), 80%, 60%);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px hsl(var(--contact-hue1), 80%, 50%, 0.2);
          }

          .contact-social-icon {
            width: 20px;
            height: 20px;
            color: white;
            transition: transform 0.3s ease;
          }

          .contact-social-item:hover .contact-social-icon {
            transform: scale(1.1);
          }

          .contact-social-label {
            font-family: "Science Gothic", sans-serif;
            font-size: 14px;
            font-weight: 300;
            color: white;
            flex: 1;
          }

          .contact-heading {
            font-family: "Science Gothic", sans-serif;
            font-size: 32px;
            font-weight: 300;
            color: white;
            margin-bottom: 1rem;
          }

          .contact-description {
            font-family: "Science Gothic", sans-serif;
            font-size: 14px;
            font-weight: 300;
            color: rgba(255, 255, 255, 0.7);
            line-height: 1.6;
            margin-bottom: 2rem;
          }
        `
      }} />
      <section id="contact" aria-label="Contact">
        <div className="max-w-6xl mx-auto w-full">
          <div className="max-w-2xl mx-auto">
            {/* Contact Form */}
            <div className="contact-card">
              <span className="shine shine-top"></span>
              <span className="shine shine-bottom"></span>
              <span className="glow glow-top"></span>
              <span className="glow glow-bottom"></span>
              <span className="glow glow-bright glow-top"></span>
              <span className="glow glow-bright glow-bottom"></span>
              {!isSubmitted && (
                <>
                  <p className="contact-section-title">Get In Touch</p>
                  <h2 className="contact-heading">Let's Build Something Great</h2>
                </>
              )}
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="mb-4">
                    <svg className="w-16 h-16 mx-auto text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="contact-heading mb-4">Thank You!</h3>
                  <p className="contact-description">
                    Your message has been sent successfully. I'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="contact-form-group">
                    <label htmlFor="name" className="contact-form-label">
                  Name
                </label>
                    <input
                  id="name"
                      type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="contact-form-input"
                  required
                />
              </div>

                  <div className="contact-form-group">
                    <label htmlFor="email" className="contact-form-label">
                  Email
                </label>
                    <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="contact-form-input"
                  required
                />
              </div>

                  <div className="contact-form-group">
                    <label htmlFor="message" className="contact-form-label">
                  Message
                </label>
                    <textarea
                  id="message"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="contact-form-textarea"
                  required
                />
              </div>

                  <button 
                    type="submit" 
                    className="contact-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
            </form>
              )}

              {/* Social Links */}
              <div className="lg:mt-8 mt-4 lg:pt-8 pt-4 border-t border-white/10">
                {isSubmitted ? (
                  <p className="text-center text-white/70 mb-6" style={{ fontFamily: "'Science Gothic', sans-serif", fontWeight: 300, fontSize: '14px' }}>
                    In the meantime please check my social media:
                  </p>
                ) : (
                  <p className="text-center text-white/70 mb-6" style={{ fontFamily: "'Science Gothic', sans-serif", fontWeight: 300, fontSize: '14px' }}>OR</p>
                )}
                  <div className="flex justify-center gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-300 hover:transform hover:scale-110 flex-1 max-w-[120px]"                      style={{
                        background: 'linear-gradient(235deg, hsl(var(--contact-hue1) 50% 10% / 0.3), hsl(var(--contact-hue1) 50% 10% / 0) 25%), linear-gradient(45deg, hsl(var(--contact-hue2) 50% 10% / 0.3), hsl(var(--contact-hue2) 50% 10% / 0) 25%), linear-gradient(hsl(220deg 25% 0% / 0.2))',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '1px solid hsl(var(--contact-hue2), 12%, 20%)'
                      }}
                    >
                      <social.icon className="contact-social-icon" style={{ width: '1.25rem', height: '1.25rem', flexShrink: 0 }} />
                      <span className="contact-social-label" style={{ fontSize: '14px' }}>{social.label}</span>
                    </a>
                  ))}
                </div>
                {!isSubmitted && (
                  <p className="text-center text-white/60 mt-6" style={{ fontFamily: "'Science Gothic', sans-serif", fontWeight: 300, fontSize: '13px', lineHeight: '1.6' }}>
                    Always open for new projects or collaborations.
                  </p>
                )}
              </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
