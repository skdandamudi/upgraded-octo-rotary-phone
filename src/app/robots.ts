import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://k8ssystems.com/sitemap.xml",
    host: "https://k8ssystems.com",
  };
}
