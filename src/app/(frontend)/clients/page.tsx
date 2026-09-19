import { Star, Quote, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Our Clients & Partners | Success Testimonials | Aratha",
  description: "Read success metrics and project testimonials from startups and enterprises that scaled operations using Aratha digital builds.",
};

export default function ClientsPage() {
  const testimonials = [
    {
      company: "Apex Healthcare Platforms",
      quote: "Building a HIPAA-compliant booking application is no small task. The Aratha team delivered a robust, secure, and beautiful patient portal. Our clinic operations are running smoother than ever.",
      author: "Dr. David Carter",
      role: "Chief Medical Officer",
      rating: 5,
      metric: "+140% Booking Efficiency"
    },
    {
      company: "Horizon Real Estate Group",
      quote: "Their Next.js headless migration boosted our organic search traffic by over 80% in the first quarter itself. Dynamic pages load instantly, and sitemap indexing works like a charm.",
      author: "Marcus Vance",
      role: "VP of Product Growth",
      rating: 5,
      metric: "80% Traffic Increase"
    },
    {
      company: "Zenith LMS Systems",
      quote: "We needed a custom learning management console that supported massive video assets and student analytics database. Aratha delivered a flawless layout with clean interfaces.",
      author: "Elena Rostova",
      role: "Founder & CTO",
      rating: 5,
      metric: "50k Active Students"
    }
  ];

  return (
    <div className="relative w-full py-16 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Decorative Blur */}
      <div className="glow-blob bg-accent top-10 right-10 opacity-15" />

      {/* Header */}
      <div className="text-center flex flex-col items-center gap-4 mb-16 relative z-10">
        <span className="text-xs font-bold uppercase tracking-widest text-accent">Client Success Stories</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mt-1">
          Trust & <span className="text-gradient-gold">Client Results</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xl leading-relaxed mt-2">
          From clinic patient portals to high-performance real estate indexes, check out the benchmarks achieved by our client companies.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {testimonials.map((test, index) => (
          <div key={index} className="glass-card p-8 flex flex-col justify-between min-h-[380px]">
            <div className="flex flex-col gap-6">
              {/* Rating */}
              <div className="flex gap-1 text-secondary">
                {[...Array(test.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-secondary" />
                ))}
              </div>

              {/* Quote */}
              <div className="relative">
                <Quote className="absolute -top-3.5 -left-3.5 w-8 h-8 text-white/5 pointer-events-none" />
                <p className="text-slate-300 text-xs leading-relaxed italic">
                  "{test.quote}"
                </p>
              </div>
            </div>

            {/* Author & Metric details */}
            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-4">
              <div className="flex justify-between items-center bg-slate-950/50 border border-white/5 p-3.5 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-slate-500">Key Metric</span>
                <span className="text-xs font-extrabold text-secondary font-mono flex items-center gap-1">
                  {test.metric} <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
              
              <div>
                <h4 className="text-sm font-bold text-white">{test.author}</h4>
                <p className="text-slate-400 text-[10px]">{test.role} &bull; {test.company}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust builder banner */}
      <div className="mt-16 text-center max-w-2xl mx-auto border border-white/10 rounded-2xl p-6 bg-slate-900/50 backdrop-blur-xl relative z-10">
        <h3 className="text-white text-sm font-bold">Interested in tracking your own project build?</h3>
        <p className="text-slate-400 text-[11px] mt-1">
          Each Aratha client receives private portal credentials to check milestone timelines, task checklists, and pay invoices online.
        </p>
        <Link
          href="/portal"
          className="inline-flex items-center gap-1 px-4 py-2 mt-4 bg-accent hover:bg-accent-hover text-white text-xs font-bold rounded-xl transition-colors"
        >
          <span>Explore Client Portal</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
