import { Check, ShieldCheck } from 'lucide-react'
import { compliancePoints, qualityPoints } from '../data/siteData'
import { Card } from '../components/ui/card'
import { Section, SectionIntro } from '../components/ui/section'
import { useReveal } from '../hooks/use-reveal'

/*
  Quality and compliance answer the same question, so they sit side by side as
  two grouped panels rather than as two separate rounds of an identical grid.
*/
export function StandardsSection() {
  const scope = useReveal<HTMLElement>()

  return (
    <Section ref={scope}>
      <SectionIntro
        title="Government-grade standards at every layer of delivery."
        lead="Materials, methods and inspections aligned to long-term performance, with procurement discipline and milestone reporting a department can audit."
      />

      {/*
        Plain bullet lists here. These are specification points, which is what
        bullets are for, and it gives the page a text density that the tile
        grids elsewhere do not have.
      */}
      <div className="mt-10 grid gap-4 lg:grid-cols-2 lg:gap-5">
        {[
          {
            icon: ShieldCheck,
            title: 'Materials and workmanship',
            points: qualityPoints,
          },
          {
            icon: Check,
            title: 'Compliance and reporting',
            points: compliancePoints,
          },
        ].map(({ icon: Icon, title, points }) => (
          <Card key={title} padding="lg">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-wash">
                <Icon
                  className="h-[18px] w-[18px] text-accent-strong"
                  strokeWidth={1.75}
                />
              </span>
              <h3 className="font-medium text-ink">{title}</h3>
            </div>
            <ul className="mt-6 space-y-3">
              {points.map((point) => (
                <li
                  key={point}
                  data-reveal
                  className="flex items-baseline gap-3 text-[0.9375rem] leading-relaxed text-ink-soft"
                >
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 shrink-0 translate-y-[-2px] rounded-full bg-accent"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  )
}
