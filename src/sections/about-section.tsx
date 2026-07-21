import { CheckCircle2 } from "lucide-react";
import { GlassCard } from "../components/ui/glass-card";
import { Reveal } from "../components/ui/reveal";
import { SectionHeading } from "../components/ui/section-heading";
import { SectionShell } from "../components/ui/section-shell";

const values = [
  "Quality",
  "Integrity",
  "Engineering Excellence",
  "Transparency",
  "Innovation",
  "Customer Satisfaction",
];

export function AboutSection() {
  return (
    <SectionShell id="about">
      <SectionHeading
        eyebrow="About"
        title="Built on trust, delivered with engineering discipline."
        teluguTitle="నమ్మకం మీద నిర్మాణం, నాణ్యతతో అమలు"
        description="Jyothi Power Projects is one of Telangana's trusted infrastructure development and electrical engineering companies with 20+ years of expertise in government project execution."
      />
      <div className="mt-8 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <GlassCard className="space-y-5">
            <p className="text-lg leading-relaxed text-neutral-700">
              We specialize in large-scale public infrastructure projects for
              Government of India and Government of Telangana departments. Every
              completed project strengthens villages, public spaces, and
              long-term rural development.
            </p>
            <p className="text-lg leading-relaxed text-neutral-700">
              Every project we complete creates lasting value for communities
              through reliable execution, premium materials, and transparent
              communication.
            </p>
          </GlassCard>
        </Reveal>
        <Reveal delay={0.04}>
          <GlassCard>
            <p className="mb-5 text-sm uppercase tracking-[0.16em] text-neutral-500">
              Core Values
            </p>
            <div className="space-y-3">
              {values.map((value) => (
                <div
                  key={value}
                  className="flex items-center gap-3 text-neutral-700"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#34C759]" />
                  {value}
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </SectionShell>
  );
}
