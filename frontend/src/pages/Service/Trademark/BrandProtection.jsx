import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
 *
 * Restyled to the Perceptive Brains IP system: navy / royal blue / gold /
 * white / light gray, Fraunces + Inter, glass panels, gold accents.
 */

const FONT_STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');

.bp-root {
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
.bp-root .display { font-family: 'Fraunces', serif; }

.bp-glass-dark {
  background: linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03));
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.16);
}

.bp-card { transition: transform 0.3s cubic-bezier(.2,.8,.2,1), box-shadow 0.3s ease, border-color 0.3s ease; }
.bp-card:hover { transform: translateY(-5px); box-shadow: 0 24px 44px -18px rgba(8,43,91,0.2); border-color: rgba(200,155,44,0.45); }

.bp-btn-gold { transition: transform 0.2s ease, box-shadow 0.2s ease; }
.bp-btn-gold:hover { transform: translateY(-2px); box-shadow: 0 16px 32px -10px rgba(200,155,44,0.55); }

.bp-btn-ghost { transition: background 0.2s ease, border-color 0.2s ease; }

@keyframes bp-sweep { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

@media (prefers-reduced-motion: reduce) {
  .bp-sweep, .bp-card, .bp-btn-gold { transition: none; animation: none; }
}
`;

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

function SectionEyebrow({ children, onDark = false }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: onDark ? "var(--gold-light)" : "var(--gold)" }}>
      {children}
    </p>
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
  clear: "bg-sky-300 ring-sky-300/30",
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
  { icon: Store, title: "Counterfeit listings", body: "Fake or unauthorized goods sold under your mark on major marketplaces and D2C storefronts." },
  { icon: Globe2, title: "Domain & typosquatting", body: "Look-alike domains registered to phish customers or redirect traffic away from you." },
  { icon: MessageSquareWarning, title: "Social impersonation", body: "Fake accounts running scams, fraudulent giveaways, or knock-off sales under your name." },
  { icon: Fingerprint, title: "Confusingly similar filings", body: "New trademark applications that edge close enough to dilute or ride on your brand." },
  { icon: Users2, title: "Grey-market resale", body: "Genuine goods diverted through unauthorized channels, undercutting pricing and warranty terms." },
  { icon: PackageX, title: "Counterfeit packaging", body: "Physical knock-offs close enough to pass casual inspection — the hardest channel to self-police." },
];

const PROCESS = [
  { icon: ScanSearch, title: "Scan", body: "Automated sweeps run continuously across marketplaces, domains, social platforms, and trademark journals." },
  { icon: Eye, title: "Detect & verify", body: "Matches are flagged, then reviewed by a human to cut false positives before anything reaches you." },
  { icon: TrendingDown, title: "Prioritize", body: "Each hit is scored by real risk — a counterfeit storefront outranks a distant, borderline filing." },
  { icon: Ban, title: "Enforce", body: "The right tool goes out immediately: takedown notice, cease-and-desist, or escalation to legal action." },
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
  const size = 340;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div className="bp-root min-h-screen w-full">
      <style>{FONT_STYLE}</style>

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(160deg, var(--navy) 0%, var(--royal) 55%, var(--royal-light) 100%)" }}>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "22px 22px" }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{ background: "radial-gradient(circle at 85% 15%, rgba(200,155,44,0.25), transparent 55%)" }}
        />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-14 md:grid-cols-[1.05fr_0.95fr] md:items-center">
            <Reveal>
              <div
                className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest"
                style={{ borderColor: "rgba(200,155,44,0.4)", background: "rgba(200,155,44,0.1)", color: "var(--gold-light)" }}
              >
                <Radar className="h-3 w-3" />
                Continuous brand monitoring
              </div>
              <h1 className="display text-4xl leading-[1.08] font-semibold md:text-6xl" style={{ color: "#FFFFFF" }}>
                Your brand has a footprint.
                <br />
                <span style={{ color: "var(--gold-light)" }}>Someone is already testing its edges.</span>
              </h1>
              <p className="mt-6 max-w-xl text-[15px] sm:text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.78)" }}>
                Registration protects the name on paper. Brand protection is what stops the
                counterfeit listing, the copycat domain, and the fake account from
                spending down that name in the market.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  to="/services/brand-protection#toolkit"
                  className="bp-btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
                  style={{ background: "linear-gradient(135deg, var(--gold-light), var(--gold))", color: "var(--navy)" }}
                >
                  <ShieldAlert className="h-4 w-4" /> Request a brand audit
                </Link>
                <Link
                  to="/services/brand-protection#process"
                  className="bp-btn-ghost inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold"
                  style={{ borderColor: "rgba(255,255,255,0.35)", color: "#FFFFFF" }}
                >
                  See how monitoring works
                </Link>
              </div>
            </Reveal>

            {/* Radar */}
            <Reveal delay={150}>
              <div className="bp-glass-dark mx-auto flex max-w-sm flex-col items-center rounded-2xl p-6">
                <div className="relative" style={{ width: size, height: size }}>
                  {/* rings */}
                  <div className="absolute inset-0 rounded-full" style={{ border: "1px solid rgba(200,155,44,0.22)" }} />
                  <div className="absolute inset-[42px] rounded-full" style={{ border: "1px solid rgba(200,155,44,0.22)" }} />
                  <div className="absolute inset-[84px] rounded-full" style={{ border: "1px solid rgba(200,155,44,0.22)" }} />
                  <div className="absolute inset-[126px] rounded-full" style={{ border: "1px solid rgba(200,155,44,0.22)" }} />
                  {/* crosshair */}
                  <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2" style={{ background: "rgba(200,155,44,0.12)" }} />
                  <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2" style={{ background: "rgba(200,155,44,0.12)" }} />

                  {/* sweep */}
                  <div className="absolute inset-0 overflow-hidden rounded-full">
                    <div
                      className="bp-sweep h-full w-full"
                      style={{
                        animation: "bp-sweep 7s linear infinite",
                        background: "conic-gradient(from 0deg, rgba(200,155,44,0.55) 0deg, rgba(200,155,44,0.0) 55deg, rgba(200,155,44,0) 360deg)",
                      }}
                    />
                  </div>

                  {/* blips */}
                  {BLIPS.map((b) => {
                    const p = polar(cx, cy, b.r, b.deg);
                    const dot = severityDot[b.severity];
                    return (
                      <div key={b.key} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: p.x, top: p.y }}>
                        <div className="group relative flex items-center justify-center">
                          {b.severity === "alert" && (
                            <span className="absolute inline-flex h-6 w-6 animate-ping rounded-full bg-rose-400 opacity-40" />
                          )}
                          <span className={`relative flex h-6 w-6 items-center justify-center rounded-full ring-4 ${dot} text-slate-950`}>
                            <b.icon className="h-3.5 w-3.5" strokeWidth={2} />
                          </span>
                          <div className="pointer-events-none absolute bottom-full mb-2 hidden w-max max-w-[9rem] -translate-x-1/2 left-1/2 rounded-md px-2.5 py-1.5 text-center text-[10px] leading-tight shadow-lg group-hover:block" style={{ background: "var(--navy)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.15)" }}>
                            <span className="block font-semibold" style={{ color: "#FFFFFF" }}>{b.key}</span>
                            {b.note}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* center readout */}
                  <div className="absolute inset-[84px] flex flex-col items-center justify-center rounded-full text-center">
                    <span className="text-[10px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.5)" }}>This week</span>
                    <span className="display mt-1 text-3xl font-semibold" style={{ color: "var(--gold-light)" }}>6</span>
                    <span className="text-[10px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.5)" }}>channels watched</span>
                  </div>
                </div>

                {/* legend */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs" style={{ color: "rgba(255,255,255,0.75)" }}>
                  <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-rose-400" /> Active alert</span>
                  <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> Needs review</span>
                  <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-sky-300" /> Monitored, clear</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STAT STRIP */}
      <section className="border-b py-10" style={{ background: "var(--white)", borderColor: "var(--line)" }}>
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ background: "var(--gold-dim)", color: "var(--gold)" }}>
                    <s.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="display text-2xl font-semibold" style={{ color: "var(--navy)" }}>{s.value}</div>
                    <div className="text-xs" style={{ color: "var(--ink-soft)" }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs" style={{ color: "var(--ink-soft)" }}>Sample dashboard — illustrative figures.</p>
          </Reveal>
        </div>
      </section>

      {/* THREATS */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <SectionEyebrow>WHAT WE WATCH FOR</SectionEyebrow>
          <h2 className="display mt-3 max-w-2xl text-3xl font-semibold md:text-4xl" style={{ color: "var(--navy)" }}>
            Six ways a brand gets worn down
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            None of these show up in a trademark register search. They show up in the
            market — which is exactly where monitoring has to happen.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {THREATS.map((t, i) => (
            <Reveal key={t.title} delay={i * 70}>
              <div className="bp-card h-full rounded-2xl border p-6" style={{ borderColor: "var(--line)", background: "var(--mist)" }}>
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full" style={{ background: "var(--navy)" }}>
                  <t.icon className="h-5 w-5" style={{ color: "var(--gold-light)" }} strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 text-[15px] font-semibold" style={{ color: "var(--navy)" }}>{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>{t.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="border-y py-20" style={{ background: "var(--white)", borderColor: "var(--line)" }}>
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionEyebrow>HOW IT RUNS</SectionEyebrow>
            <h2 className="display mt-3 max-w-2xl text-3xl font-semibold md:text-4xl" style={{ color: "var(--navy)" }}>
              Scan, verify, prioritize, enforce
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              A real monitoring pipeline, run continuously rather than as a one-off sweep.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <div className="relative rounded-2xl border p-6" style={{ borderColor: "var(--line)", background: "var(--mist)" }}>
                  <span
                    className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
                    style={{ background: "linear-gradient(135deg, var(--gold-light), var(--gold))", color: "var(--navy)" }}
                  >
                    {i + 1}
                  </span>
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full" style={{ background: "var(--gold-dim)" }}>
                    <p.icon className="h-5 w-5" style={{ color: "var(--gold)" }} strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-4 text-[15px] font-semibold" style={{ color: "var(--navy)" }}>{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLKIT */}
      <section id="toolkit" className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(180deg, var(--navy), var(--royal))" }}>
        <div className="mx-auto max-w-6xl px-6 relative">
          <Reveal>
            <SectionEyebrow onDark>ENFORCEMENT TOOLKIT</SectionEyebrow>
            <h2 className="display mt-3 max-w-2xl text-3xl font-semibold md:text-4xl" style={{ color: "#FFFFFF" }}>
              Matched to how serious the threat is
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
              Not every hit needs a lawsuit. The right response is proportionate — fast
              and cheap for the clear cases, formal when it has to be.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-5">
            {TOOLKIT.map((tk, i) => (
              <Reveal key={tk.title} delay={i * 70}>
                <div className="bp-glass-dark bp-card h-full rounded-2xl p-5">
                  <tk.icon className="h-5 w-5" style={{ color: "var(--gold-light)" }} strokeWidth={1.75} />
                  <h3 className="mt-3 text-sm font-semibold" style={{ color: "#FFFFFF" }}>{tk.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.68)" }}>{tk.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-20" style={{ background: "var(--mist)" }}>
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl px-8 py-14 md:px-16"
            style={{ background: "linear-gradient(120deg, var(--navy), var(--royal) 60%, #1E56A0)" }}
          >
            <Radar className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 rotate-12" style={{ color: "rgba(255,255,255,0.08)" }} />
            <div
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{ background: "radial-gradient(circle at 80% 20%, rgba(200,155,44,0.3), transparent 55%)" }}
            />
            <div className="relative max-w-2xl">
              <SectionEyebrow onDark>LET'S TALK</SectionEyebrow>
              <h2 className="display mt-3 text-3xl font-semibold md:text-4xl" style={{ color: "#FFFFFF" }}>
                Find out what's already out there
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,0.78)" }}>
                A free brand audit scans your name and marks across marketplaces, domains,
                and social platforms — and tells you exactly what needs action first.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="mailto:info@perceptivebrains.com"
                  className="bp-btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
                  style={{ background: "linear-gradient(135deg, var(--gold-light), var(--gold))", color: "var(--navy)" }}
                >
                  <Send className="h-4 w-4" /> Request my free audit
                </a>
                <Link
                  to="/services/brand-protection#process"
                  className="bp-btn-ghost inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold"
                  style={{ borderColor: "rgba(255,255,255,0.3)", color: "#FFFFFF" }}
                >
                  Revisit the process
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-2">
                <CheckCircle2 size={13} style={{ color: "var(--gold-light)" }} />
                <p className="text-[11px] font-semibold tracking-widest" style={{ color: "rgba(255,255,255,0.6)" }}>
                  PERCEPTIVE BRAINS IP · REGISTERED PATENT & TRADEMARK ANALYSTS
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}