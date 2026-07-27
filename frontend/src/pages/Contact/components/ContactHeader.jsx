import React from "react";
import { Lock } from "lucide-react";

export default function ContactHeader({ claims }) {
  return (
    <div>
      <div className="ip-mono inline-flex items-center gap-2 rounded-full border border-amber-700/40 px-3 py-1 text-[10px] tracking-widest text-amber-500">
        <span>FORM IP 2</span>
        <span className="text-amber-800">·</span>
        <span>FREE CONSULTATION</span>
      </div>

      <h2 className="ip-serif mt-4 text-3xl font-semibold leading-[1.08] text-white lg:text-[2.6rem]">
        Claim what's yours,
        <br />
        <span className="text-amber-500">first.</span>
      </h2>

      <p className="mt-3 max-w-md text-[13.5px] leading-6 text-slate-400 lg:text-[14.5px]">
        Registered IP attorneys helping founders and enterprises protect, manage, and license what they've built.
      </p>

      <div className="mt-6 grid grid-cols-3 gap-2.5">
        {claims.map((c, i) => (
          <div
            key={c.title}
            className="chip flex flex-col items-start gap-2 rounded-xl border border-amber-900/30 bg-white/[0.03] px-3 py-3"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <span className="inline-block h-4 w-4 rounded bg-amber-500" />
            <p className="text-[12px] font-medium leading-tight text-slate-200">{c.title}</p>
          </div>
        ))}
      </div>

      <div className="ip-mono mt-6 hidden items-center gap-4 text-[10.5px] tracking-wide text-slate-500 sm:flex">
        <span className="flex items-center gap-1.5">
          <Lock size={12} /> Confidential review
        </span>
        <span className="text-amber-800">·</span>
        <span>Reply within 24 hrs</span>
      </div>
    </div>
  );
}
