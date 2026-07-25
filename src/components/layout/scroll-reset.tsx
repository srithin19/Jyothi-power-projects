import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from '../../lib/gsap'
import { jumpToTop } from '../../lib/scroll'

/*
  Resets scroll on navigation, and it has to happen before the incoming page
  builds its scroll animations.

  React runs child effects before parent effects, so doing this in the Layout
  effect was too late: the new page created its ScrollTriggers while the window
  was still scrolled to the previous page's position, decided its images were
  already scrolled past, and killed the one-shot triggers without ever revealing
  them. Every photo stayed at opacity 0.

  Rendering this as an earlier sibling of the route content, with a layout
  effect, puts the reset ahead of that work.
*/
export function ScrollReset() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (hash) return
    jumpToTop()

    /*
      Trigger positions were measured against the previous page's layout, so
      they are meaningless now. Refresh once the new page has painted.
    */
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(raf)
  }, [pathname, hash])

  return null
}
