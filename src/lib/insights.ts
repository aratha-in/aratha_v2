import type { BlogPost } from "@shared/types";
import { getBlogs } from "@/lib/db";

function mapCategory(category: string) {
  const legacyCategories: Record<string, string> = {
    "Web Development": "Technology Insights",
    Branding: "Business Strategy",
    "Tech Strategy": "Technology Insights",
  };
  return legacyCategories[category] ?? category;
}

function isPubliclyAvailable(post: BlogPost) {
  if (post.status && post.status !== "published") return false;
  if (!post.date) return !post.status;

  const publicationTime = new Date(post.date).getTime();
  return !Number.isNaN(publicationTime) && publicationTime <= Date.now();
}

export async function getInsightPosts() {
  const posts = await getBlogs();

  return posts
    .map((post) => ({ ...post, category: mapCategory(post.category) }))
    .filter(isPubliclyAvailable)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getInsightsCategories() {
  return [
    "Digital Marketing",
    "Market Intelligence",
    "Business Strategy",
    "Technology Insights",
    "Customer Experience",
    "Industry Trends",
    "Research & Reports",
    "Guides & Resources",
  ];
}
