"use client";

export default function FiberOpticBeam({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full overflow-hidden pointer-events-none select-none ${className}`}>
      <svg
        className="w-full h-24 sm:h-32"
        viewBox="0 0 1200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Fiber Optic Light Gradient Beam */}
          <linearGradient id="fiber-beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0" />
            <stop offset="50%" stopColor="#00E5FF" stopOpacity="1" />
            <stop offset="75%" stopColor="#3B82F6" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
          </linearGradient>

          {/* Cable Outer Glass Glow Filter */}
          <filter id="fiber-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Outer Glass Sheath / Conduit Line */}
        <path
          d="M0 60 C 300 110, 600 10, 900 100 L 1200 60"
          stroke="rgba(0, 229, 255, 0.18)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* 2. Inner Fiber Core Line */}
        <path
          d="M0 60 C 300 110, 600 10, 900 100 L 1200 60"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="2"
          strokeDasharray="6 6"
        />

        {/* 3. Traveling Light Pulse Beam 1 */}
        <path
          d="M0 60 C 300 110, 600 10, 900 100 L 1200 60"
          stroke="url(#fiber-beam-gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#fiber-glow)"
          className="animate-fiber-pulse-1"
        />

        {/* 4. Traveling Light Pulse Beam 2 (Staggered Offset) */}
        <path
          d="M0 60 C 300 110, 600 10, 900 100 L 1200 60"
          stroke="url(#fiber-beam-gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#fiber-glow)"
          className="animate-fiber-pulse-2"
        />

        {/* Node Connection Points with Pulsing Light */}
        <circle cx="300" cy="85" r="4" fill="#00E5FF" className="animate-ping opacity-75" />
        <circle cx="300" cy="85" r="3" fill="#FFFFFF" />

        <circle cx="600" cy="35" r="4" fill="#00E5FF" className="animate-ping opacity-75" />
        <circle cx="600" cy="35" r="3" fill="#FFFFFF" />

        <circle cx="900" cy="88" r="4" fill="#00E5FF" className="animate-ping opacity-75" />
        <circle cx="900" cy="88" r="3" fill="#FFFFFF" />
      </svg>
    </div>
  );
}
