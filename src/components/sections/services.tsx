"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/lib/site-config";
import { fadeUp, stagger } from "@/lib/motion";

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-16 sm:py-20 lg:py-28 scroll-mt-20"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="Services"
          title="Cloud-native engineering, delivered with rigor"
          description="Six focused practice areas — staffed by engineers who've operated platforms at every scale, from early-stage to Fortune 500."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          id="services-heading"
        >
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 240, damping: 20 }}
                className="glass rounded-2xl p-7 group hover:border-brand/40 transition-colors relative overflow-hidden"
              >
                <div
                  className="absolute -top-12 -right-12 size-40 rounded-full bg-gradient-brand opacity-0 group-hover:opacity-20 blur-3xl transition-opacity"
                  aria-hidden="true"
                />
                <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-brand text-brand-foreground mb-5">
                  <Icon className="size-6" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-4">
                  {s.title}
                </h3>
                <ul className="space-y-2.5">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check
                        className="size-4 text-cyan shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
