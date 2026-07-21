import React from "react";
import { ArrowRight } from "lucide-react";
import aiImg from "../../assets/AI.jpg";
import softwareImg from "../../assets/software.webp";
import electronicsImg from "../../assets/electronic.jpg";
import biotechImg from "../../assets/bioTech.jpg";
import pharmaImg from "../../assets/pharmaceutial.jpg";
import medicalImg from "../../assets/what-is-medical-device.jpg";
import renewableImg from "../../assets/renewble.jpg";
import automotiveImg from "../../assets/automotive.jpg";
import chemicalImg from "../../assets/chemical.jpg";

const industries = [
  {
    title: "Artificial Intelligence",
    description:
      "Protect AI algorithms, machine learning innovations, and intelligent software solutions.",
    image: aiImg,
  },
  {
    title: "Software",
    description:
      "Secure software patents, copyrights, trademarks, and licensing rights.",
    image: softwareImg,
  },
  {
    title: "Electronics",
    description:
      "Comprehensive IP protection for electronic devices, chips, and embedded systems.",
    image: electronicsImg,
  },
  {
    title: "Biotechnology",
    description:
      "Patent biotechnology inventions, genetic engineering, and life science innovations.",
    image: biotechImg,
  },
  {
    title: "Pharmaceutical",
    description:
      "Safeguard pharmaceutical formulations, drug discoveries, and medical innovations.",
    image: pharmaImg,
  },
  {
    title: "Medical Devices",
    description:
      "Protect healthcare technologies, medical equipment, and diagnostic devices.",
    image: medicalImg,
  },
  {
    title: "Renewable Energy",
    description:
      "IP strategies for solar, wind, battery storage, and sustainable energy innovations.",
    image: renewableImg,
  },
  {
    title: "Mechanical Engineering",
    description:
      "Patent industrial machinery, manufacturing systems, and mechanical inventions.",
    image: "https://placehold.co/600x400/f3f4f6/9ca3af?text=Mechanical+Engineering",
  },
  {
    title: "Automotive",
    description:
      "Protect automotive technologies, EV innovations, and mobility solutions.",
    image: automotiveImg,
  },
  {
    title: "Manufacturing",
    description:
      "Secure industrial processes, automation systems, and production technologies.",
    image: "https://placehold.co/600x400/f3f4f6/9ca3af?text=Manufacturing",
  },
  {
    title: "Agriculture",
    description:
      "Protect agricultural innovations, equipment, biotechnology, and sustainable farming.",
    image: "https://placehold.co/600x400/f3f4f6/9ca3af?text=Agriculture",
  },
  {
    title: "Chemicals",
    description:
      "Patent chemical compositions, industrial formulations, and material innovations.",
    image: chemicalImg,
  },
];

const Industries = () => {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-amber-600 font-semibold uppercase tracking-[3px]">
            Industries We Serve
          </span>

          <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Intellectual Property Solutions Across Every Industry
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            We provide tailored intellectual property strategies that help
            businesses protect innovation, strengthen competitive advantage,
            and maximize commercial value across diverse industries.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {industries.map((item, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-amber-500 hover:bg-white hover:shadow-2xl"
            >
              {/* Photo */}
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://placehold.co/600x400/f3f4f6/9ca3af?text=Image+not+found";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
              </div>

              <div className="p-8">
                {/* Title */}
                <h3 className="mb-4 text-2xl font-semibold text-gray-900">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="leading-7 text-gray-600">{item.description}</p>

                {/* Button */}
                <button className="mt-8 flex items-center gap-2 font-semibold text-amber-600 transition-all duration-300 group-hover:gap-3">
                  Learn More
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;