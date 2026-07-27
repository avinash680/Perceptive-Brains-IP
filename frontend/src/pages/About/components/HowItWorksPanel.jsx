import React, { useState, useEffect } from "react";
import useInView from "../../../hooks/useInView";
import IDFFormModal from "./IDFFormModal";
import { HowItWorksNav, HowItWorksContent, HowItWorksDots } from "./how-it-works";

export default function HowItWorksPanel({ steps, duration = 5200 }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [idfOpen, setIdfOpen] = useState(false);
  const [panelRef, panelInView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (paused || !panelInView) return;
    const t = setTimeout(() => {
      setActive((i) => (i + 1) % steps.length);
    }, duration);
    return () => clearTimeout(t);
  }, [active, paused, panelInView, steps.length, duration]);

  return (
    <div
      ref={panelRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="grid grid-cols-1 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/40 backdrop-blur-2xl lg:grid-cols-5"
    >
      <HowItWorksNav
        steps={steps}
        active={active}
        onSelect={setActive}
        paused={paused}
        duration={duration}
      />

      <HowItWorksContent
        steps={steps}
        activeStep={steps[active]}
        onOpenForm={() => setIdfOpen(true)}
        onSelect={setActive}
      />

      <style>{`
        @keyframes howItWorksProgress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <IDFFormModal open={idfOpen} onClose={() => setIdfOpen(false)} />
    </div>
  );
}
