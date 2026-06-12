"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { caseStudies } from "@/lib/site-config";
import { fadeUp, stagger } from "@/lib/motion";

export function CaseStudies() {
  return (
    <section
      id="case-studies"
      aria-labelledby="case-studies-heading"
      className="py-16 sm:py-20 lg:py-28 scroll-mt-20"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="Case Studies"
          title="Outcomes our customers can defend in a board meeting"
          description="Three representative engagements across SaaS, financial services, and healthcare — anonymized at the customer's request."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="mt-14 grid gap-6 lg:grid-cols-3"
          id="case-studies-heading"
        >
          {caseStudies.map((c) => (
            <motion.article
              key={c.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              className="glass rounded-2xl p-7 flex flex-col gap-5 hover:border-brand/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className="text-cyan border-cyan/30 bg-cyan/5"
                >
                  {c.industry}
                </Badge>
                <ArrowUpRight
                  className="size-5 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-heading text-xl font-semibold">{c.title}</h3>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                  Challenge
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {c.challenge}
                </p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                  Results
                </p>
                <ul className="space-y-2">
                  {c.results.map((r) => (
                    <li
                      key={r}
                      className="flex items-center gap-2 text-sm font-medium text-foreground"
                    >
                      <TrendingUp
                        className="size-4 text-cyan shrink-0"
                        aria-hidden="true"
                      />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto pt-3 border-t border-border/60">
                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                  Technology
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {c.technology.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="font-mono text-[10px]"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
