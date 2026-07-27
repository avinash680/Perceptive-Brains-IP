import React from "react";

export default function HowItWorksNav({ steps, active, onSelect, paused, duration }) {
  return (
    <div className="flex flex-col gap-1 border-b border-white/10 p-3 lg:col-span-2 lg:border-b-0 lg:border-r lg:p-4">
      {steps.map((step, i) => {
        const isActive = i === active;
        return (
          <button
            key={step.numeral}
            type="button"
            aria-current={isActive}
            onClick={() => onSelect(i)}
            className={`group relative flex w-full items-start gap-4 rounded-2xl px-5 py-5 text-left transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E7C873] ${
              isActive ? "bg-white/[0.06]" : "hover:bg-white/[0.035]"
            }`}
          >
            <span
              className={`mt-0.5 font-mono text-xs tracking-[0.15em] transition-colors duration-300 ${
                isActive ? "text-[#E7C873]" : "text-white/30"
              }`}
            >
              {step.numeral}
            </span>
            <span className="flex-1">
              <span
                className={`block text-[15px] font-semibold leading-snug transition-colors duration-300 ${
                  isActive ? "text-white" : "text-white/55 group-hover:text-white/80"
                }`}
              >
                {step.title}
              </span>
              {isActive && (
                <span className="mt-2 block text-sm leading-relaxed text-white/55 lg:hidden">
                  {step.desc}
                </span>
              )}
            </span>

            <span className="absolute bottom-0 left-5 right-5 h-px overflow-hidden bg-white/10">
              {isActive && (
                <span
                  key={active}
                  className="block h-full origin-left bg-[#C9A227]"
                  style={{
                    animation: paused
                      ? "none"
                      : `howItWorksProgress ${duration}ms linear forwards`,
                  }}
                />
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
