import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { company, impactStats } from '../data/siteData'
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap'
import heroPhoto from '../assets/project-street-lights.webp'

/*
  The hero holds the company name, three supporting numbers and two actions.

  It opens light, like the rest of the site: the lit-road photograph is still
  here because it is the company's own work, but it dissolves into the paper
  page through a canvas-coloured veil instead of opening the site as a dark
  screen. The headline is the company name itself - for a firm bidding on
  public tenders, the name is the brand.

  The phone layout differs in where the copy sits, not in how it looks. It is
  anchored to the bottom of the viewport rather than centred, which leaves the
  top band of the screen to the photograph - nearly every visitor here is on a
  phone, and that band is the only room the veil has to show the work.
*/

const HEADLINE = ['Jyothi Power', 'Projects']

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
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden px-5 pt-28 pb-14 sm:px-8 sm:pt-32 md:items-center md:pb-16"
    >
      {/*
        Decorative: the headline already names the company and the lead says
        what it does, so this carries no alt text.
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
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[58%_45%] md:object-[52%_62%]"
      />
      <div className="hero-veil absolute inset-0 -z-10" aria-hidden />

      <div data-hero-inner className="mx-auto w-full max-w-6xl">
        <h1 className="text-[clamp(2.6rem,12vw,3.4rem)] leading-[0.98] font-semibold tracking-[-0.035em] text-ink md:text-display">
          {HEADLINE.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <span data-hero-line className="block">
                {line}
                {/* The one amber mark in the headline: the accent claims the
                    name without turning the wordmark into coloured text. */}
                {i === HEADLINE.length - 1 && (
                  <span className="text-accent-strong">.</span>
                )}
              </span>
            </span>
          ))}
        </h1>

        <p
          data-hero-telugu
          className="font-telugu mt-5 max-w-2xl text-[1.0625rem] leading-snug text-ink-soft sm:text-xl md:mt-9 md:text-2xl"
        >
          {company.teluguTagline}
        </p>

        {/*
          Two leads rather than one with hidden spans: on a phone this copy
          competes with the stats for the last band of the screen, so it is cut
          to the single claim that matters and the full sentence stays for the
          wider layout that has room for it.
        */}
        <p
          data-hero-lead
          className="mt-4 max-w-[42ch] text-[0.9375rem] leading-[1.55] text-ink-soft md:hidden"
        >
          Fifteen years of government infrastructure execution across
          Telangana.
        </p>
        <p
          data-hero-lead
          className="mt-6 hidden max-w-[48ch] text-lead leading-[1.6] text-ink-soft md:block"
        >
          Engineering rural progress: fifteen years of government
          infrastructure execution across Telangana, delivered to public
          standards and handed over on commitment.
        </p>

        <div className="mt-7 flex flex-row items-center gap-3 md:mt-9">
          <a
            data-hero-action
            href="#contact"
            className="group inline-flex h-13 grow items-center justify-center gap-2 rounded-full bg-ink px-5 text-[0.9375rem] font-medium whitespace-nowrap text-paper transition-[transform,background-color] duration-200 [transition-timing-function:var(--ease-out)] hover:bg-night-soft active:scale-[0.97] sm:grow-0 sm:px-7"
          >
            Start a project
            <ArrowRight className="h-4 w-4 transition-transform duration-200 [transition-timing-function:var(--ease-out)] group-hover:translate-x-0.5" />
          </a>
          <a
            data-hero-action
            href="#projects"
            className="inline-flex h-13 grow items-center justify-center rounded-full border border-line-strong bg-paper/60 px-5 text-[0.9375rem] font-medium whitespace-nowrap text-ink backdrop-blur-sm transition-[transform,border-color,background-color] duration-200 [transition-timing-function:var(--ease-out)] hover:border-ink hover:bg-paper active:scale-[0.97] sm:grow-0 sm:px-7"
          >
            See our work
          </a>
        </div>

        <dl className="mt-8 grid max-w-2xl grid-cols-3 gap-4 border-t border-line-strong/60 pt-6 sm:gap-10 md:mt-12 md:pt-8">
          {headlineStats.map((stat) => (
            <div data-hero-stat key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
                  {stat.value.toLocaleString('en-IN')}
                  <span className="text-accent-strong">{stat.suffix}</span>
                </span>
                <span className="mt-1 block text-[0.75rem] leading-snug text-muted sm:text-[0.8125rem]">
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
