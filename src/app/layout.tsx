import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://k8ssystems.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "K8S Systems Inc — Kubernetes. DevOps. Cloud Excellence.",
    template: "%s · K8S Systems Inc",
  },
  description:
    "K8S Systems Inc helps enterprises modernize infrastructure, accelerate software delivery, and scale confidently through Kubernetes, DevOps automation, and cloud-native engineering.",
  keywords: [
    "Kubernetes consulting",
    "DevOps",
    "Platform Engineering",
    "Cloud Architecture",
    "Site Reliability Engineering",
    "Terraform",
    "GitOps",
    "ArgoCD",
    "AWS",
    "Azure",
    "GCP",
  ],
  authors: [{ name: "K8S Systems Inc" }],
  creator: "K8S Systems Inc",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "K8S Systems Inc — Kubernetes. DevOps. Cloud Excellence.",
    description:
      "Enterprise Kubernetes, DevOps, and cloud-native platform engineering. Build, scale, and optimize with confidence.",
    siteName: "K8S Systems Inc",
  },
  twitter: {
    card: "summary_large_image",
    title: "K8S Systems Inc — Kubernetes. DevOps. Cloud Excellence.",
    description:
      "Enterprise Kubernetes, DevOps, and cloud-native platform engineering. Build, scale, and optimize with confidence.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "K8S Systems Inc",
  url: SITE_URL,
  email: "hello@k8ssystems.com",
  telephone: "+1-555-123-4567",
  description:
    "IT consulting specializing in Kubernetes, DevOps, platform engineering, and cloud-native architecture.",
  sameAs: ["https://linkedin.com/company/k8s-systems"],
  areaServed: "Worldwide",
  knowsAbout: [
    "Kubernetes",
    "DevOps",
    "Platform Engineering",
    "Cloud Architecture",
    "Site Reliability Engineering",
    "Terraform",
    "GitOps",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
