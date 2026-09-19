"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Code,
  Server,
  Database,
  Cloud,
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  client: string;
  tags: string[];
  image: string;
  highlights: string[];
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

interface TechStack {
  frontend: string[];
  backend: string[];
  database: string[];
  cloud: string[];
}

interface InteractiveClientProps {
  projects: Project[];
  techStack: TechStack;
  testimonials: Testimonial[];
}

export default function InteractiveClientSections({
  projects,
  techStack,
  testimonials,
}: InteractiveClientProps) {
  // 1. Portfolio State
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Corporate", "E-Commerce", "Healthcare", "Real Estate", "Education", "Restaurant", "Portfolio", "Landing Pages"];

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  // 2. Tech Tabs State
  const [activeTab, setActiveTab] = useState<keyof TechStack>("frontend");

  const tabLabels: Record<keyof TechStack, { label: string; icon: any }> = {
    frontend: { label: "Frontend Stack", icon: <Code className="w-4 h-4" /> },
    backend: { label: "Backend / CMS", icon: <Server className="w-4 h-4" /> },
    database: { label: "Databases", icon: <Database className="w-4 h-4" /> },
    cloud: { label: "Cloud & DevOps", icon: <Cloud className="w-4 h-4" /> },
  };

  // 3. Testimonials State
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <>
      {/* PORTFOLIO SECTION */}
      <section className="py-24 px-6 relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Recent Case Studies
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              Featured <span className="text-gradient-gold">Projects</span>
            </h2>
          </div>

          {/* Categories list */}
          <div className="flex items-center gap-1.5 flex-wrap max-w-full md:max-w-xl">
            {categories.slice(0, 5).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                  activeCategory === cat
                    ? "bg-accent border-accent text-white shadow-lg shadow-accent/20"
                    : "bg-slate-900 border-white/5 text-slate-400 hover:text-white hover:border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filtered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => (
              <motion.div
                key={proj.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass-card overflow-hidden flex flex-col justify-between group min-h-[420px]"
              >
                {/* Image Placeholder with Gradient */}
                <div className="h-44 bg-slate-900 relative flex items-center justify-center border-b border-white/5 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-tr ${
                    proj.image === "gradient-purple" ? "from-purple-950/40 to-slate-950" :
                    proj.image === "gradient-blue" ? "from-blue-950/40 to-slate-950" :
                    proj.image === "gradient-amber" ? "from-amber-950/40 to-slate-950" :
                    "from-slate-900/50 to-slate-950"
                  } group-hover:scale-105 transition-transform duration-500`} />
                  <span className="absolute top-4 right-4 px-2.5 py-1 rounded-lg bg-slate-950/80 border border-white/10 text-[10px] font-semibold text-secondary uppercase tracking-widest">
                    {proj.category}
                  </span>
                  <div className="flex items-center gap-1 text-white/10 font-extrabold uppercase text-3xl font-mono select-none tracking-widest z-10">
                    <Layers className="w-8 h-8 opacity-20" />
                    <span>Demo App</span>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                      Client: {proj.client}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-secondary transition-colors pr-2">
                      {proj.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                      {proj.description}
                    </p>
                    <div className="flex items-center gap-1.5 flex-wrap mt-2">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[9px] text-slate-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={`/portfolio#${proj.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-hover transition-colors mt-6"
                  >
                    <span>View Project Highlights</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* TECH STACK SECTION */}
      <section className="py-24 px-6 border-t border-white/5 relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary">
              Our Stack
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              State of the Art <br />
              <span className="text-gradient-gold">Technologies</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              We leverage modern decoupled stacks that deliver speeds under 2 seconds, robust data security, and seamless developer deployment.
            </p>

            {/* Selector buttons */}
            <div className="flex flex-col gap-2 mt-2">
              {(Object.keys(tabLabels) as Array<keyof TechStack>).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all text-left font-semibold text-sm ${
                    activeTab === key
                      ? "bg-accent border-accent text-white shadow-lg"
                      : "bg-slate-900 border-white/5 text-slate-400 hover:text-white hover:bg-slate-900/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {tabLabels[key].icon}
                    <span>{tabLabels[key].label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Visual technology panel details */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 min-h-[340px] flex flex-col justify-between border border-white/10 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-44 h-44 bg-accent/10 rounded-full blur-[80px]" />
              <div className="flex flex-col gap-6 z-10">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                  Technologies and frameworks we use
                </span>
                <h3 className="text-2xl font-bold text-white capitalize">
                  {tabLabels[activeTab].label}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                  {techStack[activeTab].map((tech) => (
                    <div
                      key={tech}
                      className="px-4 py-3 bg-slate-950/60 border border-white/5 rounded-xl text-center text-xs font-semibold text-slate-200"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-slate-500 z-10">
                <span>100% production ready integrations</span>
                <span className="text-secondary font-bold">AWS Deployment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-24 px-6 relative z-10 max-w-5xl mx-auto border-t border-white/5">
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Client <span className="text-gradient-gold">Testimonials</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-lg leading-relaxed">
            Here is what digital product directors and founders say about their partnerships with Aratha.
          </p>
        </div>

        {testimonials.length > 0 && (
          <div className="relative">
            <div className="glass-card p-8 md:p-12 relative overflow-hidden flex flex-col gap-6 border-white/10">
              <div className="absolute top-6 right-8 text-white/5">
                <Quote className="w-32 h-32" />
              </div>

              {/* Rating stars */}
              <div className="flex items-center gap-1 z-10">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>

              {/* Message quote */}
              <p className="text-slate-200 text-base md:text-lg leading-relaxed italic z-10">
                &ldquo;{testimonials[activeIndex].content}&rdquo;
              </p>

              {/* User Bio */}
              <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-4 z-10">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-accent flex items-center justify-center font-bold text-white text-sm">
                    {testimonials[activeIndex].avatar}
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-semibold">
                      {testimonials[activeIndex].name}
                    </h4>
                    <span className="text-slate-400 text-xs">
                      {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                    </span>
                  </div>
                </div>

                {/* Slider Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
