import React, { useEffect, useRef, useState } from "react";
import {
  Gavel, FileSearch, ScrollText, MessagesSquare, RefreshCcw, Archive,
  LayoutGrid, CalendarClock, ShieldCheck, Users, ArrowRight, Scale,
  Phone, Mail, CheckCircle2,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Design tokens — same system as PatentSearchServicesLuxury:         */
/*  navy / royal blue / gold / white / light gray, Fraunces + Inter     */
/* ------------------------------------------------------------------ */
const FONT_STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');

.pp-root {
  --navy: #082B5B;
  --royal: #103D7A;
  --royal-light: #1E56A0;
  --gold: #C89B2C;
  --gold-light: #E0BE5F;
  --gold-dim: rgba(200,155,44,0.14);
  --white: #FFFFFF;
  --mist: #F8FAFC;
  --ink: #0B1E3D;
  --ink-soft: #55627A;
  --line: rgba(8,43,91,0.10);
  font-family: 'Inter', sans-serif;
  background: var(--white);
  color: var(--ink);
}
.pp-root .display { font-family: 'Fraunces', serif; }

.pp-glass {
  background: linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,255,255,0.35));
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.6);
  box-shadow: 0 8px 32px -12px rgba(8,43,91,0.18);
}
.pp-glass-dark {
  background: linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03));
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.16);
}

.pp-card { transition: transform 0.3s cubic-bezier(.2,.8,.2,1), box-shadow 0.3s ease, border-color 0.3s ease; }
.pp-card:hover { transform: translateY(-5px); box-shadow: 0 24px 44px -18px rgba(8,43,91,0.2); border-color: rgba(200,155,44,0.45); }

.pp-btn-gold { transition: transform 0.2s ease, box-shadow 0.2s ease; }
.pp-btn-gold:hover { transform: translateY(-2px); box-shadow: 0 16px 32px -10px rgba(200,155,44,0.55); }

.pp-btn-ghost { transition: background 0.2s ease, border-color 0.2s ease; }

.pp-docket-btn { transition: all 0.2s ease; }

.pp-reveal {
  opacity: 0;
  transform: translateY(26px);
  transition: opacity 0.65s cubic-bezier(.2,.8,.2,1), transform 0.65s cubic-bezier(.2,.8,.2,1);
}
.pp-reveal.pp-in { opacity: 1; transform: translateY(0); }

.pp-seal { transition: transform 0.5s cubic-bezier(.2,.8,.2,1); }
.pp-seal-wrap:hover .pp-seal { transform: rotate(-8deg) scale(1.05); }

@media (prefers-reduced-motion: reduce) {
  .pp-card, .pp-btn-gold, .pp-docket-btn, .pp-reveal, .pp-seal { transition: none; }
  .pp-reveal { opacity: 1; transform: none; }
}
`;

/* ------------------------------------------------------------------ */
/*  Scroll reveal                                                      */
/* ------------------------------------------------------------------ */
function useReveal() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ as: Tag = "div", delay = 0, className = "", children }) {
  const [ref, inView] = useReveal();
  return (
    <Tag ref={ref} className={`pp-reveal ${inView ? "pp-in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

function SectionEyebrow({ children, onDark = false }) {
  return (
    <p className="text-xs font-semibold tracking-[0.25em] mb-3" style={{ color: onDark ? "var(--gold-light)" : "var(--gold)" }}>
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */
const examTests = [
  { t: "Novelty", d: "A prior-art search checks whether the invention already exists in some form.", icon: FileSearch },
  { t: "Non-obviousness", d: "The claims must go beyond what a skilled person would find obvious to combine.", icon: Scale },
  { t: "Industrial applicability", d: "The invention has to be capable of being made or used in an industry.", icon: LayoutGrid },
];

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
  { title: "Preparation & prosecution", icon: ShieldCheck, desc: "A well-prepared application is the foundation. Specifications and claims are built to meet legal requirements and withstand examination scrutiny from the outset." },
  { title: "Office-action response", icon: MessagesSquare, desc: "Close engagement with the patent office at every objection — arguments and amendments crafted to move the application toward grant." },
  { title: "End-to-end support", icon: Gavel, desc: "From first draft to maintenance and renewal, one team carries the file through its full lifecycle, including strategic abandonment when it serves the portfolio." },
];

/* ------------------------------------------------------------------ */
/*  Main component                                                      */
/* ------------------------------------------------------------------ */
export default function PatentProsecution() {
  const [active, setActive] = useState(0);
  const r = responses[active];

  return (
    <div className="pp-root min-h-screen w-full">
      <style>{FONT_STYLE}</style>

      {/* ---------------------------------------------------------- */}
      {/* HERO                                                        */}
      {/* ---------------------------------------------------------- */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(160deg, var(--navy) 0%, var(--royal) 55%, var(--royal-light) 100%)" }}>
        <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ background: "radial-gradient(circle at 85% 15%, rgba(200,155,44,0.25), transparent 55%)" }} />
        <div className="max-w-6xl mx-auto px-6 sm:px-10 pt-20 pb-20 relative">
          <div className="flex items-start justify-between gap-8 flex-wrap">
            <Reveal className="flex-1 min-w-[280px]">
              <p className="text-xs font-semibold tracking-[0.28em] mb-4" style={{ color: "var(--gold-light)" }}>
                PERCEPTIVE BRAINS IP · PATENT PROSECUTION
              </p>
              <h1 className="display text-4xl sm:text-5xl lg:text-6xl leading-[1.08] font-semibold" style={{ color: "#FFFFFF" }}>
                Patent Prosecution
              </h1>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,0.78)" }}>
                From filing to grant, an examiner tests every claim against
                novelty, non-obviousness, and industrial applicability. This is
                the record of that exchange — and how to answer it.
              </p>
              <div className="mt-8 flex gap-3 flex-wrap">
                <a
                  href="#docket"
                  className="pp-btn-gold inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm"
                  style={{ background: "linear-gradient(135deg, var(--gold-light), var(--gold))", color: "var(--navy)" }}
                >
                  Open the Docket <ArrowRight size={16} />
                </a>
                <a
                  href="#services"
                  className="pp-btn-ghost inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-medium text-sm border"
                  style={{ borderColor: "rgba(255,255,255,0.35)", color: "#FFFFFF" }}
                >
                  Our Services
                </a>
              </div>
            </Reveal>

            <Reveal delay={150} className="pp-seal-wrap shrink-0">
              <svg className="pp-seal" width="150" height="150" viewBox="0 0 150 150">
                <circle cx="75" cy="75" r="70" fill="none" stroke="var(--gold-light)" strokeWidth="1.5" />
                <circle cx="75" cy="75" r="60" fill="none" stroke="var(--gold-light)" strokeWidth="1" strokeDasharray="2 4" />
                <text x="75" y="45" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--gold-light)" letterSpacing="2">OFFICE</text>
                <text x="75" y="112" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--gold-light)" letterSpacing="2">ACTION</text>
                <text x="75" y="88" textAnchor="middle" fontSize="22" fill="#FFFFFF" fontWeight="600">⚖</text>
              </svg>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* EXAMINATION PROCESS                                         */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20" style={{ background: "var(--white)" }}>
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <Reveal className="max-w-2xl mb-10">
            <SectionEyebrow>EXHIBIT A</SectionEyebrow>
            <h2 className="display text-3xl sm:text-4xl font-medium" style={{ color: "var(--navy)" }}>
              What the examiner tests
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-6">
            {examTests.map((c, i) => (
              <Reveal key={c.t} delay={i * 90}>
                <div className="pp-card h-full rounded-2xl p-6 border" style={{ background: "var(--mist)", borderColor: "var(--line)" }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: "var(--gold-dim)" }}>
                    <c.icon size={20} style={{ color: "var(--gold)" }} />
                  </div>
                  <p className="font-semibold text-[15px] mb-2" style={{ color: "var(--navy)" }}>{c.t}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="text-sm leading-relaxed mt-8 max-w-xl" style={{ color: "var(--ink-soft)" }}>
              Examiners also read claims for clarity and support in the
              specification. Where a claim falls short, they issue an office
              action — and the applicant has to answer it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* OFFICE ACTION DOCKET — signature element                    */}
      {/* ---------------------------------------------------------- */}
      <section id="docket" className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(180deg, var(--navy), var(--royal))" }}>
        <div className="max-w-6xl mx-auto px-6 sm:px-10 relative">
          <Reveal className="max-w-2xl mb-4">
            <SectionEyebrow onDark>EXHIBIT B</SectionEyebrow>
            <h2 className="display text-3xl sm:text-4xl font-medium mb-3" style={{ color: "#FFFFFF" }}>
              The docket: action and response
            </h2>
            <p className="text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
              Every office action calls for one of four strategies. Step through
              the docket to see how an objection is answered.
            </p>
          </Reveal>

          {/* step selector */}
          <Reveal delay={80} className="mt-10 flex flex-wrap gap-2 mb-6">
            {responses.map((res, i) => (
              <button
                key={res.n}
                onClick={() => setActive(i)}
                className="pp-docket-btn text-xs font-semibold flex-1 min-w-[150px] py-3 px-4 tracking-wide text-left flex items-center gap-2 rounded-xl"
                style={
                  active === i
                    ? { background: "linear-gradient(135deg, var(--gold-light), var(--gold))", color: "var(--navy)" }
                    : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.14)" }
                }
              >
                <res.icon size={14} />
                {res.n} · {res.title.toUpperCase()}
              </button>
            ))}
          </Reveal>

          <Reveal delay={140}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="pp-glass-dark rounded-2xl p-6 sm:p-8">
                <p className="text-[11px] font-semibold tracking-wide mb-3" style={{ color: "var(--gold-light)" }}>
                  ▣ OFFICE ACTION
                </p>
                <p className="text-[15px] leading-relaxed" style={{ color: "#FFFFFF" }}>{r.action}</p>
              </div>
              <div className="rounded-2xl p-6 sm:p-8" style={{ background: "#FFFFFF" }}>
                <p className="text-[11px] font-semibold tracking-wide mb-3" style={{ color: "var(--gold)" }}>
                  ✒ RESPONSE FILED — {r.title.toUpperCase()}
                </p>
                <p className="text-[15px] leading-relaxed" style={{ color: "var(--navy)" }}>{r.reply}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* MAINTENANCE & RENEWAL                                       */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20" style={{ background: "var(--mist)" }}>
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <Reveal className="max-w-2xl mb-10">
            <SectionEyebrow>EXHIBIT C</SectionEyebrow>
            <h2 className="display text-3xl sm:text-4xl font-medium" style={{ color: "var(--navy)" }}>
              After the grant
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
            {maintenance.map((m, i) => (
              <Reveal key={m.title} delay={i * 70}>
                <div className="pp-card h-full flex gap-4 items-start rounded-2xl p-6" style={{ background: "#FFFFFF", boxShadow: "0 1px 0 var(--line)" }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: "var(--navy)" }}>
                    <m.icon size={17} style={{ color: "var(--gold-light)" }} />
                  </div>
                  <div>
                    <p className="font-semibold mb-1 text-[15px]" style={{ color: "var(--navy)" }}>{m.title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>{m.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* SERVICES                                                    */}
      {/* ---------------------------------------------------------- */}
      <section id="services" className="py-20" style={{ background: "var(--white)" }}>
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <Reveal className="max-w-2xl mb-10">
            <SectionEyebrow>EXHIBIT D</SectionEyebrow>
            <h2 className="display text-3xl sm:text-4xl font-medium" style={{ color: "var(--navy)" }}>
              Our prosecution services
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 90}>
                <div className="pp-card h-full rounded-2xl p-6 border" style={{ background: "var(--mist)", borderColor: "var(--line)" }}>
                  <s.icon size={20} style={{ color: "var(--gold)" }} className="mb-4" />
                  <p className="font-semibold mb-2 text-[15px]" style={{ color: "var(--navy)" }}>{s.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200} className="mt-10 flex items-center gap-2 text-xs font-semibold tracking-wide flex-wrap" >
            <span style={{ color: "var(--gold)" }}>PREPARATION</span>
            <ArrowRight size={12} style={{ color: "var(--ink-soft)" }} />
            <span style={{ color: "var(--gold)" }}>PROSECUTION</span>
            <ArrowRight size={12} style={{ color: "var(--ink-soft)" }} />
            <span style={{ color: "var(--gold)" }}>GRANT</span>
            <ArrowRight size={12} style={{ color: "var(--ink-soft)" }} />
            <span style={{ color: "var(--gold)" }}>MAINTENANCE</span>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* FINAL CTA                                                   */}
      {/* ---------------------------------------------------------- */}
      <section className="py-20 px-6 sm:px-10" style={{ background: "var(--mist)" }}>
        <Reveal>
          <div
            className="max-w-5xl mx-auto rounded-3xl px-8 sm:px-14 py-14 sm:py-16 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(120deg, var(--navy), var(--royal) 60%, #1E56A0)" }}
          >
            <div className="absolute inset-0 opacity-50" style={{ background: "radial-gradient(circle at 80% 20%, rgba(200,155,44,0.3), transparent 55%)" }} />
            <div className="relative">
              <SectionEyebrow onDark>LET'S TALK</SectionEyebrow>
              <h2 className="display text-3xl sm:text-5xl font-semibold max-w-xl mx-auto leading-tight" style={{ color: "#FFFFFF" }}>
                Facing an office action?
              </h2>
              <p className="mt-5 max-w-lg mx-auto text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,0.78)" }}>
                Talk to a patent analyst before your response deadline. Early
                engagement gives us the most room to argue, amend, and get
                your claims to grant.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <a
                  href="tel:+919971117009"
                  className="pp-btn-gold inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm"
                  style={{ background: "linear-gradient(135deg, var(--gold-light), var(--gold))", color: "var(--navy)" }}
                >
                  <Phone size={16} /> Schedule Consultation
                </a>
                <a
                  href="mailto:info@perceptivebrainsip.com"
                  className="pp-btn-ghost inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-medium text-sm border"
                  style={{ borderColor: "rgba(255,255,255,0.35)", color: "#FFFFFF" }}
                >
                  <Mail size={16} /> Contact Our Experts
                </a>
              </div>
              <div className="mt-9 flex justify-center items-center gap-2">
                <CheckCircle2 size={13} style={{ color: "var(--gold-light)" }} />
                <p className="text-[11px] font-semibold tracking-widest" style={{ color: "rgba(255,255,255,0.6)" }}>
                  PERCEPTIVE BRAINS IP · REGISTERED PATENT ANALYSTS
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}