"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Award, CheckCircle2, ArrowRight, ShieldCheck, Calendar, User, ExternalLink } from "lucide-react";
import type { WorkshopCertificate } from "@/lib/db";

interface CertificateLookupProps {
  initialCertificates: WorkshopCertificate[];
}

export default function CertificateLookup({ initialCertificates }: CertificateLookupProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [exactIdInput, setExactIdInput] = useState("");
  const [searching, setSearching] = useState(false);

  const filteredCertificates = useMemo(() => {
    if (!searchTerm.trim()) return initialCertificates;
    const term = searchTerm.toLowerCase().trim();
    return initialCertificates.filter((cert) => {
      return (
        cert.certificateId.toLowerCase().includes(term) ||
        cert.candidateName.toLowerCase().includes(term) ||
        cert.workshopTitle.toLowerCase().includes(term) ||
        (cert.candidateEmail && cert.candidateEmail.toLowerCase().includes(term))
      );
    });
  }, [initialCertificates, searchTerm]);

  const handleDirectVerification = (e: React.FormEvent) => {
    e.preventDefault();
    const id = (exactIdInput || searchTerm).trim().toUpperCase();
    if (!id) return;
    setSearching(true);
    router.push(`/certificates/${encodeURIComponent(id)}`);
  };

  return (
    <div className="w-full space-y-12">
      {/* Direct Verification Box */}
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-cyan-950/40 p-8 sm:p-10 shadow-[0_0_50px_rgba(0,229,255,0.15)] neu-flat">
        <div className="absolute -top-24 -right-24 h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-60 w-60 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 text-cyan-400 font-semibold text-sm mb-3">
            <ShieldCheck className="h-5 w-5 text-cyan-400" />
            <span>Instant Credential Verification</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Verify a Workshop Certificate
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Enter the unique Certificate ID (e.g., <code className="text-cyan-300 font-mono font-bold">AR-WS-2026-101</code>) or candidate name to confirm authenticity and view the verified digital credential.
          </p>

          <form onSubmit={handleDirectVerification} className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={exactIdInput}
                onChange={(e) => setExactIdInput(e.target.value)}
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

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-cyan-400" /> Tamper-Proof Cryptographic ID
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-cyan-400" /> 100% Online Verifiable
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-cyan-400" /> Direct LinkedIn Shareable
            </span>
          </div>
        </div>
      </div>

      {/* Directory Search & Filter */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="h-5 w-5 text-cyan-400" />
              Workshop Graduates & Verified Candidates
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Showing {filteredCertificates.length} of {initialCertificates.length} verified candidate records
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by name, ID or workshop..."
              className="w-full rounded-xl border border-white/10 bg-slate-900/60 pl-10 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Certificate Cards Grid */}
        {filteredCertificates.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-3xl border border-white/10 bg-slate-900/40">
            <Award className="mx-auto h-12 w-12 text-slate-600 mb-3" />
            <p className="text-base font-semibold text-white">No certificates found matching your search</p>
            <p className="text-xs text-slate-400 mt-1">
              Try searching with the candidate full name or exact Certificate ID format (e.g. <span className="text-cyan-300 font-mono">AR-WS-2026-101</span>).
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertificates.map((cert) => {
              const isRevoked = cert.status === "revoked";
              return (
                <div
                  key={cert.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 p-6 transition-all duration-300 hover:border-cyan-500/40 hover:bg-slate-900/80 hover:shadow-[0_0_30px_rgba(0,229,255,0.12)] neu-flat"
                >
                  <div className="space-y-4">
                    {/* Header: ID + Status */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-1 rounded-lg tracking-wide">
                        {cert.certificateId}
                      </span>
                      {isRevoked ? (
                        <span className="text-[11px] font-semibold text-rose-400 bg-rose-950/60 border border-rose-500/30 px-2.5 py-0.5 rounded-full">
                          Revoked
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                          <CheckCircle2 className="h-3 w-3" />
                          Verified
                        </span>
                      )}
                    </div>

                    {/* Candidate Name */}
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                        <User className="h-3.5 w-3.5 text-cyan-400" />
                        <span>Candidate</span>
                      </div>
                      <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {cert.candidateName}
                      </h4>
                    </div>

                    {/* Workshop Info */}
                    <div className="rounded-xl bg-slate-950/50 p-3 border border-white/5 space-y-1">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
                        Workshop Completed
                      </div>
                      <p className="text-xs font-medium text-slate-200 line-clamp-2">
                        {cert.workshopTitle}
                      </p>
                      {cert.grade && (
                        <div className="pt-1 text-[11px] text-amber-300 font-medium">
                          ✦ {cert.grade}
                        </div>
                      )}
                    </div>

                    {/* Date & Duration */}
                    <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-slate-500" />
                        {cert.issueDate ? new Date(cert.issueDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "Verified"}
                      </span>
                      {cert.workshopDuration && (
                        <span className="text-[11px] text-slate-500">
                          {cert.workshopDuration}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="pt-5 mt-5 border-t border-white/5">
                    <Link
                      href={`/certificates/${encodeURIComponent(cert.certificateId)}`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 py-2.5 text-xs font-semibold text-cyan-300 transition-all group-hover:bg-cyan-500 group-hover:text-slate-950"
                    >
                      <span>View & Verify Digital Certificate</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
