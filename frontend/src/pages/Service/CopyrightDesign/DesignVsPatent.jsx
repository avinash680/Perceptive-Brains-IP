import React, { useEffect, useRef, useState } from "react";
import {
  GitCompare,
  Palette,
  Cog,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
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
 * Restyled into the navy / gold / white luxury system. The comparison itself
 * now IS the palette: Design (aesthetic, warm gold) on one side, Patent
 * (technical, cool navy) on the other — resolved by a real native
 * <input type="range"> for full keyboard & screen-reader support.
 * Styling is Tailwind-only; the two exceptions are the slider's own width/
 * position, which are runtime values driven by user drag input, not style
 * choices, so they stay as inline bindings.
 */

const FONT_ID = "dvp-lux-fonts";

function useGoogleFonts() {
  useEffect(() => {
    if (document.getElementById(FONT_ID)) return;
    const link = document.createElement("link");
    link.id = FONT_ID;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap";
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
        delay ? `delay-[${delay}ms]` : ""
      } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
    >
      {children}
    </div>
  );
}

const Eyebrow = ({ children }) => (
  <p className="inline-flex items-center gap-2 rounded-full border border-[#082E63]/10 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#8a8672] shadow-sm">
    <GitCompare className="h-3.5 w-3.5" />
    {children}
  </p>
);

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

  return (
    <div className="min-h-screen w-full bg-white text-[#22201B] font-['Inter',sans-serif] antialiased">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F8FA] to-white">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-16 md:pt-28">
          <Reveal className="text-center">
            <div className="mx-auto mb-6 w-fit">
              <Eyebrow>Two protections, two purposes</Eyebrow>
            </div>
            <h1 className="mx-auto max-w-3xl font-['Playfair_Display',serif] text-4xl font-bold leading-[1.08] text-[#082E63] md:text-6xl">
              Design or patent?
              <br />
              <span className="bg-gradient-to-r from-[#8F723A] via-[#C69A32] to-[#082E63] bg-clip-text text-transparent">
                Depends what's actually new.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#3a4560]/70">
              One protects the way your product looks. The other protects the way it
              works. Most founders need to know which — sometimes both — before they file.
            </p>
          </Reveal>

          {/* Drag-to-compare */}
          <Reveal delay={150}>
            <div className="relative mx-auto mt-14 max-w-4xl">
              <div className="relative h-[380px] w-full overflow-hidden rounded-3xl shadow-2xl shadow-[#082E63]/20 select-none">
                {/* PATENT base layer (right side, navy/technical) */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#082E63] to-[#0F3D7A]">
                  <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_27px,rgba(255,255,255,0.6)_27px,rgba(255,255,255,0.6)_28px),repeating-linear-gradient(90deg,transparent,transparent_27px,rgba(255,255,255,0.6)_27px,rgba(255,255,255,0.6)_28px)]" />
                  <div className="absolute right-8 top-1/2 w-56 -translate-y-1/2 text-right md:right-14 md:w-64">
                    <Cog className="ml-auto h-9 w-9 text-[#E8CD86]" strokeWidth={1.5} />
                    <h3 className="mt-3 font-['Playfair_Display',serif] text-2xl font-bold text-white md:text-3xl">
                      Patent
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      Protects how it works.
                    </p>
                    <span className="mt-4 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-white/80">
                      20 years
                    </span>
                  </div>
                </div>

                {/* DESIGN overlay layer (left side, warm gold), clipped by pos */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden bg-gradient-to-br from-[#8F723A] to-[#C69A32]"
                  style={{ width: `${pos}%` }}
                >
                  <div className="absolute -left-10 -top-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
                  <div className="absolute -bottom-16 left-24 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
                  <div className="absolute left-8 top-1/2 w-56 -translate-y-1/2 md:left-14 md:w-64">
                    <Palette className="h-9 w-9 text-white" strokeWidth={1.5} />
                    <h3 className="mt-3 font-['Playfair_Display',serif] text-2xl font-bold text-white md:text-3xl">
                      Design
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      Protects how it looks.
                    </p>
                    <span className="mt-4 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white">
                      10 + 5 years
                    </span>
                  </div>
                </div>

                {/* Divider handle (decorative, follows slider) */}
                <div
                  className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white/80"
                  style={{ left: `${pos}%` }}
                >
                  <div className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#082E63] shadow-lg">
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
              <p className="mt-4 text-center text-xs uppercase tracking-widest text-[#8a8672]">
                Drag to compare
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C69A32]">
            Side by side
          </p>
          <h2 className="mt-3 max-w-2xl font-['Playfair_Display',serif] text-3xl font-bold text-[#082E63] md:text-4xl">
            Seven questions that settle it
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 overflow-hidden rounded-3xl border border-[#082E63]/10 shadow-[0_20px_50px_-30px_rgba(8,46,99,0.4)]">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr_1.4fr]">
              <div className="hidden items-end p-5 md:flex">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#8a8672]">
                  Question
                </span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-br from-[#8F723A] to-[#C69A32] p-5 text-white">
                <Palette className="h-5 w-5" />
                <span className="font-['Playfair_Display',serif] font-semibold">Design registration</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-br from-[#082E63] to-[#0F3D7A] p-5 text-white">
                <Cog className="h-5 w-5" />
                <span className="font-['Playfair_Display',serif] font-semibold">Patent</span>
              </div>
            </div>

            {ROWS.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-1 md:grid-cols-[1fr_1.4fr_1.4fr] ${i % 2 === 0 ? "bg-white" : "bg-[#F7F8FA]"}`}
              >
                <div className="border-t border-[#082E63]/10 p-5 text-sm font-semibold text-[#3a4560]/70 md:border-r">
                  {row.label}
                </div>
                <div className="border-t border-[#082E63]/10 p-5 text-sm leading-relaxed text-[#22201B]/80 md:border-r">
                  {row.design}
                </div>
                <div className="border-t border-[#082E63]/10 p-5 text-sm leading-relaxed text-[#22201B]/80">
                  {row.patent}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* CHOOSE CARDS */}
      <section className="border-y border-[#082E63]/10 bg-[#F7F8FA] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C69A32]">
              Quick read
            </p>
            <h2 className="mt-3 max-w-2xl font-['Playfair_Display',serif] text-3xl font-bold text-[#082E63] md:text-4xl">
              Which one fits your product?
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Reveal delay={80}>
              <div className="h-full rounded-3xl border border-[#C69A32]/25 bg-white p-8 shadow-[0_16px_40px_-28px_rgba(8,46,99,0.3)] transition-transform duration-300 hover:-translate-y-1">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#8F723A] to-[#C69A32] text-white shadow-[0_10px_24px_-8px_rgba(198,154,50,0.5)]">
                  <PenTool className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 font-['Playfair_Display',serif] text-xl font-bold text-[#082E63]">
                  Choose Design if
                </h3>
                <ul className="mt-5 space-y-3">
                  {CHOOSE_DESIGN.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#3a4560]/75">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C69A32]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="h-full rounded-3xl border border-[#082E63]/15 bg-white p-8 shadow-[0_16px_40px_-28px_rgba(8,46,99,0.3)] transition-transform duration-300 hover:-translate-y-1">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#082E63] to-[#0F3D7A] text-white shadow-[0_10px_24px_-8px_rgba(8,46,99,0.5)]">
                  <Lightbulb className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 font-['Playfair_Display',serif] text-xl font-bold text-[#082E63]">
                  Choose Patent if
                </h3>
                <ul className="mt-5 space-y-3">
                  {CHOOSE_PATENT.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#3a4560]/75">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#082E63]" />
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
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#082E63] to-[#0F3D7A] text-[#E8CD86] shadow-[0_10px_24px_-8px_rgba(8,46,99,0.5)]">
              <Puzzle className="h-6 w-6" strokeWidth={1.75} />
            </div>
            <h2 className="mt-5 font-['Playfair_Display',serif] text-3xl font-bold text-[#082E63] md:text-4xl">
              You can often file both
            </h2>
            <p className="mt-5 leading-relaxed text-[#3a4560]/75">
              They're not competing options — they protect different layers of the same
              product. A kettle's ergonomic curve can carry a design registration while
              its temperature-sensing mechanism carries a patent.
            </p>
            <p className="mt-4 leading-relaxed text-[#3a4560]/75">
              Filing both closes more doors for competitors: one blocks the look, the
              other blocks the function, and copying around one no longer gets a rival
              past the other.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-[#082E63]/10 bg-white p-6 shadow-[0_14px_34px_-24px_rgba(8,46,99,0.3)]">
                <ShieldCheck className="h-5 w-5 text-[#C69A32]" />
                <p className="mt-3 text-sm font-semibold text-[#082E63]">Design layer</p>
                <p className="mt-1 text-xs leading-relaxed text-[#3a4560]/60">
                  Blocks copycats that look the same, even with a different mechanism.
                </p>
              </div>
              <div className="rounded-2xl border border-[#082E63]/10 bg-white p-6 shadow-[0_14px_34px_-24px_rgba(8,46,99,0.3)]">
                <Layers className="h-5 w-5 text-[#082E63]" />
                <p className="mt-3 text-sm font-semibold text-[#082E63]">Patent layer</p>
                <p className="mt-1 text-xs leading-relaxed text-[#3a4560]/60">
                  Blocks the underlying invention, even styled to look completely different.
                </p>
              </div>
              <div className="col-span-2 flex items-center gap-3 rounded-2xl bg-gradient-to-br from-[#082E63] to-[#061B3D] p-6 text-white shadow-[0_20px_44px_-24px_rgba(0,0,0,0.5)]">
                <Award className="h-5 w-5 text-[#E8CD86] shrink-0" />
                <p className="text-sm leading-relaxed text-white/75">
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
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#061B3D] via-[#082E63] to-[#0A2554] px-8 py-14 text-white md:px-16">
            <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_15%_20%,rgba(198,154,50,0.35),transparent_45%),radial-gradient(circle_at_85%_80%,rgba(15,61,122,0.5),transparent_45%)]" />
            <div className="relative max-w-2xl">
              <Sparkles className="h-8 w-8 text-[#E8CD86]" />
              <h2 className="mt-4 font-['Playfair_Display',serif] text-3xl font-bold md:text-4xl">
                Not sure which one your product needs?
              </h2>
              <p className="mt-4 leading-relaxed text-white/60">
                Send us a photo or sketch and a short description. We'll tell you plainly
                whether you need a design registration, a patent, or both.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="mailto:hello@vantageip.example"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C69A32] to-[#E8CD86] px-6 py-3 text-sm font-semibold text-[#082E63] shadow-[0_10px_28px_-8px_rgba(198,154,50,0.7)] transition-transform duration-300 hover:scale-[1.04]"
                >
                  <Send className="h-4 w-4" /> Get a free assessment
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:border-[#C69A32]/60"
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