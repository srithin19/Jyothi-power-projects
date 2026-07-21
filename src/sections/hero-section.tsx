import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex min-h-[64vh] items-center overflow-hidden px-4 pt-20 pb-10 sm:min-h-[72vh] sm:px-8 sm:pt-24 sm:pb-12"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_0%,rgba(247,251,255,0.22)_36%,rgba(240,247,255,0.3)_72%,rgba(255,255,255,0.14)_100%)]" />
      <div className="pointer-events-none absolute -left-16 top-1/3 h-64 w-64 rounded-full bg-[#8BC2FF]/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-8 h-96 w-96 rounded-full bg-[#CFE4FF]/14 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-[10px] tracking-[0.16em] text-neutral-600 uppercase backdrop-blur-xl sm:mb-8 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.2em]"
        >
          <Sparkles size={14} />
          Trusted Government Infrastructure Partner
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.06 }}
          className="max-w-5xl text-3xl leading-[1.08] tracking-[-0.03em] text-[#1D1D1F] sm:text-5xl sm:leading-[1.04] sm:tracking-[-0.04em] md:text-6xl lg:text-[84px]"
        >
          Engineering Rural Progress.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="telugu-title mt-4 text-base text-black sm:mt-5 sm:text-xl md:text-2xl"
        >
          గ్రామాభివృద్ధికి నమ్మకమైన ఇంజనీరింగ్ భాగస్వామ్యం
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.14 }}
          className="mt-6 max-w-3xl text-sm leading-relaxed text-neutral-600 sm:mt-8 sm:text-base md:text-lg"
        >
          Jyothi Power Projects is one of Telangana's trusted infrastructure
          development and electrical engineering companies with 20+ years of
          expertise in government project execution.
        </motion.p>
      </div>
    </section>
  );
}
