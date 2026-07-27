import React from "react";

import {
  AboutHero,
  AboutWhoWeAre,
  AboutHowItWorksSection,
  AboutWhyChooseUs,
  AboutMissionVision,
  AboutProcess,
  AboutAchievements,
  AboutTestimonials,
  AboutTeam,
  AboutCTABanner,
} from "./";

import { stats, whyChooseUs, coreValues, howItWorks, filingBenefits, process, team, testimonials } from "./data/aboutData";

export default function About() {
  return (
    <main className="bg-slate-50 text-slate-800 antialiased">
      <AboutHero stats={stats} />
      <AboutWhoWeAre />
      <AboutHowItWorksSection howItWorks={howItWorks} filingBenefits={filingBenefits} />
      <AboutWhyChooseUs items={whyChooseUs} />
      <AboutMissionVision coreValues={coreValues} />
      <AboutProcess process={process} />
      <AboutAchievements />
      <AboutTeam team={team} />
      <AboutTestimonials testimonials={testimonials} />
      <AboutCTABanner />
    </main>
  );
}
