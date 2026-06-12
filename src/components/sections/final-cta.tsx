"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="py-16 sm:py-20 lg:py-24"
    >
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative overflow-hidden rounded-3xl bg-gradient-brand p-10 sm:p-16 text-center"
        >
          <div
            className="absolute inset-0 bg-grid opacity-25"
            aria-hidden="true"
          />
          <div
            className="absolute -top-24 -right-24 size-96 rounded-full bg-cyan/30 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -left-24 size-96 rounded-full bg-white/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative">
            <h2
              id="final-cta-heading"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight max-w-3xl mx-auto"
            >
              Ready to Transform Your Infrastructure?
            </h2>
            <p className="mt-5 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Partner with K8S Systems Inc to build secure, scalable, and
              reliable cloud-native platforms.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                render={<Link href="#contact" />}
                nativeButton={false}
                size="lg"
                className="bg-white text-navy hover:bg-white/90"
              >
                Schedule Consultation
                <ArrowRight className="size-4 ml-1" />
              </Button>
              <Button
                render={<Link href="#contact" />}
                nativeButton={false}
                size="lg"
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
