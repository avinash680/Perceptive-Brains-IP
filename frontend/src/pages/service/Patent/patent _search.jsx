import React, { useState } from "react";
import {
  Search,
  Globe2,
  Database,
  Target,
  AlertTriangle,
  Lightbulb,
  Check,
  X,
  Compass,
  Crosshair,
  ScanLine,
  ChevronRight,
} from "lucide-react";

// ---- Design tokens ----------------------------------------------------------
const C = {
  blueprint: "#0E2A47",
  blueprintDeep: "#0A2038",
  grid: "#2E5878",
  cyan: "#5FC1E8",
  cyanSoft: "#9AD8F0",
  paper: "#F6F8F7",
  paperDim: "#E9EDEA",
  ink: "#101C28",
  slate: "#5C6B78",
  amber: "#E7A23D",
  green: "#4E9A72",
  red: "#B5493E",
};

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
@keyframes sweep { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .radar-sweep { animation: none !important; } }
`;

// ---- Signature element: scanning radar over global offices -----------------
function PatentRadar({ size = 220 }) {
  const blips = [
    { label: "IN", angle: -40, r: 74 },
    { label: "US", angle: 30, r: 60 },
    { label: "EP", angle: 100, r: 82 },
    { label: "JP", angle: 160, r: 55 },
    { label: "KR", angle: 205, r: 70 },
    { label: "CN", angle: 260, r: 65 },
    { label: "WO", angle: 320, r: 45 },
  ];
  return (
    <svg viewBox="0 0 220 220" width={size} height={size}>
      <circle cx="110" cy="110" r="98" fill="none" stroke={C.grid} strokeWidth="1" />
      <circle cx="110" cy="110" r="74" fill="none" stroke={C.grid} strokeWidth="1" opacity="0.7" />
      <circle cx="110" cy="110" r="48" fill="none" stroke={C.grid} strokeWidth="1" opacity="0.5" />
      <line x1="110" y1="12" x2="110" y2="208" stroke={C.grid} strokeWidth="1" opacity="0.4" />
      <line x1="12" y1="110" x2="208" y2="110" stroke={C.grid} strokeWidth="1" opacity="0.4" />
      {blips.map((b) => {
        const rad = (b.angle * Math.PI) / 180;
        const x = 110 + b.r * Math.cos(rad);
        const y = 110 + b.r * Math.sin(rad);
        return (
          <g key={b.label}>
            <circle cx={x} cy={y} r="3.5" fill={C.cyan} />
            <text
              x={x}
              y={y - 8}
              textAnchor="middle"
              fill={C.cyanSoft}
              fontSize="9"
              fontFamily="'IBM Plex Mono', monospace"
              letterSpacing="0.5"
            >
              {b.label}
            </text>
          </g>
        );
      })}
      <g className="radar-sweep" style={{ transformOrigin: "110px 110px", animation: "sweep 6s linear infinite" }}>
        <defs>
          <linearGradient id="sweepGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={C.cyan} stopOpacity="0" />
            <stop offset="100%" stopColor={C.cyan} stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <path d="M 110 110 L 110 12 A 98 98 0 0 1 180 40 Z" fill="url(#sweepGrad)" />
      </g>
      <circle cx="110" cy="110" r="3" fill={C.cyanSoft} />
    </svg>
  );
}

// ---- Data --------------------------------------------------------------------
const WHY = [
  { icon: Target, title: "Confirm novelty", body: "See what's already patented before you invest in developing an idea further." },
  { icon: Compass, title: "Avoid disputes", body: "Spot conflicting rights early so you can design around them, not litigate around them." },
  { icon: Globe2, title: "Read the landscape", body: "Search results double as a map of market trends and technical direction in your field." },
];

const TOOLS = [
  { region: "India", name: "INPASS", body: "Detailed search across patent applications and grants filed in India." },
  { region: "India", name: "IPIndia Online Search", body: "The Indian Patent Office's own portal for applications, status, and grants." },
  { region: "India", name: "Patent Facilitating Centres", body: "In-person guidance for structuring a search and preparing a filing." },
  { region: "United States", name: "USPTO PatFT", body: "Full-text search across every US patent issued since 1976." },
  { region: "United States", name: "USPTO AppFT", body: "Published US applications on file since March 2001." },
  { region: "United States", name: "USPTO Global Dossier", body: "One view across USPTO, EPO, JPO, KIPO, and SIPO filings." },
  { region: "Global", name: "Google Patents", body: "Keyword, inventor, or number search across millions of patents worldwide." },
  { region: "Global", name: "WIPO PATENTSCOPE", body: "International search built around the PCT filing system." },
];

const METHOD = [
  { n: "1", title: "Define the invention", body: "Pin down exactly what the product does and which features are novel." },
  { n: "2", title: "Identify keywords", body: "Draw terms from the technology, its design, and its intended application." },
  { n: "3", title: "Select your tools", body: "Match databases to the jurisdictions and patent types that matter here." },
  { n: "4", title: "Conduct the search", body: "Run the chosen keywords systematically across each selected database." },
  { n: "5", title: "Analyse results", body: "Weigh each hit for genuine overlap with your claims, not just keyword match." },
];

const MISTAKES = [
  "Using vague, generic keywords instead of specific technical terms",
  "Searching only domestic filings and ignoring international patents",
  "Overlooking design patents that could still affect product aesthetics",
];

const TIPS = [
  "Cross-check results across more than one database",
  "Narrow criteria progressively as patterns emerge",
  "Re-run key searches periodically to catch new filings",
];

// ---- Small pieces --------------------------------------------------------------
function Tag({ children, tone = "cyan" }) {
  const map = { cyan: C.cyan, amber: C.amber };
  return (
    <span
      className="inline-block px-2 py-0.5 rounded text-[10px] uppercase"
      style={{
        border: `1px solid ${map[tone]}`,
        color: map[tone],
        fontFamily: "'IBM Plex Mono', monospace",
        letterSpacing: "0.1em",
      }}
    >
      {children}
    </span>
  );
}

function SectionLabel({ children, dark }) {
  return (
    <div
      className="flex items-center gap-3 mb-4"
      style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.18em", color: dark ? C.cyanSoft : C.slate }}
    >
      <span style={{ width: 30, height: 1, background: dark ? C.cyanSoft : C.slate, opacity: 0.5 }} />
      <span className="uppercase">{children}</span>
    </div>
  );
}

// ---- Main component --------------------------------------------------------------
export default function PatentSearchPage() {
  const [filter, setFilter] = useState("All");
  const regions = ["All", "India", "United States", "Global"];
  const filtered = filter === "All" ? TOOLS : TOOLS.filter((t) => t.region === filter);

  return (
    <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", background: C.paper, color: C.ink }}>
      <style>{FONTS}</style>

      {/* HERO */}
      <section
        className="relative overflow-hidden px-6 md:px-16 pt-20 pb-24"
        style={{
          background: `linear-gradient(165deg, ${C.blueprint} 0%, ${C.blueprintDeep} 100%)`,
          backgroundImage: `linear-gradient(165deg, ${C.blueprint} 0%, ${C.blueprintDeep} 100%), repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(95,193,232,0.08) 39px, rgba(95,193,232,0.08) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(95,193,232,0.08) 39px, rgba(95,193,232,0.08) 40px)`,
        }}
      >
        <div className="relative max-w-6xl mx-auto grid md:grid-cols-[1.3fr_auto] gap-12 items-center">
          <div>
            <div className="mb-5">
              
            </div>
            <h1
              className="text-white leading-[1.05]"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 5.2vw, 4.2rem)" }}
            >
              Search first.
              <br />
              Build with certainty.
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg" style={{ color: C.cyanSoft, opacity: 0.9 }}>
              Before development or filing, a thorough patent search shows you what already
              exists — so your invention is genuinely novel, defensible, and market-aware.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              {["INPASS", "USPTO", "Google Patents", "WIPO"].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-full text-xs"
                  style={{ border: `1px solid ${C.grid}`, color: C.cyanSoft, fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="justify-self-center md:justify-self-end">
            <PatentRadar size={230} />
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="px-6 md:px-16 py-24 max-w-6xl mx-auto">
        <SectionLabel index="01">Why search before you build</SectionLabel>
        <h2
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)" }}
          className="mb-12 max-w-2xl"
        >
          Three things a good search buys you.
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {WHY.map((w) => {
            const Icon = w.icon;
            return (
              <div
                key={w.title}
                className="relative rounded-lg p-6"
                style={{ background: "#fff", border: `1px solid ${C.paperDim}` }}
              >
                <span className="absolute top-3 left-3 w-2 h-2" style={{ borderTop: `1.5px solid ${C.cyan}`, borderLeft: `1.5px solid ${C.cyan}` }} />
                <span className="absolute bottom-3 right-3 w-2 h-2" style={{ borderBottom: `1.5px solid ${C.cyan}`, borderRight: `1.5px solid ${C.cyan}` }} />
                <Icon size={20} color={C.blueprint} strokeWidth={1.75} className="mb-4" />
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "1.1rem" }} className="mb-2">
                  {w.title}
                </h3>
                <p className="text-sm" style={{ color: C.slate, lineHeight: 1.6 }}>{w.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* TOOLS DIRECTORY */}
      <section className="px-6 md:px-16 py-24" style={{ background: C.blueprintDeep }}>
        <div className="max-w-6xl mx-auto">
          <SectionLabel index="02" dark>Search tools by jurisdiction</SectionLabel>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <h2
              className="text-white max-w-xl"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)" }}
            >
              Eight databases, one search discipline.
            </h2>
            <div className="flex gap-2 flex-wrap">
              {regions.map((r) => (
                <button
                  key={r}
                  onClick={() => setFilter(r)}
                  className="px-3 py-1.5 rounded-full text-xs transition-colors"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    border: `1px solid ${filter === r ? C.cyan : C.grid}`,
                    color: filter === r ? C.blueprintDeep : C.cyanSoft,
                    background: filter === r ? C.cyan : "transparent",
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((t) => (
              <div
                key={t.name}
                className="rounded-lg p-5 flex flex-col justify-between"
                style={{ background: "rgba(95,193,232,0.05)", border: `1px solid ${C.grid}` }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.7rem", color: C.cyan }}>{t.code}</span>
                    <Database size={14} color={C.cyanSoft} opacity={0.7} />
                  </div>
                  <h3 className="text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "1rem" }}>
                    {t.name}
                  </h3>
                  <p className="text-xs" style={{ color: C.cyanSoft, opacity: 0.85, lineHeight: 1.55 }}>{t.body}</p>
                </div>
                <div className="mt-4 text-[10px] uppercase" style={{ color: C.grid, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em" }}>
                  {t.region}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METHODOLOGY */}
      <section className="px-6 md:px-16 py-24 max-w-6xl mx-auto">
        <SectionLabel index="03">A five-step search method</SectionLabel>
        <h2
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)" }}
          className="mb-14 max-w-2xl"
        >
          Run the same discipline every time.
        </h2>
        <div className="flex flex-col md:flex-row gap-0 md:gap-3">
          {METHOD.map((m, i) => (
            <React.Fragment key={m.n}>
              <div className="flex-1 rounded-lg p-6" style={{ background: "#fff", border: `1px solid ${C.paperDim}` }}>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center mb-4"
                  style={{ background: C.blueprint, color: C.cyanSoft, fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.85rem" }}
                >
                  {m.n}
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "1rem" }} className="mb-2">
                  {m.title}
                </h3>
                <p className="text-sm" style={{ color: C.slate, lineHeight: 1.55 }}>{m.body}</p>
              </div>
              {i < METHOD.length - 1 && (
                <div className="hidden md:flex items-center justify-center px-1">
                  <ChevronRight size={16} color={C.slate} opacity={0.5} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* CLAIM LANGUAGE */}
      <section className="px-6 md:px-16 py-20" style={{ background: C.paperDim }}>
        <div className="max-w-4xl mx-auto text-center">
          <ScanLine size={22} color={C.blueprint} className="mx-auto mb-5" />
          <h2
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)" }}
            className="mb-4"
          >
            Claims live and die by their wording.
          </h2>
          <p className="max-w-2xl mx-auto text-sm md:text-base" style={{ color: C.slate, lineHeight: 1.7 }}>
            Patent claims use a specialised, precise lexicon — small variations in language can
            reshape a claim's scope. Terminology should match industry standards and stay
            unambiguous, since examiners and courts rely on the exact wording to determine what's
            actually protected.
          </p>
        </div>
      </section>

      {/* MISTAKES VS TIPS */}
      <section className="px-6 md:px-16 py-24 max-w-6xl mx-auto">
        <SectionLabel index="04">Get it right</SectionLabel>
        <h2
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)" }}
          className="mb-14 max-w-2xl"
        >
          What sinks a search, what sharpens it.
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-lg p-6" style={{ background: "#fff", border: `1px solid ${C.red}30` }}>
            <div className="flex items-center gap-2 mb-5">
              <AlertTriangle size={17} color={C.red} />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.1em", color: C.red }}>
                COMMON MISTAKES
              </span>
            </div>
            <ul className="flex flex-col gap-3">
              {MISTAKES.map((m) => (
                <li key={m} className="flex items-start gap-3 text-sm" style={{ color: C.ink, lineHeight: 1.55 }}>
                  <X size={15} color={C.red} className="mt-0.5 shrink-0" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg p-6" style={{ background: "#fff", border: `1px solid ${C.green}30` }}>
            <div className="flex items-center gap-2 mb-5">
              <Lightbulb size={17} color={C.green} />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.1em", color: C.green }}>
                SHARPEN YOUR SEARCH
              </span>
            </div>
            <ul className="flex flex-col gap-3">
              {TIPS.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm" style={{ color: C.ink, lineHeight: 1.55 }}>
                  <Check size={15} color={C.green} className="mt-0.5 shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 py-16" style={{ background: `linear-gradient(165deg, ${C.blueprintDeep} 0%, ${C.blueprint} 100%)` }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Crosshair size={30} color={C.cyanSoft} />
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#fff", fontWeight: 600, fontSize: "1.1rem" }}>
                Start with your keywords.
              </div>
              <div className="text-sm" style={{ color: C.cyanSoft, opacity: 0.8 }}>
                Define the invention, then run it across every relevant database.
              </div>
            </div>
          </div>
          <button
            className="px-6 py-3 rounded-full text-sm shrink-0 flex items-center gap-2"
            style={{ background: C.cyan, color: C.blueprintDeep, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.05em", fontWeight: 600 }}
          >
            <Search size={15} /> RUN A SEARCH
          </button>
        </div>
      </section>
    </div>
  );
}