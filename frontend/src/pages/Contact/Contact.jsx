import React, { useState } from "react";
import {
  getConsultationErrorMessage,
  getConsultationUrl,
  submitConsultation,
} from "../../api/consultation";
import { useConsultationWarmup } from "../../hooks/useConsultationWarmup";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  ChevronRight,
  Stamp,
  ArrowRight,
  Check,
  Lock,
  FileText,
  Award,
  Copyright,
  Shapes,
  Search,
  Globe,
  AlertTriangle,
  Loader2,
} from "lucide-react";

const claims = [
  { icon: FileText, title: "Patent Filing" },
  { icon: Award, title: "Trademarks" },
  { icon: Copyright, title: "Copyright" },
  { icon: Shapes, title: "Industrial Design" },
  { icon: Search, title: "Prior-Art Search" },
  { icon: Globe, title: "PCT Filing" },
];

const serviceOptions = [
  "Patent Services",
  "Trademark Registration",
  "Copyright Registration",
  "Industrial Design Registration",
  "Patent Search Services",
  "Freedom to Operate (FTO)",
  "IP Portfolio Management",
  "Startup IP Services",
  "International Patent Filing (PCT)",
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

const Field = ({ icon: Icon, label, ...props }) => (
  <label className="block">
    <span className="ip-mono mb-1 block text-[9.5px] tracking-[0.13em] text-stone-500">
      {label}
    </span>
    <div className="group flex items-center gap-2.5 rounded-lg border border-stone-200 bg-white px-3 py-2.5 transition-all duration-150 focus-within:border-amber-500 focus-within:ring-4 focus-within:ring-amber-500/10 hover:border-stone-300">
      <Icon size={14} className="shrink-0 text-stone-400 transition-colors group-focus-within:text-amber-600" />
      <input
        {...props}
        className="w-full bg-transparent text-[13px] text-stone-800 placeholder-stone-400 focus:outline-none"
      />
    </div>
  </label>
);

export default function ConsultationCompact() {
  useConsultationWarmup();
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [appNo, setAppNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingText, setLoadingText] = useState("Submitting...");

  const update = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    if (errorMsg) setErrorMsg(""); // clear stale error as soon as they start fixing things
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    // ---- client-side validation (catches issues before we ever hit the network) ----
    if (!form.name.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!form.email.trim() || !isValidEmail(form.email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setLoadingText("Submitting...");

    const timer = setTimeout(() => {
      setLoadingText("Submitting... (Warming up backend server, please wait...)");
    }, 3000);

    let url = null;

    try {
      url = getConsultationUrl();

      const { status, duration, data } = await submitConsultation(form);

      setAppNo(data.appNo || "PENDING");
      setSubmitted(true);
      setForm(initialForm);
    } catch (err) {
      setErrorMsg(getConsultationErrorMessage(err, url));
      setSubmitted(false);
    } finally {
      clearTimeout(timer);
      setLoading(false);
      setLoadingText("Submitting...");
    }
  };

  return (
    <div className="ip-root h-full w-full">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .ip-root { font-family: 'Inter', system-ui, sans-serif; }
        .ip-serif { font-family: 'Fraunces', serif; }
        .ip-mono { font-family: 'IBM Plex Mono', monospace; }
        .blueprint {
          background-image:
            linear-gradient(rgba(217, 179, 92, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(217, 179, 92, 0.06) 1px, transparent 1px);
          background-size: 36px 36px;
        }
        .seal-ring { animation: seal-spin 40s linear infinite; transform-origin: 50% 50%; }
        @keyframes seal-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .chip { opacity: 0; animation: chip-in 0.5s ease forwards; }
        @keyframes chip-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .card-shadow { box-shadow: 0 30px 60px -20px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.5) inset; }
        .fade-in { animation: fade-in 0.4s ease both; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        select.svc { appearance: none; -webkit-appearance: none; }
        .spin { animation: spin 0.8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      <section className="relative flex h-full min-h-[640px] w-full items-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-950 to-blue-950 px-5 py-6 sm:px-8">
        <div className="pointer-events-none absolute inset-0 blueprint" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />

        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          {/* Left content */}
          <div>
            <div className="ip-mono inline-flex items-center gap-2 rounded-full border border-amber-700/40 px-3 py-1 text-[10px] tracking-widest text-amber-500">
              <span>FORM IP&#8209;01</span>
              <span className="text-amber-800">&#183;</span>
              <span>FREE CONSULTATION</span>
            </div>

            <h2 className="ip-serif mt-4 text-3xl font-semibold leading-[1.08] text-white lg:text-[2.6rem]">
              Claim what's yours,
              <br />
              <span className="text-amber-500">first.</span>
            </h2>

            <p className="mt-3 max-w-md text-[13.5px] leading-6 text-slate-400 lg:text-[14.5px]">
              Registered IP attorneys helping founders and enterprises
              protect, manage, and license what they've built.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-2.5">
              {claims.map((c, i) => (
                <div
                  key={c.title}
                  className="chip flex flex-col items-start gap-2 rounded-xl border border-amber-900/30 bg-white/[0.03] px-3 py-3"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <c.icon size={16} className="text-amber-500" />
                  <p className="text-[12px] font-medium leading-tight text-slate-200">
                    {c.title}
                  </p>
                </div>
              ))}
            </div>

            <div className="ip-mono mt-6 hidden items-center gap-4 text-[10.5px] tracking-wide text-slate-500 sm:flex">
              <span className="flex items-center gap-1.5">
                <Lock size={11} /> Confidential review
              </span>
              <span className="text-amber-800">&#183;</span>
              <span>Reply within 24 hrs</span>
            </div>
          </div>

          {/* Right — application card */}
          <div className="relative">
            <div className="absolute -right-3 -top-7 z-20 hidden h-[4.5rem] w-[4.5rem] items-center justify-center sm:flex">
              <svg viewBox="0 0 100 100" className="seal-ring h-full w-full">
                <defs>
                  <path
                    id="sealCirclePath2"
                    d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                  />
                </defs>
                <circle cx="50" cy="50" r="48" fill="none" stroke="#B45309" strokeOpacity="0.35" strokeWidth="1" />
                <text fill="#D97706" fontSize="8" letterSpacing="2" className="ip-mono">
                  <textPath href="#sealCirclePath2">
                    &#183; PROTECTED &#183; REGISTERED &#183; SECURED
                  </textPath>
                </text>
              </svg>
              <div className="absolute flex h-9 w-9 items-center justify-center rounded-full bg-amber-600 shadow-lg">
                <Stamp size={15} className="text-slate-950" />
              </div>
            </div>

            <div className="card-shadow relative rounded-2xl bg-white p-5 lg:p-6">
              {submitted ? (
                <div className="fade-in flex flex-col items-center justify-center py-10 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-600">
                    <Check size={22} className="text-slate-950" />
                  </div>
                  <p className="ip-mono mb-2 text-[9.5px] tracking-widest text-amber-700">
                    APPLICATION NO. {appNo}
                  </p>
                  <h3 className="ip-serif mb-2 text-xl font-semibold text-stone-900">
                    Application received
                  </h3>
                  <p className="mx-auto max-w-xs text-[13px] leading-5 text-stone-500">
                    A registered attorney will review your details and reach
                    out within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <div className="ip-mono mb-3 flex items-center justify-between text-[9px] tracking-widest text-stone-400">
                    <span className="flex items-center gap-1.5 text-emerald-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      OPEN
                    </span>
                  </div>

                  <h3 className="ip-serif mb-4 text-xl font-semibold text-stone-900 lg:text-[1.4rem]">
                    Application for consultation
                  </h3>

                  {/* Error banner — only shown after a failed submit attempt */}
                  {errorMsg && (
                    <div className="fade-in mb-3 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5">
                      <AlertTriangle size={14} className="mt-0.5 shrink-0 text-red-500" />
                      <p className="text-[12.5px] leading-snug text-red-700">{errorMsg}</p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <Field
                        icon={User}
                        label="FULL NAME"
                        type="text"
                        placeholder="Amit Patel"
                        value={form.name}
                        onChange={update("name")}
                        disabled={loading}
                      />
                      <Field
                        icon={Phone}
                        label="PHONE"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={update("phone")}
                        disabled={loading}
                      />
                    </div>

                    <Field
                      icon={Mail}
                      label="EMAIL ADDRESS"
                      type="email"
                      placeholder="amit@company.in"
                      value={form.email}
                      onChange={update("email")}
                      disabled={loading}
                    />

                    <label className="block">
                      <span className="ip-mono mb-1 block text-[9.5px] tracking-[0.13em] text-stone-500">
                        SERVICE OF INTEREST
                      </span>
                      <div className="relative rounded-lg border border-stone-200 bg-white px-3 py-2.5 transition-all duration-150 focus-within:border-amber-500 focus-within:ring-4 focus-within:ring-amber-500/10 hover:border-stone-300">
                        <select
                          value={form.service}
                          onChange={update("service")}
                          disabled={loading}
                          className="svc w-full bg-transparent pr-6 text-[13px] text-stone-800 focus:outline-none"
                        >
                          <option value="">Select an IP service</option>
                          {serviceOptions.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        <ChevronRight
                          size={13}
                          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-stone-400"
                        />
                      </div>
                    </label>

                    <label className="block">
                      <span className="ip-mono mb-1 block text-[9.5px] tracking-[0.13em] text-stone-500">
                        PROJECT DETAILS
                      </span>
                      <div className="group flex items-start gap-2.5 rounded-lg border border-stone-200 bg-white px-3 py-2.5 transition-all duration-150 focus-within:border-amber-500 focus-within:ring-4 focus-within:ring-amber-500/10 hover:border-stone-300">
                        <MessageSquare
                          size={14}
                          className="mt-0.5 shrink-0 text-stone-400 transition-colors group-focus-within:text-amber-600"
                        />
                        <textarea
                          rows="2"
                          placeholder="Describe your IP need, e.g. patent filing, trademark or copyright support"
                          value={form.message}
                          onChange={update("message")}
                          disabled={loading}
                          className="w-full resize-none bg-transparent text-[13px] text-stone-800 placeholder-stone-400 focus:outline-none"
                        />
                      </div>
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!form.name || !form.email || loading}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-amber-600 py-3 text-[13.5px] font-semibold tracking-wide text-slate-950 shadow-lg shadow-amber-600/20 transition-all duration-150 hover:bg-amber-500 hover:shadow-amber-600/30 disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-400 disabled:shadow-none"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={15} className="spin" />
                        {loadingText}
                      </>
                    ) : (
                      <>
                        Submit application
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>

                  <p className="ip-mono mt-3 flex items-center justify-center gap-1.5 text-[9px] tracking-widest text-stone-400">
                    <Lock size={10} />
                    CONFIDENTIAL &#183; ATTORNEY-CLIENT PRIVILEGE
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}