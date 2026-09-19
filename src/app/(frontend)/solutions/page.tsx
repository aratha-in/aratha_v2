import { Layers, ShieldCheck, Zap, Server, Code, Users } from "lucide-react";

export const metadata = {
  title: "Enterprise Solutions | Custom SaaS & Headless E-Commerce | Aratha",
  description: "Aratha offers premium enterprise solutions from headless e-commerce checkouts and cloud software to CRM integrations and security auditing.",
};

export default function SolutionsPage() {
  const solutions = [
    {
      icon: Layers,
      title: "Custom SaaS Architectures",
      desc: "Engineered scalable React applications powered by custom databases, web sockets, secure payment checkouts, and micro-frontend structures.",
      features: ["Multi-tenant Database Scopes", "Dynamic RBAC User Roles", "Real-Time Sockets Pipelines", "Stripe Subscription Engines"]
    },
    {
      icon: Zap,
      title: "Headless E-Commerce Checkouts",
      desc: "Blazing fast headless commerce configurations using Shopify storefront APIs, Tailwind styling, and optimized edge server delivery.",
      features: ["Sub-second Page Hydration", "Frictionless Cart Checkouts", "Custom Inventory Sync middlelayers", "Dynamic CMS landing modules"]
    },
    {
      icon: Server,
      title: "Cloud & Devops Migrations",
      desc: "Secure, containerized deployment systems built on AWS, Google Cloud, and Kubernetes clusters, featuring zero-downtime CI/CD.",
      features: ["Docker Containerization", "Automated Daily Database Backups", "WAF & Rate-Limiting Protection", "Cloudflare CDN Cache Strategies"]
    },
    {
      icon: Code,
      title: "CRM & ERP API Integrations",
      desc: "Connect legacy back-office structures to modern web platforms via custom RESTful or GraphQL API middlelayer frameworks.",
      features: ["Salesforce & Hubspot Syncs", "Custom Invoicing Pipelines", "Real-time Shipping APIs", "Automated Lead Notifications"]
    },
    {
      icon: ShieldCheck,
      title: "Compliance & Security Auditing",
      desc: "Comprehensive penetration testing and HIPAA, GDPR, and SOC2 compliance audits for financial or healthcare applications.",
      features: ["Data Encryption at Rest & Flight", "CSRF & SQL Injection Audits", "Audit Log Tracking systems", "Two-Factor Auth Integrations"]
    },
    {
      icon: Users,
      title: "AI Automation Workflows",
      desc: "Integrate LLM nodes and autonomous agents directly into business pipelines to automate documentation draft generation and lead scapes.",
      features: ["Custom OpenAI API Sockets", "Vector Database search scopes", "Automated FAQ builders", "Lead Scopes Scoping AI"]
    }
  ];

  return (
    <div className="relative w-full py-16 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Decorative Blur blobs */}
      <div className="glow-blob bg-accent top-10 -left-10 opacity-15" />
      <div className="glow-blob bg-secondary bottom-10 -right-10 opacity-10" />

      {/* Header */}
      <div className="text-center flex flex-col items-center gap-4 mb-16 relative z-10">
        <span className="text-xs font-bold uppercase tracking-widest text-accent">Enterprise Capabilities</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mt-1">
          Bespoke <span className="text-gradient-gold">Digital Solutions</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xl leading-relaxed mt-2">
          From headless checkout engines to AI-integrated middlewares, we build state-of-the-art software systems tailored to corporate growth.
        </p>
      </div>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {solutions.map((sol, index) => {
          const Icon = sol.icon;
          return (
            <div key={index} className="glass-card p-8 flex flex-col justify-between min-h-[350px]">
              <div className="flex flex-col gap-5">
                <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center text-accent">
                  <Icon className="w-6 h-6" />
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-white">{sol.title}</h3>
                  <p className="text-slate-400 text-xs mt-2 leading-relaxed">{sol.desc}</p>
                </div>
              </div>

              <ul className="flex flex-col gap-2 mt-6 pt-6 border-t border-white/5">
                {sol.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-[10px] font-semibold text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
