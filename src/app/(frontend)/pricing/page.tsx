import PricingCalculator from "@/components/PricingCalculator";

export const metadata = {
  title: "Pricing Plans & Custom Software Calculator | Aratha Agency",
  description:
    "Explore transparent pricing packages for brand identity, custom Next.js websites, web apps, and maintenance retainers. Generate an instant custom proposal.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Pricing Packages & Software Proposal Calculator | Aratha",
    description:
      "Review transparent pricing packages and generate custom proposal contracts for website builds and web applications.",
    url: "https://aratha.in/pricing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing Plans & Custom Software Calculator | Aratha",
    description:
      "Transparent website development pricing, web app packages, and instant custom proposal generation.",
  },
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
