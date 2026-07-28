import React, { useState } from "react";
import hirdayPalPhoto from "../../assets/our-team/dr-hirday-pal-singh-sidhu.jpeg";
import kunalAroraPhoto from "../../assets/our-team/advocate-kunal-arora.jpeg";
import vaneetAroraPhoto from "../../assets/our-team/advocate-vaneet-arora.png";
import jayvirShahPhoto from "../../assets/our-team/dr-jayvir-shah.png";

const team = [
  {
    id: "HSS",
    name: "Dr.Hirdaypall Singh Sidhu",
    title: "Product Design Consultant",
    department: "Product Design & Engineering",
    bio: "Turns CAD concepts into manufacturable products, leading FEA-driven design validation for automotive and industrial clients.",
    experience: "15+ Years",
    photo: hirdayPalPhoto,
  },
  {
    id: "KA",
    name: "Adv. Kunal Arora",
    title: "Advocate, High Court of Punjab & Haryana",
    department: "Legal & Public Affairs",
    bio: "Combines courtroom advocacy with community leadership, founding Kutumbh Mitra Foundation to champion youth welfare initiatives.",
    experience: "6+ Years",
    photo: kunalAroraPhoto,
  },
  {
    id: "VA",
    name: "Advocate Vaneet Arora",
    title: "Trademark Attorney",
    department: "Intellectual Property",
    bio: "Guides startups and enterprises through trademark filing, opposition, and enforcement, protecting brand assets end to end.",
    experience: "10+ Years",
    photo: vaneetAroraPhoto,
  },
  {
    id: "JS",
    name: "Dr. Jayvir Shah",
    title: "Registered Patent Agent, IN/PA 3339",
    department: "Intellectual Property & Patents",
    bio: "Drafts and prosecutes high-stakes mechanical and automobile patents, and has mentored 107 aspirants into registered patent agents.",
    experience: "7+ Years",
    photo: jayvirShahPhoto,
  },
];

function TeamCard({ member }) {
  const [expanded, setExpanded] = useState(false);
  const preview = `${member.bio.slice(0, 100)}...`;

  return (
    <div className="group relative mx-auto flex h-full w-full max-w-[300px] flex-col rounded-[22px] border border-white/10 bg-gradient-to-b from-indigo-500/40 via-white/10 to-transparent p-[1px] shadow-[0_18px_40px_rgba(15,23,42,0.3)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_22px_50px_rgba(99,102,241,0.22)]">
      <div className="absolute -inset-px rounded-[24px] bg-gradient-to-b from-indigo-400/0 via-indigo-400/0 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60 group-hover:from-indigo-400/40" />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[22px] bg-slate-900/70 backdop-blur-xl">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <img
            src={member.photo}
            alt={member.name}
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent" />

          <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-slate-950/70 px-3 py-1 text-xs font-medium text-indigo-300 backdrop-blur-md">
            {member.experience}
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <h3 className="text-lg font-semibold text-white">{member.name}</h3>
            <p className="mt-1 text-sm font-medium text-indigo-300">{member.title}</p>
            <p className="mt-0.5 text-xs uppercase tracking-wide text-slate-500">{member.department}</p>

            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {expanded ? member.bio : preview}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="mt-4 inline-flex w-fit items-center rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1.5 text-sm font-medium text-indigo-300 transition hover:bg-indigo-500/20"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
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
          {team.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}