import { StickyNav } from "@/components/layout/sticky-nav";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { TrustedTech } from "@/components/sections/trusted-tech";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";
import { CaseStudies } from "@/components/sections/case-studies";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <StickyNav />
      <main className="flex-1">
        <Hero />
        <TrustedTech />
        <Services />
        <WhyUs />
        <CaseStudies />
        <Process />
        <Testimonials />
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
