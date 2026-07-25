import { useRef } from 'react'
import { impactStats } from '../data/siteData'
import { Card } from '../components/ui/card'
import { Section, SectionIntro } from '../components/ui/section'
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap'
import { useReveal } from '../hooks/use-reveal'

/*
  Counters run off a GSAP tween of a plain object rather than React state, so
  the numbers update by writing textContent directly. Sixty state commits a
  second across six stats is a lot of reconciliation for an effect nobody can
  interact with.
*/
export function ImpactSection() {
  const scope = useReveal<HTMLElement>()
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([])

  useGSAP(
    () => {
      const format = (n: number) => Math.floor(n).toLocaleString('en-IN')

      impactStats.forEach((stat, i) => {
        const el = numbersRef.current[i]
        if (!el) return

        if (prefersReducedMotion()) {
          el.textContent = format(stat.value)
          return
        }

        const counter = { value: 0 }
        gsap.to(counter, {
          value: stat.value,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = format(counter.value)
          },
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
    },
    { scope },
  )

  return (
    <Section ref={scope} id="impact">
      <SectionIntro
        title="Measured outcomes across villages and public systems."
        telugu="గ్రామాలు, సమాజం, ప్రజా వ్యవస్థలపై కొలిచే ప్రభావం"
        lead="Fifteen years of execution, expressed in the numbers a department can verify."
      />

      {/*
        One column, one row per figure, held inside a single card. Numbers are
        right-aligned and tabular so every digit and suffix stacks on one
        vertical edge.

        The dividers are the page's one remaining rule set: this is a table of
        figures, which is the case where a line between rows is doing real work
        rather than decorating.
      */}
      <Card padding="none" className="mt-12 max-w-4xl px-6 sm:px-9">
        <dl>
          {impactStats.map((stat, i) => (
            <div
              key={stat.label}
              data-reveal
              className="flex items-baseline justify-between gap-6 py-5 not-last:border-b not-last:border-line/70 sm:py-7"
            >
              <dt className="text-[0.9375rem] leading-snug text-muted sm:text-base">
                {stat.label}
              </dt>
              <dd className="shrink-0 text-[clamp(1.75rem,4.5vw,3rem)] leading-none font-semibold tracking-[-0.03em] text-ink tabular-nums">
                <span
                  ref={(el) => {
                    numbersRef.current[i] = el
                  }}
                >
                  0
                </span>
                <span className="text-accent-strong">{stat.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Card>
    </Section>
  )
}
