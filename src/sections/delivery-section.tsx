import { useRef } from 'react'
import { processSteps, timeline } from '../data/siteData'
import { Card } from '../components/ui/card'
import { Section, SectionIntro } from '../components/ui/section'
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap'
import { useReveal } from '../hooks/use-reveal'

/*
  The only numbered content on the page. These six stages are a genuine ordered
  sequence where the order carries information, which is the one case that earns
  numbering. Nothing else here gets an index.
*/
export function DeliverySection() {
  const scope = useReveal<HTMLElement>()
  const railRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const rail = railRef.current
      if (!rail || prefersReducedMotion()) return

      /*
        The axis draws itself as the timeline scrolls past. transform-origin is
        set per breakpoint in the markup so it grows left-to-right on desktop
        and top-to-bottom on mobile.
      */
      gsap.fromTo(
        rail,
        { scaleX: 0, scaleY: 0 },
        {
          scaleX: 1,
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: rail,
            start: 'top 85%',
            end: 'bottom 55%',
            scrub: 0.6,
          },
        },
      )
    },
    { scope },
  )

  return (
    <Section ref={scope} id="delivery">
      <SectionIntro
        title="How a project moves from tender to handover."
        lead="Six stages, each with its own sign-off, so a department always knows what has been completed and what is next."
      />

      {/*
        One card holding a numbered list, rather than six separate tiles. A
        sequence should look like a sequence, and it keeps the page from being
        another grid of identical boxes.
      */}
      <Card padding="lg" className="mt-10">
        <ol className="grid gap-x-10 gap-y-1 sm:grid-cols-2">
          {processSteps.map((step, i) => (
            <li
              key={step}
              data-reveal
              className="flex items-center gap-4 py-2.5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-wash text-[0.8125rem] font-medium tabular-nums text-accent-strong">
                {i + 1}
              </span>
              <span className="text-[0.9375rem] leading-snug text-ink sm:text-base">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </Card>

      {/*
        A real timeline rather than a row of cards: one continuous axis with a
        node per milestone. Vertical rail on mobile, horizontal on desktop.
      */}
      <div className="mt-24">
        <h3
          data-reveal
          className="max-w-xl text-h3 leading-[1.15] font-semibold tracking-[-0.025em] text-ink"
        >
          A growth journey rooted in execution quality.
        </h3>

        <div className="relative mt-12 sm:mt-16">
          {/* Track the axis sits on, and the axis itself. */}
          <span
            aria-hidden
            className="absolute top-0 bottom-0 left-[7px] w-px bg-line sm:top-[7px] sm:right-0 sm:bottom-auto sm:left-0 sm:h-px sm:w-full"
          />
          <span
            ref={railRef}
            aria-hidden
            className="absolute top-0 bottom-0 left-[7px] w-px origin-top bg-accent sm:top-[7px] sm:right-0 sm:bottom-auto sm:left-0 sm:h-px sm:w-full sm:origin-left"
          />

          <ol className="grid gap-9 sm:grid-cols-4 sm:gap-6">
            {timeline.map((item) => (
              <li
                key={item.year}
                data-reveal
                className="relative pl-8 sm:pt-10 sm:pl-0"
              >
                <span
                  aria-hidden
                  className="absolute top-[5px] left-0 h-[15px] w-[15px] rounded-full border-[3px] border-accent bg-surface sm:top-0 sm:left-0"
                />
                <span className="block text-2xl leading-none font-semibold tracking-[-0.02em] text-ink tabular-nums">
                  {item.year}
                </span>
                <span className="mt-2 block text-[0.9375rem] leading-snug text-muted">
                  {item.title}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
