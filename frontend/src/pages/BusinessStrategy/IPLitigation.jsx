import { useState, useMemo } from "react";
import {
  Search,
  ChevronDown,
  ChevronRight,
  Gavel,
  Landmark,
  Users,
  AlertTriangle,
  ShieldAlert,
  Stamp,
  Lock,
  Handshake,
  Clock,
  ArrowUpRight,
} from "lucide-react";

/**
 * LitigationSupport — luxury navy / gold, polish pass
 * ------------------------------------------------------
 * Same palette and data as before. This pass focuses on hierarchy and
 * feedback rather than new colors:
 *  - matters sort by urgency by default, so the docket opens on what
 *    actually needs attention first
 *  - a slim "next up" strip surfaces anything due inside 14 days,
 *    since that's the one thing a litigation team checks first
 *  - each matter type gets its own icon instead of one gavel for all,
 *    so the list reads at a glance before you reach for the filter
 *  - the expand/collapse now animates height instead of popping in
 *  - the deadline countdown is no longer hidden on mobile — it drops
 *    into its own row instead of disappearing
 */

const STATUS_META = {
  Active: { color: "#2F7A4A", bg: "#E8F3EC", label: "Active" },
  "Settlement Pending": { color: "#B8863A", bg: "#FBF1DD", label: "Settlement pending" },
  Closed: { color: "#6B7A94", bg: "#EEF1F6", label: "Closed" },
};

const TYPE_META = {
  "Patent infringement": { icon: Gavel },
  "Trademark opposition": { icon: Stamp },
  "Trade secret": { icon: Lock },
  "Licensing dispute": { icon: Handshake },
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
  if (isClosed) return "#8B95A8";
  if (days < 0) return "#B23A48";
  if (days <= 14) return "#B23A48";
  if (days <= 45) return "#C69A32";
  return "#2F7A4A";
}

export default function LitigationSupport() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [openId, setOpenId] = useState(null);

  const types = ["All", "Patent infringement", "Trademark opposition", "Trade secret", "Licensing dispute"];

  const filtered = useMemo(() => {
    const list = MATTERS.filter((m) => {
      const matchesType = typeFilter === "All" || m.matterType === typeFilter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        m.caption.toLowerCase().includes(q) ||
        m.venue.toLowerCase().includes(q) ||
        m.opposingCounsel.toLowerCase().includes(q);
      return matchesType && matchesQuery;
    });
    // Urgency-first sort: overdue and near-term deadlines surface before
    // closed matters, which sink to the bottom regardless of date.
    return [...list].sort((a, b) => {
      if ((a.status === "Closed") !== (b.status === "Closed")) {
        return a.status === "Closed" ? 1 : -1;
      }
      return daysUntil(a.nextDeadlineDate) - daysUntil(b.nextDeadlineDate);
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

  const nextUp = useMemo(() => {
    return MATTERS.filter((m) => m.status !== "Closed" && daysUntil(m.nextDeadlineDate) <= 14)
      .sort((a, b) => daysUntil(a.nextDeadlineDate) - daysUntil(b.nextDeadlineDate));
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#F8F6EF] font-sans text-[#1c2b47] [font-family:'Inter',ui-sans-serif,system-ui]">
      <style>{`.font-serif { font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif; }`}</style>

      {/* Header band */}
      <div className="relative overflow-hidden bg-[#051B3F] text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_10%_-20%,rgba(198,154,50,0.16),transparent_45%),linear-gradient(180deg,#051B3F_0%,#082E63_80%,#051B3F_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-10%] top-[-20%] h-72 w-72 rounded-full bg-[#C69A32]/15 blur-3xl"
        />
        <div className="relative mx-auto max-w-5xl px-6 pb-10 pt-12">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#C69A32]">
                <span className="h-px w-6 bg-current" />
                Active docket
              </span>
              <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Litigation Support
              </h1>
              <p className="mt-2 text-sm text-white/55">
                Every open dispute, the next thing due, and how close it is.
              </p>
            </div>

            {nextUp.length > 0 && (
              <div className="flex items-center gap-2 rounded-full border border-[#B23A48]/30 bg-[#B23A48]/10 px-4 py-2 text-xs font-medium text-[#ffb3bc]">
                <Clock className="h-3.5 w-3.5" />
                {nextUp.length} matter{nextUp.length > 1 ? "s" : ""} due within 14 days
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Stat strip */}
        <div className="-mt-16 mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard icon={ShieldAlert} label="Active matters" value={stats.active} />
          <StatCard icon={AlertTriangle} label="Deadlines ≤ 30 days" value={stats.dueSoon} accent="#B23A48" />
          <StatCard icon={Gavel} label="Trial / hearing set" value={stats.inHearing} accent="#C69A32" />
          <StatCard icon={Landmark} label="Amount in controversy" value={fmt(stats.exposure)} accent="#082E63" small />
        </div>

        {/* Controls */}
        <div className="sticky top-0 z-10 -mx-6 mb-4 border-b border-[#082E63]/8 bg-[#F8F6EF]/90 px-6 py-3 backdrop-blur-md">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B95A8]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by caption, venue, or counsel"
                className="w-full rounded-full border border-[#082E63]/10 bg-white py-2.5 pl-9 pr-3 text-sm text-[#1c2b47] placeholder:text-[#8B95A8] shadow-sm transition-shadow focus:border-[#082E63]/30 focus:outline-none focus:ring-2 focus:ring-[#C69A32]/20"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                    typeFilter === t
                      ? "border-transparent bg-gradient-to-r from-[#082E63] to-[#0c3a7c] text-white shadow-[0_4px_16px_-4px_rgba(8,46,99,0.4)]"
                      : "border-[#082E63]/10 bg-white text-[#6B7A94] hover:border-[#C69A32]/40 hover:text-[#082E63]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Matter list */}
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed border-[#082E63]/15 bg-white/60 px-4 py-10 text-center text-sm text-[#8B95A8]">
              No matters match this search. Try a different caption, venue, or counsel name.
            </div>
          )}

          {filtered.map((m) => {
            const isOpen = openId === m.id;
            const meta = STATUS_META[m.status];
            const TypeIcon = TYPE_META[m.matterType]?.icon || Gavel;
            const isClosed = m.status === "Closed";
            const days = daysUntil(m.nextDeadlineDate);
            const color = urgencyColor(days, isClosed);
            const isUrgent = !isClosed && days >= 0 && days <= 14;

            return (
              <div
                key={m.id}
                className={`group relative overflow-hidden rounded-2xl border bg-white transition-all ${
                  isOpen
                    ? "border-[#082E63]/15 shadow-[0_16px_40px_-16px_rgba(8,46,99,0.25)]"
                    : "border-[#082E63]/8 shadow-[0_2px_12px_-6px_rgba(8,46,99,0.1)] hover:-translate-y-0.5 hover:border-[#C69A32]/30 hover:shadow-[0_14px_32px_-14px_rgba(8,46,99,0.2)]"
                }`}
              >
                <span
                  className="absolute left-0 top-0 h-full w-1.5"
                  style={{ backgroundColor: meta.color }}
                  aria-hidden="true"
                />

                <button
                  onClick={() => setOpenId(isOpen ? null : m.id)}
                  className="flex w-full flex-col gap-3 py-4 pl-6 pr-4 text-left sm:flex-row sm:items-center sm:gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#082E63]/5 transition-colors group-hover:bg-[#C69A32]/10">
                      <TypeIcon className="h-4 w-4 text-[#082E63]" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate text-sm font-medium text-[#082E63]">{m.caption}</p>
                        <span
                          className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                          style={{ backgroundColor: meta.bg, color: meta.color }}
                        >
                          {meta.label}
                        </span>
                        {isUrgent && (
                          <span className="hidden shrink-0 items-center gap-1 rounded-full bg-[#B23A48]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#B23A48] sm:inline-flex">
                            <AlertTriangle className="h-2.5 w-2.5" /> Urgent
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 truncate text-xs text-[#8B95A8]">
                        {m.matterType} &middot; {m.ourRole} &middot; {m.stage}
                      </p>
                    </div>
                  </div>

                  {/* deadline block — its own row on mobile, aligned column on desktop */}
                  <div className="w-full pl-[3.25rem] sm:w-52 sm:shrink-0 sm:pl-0">
                    <div className="flex items-center justify-between text-[11px] text-[#8B95A8]">
                      <span className="flex items-center gap-1 truncate">
                        {isUrgent && <AlertTriangle className="h-3 w-3 shrink-0 sm:hidden" style={{ color }} />}
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
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#082E63]/8">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: isClosed ? "100%" : `${Math.max(4, Math.min(100, (Math.max(0, days) / 180) * 100))}%`,
                          backgroundColor: color,
                        }}
                      />
                    </div>
                  </div>

                  <div
                    className={`hidden h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors sm:flex ${
                      isOpen ? "bg-[#C69A32]/15" : "bg-transparent group-hover:bg-[#082E63]/5"
                    }`}
                  >
                    {isOpen ? (
                      <ChevronDown className="h-4 w-4 text-[#C69A32]" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-[#8B95A8]" />
                    )}
                  </div>
                </button>

                {/* animated expand/collapse */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-[#082E63]/8 bg-gradient-to-b from-[#F8F6EF] to-white px-6 py-5 pl-8">
                      <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-xs sm:grid-cols-4">
                        <div>
                          <dt className="flex items-center gap-1 text-[#8B95A8]">
                            <Landmark className="h-3 w-3" /> Venue
                          </dt>
                          <dd className="mt-1 text-[#082E63]">{m.venue}</dd>
                        </div>
                        <div>
                          <dt className="text-[#8B95A8]">Judge</dt>
                          <dd className="mt-1 text-[#082E63]">{m.judge}</dd>
                        </div>
                        <div>
                          <dt className="flex items-center gap-1 text-[#8B95A8]">
                            <Users className="h-3 w-3" /> Opposing counsel
                          </dt>
                          <dd className="mt-1 text-[#082E63]">{m.opposingCounsel}</dd>
                        </div>
                        <div>
                          <dt className="text-[#8B95A8]">Filed</dt>
                          <dd className="mt-1 font-mono text-[#082E63]">{m.filed}</dd>
                        </div>
                        <div>
                          <dt className="text-[#8B95A8]">Amount in controversy</dt>
                          <dd className="mt-1 font-mono text-[#082E63]">
                            {fmt(m.amountInControversy)}
                          </dd>
                        </div>
                        <div className="col-span-2 sm:col-span-3">
                          <dt className="text-[#8B95A8]">Notes</dt>
                          <dd className="mt-1 text-[#1c2b47]">{m.notes}</dd>
                        </div>
                      </dl>
                      <button className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-[#082E63]/15 px-4 py-2 text-xs font-semibold text-[#082E63] transition-colors hover:border-[#C69A32]/50 hover:text-[#8B6F2E]">
                        Open full matter file
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, accent = "#082E63", small = false }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#082E63]/8 bg-white px-4 py-4 shadow-[0_10px_30px_-16px_rgba(8,46,99,0.25)] transition-shadow hover:shadow-[0_16px_36px_-16px_rgba(8,46,99,0.3)]">
      <div className="flex items-start justify-between">
        <p
          className={`font-serif font-semibold ${small ? "text-lg" : "text-2xl"}`}
          style={{ color: accent }}
        >
          {value}
        </p>
        {Icon && (
          <div
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${accent}14` }}
          >
            <Icon className="h-3.5 w-3.5" style={{ color: accent }} />
          </div>
        )}
      </div>
      <p className="mt-0.5 text-xs text-[#6B7A94]">{label}</p>
    </div>
  );
}