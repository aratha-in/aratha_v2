"use client";

import { useState, useEffect } from "react";
import { Terminal, CheckCircle2, RotateCcw, Copy, Check } from "lucide-react";

export default function ArathaConsole() {
  const commands = [
    {
      cmd: "npm run dev",
      outputs: [
        { text: "▲ Next.js 16.3.5 (Turbopack Engine)", color: "text-[#00E5FF]" },
        { text: "✓ Loaded environment variables from .env", color: "text-slate-300" },
        { text: "✓ Connected to Neon PostgreSQL (ssl: true)", color: "text-emerald-400" },
        { text: "✓ Payload CMS 3.x Engine initialized at /cms", color: "text-cyan-300" },
        { text: "✓ Pre-compiled 30 static & dynamic routes in 420ms", color: "text-emerald-400" },
        { text: "▶ Ready at https://aratha.in (Lighthouse: 99/100)", color: "text-white font-bold" },
      ],
    },
    {
      cmd: "payload status --db=neon",
      outputs: [
        { text: "[payload-cli] Fetching collection metrics...", color: "text-[#00E5FF]" },
        { text: "✓ Services Collection: 8 active packages synced", color: "text-slate-300" },
        { text: "✓ Portfolio Collection: 8 case studies loaded", color: "text-slate-300" },
        { text: "✓ Articles Collection: 3 strategy guides published", color: "text-cyan-300" },
        { text: "✓ Leads Engine: Active listener receiving form data", color: "text-emerald-400" },
        { text: "▶ Status: 100% Operational (0 Latency Spikes)", color: "text-white font-bold" },
      ],
    },
    {
      cmd: "aratha-cli audit --url=https://aratha.in",
      outputs: [
        { text: "[aratha-audit] Running Web Vitals & Security check...", color: "text-[#00E5FF]" },
        { text: "✓ Responsive Layouts: Mobile, Tablet, Desktop verified", color: "text-slate-300" },
        { text: "✓ Security Audit: SSL/TLS encryption verified", color: "text-emerald-400" },
        { text: "✓ Accessibility Score: 100/100 (WCAG AA compliant)", color: "text-emerald-400" },
        { text: "✓ Performance Index: 99/100 (First Contentful Paint: 0.3s)", color: "text-cyan-300" },
        { text: "▶ Audit Complete: Enterprise Grade Certified ✓", color: "text-white font-bold" },
      ],
    },
  ];

  const [commandIndex, setCommandIndex] = useState(0);
  const [typedCommand, setTypedCommand] = useState("");
  const [visibleOutputs, setVisibleOutputs] = useState<
    { text: string; color: string }[]
  >([]);
  const [isTyping, setIsTyping] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let currentCmd = commands[commandIndex].cmd;
    let charIdx = 0;
    setTypedCommand("");
    setVisibleOutputs([]);
    setIsTyping(true);

    const typingInterval = setInterval(() => {
      if (charIdx < currentCmd.length) {
        setTypedCommand(currentCmd.slice(0, charIdx + 1));
        charIdx++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);

        let outputIdx = 0;
        const currentOutputs = commands[commandIndex].outputs;

        const outputInterval = setInterval(() => {
          if (outputIdx < currentOutputs.length) {
            const nextLine = currentOutputs[outputIdx];
            setVisibleOutputs((prev) => [...prev, nextLine]);
            outputIdx++;
          } else {
            clearInterval(outputInterval);

            setTimeout(() => {
              setCommandIndex((prev) => (prev + 1) % commands.length);
            }, 3500);
          }
        }, 350);
      }
    }, 60);

    return () => clearInterval(typingInterval);
  }, [commandIndex]);

  const handleCopy = () => {
    navigator.clipboard.writeText(commands[commandIndex].cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRestart = () => {
    setCommandIndex((prev) => (prev + 1) % commands.length);
  };

  return (
    <div className="w-full h-full glass-card border border-white/10 p-5 md:p-6 flex flex-col justify-between select-none relative group overflow-hidden shadow-2xl">
      {/* Top Window Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors" />
          </div>
          <span className="text-[11px] font-bold text-slate-400 font-mono ml-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#00E5FF]" />
            aratha-console
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            title="Copy command"
            className="p-1 rounded bg-slate-900 border border-white/5 text-slate-400 hover:text-white transition-colors"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          </button>
          <button
            onClick={handleRestart}
            title="Cycle command animation"
            className="p-1 rounded bg-slate-900 border border-white/5 text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </span>
        </div>
      </div>

      {/* Terminal Body with Typing Animation */}
      <div className="flex-1 flex flex-col justify-start gap-2 text-xs font-mono text-slate-300 py-1 overflow-hidden">
        {/* Typing Command Line */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
          <span className="text-[#00E5FF]">$</span>
          <span className="text-white tracking-wide">{typedCommand}</span>
          <span
            className={`w-2 h-4 bg-[#00E5FF] inline-block ${
              isTyping ? "animate-pulse" : "animate-bounce opacity-80"
            }`}
          />
        </div>

        {/* Step-by-Step Rendered Output Lines */}
        <div className="flex flex-col gap-2 mt-1.5">
          {visibleOutputs.map((line, idx) => (
            <p
              key={idx}
              className={`${line.color} leading-relaxed animate-fade-in text-[11px] sm:text-xs flex items-center gap-2`}
            >
              {line.text}
            </p>
          ))}
        </div>
      </div>

      {/* Bottom Console Footer Bar */}
      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400 font-mono">
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          Engine: Turbopack v16
        </span>
        <span className="text-secondary font-bold">Lighthouse: 99/100</span>
      </div>
    </div>
  );
}
