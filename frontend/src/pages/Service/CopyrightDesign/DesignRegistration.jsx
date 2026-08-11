import React, { useEffect, useState } from "react";
import {
  Fingerprint, Landmark, CheckCircle2, ShieldCheck, TrendingUp, Handshake,
  Clock3, Scale, AlertTriangle, Gavel, Globe2, XCircle, Briefcase,
  Sparkles, ArrowUp,
} from "lucide-react";
import PageMeta from "../../../components/PageMeta";

/**
 * Design Registration in India — presented as a Gazette / Certificate of Registration.
 * Restyled into the navy / gold / white luxury system: glassmorphism, soft 3D
 * gradients, gold glow accents, gradient headings — Tailwind classes only,
 * no inline style attributes anywhere in the markup.
 */

const SECTIONS = [
  {
    id: "understanding",
    clause: "Cl. 1",
    title: "Understanding Design Registration",
    icon: Fingerprint,
    body: [
      "Design registration protects the visual appearance of a product — its shape, configuration, pattern, or ornamentation — rather than the way it works or what it's made of.",
      "A registered design gives the owner exclusive commercial use of that appearance, strengthening brand identity and adding a distinct asset to an IP portfolio.",
    ],
  },
  {
    id: "framework",
    clause: "Cl. 2",
    title: "Legal Framework",
    icon: Landmark,
    body: [
      "Governed by the Designs Act, 2000 and the Designs Rules, 2001, administered by the Controller General of Patents, Designs and Trade Marks (CGPDTM).",
    ],
    facts: [
      ["Statute", "Designs Act, 2000"],
      ["Rules", "Designs Rules, 2001"],
      ["Authority", "CGPDTM"],
    ],
  },
  {
    id: "eligibility",
    clause: "Cl. 3",
    title: "Eligibility Criteria",
    icon: CheckCircle2,
    checklist: [
      "New and original — not disclosed anywhere before the filing date",
      "Consists of shape, configuration, pattern, or ornament applied by an industrial process",
      "Significantly distinguishable from known designs or combinations",
      "Free of scandalous or obscene matter",
      "Not contrary to public order or morality",
    ],
  },
  {
    id: "importance",
    clause: "Cl. 4",
    title: "Why It Matters",
    icon: ShieldCheck,
    cards: [
      ["Legal shield", "Grounds to act against unauthorised copying or imitation."],
      ["Market value", "A distinctive, protected look that supports sales and share."],
      ["Deal leverage", "An asset that can be licensed or sold to other companies."],
    ],
  },
  {
    id: "duration",
    clause: "Cl. 5",
    title: "Duration & Renewal",
    icon: Clock3,
    duration: true,
    body: [
      "Protection runs for an initial term of ten years from registration, extendable by five more years on payment of the renewal fee. Miss the renewal, and exclusivity lapses.",
    ],
  },
  {
    id: "rights",
    clause: "Cl. 6",
    title: "Rights Conferred",
    icon: Scale,
    checklist: [
      "Exclusive right to apply the design to the registered article",
      "Power to stop others making, using, or selling infringing products",
      "Standing to sue infringers and claim damages",
    ],
  },
  {
    id: "infringement",
    clause: "Cl. 7",
    title: "Infringement",
    icon: AlertTriangle,
    warn: true,
    body: [
      "Infringement is unauthorised use, copying, or imitation of a registered design. Owners can seek injunctions, claim damages, and pursue action in the appropriate court — vigilance is the first line of defence.",
    ],
  },
  {
    id: "opposition",
    clause: "Cl. 8",
    title: "Opposition to Registration",
    icon: Gavel,
    body: [
      "Third parties may oppose an application — commonly on grounds of lacking novelty or conflicting with an existing registered design. The office examines both the objection and the applicant's response before deciding.",
    ],
  },
  {
    id: "international",
    clause: "Cl. 9",
    title: "International Registration",
    icon: Globe2,
    body: [
      "Through the Hague Agreement, a single application can seek design protection across multiple member countries — a strategic route for businesses with global ambitions.",
    ],
  },
  {
    id: "mistakes",
    clause: "Cl. 10",
    title: "Common Mistakes",
    icon: XCircle,
    dos: [
      "Prepare complete, accurate representations",
      "Respond to office objections promptly",
      "Engage a qualified design agent early",
    ],
    donts: [
      "Filing with inadequate documentation",
      "Leaving objections unanswered",
      "Delaying filing until after public disclosure",
    ],
  },
  {
    id: "agents",
    clause: "Cl. 11",
    title: "Role of Agents & Attorneys",
    icon: Briefcase,
    body: [
      "Design agents and attorneys bring IP-law expertise and procedural familiarity — helping applicants meet requirements, answer objections, and move applications through to grant.",
    ],
  },
  {
    id: "early",
    clause: "Cl. 12",
    title: "Benefits of Early Filing",
    icon: Sparkles,
    body: [
      "Filing early locks in exclusivity before a design reaches the market, strengthens the IP portfolio, and signals discipline to investors and partners — a foundation for future growth.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Fonts + keyframes only — every element below styles itself with    */
/*  className alone, nothing is applied via a style attribute.         */
/* ------------------------------------------------------------------ */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

    .dr-font-display { font-family: 'Playfair Display', serif; }
    .dr-font-body { font-family: 'Inter', sans-serif; }

    @keyframes dr-float-a { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-16px); } }
    @keyframes dr-glow-pulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
    @keyframes dr-seal-in {
      from { transform: scale(2.6) rotate(-18deg); opacity: 0; }
      to { transform: scale(1) rotate(0deg); opacity: 1; }
    }
    @keyframes dr-fill { from { width: 0%; } }

    .dr-animate-float-a { animation: dr-float-a 6.5s ease-in-out infinite; }
    .dr-animate-glow { animation: dr-glow-pulse 4s ease-in-out infinite; }
    .dr-seal-stamped { animation: dr-seal-in 900ms cubic-bezier(.2,.9,.25,1) both; }
    .dr-fill { animation: dr-fill 1.1s cubic-bezier(.2,.7,.2,1) both; }

    ::selection { background: #C69A32; color: #082E63; }

    @media (prefers-reduced-motion: reduce) {
      .dr-animate-float-a, .dr-animate-glow, .dr-seal-stamped, .dr-fill { animation: none; }
    }
  `}</style>
);

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function Seal({ stamped }) {
  const spokes = Array.from({ length: 20 });
  return (
    <div className={stamped ? "dr-seal-stamped" : "opacity-0"}>
      <svg width="168" height="168" viewBox="0 0 168 168" fill="none">
        <circle cx="84" cy="84" r="80" stroke="#C69A32" strokeWidth="1.5" fill="none" strokeOpacity="0.5" />
        <circle cx="84" cy="84" r="70" fill="url(#drSealGrad)" />
        <circle cx="84" cy="84" r="70" fill="none" stroke="#E8CD86" strokeWidth="1" strokeDasharray="2 3" strokeOpacity="0.6" />
        {spokes.map((_, i) => {
          const a = (i / spokes.length) * Math.PI * 2;
          const x1 = 84 + Math.cos(a) * 44;
          const y1 = 84 + Math.sin(a) * 44;
          const x2 = 84 + Math.cos(a) * 62;
          const y2 = 84 + Math.sin(a) * 62;
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#E8CD86" strokeWidth="1.2" opacity="0.7" />
          );
        })}
        <circle cx="84" cy="84" r="42" fill="#082E63" stroke="#E8CD86" strokeWidth="1.4" />
        <text x="84" y="78" textAnchor="middle" fontFamily="Inter" fontSize="10" letterSpacing="1.5" fill="#E8CD86">
          REGISTERED
        </text>
        <text x="84" y="94" textAnchor="middle" fontFamily="Playfair Display" fontSize="13" fontWeight="600" fill="#FFFFFF">
          DESIGN
        </text>
        <defs>
          <linearGradient id="drSealGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0F3D7A" />
            <stop offset="100%" stopColor="#082E63" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

const Eyebrow = ({ children, className = "" }) => (
  <p className={`dr-font-body text-xs tracking-[0.3em] text-[#C69A32] font-semibold mb-3 flex items-center gap-2 ${className}`}>
    <span className="inline-block w-6 h-px bg-[#C69A32]" />
    {children}
  </p>
);

/* ------------------------------------------------------------------ */
/*  Section body renderers                                             */
/* ------------------------------------------------------------------ */
const SectionBody = ({ p }) => (
  <p className="dr-font-body text-[15.5px] leading-relaxed text-[#3a4560]/75 mb-2.5">{p}</p>
);

const FactsGrid = ({ facts }) => (
  <div className="grid sm:grid-cols-3 gap-3 mt-4">
    {facts.map(([k, v]) => (
      <div key={k} className="rounded-xl border border-[#082E63]/[0.08] bg-[#F7F8FA] px-4 py-3">
        <div className="dr-font-body text-[10px] tracking-widest uppercase text-[#8a8672]">{k}</div>
        <div className="dr-font-display font-semibold text-sm text-[#082E63]">{v}</div>
      </div>
    ))}
  </div>
);

const Checklist = ({ items }) => (
  <ul className="mt-1.5 space-y-0">
    {items.map((item, idx) => (
      <li
        key={idx}
        className={`flex gap-3 items-start text-[15px] leading-relaxed text-[#3a4560]/80 py-2 ${
          idx < items.length - 1 ? "border-b border-dashed border-[#082E63]/10" : ""
        }`}
      >
        <CheckCircle2 size={16} className="text-[#C69A32] shrink-0 mt-0.5" />
        {item}
      </li>
    ))}
  </ul>
);

const ImportanceCards = ({ cards }) => (
  <div className="grid sm:grid-cols-3 gap-4 mt-2">
    {cards.map(([t, d]) => (
      <div
        key={t}
        className="rounded-xl border-t-[3px] border-t-[#C69A32] bg-[#F7F8FA] px-4 py-5 shadow-[0_10px_24px_-16px_rgba(8,46,99,0.3)] transition-transform duration-300 hover:-translate-y-1"
      >
        <div className="dr-font-display font-semibold text-[16.5px] text-[#082E63] mb-1.5">{t}</div>
        <div className="dr-font-body text-[13.5px] leading-relaxed text-[#3a4560]/70">{d}</div>
      </div>
    ))}
  </div>
);

const DurationBar = () => (
  <div className="mt-4">
    <div className="flex h-9 rounded-lg overflow-hidden border border-[#082E63]/10">
      <div className="w-[67%] bg-gradient-to-r from-[#082E63] to-[#0F3D7A] flex items-center justify-center">
        <span className="dr-font-body text-xs text-white">Initial term · 10 years</span>
      </div>
      <div className="w-[33%] bg-gradient-to-r from-[#8F723A] to-[#C69A32] flex items-center justify-center">
        <span className="dr-font-body text-xs text-[#082E63] font-medium">Renewal · +5 years</span>
      </div>
    </div>
    <div className="dr-font-body text-xs text-[#8a8672] mt-2">
      Miss the renewal fee at year 10 and exclusivity lapses.
    </div>
  </div>
);

const WarnBox = () => (
  <div className="mt-1 rounded-lg border-l-[3px] border-l-[#C69A32] bg-[#C69A32]/[0.08] px-4 py-3 flex items-center gap-2">
    <AlertTriangle size={15} className="text-[#8F723A] shrink-0" />
    <span className="dr-font-body text-[13.5px] text-[#6b5326]">
      Remedies: injunction · damages · court action
    </span>
  </div>
);

const DosDonts = ({ dos, donts }) => (
  <div className="grid sm:grid-cols-2 gap-6 mt-2">
    <div>
      <div className="dr-font-body text-[11px] tracking-widest font-semibold text-[#1F6E4A] mb-2">DO</div>
      {dos.map((d, idx) => (
        <div key={idx} className="flex items-start gap-2 text-sm text-[#3a4560]/80 mb-2">
          <CheckCircle2 size={14} className="text-[#C69A32] shrink-0 mt-0.5" />
          {d}
        </div>
      ))}
    </div>
    <div>
      <div className="dr-font-body text-[11px] tracking-widest font-semibold text-[#8F723A] mb-2">AVOID</div>
      {donts.map((d, idx) => (
        <div key={idx} className="flex items-start gap-2 text-sm text-[#3a4560]/80 mb-2">
          <XCircle size={14} className="text-[#082E63]/40 shrink-0 mt-0.5" />
          {d}
        </div>
      ))}
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */
export default function DesignRegistration() {
  const [stamped, setStamped] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStamped(true), 250);
    return () => clearTimeout(t);
  }, []);

  const ids = SECTIONS.map((s) => s.id);
  const active = useActiveSection(ids);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="dr-font-body min-h-screen w-full bg-[#F7F8FA] text-[#22201B]">
      <GlobalStyle />
      <PageMeta
        title="Design Registration Services in India | Perceptive Brains"
        description="Design registration services to safeguard product appearance, visual identity, and industrial designs."
      />

      {/* HERO */}
      <header className="relative overflow-hidden bg-gradient-to-b from-[#061B3D] via-[#082E63] to-[#0A2554] border-b border-[#C69A32]/30 px-6 pt-16 pb-14">
        <div className="pointer-events-none absolute -top-20 -left-20 w-[380px] h-[380px] rounded-full bg-[#C69A32]/20 blur-[110px] dr-animate-glow" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-[#0F3D7A]/40 blur-[120px]" />

        <div className="relative max-w-6xl mx-auto">
          <div className="flex justify-between items-start gap-8 flex-wrap">
            <div className="max-w-xl">
              <Eyebrow>THE DESIGNS ACT, 2000 · GOVERNMENT OF INDIA</Eyebrow>
              <h1 className="dr-font-display font-semibold text-[clamp(2.4rem,5.5vw,3.9rem)] leading-[1.05] text-white tracking-tight">
                Certificate of
                <br />
                <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-[#C69A32] to-[#E8CD86]">
                  Design Registration
                </span>
              </h1>
              <p className="mt-5 text-[17px] leading-relaxed text-white/60 max-w-lg">
                A field guide to protecting the shape, pattern, and ornament of
                an article under Indian law — from eligibility to renewal.
              </p>
              <div className="flex gap-3 mt-7 flex-wrap">
                <button
                  onClick={() => scrollTo("understanding")}
                  className="dr-font-body text-sm font-semibold px-6 py-3 rounded-full bg-gradient-to-r from-[#C69A32] to-[#E8CD86] text-[#082E63] shadow-[0_10px_28px_-8px_rgba(198,154,50,0.7)] hover:scale-[1.04] transition-transform duration-300"
                >
                  Read the record →
                </button>
              </div>
            </div>
            <div className="dr-animate-float-a shrink-0">
              <Seal stamped={stamped} />
            </div>
          </div>

          {/* meta strip */}
          <div className="mt-11 grid grid-cols-2 sm:grid-cols-4 gap-px rounded-xl overflow-hidden border border-white/10 bg-white/10 backdrop-blur-xl">
            {[
              ["Term", "10 + 5 yrs"],
              ["Authority", "CGPDTM"],
              ["Treaty route", "Hague Agreement"],
              ["Scope", "Shape · Pattern · Ornament"],
            ].map(([k, v]) => (
              <div key={k} className="bg-[#061B3D]/70 px-4 py-4">
                <div className="dr-font-body text-[10.5px] tracking-widest uppercase text-white/45 mb-1.5">{k}</div>
                <div className="text-[15px] font-semibold text-white">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* BODY: TOC + sections */}
      <div className="max-w-6xl mx-auto px-6 py-14 grid lg:grid-cols-[240px_1fr] gap-12">
        {/* TOC */}
        <nav className="hidden lg:block sticky top-8 self-start">
          <div className="dr-font-body text-[11px] tracking-widest uppercase text-[#8a8672] mb-4">
            Index of Clauses
          </div>
          <ol className="list-none m-0 p-0 space-y-0.5">
            {SECTIONS.map((s) => {
              const isActive = active === s.id;
              return (
                <li key={s.id}>
                  <button
                    onClick={() => scrollTo(s.id)}
                    className={`w-full text-left py-1.5 pl-3 border-l-2 transition-all duration-200 text-[13.5px] leading-snug ${
                      isActive
                        ? "border-l-[#C69A32] text-[#082E63] font-semibold"
                        : "border-l-transparent text-[#6B6858] hover:text-[#082E63] hover:pl-4"
                    }`}
                  >
                    <span className="dr-font-body text-[10.5px] text-[#C69A32] mr-2">{s.clause}</span>
                    {s.title}
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Sections */}
        <div>
          {SECTIONS.map((s) => (
            <section
              key={s.id}
              id={s.id}
              className="scroll-mt-24 rounded-2xl bg-white border border-[#082E63]/[0.06] px-7 py-8 sm:px-9 sm:py-9 mb-6 shadow-[0_16px_40px_-28px_rgba(8,46,99,0.35)] transition-all duration-300 hover:shadow-[0_22px_50px_-24px_rgba(198,154,50,0.25)]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#082E63] to-[#0F3D7A] flex items-center justify-center shrink-0 shadow-[0_8px_20px_-8px_rgba(8,46,99,0.5)]">
                  <s.icon size={17} className="text-[#E8CD86]" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="dr-font-body text-[11.5px] text-[#C69A32] tracking-wide">{s.clause}</span>
                  <h2 className="dr-font-display font-semibold text-2xl text-[#082E63]">{s.title}</h2>
                </div>
              </div>

              {s.body && s.body.map((p, idx) => <SectionBody key={idx} p={p} />)}
              {s.facts && <FactsGrid facts={s.facts} />}
              {s.checklist && <Checklist items={s.checklist} />}
              {s.cards && <ImportanceCards cards={s.cards} />}
              {s.duration && <DurationBar />}
              {s.warn && <WarnBox />}
              {s.dos && <DosDonts dos={s.dos} donts={s.donts} />}
            </section>
          ))}

          {/* closing certificate strip */}
          <div className="mt-10 rounded-2xl border border-[#C69A32]/30 bg-gradient-to-br from-[#082E63] via-[#0F3D7A] to-[#061B3D] px-7 py-7 flex items-center justify-between flex-wrap gap-5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]">
            <div>
              <div className="dr-font-display italic text-lg text-white">Filed early, protected long.</div>
              <div className="dr-font-body text-[13px] text-white/50 mt-1">
                Ten years, renewable by five — the clock starts at filing.
              </div>
            </div>
            <button
              onClick={() => scrollTo("understanding")}
              className="dr-font-body inline-flex items-center gap-2 text-xs tracking-wide px-5 py-2.5 rounded-full border border-[#C69A32]/60 text-white hover:bg-white/10 transition-colors duration-300"
            >
              BACK TO TOP <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}