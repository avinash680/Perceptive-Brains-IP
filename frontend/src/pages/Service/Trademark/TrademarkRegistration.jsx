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
// Recolored onto the shared suite palette: navy #082E63 / deep navy
// #051B3F / gold #C69A32 / ivory #F8F6EF / white, so this page sits
// next to StartupIPServices and LitigationSupport without clashing.
// The functional red/green (mistakes vs. tips) stay as-is — same
// reasoning as the litigation docket: that's risk signal, not brand.
const C = {
  navy: "#082E63",
  navyDeep: "#051B3F",
  grid: "#3D5A8A",
  gold: "#C69A32",
  goldSoft: "#E0BB63",
  paper: "#F8F6EF",
  paperDim: "#EFE9D8",
  ink: "#1c2b47",
  slate: "#6B7A94",
  green: "#2F7A4A",
  red: "#B23A48",
};

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');
.font-serif { font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif; }
.font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
body, [class*="font-sans"] { font-family: 'Inter', ui-sans-serif, system-ui; }
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
            <circle cx={x} cy={y} r="3.5" fill={C.gold} />
            <text
              x={x}
              y={y - 8}
              textAnchor="middle"
              fill={C.goldSoft}
              fontSize="9"
              fontFamily="'JetBrains Mono', monospace"
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
            <stop offset="0%" stopColor={C.gold} stopOpacity="0" />
            <stop offset="100%" stopColor={C.gold} stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <path d="M 110 110 L 110 12 A 98 98 0 0 1 180 40 Z" fill="url(#sweepGrad)" />
      </g>
      <circle cx="110" cy="110" r="3" fill={C.goldSoft} />
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
  { region: "India", code: "IN·01", name: "INPASS", body: "Detailed search across patent applications and grants filed in India." },
  { region: "India", code: "IN·02", name: "IPIndia Online Search", body: "The Indian Patent Office's own portal for applications, status, and grants." },
  { region: "India", code: "IN·03", name: "Patent Facilitating Centres", body: "In-person guidance for structuring a search and preparing a filing." },
  { region: "United States", code: "US·01", name: "USPTO PatFT", body: "Full-text search across every US patent issued since 1976." },
  { region: "United States", code: "US·02", name: "USPTO AppFT", body: "Published US applications on file since March 2001." },
  { region: "United States", code: "US·03", name: "USPTO Global Dossier", body: "One view across USPTO, EPO, JPO, KIPO, and SIPO filings." },
  { region: "Global", code: "GL·01", name: "Google Patents", body: "Keyword, inventor, or number search across millions of patents worldwide." },
  { region: "Global", code: "GL·02", name: "WIPO PATENTSCOPE", body: "International search built around the PCT filing system." },
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
function Tag({ children }) {
  return (
    <span
      className="inline-block px-2 py-0.5 rounded text-[10px] uppercase"
      style={{
        border: `1px solid ${C.gold}`,
        color: C.gold,
        fontFamily: "'JetBrains Mono', monospace",
        letterSpacing: "0.1em",
      }}
    >
      {children}
    </span>
  );
}

function SectionLabel({ children, dark, index }) {
  return (
    <div
      className="flex items-center gap-3 mb-4"
      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.18em", color: dark ? C.goldSoft : C.slate }}
    >
      <span style={{ width: 30, height: 1, background: dark ? C.goldSoft : C.slate, opacity: 0.5 }} />
      {index && <span className="opacity-60">{index}</span>}
      <span className="uppercase">{children}</span>
    </div>
  );
}

// ---- Main component --------------------------------------------------------------
export default function TrademarkRegistration() {
  const [filter, setFilter] = useState("All");
  const regions = ["All", "India", "United States", "Global"];
  const filtered = filter === "All" ? TOOLS : TOOLS.filter((t) => t.region === filter);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: C.paper, color: C.ink }}>
      <style>{FONTS}</style>

      {/* HERO */}
      <section
        className="relative overflow-hidden px-6 md:px-16 pt-20 pb-24"
        style={{
          background: `linear-gradient(165deg, ${C.navy} 0%, ${C.navyDeep} 100%)`,
          backgroundImage: `linear-gradient(165deg, ${C.navy} 0%, ${C.navyDeep} 100%), repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(198,154,50,0.07) 39px, rgba(198,154,50,0.07) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(198,154,50,0.07) 39px, rgba(198,154,50,0.07) 40px)`,
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full blur-3xl"
          style={{ background: "rgba(198,154,50,0.16)" }}
        />
        <div className="relative max-w-6xl mx-auto grid md:grid-cols-[1.3fr_auto] gap-12 items-center">
          <div>
            <div className="mb-5">
              <Tag>Prior-art search · Global</Tag>
            </div>
            <h1 className="font-serif text-4xl font-bold leading-[1.05] text-white sm:text-5xl">
              Search first.
              <br />
              Build with{" "}
              <span
                style={{
                  background: `linear-gradient(90deg, ${C.gold}, ${C.goldSoft}, ${C.gold})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                certainty
              </span>
              .
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg" style={{ color: "rgba(255,255,255,0.6)" }}>
              Before development or filing, a thorough patent search shows you what already
              exists — so your invention is genuinely novel, defensible, and market-aware.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              {["INPASS", "USPTO", "Google Patents", "WIPO"].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-full text-xs"
                  style={{ border: `1px solid ${C.grid}`, color: C.goldSoft, fontFamily: "'JetBrains Mono', monospace" }}
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
          style={{ color: C.navy }}
          className="font-serif mb-12 max-w-2xl text-3xl font-bold sm:text-4xl"
        >
          Three things a good search buys you.
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {WHY.map((w) => {
            const Icon = w.icon;
            return (
              <div
                key={w.title}
                className="relative rounded-2xl p-6 transition-shadow hover:shadow-[0_16px_36px_-18px_rgba(8,46,99,0.3)]"
                style={{ background: "#fff", border: `1px solid ${C.paperDim}` }}
              >
                <span className="absolute top-3 left-3 w-2 h-2" style={{ borderTop: `1.5px solid ${C.gold}`, borderLeft: `1.5px solid ${C.gold}` }} />
                <span className="absolute bottom-3 right-3 w-2 h-2" style={{ borderBottom: `1.5px solid ${C.gold}`, borderRight: `1.5px solid ${C.gold}` }} />
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: `linear-gradient(135deg, ${C.navy}, #0c3a7c)` }}
                >
                  <Icon size={18} color={C.gold} strokeWidth={1.75} />
                </div>
                <h3 style={{ color: C.navy }} className="font-serif mb-2 text-lg font-semibold">
                  {w.title}
                </h3>
                <p className="text-sm" style={{ color: C.slate, lineHeight: 1.6 }}>{w.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* TOOLS DIRECTORY */}
      <section className="px-6 md:px-16 py-24" style={{ background: C.navyDeep }}>
        <div className="max-w-6xl mx-auto">
          <SectionLabel index="02" dark>Search tools by jurisdiction</SectionLabel>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <h2 className="font-serif max-w-xl text-3xl font-bold text-white sm:text-4xl">
              Eight databases, one search discipline.
            </h2>
            <div className="flex gap-2 flex-wrap">
              {regions.map((r) => (
                <button
                  key={r}
                  onClick={() => setFilter(r)}
                  className="px-3.5 py-1.5 rounded-full text-xs transition-all"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    border: `1px solid ${filter === r ? C.gold : C.grid}`,
                    color: filter === r ? C.navyDeep : C.goldSoft,
                    background: filter === r ? `linear-gradient(90deg, ${C.gold}, #a97e22)` : "transparent",
                    fontWeight: filter === r ? 600 : 400,
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
                className="group rounded-2xl p-5 flex flex-col justify-between transition-all hover:-translate-y-0.5"
                style={{ background: "rgba(198,154,50,0.05)", border: `1px solid ${C.grid}` }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: C.gold }}>{t.code}</span>
                    <Database size={14} color={C.goldSoft} opacity={0.7} />
                  </div>
                  <h3 className="font-serif mb-2 text-lg font-semibold text-white">
                    {t.name}
                  </h3>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.55 }}>{t.body}</p>
                </div>
                <div className="mt-4 text-[10px] uppercase" style={{ color: C.grid, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em" }}>
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
        <h2 style={{ color: C.navy }} className="font-serif mb-14 max-w-2xl text-3xl font-bold sm:text-4xl">
          Run the same discipline every time.
        </h2>
        <div className="flex flex-col md:flex-row gap-0 md:gap-3">
          {METHOD.map((m, i) => (
            <React.Fragment key={m.n}>
              <div
                className="flex-1 rounded-2xl p-6 transition-shadow hover:shadow-[0_16px_36px_-18px_rgba(8,46,99,0.28)]"
                style={{ background: "#fff", border: `1px solid ${C.paperDim}` }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center mb-4"
                  style={{ background: C.navy, color: C.gold, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem", boxShadow: `0 0 16px -4px ${C.gold}80` }}
                >
                  {m.n}
                </div>
                <h3 style={{ color: C.navy }} className="font-serif mb-2 text-lg font-semibold">
                  {m.title}
                </h3>
                <p className="text-sm" style={{ color: C.slate, lineHeight: 1.55 }}>{m.body}</p>
              </div>
              {i < METHOD.length - 1 && (
                <div className="hidden md:flex items-center justify-center px-1">
                  <ChevronRight size={16} color={C.gold} opacity={0.6} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* CLAIM LANGUAGE */}
      <section className="px-6 md:px-16 py-20" style={{ background: C.paperDim }}>
        <div className="max-w-4xl mx-auto text-center">
          <ScanLine size={22} color={C.gold} className="mx-auto mb-5" />
          <h2 style={{ color: C.navy }} className="font-serif mb-4 text-2xl font-bold sm:text-3xl">
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
        <h2 style={{ color: C.navy }} className="font-serif mb-14 max-w-2xl text-3xl font-bold sm:text-4xl">
          What sinks a search, what sharpens it.
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6" style={{ background: "#fff", border: `1px solid ${C.red}30` }}>
            <div className="flex items-center gap-2 mb-5">
              <AlertTriangle size={17} color={C.red} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.1em", color: C.red }}>
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
          <div className="rounded-2xl p-6" style={{ background: "#fff", border: `1px solid ${C.green}30` }}>
            <div className="flex items-center gap-2 mb-5">
              <Lightbulb size={17} color={C.green} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.1em", color: C.green }}>
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
      <section className="px-6 md:px-16 py-16" style={{ background: `linear-gradient(165deg, ${C.navyDeep} 0%, ${C.navy} 100%)` }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Crosshair size={30} color={C.gold} />
            <div>
              <div className="font-serif text-xl font-semibold text-white">
                Start with your keywords.
              </div>
              <div className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                Define the invention, then run it across every relevant database.
              </div>
            </div>
          </div>
          <button
            className="px-6 py-3 rounded-full text-sm shrink-0 flex items-center gap-2 transition-transform hover:scale-[1.03]"
            style={{
              background: `linear-gradient(90deg, ${C.gold}, #a97e22)`,
              color: C.navyDeep,
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.05em",
              fontWeight: 600,
              boxShadow: `0 0 30px -8px ${C.gold}99`,
            }}
          >
            <Search size={15} /> RUN A SEARCH
          </button>
        </div>
      </section>
    </div>
  );
}