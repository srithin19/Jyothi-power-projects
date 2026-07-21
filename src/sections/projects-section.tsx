import { motion } from "framer-motion";
import { projectGallery } from "../data/siteData";
import { Reveal } from "../components/ui/reveal";
import { SectionHeading } from "../components/ui/section-heading";
import { SectionShell } from "../components/ui/section-shell";

export function ProjectsSection() {
  return (
    <SectionShell id="projects">
      <SectionHeading
        eyebrow="Project Gallery"
        title="Execution quality you can see at first glance."
        teluguTitle="మా ప్రాజెక్టుల నాణ్యత, మొదటి చూపులోనే స్పష్టంగా"
      />
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {projectGallery.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.02}>
            <article className="group relative min-w-0 overflow-hidden rounded-3xl border border-black/10">
              <motion.img
                src={item.image}
                alt={item.title}
                loading="lazy"
                decoding="async"
                initial={{ scale: 1.03 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                style={{
                  objectPosition: item.objectPosition ?? "center center",
                }}
                className="h-[230px] w-full object-cover transition duration-300 group-hover:scale-[1.02] sm:h-[320px] md:h-[340px] lg:h-[380px] xl:h-[420px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-4 text-lg font-medium tracking-tight text-white sm:bottom-5 sm:left-5 sm:text-2xl">
                {item.title}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
