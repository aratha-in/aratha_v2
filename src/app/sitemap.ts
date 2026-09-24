import { MetadataRoute } from "next";
import { getBlogs, getServices, getPortfolio } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://aratha.in";
  const now = new Date();

  // Dynamic Blog routes
  let blogUrls: MetadataRoute.Sitemap = [];
  try {
    const blogs = await getBlogs();
    blogUrls = blogs.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch (e) {
    console.error("Failed to compile sitemap blog slugs:", e);
  }

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
    { route: "/blog", priority: 0.8, changeFrequency: "daily" },
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

  return [...staticUrls, ...blogUrls];
}
