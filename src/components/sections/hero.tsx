"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { heroStats } from "@/lib/site-config";
import { ArchitectureViz } from "./architecture-viz";
import { fadeUp, stagger } from "@/lib/motion";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-12 pb-16 sm:pt-16 lg:pt-24 lg:pb-24"
    >
      <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16 items-center">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.div variants={fadeUp}>
            <Badge
              variant="outline"
              className="glass rounded-full px-3 py-1 text-xs font-medium text-cyan border-cyan/30"
            >
              <Sparkles className="size-3 mr-1.5" />
              Cloud-native engineering partner
            </Badge>
          </motion.div>

          <motion.h1
            id="hero-heading"
            variants={fadeUp}
            className="mt-6 font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.05] text-gradient-brand"
          >
            Build, Scale, and Optimize Kubernetes Platforms with Confidence
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground"
          >
            K8S Systems Inc helps enterprises accelerate digital transformation
            through Kubernetes, DevOps automation, cloud-native architectures,
            and platform engineering best practices.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <Button
              render={<Link href="#contact" />}
              nativeButton={false}
              size="lg"
              className="bg-gradient-brand text-brand-foreground hover:opacity-90 glow-brand"
            >
              Schedule Consultation
              <ArrowRight className="size-4 ml-1" />
            </Button>
            <Button
              render={<Link href="#services" />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="glass"
            >
              Explore Services
            </Button>
          </motion.div>

          <motion.dl
            variants={fadeUp}
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6"
          >
            {heroStats.map((s) => (
              <div key={s.label}>
                <dt className="text-2xl sm:text-3xl font-heading font-semibold text-gradient-brand">
                  {s.value}
                </dt>
                <dd className="mt-1 text-xs sm:text-sm text-muted-foreground leading-tight">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative"
        >
          <ArchitectureViz />
        </motion.div>
      </div>
    </section>
  );
}
