import React, { useState } from "react";
import { BadgeCheck, Mail } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import OptimizedImage from "../../components/OptimizedImage";
import { team as aboutTeam } from "../About/data/aboutData";

const team = aboutTeam;

function TeamCard({ member, index }) {
  const [expanded, setExpanded] = useState(false);
  const preview = `${member.bio.slice(0, 115)}...`;

  return (
    <div className="group relative mx-auto flex h-full w-full max-w-[320px] flex-col rounded-[24px] border border-white/10 bg-gradient-to-b from-[#0B1F3D]/95 via-[#10223f]/90 to-[#0B1F3D] p-[1px] shadow-[0_18px_40px_rgba(15,23,42,0.22)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_22px_50px_rgba(12,31,61,0.26)]">
      <div className="absolute -inset-px rounded-[24px] bg-gradient-to-b from-[#C9A227]/20 via-transparent to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-80" />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[24px] bg-slate-900/80 backdrop-blur-xl">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <OptimizedImage
            src={member.photo}
            alt={member.name}
            eager={index < 2}
            containerClassName="h-full"
            className="object-center transition-transform duration-700 ease-out group-hover:scale-110"
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
  );
}

export default function CorporateTeam() {
  return (
    <section id="team" className="relative overflow-hidden bg-slate-950 px-6 py-24 sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl animate-pulse" />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-indigo-300 backdrop-blur-xl">
            Meet Our Team
          </span>

          <h2 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Core Team
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            A multidisciplinary team of engineers and legal experts working together to design, protect, and scale
            the products and brands our clients build.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}