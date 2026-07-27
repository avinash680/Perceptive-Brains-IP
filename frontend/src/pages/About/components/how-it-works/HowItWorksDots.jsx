import React from "react";

export default function HowItWorksDots({ steps, active, onSelect }) {
  return (
    <div className="relative mt-10 flex items-center gap-2">
      {steps.map((step, i) => (
        <button
          key={step.numeral}
          type="button"
          aria-label={`Go to step ${i + 1}`}
          onClick={() => onSelect(i)}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i === active ? "w-8 bg-[#C9A227]" : "w-1.5 bg-white/20 hover:bg-white/40"
          }`}
        />
      ))}
    </div>
  );
}
