import { useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { categoryBySlug, galleryCategories } from '../data/galleries'
import { company, districtPresence, TELANGANA_DISTRICT_COUNT } from '../data/siteData'
import { seoConfig } from '../constants/seo'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Section } from '../components/ui/section'
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap'
import { useReveal } from '../hooks/use-reveal'

export function CategoryPage() {
  const { slug } = useParams()
  const category = categoryBySlug(slug)

  const headerRef = useRef<HTMLElement>(null)
  const bodyScope = useReveal<HTMLDivElement>()

  useGSAP(
    () => {
      if (prefersReducedMotion() || !category) return

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.05 })

      // Title rises out of its own mask, the rest follows.
      tl.from('[data-title-line]', { yPercent: 115, duration: 0.9 })
        .from('[data-header-item]', {
          opacity: 0,
          y: 16,
          duration: 0.6,
          stagger: 0.08,
        }, '-=0.5')
    },
    { scope: headerRef, dependencies: [slug], revertOnUpdate: true },
  )

  if (!category) {
    return (
      <main id="main">
        <Section className="pt-40 text-center">
          <h1 className="text-h2 font-semibold tracking-[-0.03em] text-ink">
            That work page does not exist.
          </h1>
          <div className="mt-8 flex justify-center">
            <Button asChild>
              <Link to="/">Back to home</Link>
            </Button>
          </div>
        </Section>
      </main>
    )
  }

  const others = galleryCategories.filter((c) => c.slug !== category.slug)
  const hasRealPhotos = category.images.length > 1

  return (
    <main id="main">
      <Helmet>
        <title>{`${category.title} | ${company.name}`}</title>
        <meta name="description" content={category.intro} />
        <link rel="canonical" href={`${seoConfig.url}/work/${category.slug}`} />
      </Helmet>

      <Section ref={headerRef} className="pt-32 pb-0 sm:pt-36 sm:pb-0 md:pt-40 md:pb-0">
        <Link
          data-header-item
          to="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          All work
        </Link>

        <h1 className="mt-6 text-display leading-[1.02] font-semibold tracking-[-0.035em] text-ink">
          <span className="block overflow-hidden pb-[0.08em]">
            <span data-title-line className="block">
              {category.title}
            </span>
          </span>
        </h1>

        <p
          data-header-item
          className="font-telugu mt-4 text-lg text-ink-soft sm:text-xl"
        >
          {category.telugu}
        </p>

        <p
          data-header-item
          className="mt-6 max-w-[58ch] text-lead leading-[1.6] text-muted"
        >
          {category.intro}
        </p>

        <p data-header-item className="mt-8 text-sm text-muted">
          {hasRealPhotos
            ? `${category.images.length} photographs from delivered projects`
            : 'Photographs from delivered projects'}
        </p>
      </Section>

      <div ref={bodyScope}>
        {/*
          Every tile is the same 4:5 frame with object-cover, so a mix of square,
          portrait and landscape source photos still reads as one consistent set
          without cropping the originals on disk.
        */}
        <Section className="pt-10 pb-0 sm:pt-12 sm:pb-0 md:pt-14 md:pb-0">
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {category.images.map((image, i) => (
              <li key={image} data-reveal>
                <figure className="group overflow-hidden rounded-card bg-sunken">
                  <img
                    src={image}
                    alt={`${category.subject}, photo ${i + 1} of ${category.images.length}`}
                    loading={i < 4 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[600ms] [transition-timing-function:var(--ease-out)] group-hover:scale-[1.04]"
                  />
                </figure>
              </li>
            ))}
          </ul>
        </Section>

        <Section className="pt-6 pb-0 sm:pt-8 sm:pb-0 md:pt-10 md:pb-0">
          <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
            {category.highlights.map((item) => (
              <Card key={item.label} data-reveal padding="lg">
                <h2 className="font-medium text-ink">{item.label}</h2>
                <p className="mt-3 leading-[1.7] text-muted">{item.body}</p>
              </Card>
            ))}
          </div>

          <Card data-reveal padding="lg" className="mt-4 bg-night sm:mt-5">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-3xl font-semibold tracking-[-0.02em] text-paper tabular-nums">
                  {districtPresence.length}
                  <span className="text-accent">/{TELANGANA_DISTRICT_COUNT}</span>
                </p>
                <p className="mt-2 max-w-[42ch] text-sm text-paper/70">
                  districts across Telangana where we have delivered public
                  infrastructure
                </p>
              </div>
              <Button asChild variant="onDark" className="shrink-0">
                <Link to="/#contact">Start a project</Link>
              </Button>
            </div>
          </Card>
        </Section>

        <Section className="pt-6 sm:pt-8 md:pt-10">
          <h2 data-reveal className="text-h3 font-semibold tracking-[-0.025em] text-ink">
            Other work
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
            {others.map((other) => (
              <li key={other.slug} data-reveal>
                <Link
                  to={`/work/${other.slug}`}
                  className="group block overflow-hidden rounded-card bg-surface shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-300 [transition-timing-function:var(--ease-out)] hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
                >
                  {/* Cover art here too, so every entry point to a category
                      looks the same wherever it appears on the site. */}
                  <img
                    src={other.cover}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/10] w-full object-cover"
                  />
                  <span className="flex items-center justify-between gap-3 px-5 py-4 text-[0.9375rem] font-medium text-ink">
                    {other.title}
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted transition-transform duration-200 [transition-timing-function:var(--ease-out)] group-hover:translate-x-0.5 group-hover:text-ink" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </main>
  )
}
