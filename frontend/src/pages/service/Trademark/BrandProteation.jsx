import React, { useEffect, useRef, useState } from "react";
import {
  Radar,
  ShieldAlert,
  Store,
  Globe2,
  MessageSquareWarning,
  Fingerprint,
  Users2,
  PackageX,
  ScanSearch,
  Ban,
  Gavel,
  Send,
  CheckCircle2,
  AlertTriangle,
  Timer,
  Eye,
  TrendingDown,
} from "lucide-react";

/**
 * Brand Protection — single-section landing component.
 * Signature idea: brand protection is continuous surveillance, not a single
 * filing. The hero is a radar screen sweeping across the real channels a
 * brand gets attacked on — marketplaces, domains, social, new filings —
 * with live-styled blips showing severity at a glance.
 */

const FONT_ID = "bp-fonts";

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

function useRadarStyles() {
  const STYLE_ID = "bp-radar-keyframes";
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      @keyframes bp-sweep { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @media (prefers-reduced-motion: reduce) {
        .bp-sweep { animation: none !important; }
      }
    `;
    document.head.appendChild(style);
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

// deg = degrees clockwise from 12 o'clock
function polar(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

const severityDot = {
  alert: "bg-rose-400 ring-rose-400/30",
  watch: "bg-amber-400 ring-amber-400/30",
  clear: "bg-cyan-400 ring-cyan-400/30",
};

const BLIPS = [
  { key: "Marketplaces", icon: Store, deg: 24, r: 130, severity: "alert", note: "3 counterfeit listings" },
  { key: "Domains", icon: Globe2, deg: 95, r: 88, severity: "watch", note: "1 typosquat flagged" },
  { key: "Social media", icon: MessageSquareWarning, deg: 160, r: 138, severity: "alert", note: "2 impersonator accounts" },
  { key: "New filings", icon: Fingerprint, deg: 228, r: 68, severity: "clear", note: "monitored, none pending" },
  { key: "Resellers", icon: Users2, deg: 292, r: 118, severity: "watch", note: "grey-market listing" },
  { key: "Packaging", icon: PackageX, deg: 342, r: 100, severity: "clear", note: "monitored, none pending" },
];

const THREATS = [
  {
    icon: Store,
    title: "Counterfeit listings",
    body: "Fake or unauthorized goods sold under your mark on major marketplaces and D2C storefronts.",
  },
  {
    icon: Globe2,
    title: "Domain & typosquatting",
    body: "Look-alike domains registered to phish customers or redirect traffic away from you.",
  },
  {
    icon: MessageSquareWarning,
    title: "Social impersonation",
    body: "Fake accounts running scams, fraudulent giveaways, or knock-off sales under your name.",
  },
  {
    icon: Fingerprint,
    title: "Confusingly similar filings",
    body: "New trademark applications that edge close enough to dilute or ride on your brand.",
  },
  {
    icon: Users2,
    title: "Grey-market resale",
    body: "Genuine goods diverted through unauthorized channels, undercutting pricing and warranty terms.",
  },
  {
    icon: PackageX,
    title: "Counterfeit packaging",
    body: "Physical knock-offs close enough to pass casual inspection — the hardest channel to self-police.",
  },
];

const PROCESS = [
  {
    icon: ScanSearch,
    title: "Scan",
    body: "Automated sweeps run continuously across marketplaces, domains, social platforms, and trademark journals.",
  },
  {
    icon: Eye,
    title: "Detect & verify",
    body: "Matches are flagged, then reviewed by a human to cut false positives before anything reaches you.",
  },
  {
    icon: TrendingDown,
    title: "Prioritize",
    body: "Each hit is scored by real risk — a counterfeit storefront outranks a distant, borderline filing.",
  },
  {
    icon: Ban,
    title: "Enforce",
    body: "The right tool goes out immediately: takedown notice, cease-and-desist, or escalation to legal action.",
  },
];

const TOOLKIT = [
  { icon: Send, title: "Cease & desist", body: "The fastest lever for clear-cut infringement — often resolves in days." },
  { icon: Ban, title: "Marketplace takedown", body: "Direct reporting channels with Amazon, Flipkart, Meta, and major platforms." },
  { icon: Globe2, title: "UDRP / domain dispute", body: "Reclaim squatted or confusingly similar domains through formal dispute policy." },
  { icon: ShieldAlert, title: "Customs recordal", body: "Register your mark with customs so counterfeit shipments get flagged at the border." },
  { icon: Gavel, title: "Opposition & litigation", body: "For repeat or high-value infringers, escalate to formal proceedings or court." },
];

const STATS = [
  { label: "Channels monitored", value: "128", icon: Radar },
  { label: "Active alerts", value: "34", icon: AlertTriangle },
  { label: "Takedowns completed", value: "91", icon: CheckCircle2 },
  { label: "Avg. response time", value: "<48h", icon: Timer },
];

export default function BrandProtection() {
  useGoogleFonts();
  useRadarStyles();

  const fontDisplay = { fontFamily: "'Fraunces', ui-serif, Georgia, serif" };
  const fontMono = { fontFamily: "'JetBrains Mono', ui-monospace, monospace" };

  const size = 340;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900 font-sans antialiased">
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950 text-stone-100">
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
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/40 bg-indigo-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-300"
                style={fontMono}
              >
                <Radar className="h-3 w-3" />
                Continuous brand monitoring
              </div>
              <h1 className="text-4xl leading-[1.08] text-stone-50 md:text-6xl" style={{ ...fontDisplay, fontWeight: 600 }}>
                Your brand has a footprint.
                <br />
                <span className="text-indigo-400">Someone is already testing its edges.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-300">
                Registration protects the name on paper. Brand protection is what stops the
                counterfeit listing, the copycat domain, and the fake account from
                spending down that name in the market.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="#toolkit"
                  className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-400"
                >
                  <ShieldAlert className="h-4 w-4" /> Request a brand audit
                </a>
                <a
                  href="#process"
                  className="inline-flex items-center gap-2 rounded-full border border-stone-600 px-6 py-3 text-sm font-semibold text-stone-200 transition-colors hover:border-stone-400"
                >
                  See how monitoring works
                </a>
              </div>
            </Reveal>

            {/* Radar */}
            <Reveal delay={150}>
              <div className="mx-auto flex max-w-sm flex-col items-center rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl shadow-black/40">
                <div className="relative" style={{ width: size, height: size }}>
                  {/* rings */}
                  <div className="absolute inset-0 rounded-full border border-indigo-500/20" />
                  <div className="absolute inset-[42px] rounded-full border border-indigo-500/20" />
                  <div className="absolute inset-[84px] rounded-full border border-indigo-500/20" />
                  <div className="absolute inset-[126px] rounded-full border border-indigo-500/20" />
                  {/* crosshair */}
                  <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-indigo-500/10" />
                  <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-indigo-500/10" />

                  {/* sweep */}
                  <div className="absolute inset-0 overflow-hidden rounded-full">
                    <div
                      className="bp-sweep h-full w-full"
                      style={{
                        animation: "bp-sweep 7s linear infinite",
                        background:
                          "conic-gradient(from 0deg, rgba(99,102,241,0.55) 0deg, rgba(99,102,241,0.0) 55deg, rgba(99,102,241,0) 360deg)",
                      }}
                    />
                  </div>

                  {/* blips */}
                  {BLIPS.map((b) => {
                    const p = polar(cx, cy, b.r, b.deg);
                    const dot = severityDot[b.severity];
                    return (
                      <div
                        key={b.key}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ left: p.x, top: p.y }}
                      >
                        <div className="group relative flex items-center justify-center">
                          {b.severity === "alert" && (
                            <span className="absolute inline-flex h-6 w-6 animate-ping rounded-full bg-rose-400 opacity-40" />
                          )}
                          <span
                            className={`relative flex h-6 w-6 items-center justify-center rounded-full ring-4 ${dot} text-slate-950`}
                          >
                            <b.icon className="h-3.5 w-3.5" strokeWidth={2} />
                          </span>
                          <div className="pointer-events-none absolute bottom-full mb-2 hidden w-max max-w-[9rem] -translate-x-1/2 left-1/2 rounded-md bg-slate-950 px-2.5 py-1.5 text-center text-[10px] leading-tight text-stone-200 shadow-lg ring-1 ring-slate-700 group-hover:block">
                            <span className="block font-semibold text-stone-50">{b.key}</span>
                            {b.note}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* center readout */}
                  <div className="absolute inset-[84px] flex flex-col items-center justify-center rounded-full text-center">
                    <span className="text-[10px] uppercase tracking-widest text-stone-400" style={fontMono}>
                      This week
                    </span>
                    <span className="mt-1 text-3xl font-bold text-indigo-300" style={fontMono}>
                      6
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-stone-400">
                      channels watched
                    </span>
                  </div>
                </div>

                {/* legend */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-stone-300">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400" /> Active alert
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> Needs review
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" /> Monitored, clear
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STAT STRIP */}
      <section className="border-b border-slate-200 bg-white py-10">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-2xl font-bold text-slate-900" style={fontMono}>
                      {s.value}
                    </div>
                    <div className="text-xs text-slate-500">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-400">Sample dashboard — illustrative figures.</p>
          </Reveal>
        </div>
      </section>

      {/* THREATS */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-700" style={fontMono}>
            What we watch for
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl text-slate-900 md:text-4xl" style={{ ...fontDisplay, fontWeight: 600 }}>
            Six ways a brand gets worn down
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">
            None of these show up in a trademark register search. They show up in the
            market — which is exactly where monitoring has to happen.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {THREATS.map((t, i) => (
            <Reveal key={t.title} delay={i * 70}>
              <div className="group h-full rounded-2xl border border-slate-200 p-6 transition-all hover:-translate-y-1 hover:border-indigo-400 hover:shadow-lg">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-indigo-400 transition-colors group-hover:bg-indigo-500 group-hover:text-white">
                  <t.icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{t.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="border-y border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-700" style={fontMono}>
              How it runs
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl text-slate-900 md:text-4xl" style={{ ...fontDisplay, fontWeight: 600 }}>
              Scan, verify, prioritize, enforce
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">
              A real monitoring pipeline, run continuously rather than as a one-off sweep.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <div className="relative rounded-2xl border border-slate-200 bg-stone-50 p-6">
                  <span
                    className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white"
                    style={fontMono}
                  >
                    {i + 1}
                  </span>
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                    <p.icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLKIT */}
      <section id="toolkit" className="bg-slate-950 py-20 text-stone-100">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400" style={fontMono}>
              Enforcement toolkit
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl md:text-4xl" style={{ ...fontDisplay, fontWeight: 600 }}>
              Matched to how serious the threat is
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-stone-300">
              Not every hit needs a lawsuit. The right response is proportionate — fast
              and cheap for the clear cases, formal when it has to be.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-5">
            {TOOLKIT.map((tk, i) => (
              <Reveal key={tk.title} delay={i * 70}>
                <div className="h-full rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-colors hover:border-indigo-500">
                  <tk.icon className="h-5 w-5 text-indigo-400" strokeWidth={1.75} />
                  <h3 className="mt-3 text-sm font-semibold text-stone-50">{tk.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-stone-400">{tk.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-indigo-700 px-8 py-14 text-indigo-50 md:px-16">
            <Radar className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 rotate-12 text-indigo-50/10" />
            <div className="relative max-w-2xl">
              <h2 className="text-3xl md:text-4xl" style={{ ...fontDisplay, fontWeight: 600 }}>
                Find out what's already out there
              </h2>
              <p className="mt-4 leading-relaxed text-indigo-50/85">
                A free brand audit scans your name and marks across marketplaces, domains,
                and social platforms — and tells you exactly what needs action first.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="mailto:hello@vantageip.example"
                  className="inline-flex items-center gap-2 rounded-full bg-indigo-950 px-6 py-3 text-sm font-semibold text-indigo-200 transition-colors hover:bg-indigo-900"
                >
                  <Send className="h-4 w-4" /> Request my free audit
                </a>
                <a
                  href="#process"
                  className="inline-flex items-center gap-2 rounded-full border border-indigo-50/30 px-6 py-3 text-sm font-semibold text-indigo-50 transition-colors hover:border-indigo-50/60"
                >
                  Revisit the process
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}