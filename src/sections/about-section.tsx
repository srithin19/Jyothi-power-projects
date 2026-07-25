import { Check } from 'lucide-react'
import { coreValues } from '../data/siteData'
import { Card } from '../components/ui/card'
import { Section, SectionIntro } from '../components/ui/section'
import { useReveal } from '../hooks/use-reveal'

/*
  Split under two headings rather than run as one block of prose. Three stacked
  paragraphs in a single card read as a wall on a phone, and the opening one
  largely repeated the hero, so it went.
*/
const panels = [
  {
    title: 'Who we are',
    body: "One of Telangana's trusted infrastructure and electrical engineering firms, with over fifteen years delivering government projects.",
  },
  {
    title: 'What we deliver',
    body: 'Large-scale public infrastructure for Government of India and Government of Telangana departments, strengthening villages and public spaces.',
  },
]

export function AboutSection() {
  const scope = useReveal<HTMLElement>()

  return (
    <Section ref={scope} id="about">
      <SectionIntro
        title="Built on trust, delivered with engineering discipline."
        telugu="నమ్మకం మీద నిర్మాణం, నాణ్యతతో అమలు"
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5">
        {panels.map((panel) => (
          <Card key={panel.title} data-reveal padding="lg">
            <h3 className="font-medium text-ink">{panel.title}</h3>
            <p className="mt-3 leading-[1.7] text-muted">{panel.body}</p>
          </Card>
        ))}
      </div>

      {/*
        Compact tiles. These are single words, so a tall card with the label
        parked at the bottom was mostly empty box.
      */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-5 sm:gap-4 lg:grid-cols-3">
        {coreValues.map((value) => (
          <Card
            key={value}
            data-reveal
            padding="none"
            className="flex items-center gap-3 px-4 py-3.5"
          >
            <Check
              className="h-4 w-4 shrink-0 text-accent-strong"
              strokeWidth={2.5}
              aria-hidden
            />
            <span className="text-[0.875rem] leading-snug font-medium text-ink sm:text-[0.9375rem]">
              {value}
            </span>
          </Card>
        ))}
      </div>
    </Section>
  )
}
