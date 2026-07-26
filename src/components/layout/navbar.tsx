import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { navLinks, company } from '../../data/siteData'
import { ScrollTrigger, prefersReducedMotion, useGSAP } from '../../lib/gsap'
import { scrollToY } from '../../lib/scroll'
import { cn } from '../../utils/cn'

export function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isHome = pathname === '/'

  const [activeHref, setActiveHref] = useState<string>('')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  /*
    The whole site opens on paper now, hero included, so the bar keeps ink
    text everywhere. `solid` only controls the chrome: transparent while the
    page is at the top, condensing into the blurred paper pill on scroll.
  */
  const solid = !isHome || scrolled

  /*
    Most sections are lazy-loaded behind a Suspense boundary, so at first mount
    only #about and #services exist in the DOM. Building the scroll-spy then
    silently skipped every later section and the nav stayed stuck on whichever
    one had loaded. Wait until every target is present, then build.
  */
  const [targetsReady, setTargetsReady] = useState(false)

  useEffect(() => {
    if (targetsReady || !isHome) return
    let raf = 0
    let attempts = 0

    const check = () => {
      if (navLinks.every((l) => document.querySelector(l.href))) {
        setTargetsReady(true)
        return
      }
      // Give up after roughly ten seconds rather than spin forever.
      if (attempts++ > 600) return
      raf = requestAnimationFrame(check)
    }

    check()
    return () => cancelAnimationFrame(raf)
  }, [targetsReady, isHome])

  /*
    Scroll-spy: one ScrollTrigger per section, each claiming the active state
    while its section owns the upper half of the viewport. The old navbar only
    highlighted whatever you last clicked, which went stale the moment you
    scrolled away.
  */
  useGSAP(
    () => {
      if (!isHome) {
        setScrolled(true)
        setActiveHref('')
        return
      }

      ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        onToggle: (self) => setScrolled(self.isActive),
      })

      navLinks.forEach((link) => {
        const el = document.querySelector(link.href)
        if (!el) return
        ScrollTrigger.create({
          trigger: el,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: (self) => {
            if (self.isActive) setActiveHref(link.href)
          },
        })
      })

      ScrollTrigger.refresh()
    },
    { dependencies: [targetsReady, isHome], revertOnUpdate: true },
  )

  // Escape closes the menu, and focus returns to nothing stale behind it.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const handleNav = (href: string) => (event: React.MouseEvent) => {
    event.preventDefault()
    setOpen(false)

    /*
      Section anchors only exist on the home page. From a category page, route
      home first and let the browser resolve the hash there, otherwise every nav
      link is dead once the visitor has clicked into a gallery.
    */
    if (!isHome) {
      navigate(`/${href}`)
      return
    }

    const target = document.querySelector(href)
    if (!target) return
    setActiveHref(href)

    const top =
      target.getBoundingClientRect().top + window.scrollY - (window.innerWidth < 768 ? 72 : 88)

    /*
      Through Lenis, not window.scrollTo: a native smooth scroll and Lenis
      fight over scrollTop and the jump stutters. See lib/scroll.ts.
    */
    scrollToY(Math.max(top, 0), { immediate: prefersReducedMotion() })
  }

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 px-4 sm:px-6"
      style={{ zIndex: 'var(--z-nav)' }}
    >
      <div
        className={cn(
          'mx-auto mt-3 flex w-full max-w-6xl items-center justify-between gap-4 rounded-full px-4 sm:px-6',
          'transition-[height,background-color,border-color] duration-300',
          '[transition-timing-function:var(--ease-out)]',
          solid
            ? 'h-[52px] border border-line bg-paper/85 backdrop-blur-xl'
            : 'h-[60px] border border-transparent bg-transparent',
        )}
      >
        <a
          href="#top"
          onClick={handleNav('#top')}
          className="text-[0.8125rem] leading-tight font-semibold tracking-[-0.01em] text-ink sm:text-sm"
        >
          {company.name}
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = activeHref === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNav(link.href)}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'relative rounded-full px-3.5 py-2 text-sm transition-colors duration-200',
                  isActive ? 'text-ink' : 'text-muted hover:text-ink',
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    aria-hidden
                    className="absolute inset-x-3.5 -bottom-0.5 h-px bg-accent-strong"
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  />
                )}
              </a>
            )
          })}
        </nav>

        <div className="hidden md:block">
          <a
            href="#contact"
            onClick={handleNav('#contact')}
            className="inline-flex h-10 items-center rounded-full bg-ink px-5 text-sm font-medium text-paper transition-[transform,background-color] duration-300 [transition-timing-function:var(--ease-out)] hover:bg-night-soft active:scale-[0.97]"
          >
            Start a project
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors duration-300 hover:bg-sunken md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="mx-auto mt-2 w-full max-w-6xl overflow-hidden rounded-card border border-line bg-paper/95 p-2 backdrop-blur-xl md:hidden"
          >
            <nav aria-label="Mobile">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNav(link.href)}
                  aria-current={activeHref === link.href ? 'true' : undefined}
                  className={cn(
                    'block rounded-inset px-4 py-3.5 text-[0.9375rem] transition-colors duration-200',
                    activeHref === link.href
                      ? 'bg-sunken text-ink'
                      : 'text-ink-soft hover:bg-sunken hover:text-ink',
                  )}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
