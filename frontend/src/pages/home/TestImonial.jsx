import React, { useEffect, useRef, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * TestimonialSpotlight
 * A single auto-swiping "spotlight" testimonial on a colorful mesh-gradient
 * canvas, driven by a circular avatar rail + directional slide transitions.
 *
 * - Progress bar: one persistent, inset, fully-rounded pill (never a flush
 *   edge-to-edge bar), so it never clashes with the card's rounded corners
 *   and never flashes/disappears at the moment of a swipe.
 * - Flash: the instant the bar completes (or a manual swipe happens), a
 *   quick white pulse flashes across the card as the next testimonial
 *   slides in — a clear "beat" between one card and the next.
 * - The bar only advances while the card is on screen (IntersectionObserver)
 *   and not hovered; otherwise it freezes in place.
 *
 * Tokens:
 *  - canvas:        #FFFFFF with three blurred gradient blobs
 *  - glass card:     rgba(255,255,255,0.66) + backdrop-blur + hairline, rounded-[28px]
 *  - ink:            #14121F
 *  - muted:          #6B7280
 *  - gradient pair:  #6C4DFF -> #FF6B4A (violet -> coral), #12C6A6 as third blob
 *  - display face:   Instrument Serif (italic, for the quote)
 *  - body face:      Inter
 */

const TESTIMONIALS = [
  {
    name: "Priya Nathan",
    role: "Founder, Solstice Studio",
    quote:
      "We switched three weeks before launch and it still felt like the safest call we made all year. Support answered in minutes, not days.",
    rating: 5,
    initials: "PN",
  },
  {
    name: "Marcus Ferreira",
    role: "Head of Ops, Northbound",
    quote:
      "Onboarding took an afternoon. Our old tool took a quarter. That gap alone paid for the first year.",
    rating: 5,
    initials: "MF",
  },
  {
    name: "Elena Voss",
    role: "Product Lead, Kestrel",
    quote:
      "Every teammate who's tried it has asked why we didn't move sooner. That's rare for anything touching our workflow.",
    rating: 5,
    initials: "EV",
  },
  {
    name: "Tobias Kwan",
    role: "CTO, Redline Labs",
    quote:
      "Clean API, honest docs, no surprise limits at scale. We stopped evaluating alternatives after the second week.",
    rating: 5,
    initials: "TK",
  },
];

const AUTO_ADVANCE_MS = 6000;

function StarRow({ rating, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          width={size}
          height={size}
          fill={i < rating ? "#6C4DFF" : "none"}
          color={i < rating ? "#6C4DFF" : "#D8D9E6"}
          strokeWidth={1.75}
        />
      ))}
    </div>
  );
}

export default function TestimonialSpotlight() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward (slide in from right), -1 = back
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const [progress, setProgress] = useState(0); // 0..100, drives the bar width directly
  const [swipeId, setSwipeId] = useState(0); // increments on every swipe, drives the flash pulse
  const sectionRef = useRef(null);
  const elapsedRef = useRef(0);
  const rafRef = useRef(null);
  const lastTsRef = useRef(null);
  const count = TESTIMONIALS.length;

  // Only "playing" while the card is on screen AND not being hovered.
  const isPlaying = inView && !hovered;

  // Track whether the card is scrolled into view.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const goTo = (index, dir) => {
    if (index === active) return;
    setDirection(dir);
    setActive(index);
    setSwipeId((id) => id + 1);
  };

  const next = () => goTo((active + 1) % count, 1);
  const prev = () => goTo((active - 1 + count) % count, -1);

  // Reset the clock whenever the active testimonial changes (auto-advance
  // or manual). This runs before the rAF loop effect below.
  useEffect(() => {
    elapsedRef.current = 0;
    lastTsRef.current = null;
    setProgress(0);
  }, [active]);

  // Continuous rAF loop: keeps the bar visible and smoothly moving at all
  // times it should be playing, and simply freezes (no unmount) otherwise.
  useEffect(() => {
    if (!isPlaying) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
      return;
    }

    const tick = (ts) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const delta = ts - lastTsRef.current;
      lastTsRef.current = ts;
      elapsedRef.current += delta;

      const pct = Math.min((elapsedRef.current / AUTO_ADVANCE_MS) * 100, 100);
      setProgress(pct);

      if (elapsedRef.current >= AUTO_ADVANCE_MS) {
        setDirection(1);
        setActive((prev) => (prev + 1) % count);
        setSwipeId((id) => id + 1);
        return; // active change re-triggers this effect fresh
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [isPlaying, active, count]);

  const current = TESTIMONIALS[active];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 px-6 overflow-hidden"
      style={{ backgroundColor: "#FFFFFF", fontFamily: "Inter, sans-serif" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap');

        @keyframes drift1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,-20px) scale(1.08); } }
        @keyframes drift2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-25px,25px) scale(1.05); } }
        @keyframes drift3 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(15px,15px) scale(0.95); } }
        .blob1 { animation: drift1 14s ease-in-out infinite; }
        .blob2 { animation: drift2 17s ease-in-out infinite; }
        .blob3 { animation: drift3 20s ease-in-out infinite; }

        @keyframes swipeInRight { from { opacity: 0; transform: translateX(36px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes swipeInLeft  { from { opacity: 0; transform: translateX(-36px); } to { opacity: 1; transform: translateX(0); } }
        .swipe-right { animation: swipeInRight 480ms cubic-bezier(0.16,1,0.3,1); }
        .swipe-left  { animation: swipeInLeft  480ms cubic-bezier(0.16,1,0.3,1); }

        @keyframes cardFlash { 0% { opacity: 0.55; } 100% { opacity: 0; } }
        .card-flash { animation: cardFlash 420ms ease-out forwards; }
      `}</style>

      {/* mesh gradient blobs */}
      <div
        className="blob1 absolute rounded-full pointer-events-none"
        style={{
          width: 420,
          height: 420,
          top: -120,
          left: "8%",
          background: "radial-gradient(circle, rgba(108,77,255,0.35), transparent 70%)",
          filter: "blur(10px)",
        }}
      />
      <div
        className="blob2 absolute rounded-full pointer-events-none"
        style={{
          width: 380,
          height: 380,
          top: 40,
          right: "6%",
          background: "radial-gradient(circle, rgba(255,107,74,0.30), transparent 70%)",
          filter: "blur(10px)",
        }}
      />
      <div
        className="blob3 absolute rounded-full pointer-events-none"
        style={{
          width: 320,
          height: 320,
          bottom: -100,
          left: "38%",
          background: "radial-gradient(circle, rgba(18,198,166,0.28), transparent 70%)",
          filter: "blur(10px)",
        }}
      />

      <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center">
        {/* stat pill */}
        <div
          className="inline-flex items-center gap-3 rounded-full px-4 py-2 mb-10"
          style={{
            backgroundColor: "rgba(255,255,255,0.7)",
            border: "1px solid rgba(20,18,31,0.08)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 30px -18px rgba(20,18,31,0.35)",
          }}
        >
          <div className="flex -space-x-2">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold"
                style={{
                  backgroundColor: "#F1EEFF",
                  color: "#6C4DFF",
                  border: "2px solid #FFFFFF",
                }}
              >
                {t.initials}
              </div>
            ))}
          </div>
          <span className="text-xs sm:text-sm font-medium" style={{ color: "#3D3B4A" }}>
            Loved by 500+ founders
          </span>
          <StarRow rating={5} size={12} />
        </div>

        {/* glass spotlight card with swipe controls */}
        <div className="relative w-full flex items-center justify-center">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="hidden sm:flex absolute -left-4 sm:-left-14 z-10 items-center justify-center w-10 h-10 rounded-full transition-transform hover:scale-105"
            style={{
              backgroundColor: "rgba(255,255,255,0.8)",
              border: "1px solid rgba(20,18,31,0.08)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 10px 24px -14px rgba(20,18,31,0.4)",
              color: "#14121F",
            }}
          >
            <ChevronLeft width={18} height={18} />
          </button>

          {/* card: rounded-[28px] + overflow-hidden keeps every child — blobs,
              flash pulse, quote — clipped cleanly to the rounded shape */}
          <div
            className="relative w-full rounded-[28px] px-6 sm:px-14 pt-12 sm:pt-16 pb-10 sm:pb-12 overflow-hidden"
            style={{
              backgroundColor: "rgba(255,255,255,0.66)",
              border: "1px solid rgba(20,18,31,0.08)",
              backdropFilter: "blur(18px)",
              boxShadow: "0 30px 80px -40px rgba(20,18,31,0.35)",
            }}
          >
            {/* flash pulse, fires once per swipe */}
            {swipeId > 0 && (
              <div
                key={swipeId}
                aria-hidden="true"
                className="card-flash absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.95), rgba(255,255,255,0) 65%)",
                }}
              />
            )}

            <Quote
              width={44}
              height={44}
              strokeWidth={0}
              fill="#6C4DFF"
              className="relative mx-auto mb-6 opacity-90"
            />

            <div key={active} className={`relative ${direction === 1 ? "swipe-right" : "swipe-left"}`}>
              <p
                className="text-[26px] sm:text-[34px] leading-[1.25] italic mb-8"
                style={{ color: "#14121F", fontFamily: "'Instrument Serif', serif" }}
              >
                &ldquo;{current.quote}&rdquo;
              </p>

              <div className="flex flex-col items-center gap-1">
                <span className="font-semibold" style={{ color: "#14121F" }}>
                  {current.name}
                </span>
                <span className="text-sm" style={{ color: "#6B7280" }}>
                  {current.role}
                </span>
              </div>
            </div>

            {/* progress bar: inset rounded pill, one persistent node.
                Never flush with the card edge, so it never clips against
                the card's own rounded corners, and never remounts/flashes
                at the moment of a swipe — it just refills. */}
            <div className="relative mt-10 mx-auto w-24 sm:w-28">
              <div
                className="h-[3px] w-full rounded-full overflow-hidden"
                style={{ backgroundColor: "rgba(20,18,31,0.1)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #6C4DFF, #FF6B4A)",
                  }}
                />
              </div>
            </div>
          </div>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="hidden sm:flex absolute -right-4 sm:-right-14 z-10 items-center justify-center w-10 h-10 rounded-full transition-transform hover:scale-105"
            style={{
              backgroundColor: "rgba(255,255,255,0.8)",
              border: "1px solid rgba(20,18,31,0.08)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 10px 24px -14px rgba(20,18,31,0.4)",
              color: "#14121F",
            }}
          >
            <ChevronRight width={18} height={18} />
          </button>
        </div>

        {/* mobile swipe controls */}
        <div className="flex sm:hidden items-center gap-6 mt-6">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex items-center justify-center w-9 h-9 rounded-full"
            style={{ backgroundColor: "#F1EEFF", color: "#6C4DFF" }}
          >
            <ChevronLeft width={16} height={16} />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="flex items-center justify-center w-9 h-9 rounded-full"
            style={{ backgroundColor: "#F1EEFF", color: "#6C4DFF" }}
          >
            <ChevronRight width={16} height={16} />
          </button>
        </div>

        {/* avatar selector rail */}
        <div className="flex items-center gap-4 sm:gap-6 mt-10">
          {TESTIMONIALS.map((t, i) => {
            const isActive = i === active;
            return (
              <button
                key={t.name}
                onClick={() => goTo(i, i > active ? 1 : -1)}
                aria-label={`Show testimonial from ${t.name}`}
                className="relative flex items-center justify-center rounded-full transition-transform duration-300"
                style={{
                  width: isActive ? 56 : 44,
                  height: isActive ? 56 : 44,
                  padding: isActive ? 3 : 0,
                  background: isActive
                    ? "linear-gradient(135deg, #6C4DFF, #FF6B4A)"
                    : "transparent",
                }}
              >
                <span
                  className="w-full h-full rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-opacity duration-300"
                  style={{
                    backgroundColor: isActive ? "#FFFFFF" : "#F1EEFF",
                    color: isActive ? "#6C4DFF" : "#8B85A6",
                    opacity: isActive ? 1 : 0.7,
                  }}
                >
                  {t.initials}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}