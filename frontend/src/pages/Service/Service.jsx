import React from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Shield,
  Copyright,
  Scale,
  Lightbulb,
  PenTool,
} from "lucide-react";
import PageMeta from "../../components/PageMeta";

const services = [
  {
    icon: FileText,
    title: "Patent filing & prosecution",
    description:
      "End-to-end provisional, complete and PCT patent drafting, filing and prosecution across 150+ jurisdictions.",
    path: "/services/patent-drafting-filing",
  },
  {
    icon: PenTool,
    title: "Design registration",
    description:
      "Protect the visual and aesthetic features of your products under the Designs Act and Hague.",
    path: "/services/industrial-design",
  },
  {
    icon: Shield,
    title: "Trademark registration",
    description:
      "Brand clearance search, filing, opposition handling and global trademark portfolio management.",
    path: "/services/trademark-registration",
  },
  {
    icon: Copyright,
    title: "Copyright services",
    description:
      "Protection for literary, artistic, musical, software and audio-visual works.",
    path: "/services/copyright-registration",
  },
  {
    icon: Scale,
    title: "IP litigation",
    description:
      "Strategic representation in infringement suits, oppositions and enforcement before courts and IPAB.",
    path: "/services/ip-litigation-support",
  },
  {
    icon: Lightbulb,
    title: "IP strategy & consulting",
    description:
      "Patent landscaping, freedom-to-operate, valuation and portfolio strategy aligned to business goals.",
    path: "/services/ip-portfolio-management",
  },
];

const Service = () => {
  return (
    <>
      <PageMeta
        title="Perceptive Brains | Intellectual Property Services in India"
        description="Explore patent filing, trademark registration, copyright protection, design registration, and IP consulting services from Perceptive Brains IP."
      />
      <section className="bg-[#F6F3EA] py-20">
        <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[4px] text-[#9C7423] font-semibold mb-4">
            Our Services
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#10182E]">
            Explore every service that protects your IP.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base leading-7 text-[#5B5F6B]">
            From patent filing and trademark registration to copyright protection and IP strategy, we help innovators and businesses move from idea to enforceable ownership.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.path} className="group overflow-hidden rounded-[1.75rem] border border-[#DEDACB] bg-white shadow-[0_20px_50px_-30px_rgba(8,46,99,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-30px_rgba(8,46,99,0.35)]">
                <div className="p-8">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-[#F9F6EE] text-[#9C7423] shadow-sm">
                    <Icon size={24} />
                  </div>

                  <h2 className="text-xl font-semibold text-[#10182E] mb-3">
                    {service.title}
                  </h2>
                  <p className="text-sm leading-7 text-[#5B5F6B] mb-8">
                    {service.description}
                  </p>

                  <Link
                    to={service.path}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#C69A32] transition-colors duration-200 hover:text-[#a67f14]"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    </>
  );
};

export default Service;
