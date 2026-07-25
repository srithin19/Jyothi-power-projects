import { useRef } from 'react'
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap'
import { useReveal } from '../hooks/use-reveal'
import highMastNight from '../assets/project-high-mast.webp'

const pillars = [
  {
    heading: 'Vision',
    telugu: 'స్థిరమైన అభివృద్ధికి విశ్వసనీయ మౌలిక వసతులు',
    body: "To be India's most trusted infrastructure execution partner for public development programs.",
  },
  {
    heading: 'Mission',
    telugu: 'నాణ్యతతో ప్రజలకు నిలకడైన సేవలు అందించడం',
    body: 'Deliver resilient, safe and high quality infrastructure with transparency and engineering precision.',
  },
]

/*
  The one full-bleed photographic band on the page. It sits here because the
  vision copy is the only place where the work itself, lit public space at
  night, is the argument being made.

  The image is decorative: alt is empty and it is hidden from assistive tech,
  because everything it conveys is already in the copy on top of it.
*/
export function VisionSection() {
  const scope = useReveal<HTMLElement>()
  const imageRef = useRef<HTMLImageElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || !imageRef.current) return

      // Slow counter-scroll. The image is oversized so the drift never
      // exposes an edge.
      gsap.fromTo(
        imageRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: scope.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.9,
          },
        },
      )
    },
    { scope },
  )

  return (
    <section ref={scope} className="relative isolate overflow-hidden">
      {/*
        130% tall and pulled up 15%, so the image is centred with 15% of slack
        at each end. The parallax drifts it by 8% of its own height (~10% of the
        section), which stays inside that slack at both extremes. Anchored at
        top: 0 instead, the downward end of the drift tears a gap along the top.
      */}
      <img
        ref={imageRef}
        src={highMastNight}
        alt=""
        aria-hidden
        width={900}
        height={1200}
        loading="lazy"
        decoding="async"
        className="absolute -top-[15%] left-0 -z-10 h-[130%] w-full object-cover object-[50%_55%]"
      />
      <div className="photo-scrim absolute inset-0 -z-10" aria-hidden />

      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24 md:py-32">
        <h2
          data-reveal
          className="max-w-3xl text-h2 leading-[1.08] font-semibold tracking-[-0.03em] text-paper"
        >
          Build infrastructure that compounds social value over time.
        </h2>

        <div className="mt-14 grid gap-12 sm:grid-cols-2 sm:gap-16">
          {pillars.map((pillar) => (
            <div key={pillar.heading} data-reveal>
              <h3 className="text-sm font-medium text-paper/70">
                {pillar.heading}
              </h3>
              <p className="font-telugu mt-4 text-lg leading-relaxed text-paper">
                {pillar.telugu}
              </p>
              <p className="mt-4 max-w-[46ch] leading-[1.7] text-paper/85">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
