import { Search, Map, Paintbrush, Code2, Rocket, BarChart3, Check } from "lucide-react";

export const metadata = {
  title: "Our Development Process | Agile Scoping & QA | Aratha",
  description: "Learn about the Aratha engineering model, spanning Discovery scoping, UI prototypes design, Next.js assembly, QA auditing, and staging testing.",
};

export default function ProcessPage() {
  const steps = [
    {
      phase: "01",
      title: "Discovery & Scoping Brief",
      icon: Search,
      desc: "We analyze your software requirements, audit performance bottlenecks in legacy stacks, and prepare itemized budget estimations.",
      details: ["User Personas Mapping", "Technical Feasibility Audit", "Sitemap Layout Brief", "Cost Estimates Proposals"]
    },
    {
      phase: "02",
      title: "Strategy & Database Mapping",
      icon: Map,
      desc: "We plan site navigation schemas, define data structures, and establish core security roles guidelines prior to styling any page.",
      details: ["Database Schema Scopes", "API Middlewares Planning", "AWS Infrastructure scoping", "Content Types specifications"]
    },
    {
      phase: "03",
      title: "High-Fidelity UI/UX Design",
      icon: Paintbrush,
      desc: "Our design studio creates custom brand kits, sets color variable rules, and maps interactive Figma prototypes for desktop and mobile.",
      details: ["Custom Typography Scales", "Interactive Figma Wireframes", "Design Tokens Assembly", "Animation Timeline specs"]
    },
    {
      phase: "04",
      title: "Frontend & API Integration",
      icon: Code2,
      desc: "We construct clean Next.js routes, style pages using Tailwind utility classes, and hook backend endpoints with secure token authorization.",
      details: ["TypeScript Page Code", "Tailwind CSS v4 layouts", "Dynamic SEO Schema setup", "Database Sockets connection"]
    },
    {
      phase: "05",
      title: "QA Audits & Launch Staging",
      icon: Rocket,
      desc: "We run page audits targeting 95+ Lighthouse scores, test Stripe/PayPal payment workflows, and deploy docker stacks on staging environments.",
      details: ["Lighthouse Audits targeting 95+", "Mobile Responsive QA checks", "Secure Sockets Penetration", "Staging deploys sign-off"]
    },
    {
      phase: "06",
      title: "Support SLA & Optimization",
      icon: BarChart3,
      desc: "We monitor performance, run monthly backups, update CMS databases, and provide priority maintenance support contracts.",
      details: ["SLA Technical Retainers", "Daily Database Cloud backups", "Lighthouse Score Maintenance", "Continuous CI/CD releases"]
    }
  ];

  return (
    <div className="relative w-full py-16 px-6 max-w-5xl mx-auto overflow-hidden">
      {/* Decorative blobs */}
      <div className="glow-blob bg-accent top-20 left-10 opacity-10" />

      {/* Header */}
      <div className="text-center flex flex-col items-center gap-4 mb-16 relative z-10">
        <span className="text-xs font-bold uppercase tracking-widest text-accent">How We Build</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mt-1">
          Our <span className="text-gradient-gold">Development Process</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xl leading-relaxed mt-2">
          An execution-focused Agile workflow that ensures premium designs, high-performance Next.js systems, and secure API data transactions.
        </p>
      </div>

      {/* Timeline Steps */}
      <div className="relative border-l border-white/10 pl-8 ml-4 flex flex-col gap-16 relative z-10">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="relative group">
              {/* Outer Node circle */}
              <span className="absolute -left-[53px] top-0 w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 font-bold font-mono text-xs group-hover:border-secondary group-hover:text-secondary transition-colors">
                {step.phase}
              </span>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center text-accent">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-gradient-gold transition-colors">{step.title}</h3>
                </div>

                <p className="text-slate-400 text-xs leading-relaxed max-w-2xl">{step.desc}</p>

                {/* Sublist */}
                <div className="grid grid-cols-2 gap-3 max-w-lg mt-2">
                  {step.details.map((det, index) => (
                    <div key={index} className="flex items-center gap-2 text-[10px] font-semibold text-slate-300">
                      <Check className="w-3.5 h-3.5 text-secondary shrink-0" />
                      <span>{det}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
