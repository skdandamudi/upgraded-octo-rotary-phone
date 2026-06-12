"use client";

import { motion, useInView } from "framer-motion";
import * as React from "react";
import { SectionHeading } from "@/components/section-heading";
import { processSteps } from "@/lib/site-config";

export function Process() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="py-16 sm:py-20 lg:py-28 scroll-mt-20"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="Delivery Process"
          title="A four-phase engagement built for predictable outcomes"
          description="No mystery, no scope creep — every engagement maps to clearly defined phases with milestones you can communicate upstream."
        />

        <div ref={ref} className="mt-16 relative">
          {/* Connecting line */}
          <div
            className="hidden lg:block absolute top-8 left-0 right-0 h-px overflow-hidden"
            aria-hidden="true"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-brand via-cyan to-brand origin-left"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
          </div>

          <ol
            id="process-heading"
            className="grid gap-10 lg:grid-cols-4 lg:gap-6"
          >
            {processSteps.map((step, i) => (
              <motion.li
                key={step.n}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                className="relative"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="size-16 rounded-full bg-gradient-brand glow-brand flex items-center justify-center font-heading text-xl font-bold text-brand-foreground">
                      {step.n}
                    </div>
                  </div>
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
