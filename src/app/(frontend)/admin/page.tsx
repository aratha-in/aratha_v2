"use client";

import { useState, useEffect } from "react";
import {
  ShieldCheck,
  Users,
  Layers,
  FileText,
  MessageSquare,
  Globe,
  Settings,
  Mail,
  Trash2,
  Edit2,
  Plus,
  TrendingUp,
  X,
  Loader2,
  CheckCircle2,
  Lock,
  FolderOpen,
  Sparkles
} from "lucide-react";

export default function AdminDashboard() {
  const [role, setRole] = useState<"Admin" | "Editor">("Admin");
  const [activeSection, setActiveSection] = useState<
    "overview" | "services" | "portfolio" | "blog" | "testimonials" | "leads" | "seo" | "media" | "ai"
  >("overview");

  // Database states
  const [services, setServices] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [seo, setSeo] = useState<Record<string, any>>({});

  // Loading & Action states
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [toastMessage, setToastMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"service" | "project" | "blog" | "testimonial" | "seo">("service");
  const [editingItem, setEditingItem] = useState<any>(null);

  // Form Fields State
  const [formFields, setFormFields] = useState<any>({});

  // AI Automation Hub state
  const [aiTool, setAiTool] = useState<"content" | "seo" | "proposal" | "faq" | "image">("content");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);

  // AI Content inputs
  const [aiTopic, setAiTopic] = useState("Why Tailwind CSS v4 is a Game-Changer");
  const [aiWordCount, setAiWordCount] = useState("800");

  // AI SEO inputs
  const [aiSeoPage, setAiSeoPage] = useState("/");

  // AI Proposal inputs
  const [aiClientName, setAiClientName] = useState("Acme Labs Inc.");
  const [aiProjectType, setAiProjectType] = useState("SaaS Platform");
  const [aiWeeks, setAiWeeks] = useState("6");

  // AI FAQ inputs
  const [aiFaqCategory, setAiFaqCategory] = useState("AI Chatbot Development");

  // AI Image inputs
  const [aiImgTheme, setAiImgTheme] = useState("Gold Gradient Glow");

  const handleAiGenerate = () => {
    setAiLoading(true);
    setAiResult(null);

    setTimeout(() => {
      setAiLoading(false);
      
      if (aiTool === "content") {
        setAiResult({
          title: aiTopic,
          excerpt: `A comprehensive deep-dive analysis on ${aiTopic}.`,
          content: `# ${aiTopic}\n\nIn the rapidly evolving digital landscape, staying ahead of technology shifts is crucial. Today, we examine how these modern tools affect business operations and frontend scaling.\n\n## The Technical Architecture\nUsing responsive modules allows engineering teams to deploy faster and with fewer stylesheet assets. When integrated into Next.js layouts, it ensures performance benchmarks remain high.\n\n## Core Advantages\n1. **Improved Load Speed**: Optimizing page hydration cycles.\n2. **Clean Codebases**: Avoid inline styling clutter.\n3. **Future-Proof API Sockets**: Connecting seamlessly to headless cms and payment gateways.`
        });
      } else if (aiTool === "seo") {
        setAiResult({
          title: `${aiSeoPage === "/" ? "Home" : aiSeoPage.slice(1).toUpperCase()} | Aratha Digital Agency`,
          description: `Discover premium software development, custom brand scoping, and Lighthouse optimization with Aratha at ${aiSeoPage}. Built for Next.js systems.`,
          keywords: "nextjs 15 agency, tailwind css v4 developers, react app development, local seo, schema markup",
          schema: `{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Aratha at ${aiSeoPage}",
  "description": "Premium Next.js development and agency services"
}`
        });
      } else if (aiTool === "proposal") {
        setAiResult(`### DIGITAL TRANSFORMATION PROPOSAL
**PREPARED FOR**: ${aiClientName}
**PROJECT SCOPE**: Custom ${aiProjectType} development
**ESTIMATED TIMELINE**: ${aiWeeks} Weeks

**AGENCY STATEMENT OF WORK**:
Aratha Agency will engineer a production-ready, fully responsive Next.js system integrated with dynamic JSON access layers. Scope contains user profile interfaces, database scaffolding, Stripe payment processing configurations, and custom animations.

**PROPOSED PHASES**:
1. Discovery Scoping & Sitemap Approval (Week 1)
2. UI/UX Figma Prototype Review (Week 2-3)
3. React Assembly & Tailwind v4 styling (Week 4-5)
4. QA Audit & Deploy (Week 6)

**Authorized Digital Scoping Signature**:
ARATHA Solutions Director`);
      } else if (aiTool === "faq") {
        setAiResult([
          { q: `What is the delivery timeline for ${aiFaqCategory}?`, a: `Our scoping brief outlines a standard 3 to 6 week process depending on database complexities.` },
          { q: `Does ${aiFaqCategory} integrate with existing CRMs?`, a: "Yes. We build custom API middlewares connecting Payload CMS to Hubspot or WhatsApp Webhook systems." },
          { q: `How do we track changes during development?`, a: "Clients log into the Aratha Client Portal (/portal) where they review task checklists, timeline roadmaps, and file mockups." }
        ]);
      } else if (aiTool === "image") {
        const primaryColor = aiImgTheme.includes("Gold") ? "#FEC903" : "#2563EB";
        const secondaryColor = aiImgTheme.includes("Gold") ? "#0F172A" : "#1E293B";
        setAiResult(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" width="100%" height="200" class="rounded-xl border border-white/5 bg-slate-950">
  <defs>
    <linearGradient id="gradient-ai" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${primaryColor}" />
      <stop offset="100%" stop-color="${secondaryColor}" />
    </linearGradient>
  </defs>
  <rect width="400" height="200" fill="#090d16" rx="16" />
  <circle cx="200" cy="100" r="50" fill="url(#gradient-ai)" opacity="0.8" />
  <polygon points="200,60 230,130 170,130" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.9" />
  <line x1="200" y1="20" x2="200" y2="180" stroke="#ffffff" stroke-width="0.5" stroke-dasharray="4,4" opacity="0.3" />
  <line x1="20" y1="100" x2="380" y2="100" stroke="#ffffff" stroke-width="0.5" stroke-dasharray="4,4" opacity="0.3" />
</svg>`);
      }
    }, 1500);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [resSrv, resPort, resBlog, resTest, resLeads, resSeo] = await Promise.all([
          fetch("/api/services"),
          fetch("/api/portfolio"),
          fetch("/api/blog"),
          fetch("/api/testimonials"),
          fetch("/api/leads"),
          fetch("/api/seo")
        ]);

        const [srv, port, blog, test, lds, sConfig] = await Promise.all([
          resSrv.json(),
          resPort.json(),
          resBlog.json(),
          resTest.json(),
          resLeads.json(),
          resSeo.json()
        ]);

        setServices(srv);
        setPortfolio(port);
        setBlogs(blog);
        setTestimonials(test);
        setLeads(lds);
        setSeo(sConfig);
      } catch (err) {
        console.error("Failed to load CMS data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refreshKey]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleLeadStatusChange = async (leadId: string, status: string) => {
    try {
      const res = await fetch("/api/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, status })
      });
      if (res.ok) {
        showToast("Lead status updated successfully!");
        setRefreshKey((k) => k + 1);
      }
    } catch {
      showToast("Error updating lead status.");
    }
  };

  const handleDelete = async (type: string, id: string) => {
    if (role !== "Admin") {
      showToast("Error: Editors do not have Delete permissions!");
      return;
    }

    if (!confirm("Are you sure you want to delete this record?")) return;

    try {
      const res = await fetch(`/api/${type}?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Record deleted successfully!");
        setRefreshKey((k) => k + 1);
      } else {
        showToast("Delete request failed.");
      }
    } catch {
      showToast("Network error during delete.");
    }
  };

  const handleEditClick = (type: any, item: any) => {
    setModalType(type);
    setEditingItem(item);
    setFormFields(item);
    setModalOpen(true);
  };

  const handleAddNewClick = (type: any) => {
    setModalType(type);
    setEditingItem(null);
    setFormFields({});
    setModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingItem ? "PUT" : "POST";
    const body = editingItem ? { id: editingItem.id, ...formFields } : formFields;
    const endpoint = `/api/${modalType}`;

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        showToast(`Record ${editingItem ? "updated" : "created"} successfully!`);
        setModalOpen(false);
        setRefreshKey((k) => k + 1);
      } else {
        showToast("Failed to save changes.");
      }
    } catch {
      showToast("Network error submitting form.");
    }
  };

  return (
    <div className="min-h-[85vh] grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto px-6 py-8 relative">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-6 bg-slate-900 border border-secondary text-secondary px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-2 font-semibold text-xs animate-bounce">
          <CheckCircle2 className="w-4.5 h-4.5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Side Navigation Panel (Cols 3) */}
      <div className="lg:col-span-3 flex flex-col gap-6">
        {/* Role Access Panel */}
        <div className="glass-panel p-6 border-white/10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-500">Security Gate</span>
            <span className="text-[9px] font-bold text-accent bg-accent/15 px-2 py-0.5 rounded uppercase tracking-wider">
              {role}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase text-slate-400">User Role Control</label>
            <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-white/5">
              <button
                onClick={() => setRole("Admin")}
                className={`py-2 text-[10px] font-bold rounded-lg uppercase tracking-wider transition-all ${
                  role === "Admin" ? "bg-accent text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Admin
              </button>
              <button
                onClick={() => setRole("Editor")}
                className={`py-2 text-[10px] font-bold rounded-lg uppercase tracking-wider transition-all ${
                  role === "Editor" ? "bg-accent text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Editor
              </button>
            </div>
            {role === "Editor" && (
              <p className="text-[10px] text-amber-500 leading-normal flex items-start gap-1 mt-1">
                <Lock className="w-3 h-3 shrink-0 mt-0.5" />
                <span>Editor permissions: Delete buttons are disabled.</span>
              </p>
            )}
            <a
              href="/cms"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-[#00E5FF]/40 text-[#00E5FF] text-[10px] font-extrabold uppercase tracking-wider hover:brightness-125 transition-all shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Open Payload CMS Engine</span>
            </a>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="glass-panel p-4 border-white/10 flex flex-col gap-1.5">
          <button
            onClick={() => setActiveSection("overview")}
            className={`w-full flex items-center gap-3 p-3.5 rounded-xl text-xs font-semibold border transition-all ${
              activeSection === "overview"
                ? "bg-white/5 border-white/10 text-white font-bold"
                : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <TrendingUp className="w-4 h-4 text-secondary" />
            <span>Overview Stats</span>
          </button>
          <button
            onClick={() => setActiveSection("leads")}
            className={`w-full flex items-center justify-between p-3.5 rounded-xl text-xs font-semibold border transition-all ${
              activeSection === "leads"
                ? "bg-white/5 border-white/10 text-white font-bold"
                : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-secondary" />
              <span>Leads Submissions</span>
            </div>
            {leads.filter((l) => l.status === "New").length > 0 && (
              <span className="bg-secondary text-slate-950 text-[8px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {leads.filter((l) => l.status === "New").length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveSection("services")}
            className={`w-full flex items-center gap-3 p-3.5 rounded-xl text-xs font-semibold border transition-all ${
              activeSection === "services"
                ? "bg-white/5 border-white/10 text-white font-bold"
                : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-secondary" />
            <span>Services CMS</span>
          </button>
          <button
            onClick={() => setActiveSection("portfolio")}
            className={`w-full flex items-center gap-3 p-3.5 rounded-xl text-xs font-semibold border transition-all ${
              activeSection === "portfolio"
                ? "bg-white/5 border-white/10 text-white font-bold"
                : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Layers className="w-4 h-4 text-secondary" />
            <span>Portfolio CMS</span>
          </button>
          <button
            onClick={() => setActiveSection("blog")}
            className={`w-full flex items-center gap-3 p-3.5 rounded-xl text-xs font-semibold border transition-all ${
              activeSection === "blog"
                ? "bg-white/5 border-white/10 text-white font-bold"
                : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <FileText className="w-4 h-4 text-secondary" />
            <span>Blogs CMS</span>
          </button>
          <button
            onClick={() => setActiveSection("testimonials")}
            className={`w-full flex items-center gap-3 p-3.5 rounded-xl text-xs font-semibold border transition-all ${
              activeSection === "testimonials"
                ? "bg-white/5 border-white/10 text-white font-bold"
                : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <MessageSquare className="w-4 h-4 text-secondary" />
            <span>Testimonials CMS</span>
          </button>
          <button
            onClick={() => setActiveSection("seo")}
            className={`w-full flex items-center gap-3 p-3.5 rounded-xl text-xs font-semibold border transition-all ${
              activeSection === "seo"
                ? "bg-white/5 border-white/10 text-white font-bold"
                : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Globe className="w-4 h-4 text-secondary" />
            <span>SEO configurations</span>
          </button>
          <button
            onClick={() => setActiveSection("media")}
            className={`w-full flex items-center gap-3 p-3.5 rounded-xl text-xs font-semibold border transition-all ${
              activeSection === "media"
                ? "bg-white/5 border-white/10 text-white font-bold"
                : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <FolderOpen className="w-4 h-4 text-secondary" />
            <span>Media Library</span>
          </button>
          <button
            onClick={() => setActiveSection("ai")}
            className={`w-full flex items-center gap-3 p-3.5 rounded-xl text-xs font-semibold border transition-all ${
              activeSection === "ai"
                ? "bg-white/5 border-white/10 text-white font-bold"
                : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Sparkles className="w-4 h-4 text-secondary" />
            <span>AI Automation Hub</span>
          </button>
        </div>
      </div>

      {/* Main Workspace (Cols 9) */}
      <div className="lg:col-span-9 glass-panel p-6 sm:p-8 border-white/10 min-h-[480px] z-10 relative">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-slate-400 text-xs">
            <Loader2 className="w-8 h-8 animate-spin text-secondary" />
            <span>Fetching secure database records...</span>
          </div>
        ) : (
          <div className="animate-fade-in flex flex-col gap-6">
            
            {/* OVERVIEW STATS TAB */}
            {activeSection === "overview" && (
              <div className="flex flex-col gap-8">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Overview Dashboard</h2>
                  <p className="text-slate-400 text-xs leading-relaxed mt-0.5">Summary analytics of leads conversion, active scopes, and traffic loads.</p>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-950/70 border border-white/5 rounded-xl p-4 flex flex-col gap-1">
                    <span className="text-2xl font-extrabold text-secondary font-mono">{leads.length}</span>
                    <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Total Leads</span>
                  </div>
                  <div className="bg-slate-950/70 border border-white/5 rounded-xl p-4 flex flex-col gap-1">
                    <span className="text-2xl font-extrabold text-accent font-mono">
                      {leads.filter((l) => l.status === "New").length}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">New Queries</span>
                  </div>
                  <div className="bg-slate-950/70 border border-white/5 rounded-xl p-4 flex flex-col gap-1">
                    <span className="text-2xl font-extrabold text-emerald-400 font-mono">
                      {services.length}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Active Services</span>
                  </div>
                  <div className="bg-slate-950/70 border border-white/5 rounded-xl p-4 flex flex-col gap-1">
                    <span className="text-2xl font-extrabold text-white font-mono">
                      {portfolio.length}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Projects Count</span>
                  </div>
                </div>

                {/* SVG Analytical Charts */}
                <div className="bg-slate-950/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
                  <span className="text-[10px] uppercase font-bold text-slate-500 font-mono">Simulated Traffic Analytics (Past Week)</span>
                  <div className="w-full h-40 flex items-end justify-between relative px-2.5">
                    {/* SVG Line Graph representation */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                      <path
                        d="M0,80 Q50,40 100,60 T200,30 T300,50 T400,20"
                        fill="none"
                        stroke="#2563EB"
                        strokeWidth="3"
                        className="animate-pulse-slow"
                      />
                      <path
                        d="M0,80 Q50,40 100,60 T200,30 T300,50 T400,20 L400,100 L0,100 Z"
                        fill="url(#gradient-chart)"
                        opacity="0.1"
                      />
                      <defs>
                        <linearGradient id="gradient-chart" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#2563EB"/>
                          <stop offset="100%" stopColor="transparent"/>
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    {/* Mock axes details */}
                    <div className="absolute left-2.5 bottom-1 text-[8px] text-slate-500 uppercase tracking-widest">Mon</div>
                    <div className="absolute left-1/4 bottom-1 text-[8px] text-slate-500 uppercase tracking-widest">Wed</div>
                    <div className="absolute left-2/4 bottom-1 text-[8px] text-slate-500 uppercase tracking-widest">Fri</div>
                    <div className="absolute right-2.5 bottom-1 text-[8px] text-slate-500 uppercase tracking-widest">Sun</div>
                  </div>
                </div>
              </div>
            )}

            {/* LEADS MANAGER TAB */}
            {activeSection === "leads" && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Leads & Applications Manager</h2>
                    <p className="text-slate-400 text-xs mt-0.5">Monitor project consultation scopes and job applications submissions.</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-1">
                  {leads.map((lead) => (
                    <div
                      key={lead.id}
                      className="bg-slate-950/70 border border-white/5 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex flex-col gap-2 max-w-lg">
                        <div className="flex items-center gap-2">
                          <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded tracking-widest ${
                            lead.type === "contact" ? "bg-accent/20 text-accent" :
                            lead.type === "career" ? "bg-purple-500/20 text-purple-400" :
                            "bg-secondary/20 text-secondary"
                          }`}>
                            {lead.type}
                          </span>
                          <span className="text-[10px] text-slate-500 font-semibold">
                            {new Date(lead.date).toLocaleDateString()}
                          </span>
                        </div>
                        {lead.name && (
                          <h4 className="text-xs font-bold text-white">
                            Name: {lead.name}
                          </h4>
                        )}
                        <p className="text-xs font-semibold text-slate-300">Email: {lead.email}</p>
                        {lead.phone && <p className="text-xs text-slate-400">Phone: {lead.phone}</p>}
                        {lead.jobTitle && <p className="text-xs text-slate-400">Apply Role: {lead.jobTitle} ({lead.experience} exp)</p>}
                        {lead.message && (
                          <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/30 p-2.5 rounded-lg border border-white/5 mt-1 font-mono">
                            {lead.message}
                          </p>
                        )}
                      </div>

                      {/* Dropdown status update */}
                      <div className="flex items-center gap-2">
                        <select
                          value={lead.status}
                          onChange={(e) => handleLeadStatusChange(lead.id, e.target.value)}
                          className="bg-slate-900 border border-white/15 text-slate-300 rounded-lg px-2.5 py-1.5 text-[11px] focus:outline-none focus:border-accent"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Reviewed">Reviewed</option>
                          <option value="Closed">Closed</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SERVICES CMS TAB */}
            {activeSection === "services" && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Services Manager</h2>
                    <p className="text-slate-400 text-xs mt-0.5">Add or modify core service packages offered on the site.</p>
                  </div>
                  <button
                    onClick={() => handleAddNewClick("service")}
                    className="flex items-center gap-1 bg-accent hover:bg-accent-hover text-white text-xs font-bold px-3 py-2 rounded-xl transition-all"
                  >
                    <Plus className="w-4 h-4" /> Add Service
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((srv) => (
                    <div key={srv.id} className="bg-slate-950/60 border border-white/5 rounded-xl p-5 flex flex-col justify-between min-h-[160px]">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-white">{srv.title}</h3>
                          <span className="text-[9px] text-slate-500 font-semibold font-mono uppercase">{srv.pricing}</span>
                        </div>
                        <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">{srv.description}</p>
                      </div>
                      <div className="flex items-center justify-end gap-2 border-t border-white/5 pt-4 mt-4">
                        <button
                          onClick={() => handleEditClick("service", srv)}
                          className="p-1.5 rounded-lg bg-slate-900 border border-white/5 text-slate-400 hover:text-white transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          disabled={role !== "Admin"}
                          onClick={() => handleDelete("services", srv.id)}
                          className="p-1.5 rounded-lg bg-slate-900 border border-white/5 text-rose-500/80 hover:text-rose-500 transition-colors disabled:opacity-30"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PORTFOLIO CMS TAB */}
            {activeSection === "portfolio" && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Portfolio Manager</h2>
                    <p className="text-slate-400 text-xs mt-0.5">Manage case studies and showcase projects categories.</p>
                  </div>
                  <button
                    onClick={() => handleAddNewClick("project")}
                    className="flex items-center gap-1 bg-accent hover:bg-accent-hover text-white text-xs font-bold px-3 py-2 rounded-xl transition-all"
                  >
                    <Plus className="w-4 h-4" /> Add Project
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {portfolio.map((proj) => (
                    <div key={proj.id} className="bg-slate-950/60 border border-white/5 rounded-xl p-5 flex flex-col justify-between min-h-[160px]">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-white">{proj.title}</h3>
                          <span className="text-[9px] text-secondary font-bold uppercase tracking-widest">{proj.category}</span>
                        </div>
                        <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">{proj.description}</p>
                      </div>
                      <div className="flex items-center justify-end gap-2 border-t border-white/5 pt-4 mt-4">
                        <button
                          onClick={() => handleEditClick("project", proj)}
                          className="p-1.5 rounded-lg bg-slate-900 border border-white/5 text-slate-400 hover:text-white transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          disabled={role !== "Admin"}
                          onClick={() => handleDelete("portfolio", proj.id)}
                          className="p-1.5 rounded-lg bg-slate-900 border border-white/5 text-rose-500/80 hover:text-rose-500 transition-colors disabled:opacity-30"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BLOGS CMS TAB */}
            {activeSection === "blog" && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Blogs Manager</h2>
                    <p className="text-slate-400 text-xs mt-0.5">Publish articles, strategy guides, and developer newsletters.</p>
                  </div>
                  <button
                    onClick={() => handleAddNewClick("blog")}
                    className="flex items-center gap-1 bg-accent hover:bg-accent-hover text-white text-xs font-bold px-3 py-2 rounded-xl transition-all"
                  >
                    <Plus className="w-4 h-4" /> Write Blog
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {blogs.map((b) => (
                    <div key={b.id} className="bg-slate-950/60 border border-white/5 rounded-xl p-5 flex flex-col justify-between min-h-[160px]">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-white pr-2 line-clamp-1">{b.title}</h3>
                          <span className="text-[9px] text-slate-500 font-semibold font-mono uppercase">{b.readTime}</span>
                        </div>
                        <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">{b.excerpt}</p>
                      </div>
                      <div className="flex items-center justify-end gap-2 border-t border-white/5 pt-4 mt-4">
                        <button
                          onClick={() => handleEditClick("blog", b)}
                          className="p-1.5 rounded-lg bg-slate-900 border border-white/5 text-slate-400 hover:text-white transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          disabled={role !== "Admin"}
                          onClick={() => handleDelete("blog", b.id)}
                          className="p-1.5 rounded-lg bg-slate-900 border border-white/5 text-rose-500/80 hover:text-rose-500 transition-colors disabled:opacity-30"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TESTIMONIALS CMS TAB */}
            {activeSection === "testimonials" && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Testimonials Manager</h2>
                    <p className="text-slate-400 text-xs mt-0.5">Manage client reviews displaying on the site slider.</p>
                  </div>
                  <button
                    onClick={() => handleAddNewClick("testimonial")}
                    className="flex items-center gap-1 bg-accent hover:bg-accent-hover text-white text-xs font-bold px-3 py-2 rounded-xl transition-all"
                  >
                    <Plus className="w-4 h-4" /> Add Review
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {testimonials.map((t) => (
                    <div key={t.id} className="bg-slate-950/60 border border-white/5 rounded-xl p-5 flex flex-col justify-between min-h-[160px]">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-white">{t.name}</h3>
                          <span className="text-[9px] text-secondary font-semibold font-mono uppercase">{t.company}</span>
                        </div>
                        <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 italic">&ldquo;{t.content}&rdquo;</p>
                      </div>
                      <div className="flex items-center justify-end gap-2 border-t border-white/5 pt-4 mt-4">
                        <button
                          onClick={() => handleEditClick("testimonial", t)}
                          className="p-1.5 rounded-lg bg-slate-900 border border-white/5 text-slate-400 hover:text-white transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          disabled={role !== "Admin"}
                          onClick={() => handleDelete("testimonials", t.id)}
                          className="p-1.5 rounded-lg bg-slate-900 border border-white/5 text-rose-500/80 hover:text-rose-500 transition-colors disabled:opacity-30"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SEO MANAGER TAB */}
            {activeSection === "seo" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">SEO Meta-Tags Manager</h2>
                  <p className="text-slate-400 text-xs mt-0.5">Control search titles and descriptions live per route path.</p>
                </div>

                <div className="flex flex-col gap-4">
                  {Object.keys(seo).map((pageKey) => (
                    <div key={pageKey} className="bg-slate-950/70 border border-white/5 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-accent uppercase font-mono tracking-wider">{pageKey} Route</span>
                        <h4 className="text-xs font-bold text-white mt-1">Title: {seo[pageKey].title}</h4>
                        <p className="text-slate-400 text-xs mt-0.5">Desc: {seo[pageKey].description}</p>
                      </div>
                      <button
                        onClick={() => handleEditClick("seo", { page: pageKey, ...seo[pageKey] })}
                        className="flex items-center gap-1.5 bg-slate-900 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white px-3.5 py-2 rounded-xl text-[10px] font-bold uppercase transition-all shrink-0"
                      >
                        <Edit2 className="w-3.5 h-3.5" /> Edit Meta
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MEDIA LIBRARY TAB */}
            {activeSection === "media" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Media Library</h2>
                  <p className="text-slate-400 text-xs mt-0.5">Simulated storage directory for application mock files.</p>
                </div>
                
                {/* Visual Media files mocks list */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                  {["apex-banner.jpg", "telehealth.png", "horizon-home.jpg", "visio-branding.pdf", "zenith-ui.png"].map((file, i) => (
                    <div key={i} className="bg-slate-950/70 border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-3 group cursor-pointer hover:border-accent transition-colors">
                      <FolderOpen className="w-8 h-8 text-secondary group-hover:scale-105 transition-transform" />
                      <span className="text-[9px] text-slate-400 font-mono truncate max-w-full">{file}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI HUB TAB */}
            {activeSection === "ai" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">AI Automation Hub</h2>
                  <p className="text-slate-400 text-xs mt-0.5">Generate SEO suggestions, copy drafts, and scoping proposal models using simulated OpenAI endpoints.</p>
                </div>

                {/* Sub-selector for AI Tools */}
                <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4">
                  {[
                    { id: "content", label: "Content Assistant" },
                    { id: "seo", label: "SEO Suggestions" },
                    { id: "proposal", label: "Proposal Generator" },
                    { id: "faq", label: "FAQ Builder" },
                    { id: "image", label: "Vector Placeholder Generator" }
                  ].map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => { setAiTool(tool.id as any); setAiResult(null); }}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        aiTool === tool.id
                          ? "bg-accent border-accent text-white"
                          : "bg-slate-900 border-white/5 text-slate-400 hover:text-white"
                      }`}
                    >
                      {tool.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  {/* AI Controls Input Panel (Left 5) */}
                  <div className="md:col-span-5 bg-slate-950/45 p-6 rounded-2xl border border-white/5 flex flex-col gap-4">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider font-mono">Parameters Configuration</span>
                    
                    {aiTool === "content" && (
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold uppercase text-slate-400">Target Topic Title</label>
                          <input
                            type="text"
                            value={aiTopic}
                            onChange={(e) => setAiTopic(e.target.value)}
                            className="glass-input px-3.5 py-2 text-xs focus:outline-none"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold uppercase text-slate-400">Approx Length Words</label>
                          <select
                            value={aiWordCount}
                            onChange={(e) => setAiWordCount(e.target.value)}
                            className="glass-input px-3.5 py-2 text-xs focus:outline-none"
                          >
                            <option>400</option>
                            <option>800</option>
                            <option>1200</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {aiTool === "seo" && (
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold uppercase text-slate-400">Audit Page Route</label>
                          <select
                            value={aiSeoPage}
                            onChange={(e) => setAiSeoPage(e.target.value)}
                            className="glass-input px-3.5 py-2 text-xs focus:outline-none"
                          >
                            <option>/</option>
                            <option>/about</option>
                            <option>/services</option>
                            <option>/portfolio</option>
                            <option>/pricing</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {aiTool === "proposal" && (
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold uppercase text-slate-400">Client Corporate Name</label>
                          <input
                            type="text"
                            value={aiClientName}
                            onChange={(e) => setAiClientName(e.target.value)}
                            className="glass-input px-3.5 py-2 text-xs focus:outline-none"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold uppercase text-slate-400">Software Scope Project Type</label>
                          <input
                            type="text"
                            value={aiProjectType}
                            onChange={(e) => setAiProjectType(e.target.value)}
                            className="glass-input px-3.5 py-2 text-xs focus:outline-none"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold uppercase text-slate-400">Timeline Scope (Weeks)</label>
                          <input
                            type="number"
                            value={aiWeeks}
                            onChange={(e) => setAiWeeks(e.target.value)}
                            className="glass-input px-3.5 py-2 text-xs focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {aiTool === "faq" && (
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold uppercase text-slate-400">Service Category Scope</label>
                          <select
                            value={aiFaqCategory}
                            onChange={(e) => setAiFaqCategory(e.target.value)}
                            className="glass-input px-3.5 py-2 text-xs focus:outline-none"
                          >
                            <option>AI Chatbot Development</option>
                            <option>Website Design Retainers</option>
                            <option>Google Ads & PPC Campaigns</option>
                            <option>Next.js 15 Migrations</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {aiTool === "image" && (
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold uppercase text-slate-400">Visual Theme Color Palette</label>
                          <select
                            value={aiImgTheme}
                            onChange={(e) => setAiImgTheme(e.target.value)}
                            className="glass-input px-3.5 py-2 text-xs focus:outline-none"
                          >
                            <option>Gold Gradient Glow</option>
                            <option>Royal Blue Glow</option>
                          </select>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleAiGenerate}
                      disabled={aiLoading}
                      className="w-full py-3 bg-accent hover:bg-accent-hover disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all mt-2 shadow-lg cursor-pointer"
                    >
                      {aiLoading ? "Triggering AI Assistant Sockets..." : "Invoke Generator Node"}
                    </button>
                  </div>

                  {/* AI Output Console (Right 7) */}
                  <div className="md:col-span-7 flex flex-col gap-4">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider font-mono">Assistant Compilation Terminal</span>
                    
                    <div className="bg-slate-950/70 border border-white/5 rounded-2xl p-6 min-h-[280px] flex flex-col justify-center">
                      {aiLoading && (
                        <div className="flex flex-col items-center gap-3 text-slate-500 text-xs text-center">
                          <Loader2 className="w-8 h-8 animate-spin text-secondary" />
                          <span>Generating abstract nodes & drafting content tokens...</span>
                        </div>
                      )}

                      {!aiLoading && !aiResult && (
                        <div className="text-center text-slate-500 text-xs py-8">
                          Configure parameters on the left and invoke generator node to see output content.
                        </div>
                      )}

                      {!aiLoading && aiResult && (
                        <div className="animate-fade-in flex flex-col gap-4 text-xs leading-relaxed">
                          {aiTool === "content" && (
                            <div className="flex flex-col gap-3">
                              <div className="border-b border-white/5 pb-2">
                                <span className="text-[9px] uppercase font-bold text-secondary">Generated Title</span>
                                <h4 className="text-white text-sm font-bold">{aiResult.title}</h4>
                              </div>
                              <div>
                                <span className="text-[9px] uppercase font-bold text-secondary">Markdown Content Draft</span>
                                <pre className="bg-slate-900 border border-white/5 rounded-xl p-4 text-[10px] text-slate-300 font-mono overflow-x-auto whitespace-pre-wrap">
                                  {aiResult.content}
                                </pre>
                              </div>
                              <button
                                onClick={() => {
                                  alert("Mock action: Content successfully populated into Blogs CMS database draft.");
                                }}
                                className="px-4 py-2 border border-white/10 hover:border-white/20 text-white rounded-xl text-[10px] font-bold transition-all text-center self-end animate-pulse"
                              >
                                Save Draft to Blog CMS
                              </button>
                            </div>
                          )}

                          {aiTool === "seo" && (
                            <div className="flex flex-col gap-3 font-mono text-[10px]">
                              <div>
                                <span className="text-[9px] uppercase font-bold text-secondary font-sans block mb-1">Recommended Title</span>
                                <span className="bg-slate-900 px-3 py-2 rounded border border-white/5 block text-slate-300">{aiResult.title}</span>
                              </div>
                              <div>
                                <span className="text-[9px] uppercase font-bold text-secondary font-sans block mb-1">Recommended Description</span>
                                <span className="bg-slate-900 px-3 py-2 rounded border border-white/5 block text-slate-300">{aiResult.description}</span>
                              </div>
                              <div>
                                <span className="text-[9px] uppercase font-bold text-secondary font-sans block mb-1">Keywords Tags</span>
                                <span className="bg-slate-900 px-3 py-2 rounded border border-white/5 block text-slate-300">{aiResult.keywords}</span>
                              </div>
                              <div>
                                <span className="text-[9px] uppercase font-bold text-secondary font-sans block mb-1">Suggested JSON-LD Metadata Schema</span>
                                <pre className="bg-slate-900 p-3 rounded border border-white/5 text-slate-400 overflow-x-auto">{aiResult.schema}</pre>
                              </div>
                            </div>
                          )}

                          {aiTool === "proposal" && (
                            <div className="flex flex-col gap-3">
                              <pre className="bg-slate-900 border border-white/5 rounded-xl p-4 text-[10px] text-slate-300 font-mono overflow-x-auto whitespace-pre-wrap">
                                {aiResult}
                              </pre>
                              <button
                                onClick={() => {
                                  alert("Mock action: Contract generated and shared to Client Portal.");
                                }}
                                className="px-4 py-2 bg-accent text-white rounded-xl text-[10px] font-bold transition-all text-center self-end animate-pulse"
                              >
                                Deploy proposal to Client Portal
                              </button>
                            </div>
                          )}

                          {aiTool === "faq" && (
                            <div className="flex flex-col gap-4">
                              {aiResult.map((item: any, idx: number) => (
                                <div key={idx} className="p-3 bg-slate-900 border border-white/5 rounded-xl flex flex-col gap-1">
                                  <h4 className="text-white font-bold">{item.q}</h4>
                                  <p className="text-slate-400 text-[11px]">{item.a}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {aiTool === "image" && (
                            <div className="flex flex-col gap-4">
                              <div className="flex items-center justify-center p-2 rounded-xl bg-slate-900 border border-white/5">
                                <div dangerouslySetInnerHTML={{ __html: aiResult }} className="w-full max-w-[400px]" />
                              </div>
                              <div className="text-[10px] text-slate-500 text-center font-mono">
                                Copy the SVG vector placeholder to utilize in service header columns.
                              </div>
                            </div>
                          )}

                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}
      </div>

      {/* Dynamic Edit/Create MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-slate-900 border border-white/15 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-scale-up">
            {/* Header */}
            <div className="bg-slate-950 px-6 py-4 flex items-center justify-between border-b border-white/5">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {editingItem ? "Update Record" : "Add New Entry"} ({modalType})
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-500 hover:text-white p-1 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form body */}
            <form onSubmit={handleFormSubmit} className="p-6 flex flex-col gap-4 overflow-y-auto max-h-[75vh]">
              
              {/* Conditional Fields based on modal type */}
              {modalType === "service" && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Title</label>
                    <input
                      type="text"
                      required
                      value={formFields.title || ""}
                      onChange={(e) => setFormFields({ ...formFields, title: e.target.value })}
                      className="glass-input px-3.5 py-2 text-xs focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Slug</label>
                    <input
                      type="text"
                      required
                      value={formFields.slug || ""}
                      onChange={(e) => setFormFields({ ...formFields, slug: e.target.value })}
                      className="glass-input px-3.5 py-2 text-xs focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Description</label>
                    <textarea
                      required
                      rows={2}
                      value={formFields.description || ""}
                      onChange={(e) => setFormFields({ ...formFields, description: e.target.value })}
                      className="glass-input px-3.5 py-2 text-xs focus:outline-none resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Icon (Globe/Cpu/Palette/Search)</label>
                      <input
                        type="text"
                        required
                        value={formFields.icon || ""}
                        onChange={(e) => setFormFields({ ...formFields, icon: e.target.value })}
                        className="glass-input px-3.5 py-2 text-xs focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Pricing Limits</label>
                      <input
                        type="text"
                        required
                        value={formFields.pricing || ""}
                        onChange={(e) => setFormFields({ ...formFields, pricing: e.target.value })}
                        className="glass-input px-3.5 py-2 text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Detailed Description</label>
                    <textarea
                      required
                      rows={3}
                      value={formFields.longDescription || ""}
                      onChange={(e) => setFormFields({ ...formFields, longDescription: e.target.value })}
                      className="glass-input px-3.5 py-2 text-xs focus:outline-none resize-none"
                    />
                  </div>
                </>
              )}

              {modalType === "project" && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Project Title</label>
                    <input
                      type="text"
                      required
                      value={formFields.title || ""}
                      onChange={(e) => setFormFields({ ...formFields, title: e.target.value })}
                      className="glass-input px-3.5 py-2 text-xs focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Category</label>
                      <input
                        type="text"
                        required
                        value={formFields.category || ""}
                        onChange={(e) => setFormFields({ ...formFields, category: e.target.value })}
                        className="glass-input px-3.5 py-2 text-xs focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Duration</label>
                      <input
                        type="text"
                        required
                        value={formFields.duration || ""}
                        onChange={(e) => setFormFields({ ...formFields, duration: e.target.value })}
                        className="glass-input px-3.5 py-2 text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Description</label>
                    <textarea
                      required
                      rows={3}
                      value={formFields.description || ""}
                      onChange={(e) => setFormFields({ ...formFields, description: e.target.value })}
                      className="glass-input px-3.5 py-2 text-xs focus:outline-none resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Client Name</label>
                      <input
                        type="text"
                        required
                        value={formFields.client || ""}
                        onChange={(e) => setFormFields({ ...formFields, client: e.target.value })}
                        className="glass-input px-3.5 py-2 text-xs focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Link URL</label>
                      <input
                        type="text"
                        required
                        value={formFields.link || ""}
                        onChange={(e) => setFormFields({ ...formFields, link: e.target.value })}
                        className="glass-input px-3.5 py-2 text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                </>
              )}

              {modalType === "blog" && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Article Title</label>
                    <input
                      type="text"
                      required
                      value={formFields.title || ""}
                      onChange={(e) => setFormFields({ ...formFields, title: e.target.value })}
                      className="glass-input px-3.5 py-2 text-xs focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Author Name</label>
                      <input
                        type="text"
                        required
                        value={formFields.author || ""}
                        onChange={(e) => setFormFields({ ...formFields, author: e.target.value })}
                        className="glass-input px-3.5 py-2 text-xs focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Reading Time</label>
                      <input
                        type="text"
                        required
                        value={formFields.readTime || ""}
                        onChange={(e) => setFormFields({ ...formFields, readTime: e.target.value })}
                        className="glass-input px-3.5 py-2 text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Excerpt summary</label>
                    <textarea
                      required
                      rows={2}
                      value={formFields.excerpt || ""}
                      onChange={(e) => setFormFields({ ...formFields, excerpt: e.target.value })}
                      className="glass-input px-3.5 py-2 text-xs focus:outline-none resize-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Article Content markdown</label>
                    <textarea
                      required
                      rows={6}
                      value={formFields.content || ""}
                      onChange={(e) => setFormFields({ ...formFields, content: e.target.value })}
                      className="glass-input px-3.5 py-2.5 text-xs focus:outline-none resize-none"
                    />
                  </div>
                </>
              )}

              {modalType === "testimonial" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Client Name</label>
                      <input
                        type="text"
                        required
                        value={formFields.name || ""}
                        onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
                        className="glass-input px-3.5 py-2 text-xs focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Company Name</label>
                      <input
                        type="text"
                        required
                        value={formFields.company || ""}
                        onChange={(e) => setFormFields({ ...formFields, company: e.target.value })}
                        className="glass-input px-3.5 py-2 text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Designation Role</label>
                      <input
                        type="text"
                        required
                        value={formFields.role || ""}
                        onChange={(e) => setFormFields({ ...formFields, role: e.target.value })}
                        className="glass-input px-3.5 py-2 text-xs focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Avatar initials</label>
                      <input
                        type="text"
                        required
                        value={formFields.avatar || ""}
                        onChange={(e) => setFormFields({ ...formFields, avatar: e.target.value })}
                        className="glass-input px-3.5 py-2 text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Review Feedback</label>
                    <textarea
                      required
                      rows={3}
                      value={formFields.content || ""}
                      onChange={(e) => setFormFields({ ...formFields, content: e.target.value })}
                      className="glass-input px-3.5 py-2 text-xs focus:outline-none resize-none"
                    />
                  </div>
                </>
              )}

              {modalType === "seo" && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Page Route</label>
                    <input
                      type="text"
                      disabled
                      value={formFields.page || ""}
                      className="glass-input px-3.5 py-2 text-xs opacity-50 focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Meta Title</label>
                    <input
                      type="text"
                      required
                      value={formFields.title || ""}
                      onChange={(e) => setFormFields({ ...formFields, title: e.target.value })}
                      className="glass-input px-3.5 py-2 text-xs focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Meta Description</label>
                    <textarea
                      required
                      rows={3}
                      value={formFields.description || ""}
                      onChange={(e) => setFormFields({ ...formFields, description: e.target.value })}
                      className="glass-input px-3.5 py-2 text-xs focus:outline-none resize-none"
                    />
                  </div>
                </>
              )}

              {/* Submit Buttons */}
              <div className="flex items-center gap-3 border-t border-white/5 pt-4 mt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-accent hover:bg-accent-hover text-white rounded-xl text-xs font-semibold transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
