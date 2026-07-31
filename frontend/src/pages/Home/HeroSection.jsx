import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowRight,
  ScrollText,
  Globe2,
  TrendingUp,
  Stamp,
  Check,
  User,
  Phone,
  Mail,
  MessageSquare,
  ChevronRight,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import heroImage from "../../assets/hero.jpg";

const getApiUrl = () => {
  const configuredUrl = import.meta.env.VITE_API_URL?.trim();
  let baseUrl = null;

  if (configuredUrl) {
    try {
      baseUrl = new URL(configuredUrl).origin;
    } catch (err) {
      baseUrl = null;
    }
  }

  const host = window.location.hostname;
  const isLocalHost = ["localhost", "127.0.0.1", "::1"].includes(host);
  baseUrl = baseUrl || (isLocalHost ? "http://localhost:8080" : "https://perceptive-brains-ip.onrender.com");
  return `${baseUrl.replace(/\/$/, "")}/consultation`;
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/**
 * Hero, right column swapped from the certificate/stats card to a live
 * "Application for consultation" form — the seal badge now stamps the
 * form card instead of a static certificate, so the one interactive
 * element on the page is also the one doing the most work.
 */

const TRUST_MARKERS = [
  { icon: ScrollText, label: "Govt.-registered patent agents" },
  { icon: Globe2, label: "Filings in 150+ countries" },
  { icon: TrendingUp, label: "98% success rate" },
];

const IPC_CODES = [
  "Perceptive Brains IP",
  "Perceptive Brains IP",
  "Perceptive Brains IP",
  "Perceptive Brains IP",
  "Perceptive Brains IP",
];

const SERVICE_OPTIONS = [
  "Patent filing",
  "Trademark registration",
  "Copyright registration",
  "Design registration",
  "IP litigation",
  "Licensing & consultation",
];

function Field({ icon: Icon, label, type, placeholder, value, onChange }) {
  return (
    <label className="block">
      <span className="ip-mono mb-1 block text-[9.5px] tracking-[0.13em] text-stone-500">
        {label}
      </span>
      <div className="flex items-center gap-2.5 rounded-lg border border-stone-200 bg-white px-3 py-2.5 transition-all duration-150 focus-within:border-amber-500 focus-within:ring-4 focus-within:ring-amber-500/10 hover:border-stone-300">
        <Icon size={14} className="shrink-0 text-stone-400" />
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent text-[13px] text-stone-800 placeholder-stone-400 focus:outline-none"
        />
      </div>
    </label>
  );
}

export default function Hero() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [appNo, setAppNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [lastResponse, setLastResponse] = useState(null);

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async () => {
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

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);
    let url = null;

    try {
      try {
        url = getApiUrl();
      } catch (e) {
        throw new Error("Failed to resolve API URL: " + (e.message || e));
      }

      console.log('[hero] submitting to', url, 'payload:', JSON.stringify(form));

      const start = Date.now();
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        signal: controller.signal,
      });

      const duration = Date.now() - start;
      const raw = await res.text();
      let data = null;
      try {
        data = JSON.parse(raw);
      } catch (e) {
        data = raw;
      }

      console.log('[hero] response', { status: res.status, duration: `${duration}ms`, body: data });
      setLastResponse({ status: res.status, duration, body: data });

      if (!res.ok || !(data && data.success)) {
        const errText = typeof data === 'string' ? data : JSON.stringify(data);
        throw new Error(data?.error || `Unexpected response (${res.status}): ${errText}`);
      }

      setAppNo(data.appNo);
      setSubmitted(true);
    } catch (err) {
      const message =
        err.name === "AbortError"
          ? "The server took too long to respond. Please try again in a moment."
          : err instanceof TypeError
          ? "Could not reach the server. Please check your connection and try again."
          : err.message || "Something went wrong. Please try again.";
      setErrorMsg(url ? `${message} (endpoint: ${url})` : message);
      setSubmitted(false);
    } finally {
      window.clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  const heroStyle = {
    backgroundImage: heroImage
      ? `linear-gradient(160deg, rgba(7,13,32,0.96), rgba(7,13,32,0.9)), url(${heroImage})`
      : "linear-gradient(135deg, rgba(7,18,41,0.97), rgba(7,18,41,0.88))",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <section className="relative overflow-hidden bg-cover bg-center" style={heroStyle}>
      {/* Blueprint grid — faint, technical texture instead of flat overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#d6a52a_1px,transparent_1px),linear-gradient(90deg,#d6a52a_1px,transparent_1px)] [background-size:44px_44px]"
      />
      {/* Warm glow anchoring the form card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 -translate-y-1/2 rounded-full bg-[#d6a52a]/15 blur-[100px]"
      />

      {/* IPC classification ticker */}
      <div className="relative z-10 overflow-hidden border-b border-white/10 bg-black/20">
        <div className="ticker-track flex w-max items-center gap-10 whitespace-nowrap py-2.5 font-mono text-[11px] tracking-wide text-[#d6a52a]/70">
          {[...IPC_CODES, ...IPC_CODES].map((code, i) => (
            <span key={i} className="flex items-center gap-10">
              {code}
              <span className="h-1 w-1 rounded-full bg-[#d6a52a]/40" />
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-14 lg:px-8 lg:py-16">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10">
          {/* Left column */}
          <div>
            <p className="mb-5 text-xs uppercase tracking-[4px] text-[#d6a52a]">
              Premier IP legal services · India &amp; global
            </p>

            <h1 className="font-serif text-4xl font-light leading-[1.1] text-white sm:text-5xl lg:text-[3.25rem]">
              Perceptive Brains IP Protecting innovation with precision,{" "}
              <span className="italic text-[#d6a52a]">strategy,<br />legal </span>{" "}
              &amp; excellence.
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-gray-400">
              Perceptive Brains IP is a trusted intellectual property law firm. Delivering trusted Intellectual Property solutions in patents, trademarks, designs, copyrights, and IP strategy to empower innovators and businesses.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact">
                <button className="group flex items-center gap-2 rounded-full bg-[#d6a52a] px-6 py-3 text-sm font-semibold text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-yellow-500 hover:shadow-[0_14px_30px_-10px_rgba(214,165,42,0.6)]">
                  Book free consultation
                  <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </Link>
              <Link
                to="/services"
                className="rounded-full border border-gray-600 px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:border-white hover:bg-white hover:text-black"
              >
                Explore services
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6">
              {TRUST_MARKERS.map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-2 text-xs uppercase tracking-wide text-gray-400">
                  <Icon size={14} className="text-[#d6a52a]" strokeWidth={1.75} />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Right column — application form */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
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
                          placeholder="Rohan Sharma"
                          value={form.name}
                          onChange={update("name")}
                        />
                        <Field
                          icon={Phone}
                          label="PHONE"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={form.phone}
                          onChange={update("phone")}
                        />
                      </div>

                      <Field
                        icon={Mail}
                        label="EMAIL ADDRESS"
                        type="email"
                        placeholder="rohan@company.in"
                        value={form.email}
                        onChange={update("email")}
                      />

                      <label className="block">
                        <span className="ip-mono mb-1 block text-[9.5px] tracking-[0.13em] text-stone-500">
                          SERVICE OF INTEREST
                        </span>
                        <div className="relative rounded-lg border border-stone-200 bg-white px-3 py-2.5 transition-all duration-150 focus-within:border-amber-500 focus-within:ring-4 focus-within:ring-amber-500/10 hover:border-stone-300">
                          <select
                            value={form.service}
                            onChange={update("service")}
                            className="svc w-full bg-transparent pr-6 text-[13px] text-stone-800 focus:outline-none"
                          >
                            <option value="">Select an IP service</option>
                            {SERVICE_OPTIONS.map((s) => (
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
                            placeholder="Describe your IP need, e.g. patent filing, trademark registration or copyright protection"
                            value={form.message}
                            onChange={update("message")}
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
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ticker-track {
          animation: ticker-scroll 32s linear infinite;
        }
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .seal-ring {
          animation: seal-rotate 20s linear infinite;
        }
        @keyframes seal-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .card-shadow {
          box-shadow: 0 30px 60px -20px rgba(10,15,38,0.35), 0 10px 20px -10px rgba(10,15,38,0.15);
        }
        .fade-in {
          animation: fade-in 0.4s ease-out both;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track, .seal-ring, .fade-in { animation: none; }
        }
      `}</style>
    </section>
  );
}
