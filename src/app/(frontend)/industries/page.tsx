import { Shield, Sparkles, Heart, ShoppingBag, GraduationCap, Truck, Coffee } from "lucide-react";

export const metadata = {
  title: "Industries Served | Fintech, Healthcare & Education | Aratha",
  description:
    "Tailored digital solutions and custom web engineering designed for specific industries, addressing security compliance and user acquisitions.",
};

export default function IndustriesPage() {
  const industries = [
    {
      title: "Fintech & Finance",
      icon: <Shield className="w-6 h-6 text-secondary" />,
      desc: "High-security banking dashboards, interactive charting engines, and secure payment integrations adhering to PCI-DSS standards.",
      techs: ["Secure API Gateway", "JWT Session Hooks", "Abstract Charts"],
    },
    {
      title: "Healthcare",
      icon: <Heart className="w-6 h-6 text-secondary" />,
      desc: "HIPAA-compliant telemedicine platforms, dynamic appointment booking engines, patient dashboards, and secure records integrations.",
      techs: ["HIPAA Compliance", "WebRTC Video", "Twilio Messaging"],
    },
    {
      title: "E-Commerce",
      icon: <ShoppingBag className="w-6 h-6 text-secondary" />,
      desc: "Lightning-fast headless commerce setups using Next.js and Stripe, supporting complex multi-product catalogs and dynamic checkouts.",
      techs: ["Stripe Checkout", "Payload CMS", "Lighthouse speed core"],
    },
    {
      title: "Education & LMS",
      icon: <GraduationCap className="w-6 h-6 text-secondary" />,
      desc: "Scalable learning management portals featuring online video streaming, custom quiz modules, course builders, and student analytics.",
      techs: ["AWS S3 Video", "Drag-Drop course editor", "Progress trackers"],
    },
    {
      title: "Logistics & Supply Chain",
      icon: <Truck className="w-6 h-6 text-secondary" />,
      desc: "Operations portals, interactive maps, real-time shipment status dashboards, and employee scheduling tools.",
      techs: ["Polygon boundaries", "Live Leaflet Maps", "Auto email triggers"],
    },
    {
      title: "Hospitality & Retail",
      icon: <Coffee className="w-6 h-6 text-secondary" />,
      desc: "Interactive restaurant reservation apps, digital loyalty cards, split-bill tableside checkouts, and content listings.",
      techs: ["Loyalty metrics", "QR digital menus", "Split payment hooks"],
    },
  ];

  return (
    <div className="relative w-full py-16 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Decorative Blob */}
      <div className="glow-blob bg-accent -top-10 -left-10 opacity-15" />

      {/* Header */}
      <div className="text-center flex flex-col items-center gap-4 mb-20">
        <span className="text-xs font-bold uppercase tracking-widest text-accent">Verticals</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Specialized <span className="text-gradient-gold">Industries</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xl leading-relaxed mt-2">
          We engineer custom software systems and marketing retention programs tailored to solve industry-specific security, accessibility, and conversion challenges.
        </p>
      </div>

      {/* Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {industries.map((ind) => (
          <div key={ind.title} className="glass-card p-6 flex flex-col justify-between min-h-[300px] group">
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                {ind.icon}
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-secondary transition-colors">
                {ind.title}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                {ind.desc}
              </p>
            </div>

            {/* Core Tech Pill Tags */}
            <div className="flex flex-wrap items-center gap-1.5 mt-6 border-t border-white/5 pt-4">
              {ind.techs.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded bg-white/5 text-[9px] text-slate-400 font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
