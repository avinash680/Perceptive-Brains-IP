import React, { useState } from "react";
import {
  Gavel, FileSearch, ScrollText, MessagesSquare, RefreshCcw, Archive,
  LayoutGrid, CalendarClock, ShieldCheck, Users, ArrowRight,
} from "lucide-react";

const FONT_STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

.pp-root {
  --ink: #10182A;
  --ink-2: #1C2740;
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
.pp-root .display { font-family: 'Fraunces', serif; }
.pp-root .mono { font-family: 'IBM Plex Mono', monospace; }

.pp-seal { transition: transform 0.5s cubic-bezier(.2,.8,.2,1); }
.pp-seal-wrap:hover .pp-seal { transform: rotate(-8deg) scale(1.05); }

.pp-docket-btn { transition: all 0.2s ease; }

@media (prefers-reduced-motion: reduce) {
  .pp-seal, .pp-docket-btn { transition: none; }
}
`;

const responses = [
  {
    n: "01",
    title: "Understand the objection",
    icon: FileSearch,
    action: "Examiner cites two prior-art references and rejects Claims 1–4 as anticipated.",
    reply: "Review each reference against the claim language line by line, and isolate exactly which limitation the examiner believes is missing or already disclosed.",
  },
  {
    n: "02",
    title: "Amend the claims",
    icon: ScrollText,
    action: "Examiner finds Claim 1 too broad — it reads on a reference from 2019.",
    reply: "Narrow Claim 1 with a limitation drawn from the specification, distinguishing it from the cited reference while keeping the claim clear and fully supported.",
  },
  {
    n: "03",
    title: "Provide arguments",
    icon: MessagesSquare,
    action: "Examiner questions whether the invention is non-obvious over the combined references.",
    reply: "Argue the specific technical reasons a skilled person would not combine those references, and point to the unique result the invention achieves.",
  },
  {
    n: "04",
    title: "Engage the examiner",
    icon: Users,
    action: "Written arguments alone haven't resolved the rejection after one round.",
    reply: "Request an interview with the examiner to discuss the rejection directly and work toward claim language both sides can agree on.",
  },
];

const maintenance = [
  { title: "Maintenance fees", desc: "Paid at regular intervals to keep a patent in force. Miss the schedule, and the rights expire.", icon: CalendarClock },
  { title: "Strategic abandonment", desc: "Letting go of patents that no longer serve the business frees up budget for the ones that do.", icon: Archive },
  { title: "Portfolio optimization", desc: "A standing review of the portfolio surfaces patents needing more protection — or none at all.", icon: LayoutGrid },
  { title: "Renewal decisions", desc: "Weighed against market demand, the competitive landscape, and licensing opportunity, not habit.", icon: RefreshCcw },
];

const services = [
  {
    title: "Preparation & prosecution",
    icon: ShieldCheck,
    desc: "A well-prepared application is the foundation. Specifications and claims are built to meet legal requirements and withstand examination scrutiny from the outset.",
  },
  {
    title: "Office-action response",
    icon: MessagesSquare,
    desc: "Close engagement with the patent office at every objection — arguments and amendments crafted to move the application toward grant.",
  },
  {
    title: "End-to-end support",
    icon: Gavel,
    desc: "From first draft to maintenance and renewal, one team carries the file through its full lifecycle, including strategic abandonment when it serves the portfolio.",
  },
];

export default function PatentProsecutionLexgin() {
  const [active, setActive] = useState(0);
  const r = responses[active];

  return (
    <div className="pp-root min-h-screen w-full">
      <style>{FONT_STYLE}</style>

      {/* HERO */}
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-14">
        <div className="flex items-start justify-between gap-8 flex-wrap">
          <div className="flex-1 min-w-[280px]">
            <p className="mono text-xs tracking-[0.25em] mb-4" style={{ color: "var(--brass)" }}>
              DOCKET NO. IN/2026/PROS · LEXGIN COUNSEL
            </p>
            <h1 className="display text-5xl sm:text-6xl leading-[1.05] font-semibold" style={{ color: "var(--paper)" }}>
              Patent<br />Prosecution
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed" style={{ color: "var(--paper-dim)" }}>
              From filing to grant, an examiner tests every claim against
              novelty, non-obviousness, and industrial applicability. This is
              the record of that exchange — and how to answer it.
            </p>
            <div className="mt-8 flex gap-3 flex-wrap">
              <a href="#docket" className="mono text-xs px-5 py-3 tracking-wide" style={{ background: "var(--stamp)", color: "var(--paper)" }}>
                OPEN THE DOCKET →
              </a>
              <a href="#services" className="mono text-xs px-5 py-3 tracking-wide border" style={{ borderColor: "var(--rule-dark)", color: "var(--paper)" }}>
                LEXGIN SERVICES
              </a>
            </div>
          </div>

          <div className="pp-seal-wrap shrink-0">
            <svg className="pp-seal" width="150" height="150" viewBox="0 0 150 150">
              <circle cx="75" cy="75" r="70" fill="none" stroke="var(--brass)" strokeWidth="1.5" />
              <circle cx="75" cy="75" r="60" fill="none" stroke="var(--brass)" strokeWidth="1" strokeDasharray="2 4" />
              <text x="75" y="45" textAnchor="middle" className="mono" fontSize="8" fill="var(--brass)" letterSpacing="2">OFFICE</text>
              <text x="75" y="112" textAnchor="middle" className="mono" fontSize="8" fill="var(--brass)" letterSpacing="2">ACTION</text>
              <text x="75" y="88" textAnchor="middle" fontSize="22" fill="var(--paper)" fontWeight="600">⚖</text>
            </svg>
          </div>
        </div>
      </div>

      {/* EXAMINATION PROCESS */}
      <section className="border-t" style={{ borderColor: "var(--rule-dark)" }}>
        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="mono text-xs tracking-[0.25em] mb-2" style={{ color: "var(--brass)" }}>EXHIBIT A</p>
          <h2 className="display text-3xl font-medium mb-6" style={{ color: "var(--paper)" }}>What the examiner tests</h2>
          <div className="grid sm:grid-cols-3 gap-px" style={{ background: "var(--rule-dark)" }}>
            {[
              { t: "Novelty", d: "A prior-art search checks whether the invention already exists in some form." },
              { t: "Non-obviousness", d: "The claims must go beyond what a skilled person would find obvious to combine." },
              { t: "Industrial applicability", d: "The invention has to be capable of being made or used in an industry." },
            ].map((c) => (
              <div key={c.t} className="p-6" style={{ background: "var(--ink-2)" }}>
                <p className="mono text-xs mb-2" style={{ color: "var(--brass)" }}>{c.t.toUpperCase()}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--paper-dim)" }}>{c.d}</p>
              </div>
            ))}
          </div>
          <p className="text-sm leading-relaxed mt-6 max-w-xl" style={{ color: "var(--paper-dim)" }}>
            Examiners also read claims for clarity and support in the
            specification. Where a claim falls short, they issue an office
            action — and the applicant has to answer it.
          </p>
        </div>
      </section>

      {/* OFFICE ACTION DOCKET — signature element */}
      <section id="docket" className="border-t" style={{ borderColor: "var(--rule-dark)" }}>
        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="mono text-xs tracking-[0.25em] mb-2" style={{ color: "var(--brass)" }}>EXHIBIT B</p>
          <h2 className="display text-3xl font-medium mb-3" style={{ color: "var(--paper)" }}>The docket: action and response</h2>
          <p className="max-w-xl text-sm leading-relaxed mb-10" style={{ color: "var(--paper-dim)" }}>
            Every office action calls for one of four strategies. Step through
            the docket to see how an objection on the left is answered on the
            right.
          </p>

          {/* step selector */}
          <div className="flex flex-wrap gap-px mb-px" style={{ background: "var(--rule-dark)" }}>
            {responses.map((res, i) => (
              <button
                key={res.n}
                onClick={() => setActive(i)}
                className="pp-docket-btn mono text-xs flex-1 min-w-[140px] py-3 px-3 tracking-wide text-left flex items-center gap-2"
                style={{
                  background: active === i ? "var(--paper)" : "var(--ink-2)",
                  color: active === i ? "var(--ink)" : "var(--paper-dim)",
                }}
              >
                <res.icon size={14} />
                {res.n} · {res.title.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-px" style={{ background: "var(--rule-dark)" }}>
            <div className="p-6 sm:p-8" style={{ background: "var(--ink-2)" }}>
              <p className="mono text-[11px] tracking-wide mb-3" style={{ color: "var(--stamp-dim)" }}>
                ▣ OFFICE ACTION
              </p>
              <p className="text-[15px] leading-relaxed" style={{ color: "var(--paper)" }}>{r.action}</p>
            </div>
            <div className="p-6 sm:p-8" style={{ background: "var(--paper)", color: "var(--ink)" }}>
              <p className="mono text-[11px] tracking-wide mb-3" style={{ color: "var(--stamp)" }}>
                ✒ RESPONSE FILED — {r.title.toUpperCase()}
              </p>
              <p className="text-[15px] leading-relaxed">{r.reply}</p>
            </div>
          </div>
        </div>
      </section>

      {/* MAINTENANCE & RENEWAL */}
      <section className="border-t" style={{ borderColor: "var(--rule-dark)" }}>
        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="mono text-xs tracking-[0.25em] mb-2" style={{ color: "var(--brass)" }}>EXHIBIT C</p>
          <h2 className="display text-3xl font-medium mb-10" style={{ color: "var(--paper)" }}>After the grant</h2>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
            {maintenance.map((m) => (
              <div key={m.title} className="flex gap-4 items-start">
                <m.icon size={18} className="mt-0.5 shrink-0" style={{ color: "var(--brass)" }} />
                <div>
                  <p className="font-medium mb-1" style={{ color: "var(--paper)" }}>{m.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--paper-dim)" }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEXGIN SERVICES */}
      <section id="services" className="border-t" style={{ borderColor: "var(--rule-dark)" }}>
        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="mono text-xs tracking-[0.25em] mb-2" style={{ color: "var(--brass)" }}>EXHIBIT D</p>
          <h2 className="display text-3xl font-medium mb-10" style={{ color: "var(--paper)" }}>Lexgin's prosecution services</h2>
          <div className="grid sm:grid-cols-3 gap-px" style={{ background: "var(--rule-dark)" }}>
            {services.map((s) => (
              <div key={s.title} className="p-6" style={{ background: "var(--ink-2)" }}>
                <s.icon size={20} style={{ color: "var(--brass)" }} className="mb-4" />
                <p className="font-medium mb-2" style={{ color: "var(--paper)" }}>{s.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--paper-dim)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex items-center gap-2 mono text-xs tracking-wide" style={{ color: "var(--brass)" }}>
            <span>PREPARATION</span>
            <ArrowRight size={12} />
            <span>PROSECUTION</span>
            <ArrowRight size={12} />
            <span>GRANT</span>
            <ArrowRight size={12} />
            <span>MAINTENANCE</span>
          </div>
        </div>
      </section>
    </div>
  );
}