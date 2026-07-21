import { services, whoWeServe } from "../data/siteData";
import { Reveal } from "../components/ui/reveal";
import { SectionHeading } from "../components/ui/section-heading";
import { SectionShell } from "../components/ui/section-shell";
import telanganaLogo from "../assets/Telangana logo.png";

export function ServicesSection() {
  return (
    <SectionShell id="services">
      <SectionHeading
        eyebrow="Services"
        title="Government infrastructure execution with precision and scale."
        teluguTitle="ప్రభుత్వ మౌలిక వసతులకు ఖచ్చితమైన అమలు సేవలు"
        description="From lighting to civil and electrical infrastructure, we deliver end-to-end execution with strict quality controls and compliance."
        rightElement={
          <img
            src={telanganaLogo}
            alt="Telangana Government logo"
            loading="lazy"
            decoding="async"
            className="h-24 w-auto sm:h-28 lg:h-32"
          />
        }
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Reveal key={service} delay={index * 0.015}>
            <article className="group rounded-3xl border border-black/10 bg-white p-6 shadow-[0_10px_24px_rgba(0,0,0,0.05)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(0,0,0,0.1)]">
              <p className="text-lg font-medium tracking-tight text-[#1D1D1F]">
                {service}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.08}>
        <div className="mt-10 rounded-3xl border border-black/10 bg-[#111111] px-6 py-7 text-white sm:px-8">
          <p className="text-sm uppercase tracking-[0.18em] text-white/60">
            Who We Serve
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {whoWeServe.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/85 transition hover:scale-[1.02]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
