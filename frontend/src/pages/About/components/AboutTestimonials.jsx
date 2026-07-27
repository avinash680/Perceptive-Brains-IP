import React from "react";
import { CheckCircle2, Quote } from "lucide-react";
import Reveal from "./Reveal";

export default function AboutTestimonials({ testimonials }) {
  return (
    <section className="bg-gradient-to-b from-[#0B1F3D]/[0.04] to-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#9C7A1E]">TESTIMONIALS</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            What our clients say
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {testimonials.map(({ quote, name, tag }, i) => (
            <Reveal key={name} delay={i * 100}>
              <div className="h-full rounded-2xl border border-slate-100 bg-white p-8 shadow-sm shadow-[#0B1F3D]/5">
                <Quote className="mb-4 text-[#C9A227]/35" size={28} strokeWidth={1.5} />
                <p className="text-sm leading-relaxed text-slate-700">{quote}</p>
                <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4">
                  <CheckCircle2 size={15} className="text-[#9C7A1E]" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{name}</p>
                    <p className="text-xs text-slate-500">{tag}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
