import React from "react";
import PageMeta from "../../components/PageMeta";
import { ArrowRight } from "lucide-react";
import DownloadForm from "../../assets/DownloadForm.png";
import PatentTimeline from "../../assets/patent-timeline-1536x1024.jpg";
import TrademarkTimeline from "../../assets/trademark-renewal.jpg";
import IPChecklist from "../../assets/2017_06_art_6_3_845.jpg";
import FilingGuide from "../../assets/A-GUIDE-TO-PATENT-FILING.jpg";
import FAQImage from "../../assets/faq-header-image.jpg";
import CaseStudy from "../../assets/casestudy.jpeg";
import SuccessImage from "../../assets/sucess.jpg";
import IPNews from "../../assets/IPnews.png";

const resources = [
  {
    title: "IP Glossary",
    description:
      "Understand intellectual property terms with our comprehensive glossary.",
    image: DownloadForm,
  },
  {
    title: "Patent Forms",
    description:
      "Download official patent filing forms and supporting documents.",
    image: DownloadForm,
  },
  {
    title: "Patent Timeline",
    description:
      "Track every stage of the patent registration process from filing to grant.",
    image: PatentTimeline,
  },
  {
    title: "Trademark Timeline",
    description:
      "Learn the trademark registration process with a step-by-step timeline.",
    image: TrademarkTimeline,
  },
  {
    title: "IP Checklists",
    description:
      "Essential checklists for startups, inventors, and growing businesses.",
    image: IPChecklist,
  },
  {
    title: "Filing Guides",
    description:
      "Detailed guides for patents, trademarks, copyrights, and design registration.",
    image: FilingGuide,
  },
  {
    title: "FAQ Library",
    description:
      "Find answers to the most common intellectual property questions.",
    image: FAQImage,
  },
  {
    title: "Case Studies",
    description:
      "Explore real-world IP success stories and legal strategies.",
    image: CaseStudy,
  },
  {
    title: "Success Stories",
    description:
      "See how we helped innovators secure and commercialize their ideas.",
    image: SuccessImage,
  },
  {
    title: "Latest IP News",
    description:
      "Stay updated with the latest intellectual property news and regulations.",
    image: IPNews,
  },
];

const Resources = () => {
  return (
    <>
      <PageMeta
        title="IP Resource Center | Perceptive Brains"
        description="Download IP guides, checklists, timelines, case studies, and educational resources to simplify your intellectual property journey."
      />
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="uppercase tracking-[4px] text-amber-600 font-semibold">
            Resource Center
          </span>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4">
            Everything You Need to Protect Your Innovation
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            Explore expert guides, downloadable resources, timelines,
            checklists, and educational content to simplify your intellectual
            property journey.
          </p>
        </div>

       {/* Cards */}
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {resources.map((resource, index) => (
    <div
      key={index}
      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-amber-500 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={resource.image}
          alt={resource.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Title at Bottom */}
        <div className="absolute bottom-0 left-0 w-full p-5">
          <h3 className="text-2xl font-bold text-white">
            {resource.title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-sm leading-7 text-gray-600">
          {resource.description}
        </p>

        <button className="mt-6 flex items-center gap-2 font-semibold text-amber-600 transition-all duration-300 group-hover:gap-3">
          Explore
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  ))}
</div>

        {/* CTA */}
        <div className="mt-20 rounded-3xl bg-gradient-to-r from-amber-500 to-yellow-500 p-12 text-center shadow-xl">
          <h3 className="text-3xl font-bold text-white">
            Download Our Free IP Protection Guide
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-white/90 leading-7">
            Learn how to protect your patents, trademarks, copyrights, and
            designs with our complete Intellectual Property Guide for startups,
            businesses, and innovators.
          </p>

          <button className="mt-8 rounded-xl bg-white px-8 py-4 font-semibold text-amber-600 shadow-md transition duration-300 hover:bg-gray-100">
            Download Free Guide
          </button>
        </div>
      </div>
    </section>
    </>
  );
};

export default Resources;