import React from "react";
import Reveal from "./Reveal";

export default function AboutProcess({ process }) {
  return (
    <section id="process" className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <Reveal className="mx-auto mb-12 max-w-2xl text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-[#9C7A1E]">OUR PROCESS</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          A clear path from idea to registration
        </h2>
      </Reveal>

      <div className="relative">
        <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-[#C9A227]/40 via-[#0B1F3D]/15 to-transparent sm:left-1/2 sm:-translate-x-1/2" />
        <div className="space-y-8">
          {process.map(({ icon: Icon, tag, title, desc }, i) => {
            const leftSide = i % 2 === 0;
            return (
              <Reveal key={tag} delay={i * 100}>
                <div className="relative flex flex-col gap-4 pl-16 sm:grid sm:grid-cols-2 sm:gap-10 sm:pl-0">
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border-4 border-slate-50 bg-gradient-to-br from-[#0B1F3D] to-[#C9A227] text-white shadow-md shadow-[#C9A227]/30 sm:left-1/2 sm:-translate-x-1/2">
                    <Icon size={18} />
                  </div>
                  <div className={`${leftSide ? "sm:col-start-1 sm:pr-14 sm:text-right" : "sm:col-start-2 sm:pl-14 sm:order-2"}`}>
                    <span className="text-xs font-semibold tracking-[0.2em] text-[#9C7A1E]">{tag}</span>
                    <h3 className="mt-1.5 text-lg font-semibold text-slate-900">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
                  </div>
                  <div className={leftSide ? "sm:col-start-2" : "sm:col-start-1 sm:order-1"} />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
