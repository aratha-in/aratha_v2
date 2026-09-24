"use client";

import { useState } from "react";
import { Sparkles, Cpu, Clock, DollarSign, CheckCircle2, Loader2, ArrowRight } from "lucide-react";

export default function AiProjectScoper() {
  const [projectIdea, setProjectIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [scopeResult, setScopeResult] = useState<any>(null);

  const handleGenerateScope = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectIdea.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "scope",
          projectIdea: projectIdea.trim(),
        }),
      });
      const data = await res.json();
      setScopeResult(data);
    } catch {
      console.error("AI Scope generation error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full glass-panel border-white/10 p-6 md:p-10 flex flex-col gap-6 relative overflow-hidden shadow-2xl rounded-3xl">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 font-mono flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          AI Architecture Scoper
        </span>
        <h3 className="text-2xl font-extrabold text-white tracking-tight">
          Describe Your App Concept & Get an <span className="text-gradient-gold">Instant AI Scope</span>
        </h3>
        <p className="text-slate-400 text-xs leading-relaxed max-w-2xl">
          Enter your software concept below. Our AI engine will analyze your requirements, compile the recommended tech stack, estimate the delivery timeline, and project transparent costs.
        </p>
      </div>

      <form onSubmit={handleGenerateScope} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          required
          placeholder="e.g. Build a telemedicine scheduling app with video consultations..."
          value={projectIdea}
          onChange={(e) => setProjectIdea(e.target.value)}
          disabled={loading}
          className="neu-input flex-1 py-3 px-4 text-xs text-white placeholder-slate-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading || !projectIdea.trim()}
          className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#3B82F6] text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 shrink-0 disabled:opacity-50 hover:scale-[1.02] transition-transform"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
              <span>Generating Scope...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Generate AI Scope</span>
            </>
          )}
        </button>
      </form>

      {/* Rendered AI Scope Output Card */}
      {scopeResult && (
        <div className="mt-4 p-6 bg-slate-950/90 border border-cyan-500/30 rounded-2xl flex flex-col gap-6 animate-fade-in font-sans">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-2">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              {scopeResult.title}
            </h4>
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">
              Lighthouse 99 Approved
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] uppercase font-bold text-slate-500 font-mono">Recommended Stack</span>
              <div className="flex flex-wrap gap-2">
                {scopeResult.recommendedStack.map((tech: string, i: number) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 text-xs font-semibold text-slate-200">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5 flex flex-col gap-1">
                <span className="text-[9px] uppercase font-bold text-slate-500 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" /> Timeline
                </span>
                <span className="text-sm font-extrabold text-white">{scopeResult.estimatedWeeks}</span>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5 flex flex-col gap-1">
                <span className="text-[9px] uppercase font-bold text-slate-500 font-mono flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-emerald-400" /> Cost Range
                </span>
                <span className="text-sm font-extrabold text-emerald-400">{scopeResult.estimatedCost}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase font-bold text-slate-500 font-mono">Key Features Breakdown</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {scopeResult.keyFeatures.map((feat: string, i: number) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex justify-end">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-xs font-extrabold shadow-md hover:scale-[1.02] transition-transform"
            >
              <span>Submit Scope for Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
