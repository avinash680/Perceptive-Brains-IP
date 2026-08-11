import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageMeta from "../../../components/PageMeta";
import {
  BookOpen, Music2, Code2, ShieldCheck, Scale, FileCheck2,
  Clock3, Landmark, Fingerprint, Tag, CircleCheck, Sparkles,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Fonts + keyframes only — every element below styles itself with   */
/*  className alone, nothing is applied via a style attribute.        */
/* ------------------------------------------------------------------ */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

    .cr-font-display { font-family: 'Playfair Display', serif; }
    .cr-font-body { font-family: 'Inter', sans-serif; }

    @keyframes cr-float-a { 0%,100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-18px) translateX(6px); } }
    @keyframes cr-float-b { 0%,100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(14px) translateX(-8px); } }
    @keyframes cr-spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes cr-spin-slow-rev { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
    @keyframes cr-glow-pulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
    @keyframes cr-fill { from { width: 0%; } }

    .cr-animate-float-a { animation: cr-float-a 7s ease-in-out infinite; }
    .cr-animate-float-b { animation: cr-float-b 8.5s ease-in-out infinite; }
    .cr-animate-spin-slow { animation: cr-spin-slow 24s linear infinite; }
    .cr-animate-spin-slow-rev { animation: cr-spin-slow-rev 32s linear infinite; }
    .cr-animate-glow { animation: cr-glow-pulse 4s ease-in-out infinite; }
    .cr-fill { animation: cr-fill 1.2s cubic-bezier(.2,.7,.2,1) both; }

    @media (prefers-reduced-motion: reduce) {
      .cr-animate-float-a, .cr-animate-float-b, .cr-animate-spin-slow, .cr-animate-spin-slow-rev, .cr-animate-glow, .cr-fill { animation: none; }
    }
  `}</style>
);

/* ------------------------------------------------------------------ */
/*  Reusable pieces                                                     */
/* ------------------------------------------------------------------ */
const Eyebrow = ({ children }) => (
  <p className="cr-font-body text-xs tracking-[0.3em] text-[#C69A32] font-semibold mb-3 flex items-center gap-2">
    <span className="inline-block w-6 h-px bg-[#C69A32]" />
    {children}
  </p>
);

const GradientHeading = ({ children, className = "" }) => (
  <h2
    className={`cr-font-display font-semibold leading-[1.05] bg-clip-text text-transparent bg-gradient-to-br from-[#082E63] via-[#0F3D7A] to-[#C69A32] ${className}`}
  >
    {children}
  </h2>
);

const GlassCard = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#C69A32]/40 hover:shadow-[0_28px_70px_-20px_rgba(198,154,50,0.25)] ${className}`}
  >
    {children}
  </div>
);

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */
const categories = {
  litInd: {
    label: "Literary / Artistic",
    sub: "Individual applicant",
    icon: BookOpen,
    fee: "INR 500",
    feeNote: "per work",
    duration: "Life of author + 60 yrs",
    docs: ["Form XIV application", "Copy of the manuscript or artwork", "NOC from author, if applicant differs", "Fee receipt"],
  },
  litOrg: {
    label: "Literary / Artistic",
    sub: "Organization applicant",
    icon: Landmark,
    fee: "INR 2,000",
    feeNote: "per work",
    duration: "Life of author + 60 yrs",
    docs: ["Form XIV application", "Copy of the manuscript or artwork", "Power of attorney for the filing agent", "Fee receipt"],
  },
  software: {
    label: "Software",
    sub: "Any applicant",
    icon: Code2,
    fee: "INR 5,000",
    feeNote: "per work",
    duration: "60 yrs from publication",
    docs: ["Form XIV application", "Source code", "Technical write-up", "User manual", "Fee receipt"],
  },
  av: {
    label: "Film / Sound Recording",
    sub: "Any applicant",
    icon: Music2,
    fee: "Varies",
    feeNote: "confirm current fee",
    duration: "60 yrs from publication",
    docs: ["Form XIV application", "Copy or representation of the work", "NOC from author, if applicant differs", "Fee receipt"],
  },
};

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */
export default function CopyrightRegistration() {
  const [cat, setCat] = useState("litInd");
  const c = categories[cat];

  return (
    <div className="cr-font-body min-h-screen w-full bg-[#061B3D]">
      <GlobalStyle />
      <PageMeta
        title="Copyright Registration Services in India | Perceptive Brains"
        description="Copyright registration services to protect software, creative works, and artistic content under Indian law."
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#061B3D] via-[#082E63] to-[#0A2554] pt-24 pb-24 px-6">
        <div className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-[#C69A32]/20 blur-[110px] cr-animate-glow" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-[460px] h-[460px] rounded-full bg-[#0F3D7A]/40 blur-[130px]" />

        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          <div>
            <Eyebrow>GOVERNED BY THE COPYRIGHT ACT, 1957</Eyebrow>
            <h1 className="cr-font-display text-6xl sm:text-7xl leading-[0.98] font-bold text-white">
              Copyright
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C69A32] to-[#E8CD86]">Registration</span>
            </h1>
            <p className="mt-7 max-w-lg text-[16px] leading-relaxed text-white/60">
              Protection arises the moment an original work is created.
              Registration doesn't create that right — it gives you evidence
              of it, and a much shorter path to damages if it's infringed.
            </p>
            <div className="mt-9 flex gap-4 flex-wrap items-center">
              <Link
                to="/services/copyright-registration#certificate"
                className="cr-font-body text-sm font-semibold px-6 py-3.5 rounded-full inline-flex items-center gap-2 bg-gradient-to-r from-[#C69A32] to-[#E8CD86] text-[#082E63] shadow-[0_10px_30px_-8px_rgba(198,154,50,0.7)] hover:scale-[1.04] transition-transform duration-300"
              >
                Build Your Certificate
                <Sparkles size={15} />
              </Link>
              <span className="cr-font-body text-xs tracking-wide text-white/50">4 work categories, one form</span>
            </div>
          </div>

          {/* specimen certificate — floating glass card + seal */}
          <div className="relative">
            <div className="cr-animate-float-a absolute -top-6 -left-6 w-14 h-14 rounded-xl border border-white/10 bg-white/[0.06] backdrop-blur-xl flex items-center justify-center shadow-[0_16px_40px_-18px_rgba(0,0,0,0.6)] z-20">
              <ShieldCheck size={20} className="text-[#E8CD86]" />
            </div>

            <div className="relative rounded-2xl border border-[#C69A32]/25 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl p-8 sm:p-10 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.7)]">
              <p className="cr-font-body text-[10px] tracking-[0.3em] mb-1 text-[#E8CD86]">SPECIMEN — FORM XIV</p>
              <p className="cr-font-display text-2xl font-semibold mb-6 text-white">Certificate of Registration</p>

              <div className="space-y-3 relative z-10">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-xs text-white/50">Class of work</span>
                  <span className="cr-font-body text-xs font-medium text-white">Literary</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-xs text-white/50">Term of protection</span>
                  <span className="cr-font-body text-xs font-medium text-white">Life + 60 yrs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-white/50">Status</span>
                  <span className="cr-font-body text-xs font-medium text-[#E8CD86]">● REGISTERED</span>
                </div>
              </div>

              {/* seal */}
              <div className="absolute -bottom-8 -right-8 w-24 h-24">
                <svg viewBox="0 0 96 96" className="cr-animate-spin-slow-rev absolute inset-0">
                  <circle cx="48" cy="48" r="44" fill="none" stroke="#C69A32" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="1.5 3" />
                </svg>
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#0F3D7A] to-[#061B3D] border border-[#C69A32]/50 flex items-center justify-center shadow-[0_0_30px_-4px_rgba(198,154,50,0.5)]">
                  <span className="cr-font-display text-2xl font-bold text-[#E8CD86]">©</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY REGISTER */}
      <section className="bg-[#F7F8FA] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Eyebrow>01 — THE CASE FOR FILING</Eyebrow>
          <GradientHeading className="text-4xl sm:text-5xl mb-14">Why register, if it's automatic</GradientHeading>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { t: "Evidence of ownership", d: "A registered date and record make infringement claims far easier to prove.", icon: ShieldCheck },
              { t: "Legal standing", d: "Registration supports suing infringers and claiming statutory damages.", icon: Scale },
              { t: "Commercial value", d: "A registered copyright can back a loan or anchor a licensing deal.", icon: FileCheck2 },
            ].map((b, i) => (
              <div
                key={b.t}
                className="group rounded-2xl bg-white border border-[#082E63]/[0.06] p-7 shadow-[0_16px_40px_-24px_rgba(8,46,99,0.35)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_60px_-24px_rgba(198,154,50,0.35)] hover:border-[#C69A32]/40"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#082E63] to-[#0F3D7A] flex items-center justify-center shadow-[0_10px_24px_-8px_rgba(8,46,99,0.5)] group-hover:scale-110 transition-transform duration-500">
                    <b.icon size={20} className="text-[#E8CD86]" />
                  </div>
                  <span className="cr-font-body text-xs text-[#3a4560]/50">0{i + 1}</span>
                </div>
                <p className="cr-font-display text-lg font-semibold text-[#082E63] mb-2">{b.t}</p>
                <p className="text-sm leading-relaxed text-[#3a4560]/70">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATE BUILDER */}
      <section id="certificate" className="bg-gradient-to-b from-[#082E63] to-[#0A2554] py-24 px-6 relative overflow-hidden">
        <div className="pointer-events-none absolute top-1/3 right-0 w-[380px] h-[380px] rounded-full bg-[#C69A32]/10 blur-[120px]" />
        <div className="relative max-w-6xl mx-auto">
          <Eyebrow>02 — INTERACTIVE</Eyebrow>
          <h2 className="cr-font-display text-4xl sm:text-5xl font-semibold mb-3 text-white">What your filing looks like</h2>
          <p className="max-w-xl text-sm leading-relaxed mb-10 text-white/55">
            Fee, protection term, and required documents all shift with the
            kind of work. Choose one to see it laid out.
          </p>

          <div className="grid sm:grid-cols-4 gap-3 mb-8">
            {Object.entries(categories).map(([key, val]) => {
              const active = cat === key;
              return (
                <button
                  key={key}
                  onClick={() => setCat(key)}
                  className={`text-left p-4 rounded-xl border flex items-start gap-3 transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-br from-white/[0.12] to-white/[0.04] border-[#C69A32]/60 shadow-[0_16px_36px_-16px_rgba(198,154,50,0.35)]"
                      : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20"
                  }`}
                >
                  <val.icon size={18} className={`mt-0.5 shrink-0 ${active ? "text-[#E8CD86]" : "text-white/50"}`} />
                  <span>
                    <span className={`block text-xs font-medium leading-tight ${active ? "text-white" : "text-white/70"}`}>{val.label}</span>
                    <span className="block cr-font-body text-[10px] mt-1 text-white/40">{val.sub}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <GlassCard className="p-8 sm:p-12">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C69A32] to-[#E8CD86] flex items-center justify-center shrink-0 shadow-[0_10px_24px_-8px_rgba(198,154,50,0.5)]">
                <c.icon size={20} className="text-[#082E63]" />
              </div>
              <div>
                <p className="cr-font-display text-xl font-semibold leading-tight text-white">{c.label}</p>
                <p className="cr-font-body text-[11px] tracking-wide text-[#E8CD86]">{c.sub.toUpperCase()}</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="cr-font-body text-[11px] tracking-wide mb-2 text-[#E8CD86]">REGISTRATION FEE</p>
                <p className="cr-font-display text-3xl leading-none text-white">{c.fee}</p>
                <p className="text-xs mt-1 text-white/45">{c.feeNote}</p>
              </div>
              <div>
                <p className="cr-font-body text-[11px] tracking-wide mb-2 text-[#E8CD86]">PROTECTION TERM</p>
                <p className="cr-font-display text-3xl leading-none text-white">{c.duration}</p>
              </div>
            </div>

            <p className="cr-font-body text-[11px] tracking-wide mb-3 pt-6 border-t border-white/10 text-[#E8CD86]">
              DOCUMENTS REQUIRED
            </p>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
              {c.docs.map((d) => (
                <div key={d} className="flex items-start gap-2">
                  <CircleCheck size={15} className="mt-0.5 shrink-0 text-[#C69A32]" />
                  <p className="text-sm leading-relaxed text-white/70">{d}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* DURATION TIMELINE */}
      <section className="bg-[#F7F8FA] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Eyebrow>03 — HOW LONG IT LASTS</Eyebrow>
          <GradientHeading className="text-4xl sm:text-5xl mb-14">Two clocks, two starting lines</GradientHeading>

          <div className="space-y-10">
            <div>
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <p className="font-medium flex items-center gap-2 text-[#082E63]">
                  <Clock3 size={16} className="text-[#C69A32]" />
                  Life of author + 60 years
                </p>
                <span className="cr-font-body text-xs text-[#3a4560]/50">literary · dramatic · musical · artistic</span>
              </div>
              <div className="h-2 w-full rounded-full bg-[#082E63]/10 overflow-hidden">
                <div className="cr-fill h-full w-[88%] rounded-full bg-gradient-to-r from-[#8F723A] to-[#C69A32]" />
              </div>
              <p className="text-xs mt-2 text-[#3a4560]/60">Starts at creation, runs the length of a life, then 60 years more.</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <p className="font-medium flex items-center gap-2 text-[#082E63]">
                  <Clock3 size={16} className="text-[#0F3D7A]" />
                  60 years from publication
                </p>
                <span className="cr-font-body text-xs text-[#3a4560]/50">film · sound recording · software</span>
              </div>
              <div className="h-2 w-full rounded-full bg-[#082E63]/10 overflow-hidden">
                <div className="cr-fill h-full w-[45%] rounded-full bg-gradient-to-r from-[#082E63] to-[#0F3D7A]" />
              </div>
              <p className="text-xs mt-2 text-[#3a4560]/60">Starts at publication, not creation — and follows the work, not a person.</p>
            </div>
          </div>
        </div>
      </section>

      {/* COPYRIGHT VS TRADEMARK */}
      <section className="bg-gradient-to-b from-[#0A2554] to-[#061B3D] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Eyebrow>04 — DON'T CONFUSE THE TWO</Eyebrow>
          <h2 className="cr-font-display text-4xl sm:text-5xl font-semibold mb-14 text-white">Copyright, not trademark</h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <GlassCard className="p-9">
              <Fingerprint size={26} className="text-[#E8CD86] mb-5" />
              <p className="cr-font-display text-2xl font-semibold mb-3 text-white">Copyright</p>
              <p className="text-sm leading-relaxed text-white/60">
                Protects original works of authorship — books, music, art,
                film, software — giving the creator exclusive rights over
                their own creation.
              </p>
            </GlassCard>
            <GlassCard className="p-9">
              <Tag size={26} className="text-[#E8CD86] mb-5" />
              <p className="cr-font-display text-2xl font-semibold mb-3 text-white">Trademark</p>
              <p className="text-sm leading-relaxed text-white/60">
                Protects brand names, logos, and symbols — the marks that
                identify whose goods or services you're looking at.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>
    </div>
  );
}