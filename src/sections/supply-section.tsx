import { brands } from '../data/siteData'
import { Card } from '../components/ui/card'
import { Section, SectionIntro } from '../components/ui/section'
import { useReveal } from '../hooks/use-reveal'

export function SupplySection() {
  const scope = useReveal<HTMLElement>()

  return (
    <Section ref={scope} className="pb-0 sm:pb-0 md:pb-0">
      <SectionIntro
        title="Authorised supply and distribution for premium electrical brands."
        lead="Bulk pricing, fast delivery, original stock and manufacturer warranty support."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        <Card data-reveal padding="lg">
          <h3 className="font-medium text-ink">We supply</h3>
          <p className="mt-4 leading-[1.7] text-muted">
            Project partners, distributors, retailers, builders, government
            project partners, electrical dealers and infrastructure companies.
          </p>
        </Card>
        <Card data-reveal padding="lg">
          <h3 className="font-medium text-ink">Wholesale terms</h3>
          <p className="mt-4 leading-[1.7] text-muted">
            Bulk pricing with fast delivery, original products, full
            manufacturer warranty and competitive rates on repeat volume.
          </p>
        </Card>
      </div>

      {/*
        Full-bleed marquee. The section keeps its horizontal padding for text,
        so the track escapes it with a negative margin rather than the section
        losing its rhythm.
      */}
      <div
        data-reveal
        className="marquee-mask mt-16 -mx-5 overflow-hidden sm:-mx-8"
      >
        {/*
          Set as a wordmark wall rather than a row of bordered pills, so it
          reads like a brand strip instead of yet another set of chips.

          These are third-party trademarks, so their actual logo files are not
          bundled here. Drop authorised SVGs into src/assets and swap the span
          for an <img> to turn this into a real logo wall.

          Spacing is per-item margin rather than flex gap: with gap, half the
          track width lands mid-gap and the loop visibly jumps each cycle.
        */}
        <div className="marquee-track flex w-max items-center">
          {[...brands, ...brands].map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              aria-hidden={i >= brands.length}
              className="mr-10 text-lg font-medium tracking-[-0.01em] whitespace-nowrap text-muted sm:mr-14 sm:text-xl"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </Section>
  )
}
