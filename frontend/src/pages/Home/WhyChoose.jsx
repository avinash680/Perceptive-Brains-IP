import React, { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

const features = [
  "Govt. Registered Indian Patent & Trademark Agents",
  "Multidisciplinary Experts — Energy, Electrical, Mechanical, IT",
  "Post-Graduates from Reputed National & International Institutes",
  "Strict Confidentiality & NDA-Backed Engagements",
  "Cost-Effective, Transparent, Flat-Fee Pricing",
  "Hands-on Experience with MNCs, MSMEs & Startups",
  "End-to-End IP Portfolio Management & Monetisation",
  "Trained & Worked Across India, USA and Europe",
];

/* Fires once when the element scrolls into view. Kept as a tiny local hook
   so this component has no external animation dependency. */
function useInView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        io.unobserve(node);
      }
    }, options || { threshold: 0.2 });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return [ref, inView];
}

/* Counts up to `target` once triggered — the one "signature" motion moment
   for this section, standing in for a certificate stamping into place. */
function useCountUp(target, trigger, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trigger, target, duration]);

  return value;
}

const WhyChooseUs = () => {
  const [statRef, statInView] = useInView({ threshold: 0.5 });
  const statValue = useCountUp(98, statInView);

  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=IBM+Plex+Mono:wght@500&display=swap');
        .wcu-display { font-family: 'Fraunces', Georgia, serif; }
        .wcu-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
        .wcu-rise { opacity: 0; transform: translateY(22px); transition: opacity .7s cubic-bezier(.22,.61,.36,1), transform .7s cubic-bezier(.22,.61,.36,1); }
        .wcu-rise--visible { opacity: 1; transform: none; }
        @media (prefers-reduced-motion: reduce) {
          .wcu-rise { opacity: 1; transform: none; transition: none; }
        }
      `}</style>

      {/* Faint ruled-paper texture, quiet accent glow — same restrained motif
          used across the rest of the site */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent, transparent 34px, #EFE9D8 35px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-[#C89B3C]/[0.07] blur-[120px]"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left side */}
          <FeatureIntro
            statRef={statRef}
            statValue={statValue}
            statInView={statInView}
          />

          {/* Right side */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
              {features.map((item, index) => (
                <FeatureRow key={item} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function FeatureIntro({ statRef, statValue, statInView }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className="lg:col-span-5">
      <p
        className={`wcu-mono uppercase tracking-[px] text-[#B8842A] text-xs font-medium mb-6 wcu-rise ${
          inView ? "wcu-rise--visible" : ""
        }`}
      >
        The Perceptive Brains IP Edge
      </p>

      <h2
        className={`wcu-display text-4xl lg:text-6xl leading-[1.1] text-[#10182E] wcu-rise ${
          inView ? "wcu-rise--visible" : ""
        }`}
        style={{ transitionDelay: "80ms" }}
      >
        Why innovators
        <br />
        choose us to protect
        <br />
        <span className="italic">what matters.</span>
      </h2>

      <p
        className={`mt-8 text-[17px] leading-8 text-[#5B6472] max-w-md wcu-rise ${
          inView ? "wcu-rise--visible" : ""
        }`}
        style={{ transitionDelay: "160ms" }}
      >
        We blend rigorous legal craft with deep technical fluency —
        particularly in energy and deep-tech — so your IP strategy is built
        on understanding, not approximation.
      </p>

      {/* Success rate — the count animates up once it scrolls into view */}
      <div
        ref={statRef}
        className={`flex items-center mt-16 wcu-rise ${
          inView ? "wcu-rise--visible" : ""
        }`}
        style={{ transitionDelay: "240ms" }}
      >
        <div className="relative w-[2px] h-20 bg-[#EFE9D8] mr-6 overflow-hidden rounded-full">
          <div
            className="absolute bottom-0 left-0 w-full bg-[#C89B3C] transition-[height] duration-[1400ms] ease-out"
            style={{ height: statInView ? "100%" : "0%" }}
          />
        </div>

        <h3 className="wcu-display text-6xl lg:text-7xl text-[#10182E] tabular-nums">
          {statValue}%
        </h3>

        <div className="wcu-mono ml-6 uppercase tracking-[4px] text-[#5B6472] text-xs leading-6">
          Grant Success
          <br />
          Rate
        </div>
      </div>
    </div>
  );
}

function FeatureRow({ item, index }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`wcu-rise ${inView ? "wcu-rise--visible" : ""}`}
      style={{ transitionDelay: `${(index % 4) * 70}ms` }}
    >
      <div className="group relative flex items-start gap-5 py-7 border-b border-gray-200 overflow-hidden">
        {/* Accent bar draws in from the left on hover */}
        <span className="absolute left-0 bottom-[-1px] h-[2px] w-0 bg-[#C89B3C] transition-all duration-500 ease-out group-hover:w-full" />

        {/* Docket code — a quiet structural label, not decoration */}
        <span className="wcu-mono absolute -top-1 right-0 text-[10px] tracking-widest text-[#C89B3C]/0 transition-colors duration-300 group-hover:text-[#C89B3C]/70">
          {/* REQ / {String(index + 1).padStart(2, "0")} */}
        </span>

        {/* Icon */}
        <div className="relative w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-full ring-1 ring-[#10182E]/15 bg-[#10182E] transition-all duration-300 group-hover:ring-[#C89B3C] group-hover:bg-[#C89B3C] group-hover:scale-105">
          <Check
            size={19}
            strokeWidth={2.25}
            className="text-[#C89B3C] transition-colors duration-300 group-hover:text-white"
          />
        </div>

        {/* Text */}
        <p className="pt-1.5 text-[16.5px] leading-7 text-[#2E3852] font-medium transition-colors duration-300 group-hover:text-[#10182E]">
          {item}
        </p>
      </div>
    </div>
  );
}

export default WhyChooseUs;