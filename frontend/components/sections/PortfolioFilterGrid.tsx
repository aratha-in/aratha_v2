"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Globe, Lock, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PortfolioProject } from "@shared/types";

function getDisplayUrl(url?: string): string {
  if (!url) return "website.com";
  try {
    return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "");
  } catch {
    return url;
  }
}

interface PortfolioFilterGridProps {
  projects: PortfolioProject[];
}

export default function PortfolioFilterGrid({ projects }: PortfolioFilterGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Corporate",
    "E-Commerce",
    "Education",
    "Healthcare",
    "Real Estate",
    "Restaurant",
    "Portfolio",
    "Landing Pages",
  ];

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="flex flex-col gap-12">
      {/* Category selector */}
      <div className="flex items-center justify-center gap-2.5 flex-wrap max-w-3xl mx-auto neu-pressed p-3 rounded-2xl w-full">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeCategory === cat
                ? "neu-pill-active text-emerald-400 font-bold"
                : "neu-button text-slate-200 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((proj) => (
            <motion.div
              key={proj.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              id={proj.slug}
              className="glass-card overflow-hidden flex flex-col justify-between group min-h-[460px] scroll-mt-24"
            >
              {/* Website Preview Box */}
              <div className="h-52 bg-slate-950 relative flex flex-col border-b border-white/5 overflow-hidden group/preview">
                {/* Browser Top Chrome */}
                <div className="h-7 w-full bg-slate-900/95 border-b border-white/10 px-3 flex items-center justify-between z-20 shrink-0 backdrop-blur-md">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2 h-2 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-950/80 border border-white/5 text-[10px] text-slate-300 font-mono max-w-[180px] truncate">
                    <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{getDisplayUrl(proj.link)}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-[9px] font-bold text-cyan-300 uppercase tracking-wider">
                    {proj.category}
                  </span>
                </div>

                {/* Viewport Content */}
                <div className="relative flex-1 w-full overflow-hidden bg-slate-900">
                  {proj.image && (proj.image.startsWith("/") || proj.image.startsWith("http")) ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={proj.image}
                        alt={`${proj.title} website preview`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                    </div>
                  ) : (
                    /* Stylized Mock Web Preview */
                    <div className="relative w-full h-full flex flex-col justify-between p-4 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950">
                      <div className={`absolute inset-0 bg-gradient-to-tr ${
                        proj.image === "gradient-purple" ? "from-purple-950/30 to-slate-950" :
                        proj.image === "gradient-blue" ? "from-blue-950/30 to-slate-950" :
                        proj.image === "gradient-amber" ? "from-amber-950/30 to-slate-950" :
                        proj.image === "gradient-emerald" ? "from-emerald-950/30 to-slate-950" :
                        proj.image === "gradient-cyan" ? "from-cyan-950/30 to-slate-950" :
                        proj.image === "gradient-rose" ? "from-rose-950/30 to-slate-950" :
                        "from-slate-900/40 to-slate-950"
                      }`} />
                      {/* Mock Header Navigation bar */}
                      <div className="relative z-10 flex items-center justify-between border-b border-white/5 pb-2">
                        <div className="h-2 w-16 rounded bg-cyan-400/30" />
                        <div className="flex gap-2">
                          <div className="h-1.5 w-8 rounded bg-white/10" />
                          <div className="h-1.5 w-8 rounded bg-white/10" />
                          <div className="h-1.5 w-10 rounded bg-cyan-400/20" />
                        </div>
                      </div>
                      {/* Mock Hero Content */}
                      <div className="relative z-10 space-y-2 py-2">
                        <div className="h-3 w-3/4 rounded bg-white/20" />
                        <div className="h-2 w-1/2 rounded bg-slate-400/30" />
                        <div className="flex gap-2 pt-2">
                          <div className="h-5 w-20 rounded-md bg-gradient-to-r from-cyan-400/40 to-blue-500/40 border border-cyan-400/30" />
                          <div className="h-5 w-16 rounded-md bg-white/5 border border-white/10" />
                        </div>
                      </div>
                      {/* Live Preview Indicator */}
                      <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                        <span className="flex items-center gap-1 text-cyan-400">
                          <Globe className="w-3 h-3" />
                          <span>Live Web Build</span>
                        </span>
                        <span className="text-slate-500">60 FPS UI</span>
                      </div>
                    </div>
                  )}

                  {/* Hover action overlay */}
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-xs font-bold text-cyan-300 z-30"
                  >
                    <span>Open Live Preview</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Info Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                    <span>Client: {proj.client}</span>
                    <span>Duration: {proj.duration}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-secondary transition-colors line-clamp-1">
                    {proj.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                    {proj.description}
                  </p>

                  {/* Highlights list */}
                  <div className="border-t border-white/5 pt-4 mt-1 flex flex-col gap-1.5">
                    <span className="text-[9px] uppercase font-bold text-slate-500">Key Outcomes:</span>
                    {proj.highlights?.map((h: string, i: number) => (
                      <div key={i} className="text-[11px] text-slate-300 flex items-start gap-1.5 leading-relaxed">
                        <span className="text-secondary">&bull;</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags and CTA */}
                <div className="flex flex-col gap-4 mt-6">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {proj.tags?.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-hover transition-colors self-start"
                  >
                    <span>Visit Live Site</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
