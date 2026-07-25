import { forwardRef, type ReactNode } from 'react'
import { cn } from '../../utils/cn'

/*
  There is deliberately no eyebrow prop.

  A small tracked all-caps kicker above every heading is the most saturated
  landing-page scaffold there is, and the old build had one on fourteen
  sections. Hierarchy here comes from scale, weight and whitespace instead, so
  section starts read as a change of subject rather than a repeated template.
*/

type SectionProps = {
  id?: string
  className?: string
  children: ReactNode
  /** Hairline above the section, for a genuine change of page zone. */
  divided?: boolean
}

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { id, className, children, divided = false },
  ref,
) {
  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        'mx-auto w-full max-w-6xl px-5 sm:px-8',
        'py-16 sm:py-20 md:py-28',
        divided && 'border-t border-line',
        className,
      )}
    >
      {children}
    </section>
  )
})

type SectionIntroProps = {
  title: ReactNode
  telugu?: string
  lead?: string
  aside?: ReactNode
  className?: string
}

export function SectionIntro({
  title,
  telugu,
  lead,
  aside,
  className,
}: SectionIntroProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between',
        className,
      )}
    >
      <div className="max-w-2xl">
        <h2
          data-reveal
          className="text-h2 leading-[1.08] font-semibold tracking-[-0.03em] text-ink"
        >
          {title}
        </h2>
        {telugu && (
          <p
            data-reveal
            className="font-telugu mt-3 text-lg text-ink-soft sm:text-xl"
          >
            {telugu}
          </p>
        )}
        {lead && (
          <p
            data-reveal
            className="mt-5 max-w-[58ch] text-lead leading-[1.6] text-muted"
          >
            {lead}
          </p>
        )}
      </div>
      {aside && (
        <div data-reveal className="shrink-0">
          {aside}
        </div>
      )}
    </div>
  )
}
