import React, { useState } from "react";
import {
  getConsultationErrorMessage,
  getConsultationUrl,
  submitConsultation,
} from "../../../api/consultation";
import { useConsultationWarmup } from "../../../hooks/useConsultationWarmup";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  ChevronRight,
  ArrowRight,
  Check,
  Lock,
  AlertTriangle,
  Loader2,
    Stamp,
} from "lucide-react";



const Field = ({ icon: Icon, label, ...props }) => (
  <label className="block">
    <span className="ip-mono mb-1 block text-[9.5px] tracking-[0.13em] text-stone-500">{label}</span>
    <div className="group flex items-center gap-2.5 rounded-lg border border-stone-200 bg-white px-3 py-2.5 transition-all duration-150 focus-within:border-amber-500 focus-within:ring-4 focus-within:ring-amber-500/10 hover:border-stone-300">
      <Icon size={14} className="shrink-0 text-stone-400 transition-colors group-focus-within:text-amber-600" />
      <input
        {...props}
        className="w-full bg-transparent text-[13px] text-stone-800 placeholder-stone-400 focus:outline-none"
      />
    </div>
  </label>
);

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const initialForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

export default function ContactForm({ serviceOptions }) {
  useConsultationWarmup();
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [appNo, setAppNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [lastResponse, setLastResponse] = useState(null);

  const update = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async () => {
    if (loading) return;

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
    setShowSuccess(false);
    setMessage("");

    let url = null;

    try {
      url = getConsultationUrl();
      console.log("[contact-form] submitting to", url, "payload:", JSON.stringify(form));

      const { status, duration, data } = await submitConsultation(form);

      console.log("FULL RESPONSE:", data);
      console.log("[contact-form] response", { status, duration: `${duration}ms`, body: data });
      setLastResponse({ status, duration, body: data });

      if (data.success) {
        setShowSuccess(true);
        setMessage(`Application submitted successfully. Your App No: ${data.appNo}`);
        setAppNo(data.appNo || "PENDING");
        setSubmitted(true);
        setForm(initialForm);
      } else {
        setErrorMsg(getConsultationErrorMessage(new Error(data.error || "Submission failed."), url));
        setSubmitted(false);
      }
    } catch (err) {
      console.log(err);
      setErrorMsg(getConsultationErrorMessage(err, url));
      setSubmitted(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="absolute -right-3 -top-7 z-20 hidden h-[4.5rem] w-[4.5rem] items-center justify-center sm:flex">
        <svg viewBox="0 0 100 100" className="seal-ring h-full w-full">
          <defs>
            <path id="sealCirclePath2" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
          </defs>
          <circle cx="50" cy="50" r="48" fill="none" stroke="#B45309" strokeOpacity="0.35" strokeWidth="1" />
          <text fill="#D97706" fontSize="8" letterSpacing="2" className="ip-mono">
            <textPath href="#sealCirclePath2">
                  PROTECTED • REGISTERED • SECURED
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
            <p className="ip-mono mb-2 text-[9.5px] tracking-widest text-amber-700">APPLICATION NO. {appNo}</p>
            <h3 className="ip-serif mb-2 text-xl font-semibold text-stone-900">Application received</h3>
            {showSuccess && message && (
              <p className="mx-auto mb-3 max-w-xs text-[13px] leading-5 text-emerald-700">
                {message}
              </p>
            )}
            <p className="mx-auto max-w-xs text-[13px] leading-5 text-stone-500">
              A registered attorney will review your details and reach out within 24 hours.
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

            {errorMsg && (
              <div className="fade-in mb-3 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5">
                <AlertTriangle size={14} className="mt-0.5 shrink-0 text-red-500" />
                <p className="text-[12.5px] leading-snug text-red-700">{errorMsg}</p>
              </div>
            )}

            {lastResponse && (
              <div className="mb-3 rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
                <div className="mb-1 font-medium text-slate-800">Last response (debug)</div>
                <div>Status: {lastResponse.status} • Duration: {lastResponse.duration}ms</div>
                <pre className="mt-2 max-h-36 overflow-auto text-[11px]">{JSON.stringify(lastResponse.body, null, 2)}</pre>
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
                <span className="ip-mono mb-1 block text-[9.5px] tracking-[0.13em] text-stone-500">SERVICE OF INTEREST</span>
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
                <span className="ip-mono mb-1 block text-[9.5px] tracking-[0.13em] text-stone-500">PROJECT DETAILS</span>
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
                  Submitting...
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
                CONFIDENTIAL • ATTORNEY-CLIENT PRIVILEGE
            </p>
          </>
        )}
      </div>
    </div>
  )
}