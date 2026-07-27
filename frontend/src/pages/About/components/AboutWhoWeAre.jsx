import React from "react";
import { Award, Globe2, ShieldCheck, Sparkles, Users } from "lucide-react";
import Reveal from "./Reveal";

export default function AboutWhoWeAre() {
  const awards = [
    { icon: Users, text: "45+ attorneys, agents, and technical specialists" },
    { icon: Globe2, text: "Filing coverage across 40+ jurisdictions" },
    { icon: ShieldCheck, text: "Full lifecycle: search, filing, prosecution, enforcement" },
    { icon: Award, text: "Recognized IP practice since 2012" },
  ];

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.2em] text-[#9C7A1E]">WHO WE ARE</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Counsel built around your ideas, not our convenience
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600">
            Founded in 2012, Perceptive Brains IP is a full-service intellectual property practice supporting inventors,
            brands, and enterprises across patents, trademarks, copyrights, and industrial designs. We combine technical
            fluency with legal precision, so every filing reflects both the science and the strategy behind it.
          </p>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Our attorneys and patent agents work in small, dedicated pods — meaning the person who understands your
            invention on day one is still on your file at grant, renewal, and enforcement.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              "Patents",
              "Trademarks",
              "Copyrights",
              "Designs",
            ].map((t) => (
              <span
                key={t}
                className="rounded-full border border-[#0B1F3D]/10 bg-[#0B1F3D]/5 px-4 py-1.5 text-sm font-medium text-[#0B1F3D]"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative rounded-3xl border border-[#0B1F3D]/10 bg-white p-8 shadow-xl shadow-[#0B1F3D]/5 sm:p-10">
            <div className="absolute -top-4 -right-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0B1F3D] to-[#C9A227] text-white shadow-lg shadow-[#C9A227]/30">
              <Sparkles size={22} />
            </div>
            <ul className="space-y-6">
              {awards.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[#0B1F3D]/5 text-[#9C7A1E]">
                    <Icon size={18} />
                  </span>
                  <span className="text-sm leading-relaxed text-slate-700">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
