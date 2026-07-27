import React from "react";
import { Check } from "lucide-react";

export default function AboutWhyChooseUs({ items }) {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#B8842A]">
            Why Choose Us
          </p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-slate-900">
            The intelligent IP partner for your business.
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items?.map((item, index) => {
            const Icon = item.icon || Check;
            return (
              <div
                key={index}
                className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:border-[#B8842A]/50 hover:bg-white"
              >
                <div className="flex items-start gap-4">
                  <span className="mt-1 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#10182E] text-white">
                    <Icon size={18} />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-700">{item.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
