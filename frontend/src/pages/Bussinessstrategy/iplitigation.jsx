import { useState, useMemo } from "react";
import {
  Search,
  ChevronDown,
  ChevronRight,
  Gavel,
  Landmark,
  Users,
  AlertTriangle,
} from "lucide-react";

/**
 * LitigationSupport
 * -----------------
 * A single, self-contained litigation/dispute docket for an IP practice.
 * Pairs with IPPortfolioManager and IPValuation in the same visual system
 * (ink navy / parchment / seal crimson / brass gold), but tracks active
 * disputes — infringement suits, TTAB oppositions, trade-secret claims,
 * licensing arbitrations — instead of filed assets.
 *
 * Signature element: reuses the folder-tab + deadline-decay pattern from
 * the portfolio manager, but the countdown now tracks the next *court or
 * filing deadline* rather than a renewal date, and rows nearing a
 * deadline surface a warning flag rather than just a colored bar — the
 * consequence of missing a litigation deadline is sharper than a lapsed
 * renewal, so it earns a more direct signal.
 *
 * Fonts: system serif/sans/mono stacks — swap for your installed
 * families to match the rest of the suite.
 */

const STATUS_META = {
  Active: { color: "#3C6E47", bg: "#EAF1EA", label: "Active" },
  "Settlement Pending": { color: "#A6822C", bg: "#F6EFDD", label: "Settlement pending" },
  Closed: { color: "#6B6459", bg: "#EDEAE2", label: "Closed" },
};

const MATTERS = [
  {
    id: "1",
    caption: "Meridian Robotics v. Kessler Dynamics",
    matterType: "Patent infringement",
    ourRole: "Plaintiff",
    venue: "U.S. District Court, D. Delaware",
    judge: "Hon. J. Alvarez",
    opposingCounsel: "Whitfield & Cross LLP",
    filed: "2024-08-01",
    stage: "Discovery",
    status: "Active",
    nextDeadlineLabel: "Expert disclosure deadline",
    nextDeadlineDate: "2026-08-14",
    amountInControversy: null,
    notes: "We're asserting the suspension-assembly patent. Fact discovery closes next quarter.",
  },
  {
    id: "2",
    caption: "Kessler Dynamics v. Meridian Robotics (countersuit)",
    matterType: "Patent infringement",
    ourRole: "Defendant",
    venue: "U.S. District Court, D. Delaware",
    judge: "Hon. J. Alvarez",
    opposingCounsel: "Whitfield & Cross LLP",
    filed: "2024-09-12",
    stage: "Motion practice",
    status: "Active",
    nextDeadlineLabel: "Markman hearing",
    nextDeadlineDate: "2026-07-29",
    amountInControversy: 4200000,
    notes: "Consolidated with the matter above before the same judge. Claim construction briefing is complete.",
  },
  {
    id: "3",
    caption: "NIMBUS opposition — TTAB No. 91-284,552",
    matterType: "Trademark opposition",
    ourRole: "Opposer",
    venue: "Trademark Trial and Appeal Board",
    judge: "—",
    opposingCounsel: "Draycott IP Law",
    filed: "2025-02-10",
    stage: "Briefing",
    status: "Active",
    nextDeadlineLabel: "Reply brief due",
    nextDeadlineDate: "2026-07-24",
    amountInControversy: null,
    notes: "Opposing an application we believe is confusingly similar to the NIMBUS mark.",
  },
  {
    id: "4",
    caption: "Halbrook Systems — trade secret misappropriation",
    matterType: "Trade secret",
    ourRole: "Defendant",
    venue: "Superior Court of California, Santa Clara County",
    judge: "Hon. R. Okonkwo",
    opposingCounsel: "Bramwell Gerst LLP",
    filed: "2025-05-19",
    stage: "Pre-trial",
    status: "Active",
    nextDeadlineLabel: "Trial date",
    nextDeadlineDate: "2026-08-03",
    amountInControversy: 12000000,
    notes: "Former employee allegations. Depositions of both technical leads are complete.",
  },
  {
    id: "5",
    caption: "VESTA mark opposition — UKIPO",
    matterType: "Trademark opposition",
    ourRole: "Applicant",
    venue: "UK Intellectual Property Office",
    judge: "—",
    opposingCounsel: "Sabine & Rowe Solicitors",
    filed: "2025-11-03",
    stage: "Evidence rounds",
    status: "Active",
    nextDeadlineLabel: "Evidence deadline",
    nextDeadlineDate: "2026-09-30",
    amountInControversy: null,
    notes: "Defending our application after a third party opposed on prior-mark grounds.",
  },
  {
    id: "6",
    caption: "Distributed Load-Balancer licensing dispute",
    matterType: "Licensing dispute",
    ourRole: "Respondent",
    venue: "AAA Commercial Arbitration",
    judge: "Panel: 1 arbitrator",
    opposingCounsel: "Ferris & Okonjo LLP",
    filed: "2025-12-01",
    stage: "Arbitration",
    status: "Settlement Pending",
    nextDeadlineLabel: "Arbitration hearing",
    nextDeadlineDate: "2026-07-21",
    amountInControversy: 850000,
    notes: "Dispute over royalty calculation under the 2023 licensing agreement. Settlement talks ongoing.",
  },
  {
    id: "7",
    caption: "Aurora housing design — infringement demand withdrawn",
    matterType: "Patent infringement",
    ourRole: "Defendant",
    venue: "N/A",
    judge: "—",
    opposingCounsel: "—",
    filed: "2025-01-15",
    stage: "Closed",
    status: "Closed",
    nextDeadlineLabel: "No further action",
    nextDeadlineDate: "2025-04-01",
    amountInControversy: null,
    notes: "Demand letter withdrawn after we produced prior-art evidence predating their filing.",
  },
];

const fmt = (n) =>
  n == null
    ? "N/A"
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(n);

function daysUntil(dateStr) {
  const ms = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(ms / 86400000);
}

function urgencyColor(days, isClosed) {
  if (isClosed) return "#9C9484";
  if (days < 0) return "#8B2E3F";
  if (days <= 14) return "#8B2E3F";
  if (days <= 45) return "#A6822C";
  return "#3C6E47";
}

export default function LitigationSupport() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [openId, setOpenId] = useState(null);

  const types = ["All", "Patent infringement", "Trademark opposition", "Trade secret", "Licensing dispute"];

  const filtered = useMemo(() => {
    return MATTERS.filter((m) => {
      const matchesType = typeFilter === "All" || m.matterType === typeFilter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        m.caption.toLowerCase().includes(q) ||
        m.venue.toLowerCase().includes(q) ||
        m.opposingCounsel.toLowerCase().includes(q);
      return matchesType && matchesQuery;
    });
  }, [query, typeFilter]);

  const stats = useMemo(() => {
    const active = MATTERS.filter((m) => m.status !== "Closed").length;
    const dueSoon = MATTERS.filter(
      (m) => m.status !== "Closed" && daysUntil(m.nextDeadlineDate) <= 30 && daysUntil(m.nextDeadlineDate) >= 0
    ).length;
    const exposure = MATTERS.filter((m) => m.status !== "Closed" && m.ourRole !== "Plaintiff" && m.ourRole !== "Opposer" && m.ourRole !== "Applicant")
      .reduce((sum, m) => sum + (m.amountInControversy || 0), 0);
    const inHearing = MATTERS.filter(
      (m) => m.status !== "Closed" && /trial|hearing|markman/i.test(m.nextDeadlineLabel)
    ).length;
    return { active, dueSoon, exposure, inHearing };
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#F5F1E8] font-sans text-[#1C2541]">
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-1 border-b border-[#E4DFD3] pb-6">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8B2E3F]">
            Active docket
          </span>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#1C2541]">
            Litigation Support
          </h1>
          <p className="mt-1 text-sm text-[#5B6472]">
            Every open dispute, the next thing due, and how close it is.
          </p>
        </div>

        {/* Stat strip */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Active matters" value={stats.active} />
          <StatCard label="Deadlines ≤ 30 days" value={stats.dueSoon} accent="#8B2E3F" />
          <StatCard label="Trial / hearing set" value={stats.inHearing} accent="#A6822C" />
          <StatCard label="Amount in controversy" value={fmt(stats.exposure)} accent="#1C2541" small />
        </div>

        {/* Controls */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9C9484]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by caption, venue, or counsel"
              className="w-full rounded-md border border-[#E4DFD3] bg-white py-2 pl-9 pr-3 text-sm text-[#1C2541] placeholder:text-[#9C9484] focus:border-[#1C2541] focus:outline-none focus:ring-2 focus:ring-[#1C2541]/10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {types.map((t) => (
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

        {/* Matter list */}
        <div className="space-y-2">
          {filtered.length === 0 && (
            <div className="rounded-md border border-dashed border-[#E4DFD3] bg-white/60 px-4 py-10 text-center text-sm text-[#9C9484]">
              No matters match this search. Try a different caption, venue, or counsel name.
            </div>
          )}

          {filtered.map((m) => {
            const isOpen = openId === m.id;
            const meta = STATUS_META[m.status];
            const isClosed = m.status === "Closed";
            const days = daysUntil(m.nextDeadlineDate);
            const color = urgencyColor(days, isClosed);
            const isUrgent = !isClosed && days >= 0 && days <= 14;

            return (
              <div
                key={m.id}
                className="group relative overflow-hidden rounded-md border border-[#E4DFD3] bg-white shadow-sm"
              >
                <span
                  className="absolute left-0 top-0 h-full w-1.5"
                  style={{ backgroundColor: meta.color }}
                  aria-hidden="true"
                />

                <button
                  onClick={() => setOpenId(isOpen ? null : m.id)}
                  className="flex w-full items-center gap-4 py-3.5 pl-5 pr-4 text-left"
                >
                  <Gavel className="h-4 w-4 shrink-0 text-[#5B6472]" />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium text-[#1C2541]">{m.caption}</p>
                      <span
                        className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                        style={{ backgroundColor: meta.bg, color: meta.color }}
                      >
                        {meta.label}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-[#9C9484]">
                      {m.matterType} &middot; {m.ourRole} &middot; {m.stage}
                    </p>
                  </div>

                  <div className="hidden w-52 shrink-0 sm:block">
                    <div className="flex items-center justify-between text-[11px] text-[#9C9484]">
                      <span className="flex items-center gap-1 truncate">
                        {isUrgent && <AlertTriangle className="h-3 w-3 shrink-0" style={{ color }} />}
                        {m.nextDeadlineLabel}
                      </span>
                      <span style={{ color }} className="shrink-0 font-medium">
                        {isClosed
                          ? "—"
                          : days < 0
                          ? `${Math.abs(days)}d overdue`
                          : `${days}d left`}
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[#EDEAE2]">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: isClosed ? "100%" : `${Math.max(4, Math.min(100, (Math.max(0, days) / 180) * 100))}%`,
                          backgroundColor: color,
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
                    <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs sm:grid-cols-4">
                      <div>
                        <dt className="flex items-center gap-1 text-[#9C9484]">
                          <Landmark className="h-3 w-3" /> Venue
                        </dt>
                        <dd className="mt-0.5 text-[#1C2541]">{m.venue}</dd>
                      </div>
                      <div>
                        <dt className="text-[#9C9484]">Judge</dt>
                        <dd className="mt-0.5 text-[#1C2541]">{m.judge}</dd>
                      </div>
                      <div>
                        <dt className="flex items-center gap-1 text-[#9C9484]">
                          <Users className="h-3 w-3" /> Opposing counsel
                        </dt>
                        <dd className="mt-0.5 text-[#1C2541]">{m.opposingCounsel}</dd>
                      </div>
                      <div>
                        <dt className="text-[#9C9484]">Filed</dt>
                        <dd className="mt-0.5 font-mono text-[#1C2541]">{m.filed}</dd>
                      </div>
                      <div>
                        <dt className="text-[#9C9484]">Amount in controversy</dt>
                        <dd className="mt-0.5 font-mono text-[#1C2541]">
                          {fmt(m.amountInControversy)}
                        </dd>
                      </div>
                      <div className="col-span-2 sm:col-span-3">
                        <dt className="text-[#9C9484]">Notes</dt>
                        <dd className="mt-0.5 text-[#1C2541]">{m.notes}</dd>
                      </div>
                    </dl>
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

function StatCard({ label, value, accent = "#1C2541", small = false }) {
  return (
    <div className="rounded-md border border-[#E4DFD3] bg-white px-4 py-3">
      <p
        className={`font-serif font-semibold ${small ? "text-lg" : "text-2xl"}`}
        style={{ color: accent }}
      >
        {value}
      </p>
      <p className="mt-0.5 text-xs text-[#5B6472]">{label}</p>
    </div>
  );
}