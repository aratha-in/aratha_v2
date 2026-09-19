import { getDb } from "@/lib/db";
import { CheckCircle2, TrendingUp, Zap, Clock } from "lucide-react";

export const metadata = {
  title: "Case Studies | Client Performance & Speed Metrics | Aratha",
  description:
    "Read comprehensive deep dives illustrating how Aratha re-architected digital products to accelerate loading speeds and boost conversion funnels.",
};

export const revalidate = 0;

export default async function CaseStudiesPage() {
  const db = await getDb();
  const caseStudies = db.caseStudies;

  return (
    <div className="relative w-full py-16 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Decorative Blob */}
      <div className="glow-blob bg-secondary top-1/4 -right-10 opacity-10 animate-pulse-slow" />

      {/* Header */}
      <div className="text-center flex flex-col items-center gap-4 mb-20">
        <span className="text-xs font-bold uppercase tracking-widest text-accent">Real Results</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Client <span className="text-gradient-gold">Case Studies</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xl leading-relaxed mt-2">
          Discover how we re-engineered legacy platforms to slash page load speeds, improve search positioning, and drive customer acquisitions.
        </p>
      </div>

      {/* Case studies list */}
      <section className="flex flex-col gap-16">
        {caseStudies.map((item) => (
          <div key={item.id} className="glass-panel p-8 md:p-12 border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative overflow-hidden">
            {/* Glowing background highlights */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

            {/* Left Col - KPI and General Info */}
            <div className="lg:col-span-4 flex flex-col gap-6 h-full justify-between">
              <div>
                <span className="px-3.5 py-1.5 rounded-full bg-slate-900 border border-white/5 text-[10px] font-bold uppercase tracking-widest text-secondary block w-fit">
                  {item.category}
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-white mt-4 tracking-tight leading-snug">
                  {item.title}
                </h2>
                <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block mt-1">
                  Client: {item.client}
                </span>
              </div>

              {/* Metric Capsules */}
              <div className="grid grid-cols-3 gap-3 mt-6 lg:mt-0">
                <div className="bg-slate-950/80 border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                  <span className="text-base sm:text-lg font-extrabold text-secondary font-mono">{item.metrics.kpi1.value}</span>
                  <span className="text-[8px] uppercase tracking-wider text-slate-500 mt-1 font-semibold leading-tight">{item.metrics.kpi1.label}</span>
                </div>
                <div className="bg-slate-950/80 border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                  <span className="text-base sm:text-lg font-extrabold text-accent font-mono">{item.metrics.kpi2.value}</span>
                  <span className="text-[8px] uppercase tracking-wider text-slate-500 mt-1 font-semibold leading-tight">{item.metrics.kpi2.label}</span>
                </div>
                <div className="bg-slate-950/80 border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                  <span className="text-base sm:text-lg font-extrabold text-emerald-400 font-mono">{item.metrics.kpi3.value}</span>
                  <span className="text-[8px] uppercase tracking-wider text-slate-500 mt-1 font-semibold leading-tight">{item.metrics.kpi3.label}</span>
                </div>
              </div>
            </div>

            {/* Right Col - Core Narratives */}
            <div className="lg:col-span-8 flex flex-col gap-6 text-slate-300 text-sm leading-relaxed border-l border-white/5 pl-0 lg:pl-8">
              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1 text-rose-400">
                  <ShieldAlert className="w-4 h-4" /> The Challenge
                </h4>
                <p>{item.challenge}</p>
              </div>
              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1 text-accent">
                  <Zap className="w-4 h-4" /> The Solution
                </h4>
                <p>{item.solution}</p>
              </div>
              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mb-2 text-emerald-400">
                  <TrendingUp className="w-4 h-4" /> The Results
                </h4>
                <ul className="flex flex-col gap-2">
                  {item.results.map((res, i) => (
                    <li key={i} className="flex gap-2.5 items-start">
                      <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

// Simple layout warning suppression component helper
function ShieldAlert({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
