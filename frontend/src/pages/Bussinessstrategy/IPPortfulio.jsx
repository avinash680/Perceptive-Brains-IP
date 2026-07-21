

import { useState, useMemo } from "react";
import {
  Search,
  ChevronDown,
  ChevronRight,
  Scale,
  Stamp,
  Copyright,
  CircleDot,
} from "lucide-react";

/**
 * IPPortfolioManager
 * ------------------
 * A single, self-contained IP (patent / trademark / copyright) portfolio
 * dashboard. Drop into any React + Tailwind project — no external CSS,
 * no extra data fetching. Sample records are defined inline; swap the
 * `ASSETS` array for a real data source.
 *
 * Visual concept: each asset reads like an entry in a legal docket —
 * a colored folder-tab on the left marks status at a glance, reference
 * numbers are set in monospace (the way they'd appear on an actual filing),
 * and a thin renewal-decay bar shows how much runway is left before a
 * deadline rather than just stating a date.
 *
 * Fonts: uses the system serif/sans/mono stacks so it renders correctly
 * with zero setup. If you want the intended pairing, install "Source
 * Serif 4" (headings), "Inter" (body) and "IBM Plex Mono" (reference
 * numbers) and swap the font-serif / font-sans / font-mono classes below
 * for your configured font-family utilities.
 */

const TYPE_META = {
  Patent: { icon: Scale, label: "Patent" },
  Trademark: { icon: Stamp, label: "Trademark" },
  Copyright: { icon: Copyright, label: "Copyright" },
};

const STATUS_META = {
  Active: { color: "#3C6E47", bg: "#EAF1EA", label: "Active" },
  Pending: { color: "#A6822C", bg: "#F6EFDD", label: "Pending" },
  "Renewal Due": { color: "#8B2E3F", bg: "#F4E4E6", label: "Renewal due" },
  Expired: { color: "#6B6459", bg: "#EDEAE2", label: "Expired" },
};

const ASSETS = [
  {
    id: "1",
    title: "Adaptive Torque-Vectoring Suspension Assembly",
    type: "Patent",
    ref: "US 11,842,207 B2",
    jurisdiction: "United States",
    filed: "2021-03-14",
    renewal: "2027-03-14",
    status: "Active",
    owner: "R. Alvarez",
    note: "Core claims cover the sensor-feedback loop used in the current drivetrain line.",
  },
  {
    id: "2",
    title: "NIMBUS wordmark",
    type: "Trademark",
    ref: "TM 98,204,551",
    jurisdiction: "European Union",
    filed: "2019-09-02",
    renewal: "2026-09-02",
    status: "Renewal Due",
    owner: "Brand Legal Team",
    note: "Covers Class 9 (software) and Class 42 (SaaS). Renewal declaration due before deadline.",
  },
  {
    id: "3",
    title: "Modular Battery Cooling Manifold",
    type: "Patent",
    ref: "EP 4 201 336 A1",
    jurisdiction: "European Union",
    filed: "2023-01-20",
    renewal: "2026-10-05",
    status: "Renewal Due",
    owner: "R. Alvarez",
    note: "Third annuity payment window opens 90 days before deadline.",
  },
  {
    id: "4",
    title: "Field Documentation Software Suite v3",
    type: "Copyright",
    ref: "TXu 2-345-118",
    jurisdiction: "United States",
    filed: "2024-06-01",
    renewal: "2099-06-01",
    status: "Active",
    owner: "Platform Eng.",
    note: "Registered work; term runs for the life of protection, no action needed.",
  },
  {
    id: "5",
    title: "Gesture-Based Firmware Pairing Method",
    type: "Patent",
    ref: "US 18/402,117",
    jurisdiction: "United States",
    filed: "2024-11-11",
    renewal: "2025-11-11",
    status: "Pending",
    owner: "S. Okafor",
    note: "Awaiting first office action. Examiner assigned in Art Unit 2632.",
  },
  {
    id: "6",
    title: "AURORA device housing (ornamental)",
    type: "Patent",
    ref: "US D1,041,882 S",
    jurisdiction: "United States",
    filed: "2022-05-30",
    renewal: "2036-05-30",
    status: "Active",
    owner: "Design Studio",
    note: "Design patent, 15-year term, no maintenance fees required.",
  },
  {
    id: "7",
    title: "VESTA logo mark",
    type: "Trademark",
    ref: "TM 87,552,003",
    jurisdiction: "United Kingdom",
    filed: "2016-02-18",
    renewal: "2026-02-18",
    status: "Expired",
    owner: "Brand Legal Team",
    note: "Lapsed after renewal window closed. Flagged for possible re-filing.",
  },
  {
    id: "8",
    title: "Distributed Load-Balancing Protocol",
    type: "Patent",
    ref: "PCT/US2024/029841",
    jurisdiction: "PCT (international)",
    filed: "2024-04-09",
    renewal: "2026-04-09",
    status: "Pending",
    owner: "S. Okafor",
    note: "National phase entry deadline approaches across 6 target jurisdictions.",
  },
];

function daysUntil(dateStr) {
  const ms = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(ms / 86400000);
}

// Renewal-decay bar: how much of the ~365-day runway to the deadline
// remains, floored/capped for display.
function decayFraction(dateStr) {
  const days = daysUntil(dateStr);
  const cycle = 365;
  const remaining = Math.max(0, Math.min(cycle, days));
  return remaining / cycle;
}

function decayColor(days) {
  if (days < 0) return "#8B2E3F";
  if (days <= 90) return "#A6822C";
  return "#3C6E47";
}

export default function IPPortfolioManager() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [openId, setOpenId] = useState(null);

  const filtered = useMemo(() => {
    return ASSETS.filter((a) => {
      const matchesType = typeFilter === "All" || a.type === typeFilter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.ref.toLowerCase().includes(q) ||
        a.owner.toLowerCase().includes(q);
      return matchesType && matchesQuery;
    });
  }, [query, typeFilter]);

  const stats = useMemo(() => {
    const total = ASSETS.length;
    const active = ASSETS.filter((a) => a.status === "Active").length;
    const dueSoon = ASSETS.filter(
      (a) => a.status !== "Expired" && daysUntil(a.renewal) <= 90 && daysUntil(a.renewal) >= 0
    ).length;
    const pending = ASSETS.filter((a) => a.status === "Pending").length;
    return { total, active, dueSoon, pending };
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#F5F1E8] font-sans text-[#1C2541]">
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-1 border-b border-[#E4DFD3] pb-6">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8B2E3F]">
            Docket overview
          </span>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#1C2541]">
            IP Portfolio
          </h1>
          <p className="mt-1 text-sm text-[#5B6472]">
            Every patent, trademark, and copyright the org holds, and how much runway is
            left before each one needs attention.
          </p>
        </div>

        {/* Stat strip */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Total assets" value={stats.total} />
          <StatCard label="Active" value={stats.active} accent="#3C6E47" />
          <StatCard label="Renewal ≤ 90 days" value={stats.dueSoon} accent="#8B2E3F" />
          <StatCard label="Pending" value={stats.pending} accent="#A6822C" />
        </div>

        {/* Controls */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9C9484]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, reference, or owner"
              className="w-full rounded-md border border-[#E4DFD3] bg-white py-2 pl-9 pr-3 text-sm text-[#1C2541] placeholder:text-[#9C9484] focus:border-[#1C2541] focus:outline-none focus:ring-2 focus:ring-[#1C2541]/10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", "Patent", "Trademark", "Copyright"].map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  typeFilter === t
                    ? "border-[#1C2541] bg-[#1C2541] text-white"
                    : "border-[#E4DFD3] bg-white text-[#5B6472] hover:border-[#1C2541]/40"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Asset list */}
        <div className="space-y-2">
          {filtered.length === 0 && (
            <div className="rounded-md border border-dashed border-[#E4DFD3] bg-white/60 px-4 py-10 text-center text-sm text-[#9C9484]">
              No assets match this search. Try a different title, reference number, or owner.
            </div>
          )}

          {filtered.map((asset) => {
            const isOpen = openId === asset.id;
            const meta = STATUS_META[asset.status];
            const TypeIcon = TYPE_META[asset.type].icon;
            const days = daysUntil(asset.renewal);
            const barColor = decayColor(days);
            const fraction = decayFraction(asset.renewal);

            return (
              <div
                key={asset.id}
                className="group relative overflow-hidden rounded-md border border-[#E4DFD3] bg-white shadow-sm"
              >
                {/* folder tab */}
                <span
                  className="absolute left-0 top-0 h-full w-1.5"
                  style={{ backgroundColor: meta.color }}
                  aria-hidden="true"
                />

                <button
                  onClick={() => setOpenId(isOpen ? null : asset.id)}
                  className="flex w-full items-center gap-4 py-3.5 pl-5 pr-4 text-left"
                >
                  <TypeIcon className="h-4 w-4 shrink-0 text-[#5B6472]" />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium text-[#1C2541]">
                        {asset.title}
                      </p>
                      <span
                        className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                        style={{ backgroundColor: meta.bg, color: meta.color }}
                      >
                        {meta.label}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate font-mono text-xs text-[#9C9484]">
                      {asset.ref} &middot; {asset.jurisdiction}
                    </p>
                  </div>

                  <div className="hidden w-40 shrink-0 sm:block">
                    <div className="flex items-center justify-between text-[11px] text-[#9C9484]">
                      <span>{asset.status === "Expired" ? "Lapsed" : "Renewal"}</span>
                      <span style={{ color: barColor }} className="font-medium">
                        {days < 0
                          ? `${Math.abs(days)}d overdue`
                          : `${days}d left`}
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[#EDEAE2]">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${Math.max(4, fraction * 100)}%`,
                          backgroundColor: barColor,
                        }}
                      />
                    </div>
                  </div>

                  {isOpen ? (
                    <ChevronDown className="h-4 w-4 shrink-0 text-[#9C9484]" />
                  ) : (
                    <ChevronRight className="h-4 w-4 shrink-0 text-[#9C9484]" />
                  )}
                </button>

                {isOpen && (
                  <div className="border-t border-[#E4DFD3] bg-[#FBFAF6] px-5 py-4 pl-6">
                    <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs sm:grid-cols-4">
                      <div>
                        <dt className="text-[#9C9484]">Filed</dt>
                        <dd className="font-mono text-[#1C2541]">{asset.filed}</dd>
                      </div>
                      <div>
                        <dt className="text-[#9C9484]">Renewal / expiry</dt>
                        <dd className="font-mono text-[#1C2541]">{asset.renewal}</dd>
                      </div>
                      <div>
                        <dt className="text-[#9C9484]">Owner</dt>
                        <dd className="text-[#1C2541]">{asset.owner}</dd>
                      </div>
                      <div>
                        <dt className="text-[#9C9484]">Jurisdiction</dt>
                        <dd className="text-[#1C2541]">{asset.jurisdiction}</dd>
                      </div>
                    </dl>
                    <p className="mt-3 flex gap-1.5 text-xs text-[#5B6472]">
                      <CircleDot className="mt-0.5 h-3 w-3 shrink-0 text-[#9C9484]" />
                      {asset.note}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, accent = "#1C2541" }) {
  return (
    <div className="rounded-md border border-[#E4DFD3] bg-white px-4 py-3">
      <p className="font-serif text-2xl font-semibold" style={{ color: accent }}>
        {value}
      </p>
      <p className="mt-0.5 text-xs text-[#5B6472]">{label}</p>
    </div>
  );
}