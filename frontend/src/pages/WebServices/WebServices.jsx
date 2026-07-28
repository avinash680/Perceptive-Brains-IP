import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  Code2,
  Database,
  Plug,
  LifeBuoy,
  ArrowRight,
} from "lucide-react";

/**
 * WebDevelopment
 * Premium, minimal "Web Development" service section for
 * Perceptive Brains IP. Built with Tailwind CSS only (no external
 * stylesheet), Framer Motion for entrance/hover choreography, and
 * Lucide icons.
 *
 * Brand palette (from the Perceptive Brains IP mark):
 *   Navy  #082E63
 *   Gold  #C69A32
 *   White #FFFFFF
 *
 * Brand cues carried into this section:
 *  - Wide letter-tracked serif wordmark, echoing "PERCEPTIVE BRAINS IP"
 *  - Left hemisphere = structured / analytical (navy, nodes)
 *  - Right hemisphere = organic / creative (gold, curves)
 *    This split is referenced in the signature monogram badge below.
 */

const features = [
  {
    icon: LayoutGrid,
    title: "Responsive Design",
    description:
      "Interfaces engineered to hold their composure on every screen, from a courtroom tablet to a boardroom display.",
  },
  {
    icon: Code2,
    title: "React Development",
    description:
      "Component-driven front ends built for clarity and longevity, so your platform stays maintainable as it grows.",
  },
  {
    icon: Database,
    title: "MERN Stack",
    description:
      "Full-stack builds on MongoDB, Express, React, and Node — a single cohesive architecture from database to browser.",
  },
  {
    icon: Plug,
    title: "API Integration",
    description:
      "Secure, well-documented connections to the registries, payment rails, and internal tools your practice depends on.",
  },
  {
    icon: LifeBuoy,
    title: "Maintenance & Support",
    description:
      "Ongoing stewardship — monitoring, updates, and priority response — so your platform stays dependable long after launch.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function WebServices() {
  return (
    <section
      className="relative w-full overflow-hidden py-24 px-6 sm:px-10 lg:px-16"
      style={{
        background:
          "radial-gradient(120% 120% at 15% 0%, #0B3A7A 0%, #082E63 45%, #061F45 100%)",
      }}
    >
      {/* Ambient gold glow accents */}
      <div
        className="pointer-events-none absolute -top-40 -right-32 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "#C69A32" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full opacity-10 blur-3xl"
        style={{ background: "#C69A32" }}
      />

      {/* Faint hairline grid for texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Signature monogram — half structured / half organic,
              mirroring the Perceptive Brains IP mark */}
          <div className="mx-auto mb-7 flex h-14 w-14 items-center justify-center">
            <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden="true">
              <defs>
                <clipPath id="pbLeftHalf">
                  <rect x="0" y="0" width="32" height="64" />
                </clipPath>
                <clipPath id="pbRightHalf">
                  <rect x="32" y="0" width="32" height="64" />
                </clipPath>
              </defs>
              {/* left: structured / nodes */}
              <g clipPath="url(#pbLeftHalf)" stroke="#8FB3E8" strokeWidth="1">
                <circle cx="14" cy="14" r="1.6" fill="#8FB3E8" />
                <circle cx="24" cy="20" r="1.6" fill="#8FB3E8" />
                <circle cx="12" cy="30" r="1.6" fill="#8FB3E8" />
                <circle cx="22" cy="38" r="1.6" fill="#8FB3E8" />
                <circle cx="14" cy="48" r="1.6" fill="#8FB3E8" />
                <line x1="14" y1="14" x2="24" y2="20" />
                <line x1="24" y1="20" x2="12" y2="30" />
                <line x1="12" y1="30" x2="22" y2="38" />
                <line x1="22" y1="38" x2="14" y2="48" />
                <line x1="14" y1="14" x2="12" y2="30" />
              </g>
              {/* right: organic / curves */}
              <g clipPath="url(#pbRightHalf)" fill="none" stroke="#E8C978" strokeWidth="1.6" strokeLinecap="round">
                <path d="M38 16c4-4 12-2 12 4s-4 4-2 8 4 8-2 10 2 8-4 10-10-2-8-8-6-8-4-12 6-8 4-12z" />
              </g>
              <circle cx="32" cy="32" r="30" fill="none" stroke="#FFFFFF" strokeOpacity="0.15" strokeWidth="1" />
            </svg>
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-[#C69A32]/30 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-[#E8C978] backdrop-blur-sm">
            Perceptive Brains IP
          </span>

          <h2 className="mt-6 font-serif text-4xl font-semibold uppercase leading-tight tracking-wide text-white sm:text-5xl lg:text-6xl">
            Custom Web{" "}
            <span className="bg-gradient-to-r from-[#E8C978] via-[#C69A32] to-[#9c7a26] bg-clip-text text-transparent">
              Development
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            We design and build web platforms with the same precision your
            firm applies to protecting ideas — secure, scalable, and crafted
            to represent your practice with authority.
          </p>

          <div className="mx-auto mt-8 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#C69A32]/50" />
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#C69A32]/70">
              IP
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#C69A32]/50" />
          </div>

          <motion.div
            whileHover={{ scale: 1.035, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative mt-8 inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#C69A32] to-[#a97f24] px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-[#082E63] shadow-[0_8px_30px_rgba(198,154,50,0.35)] transition-shadow hover:shadow-[0_10px_40px_rgba(198,154,50,0.5)]"
          >
            <Link to="/contact" className="relative z-10 inline-flex items-center gap-2">
              <span>Start Your Project</span>
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2.5}
            />
            </Link>
            <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover:translate-x-0" />
          </motion.div>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              whileHover={{
                y: -6,
                rotateX: 2,
                rotateY: -2,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              style={{ transformStyle: "preserve-3d", perspective: 800 }}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-colors duration-300 hover:border-[#C69A32]/40 hover:bg-white/[0.09]"
            >
              {/* subtle top gradient sheen */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C69A32]/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#C69A32]/25 to-[#C69A32]/5 ring-1 ring-[#C69A32]/30 transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-6 w-6 text-[#E8C978]" strokeWidth={1.75} />
              </div>

              <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">
                {title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-white/60">
                {description}
              </p>

              {/* corner glow on hover */}
              <div className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-[#C69A32] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-[0.12]" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
