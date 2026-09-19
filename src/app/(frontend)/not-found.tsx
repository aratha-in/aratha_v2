import Link from "next/link";
import { AlertTriangle, ArrowRight, Home } from "lucide-react";

export const metadata = {
  title: "Page Not Found | Aratha | Your Partner in Market Intelligence",
  description: "The page you are looking for does not exist. Return to the Aratha home page.",
};

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-6 relative py-16">
      {/* Glow blobs */}
      <div className="glow-blob bg-accent top-1/3 left-1/3 opacity-15" />
      <div className="glow-blob bg-secondary bottom-1/3 right-1/3 opacity-10" />

      <div className="w-full max-w-md text-center flex flex-col items-center gap-6 relative z-10">
        {/* Visual 404 badge */}
        <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent rounded-3xl" />
          <AlertTriangle className="w-10 h-10 text-secondary" />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-secondary font-mono">Error Code 404</span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
            Routing Node Not Found
          </h1>
          <p className="text-slate-400 text-xs leading-relaxed max-w-sm mt-1">
            The database sitemap path you requested does not exist or has been compiled under a different namespace.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full mt-4">
          <Link
            href="/"
            className="w-full py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-bold transition-all shadow-lg shadow-accent/15 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/contact"
            className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold border border-white/10 hover:border-white/20 text-xs transition-all flex items-center justify-center gap-1.5"
          >
            <span>Contact Support Desk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
