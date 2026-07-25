import { useRef } from 'react'
import { ScrollTrigger, gsap, prefersReducedMotion, useGSAP } from '../lib/gsap'

/*
  Scroll reveal for a section.

  Returns a ref to spread on the section element. Every descendant carrying
  [data-reveal] fades and lifts in as it enters, batched so items that cross the
  line together stagger as one group rather than firing independently.

  The hidden start state lives behind .js-reveal-ready (set here, not in the
  HTML), so if the bundle fails to load the content is simply visible.
*/
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const scope = useRef<T>(null)

  useGSAP(
    () => {
      const root = scope.current
      if (!root) return

      const items = gsap.utils.toArray<HTMLElement>('[data-reveal]', root)
      if (items.length === 0) return

      if (prefersReducedMotion()) {
        gsap.set(items, { opacity: 1, y: 0, clearProps: 'transform' })
        return
      }

      document.documentElement.classList.add('js-reveal-ready')
      gsap.set(items, { opacity: 0, y: 18 })

      const reveal = (batch: Element[]) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.62,
          ease: 'power3.out',
          stagger: 0.07,
          overwrite: true,
          // Release the compositor layer once the element has settled. The
          // inline transform must stay: clearing it would let the stylesheet's
          // hidden-state transform re-apply.
          onComplete: () => gsap.set(batch, { willChange: 'auto' }),
        })

      ScrollTrigger.batch(items, {
        start: 'top 88%',
        once: true,
        batchMax: 6,
        interval: 0.08,
        onEnter: reveal,
      })

      /*
        Safety net. These triggers are one-shot, so anything ScrollTrigger judges
        to be already scrolled past gets killed without ever firing, leaving the
        element stuck at opacity 0. That happened on client-side navigation,
        where the incoming page measured itself against the outgoing page's
        scroll position and every photo stayed invisible.

        After a frame, sweep for anything inside the viewport that is still
        hidden and bring it in. Content being visible is not negotiable; the
        animation is.
      */
      const sweep = requestAnimationFrame(() => {
        const stuck = items.filter(
          (el) =>
            Number(gsap.getProperty(el, 'opacity')) === 0 &&
            el.getBoundingClientRect().top < window.innerHeight,
        )
        if (stuck.length > 0) reveal(stuck)
      })

      return () => cancelAnimationFrame(sweep)
    },
    { scope },
  )

  return scope
}
