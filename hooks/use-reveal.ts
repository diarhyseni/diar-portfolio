"use client"

import { useEffect, useRef, useState } from "react"

type UseRevealOptions = {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealOptions = {}
) {
  const { threshold = 0.15, rootMargin = "0px 0px -8% 0px", once = true } = options
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true)
      return
    }

    const scrollRoot = document.getElementById("main-scroll")
    const root =
      scrollRoot && scrollRoot.scrollHeight > scrollRoot.clientHeight + 1
        ? scrollRoot
        : null

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setIsVisible(true)
        if (once) observer.unobserve(node)
      },
      { root, threshold, rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, isVisible, revealClass: isVisible ? "is-revealed" : "" }
}
