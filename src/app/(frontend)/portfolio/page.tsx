import { getPortfolio } from "@/lib/db";
import PortfolioFilterGrid from "@/components/PortfolioFilterGrid";

export const metadata = {
  title: "Portfolio | Corporate, E-Commerce & Healthcare Builds | Aratha",
  description:
    "Explore our featured digital projects across E-commerce platforms, patient portals, real estate engines, and corporate websites built on Next.js.",
};

export const revalidate = 0; // Load fresh portfolio items on request

export default async function PortfolioPage() {
  const projects = await getPortfolio();

  return (
    <div className="relative w-full py-16 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Decorative Blob */}
      <div className="glow-blob bg-accent top-1/4 -left-10 opacity-15" />

      {/* Header */}
      <div className="text-center flex flex-col items-center gap-4 mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-accent">Our Projects</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Client <span className="text-gradient-gold">Showcases</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xl leading-relaxed mt-2">
          Explore website engineering, custom dashboard architectures, SaaS landing pages, and API integrations we have launched.
        </p>
      </div>

      {/* Filterable Portfolio Grid */}
      <PortfolioFilterGrid projects={projects} />
    </div>
  );
}
