"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, Send } from "lucide-react";
import { LinkedInIcon } from "@/components/brand-icons";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SectionHeading } from "@/components/section-heading";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { site } from "@/lib/site-config";

const ContactSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().min(2, "Please enter your company"),
  phone: z.string().optional(),
  message: z
    .string()
    .min(10, "Tell us a bit more about your project (10+ chars)"),
});

type ContactInput = z.infer<typeof ContactSchema>;

export function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(ContactSchema) });

  const onSubmit = async (data: ContactInput) => {
    await new Promise((r) => setTimeout(r, 700));
    toast.success("Thanks — we'll be in touch within one business day.", {
      description: `We've received your note about ${data.company}.`,
    });
    reset();
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-16 sm:py-20 lg:py-28 scroll-mt-20"
    >
      <div className="container-page">
        <SectionHeading
          id="contact-heading"
          eyebrow="Contact"
          title="Tell us about your platform — we'll respond same day"
          description="A short note is enough to start. We'll follow up to schedule a 30-minute consultation at no cost."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <RevealOnScroll>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="glass rounded-2xl p-7 sm:p-9 space-y-5"
              noValidate
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  id="name"
                  label="Name"
                  error={errors.name?.message}
                >
                  <Input
                    id="name"
                    placeholder="Jane Doe"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    {...register("name")}
                  />
                </Field>
                <Field
                  id="email"
                  label="Email"
                  error={errors.email?.message}
                >
                  <Input
                    id="email"
                    type="email"
                    placeholder="jane@company.com"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                  />
                </Field>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  id="company"
                  label="Company"
                  error={errors.company?.message}
                >
                  <Input
                    id="company"
                    placeholder="Acme Corp"
                    autoComplete="organization"
                    aria-invalid={!!errors.company}
                    {...register("company")}
                  />
                </Field>
                <Field
                  id="phone"
                  label="Phone (optional)"
                  error={errors.phone?.message}
                >
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    autoComplete="tel"
                    aria-invalid={!!errors.phone}
                    {...register("phone")}
                  />
                </Field>
              </div>

              <Field
                id="message"
                label="Project Requirements"
                error={errors.message?.message}
              >
                <Textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us about your current platform, team, and what you'd like to achieve."
                  aria-invalid={!!errors.message}
                  {...register("message")}
                />
              </Field>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-gradient-brand text-brand-foreground hover:opacity-90 glow-brand"
              >
                {isSubmitting ? (
                  "Sending…"
                ) : (
                  <>
                    Send Message <Send className="size-4 ml-1" />
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground">
                By submitting, you agree to be contacted about your inquiry.
                We never share contact details with third parties.
              </p>
            </form>
          </RevealOnScroll>

          <RevealOnScroll className="space-y-4" delay={0.1}>
            <ContactInfoCard
              icon={<Mail className="size-5 text-cyan" />}
              label="Email"
              value={site.email}
              href={`mailto:${site.email}`}
            />
            <ContactInfoCard
              icon={<Phone className="size-5 text-cyan" />}
              label="Phone"
              value={site.phone}
              href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
            />
            <ContactInfoCard
              icon={<LinkedInIcon className="size-5 text-cyan" />}
              label="LinkedIn"
              value="linkedin.com/company/k8s-systems"
              href={site.linkedin}
              external
            />
            <div className="rounded-2xl p-6 bg-gradient-brand text-brand-foreground">
              <p className="font-heading text-lg font-semibold">
                Talk to an engineer, not a sales rep.
              </p>
              <p className="text-sm text-white/85 mt-2 leading-relaxed">
                The first call is always with one of our principal engineers.
                You&apos;ll get specific, technical answers — not a discovery
                script.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm">
        {label}
      </Label>
      {children}
      {error && (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function ContactInfoCard({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className="glass rounded-2xl p-5 flex items-center gap-4 hover:border-brand/40 transition-colors group"
    >
      <div className="flex size-11 items-center justify-center rounded-xl bg-card border border-border/60 group-hover:border-cyan/40 transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </a>
  );
}
