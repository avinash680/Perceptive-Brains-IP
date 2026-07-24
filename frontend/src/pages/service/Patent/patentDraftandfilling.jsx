import React, { useState, useEffect, useRef } from "react";
import { Stamp, ScrollText, Scale, FileSearch, Gavel, BookMarked, ChevronRight, CircleCheck, CircleAlert, Handshake } from "lucide-react";

/* =====================================================================
   Palette taken directly from the Perceptive Brains IP mark:
   deep navy (the neural hemisphere), gold (the organic hemisphere),
   and a white/paper field, matching the logo's own background.
===================================================================== */
const FONT_STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

.pl-root {
  --navy: #0A1F3D;
  --navy-2: #14335C;
  --navy-tint: #EEF1F6;
  --gold: #C9A227;
  --gold-light: #E3C468;
  --gold-dark: #96751A;
  --paper: #FFFFFF;
  --paper-dim: #F5F6F8;
  --ink: #10182A;
  --slate: #5B6B80;
  --rule: #E2E6EC;
  --rule-on-navy: rgba(255,255,255,0.16);
  font-family: 'IBM Plex Sans', sans-serif;
  background: var(--paper);
  color: var(--ink);
}
.pl-root .display { font-family: 'Fraunces', serif; }
.pl-root .mono { font-family: 'IBM Plex Mono', monospace; }

.pl-seal {
  transition: transform 0.5s cubic-bezier(.2,.8,.2,1);
}
.pl-seal-wrap:hover .pl-seal,
.pl-seal-wrap:focus-visible .pl-seal { transform: rotate(-8deg) scale(1.05); }

.pl-tab {
  transition: all 0.2s ease;
}
.pl-tab:focus-visible,
.pl-cta:focus-visible,
.pl-claim:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 2px;
}

.pl-claim-line {
  position: relative;
}
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
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.pl-reveal.pl-in {
  opacity: 1;
  transform: translateY(0);
}

.pl-row {
  transition: background 0.2s ease;
}
.pl-row:hover {
  background: var(--navy-tint);
}
.pl-cell {
  transition: transform 0.2s ease, border-color 0.2s ease;
}
.pl-cell:hover {
  transform: translateY(-2px);
}

@media (prefers-reduced-motion: reduce) {
  .pl-seal, .pl-tab, .pl-reveal, .pl-row, .pl-cell { transition: none; }
  .pl-reveal { opacity: 1; transform: none; }
}
`;

const feeSchedule = {
  individual: {
    label: "Individual / Natural Person",
    filing: ["INR 1,600", "INR 1,750"],
    claim: "INR 320",
    page: "INR 160",
    renewal: ["INR 800", "INR 2,400", "INR 4,800", "INR 8,000"],
  },
  small: {
    label: "Small Entity",
    filing: ["INR 4,000", "INR 4,400"],
    claim: "INR 800",
    page: "INR 400",
    renewal: ["INR 2,000", "INR 6,000", "INR 12,000", "INR 20,000"],
  },
  large: {
    label: "Other / Large Entity",
    filing: ["INR 8,000", "INR 8,800"],
    claim: "INR 1,600",
    page: "INR 800",
    renewal: ["INR 4,000", "INR 12,000", "INR 24,000", "INR 40,000"],
  },
};

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

export default function PatentDraftingPerceptiveBrains() {
  const [entity, setEntity] = useState("individual");
  const [claimOpen, setClaimOpen] = useState("independent");
  const fee = feeSchedule[entity];

  return (
    <div className="pl-root min-h-screen w-full">
      <style>{FONT_STYLE}</style>

      {/* HERO — navy cover panel, matching the logo's dark hemisphere */}
      <div style={{ background: `linear-gradient(160deg, var(--navy) 0%, var(--navy-2) 100%)` }}>
        <div className="max-w-5xl mx-auto px-6 pt-16 pb-14">
          <div className="flex items-start justify-between gap-8 flex-wrap">
            <div className="flex-1 min-w-[280px]">
              <p className="mono text-xs tracking-[0.25em] mb-4" style={{ color: "var(--gold-light)" }}>
                APPLICATION NO. IN/2026/PAT · PERCEPTIVE BRAINS IP
              </p>
              <h1 className="display text-4xl sm:text-5xl md:text-6xl leading-[1.05] font-semibold" style={{ color: "#FFFFFF" }}>
                Patent Claim<br />Drafting &amp; Filing
              </h1>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed" style={{ color: "#C7D3E3" }}>
                Claims are the legal definition of an invention — what is protected,
                and what is not. This is the record of how to draft them, what they
                cost to file in India, and where drafters go wrong.
              </p>
              <div className="mt-8 flex gap-3 flex-wrap">
                <a href="#claims" className="pl-cta mono text-xs px-5 py-3 tracking-wide rounded-sm" style={{ background: "var(--gold)", color: "var(--navy)" }}>
                  READ THE CLAIMS →
                </a>
                <a href="#fees" className="pl-cta mono text-xs px-5 py-3 tracking-wide border rounded-sm" style={{ borderColor: "rgba(255,255,255,0.3)", color: "#FFFFFF" }}>
                  VIEW FEE SCHEDULE
                </a>
              </div>
            </div>

            {/* seal */}
            <div className="pl-seal-wrap shrink-0" tabIndex={0}>
              <svg className="pl-seal" width="150" height="150" viewBox="0 0 150 150" role="img" aria-label="Patent claim seal">
                <circle cx="75" cy="75" r="70" fill="none" stroke="var(--gold)" strokeWidth="1.5" />
                <circle cx="75" cy="75" r="60" fill="none" stroke="var(--gold)" strokeWidth="1" strokeDasharray="2 4" />
                <text x="75" y="45" textAnchor="middle" className="mono" fontSize="8" fill="var(--gold-light)" letterSpacing="2">PATENT</text>
                <text x="75" y="112" textAnchor="middle" className="mono" fontSize="8" fill="var(--gold-light)" letterSpacing="2">CLAIM 1</text>
                <text x="75" y="85" textAnchor="middle" className="display" fontSize="26" fill="#FFFFFF" fontWeight="600">§</text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* CLAIM FAMILY — signature element */}
      <section id="claims" className="border-t" style={{ borderColor: "var(--rule)" }}>
        <Reveal className="max-w-5xl mx-auto px-6 py-16">
          <p className="mono text-xs tracking-[0.25em] mb-2" style={{ color: "var(--gold-dark)" }}>EXHIBIT A</p>
          <h2 className="display text-2xl sm:text-3xl font-medium mb-3" style={{ color: "var(--navy)" }}>How a claim family reads</h2>
          <p className="max-w-xl text-sm leading-relaxed mb-10" style={{ color: "var(--slate)" }}>
            An independent claim stands alone and defines the broadest scope.
            Dependent claims attach beneath it, narrowing the scope with
            additional limitations. Here is one real family, on a lithium-ion
            battery.
          </p>

          <div className="p-6 sm:p-8" style={{ background: "var(--navy)", color: "#FFFFFF" }}>
            <button
              type="button"
              className="pl-claim flex items-start gap-3 cursor-pointer w-full text-left rounded-sm"
              onClick={() => setClaimOpen("independent")}
              aria-pressed={claimOpen === "independent"}
            >
              <span className="mono text-xs px-2 py-1 shrink-0" style={{ background: claimOpen === "independent" ? "var(--gold)" : "rgba(255,255,255,0.1)", color: claimOpen === "independent" ? "var(--navy)" : "#FFFFFF" }}>
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
                <span className="mono text-xs px-2 py-1 shrink-0" style={{ background: claimOpen === "dependent" ? "var(--gold)" : "rgba(255,255,255,0.1)", color: claimOpen === "dependent" ? "var(--navy)" : "#FFFFFF" }}>
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
              <div key={c.t} className="pl-cell p-6 rounded-lg" style={{ background: "var(--paper-dim)", border: "1px solid var(--rule)" }}>
                <p className="mono text-xs mb-2" style={{ color: "var(--gold-dark)" }}>{c.t.toUpperCase()}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--slate)" }}>{c.d}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* MISTAKES */}
      <section className="border-t" style={{ borderColor: "var(--rule)", background: "var(--paper-dim)" }}>
        <Reveal className="max-w-5xl mx-auto px-6 py-16">
          <p className="mono text-xs tracking-[0.25em] mb-2" style={{ color: "var(--gold-dark)" }}>EXHIBIT B</p>
          <h2 className="display text-2xl sm:text-3xl font-medium mb-8" style={{ color: "var(--navy)" }}>Where claims fail</h2>
          <div className="space-y-5">
            {mistakes.map((m) => (
              <div key={m.title} className="flex gap-4 items-start pb-5 border-b" style={{ borderColor: "var(--rule)" }}>
                <CircleAlert size={18} className="mt-0.5 shrink-0" style={{ color: "var(--navy-2)" }} />
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
      <section id="fees" className="border-t" style={{ borderColor: "var(--rule)" }}>
        <Reveal className="max-w-5xl mx-auto px-6 py-16">
          <p className="mono text-xs tracking-[0.25em] mb-2" style={{ color: "var(--gold-dark)" }}>EXHIBIT C — INDIA</p>
          <h2 className="display text-2xl sm:text-3xl font-medium mb-8" style={{ color: "var(--navy)" }}>Fee schedule, by entity</h2>

          <div className="flex flex-col sm:flex-row gap-2 mb-px">
            {Object.entries(feeSchedule).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setEntity(key)}
                className="pl-tab mono text-xs flex-1 py-3 px-2 tracking-wide rounded-sm"
                aria-pressed={entity === key}
                style={{
                  background: entity === key ? "var(--navy)" : "var(--paper-dim)",
                  color: entity === key ? "#FFFFFF" : "var(--slate)",
                  border: `1px solid ${entity === key ? "var(--navy)" : "var(--rule)"}`,
                }}
              >
                {val.label.toUpperCase()}
              </button>
            ))}
          </div>

          <div style={{ background: "var(--navy)", color: "#FFFFFF" }} className="p-6 sm:p-8 mt-4">
            <div className="grid sm:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="mono text-[11px] tracking-wide mb-2" style={{ color: "var(--gold-light)" }}>FILING FEE</p>
                <p className="display text-2xl">{fee.filing[0]} <span className="text-sm" style={{ color: "#9FB0C8" }}>e-filing</span></p>
                <p className="display text-lg mt-1">{fee.filing[1]} <span className="text-sm" style={{ color: "#9FB0C8" }}>physical filing</span></p>
              </div>
              <div>
                <p className="mono text-[11px] tracking-wide mb-2" style={{ color: "var(--gold-light)" }}>ADDITIONAL COSTS</p>
                <p className="text-sm leading-relaxed" style={{ color: "#DCE3EE" }}>Each claim beyond the standard set: <span className="mono">{fee.claim}</span></p>
                <p className="text-sm leading-relaxed" style={{ color: "#DCE3EE" }}>Each page over 30: <span className="mono">{fee.page}</span></p>
              </div>
            </div>

            <p className="mono text-[11px] tracking-wide mb-3 pt-6 border-t" style={{ borderColor: "var(--rule-on-navy)", color: "var(--gold-light)" }}>
              ANNUAL RENEWAL, PER YEAR
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                ["Years 1–3", fee.renewal[0]],
                ["Years 4–6", fee.renewal[1]],
                ["Years 7–9", fee.renewal[2]],
                ["Years 10–20", fee.renewal[3]],
              ].map(([label, amt]) => (
                <div key={label}>
                  <p className="text-xs mb-1" style={{ color: "#9FB0C8" }}>{label}</p>
                  <p className="mono text-base sm:text-lg">{amt}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs mt-4" style={{ color: "var(--slate)" }}>
            Expedited examination — roughly 6 months to a year against 2–3 years
            on the normal route — requires a female applicant among the inventors,
            and runs INR 8,000 against the INR 4,000 normal-route fee.
          </p>
        </Reveal>
      </section>

      {/* PROCESS — real sequence, numbers earn their place */}
      <section className="border-t" style={{ borderColor: "var(--rule)", background: "var(--paper-dim)" }}>
        <Reveal className="max-w-5xl mx-auto px-6 py-16">
          <p className="mono text-xs tracking-[0.25em] mb-2" style={{ color: "var(--gold-dark)" }}>EXHIBIT D</p>
          <h2 className="display text-2xl sm:text-3xl font-medium mb-10" style={{ color: "var(--navy)" }}>The filing sequence</h2>

          <div>
            {processSteps.map((s, i) => (
              <div key={s.n} className="pl-row flex gap-6 py-6 px-2 -mx-2 rounded-sm" style={{ borderTop: i === 0 ? "none" : "1px solid var(--rule)" }}>
                <div className="flex flex-col items-center shrink-0 w-14">
                  <span className="mono text-xs" style={{ color: "var(--gold-dark)" }}>{s.n}</span>
                  <s.icon size={20} className="mt-2" style={{ color: "var(--navy-2)" }} />
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

      {/* CLOSING CTA — navy panel, gold seal, matching hero */}
      <section className="border-t" style={{ borderColor: "var(--rule)" }}>
        <Reveal className="max-w-5xl mx-auto px-6 py-16">
          <div
            className="flex items-start justify-between gap-8 flex-wrap p-8 sm:p-10 rounded-lg relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, var(--navy) 0%, var(--navy-2) 100%)` }}
          >
            <div className="flex-1 min-w-[240px] relative">
              <p className="mono text-xs tracking-[0.25em] mb-3" style={{ color: "var(--gold-light)" }}>FINAL NOTICE</p>
              <h2 className="display text-2xl sm:text-3xl font-medium mb-3" style={{ color: "#FFFFFF" }}>
                Ready to file your claim?
              </h2>
              <p className="text-sm leading-relaxed max-w-md" style={{ color: "#C7D3E3" }}>
                Perceptive Brains IP drafts, files, and prosecutes patent
                applications end to end. Bring us the invention — we'll bring
                the claims that hold up.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap self-center relative">
              <a href="#" className="pl-cta mono text-xs px-5 py-3 tracking-wide rounded-sm inline-flex items-center gap-2" style={{ background: "var(--gold)", color: "var(--navy)" }}>
                <Handshake size={14} /> SCHEDULE A CONSULTATION
              </a>
              <a href="#claims" className="pl-cta mono text-xs px-5 py-3 tracking-wide border rounded-sm inline-flex items-center gap-2" style={{ borderColor: "rgba(255,255,255,0.3)", color: "#FFFFFF" }}>
                REVIEW EXHIBIT A <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}