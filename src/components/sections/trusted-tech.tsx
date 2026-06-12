"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { trustedTech } from "@/lib/site-config";
import { fadeUp, stagger } from "@/lib/motion";

function TechMark({ name }: { name: string }) {
  const initial = name.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase();
  return (
    <div className="flex size-10 items-center justify-center rounded-md bg-gradient-brand text-brand-foreground font-mono text-xs font-bold">
      {initial}
    </div>
  );
}

export function TrustedTech() {
  return (
    <section
      aria-labelledby="tech-heading"
      className="py-16 sm:py-20 lg:py-24"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="Technologies we ship every day"
          title="The cloud-native stack — implemented end to end"
          description="From orchestration and IaC to CI/CD and observability, we work across the modern platform engineering toolchain."
        />

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
          id="tech-heading"
          aria-label="Technologies we use"
        >
          {trustedTech.map((tech) => (
            <motion.li
              key={tech}
              variants={fadeUp}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 280, damping: 18 }}
              className="glass rounded-xl px-4 py-4 flex items-center gap-3 hover:border-brand/50 transition-colors"
            >
              <TechMark name={tech} />
              <span className="font-medium text-sm text-foreground/90">
                {tech}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
