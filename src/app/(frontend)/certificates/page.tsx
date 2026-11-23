import type { Metadata } from "next";
import CertificateLookup from "@/components/certificates/CertificateLookup";
import { ShieldCheck, CheckCircle2, FileCheck } from "lucide-react";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Workshop Certificate Verification | Aratha Academy",
  description:
    "Verify official workshop completion certificates and digital credentials issued to candidates and workshop attendees by Aratha.",
  alternates: { canonical: "/certificates" },
  openGraph: {
    title: "Workshop Certificate Verification | Aratha Academy",
    description:
      "Verify official workshop completion certificates and digital credentials issued to candidates and workshop attendees by Aratha.",
    url: "/certificates",
    type: "website",
  },
};

export default async function CertificatesPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-8 sm:py-20">
      {/* Hero Header */}
      <header className="mx-auto mb-14 max-w-3xl text-center">
        <div className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300 mb-4 neu-flat">
          <span>Aratha Academy & Training</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Workshop <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">Certificates</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300">
          Official digital credentials verifying the successful completion of intensive technical workshops, hands-on masterclasses, and executive training conducted by Aratha.
        </p>

        {/* Highlights stats banner */}
        <div className="mt-8 grid grid-cols-3 gap-3 max-w-xl mx-auto">
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 neu-flat">
            <div className="text-xl sm:text-2xl font-extrabold text-cyan-400">Official</div>
            <div className="text-[11px] font-medium text-slate-400 mt-0.5">Accredited Credentials</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 neu-flat">
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-400">100%</div>
            <div className="text-[11px] font-medium text-slate-400 mt-0.5">Cloud Verified</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 neu-flat">
            <div className="text-xl sm:text-2xl font-extrabold text-blue-400">Tamper-Proof</div>
            <div className="text-[11px] font-medium text-slate-400 mt-0.5">Unique ID Security</div>
          </div>
        </div>
      </header>

      {/* Verification Box Section */}
      <section className="mb-20">
        <CertificateLookup />
      </section>

      {/* Program Verification Standards / Trust Section */}
      <section className="border-t border-white/10 pt-16">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h3 className="text-2xl font-bold text-white">How Aratha Workshop Certification Works</h3>
          <p className="text-sm text-slate-400 mt-2">
            Each credential represents verifiable practical execution, graded project deliverables, and real-world proficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 space-y-3 neu-flat">
            <div className="h-10 w-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-white">Cryptographic Unique ID</h4>
            <p className="text-xs leading-relaxed text-slate-400">
              Every certificate carries an immutable serial identifier indexed directly in our cloud database to prevent forgery and unauthorized reproduction.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 space-y-3 neu-flat">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
              <FileCheck className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-white">Project & Skill Assessment</h4>
            <p className="text-xs leading-relaxed text-slate-400">
              Certificates are awarded exclusively to candidates who demonstrate mastery through rigorous hands-on exercises and project evaluations.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 space-y-3 neu-flat">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-white">Instant Employer Verification</h4>
            <p className="text-xs leading-relaxed text-slate-400">
              Recruiters and hiring managers can verify candidate credentials instantly online without delay or manual administrative paperwork.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
