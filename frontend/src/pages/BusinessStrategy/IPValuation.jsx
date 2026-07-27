import { useState, useMemo } from "react";
import {
  Wrench,
  Handshake,
  LineChart,
  SlidersHorizontal,
  Info,
} from "lucide-react";

/**
 * IPValuation — luxury navy/gold restyle.
 * -----------------------------------------
 * Same appraisal-workbench concept: pick an asset, adjust the assumptions
 * behind the three standard valuation approaches, watch the blended
 * fair-value estimate — and its seal — update live.
 *
 * Methodology (kept intentionally simple — see disclaimer in the UI):
 *  - Cost approach:    replacement/development cost, less obsolescence.
 *  - Market approach:  a comparable-transaction revenue multiple.
 *  - Income approach:  relief-from-royalty — the present value of the
 *                      royalty an owner is "relieved" from paying by
 *                      owning the asset, over its useful life.
 *
 * Fonts: Playfair Display (headings), Inter (body), IBM Plex Mono (figures)
 * — matching the companion "docket" IP Portfolio component.
 *
 * Styling is Tailwind classNames throughout, including native range-input
 * theming via the `accent-[...]` utility. The only two runtime values
 * bound via `style` are the estimate-range tick position and the range
 * sliders' live percentages — both computed per render from user input,
 * the same treatment a chart or progress control would get anywhere else.
 */

const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
    .val-font-display { font-family: 'Playfair Display', serif; }
    .val-font-body { font-family: 'Inter', sans-serif; }
    .val-font-mono { font-family: 'IBM Plex Mono', monospace; }
  `}</style>
);

const ASSETS = [
  {
    id: "suspension",
    title: "Adaptive Torque-Vectoring Suspension Assembly",
    type: "Patent",
    cost: { developmentCost: 850000, obsolescence: 15 },
    market: { multiple: 2.2, comparableRevenue: 420000 },
    income: {
      projectedRevenue: 620000,
      royaltyRate: 5,
      discountRate: 12,
      usefulLife: 10,
      taxRate: 21,
      growthRate: 4,
    },
  },
  {
    id: "nimbus",
    title: "NIMBUS wordmark",
    type: "Trademark",
    cost: { developmentCost: 120000, obsolescence: 10 },
    market: { multiple: 3.5, comparableRevenue: 260000 },
    income: {
      projectedRevenue: 300000,
      royaltyRate: 3,
      discountRate: 10,
      usefulLife: 15,
      taxRate: 21,
      growthRate: 2,
    },
  },
  {
    id: "loadbalancer",
    title: "Distributed Load-Balancing Protocol",
    type: "Patent (pending)",
    cost: { developmentCost: 640000, obsolescence: 25 },
    market: { multiple: 1.8, comparableRevenue: 180000 },
    income: {
      projectedRevenue: 210000,
      royaltyRate: 4,
      discountRate: 15,
      usefulLife: 8,
      taxRate: 21,
      growthRate: 5,
    },
  },
];

const fmt = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.max(0, n || 0));

function LedgerRow({ label, value, onChange, min, max, step, suffix }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-dashed border-[#082E63]/10 py-2 last:border-b-0">
      <label className="val-font-body text-xs text-[#3a4560]/65">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          className="val-font-mono w-24 rounded-lg border border-[#082E63]/10 bg-white px-2 py-1 text-right text-xs tabular-nums text-[#082E63] focus:border-[#C69A32]/60 focus:outline-none focus:ring-2 focus:ring-[#C69A32]/20"
        />
        {suffix && <span className="w-6 text-xs text-[#082E63]/35">{suffix}</span>}
      </div>
    </div>
  );
}

function MethodCard({ icon: Icon, title, blurb, value, children }) {
  return (
    <div className="rounded-xl border border-[#082E63]/[0.07] bg-white p-5 shadow-[0_10px_28px_-20px_rgba(8,46,99,0.35)] transition-shadow duration-300 hover:shadow-[0_16px_38px_-20px_rgba(198,154,50,0.3)]">
      <div className="mb-1 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#082E63] to-[#0F3D7A] shadow-[0_8px_18px_-8px_rgba(8,46,99,0.5)]">
            <Icon className="h-4 w-4 text-[#E8CD86]" />
          </div>
          <h2 className="val-font-display text-sm font-semibold text-[#082E63]">{title}</h2>
        </div>
        <span className="val-font-mono text-sm font-semibold tabular-nums text-[#082E63]">
          {fmt(value)}
        </span>
      </div>
      <p className="mb-2 text-xs text-[#082E63]/40">{blurb}</p>
      {children}
    </div>
  );
}

export default function IPValuationLuxury() {
  const [assetId, setAssetId] = useState(ASSETS[0].id);
  const [inputs, setInputs] = useState(() => {
    const a = ASSETS.find((x) => x.id === ASSETS[0].id);
    return { cost: { ...a.cost }, market: { ...a.market }, income: { ...a.income } };
  });
  const [weights, setWeights] = useState({ cost: 20, market: 30, income: 50 });

  function selectAsset(id) {
    const a = ASSETS.find((x) => x.id === id);
    setAssetId(id);
    setInputs({ cost: { ...a.cost }, market: { ...a.market }, income: { ...a.income } });
  }

  function updateField(approach, field, value) {
    setInputs((prev) => ({ ...prev, [approach]: { ...prev[approach], [field]: value } }));
  }

  const costValue = useMemo(() => {
    const { developmentCost, obsolescence } = inputs.cost;
    return developmentCost * (1 - obsolescence / 100);
  }, [inputs.cost]);

  const marketValue = useMemo(() => {
    const { multiple, comparableRevenue } = inputs.market;
    return multiple * comparableRevenue;
  }, [inputs.market]);

  const incomeValue = useMemo(() => {
    const { projectedRevenue, royaltyRate, discountRate, usefulLife, taxRate, growthRate } =
      inputs.income;
    let pv = 0;
    for (let t = 1; t <= usefulLife; t++) {
      const revenue = projectedRevenue * Math.pow(1 + growthRate / 100, t - 1);
      const royaltySavings = revenue * (royaltyRate / 100) * (1 - taxRate / 100);
      pv += royaltySavings / Math.pow(1 + discountRate / 100, t);
    }
    return pv;
  }, [inputs.income]);

  const weightTotal = weights.cost + weights.market + weights.income || 1;
  const blended =
    (costValue * weights.cost + marketValue * weights.market + incomeValue * weights.income) /
    weightTotal;

  const low = Math.min(costValue, marketValue, incomeValue);
  const high = Math.max(costValue, marketValue, incomeValue);
  const rangeSpan = high - low || 1;
  const blendedPct = Math.min(100, Math.max(0, ((blended - low) / rangeSpan) * 100));

  const asset = ASSETS.find((a) => a.id === assetId);
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="val-font-body min-h-screen w-full bg-[#F7F8FA] text-[#082E63]">
      <GlobalStyle />

      {/* HERO / WORKBENCH HEADER */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#061B3D] via-[#082E63] to-[#0A2554] px-6 pt-14 pb-10">
        <div className="pointer-events-none absolute -top-16 -right-16 w-[320px] h-[320px] rounded-full bg-[#C69A32]/15 blur-[100px]" />
        <div className="relative mx-auto max-w-5xl">
          <span className="val-font-body text-xs font-semibold uppercase tracking-[0.25em] text-[#C69A32]">
            Appraisal workbench
          </span>
          <h1 className="val-font-display mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-white">
            IP Valuation
          </h1>
          <p className="mt-2 max-w-xl text-sm text-white/55">
            Adjust the assumptions behind each approach and watch the blended estimate move.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Asset selector */}
        <div className="mb-6 flex flex-wrap gap-2">
          {ASSETS.map((a) => (
            <button
              key={a.id}
              onClick={() => selectAsset(a.id)}
              className={`rounded-full border px-3.5 py-1.5 text-left text-xs font-medium transition-all duration-300 ${
                assetId === a.id
                  ? "border-transparent bg-gradient-to-r from-[#C69A32] to-[#E8CD86] text-[#082E63] shadow-[0_8px_20px_-8px_rgba(198,154,50,0.6)]"
                  : "border-[#082E63]/10 bg-white text-[#082E63]/60 hover:border-[#C69A32]/40"
              }`}
            >
              {a.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Left: method inputs */}
          <div className="space-y-4 lg:col-span-3">
            <MethodCard
              icon={Wrench}
              title="Cost approach"
              blurb="What it would cost to recreate the asset today, less obsolescence."
              value={costValue}
            >
              <LedgerRow
                label="Development / replacement cost"
                value={inputs.cost.developmentCost}
                onChange={(v) => updateField("cost", "developmentCost", v)}
                min={0}
                step={5000}
                suffix="$"
              />
              <LedgerRow
                label="Obsolescence adjustment"
                value={inputs.cost.obsolescence}
                onChange={(v) => updateField("cost", "obsolescence", v)}
                min={0}
                max={100}
                step={1}
                suffix="%"
              />
            </MethodCard>

            <MethodCard
              icon={Handshake}
              title="Market approach"
              blurb="What comparable assets have transacted or licensed for."
              value={marketValue}
            >
              <LedgerRow
                label="Comparable revenue multiple"
                value={inputs.market.multiple}
                onChange={(v) => updateField("market", "multiple", v)}
                min={0}
                step={0.1}
                suffix="x"
              />
              <LedgerRow
                label="Comparable annual revenue"
                value={inputs.market.comparableRevenue}
                onChange={(v) => updateField("market", "comparableRevenue", v)}
                min={0}
                step={5000}
                suffix="$"
              />
            </MethodCard>

            <MethodCard
              icon={LineChart}
              title="Income approach"
              blurb="Present value of royalties the owner is relieved from paying."
              value={incomeValue}
            >
              <LedgerRow
                label="Projected annual revenue"
                value={inputs.income.projectedRevenue}
                onChange={(v) => updateField("income", "projectedRevenue", v)}
                min={0}
                step={5000}
                suffix="$"
              />
              <LedgerRow
                label="Royalty rate"
                value={inputs.income.royaltyRate}
                onChange={(v) => updateField("income", "royaltyRate", v)}
                min={0}
                max={25}
                step={0.5}
                suffix="%"
              />
              <LedgerRow
                label="Revenue growth rate"
                value={inputs.income.growthRate}
                onChange={(v) => updateField("income", "growthRate", v)}
                min={-10}
                max={20}
                step={0.5}
                suffix="%"
              />
              <LedgerRow
                label="Discount rate"
                value={inputs.income.discountRate}
                onChange={(v) => updateField("income", "discountRate", v)}
                min={1}
                max={30}
                step={0.5}
                suffix="%"
              />
              <LedgerRow
                label="Useful life"
                value={inputs.income.usefulLife}
                onChange={(v) => updateField("income", "usefulLife", v)}
                min={1}
                max={25}
                step={1}
                suffix="yr"
              />
              <LedgerRow
                label="Tax rate"
                value={inputs.income.taxRate}
                onChange={(v) => updateField("income", "taxRate", v)}
                min={0}
                max={50}
                step={1}
                suffix="%"
              />
            </MethodCard>
          </div>

          {/* Right: blended summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-6 rounded-xl border border-[#082E63]/[0.07] bg-white p-5 shadow-[0_16px_40px_-24px_rgba(8,46,99,0.35)]">
              <p className="val-font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#C69A32]">
                {asset.type}
              </p>
              <h3 className="val-font-display mb-4 text-lg font-semibold leading-snug text-[#082E63]">
                {asset.title}
              </h3>

              {/* Seal */}
              <div className="relative mx-auto mb-5 flex h-40 w-40 items-center justify-center rounded-full border-2 border-[#C69A32]/60">
                <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-gradient-to-br from-[#082E63] to-[#0F3D7A] text-center shadow-[0_0_30px_-6px_rgba(198,154,50,0.4)]">
                  <span className="val-font-body text-[9px] uppercase tracking-[0.2em] text-[#E8CD86]">
                    Estimated
                  </span>
                  <span className="val-font-display mt-1 px-2 text-base font-bold leading-tight text-white">
                    {fmt(blended)}
                  </span>
                  <span className="val-font-body mt-1 text-[8px] uppercase tracking-wide text-white/45">
                    Fair value &middot; {today}
                  </span>
                </div>
              </div>

              {/* Range bar */}
              <div className="mb-5">
                <div className="mb-1 flex justify-between val-font-mono text-[10px] text-[#082E63]/40">
                  <span>{fmt(low)}</span>
                  <span>{fmt(high)}</span>
                </div>
                <div className="relative h-2 rounded-full bg-gradient-to-r from-[#082E63]/15 to-[#C69A32]/25">
                  <div
                    className="absolute -top-1.5 h-5 w-0.5 rounded-full bg-[#082E63]"
                    style={{ left: `${blendedPct}%` }}
                  />
                </div>
                <p className="mt-1 text-center text-[10px] text-[#082E63]/40">
                  Blended estimate within the cost–market–income range
                </p>
              </div>

              {/* Weights */}
              <div className="mb-2 flex items-center gap-2 val-font-body text-xs font-semibold text-[#082E63]">
                <SlidersHorizontal className="h-3.5 w-3.5 text-[#C69A32]" />
                Method weighting
              </div>
              {[
                { key: "cost", label: "Cost", value: costValue },
                { key: "market", label: "Market", value: marketValue },
                { key: "income", label: "Income", value: incomeValue },
              ].map(({ key, label, value }) => (
                <div key={key} className="mb-2">
                  <div className="mb-0.5 flex justify-between text-[11px] text-[#3a4560]/60">
                    <span>
                      {label} &middot; {fmt(value)}
                    </span>
                    <span className="val-font-mono tabular-nums">
                      {Math.round((weights[key] / weightTotal) * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={weights[key]}
                    onChange={(e) =>
                      setWeights((w) => ({ ...w, [key]: Number(e.target.value) }))
                    }
                    className="w-full accent-[#C69A32]"
                  />
                </div>
              ))}

              <div className="mt-4 flex gap-1.5 rounded-xl bg-[#F7F8FA] p-3 text-[10px] leading-snug text-[#3a4560]/60">
                <Info className="mt-0.5 h-3 w-3 shrink-0 text-[#C69A32]" />
                Indicative estimate for internal planning only — not a substitute for a
                qualified valuation professional or a fairness opinion.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}