import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PageMeta from "../../../components/PageMeta";
import { Stamp, ScrollText, Scale, FileSearch, Gavel, BookMarked, ChevronRight, CircleCheck, CircleAlert, Handshake } from "lucide-react";
import IPFeeTable from "./patentFees";


/* =====================================================================
   LUXURY REVISION — Perceptive Brains IP

   Direction: a bound letters-patent certificate, not a marketing page.
   Warm ivory stock instead of stark white, antique foil gold instead of
   flat mustard, deep ink-navy instead of corporate navy. Every panel
   reads as pressed into paper (letterpress deboss) or stamped in foil
   (raised emboss), with hairline certificate corners marking the
   "exhibits." The seal is the one place motion and shine are spent.
===================================================================== */
const FONT_STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

.pl-root {
  /* Navy and gold below are sampled directly from the Perceptive Brains IP
     mark (#01264C / #B38A31) — every other navy/gold is a tint or shade
     of those two, so the page and the logo are provably the same brand. */
  --navy: #01264C;
  --navy-2: #274666;
  --navy-3: #4D6781;
  --ivory: #FAF6EC;
  --ivory-dim: #F1EAD9;
  --gold: #B38A31;
  --gold-light: #CDB279;
  --gold-pale: #E4D6B6;
  --gold-dark: #74591F;
  --ink: #1C1810;
  --slate: #6E6551;
  --rule: #E3D9BE;
  --rule-on-navy: rgba(205,178,121,0.20);
  --foil: linear-gradient(115deg, #74591F 0%, #CDB279 22%, #E4D6B6 42%, #B38A31 60%, #CDB279 80%, #74591F 100%);
  font-family: 'IBM Plex Sans', sans-serif;
  background: var(--ivory);
  color: var(--ink);
  position: relative;
}
.pl-root .display { font-family: 'Fraunces', serif; }
.pl-root .serif-flourish { font-family: 'Cormorant Garamond', serif; }
.pl-root .mono { font-family: 'IBM Plex Mono', monospace; }

/* faint paper grain, whole page */
.pl-grain {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.05;
  mix-blend-mode: multiply;
  z-index: 0;
}

.pl-seal { transition: transform 0.6s cubic-bezier(.2,.8,.2,1); }
.pl-seal-wrap:hover .pl-seal,
.pl-seal-wrap:focus-visible .pl-seal { transform: rotate(-6deg) scale(1.04); }

.pl-tab { transition: all 0.25s ease; }

.pl-cta {
  position: relative;
  overflow: hidden;
  transition: background-color 0.25s ease, box-shadow 0.3s ease, transform 0.2s ease;
}
.pl-cta.pl-cta-foil {
  background-color: var(--gold);
  color: var(--navy);
}
.pl-cta.pl-cta-foil::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.45) 48%, transparent 66%);
  background-size: 220% 100%;
  background-position: -120% 0%;
  transition: background-position 0.8s ease;
  pointer-events: none;
}
.pl-cta.pl-cta-foil:hover { background-color: var(--gold-dark); box-shadow: 0 4px 18px rgba(179,138,49,0.35); }
.pl-cta.pl-cta-foil:hover::after { background-position: 120% 0%; }
.pl-cta:active { transform: translateY(1px); }

.pl-tab:focus-visible,
.pl-cta:focus-visible,
.pl-claim:focus-visible {
  outline: 1.5px solid var(--gold);
  outline-offset: 3px;
}

.pl-claim-line { position: relative; }
.pl-claim-line::before {
  content: "";
  position: absolute;
  left: -20px;
  top: -18px;
  bottom: 50%;
  width: 1px;
  background: var(--rule-on-navy);
}
.pl-claim-line::after {
  content: "";
  position: absolute;
  left: -20px;
  top: 50%;
  width: 20px;
  height: 1px;
  background: var(--rule-on-navy);
}

.pl-reveal {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.pl-reveal.pl-in { opacity: 1; transform: translateY(0); }

.pl-row { transition: background 0.25s ease; }
.pl-row:hover { background: var(--ivory-dim); }

.pl-cell {
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}
.pl-cell:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 28px -14px rgba(28,24,16,0.28);
  border-color: var(--gold-pale) !important;
}

/* letterpress deboss — used on light panels to feel pressed INTO the stock */
.pl-deboss {
  box-shadow:
    inset 0 1px 2px rgba(28,24,16,0.10),
    inset 0 -1px 0 rgba(255,255,255,0.6);
}

/* foil-embossed navy panel — a raised gold hairline along the top edge */
.pl-emboss-navy {
  box-shadow:
    inset 0 1px 0 rgba(217,185,120,0.35),
    0 18px 40px -20px rgba(11,26,48,0.55);
}

/* certificate corner brackets */
.pl-frame { position: relative; }
.pl-frame::before, .pl-frame::after,
.pl-frame .pl-corner-tr, .pl-frame .pl-corner-bl {
  content: "";
  position: absolute;
  width: 18px;
  height: 18px;
  border-top: 1.5px solid var(--gold);
  border-left: 1.5px solid var(--gold);
  opacity: 0.85;
}
.pl-frame::before { top: -1px; left: -1px; }
.pl-frame::after { bottom: -1px; right: -1px; transform: rotate(180deg); }
.pl-frame .pl-corner-tr { top: -1px; right: -1px; transform: rotate(90deg); }
.pl-frame .pl-corner-bl { bottom: -1px; left: -1px; transform: rotate(-90deg); }

.pl-divider {
  display: flex;
  align-items: center;
  gap: 12px;
}
.pl-divider .line { flex: 1; height: 1px; background: var(--rule); }
.pl-divider .mark { width: 6px; height: 6px; transform: rotate(45deg); background: var(--gold); flex-shrink: 0; }

@media (prefers-reduced-motion: reduce) {
  .pl-seal, .pl-tab, .pl-reveal, .pl-row, .pl-cell, .pl-cta { transition: none; }
  .pl-reveal { opacity: 1; transform: none; }
}
`;

const processSteps = [
  { n: "01", title: "Patent Search", desc: "A prior-art search confirms the invention is novel and non-obvious before any claim is written.", icon: FileSearch },
  { n: "02", title: "Patent Drafting", desc: "The specification is written, and claims are drafted to define the exact scope of protection.", icon: ScrollText },
  { n: "03", title: "Filing", desc: "The application is lodged with the Indian Patent Office as a provisional or complete specification.", icon: BookMarked },
  { n: "04", title: "Publication", desc: "Published in the official journal 18 months from the priority date — or in as little as 1 month with early publication.", icon: Scale },
  { n: "05", title: "Examination", desc: "Requested within 48 months of the priority date; the examiner tests the claims against patentability criteria.", icon: Gavel },
  { n: "06", title: "Grant", desc: "Claims that clear examination are granted and published in the patent journal.", icon: Stamp },
];

const mistakes = [
  { title: "Ambiguity", desc: "Claims that don't clearly delineate scope invite misinterpretation and courtroom challenges." },
  { title: "Overlapping claims", desc: "Multiple claims covering identical subject matter create redundancy and unnecessary disputes." },
  { title: "Weak novelty", desc: "Claims that fail to establish novelty and non-obviousness are easily invalidated." },
];

/* Scroll-reveal wrapper: fades sections in as they enter the viewport */
function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`pl-reveal ${inView ? "pl-in" : ""} ${className}`}>
      {children}
    </div>
  );
}

function Divider() {
  return (
    <div className="pl-divider my-2" aria-hidden="true">
      <span className="line" />
      <span className="mark" />
      <span className="line" />
    </div>
  );
}

function Eyebrow({ children, dark = false }) {
  return (
    <p
      className="mono text-[11px] tracking-[0.28em] mb-2"
      style={{ color: dark ? "var(--gold-light)" : "var(--gold-dark)" }}
    >
      {children}
    </p>
  );
}

export default function PatentDraftingPerceptiveBrains() {
  const [claimOpen, setClaimOpen] = useState("independent");

  return (
    <div className="pl-root min-h-screen w-full">
      <style>{FONT_STYLE}</style>
      <PageMeta
        title="Patent Drafting & Filing Services | Perceptive Brains"
        description="Expert patent drafting and filing services for India and international protection from Perceptive Brains IP."
      />

      <svg className="pl-grain" width="0" height="0">
        <filter id="pl-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0" />
        </filter>
      </svg>
      <div className="pl-grain" style={{ filter: "url(#pl-noise)" }} />

      {/* HERO — ink-navy cover panel, foil rule at the base */}
      <div style={{ background: `linear-gradient(160deg, var(--navy) 0%, var(--navy-2) 100%)`, position: "relative", zIndex: 1 }}>
        <div className="max-w-5xl mx-auto px-6 pt-16 pb-14">
          <div className="max-w-2xl">
            <Eyebrow dark>APPLICATION NO. IN/2026/PAT · PERCEPTIVE BRAINS IP</Eyebrow>
            <h1 className="display text-4xl sm:text-5xl md:text-6xl leading-[1.05] font-semibold" style={{ color: "#FBF6E9" }}>
              Patent Claim<br />Drafting &amp; Filing
            </h1>
            <p className="serif-flourish italic mt-5 text-lg" style={{ color: "var(--gold-light)" }}>
              A record kept the way a claim itself is written — precisely, and in order.
            </p>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed" style={{ color: "#C7D3E3" }}>
              Claims are the legal definition of an invention — what is protected,
              and what is not. This is the record of how to draft them, what they
              cost to file in India, and where drafters go wrong.
            </p>
            <div className="mt-8 flex gap-3 flex-wrap">
              <Link to="/services/patent-drafting-filing#claims" className="pl-cta pl-cta-foil mono text-xs px-5 py-3 tracking-wide rounded-sm font-medium">
                READ THE CLAIMS →
              </Link>
              <Link to="/services/patent-drafting-filing#fees" className="pl-cta mono text-xs px-5 py-3 tracking-wide border rounded-sm" style={{ borderColor: "rgba(217,185,120,0.4)", color: "#FBF6E9" }}>
                VIEW FEE SCHEDULE
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CLAIM FAMILY — signature element */}
      <section id="claims" className="border-t" style={{ borderColor: "var(--rule)", position: "relative", zIndex: 1 }}>
        <Reveal className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="display text-2xl sm:text-3xl font-medium mb-3" style={{ color: "var(--navy)" }}>How a claim family reads</h2>
          <p className="max-w-xl text-sm leading-relaxed mb-10" style={{ color: "var(--slate)" }}>
            An independent claim stands alone and defines the broadest scope.
            Dependent claims attach beneath it, narrowing the scope with
            additional limitations. Here is one real family, on a lithium-ion
            battery.
          </p>

          <div className="pl-emboss-navy pl-frame p-6 sm:p-8 rounded-sm" style={{ background: "var(--navy)", color: "#FFFFFF" }}>
            <span className="pl-corner-tr" aria-hidden="true" />
            <span className="pl-corner-bl" aria-hidden="true" />
            <button
              type="button"
              className="pl-claim flex items-start gap-3 cursor-pointer w-full text-left rounded-sm"
              onClick={() => setClaimOpen("independent")}
              aria-pressed={claimOpen === "independent"}
            >
              <span
                className="mono text-xs px-2 py-1 shrink-0 rounded-sm"
                style={
                  claimOpen === "independent"
                    ? { background: "var(--gold)", color: "var(--navy)" }
                    : { background: "rgba(217,185,120,0.12)", color: "#FFFFFF" }
                }
              >
                CLAIM 1
              </span>
              <div>
                <p className="mono text-[11px] tracking-wide mb-1" style={{ color: "var(--gold-light)" }}>INDEPENDENT — broadest scope</p>
                <p className="text-[15px] leading-relaxed" style={{ color: "#DCE3EE" }}>
                  A lithium-ion battery comprising a cathode with a specific
                  material composition that increases energy density by 20%,
                  an anode composed of carbon nanotubes, and an electrolyte
                  with a proprietary formulation.
                </p>
              </div>
            </button>

            <button
              type="button"
              className="pl-claim mt-8 ml-6 sm:ml-10 pl-6 pl-claim-line cursor-pointer w-[calc(100%-1.5rem)] sm:w-[calc(100%-2.5rem)] text-left rounded-sm"
              onClick={() => setClaimOpen("dependent")}
              aria-pressed={claimOpen === "dependent"}
            >
              <div className="flex items-start gap-3">
                <span
                  className="mono text-xs px-2 py-1 shrink-0 rounded-sm"
                  style={
                    claimOpen === "dependent"
                      ? { background: "var(--gold)", color: "var(--navy)" }
                      : { background: "rgba(217,185,120,0.12)", color: "#FFFFFF" }
                  }
                >
                  CLAIM 2
                </span>
                <div>
                  <p className="mono text-[11px] tracking-wide mb-1" style={{ color: "var(--gold-light)" }}>DEPENDENT — narrows claim 1</p>
                  <p className="text-[15px] leading-relaxed" style={{ color: "#DCE3EE" }}>
                    The lithium-ion battery of claim 1, wherein the cathode
                    material further includes a stabilizing agent to enhance
                    thermal stability.
                  </p>
                </div>
              </div>
            </button>

            <div className="mt-6 pt-5 border-t text-sm leading-relaxed" style={{ borderColor: "var(--rule-on-navy)", color: "#B7C4D8" }}>
              {claimOpen === "independent"
                ? "Independent claims are read on their own — they must recite every element needed to make the invention distinct from prior art."
                : "A dependent claim can never broaden claim 1. If claim 1 falls, everything built on it falls too — which is why drafters keep independent claims lean and let dependents carry the detail."}
            </div>
          </div>

          {/* claim types */}
          <div className="grid sm:grid-cols-3 gap-4 mt-10">
            {[
              { t: "Independent", d: "Stands alone. Defines the broadest scope and the invention's unique features." },
              { t: "Dependent", d: "Builds on an independent claim, adding limitations for specific embodiments." },
              { t: "Multiple dependent", d: "Refers back to more than one prior claim — useful for covering variations." },
            ].map((c) => (
              <div key={c.t} className="pl-cell pl-deboss p-6 rounded-lg" style={{ background: "var(--ivory-dim)", border: "1px solid var(--rule)" }}>
                <p className="mono text-xs mb-2" style={{ color: "var(--gold-dark)" }}>{c.t.toUpperCase()}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--slate)" }}>{c.d}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* MISTAKES */}
      <section className="border-t" style={{ borderColor: "var(--rule)", background: "var(--ivory-dim)", position: "relative", zIndex: 1 }}>
        <Reveal className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="display text-2xl sm:text-3xl font-medium mb-8" style={{ color: "var(--navy)" }}>Where claims fail</h2>
          <div className="space-y-5">
            {mistakes.map((m) => (
              <div key={m.title} className="flex gap-4 items-start pb-5 border-b" style={{ borderColor: "var(--rule)" }}>
                <CircleAlert size={18} className="mt-0.5 shrink-0" style={{ color: "var(--navy-3)" }} />
                <div>
                  <p className="font-medium mb-1" style={{ color: "var(--ink)" }}>{m.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--slate)" }}>{m.desc}</p>
                </div>
              </div>
            ))}
            <div className="flex gap-4 items-start">
              <CircleCheck size={18} className="mt-0.5 shrink-0" style={{ color: "var(--gold-dark)" }} />
              <p className="text-sm leading-relaxed" style={{ color: "var(--slate)" }}>
                Clarity is the countermeasure to all three — precise, consistent
                terminology, one well-defined invention per claim, and a written
                description that supports every word.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FEE LEDGER */}
      <section id="fees" className="border-t" style={{ borderColor: "var(--rule)", position: "relative", zIndex: 1 }}>
        <Reveal className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="display text-2xl sm:text-3xl font-medium mb-8" style={{ color: "var(--navy)" }}>Fee schedule, by entity</h2>
          <IPFeeTable />
        </Reveal>
      </section>

      {/* PROCESS — real sequence, numbers earn their place */}
      <section className="border-t" style={{ borderColor: "var(--rule)", background: "var(--ivory-dim)", position: "relative", zIndex: 1 }}>
        <Reveal className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="display text-2xl sm:text-3xl font-medium mb-2" style={{ color: "var(--navy)" }}>The filing sequence</h2>
          <Divider />
          <div className="mt-8">
            {processSteps.map((s, i) => (
              <div key={s.n} className="pl-row flex gap-6 py-6 px-2 -mx-2 rounded-sm" style={{ borderTop: i === 0 ? "none" : "1px solid var(--rule)" }}>
                <div className="flex flex-col items-center shrink-0 w-14">
                  <span className="mono text-xs" style={{ color: "var(--gold-dark)" }}>{s.n}</span>
                  <s.icon size={20} className="mt-2" style={{ color: "var(--navy-3)" }} />
                </div>
                <div>
                  <p className="font-medium mb-1" style={{ color: "var(--ink)" }}>{s.title}</p>
                  <p className="text-sm leading-relaxed max-w-xl" style={{ color: "var(--slate)" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* CLOSING CTA — ink-navy panel, foil seal, matching hero */}
      <section className="border-t" style={{ borderColor: "var(--rule)", position: "relative", zIndex: 1 }}>
        <Reveal className="max-w-5xl mx-auto px-6 py-16">
          <div
            className="pl-emboss-navy pl-frame flex items-start justify-between gap-8 flex-wrap p-8 sm:p-10 rounded-sm relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, var(--navy) 0%, var(--navy-2) 100%)` }}
          >
            <span className="pl-corner-tr" aria-hidden="true" />
            <span className="pl-corner-bl" aria-hidden="true" />
            <div className="flex-1 min-w-[240px] relative">
              <Eyebrow dark>FINAL NOTICE</Eyebrow>
              <h2 className="display text-2xl sm:text-3xl font-medium mb-3" style={{ color: "#FBF6E9" }}>
                Ready to file your claim?
              </h2>
              <p className="text-sm leading-relaxed max-w-md" style={{ color: "#C7D3E3" }}>
                Perceptive Brains IP drafts, files, and prosecutes patent
                applications end to end. Bring us the invention — we'll bring
                the claims that hold up.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap self-center relative">
              <Link to="/contact" className="pl-cta pl-cta-foil mono text-xs px-5 py-3 tracking-wide rounded-sm inline-flex items-center gap-2 font-medium">
                <Handshake size={14} /> SCHEDULE A CONSULTATION
              </Link>
              <Link to="/services/patent-drafting-filing#claims" className="pl-cta mono text-xs px-5 py-3 tracking-wide border rounded-sm inline-flex items-center gap-2" style={{ borderColor: "rgba(217,185,120,0.4)", color: "#FBF6E9" }}>
                REVIEW CLAIMS <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}