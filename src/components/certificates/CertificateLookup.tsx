"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, CheckCircle2, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

export default function CertificateLookup() {
  const router = useRouter();
  const [exactIdInput, setExactIdInput] = useState("");
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

  const handleDirectVerification = (e: React.FormEvent) => {
    e.preventDefault();
    const id = exactIdInput.trim().toUpperCase();
    if (!id) {
      setError("Please enter a Certificate ID to verify.");
      return;
    }
    setError("");
    setSearching(true);
    router.push(`/certificates/${encodeURIComponent(id)}`);
  };

  return (
    <div className="w-full">
      {/* Verification Box */}
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-cyan-950/40 p-8 sm:p-12 shadow-[0_0_50px_rgba(0,229,255,0.15)] neu-flat">
        <div className="absolute -top-24 -right-24 h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-60 w-60 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 text-cyan-400 font-semibold text-sm mb-3">
            <ShieldCheck className="h-5 w-5 text-cyan-400" />
            <span>Official Credential Verification</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Verify a Workshop Certificate
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Enter the unique Certificate ID issued by Aratha (e.g., <code className="text-cyan-300 font-mono font-bold">AR-WS-2026-101</code>) to confirm authenticity and view the verified digital credential.
          </p>

          <form onSubmit={handleDirectVerification} className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={exactIdInput}
                onChange={(e) => {
                  setExactIdInput(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Enter Certificate ID (e.g. AR-WS-2026-101)..."
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 pl-12 pr-4 py-4 text-white placeholder-slate-500 text-sm focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={searching}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-7 py-4 text-sm font-bold text-slate-950 transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] disabled:opacity-50 shrink-0"
            >
              {searching ? "Verifying..." : "Verify Certificate"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {error && (
            <div className="mt-3 flex items-center gap-2 text-xs font-medium text-rose-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-400 border-t border-white/5 pt-4">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-cyan-400" /> Tamper-Proof Cryptographic ID
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-cyan-400" /> 100% Online Verifiable
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-cyan-400" /> Print & Share Enabled
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
