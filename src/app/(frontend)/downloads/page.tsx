"use client";

import { Download, FileText, BookOpen, Presentation, CheckCircle } from "lucide-react";

export default function DownloadsPage() {
  const categories = [
    {
      title: "Corporate Assets",
      icon: Presentation,
      items: [
        { name: "Aratha Scoping Brochure 2026", size: "3.2 MB", format: "PDF", desc: "Detailed agency catalog of web development, AI automation, and cloud capabilities." },
        { name: "Brand Asset Kit & Guidelines", size: "15.4 MB", format: "ZIP", desc: "Aratha vector logo marks, styling rules, typography scales, and CSS colors." }
      ]
    },
    {
      title: "Technical Whitepapers",
      icon: BookOpen,
      items: [
        { name: "Next.js 15 Edge Performance whitepaper", size: "1.8 MB", format: "PDF", desc: "Technical analysis on route pre-rendering, database cache tuning, and middleware scaling." },
        { name: "Headless E-Commerce SEO redirect playbook", size: "2.4 MB", format: "PDF", desc: "A guide to mapping structured JSON-LD schema tags and SEO routes in Shopify platforms." }
      ]
    },
    {
      title: "Scoping Templates",
      icon: FileText,
      items: [
        { name: "Agile Development Scoping Proposal Template", size: "450 KB", format: "DOCX", desc: "A customizable scoping brief questionnaire contract to guide sitemap planning." },
        { name: "Database Schema Layout Blueprint", size: "1.2 MB", format: "PDF", desc: "Visual model blueprints for role-based permissions and user database consoles." }
      ]
    }
  ];

  return (
    <div className="relative w-full py-16 px-6 max-w-6xl mx-auto overflow-hidden">
      {/* Decorative Blob */}
      <div className="glow-blob bg-accent top-10 right-10 opacity-15" />

      {/* Header */}
      <div className="text-center flex flex-col items-center gap-4 mb-16 relative z-10">
        <span className="text-xs font-bold uppercase tracking-widest text-accent">Resource Center</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mt-1">
          Asset <span className="text-gradient-gold">Downloads Vault</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xl leading-relaxed mt-2">
          Review our corporate capability guides, technical whitepapers, sitemaps wireframe templates, and logo kit files.
        </p>
      </div>

      {/* Categories loop */}
      <div className="flex flex-col gap-12 relative z-10">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div key={idx} className="flex flex-col gap-6">
              <div className="flex items-center gap-3.5 border-b border-white/5 pb-3">
                <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center text-accent">
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <h2 className="text-lg font-bold text-white">{cat.title}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cat.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="glass-panel p-5 border-white/10 hover:border-white/20 transition-all flex justify-between gap-6 items-start">
                    <div className="flex flex-col gap-2">
                      <span className="text-[9px] uppercase font-bold text-secondary font-mono">
                        {item.format} &bull; {item.size}
                      </span>
                      <h3 className="text-sm font-bold text-white">{item.name}</h3>
                      <p className="text-slate-400 text-[11px] leading-relaxed max-w-md">{item.desc}</p>
                    </div>

                    <button
                      onClick={() => alert(`Simulating file download: ${item.name}.${item.format.toLowerCase()}`)}
                      className="p-3 bg-slate-900 border border-white/10 hover:border-white/20 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-all shrink-0"
                      title="Download resource"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
