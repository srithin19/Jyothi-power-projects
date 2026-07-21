import { motion } from "framer-motion";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  teluguTitle?: string;
  description: string;
};

export function SectionHeading({
  eyebrow,
  title,
  teluguTitle,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl space-y-4">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        className="text-xs uppercase tracking-[0.2em] text-neutral-500"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        className="text-3xl leading-tight tracking-tight text-[#1D1D1F] sm:text-4xl lg:text-5xl"
      >
        {title}
      </motion.h2>
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
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ delay: 0.05 }}
        className="text-sm text-neutral-600 sm:text-base md:text-lg"
      >
        {description}
      </motion.p>
    </div>
  );
}
