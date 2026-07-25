import { Quote } from 'lucide-react'
import { testimonials } from '../data/siteData'
import { Card } from '../components/ui/card'
import { Section, SectionIntro } from '../components/ui/section'
import { useReveal } from '../hooks/use-reveal'

export function TestimonialsSection() {
  const scope = useReveal<HTMLElement>()

  return (
    <Section ref={scope}>
      <SectionIntro title="Confidence built through delivery." />

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {testimonials.map((item) => (
          <Card
            as="figure"
            key={item.name}
            data-reveal
            padding="lg"
            className="flex flex-col"
          >
            <Quote className="h-5 w-5 shrink-0 text-accent" aria-hidden />
            <blockquote className="mt-5 text-[1.0625rem] leading-[1.6] text-balance text-ink-soft">
              {item.quote}
            </blockquote>
            {/*
              Pushed to the bottom so the three attributions line up even though
              the quotes differ in length.
            */}
            <figcaption className="mt-6 text-sm text-muted lg:mt-auto lg:pt-6">
              {item.name}
            </figcaption>
          </Card>
        ))}
      </div>
    </Section>
  )
}
