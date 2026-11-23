import { MetadataRoute } from "next";
import { getInsightPosts } from "@/lib/insights";
import { getCertificates } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://aratha.in";
  const now = new Date();

  const [insights, certificates] = await Promise.all([
    getInsightPosts(),
    getCertificates(),
  ]);

  // Core static pages with priority weighting
  const staticRoutes: { route: string; priority: number; changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" }[] = [
    { route: "", priority: 1.0, changeFrequency: "daily" },
    { route: "/about", priority: 0.8, changeFrequency: "monthly" },
    { route: "/services", priority: 0.9, changeFrequency: "weekly" },
    { route: "/solutions", priority: 0.9, changeFrequency: "weekly" },
    { route: "/portfolio", priority: 0.9, changeFrequency: "weekly" },
    { route: "/case-studies", priority: 0.8, changeFrequency: "weekly" },
    { route: "/industries", priority: 0.8, changeFrequency: "monthly" },
    { route: "/our-process", priority: 0.7, changeFrequency: "monthly" },
    { route: "/pricing", priority: 0.9, changeFrequency: "weekly" },
    { route: "/insights", priority: 0.9, changeFrequency: "daily" },
    { route: "/certificates", priority: 0.8, changeFrequency: "daily" },
    { route: "/faq", priority: 0.8, changeFrequency: "monthly" },
    { route: "/careers", priority: 0.7, changeFrequency: "monthly" },
    { route: "/partners", priority: 0.6, changeFrequency: "monthly" },
    { route: "/clients", priority: 0.6, changeFrequency: "monthly" },
    { route: "/events", priority: 0.6, changeFrequency: "monthly" },
    { route: "/downloads", priority: 0.6, changeFrequency: "monthly" },
    { route: "/contact", priority: 0.9, changeFrequency: "monthly" },
    { route: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { route: "/terms", priority: 0.3, changeFrequency: "yearly" },
    { route: "/cookies", priority: 0.3, changeFrequency: "yearly" },
    { route: "/refund", priority: 0.3, changeFrequency: "yearly" },
  ];

  const staticUrls: MetadataRoute.Sitemap = staticRoutes.map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const insightUrls: MetadataRoute.Sitemap = [
    ...insights.map((post) => ({
      url: `${baseUrl}/insights/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : now,
      changeFrequency: "weekly" as const,
      priority: post.featured ? 0.85 : 0.75,
    })),
  ];

  const certificateUrls: MetadataRoute.Sitemap = [
    ...certificates
      .filter((c) => c.status !== "revoked")
      .map((c) => ({
        url: `${baseUrl}/certificates/${c.certificateId}`,
        lastModified: c.issueDate ? new Date(c.issueDate) : now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
  ];

  return [...staticUrls, ...insightUrls, ...certificateUrls];
}
