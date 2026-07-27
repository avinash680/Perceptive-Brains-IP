import React from "react";
import { Target, Eye } from "lucide-react";
import Reveal from "./Reveal";

export default function AboutMissionVision() {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-[#0B1F3D]/[0.04] py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#9C7A1E]">MISSION & VISION</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            What drives our practice
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-white bg-white/70 p-9 shadow-xl shadow-[#0B1F3D]/5 backdrop-blur-xl">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0B1F3D] to-[#16305C] text-white shadow-lg shadow-[#0B1F3D]/30">
                <Target size={22} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Our Mission</h3>
              <p className="mt-3 leading-relaxed text-slate-600">
                To make intellectual property protection accessible, understandable, and dependable — so every inventor,
                founder, and creator can secure the value of their original work without friction or guesswork.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="h-full rounded-3xl border border-white bg-white/70 p-9 shadow-xl shadow-[#0B1F3D]/5 backdrop-blur-xl">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C9A227] to-[#8A6D1E] text-white shadow-lg shadow-[#C9A227]/30">
                <Eye size={22} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Our Vision</h3>
              <p className="mt-3 leading-relaxed text-slate-600">
                To be the trusted global counsel for innovators — known for precision filings, transparent counsel, and portfolios
                that hold up under scrutiny, litigation, and growth.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
