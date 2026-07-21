import { Check, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";
import { brands, qualityPoints, timeline } from "../data/siteData";
import { Reveal } from "../components/ui/reveal";
import { SectionHeading } from "../components/ui/section-heading";
import { SectionShell } from "../components/ui/section-shell";

export function BusinessSections() {
  return (
    <>
      <SectionShell>
        <SectionHeading
          eyebrow="Timeline"
          title="A growth journey rooted in execution quality."
          description="Milestones that define two decades of public infrastructure progress."
        />
        <div className="mt-8 space-y-3 border-l border-black/20 pl-8">
          {timeline.map((item, index) => (
            <Reveal key={item.year} delay={index * 0.03}>
              <div className="relative rounded-2xl border border-black/10 bg-white p-5">
                <span className="absolute -left-[38px] top-6 h-3 w-3 rounded-full bg-[#0A84FF]" />
                <p className="text-sm text-neutral-500">{item.year}</p>
                <p className="text-xl text-black">{item.title}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      <SectionShell>
        <SectionHeading
          eyebrow="Quality Assurance"
          title="Government-grade quality across every layer of delivery."
          description="Materials, methods, and inspections aligned with long-term performance outcomes."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {qualityPoints.map((point, index) => (
            <Reveal key={point} delay={index * 0.02}>
              <div className="rounded-3xl border border-black/10 bg-white p-6 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.08)]">
                <ShieldCheck className="h-5 w-5 text-[#34C759]" />
                <p className="mt-3 text-lg text-[#1D1D1F]">{point}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      <section className="py-16 md:py-20">
        <SectionShell className="py-0">
          <SectionHeading
            eyebrow="Wholesale Supply"
            title="Authorized supply and distribution network for premium electrical brands."
            description="Bulk pricing, fast delivery, original products and manufacturer warranty support."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-black/10 bg-white p-6">
              <p className="text-sm uppercase tracking-[0.15em] text-neutral-500">
                We Supply
              </p>
              <p className="mt-3 text-neutral-700">
                Project Partners, Distributors, Retailers, Builders, Government
                Project Partners, Electrical Dealers and Infrastructure
                Companies.
              </p>
            </div>
            <div className="rounded-3xl border border-black/10 bg-white p-6">
              <p className="text-sm uppercase tracking-[0.15em] text-neutral-500">
                Wholesale Offer
              </p>
              <p className="mt-3 text-neutral-700">
                Bulk pricing, fast delivery, original products, manufacturer
                warranty and competitive prices.
              </p>
            </div>
          </div>
        </SectionShell>
        <div className="mt-8">
          <div className="marquee-track">
            <div className="marquee-content">
              {brands.concat(brands).map((brand, index) => (
                <div
                  key={`${brand}-${index}`}
                  className="mx-2 rounded-full border border-black/15 bg-white px-6 py-3 text-sm text-neutral-700"
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionShell>
        <SectionHeading
          eyebrow="Government Compliance"
          title="Execution that aligns with policy, standards and accountability."
          description="Our teams maintain strict procurement discipline and transparent milestone reporting."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            "Tender documentation and verification",
            "Material traceability and certification",
            "Safety-first site controls",
            "Inspection-ready progress reports",
          ].map((item, index) => (
            <Reveal key={item} delay={index * 0.025}>
              <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(0,0,0,0.08)]">
                <Check className="h-4 w-4 text-[#34C759]" />
                <span className="text-neutral-700">{item}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      <SectionShell>
        <SectionHeading
          eyebrow="Vision & Mission"
          title="Build infrastructure that compounds social value over time."
          description="Reliable engineering that improves daily life, strengthens institutions, and serves future generations."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Reveal>
            <div className="rounded-3xl border border-black/10 bg-white p-8 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.08)]">
              <Sparkles className="h-5 w-5 text-[#0A84FF]" />
              <p className="mt-4 text-2xl tracking-tight text-black">Vision</p>
              <p className="mt-1 text-sm font-semibold text-black">
                స్థిరమైన అభివృద్ధికి విశ్వసనీయ మౌలిక వసతులు
              </p>
              <p className="mt-3 text-neutral-600">
                To be India's most trusted infrastructure execution partner for
                public development programs.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="rounded-3xl border border-black/10 bg-white p-8 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.08)]">
              <Sparkles className="h-5 w-5 text-[#0A84FF]" />
              <p className="mt-4 text-2xl tracking-tight text-black">Mission</p>
              <p className="mt-1 text-sm font-semibold text-black">
                నాణ్యతతో ప్రజలకు నిలకడైన సేవలు అందించడం
              </p>
              <p className="mt-3 text-neutral-600">
                Deliver resilient, safe and high-quality infrastructure with
                transparency and engineering precision.
              </p>
            </div>
          </Reveal>
        </div>
        <div className="mt-8">
          <Button asChild>
            <a
              href="mailto:jyothipowerprojectshyd@gmail.com?subject=Company%20Profile%20Request"
              aria-label="Request company profile PDF by email"
            >
              Download Company Profile
            </a>
          </Button>
        </div>
      </SectionShell>
    </>
  );
}
