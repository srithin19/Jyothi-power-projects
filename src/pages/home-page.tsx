import { Helmet } from 'react-helmet-async'
import { lazy, Suspense, useEffect } from 'react'
import { company } from '../data/siteData'
import { seoConfig } from '../constants/seo'
import { ScrollTrigger } from '../lib/gsap'
import { HeroSection } from '../sections/hero-section'
import { AboutSection } from '../sections/about-section'
import { ServicesSection } from '../sections/services-section'

/*
  Everything below the second screen is split out. The hero, about and services
  cover what a first-time visitor reads before the bundle for the rest arrives.
*/
const ProjectsSection = lazy(() =>
  import('../sections/projects-section').then((m) => ({ default: m.ProjectsSection })),
)
const PresenceSection = lazy(() =>
  import('../sections/presence-section').then((m) => ({ default: m.PresenceSection })),
)
const ImpactSection = lazy(() =>
  import('../sections/impact-section').then((m) => ({ default: m.ImpactSection })),
)
const CeoSection = lazy(() =>
  import('../sections/ceo-section').then((m) => ({ default: m.CeoSection })),
)
const DeliverySection = lazy(() =>
  import('../sections/delivery-section').then((m) => ({ default: m.DeliverySection })),
)
const StandardsSection = lazy(() =>
  import('../sections/standards-section').then((m) => ({ default: m.StandardsSection })),
)
const SupplySection = lazy(() =>
  import('../sections/supply-section').then((m) => ({ default: m.SupplySection })),
)
const VisionSection = lazy(() =>
  import('../sections/vision-section').then((m) => ({ default: m.VisionSection })),
)
const TestimonialsSection = lazy(() =>
  import('../sections/testimonials-section').then((m) => ({
    default: m.TestimonialsSection,
  })),
)
const ContactSection = lazy(() =>
  import('../sections/contact-section').then((m) => ({ default: m.ContactSection })),
)

/*
  Reserves roughly a section's height so lazy chunks landing mid-scroll do not
  jerk the page, and refreshes ScrollTrigger once the real section replaces it.
*/
function SectionFallback() {
  useEffect(() => () => void ScrollTrigger.refresh(), [])
  return <div className="min-h-[60vh]" aria-hidden />
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: company.name,
  url: seoConfig.url,
  email: company.email,
  telephone: company.phones,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Vanasthalipuram',
    addressLocality: 'Hyderabad',
    addressRegion: 'Telangana',
    addressCountry: 'IN',
  },
}

export function HomePage() {
  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>{seoConfig.title}</title>
        <meta name="description" content={seoConfig.description} />
        <meta name="keywords" content={seoConfig.keywords.join(', ')} />
        <meta name="theme-color" content="#f7f8fa" />
        <meta property="og:title" content={seoConfig.title} />
        <meta property="og:description" content={seoConfig.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seoConfig.url} />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoConfig.title} />
        <meta name="twitter:description" content={seoConfig.description} />
        <link rel="canonical" href={seoConfig.url} />
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>



      <main id="main">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <Suspense fallback={<SectionFallback />}>
          <ProjectsSection />
          <PresenceSection />
          <ImpactSection />
          <CeoSection />
          <DeliverySection />
          <StandardsSection />
          <SupplySection />
          <VisionSection />
          <TestimonialsSection />
          <ContactSection />
        </Suspense>
      </main>
    </>
  )
}
