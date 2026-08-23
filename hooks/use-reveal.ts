"use client"

import { useEffect, useRef, useState } from "react"

type UseRevealOptions = {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function getScrollRoot(): Element | null {
  const scrollRoot = document.getElementById("main-scroll")
  if (!scrollRoot) return null

  const style = window.getComputedStyle(scrollRoot)
  const canScroll = /auto|scroll|overlay/.test(style.overflowY)
  if (!canScroll) return null

  return scrollRoot.scrollHeight > scrollRoot.clientHeight + 1 ? scrollRoot : null
}

function isNodeVisible(node: HTMLElement, root: Element | null) {
  const rect = node.getBoundingClientRect()
  if (rect.width === 0 && rect.height === 0) return false

  if (root instanceof Element) {
    const rootRect = root.getBoundingClientRect()
    return rect.top < rootRect.bottom - 24 && rect.bottom > rootRect.top + 24
  }

  return rect.top < window.innerHeight * 0.92 && rect.bottom > window.innerHeight * 0.08
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

    const isMobile = window.matchMedia("(max-width: 768px)").matches
    const root = getScrollRoot()
    const effectiveThreshold = isMobile ? 0.05 : threshold
    const effectiveRootMargin = isMobile ? "0px" : rootMargin

    const reveal = () => {
      setIsVisible(true)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        reveal()
        if (once) observer.unobserve(node)
      },
      { root, threshold: effectiveThreshold, rootMargin: effectiveRootMargin }
    )

    observer.observe(node)

    const checkInitialVisibility = () => {
      if (isNodeVisible(node, root)) {
        reveal()
        if (once) observer.unobserve(node)
      }
    }

    checkInitialVisibility()
    requestAnimationFrame(checkInitialVisibility)
    window.addEventListener("resize", checkInitialVisibility)

    return () => {
      observer.disconnect()
      window.removeEventListener("resize", checkInitialVisibility)
    }
  }, [threshold, rootMargin, once])

  return { ref, isVisible, revealClass: isVisible ? "is-revealed" : "" }
}
