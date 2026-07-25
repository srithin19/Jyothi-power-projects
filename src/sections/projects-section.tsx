import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { galleryCovers } from '../data/galleries'
import { SectionIntro } from '../components/ui/section'
import { gsap, useGSAP } from '../lib/gsap'
import { useReveal } from '../hooks/use-reveal'

/*
  Desktop pins the section and converts vertical scroll into horizontal travel
  across the gallery. Mobile gets a native snap-scroll row instead: hijacking
  scroll on a phone fights the platform and breaks momentum, and the same four
  images work fine as a swipe.
*/
export function ProjectsSection() {
  const scope = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const introScope = useReveal<HTMLDivElement>()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          isDesktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
        },
        (context) => {
          if (!context.conditions?.isDesktop) return

          const track = trackRef.current
          const panel = scope.current?.querySelector<HTMLElement>('[data-panel]')
          if (!track || !panel) return

          const distance = () => track.scrollWidth - panel.offsetWidth

          gsap.to(track, {
            x: () => -distance(),
            // ease must stay linear or scroll position and travel desync.
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              pin: true,
              scrub: 0.8,
              start: 'top top',
              end: () => `+=${distance()}`,
              invalidateOnRefresh: true,
            },
          })
        },
      )

      return () => mm.revert()
    },
    { scope },
  )

  return (
    <section ref={scope} id="projects" className="pt-16 sm:pt-20 md:pt-28">
      <div ref={introScope} className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionIntro
          title="Execution quality you can see at first glance."
          telugu="మా ప్రాజెక్టుల నాణ్యత, మొదటి చూపులోనే స్పష్టంగా"
        />
      </div>

      <div
        data-panel
        className="mt-12 lg:mt-0 lg:flex lg:h-screen lg:items-center lg:overflow-hidden"
      >
        <div
          ref={trackRef}
          className={[
            'flex gap-4 overflow-x-auto px-5 pb-4 sm:gap-6 sm:px-8',
            'snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
            'lg:overflow-visible lg:px-[max(2rem,calc((100vw-72rem)/2))] lg:pb-0',
          ].join(' ')}
        >
          {/*
            One cover per category, each linking to its own page. The whole tile
            is the link so the tap target is the photograph, not just the label.
          */}
          {galleryCovers.map((item, i) => (
            <Link
              key={item.slug}
              to={`/work/${item.slug}`}
              className="group relative w-[78vw] shrink-0 snap-center sm:w-[52vw] lg:w-[30vw] lg:max-w-[26rem]"
            >
              <div className="overflow-hidden rounded-card bg-sunken">
                <img
                  src={item.image}
                  alt={item.alt}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-[600ms] [transition-timing-function:var(--ease-out)] group-hover:scale-[1.03]"
                />
              </div>
              <span className="mt-4 flex items-center justify-between gap-3">
                <span className="text-[1.0625rem] font-medium text-ink">
                  {item.title}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-muted transition-colors duration-200 group-hover:text-ink">
                  {item.count > 1 ? `${item.count} photos` : 'View'}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 [transition-timing-function:var(--ease-out)] group-hover:translate-x-0.5" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
