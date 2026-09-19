import PricingCalculator from "@/components/PricingCalculator";

export const metadata = {
  title: "Pricing Packages | Custom Software & SEO Retainers | Aratha",
  description:
    "Review transparent pricing packages for brand identity, custom website design, web portal builds, and monthly website maintenance retainers.",
};

export default function PricingPage() {
  return (
    <div className="relative w-full py-16 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Decorative Blur */}
      <div className="glow-blob bg-accent top-10 -left-10 opacity-15" />

      {/* Header */}
      <div className="text-center flex flex-col items-center gap-4 mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-accent">Transparent Cost</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Flexible <span className="text-gradient-gold">Pricing plans</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xl leading-relaxed mt-2">
          Select a predefined tier that suits your growth stage, or configure a custom plan budget tailored to your system requirements.
        </p>
      </div>

      {/* Calculator & grid */}
      <PricingCalculator />
    </div>
  );
}
