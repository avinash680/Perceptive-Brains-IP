import React from "react";
import {
  FileText,
  Shield,
  Copyright,
  Scale,
  Lightbulb,
  PenTool,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    icon: FileText,
    code: "PAT / 01",
    title: "Patent filing & prosecution",
    description:
      "End-to-end provisional, complete and PCT patent drafting, filing and prosecution across 150+ jurisdictions.",
    tag: "Flagship",
  },
 
 {
    icon: PenTool,
    code: "DES / 02",
    title: "Design registration",
    description:
      "Protect the visual and aesthetic features of your products under the Designs Act and Hague.",
  },
 
 
 
 
  {
    icon: Shield,
    code: "TM / 03",
    title: "Trademark registration",
    description:
      "Brand clearance search, filing, opposition handling and global trademark portfolio management.",
  },
  {
    icon: Copyright,
    code: "CR / 04",
    title: "Copyright services",
    description:
      "Protection for literary, artistic, musical, software and audio-visual works.",
  },
  {
    icon: Scale,
    code: "LIT / 05",
    title: "IP litigation",
    description:
      "Strategic representation in infringement suits, oppositions and enforcement before courts and IPAB.",
  },
  {
    icon: Lightbulb,
    code: "STR / 06",
    title: "IP strategy & consulting",
    description:
      "Patent landscaping, freedom-to-operate, valuation and portfolio strategy aligned to business goals.",
  },
  
];

export default function Services() {
  return (
    <section className="relative overflow-hidden bg-[#F6F3EA] py-20 lg:py-28">
      {/* Font pairing: a restrained display serif for headings, a mono face
          reserved for the docket / registry codes — the one place in the
          design where a "reference number" is literally true to the content. */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=IBM+Plex+Mono:wght@500&display=swap');
        .font-display { font-family: 'Fraunces', Georgia, serif; }
        .font-docket { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
      `}</style>

      {/* Faint ruled-paper texture — a quiet nod to a legal pad / registry ledger */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent, transparent 34px, #E3DCC8 35px)",
        }}
      />

      {/* Single ambient glow, kept small and quiet */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-[#C89B3C]/10 blur-[110px]"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-12 border-b border-[#DEDACB]">
          <div>
            <p className="font-docket uppercase tracking-[4px] text-[#9C7423] text-[11px] font-medium mb-4">
              Registry — Practice Areas
            </p>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] text-[#10182E] leading-[1.15] max-w-2xl">
              Six disciplines,
              <br />
              one standard of <span className="italic">precision.</span>
            </h2>
          </div>

          <p className="text-[15px] leading-relaxed text-[#5B5F6B] max-w-sm lg:text-right lg:pb-1">
            From the first disclosure to grant and enforcement, our registered
            patent agents and IP attorneys cover every stage of your
            intellectual property lifecycle.
          </p>
        </div>

        {/* Grid — each card reads like a registry entry, filed under its own docket code */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="group relative bg-white overflow-hidden ring-1 ring-[#DEDACB] transition-all duration-400 hover:-translate-y-1 hover:ring-[#10182E] hover:shadow-[0_25px_50px_-15px_rgba(16,24,46,0.35)]"
              >
                {/* Registration corner marks — draw in on hover, like a document
                    aligning under a stamp. The one signature move on the page. */}
                <span className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-[#C89B3C]/40 transition-all duration-300 group-hover:w-5 group-hover:h-5 group-hover:border-[#C89B3C]" />
                <span className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-[#C89B3C]/40 transition-all duration-300 group-hover:w-5 group-hover:h-5 group-hover:border-[#C89B3C]" />
                <span className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-[#C89B3C]/40 transition-all duration-300 group-hover:w-5 group-hover:h-5 group-hover:border-[#C89B3C]" />
                <span className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-[#C89B3C]/40 transition-all duration-300 group-hover:w-5 group-hover:h-5 group-hover:border-[#C89B3C]" />

                <div className="relative p-7 lg:p-8">
                  <div className="flex items-start justify-between">
                    {/* Seal-style icon badge — thin ring, fills solid on hover */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-full ring-1 ring-[#C89B3C]/50 transition-all duration-300 group-hover:bg-[#C89B3C] group-hover:ring-[#C89B3C]">
                      <Icon
                        size={19}
                        strokeWidth={1.6}
                        className="text-[#9C7423] transition-colors duration-300 group-hover:text-white"
                      />
                    </div>

                    <span className="font-docket text-[11px] tracking-wide text-[#9C7423]/70 pt-1 transition-colors duration-300 group-hover:text-[#C89B3C]">
                      {service.code}
                    </span>
                  </div>

                  {service.tag && (
                    <p className="font-docket mt-6 text-[10px] font-semibold uppercase tracking-wide text-[#9C7423]">
                      {service.tag}
                    </p>
                  )}

                  <h3
                    className={`font-display text-[#10182E] text-xl leading-snug ${
                      service.tag ? "mt-2" : "mt-6"
                    }`}
                  >
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#5B5F6B]">
                    {service.description}
                  </p>

                  <div className="mt-6 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-[#9C7423] border-t border-[#EFEADA] pt-4 group-hover:border-[#2A3555]">
                    <span className="transition-colors duration-300 group-hover:text-[#C89B3C]">
                      View practice area
                    </span>
                    <ArrowUpRight
                      size={13}
                      className="transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#C89B3C]"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}