"use client";

import { useState } from "react";
import { ArrowRight, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PortfolioProject } from "@shared/types";

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
              {/* Image box */}
              <div className="h-48 bg-slate-900 relative flex items-center justify-center border-b border-white/5 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-tr ${
                  proj.image === "gradient-purple" ? "from-purple-950/40 to-slate-950" :
                  proj.image === "gradient-blue" ? "from-blue-950/40 to-slate-950" :
                  proj.image === "gradient-amber" ? "from-amber-950/40 to-slate-950" :
                  proj.image === "gradient-emerald" ? "from-emerald-950/40 to-slate-950" :
                  proj.image === "gradient-cyan" ? "from-cyan-950/40 to-slate-950" :
                  proj.image === "gradient-rose" ? "from-rose-950/40 to-slate-950" :
                  "from-slate-900/50 to-slate-950"
                } group-hover:scale-105 transition-transform duration-500`} />
                <span className="absolute top-4 right-4 px-2.5 py-1 rounded-lg bg-slate-950/85 border border-white/10 text-[9px] font-bold text-secondary uppercase tracking-widest">
                  {proj.category}
                </span>
                <div className="flex items-center gap-1 text-white/10 font-extrabold uppercase text-3xl font-mono select-none tracking-widest z-10">
                  <Layers className="w-8 h-8 opacity-20" />
                  <span>Interactive</span>
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
                    {proj.highlights?.map((h, i) => (
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
                    {proj.tags?.map((tag) => (
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
