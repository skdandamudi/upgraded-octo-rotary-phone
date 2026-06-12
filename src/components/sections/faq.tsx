"use client";

import { SectionHeading } from "@/components/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { faqs } from "@/lib/site-config";

export function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-16 sm:py-20 lg:py-28 scroll-mt-20"
    >
      <div className="container-page max-w-3xl">
        <SectionHeading
          id="faq-heading"
          eyebrow="Frequently Asked"
          title="The questions enterprise teams ask first"
          description="Quick answers to what's on your mind. Talk to us if you want the deeper version for your environment."
        />

        <RevealOnScroll className="mt-12">
          <Accordion multiple={false} className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="glass rounded-xl border-0 px-5"
              >
                <AccordionTrigger className="text-left font-heading text-base font-semibold hover:no-underline py-5">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </RevealOnScroll>
      </div>
    </section>
  );
}
