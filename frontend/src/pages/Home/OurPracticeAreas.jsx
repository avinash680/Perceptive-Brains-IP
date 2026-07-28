import React from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Shield,
  Copyright,
  Scale,
  Lightbulb,
  PenTool,
} from "lucide-react";
import patentProsecutionImg from "../../assets/patent-prosecution.jpg";
import designRegistrationImg from "../../assets/patent-design-registration.jpg";
import trademarkRegistrationImg from "../../assets/trademark-registration.jpg";
import softwareImg from "../../assets/software.webp";
import ipLitigationImg from "../../assets/ip-litigation.jpg";
import ipStrategyImg from "../../assets/ip-strategy-consulting.jpg";

const services = [
  {
    icon: FileText,
    code: "PAT / 01",
    title: "Patent filing & prosecution",
    description:
      "End-to-end provisional, complete and PCT patent drafting, filing and prosecution across 150+ jurisdictions.",
    tag: "Flagship",
    image: patentProsecutionImg,
    path: "/services/patent-drafting-filing",
  },
  {
    icon: PenTool,
    code: "DES / 02",
    title: "Design registration",
    description:
      "Protect the visual and aesthetic features of your products under the Designs Act and Hague.",
    image: designRegistrationImg,
    path: "/services/industrial-design",
  },
  {
    icon: Shield,
    code: "TM / 03",
    title: "Trademark registration",
    description:
      "Brand clearance search, filing, opposition handling and global trademark portfolio management.",
    image: trademarkRegistrationImg,
    path: "/services/trademark-registration",
  },
  {
    icon: Copyright,
    code: "CR / 04",
    title: "Copyright services",
    description:
      "Protection for literary, artistic, musical, software and audio-visual works.",
    image: softwareImg,
    path: "/services/copyright-registration",
  },
  {
    icon: Scale,
    code: "LIT / 05",
    title: "IP litigation",
    description:
      "Strategic representation in infringement suits, oppositions and enforcement before courts and IPAB.",
    image: ipLitigationImg,
    path: "/services/ip-litigation-support",
  },
  {
    icon: Lightbulb,
    code: "STR / 06",
    title: "IP strategy & consulting",
    description:
      "Patent landscaping, freedom-to-operate, valuation and portfolio strategy aligned to business goals.",
    image: ipStrategyImg,
    path: "/services/ip-portfolio-management",
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <Link
                key={index}
                to={service.path}
                aria-label={`Learn more about ${service.title}`}
                className="group relative overflow-hidden rounded-[2rem] bg-white/95 ring-1 ring-[#DEDACB] transition-all duration-500 hover:-translate-y-1.5 hover:ring-[#10182E] hover:shadow-[0_30px_60px_-20px_rgba(16,24,46,0.45)]"
              >
                {/* Registration corner marks — draw in on hover, like a document
                    aligning under a stamp. The one signature move on the page. */}
                <span className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-[#C89B3C]/50 z-10 transition-all duration-300 group-hover:w-5 group-hover:h-5 group-hover:border-white" />
                <span className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-[#C89B3C]/50 z-10 transition-all duration-300 group-hover:w-5 group-hover:h-5 group-hover:border-white" />

                {/* Photo — the card is wrapped around it, with the seal and
                    docket code inlaid on the image like an embossed stamp */}
                <div className="relative h-48 overflow-hidden rounded-t-[2rem]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover grayscale-[15%] transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:grayscale-0"
                  />
                  {/* Ledger-tint wash so every photo, whatever its source colours,
                      reads as part of the same registry */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10182E]/90 via-[#10182E]/10 to-transparent" />
                  <div className="absolute inset-0 bg-[#9C7423]/10 mix-blend-multiply" />

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                    {/* Seal-style icon badge — thin ring, fills solid on hover */}
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-white/40 transition-all duration-300 group-hover:bg-[#C89B3C] group-hover:ring-[#C89B3C]">
                      <Icon
                        size={18}
                        strokeWidth={1.6}
                        className="text-white"
                      />
                    </div>

                    <span className="font-docket text-[11px] tracking-wide text-white/80 pb-1">
                      {service.code}
                    </span>
                  </div>
                </div>

                <div className="relative p-7 lg:p-8">
                  {service.tag && (
                    <p className="font-docket text-[10px] font-semibold uppercase tracking-wide text-[#9C7423]">
                      {service.tag}
                    </p>
                  )}

                  <h3
                    className={`font-display text-[#10182E] text-xl leading-snug ${
                      service.tag ? "mt-2" : ""
                    }`}
                  >
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#5B5F6B]">
                    {service.description}
                  </p>
                </div>

                {/* Quiet gilt edge along the base — the premium finish,
                    a hairline rather than a call-to-action */}
                <div className="h-[3px] w-full bg-gradient-to-r from-[#C89B3C]/20 via-[#C89B3C] to-[#C89B3C]/20 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100 rounded-b-[2rem]" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
