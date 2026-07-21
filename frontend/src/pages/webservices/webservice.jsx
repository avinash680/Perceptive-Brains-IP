// import { useState, useEffect, useRef, useCallback } from "react";
// import {
//   ArrowRight,
//   ArrowUpRight,
//   ChevronDown,
//   Database,
//   Server,
//   Atom,
//   Layers,
//   Paintbrush,
//   Code2,
//   Mail,
// } from "lucide-react";

// /**
//  * WEB SERVICES — "Drafting Room" redesign
//  *
//  * Subject: a software studio building one stack, end to end —
//  * HTML/CSS/JavaScript, React, Tailwind CSS, Next.js, Node.js/Express,
//  * MongoDB.
//  * Concept: the studio's own working metaphor — a system is drawn before
//  * it's built, the same way a structure is drafted before ground breaks.
//  * The page borrows the vocabulary of architectural drafting: titleblocks,
//  * dimension lines, crop marks, revision stamps, project phases (SD/CD/CA).
//  *
//  * Palette
//  *  paper      #F3F1EC  page background, warm drafting-paper white
//  *  ink        #17223B  primary text, deep navy ink
//  *  blueprint  #2E5C86  structural lines, primary accent
//  *  redline    #C1442A  correction/CTA accent — the "redline" mark
//  *  graphite   #5C6570  secondary text
//  *  line       #D8D5CC  hairlines on paper
//  *
//  * Type
//  *  Display: Space Grotesk (technical grotesk, drawn capitals)
//  *  Body:    IBM Plex Sans
//  *  Utility: IBM Plex Mono (dimensions, callouts, spec numbers)
//  *
//  * Signature: a full system drawing (FIG. 01) — client / server / database
//  * rendered as a technical drawing with dimension lines, leader callouts,
//  * a titleblock stamp, and corner crop marks, which draws itself in on
//  * scroll. Corner crop marks recur at the page's outer edges to keep the
//  * "this is a drawing" idea present without repeating the diagram itself.
//  */

// const STACK_SCHEDULE = [
//   {
//     code: "L1",
//     layer: "Foundation",
//     tech: "HTML, CSS, JavaScript",
//     icon: Code2,
//     detail: "Structure, style, and behavior — the three languages every browser reads natively, no build step required to get started.",
//   },
//   {
//     code: "L2",
//     layer: "Interface",
//     tech: "React",
//     icon: Atom,
//     detail: "Component-driven UI that stays predictable once a product grows past a handful of screens.",
//   },
//   {
//     code: "L3",
//     layer: "Finish",
//     tech: "Tailwind CSS",
//     icon: Paintbrush,
//     detail: "Utility classes applied straight to markup, so a styling change doesn't mean hunting through a separate stylesheet.",
//   },
//   {
//     code: "L4",
//     layer: "Assembly",
//     tech: "Next.js",
//     icon: Layers,
//     detail: "Server-rendered React with routing and API routes built in — fast pages, working SEO, one codebase instead of two.",
//   },
//   {
//     code: "L5",
//     layer: "Systems",
//     tech: "Node.js & Express",
//     icon: Server,
//     detail: "The runtime and routing layer that turns a request into a response, written in the same language as the front end.",
//   },
//   {
//     code: "L6",
//     layer: "Storage",
//     tech: "MongoDB",
//     icon: Database,
//     detail: "Document storage that matches how the product actually thinks about its data, instead of forcing it into rigid tables.",
//   },
// ];

// const STAGES = [
//   {
//     code: "SD",
//     phase: "Schematic Design",
//     title: "Discovery & scoping",
//     copy: "We map the actual problem and who it's for — screens, data, and constraints — before any code gets written.",
//   },
//   {
//     code: "DD",
//     phase: "Design Development",
//     title: "Architecture, on paper",
//     copy: "Screens, data models, and API contracts get agreed in writing, so nobody is rebuilding in week six.",
//   },
//   {
//     code: "CD",
//     phase: "Construction Documents",
//     title: "A build order you can see",
//     copy: "Every feature is broken into a sequence with estimates attached — a plan you could hand to someone else.",
//   },
//   {
//     code: "CA",
//     phase: "Construction",
//     title: "Build & iterate",
//     copy: "Working software in short cycles, with a staging environment you can click through as we go.",
//   },
//   {
//     code: "OC",
//     phase: "Occupancy",
//     title: "Launch & upkeep",
//     copy: "Deployment, monitoring, and a rollback plan before anything goes live — then the same people, still on call.",
//   },
// ];

// const WORK = [
//   {
//     tag: "MERN",
//     title: "Marketplace platform",
//     copy: "A two-sided marketplace with real-time listings, search, and messaging.",
//     specs: ["React", "Node / Express", "MongoDB"],
//   },
//   {
//     tag: "NEXT.JS",
//     title: "SaaS analytics dashboard",
//     copy: "A server-rendered dashboard with role-based views, live data, and a component library built on Tailwind.",
//     specs: ["Next.js", "Tailwind CSS", "MongoDB"],
//   },
//   {
//     tag: "NEXT.JS",
//     title: "Marketing site, daily content",
//     copy: "A fast, SEO-first site with incremental regeneration for a team publishing every day.",
//     specs: ["Next.js", "Tailwind CSS", "MongoDB"],
//   },
// ];

// const ENGAGEMENTS = [
//   {
//     type: "A",
//     title: "Fixed-scope build",
//     copy: "One project, one price, one timeline — agreed before we start, checked at milestones along the way.",
//     points: ["Fixed scope & quote", "Milestone check-ins", "Source handed over at completion"],
//   },
//   {
//     type: "B",
//     title: "Retainer",
//     copy: "Development time reserved every month, spent on whatever the priority turns out to be.",
//     points: ["Reserved monthly hours", "Priority response times", "Unused hours roll over"],
//   },
//   {
//     type: "C",
//     title: "Embedded team",
//     copy: "One or more engineers who join your repo and your standups, not a separate vendor thread.",
//     points: ["Works inside your process", "Matched to your existing stack", "Scale up or down monthly"],
//   },
// ];

// const FAQ = [
//   {
//     q: "Why this stack for most projects?",
//     a: "One language — JavaScript — end to end means fewer handoffs and fewer places for a bug to hide. Next.js adds server rendering, routing, and API routes on top of React without extra tooling glued on afterward.",
//   },
//   {
//     q: "Do we need Next.js, or is plain React enough?",
//     a: "If search ranking, page speed, or shareable links matter, Next.js earns its place. If you're building an internal tool or dashboard behind a login, plain React is often simpler — we'll size it during scoping, not before.",
//   },
//   {
//     q: "Does Tailwind CSS mean the site looks templated?",
//     a: "No — Tailwind is a utility layer, not a design system. Every visual decision is still made by hand; it's just implemented directly in the markup instead of a separate stylesheet you have to keep in sync.",
//   },
//   {
//     q: "What happens after launch?",
//     a: "You get the source, the documentation, and the option of a retainer. Nothing is held back or licensed to us — the codebase is yours to keep.",
//   },
// ];

// /* ---------- small utilities ---------- */

// function useInView(threshold = 0.35) {
//   const ref = useRef(null);
//   const [inView, setInView] = useState(false);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setInView(true);
//           obs.disconnect();
//         }
//       },
//       { threshold }
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, [threshold]);
//   return [ref, inView];
// }

// function CropMark({ corner }) {
//   const pos = {
//     "top-left": "top-3 left-3 sm:top-5 sm:left-5",
//     "top-right": "top-3 right-3 sm:top-5 sm:right-5 rotate-90",
//     "bottom-left": "bottom-3 left-3 sm:bottom-5 sm:left-5 -rotate-90",
//     "bottom-right": "bottom-3 right-3 sm:bottom-5 sm:right-5 rotate-180",
//   }[corner];
//   return (
//     <svg
//       className={`pointer-events-none fixed z-40 h-4 w-4 opacity-40 sm:h-5 sm:w-5 ${pos}`}
//       viewBox="0 0 20 20"
//       aria-hidden="true"
//     >
//       <path d="M1 1 L1 8 M1 1 L8 1" stroke="#17223B" strokeWidth="1" fill="none" />
//     </svg>
//   );
// }

// function Eyebrow({ children }) {
//   return (
//     <p className="mb-3 font-mono text-[11px] tracking-[0.28em] text-[#2E5C86]">
//       {children}
//     </p>
//   );
// }

// function FaqRow({ q, a }) {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="border-b border-[#D8D5CC]">
//       <button
//         onClick={() => setOpen((o) => !o)}
//         className="flex w-full items-center justify-between gap-6 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2E5C86]"
//         aria-expanded={open}
//       >
//         <span className="font-medium text-[#17223B]">{q}</span>
//         <ChevronDown
//           className={`h-4 w-4 flex-shrink-0 text-[#5C6570] transition-transform duration-300 ${
//             open ? "rotate-180" : ""
//           }`}
//         />
//       </button>
//       <div
//         className="grid overflow-hidden transition-all duration-300 ease-out"
//         style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
//       >
//         <div className="overflow-hidden">
//           <p className="max-w-2xl pb-5 text-sm leading-relaxed text-[#5C6570]">{a}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ---------- signature diagram: FIG. 01 system drawing ---------- */

// function BlueprintDiagram() {
//   const [ref, inView] = useInView(0.2);

//   const drawStyle = (delay) => ({
//     strokeDasharray: 1400,
//     strokeDashoffset: inView ? 0 : 1400,
//     transition: `stroke-dashoffset 1.4s ease-out ${delay}ms`,
//   });

//   return (
//     <div ref={ref} className="relative w-full overflow-hidden rounded-sm border border-[#D8D5CC] bg-[#FCFBF8]">
//       <style>{`
//         @media (prefers-reduced-motion: reduce) {
//           .bp-draw { transition: none !important; stroke-dashoffset: 0 !important; }
//           .bp-fade { transition: none !important; opacity: 1 !important; }
//         }
//       `}</style>

//       {/* corner registration marks for the drawing itself */}
//       {["M12,12 L12,28 M12,12 L28,12", "M12,12 L12,28 M12,12 L28,12"].map((_, i) => null)}

//       <svg viewBox="0 0 1000 460" className="h-auto w-full" role="img" aria-labelledby="fig01-title">
//         <title id="fig01-title">System drawing: client, server, and database, request and response paths</title>

//         {/* drawing-frame crop marks */}
//         {[
//           [16, 16, 16, 40, 40, 16],
//           [984, 16, 984, 40, 960, 16],
//           [16, 444, 16, 420, 40, 444],
//           [984, 444, 984, 420, 960, 444],
//         ].map((pts, i) => (
//           <path
//             key={i}
//             d={`M${pts[0]},${pts[1]} L${pts[2]},${pts[3]} M${pts[0]},${pts[1]} L${pts[4]},${pts[5]}`}
//             stroke="#17223B"
//             strokeWidth="1"
//             opacity="0.5"
//           />
//         ))}

//         {/* centerline */}
//         <line x1="60" y1="220" x2="940" y2="220" stroke="#B8BCC2" strokeWidth="1" strokeDasharray="10 6" />

//         {/* CLIENT box */}
//         <g>
//           <rect x="80" y="150" width="200" height="140" fill="none" stroke="#17223B" strokeWidth="1.5" />
//           <text x="180" y="205" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="13" fill="#17223B" fontWeight="600">CLIENT</text>
//           <text x="180" y="228" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#5C6570">React, Next.js</text>
//           <text x="180" y="246" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#5C6570">Tailwind CSS, JS</text>
//         </g>

//         {/* SERVER box */}
//         <g>
//           <rect x="400" y="150" width="200" height="140" fill="none" stroke="#2E5C86" strokeWidth="1.5" />
//           <text x="500" y="205" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="13" fill="#2E5C86" fontWeight="600">SERVER</text>
//           <text x="500" y="228" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#5C6570">Node.js</text>
//           <text x="500" y="246" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#5C6570">&amp; Express</text>
//         </g>

//         {/* DATABASE box */}
//         <g>
//           <rect x="720" y="150" width="200" height="140" fill="none" stroke="#17223B" strokeWidth="1.5" />
//           <text x="820" y="205" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="13" fill="#17223B" fontWeight="600">DATABASE</text>
//           <text x="820" y="228" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#5C6570">MongoDB</text>
//           <text x="820" y="246" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#5C6570">document store</text>
//         </g>

//         {/* connecting lines with arrowheads, drawn on scroll */}
//         <defs>
//           <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
//             <path d="M0,0 L6,3 L0,6 Z" fill="#2E5C86" />
//           </marker>
//         </defs>
//         <path className="bp-draw" style={drawStyle(150)} d="M280,205 L400,205" stroke="#2E5C86" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
//         <path className="bp-draw" style={drawStyle(450)} d="M600,205 L720,205" stroke="#2E5C86" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
//         <path className="bp-draw" style={drawStyle(750)} d="M720,250 L600,250" stroke="#C1442A" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" strokeDasharray="1400 0" />
//         <path className="bp-draw" style={drawStyle(950)} d="M400,250 L280,250" stroke="#C1442A" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />

//         <text x="340" y="195" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#2E5C86">REQUEST</text>
//         <text x="340" y="270" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#C1442A">RESPONSE</text>
//         <text x="660" y="195" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#2E5C86">QUERY</text>
//         <text x="660" y="270" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#C1442A">ROWS / DOCS</text>

//         {/* dimension line beneath the boxes */}
//         <g className="bp-fade" style={{ opacity: inView ? 1 : 0, transition: "opacity 0.6s ease-out 1100ms" }}>
//           <line x1="80" y1="330" x2="920" y2="330" stroke="#5C6570" strokeWidth="1" />
//           <line x1="80" y1="323" x2="80" y2="337" stroke="#5C6570" strokeWidth="1" />
//           <line x1="920" y1="323" x2="920" y2="337" stroke="#5C6570" strokeWidth="1" />
//           <text x="500" y="352" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#5C6570">
//             ONE STACK — MERN, NEXT.JS &amp; TAILWIND CSS
//           </text>
//         </g>

//         {/* titleblock stamp */}
//         <g className="bp-fade" style={{ opacity: inView ? 1 : 0, transition: "opacity 0.6s ease-out 1300ms" }}>
//           <rect x="700" y="380" width="240" height="60" fill="none" stroke="#17223B" strokeWidth="1" />
//           <line x1="700" y1="400" x2="940" y2="400" stroke="#17223B" strokeWidth="0.75" />
//           <line x1="820" y1="400" x2="820" y2="440" stroke="#17223B" strokeWidth="0.75" />
//           <text x="710" y="394" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#17223B">FIG. 01 — REQUEST LIFECYCLE</text>
//           <text x="710" y="414" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="#5C6570">SCALE: NTS</text>
//           <text x="710" y="428" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="#5C6570">SHEET: 1 OF 1</text>
//           <text x="830" y="414" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="#5C6570">REV: A</text>
//           <text x="830" y="428" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="#5C6570">STATUS: LIVE</text>
//         </g>
//       </svg>
//     </div>
//   );
// }

// /* ---------- page ---------- */

// export default function WebServices() {
//   const [heroIn, setHeroIn] = useState(false);
//   useEffect(() => {
//     const t = setTimeout(() => setHeroIn(true), 80);
//     return () => clearTimeout(t);
//   }, []);

//   return (
//     <div
//       className="min-h-screen w-full bg-[#F3F1EC] text-[#17223B] antialiased"
//       style={{ fontFamily: "'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif" }}
//     >
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
//         .display { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }
//         .mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
//       `}</style>

//       <CropMark corner="top-left" />
//       <CropMark corner="top-right" />
//       <CropMark corner="bottom-left" />
//       <CropMark corner="bottom-right" />

//       {/* faint drafting grid backdrop */}
//       <div
//         className="pointer-events-none fixed inset-0 z-0 opacity-[0.35]"
//         style={{
//           backgroundImage:
//             "linear-gradient(#D8D5CC 1px, transparent 1px), linear-gradient(90deg, #D8D5CC 1px, transparent 1px)",
//           backgroundSize: "44px 44px",
//           maskImage: "linear-gradient(to bottom, black, transparent 85%)",
//         }}
//       />

//       <div className="relative z-10">
//         {/* top bar */}
//         <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
//           <div className="flex items-center gap-2">
//             <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
//               <rect x="1" y="1" width="16" height="16" fill="none" stroke="#17223B" strokeWidth="1.2" />
//               <line x1="1" y1="9" x2="17" y2="9" stroke="#2E5C86" strokeWidth="1" />
//               <line x1="9" y1="1" x2="9" y2="17" stroke="#2E5C86" strokeWidth="1" />
//             </svg>
//             <span className="mono text-xs tracking-[0.2em] text-[#17223B]">DRAFT&nbsp;&amp;&nbsp;BUILD</span>
//           </div>
//           <a
//             href="#contact"
//             className="mono flex items-center gap-1.5 text-xs tracking-wide text-[#5C6570] transition hover:text-[#17223B]"
//           >
//             Submit a brief <ArrowUpRight className="h-3.5 w-3.5" />
//           </a>
//         </header>

//         {/* hero */}
//         <section className="mx-auto max-w-6xl px-6 pb-20 pt-6 sm:px-10 sm:pt-12">
//           <div
//             className="max-w-3xl transition-all duration-700 ease-out"
//             style={{ opacity: heroIn ? 1 : 0, transform: heroIn ? "translateY(0)" : "translateY(14px)" }}
//           >
//             <Eyebrow>SOFTWARE ENGINEERING — SPEC &amp; BUILD</Eyebrow>
//             <h1 className="display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">
//               Every system starts as a drawing, not a guess.
//             </h1>
//             <p className="mt-6 max-w-xl text-base leading-relaxed text-[#5C6570] sm:text-lg">
//               We design, build, and maintain web platforms on one stack we
//               know cold — HTML, CSS, and JavaScript at the foundation, React
//               and Tailwind CSS for the interface, Next.js holding it
//               together, Node.js and Express underneath, MongoDB for the data.
//             </p>
//             <div className="mt-9 flex flex-wrap items-center gap-5">
//               <a
//                 href="#contact"
//                 className="group inline-flex items-center gap-2 bg-[#17223B] px-5 py-3 text-sm font-medium text-[#F3F1EC] transition hover:bg-[#2E5C86] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E5C86]"
//               >
//                 Submit a brief
//                 <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
//               </a>
//               <a
//                 href="#process"
//                 className="mono text-xs tracking-wide text-[#5C6570] underline decoration-[#D8D5CC] underline-offset-8 transition hover:text-[#17223B] hover:decoration-[#2E5C86]"
//               >
//                 See how a project runs
//               </a>
//             </div>
//           </div>
//         </section>

//         {/* stack schedule */}
//         <section id="spec" className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
//           <Eyebrow>SCHEDULE</Eyebrow>
//           <h2 className="display text-2xl font-semibold tracking-tight sm:text-3xl">The stack schedule</h2>
//           <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#5C6570] sm:text-base">
//             Every drawing set ends with a schedule — the list of exactly
//             what's specified, layer by layer. Here's ours.
//           </p>

//           {/* desktop: schedule table */}
//           <div className="mt-10 hidden overflow-hidden border border-[#D8D5CC] sm:block">
//             <table className="w-full border-collapse text-left">
//               <thead>
//                 <tr>
//                   <th className="mono w-20 border-b border-r border-[#D8D5CC] bg-[#FCFBF8] p-4 text-[11px] font-medium tracking-widest text-[#5C6570]">
//                     MARK
//                   </th>
//                   <th className="mono w-40 border-b border-r border-[#D8D5CC] bg-[#FCFBF8] p-4 text-[11px] font-medium tracking-widest text-[#5C6570]">
//                     LAYER
//                   </th>
//                   <th className="mono w-56 border-b border-r border-[#D8D5CC] bg-[#FCFBF8] p-4 text-[11px] font-medium tracking-widest text-[#5C6570]">
//                     TECHNOLOGY
//                   </th>
//                   <th className="mono border-b border-[#D8D5CC] bg-[#FCFBF8] p-4 text-[11px] font-medium tracking-widest text-[#5C6570]">
//                     SPECIFICATION
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {STACK_SCHEDULE.map((s, i) => {
//                   const Icon = s.icon;
//                   return (
//                     <tr key={s.code}>
//                       <td className={`mono border-r border-[#D8D5CC] p-4 align-top text-sm font-semibold text-[#2E5C86] ${i !== 0 ? "border-t" : ""}`}>
//                         {s.code}
//                       </td>
//                       <td className={`border-r border-[#D8D5CC] p-4 align-top text-sm font-medium text-[#17223B] ${i !== 0 ? "border-t" : ""}`}>
//                         {s.layer}
//                       </td>
//                       <td className={`border-r border-[#D8D5CC] p-4 align-top text-sm text-[#17223B] ${i !== 0 ? "border-t" : ""}`}>
//                         <div className="flex items-center gap-2">
//                           <Icon className="h-4 w-4 flex-shrink-0 text-[#2E5C86]" strokeWidth={1.75} />
//                           {s.tech}
//                         </div>
//                       </td>
//                       <td className={`p-4 align-top text-sm leading-relaxed text-[#5C6570] ${i !== 0 ? "border-t" : ""} border-[#D8D5CC]`}>
//                         {s.detail}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           {/* mobile: stacked schedule cards */}
//           <div className="mt-10 space-y-4 sm:hidden">
//             {STACK_SCHEDULE.map((s) => {
//               const Icon = s.icon;
//               return (
//                 <div key={s.code} className="border border-[#D8D5CC] bg-[#FCFBF8] p-5">
//                   <div className="flex items-center justify-between">
//                     <span className="mono text-xs font-semibold text-[#2E5C86]">{s.code}</span>
//                     <span className="mono text-[10px] tracking-widest text-[#5C6570]">{s.layer.toUpperCase()}</span>
//                   </div>
//                   <div className="mt-3 flex items-center gap-2">
//                     <Icon className="h-4 w-4 text-[#2E5C86]" strokeWidth={1.75} />
//                     <span className="display text-base font-semibold">{s.tech}</span>
//                   </div>
//                   <p className="mt-2 text-sm leading-relaxed text-[#5C6570]">{s.detail}</p>
//                 </div>
//               );
//             })}
//           </div>
//         </section>

//         {/* signature diagram */}
//         <section id="drawing" className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
//           <Eyebrow>FIG. 01 — SYSTEM DRAWING</Eyebrow>
//           <h2 className="display text-2xl font-semibold tracking-tight sm:text-3xl">
//             What you're actually buying
//           </h2>
//           <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#5C6570] sm:text-base">
//             Every layer in the schedule above fits into the same shape:
//             a client, a server, and a database, talking on a cycle you
//             can reason about.
//           </p>
//           <div className="mt-10">
//             <cd BlueprintDiagram />
//           </div>
//         </section>

//         {/* process as project phases */}
//         <section id="process" className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
//           <Eyebrow>PROCESS</Eyebrow>
//           <h2 className="display text-2xl font-semibold tracking-tight sm:text-3xl">
//             Five phases, one drawing at a time
//           </h2>
//           <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#5C6570] sm:text-base">
//             Borrowed, on purpose, from how a building gets designed before
//             it's built.
//           </p>
//           <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-[#D8D5CC] bg-[#D8D5CC] sm:grid-cols-5">
//             {STAGES.map((s) => (
//               <div key={s.code} className="bg-[#F3F1EC] p-5">
//                 <div className="flex items-baseline justify-between">
//                   <span className="mono text-lg font-semibold text-[#2E5C86]">{s.code}</span>
//                   <span className="mono text-[9px] tracking-widest text-[#5C6570]">{s.phase.toUpperCase()}</span>
//                 </div>
//                 <h3 className="mt-3 text-sm font-medium">{s.title}</h3>
//                 <p className="mt-2 text-xs leading-relaxed text-[#5C6570]">{s.copy}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* work */}
//         <section id="work" className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
//           <Eyebrow>AS BUILT</Eyebrow>
//           <h2 className="display text-2xl font-semibold tracking-tight sm:text-3xl">Recent work</h2>
//           <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
//             {WORK.map((w) => (
//               <div key={w.title} className="border border-[#D8D5CC] bg-[#FCFBF8] p-6">
//                 <span className="mono text-[11px] tracking-widest text-[#C1442A]">{w.tag}</span>
//                 <h3 className="display mt-3 text-lg font-semibold">{w.title}</h3>
//                 <p className="mt-2 text-sm leading-relaxed text-[#5C6570]">{w.copy}</p>
//                 <div className="mt-4 flex flex-wrap gap-2">
//                   {w.specs.map((t) => (
//                     <span key={t} className="mono border border-[#D8D5CC] px-2 py-0.5 text-[10px] text-[#5C6570]">
//                       {t}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* engagement types */}
//         <section id="engagement" className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
//           <Eyebrow>ENGAGEMENT</Eyebrow>
//           <h2 className="display text-2xl font-semibold tracking-tight sm:text-3xl">How the contract works</h2>
//           <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
//             {ENGAGEMENTS.map((e) => (
//               <div key={e.type} className="flex flex-col border border-[#D8D5CC] p-6">
//                 <span className="mono inline-flex h-7 w-7 items-center justify-center border border-[#17223B] text-xs font-semibold">
//                   {e.type}
//                 </span>
//                 <h3 className="display mt-4 text-lg font-semibold">{e.title}</h3>
//                 <p className="mt-2 text-sm leading-relaxed text-[#5C6570]">{e.copy}</p>
//                 <ul className="mt-4 space-y-2">
//                   {e.points.map((p) => (
//                     <li key={p} className="flex items-start gap-2 text-sm text-[#17223B]">
//                       <span className="mt-1.5 h-1 w-1 flex-shrink-0 bg-[#C1442A]" />
//                       {p}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* faq */}
//         <section id="faq" className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
//           <Eyebrow>FIELD NOTES</Eyebrow>
//           <h2 className="display text-2xl font-semibold tracking-tight sm:text-3xl">
//             Questions worth asking first
//           </h2>
//           <div className="mt-8 max-w-3xl">
//             {FAQ.map((f) => (
//               <FaqRow key={f.q} q={f.q} a={f.a} />
//             ))}
//           </div>
//         </section>

//         {/* contact / cta */}
//         <section id="contact" className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
//           <div className="relative border border-[#17223B] p-8 sm:p-12">
//             <div className="absolute right-6 top-6 hidden mono text-[10px] tracking-widest text-[#5C6570] sm:block">
//               REV: A · STATUS: OPEN
//             </div>
//             <Eyebrow>NEXT STEP</Eyebrow>
//             <h2 className="display max-w-lg text-2xl font-semibold tracking-tight sm:text-3xl">
//               Submit a brief for review.
//             </h2>
//             <p className="mt-3 max-w-md text-sm leading-relaxed text-[#5C6570] sm:text-base">
//               A short note is enough — what you're building, roughly when,
//               and a budget range if you have one. We reply with next steps,
//               not a sales pitch.
//             </p>
//             <a
//               href="mailto:hello@example.com"
//               className="mt-6 inline-flex items-center gap-2 border border-[#17223B] px-5 py-2.5 text-sm font-medium text-[#17223B] transition hover:bg-[#17223B] hover:text-[#F3F1EC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E5C86]"
//             >
//               <Mail className="h-4 w-4" />
//               hello@example.com
//             </a>
//           </div>
//         </section>

//         <footer className="mx-auto max-w-6xl px-6 pb-10 pt-4 sm:px-10">
//           <div className="mono flex flex-wrap items-center justify-between gap-2 border-t border-[#D8D5CC] pt-6 text-[10px] tracking-widest text-[#5C6570]">
//             <span>DRAFT &amp; BUILD — WEB PLATFORMS</span>
//             <span>SHEET 1 OF 1 · SCALE NTS</span>
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// }




import React from "react";
import {
  Globe,
  Code2,
  Database,
  ShieldCheck,
  Smartphone,
  Rocket,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Custom Web Applications",
    description:
      "We develop fast, secure, and scalable web applications tailored to your business requirements.",
  },
  {
    icon: Code2,
    title: "MERN Stack Development",
    description:
      "Complete MERN Stack solutions using MongoDB, Express.js, React.js, and Node.js for modern web applications.",
  },
  {
    icon: Database,
    title: "PHP Development",
    description:
      "Custom PHP websites and business applications with clean architecture, high performance, and easy maintenance.",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description:
      "Pixel-perfect responsive websites that work seamlessly across desktop, tablet, and mobile devices.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    description:
      "We build secure applications with authentication, data protection, API security, and best coding practices.",
  },
  {
    icon: Rocket,
    title: "Deployment & Support",
    description:
      "From development to deployment on Vercel, VPS, or cloud servers, we provide complete support and maintenance.",
  },
];

const WebApplicationServices = () => {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm">
            Our Expertise
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900">
            Professional Web Application Development
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            We build powerful, scalable, and secure web applications using the
            latest technologies including <strong>MERN Stack</strong> and{" "}
            <strong>PHP</strong>. Our solutions are designed to improve
            efficiency, enhance user experience, and accelerate business growth.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:border-blue-500 hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-all">
                  <Icon
                    size={30}
                    className="text-blue-600 group-hover:text-white"
                  />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-gray-900">
                  {service.title}
                </h3>

                <p className="mt-4 text-gray-600 leading-7">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 text-center text-white">
          <h3 className="text-3xl font-bold">
            Ready to Build Your Next Web Application?
          </h3>

          <p className="mt-4 max-w-2xl mx-auto text-blue-100">
            Whether you need a business website, admin dashboard, CRM, ERP,
            eCommerce platform, booking system, or a custom web application, our
            experienced developers deliver high-quality solutions using MERN
            Stack and PHP.
          </p>

          <button className="mt-8 bg-white text-blue-700 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition">
            Get Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default WebApplicationServices;