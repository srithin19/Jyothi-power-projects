import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/*
  Single registration point. Registering in more than one module is harmless but
  makes it easy to forget one, which fails only at runtime and only on the route
  that missed it.
*/
gsap.registerPlugin(ScrollTrigger, useGSAP)

/** True when the visitor has asked the OS to minimise motion. */
export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export { gsap, ScrollTrigger, useGSAP }
