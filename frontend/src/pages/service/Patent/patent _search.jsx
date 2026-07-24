import React, { useEffect, useRef, useState } from "react";
import {
  Search, ShieldCheck, Scale, Globe2, Users, TrendingUp, FileSearch,
  Layers, Target, Award, CheckCircle2, ChevronDown, Phone, Mail,
  ArrowRight, Microscope, Building2, Gauge, Database, Sparkles,
  ClipboardList, Compass, FolderSearch, FileCheck2,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Design tokens — lifted directly from the Perceptive Brains IP mark */
/* ------------------------------------------------------------------ */
const FONT_STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');

.pl-root {
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
.pl-root .display { font-family: 'Fraunces', serif; }

.pl-glass {
  background: linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,255,255,0.35));
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.6);
  box-shadow: 0 8px 32px -12px rgba(8,43,91,0.18);
}
.pl-glass-dark {
  background: linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03));
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.16);
}

.pl-card { transition: transform 0.35s cubic-bezier(.2,.8,.2,1), box-shadow 0.35s ease, border-color 0.35s ease; }
.pl-card:hover { transform: translateY(-6px); box-shadow: 0 28px 50px -20px rgba(8,43,91,0.22); border-color: rgba(200,155,44,0.45); }

.pl-btn-gold { transition: transform 0.2s ease, box-shadow 0.2s ease; }
.pl-btn-gold:hover { transform: translateY(-2px); box-shadow: 0 16px 32px -10px rgba(200,155,44,0.55); }

.pl-btn-ghost { transition: background 0.2s ease, border-color 0.2s ease; }

.pl-reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s cubic-bezier(.2,.8,.2,1), transform 0.7s cubic-bezier(.2,.8,.2,1);
}
.pl-reveal.pl-in { opacity: 1; transform: translateY(0); }

.pl-node { animation: pl-pulse 3.2s ease-in-out infinite; }
.pl-node:nth-child(2n) { animation-delay: 0.6s; }
.pl-node:nth-child(3n) { animation-delay: 1.1s; }
@keyframes pl-pulse {
  0%, 100% { opacity: 0.55; r: 3.2; }
  50% { opacity: 1; r: 4.4; }
}

.pl-chevron { transition: transform 0.3s ease; }
.pl-chevron.pl-open { transform: rotate(180deg); }

.pl-accordion-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.35s cubic-bezier(.2,.8,.2,1);
}
.pl-accordion-body.pl-open { grid-template-rows: 1fr; }
.pl-accordion-body > div { overflow: hidden; }

.pl-focus:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; }

@media (prefers-reduced-motion: reduce) {
  .pl-card, .pl-btn-gold, .pl-reveal, .pl-node, .pl-accordion-body, .pl-chevron { transition: none; animation: none; }
  .pl-reveal { opacity: 1; transform: none; }
}
`;

/* ------------------------------------------------------------------ */
/*  Scroll-reveal hook                                                 */
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
    <Tag ref={ref} className={`pl-reveal ${inView ? "pl-in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated counter                                                   */
/* ------------------------------------------------------------------ */
function Counter({ target, suffix = "", duration = 1800, color = "var(--white)" }) {
  const [ref, inView] = useReveal();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);
  return (
    <span ref={ref} className="display text-4xl sm:text-5xl font-semibold" style={{ color }}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Split-brain signature illustration, echoing the logo's mark        */
/* ------------------------------------------------------------------ */
function SplitBrainMark({ size = 340 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 340 340" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="170" cy="170" r="164" fill="url(#plHalo)" />
      <defs>
        <radialGradient id="plHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1E56A0" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#1E56A0" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* left hemisphere — neural network, gold */}
      <g stroke="#C89B2C" strokeWidth="1.1" opacity="0.9">
        <line x1="120" y1="90" x2="95" y2="140" />
        <line x1="95" y1="140" x2="80" y2="190" />
        <line x1="80" y1="190" x2="100" y2="235" />
        <line x1="100" y1="235" x2="140" y2="255" />
        <line x1="120" y1="90" x2="150" y2="110" />
        <line x1="150" y1="110" x2="95" y2="140" />
        <line x1="150" y1="110" x2="145" y2="160" />
        <line x1="145" y1="160" x2="80" y2="190" />
        <line x1="145" y1="160" x2="140" y2="205" />
        <line x1="140" y1="205" x2="100" y2="235" />
        <line x1="140" y1="205" x2="140" y2="255" />
      </g>
      <g fill="#C89B2C">
        {[
          [120, 90], [150, 110], [95, 140], [145, 160],
          [80, 190], [140, 205], [100, 235], [140, 255],
        ].map(([cx, cy], i) => (
          <circle key={i} className="pl-node" cx={cx} cy={cy} r="3.6" />
        ))}
      </g>

      {/* right hemisphere — organic gyri, navy */}
      <g stroke="#082B5B" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.9">
        <path d="M170 92 C 200 88, 220 100, 224 120 C 240 122, 250 140, 244 158 C 258 166, 258 188, 244 198 C 250 214, 240 230, 222 232 C 220 248, 202 258, 186 252 C 178 262, 162 262, 154 252" />
        <path d="M170 108 C 190 106, 202 116, 204 130" />
        <path d="M170 132 C 188 130, 198 140, 198 152" />
        <path d="M172 156 C 190 154, 202 164, 200 178" />
        <path d="M170 182 C 186 182, 196 194, 190 206" />
        <path d="M170 208 C 184 210, 190 222, 182 232" />
      </g>

      {/* center divide */}
      <line x1="170" y1="80" x2="170" y2="266" stroke="#C89B2C" strokeWidth="1" opacity="0.4" strokeDasharray="2 5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const whyPoints = [
  { icon: ShieldCheck, title: "Avoid costly rejections", text: "Surface conflicting prior art before you file, so office actions and refusals don't stall your application." },
  { icon: Target, title: "Sharpen your claims", text: "Understand the crowded and open spaces in your field to draft claims that are both defensible and broad." },
  { icon: Scale, title: "Reduce infringement exposure", text: "Check your freedom to operate before launch, manufacture, or investment, not after a demand letter arrives." },
  { icon: TrendingUp, title: "Strengthen investment cases", text: "Give investors and partners documented evidence that your invention is novel and the field is mapped." },
];

const searchTypes = [
  { icon: FileSearch, title: "Patentability Search", text: "Assesses whether your invention is novel and non-obvious against existing patents and literature before you draft a single claim." },
  { icon: FolderSearch, title: "Prior Art Search", text: "A broad sweep of patents, journals, and public disclosures to establish exactly what already exists in your space." },
  { icon: Compass, title: "Freedom to Operate (FTO)", text: "Checks whether making, using, or selling your product could infringe active third-party patents in your target markets." },
  { icon: FileCheck2, title: "Invalidity Search", text: "Digs for prior art that could challenge the validity of a competitor's patent, built for opposition or litigation." },
  { icon: Layers, title: "Landscape Analysis", text: "Maps the density and direction of innovation across a technology domain to reveal white space and emerging trends." },
  { icon: Building2, title: "Competitor Patent Search", text: "Tracks a named competitor's filings over time to understand their R&D direction and where they're building a moat." },
];

const processSteps = [
  { icon: ClipboardList, title: "Consultation" },
  { icon: Users, title: "Understanding Invention" },
  { icon: Compass, title: "Search Strategy" },
  { icon: Database, title: "Database Research" },
  { icon: FileCheck2, title: "Detailed Report" },
  { icon: Award, title: "Expert Recommendation" },
];

const benefits = [
  { icon: ShieldCheck, title: "Reduce risk", text: "Catch conflicts early, before they become expensive legal disputes." },
  { icon: Gauge, title: "Save cost", text: "A focused search now is far cheaper than a rejected filing or a lawsuit later." },
  { icon: FileSearch, title: "Strong patent drafting", text: "Prior art findings shape claims that hold up under examination." },
  { icon: Target, title: "Better filing decisions", text: "Decide where, and whether, to file with real evidence in hand." },
  { icon: Globe2, title: "Global database search", text: "Coverage across major patent offices and non-patent literature worldwide." },
  { icon: Microscope, title: "Expert patent analysts", text: "Searches conducted by analysts fluent in both the technology and the law." },
];

const stats = [
  { value: 5000, suffix: "+", label: "Searches completed" },
  { value: 98, suffix: "%", label: "Client satisfaction" },
  { value: 20, suffix: "+", label: "Technical domains" },
  { value: 15, suffix: "+", label: "Years of experience" },
];

const faqs = [
  { q: "How long does a patent search take?", a: "A standard patentability or prior art search typically takes 5–7 business days, depending on the complexity of the technology and the depth of the search requested." },
  { q: "Which databases do you search?", a: "We search major patent databases including USPTO, EPO, WIPO, and national offices, alongside non-patent literature such as journals, theses, and technical publications." },
  { q: "Is a patent search mandatory before filing?", a: "It isn't legally required, but it's strongly recommended. A search reveals conflicting prior art early, when it's still inexpensive to adjust your claims or strategy." },
  { q: "What's the difference between a prior art search and an FTO search?", a: "A prior art search asks whether your invention is novel. An FTO search asks whether selling your product could infringe someone else's active patent, a different and equally important question." },
  { q: "Can a search guarantee my patent will be granted?", a: "No search can guarantee grant, since examiners may apply judgment differently. What it does is substantially reduce the risk of surprises during examination." },
  { q: "Do you provide a written report?", a: "Yes. Every search concludes with a detailed report listing relevant references, our analysis of relevance, and a clear recommendation on next steps." },
];

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */
function SectionEyebrow({ children, gold = true }) {
  return (
    <p className="text-xs font-semibold tracking-[0.25em] mb-3" style={{ color: gold ? "var(--gold)" : "var(--royal)" }}>
      {children}
    </p>
  );
}

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b" style={{ borderColor: "var(--line)" }}>
      <button onClick={onToggle} className="pl-focus w-full flex items-center justify-between gap-4 py-5 text-left">
        <span className="text-[15px] sm:text-base font-medium" style={{ color: "var(--navy)" }}>{item.q}</span>
        <ChevronDown size={18} className={`pl-chevron shrink-0 ${isOpen ? "pl-open" : ""}`} style={{ color: "var(--gold)" }} />
      </button>
      <div className={`pl-accordion-body ${isOpen ? "pl-open" : ""}`}>
        <div>
          <p className="pb-5 pr-8 text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>{item.a}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export default function PatentSearchServicesLuxury() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="pl-root w-full min-h-screen">
      <style>{FONT_STYLE}</style>

      {/* ---------------------------------------------------------- */}
      {/* HERO                                                        */}
      {/* ---------------------------------------------------------- */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(160deg, var(--navy) 0%, var(--royal) 55%, var(--royal-light) 100%)" }}>
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{ background: "radial-gradient(circle at 85% 15%, rgba(200,155,44,0.25), transparent 55%)" }}
        />
        <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-20 pb-24 sm:pt-28 sm:pb-32 grid lg:grid-cols-2 gap-16 items-center relative">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.28em] mb-5" style={{ color: "var(--gold-light)" }}>
              PERCEPTIVE BRAINS IP · PATENT SEARCH
            </p>
            <h1 className="display text-4xl sm:text-5xl lg:text-6xl leading-[1.08] font-semibold" style={{ color: "#FFFFFF" }}>
              Patent Search Services
            </h1>
            <p className="mt-6 max-w-lg text-[15px] sm:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.78)" }}>
              Before you file, know exactly where your invention stands. Our
              analysts comb global patent databases and technical literature
              to map prior art, assess novelty, and give you a clear,
              defensible path to protection.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="pl-btn-gold inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm"
                style={{ background: "linear-gradient(135deg, var(--gold-light), var(--gold))", color: "var(--navy)" }}
              >
                Get Free Consultation
                <ArrowRight size={16} />
              </a>
              <a
                href="#search-types"
                className="pl-btn-ghost inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm border"
                style={{ borderColor: "rgba(255,255,255,0.35)", color: "#FFFFFF" }}
              >
                Explore search types
              </a>
            </div>

            <div className="mt-12 flex items-center gap-8 flex-wrap">
              {["USPTO", "EPO", "WIPO", "IPO"].map((db) => (
                <span key={db} className="text-xs font-semibold tracking-widest" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {db}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150} className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                <SplitBrainMark size={360} />
              </div>
              <div className="pl-glass-dark absolute -bottom-6 -left-4 sm:-left-10 rounded-2xl px-5 py-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(200,155,44,0.22)" }}>
                  <Sparkles size={18} style={{ color: "var(--gold-light)" }} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>98% satisfaction</p>
                  <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.6)" }}>across 5,000+ searches</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* WHY PATENT SEARCH                                           */}
      {/* ---------------------------------------------------------- */}
      <section className="py-24" style={{ background: "var(--white)" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>WHY IT MATTERS</SectionEyebrow>
            <h2 className="display text-3xl sm:text-4xl font-medium" style={{ color: "var(--navy)" }}>
              Why a patent search comes first
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              Filing without a search is like arguing a case without reading the
              precedent. A structured search tells you what's already protected,
              what's still open, and how to position your claims before an
              examiner ever sees them.
            </p>
          </Reveal>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyPoints.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <div className="pl-card h-full rounded-2xl p-6 border" style={{ background: "var(--mist)", borderColor: "var(--line)" }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: "var(--gold-dim)" }}>
                    <p.icon size={20} style={{ color: "var(--gold)" }} />
                  </div>
                  <h3 className="font-semibold text-[15px] mb-2" style={{ color: "var(--navy)" }}>{p.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* TYPES OF PATENT SEARCHES                                    */}
      {/* ---------------------------------------------------------- */}
      <section id="search-types" className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, var(--navy), var(--royal))" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 relative">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>OUR SERVICES</SectionEyebrow>
            <h2 className="display text-3xl sm:text-4xl font-medium" style={{ color: "#FFFFFF" }}>
              Types of patent searches
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
              Six focused search types, each built for a different decision — from
              first drafting to defending a granted patent.
            </p>
          </Reveal>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchTypes.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="pl-card pl-glass-dark h-full rounded-2xl p-7 flex flex-col">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: "rgba(200,155,44,0.2)" }}>
                    <s.icon size={20} style={{ color: "var(--gold-light)" }} />
                  </div>
                  <h3 className="display text-lg font-medium mb-2" style={{ color: "#FFFFFF" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.68)" }}>{s.text}</p>
                  <a href="#contact" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: "var(--gold-light)" }}>
                    Learn more <ArrowRight size={14} />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* OUR PROCESS                                                 */}
      {/* ---------------------------------------------------------- */}
      <section className="py-24" style={{ background: "var(--white)" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>HOW WE WORK</SectionEyebrow>
            <h2 className="display text-3xl sm:text-4xl font-medium" style={{ color: "var(--navy)" }}>
              Our process
            </h2>
          </Reveal>

          <div className="mt-16 relative">
            <div className="hidden lg:block absolute top-6 left-0 right-0 h-px" style={{ background: "var(--line)" }} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-y-10 gap-x-6">
              {processSteps.map((s, i) => (
                <Reveal key={s.title} delay={i * 80} className="relative flex lg:flex-col items-start gap-4 lg:gap-0">
                  <div
                    className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center shrink-0 lg:mb-5"
                    style={{ background: "var(--navy)", border: "2px solid var(--gold)" }}
                  >
                    <s.icon size={18} style={{ color: "var(--gold-light)" }} />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-widest mb-1" style={{ color: "var(--gold)" }}>
                      STEP {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-semibold text-[15px]" style={{ color: "var(--navy)" }}>{s.title}</h3>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* BENEFITS                                                    */}
      {/* ---------------------------------------------------------- */}
      <section className="py-24" style={{ background: "var(--mist)" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>THE PAYOFF</SectionEyebrow>
            <h2 className="display text-3xl sm:text-4xl font-medium" style={{ color: "var(--navy)" }}>
              What a thorough search buys you
            </h2>
          </Reveal>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 70}>
                <div className="pl-card h-full rounded-2xl p-6" style={{ background: "#fff", boxShadow: "0 1px 0 var(--line)" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "var(--navy)" }}>
                      <b.icon size={17} style={{ color: "var(--gold-light)" }} />
                    </div>
                    <h3 className="font-semibold text-[15px]" style={{ color: "var(--navy)" }}>{b.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* STATS                                                       */}
      {/* ---------------------------------------------------------- */}
      <section className="py-24" style={{ background: "linear-gradient(135deg, var(--navy), var(--royal) 60%, var(--royal-light))" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <Reveal className="text-center max-w-xl mx-auto mb-16">
            <SectionEyebrow>TRACK RECORD</SectionEyebrow>
            <h2 className="display text-3xl sm:text-4xl font-medium" style={{ color: "#FFFFFF" }}>
              Numbers that back the process
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <Counter target={s.value} suffix={s.suffix} color="#FFFFFF" />
                <p className="text-xs font-semibold tracking-wider mt-3" style={{ color: "rgba(255,255,255,0.65)" }}>
                  {s.label.toUpperCase()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* FAQ                                                         */}
      {/* ---------------------------------------------------------- */}
      <section className="py-24" style={{ background: "var(--white)" }}>
        <div className="max-w-3xl mx-auto px-6 sm:px-10">
          <Reveal>
            <SectionEyebrow>FAQ</SectionEyebrow>
            <h2 className="display text-3xl sm:text-4xl font-medium mb-10" style={{ color: "var(--navy)" }}>
              Common questions
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div>
              {faqs.map((item, i) => (
                <FAQItem key={item.q} item={item} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* FINAL CTA                                                   */}
      {/* ---------------------------------------------------------- */}
      <section id="contact" className="py-24 px-6 sm:px-10" style={{ background: "var(--mist)" }}>
        <Reveal>
          <div
            className="max-w-6xl mx-auto rounded-3xl px-8 sm:px-16 py-16 sm:py-20 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(120deg, var(--navy), var(--royal) 60%, #1E56A0)" }}
          >
            <div className="absolute inset-0 opacity-50" style={{ background: "radial-gradient(circle at 80% 20%, rgba(200,155,44,0.3), transparent 55%)" }} />
            <div className="relative">
              <SectionEyebrow>LET'S TALK</SectionEyebrow>
              <h2 className="display text-3xl sm:text-5xl font-semibold max-w-2xl mx-auto leading-tight" style={{ color: "#FFFFFF" }}>
                Ready to protect your innovation?
              </h2>
              <p className="mt-5 max-w-xl mx-auto text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                Talk to a patent analyst before you file. It's the cheapest step
                in the entire process, and the one most likely to save your claim.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <a
                  href="tel:+919971117009"
                  className="pl-btn-gold inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm"
                  style={{ background: "linear-gradient(135deg, var(--gold-light), var(--gold))", color: "var(--navy)" }}
                >
                  <Phone size={16} />
                  Schedule Consultation
                </a>
                <a
                  href="mailto:info@perceptivebrainsip.com"
                  className="pl-btn-ghost inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm border"
                  style={{ borderColor: "rgba(255,255,255,0.35)", color: "#FFFFFF" }}
                >
                  <Mail size={16} />
                  Contact Our Experts
                </a>
              </div>
              <div className="mt-10 flex justify-center items-center gap-2">
                <CheckCircle2 size={14} style={{ color: "var(--gold-light)" }} />
                <p className="text-[11px] font-semibold tracking-widest" style={{ color: "rgba(255,255,255,0.55)" }}>
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