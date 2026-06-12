"use client";

import { motion } from "framer-motion";

const containers = [
  { x: 24, y: 32 },
  { x: 76, y: 32 },
  { x: 24, y: 76 },
  { x: 76, y: 76 },
];

export function ArchitectureViz() {
  return (
    <div className="relative aspect-square w-full max-w-[560px] mx-auto">
      <div className="absolute inset-0 -z-10 bg-grid" aria-hidden="true" />
      <div
        className="absolute inset-[18%] -z-10 rounded-full bg-gradient-brand opacity-25 blur-3xl"
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        role="img"
        aria-label="Animated cloud-native architecture diagram showing a Kubernetes cluster with control plane, worker nodes, CI/CD pipeline, and cloud providers"
      >
        <defs>
          <linearGradient id="hexGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#326CE5" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="nodeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#326CE5" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.12" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Central control plane hex */}
        <motion.g
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <polygon
            points="200,110 270,150 270,230 200,270 130,230 130,150"
            fill="url(#hexGrad)"
            filter="url(#glow)"
          />
          <polygon
            points="200,130 252,160 252,222 200,252 148,222 148,160"
            fill="#0B1220"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
          />
          <text
            x="200"
            y="195"
            textAnchor="middle"
            className="fill-white"
            style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.08em" }}
          >
            CONTROL
          </text>
          <text
            x="200"
            y="212"
            textAnchor="middle"
            className="fill-white/70"
            style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.08em" }}
          >
            PLANE
          </text>
        </motion.g>

        {/* Worker nodes */}
        {[
          { cx: 70, cy: 80 },
          { cx: 330, cy: 80 },
          { cx: 70, cy: 320 },
          { cx: 330, cy: 320 },
        ].map((n, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
          >
            <rect
              x={n.cx - 44}
              y={n.cy - 44}
              width="88"
              height="88"
              rx="14"
              fill="url(#nodeGrad)"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
            />
            {containers.map((c, j) => (
              <motion.rect
                key={j}
                x={n.cx - 44 + c.x - 8}
                y={n.cy - 44 + c.y - 8}
                width="16"
                height="16"
                rx="3"
                fill="#06B6D4"
                opacity="0.85"
                animate={{ opacity: [0.4, 0.95, 0.4] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  delay: (i * 0.25 + j * 0.15) % 2,
                }}
              />
            ))}
          </motion.g>
        ))}

        {/* Connection lines from control plane to workers */}
        {[
          { x: 70, y: 80 },
          { x: 330, y: 80 },
          { x: 70, y: 320 },
          { x: 330, y: 320 },
        ].map((n, i) => (
          <motion.line
            key={i}
            x1="200"
            y1="190"
            x2={n.x}
            y2={n.y}
            stroke="url(#hexGrad)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 1, delay: 0.4 + i * 0.1 }}
          />
        ))}

        {/* Animated data pulses along connections */}
        {[0, 1, 2, 3].map((i) => {
          const targets = [
            { x: 70, y: 80 },
            { x: 330, y: 80 },
            { x: 70, y: 320 },
            { x: 330, y: 320 },
          ][i];
          return (
            <motion.circle
              key={`pulse-${i}`}
              r="3"
              fill="#06B6D4"
              animate={{
                cx: [200, targets.x],
                cy: [190, targets.y],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                delay: i * 0.45,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* Outer orbit ring */}
        <motion.circle
          cx="200"
          cy="200"
          r="180"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
          strokeDasharray="2 6"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 200px" }}
        />
      </svg>

      {/* Floating labels */}
      <div className="pointer-events-none absolute top-2 left-2 glass rounded-full px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-cyan">
        CI/CD
      </div>
      <div className="pointer-events-none absolute top-2 right-2 glass rounded-full px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-cyan">
        Observability
      </div>
      <div className="pointer-events-none absolute bottom-2 left-2 glass rounded-full px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-cyan">
        Security
      </div>
      <div className="pointer-events-none absolute bottom-2 right-2 glass rounded-full px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-cyan">
        Multi-Cloud
      </div>
    </div>
  );
}
