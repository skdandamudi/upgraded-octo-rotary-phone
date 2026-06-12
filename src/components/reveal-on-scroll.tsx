"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  as?: "div" | "section" | "article" | "ul" | "ol";
  amount?: number;
  once?: boolean;
  delay?: number;
};

export function RevealOnScroll({
  children,
  className,
  variants = fadeUp,
  as = "div",
  amount = 0.2,
  once = true,
  delay,
}: Props) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin: "0px 0px -10% 0px" }}
      variants={variants}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </Tag>
  );
}

export function RevealStagger({
  children,
  className,
  as = "div",
  amount = 0.15,
  once = true,
}: Omit<Props, "variants">) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin: "0px 0px -10% 0px" }}
      variants={stagger}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
  variants = fadeUp,
  as = "div",
}: Omit<Props, "amount" | "once" | "delay">) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={variants}>
      {children}
    </Tag>
  );
}
