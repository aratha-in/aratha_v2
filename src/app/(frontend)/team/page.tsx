import { ExternalLink, Globe } from "lucide-react";

export const metadata = {
  title: "Meet the Team | Software Engineers & UI Designers | Aratha",
  description: "Meet the engineering founders, senior UI designers, and digital marketing strategists directing software projects at Aratha.",
};

export default function TeamPage() {
  const team = [
    {
      name: "Siddharth Verma",
      role: "Co-Founder & Scoping Director",
      bio: "12+ years directing SaaS product architecture and cloud migration scoping for enterprise partners.",
      socials: { linkedin: "#", github: "#", website: "#" }
    },
    {
      name: "Nikhil Kamath",
      role: "Lead Software Architect",
      bio: "Core engineer specialized in Next.js edge builds, PostgreSQL database tuning, and Docker integrations.",
      socials: { linkedin: "#", github: "#" }
    },
    {
      name: "Ananya Sen",
      role: "Design Studio Lead",
      bio: "Figma layout artist composer of custom design systems, branding asset kits, and luxury aesthetics interfaces.",
      socials: { linkedin: "#", website: "#" }
    },
    {
      name: "Vikram Seth",
      role: "Search Strategy Lead",
      bio: "Specialist in Schema structured data markup audits, local SEO redirects management, and PPC ad loops.",
      socials: { linkedin: "#", github: "#" }
    }
  ];

  return (
    <div className="relative w-full py-16 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Decorative Blob */}
      <div className="glow-blob bg-accent bottom-10 left-10 opacity-15" />

      {/* Header */}
      <div className="text-center flex flex-col items-center gap-4 mb-16 relative z-10">
        <span className="text-xs font-bold uppercase tracking-widest text-accent">Agency Crew</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mt-1">
          Meet <span className="text-gradient-gold">Our Team</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xl leading-relaxed mt-2">
          A dedicated crew of engineers, Figma visual artists, and search performance architects committed to building world-class platforms.
        </p>
      </div>

      {/* Team grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {team.map((member, index) => (
          <div key={index} className="glass-card p-6 flex flex-col justify-between min-h-[300px]">
            <div className="flex flex-col gap-4">
              {/* Profile Initials Placeholder (Visual & Premium) */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 border border-white/10 flex items-center justify-center font-extrabold text-white text-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-secondary/10" />
                <span className="z-10">{member.name.split(" ").map(n => n[0]).join("")}</span>
              </div>
              
              <div>
                <h3 className="text-base font-bold text-white">{member.name}</h3>
                <span className="text-[10px] text-secondary font-bold uppercase tracking-wider block mt-0.5">{member.role}</span>
                <p className="text-slate-400 text-xs mt-3 leading-relaxed">{member.bio}</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3.5 border-t border-white/5 pt-4 mt-6">
              {member.socials.linkedin && (
                <a href={member.socials.linkedin} className="text-slate-500 hover:text-white transition-colors" aria-label="LinkedIn">
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {member.socials.github && (
                <a href={member.socials.github} className="text-slate-500 hover:text-white transition-colors" aria-label="GitHub">
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {member.socials.website && (
                <a href={member.socials.website} className="text-slate-500 hover:text-white transition-colors" aria-label="Website">
                  <Globe className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
