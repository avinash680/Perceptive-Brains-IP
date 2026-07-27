import React from "react";
import { Award, FileCheck2, Globe2, TrendingUp } from "lucide-react";
import CountUp from "./CountUp";
import Reveal from "./Reveal";

const achievements = [
  { icon: FileCheck2, value: 1200, suffix: "+", label: "Applications filed" },
  { icon: TrendingUp, value: 98, suffix: "%", label: "Grant success rate" },
  { icon: Globe2, value: 40, suffix: "+", label: "Countries covered" },
  { icon: Award, value: 13, suffix: "", label: "Years in practice" },
];

export default function AboutAchievements() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#081226] to-[#16305C] py-16">
      <div className="pointer-events-none absolute -top-24 left-1/4 h-[360px] w-[360px] rounded-full bg-[#C9A227]/20 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#E7C873]">ACHIEVEMENTS</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Results our clients rely on
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {achievements.map(({ icon: Icon, value, suffix, label }, i) => (
            <Reveal key={label} delay={i * 100}>
              <div className="h-full rounded-2xl border border-white/15 bg-white/[0.06] p-7 text-center backdrop-blur-xl">
                <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-[#E7C873]">
                  <Icon size={20} />
                </div>
                <div className="text-3xl font-semibold text-white">
                  <CountUp value={value} suffix={suffix} />
                </div>
                <div className="mt-1.5 text-xs leading-snug text-[#E7C873]/75">{label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
