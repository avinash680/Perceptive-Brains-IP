import React from "react";
import { Users, ScrollText, ShieldCheck, TrendingUp } from "lucide-react";

const stats = [
  { number: "500+", title: "Clients worldwide", icon: Users },
  { number: "1,200+", title: "Patents filed", icon: ScrollText },
  { number: "3,000+", title: "Trademarks registered", icon: ShieldCheck },
  { number: "98%", title: "Success rate", icon: TrendingUp },
];

const Stats = () => {
  return (
    <section className="bg-[#F6F1E4] py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#d6a52a] to-[#b8871f] shadow-[0_25px_50px_-20px_rgba(184,135,31,0.55)]">
          {/* Faint dot texture — quiet, not the hero's grid, but from the same family */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(#0A1633_1px,transparent_1px)] [background-size:18px_18px]"
          />

          <div className="relative grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#0A1633]/10">
            {stats.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group flex flex-col items-center justify-center gap-2 px-4 py-7 lg:py-9 text-center transition-colors duration-200 hover:bg-white/10"
                >
                  <div className="mb-1 flex h-11 w-11 items-center justify-center rounded-full bg-[#0A1633]/10 text-[#0A1633] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:bg-[#0A1633]/15">
                    <Icon size={18} strokeWidth={1.75} />
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#0A1633]">
                    {item.number}
                  </h2>

                  <p className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#0A1633]/70">
                    {item.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;