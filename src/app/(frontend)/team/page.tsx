import { ExternalLink, Globe } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Meet the Team | Software Engineers & UI Designers | Aratha",
  description: "Meet the engineering founders, senior UI designers, and digital marketing strategists directing software projects at Aratha.",
};

export default function TeamPage() {
  const team = [
    {
      name: "Vishnu Mustapure",
      role: "Managing Partner",
      title: "Managing Partner",
      image: "/team/vishnu-mustapure.webp",
      bio: "Directing executive vision, product architecture, and enterprise software engineering initiatives.",
      label: "VM",
      socials: { linkedin: "https://linkedin.com", github: "https://github.com", website: "https://aratha.in" }
    },
    {
      name: "Yash Gupta",
      role: "Co-Founder",
      title: "Co-Founder & Technical Lead",
      image: "/team/yash-gupta.webp",
      bio: "Co-Founder spearheading application architecture, Next.js performance optimizations, and full-stack engineering.",
      label: "YG",
      socials: { linkedin: "https://linkedin.com", github: "https://github.com" }
    },
    {
      name: "Jaayam Anusha Anand",
      role: "COO",
      title: "Chief Operating Officer",
      image: "/team/jaayam-anusha-anand.webp",
      bio: "Leading cross-functional operations, delivery management, and organizational strategy.",
      label: "JA",
      socials: { linkedin: "https://linkedin.com", website: "https://aratha.in" }
    },
    {
      name: "Prashant Kumar",
      role: "Operations + Account Manager",
      title: "Operations + Account Manager",
      image: "/team/prashant-kumar.webp",
      bio: "Managing client communications, project milestone tracking, and operational efficiency.",
      label: "PK",
      socials: { linkedin: "https://linkedin.com" }
    },
    {
      name: "Ravi Kumar",
      role: "Digital Marketing + Ads Manager",
      title: "Digital Marketing + Ads Manager",
      image: "/team/ravi-kumar.webp",
      bio: "Directing growth acquisition channels, Meta & Google PPC advertising, and technical SEO campaigns.",
      label: "RK",
      socials: { linkedin: "https://linkedin.com", website: "https://aratha.in" }
    },
    {
      name: "Vinusha Anugandula",
      role: "Front-End Developer",
      title: "Front-End Developer",
      image: "/team/vinusha-anugandula.webp",
      bio: "Crafting modern, responsive user interfaces, fluid animations, and accessible component architectures.",
      label: "VA",
      socials: { linkedin: "https://linkedin.com", github: "https://github.com" }
    },
    {
      name: "Bakkanolla Harinath Reddy",
      role: "Web Developer",
      title: "Web Developer",
      image: "/team/bakkanolla-harinath-reddy.webp",
      bio: "Building robust web platforms, API integrations, and database architectures.",
      label: "BH",
      socials: { linkedin: "https://linkedin.com", github: "https://github.com" }
    },
    {
      name: "Kaushik Rohit Sharma",
      role: "Financial Consultant",
      title: "Financial Consultant",
      image: "/team/kaushik-rohit-sharma.webp",
      bio: "Providing strategic financial advisory, capital allocation guidance, and fiscal planning for enterprise operations.",
      label: "KS",
      socials: { linkedin: "https://linkedin.com", website: "https://aratha.in" }
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
        {team.map((member, index) => (
          <div
            key={index}
            className="glass-card p-5 flex flex-col justify-between group hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/5 relative overflow-hidden"
          >
            <div>
              {/* Prominent Portrait / Avatar Showcase */}
              <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden bg-gradient-to-b from-slate-800/80 to-slate-900 border border-white/10 mb-4 flex items-center justify-center">
                {'image' in member && member.image ? (
                  <>
                    <Image
                      src={member.image as string}
                      alt={member.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  </>
                ) : (
                  <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 overflow-hidden">
                    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#00E5FF_1px,transparent_1px)] [background-size:16px_16px]" />
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-accent/20 to-secondary/20 border border-white/10 flex items-center justify-center shadow-inner relative z-10 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl font-black text-white tracking-widest">{member.label}</span>
                    </div>
                  </div>
                )}
                {/* Floating Role Badge */}
                <div className="absolute top-3 left-3 z-20">
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-accent font-bold uppercase tracking-wider border border-accent/30 shadow-md">
                    {member.role}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-white tracking-tight group-hover:text-accent transition-colors">
                  {member.name}
                </h3>
                {member.title !== member.role && (
                  <span className="text-[11px] text-slate-300 font-medium block mt-0.5 leading-snug">
                    {member.title}
                  </span>
                )}
                <p className="text-slate-400 text-xs mt-2.5 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3.5 border-t border-white/5 pt-3.5 mt-5">
              {member.socials.linkedin && (
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {member.socials.github && (
                <a
                  href={member.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {member.socials.website && (
                <a
                  href={member.socials.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-white transition-colors"
                  aria-label="Website"
                >
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
