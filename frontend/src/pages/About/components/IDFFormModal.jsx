import React, { useState } from "react";
import { X, Upload, Send, CheckCircle2 } from "lucide-react";
import perceptiveBrainsLogo from "../../../assets/PBIP.png";

const initialIdfState = {
  fullName: "",
  email: "",
  phone: "",
  inventionTitle: "",
  fieldOfInvention: "",
  workingPrinciple: "",
  novelty: "",
  fileName: "",
};

export default function IDFFormModal({ open, onClose }) {
  const [form, setForm] = useState(initialIdfState);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    setForm((f) => ({ ...f, fileName: file ? file.name : "" }));
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setForm(initialIdfState);
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // TODO: wire this up to your backend / email service (e.g. POST to an API route).
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="idf-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050B18]/70 p-4 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-[#0B1F3D]/10 bg-white p-8 shadow-2xl sm:p-10"
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close form"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#0B1F3D]/5 text-[#0B1F3D]/60 transition-colors hover:bg-[#0B1F3D]/10 hover:text-[#0B1F3D]"
        >
          <X size={18} />
        </button>

        <div className="mb-6 flex items-center gap-3">
          <img
            src={perceptiveBrainsLogo}
            alt="Perceptive Brains IP"
            className="h-10 w-10 flex-none object-contain"
          />
          <div>
            <p className="text-sm font-semibold leading-none text-[#0B1F3D]">
              Perceptive Brains <span className="text-[#9C7A1E]">IP</span>
            </p>
            <p className="mt-1 text-[11px] tracking-wide text-slate-400">
              Intellectual Property Consultancy
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A227]/10 text-[#9C7A1E]">
              <CheckCircle2 size={28} />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-slate-900">Disclosure received</h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
              Thank you, {form.fullName.split(" ")[0] || "there"}. Our patent team will review
              your invention disclosure and get back to you within 1–2 business days.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-7 rounded-xl bg-[#0B1F3D] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#16305C]"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs font-semibold tracking-[0.2em] text-[#9C7A1E]">STEP 2</p>
            <h3 id="idf-modal-title" className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
              Invention Disclosure Form
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Share the essentials of your innovation. Everything you submit here is covered
              by your signed NDA.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-slate-600">Full name</span>
                  <input
                    required
                    type="text"
                    value={form.fullName}
                    onChange={update("fullName")}
                    placeholder="Jordan Patel"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-[#C9A227] focus:bg-white focus:ring-1 focus:ring-[#C9A227]"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-slate-600">Email</span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-[#C9A227] focus:bg-white focus:ring-1 focus:ring-[#C9A227]"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-slate-600">Phone</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={update("phone")}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-[#C9A227] focus:bg-white focus:ring-1 focus:ring-[#C9A227]"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-slate-600">Invention title</span>
                  <input
                    required
                    type="text"
                    value={form.inventionTitle}
                    onChange={update("inventionTitle")}
                    placeholder="e.g. Self-adjusting bike helmet strap"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-[#C9A227] focus:bg-white focus:ring-1 focus:ring-[#C9A227]"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-slate-600">
                  Purpose / field of invention
                </span>
                <input
                  type="text"
                  value={form.fieldOfInvention}
                  onChange={update("fieldOfInvention")}
                  placeholder="What problem does it solve, and in what industry?"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-[#C9A227] focus:bg-white focus:ring-1 focus:ring-[#C9A227]"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-slate-600">Working principle</span>
                <textarea
                  required
                  rows={3}
                  value={form.workingPrinciple}
                  onChange={update("workingPrinciple")}
                  placeholder="Briefly describe how your invention works."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-[#C9A227] focus:bg-white focus:ring-1 focus:ring-[#C9A227]"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-slate-600">
                  What makes it novel?
                </span>
                <textarea
                  rows={3}
                  value={form.novelty}
                  onChange={update("novelty")}
                  placeholder="How is this different from existing solutions?"
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-[#C9A227] focus:bg-white focus:ring-1 focus:ring-[#C9A227]"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-slate-600">
                  Drawings or photographs (optional)
                </span>
                <div className="flex items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3">
                  <Upload size={16} className="flex-none text-[#9C7A1E]" />
                  <span className="flex-1 truncate text-sm text-slate-500">
                    {form.fileName || "No file selected"}
                  </span>
                  <label className="cursor-pointer rounded-lg bg-[#0B1F3D]/5 px-3 py-1.5 text-xs font-semibold text-[#0B1F3D] transition-colors hover:bg-[#0B1F3D]/10">
                    Browse
                    <input type="file" onChange={handleFile} className="hidden" accept="image/*,.pdf" />
                  </label>
                </div>
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C9A227] via-[#D9AE55] to-[#C9A227] px-6 py-3.5 text-sm font-semibold text-[#0B1F3D] shadow-lg shadow-[#C9A227]/25 transition-all hover:shadow-xl hover:shadow-[#C9A227]/35 disabled:opacity-60"
              >
                {submitting ? (
                  "Submitting..."
                ) : (
                  <>
                    Submit disclosure
                    <Send size={15} />
                  </>
                )}
              </button>
              <p className="text-center text-xs text-slate-400">
                Protected under your signed NDA · Reviewed within 1–2 business days
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
