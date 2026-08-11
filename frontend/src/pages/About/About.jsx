import React from "react";
import PageMeta from "../../components/PageMeta";

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
      <PageMeta
        title="About Perceptive Brains IP | IP Services and Strategy in India"
        description="Learn how Perceptive Brains delivers patent, trademark, copyright, design registration and IP strategy solutions for innovators and businesses."
      />
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
