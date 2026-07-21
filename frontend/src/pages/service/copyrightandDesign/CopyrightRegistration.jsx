import React, { useState } from "react";
import {
  BookOpen, Music2, Code2, ShieldCheck, Scale, FileCheck2,
  Clock3, Landmark, Fingerprint, Tag, CircleCheck, Sparkles,
} from "lucide-react";

const FONT_STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,900&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

.cr-root {
  --ink: #0D1526;
  --ink-2: #182137;
  --ink-3: #212C48;
  --paper: #F1ECDD;
  --paper-2: #E4DCC3;
  --paper-dim: #C9BFA0;
  --stamp: #A5311F;
  --stamp-dim: #C85A42;
  --brass: #C79A4B;
  --brass-dim: #8F723A;
  --rule-dark: rgba(241,236,221,0.14);
  --rule-brass: rgba(199,154,75,0.35);
  font-family: 'IBM Plex Sans', sans-serif;
  background:
    radial-gradient(circle at 12% 8%, rgba(199,154,75,0.07), transparent 45%),
    radial-gradient(circle at 88% 92%, rgba(165,49,31,0.08), transparent 40%),
    var(--ink);
  color: var(--paper);
}
.cr-root .display { font-family: 'Fraunces', serif; }
.cr-root .mono { font-family: 'IBM Plex Mono', monospace; }

.cr-seal { transition: transform 0.6s cubic-bezier(.2,.8,.2,1); transform-origin: center; }
.cr-seal-wrap:hover .cr-seal { transform: rotate(-6deg) scale(1.04); }

.cr-tab { transition: all 0.2s ease; }
.cr-tab:hover:not([data-active="true"]) { background: rgba(241,236,221,0.06) !important; color: var(--paper) !important; }

.cr-card { transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease; }
.cr-card:hover { transform: translateY(-3px); border-color: var(--rule-brass) !important; box-shadow: 0 18px 40px -20px rgba(0,0,0,0.6); }

.cr-cert {
  position: relative;
  background:
    repeating-linear-gradient(135deg, rgba(13,21,38,0.025) 0px, rgba(13,21,38,0.025) 1px, transparent 1px, transparent 14px),
    var(--paper);
}
.cr-cert::before {
  content: "";
  position: absolute;
  inset: 10px;
  border: 1px solid var(--brass-dim);
  pointer-events: none;
}
.cr-cert::after {
  content: "";
  position: absolute;
  inset: 16px;
  border: 1px solid var(--brass-dim);
  opacity: 0.5;
  pointer-events: none;
}
.cr-watermark {
  position: absolute;
  right: -30px;
  bottom: -40px;
  font-size: 220px;
  font-family: 'Fraunces', serif;
  color: rgba(13,21,38,0.045);
  font-weight: 700;
  pointer-events: none;
  user-select: none;
  line-height: 1;
}

.cr-timeline-fill { transition: width 0.5s ease; }

@media (prefers-reduced-motion: reduce) {
  .cr-seal, .cr-tab, .cr-card, .cr-timeline-fill { transition: none; }
}
`;

const categories = {
  litInd: {
    label: "Literary / Artistic",
    sub: "Individual applicant",
    icon: BookOpen,
    fee: "INR 500",
    feeNote: "per work",
    duration: "Life of author + 60 yrs",
    docs: ["Form XIV application", "Copy of the manuscript or artwork", "NOC from author, if applicant differs", "Fee receipt"],
  },
  litOrg: {
    label: "Literary / Artistic",
    sub: "Organization applicant",
    icon: Landmark,
    fee: "INR 2,000",
    feeNote: "per work",
    duration: "Life of author + 60 yrs",
    docs: ["Form XIV application", "Copy of the manuscript or artwork", "Power of attorney for the filing agent", "Fee receipt"],
  },
  software: {
    label: "Software",
    sub: "Any applicant",
    icon: Code2,
    fee: "INR 5,000",
    feeNote: "per work",
    duration: "60 yrs from publication",
    docs: ["Form XIV application", "Source code", "Technical write-up", "User manual", "Fee receipt"],
  },
  av: {
    label: "Film / Sound Recording",
    sub: "Any applicant",
    icon: Music2,
    fee: "Varies",
    feeNote: "confirm current fee",
    duration: "60 yrs from publication",
    docs: ["Form XIV application", "Copy or representation of the work", "NOC from author, if applicant differs", "Fee receipt"],
  },
};

export default function CopyrightRegistrationLexgin() {
  const [cat, setCat] = useState("litInd");
  const c = categories[cat];

  return (
    <div className="cr-root min-h-screen w-full">
      <style>{FONT_STYLE}</style>

      {/* HERO */}
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          <div>
            <p className="mono text-xs tracking-[0.3em] mb-5 flex items-center gap-2" style={{ color: "var(--brass)" }}>
              <span className="inline-block w-6 h-px" style={{ background: "var(--brass)" }} />
              GOVERNED BY THE COPYRIGHT ACT, 1957
            </p>
            <h1 className="display text-6xl sm:text-7xl leading-[0.98] font-semibold" style={{ color: "var(--paper)" }}>
              Copyright
              <br />
              <span style={{ color: "var(--brass)" }}>Registration</span>
            </h1>
            <p className="mt-7 max-w-lg text-[16px] leading-relaxed" style={{ color: "var(--paper-dim)" }}>
              Protection arises the moment an original work is created.
              Registration doesn't create that right — it gives you evidence
              of it, and a much shorter path to damages if it's infringed.
            </p>
            <div className="mt-9 flex gap-3 flex-wrap items-center">
              <a
                href="#certificate"
                className="mono text-xs px-6 py-3.5 tracking-wide inline-flex items-center gap-2"
                style={{ background: "var(--stamp)", color: "var(--paper)" }}
              >
                BUILD YOUR CERTIFICATE
                <Sparkles size={13} />
              </a>
              <span className="mono text-xs" style={{ color: "var(--paper-dim)" }}>4 work categories, one form</span>
            </div>
          </div>

          {/* specimen certificate visual */}
          <div className="cr-seal-wrap relative">
            <div className="cr-cert p-8 sm:p-10" style={{ color: "var(--ink)" }}>
              <div className="cr-watermark">©</div>
              <p className="mono text-[10px] tracking-[0.3em] mb-1" style={{ color: "var(--stamp)" }}>SPECIMEN — FORM XIV</p>
              <p className="display text-2xl font-medium mb-6" style={{ color: "var(--ink)" }}>Certificate of Registration</p>
              <div className="space-y-3 relative z-10">
                <div className="flex justify-between border-b pb-2" style={{ borderColor: "rgba(13,21,38,0.12)" }}>
                  <span className="text-xs" style={{ color: "#5a5540" }}>Class of work</span>
                  <span className="mono text-xs font-medium">Literary</span>
                </div>
                <div className="flex justify-between border-b pb-2" style={{ borderColor: "rgba(13,21,38,0.12)" }}>
                  <span className="text-xs" style={{ color: "#5a5540" }}>Term of protection</span>
                  <span className="mono text-xs font-medium">Life + 60 yrs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs" style={{ color: "#5a5540" }}>Status</span>
                  <span className="mono text-xs font-medium" style={{ color: "var(--stamp)" }}>● REGISTERED</span>
                </div>
              </div>
              <svg className="cr-seal absolute -bottom-6 -right-6" width="96" height="96" viewBox="0 0 96 96">
                <circle cx="48" cy="48" r="44" fill="var(--ink)" />
                <circle cx="48" cy="48" r="44" fill="none" stroke="var(--brass)" strokeWidth="1.5" />
                <circle cx="48" cy="48" r="37" fill="none" stroke="var(--brass)" strokeWidth="0.75" strokeDasharray="1.5 3" />
                <text x="48" y="42" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="6" fill="var(--brass)" letterSpacing="1.5">LEXGIN</text>
                <text x="48" y="58" textAnchor="middle" fontFamily="Fraunces" fontSize="20" fill="var(--paper)" fontWeight="700">©</text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* WHY REGISTER */}
      <section className="border-t" style={{ borderColor: "var(--rule-dark)" }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="mono text-xs tracking-[0.3em] mb-2" style={{ color: "var(--brass)" }}>01 — THE CASE FOR FILING</p>
              <h2 className="display text-4xl font-medium" style={{ color: "var(--paper)" }}>Why register, if it's automatic</h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { t: "Evidence of ownership", d: "A registered date and record make infringement claims far easier to prove.", icon: ShieldCheck },
              { t: "Legal standing", d: "Registration supports suing infringers and claiming statutory damages.", icon: Scale },
              { t: "Commercial value", d: "A registered copyright can back a loan or anchor a licensing deal.", icon: FileCheck2 },
            ].map((b, i) => (
              <div
                key={b.t}
                className="cr-card p-7 border"
                style={{ background: "var(--ink-2)", borderColor: "var(--rule-dark)" }}
              >
                <div className="flex items-center justify-between mb-6">
                  <b.icon size={22} style={{ color: "var(--brass)" }} />
                  <span className="mono text-xs" style={{ color: "var(--paper-dim)" }}>0{i + 1}</span>
                </div>
                <p className="display text-lg font-medium mb-2" style={{ color: "var(--paper)" }}>{b.t}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--paper-dim)" }}>{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATE BUILDER */}
      <section id="certificate" className="border-t" style={{ borderColor: "var(--rule-dark)" }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <p className="mono text-xs tracking-[0.3em] mb-2" style={{ color: "var(--brass)" }}>02 — INTERACTIVE</p>
          <h2 className="display text-4xl font-medium mb-3" style={{ color: "var(--paper)" }}>What your filing looks like</h2>
          <p className="max-w-xl text-sm leading-relaxed mb-10" style={{ color: "var(--paper-dim)" }}>
            Fee, protection term, and required documents all shift with the
            kind of work. Choose one to see it laid out.
          </p>

          <div className="grid sm:grid-cols-4 gap-2 mb-6">
            {Object.entries(categories).map(([key, val]) => (
              <button
                key={key}
                data-active={cat === key}
                onClick={() => setCat(key)}
                className="cr-tab text-left p-4 border flex items-start gap-3"
                style={{
                  background: cat === key ? "var(--paper)" : "var(--ink-2)",
                  borderColor: cat === key ? "var(--brass)" : "var(--rule-dark)",
                  color: cat === key ? "var(--ink)" : "var(--paper-dim)",
                }}
              >
                <val.icon size={18} className="mt-0.5 shrink-0" style={{ color: cat === key ? "var(--stamp)" : "var(--brass)" }} />
                <span>
                  <span className="block text-xs font-medium leading-tight">{val.label}</span>
                  <span className="block mono text-[10px] mt-1 opacity-70">{val.sub}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="cr-cert p-8 sm:p-12" style={{ color: "var(--ink)" }}>
            <div className="cr-watermark">©</div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b" style={{ borderColor: "rgba(13,21,38,0.14)" }}>
                <div className="w-11 h-11 flex items-center justify-center shrink-0" style={{ background: "var(--ink)" }}>
                  <c.icon size={20} style={{ color: "var(--brass)" }} />
                </div>
                <div>
                  <p className="display text-xl font-medium leading-tight">{c.label}</p>
                  <p className="mono text-[11px]" style={{ color: "var(--stamp)" }}>{c.sub.toUpperCase()}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="mono text-[11px] tracking-wide mb-2" style={{ color: "var(--stamp)" }}>REGISTRATION FEE</p>
                  <p className="display text-3xl leading-none">{c.fee}</p>
                  <p className="text-xs mt-1" style={{ color: "#6b654c" }}>{c.feeNote}</p>
                </div>
                <div>
                  <p className="mono text-[11px] tracking-wide mb-2" style={{ color: "var(--stamp)" }}>PROTECTION TERM</p>
                  <p className="display text-3xl leading-none">{c.duration}</p>
                </div>
              </div>

              <p className="mono text-[11px] tracking-wide mb-3 pt-6 border-t" style={{ borderColor: "rgba(13,21,38,0.14)", color: "var(--stamp)" }}>
                DOCUMENTS REQUIRED
              </p>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                {c.docs.map((d) => (
                  <div key={d} className="flex items-start gap-2">
                    <CircleCheck size={15} className="mt-0.5 shrink-0" style={{ color: "var(--brass-dim)" }} />
                    <p className="text-sm leading-relaxed">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DURATION TIMELINE */}
      <section className="border-t" style={{ borderColor: "var(--rule-dark)" }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <p className="mono text-xs tracking-[0.3em] mb-2" style={{ color: "var(--brass)" }}>03 — HOW LONG IT LASTS</p>
          <h2 className="display text-4xl font-medium mb-12" style={{ color: "var(--paper)" }}>Two clocks, two starting lines</h2>

          <div className="space-y-10">
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="font-medium flex items-center gap-2" style={{ color: "var(--paper)" }}>
                  <Clock3 size={16} style={{ color: "var(--brass)" }} />
                  Life of author + 60 years
                </p>
                <span className="mono text-xs" style={{ color: "var(--paper-dim)" }}>literary · dramatic · musical · artistic</span>
              </div>
              <div className="h-2 w-full" style={{ background: "var(--ink-2)" }}>
                <div className="cr-timeline-fill h-full" style={{ width: "88%", background: "linear-gradient(90deg, var(--brass-dim), var(--brass))" }} />
              </div>
              <p className="text-xs mt-2" style={{ color: "var(--paper-dim)" }}>Starts at creation, runs the length of a life, then 60 years more.</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="font-medium flex items-center gap-2" style={{ color: "var(--paper)" }}>
                  <Clock3 size={16} style={{ color: "var(--stamp-dim)" }} />
                  60 years from publication
                </p>
                <span className="mono text-xs" style={{ color: "var(--paper-dim)" }}>film · sound recording · software</span>
              </div>
              <div className="h-2 w-full" style={{ background: "var(--ink-2)" }}>
                <div className="cr-timeline-fill h-full" style={{ width: "45%", background: "linear-gradient(90deg, var(--stamp-dim), var(--stamp))" }} />
              </div>
              <p className="text-xs mt-2" style={{ color: "var(--paper-dim)" }}>Starts at publication, not creation — and follows the work, not a person.</p>
            </div>
          </div>
        </div>
      </section>

      {/* COPYRIGHT VS TRADEMARK */}
      <section className="border-t" style={{ borderColor: "var(--rule-dark)" }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <p className="mono text-xs tracking-[0.3em] mb-2" style={{ color: "var(--brass)" }}>04 — DON'T CONFUSE THE TWO</p>
          <h2 className="display text-4xl font-medium mb-12" style={{ color: "var(--paper)" }}>Copyright, not trademark</h2>
          <div className="grid sm:grid-cols-2 border" style={{ borderColor: "var(--rule-dark)" }}>
            <div className="p-9" style={{ background: "linear-gradient(160deg, var(--ink-3), var(--ink-2))", borderRight: "1px solid var(--rule-dark)" }}>
              <Fingerprint size={26} style={{ color: "var(--brass)" }} className="mb-5" />
              <p className="display text-2xl font-medium mb-3" style={{ color: "var(--paper)" }}>Copyright</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--paper-dim)" }}>
                Protects original works of authorship — books, music, art,
                film, software — giving the creator exclusive rights over
                their own creation.
              </p>
            </div>
            <div className="p-9" style={{ background: "linear-gradient(160deg, #241512, #1a100e)" }}>
              <Tag size={26} style={{ color: "var(--stamp-dim)" }} className="mb-5" />
              <p className="display text-2xl font-medium mb-3" style={{ color: "var(--paper)" }}>Trademark</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--paper-dim)" }}>
                Protects brand names, logos, and symbols — the marks that
                identify whose goods or services you're looking at.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}