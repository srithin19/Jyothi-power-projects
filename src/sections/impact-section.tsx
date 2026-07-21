import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { impactStats } from "../data/siteData";
import { Reveal } from "../components/ui/reveal";
import { SectionHeading } from "../components/ui/section-heading";
import { SectionShell } from "../components/ui/section-shell";

export function ImpactSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [animatedValues, setAnimatedValues] = useState<number[]>(
    impactStats.map(() => 0),
  );

  useEffect(() => {
    if (!inView) {
      return;
    }

    const duration = 2200;
    const start = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);

      setAnimatedValues(
        impactStats.map((stat) => Math.floor(stat.value * eased)),
      );

      if (elapsed < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [inView]);

  return (
    <SectionShell id="impact" ref={ref}>
      <SectionHeading
        eyebrow="Impact"
        title="Measured outcomes across villages, communities and public systems."
        teluguTitle="గ్రామాలు, సమాజం, ప్రజా వ్యవస్థలపై కొలిచే ప్రభావం"
        description="Two decades of execution translated into reliable numbers that demonstrate scale and trust."
      />
      <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {impactStats.map((stat, idx) => (
          <Reveal key={stat.label} delay={idx * 0.025}>
            <div className="rounded-2xl border border-black/10 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.08)] sm:rounded-3xl sm:p-8">
              <p className="text-2xl font-semibold tracking-tight text-black sm:text-4xl lg:text-5xl">
                {(inView ? animatedValues[idx] : 0).toLocaleString("en-IN")}
                {stat.suffix}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-neutral-500 sm:mt-3 sm:text-sm sm:tracking-[0.16em]">
                {stat.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
