import { useState, useMemo } from "react";
import {
  Search,
  ChevronDown,
  ChevronRight,
  Scale,
  Stamp,
  Copyright,
  CircleDot,
  FolderClock,
} from "lucide-react";

/**
 * IPPortfolioManager — luxury navy/gold restyle.
 * ------------------------------------------------
 * Same docket-style concept: a colored folder-tab marks status at a
 * glance, reference numbers are set in monospace, and a thin renewal-decay
 * bar shows runway left rather than just stating a date.
 *
 * Palette is intentionally limited to navy (#082E63), gold (#C69A32), and
 * white/cream neutrals — the four asset statuses are told apart by tone,
 * weight, and label rather than by introducing new hues (red/green), so
 * status is still legible without relying on color alone.
 *
 * Fonts: Playfair Display (headings), Inter (body), IBM Plex Mono
 * (reference numbers / data — a utility face for filing-style figures).
 *
 * All styling is Tailwind classNames, with one deliberate exception: the
 * renewal-decay bar's fill width is a per-row runtime percentage computed
 * from real dates, so it's bound via `style` rather than faked into a
 * fixed set of Tailwind classes — the same treatment a native progress
 * bar or chart would get.
 */

const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
    .ipm-font-display { font-family: 'Playfair Display', serif; }
    .ipm-font-body { font-family: 'Inter', sans-serif; }
    .ipm-font-mono { font-family: 'IBM Plex Mono', monospace; }
  `}</style>
);

const TYPE_META = {
  Patent: { icon: Scale, label: "Patent" },
  Trademark: { icon: Stamp, label: "Trademark" },
  Copyright: { icon: Copyright, label: "Copyright" },
};

const STATUS_META = {
  Active: {
    label: "Active",
    tab: "bg-[#082E63]",
    badgeBg: "bg-[#082E63]/10",
    badgeText: "text-[#082E63]",
  },
  Pending: {
    label: "Pending",
    tab: "bg-[#C69A32]",
    badgeBg: "bg-[#C69A32]/15",
    badgeText: "text-[#8F723A]",
  },
  "Renewal Due": {
    label: "Renewal due",
    tab: "bg-gradient-to-b from-[#C69A32] to-[#8F723A]",
    badgeBg: "bg-[#C69A32]",
    badgeText: "text-white",
  },
  Expired: {
    label: "Expired",
    tab: "bg-[#082E63]/20",
    badgeBg: "bg-[#082E63]/5",
    badgeText: "text-[#082E63]/40",
  },
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

function decayBarClass(days) {
  if (days < 0) return "bg-gradient-to-r from-[#8F723A] to-[#C69A32]";
  if (days <= 90) return "bg-[#C69A32]";
  return "bg-[#082E63]";
}

function decayLabelClass(days) {
  if (days < 0) return "text-[#8F723A]";
  if (days <= 90) return "text-[#C69A32]";
  return "text-[#082E63]";
}

export default function IPPortfolioManagerLuxury() {
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
    <div className="ipm-font-body min-h-screen w-full bg-[#F7F8FA] text-[#082E63]">
      <GlobalStyle />

      {/* HERO / DOCKET HEADER */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#061B3D] via-[#082E63] to-[#0A2554] px-6 pt-14 pb-10">
        <div className="pointer-events-none absolute -top-16 -left-16 w-[320px] h-[320px] rounded-full bg-[#C69A32]/15 blur-[100px]" />
        <div className="relative mx-auto max-w-5xl">
          <div className="flex items-center gap-2 mb-3">
            <FolderClock size={14} className="text-[#C69A32]" />
            <span className="ipm-font-body text-xs font-semibold uppercase tracking-[0.25em] text-[#C69A32]">
              Docket overview
            </span>
          </div>
          <h1 className="ipm-font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            IP Portfolio
          </h1>
          <p className="mt-2 max-w-xl text-sm text-white/55">
            Every patent, trademark, and copyright the org holds, and how much runway is
            left before each one needs attention.
          </p>

          {/* Stat strip */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard label="Total assets" value={stats.total} />
            <StatCard label="Active" value={stats.active} accent="text-white" />
            <StatCard label="Renewal ≤ 90 days" value={stats.dueSoon} accent="text-[#E8CD86]" />
            <StatCard label="Pending" value={stats.pending} accent="text-[#E8CD86]" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Controls */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#082E63]/35" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, reference, or owner"
              className="w-full rounded-xl border border-[#082E63]/10 bg-white py-2.5 pl-9 pr-3 text-sm text-[#082E63] shadow-sm placeholder:text-[#082E63]/35 focus:border-[#C69A32]/60 focus:outline-none focus:ring-2 focus:ring-[#C69A32]/20"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", "Patent", "Trademark", "Copyright"].map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-300 ${
                  typeFilter === t
                    ? "border-transparent bg-gradient-to-r from-[#C69A32] to-[#E8CD86] text-[#082E63] shadow-[0_8px_20px_-8px_rgba(198,154,50,0.6)]"
                    : "border-[#082E63]/10 bg-white text-[#082E63]/60 hover:border-[#C69A32]/40"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Asset list */}
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="rounded-xl border border-dashed border-[#082E63]/15 bg-white/60 px-4 py-10 text-center text-sm text-[#082E63]/40">
              No assets match this search. Try a different title, reference number, or owner.
            </div>
          )}

          {filtered.map((asset) => {
            const isOpen = openId === asset.id;
            const meta = STATUS_META[asset.status];
            const TypeIcon = TYPE_META[asset.type].icon;
            const days = daysUntil(asset.renewal);
            const barClass = decayBarClass(days);
            const labelClass = decayLabelClass(days);
            const fraction = decayFraction(asset.renewal);
            const widthPct = Math.max(4, Math.round(fraction * 100));

            return (
              <div
                key={asset.id}
                className="group relative overflow-hidden rounded-xl border border-[#082E63]/[0.07] bg-white shadow-[0_10px_28px_-20px_rgba(8,46,99,0.4)] transition-all duration-300 hover:shadow-[0_18px_40px_-20px_rgba(198,154,50,0.3)]"
              >
                {/* folder tab */}
                <span className={`absolute left-0 top-0 h-full w-1.5 ${meta.tab}`} aria-hidden="true" />

                <button
                  onClick={() => setOpenId(isOpen ? null : asset.id)}
                  className="flex w-full items-center gap-4 py-4 pl-5 pr-4 text-left"
                >
                  <TypeIcon className="h-4 w-4 shrink-0 text-[#082E63]/45" />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium text-[#082E63]">
                        {asset.title}
                      </p>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${meta.badgeBg} ${meta.badgeText}`}
                      >
                        {meta.label}
                      </span>
                    </div>
                    <p className="ipm-font-mono mt-0.5 truncate text-xs text-[#082E63]/40">
                      {asset.ref} &middot; {asset.jurisdiction}
                    </p>
                  </div>

                  <div className="hidden w-40 shrink-0 sm:block">
                    <div className="flex items-center justify-between text-[11px] text-[#082E63]/40">
                      <span>{asset.status === "Expired" ? "Lapsed" : "Renewal"}</span>
                      <span className={`font-medium ${labelClass}`}>
                        {days < 0 ? `${Math.abs(days)}d overdue` : `${days}d left`}
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[#082E63]/[0.07]">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${barClass}`}
                        style={{ width: `${widthPct}%` }}
                      />
                    </div>
                  </div>

                  {isOpen ? (
                    <ChevronDown className="h-4 w-4 shrink-0 text-[#082E63]/40" />
                  ) : (
                    <ChevronRight className="h-4 w-4 shrink-0 text-[#082E63]/40" />
                  )}
                </button>

                {isOpen && (
                  <div className="border-t border-[#082E63]/[0.07] bg-[#F7F8FA] px-5 py-4 pl-6">
                    <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs sm:grid-cols-4">
                      <div>
                        <dt className="text-[#082E63]/40">Filed</dt>
                        <dd className="ipm-font-mono text-[#082E63]">{asset.filed}</dd>
                      </div>
                      <div>
                        <dt className="text-[#082E63]/40">Renewal / expiry</dt>
                        <dd className="ipm-font-mono text-[#082E63]">{asset.renewal}</dd>
                      </div>
                      <div>
                        <dt className="text-[#082E63]/40">Owner</dt>
                        <dd className="text-[#082E63]">{asset.owner}</dd>
                      </div>
                      <div>
                        <dt className="text-[#082E63]/40">Jurisdiction</dt>
                        <dd className="text-[#082E63]">{asset.jurisdiction}</dd>
                      </div>
                    </dl>
                    <p className="mt-3 flex gap-1.5 text-xs text-[#082E63]/60">
                      <CircleDot className="mt-0.5 h-3 w-3 shrink-0 text-[#C69A32]" />
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

function StatCard({ label, value, accent = "text-[#082E63]" }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.06] backdrop-blur-xl px-4 py-3.5 shadow-[0_10px_24px_-14px_rgba(0,0,0,0.5)]">
      <p className={`ipm-font-display text-2xl font-semibold ${accent}`}>{value}</p>
      <p className="mt-0.5 text-xs text-white/50">{label}</p>
    </div>
  );
}