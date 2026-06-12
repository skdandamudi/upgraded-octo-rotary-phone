import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://k8ssystems.com",
      lastModified: new Date("2026-01-01"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
