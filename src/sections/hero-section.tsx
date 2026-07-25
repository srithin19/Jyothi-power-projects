import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { company, impactStats } from '../data/siteData'
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap'
import heroPhoto from '../assets/project-street-lights.webp'

/*
  The hero holds one idea, three supporting numbers and two actions, and it
  fits a phone viewport without scrolling.

  It is the one dark screen on the site: a lit road at night is the company's
  own work and the clearest possible statement of what they do, and a dark
  opening that gives way to paper reads far better than a photograph faded into
  a light background, which washed out on phones.
*/

const HEADLINE = ['Engineering', 'rural progress.']

// The three that mean most to a department evaluating a contractor.
const headlineStats = impactStats.filter((s) =>
  ['Years in operation', 'Projects delivered', 'Villages developed'].includes(
    s.label,
  ),
)

export function HeroSection() {
  const scope = useRef<HTMLElement>(null)
  const photoRef = useRef<HTMLImageElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.15,
      })

      // Lines rise out of their own overflow-hidden mask.
      tl.from('[data-hero-line]', {
        yPercent: 118,
        duration: 1,
        stagger: 0.09,
      })
        .from(
          '[data-hero-telugu]',
          { opacity: 0, y: 16, duration: 0.7 },
          '-=0.62',
        )
        .from('[data-hero-lead]', { opacity: 0, y: 16, duration: 0.7 }, '-=0.55')
        .from(
          '[data-hero-action]',
          { opacity: 0, y: 14, duration: 0.6, stagger: 0.07 },
          '-=0.5',
        )
        .from(
          '[data-hero-stat]',
          { opacity: 0, y: 14, duration: 0.6, stagger: 0.07 },
          '-=0.45',
        )

      if (photoRef.current) {
        // Slow push-in behind the copy as the page opens.
        tl.from(
          photoRef.current,
          { scale: 1.12, duration: 1.8, ease: 'power2.out' },
          0,
        )

        // Drifts slower than the copy, so the two separate on scroll.
        gsap.to(photoRef.current, {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: scope.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        })
      }

      gsap.to('[data-hero-inner]', {
        y: -50,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: {
          trigger: scope.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      })
    },
    { scope },
  )

  return (
    <section
      ref={scope}
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-5 pt-28 pb-16 sm:px-8 sm:pt-32"
    >
      {/*
        Decorative: the headline already says what the company does, so this
        carries no alt text and is hidden from assistive tech.
      */}
      <img
        ref={photoRef}
        src={heroPhoto}
        alt=""
        aria-hidden
        width={900}
        height={1200}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[52%_62%]"
      />
      <div className="hero-scrim absolute inset-0 -z-10" aria-hidden />

      <div data-hero-inner className="mx-auto w-full max-w-6xl">
        <h1 className="text-display leading-[0.98] font-semibold tracking-[-0.035em] text-paper">
          {HEADLINE.map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <span data-hero-line className="block">
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p
          data-hero-telugu
          className="font-telugu mt-7 max-w-2xl text-lg text-paper/85 sm:mt-9 sm:text-xl md:text-2xl"
        >
          {company.teluguTagline}
        </p>

        <p
          data-hero-lead
          className="mt-6 max-w-[48ch] text-lead leading-[1.6] text-paper/75"
        >
          Fifteen years of government infrastructure execution across Telangana,
          delivered to public standards and handed over on commitment.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            data-hero-action
            href="#contact"
            className="group inline-flex h-13 items-center justify-center gap-2 rounded-full bg-paper px-7 text-[0.9375rem] font-medium text-ink transition-[transform,background-color] duration-200 [transition-timing-function:var(--ease-out)] hover:bg-accent-wash active:scale-[0.97]"
          >
            Start a project
            <ArrowRight className="h-4 w-4 transition-transform duration-200 [transition-timing-function:var(--ease-out)] group-hover:translate-x-0.5" />
          </a>
          <a
            data-hero-action
            href="#projects"
            className="inline-flex h-13 items-center justify-center rounded-full border border-paper/35 px-7 text-[0.9375rem] font-medium text-paper backdrop-blur-sm transition-[transform,border-color,background-color] duration-200 [transition-timing-function:var(--ease-out)] hover:border-paper/70 hover:bg-paper/10 active:scale-[0.97]"
          >
            See our work
          </a>
        </div>

        <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-6 border-t border-paper/20 pt-8 sm:gap-10">
          {headlineStats.map((stat) => (
            <div data-hero-stat key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-2xl font-semibold tracking-[-0.02em] text-paper sm:text-3xl">
                  {stat.value.toLocaleString('en-IN')}
                  {stat.suffix}
                </span>
                <span className="mt-1 block text-[0.8125rem] leading-snug text-paper/65">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
