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
} from "lucide-react";

/**
 * Trademark Renewal — single-section landing component.
 * Signature idea: renewal isn't a deadline, it's a recurring cycle. The hero
 * centers on a circular "renewal dial" mapping the 10-year term, the window
 * to renew, and the grace period that follows expiry — the three states
 * every registered mark cycles through.
 */

const FONT_ID = "tmr-fonts";

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
    tone: "emerald",
    label: "Protected term",
    range: "Years 1 – 9",
    body:
      "The registration is live and enforceable for a full 10 years from the date of registration. No action needed yet.",
  },
  {
    icon: RefreshCw,
    tone: "amber",
    label: "Renewal window",
    range: "12 months before expiry",
    body:
      "File Form TM-R any time in the year before the term ends. File early and the mark never lapses at all.",
  },
  {
    icon: AlarmClockOff,
    tone: "rose",
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
  emerald: {
    ring: "border-emerald-400",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    chip: "bg-emerald-500",
    iconBg: "bg-emerald-600",
  },
  amber: {
    ring: "border-amber-400",
    bg: "bg-amber-50",
    text: "text-amber-700",
    chip: "bg-amber-500",
    iconBg: "bg-amber-600",
  },
  rose: {
    ring: "border-rose-400",
    bg: "bg-rose-50",
    text: "text-rose-700",
    chip: "bg-rose-500",
    iconBg: "bg-rose-600",
  },
  slate: {
    ring: "border-slate-400",
    bg: "bg-slate-50",
    text: "text-slate-700",
    chip: "bg-slate-500",
    iconBg: "bg-slate-600",
  },
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

  const dialGradient = {
    background: `conic-gradient(
      from 0deg,
      #fb7185 0%, #fb7185 5%,
      #10b981 5%, #10b981 90%,
      #f59e0b 90%, #f59e0b 100%
    )`,
  };

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900 font-sans antialiased">
      {/* HERO */}
      <section className="relative overflow-hidden bg-emerald-950 text-stone-100">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-14 md:grid-cols-[1.05fr_0.95fr] md:items-center">
            <Reveal>
              <div
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-300"
                style={fontMono}
              >
                <RefreshCw className="h-3 w-3" />
                Ten-year renewal cycle
              </div>
              <h1 className="text-4xl leading-[1.08] text-stone-50 md:text-6xl" style={{ ...fontDisplay, fontWeight: 600 }}>
                A trademark isn't forever.
                <br />
                <span className="text-emerald-400">It's renewed, on a clock.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-300">
                Registration lasts ten years — then it's due again. Renew on time and
                protection never breaks. Miss the window, and your mark drifts through a
                grace period, removal, and an uphill restoration.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="#windows"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-emerald-950 transition-colors hover:bg-emerald-400"
                >
                  <RefreshCw className="h-4 w-4" /> Check my renewal window
                </a>
                <a
                  href="#checklist"
                  className="inline-flex items-center gap-2 rounded-full border border-stone-600 px-6 py-3 text-sm font-semibold text-stone-200 transition-colors hover:border-stone-400"
                >
                  What do I need to file?
                </a>
              </div>
            </Reveal>

            {/* Renewal dial */}
            <Reveal delay={150}>
              <div className="mx-auto flex max-w-sm flex-col items-center rounded-2xl border border-emerald-900/60 bg-emerald-900/30 p-6 shadow-2xl shadow-black/30">
                <div className="relative" style={{ width: size, height: size }}>
                  <div className="absolute inset-0 rounded-full" style={dialGradient} />
                  <div className="absolute inset-[22px] rounded-full bg-emerald-950" />

                  {/* Tick markers */}
                  {[expiry, windowOpens, graceEnds].map((p, i) => (
                    <span
                      key={i}
                      className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-stone-50 ring-2 ring-emerald-950"
                      style={{ left: p.x, top: p.y }}
                    />
                  ))}

                  {/* Sample "today" dot */}
                  <span
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: sampleDot.x, top: sampleDot.y }}
                  >
                    <span className="absolute inline-flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-amber-300 opacity-60" />
                    <span className="relative block h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-emerald-950 bg-amber-300" />
                  </span>

                  {/* Labels */}
                  <div
                    className="absolute -translate-x-1/2 -translate-y-1/2 text-center text-[11px] font-semibold uppercase tracking-wide text-stone-200"
                    style={{ left: expiryLabel.x, top: expiryLabel.y, width: 90 }}
                  >
                    Expiry
                  </div>
                  <div
                    className="absolute -translate-x-1/2 -translate-y-1/2 text-center text-[11px] font-semibold uppercase tracking-wide text-amber-300"
                    style={{ left: windowLabel.x, top: windowLabel.y, width: 108 }}
                  >
                    Renewal opens
                  </div>
                  <div
                    className="absolute -translate-x-1/2 -translate-y-1/2 text-center text-[11px] font-semibold uppercase tracking-wide text-rose-300"
                    style={{ left: graceLabel.x, top: graceLabel.y, width: 108 }}
                  >
                    Grace ends
                  </div>

                  {/* Center readout */}
                  <div className="absolute inset-[22px] flex flex-col items-center justify-center rounded-full text-center">
                    <span className="text-[10px] uppercase tracking-widest text-stone-400" style={fontMono}>
                      Sample mark
                    </span>
                    <span className="mt-1 text-3xl font-bold text-amber-300" style={fontMono}>
                      90
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-stone-400">
                      days to expiry
                    </span>
                    <span className="mt-2 rounded-full bg-amber-500/15 px-2.5 py-1 text-[10px] font-semibold text-amber-300">
                      Renewal window open
                    </span>
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-stone-300">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Protected
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> Renewal window
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400" /> Grace period
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700" style={fontMono}>
              Why it matters
            </p>
            <h2 className="mt-3 text-3xl text-slate-900 md:text-4xl" style={{ ...fontDisplay, fontWeight: 600 }}>
              A lapsed mark is an open invitation
            </h2>
            <p className="mt-5 leading-relaxed text-slate-600">
              Registration isn't a one-time achievement — it's a subscription to
              exclusivity. The moment it lapses, the exclusive right to the name, logo, or
              slogan lapses with it.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              A competitor can file for the identical mark the day after removal. Years of
              brand recognition don't transfer automatically back to you if someone else
              gets there first.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <Landmark className="h-5 w-5 text-emerald-700" />
                <span className="text-sm font-semibold text-slate-900">What renewing keeps intact</span>
              </div>
              <ul className="mt-4 space-y-3">
                {[
                  "Your exclusive right to use the mark nationally",
                  "Standing to oppose confusingly similar new applications",
                  "The ability to license, franchise, or sell the mark cleanly",
                  "An unbroken registration date for infringement claims",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WINDOWS */}
      <section id="windows" className="border-y border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700" style={fontMono}>
              Four states
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl text-slate-900 md:text-4xl" style={{ ...fontDisplay, fontWeight: 600 }}>
              Every mark sits in one of these at any moment
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">
              The dial above maps directly to these four states. Knowing which one your
              mark is in tells you exactly what to do next.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {RENEWAL_WINDOWS.map((w, i) => {
              const t = toneMap[w.tone];
              return (
                <Reveal key={w.label} delay={i * 80}>
                  <div className={`h-full rounded-2xl border-2 ${t.ring} ${t.bg} p-6 transition-transform hover:-translate-y-1`}>
                    <div className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${t.iconBg} text-white`}>
                      <w.icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-slate-900">{w.label}</h3>
                    <p className={`mt-1 text-xs font-semibold uppercase tracking-wide ${t.text}`} style={fontMono}>
                      {w.range}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{w.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CHECKLIST */}
      <section id="checklist" className="border-y border-slate-200 bg-emerald-950 py-20 text-stone-100">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400" style={fontMono}>
              Filing checklist
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl" style={{ ...fontDisplay, fontWeight: 600 }}>
              What to have ready
            </h2>
            <p className="mt-4 leading-relaxed text-emerald-100/80">
              Renewal is administrative, not adversarial — but a clean filing still moves
              faster and avoids office objections.
            </p>
            <div className="mt-6 flex items-center gap-2 rounded-lg bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              Filing inside the grace period adds a surcharge on top of the standard fee.
            </div>
          </Reveal>
          <Reveal delay={100}>
            <ul className="space-y-4">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <span className="leading-relaxed text-stone-200">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-700 px-8 py-14 text-emerald-50 md:px-16">
            <FileText className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 rotate-12 text-emerald-50/10" />
            <div className="relative max-w-2xl">
              <h2 className="text-3xl md:text-4xl" style={{ ...fontDisplay, fontWeight: 600 }}>
                Never see your own grace period
              </h2>
              <p className="mt-4 leading-relaxed text-emerald-50/85">
                Send us your registration number and we'll track the renewal date,
                calculate your window, and file before it ever becomes urgent.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="mailto:hello@vantageip.example"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-950 px-6 py-3 text-sm font-semibold text-emerald-300 transition-colors hover:bg-emerald-900"
                >
                  <Send className="h-4 w-4" /> Set up renewal tracking
                </a>
                <a
                  href="#windows"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-50/30 px-6 py-3 text-sm font-semibold text-emerald-50 transition-colors hover:border-emerald-50/60"
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