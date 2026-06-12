import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  GitBranch,
  Workflow,
  Cloud,
  Activity,
  FileCode2,
  ShieldCheck,
  Award,
  Building2,
  Target,
  Layers,
  HeartHandshake,
} from "lucide-react";

export const site = {
  name: "K8S Systems Inc",
  shortName: "K8S Systems",
  tagline: "Kubernetes. DevOps. Cloud Excellence.",
  mission:
    "We help organizations modernize infrastructure, accelerate software delivery, improve reliability, and scale confidently through Kubernetes, DevOps automation, and cloud-native engineering.",
  email: "hello@k8ssystems.com",
  phone: "(555) 123-4567",
  linkedin: "https://linkedin.com/company/k8s-systems",
  github: "https://github.com/k8s-systems",
  twitter: "https://twitter.com/k8ssystems",
};

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Solutions", href: "#why" },
  { label: "Process", href: "#process" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
] as const;

export const heroStats = [
  { value: "100+", label: "Successful Projects" },
  { value: "99.99%", label: "Uptime Achieved" },
  { value: "50+", label: "Enterprise Clients" },
  { value: "40%", label: "Avg Cloud Cost Reduction" },
] as const;

export const trustedTech = [
  "Kubernetes",
  "Docker",
  "Terraform",
  "AWS",
  "Azure",
  "Google Cloud",
  "ArgoCD",
  "GitHub Actions",
  "Prometheus",
  "Grafana",
  "Helm",
  "Istio",
] as const;

export type Service = {
  icon: LucideIcon;
  title: string;
  bullets: string[];
};

export const services: Service[] = [
  {
    icon: Boxes,
    title: "Kubernetes Consulting",
    bullets: [
      "Cluster Design & Architecture",
      "Migration & Modernization",
      "Security Hardening",
      "Multi-Cluster Operations",
    ],
  },
  {
    icon: GitBranch,
    title: "DevOps Engineering",
    bullets: [
      "CI/CD Pipelines",
      "GitOps Adoption",
      "Release Automation",
      "Developer Productivity",
    ],
  },
  {
    icon: Workflow,
    title: "Platform Engineering",
    bullets: [
      "Internal Developer Platforms",
      "Self-Service Infrastructure",
      "Golden Path Architectures",
      "Developer Experience",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    bullets: [
      "AWS Architecture",
      "Azure Solutions",
      "Google Cloud Platforms",
      "Hybrid & Multi-Cloud",
    ],
  },
  {
    icon: Activity,
    title: "Site Reliability Engineering",
    bullets: [
      "Observability",
      "Incident Management",
      "Reliability Engineering",
      "Performance Optimization",
    ],
  },
  {
    icon: FileCode2,
    title: "Infrastructure as Code",
    bullets: [
      "Terraform",
      "GitOps Workflows",
      "Configuration Management",
      "Automated Provisioning",
    ],
  },
];

export type WhyCard = {
  icon: LucideIcon;
  title: string;
  body: string;
};

export const whyUs: WhyCard[] = [
  {
    icon: Award,
    title: "Certified Kubernetes Experts",
    body: "Deep expertise in cloud-native technologies and container orchestration, backed by CKA, CKAD, and CKS certifications.",
  },
  {
    icon: Building2,
    title: "Enterprise-Scale Experience",
    body: "We've supported startups, scale-ups, and Fortune 500 organizations across regulated and high-traffic environments.",
  },
  {
    icon: ShieldCheck,
    title: "Security-First Approach",
    body: "Infrastructure designed with compliance and security best practices — SOC 2, HIPAA, PCI-ready architectures.",
  },
  {
    icon: Target,
    title: "Proven Delivery Framework",
    body: "Predictable project outcomes with measurable business impact — defined milestones, transparent reporting.",
  },
  {
    icon: Layers,
    title: "Cloud-Native Specialists",
    body: "Focused expertise rather than generalist consulting — we live and breathe Kubernetes every day.",
  },
  {
    icon: HeartHandshake,
    title: "Long-Term Partnership",
    body: "Strategic guidance and operational support after deployment — we don't disappear when the project ships.",
  },
];

export type CaseStudy = {
  industry: string;
  title: string;
  challenge: string;
  results: string[];
  technology: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    industry: "SaaS",
    title: "Enterprise SaaS Platform",
    challenge: "Slow releases and infrastructure complexity were blocking growth and frustrating engineering teams.",
    results: ["85% faster deployments", "90% fewer production incidents"],
    technology: ["Kubernetes", "Terraform", "ArgoCD"],
  },
  {
    industry: "Financial Services",
    title: "Financial Services Organization",
    challenge: "High operational costs and compliance concerns demanded a rearchitected cloud platform.",
    results: ["40% cloud cost reduction", "Improved security posture"],
    technology: ["AWS", "Kubernetes", "GitOps"],
  },
  {
    industry: "Healthcare",
    title: "Healthcare Technology Provider",
    challenge: "Strict reliability targets and disaster recovery requirements demanded zero-downtime operations.",
    results: ["99.99% uptime", "Improved recovery objectives"],
    technology: ["GKE", "Terraform", "Prometheus"],
  },
];

export const processSteps = [
  {
    n: "01",
    title: "Discovery & Assessment",
    body: "We map your current state — clusters, pipelines, cloud spend, team capabilities — and align on outcomes.",
  },
  {
    n: "02",
    title: "Architecture & Strategy",
    body: "Target architecture, migration roadmap, success metrics, and a delivery plan you can present to leadership.",
  },
  {
    n: "03",
    title: "Implementation",
    body: "Hands-on engineering: clusters, pipelines, observability, security guardrails — shipped iteratively with your team.",
  },
  {
    n: "04",
    title: "Optimization & Support",
    body: "Ongoing reliability, cost optimization, and platform evolution — a long-term partnership, not a handoff.",
  },
] as const;

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "K8S Systems rebuilt our delivery pipeline in eight weeks. We went from monthly releases to multiple deploys per day with fewer incidents than we'd ever seen.",
    name: "Mira Chen",
    role: "VP Engineering",
    company: "Northwind Analytics",
  },
  {
    quote:
      "They treated reliability as a product. Our incident volume dropped by an order of magnitude and our on-call rotation is finally something engineers volunteer for.",
    name: "David Okafor",
    role: "Director of SRE",
    company: "Helios Health",
  },
  {
    quote:
      "Honest, deeply technical, and shipped on time. The cost work alone paid for the engagement inside a quarter — and we kept the platform.",
    name: "Priya Ramanathan",
    role: "CTO",
    company: "Atlas Fintech",
  },
];

export const faqs = [
  {
    q: "Why should we adopt Kubernetes?",
    a: "Kubernetes gives you a portable, declarative way to run modern applications across any cloud. The right adoption strategy unlocks faster releases, better reliability, and lower operational toil — but it has to be sized to your team. We help you decide if and when Kubernetes is the right move, and avoid over-engineering for organizations that don't yet need it.",
  },
  {
    q: "What cloud providers do you support?",
    a: "AWS, Azure, and Google Cloud are our primary platforms — we hold partner status across all three. We also work in hybrid and multi-cloud environments, and have deep experience with managed Kubernetes (EKS, AKS, GKE) and bare-metal/edge deployments.",
  },
  {
    q: "How long does a migration typically take?",
    a: "Most enterprise Kubernetes migrations land in 3–9 months depending on application count, regulatory scope, and team readiness. We start with a 2-week discovery to give you a defensible plan with phases, milestones, and measurable success criteria.",
  },
  {
    q: "Do you provide managed services?",
    a: "Yes. After delivery, we offer managed Kubernetes operations — proactive monitoring, upgrade management, capacity planning, and incident response — sized from co-managed embedded support to fully outsourced platform operations.",
  },
  {
    q: "How do you approach security and compliance?",
    a: "Security is built into the architecture from day one: network policies, pod security standards, supply chain controls, secrets management, audit logging, and IaC scanning. We've delivered platforms compliant with SOC 2, HIPAA, PCI-DSS, and FedRAMP-aligned environments.",
  },
  {
    q: "Can you help optimize cloud costs?",
    a: "Yes — cloud cost optimization is one of our most-requested engagements. We typically deliver 30–50% reductions through right-sizing, autoscaling, spot/savings plans, FinOps tooling, and unit-economics dashboards your finance and engineering teams can both trust.",
  },
] as const;
