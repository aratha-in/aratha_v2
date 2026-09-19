import { getBlogs } from "@/lib/db";
import BlogListing from "@/components/BlogListing";

export const metadata = {
  title: "Blog | Next.js Tips, Branding & Headless CMS Insights | Aratha",
  description:
    "Read web development tutorials, software architecture recommendations, design guides, and search optimization strategies from the Aratha engineering team.",
};

export const revalidate = 0; // Fresh db fetch

export default async function BlogPage() {
  const posts = await getBlogs();

  return (
    <div className="relative w-full py-16 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Decorative Blob */}
      <div className="glow-blob bg-accent top-10 -left-10 opacity-15" />

      {/* Header */}
      <div className="text-center flex flex-col items-center gap-4 mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-accent">Articles & Guides</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Agency <span className="text-gradient-gold">Insights</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xl leading-relaxed mt-2">
          Stay up to date with Next.js development patterns, headless CMS strategies, web speeds optimization, and brand metrics.
        </p>
      </div>

      {/* Blog Listing with Search & Filters */}
      <BlogListing posts={posts} />
    </div>
  );
}
