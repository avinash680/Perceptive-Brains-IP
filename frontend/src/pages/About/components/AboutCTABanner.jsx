import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";

export default function AboutCTABanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1F3D] via-[#16305C] to-[#16305C] py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <Reveal className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-[#E7C873]">NEXT STEP</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Ready to protect your idea?
        </h2>
        <p className="mt-4 text-base leading-relaxed text-white/75">
          Book a free consultation with our team and get a clear, actionable path forward for your patent,
          trademark, or copyright.
        </p>
        <Link
          to="/contact"
          className="group mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-[#0B1F3D] shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:shadow-xl"
        >
          Get your free consultation
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </a>
        <p className="mt-4 text-xs tracking-wide text-[#E7C873]/70">RESPONSE WITHIN 1 BUSINESS DAY</p>
      </Reveal>
    </section>
  );
}
