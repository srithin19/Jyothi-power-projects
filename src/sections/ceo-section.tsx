import { motion } from "framer-motion";
import { GlassCard } from "../components/ui/glass-card";
import { Reveal } from "../components/ui/reveal";
import { SectionShell } from "../components/ui/section-shell";
import srinivasImage from "../assets/srinivas.png";

export function CeoSection() {
  return (
    <SectionShell>
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-black/10">
            <motion.img
              src={srinivasImage}
              alt="CEO portrait"
              loading="lazy"
              decoding="async"
              initial={{ scale: 1.03 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full min-h-[240px] w-full object-cover sm:min-h-[360px] lg:min-h-[480px]"
            />
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <GlassCard className="space-y-5 sm:space-y-6">
            <p className="text-sm uppercase tracking-[0.18em] text-neutral-500">
              CEO Message
            </p>
            <blockquote className="text-lg leading-relaxed tracking-tight text-[#1D1D1F] sm:text-2xl lg:text-3xl">
              "For more than two decades, our mission has been to build reliable
              infrastructure that improves everyday life. Every project reflects
              our commitment to quality, transparency and long term value for
              society."
            </blockquote>
            <div>
              <p className="text-lg font-semibold text-black">
                Mr. Srinivas Chillamcharla
              </p>
              <p className="text-neutral-600">CEO & Managing Director</p>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </SectionShell>
  );
}
