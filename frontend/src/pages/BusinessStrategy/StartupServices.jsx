import {
  Search,
  FileText,
  Stamp,
  FileSignature,
  Compass,
  Handshake,
  ArrowRight,
  Check,
} from "lucide-react";

/**
 * StartupIPServices — luxury navy / gold restyle
 * -----------------------------------------------
 * Palette:  navy #082E63 / deep navy #051B3F / gold #C69A32 /
 *           ivory #F8F6EF / white / slate #6B7A94
 * Type:     font-serif → swap in "Cormorant Garamond" or "Playfair
 *           Display" for the full effect; body stays on Inter/system
 *           sans; stats/eyebrows lean on tracked-out uppercase caps.
 *
 * Signature element unchanged in spirit: the three service packages
 * are still mile-markers along a founder's real funding trajectory
 * (Formation → Seed–Series A → Growth) — now rendered as a gold
 * connecting thread with glass, glowing markers instead of a flat
 * gray line, since the sequence itself is the honest thing to
 * emphasize here.
 */

const SERVICES = [
  {
    icon: Search,
    title: "Patentability & freedom-to-operate search",
    desc: "Know what's clear to build on before you spend the runway building it.",
  },
  {
    icon: FileText,
    title: "Provisional & utility patent filing",
    desc: "Get a filing date secured, then build out full claims as the product firms up.",
  },
  {
    icon: Stamp,
    title: "Trademark clearance & registration",
    desc: "Check the name and mark are actually available before they're on the pitch deck.",
  },
  {
    icon: FileSignature,
    title: "Founder & employee IP assignment",
    desc: "Make sure everything built for the company legally belongs to the company.",
  },
  {
    icon: Compass,
    title: "IP strategy & portfolio planning",
    desc: "Decide what to file, what to keep as a trade secret, and in what order.",
  },
  {
    icon: Handshake,
    title: "Licensing & diligence support",
    desc: "Get the IP data room in shape before a term sheet makes it urgent.",
  },
];

const STAGES = [
  {
    stage: "Formation",
    tagline: "Lock down the basics before you fundraise",
    includes: [
      "Founder & contractor IP assignment agreements",
      "Trademark clearance search",
      "NDA and confidentiality templates",
      "Cap-table-ready IP ownership audit",
    ],
    highlighted: false,
  },
  {
    stage: "Seed – Series A",
    tagline: "Turn the technology into a defensible asset",
    includes: [
      "Provisional or first utility patent filing",
      "Trademark registration, core markets",
      "Investor IP due-diligence prep",
      "Licensing & vendor agreement review",
    ],
    highlighted: true,
  },
  {
    stage: "Growth & scale",
    tagline: "Manage a portfolio, not just a filing",
    includes: [
      "Portfolio strategy & renewal management",
      "International filing strategy",
      "Litigation & enforcement readiness",
      "Ongoing general IP counsel",
    ],
    highlighted: false,
  },
];

function GlowBlob({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
    />
  );
}

export default function StartupIPServices() {
  return (
    <div className="w-full bg-[#F8F6EF] font-sans text-[#1c2b47] [font-family:'Inter',ui-sans-serif,system-ui]">
      <style>{`.font-serif { font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif; }`}</style>

      {/* Hero */}
      <div className="relative overflow-hidden bg-[#051B3F] text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_15%_-10%,rgba(198,154,50,0.18),transparent_45%),radial-gradient(circle_at_90%_20%,rgba(139,163,198,0.14),transparent_40%),linear-gradient(180deg,#051B3F_0%,#082E63_65%,#051B3F_100%)]"
        />
        <GlowBlob className="left-[-8%] top-8 h-72 w-72 bg-[#C69A32]/20" />
        <GlowBlob className="right-[-6%] top-24 h-80 w-80 bg-[#3D5A8A]/25" />

        <div className="relative mx-auto max-w-5xl px-6 py-24">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#C69A32]">
              <span className="h-px w-6 bg-current" />
              IP counsel for founders
            </span>
            <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Built for how startups{" "}
              <span className="bg-gradient-to-r from-[#C69A32] via-[#e0bb63] to-[#C69A32] bg-clip-text text-transparent">
                actually move
              </span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/60">
              Filing timelines that match your fundraising timeline, not the
              other way around. We work with founding teams from the first
              line of code through the first international patent portfolio.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C69A32] to-[#a97e22] px-6 py-3 text-sm font-semibold text-[#051B3F] shadow-[0_0_30px_-6px_rgba(198,154,50,0.55)] transition-transform hover:scale-[1.03]">
                Book a consult
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 backdrop-blur-sm transition-colors hover:border-[#C69A32]/50 hover:text-white">
                See how pricing works
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-20">
        {/* Services grid */}
        <div className="mb-24">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8B6F2E]">
            What we handle
          </span>
          <h2 className="mt-2 mb-8 font-serif text-2xl font-semibold text-[#082E63]">
            Every filing, from first idea to first term sheet
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl border border-[#082E63]/8 bg-white p-6 shadow-[0_2px_16px_-8px_rgba(8,46,99,0.1)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgba(8,46,99,0.22)]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#082E63] to-[#0c3a7c] shadow-inner transition-transform group-hover:scale-105">
                  <Icon className="h-5 w-5 text-[#C69A32]" />
                </div>
                <h3 className="mb-1.5 text-sm font-semibold leading-snug text-[#082E63]">
                  {title}
                </h3>
                <p className="text-[13px] leading-relaxed text-[#6B7A94]">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stage-based packages, presented as a founder's trajectory */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8B6F2E]">
            Matched to your stage
          </span>
          <h2 className="mt-2 mb-1 font-serif text-2xl font-semibold text-[#082E63]">
            Start where the company actually is
          </h2>
          <p className="mb-10 text-sm text-[#6B7A94]">
            Each stage folds into the next as you grow — no re-onboarding, no
            starting over.
          </p>

          <div className="relative">
            {/* connecting trajectory line */}
            <div
              className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-[#C69A32]/50 to-transparent sm:block"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {STAGES.map((s, i) => (
                <div key={s.stage} className="relative flex flex-col">
                  {/* mile marker */}
                  <div className="mb-4 hidden items-center sm:flex">
                    <span
                      className={`z-10 flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-mono font-semibold ${
                        s.highlighted
                          ? "border-[#C69A32] bg-[#C69A32] text-[#051B3F] shadow-[0_0_16px_-2px_rgba(198,154,50,0.7)]"
                          : "border-[#082E63]/15 bg-[#F8F6EF] text-[#6B7A94]"
                      }`}
                    >
                      {i + 1}
                    </span>
                  </div>

                  <div
                    className={`flex flex-1 flex-col rounded-2xl border p-6 transition-all ${
                      s.highlighted
                        ? "border-[#C69A32]/40 bg-white shadow-[0_20px_50px_-18px_rgba(198,154,50,0.35)]"
                        : "border-[#082E63]/8 bg-white/70 backdrop-blur-sm hover:border-[#082E63]/15"
                    }`}
                  >
                    {s.highlighted && (
                      <span className="mb-3 w-fit rounded-full bg-[#C69A32]/12 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#8B6F2E]">
                        Most common at this stage
                      </span>
                    )}
                    <h3 className="font-serif text-lg font-semibold text-[#082E63]">
                      {s.stage}
                    </h3>
                    <p className="mb-5 mt-1 text-xs text-[#6B7A94]">{s.tagline}</p>
                    <ul className="mb-6 space-y-2.5">
                      {s.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-[#1c2b47]">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C69A32]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`mt-auto inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-semibold transition-all ${
                        s.highlighted
                          ? "bg-gradient-to-r from-[#C69A32] to-[#a97e22] text-[#051B3F] shadow-[0_0_20px_-6px_rgba(198,154,50,0.6)] hover:scale-[1.03]"
                          : "border border-[#082E63]/15 text-[#082E63] hover:border-[#082E63]/35"
                      }`}
                    >
                      Start here
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="relative mt-20 flex flex-col items-start justify-between gap-5 overflow-hidden rounded-2xl border border-[#082E63]/10 bg-gradient-to-br from-[#082E63] to-[#051B3F] p-8 text-white shadow-[0_20px_60px_-20px_rgba(8,46,99,0.5)] sm:flex-row sm:items-center">
          <GlowBlob className="right-[-10%] top-1/2 h-56 w-56 -translate-y-1/2 bg-[#C69A32]/20" />
          <div className="relative">
            <h3 className="font-serif text-xl font-semibold">
              Not sure which stage fits?
            </h3>
            <p className="mt-1 text-sm text-white/60">
              A 20-minute call is usually enough to map out what to file
              first.
            </p>
          </div>
          <button className="relative inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-[#C69A32] to-[#a97e22] px-6 py-3 text-sm font-semibold text-[#051B3F] shadow-[0_0_30px_-6px_rgba(198,154,50,0.6)] transition-transform hover:scale-[1.03]">
            Book a consult
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}