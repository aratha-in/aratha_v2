"use client";

import { useState } from "react";
import { Briefcase, MapPin, Clock, Calendar, ChevronDown, ChevronUp, Send, Check, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";

export default function CareersPage() {
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  
  // Application Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [jobTitle, setJobTitle] = useState("React Server Engineer");
  const [experience, setExperience] = useState("2-4 Years");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const jobs = [
    {
      id: "job_1",
      title: "Senior Next.js Developer",
      location: "Remote (India)",
      type: "Full-Time",
      posted: "2 days ago",
      desc: "We are seeking a senior Next.js engineer to lead our frontend application developments. You will own the architecture of decoupled websites, optimize bundles for Lighthouse speeds, and integrate headless CMS modules.",
      criteria: [
        "4+ years of professional React experience",
        "Expertise in Next.js App Router and server actions",
        "Deep understanding of Tailwind CSS and layout animations",
        "Experience setting up CI/CD pipelines and deployment containerization"
      ]
    },
    {
      id: "job_2",
      title: "Senior UI/UX Product Designer",
      location: "Remote",
      type: "Full-Time",
      posted: "1 week ago",
      desc: "Join our design studio and map modern user experiences for SaaS applications, clinic portals, and e-commerce checkouts. You will compose customized brand guidelines, layout high-fidelity wireframes, and design interactive prototypes.",
      criteria: [
        "3+ years agency portfolio displaying modern design aesthetics",
        "Mastery of Figma, components library structures, and design systems",
        "Strong user research and customer journey mapping capability",
        "Knowledge of WCAG AA accessibility standards is highly valued"
      ]
    },
    {
      id: "job_3",
      title: "Digital Growth Campaign Manager",
      location: "Bangalore Office / Hybrid",
      type: "Full-Time",
      posted: "5 days ago",
      desc: "Own customer acquisition channels and PPC optimizations. You will audit keywords, design Meta/LinkedIn ads, write drip email automations, and manage monthly traffic KPIs for retail and SaaS clients.",
      criteria: [
        "3+ years managing PPC spends over $10k/month",
        "Certified in Google Ads Search & Display audits",
        "Experience running A/B landing page conversion tests",
        "Analytic dashboard proficiency: GA4, Search Console, Hotjar"
      ]
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "career",
          name,
          email,
          phone,
          jobTitle,
          experience,
          message,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.8 },
          colors: ["#FEC903", "#2563EB", "#FFFFFF"],
        });
      } else {
        const errorData = await res.json();
        setErrorMessage(errorData.error || "Failed to submit application.");
      }
    } catch {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full py-16 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Decorative Blob */}
      <div className="glow-blob bg-accent top-1/4 -left-10 opacity-15" />

      {/* Header */}
      <div className="text-center flex flex-col items-center gap-4 mb-20">
        <span className="text-xs font-bold uppercase tracking-widest text-accent font-mono">Join Us</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Work with <span className="text-gradient-gold">Aratha</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xl leading-relaxed mt-2">
          We are a fully remote, fast-paced, high-performing team of engineers, designers, and marketers building modern software products.
        </p>
      </div>

      {/* Grid: Job List on Left, Form on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start z-10 relative">
        
        {/* Left Column: Job List Accordion */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <h2 className="text-xl font-bold text-white mb-2">Open Positions</h2>
          
          <div className="flex flex-col gap-4">
            {jobs.map((job) => {
              const isExpanded = expandedJobId === job.id;
              return (
                <div
                  key={job.id}
                  className="glass-card p-6 border-white/5 flex flex-col gap-4 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-base font-bold text-white hover:text-secondary transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-4 text-[10px] text-slate-500 font-semibold font-mono">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-accent" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-accent" /> {job.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-accent" /> {job.posted}
                        </span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                      className="p-1.5 rounded-lg bg-slate-900 border border-white/5 text-slate-400 hover:text-white transition-colors"
                      aria-label="Toggle details"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-white/5 pt-4 flex flex-col gap-4 text-xs text-slate-300 leading-relaxed animate-slide-down">
                      <p>{job.desc}</p>
                      <div className="flex flex-col gap-2">
                        <span className="text-[9px] uppercase font-bold text-slate-500 font-mono">Minimum Qualifications:</span>
                        <ul className="list-disc pl-5 flex flex-col gap-1.5">
                          {job.criteria.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <button
                        onClick={() => {
                          setJobTitle(job.title);
                          document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="px-4 py-2 mt-2 bg-accent/25 hover:bg-accent border border-accent/20 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider self-start transition-colors"
                      >
                        Apply for this Role
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Application Form */}
        <div id="apply-form" className="lg:col-span-5 scroll-mt-24">
          <div className="glass-panel p-8 border-white/10 w-full">
            <div className="flex flex-col gap-2 mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5.5 h-5.5 text-secondary" /> Submit Application
              </h2>
              <p className="text-slate-400 text-xs leading-relaxed">
                Fill out the application form. Our hiring team conducts review sessions twice weekly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400 font-mono">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Karan Singhal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading || success}
                  className="glass-input px-4 py-2.5 text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-400 font-mono">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="karan@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading || success}
                    className="glass-input px-4 py-2.5 text-xs focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-400 font-mono">Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91-XXXXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={loading || success}
                    className="glass-input px-4 py-2.5 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-400 font-mono">Job Role</label>
                  <select
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    disabled={loading || success}
                    className="glass-input px-4 py-2.5 text-xs bg-slate-950 focus:outline-none"
                  >
                    <option value="Senior Next.js Developer">Senior Next.js Developer</option>
                    <option value="Senior UI/UX Product Designer">Senior UI/UX Product Designer</option>
                    <option value="Digital Growth Campaign Manager">Digital Growth Campaign Manager</option>
                    <option value="React Server Engineer">General React Developer</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-400 font-mono">Experience</label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    disabled={loading || success}
                    className="glass-input px-4 py-2.5 text-xs bg-slate-950 focus:outline-none"
                  >
                    <option value="1-2 Years">1-2 Years</option>
                    <option value="2-4 Years">2-4 Years</option>
                    <option value="4-6 Years">4-6 Years</option>
                    <option value="6+ Years">6+ Years</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400 font-mono">Cover Letter & Links</label>
                <textarea
                  rows={4}
                  placeholder="Paste GitHub links, portfolio links, or cover notes..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={loading || success}
                  className="glass-input px-4 py-2.5 text-xs focus:outline-none resize-none"
                />
              </div>

              {errorMessage && (
                <p className="text-rose-500 text-xs font-semibold">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={loading || success}
                className="w-full py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : success ? (
                  <>
                    <Check className="w-4.5 h-4.5 text-secondary animate-pulse" />
                    <span>Application Submitted Successfully!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4.5 h-4.5" />
                    <span>Submit Application Brief</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
