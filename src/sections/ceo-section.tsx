import { useRef } from 'react'
import { Section } from '../components/ui/section'
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap'
import { useReveal } from '../hooks/use-reveal'
import portrait from '../assets/portrait-srinivas.webp'

const QUOTE =
  'For over fifteen years, our mission has been to build reliable infrastructure that improves everyday life. Every project reflects our commitment to quality, transparency and long term value for society.'

/*
  The quote brightens word by word, scrubbed to scroll position, so reading
  pace and scroll pace are the same thing. This is the one scroll-linked text
  effect on the page; it lives here because the quote is the page's single
  first-person statement and deserves the emphasis.

  The words are split into spans for the animation, so assistive tech gets the
  unbroken sentence from an sr-only copy and the spans are hidden from it.
*/
export function CeoSection() {
  const scope = useReveal<HTMLElement>()
  const quoteRef = useRef<HTMLQuoteElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || !quoteRef.current) return

      gsap.fromTo(
        gsap.utils.toArray<HTMLElement>('[data-quote-word]', quoteRef.current),
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.6,
          duration: 1.4,
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 82%',
            end: 'bottom 52%',
            scrub: 0.5,
          },
        },
      )
    },
    { scope },
  )

  return (
    <Section ref={scope}>
      <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div data-reveal className="overflow-hidden rounded-card bg-sunken">
          <img
            src={portrait}
            alt="Srinivas Chillamcharla, Chief Executive and Managing Director"
            width={1000}
            height={1337}
            loading="lazy"
            decoding="async"
            className="aspect-[3/4] w-full object-cover"
          />
        </div>

        <figure>
          {/*
            No data-reveal here: the word scrub is this element's entrance.
            Layering the batched fade on top would double-animate the opacity.
          */}
          <blockquote
            ref={quoteRef}
            className="text-[clamp(1.375rem,2.6vw,2rem)] leading-[1.35] font-medium tracking-[-0.02em] text-balance text-ink"
          >
            <span className="sr-only">{QUOTE}</span>
            <span aria-hidden>
              {QUOTE.split(' ').map((word, i) => (
                <span key={`${word}-${i}`} data-quote-word>
                  {word}{' '}
                </span>
              ))}
            </span>
          </blockquote>
          <figcaption data-reveal className="mt-8 border-t border-line pt-6">
            <span className="block font-medium text-ink">
              Srinivas Chillamcharla
            </span>
            <span className="mt-0.5 block text-sm text-muted">
              Chief Executive and Managing Director
            </span>
          </figcaption>
        </figure>
      </div>
    </Section>
  )
}
