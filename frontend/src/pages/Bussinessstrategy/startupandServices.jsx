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
 * StartupIPServices
 * -----------------
 * A single, self-contained marketing section for an IP practice's
 * "services for startups" page. Pairs with the IPPortfolioManager and
 * IPValuation tools in the same visual system (ink navy / parchment /
 * seal crimson / brass gold), but built for prospects rather than
 * internal case teams — static content, no state.
 *
 * Signature element: the three service packages are presented as
 * mile-markers along a founder's actual funding trajectory (Formation →
 * Seed–Series A → Growth), since the packages genuinely are a sequence
 * tied to company stage, not an arbitrary good/better/best split.
 *
 * Fonts: system serif/sans/mono stacks — swap for your installed
 * families (e.g. Source Serif 4 / Inter) to match the rest of the suite.
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

export default function StartupIPServices() {
  return (
    <div className="w-full bg-[#F5F1E8] font-sans text-[#1C2541]">
      <div className="mx-auto max-w-5xl px-6 py-16">
        {/* Hero */}
        <div className="mb-16 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8B2E3F]">
            IP counsel for founders
          </span>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Built for how startups actually move
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#5B6472]">
            Filing timelines that match your fundraising timeline, not the other way around.
            We work with founding teams from the first line of code through the first
            international patent portfolio.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-md bg-[#1C2541] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#243057]">
              Book a consult
              <ArrowRight className="h-4 w-4" />
            </button>
            <button className="rounded-md border border-[#1C2541]/20 px-5 py-2.5 text-sm font-medium text-[#1C2541] transition-colors hover:border-[#1C2541]/40">
              See how pricing works
            </button>
          </div>
        </div>

        {/* Services grid */}
        <div className="mb-20">
          <h2 className="mb-6 font-serif text-xl font-semibold">What we handle</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-md border border-[#E4DFD3] bg-white p-5 transition-shadow hover:shadow-sm"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F1E8]">
                  <Icon className="h-4 w-4 text-[#8B2E3F]" />
                </div>
                <h3 className="mb-1.5 text-sm font-semibold leading-snug text-[#1C2541]">
                  {title}
                </h3>
                <p className="text-xs leading-relaxed text-[#5B6472]">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stage-based packages, presented as a founder's trajectory */}
        <div>
          <h2 className="mb-1 font-serif text-xl font-semibold">Matched to your stage</h2>
          <p className="mb-8 text-sm text-[#5B6472]">
            Start where the company actually is — each stage folds into the next as you grow.
          </p>

          <div className="relative">
            {/* connecting trajectory line */}
            <div
              className="absolute left-0 right-0 top-6 hidden h-px bg-[#E4DFD3] sm:block"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {STAGES.map((s, i) => (
                <div key={s.stage} className="relative flex flex-col">
                  {/* mile marker */}
                  <div className="mb-4 hidden items-center sm:flex">
                    <span
                      className={`z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 text-[10px] font-semibold ${
                        s.highlighted
                          ? "border-[#8B2E3F] bg-[#8B2E3F] text-white"
                          : "border-[#E4DFD3] bg-[#F5F1E8] text-[#5B6472]"
                      }`}
                    >
                      {i + 1}
                    </span>
                  </div>

                  <div
                    className={`flex flex-1 flex-col rounded-md border p-5 ${
                      s.highlighted
                        ? "border-[#8B2E3F] bg-white shadow-md"
                        : "border-[#E4DFD3] bg-white"
                    }`}
                  >
                    {s.highlighted && (
                      <span className="mb-2 w-fit rounded-full bg-[#F4E4E6] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#8B2E3F]">
                        Most common at this stage
                      </span>
                    )}
                    <h3 className="font-serif text-lg font-semibold text-[#1C2541]">
                      {s.stage}
                    </h3>
                    <p className="mb-4 mt-1 text-xs text-[#5B6472]">{s.tagline}</p>
                    <ul className="mb-5 space-y-2">
                      {s.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-[#1C2541]">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#3C6E47]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`mt-auto inline-flex items-center justify-center gap-1.5 rounded-md px-4 py-2 text-xs font-medium transition-colors ${
                        s.highlighted
                          ? "bg-[#1C2541] text-white hover:bg-[#243057]"
                          : "border border-[#1C2541]/20 text-[#1C2541] hover:border-[#1C2541]/40"
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
        <div className="mt-16 flex flex-col items-start justify-between gap-4 rounded-md border border-[#E4DFD3] bg-white p-6 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-serif text-lg font-semibold text-[#1C2541]">
              Not sure which stage fits?
            </h3>
            <p className="mt-1 text-sm text-[#5B6472]">
              A 20-minute call is usually enough to map out what to file first.
            </p>
          </div>
          <button className="inline-flex shrink-0 items-center gap-2 rounded-md bg-[#8B2E3F] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#7A2836]">
            Book a consult
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}