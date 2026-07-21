import { Helmet } from "react-helmet-async";
import { lazy, Suspense } from "react";
import { Footer } from "./components/layout/footer";
import { Navbar } from "./components/layout/navbar";
import { layoutClasses } from "./constants/layout";
import { seoConfig } from "./constants/seo";
import { AboutSection } from "./sections/about-section";
import { HeroSection } from "./sections/hero-section";
import { ServicesSection } from "./sections/services-section";

const ProjectsSection = lazy(() =>
  import("./sections/projects-section").then((mod) => ({
    default: mod.ProjectsSection,
  })),
);
const ImpactSection = lazy(() =>
  import("./sections/impact-section").then((mod) => ({
    default: mod.ImpactSection,
  })),
);
const CeoSection = lazy(() =>
  import("./sections/ceo-section").then((mod) => ({
    default: mod.CeoSection,
  })),
);
const BusinessSections = lazy(() =>
  import("./sections/business-sections").then((mod) => ({
    default: mod.BusinessSections,
  })),
);
const TestimonialsContactSection = lazy(() =>
  import("./sections/testimonials-contact-section").then((mod) => ({
    default: mod.TestimonialsContactSection,
  })),
);

function SectionFallback() {
  return (
    <div className={layoutClasses.sectionFallback}>
      <div className="h-60 animate-pulse rounded-3xl border border-black/10 bg-white/60" />
    </div>
  );
}

function App() {
  return (
    <>
      <Helmet>
        <title>{seoConfig.title}</title>
        <meta name="description" content={seoConfig.description} />
        <meta name="keywords" content={seoConfig.keywords.join(", ")} />
        <meta property="og:title" content={seoConfig.title} />
        <meta property="og:description" content={seoConfig.description} />
        <meta property="og:image" content={seoConfig.image} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seoConfig.url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoConfig.title} />
        <meta name="twitter:description" content={seoConfig.description} />
        <meta name="twitter:image" content={seoConfig.image} />
        <link rel="canonical" href={seoConfig.url} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Jyothi Power Projects",
            email: "jyothipowerprojectshyd@gmail.com",
            telephone: ["+91 9704340570", "+91 9849431796"],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Vanasthalipuram",
              addressRegion: "Telangana",
              addressCountry: "IN",
            },
          })}
        </script>
      </Helmet>

      <main className="page-gradient relative overflow-hidden">
        <div className="ambient-bg" aria-hidden>
          <div className="ambient-blob ambient-blob-one" />
          <div className="ambient-blob ambient-blob-two" />
          <div className="ambient-blob ambient-blob-three" />
        </div>
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <Suspense fallback={<SectionFallback />}>
          <ProjectsSection />
          <ImpactSection />
          <CeoSection />
          <BusinessSections />
          <TestimonialsContactSection />
        </Suspense>
        <Footer />
      </main>
    </>
  );
}

export default App;
