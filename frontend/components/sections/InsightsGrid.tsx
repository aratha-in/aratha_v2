"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowDownToLine, ArrowRight, Search } from "lucide-react";
import type { BlogPost } from "@shared/types";

interface InsightsGridProps {
  posts: BlogPost[];
  allPosts?: BlogPost[];
  categories: string[];
  initialCategory?: string;
}

function categorySlug(category: string) {
  return category.toLowerCase().replace(/&/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
}

function isImageUrl(image: string) {
  return image.startsWith("/") || image.startsWith("https://") || image.startsWith("http://");
}

export default function InsightsGrid({
  posts,
  allPosts = posts,
  categories,
  initialCategory = "All",
}: InsightsGridProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();
    const sourcePosts = activeCategory !== "All" || query ? allPosts : posts;
    return sourcePosts.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesQuery =
        !query ||
        [post.title, post.subtitle, post.excerpt, post.author, ...(post.tags ?? [])]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(query));
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, allPosts, posts, search]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-5 border-b border-white/10 pb-7">
        <label className="relative block w-full max-w-xl">
          <span className="sr-only">Search insights</span>
          <Search aria-hidden="true" className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setVisibleCount(9);
            }}
            placeholder="Search articles, topics or authors"
            className="w-full rounded-xl border border-white/10 bg-slate-900/80 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
          />
        </label>

        <nav aria-label="Filter insights by category" className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory("All")}
            aria-pressed={activeCategory === "All"}
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
              activeCategory === "All"
                ? "border-cyan-400 bg-cyan-400 text-slate-950"
                : "border-white/10 bg-slate-900 text-slate-300 hover:border-white/25 hover:text-white"
            }`}
          >
            All insights
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setActiveCategory(category);
                setVisibleCount(9);
              }}
              aria-pressed={activeCategory === category}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                activeCategory === category
                  ? "border-cyan-400 bg-cyan-400 text-slate-950"
                  : "border-white/10 bg-slate-900 text-slate-300 hover:border-white/25 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </nav>
      </div>

      {visiblePosts.length ? (
        <>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visiblePosts.map((post) => (
              <article
                key={post.id}
                className="group flex min-h-[360px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 transition hover:-translate-y-1 hover:border-cyan-400/40"
              >
                <Link
                  href={`/insights/${post.slug}`}
                  aria-label={`Read ${post.title}`}
                  className="relative block h-48 overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-cyan-950/60"
                >
                  {isImageUrl(post.image) ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-400/20 via-transparent to-transparent" />
                  )}
                  <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-slate-950/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                    {post.category}
                  </span>
                </Link>

                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[11px] text-slate-500">
                    {formatDate(post.date)} <span aria-hidden="true">·</span> {post.readTime}
                  </p>
                  <h3 className="mt-3 text-lg font-bold leading-snug text-white group-hover:text-cyan-200">
                    <Link href={`/insights/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-400">
                    {post.subtitle || post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                    <Link
                      href={`/insights/${post.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300 hover:text-white"
                    >
                      Read article <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </Link>
                    {post.resourceUrl && (
                      <a
                        href={post.resourceUrl}
                        download={post.resourceName || true}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white"
                      >
                        <ArrowDownToLine aria-hidden="true" className="h-4 w-4" />
                        Resource
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {visibleCount < filteredPosts.length && (
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + 9)}
              className="mx-auto rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-200"
            >
              Load more insights
            </button>
          )}
        </>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-slate-900/40 px-6 py-16 text-center">
          <h3 className="text-lg font-bold text-white">No insights found</h3>
          <p className="mt-2 text-sm text-slate-400">Try a different search or category.</p>
        </div>
      )}
    </div>
  );
}

export { categorySlug };
