"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { nav, site } from "@/lib/site-config";
import { cn } from "@/lib/utils";

function K8sMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <linearGradient id="kmark" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#326CE5" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      <path
        d="M16 2.5 27.5 8 25 22 16 29.5 7 22 4.5 8 16 2.5Z"
        stroke="url(#kmark)"
        strokeWidth="1.6"
      />
      <path
        d="M16 9.5 21.5 13.5 19.5 20.5 16 23 12.5 20.5 10.5 13.5 16 9.5Z"
        fill="url(#kmark)"
        opacity="0.9"
      />
    </svg>
  );
}

export function StickyNav() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "glass-strong border-b border-border/60"
          : "border-b border-transparent"
      )}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="#top"
          className="flex items-center gap-2.5 font-heading text-lg font-semibold tracking-tight"
          aria-label={site.name}
        >
          <K8sMark className="size-7" />
          <span>{site.name}</span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-1"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            render={<Link href="#contact" />}
            nativeButton={false}
            className="hidden sm:inline-flex bg-gradient-brand text-brand-foreground hover:opacity-90 glow-brand"
          >
            Book a Free Consultation
          </Button>

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="size-5" />
                </Button>
              }
            />
            <SheetContent side="right" className="w-[300px] sm:w-[360px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-base">
                  <K8sMark className="size-6" />
                  {site.name}
                </SheetTitle>
              </SheetHeader>
              <nav
                aria-label="Mobile"
                className="mt-2 flex flex-col gap-1 px-4 pb-6"
              >
                {nav.map((item) => (
                  <SheetClose
                    key={item.href}
                    nativeButton={false}
                    render={
                      <Link
                        href={item.href}
                        className="rounded-md px-3 py-2.5 text-base hover:bg-muted transition-colors"
                      >
                        {item.label}
                      </Link>
                    }
                  />
                ))}
                <SheetClose
                  render={
                    <Button
                      render={<Link href="#contact" />}
                      nativeButton={false}
                      className="mt-3 bg-gradient-brand text-brand-foreground"
                    >
                      Book a Free Consultation
                    </Button>
                  }
                />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
