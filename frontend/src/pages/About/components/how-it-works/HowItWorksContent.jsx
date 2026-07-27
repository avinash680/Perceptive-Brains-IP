import React from "react";
import { Download, Send, ArrowRight, CheckCircle2 } from "lucide-react";
import HowItWorksDots from "./HowItWorksDots";

export default function HowItWorksContent({ steps, activeStep, onOpenForm, onSelect }) {
  const ActiveIcon = activeStep.icon;

  return (
    <div className="relative flex flex-col justify-center overflow-hidden p-10 sm:p-12 lg:col-span-3 lg:p-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 select-none font-mono text-[10rem] font-bold leading-none text-white/[0.035]"
      >
        {activeStep.numeral}
      </div>
      <div className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#C9A227]/10 blur-3xl" />

      {activeStep.cta && (
        <a
          href={activeStep.cta.href}
          download={activeStep.cta.download}
          target="_blank"
          rel="noopener noreferrer"
          className="group absolute right-6 top-6 z-10 inline-flex items-center gap-2 rounded-full border border-[#C9A227]/40 bg-gradient-to-r from-[#C9A227] to-[#E7C873] px-5 py-2.5 text-xs font-semibold text-[#0B1F3D] shadow-lg shadow-[#C9A227]/30 transition-all duration-300 hover:scale-105 hover:shadow-xl sm:right-10 sm:top-10"
        >
          <Download
            size={15}
            className="transition-transform duration-300 group-hover:-translate-y-0.5"
          />
          {activeStep.cta.label}
        </a>
      )}

      <div key={activeStep.numeral} className="relative motion-safe:animate-[fadeInUp_0.5s_ease-out]">
        <div className="mb-6 flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C9A227] to-[#8A6D1E] text-[#0B1F3D] shadow-lg shadow-[#C9A227]/30">
            <ActiveIcon size={24} strokeWidth={1.75} />
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E7C873]/80">
            {activeStep.tag}
          </span>
        </div>

        <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {activeStep.title}
        </h3>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/60">
          {activeStep.desc}
        </p>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5">
          {activeStep.badges.map((badge) => (
            <span key={badge} className="inline-flex items-center gap-2 text-sm text-white/70">
              <CheckCircle2 size={15} className="flex-none text-[#C9A227]" />
              {badge}
            </span>
          ))}
        </div>

        {activeStep.formCta && (
          <div className="mt-5">
            <button
              type="button"
              onClick={onOpenForm}
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#C9A227] via-[#D9AE55] to-[#C9A227] px-6 py-3 text-sm font-semibold text-[#0B1F3D] shadow-lg shadow-[#C9A227]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#C9A227]/40 active:scale-[0.98]"
            >
              {activeStep.formCta.label}
              <Send size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        )}

        {activeStep.price && (
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#C9A227]/30 bg-[#C9A227]/10 px-4 py-2 text-sm font-semibold text-[#E7C873]">
            {activeStep.price}
          </div>
        )}

        {activeStep.payCta && (
          <div className="mt-5">
            <a
              href={activeStep.payCta.href}
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#C9A227] via-[#D9AE55] to-[#C9A227] px-6 py-3 text-sm font-semibold text-[#0B1F3D] shadow-lg shadow-[#C9A227]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#C9A227]/40 active:scale-[0.98]"
            >
              {activeStep.payCta.label}
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
