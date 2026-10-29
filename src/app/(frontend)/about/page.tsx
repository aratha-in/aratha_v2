import { Sparkles, Users, Award, ShieldAlert, History } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "About Us | Product Strategy & Software Engineering | Aratha",
  description: "Learn about the team, timeline, and philosophy of Aratha, a premium digital engineering agency.",
};

export default function AboutPage() {
  const team = [
    { name: "Vishnu Mustapure", role: "Managing Partner", image: "/team/vishnu-mustapure.webp", bio: "Managing Partner directing product architecture, executive vision, and corporate partnerships.", label: "VM" },
    { name: "Yash Gupta", role: "Co-Founder", image: "/team/yash-gupta.webp", bio: "Co-Founder leading core software architecture, Next.js frameworks, and technical development.", label: "YG" },
    { name: "Jaayam Anusha Anand", role: "COO", image: "/team/jaayam-anusha-anand.webp", bio: "Chief Operating Officer leading operations and organizational strategy.", label: "JA" },
    { name: "Prashant Kumar", role: "Operations + Account Manager", image: "/team/prashant-kumar.webp", bio: "Managing client partnerships, delivery sprints, and operational workflows.", label: "PK" },
    { name: "Ravi Kumar", role: "Digital Marketing + Ads Manager", image: "/team/ravi-kumar.webp", bio: "Directing search marketing, paid ad funnels, and performance optimization.", label: "RK" },
    { name: "Vinusha Anugandula", role: "Front-End Developer", image: "/team/vinusha-anugandula.webp", bio: "Specializing in responsive UI systems, component libraries, and interactive design.", label: "VA" },
    { name: "Bakkanolla Harinath Reddy", role: "Web Developer", image: "/team/bakkanolla-harinath-reddy.webp", bio: "Developing robust full-stack applications, API integrations, and database schemas.", label: "BH" },
    { name: "Kaushik Rohit Sharma", role: "Financial Consultant", image: "/team/kaushik-rohit-sharma.webp", bio: "Providing strategic financial advisory, capital allocation guidance, and fiscal planning.", label: "KS" }
  ];

  const values = [
    { title: "Visual Excellence", desc: "We design premium interfaces that command instant trust.", icon: <Sparkles className="w-5 h-5 text-secondary" /> },
    { title: "High Performance", desc: "No templates. We optimize loading benchmarks to sub-seconds.", icon: <Award className="w-5 h-5 text-secondary" /> },
    { title: "Security First", desc: "Encrypted transactions, isolated containers, and daily cloud backup schedules.", icon: <ShieldAlert className="w-5 h-5 text-secondary" /> }
  ];

  return (
    <div className="relative w-full py-16 px-6 max-w-7xl mx-auto overflow-hidden" style={{ zoom: 0.9 }}>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div
              key={member.name}
              className="glass-card p-5 flex flex-col justify-between group hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/5 relative overflow-hidden"
            >
              <div>
                {/* Prominent Portrait / Avatar Showcase */}
                <div className="relative w-full h-60 rounded-xl overflow-hidden bg-gradient-to-b from-slate-800/80 to-slate-900 border border-white/10 mb-4 flex items-center justify-center">
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
                      <div className="w-18 h-18 rounded-2xl bg-gradient-to-tr from-accent/20 to-secondary/20 border border-white/10 flex items-center justify-center shadow-inner relative z-10 group-hover:scale-110 transition-transform duration-300">
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
                  <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
