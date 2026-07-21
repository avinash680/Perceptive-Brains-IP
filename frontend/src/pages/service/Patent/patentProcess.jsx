import React, { useState } from "react";
import {
  FileSignature, Mail, Clock3, Users, CreditCard, Send, Inbox,
  FileText, MessageCircle, CheckCircle2, ArrowUpRight, ExternalLink,
} from "lucide-react";

const FONT_STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

.pf-root {
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
.pf-root .display { font-family: 'Fraunces', serif; }
.pf-root .mono { font-family: 'IBM Plex Mono', monospace; }

.pf-seal { transition: transform 0.5s cubic-bezier(.2,.8,.2,1); }
.pf-seal-wrap:hover .pf-seal { transform: rotate(-8deg) scale(1.05); }

.pf-step { transition: background 0.15s ease, border-color 0.15s ease; }
.pf-step:hover { background: rgba(237,231,214,0.04); }

.pf-line { position: relative; }
.pf-line::before {
  content: "";
  position: absolute;
  left: 23px;
  top: 52px;
  bottom: -4px;
  width: 1px;
  background: var(--rule-dark);
}
.pf-step:last-child .pf-line::before { display: none; }

.pf-link {
  transition: all 0.15s ease;
}

@media (prefers-reduced-motion: reduce) {
  .pf-seal, .pf-step, .pf-link { transition: none; }
}
`;

const steps = [
  {
    n: "01",
    icon: FileSignature,
    text: "Sign the non-disclosure agreement.",
    cta: { label: "Download NDA", href: "https://www.lexgin.com/wp-content/uploads/2022/11/NDA_BLANK-V8.0.pdf" },
  },
  {
    n: "02",
    icon: Mail,
    text: "Send the full invention write-up in MS Word format.",
    contact: [
      { label: "info@lexgin.com", href: "mailto:info@lexgin.com" },
      { label: "WhatsApp 9971117009", href: "https://wa.me/919971117009" },
    ],
  },
  {
    n: "03",
    icon: Clock3,
    text: "We review the invention and respond within 24 hours, with a fee discussion.",
    cta: { label: "Check patent fee", href: "https://www.lexgin.com/service/patent-filing/" },
  },
  {
    n: "04",
    icon: Users,
    text: "Prepare the list of applicants and inventors.",
    cta: { label: "Download template", href: "https://workdrive.zohopublic.in/external/b221cad561b99a9e15ce31532b4363292c5f6bcd936d158f933aa05bc41c2de7/download" },
  },
  {
    n: "05",
    icon: CreditCard,
    text: "Confirm the application with payment.",
    cta: { label: "Make payment", href: "https://www.lexgin.com/service/patent-filing/" },
  },
  {
    n: "06",
    icon: Send,
    text: "Submit the invention write-up and the applicant list.",
    cta: { label: "Submit the work", href: "https://bit.ly/ipr-form" },
  },
  {
    n: "07",
    icon: Inbox,
    text: "A docket number arrives by email within 2 hours, and work begins.",
  },
  {
    n: "08",
    icon: FileText,
    text: "Forms and the draft specification arrive within 3–5 days.",
  },
  {
    n: "09",
    icon: MessageCircle,
    text: "The team reaches out on WhatsApp from 9971117009 for anything further.",
    cta: { label: "Save the number", href: "tel:919971117009" },
  },
  {
    n: "10",
    icon: CheckCircle2,
    text: "On your approval, the application is filed — you can then track its status.",
    cta: { label: "Check status", href: "https://creatorapp.zohopublic.in/info_lexgin/patent-application-management/page-perma/Portal/EG47E13HNmgQ1GZ5vP8VhtxsrPQy62262HpVTUJqeuYT6WU4bYRBxdhMf6674NPZEjuKXUX36HU6k5DnKyxREtPkCBTMyKmFmef9" },
  },
];

export default function PatentProcessLexgin() {
  const [open, setOpen] = useState(0);

  return (
    <div className="pf-root min-h-screen w-full">
      <style>{FONT_STYLE}</style>

      {/* HERO */}
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-14">
        <div className="flex items-start justify-between gap-8 flex-wrap">
          <div className="flex-1 min-w-[280px]">
            <p className="mono text-xs tracking-[0.25em] mb-4" style={{ color: "var(--brass)" }}>
              PROCESS DOCKET · LEXGIN COUNSEL
            </p>
            <h1 className="display text-5xl sm:text-6xl leading-[1.05] font-semibold" style={{ color: "var(--paper)" }}>
              Patent Process<br />Flow Chart
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed" style={{ color: "var(--paper-dim)" }}>
              A patent is an exclusive right granted for an invention — a
              product or process offering a new technical solution. Below is
              the exact sequence Lexgin follows to file yours in India.
            </p>
            <a
              href="#flow"
              className="mono text-xs px-5 py-3 tracking-wide inline-block mt-8"
              style={{ background: "var(--stamp)", color: "var(--paper)" }}
            >
              WALK THE FLOW →
            </a>
          </div>

          <div className="pf-seal-wrap shrink-0">
            <svg className="pf-seal" width="150" height="150" viewBox="0 0 150 150">
              <circle cx="75" cy="75" r="70" fill="none" stroke="var(--brass)" strokeWidth="1.5" />
              <circle cx="75" cy="75" r="60" fill="none" stroke="var(--brass)" strokeWidth="1" strokeDasharray="2 4" />
              <text x="75" y="45" textAnchor="middle" className="mono" fontSize="8" fill="var(--brass)" letterSpacing="2">10 STEPS</text>
              <text x="75" y="112" textAnchor="middle" className="mono" fontSize="8" fill="var(--brass)" letterSpacing="2">TO FILING</text>
              <text x="75" y="88" textAnchor="middle" fontSize="22" fill="var(--paper)" fontWeight="600">§</text>
            </svg>
          </div>
        </div>
      </div>

      {/* FLOW */}
      <section id="flow" className="border-t" style={{ borderColor: "var(--rule-dark)" }}>
        <div className="max-w-3xl mx-auto px-6 py-16">
          <p className="mono text-xs tracking-[0.25em] mb-2" style={{ color: "var(--brass)" }}>THE FILING SEQUENCE</p>
          <h2 className="display text-3xl font-medium mb-10" style={{ color: "var(--paper)" }}>
            From invention to docket number
          </h2>

          <div>
            {steps.map((s, i) => {
              const isOpen = open === i;
              return (
                <div key={s.n} className="pf-line">
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="pf-step w-full flex items-start gap-4 sm:gap-5 py-4 px-3 -mx-3 text-left border-b"
                    style={{ borderColor: "var(--rule-dark)" }}
                  >
                    <span
                      className="mono text-xs shrink-0 w-11 h-11 rounded-full flex items-center justify-center"
                      style={{
                        background: isOpen ? "var(--stamp)" : "var(--ink-2)",
                        color: "var(--paper)",
                        border: "1px solid var(--rule-dark)",
                      }}
                    >
                      {s.n}
                    </span>
                    <div className="flex-1 min-w-0 pt-1.5">
                      <div className="flex items-center gap-2 mb-1">
                        <s.icon size={14} style={{ color: "var(--brass)" }} />
                        <span className="text-xs mono tracking-wide" style={{ color: "var(--brass)" }}>
                          STEP {s.n}
                        </span>
                      </div>
                      <p className="text-[15px] leading-relaxed" style={{ color: "var(--paper)" }}>{s.text}</p>
                    </div>
                  </button>

                  {isOpen && (s.cta || s.contact) && (
                    <div className="pl-16 pb-6 flex flex-wrap gap-2.5">
                      {s.cta && (
                        <a
                          href={s.cta.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pf-link mono text-xs px-4 py-2.5 inline-flex items-center gap-1.5"
                          style={{ background: "var(--paper)", color: "var(--ink)" }}
                        >
                          {s.cta.label}
                          <ArrowUpRight size={12} />
                        </a>
                      )}
                      {s.contact &&
                        s.contact.map((c) => (
                          <a
                            key={c.label}
                            href={c.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pf-link mono text-xs px-4 py-2.5 inline-flex items-center gap-1.5 border"
                            style={{ borderColor: "var(--rule-dark)", color: "var(--paper-dim)" }}
                          >
                            {c.label}
                            <ExternalLink size={12} />
                          </a>
                        ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <p className="text-xs mt-8" style={{ color: "var(--paper-dim)" }}>
            Tap any step to open its form, link, or contact.
          </p>
        </div>
      </section>
    </div>
  );
}