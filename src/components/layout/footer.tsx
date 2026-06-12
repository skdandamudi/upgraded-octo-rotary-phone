import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/brand-icons";
import { services, site } from "@/lib/site-config";

function K8sMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none">
      <defs>
        <linearGradient id="footermark" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#326CE5" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      <path
        d="M16 2.5 27.5 8 25 22 16 29.5 7 22 4.5 8 16 2.5Z"
        stroke="url(#footermark)"
        strokeWidth="1.6"
      />
      <path
        d="M16 9.5 21.5 13.5 19.5 20.5 16 23 12.5 20.5 10.5 13.5 16 9.5Z"
        fill="url(#footermark)"
        opacity="0.9"
      />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-background/30">
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5 font-heading text-lg font-semibold">
              <K8sMark className="size-7" />
              <span>{site.name}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {site.tagline}
              <br />
              Enterprise Kubernetes, DevOps, and cloud-native engineering.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.title}>
                  <Link
                    href="#services"
                    className="text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors"
                >
                  <Mail className="size-4 text-cyan" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                  className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors"
                >
                  <Phone className="size-4 text-cyan" aria-hidden="true" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors"
                >
                  <LinkedInIcon className="size-4 text-cyan" />
                  linkedin.com/company/k8s-systems
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Follow
            </h3>
            <div className="flex items-center gap-3">
              <a
                href={site.linkedin}
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex size-9 items-center justify-center rounded-full border border-border hover:border-brand hover:text-brand transition-colors"
              >
                <LinkedInIcon className="size-4" />
              </a>
              <a
                href={site.github}
                aria-label="GitHub"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex size-9 items-center justify-center rounded-full border border-border hover:border-brand hover:text-brand transition-colors"
              >
                <GitHubIcon className="size-4" />
              </a>
              <a
                href={site.twitter}
                aria-label="X (Twitter)"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex size-9 items-center justify-center rounded-full border border-border hover:border-brand hover:text-brand transition-colors"
              >
                <XIcon className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {site.name}. All rights reserved.</p>
          <p>Built for reliability. Designed for scale.</p>
        </div>
      </div>
    </footer>
  );
}
