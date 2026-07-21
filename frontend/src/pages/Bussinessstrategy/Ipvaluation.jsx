import { useState, useMemo } from "react";
import {
  Wrench,
  Handshake,
  LineChart,
  SlidersHorizontal,
  Info,
} from "lucide-react";

/**
 * IPValuation
 * -----------
 * A single, self-contained IP valuation workbench. Pick an asset, adjust
 * the assumptions behind the three standard valuation approaches, and see
 * a blended fair-value estimate update live. Drop into any React +
 * Tailwind project — no external state, no data fetching.
 *
 * Methodology (kept intentionally simple — see disclaimer in the UI):
 *  - Cost approach:    replacement/development cost, less obsolescence.
 *  - Market approach:  a comparable-transaction revenue multiple.
 *  - Income approach:  relief-from-royalty — the present value of the
 *                      royalty an owner is "relieved" from paying by
 *                      owning the asset, over its useful life.
 *
 * Fonts: system serif/sans/mono stacks so it renders with zero setup.
 * Swap font-serif / font-sans / font-mono for your configured families
 * if you've installed a specific pairing (e.g. Source Serif 4 / Inter /
 * IBM Plex Mono, to match a companion "docket" style component).
 */

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
    <div className="flex items-center justify-between gap-3 border-b border-dashed border-[#E4DFD3] py-2 last:border-b-0">
      <label className="text-xs text-[#5B6472]">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-24 rounded border border-[#E4DFD3] bg-white px-2 py-1 text-right font-mono text-xs tabular-nums text-[#1C2541] focus:border-[#1C2541] focus:outline-none focus:ring-1 focus:ring-[#1C2541]/20"
        />
        {suffix && <span className="w-6 text-xs text-[#9C9484]">{suffix}</span>}
      </div>
    </div>
  );
}

export default function IPValuation() {
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
    <div className="min-h-screen w-full bg-[#F5F1E8] font-sans text-[#1C2541]">
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-1 border-b border-[#E4DFD3] pb-6">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8B2E3F]">
            Appraisal workbench
          </span>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#1C2541]">
            IP Valuation
          </h1>
          <p className="mt-1 text-sm text-[#5B6472]">
            Adjust the assumptions behind each approach and watch the blended estimate move.
          </p>
        </div>

        {/* Asset selector */}
        <div className="mb-6 flex flex-wrap gap-2">
          {ASSETS.map((a) => (
            <button
              key={a.id}
              onClick={() => selectAsset(a.id)}
              className={`rounded-full border px-3 py-1.5 text-left text-xs font-medium transition-colors ${
                assetId === a.id
                  ? "border-[#1C2541] bg-[#1C2541] text-white"
                  : "border-[#E4DFD3] bg-white text-[#5B6472] hover:border-[#1C2541]/40"
              }`}
            >
              {a.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Left: method inputs */}
          <div className="space-y-4 lg:col-span-3">
            {/* Cost approach */}
            <div className="rounded-md border border-[#E4DFD3] bg-white p-4">
              <div className="mb-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-[#5B6472]" />
                  <h2 className="text-sm font-semibold">Cost approach</h2>
                </div>
                <span className="font-mono text-sm font-semibold tabular-nums text-[#1C2541]">
                  {fmt(costValue)}
                </span>
              </div>
              <p className="mb-2 text-xs text-[#9C9484]">
                What it would cost to recreate the asset today, less obsolescence.
              </p>
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
            </div>

            {/* Market approach */}
            <div className="rounded-md border border-[#E4DFD3] bg-white p-4">
              <div className="mb-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Handshake className="h-4 w-4 text-[#5B6472]" />
                  <h2 className="text-sm font-semibold">Market approach</h2>
                </div>
                <span className="font-mono text-sm font-semibold tabular-nums text-[#1C2541]">
                  {fmt(marketValue)}
                </span>
              </div>
              <p className="mb-2 text-xs text-[#9C9484]">
                What comparable assets have transacted or licensed for.
              </p>
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
            </div>

            {/* Income approach */}
            <div className="rounded-md border border-[#E4DFD3] bg-white p-4">
              <div className="mb-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LineChart className="h-4 w-4 text-[#5B6472]" />
                  <h2 className="text-sm font-semibold">Income approach</h2>
                </div>
                <span className="font-mono text-sm font-semibold tabular-nums text-[#1C2541]">
                  {fmt(incomeValue)}
                </span>
              </div>
              <p className="mb-2 text-xs text-[#9C9484]">
                Present value of royalties the owner is relieved from paying.
              </p>
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
            </div>
          </div>

          {/* Right: blended summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-6 rounded-md border border-[#E4DFD3] bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8B2E3F]">
                {asset.type}
              </p>
              <h3 className="mb-4 font-serif text-lg font-semibold leading-snug">
                {asset.title}
              </h3>

              {/* Seal */}
              <div className="mx-auto mb-5 flex h-40 w-40 items-center justify-center rounded-full border-2 border-[#8B2E3F]">
                <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full border border-dashed border-[#8B2E3F] text-center">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#8B2E3F]">
                    Estimated
                  </span>
                  <span className="mt-1 px-2 font-serif text-base font-bold leading-tight text-[#1C2541]">
                    {fmt(blended)}
                  </span>
                  <span className="mt-1 text-[8px] uppercase tracking-wide text-[#9C9484]">
                    Fair value &middot; {today}
                  </span>
                </div>
              </div>

              {/* Range bar */}
              <div className="mb-5">
                <div className="mb-1 flex justify-between text-[10px] text-[#9C9484]">
                  <span>{fmt(low)}</span>
                  <span>{fmt(high)}</span>
                </div>
                <div className="relative h-2 rounded-full bg-[#EDEAE2]">
                  <div
                    className="absolute -top-1.5 h-5 w-0.5 bg-[#1C2541]"
                    style={{ left: `${blendedPct}%` }}
                  />
                </div>
                <p className="mt-1 text-center text-[10px] text-[#9C9484]">
                  Blended estimate within the cost–market–income range
                </p>
              </div>

              {/* Weights */}
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#1C2541]">
                <SlidersHorizontal className="h-3.5 w-3.5 text-[#5B6472]" />
                Method weighting
              </div>
              {[
                { key: "cost", label: "Cost", value: costValue },
                { key: "market", label: "Market", value: marketValue },
                { key: "income", label: "Income", value: incomeValue },
              ].map(({ key, label, value }) => (
                <div key={key} className="mb-2">
                  <div className="mb-0.5 flex justify-between text-[11px] text-[#5B6472]">
                    <span>
                      {label} &middot; {fmt(value)}
                    </span>
                    <span className="font-mono tabular-nums">
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
                    style={{ accentColor: "#1C2541" }}
                    className="w-full"
                  />
                </div>
              ))}

              <div className="mt-4 flex gap-1.5 rounded-md bg-[#F5F1E8] p-3 text-[10px] leading-snug text-[#5B6472]">
                <Info className="mt-0.5 h-3 w-3 shrink-0 text-[#9C9484]" />
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