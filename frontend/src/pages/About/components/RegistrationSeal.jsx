import React from "react";
import { Fingerprint } from "lucide-react";

export default function RegistrationSeal() {
  return (
    <div className="relative mx-auto flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80">
      <div className="absolute inset-0 animate-[spin_28s_linear_infinite] rounded-full">
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <defs>
            <path id="sealArcTop" d="M 20,100 a 80,80 0 1,1 160,0" fill="none" />
            <path id="sealArcBottom" d="M 20,100 a 80,80 0 1,0 160,0" fill="none" />
          </defs>
          <circle cx="100" cy="100" r="94" fill="none" stroke="white" strokeOpacity="0.25" strokeWidth="1" />
          <circle cx="100" cy="100" r="80" fill="none" stroke="white" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="1.5 5" />
          <text fontSize="8.4" letterSpacing="3" fontWeight="600" fill="white" fillOpacity="0.85">
            <textPath href="#sealArcTop" startOffset="50%" textAnchor="middle">
              PATENTS • TRADEMARKS • COPYRIGHTS
            </textPath>
          </text>
          <text fontSize="8.4" letterSpacing="3" fontWeight="600" fill="white" fillOpacity="0.6">
            <textPath href="#sealArcBottom" startOffset="50%" textAnchor="middle">
              PROTECTED SINCE 2012 • GLOBAL COUNSEL
            </textPath>
          </text>
        </svg>
      </div>
      <div className="absolute inset-6 rounded-full bg-white/10 backdrop-blur-2xl border border-white/25 shadow-[0_0_60px_rgba(201,162,39,0.35)]" />
      <div className="relative flex h-40 w-40 flex-col items-center justify-center rounded-full border border-white/30 bg-gradient-to-br from-white/20 to-white/5 text-center backdrop-blur-xl">
        <Fingerprint className="mb-1.5 h-7 w-7 text-[#E7C873]" strokeWidth={1.5} />
        <span className="font-semibold tracking-wide text-white text-sm">CERTIFIED</span>
        <span className="text-[10px] tracking-[0.2em] text-[#D9C08B]">IP COUNSEL</span>
      </div>
    </div>
  );
}
