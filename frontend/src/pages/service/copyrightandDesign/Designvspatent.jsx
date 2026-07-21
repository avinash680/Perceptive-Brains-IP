import React, { useEffect, useRef, useState } from "react";
import {
  GitCompare,
  Palette,
  Cog,
  Clock,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  XCircle,
  Lightbulb,
  PenTool,
  Award,
  ArrowRight,
  Send,
  Puzzle,
  Layers,
} from "lucide-react";

/**
 * Design vs Patent — single-section landing component.
 * Signature idea: this is a genuine either/or decision, so the hero is an
 * interactive drag-to-compare slider — Design's aesthetic register on one
 * side, Patent's technical register on the other — resolved by a real
 * native <input type="range"> for full keyboard & screen-reader support.
 */

const FONT_ID = "dvp-fonts";

function useGoogleFonts() {
  useEffect(() => {
    if (document.getElementById(FONT_ID)) return;
    const link = document.createElement("link");
    link.id = FONT_ID;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap";
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

const ROWS = [
  {
    label: "Protects",
    design: "How it looks — shape, pattern, ornamentation",
    patent: "How it works — a new invention, process, or mechanism",
  },
  {
    label: "Novelty test",
    design: "New & original visual appearance, not previously published",
    patent: "New, non-obvious, and capable of industrial application",
  },
  {
    label: "Duration",
    design: "10 years, renewable once for 5 more — 15 years total",
    patent: "20 years from the filing date, not renewable further",
  },
  {
    label: "Time to grant",
    design: "Roughly 6–12 months",
    patent: "Typically 2–5+ years, given examination backlogs",
  },
  {
    label: "Cost & complexity",
    design: "Lower — a simpler application, faster to prepare",
    patent: "Higher — full specification, claims, and prior-art search",
  },
  {
    label: "What's excluded",
    design: "Features dictated purely by function, not appearance",
    patent: "Purely aesthetic features with no technical effect",
  },
  {
    label: "Enforcement strength",
    design: "Narrower — blocks substantially similar appearance only",
    patent: "Broad — blocks any use of the claimed invention, any look",
  },
];

const CHOOSE_DESIGN = [
  "Your product's value is mostly in how it looks",
  "You need protection fast, at lower cost",
  "The shape isn't technically necessary for the product to work",
  "You're in fashion, packaging, furniture, or consumer goods",
];

const CHOOSE_PATENT = [
  "Your product works differently, not just looks different",
  "There's a technical mechanism, process, or composition involved",
  "You want to stop competitors from the function, regardless of styling",
  "You can afford a longer runway to grant",
];

export default function DesignVsPatent() {
  useGoogleFonts();
  const [pos, setPos] = useState(50);

  const fontDisplay = { fontFamily: "'Space Grotesk', ui-sans-serif, system-ui" };
  const fontMono = { fontFamily: "'JetBrains Mono', ui-monospace, monospace" };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased" style={{ fontFamily: "'Inter', ui-sans-serif, system-ui" }}>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-16 md:pt-28">
          <Reveal className="text-center">
            <div
              className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-500 shadow-sm"
              style={fontMono}
            >
              <GitCompare className="h-3.5 w-3.5" />
              Two protections, two purposes
            </div>
            <h1
              className="mx-auto max-w-3xl text-4xl leading-[1.08] text-slate-900 md:text-6xl"
              style={{ ...fontDisplay, fontWeight: 700 }}
            >
              Design or patent?
              <br />
              <span className="bg-gradient-to-r from-rose-500 via-orange-400 to-blue-600 bg-clip-text text-transparent">
                Depends what's actually new.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              One protects the way your product looks. The other protects the way it
              works. Most founders need to know which — sometimes both — before they file.
            </p>
          </Reveal>

          {/* Drag-to-compare */}
          <Reveal delay={150}>
            <div className="relative mx-auto mt-14 max-w-4xl">
              <div className="relative h-[380px] w-full overflow-hidden rounded-3xl shadow-2xl shadow-slate-300/50 select-none">
                {/* PATENT base layer (right side, blue/technical) */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-indigo-800">
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(255,255,255,0.5) 27px, rgba(255,255,255,0.5) 28px), repeating-linear-gradient(90deg, transparent, transparent 27px, rgba(255,255,255,0.5) 27px, rgba(255,255,255,0.5) 28px)",
                    }}
                  />
                  <div className="absolute right-8 top-1/2 w-56 -translate-y-1/2 text-right md:right-14 md:w-64">
                    <Cog className="ml-auto h-9 w-9 text-blue-200" strokeWidth={1.5} />
                    <h3 className="mt-3 text-2xl font-bold text-white md:text-3xl" style={fontDisplay}>
                      Patent
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-blue-100">
                      Protects how it works.
                    </p>
                    <span
                      className="mt-4 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-blue-100"
                      style={fontMono}
                    >
                      20 years
                    </span>
                  </div>
                </div>

                {/* DESIGN overlay layer (left side, warm/organic), clipped by pos */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden bg-gradient-to-br from-rose-500 to-orange-400"
                  style={{ width: `${pos}%` }}
                >
                  <div className="absolute -left-10 -top-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
                  <div className="absolute -bottom-16 left-24 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
                  <div className="absolute left-8 top-1/2 w-56 -translate-y-1/2 md:left-14 md:w-64">
                    <Palette className="h-9 w-9 text-rose-100" strokeWidth={1.5} />
                    <h3 className="mt-3 text-2xl font-bold text-white md:text-3xl" style={fontDisplay}>
                      Design
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-rose-50">
                      Protects how it looks.
                    </p>
                    <span
                      className="mt-4 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-rose-50"
                      style={fontMono}
                    >
                      10 + 5 years
                    </span>
                  </div>
                </div>

                {/* Divider handle (decorative, follows slider) */}
                <div
                  className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white/80"
                  style={{ left: `${pos}%` }}
                >
                  <div className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-700 shadow-lg">
                    <GitCompare className="h-5 w-5" />
                  </div>
                </div>

                {/* Accessible native range input driving the slider */}
                <input
                  type="range"
                  min={4}
                  max={96}
                  value={pos}
                  onChange={(e) => setPos(Number(e.target.value))}
                  aria-label="Drag to compare design registration and patent protection"
                  className="absolute inset-0 z-20 h-full w-full cursor-col-resize opacity-0"
                />
              </div>
              <p className="mt-4 text-center text-xs uppercase tracking-widest text-slate-400" style={fontMono}>
                Drag to compare
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400" style={fontMono}>
            Side by side
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl text-slate-900 md:text-4xl" style={{ ...fontDisplay, fontWeight: 700 }}>
            Seven questions that settle it
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr_1.4fr]">
              <div className="hidden items-end p-5 md:flex">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400" style={fontMono}>
                  Question
                </span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-br from-rose-500 to-orange-400 p-5 text-white">
                <Palette className="h-5 w-5" />
                <span className="font-semibold" style={fontDisplay}>Design registration</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-br from-blue-700 to-indigo-800 p-5 text-white">
                <Cog className="h-5 w-5" />
                <span className="font-semibold" style={fontDisplay}>Patent</span>
              </div>
            </div>

            {ROWS.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-1 md:grid-cols-[1fr_1.4fr_1.4fr] ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
              >
                <div className="border-t border-slate-200 p-5 text-sm font-semibold text-slate-500 md:border-r">
                  {row.label}
                </div>
                <div className="border-t border-slate-200 p-5 text-sm leading-relaxed text-slate-700 md:border-r">
                  {row.design}
                </div>
                <div className="border-t border-slate-200 p-5 text-sm leading-relaxed text-slate-700">
                  {row.patent}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* CHOOSE CARDS */}
      <section className="border-y border-slate-200 bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400" style={fontMono}>
              Quick read
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl text-slate-900 md:text-4xl" style={{ ...fontDisplay, fontWeight: 700 }}>
              Which one fits your product?
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Reveal delay={80}>
              <div className="h-full rounded-3xl border border-rose-200 bg-white p-8 shadow-sm">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-orange-400 text-white">
                  <PenTool className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-900" style={fontDisplay}>
                  Choose Design if
                </h3>
                <ul className="mt-5 space-y-3">
                  {CHOOSE_DESIGN.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="h-full rounded-3xl border border-blue-200 bg-white p-8 shadow-sm">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-indigo-800 text-white">
                  <Lightbulb className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-900" style={fontDisplay}>
                  Choose Patent if
                </h3>
                <ul className="mt-5 space-y-3">
                  {CHOOSE_PATENT.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CAN I HAVE BOTH */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white">
              <Puzzle className="h-6 w-6" strokeWidth={1.75} />
            </div>
            <h2 className="mt-5 text-3xl text-slate-900 md:text-4xl" style={{ ...fontDisplay, fontWeight: 700 }}>
              You can often file both
            </h2>
            <p className="mt-5 leading-relaxed text-slate-600">
              They're not competing options — they protect different layers of the same
              product. A kettle's ergonomic curve can carry a design registration while
              its temperature-sensing mechanism carries a patent.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              Filing both closes more doors for competitors: one blocks the look, the
              other blocks the function, and copying around one no longer gets a rival
              past the other.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <ShieldCheck className="h-5 w-5 text-rose-500" />
                <p className="mt-3 text-sm font-semibold text-slate-900">Design layer</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  Blocks copycats that look the same, even with a different mechanism.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <Layers className="h-5 w-5 text-blue-700" />
                <p className="mt-3 text-sm font-semibold text-slate-900">Patent layer</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  Blocks the underlying invention, even styled to look completely different.
                </p>
              </div>
              <div className="col-span-2 flex items-center gap-3 rounded-2xl bg-slate-900 p-6 text-white">
                <Award className="h-5 w-5 text-amber-300" />
                <p className="text-sm leading-relaxed text-slate-200">
                  Together, they cover the product from two directions competitors can't
                  both route around.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-14 text-white md:px-16">
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 15% 20%, rgba(244,63,94,0.35), transparent 45%), radial-gradient(circle at 85% 80%, rgba(37,99,235,0.35), transparent 45%)",
              }}
            />
            <div className="relative max-w-2xl">
              <Sparkles className="h-8 w-8 text-amber-300" />
              <h2 className="mt-4 text-3xl md:text-4xl" style={{ ...fontDisplay, fontWeight: 700 }}>
                Not sure which one your product needs?
              </h2>
              <p className="mt-4 leading-relaxed text-slate-300">
                Send us a photo or sketch and a short description. We'll tell you plainly
                whether you need a design registration, a patent, or both.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="mailto:hello@vantageip.example"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-200"
                >
                  <Send className="h-4 w-4" /> Get a free assessment
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/60"
                >
                  Talk to an attorney <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}