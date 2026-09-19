"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ArrowRight, BookOpen } from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
}

interface BlogListingProps {
  posts: BlogPost[];
}

export default function BlogListing({ posts }: BlogListingProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Web Development", "Branding", "Tech Strategy"];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || post.category.toLowerCase() === activeCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col gap-10">
      {/* Search and Filters bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-white/5 pb-8">
        {/* Search */}
        <div className="md:col-span-6 relative">
          <input
            type="text"
            placeholder="Search articles by title, content or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-accent"
          />
          <Search className="w-4.5 h-4.5 text-slate-500 absolute left-4 top-3.5" />
        </div>

        {/* Category filters */}
        <div className="md:col-span-6 flex items-center md:justify-end gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                activeCategory === cat
                  ? "bg-accent border-accent text-white shadow-lg"
                  : "bg-slate-900 border-white/5 text-slate-400 hover:text-white hover:border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="glass-card overflow-hidden flex flex-col group min-h-[380px]"
            >
              {/* Blog Graphic placeholder with abstract gradients */}
              <div className="h-44 bg-slate-900 border-b border-white/5 relative flex items-center justify-center overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-tr ${
                  post.image === "gradient-blue-purple" ? "from-blue-950/40 to-slate-950" :
                  post.image === "gradient-amber-rose" ? "from-amber-950/40 to-slate-950" :
                  post.image === "gradient-emerald-cyan" ? "from-emerald-950/40 to-slate-950" :
                  "from-slate-900/50 to-slate-950"
                } group-hover:scale-105 transition-transform duration-500`} />
                <span className="absolute top-4 right-4 px-2.5 py-1 rounded-lg bg-slate-950/85 border border-white/10 text-[9px] font-bold text-secondary uppercase tracking-widest z-10">
                  {post.category}
                </span>
                <div className="flex items-center gap-1.5 text-white/10 font-extrabold uppercase text-2xl font-mono select-none tracking-widest z-10">
                  <BookOpen className="w-6 h-6 opacity-20" />
                  <span>Articles</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                    {post.date} &bull; {post.readTime}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-secondary transition-colors line-clamp-2 pr-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <span className="text-[10px] text-slate-400 font-medium">By: {post.author}</span>
                  <span className="text-xs font-semibold text-accent group-hover:text-accent-hover transition-colors inline-flex items-center gap-1.5">
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-900/10 border border-white/5 rounded-3xl">
          <p className="text-slate-400 text-sm">No articles matched your search filters. Try selecting another term.</p>
        </div>
      )}
    </div>
  );
}
