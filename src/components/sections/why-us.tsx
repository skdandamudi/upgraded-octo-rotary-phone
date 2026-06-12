"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { whyUs } from "@/lib/site-config";
import { fadeUp, stagger } from "@/lib/motion";

export function WhyUs() {
  return (
    <section
      id="why"
      aria-labelledby="why-heading"
      className="py-16 sm:py-20 lg:py-28 scroll-mt-20"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="Why K8S Systems"
          title="A partner you'd hand a production cluster to"
          description="What sets us apart from generalist consulting firms — and what enterprise teams tell us matters most."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          id="why-heading"
        >
          {whyUs.map((w) => {
            const Icon = w.icon;
            return (
              <motion.article
                key={w.title}
                variants={fadeUp}
                className="rounded-2xl p-7 border border-border/60 bg-card/40 hover:bg-card/70 hover:border-brand/40 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex size-10 items-center justify-center rounded-lg glass">
                    <Icon
                      className="size-5 text-cyan"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-heading text-lg font-semibold">
                    {w.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {w.body}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
