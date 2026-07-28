import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Scale,
  ShieldAlert,
  FileText,
  Clock,
  Gavel,
  CheckCircle2,
  AlertTriangle,
  Users,
  Send,
  Stamp,
  BookOpen,
  ArrowRight,
  ChevronDown,
  Copy,
  CircleDot,
} from "lucide-react";

/**
 * Perceptive Brains IP — Trademark Opposition
 * Design system: Deep Navy → Royal Blue gradients, Rich/Soft Gold accents,
 * glassmorphism on navy, generous white space on light sections.
 * Signature element: the gold foil "Journal Seal" countdown card — a wax-seal
 * motif reframed as a live statutory clock, tying the firm's premium mark
 * to the one fact that actually drives opposition strategy: time.
 */

const FONT_ID = "tmop-fonts-pb";

const NAVY = "#082B5B";
const ROYAL = "#103D7A";
const GOLD = "#C89B2C";
const GOLD_SOFT = "#D8B65A";
const BG = "#F8FAFC";
const TEXT_DARK = "#0F172A";
const BORDER = "#E2E8F0";

function useGoogleFonts() {
  useEffect(() => {
    if (document.getElementById(FONT_ID)) return;
    const link = document.createElement("link");
    link.id = FONT_ID;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap";
    document.head.appendChild(link);
  }, []);
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

function useCountdown(days = 118) {
  const target = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    d.setHours(23, 59, 59, 0);
    return d;
  }, [days]);

  const [remaining, setRemaining] = useState(target.getTime() - Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(target.getTime() - Date.now());
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  const clamped = Math.max(remaining, 0);
  const totalSeconds = Math.floor(clamped / 1000);
  const d = Math.floor(totalSeconds / 86400);
  const h = Math.floor((totalSeconds % 86400) / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  return { d, h, m, s, targetDate: target };
}

const GROUNDS = [
  {
    icon: ShieldAlert,
    title: "Deceptively similar",
    body:
      "The mark is identical or confusingly close to an earlier registered or well-known mark in the same or related class.",
  },
  {
    icon: BookOpen,
    title: "Descriptive or generic",
    body:
      "The mark merely describes the goods, their quality, or is a common term traders should be free to use.",
  },
  {
    icon: AlertTriangle,
    title: "Bad faith application",
    body:
      "The applicant knew of a prior user's rights and filed anyway, or filed with intent to block a competitor.",
  },
  {
    icon: Users,
    title: "Prior use, no registration",
    body:
      "An earlier, unregistered user with genuine market presence can still oppose on the strength of prior use.",
  },
  {
    icon: Scale,
    title: "Lacks distinctiveness",
    body:
      "The mark cannot function as a source-identifier — it's too plain, too common, or purely decorative.",
  },
  {
    icon: Gavel,
    title: "Contrary to law",
    body:
      "Use of the mark would be legally restrained on other grounds, e.g. it's scandalous or its use is prohibited.",
  },
];

const TIMELINE = [
  {
    day: "Day 0",
    title: "Mark published in the Trade Marks Journal",
    body:
      "The application clears examination and is advertised for opposition. The clock starts the moment it's published.",
  },
  {
    day: "Within 4 months",
    title: "Notice of Opposition (Form TM-O)",
    body:
      "Any 'person interested' files grounds of opposition. This deadline is strict and cannot be extended beyond 4 months.",
  },
  {
    day: "+2 months",
    title: "Counter-statement",
    body:
      "The applicant must respond to each ground or the application is treated as abandoned.",
  },
  {
    day: "+2 months",
    title: "Evidence in support (Rule 45)",
    body: "The opponent files affidavit evidence backing the grounds raised in the notice.",
  },
  {
    day: "+2 months",
    title: "Evidence in answer (Rule 46)",
    body: "The applicant files evidence defending the mark's registrability.",
  },
  {
    day: "+1 month",
    title: "Evidence in reply (Rule 47)",
    body: "Optional — the opponent may file a final, limited round of rebuttal evidence.",
  },
  {
    day: "Hearing",
    title: "Hearing before the Registrar",
    body:
      "Both sides argue the case. The Registrar can also decide on the basis of pleadings and evidence alone.",
  },
  {
    day: "Decision",
    title: "Order",
    body:
      "The Registrar allows the opposition (mark refused) or dismisses it (mark proceeds to registration).",
  },
];

const CHECKLIST = [
  "Certificate of prior registration, or evidence of prior use with dates",
  "Sales invoices, packaging, or ads showing continuous use of your mark",
  "The impugned application's number and journal issue reference",
  "A comparison chart of the two marks and the goods/services involved",
  "Authorization letter / Power of Attorney for your agent",
];

function Pad2(n) {
  return String(n).padStart(2, "0");
}

export default function TrademarkOpposition() {
  useGoogleFonts();
  const { d, h, m, s, targetDate } = useCountdown(118);
  const [copied, setCopied] = useState(false);

  const fontDisplay = { fontFamily: "'Fraunces', ui-serif, Georgia, serif" };
  const fontBody = { fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" };
  const fontMono = { fontFamily: "'JetBrains Mono', ui-monospace, monospace" };

  const handleCopyDeadline = () => {
    navigator.clipboard?.writeText(`Sample opposition deadline: ${targetDate.toDateString()}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="min-h-screen antialiased" style={{ backgroundColor: BG, color: TEXT_DARK, ...fontBody }}>
      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(160deg, ${NAVY} 0%, ${ROYAL} 100%)` }}
      >
        {/* faint gold monogram ring — nods to a seal/crest without a literal logo */}
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full opacity-[0.10]"
          style={{ border: `1.5px solid ${GOLD_SOFT}` }}
        />
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-[320px] w-[320px] rounded-full opacity-[0.14]"
          style={{ border: `1px solid ${GOLD_SOFT}` }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle, ${GOLD_SOFT} 1px, transparent 1px)`,
            backgroundSize: "26px 26px",
          }}
        />

        {/* eyebrow crest bar */}
        <div className="relative mx-auto max-w-6xl px-6 pt-10">
          <Reveal>
            <div className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{ border: `1px solid ${GOLD}`, background: "rgba(200,155,44,0.08)" }}
              >
                <Scale className="h-4 w-4" style={{ color: GOLD_SOFT }} strokeWidth={1.6} />
              </div>
              <span
                className="text-xs font-semibold uppercase tracking-[0.28em]"
                style={{ color: GOLD_SOFT, ...fontMono }}
              >
                Perceptive Brains IP
              </span>
            </div>
          </Reveal>
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid gap-14 md:grid-cols-[1.15fr_0.85fr] md:items-center">
            <Reveal delay={80}>
              <div
                className="mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest"
                style={{
                  border: `1px solid rgba(216,182,90,0.45)`,
                  background: "rgba(200,155,44,0.10)",
                  color: GOLD_SOFT,
                  ...fontMono,
                }}
              >
                <CircleDot className="h-3 w-3 animate-pulse" />
                Trade Marks Journal — Opposition Notice
              </div>
              <h1
                className="text-4xl leading-[1.08] md:text-6xl"
                style={{ ...fontDisplay, fontWeight: 600, color: "#FFFFFF" }}
              >
                Your mark is published.
                <br />
                <span style={{ color: GOLD_SOFT }}>The clock is already running.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
                Once a mark clears examination, anyone with real grounds has a strict,
                non-extendable window to oppose it. Miss it, and the right to object is
                gone for good.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  to="/services/trademark-opposition#consult"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors"
                  style={{ background: GOLD, color: NAVY }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = GOLD_SOFT)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = GOLD)}
                >
                  File an opposition <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/services/trademark-opposition#timeline"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors"
                  style={{ border: `1px solid ${GOLD}`, color: GOLD_SOFT }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = GOLD;
                    e.currentTarget.style.color = NAVY;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = GOLD_SOFT;
                  }}
                >
                  See the full timeline
                </Link>
              </div>
            </Reveal>

            {/* Countdown stamp card — glassmorphism seal */}
            <Reveal delay={200}>
              <div
                className="relative rounded-2xl p-6 shadow-2xl"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(16px)",
                  border: `1px solid rgba(216,182,90,0.35)`,
                  boxShadow: "0 25px 60px -15px rgba(0,0,0,0.55)",
                }}
              >
                <div
                  className="absolute -top-4 -right-4 flex h-16 w-16 rotate-12 items-center justify-center rounded-full"
                  style={{
                    border: `2px solid ${GOLD}`,
                    background: `radial-gradient(circle, rgba(200,155,44,0.18), transparent 70%)`,
                  }}
                >
                  <Stamp className="h-7 w-7" style={{ color: GOLD_SOFT }} strokeWidth={1.5} />
                </div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: GOLD_SOFT, ...fontMono }}
                >
                  Sample case · illustrative only
                </p>
                <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                  Opposition window closes in:
                </p>

                <div className="mt-5 grid grid-cols-4 gap-2 text-center">
                  {[
                    { v: d, label: "days" },
                    { v: h, label: "hrs" },
                    { v: m, label: "min" },
                    { v: s, label: "sec" },
                  ].map((u) => (
                    <div
                      key={u.label}
                      className="rounded-lg py-3"
                      style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(8,43,91,0.4)" }}
                    >
                      <div className="text-2xl font-bold md:text-3xl" style={{ color: GOLD_SOFT, ...fontMono }}>
                        {Pad2(u.v)}
                      </div>
                      <div
                        className="mt-1 text-[10px] uppercase tracking-widest"
                        style={{ color: "rgba(255,255,255,0.45)" }}
                      >
                        {u.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="mt-5 flex items-center justify-between pt-4 text-xs"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)" }}
                >
                  <span style={fontMono}>Closes {targetDate.toDateString()}</span>
                  <button
                    onClick={handleCopyDeadline}
                    className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 transition-colors"
                    style={{ border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.75)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = GOLD;
                      e.currentTarget.style.color = GOLD_SOFT;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                    }}
                  >
                    <Copy className="h-3 w-3" />
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <p className="mt-3 text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
                  Your deadline runs from your mark's actual Journal publication date —
                  this timer is a demonstration, not legal advice.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
        <div
          className="h-[3px] w-full"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(216,182,90,0.5) 6px, rgba(216,182,90,0.5) 10px)`,
          }}
        />
      </section>

      {/* WHAT IS OPPOSITION */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: GOLD, ...fontMono }}>
              What it is
            </p>
            <div className="mt-3 h-[3px] w-12" style={{ background: GOLD }} />
            <h2
              className="mt-5 text-3xl md:text-4xl"
              style={{ ...fontDisplay, fontWeight: 600, color: NAVY }}
            >
              A formal challenge, filed before a mark ever registers
            </h2>
            <p className="mt-5 leading-relaxed" style={{ color: "#475569" }}>
              A trademark opposition is a proceeding before the Registrar that lets any
              interested party — a competitor, a prior user, or simply a member of the
              public with standing — object to an application after it's published for
              scrutiny, but before the certificate is granted.
            </p>
            <p className="mt-4 leading-relaxed" style={{ color: "#475569" }}>
              It's the last checkpoint before a mark becomes enforceable property. Handled
              well, it stops confusingly similar or bad-faith marks from ever reaching the
              register. Handled late, the window simply closes.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div
              className="rounded-2xl p-8"
              style={{ background: "#FFFFFF", border: `1px solid ${BORDER}`, boxShadow: "0 8px 30px -12px rgba(8,43,91,0.15)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full"
                  style={{ background: NAVY }}
                >
                  <Clock className="h-4 w-4" style={{ color: GOLD_SOFT }} />
                </div>
                <span className="text-sm font-semibold" style={{ color: NAVY }}>
                  Why the deadline matters
                </span>
              </div>
              <p className="mt-4 leading-relaxed" style={{ color: "#475569" }}>
                In India, the notice of opposition must be filed within four months of
                publication in the Trade Marks Journal — a period the Registrar has no
                power to extend. There is no late filing, no condonation, no exception.
              </p>
              <div
                className="mt-5 flex items-center gap-2 rounded-lg px-4 py-3 text-sm"
                style={{ background: "rgba(200,155,44,0.08)", color: "#82631a", border: `1px solid rgba(200,155,44,0.25)` }}
              >
                <AlertTriangle className="h-4 w-4 shrink-0" style={{ color: GOLD }} />
                Once the window shuts, the mark proceeds to registration unopposed.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* GROUNDS */}
      <section id="grounds" className="py-24" style={{ background: "#FFFFFF", borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: GOLD, ...fontMono }}>
              Grounds
            </p>
            <div className="mt-3 h-[3px] w-12" style={{ background: GOLD }} />
            <h2 className="mt-5 max-w-2xl text-3xl md:text-4xl" style={{ ...fontDisplay, fontWeight: 600, color: NAVY }}>
              Six grounds that hold up before the Registrar
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed" style={{ color: "#475569" }}>
              An opposition needs more than discomfort with a new mark — it needs a
              ground the law recognizes. These are the ones that carry weight.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {GROUNDS.map((g, i) => (
              <Reveal key={g.title} delay={i * 70}>
                <div
                  className="group h-full rounded-2xl p-6 transition-all hover:-translate-y-1"
                  style={{ border: `1px solid ${BORDER}`, background: BG }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = GOLD;
                    e.currentTarget.style.boxShadow = "0 20px 40px -18px rgba(8,43,91,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = BORDER;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors"
                    style={{ background: NAVY, color: GOLD_SOFT }}
                  >
                    <g.icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold" style={{ color: NAVY }}>
                    {g.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "#475569" }}>
                    {g.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section id="timeline" className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: GOLD, ...fontMono }}>
            Process
          </p>
          <div className="mt-3 h-[3px] w-12" style={{ background: GOLD }} />
          <h2 className="mt-5 max-w-2xl text-3xl md:text-4xl" style={{ ...fontDisplay, fontWeight: 600, color: NAVY }}>
            Eight stages, start to decision
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed" style={{ color: "#475569" }}>
            Every stage below carries its own filing window. Miss one and you risk the
            application — or your opposition — being treated as abandoned.
          </p>
        </Reveal>

        <div className="relative mt-14 pl-8">
          <div className="absolute left-[11px] top-2 bottom-2 w-px" style={{ background: BORDER }} />
          <div className="space-y-10">
            {TIMELINE.map((step, i) => (
              <Reveal key={step.title} delay={i * 60}>
                <div className="relative">
                  <div
                    className="absolute -left-8 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold"
                    style={{ border: `2px solid ${GOLD}`, background: "#FFFFFF", color: GOLD }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                    <span
                      className="shrink-0 text-xs font-semibold uppercase tracking-widest"
                      style={{ color: ROYAL, ...fontMono }}
                    >
                      {step.day}
                    </span>
                    <h3 className="text-lg font-semibold" style={{ color: NAVY }}>
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed" style={{ color: "#475569" }}>
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CHECKLIST */}
      <section
        id="checklist"
        className="py-24"
        style={{ background: `linear-gradient(160deg, ${NAVY} 0%, ${ROYAL} 100%)`, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}
      >
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: GOLD_SOFT, ...fontMono }}>
              Before you file
            </p>
            <div className="mt-3 h-[3px] w-12" style={{ background: GOLD }} />
            <h2 className="mt-5 text-3xl md:text-4xl" style={{ ...fontDisplay, fontWeight: 600, color: "#FFFFFF" }}>
              What to have ready
            </h2>
            <p className="mt-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
              A well-evidenced notice moves faster and holds up better under
              cross-examination. Gather these before the four-month window narrows.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <ul className="space-y-4">
              {CHECKLIST.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl p-4"
                  style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)", border: "1px solid rgba(216,182,90,0.2)" }}
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" style={{ color: GOLD_SOFT }} />
                  <span className="leading-relaxed" style={{ color: "rgba(255,255,255,0.88)" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section id="consult" className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl px-8 py-16 md:px-16"
            style={{
              background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_SOFT} 100%)`,
              boxShadow: "0 30px 60px -20px rgba(8,43,91,0.35)",
            }}
          >
            <FileText className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 rotate-12" style={{ color: "rgba(8,43,91,0.12)" }} />
            <div className="relative max-w-2xl">
              <h2 className="text-3xl md:text-4xl" style={{ ...fontDisplay, fontWeight: 600, color: NAVY }}>
                Don't let the window close on your objection
              </h2>
              <p className="mt-4 leading-relaxed" style={{ color: "rgba(8,43,91,0.82)" }}>
                Send us the application number and journal issue — we'll tell you within
                one business day whether you have grounds, and exactly how many days are
                left to file.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="mailto:hello@perceptivebrains.example"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors"
                  style={{ background: NAVY, color: GOLD_SOFT }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = ROYAL)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = NAVY)}
                >
                  <Send className="h-4 w-4" /> Start a free case review
                </a>
                <Link
                  to="/services/trademark-opposition#timeline"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors"
                  style={{ border: `1px solid rgba(8,43,91,0.35)`, color: NAVY }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(8,43,91,0.7)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(8,43,91,0.35)")}
                >
                  Re-check the timeline <ChevronDown className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}