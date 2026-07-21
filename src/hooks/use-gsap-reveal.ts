import { useEffect } from 'react'

function revealTween(
  gsap: typeof import('gsap').default,
  el: HTMLElement,
  index: number,
) {
  return gsap.fromTo(
    el,
    { opacity: 0, y: 40, filter: 'blur(8px)' },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      delay: index * 0.03,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
    },
  )
}

function cleanupTriggers(
  tweens: Array<{ kill: () => void }>,
  ScrollTrigger: { getAll: () => Array<{ kill: () => void }> },
) {
  tweens.forEach((tween) => tween.kill())
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
}

export function useGsapReveal() {
  useEffect(() => {
    let isMounted = true
    let cleanup = () => {}

    const setup = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])

      if (!isMounted) {
        return
      }

      gsap.registerPlugin(ScrollTrigger)
      const cards = gsap.utils.toArray<HTMLElement>('[data-reveal]')

      const tweens = cards.map((el, index) => revealTween(gsap, el, index))

      cleanup = () => {
        cleanupTriggers(tweens, ScrollTrigger)
      }
    }

    void setup()

    return () => {
      isMounted = false
      cleanup()
    }
  }, [])
}
