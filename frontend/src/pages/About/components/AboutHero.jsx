import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import CountUp from "./CountUp";
import RegistrationSeal from "./RegistrationSeal";
import Reveal from "./Reveal";

export default function AboutHero({ stats }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#081226] via-[#0B1F3D] to-[#16305C]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="pointer-events-none absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-[#C9A227]/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-15%] left-[-10%] h-[380px] w-[380px] rounded-full bg-[#16305C]/25 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 sm:py-24 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide text-white/85 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9A227]" />
            FILE NO. EMIP/2026/00142 · STATUS: ACTIVE
          </div>
          <h1 className="font-semibold leading-[1.05] tracking-tight text-white text-4xl sm:text-5xl lg:text-6xl">
            Protecting ideas,
            <br />
            <span className="bg-gradient-to-r from-[#E7C873] via-[#F3E3B0] to-white bg-clip-text text-transparent">
              one filing at a time.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            Perceptive Brains IP helps startups, enterprises, and individual creators protect
            patents, trademarks, copyrights, and designs — with clear guidance and dependable
            execution at every stage.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#0B1F3D] shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Book a filing consultation
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/about#how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              See how it works
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/15 pt-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-semibold text-white sm:text-3xl">
                  <CountUp value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs leading-snug text-[#E7C873]/75">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150} className="flex justify-center">
          <RegistrationSeal />
        </Reveal>
      </div>
    </section>
  );
}
