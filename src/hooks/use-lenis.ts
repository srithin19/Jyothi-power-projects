import { useEffect } from 'react'

export function useLenis() {
  useEffect(() => {
    let rafId = 0
    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null
    let isMounted = true

    const initLenis = async () => {
      const { default: Lenis } = await import('lenis')
      if (!isMounted) {
        return
      }

      lenis = new Lenis({
        duration: 1.15,
        wheelMultiplier: 0.9,
        touchMultiplier: 1,
        smoothWheel: true,
      })

      const raf = (time: number) => {
        lenis?.raf(time)
        rafId = requestAnimationFrame(raf)
      }

      rafId = requestAnimationFrame(raf)
    }

    void initLenis()

    return () => {
      isMounted = false
      cancelAnimationFrame(rafId)
      lenis?.destroy()
    }
  }, [])
}
