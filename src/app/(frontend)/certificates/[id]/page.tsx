import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCertificateById } from "@/lib/db";
import CertificateActions from "@/components/certificates/CertificateActions";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  User,
  Clock,
  ArrowLeft,
  AlertTriangle,
  QrCode,
  BadgeCheck,
} from "lucide-react";

export const revalidate = 0;
export const dynamic = "force-dynamic";

interface CertificateDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: CertificateDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const decodedId = decodeURIComponent(id).trim().toUpperCase();
  const cert = await getCertificateById(decodedId);

  if (!cert) {
    return {
      title: "Certificate Verification | Aratha Academy",
      description: "Verify workshop completion certificate authenticity on Aratha.",
    };
  }

  return {
    title: `Certificate of Completion - ${cert.candidateName} | Aratha Academy`,
    description: `Official Certificate of Completion awarded to ${cert.candidateName} for "${cert.workshopTitle}" by Aratha. Certificate ID: ${cert.certificateId}.`,
    alternates: { canonical: `/certificates/${cert.certificateId}` },
    openGraph: {
      title: `Certificate of Completion - ${cert.candidateName} | Aratha`,
      description: `Verified completion credential for "${cert.workshopTitle}". Issued by Aratha Academy.`,
      url: `/certificates/${cert.certificateId}`,
      type: "article",
    },
  };
}

export default async function CertificateDetailPage({ params }: CertificateDetailPageProps) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id).trim().toUpperCase();
  const cert = await getCertificateById(decodedId);

  if (!cert) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-20 text-center">
        <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-10 neu-flat space-y-6">
          <div className="mx-auto h-16 w-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-400 border border-rose-500/20">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Certificate Not Found</h1>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            No certificate was found matching identifier <span className="font-mono text-cyan-400 font-bold">{decodedId}</span>. Please verify the ID or check the candidate directory.
          </p>
          <div className="pt-4">
            <Link
              href="/certificates"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-xs font-bold text-slate-950 transition-all hover:brightness-110"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Certificate Verification Portal</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isRevoked = cert.status === "revoked";
  const formattedDate = cert.issueDate
    ? new Date(cert.issueDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Verified";

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:py-16">
      {/* Back button & Breadcrumb */}
      <div className="no-print mb-8 flex items-center justify-between">
        <Link
          href="/certificates"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Certificates</span>
        </Link>

        <div className="flex items-center gap-2">
          {isRevoked ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-950/60 px-3 py-1 text-xs font-bold text-rose-400">
              <AlertTriangle className="h-3.5 w-3.5" />
              Status: Revoked
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-3 py-1 text-xs font-bold text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Verified & Authentic
            </span>
          )}
        </div>
      </div>

      {/* Action Bar */}
      <CertificateActions
        certificateId={cert.certificateId}
        candidateName={cert.candidateName}
        workshopTitle={cert.workshopTitle}
        downloadUrl={cert.certificateFileUrl}
      />

      {/* Revoked Warning Banner if applicable */}
      {isRevoked && (
        <div className="mb-6 rounded-2xl border border-rose-500/40 bg-rose-950/40 p-4 text-center text-sm text-rose-300">
          ⚠️ <strong>Notice:</strong> This certificate credential has been revoked or invalidated by the issuing authority.
        </div>
      )}

      {/* DIGITAL CERTIFICATE FRAME */}
      <div
        id="certificate-print-area"
        className="relative mx-auto w-full overflow-hidden rounded-3xl border-2 border-cyan-500/40 bg-gradient-to-br from-[#0c1322] via-[#09101d] to-[#040812] p-8 sm:p-14 shadow-[0_0_80px_rgba(0,229,255,0.18)]"
      >
        {/* Certificate Decorative Border */}
        <div className="pointer-events-none absolute inset-3 rounded-2xl border border-cyan-400/20" />
        <div className="pointer-events-none absolute inset-4 rounded-xl border border-dashed border-cyan-500/10" />

        {/* Ambient Corner Accents */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-blue-600/15 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Header Branding */}
          <div className="flex flex-col items-center mb-6">
            <Image
              src="/logo-white.png"
              alt="Aratha Logo"
              width={160}
              height={38}
              className="h-auto w-40 object-contain brightness-125"
              priority
            />
            <span className="text-[9px] uppercase tracking-[0.25em] text-cyan-300 font-extrabold mt-1">
              Aratha Academy &bull; Technical Training Group
            </span>
          </div>

          {/* Certificate Title */}
          <div className="my-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-950/50 px-4 py-1 text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase">
              <Award className="h-4 w-4 text-cyan-400" />
              Certificate of Completion
            </div>
          </div>

          <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
            This credential is proudly awarded to
          </p>

          {/* Candidate Name */}
          <div className="my-4 w-full border-b border-white/10 pb-4">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_0_20px_rgba(0,229,255,0.35)]">
              {cert.candidateName}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            for successfully completing the rigorous curriculum, project milestones, and hands-on laboratory exercises in the workshop:
          </p>

          {/* Workshop Title */}
          <div className="my-4 max-w-2xl rounded-2xl border border-cyan-500/20 bg-slate-900/60 px-6 py-4">
            <h3 className="text-lg sm:text-2xl font-bold text-cyan-300">
              {cert.workshopTitle}
            </h3>
            {cert.grade && (
              <p className="mt-1 text-xs font-semibold text-amber-300">
                ✦ {cert.grade}
              </p>
            )}
          </div>

          {/* Workshop Details & Description */}
          {cert.description && (
            <p className="max-w-xl text-xs leading-relaxed text-slate-400 mb-4">
              {cert.description}
            </p>
          )}

          {/* Skills Learned Badges */}
          {cert.skillsLearned && cert.skillsLearned.length > 0 && (
            <div className="my-3 flex flex-wrap items-center justify-center gap-2 max-w-2xl">
              {cert.skillsLearned.map((skill: string, i: number) => (
                <span
                  key={i}
                  className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Metadata Grid (Duration, Date, ID) */}
          <div className="my-6 grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-xl border-t border-b border-white/10 py-4 text-center">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400">Issue Date</div>
              <div className="text-xs sm:text-sm font-semibold text-white mt-0.5">{formattedDate}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400">Duration</div>
              <div className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                {cert.workshopDuration || "Verified Workshop"}
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="text-[10px] uppercase tracking-wider text-slate-400">Certificate ID</div>
              <div className="text-xs sm:text-sm font-mono font-bold text-cyan-400 mt-0.5">
                {cert.certificateId}
              </div>
            </div>
          </div>

          {/* Signatures & Verification Seal */}
          <div className="mt-4 flex w-full max-w-2xl flex-col sm:flex-row items-center justify-between gap-6 pt-4">
            {/* Instructor / Authority */}
            <div className="text-center sm:text-left space-y-1">
              <div className="font-serif italic text-base sm:text-lg text-cyan-300 tracking-wide">
                {cert.instructor || "Aratha Technical Training Group"}
              </div>
              <div className="h-0.5 w-40 bg-white/20 mx-auto sm:mx-0" />
              <div className="text-[10px] uppercase tracking-wider text-slate-400">
                Authorized Issuing Authority
              </div>
            </div>

            {/* Official Seal / Badge */}
            <div className="flex flex-col items-center">
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-cyan-400/50 bg-gradient-to-br from-cyan-950 via-slate-900 to-blue-950 shadow-[0_0_25px_rgba(0,229,255,0.3)]">
                <BadgeCheck className="h-10 w-10 text-cyan-400" />
              </div>
              <span className="text-[8px] uppercase tracking-widest font-bold text-cyan-300 mt-1">
                Verified Credential
              </span>
            </div>

            {/* Verification Link Info */}
            <div className="text-center sm:text-right space-y-1">
              <div className="flex items-center justify-center sm:justify-end gap-1 text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                <span>Digitally Authenticated</span>
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                aratha.in/certificates/{cert.certificateId}
              </div>
              <div className="text-[9px] text-slate-500">
                Issued under Aratha Training Quality Standards
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Instructions for Employers / Viewers */}
      <div className="no-print mt-12 rounded-2xl border border-white/10 bg-slate-900/40 p-6 text-center text-xs text-slate-400 max-w-2xl mx-auto">
        <p>
          This credential confirms that <strong className="text-white">{cert.candidateName}</strong> participated in and fulfilled the graduation requirements for <strong className="text-white">{cert.workshopTitle}</strong>.
        </p>
        <p className="mt-1 text-[11px] text-slate-500">
          To verify this credential independently, navigate to <Link href="/certificates" className="text-cyan-400 hover:underline">aratha.in/certificates</Link> and enter ID <code className="font-mono text-cyan-300">{cert.certificateId}</code>.
        </p>
      </div>

      {/* Print-specific style block */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body {
            background: #ffffff !important;
            color: #000000 !important;
          }
          header, footer, .no-print {
            display: none !important;
          }
          #certificate-print-area {
            border: 2px solid #0891b2 !important;
            background: #0d1527 !important;
            color: #ffffff !important;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 2.5rem !important;
            width: 100% !important;
            max-width: 100% !important;
            page-break-inside: avoid !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}} />
    </div>
  );
}
