import { useEffect } from 'react'
// Type-only, so Lenis itself still arrives through the dynamic import below.
import type Lenis from 'lenis'
import { ScrollTrigger, gsap, prefersReducedMotion } from '../lib/gsap'
import { registerLenis } from '../lib/scroll'

/*
  Lenis drives the page scroll and GSAP's ticker drives Lenis, so both share one
  RAF loop instead of competing for frames. ScrollTrigger is updated from Lenis'
  scroll event, otherwise every trigger reads a stale scroll position.

  Skipped entirely under reduced-motion: hijacking scroll is exactly the kind of
  motion that setting asks us to drop.
*/
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    let lenis: Lenis | null = null
    let tickerFn: ((time: number) => void) | null = null
    let cancelled = false

    const init = async () => {
      const { default: LenisCtor } = await import('lenis')
      if (cancelled) return

      lenis = new LenisCtor({
        duration: 1.05,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.4,
        smoothWheel: true,
      })

      lenis.on('scroll', ScrollTrigger.update)
      registerLenis(lenis)

      tickerFn = (time: number) => {
        // GSAP's ticker reports seconds, Lenis expects milliseconds.
        lenis?.raf(time * 1000)
      }
      gsap.ticker.add(tickerFn)
      gsap.ticker.lagSmoothing(0)

      ScrollTrigger.refresh()
    }

    void init()

    return () => {
      cancelled = true
      registerLenis(null)
      if (tickerFn) gsap.ticker.remove(tickerFn)
      gsap.ticker.lagSmoothing(500, 33)
      lenis?.destroy()
    }
  }, [])
}
