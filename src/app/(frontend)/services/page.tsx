import { getServices } from "@/lib/db";
import { Globe, Cpu, Palette, Search, Sparkles, CheckCircle2 } from "lucide-react";
import ServiceQuoteForm from "@/components/ServiceQuoteForm";

export const metadata = {
  title: "Services | High-Performance Web Engineering, Payload CMS & Technical SEO",
  description:
    "Explore Aratha's agency capabilities: custom Next.js web development, headless Payload CMS, UI/UX systems design, technical SEO, Generative Engine Optimization (GEO), and AWS cloud DevOps.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services | Web Engineering, Headless CMS & SEO | Aratha Agency",
    description:
      "Explore Aratha's agency capabilities: custom Next.js web development, headless Payload CMS, UI/UX systems design, technical SEO, and cloud DevOps.",
    url: "https://aratha.in/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | High-Performance Web Engineering | Aratha",
    description:
      "Custom Next.js web application development, headless CMS integration, UI/UX design, and technical SEO.",
  },
};

export const revalidate = 0; // Fresh db lookups

export default async function ServicesPage() {
  const services = await getServices();

  const getIcon = (name: string) => {
    switch (name) {
      case "Globe":
        return <Globe className="w-8 h-8 text-secondary" />;
      case "Cpu":
        return <Cpu className="w-8 h-8 text-secondary" />;
      case "Palette":
        return <Palette className="w-8 h-8 text-secondary" />;
      case "Search":
        return <Search className="w-8 h-8 text-secondary" />;
      default:
        return <Sparkles className="w-8 h-8 text-secondary" />;
    }
  };

  return (
    <div className="relative w-full py-16 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Decorative Blob */}
      <div className="glow-blob bg-secondary top-1/3 -right-20 animate-pulse-slow" />

      {/* Header */}
      <div className="text-center flex flex-col items-center gap-4 mb-20">
        <span className="text-xs font-bold uppercase tracking-widest text-accent">What We Build</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Professional <span className="text-gradient-gold">Capabilities</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xl leading-relaxed mt-2">
          We leverage modern React frameworks, decoupled CMS pipelines, and AWS cloud configurations to build secure, robust software.
        </p>
      </div>

      {/* Services detailed listing */}
      <section className="flex flex-col gap-12 mb-28">
        {services.map((srv) => (
          <div
            key={srv.id}
            id={srv.slug}
            className="glass-card p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative scroll-mt-24 group"
          >
            {/* Left Col - Info */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  {getIcon(srv.icon)}
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-secondary transition-colors">
                    {srv.title}
                  </h2>
                  <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block mt-0.5 font-mono">
                    {srv.pricing}
                  </span>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                {srv.longDescription}
              </p>

              {/* Bullet Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {srv.features.map((feat) => (
                  <div key={feat} className="flex gap-2.5 items-center">
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                    <span className="text-slate-300 text-xs">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col - Visual details / SLA */}
            <div className="lg:col-span-4 h-full bg-slate-900/30 border border-white/5 rounded-2xl p-6 flex flex-col justify-between min-h-[180px] z-10 relative overflow-hidden">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] uppercase font-bold text-slate-500 font-mono">Aratha SLA Guarantee</span>
                <h4 className="text-white text-sm font-semibold">Production Ready Delivery</h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Every asset we launch includes full performance testing, search configurations, and secure hosting deployments.
                </p>
              </div>
              <div className="text-xs text-secondary font-semibold font-mono mt-4">
                Uptime Target: 99.9%
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Estimator Integration Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 relative">
        <div className="lg:col-span-5 flex flex-col gap-6">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">Get Scoped</span>
          <h2 className="text-3xl font-extrabold text-white leading-tight">
            Obtain a Custom <span className="text-gradient-gold">Project Scope</span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Select project parameters using our estimator tool. Our accounts team will review and schedule an active scoping call.
          </p>
          <div className="flex flex-col gap-3.5 mt-2">
            <div className="flex gap-3 text-slate-300 text-xs">
              <span className="w-5 h-5 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center font-bold text-secondary text-[10px]">1</span>
              <span>Select core service integrations and budget size.</span>
            </div>
            <div className="flex gap-3 text-slate-300 text-xs">
              <span className="w-5 h-5 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center font-bold text-secondary text-[10px]">2</span>
              <span>Detail custom assets and aesthetic guides.</span>
            </div>
            <div className="flex gap-3 text-slate-300 text-xs">
              <span className="w-5 h-5 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center font-bold text-secondary text-[10px]">3</span>
              <span>Submit project details directly to accounts.</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ServiceQuoteForm />
        </div>
      </section>
    </div>
  );
}
