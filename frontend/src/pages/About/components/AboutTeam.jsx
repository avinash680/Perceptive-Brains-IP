import React from "react";
import { BadgeCheck, Mail } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import Reveal from "./Reveal";

export default function AboutTeam({ team }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <Reveal className="mx-auto mb-10 max-w-2xl text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-[#9C7A1E]">OUR TEAM</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Attorneys and agents behind your portfolio
        </h2>
      </Reveal>
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-2">
        {team.map((member, i) => (
          <Reveal key={member.id} delay={i * 90}>
            <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm shadow-[#0B1F3D]/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#0B1F3D]/10 sm:flex-row">
              <div className="relative h-64 flex-none overflow-hidden sm:h-auto sm:w-48">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3D]/60 via-transparent to-transparent sm:bg-gradient-to-r" />
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-[#0B1F3D] backdrop-blur">
                  <BadgeCheck size={12} />
                  {member.experience}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-[11px] font-semibold tracking-[0.15em] text-[#9C7A1E]">
                  {member.department.toUpperCase()}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">{member.name}</h3>
                <p className="mt-0.5 text-sm text-[#9C7A1E]">{member.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{member.qualification}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{member.bio}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {member.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-[#0B1F3D]/10 bg-[#0B1F3D]/5 px-3 py-1 text-[11px] font-medium text-[#0B1F3D]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center gap-3 border-t border-slate-100 pt-4">
                  <a
                    href={member.linkedin}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B1F3D]/5 text-[#9C7A1E] transition-colors hover:bg-[#C9A227] hover:text-white"
                    aria-label={`${member.name} on LinkedIn`}
                  >
                    <FaLinkedinIn size={16} />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B1F3D]/5 text-[#9C7A1E] transition-colors hover:bg-[#C9A227] hover:text-white"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail size={16} />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
