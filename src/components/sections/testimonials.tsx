"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { testimonials } from "@/lib/site-config";
import { fadeUp, stagger } from "@/lib/motion";

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <div className="flex size-11 items-center justify-center rounded-full bg-gradient-brand text-brand-foreground font-heading font-semibold text-sm">
      {initials}
    </div>
  );
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="py-16 sm:py-20 lg:py-28 scroll-mt-20"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="Testimonials"
          title="What enterprise teams say after the engagement"
          description="Quotes drawn from end-of-engagement reviews with the engineering leaders we worked alongside."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="mt-14 grid gap-6 md:grid-cols-3"
          id="testimonials-heading"
        >
          {testimonials.map((t) => (
            <motion.figure
              key={t.name}
              variants={fadeUp}
              className="glass rounded-2xl p-7 flex flex-col"
            >
              <Quote
                className="size-6 text-cyan/50 mb-4"
                aria-hidden="true"
              />
              <blockquote className="text-foreground/90 leading-relaxed">
                <p>“{t.quote}”</p>
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-border/60 flex items-center gap-3">
                <Avatar name={t.name} />
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.role} · {t.company}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
