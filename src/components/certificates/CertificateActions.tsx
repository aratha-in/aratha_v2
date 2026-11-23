"use client";

import { useState } from "react";
import { Printer, Share2, Copy, Check, Download, ExternalLink } from "lucide-react";

interface CertificateActionsProps {
  certificateId: string;
  candidateName: string;
  workshopTitle: string;
  downloadUrl?: string;
}

export default function CertificateActions({
  certificateId,
  candidateName,
  workshopTitle,
  downloadUrl,
}: CertificateActionsProps) {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleLinkedInShare = () => {
    const url = window.location.href;
    const text = encodeURIComponent(
      `I am excited to share my Certificate of Completion for "${workshopTitle}" from Aratha! Verify credential: ${url}`
    );
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&text=${text}`, "_blank");
  };

  return (
    <div className="no-print flex flex-wrap items-center justify-center gap-3 py-6">
      {/* Print / Save PDF */}
      <button
        onClick={handlePrint}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-2.5 text-xs font-bold text-slate-950 transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] shadow-md"
      >
        <Printer className="h-4 w-4" />
        <span>Print / Save as PDF</span>
      </button>

      {/* Copy Verification Link */}
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-xs font-semibold text-slate-200 transition-all duration-200 hover:border-cyan-400 hover:text-white"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-emerald-400" />
            <span className="text-emerald-400">Link Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 text-slate-400" />
            <span>Copy Verification URL</span>
          </>
        )}
      </button>

      {/* Share on LinkedIn */}
      <button
        onClick={handleLinkedInShare}
        className="inline-flex items-center gap-2 rounded-xl border border-blue-500/30 bg-blue-950/40 px-4 py-2.5 text-xs font-semibold text-blue-300 transition-all duration-200 hover:bg-blue-900/50 hover:text-white"
      >
        <svg className="h-4 w-4 text-blue-400 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 1 0-.01-3.2 1.6 1.6 0 0 0 .01 3.2m1.4 9.74V9.92H5.06v8.58h2.8z" />
        </svg>
        <span>Add / Share on LinkedIn</span>
      </button>

      {/* Download file if available */}
      {downloadUrl && (
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-xs font-semibold text-slate-200 transition-all duration-200 hover:border-cyan-400 hover:text-white"
        >
          <Download className="h-4 w-4 text-cyan-400" />
          <span>Download Attachment</span>
        </a>
      )}
    </div>
  );
}
