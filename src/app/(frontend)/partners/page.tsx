import { Cloud, Code, CreditCard, Layers, Shield } from "lucide-react";

export const metadata = {
  title: "Technology Partners | Cloud & Payment Alliances | Aratha",
  description: "Aratha works alongside industry-leading cloud hosting, payments, and CMS providers like AWS, Vercel, Payload CMS, and Stripe.",
};

export default function PartnersPage() {
  const partners = [
    {
      name: "Amazon Web Services (AWS)",
      type: "Cloud Infrastructure",
      icon: Cloud,
      desc: "We deploy secure, enterprise-grade Docker container pipelines and handle daily database replication nodes using AWS S3 and ECS."
    },
    {
      name: "Vercel Enterprise",
      type: "Edge Scaling & Hosting",
      icon: Layers,
      desc: "Our Next.js applications utilize Vercel edge nodes, global CDN distribution, and optimized middleware routes."
    },
    {
      name: "Stripe Integrations",
      type: "Payment Gateway",
      icon: CreditCard,
      desc: "We configure subscription loops, custom invoicing checkout sheets, and multi-currency billing compliance pipelines."
    },
    {
      name: "Payload CMS",
      type: "Headless Content CMS",
      icon: Code,
      desc: "Payload serves as our primary node CMS layer, providing clients with rapid editorial controls and modular layout fields."
    },
    {
      name: "Cloudflare Security",
      type: "WAF & DDoS Shield",
      icon: Shield,
      desc: "We route DNS assets via Cloudflare networks to enforce rate-limiting rules and block automated scraping injection attempts."
    }
  ];

  return (
    <div className="relative w-full py-16 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Decorative Blob */}
      <div className="glow-blob bg-accent top-10 -right-10 opacity-15" />

      {/* Header */}
      <div className="text-center flex flex-col items-center gap-4 mb-16 relative z-10">
        <span className="text-xs font-bold uppercase tracking-widest text-accent">Tech Alliances</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mt-1">
          Our <span className="text-gradient-gold">Technology Partners</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xl leading-relaxed mt-2">
          We construct platforms on top of enterprise core layers, partnering with trusted infrastructure nodes to ensure robust software scaling.
        </p>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {partners.map((partner, index) => {
          const Icon = partner.icon;
          return (
            <div key={index} className="glass-card p-8 flex flex-col justify-between min-h-[260px]">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-accent">
                    <Icon className="w-5.5 h-5.5" />
                  </div>
                  <span className="text-[8px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded uppercase tracking-wider">
                    {partner.type}
                  </span>
                </div>
                
                <div className="mt-2">
                  <h3 className="text-base font-bold text-white">{partner.name}</h3>
                  <p className="text-slate-400 text-xs mt-2 leading-relaxed">{partner.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
