import React, { useEffect, useRef, useState } from "react";
import {
  MessageSquare,
  Search,
  FilePenLine,
  Send,
  BadgeCheck,
} from "lucide-react";

const process = [
  {
    step: "01",
    title: "Consultation",
    description:
      "Free, confidential disclosure call to understand your invention or brand.",
    icon: MessageSquare,
  },
  {
    step: "02",
    title: "IP Search",
    description:
      "Comprehensive prior-art / clearance search and patentability opinion.",
    icon: Search,
  },
  {
    step: "03",
    title: "Drafting",
    description:
      "Strategic claim drafting and specification by domain-matched attorneys.",
    icon: FilePenLine,
  },
  {
    step: "04",
    title: "Filing",
    description:
      "Filing in India, USA, PCT and 150+ jurisdictions through our network.",
    icon: Send,
  },
  {
    step: "05",
    title: "Grant",
    description:
      "Examination, response to office actions and prosecution till grant.",
    icon: BadgeCheck,
    isFinal: true,
  },
];

// How long each step takes to reveal/un-reveal, and how long to pause
// once the whole sequence is fully complete or fully reset, before reversing.
const STEP_MS = 500;
const PAUSE_MS = 1100;

const Process = () => {
  const sectionRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [revealCount, setRevealCount] = useState(0); // 0..process.length
  const [direction, setDirection] = useState(1); // 1 = revealing, -1 = un-revealing

  // Kick the loop off once the section scrolls into view.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Continuous ping-pong: forward to the end, pause, backward to the start,
  // pause, forward again — forever, for as long as the section is mounted.
  useEffect(() => {
    if (!started) return;

    const atEnd = revealCount === process.length;
    const atStart = revealCount === 0;
    const delay = atEnd || atStart ? PAUSE_MS : STEP_MS;

    const id = setTimeout(() => {
      if (atEnd) {
        setDirection(-1);
        setRevealCount((c) => c - 1);
      } else if (atStart) {
        setDirection(1);
        setRevealCount((c) => c + 1);
      } else {
        setRevealCount((c) => c + direction);
      }
    }, delay);

    return () => clearTimeout(id);
  }, [started, revealCount, direction]);

  const progressRatio = revealCount / process.length;

  return (
    <section ref={sectionRef} className="bg-[#0E1430] py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="max-w-3xl">
          <p className="uppercase tracking-[6px] text-[#D4A62A] text-xs font-medium mb-4">
            Our Proven Process
          </p>
          <h2 className="font-serif text-white text-3xl lg:text-4xl leading-tight">
            From idea to granted IP — a clear, accountable path.
          </h2>
        </div>

        {/* Process */}
        <div className="relative mt-16">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-9 left-[10%] right-[10%] h-px bg-[#D4A62A]/10">
            <div
              className="h-full bg-gradient-to-r from-[#D4A62A]/40 via-[#D4A62A] to-[#D4A62A]/40 origin-left"
              style={{
                transform: `scaleX(${progressRatio})`,
                transition: `transform ${STEP_MS}ms linear`,
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-14 relative">
            {process.map((item, index) => {
              const Icon = item.icon;
              const isRevealed = index < revealCount;
              // The step currently being lit up at the front of the sequence.
              const isFrontier =
                (direction === 1 && index === revealCount - 1) ||
                (direction === -1 && index === revealCount);

              return (
                <div
                  key={index}
                  className="group relative text-center"
                  style={{
                    opacity: isRevealed ? 1 : 0,
                    transform: isRevealed ? "translateY(0)" : "translateY(24px)",
                    transition: `opacity ${STEP_MS}ms ease-out, transform ${STEP_MS}ms ease-out`,
                  }}
                >
                  {/* Icon + step badge */}
                  <div className="relative w-[72px] h-[72px] mx-auto">
                    <div
                      className={`w-full h-full rounded-full border flex items-center justify-center transition-all duration-300 ease-out group-hover:-translate-y-1 ${
                        item.isFinal
                          ? "ring-1 ring-[#D4A62A]/20 ring-offset-4 ring-offset-[#0E1430]"
                          : ""
                      }`}
                      style={{
                        backgroundColor: isFrontier ? "#D4A62A" : "#131a3a",
                        borderColor: isFrontier
                          ? "#D4A62A"
                          : "rgba(212,166,42,0.4)",
                        boxShadow: isFrontier
                          ? "0 0 24px rgba(212,166,42,0.35)"
                          : "none",
                      }}
                    >
                      <Icon
                        size={24}
                        strokeWidth={1.75}
                        className="transition-colors duration-300"
                        style={{ color: isFrontier ? "#0E1430" : "#D4A62A" }}
                      />
                    </div>

                    {/* Step number badge, stamped on top */}
                    <div
                      className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#0E1430] border flex items-center justify-center text-[10px] font-semibold transition-transform duration-300"
                      style={{
                        borderColor: isFrontier
                          ? "#D4A62A"
                          : "rgba(212,166,42,0.5)",
                        color: "#D4A62A",
                        transform: isFrontier ? "scale(1.1)" : "scale(1)",
                      }}
                    >
                      {item.step}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mt-5 text-lg font-serif text-white">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-gray-400 leading-6 text-[13.5px] max-w-[220px] mx-auto">
                    {item.description}
                  </p>

                  {/* Connector dot for the line, desktop only */}
                  <div
                    className="hidden lg:block absolute top-9 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#D4A62A]"
                    style={{
                      opacity: isRevealed ? 1 : 0,
                      transition: `opacity ${STEP_MS}ms ease-out`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;