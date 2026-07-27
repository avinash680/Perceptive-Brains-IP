import React, { useEffect, useRef, useState } from "react";
import {
  RefreshCw,
  ShieldCheck,
  AlarmClockOff,
  FileText,
  Undo2,
  CheckCircle2,
  AlertTriangle,
  BadgeCheck,
  Send,
  Landmark,
  Scale,
} from "lucide-react";

/**
 * Perceptive Brains IP — Trademark Renewal
 * Design system: Deep Navy → Royal Blue gradients, Rich/Soft Gold accents,
 * glassmorphism on navy, generous white space on light sections.
 * Signature idea carried over from the source: renewal isn't a deadline,
 * it's a recurring cycle. The hero centers on a circular "renewal dial"
 * mapping the 10-year term, the window to renew, and the grace period —
 * now rendered entirely in navy/gold so state is read by value and pattern,
 * not by traffic-light color.
 */

const FONT_ID = "tmr-fonts-pb";

const NAVY = "#082B5B";
const ROYAL = "#103D7A";
const GOLD = "#C89B2C";
const GOLD_SOFT = "#D8B65A";
const BG = "#F8FAFC";
const TEXT_DARK = "#0F172A";
const BORDER = "#E2E8F0";
const SLATE = "#64748B";

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

// Place a point on the dial. deg = degrees clockwise from 12 o'clock.
function polar(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

const RENEWAL_WINDOWS = [
  {
    icon: ShieldCheck,
    tone: "navy",
    label: "Protected term",
    range: "Years 1 – 9",
    body:
      "The registration is live and enforceable for a full 10 years from the date of registration. No action needed yet.",
  },
  {
    icon: RefreshCw,
    tone: "gold",
    label: "Renewal window",
    range: "12 months before expiry",
    body:
      "File Form TM-R any time in the year before the term ends. File early and the mark never lapses at all.",
  },
  {
    icon: AlarmClockOff,
    tone: "goldSoft",
    label: "Grace period",
    range: "6 months after expiry",
    body:
      "Missed the date? The mark can still be renewed with a surcharge — but it's shown as 'removed' in the register until you do.",
  },
  {
    icon: Undo2,
    tone: "slate",
    label: "Restoration",
    range: "Up to 1 year after removal",
    body:
      "After the grace period, the mark is removed from the register. Restoration is possible but discretionary, slower, and costlier.",
  },
];

const toneMap = {
  navy: { ring: NAVY, bg: "#FFFFFF", text: NAVY, iconBg: NAVY, iconColor: GOLD_SOFT },
  gold: { ring: GOLD, bg: "rgba(200,155,44,0.06)", text: "#8a6a1f", iconBg: GOLD, iconColor: NAVY },
  goldSoft: { ring: GOLD_SOFT, bg: "rgba(216,182,90,0.08)", text: "#8a6a1f", iconBg: GOLD_SOFT, iconColor: NAVY },
  slate: { ring: SLATE, bg: "#F1F5F9", text: SLATE, iconBg: SLATE, iconColor: "#FFFFFF" },
};

const CHECKLIST = [
  "Form TM-R (application for renewal), signed by the registered proprietor or agent",
  "The registration certificate number and class details",
  "Power of Attorney / Form TM-48, if filed through an agent",
  "Surcharge payment, if filing inside the grace period",
  "Updated proprietor address or ownership details, if anything has changed",
];

export default function TrademarkRenewal() {
  useGoogleFonts();

  const fontDisplay = { fontFamily: "'Fraunces', ui-serif, Georgia, serif" };
  const fontBody = { fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" };
  const fontMono = { fontFamily: "'JetBrains Mono', ui-monospace, monospace" };

  // Dial geometry
  const size = 340;
  const cx = size / 2;
  const cy = size / 2;
  const tickR = 148;
  const labelR = 182;

  const expiry = polar(cx, cy, tickR, 0);
  const windowOpens = polar(cx, cy, tickR, 324); // 90% of circle
  const graceEnds = polar(cx, cy, tickR, 18); // 5% of circle
  const sampleDot = polar(cx, cy, tickR, 344); // ~"90 days to expiry"

  const expiryLabel = polar(cx, cy, labelR, 0);
  const windowLabel = polar(cx, cy, labelR, 324);
  const graceLabel = polar(cx, cy, labelR, 18);

  // Value/pattern-coded, not hue-coded: deep navy = protected, gold = renewal
  // window, soft gold = grace period. No red/green/orange anywhere.
  const dialGradient = {
    background: `conic-gradient(
      from 0deg,
      ${GOLD_SOFT} 0%, ${GOLD_SOFT} 5%,
      ${ROYAL} 5%, ${ROYAL} 90%,
      ${GOLD} 90%, ${GOLD} 100%
    )`,
  };

  return (
    <div className="min-h-screen antialiased" style={{ backgroundColor: BG, color: TEXT_DARK, ...fontBody }}>
      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(160deg, ${NAVY} 0%, ${ROYAL} 100%)` }}
      >
        <div
          className="pointer-events-none absolute -left-24 -bottom-24 h-[420px] w-[420px] rounded-full opacity-[0.10]"
          style={{ border: `1.5px solid ${GOLD_SOFT}` }}
        />
        <div
          className="pointer-events-none absolute -left-8 -bottom-8 h-[320px] w-[320px] rounded-full opacity-[0.14]"
          style={{ border: `1px solid ${GOLD_SOFT}` }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle, ${GOLD_SOFT} 1px, transparent 1px)`,
            backgroundSize: "26px 26px",
          }}
        />

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
          <div className="grid gap-14 md:grid-cols-[1.05fr_0.95fr] md:items-center">
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
                <RefreshCw className="h-3 w-3" />
                Ten-year renewal cycle
              </div>
              <h1
                className="text-4xl leading-[1.08] md:text-6xl"
                style={{ ...fontDisplay, fontWeight: 600, color: "#FFFFFF" }}
              >
                A trademark isn't forever.
                <br />
                <span style={{ color: GOLD_SOFT }}>It's renewed, on a clock.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
                Registration lasts ten years — then it's due again. Renew on time and
                protection never breaks. Miss the window, and your mark drifts through a
                grace period, removal, and an uphill restoration.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="#windows"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors"
                  style={{ background: GOLD, color: NAVY }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = GOLD_SOFT)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = GOLD)}
                >
                  <RefreshCw className="h-4 w-4" /> Check my renewal window
                </a>
                <a
                  href="#checklist"
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
                  What do I need to file?
                </a>
              </div>
            </Reveal>

            {/* Renewal dial */}
            <Reveal delay={200}>
              <div
                className="mx-auto flex max-w-sm flex-col items-center rounded-2xl p-6 shadow-2xl"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(16px)",
                  border: `1px solid rgba(216,182,90,0.35)`,
                  boxShadow: "0 25px 60px -15px rgba(0,0,0,0.55)",
                }}
              >
                <div className="relative" style={{ width: size, height: size }}>
                  <div className="absolute inset-0 rounded-full" style={dialGradient} />
                  <div className="absolute inset-[22px] rounded-full" style={{ background: NAVY }} />

                  {/* Tick markers */}
                  {[expiry, windowOpens, graceEnds].map((p, i) => (
                    <span
                      key={i}
                      className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{ left: p.x, top: p.y, background: "#FFFFFF", boxShadow: `0 0 0 2px ${NAVY}` }}
                    />
                  ))}

                  {/* Sample "today" dot */}
                  <span
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: sampleDot.x, top: sampleDot.y }}
                  >
                    <span
                      className="absolute inline-flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full opacity-60"
                      style={{ background: GOLD_SOFT }}
                    />
                    <span
                      className="relative block h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{ border: `2px solid ${NAVY}`, background: GOLD_SOFT }}
                    />
                  </span>

                  {/* Labels */}
                  <div
                    className="absolute -translate-x-1/2 -translate-y-1/2 text-center text-[11px] font-semibold uppercase tracking-wide"
                    style={{ left: expiryLabel.x, top: expiryLabel.y, width: 90, color: "rgba(255,255,255,0.75)" }}
                  >
                    Expiry
                  </div>
                  <div
                    className="absolute -translate-x-1/2 -translate-y-1/2 text-center text-[11px] font-semibold uppercase tracking-wide"
                    style={{ left: windowLabel.x, top: windowLabel.y, width: 108, color: GOLD_SOFT }}
                  >
                    Renewal opens
                  </div>
                  <div
                    className="absolute -translate-x-1/2 -translate-y-1/2 text-center text-[11px] font-semibold uppercase tracking-wide"
                    style={{ left: graceLabel.x, top: graceLabel.y, width: 108, color: GOLD_SOFT }}
                  >
                    Grace ends
                  </div>

                  {/* Center readout */}
                  <div className="absolute inset-[22px] flex flex-col items-center justify-center rounded-full text-center">
                    <span className="text-[10px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.45)", ...fontMono }}>
                      Sample mark
                    </span>
                    <span className="mt-1 text-3xl font-bold" style={{ color: GOLD_SOFT, ...fontMono }}>
                      90
                    </span>
                    <span className="text-[10px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.45)" }}>
                      days to expiry
                    </span>
                    <span
                      className="mt-2 rounded-full px-2.5 py-1 text-[10px] font-semibold"
                      style={{ background: "rgba(200,155,44,0.15)", color: GOLD_SOFT }}
                    >
                      Renewal window open
                    </span>
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: ROYAL, boxShadow: `0 0 0 1px ${GOLD_SOFT}` }} /> Protected
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: GOLD }} /> Renewal window
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: GOLD_SOFT }} /> Grace period
                  </span>
                </div>
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

      {/* WHY IT MATTERS */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: GOLD, ...fontMono }}>
              Why it matters
            </p>
            <div className="mt-3 h-[3px] w-12" style={{ background: GOLD }} />
            <h2 className="mt-5 text-3xl md:text-4xl" style={{ ...fontDisplay, fontWeight: 600, color: NAVY }}>
              A lapsed mark is an open invitation
            </h2>
            <p className="mt-5 leading-relaxed" style={{ color: "#475569" }}>
              Registration isn't a one-time achievement — it's a subscription to
              exclusivity. The moment it lapses, the exclusive right to the name, logo, or
              slogan lapses with it.
            </p>
            <p className="mt-4 leading-relaxed" style={{ color: "#475569" }}>
              A competitor can file for the identical mark the day after removal. Years of
              brand recognition don't transfer automatically back to you if someone else
              gets there first.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div
              className="rounded-2xl p-8"
              style={{ background: "#FFFFFF", border: `1px solid ${BORDER}`, boxShadow: "0 8px 30px -12px rgba(8,43,91,0.15)" }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: NAVY }}>
                  <Landmark className="h-4 w-4" style={{ color: GOLD_SOFT }} />
                </div>
                <span className="text-sm font-semibold" style={{ color: NAVY }}>
                  What renewing keeps intact
                </span>
              </div>
              <ul className="mt-4 space-y-3">
                {[
                  "Your exclusive right to use the mark nationally",
                  "Standing to oppose confusingly similar new applications",
                  "The ability to license, franchise, or sell the mark cleanly",
                  "An unbroken registration date for infringement claims",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#475569" }}>
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0" style={{ color: GOLD }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WINDOWS */}
      <section id="windows" className="py-24" style={{ background: "#FFFFFF", borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: GOLD, ...fontMono }}>
              Four states
            </p>
            <div className="mt-3 h-[3px] w-12" style={{ background: GOLD }} />
            <h2 className="mt-5 max-w-2xl text-3xl md:text-4xl" style={{ ...fontDisplay, fontWeight: 600, color: NAVY }}>
              Every mark sits in one of these at any moment
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed" style={{ color: "#475569" }}>
              The dial above maps directly to these four states. Knowing which one your
              mark is in tells you exactly what to do next.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {RENEWAL_WINDOWS.map((w, i) => {
              const t = toneMap[w.tone];
              return (
                <Reveal key={w.label} delay={i * 80}>
                  <div
                    className="h-full rounded-2xl p-6 transition-transform hover:-translate-y-1"
                    style={{ border: `2px solid ${t.ring}`, background: t.bg }}
                  >
                    <div
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full"
                      style={{ background: t.iconBg, color: t.iconColor }}
                    >
                      <w.icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold" style={{ color: NAVY }}>
                      {w.label}
                    </h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide" style={{ color: t.text, ...fontMono }}>
                      {w.range}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: "#475569" }}>
                      {w.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
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
              Filing checklist
            </p>
            <div className="mt-3 h-[3px] w-12" style={{ background: GOLD }} />
            <h2 className="mt-5 text-3xl md:text-4xl" style={{ ...fontDisplay, fontWeight: 600, color: "#FFFFFF" }}>
              What to have ready
            </h2>
            <p className="mt-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
              Renewal is administrative, not adversarial — but a clean filing still moves
              faster and avoids office objections.
            </p>
            <div
              className="mt-6 flex items-center gap-2 rounded-lg px-4 py-3 text-sm"
              style={{ background: "rgba(200,155,44,0.12)", color: GOLD_SOFT, border: "1px solid rgba(216,182,90,0.3)" }}
            >
              <AlertTriangle className="h-4 w-4 shrink-0" />
              Filing inside the grace period adds a surcharge on top of the standard fee.
            </div>
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
      <section className="mx-auto max-w-6xl px-6 py-24">
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
                Never see your own grace period
              </h2>
              <p className="mt-4 leading-relaxed" style={{ color: "rgba(8,43,91,0.82)" }}>
                Send us your registration number and we'll track the renewal date,
                calculate your window, and file before it ever becomes urgent.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="mailto:hello@perceptivebrains.example"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors"
                  style={{ background: NAVY, color: GOLD_SOFT }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = ROYAL)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = NAVY)}
                >
                  <Send className="h-4 w-4" /> Set up renewal tracking
                </a>
                <a
                  href="#windows"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors"
                  style={{ border: `1px solid rgba(8,43,91,0.35)`, color: NAVY }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(8,43,91,0.7)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(8,43,91,0.35)")}
                >
                  Review the four states
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}