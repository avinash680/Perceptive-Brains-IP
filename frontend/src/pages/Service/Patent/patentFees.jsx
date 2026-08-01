import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import pbipLogo from "../../../assets/PBIP.png";
import {
  ChevronDown,
  Check,
  Search,
  X,
  ArrowUpDown,
  Calculator,
  Trash2,
  Download,
  Layers,
  BadgeCheck,
  FileText,
  Sparkles,
  Globe2,
  PackagePlus,
  Package,
  User,
} from "lucide-react";

/* ============================================================================
   PERCEPTIVE BRAINS IP — FEE CALCULATOR
   Pick the services you need; the summary panel totals govt + professional
   fees live as you go.

   NOTE ON DATA: Patents, Designs and Copyright figures are transcribed from
   the firm's fee schedule document. Trademark and International figures were
   not present in the source document — flagged as "Indicative" / "Custom
   Quote" and should be replaced with real numbers before going live.
============================================================================ */

/* ---------------------------- Applicant type -------------------------------
   NOTE: Government fees for patents/designs/trademarks in India vary by
   applicant category (e.g. natural person / startup / small entity pay a
   reduced govt. fee vs. a large entity). This selector currently only
   captures the choice — hook it into the per-service govt fee calculation
   once the category-wise fee schedule is finalised.
----------------------------------------------------------------------------- */
const ENTITY_TYPES = [
  { id: "individual", label: "Individual" },
  { id: "startup", label: "Startup" },
  { id: "public_ltd", label: "Public Ltd" },
  { id: "private_limited", label: "Private Limited" },
  { id: "small_entity", label: "Small Entity" },
  { id: "education", label: "Education" },
  { id: "educational_institution", label: "Educational Institution" },
  { id: "natural_person", label: "Natural Person" },
];

const CATEGORIES = [
  { id: "patents", label: "Patents", icon: Layers, package: 30000, packageLabel: "Search to Grant" },
  { id: "trademarks", label: "Trademarks", icon: BadgeCheck, package: null, indicative: true },
  { id: "copyright", label: "Copyright", icon: FileText, package: 20000, packageLabel: "Application to Registration" },
  { id: "designs", label: "Designs", icon: Sparkles, package: 13000, packageLabel: "Search to Grant" },
  { id: "international", label: "International", icon: Globe2, package: null, customQuote: true },
];

const SERVICES = {
  patents: [
    {
      id: "p1",
      name: "Prior Art Search (Paid Software)",
      professionalFee: 2000,
      govtFee: 0,
      govtFeeLabel: "N/A",
      timeline: "3–5 days",
      timelineDays: 5,
      description:
        "A structured novelty search across global patent and non-patent literature databases to gauge the invention's patentability before drafting begins.",
      included: ["Database search across 100M+ records", "Prior-art landscape summary", "Patentability opinion"],
    },
    {
      id: "p2",
      name: "Patent Drafting & Filing",
      professionalFee: 8000,
      govtFee: 1600,
      timeline: "2–3 weeks",
      timelineDays: 21,
      description:
        "Complete specification drafting — claims, abstract, and drawings — followed by filing of the provisional or complete application with the Patent Office.",
      included: ["Complete specification drafting", "Claim structuring", "e-Filing with acknowledgement"],
    },
    {
      id: "p3",
      name: "Early Publication",
      professionalFee: 1000,
      govtFee: 2500,
      timeline: "1 week",
      timelineDays: 7,
      description:
        "Requesting early publication under Section 11A to bring the application to public notice ahead of the standard 18-month timeline.",
      included: ["Form 9 preparation", "Filing & tracking", "Publication confirmation"],
    },
    {
      id: "p4",
      name: "Examination Request (Normal)",
      professionalFee: 2000,
      govtFee: 4000,
      timeline: "4–6 weeks",
      timelineDays: 42,
      description:
        "Filing the Request for Examination that queues the application for substantive review by a patent examiner.",
      included: ["Form 18 preparation", "Filing with the Patent Office", "Examiner queue tracking"],
    },
    {
      id: "p5",
      name: "Expedited Examination",
      professionalFee: 2000,
      govtFee: 8000,
      timeline: "2–3 weeks",
      timelineDays: 21,
      description:
        "An accelerated examination track for eligible applicants, moving the application ahead of the standard queue.",
      included: ["Eligibility assessment", "Form 18A preparation", "Priority queue filing"],
    },
    {
      id: "p6",
      name: "FER Response Filing",
      professionalFee: 4000,
      govtFee: 0,
      govtFeeLabel: "No Fee",
      timeline: "~1 month",
      timelineDays: 30,
      description:
        "Drafting and filing a comprehensive reply to the First Examination Report, addressing objections raised by the examiner.",
      included: ["Objection-by-objection response", "Claim amendments if needed", "Filing within statutory deadline"],
    },
    {
      id: "p7",
      name: "Grant after Hearing",
      professionalFee: 4000,
      govtFee: 0,
      govtFeeLabel: "No Fee",
      timeline: "As scheduled",
      timelineDays: 9999,
      description:
        "Representation at the hearing before the Controller, presenting arguments to secure the grant of patent.",
      included: ["Hearing preparation", "Attorney representation", "Post-hearing compliance filing"],
    },
    {
      id: "p8",
      name: "NBA Approval (if required)",
      professionalFee: 2000,
      govtFee: 2000,
      timeline: "4–8 weeks",
      timelineDays: 56,
      description:
        "Where the invention draws on biological material, obtaining the mandatory approval from the National Biodiversity Authority.",
      included: ["Application to NBA", "Liaison & follow-up", "Approval procurement"],
    },
    {
      id: "p9",
      name: "Other Filings (Annuity / Form 27 / Miscellaneous)",
      professionalFee: 1000,
      govtFee: null,
      govtFeeLabel: "As Applicable",
      timeline: "Varies",
      timelineDays: 9999,
      description:
        "Ongoing compliance filings after grant, including annuity payments and statements of commercial working (Form 27).",
      included: ["Deadline monitoring", "Form preparation", "Timely e-filing"],
    },
  ],
  designs: [
    {
      id: "d1",
      name: "Prior Art Search",
      professionalFee: 1000,
      govtFee: 0,
      govtFeeLabel: "Not Applicable",
      timeline: "2–3 days",
      timelineDays: 3,
      description: "A design-novelty search to confirm the design is new and original before filing.",
      included: ["Design database search", "Novelty assessment", "Filing recommendation"],
    },
    {
      id: "d2",
      name: "Design Filing",
      professionalFee: 10000,
      govtFee: 1000,
      timeline: "1–2 weeks",
      timelineDays: 14,
      description: "Preparation of representation sheets and filing of the design application with the Design Office.",
      included: ["Representation sheet preparation", "Class identification", "e-Filing with acknowledgement"],
    },
    {
      id: "d3",
      name: "Response to Objections",
      professionalFee: 2000,
      govtFee: 0,
      govtFeeLabel: "No Fee",
      timeline: "2–4 weeks",
      timelineDays: 28,
      description: "Drafting a reply to objections raised by the Design Office examiner.",
      included: ["Objection analysis", "Response drafting", "Filing within deadline"],
    },
    {
      id: "d4",
      name: "Hearing (if any)",
      professionalFee: 4000,
      govtFee: 0,
      govtFeeLabel: "No Fee",
      timeline: "As scheduled",
      timelineDays: 9999,
      description: "Attorney representation at a hearing before the Design Office, where required.",
      included: ["Hearing preparation", "Attorney representation", "Compliance follow-up"],
    },
    {
      id: "d5",
      name: "Other Document Filing",
      professionalFee: 1000,
      govtFee: null,
      govtFeeLabel: "As Applicable",
      timeline: "Varies",
      timelineDays: 9999,
      description: "Any supplementary form or document filing required during prosecution.",
      included: ["Form preparation", "e-Filing", "Acknowledgement tracking"],
    },
  ],
  copyright: [
    {
      id: "c1",
      name: "Application Filing (Literary / Artistic Work)",
      professionalFee: 4000,
      govtFee: 500,
      timeline: "2–3 weeks",
      timelineDays: 21,
      description: "Preparation and filing of a copyright application for literary or artistic works.",
      included: ["Application drafting", "Supporting affidavit", "e-Filing with the Copyright Office"],
    },
    {
      id: "c2",
      name: "Artistic Work Used with Goods / Services",
      professionalFee: 4000,
      govtFee: 2000,
      timeline: "3–4 weeks",
      timelineDays: 28,
      description:
        "Filing for artistic works that also function as a brand mark, requiring an additional no-objection track.",
      included: ["Trademark search cross-check", "NOC coordination", "Application filing"],
    },
    {
      id: "c3",
      name: "Reply to Discrepancy Report",
      professionalFee: 4000,
      govtFee: 0,
      govtFeeLabel: "No Fee",
      timeline: "2 weeks",
      timelineDays: 14,
      description: "Addressing discrepancies raised by the examiner after initial filing.",
      included: ["Discrepancy analysis", "Response drafting", "Re-filing"],
    },
    {
      id: "c4",
      name: "Hearing (if any)",
      professionalFee: 5000,
      govtFee: 0,
      govtFeeLabel: "No Fee",
      timeline: "As scheduled",
      timelineDays: 9999,
      description: "Representation at a hearing before the Copyright Office, where required.",
      included: ["Hearing preparation", "Attorney representation", "Post-hearing filing"],
    },
    {
      id: "c5",
      name: "Trademark Clearance Certificate",
      professionalFee: 2000,
      govtFee: 9000,
      timeline: "1 week",
      timelineDays: 7,
      description: "Obtaining a No-Objection / clearance certificate required for certain copyright applications.",
      included: ["Application preparation", "Liaison with Registry", "Certificate procurement"],
    },
  ],
  trademarks: [
    {
      id: "t1",
      name: "Trademark Search & Clearance",
      professionalFee: 2000,
      govtFee: 0,
      govtFeeLabel: "N/A",
      timeline: "2–3 days",
      timelineDays: 3,
      description: "A clearance search across the trademark register to assess availability and conflict risk.",
      included: ["Register & common-law search", "Risk assessment", "Clearance opinion"],
    },
    {
      id: "t2",
      name: "Trademark Application Filing (per class)",
      professionalFee: 5000,
      govtFee: null,
      govtFeeLabel: "₹4,500–₹9,000",
      timeline: "1 week",
      timelineDays: 7,
      description: "Drafting and e-filing the trademark application in the selected class(es) of goods or services.",
      included: ["Application drafting", "Class specification", "e-Filing with acknowledgement"],
    },
    {
      id: "t3",
      name: "Reply to Examination Report",
      professionalFee: 4000,
      govtFee: 0,
      govtFeeLabel: "No Fee",
      timeline: "3–4 weeks",
      timelineDays: 28,
      description: "Drafting a response to objections raised in the trademark examination report.",
      included: ["Objection analysis", "Response drafting", "Filing within deadline"],
    },
    {
      id: "t4",
      name: "Opposition Response",
      professionalFee: 8000,
      govtFee: 2700,
      timeline: "As scheduled",
      timelineDays: 9999,
      description: "Preparing and filing a counter-statement in response to a third-party opposition.",
      included: ["Counter-statement drafting", "Evidence coordination", "Hearing representation"],
    },
    {
      id: "t5",
      name: "Renewal Filing",
      professionalFee: 3000,
      govtFee: 10000,
      timeline: "2–3 weeks",
      timelineDays: 21,
      description: "Renewing an existing registration ahead of its ten-year expiry.",
      included: ["Renewal form preparation", "Deadline tracking", "e-Filing"],
    },
  ],
  international: [
    {
      id: "i1",
      name: "PCT Patent Filing",
      professionalFee: 25000,
      govtFee: null,
      govtFeeLabel: "Per WIPO fee schedule",
      timeline: "4–6 weeks",
      timelineDays: 42,
      description: "Filing a Patent Cooperation Treaty application to preserve rights across member states.",
      included: ["PCT request preparation", "WIPO e-filing", "International search coordination"],
    },
    {
      id: "i2",
      name: "Madrid Protocol Trademark Filing",
      professionalFee: 20000,
      govtFee: null,
      govtFeeLabel: "Per designated countries",
      timeline: "6–8 weeks",
      timelineDays: 56,
      description: "A single application designating multiple member countries under the Madrid System.",
      included: ["Basic application mapping", "WIPO e-filing", "Designation strategy"],
    },
    {
      id: "i3",
      name: "National Phase Entry",
      professionalFee: 15000,
      govtFee: null,
      govtFeeLabel: "Country-specific",
      timeline: "Varies by jurisdiction",
      timelineDays: 9999,
      description: "Entering the national phase in target countries following a PCT or Madrid filing.",
      included: ["Local agent coordination", "Translation management", "Deadline compliance"],
    },
    {
      id: "i4",
      name: "International Design (Hague System)",
      professionalFee: 18000,
      govtFee: null,
      govtFeeLabel: "Per Hague fee schedule",
      timeline: "3–5 weeks",
      timelineDays: 35,
      description: "A single international application for design protection across Hague member territories.",
      included: ["Representation preparation", "WIPO e-filing", "Territory designation strategy"],
    },
  ],
};

/* ------------------------------- Utilities -------------------------------- */
const inr = (n) => (typeof n === "number" ? `₹${n.toLocaleString("en-IN")}` : n);
const feeNumber = (n) => (typeof n === "number" ? n : 0);
const totalFee = (svc) => svc.professionalFee + feeNumber(svc.govtFee);
const categoryTotal = (catId, selectedIds) =>
  SERVICES[catId].reduce((sum, s) => (selectedIds[s.id] ? sum + totalFee(s) : sum), 0);
const categoryCount = (catId, selectedIds) =>
  SERVICES[catId].reduce((sum, s) => (selectedIds[s.id] ? sum + 1 : sum), 0);

/* --------------------------- Applicant type selector ------------------------ */
function EntityTypeSelector({ selected, onSelect }) {
  return (
    <div className="mb-5">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-[#0B2545]/50 mb-2 flex items-center gap-1.5">
        <User className="h-3.5 w-3.5" />
        Applicant Type
      </div>
      <div className="flex flex-wrap gap-2">
        {ENTITY_TYPES.map((et) => {
          const checked = selected === et.id;
          return (
            <button
              key={et.id}
              type="button"
              role="checkbox"
              aria-checked={checked}
              aria-label={et.label}
              onClick={() => onSelect(checked ? null : et.id)}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F9B8E] ${
                checked
                  ? "bg-[#0F9B8E]/10 border-[#0F9B8E] text-[#0B2545]"
                  : "bg-white border-black/10 text-[#0B2545]/70 hover:border-[#0F9B8E]/50"
              }`}
            >
              <span
                className={`h-4 w-4 rounded-[4px] border-2 grid place-items-center shrink-0 transition-colors ${
                  checked ? "bg-[#0F9B8E] border-[#0F9B8E]" : "border-black/25"
                }`}
              >
                {checked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
              </span>
              {et.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------ Category tabs ------------------------------ */
function CategoryTabs({ active, setActive, selectedIds }) {
  return (
    <div
      role="tablist"
      aria-label="IP category"
      className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[#0B2545]/5 border border-black/5 w-full md:w-auto"
    >
      {CATEGORIES.map((cat) => {
        const Icon = cat.icon;
        const isActive = active === cat.id;
        const count = categoryCount(cat.id, selectedIds);
        return (
          <button
            key={cat.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => setActive(cat.id)}
            className={`relative flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F9B8E] ${
              isActive ? "text-white" : "text-[#0B2545]/70 hover:text-[#0B2545]"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="calc-tab-pill"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#1E4E8C] to-[#0F9B8E] shadow-[0_6px_16px_-6px_rgba(15,155,142,0.55)]"
              />
            )}
            <Icon className="relative h-4 w-4" strokeWidth={2} />
            <span className="relative">{cat.label}</span>
            {count > 0 && (
              <span
                className={`relative ml-0.5 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-semibold ${
                  isActive ? "bg-white/25 text-white" : "bg-[#0F9B8E]/15 text-[#0F9B8E]"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------ Toolbar (search + sort) --------------------- */
function Toolbar({ query, setQuery, sortKey, setSortKey, onAddAll, allSelected }) {
  const sortOptions = [
    { key: "default", label: "Default order" },
    { key: "fee-asc", label: "Total fee: low to high" },
    { key: "fee-desc", label: "Total fee: high to low" },
    { key: "timeline", label: "Fastest timeline" },
  ];
  return (
    <div className="flex flex-col sm:flex-row gap-2.5 px-4 md:px-5 py-3.5 border-b border-black/5 bg-white/40">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#0B2545]/35" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search services in this category…"
          className="w-full pl-9 pr-8 py-2 rounded-lg bg-white border border-black/10 text-sm text-[#0B2545] placeholder:text-[#0B2545]/35 focus:outline-none focus:ring-2 focus:ring-[#0F9B8E]/40"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#0B2545]/35 hover:text-[#0B2545]/60"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="relative flex items-center gap-1.5 shrink-0">
        <ArrowUpDown className="h-3.5 w-3.5 text-[#0B2545]/40 hidden sm:block" />
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          className="appearance-none pl-3 pr-7 py-2 rounded-lg bg-white border border-black/10 text-xs font-medium text-[#0B2545]/80 focus:outline-none focus:ring-2 focus:ring-[#0F9B8E]/40 cursor-pointer"
        >
          {sortOptions.map((o) => (
            <option key={o.key} value={o.key}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="h-3 w-3 text-[#0B2545]/40 absolute right-2.5 pointer-events-none" />
      </div>

      <button
        onClick={onAddAll}
        className={`shrink-0 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
          allSelected
            ? "bg-[#0F9B8E]/15 text-[#0F9B8E]"
            : "bg-[#0B2545] text-white hover:bg-[#0B2545]/90"
        }`}
      >
        {allSelected ? <Check className="h-3.5 w-3.5" /> : <PackagePlus className="h-3.5 w-3.5" />}
        All add services
      </button>
    </div>
  );
}

/* ------------------------------ Service row --------------------------------- */
function ServiceRow({ svc, checked, onToggle, expanded, onExpand }) {
  const total = totalFee(svc);
  return (
    <div className={`border-b border-black/5 last:border-b-0 transition-colors ${checked ? "bg-[#0F9B8E]/[0.06]" : ""}`}>
      <div className="grid grid-cols-[28px_2fr_1fr_1fr_1fr_0.8fr_36px] gap-2 px-4 md:px-5 py-4 items-center">
        <button
          role="checkbox"
          aria-checked={checked}
          aria-label={`Select ${svc.name}`}
          onClick={() => onToggle(svc.id)}
          className={`h-5 w-5 rounded-md border-2 grid place-items-center transition-colors ${
            checked ? "bg-[#0F9B8E] border-[#0F9B8E]" : "border-black/20 hover:border-[#0F9B8E]/60"
          }`}
        >
          {checked && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
        </button>

        <div className="text-sm font-medium text-[#0B2545] pr-2 cursor-pointer" onClick={() => onToggle(svc.id)}>
          {svc.name}
        </div>
        <div className="hidden md:block font-mono text-sm text-[#0B2545]/70">
          {svc.govtFeeLabel ?? inr(svc.govtFee)}
        </div>
        <div className="hidden md:block font-mono text-sm text-[#0B2545]/70">{inr(svc.professionalFee)}</div>
        <div className="hidden md:block font-mono text-sm font-semibold text-[#0B2545]">
          {typeof svc.govtFee === "number" ? inr(total) : `${inr(svc.professionalFee)} + fee`}
        </div>
        <div className="hidden md:block text-xs text-[#0B2545]/60">{svc.timeline}</div>
        <button
          onClick={() => onExpand(expanded ? null : svc.id)}
          aria-expanded={expanded}
          aria-label={expanded ? "Collapse details" : "Expand details"}
          className="h-8 w-8 grid place-items-center rounded-full bg-[#0B2545]/5 hover:bg-[#0F9B8E]/15 transition-colors justify-self-end"
        >
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronDown className="h-4 w-4 text-[#0B2545]/70" />
          </motion.span>
        </button>
      </div>

      {/* Mobile fee row */}
      <div className="md:hidden -mt-2 px-4 pb-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#0B2545]/60">
        <span>Govt: <span className="font-mono">{svc.govtFeeLabel ?? inr(svc.govtFee)}</span></span>
        <span>Prof: <span className="font-mono">{inr(svc.professionalFee)}</span></span>
        <span className="font-mono font-semibold text-[#0B2545]">
          {typeof svc.govtFee === "number" ? inr(total) : `${inr(svc.professionalFee)} + fee`}
        </span>
        <span>{svc.timeline}</span>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 md:px-5 pb-5 pt-1 grid md:grid-cols-[1.3fr_1fr] gap-5">
              <p className="text-sm leading-relaxed text-[#0B2545]/70">{svc.description}</p>
              <div className="space-y-2">
                {svc.included.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-[#0B2545]/75">
                    <Check className="h-4 w-4 mt-0.5 shrink-0 text-[#0F9B8E]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------ Fee breakdown chart -------------------------- */
function FeeBreakdownChart({ govtTotal, profTotal }) {
  const data = [
    { name: "Government fees", value: govtTotal, color: "#7FD8CC" },
    { name: "Professional fees", value: profTotal, color: "#E8C468" },
  ].filter((d) => d.value > 0);

  if (data.length === 0) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="h-[72px] w-[72px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={22}
              outerRadius={34}
              paddingAngle={data.length > 1 ? 3 : 0}
              stroke="none"
            >
              {data.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => inr(value)}
              contentStyle={{
                background: "#0B2545",
                border: "none",
                borderRadius: 8,
                fontSize: 11,
                padding: "4px 8px",
              }}
              itemStyle={{ color: "#fff" }}
              labelStyle={{ display: "none" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col gap-1.5 text-[11px]">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-1.5 text-white/60">
            <span className="h-2 w-2 rounded-full shrink-0" style={{ background: d.color }} />
            {d.name}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ Summary panel -------------------------------- */
function SummaryPanel({ selectedServices, packageCategories, onClear, onDownload, onRemove }) {
  const govtTotal = selectedServices.reduce((sum, s) => sum + feeNumber(s.govtFee), 0);
  const profTotal = selectedServices.reduce((sum, s) => sum + s.professionalFee, 0);
  const grandTotal = govtTotal + profTotal;
  const hasVariableFees = selectedServices.some((s) => typeof s.govtFee !== "number");

  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#0B2545] to-[#0A1628] text-white p-5 md:p-6 sticky top-4">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="h-4.5 w-4.5 text-[#7FD8CC]" />
        <h3 className="font-serif text-lg font-medium">Your Estimate</h3>
      </div>

      {selectedServices.length === 0 ? (
        <p className="text-sm text-white/50 py-6 text-center">Select services to build your quote.</p>
      ) : (
        <>
          <FeeBreakdownChart govtTotal={govtTotal} profTotal={profTotal} />

          <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1 my-4">
            <AnimatePresence initial={false}>
              {selectedServices.map((s) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="group flex items-center justify-between gap-2 text-xs"
                >
                  <span className="text-white/75 truncate">{s.name}</span>
                  <span className="flex items-center gap-1.5 shrink-0">
                    <span className="font-mono text-white/90">
                      {typeof s.govtFee === "number" ? inr(totalFee(s)) : `${inr(s.professionalFee)}+`}
                    </span>
                    <button
                      onClick={() => onRemove(s.id)}
                      aria-label={`Remove ${s.name}`}
                      className="opacity-0 group-hover:opacity-100 text-white/40 hover:text-white/80 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {packageCategories.length > 0 && (
            <div className="space-y-2 mb-4">
              <AnimatePresence initial={false}>
                {packageCategories.map((cat) => (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-between gap-2 rounded-lg bg-[#E8C468]/10 border border-[#E8C468]/25 px-3 py-2.5"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Package className="h-3.5 w-3.5 text-[#E8C468] shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-[#E8C468] truncate">
                          Consolidated package · {cat.label}
                        </div>
                        <div className="text-[10px] text-white/50">{cat.packageLabel}</div>
                      </div>
                    </div>
                    <span className="font-mono text-sm font-semibold text-[#E8C468] shrink-0">
                      {inr(cat.package)}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          <div className="border-t border-white/10 pt-4 space-y-2">
            <div className="flex justify-between text-xs text-white/55">
              <span>Government fees</span>
              <span className="font-mono">{inr(govtTotal)}</span>
            </div>
            <div className="flex justify-between text-xs text-white/55">
              <span>Professional fees</span>
              <span className="font-mono">{inr(profTotal)}</span>
            </div>
            <div className="flex justify-between items-baseline pt-2">
              <span className="text-sm font-medium">Estimated Total</span>
              <motion.span
                key={grandTotal}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-2xl font-semibold text-[#E8C468]"
              >
                {inr(grandTotal)}
              </motion.span>
            </div>
            {hasVariableFees && (
              <p className="text-[11px] text-white/40 pt-1">
                Some selected services have variable government fees — final total may differ.
              </p>
            )}
            {packageCategories.length > 0 && (
              <p className="text-[11px] text-white/40 pt-1">
                Consolidated package price(s) above are shown for reference and are not added into the itemized total.
              </p>
            )}
          </div>

          <div className="mt-5 flex gap-2">
            <button
              onClick={onDownload}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#E8C468] to-[#C9A227] text-[#0B2545] text-xs font-semibold hover:-translate-y-0.5 transition-all"
            >
              <Download className="h-3.5 w-3.5" /> Download Quote
            </button>
            <button
              onClick={onClear}
              aria-label="Clear selection"
              className="px-3.5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ----------------------------------- Root ------------------------------------ */
export default function IPFeeCalculator() {
  const [entityType, setEntityType] = useState(null);
  const [category, setCategory] = useState("patents");
  const [selectedIds, setSelectedIds] = useState({});
  const [expandedId, setExpandedId] = useState(null);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("default");

  const catMeta = CATEGORIES.find((c) => c.id === category);

  const services = useMemo(() => {
    let list = SERVICES[category].filter((s) =>
      s.name.toLowerCase().includes(query.trim().toLowerCase())
    );
    if (sortKey === "fee-asc") list = [...list].sort((a, b) => totalFee(a) - totalFee(b));
    if (sortKey === "fee-desc") list = [...list].sort((a, b) => totalFee(b) - totalFee(a));
    if (sortKey === "timeline") list = [...list].sort((a, b) => a.timelineDays - b.timelineDays);
    return list;
  }, [category, query, sortKey]);

  const toggle = (id) => {
    setSelectedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const remove = (id) => {
    setSelectedIds((prev) => ({ ...prev, [id]: false }));
  };

  const allInCategorySelected = SERVICES[category].every((s) => selectedIds[s.id]);
  const categorySelectedCount = categoryCount(category, selectedIds);

  const addAllInCategory = () => {
    setSelectedIds((prev) => {
      const next = { ...prev };
      const targetValue = !allInCategorySelected;
      SERVICES[category].forEach((s) => {
        next[s.id] = targetValue;
      });
      return next;
    });
  };

  const selectedServices = useMemo(() => {
    const all = Object.values(SERVICES).flat();
    return all.filter((s) => selectedIds[s.id]);
  }, [selectedIds]);

  // Categories where every service is selected AND a consolidated package price exists —
  // this is what now feeds the summary panel and the downloaded quote.
  const packageCategories = useMemo(
    () => CATEGORIES.filter((cat) => cat.package && SERVICES[cat.id].every((s) => selectedIds[s.id])),
    [selectedIds]
  );

  const clearAll = () => setSelectedIds({});

  const downloadQuote = () => {
    if (selectedServices.length === 0) return;
    const win = window.open("", "_blank", "width=800,height=650");
    if (!win) return;
    const rows = selectedServices
      .map(
        (s) => `<tr>
          <td>${s.name}</td>
          <td>${s.govtFeeLabel ?? inr(s.govtFee)}</td>
          <td>${inr(s.professionalFee)}</td>
          <td>${typeof s.govtFee === "number" ? inr(totalFee(s)) : inr(s.professionalFee) + " + govt. fee"}</td>
        </tr>`
      )
      .join("");
    const govtTotal = selectedServices.reduce((sum, s) => sum + feeNumber(s.govtFee), 0);
    const profTotal = selectedServices.reduce((sum, s) => sum + s.professionalFee, 0);

    const packageRows = packageCategories
      .map(
        (cat) => `<tr>
          <td colspan="3">Consolidated package — ${cat.label} (${cat.packageLabel})</td>
          <td>${inr(cat.package)}</td>
        </tr>`
      )
      .join("");

    const entityLabel = ENTITY_TYPES.find((e) => e.id === entityType)?.label;

    const quoteHtml = `
      <html><head><title>Perceptive Brains IP — Fee Estimate</title>
      <style>
        body { font-family: -apple-system, Inter, sans-serif; color:#0B2545; padding:40px; position:relative; }
        .watermark {
          position:fixed;
          inset:0;
          display:flex;
          align-items:center;
          justify-content:center;
          pointer-events:none;
          z-index:0;
          opacity:0.08;
        }
        .watermark img {
          width:min(48vw, 280px);
          max-width:280px;
          object-fit:contain;
          filter: grayscale(100%);
        }
        .header-row { position:relative; z-index:1; display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:16px; }
        .header-logo { width:56px; height:56px; object-fit:contain; opacity:0.9; }
        h1, p.sub, table, .tot, .note { position:relative; z-index:1; }
        h1 { font-size:22px; margin:0; }
        p.sub { color:#5b6b82; font-size:12px; margin:4px 0 0; }
        table { width:100%; border-collapse:collapse; font-size:13px; }
        th, td { text-align:left; padding:10px 12px; border-bottom:1px solid #e5e9ef; }
        th { text-transform:uppercase; font-size:10px; letter-spacing:0.06em; color:#5b6b82; }
        tr.package td { background:#fbf3de; font-weight:600; color:#8a6d1a; }
        .tot { margin-top:20px; font-size:14px; }
        .tot strong { color:#0B2545; }
        .note { margin-top:6px; font-size:11px; color:#8a97a8; }
        @media print {
          body { padding:24px; }
          .watermark { opacity:0.08; }
        }
      </style></head>
      <body>
        <div class="watermark">
          <img src="${pbipLogo}" alt="Perceptive Brains IP watermark" />
        </div>
        <div class="header-row">
          <div>
            <h1>Perceptive Brains IP</h1>
            <p class="sub">Fee Estimate &middot; Generated ${new Date().toLocaleDateString()}${
              entityLabel ? ` &middot; Applicant Type: ${entityLabel}` : ""
            }</p>
          </div>
          <img class="header-logo" src="${pbipLogo}" alt="Perceptive Brains IP logo" />
        </div>
        <table>
          <thead><tr><th>Service</th><th>Govt. Fee</th><th>Professional Fee</th><th>Total</th></tr></thead>
          <tbody>${rows}${packageRows ? `<tr><td colspan="4" style="border:none;height:6px;"></td></tr>` : ""}${packageRows.replace(/<tr>/g, '<tr class="package">')}</tbody>
        </table>
        <p class="tot">Government fees: <strong>${inr(govtTotal)}</strong></p>
        <p class="tot">Professional fees: <strong>${inr(profTotal)}</strong></p>
        <p class="tot">Estimated total (itemized): <strong>${inr(govtTotal + profTotal)}</strong></p>
        ${packageCategories.length > 0 ? `<p class="note">Consolidated package prices are shown above for comparison and are separate from the itemized total.</p>` : ""}
      </body></html>
    `;

    win.document.write(quoteHtml);
    win.document.close();

    const logoImage = new Image();
    logoImage.onload = () => {
      win.focus();
      setTimeout(() => win.print(), 400);
    };
    logoImage.src = pbipLogo;
  };

  return (
    <div className="w-full font-sans">
      <EntityTypeSelector selected={entityType} onSelect={setEntityType} />

      {(catMeta.indicative || catMeta.customQuote) && (
        <div className="mb-4 flex items-center gap-2 text-xs font-medium text-[#C9A227] bg-[#C9A227]/10 border border-[#C9A227]/25 rounded-lg px-3.5 py-2.5">
          {catMeta.indicative
            ? "Indicative figures shown — confirm exact fees with our team before filing."
            : "International fees vary by jurisdiction — figures shown are estimates."}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <CategoryTabs active={category} setActive={setCategory} selectedIds={selectedIds} />
        {selectedServices.length > 0 && (
          <div className="text-xs text-[#0B2545]/50 sm:text-right">
            {selectedServices.length} service{selectedServices.length > 1 ? "s" : ""} selected across all categories
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-5 items-start">
        <div className="rounded-2xl border border-black/5 bg-white/60 backdrop-blur-xl overflow-hidden">
          <Toolbar
            query={query}
            setQuery={setQuery}
            sortKey={sortKey}
            setSortKey={setSortKey}
            onAddAll={addAllInCategory}
            allSelected={allInCategorySelected}
          />

          <div className="hidden md:grid grid-cols-[28px_2fr_1fr_1fr_1fr_0.8fr_36px] gap-2 px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-[#0B2545]/50 border-b border-black/5">
            <div />
            <div>Service</div>
            <div>Govt. Fee</div>
            <div>Professional Fee</div>
            <div>Total Fee</div>
            <div>Timeline</div>
            <div />
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={category} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {services.length === 0 ? (
                <div className="px-5 py-10 text-center text-sm text-[#0B2545]/40">
                  No services match "{query}" in {catMeta.label.toLowerCase()}.
                </div>
              ) : (
                services.map((svc) => (
                  <ServiceRow
                    key={svc.id}
                    svc={svc}
                    checked={!!selectedIds[svc.id]}
                    onToggle={toggle}
                    expanded={expandedId === svc.id}
                    onExpand={setExpandedId}
                  />
                ))
              )}
            </motion.div>
          </AnimatePresence>

          {categorySelectedCount > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 bg-[#0B2545]/[0.03] border-t border-black/5">
              {catMeta.package && allInCategorySelected ? (
                <>
                  <div className="text-xs text-[#0B2545]/60">
                    <span className="font-semibold text-[#0B2545]">Consolidated package</span> ({catMeta.packageLabel})
                  </div>
                  <div className="font-mono text-lg font-semibold text-[#0B2545]">{inr(catMeta.package)}</div>
                </>
              ) : (
                <>
                  <div className="text-xs text-[#0B2545]/60">
                    <span className="font-semibold text-[#0B2545]">Selected total</span> ({categorySelectedCount} service
                    {categorySelectedCount > 1 ? "s" : ""} in {catMeta.label})
                  </div>
                  <div className="font-mono text-lg font-semibold text-[#0B2545]">
                    {inr(categoryTotal(category, selectedIds))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <SummaryPanel
          selectedServices={selectedServices}
          packageCategories={packageCategories}
          onClear={clearAll}
          onDownload={downloadQuote}
          onRemove={remove}
        />
      </div>
    </div>
  );
}