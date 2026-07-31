import React from "react";
import { Lock, FileText, Award, Copyright, Shapes, Search, Globe } from "lucide-react";
import ContactForm from "./components/ContactForm.jsx";
import { claims, serviceOptions } from "./data/contactData.js";

export default function Contact() {
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

          <div className="relative">
            <ContactForm serviceOptions={serviceOptions} />
          </div>
        </div>
      </section>
    </div>
  );
}
