import React from "react";
import { CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";
import HowItWorksPanel from "./HowItWorksPanel";

export default function AboutHowItWorksSection({ howItWorks, filingBenefits }) {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-gradient-to-br from-[#081226] via-[#0B1F3D] to-[#0F2748] py-16 sm:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-[#C9A227]/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-[#16305C]/40 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#E7C873]">HOW IT WORKS</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            File your patent in just 4 simple steps
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/60">
            A clear, guided path from confidential first conversation to a filed patent application.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <HowItWorksPanel steps={howItWorks} />
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl sm:p-10">
            <h3 className="text-center text-lg font-semibold tracking-tight text-white sm:text-left">
              Why choose us?
            </h3>
            <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {filingBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 size={17} className="mt-0.5 flex-none text-[#C9A227]" />
                  <span className="text-sm leading-relaxed text-white/70">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
