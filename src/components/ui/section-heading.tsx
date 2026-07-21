import { motion } from "framer-motion";
import { type ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  teluguTitle?: string;
  description?: string;
  rightElement?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  teluguTitle,
  description,
  rightElement,
}: SectionHeadingProps) {
  return (
    <div className={rightElement ? "space-y-4" : "max-w-3xl space-y-4"}>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        className="text-xs uppercase tracking-[0.2em] text-neutral-500"
      >
        {eyebrow}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        className="flex items-start justify-between gap-3 sm:gap-4"
      >
        <h2 className="max-w-3xl flex-1 text-xl leading-snug tracking-tight text-[#1D1D1F] sm:text-4xl sm:leading-tight lg:text-5xl">
          {title}
        </h2>
        {rightElement && <div className="shrink-0">{rightElement}</div>}
      </motion.div>
      {teluguTitle && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.03 }}
          className="telugu-title text-lg text-black sm:text-xl md:text-2xl"
        >
          {teluguTitle}
        </motion.p>
      )}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.05 }}
          className="text-sm text-neutral-600 sm:text-base md:text-lg"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
