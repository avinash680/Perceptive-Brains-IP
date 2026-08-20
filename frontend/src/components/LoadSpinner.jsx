import React from "react";

/**
 * LoadingSpinner — Perceptive Brains IP monogram loader
 *
 * Two rings counter-rotate around a centered "PB" monogram
 * (navy "P" + gold "B", matching the logo exactly).
 *
 * Usage:
 *   <LoadingSpinner />
 *   <LoadingSpinner size="lg" label="Loading" />
 *   <LoadingSpinner fullScreen />
 *
 * Props:
 *   size       - "sm" | "md" | "lg"  (default: "md")
 *   label      - text under the mark (default: "Processing")
 *   fullScreen - centers the loader in a full-screen overlay
 */

// Exact colors sampled from the Perceptive Brains IP logo
const NAVY = "#01264C";
const GOLD = "#B38A31";

const SIZE_MAP = {
  sm: 72,
  md: 120,
  lg: 168,
};

export default function LoadingSpinner({
  size = "md",
  label = "Processing",
  fullScreen = false,
}) {
  const box = SIZE_MAP[size] || SIZE_MAP.md;

  const content = (
    <div className="pbip-loader-wrap">
      <svg
        width={box}
        height={box}
        viewBox="0 0 100 100"
        role="status"
        aria-label="Loading"
      >
        {/* outer ring - navy, spins clockwise */}
        <circle
          cx="50"
          cy="50"
          r="44"
          fill="none"
          stroke={NAVY}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="70 207"
          className="pbip-ring-outer"
        />
        {/* inner ring - gold, spins counter-clockwise */}
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke={GOLD}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="55 165"
          className="pbip-ring-inner"
        />
        {/* centered "PB" monogram */}
        <text
          x="44"
          y="57"
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="26"
          fill={NAVY}
          className="pbip-letter"
        >
          P
        </text>
        <text
          x="56"
          y="57"
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="26"
          fill={GOLD}
          className="pbip-letter pbip-letter-delay"
        >
          B
        </text>
      </svg>

      {label && (
        <p className="pbip-label" style={{ color: NAVY }}>
          {label}
          <span className="pbip-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </p>
      )}

      <style>{`
        .pbip-loader-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          font-family: Georgia, 'Times New Roman', serif;
        }

        .pbip-ring-outer {
          transform-origin: 50px 50px;
          animation: pbip-spin-cw 2.4s linear infinite;
        }

        .pbip-ring-inner {
          transform-origin: 50px 50px;
          animation: pbip-spin-ccw 1.8s linear infinite;
        }

        @keyframes pbip-spin-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pbip-spin-ccw {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        .pbip-letter {
          animation: pbip-glow 2.2s ease-in-out infinite;
        }

        .pbip-letter-delay {
          animation-delay: 0.3s;
        }

        @keyframes pbip-glow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        .pbip-label {
          margin: 0;
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .pbip-dots span {
          animation: pbip-dot-blink 1.4s infinite;
          opacity: 0;
        }
        .pbip-dots span:nth-child(1) { animation-delay: 0s; }
        .pbip-dots span:nth-child(2) { animation-delay: 0.2s; }
        .pbip-dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes pbip-dot-blink {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="pbip-fullscreen">
        {content}
        <style>{`
          .pbip-fullscreen {
            position: fixed;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255,255,255,0.85);
            backdrop-filter: blur(4px);
            z-index: 50;
          }
        `}</style>
      </div>
    );
  }

  return content;
}