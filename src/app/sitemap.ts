import { MetadataRoute } from "next";
import { getBlogs } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogUrls: any[] = [];
  try {
    const blogs = await getBlogs();
    blogUrls = blogs.map((post) => ({
      url: `https://aratha.in/blog/${post.slug}`,
      lastModified: new Date().toISOString(),
    }));
  } catch (e) {
    console.error("Failed to compile sitemap blog slugs:", e);
  }

  const routes = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/case-studies",
    "/industries",
    "/pricing",
    "/blog",
    "/careers",
    "/faq",
    "/contact",
  ].map((route) => ({
    url: `https://aratha.in${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...blogUrls];
}
