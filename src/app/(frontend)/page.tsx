import Link from "next/link";
import { getDb } from "@/lib/db";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Globe,
  Palette,
  Search,
  Sparkles,
  Zap,
  Layers,
  Code,
  Shield,
  HelpCircle,
} from "lucide-react";
import InteractiveClientSections from "@/components/InteractiveClientSections";
import ArathaConsole from "@/components/ArathaConsole";
import FiberOpticBeam from "@/components/FiberOpticBeam";

export const revalidate = 0; // Disable caching to fetch fresh DB data on load

export default async function HomePage() {
  const db = await getDb();
  
  // Get active items
  const services = db.services.slice(0, 4); // Display first 4
  const projects = db.portfolio.slice(0, 3); // Display first 3
  const testimonials = db.testimonials;
  const blogs = db.blogs.slice(0, 3); // Display first 3

  // Core Tech Stack details
  const techStack = {
    frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    backend: ["Node.js", "Express.js", "NestJS", "Payload CMS"],
    database: ["PostgreSQL", "SQLite", "MongoDB", "Redis"],
    cloud: ["AWS S3/EC2", "Vercel", "Docker", "GitHub Actions"],
  };

  // Development steps
  const processSteps = [
    { num: "01", title: "Discovery & Strategy", desc: "We audit your competition, map user journeys, and specify project requirements." },
    { num: "02", title: "UI/UX Design", desc: "We design high-fidelity interactive wireframes and align on customized styling systems." },
    { num: "03", title: "Development", desc: "Our engineers build semantic, fast codebases using Next.js, Node, and TypeScript." },
    { num: "04", title: "Quality Assurance", desc: "We run automated cross-browser, responsive design, and stress tests to ensure stability." },
    { num: "05", title: "Deployment & Scale", desc: "We launch your systems on AWS/Vercel with secure configurations and CDN edge-delivery." }
  ];

  // Helper for icons mapping
  const getIcon = (name: string) => {
    switch (name) {
      case "Globe":
        return <Globe className="w-6 h-6 text-secondary" />;
      case "Cpu":
        return <Cpu className="w-6 h-6 text-secondary" />;
      case "Palette":
        return <Palette className="w-6 h-6 text-secondary" />;
      case "Search":
        return <Search className="w-6 h-6 text-secondary" />;
      default:
        return <Sparkles className="w-6 h-6 text-secondary" />;
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Dynamic Glowing Blob Backgrounds */}
      <div className="glow-blob bg-accent top-20 left-10" />
      <div className="glow-blob bg-secondary top-[600px] right-20" />
      <div className="glow-blob bg-blue-500 bottom-[1200px] left-1/3" />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Headline Column */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 self-center lg:self-start px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-secondary">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Leading Next.js Development Agency</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-white">
              Transforming Ideas Into <br />
              <span className="text-gradient-gold">Powerful Digital Experiences</span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              We build custom responsive websites, high-performance web applications, and data-driven marketing strategies that accelerate business growth.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mt-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00E5FF] to-[#3B82F6] text-slate-950 font-extrabold text-center shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                Get Free Consultation
              </Link>
              <Link
                href="/portfolio"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold text-center border border-white/10 hover:border-white/20 transition-all duration-200"
              >
                View Portfolio
              </Link>
            </div>
          </div>

          {/* Interactive Animated Aratha Console Column */}
          <div className="lg:col-span-5 relative w-full h-[380px] md:h-[420px] z-10">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-blue-600/10 rounded-2xl blur-3xl opacity-35 pointer-events-none" />
            <ArathaConsole />
          </div>
        </div>
      </section>

      {/* Fiber Optic Light Beam Cable Animation */}
      <FiberOpticBeam className="-my-6 z-10" />

      {/* 2. TRUSTED CLIENTS TICKER */}
      <section className="py-12 bg-slate-950/60 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center mb-6">
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
            Trusted by modern corporate clients worldwide
          </p>
        </div>
        <div className="ticker-container">
          <div className="ticker-track gap-16 md:gap-24 text-white/20 font-bold text-lg md:text-2xl uppercase tracking-widest">
            <span>Apex Retail</span>
            <span>Pulse Health</span>
            <span>Horizon Estates</span>
            <span>Elevate Academy</span>
            <span>Nomad Bistro</span>
            <span>Aurora Corp</span>
            <span>Visio Studios</span>
            <span>Zenith Cloud</span>
            {/* Duplicate for infinite effect */}
            <span>Apex Retail</span>
            <span>Pulse Health</span>
            <span>Horizon Estates</span>
            <span>Elevate Academy</span>
            <span>Nomad Bistro</span>
            <span>Aurora Corp</span>
            <span>Visio Studios</span>
            <span>Zenith Cloud</span>
          </div>
        </div>
      </section>

      {/* 3. SERVICES PREVIEW */}
      <section className="py-24 px-6 relative z-10 max-w-7xl mx-auto">
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Our Core <span className="text-gradient-gold">Services</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-lg leading-relaxed">
            We deliver end-to-end digital engineering and marketing retainers that drive measurable results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((srv) => (
            <div key={srv.id} className="glass-card p-6 flex flex-col justify-between min-h-[260px] group">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  {getIcon(srv.icon)}
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-secondary transition-colors">
                  {srv.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {srv.description}
                </p>
              </div>
              <Link
                href={`/services#${srv.slug}`}
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-hover transition-colors"
              >
                <span>Read More</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
          >
            <span>View All Services</span>
            <ArrowRight className="w-3.5 h-3.5 text-secondary" />
          </Link>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="py-24 px-6 bg-slate-950/40 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Agency Performance
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              Why Corporate Leaders <br />
              Choose <span className="text-gradient-gold">Aratha</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              We eliminate template constraints, optimize technical parameters, and build tailored systems that deliver high speed and security.
            </p>
            <ul className="flex flex-col gap-4 mt-2">
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                <div>
                  <h4 className="text-white text-sm font-semibold">90+ Lighthouse Performance</h4>
                  <p className="text-slate-400 text-xs mt-0.5">We optimize all build packages, images, and server components for speeds.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                <div>
                  <h4 className="text-white text-sm font-semibold">WCAG AA Accessibility</h4>
                  <p className="text-slate-400 text-xs mt-0.5">Our designs are optimized for maximum contrast, readable layout, and keyboard-control.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                <div>
                  <h4 className="text-white text-sm font-semibold">Security first deployment</h4>
                  <p className="text-slate-400 text-xs mt-0.5">Deployments feature robust firewalls, SSL encryptions, and daily backups.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Graphical metrics blocks */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-6">
            <div className="glass-card p-8 flex flex-col gap-2">
              <span className="text-3xl md:text-4xl font-extrabold text-secondary">99%</span>
              <h4 className="text-white text-sm font-semibold">Client SLA Score</h4>
              <p className="text-slate-400 text-xs leading-relaxed mt-1">We maintain support requests and fast uptime logs for corporate networks.</p>
            </div>
            <div className="glass-card p-8 flex flex-col gap-2">
              <span className="text-3xl md:text-4xl font-extrabold text-accent">1.1s</span>
              <h4 className="text-white text-sm font-semibold">Average Load Time</h4>
              <p className="text-slate-400 text-xs leading-relaxed mt-1">Next.js Edge rendering loads interactive pages globally in milliseconds.</p>
            </div>
            <div className="glass-card p-8 flex flex-col gap-2 col-span-2 md:col-span-1">
              <span className="text-3xl md:text-4xl font-extrabold text-white">50k+</span>
              <h4 className="text-white text-sm font-semibold">Leads Captured</h4>
              <p className="text-slate-400 text-xs leading-relaxed mt-1">Our dynamic booking and marketing funnels convert organic traffic.</p>
            </div>
            <div className="glass-card p-8 flex flex-col gap-2 col-span-2 md:col-span-1">
              <span className="text-3xl md:text-4xl font-extrabold text-emerald-400">100%</span>
              <h4 className="text-white text-sm font-semibold">Custom Tailored Code</h4>
              <p className="text-slate-400 text-xs leading-relaxed mt-1">No generic themes. Handcrafted designs tailored for conversions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5, 7, 8 CLIENT INTERACTIVE COMPONENT CONSOLIDATIONS */}
      {/* Featuring: Interactive projects selection, tech tabs switcher, and testimonials slider */}
      <InteractiveClientSections
        projects={projects}
        techStack={techStack}
        testimonials={testimonials}
      />

      {/* 6. DEVELOPMENT PROCESS TIMELINE */}
      <section className="py-24 px-6 border-y border-white/5 bg-slate-950/40 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center flex flex-col items-center gap-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              Our Development <span className="text-gradient-gold">Process</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-lg leading-relaxed">
              We leverage an agile, transparent development workflow that keeps you aligned at every stage.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {processSteps.map((step, idx) => (
              <div key={step.num} className="glass-card p-6 flex flex-col justify-between relative overflow-hidden min-h-[220px]">
                <div className="flex flex-col gap-4">
                  <div className="text-3xl font-extrabold text-white/10 font-mono tracking-wider absolute top-4 right-4">
                    {step.num}
                  </div>
                  <h3 className="text-base font-bold text-white pr-8">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed mt-1">
                    {step.desc}
                  </p>
                </div>
                {idx < 4 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-slate-950 border border-white/10 z-20 flex items-center justify-center transform -translate-y-1/2">
                    <ArrowRight className="w-3 h-3 text-secondary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. PRICING PREVIEW */}
      <section className="py-24 px-6 relative z-10 max-w-7xl mx-auto">
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Simple, Transparent <span className="text-gradient-gold">Pricing</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-lg leading-relaxed">
            Choose a package that fits your stage, or schedule a consultation for a custom quote.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Plan 1 */}
          <div className="glass-card p-8 flex flex-col justify-between min-h-[460px] relative">
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-bold text-white">Brand Identity Starter</h3>
                <p className="text-slate-400 text-xs mt-1">Perfect for new businesses establishing identity.</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-white">$2,999</span>
                <span className="text-slate-500 text-xs">/one-time</span>
              </div>
              <ul className="flex flex-col gap-3 border-t border-white/5 pt-6">
                <li className="flex gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4.5 h-4.5 text-secondary shrink-0" />
                  <span>Logo Mark & Brand Asset kit</span>
                </li>
                <li className="flex gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4.5 h-4.5 text-secondary shrink-0" />
                  <span>Corporate Color & Design Rules</span>
                </li>
                <li className="flex gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4.5 h-4.5 text-secondary shrink-0" />
                  <span>Typography Scales specifications</span>
                </li>
                <li className="flex gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4.5 h-4.5 text-secondary shrink-0" />
                  <span>Stationery templates layout (Letterhead, business cards)</span>
                </li>
              </ul>
            </div>
            <Link
              href="/pricing"
              className="w-full text-center py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 font-semibold text-xs text-white transition-all mt-8"
            >
              Get Started
            </Link>
          </div>

          {/* Plan 2 - Popular */}
          <div className="glass-card p-8 flex flex-col justify-between min-h-[460px] relative border-accent shadow-accent/5 shadow-2xl">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent border border-accent/20 text-[10px] font-bold text-white uppercase tracking-wider">
              Most Popular
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-bold text-white">Corporate Website</h3>
                <p className="text-slate-400 text-xs mt-1">High-performance custom web platform built on Next.js.</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-secondary">$4,999</span>
                <span className="text-slate-500 text-xs">/one-time</span>
              </div>
              <ul className="flex flex-col gap-3 border-t border-white/5 pt-6">
                <li className="flex gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4.5 h-4.5 text-secondary shrink-0" />
                  <span>Up to 10 page custom responsive Next.js frontend</span>
                </li>
                <li className="flex gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4.5 h-4.5 text-secondary shrink-0" />
                  <span>Self-managed Payload CMS / JSON Admin dashboard</span>
                </li>
                <li className="flex gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4.5 h-4.5 text-secondary shrink-0" />
                  <span>Core SEO Setup: Metadata configurations & schemas</span>
                </li>
                <li className="flex gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4.5 h-4.5 text-secondary shrink-0" />
                  <span>Contact capture integrations + analytics hooks</span>
                </li>
              </ul>
            </div>
            <Link
              href="/pricing"
              className="w-full text-center py-3 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold text-xs transition-all mt-8"
            >
              Get Started
            </Link>
          </div>

          {/* Plan 3 */}
          <div className="glass-card p-8 flex flex-col justify-between min-h-[460px] relative">
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-bold text-white">Web App Platform</h3>
                <p className="text-slate-400 text-xs mt-1">Full stack interactive SaaS platforms or portals.</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-white">$9,999</span>
                <span className="text-slate-500 text-xs">/starter price</span>
              </div>
              <ul className="flex flex-col gap-3 border-t border-white/5 pt-6">
                <li className="flex gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4.5 h-4.5 text-secondary shrink-0" />
                  <span>Interactive user profile consoles & databases</span>
                </li>
                <li className="flex gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4.5 h-4.5 text-secondary shrink-0" />
                  <span>Custom REST/GraphQL APIs and server middleware</span>
                </li>
                <li className="flex gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4.5 h-4.5 text-secondary shrink-0" />
                  <span>Complex payment loops (Stripe, Paypal)</span>
                </li>
                <li className="flex gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4.5 h-4.5 text-secondary shrink-0" />
                  <span>Containerized deployments with Docker & AWS</span>
                </li>
              </ul>
            </div>
            <Link
              href="/pricing"
              className="w-full text-center py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 font-semibold text-xs text-white transition-all mt-8"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* 10. LATEST BLOGS */}
      <section className="py-24 px-6 border-t border-white/5 relative z-10 max-w-7xl mx-auto">
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Latest from <span className="text-gradient-gold">Our Blog</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-lg leading-relaxed">
            Read coding tutorials, digital marketing guides, and insights from the Aratha engineering team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="glass-card overflow-hidden flex flex-col group min-h-[380px]"
            >
              {/* Dynamic abstract visual header for blogs instead of broken links */}
              <div className="h-48 bg-slate-900 border-b border-white/5 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-secondary/10 group-hover:scale-105 transition-transform duration-500" />
                <span className="px-3.5 py-1.5 rounded-full bg-slate-950/60 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-slate-400 z-10">
                  {post.category}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                    {post.date} &bull; {post.readTime}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-secondary transition-colors pr-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
                <span className="text-xs font-semibold text-accent group-hover:text-accent-hover transition-colors inline-flex items-center gap-1.5 mt-6">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 11. CALL TO ACTION */}
      <section className="py-24 px-6 relative z-10 max-w-7xl mx-auto">
        <div className="w-full rounded-3xl border border-white/10 bg-gradient-to-tr from-slate-950 to-slate-900/50 p-8 md:p-16 flex flex-col items-center justify-center text-center gap-8 relative overflow-hidden shadow-2xl">
          {/* Glowing blur effects */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/25 rounded-full blur-[120px] pointer-events-none" />

          <span className="text-xs font-bold uppercase tracking-widest text-secondary flex items-center gap-2">
            <Zap className="w-4 h-4 animate-bounce" /> Custom Web Scoping
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-2xl">
            Ready to Accelerate Your <br />
            <span className="text-gradient-gold">Digital Transformation?</span>
          </h2>

          <p className="text-slate-400 text-sm md:text-base max-w-xl leading-relaxed">
            Schedule a free 30-minute scoping consultation. We will audit your existing performance benchmarks and map out an implementation strategy.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-2 z-10">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00E5FF] to-[#3B82F6] text-slate-950 font-extrabold text-center shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all"
            >
              Get Free Consultation
            </Link>
            <Link
              href="/pricing"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold text-center border border-white/10 hover:border-white/20 transition-all"
            >
              Check Pricing Packages
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
