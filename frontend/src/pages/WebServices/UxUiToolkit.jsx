import { useRef, useCallback } from "react";
import {
  Search,
  Users,
  Route,
  FolderTree,
  ClipboardCheck,
  Accessibility,
  Component,
  Palette,
  LayoutGrid,
  Boxes,
  EyeOff,
  ArrowRight,
} from "lucide-react";

/**
 * UX/UI toolkit component
 * bg white / text slate-900 / muted slate-500 / borders slate-200
 * accent text #B45309 (amber-700) / accent fill #F59E0B (amber-500)
 * Research phase gets one consistent tint (indigo #4F46E5) since it's a
 * single process, not six unrelated tools. Library cards each carry their
 * own approximate brand hue, since those genuinely are distinct products.
 *
 * No nav or footer — this is meant to drop into an existing page.
 */

const UX_RESEARCH = [
  { icon: Search, title: "User Research", copy: "Interviews, surveys, and field studies that ground decisions in what people actually do, not what we assume." },
  { icon: Users, title: "User Personas", copy: "Composite profiles built from research data, used to keep design decisions anchored to real user goals." },
  { icon: Route, title: "User Journey Mapping", copy: "The full path a person takes through a product — every step, decision point, and moment of friction." },
  { icon: FolderTree, title: "Information Architecture", copy: "How content and features are structured and labeled, so navigation matches how people actually look for things." },
  { icon: ClipboardCheck, title: "Usability Testing", copy: "Watching real people use the product before launch, to catch what internal reviews never will." },
  { icon: Accessibility, title: "Accessibility (WCAG)", copy: "Designs and builds checked against WCAG 2.2 — keyboard navigation, contrast, and screen-reader support included by default." },
];

const COMPONENT_LIBS = [
  { id: "shadcn", name: "Shadcn/UI", dot: "#18181B", tag: "COPY-IN", icon: Component, copy: "Unstyled Radix primitives with Tailwind styling you copy into your repo and own outright — no black-box dependency." },
  { id: "mui", name: "Material UI", dot: "#007FFF", tag: "FULL SYSTEM", icon: Palette, copy: "A complete, opinionated design system for teams that want consistency out of the box across a large app." },
  { id: "antd", name: "Ant Design", dot: "#1890FF", tag: "ENTERPRISE", icon: LayoutGrid, copy: "Dense, data-heavy components built for admin panels, dashboards, and internal enterprise tools." },
  { id: "radix", name: "Radix UI", dot: "#6E56CF", tag: "PRIMITIVES", icon: Boxes, copy: "Unstyled, fully accessible primitives — the logic and interaction patterns, with none of the visual opinion." },
  { id: "headless", name: "Headless UI", dot: "#38BDF8", tag: "PRIMITIVES", icon: EyeOff, copy: "Unstyled, accessible components built to pair naturally with Tailwind, from the team behind it." },
];

function TiltCard({ children }) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg) translateZ(0)`;
  }, []);
  const onLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
  }, []);
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="h-full transition-transform duration-150 ease-out will-change-transform">
      {children}
    </div>
  );
}

export default function UxUiToolkit() {
  return (
    <div className="w-full bg-white text-slate-900 font-sans antialiased">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <p className="mb-5 font-mono text-xs tracking-[0.25em] text-[#B45309]">UI/UX TOOLKIT</p>
        <h1 className="max-w-2xl font-mono text-3xl leading-tight tracking-tight sm:text-4xl">
          Research before pixels. Components built to hold up.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-500">
          Every screen starts with research, not a template — then gets built
          on component libraries chosen for what the project actually needs.
        </p>
      </div>

      {/* UX Research — a real sequence, numbered accordingly */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-mono text-xl tracking-tight sm:text-2xl">UX Research</h2>
          <span className="hidden font-mono text-xs text-slate-400 sm:block">the process, in order</span>
        </div>

        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {UX_RESEARCH.map((item, i) => {
            const Icon = item.icon;
            return (
              <li key={item.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-widest text-[#B45309]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4F46E5]/10">
                    <Icon className="h-4 w-4 text-[#4F46E5]" strokeWidth={1.75} />
                  </span>
                </div>
                <h3 className="mt-4 font-mono text-base font-medium">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.copy}</p>
                {i < UX_RESEARCH.length - 1 && (
                  <div className="mt-4 hidden items-center gap-1 text-slate-300 lg:flex">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      {/* UI Component Libraries — distinct tools, bento grid */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-mono text-xl tracking-tight sm:text-2xl">UI Component Libraries</h2>
          <span className="hidden font-mono text-xs text-slate-400 sm:block">picked per project</span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COMPONENT_LIBS.map((lib) => {
            const Icon = lib.icon;
            return (
              <TiltCard key={lib.id}>
                <div className="h-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full px-2 py-0.5 font-mono text-[10px]" style={{ color: lib.dot, backgroundColor: `${lib.dot}14` }}>
                      {lib.tag}
                    </span>
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: lib.dot }} />
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <Icon className="h-5 w-5" style={{ color: lib.dot }} strokeWidth={1.75} />
                    <h3 className="font-mono text-lg font-medium">{lib.name}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">{lib.copy}</p>
                </div>
              </TiltCard>
            );
          })}

          {/* Closing note fills the last grid slot on wide screens */}
          <div className="flex flex-col justify-center rounded-xl border border-dashed border-slate-300 bg-[#FAFAF9] p-6">
            <p className="font-mono text-sm font-medium text-slate-700">Not locked to one library</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              The library is a means to an end — chosen for the project's
              design system, accessibility needs, and how much visual
              control the team wants.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}