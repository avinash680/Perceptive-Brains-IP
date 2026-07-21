import React, { useState } from "react";
import { Stamp, ScrollText, Scale, FileSearch, Gavel, BookMarked, ChevronRight, CircleCheck, CircleAlert } from "lucide-react";

const FONT_STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

.pl-root {
  --ink: #10182A;
  --ink-2: #1C2740;
  --ink-3: #29365430;
  --paper: #EDE7D6;
  --paper-dim: #DCD5BE;
  --stamp: #9C2B1F;
  --stamp-dim: #C0483A;
  --brass: #B98D3E;
  --rule-dark: rgba(237,231,214,0.16);
  --rule-light: rgba(16,24,42,0.14);
  font-family: 'IBM Plex Sans', sans-serif;
  background: var(--ink);
  color: var(--paper);
}
.pl-root .display { font-family: 'Fraunces', serif; }
.pl-root .mono { font-family: 'IBM Plex Mono', monospace; }

.pl-seal {
  transition: transform 0.5s cubic-bezier(.2,.8,.2,1);
}
.pl-seal-wrap:hover .pl-seal { transform: rotate(-8deg) scale(1.05); }

.pl-tab {
  transition: all 0.2s ease;
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
  background: var(--rule-light);
}
.pl-claim-line::after {
  content: "";
  position: absolute;
  left: -20px;
  top: 50%;
  width: 20px;
  height: 1px;
  background: var(--rule-light);
}

@media (prefers-reduced-motion: reduce) {
  .pl-seal, .pl-tab { transition: none; }
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

export default function PatentDraftingLexgin() {
  const [entity, setEntity] = useState("individual");
  const [claimOpen, setClaimOpen] = useState("independent");
  const fee = feeSchedule[entity];

  return (
    <div className="pl-root min-h-screen w-full">
      <style>{FONT_STYLE}</style>

      {/* HERO — styled as a patent cover page */}
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-14">
        <div className="flex items-start justify-between gap-8 flex-wrap">
          <div className="flex-1 min-w-[280px]">
            <p className="mono text-xs tracking-[0.25em] mb-4" style={{ color: "var(--brass)" }}>
              APPLICATION NO. IN/2026/PAT · LEXGIN COUNSEL
            </p>
            <h1 className="display text-5xl sm:text-6xl leading-[1.05] font-semibold" style={{ color: "var(--paper)" }}>
              Patent Claim<br />Drafting &amp; Filing
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed" style={{ color: "var(--paper-dim)" }}>
              Claims are the legal definition of an invention — what is protected,
              and what is not. This is the record of how to draft them, what they
              cost to file in India, and where drafters go wrong.
            </p>
            <div className="mt-8 flex gap-3 flex-wrap">
              <a href="#claims" className="mono text-xs px-5 py-3 tracking-wide" style={{ background: "var(--stamp)", color: "var(--paper)" }}>
                READ THE CLAIMS →
              </a>
              <a href="#fees" className="mono text-xs px-5 py-3 tracking-wide border" style={{ borderColor: "var(--rule-dark)", color: "var(--paper)" }}>
                VIEW FEE SCHEDULE
              </a>
            </div>
          </div>

          {/* seal */}
          <div className="pl-seal-wrap shrink-0">
            <svg className="pl-seal" width="150" height="150" viewBox="0 0 150 150">
              <circle cx="75" cy="75" r="70" fill="none" stroke="var(--brass)" strokeWidth="1.5" />
              <circle cx="75" cy="75" r="60" fill="none" stroke="var(--brass)" strokeWidth="1" strokeDasharray="2 4" />
              <text x="75" y="45" textAnchor="middle" className="mono" fontSize="8" fill="var(--brass)" letterSpacing="2">PATENT</text>
              <text x="75" y="112" textAnchor="middle" className="mono" fontSize="8" fill="var(--brass)" letterSpacing="2">CLAIM 1</text>
              <text x="75" y="85" textAnchor="middle" className="display" fontSize="26" fill="var(--paper)" fontWeight="600">§</text>
            </svg>
          </div>
        </div>
      </div>

      {/* CLAIM FAMILY — signature element */}
      <section id="claims" className="border-t" style={{ borderColor: "var(--rule-dark)" }}>
        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="mono text-xs tracking-[0.25em] mb-2" style={{ color: "var(--brass)" }}>EXHIBIT A</p>
          <h2 className="display text-3xl font-medium mb-3" style={{ color: "var(--paper)" }}>How a claim family reads</h2>
          <p className="max-w-xl text-sm leading-relaxed mb-10" style={{ color: "var(--paper-dim)" }}>
            An independent claim stands alone and defines the broadest scope.
            Dependent claims attach beneath it, narrowing the scope with
            additional limitations. Here is one real family, on a lithium-ion
            battery.
          </p>

          <div
            className="p-6 sm:p-8"
            style={{ background: "var(--paper)", color: "var(--ink)" }}
            onClick={() => setClaimOpen("independent")}
          >
            <div className="flex items-start gap-3 cursor-pointer">
              <span className="mono text-xs px-2 py-1 shrink-0" style={{ background: claimOpen === "independent" ? "var(--stamp)" : "var(--ink)", color: "var(--paper)" }}>
                CLAIM 1
              </span>
              <div>
                <p className="mono text-[11px] tracking-wide mb-1" style={{ color: "var(--stamp)" }}>INDEPENDENT — broadest scope</p>
                <p className="text-[15px] leading-relaxed">
                  A lithium-ion battery comprising a cathode with a specific
                  material composition that increases energy density by 20%,
                  an anode composed of carbon nanotubes, and an electrolyte
                  with a proprietary formulation.
                </p>
              </div>
            </div>

            <div className="mt-8 ml-10 pl-6 pl-claim-line cursor-pointer" onClick={(e) => { e.stopPropagation(); setClaimOpen("dependent"); }}>
              <div className="flex items-start gap-3">
                <span className="mono text-xs px-2 py-1 shrink-0" style={{ background: claimOpen === "dependent" ? "var(--stamp)" : "var(--ink)", color: "var(--paper)" }}>
                  CLAIM 2
                </span>
                <div>
                  <p className="mono text-[11px] tracking-wide mb-1" style={{ color: "var(--stamp)" }}>DEPENDENT — narrows claim 1</p>
                  <p className="text-[15px] leading-relaxed">
                    The lithium-ion battery of claim 1, wherein the cathode
                    material further includes a stabilizing agent to enhance
                    thermal stability.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t text-sm leading-relaxed" style={{ borderColor: "var(--rule-light)", color: "#3A4258" }}>
              {claimOpen === "independent"
                ? "Independent claims are read on their own — they must recite every element needed to make the invention distinct from prior art."
                : "A dependent claim can never broaden claim 1. If claim 1 falls, everything built on it falls too — which is why drafters keep independent claims lean and let dependents carry the detail."}
            </div>
          </div>

          {/* claim types */}
          <div className="grid sm:grid-cols-3 gap-px mt-10" style={{ background: "var(--rule-dark)" }}>
            {[
              { t: "Independent", d: "Stands alone. Defines the broadest scope and the invention's unique features." },
              { t: "Dependent", d: "Builds on an independent claim, adding limitations for specific embodiments." },
              { t: "Multiple dependent", d: "Refers back to more than one prior claim — useful for covering variations." },
            ].map((c) => (
              <div key={c.t} className="p-6" style={{ background: "var(--ink-2)" }}>
                <p className="mono text-xs mb-2" style={{ color: "var(--brass)" }}>{c.t.toUpperCase()}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--paper-dim)" }}>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISTAKES */}
      <section className="border-t" style={{ borderColor: "var(--rule-dark)" }}>
        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="mono text-xs tracking-[0.25em] mb-2" style={{ color: "var(--brass)" }}>EXHIBIT B</p>
          <h2 className="display text-3xl font-medium mb-8" style={{ color: "var(--paper)" }}>Where claims fail</h2>
          <div className="space-y-5">
            {mistakes.map((m) => (
              <div key={m.title} className="flex gap-4 items-start pb-5 border-b" style={{ borderColor: "var(--rule-dark)" }}>
                <CircleAlert size={18} className="mt-0.5 shrink-0" style={{ color: "var(--stamp-dim)" }} />
                <div>
                  <p className="font-medium mb-1" style={{ color: "var(--paper)" }}>{m.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--paper-dim)" }}>{m.desc}</p>
                </div>
              </div>
            ))}
            <div className="flex gap-4 items-start">
              <CircleCheck size={18} className="mt-0.5 shrink-0" style={{ color: "var(--brass)" }} />
              <p className="text-sm leading-relaxed" style={{ color: "var(--paper-dim)" }}>
                Clarity is the countermeasure to all three — precise, consistent
                terminology, one well-defined invention per claim, and a written
                description that supports every word.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEE LEDGER */}
      <section id="fees" className="border-t" style={{ borderColor: "var(--rule-dark)" }}>
        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="mono text-xs tracking-[0.25em] mb-2" style={{ color: "var(--brass)" }}>EXHIBIT C — INDIA</p>
          <h2 className="display text-3xl font-medium mb-8" style={{ color: "var(--paper)" }}>Fee schedule, by entity</h2>

          <div className="flex gap-px mb-px" style={{ background: "var(--rule-dark)" }}>
            {Object.entries(feeSchedule).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setEntity(key)}
                className="pl-tab mono text-xs flex-1 py-3 px-2 tracking-wide"
                style={{
                  background: entity === key ? "var(--paper)" : "var(--ink-2)",
                  color: entity === key ? "var(--ink)" : "var(--paper-dim)",
                }}
              >
                {val.label.toUpperCase()}
              </button>
            ))}
          </div>

          <div style={{ background: "var(--paper)", color: "var(--ink)" }} className="p-6 sm:p-8">
            <div className="grid sm:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="mono text-[11px] tracking-wide mb-2" style={{ color: "var(--stamp)" }}>FILING FEE</p>
                <p className="display text-2xl">{fee.filing[0]} <span className="text-sm" style={{ color: "#5a5a4d" }}>e-filing</span></p>
                <p className="display text-lg mt-1">{fee.filing[1]} <span className="text-sm" style={{ color: "#5a5a4d" }}>physical filing</span></p>
              </div>
              <div>
                <p className="mono text-[11px] tracking-wide mb-2" style={{ color: "var(--stamp)" }}>ADDITIONAL COSTS</p>
                <p className="text-sm leading-relaxed">Each claim beyond the standard set: <span className="mono">{fee.claim}</span></p>
                <p className="text-sm leading-relaxed">Each page over 30: <span className="mono">{fee.page}</span></p>
              </div>
            </div>

            <p className="mono text-[11px] tracking-wide mb-3 pt-6 border-t" style={{ borderColor: "var(--rule-light)", color: "var(--stamp)" }}>
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
                  <p className="text-xs mb-1" style={{ color: "#5a5a4d" }}>{label}</p>
                  <p className="mono text-lg">{amt}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs mt-4" style={{ color: "var(--paper-dim)" }}>
            Expedited examination — roughly 6 months to a year against 2–3 years
            on the normal route — requires a female applicant among the inventors,
            and runs INR 8,000 against the INR 4,000 normal-route fee.
          </p>
        </div>
      </section>

      {/* PROCESS — real sequence, numbers earn their place */}
      <section className="border-t" style={{ borderColor: "var(--rule-dark)" }}>
        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="mono text-xs tracking-[0.25em] mb-2" style={{ color: "var(--brass)" }}>EXHIBIT D</p>
          <h2 className="display text-3xl font-medium mb-10" style={{ color: "var(--paper)" }}>The filing sequence</h2>

          <div>
            {processSteps.map((s, i) => (
              <div key={s.n} className="flex gap-6 py-6" style={{ borderTop: i === 0 ? "none" : "1px solid var(--rule-dark)" }}>
                <div className="flex flex-col items-center shrink-0 w-14">
                  <span className="mono text-xs" style={{ color: "var(--brass)" }}>{s.n}</span>
                  <s.icon size={20} className="mt-2" style={{ color: "var(--paper-dim)" }} />
                </div>
                <div>
                  <p className="font-medium mb-1" style={{ color: "var(--paper)" }}>{s.title}</p>
                  <p className="text-sm leading-relaxed max-w-xl" style={{ color: "var(--paper-dim)" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}