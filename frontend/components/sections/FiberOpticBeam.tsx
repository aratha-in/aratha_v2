"use client";

import React, { useState } from "react";

interface FiberOpticBeamProps {
  className?: string;
  showBadge?: boolean;
  variant?: "wave" | "dual" | "straight";
}

export default function FiberOpticBeam({
  className = "",
  showBadge = true,
  variant = "dual",
}: FiberOpticBeamProps) {
  const [burst, setBurst] = useState(false);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const triggerDataBurst = () => {
    setBurst(true);
    setTimeout(() => setBurst(false), 2000);
  };

  return (
    <div
      className={`relative w-full overflow-hidden select-none group ${className}`}
      onClick={triggerDataBurst}
    >
      <svg
        className="w-full h-24 sm:h-36 pointer-events-none"
        viewBox="0 0 1200 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="fiber-beam-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0" />
            <stop offset="40%" stopColor="#00E5FF" stopOpacity="1" />
            <stop offset="70%" stopColor="#3B82F6" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="fiber-beam-reverse" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#EC4899" stopOpacity="0" />
            <stop offset="40%" stopColor="#8B5CF6" stopOpacity="0.9" />
            <stop offset="80%" stopColor="#00E5FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="fiber-laser-burst" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="50%" stopColor="#00E5FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>

          <filter id="fiber-glow-heavy" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        <path
          d="M 0 70 C 300 125, 600 15, 900 115 L 1200 70"
          stroke="rgba(0, 229, 255, 0.15)"
          strokeWidth="8"
          strokeLinecap="round"
        />

        <path
          d="M 0 70 C 300 125, 600 15, 900 115 L 1200 70"
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth="2.5"
          strokeDasharray="8 8"
        />

        <path
          d="M 0 70 C 300 125, 600 15, 900 115 L 1200 70"
          stroke="url(#fiber-beam-cyan)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#fiber-glow-heavy)"
          className="animate-fiber-pulse-1"
        />

        <path
          d="M 0 70 C 300 125, 600 15, 900 115 L 1200 70"
          stroke="url(#fiber-beam-cyan)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#fiber-glow-heavy)"
          className="animate-fiber-pulse-2"
        />

        {variant === "dual" && (
          <>
            <path
              d="M 0 50 C 300 10, 600 120, 900 25 L 1200 50"
              stroke="rgba(139, 92, 246, 0.15)"
              strokeWidth="6"
              strokeLinecap="round"
            />

            <path
              d="M 0 50 C 300 10, 600 120, 900 25 L 1200 50"
              stroke="url(#fiber-beam-reverse)"
              strokeWidth="3.5"
              strokeLinecap="round"
              filter="url(#fiber-glow-heavy)"
              className="animate-fiber-pulse-reverse"
            />
          </>
        )}

        {(burst || true) && (
          <path
            d="M 0 70 C 300 125, 600 15, 900 115 L 1200 70"
            stroke="url(#fiber-laser-burst)"
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#fiber-glow-heavy)"
            className={burst ? "animate-fiber-pulse-fast opacity-100" : "animate-fiber-pulse-fast opacity-40"}
          />
        )}

        <g
          className="cursor-pointer pointer-events-auto"
          onMouseEnter={() => setActiveNode("Node Alpha (300ms)")}
          onMouseLeave={() => setActiveNode(null)}
        >
          <circle cx="300" cy="100" r="10" fill="#00E5FF" className="animate-ping opacity-30" />
          <circle cx="300" cy="100" r="6" fill="#00E5FF" filter="url(#fiber-glow-heavy)" />
          <circle cx="300" cy="100" r="3" fill="#FFFFFF" />
        </g>

        <g
          className="cursor-pointer pointer-events-auto"
          onMouseEnter={() => setActiveNode("Node Core (10Gbps)")}
          onMouseLeave={() => setActiveNode(null)}
        >
          <circle cx="600" cy="40" r="12" fill="#3B82F6" className="animate-ping opacity-35" />
          <circle cx="600" cy="40" r="7" fill="#00E5FF" filter="url(#fiber-glow-heavy)" />
          <circle cx="600" cy="40" r="3.5" fill="#FFFFFF" />
        </g>

        <g
          className="cursor-pointer pointer-events-auto"
          onMouseEnter={() => setActiveNode("Node Omega (0.1ms latency)")}
          onMouseLeave={() => setActiveNode(null)}
        >
          <circle cx="900" cy="100" r="10" fill="#EC4899" className="animate-ping opacity-30" />
          <circle cx="900" cy="100" r="6" fill="#3B82F6" filter="url(#fiber-glow-heavy)" />
          <circle cx="900" cy="100" r="3" fill="#FFFFFF" />
        </g>
      </svg>

      {showBadge && (
        <div className="absolute top-2 right-6 md:right-12 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md text-[10px] font-mono text-cyan-300 shadow-lg pointer-events-none transition-all">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>
            {activeNode ? activeNode : burst ? "⚡ OPTICAL BURST DISPATCHED" : "FIBER OPTIC BACKBONE ACTIVE • 100 Gbps"}
          </span>
        </div>
      )}
    </div>
  );
}
