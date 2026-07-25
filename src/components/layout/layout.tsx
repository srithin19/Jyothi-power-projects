import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Footer } from './footer'
import { ScrollReset } from './scroll-reset'
import { Navbar } from './navbar'
import { useSmoothScroll } from '../../hooks/use-smooth-scroll'
import { ScrollTrigger } from '../../lib/gsap'
import { scrollToY } from '../../lib/scroll'

/*
  Chrome shared by every route: skip link, background wash, navbar, footer.
  Route-specific content is the children.
*/
export function Layout({ children }: { children: ReactNode }) {
  const { pathname, hash } = useLocation()

  useSmoothScroll()

  /*
    Scrolling to the top on navigation is handled by <ScrollReset /> below,
    which has to run before the incoming page's effects. This only handles the
    hash case: arriving from a category page via /#contact.

    One jump is not enough here. The target may belong to a lazy chunk that has
    not mounted yet, and even once it exists the layout above it keeps moving:
    the projects section's ScrollTrigger pin inserts a spacer the height of the
    whole horizontal track, which pushes everything below it further down
    *after* a correctly-computed scroll has already landed. So this keeps
    re-aligning each frame until the target has sat still for a few frames,
    and stands down the moment the visitor scrolls themselves.
  */
  useEffect(() => {
    if (!hash) return
    let raf = 0
    let attempts = 0
    let stable = 0
    let cancelled = false

    const stop = () => {
      cancelled = true
    }

    const align = () => {
      if (cancelled || attempts++ > 240) return

      const el = document.querySelector(hash)
      if (el) {
        // 88px mirrors the fixed navbar's scroll-margin-top.
        const target = Math.max(
          el.getBoundingClientRect().top + window.scrollY - 88,
          0,
        )
        if (Math.abs(target - window.scrollY) > 2) {
          /*
            Through the Lenis-aware helper: scrollIntoView writes scrollTop
            behind Lenis' back and can be undone on its next frame.
          */
          scrollToY(target, { immediate: true })
          ScrollTrigger.refresh()
          stable = 0
        } else if (++stable >= 8) {
          return
        }
      }
      raf = requestAnimationFrame(align)
    }
    align()

    window.addEventListener('wheel', stop, { passive: true })
    window.addEventListener('touchstart', stop, { passive: true })

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      window.removeEventListener('wheel', stop)
      window.removeEventListener('touchstart', stop)
    }
  }, [pathname, hash])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>

      {/*
        Fixed so the wash stays put while content scrolls over it, which reads
        as ambient light rather than a texture glued to the page. Painted behind
        everything in normal flow.
      */}
      <div className="page-wash pointer-events-none fixed inset-0 -z-10" aria-hidden />

      <ScrollReset />

      <Navbar />
      {children}
      <Footer />
    </>
  )
}
