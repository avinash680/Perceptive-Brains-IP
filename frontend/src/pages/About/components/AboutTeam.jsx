import React, { useState } from "react";
import { BadgeCheck, Mail } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import Reveal from "./Reveal";

function TeamCard({ member, index }) {
  const [expanded, setExpanded] = useState(false);
  const preview = `${member.bio.slice(0, 115)}...`;

  return (
    <Reveal delay={index * 90}>
      <div className="group relative mx-auto flex h-full w-full max-w-[320px] flex-col rounded-[24px] border border-white/10 bg-gradient-to-b from-[#0B1F3D]/95 via-[#10223f]/90 to-[#0B1F3D] p-[1px] shadow-[0_18px_40px_rgba(15,23,42,0.22)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_22px_50px_rgba(12,31,61,0.26)]">
        <div className="absolute -inset-px rounded-[24px] bg-gradient-to-b from-[#C9A227]/20 via-transparent to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-80" />

        <div className="relative flex h-full flex-col overflow-hidden rounded-[24px] bg-slate-900/80 backdrop-blur-xl">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <img
              src={member.photo}
              alt={member.name}
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent" />
            <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-slate-950/70 px-3 py-1 text-xs font-medium text-[#C9A227] backdrop-blur-md">
              <BadgeCheck size={13} />
              {member.experience}
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-between p-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A227]">
                {member.department}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">{member.name}</h3>
              <p className="mt-1 text-sm font-medium text-[#C9A227]">{member.title}</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">{member.qualification}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                {expanded ? member.bio : preview}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {member.expertise?.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-[#C9A227]/20 bg-[#C9A227]/10 px-3 py-1 text-[11px] font-medium text-[#f3df9f]"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setExpanded((value) => !value)}
                className="inline-flex w-fit items-center rounded-full border border-[#C9A227]/20 bg-[#C9A227]/10 px-3 py-1.5 text-sm font-medium text-[#f3df9f] transition hover:bg-[#C9A227]/20"
              >
                {expanded ? "Read less" : "Read more"}
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={member.linkedin}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[#C9A227] transition-colors hover:bg-[#C9A227] hover:text-white"
                  aria-label={`${member.name} on LinkedIn`}
                >
                  <FaLinkedinIn size={15} />
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[#C9A227] transition-colors hover:bg-[#C9A227] hover:text-white"
                  aria-label={`Email ${member.name}`}
                >
                  <Mail size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function AboutTeam({ team }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <Reveal className="mx-auto mb-12 max-w-3xl text-center">
        <p className="text-xs font-semibold tracking-[0.25em] text-[#9C7A1E]">OUR TEAM</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Meet our team of legal and technical experts
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          A multidisciplinary group helping clients protect, build, and grow with strong IP strategy.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((member, index) => (
          <TeamCard key={member.id} member={member} index={index} />
        ))}
      </div>
    </section>
  );
}
