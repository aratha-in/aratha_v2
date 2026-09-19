import { Sparkles, Users, Award, ShieldAlert, History } from "lucide-react";

export const metadata = {
  title: "About Us | Product Strategy & Software Engineering | Aratha",
  description: "Learn about the team, timeline, and philosophy of Aratha, a premium digital engineering agency.",
};

export default function AboutPage() {
  const team = [
    { name: "Aravind Nair", role: "Co-Founder & CTO", bio: "Next.js core contributor and architecture expert.", label: "AN" },
    { name: "Anjali Sharma", role: "Design Director", bio: "Ex-Meta UI/UX specialist focused on conversion systems.", label: "AS" },
    { name: "Kiran Singhal", role: "Lead Systems Architect", bio: "DevOps and cloud engineer specializing in AWS systems.", label: "KS" },
    { name: "Rohit Verma", role: "SEO Strategy Director", bio: "Expert in search intent analytics and algorithm optimizations.", label: "RV" }
  ];

  const values = [
    { title: "Visual Excellence", desc: "We design premium interfaces that command instant trust.", icon: <Sparkles className="w-5 h-5 text-secondary" /> },
    { title: "High Performance", desc: "No templates. We optimize loading benchmarks to sub-seconds.", icon: <Award className="w-5 h-5 text-secondary" /> },
    { title: "Security First", desc: "Encrypted transactions, isolated containers, and daily cloud backup schedules.", icon: <ShieldAlert className="w-5 h-5 text-secondary" /> }
  ];

  return (
    <div className="relative w-full py-16 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Decorative Blur Blob */}
      <div className="glow-blob bg-accent -top-10 -left-10" />

      {/* Header */}
      <div className="text-center flex flex-col items-center gap-4 mb-20 z-10 relative">
        <span className="text-xs font-bold uppercase tracking-widest text-accent">Our Agency</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Engineering the <span className="text-gradient-gold">Digital Future</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xl leading-relaxed mt-2">
          Aratha is a modern software engineering and digital marketing agency. We design and build premium web applications that scale seamlessly.
        </p>
      </div>

      {/* Corporate Story */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 z-10 relative">
        <div className="flex flex-col gap-6 text-slate-300 text-sm leading-relaxed">
          <h2 className="text-2xl font-bold text-white tracking-tight">Our Philosophy</h2>
          <p>
            Founded in Bangalore, Aratha was built with a single focus: **to eliminate template constraints in web software**. We noticed corporate websites were bloated with legacy builders, causing page load times over 5 seconds and poor SEO indexing.
          </p>
          <p>
            By leveraging decoupled headless architectures (like Next.js and Payload CMS), we construct applications that are highly customizable, secure, and fast.
          </p>
        </div>
        <div className="neu-flat p-8 border border-white/10 relative flex flex-col justify-between min-h-[220px]">
          <div>
            <span className="text-3xl font-extrabold text-emerald-400 font-mono">2025</span>
            <h4 className="text-white text-base font-semibold mt-1">Agency Founded</h4>
            <p className="text-slate-400 text-xs mt-2 leading-relaxed">
              Aratha was founded in 2025 in Bangalore. Today, we deliver market intelligence, software engineering, and cloud hostings for clients globally.
            </p>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="mb-24 z-10 relative">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-white">Our Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v) => (
            <div key={v.title} className="glass-card p-6 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center">
                {v.icon}
              </div>
              <h3 className="text-base font-bold text-white">{v.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Spotlights */}
      <section className="z-10 relative">
        <div className="text-center flex flex-col items-center gap-2 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-[10px] uppercase font-bold tracking-widest text-slate-400 border border-white/5">
            <Users className="w-3.5 h-3.5" /> Core Team
          </div>
          <h2 className="text-2xl font-bold text-white mt-2">Executive Leadership</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <div key={member.name} className="glass-card p-6 flex flex-col gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-accent text-white font-extrabold text-base flex items-center justify-center mx-auto shadow-md">
                {member.label}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{member.name}</h3>
                <span className="text-[10px] text-secondary font-semibold uppercase tracking-wider block mt-0.5">
                  {member.role}
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mt-1">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
