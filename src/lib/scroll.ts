import type Lenis from 'lenis'

/*
  Lenis owns the scroll position while smooth scrolling is on, so calling
  window.scrollTo alone can be undone on its next frame. The instance is
  registered here when it is created and used for programmatic jumps.
*/
let instance: Lenis | null = null

export function registerLenis(lenis: Lenis | null) {
  instance = lenis
}

/** Jump to the top with no animation, whichever scroller is in charge. */
export function jumpToTop() {
  if (instance) {
    instance.scrollTo(0, { immediate: true, force: true })
  }
  window.scrollTo(0, 0)
}

/*
  Animated anchor scroll, routed through Lenis when it is running.

  window.scrollTo({ behavior: 'smooth' }) while Lenis is active starts a native
  animation that Lenis neither knows about nor respects: the first wheel input
  mid-flight makes the two fight over scrollTop and the jump stutters or dies
  short of the target. Going through lenis.scrollTo keeps one owner of the
  scroll position and gives anchors the same glide as the rest of the page.
*/
export function scrollToY(top: number, { immediate = false } = {}) {
  if (instance) {
    instance.scrollTo(top, {
      immediate,
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    })
    return
  }
  window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' })
}
