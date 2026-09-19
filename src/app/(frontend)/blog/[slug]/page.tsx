import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogs } from "@/lib/db";
import { ArrowLeft, Calendar, Clock, User, BookOpen } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const blogs = await getBlogs();
  const post = blogs.find((b) => b.slug === slug);

  if (!post) return { title: "Article Not Found" };

  return {
    title: `${post.title} | Aratha Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const blogs = await getBlogs();
  const post = blogs.find((b) => b.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="relative w-full py-16 px-6 max-w-4xl mx-auto overflow-hidden">
      {/* Decorative Blob */}
      <div className="glow-blob bg-accent top-10 -left-10 opacity-15" />

      {/* Back button */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-10 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        <span>Back to Insights</span>
      </Link>

      {/* Article Header */}
      <header className="flex flex-col gap-6 mb-12">
        <span className="px-3.5 py-1.5 rounded-full bg-slate-900 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-secondary block w-fit">
          {post.category}
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          {post.title}
        </h1>

        {/* Metadata */}
        <div className="flex items-center gap-6 border-y border-white/5 py-4 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-secondary" />
            <span>By {post.author}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-secondary" />
            <span>{post.date}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-secondary" />
            <span>{post.readTime}</span>
          </span>
        </div>
      </header>

      {/* Article Graphic Placeholder */}
      <div className="w-full h-64 sm:h-96 rounded-2xl bg-slate-900 border border-white/10 relative flex items-center justify-center overflow-hidden mb-12 shadow-xl">
        <div className={`absolute inset-0 bg-gradient-to-tr ${
          post.image === "gradient-blue-purple" ? "from-blue-950/40 to-slate-950" :
          post.image === "gradient-amber-rose" ? "from-amber-950/40 to-slate-950" :
          post.image === "gradient-emerald-cyan" ? "from-emerald-950/40 to-slate-950" :
          "from-slate-900/50 to-slate-950"
        }`} />
        <BookOpen className="w-16 h-16 text-white/10 z-10" />
      </div>

      {/* Article Content Body */}
      <article className="prose prose-invert prose-slate max-w-none text-slate-300 leading-relaxed text-sm sm:text-base flex flex-col gap-6">
        {post.content.split("\n\n").map((paragraph, index) => {
          if (paragraph.startsWith("### ")) {
            return (
              <h3 key={index} className="text-white text-xl font-bold tracking-tight mt-6 mb-2">
                {paragraph.replace("### ", "")}
              </h3>
            );
          }
          if (paragraph.startsWith("## ")) {
            return (
              <h2 key={index} className="text-white text-2xl font-bold tracking-tight mt-8 mb-3">
                {paragraph.replace("## ", "")}
              </h2>
            );
          }
          if (paragraph.startsWith("- ")) {
            return (
              <ul key={index} className="list-disc pl-6 flex flex-col gap-2">
                {paragraph.split("\n").map((li, i) => (
                  <li key={i}>{li.replace("- ", "").replace("**", "").replace("**", "")}</li>
                ))}
              </ul>
            );
          }
          return <p key={index}>{paragraph}</p>;
        })}
      </article>

      {/* Call To Action Box */}
      <div className="mt-16 p-8 bg-slate-900/40 border border-white/5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-white text-sm font-bold">Have a project in mind?</h4>
          <p className="text-slate-400 text-xs mt-1">We scoping custom responsive next.js apps within 24 hours.</p>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-semibold shadow-lg transition-all shrink-0"
        >
          Consultation Call
        </Link>
      </div>
    </div>
  );
}
