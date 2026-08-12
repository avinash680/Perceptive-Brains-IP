import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import SEO from "./components/SEO";
import "./App.css";

const PAGE_META = {
  "/": {
    title: "Perceptive Brains | Intellectual Property, Technology & Innovation",
    description:
      "Perceptive Brains helps startups, founders, and businesses protect patents, trademarks, copyrights, designs, and innovation with expert intellectual property strategy.",
  },
  "/about": {
    title: "About Perceptive Brains IP | IP Services and Strategy in India",
    description:
      "Learn how Perceptive Brains delivers patent, trademark, copyright, design registration and IP strategy solutions for innovators and businesses.",
  },
  "/services": {
    title: "Intellectual Property Services in India | Perceptive Brains",
    description:
      "Explore patent filing, trademark registration, copyright protection, design registration, and IP consulting services from Perceptive Brains.",
  },
  "/contact": {
    title: "Contact Perceptive Brains | Expert IP Guidance",
    description:
      "Get in touch for patent filing, trademark registration, copyright protection, design registration, and IP consulting services in India.",
  },
  "/industry": {
    title: "Industry IP Solutions | Perceptive Brains",
    description:
      "Industry-specific intellectual property strategies for AI, biotech, pharma, electronics, renewable energy and manufacturing.",
  },
  "/resource": {
    title: "IP Resource Center | Perceptive Brains",
    description:
      "Download IP guides, checklists, timelines, case studies, and educational resources to simplify your intellectual property journey.",
  },
  "/services/patent-search": {
    title: "Patent Search Services in India | Perceptive Brains",
    description:
      "Professional patent search services to assess novelty, map prior art, and strengthen your patent filing strategy.",
  },
  "/services/patent-drafting-filing": {
    title: "Patent Drafting & Filing Services | Perceptive Brains",
    description:
      "Expert patent drafting and filing services for India and international protection from Perceptive Brains IP.",
  },
  "/services/patent-prosecution": {
    title: "Patent Prosecution Services in India | Perceptive Brains",
    description:
      "Patent prosecution support to handle office actions, responses, and patent grant strategy across jurisdictions.",
  },
  "/services/patent-process": {
    title: "Patent Process Services | Perceptive Brains",
    description:
      "Understand the patent process with expert guidance on search, drafting, filing, examination, and grant.",
  },
  "/services/trademark-registration": {
    title: "Trademark Registration Services in India | Perceptive Brains",
    description:
      "Trademark registration services, clearance search, and brand protection support for businesses and startups.",
  },
  "/services/trademark-opposition": {
    title: "Trademark Opposition Services | Perceptive Brains",
    description:
      "Trademark opposition and enforcement support to protect your brand during contested registration proceedings.",
  },
  "/services/trademark-renewal": {
    title: "Trademark Renewal Services | Perceptive Brains",
    description:
      "Trademark renewal and portfolio management services to keep your registered marks active and enforceable.",
  },
  "/services/brand-protection": {
    title: "Brand Protection Services | Perceptive Brains",
    description:
      "Brand protection services for monitoring, enforcement, and anti-counterfeiting support across trademarks and copyrights.",
  },
  "/services/copyright-registration": {
    title: "Copyright Registration Services in India | Perceptive Brains",
    description:
      "Copyright registration services to protect artistic, literary, software, and creative works under Indian law.",
  },
  "/services/industrial-design": {
    title: "Design Registration Services in India | Perceptive Brains",
    description:
      "Design registration services to safeguard product appearance, visual identity, and industrial designs.",
  },
  "/services/design-vs-patent": {
    title: "Design vs Patent | Perceptive Brains",
    description:
      "Understand the difference between design registration and patent protection for your product innovations.",
  },
  "/services/ip-portfolio-management": {
    title: "IP Portfolio Management | Perceptive Brains",
    description:
      "IP portfolio management and strategy services to help businesses maximize the value of their patent and trademark assets.",
  },
  "/services/ip-valuation": {
    title: "IP Valuation Services | Perceptive Brains",
    description:
      "Intellectual property valuation services for patents, trademarks, copyrights and design portfolios.",
  },
  "/services/startup-ip": {
    title: "Startup IP Services | Perceptive Brains",
    description:
      "Startup IP services for founders, investors and early-stage businesses seeking patent, trademark, copyright and design protection.",
  },
  "/services/ip-litigation-support": {
    title: "IP Litigation Support | Perceptive Brains",
    description:
      "IP litigation support for enforcement, oppositions, and disputes involving patents, trademarks and copyrights.",
  },
  "/services/web-development": {
    title: "Web Development Services | Perceptive Brains",
    description:
      "Custom web development and digital experience services for IP firms and innovation-driven businesses.",
  },
  "/services/ui-ux-design": {
    title: "UI/UX Design Services | Perceptive Brains",
    description:
      "UX and UI design services to build accessible, high-converting digital products that support IP businesses.",
  },
  default: {
    title: "Perceptive Brains | Intellectual Property, Technology & Innovation",
    description:
      "Perceptive Brains delivers intellectual property, technology, and innovation support for patents, trademarks, copyrights, designs, and strategic brand protection.",
  },
};

function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const scrollToElement = () => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };

      scrollToElement();
      const timeout = window.setTimeout(scrollToElement, 100);
      return () => window.clearTimeout(timeout);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [hash, pathname]);

  return null;
}

function App() {
  const { pathname } = useLocation();
  const cleanPath = pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const pageMeta = PAGE_META[cleanPath] || PAGE_META.default;
  const canonical = typeof window !== "undefined" ? window.location.origin + cleanPath : "";

  return (
    <>
      <SEO
        title={pageMeta.title}
        description={pageMeta.description}
        url={canonical}
        canonical={canonical}
      />
      <ScrollToHash />
      <AppRoutes />
    </>
  );
}

export default App;

