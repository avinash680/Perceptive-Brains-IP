import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUp, ArrowUpRight } from "lucide-react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

// Use the same logo import as your Navbar
import logo from "../assets/PBIP.png"; // <-- Update the path if needed

const companyLinks = [
  { name: "About Us", path: "/about" },
  { name: "Our Team", path: "/#team" },
  { name: "Prosecution", path: "/services/patent-prosecution" },
  { name: "Contact", path: "/contact" },
];

const serviceLinks = [
  { name: "Patent search", path: "/services/patent-search" },
  { name: "Patent drafting & filing", path: "/services/patent-drafting-filing" },
  { name: "Trademark registration", path: "/services/trademark-registration" },
  { name: "Copyright registration", path: "/services/copyright-registration" },
  { name: "Design registration", path: "/services/industrial-design" },
  { name: "IP litigation support", path: "/services/ip-litigation-support" },
];

const socialLinks = [
  { icon: FaWhatsapp, link: "https://wa.me/918559000169", label: "WhatsApp" },
  { icon: FaLinkedinIn, link: "https://linkedin.com", label: "LinkedIn" },
  { icon: FaTwitter, link: "https://twitter.com", label: "Twitter" },
  { icon: FaFacebookF, link: "https://facebook.com", label: "Facebook" },
  { icon: FaInstagram, link: "https://instagram.com", label: "Instagram" },
];

const legalLinks = [
  { name: "Privacy policy", path: "/privacy" },
  { name: "Terms & conditions", path: "/terms" },
  { name: "Cookies", path: "/cookies" },
];

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[var(--brand-blue-dark)] text-white">
      {/* Ambient gold glow — the one accent flourish, kept singular and quiet */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-[var(--brand-gold)]/10 blur-[110px]"
      />
      {/* Hairline gradient top border instead of a flat rule */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--brand-gold)]/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12">
          {/* Brand */} 
          <div className="lg:col-span-5">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src={logo}
                alt="Perceptive Brains IP logo"
                className="h-11 w-auto object-contain"
              />
              <span className="text-2xl font-serif font-semibold text-white tracking-tight">
                Perceptive Brains IP
              </span>
            </Link>

            <p className="text-white leading-relaxed text-[15px] max-w-sm mt-5">
              Perceptive Brains is a trusted intellectual property law firm. Delivering trusted Intellectual Property solutions in patents, trademarks, designs, copyrights, and IP strategy to empower innovators and businesses.
            </p>

            <div className="flex gap-2.5 mt-7">
              {socialLinks.map(({ icon: Icon, link, label }) => (
                <a
                  key={label}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="group h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-white transition-all duration-200 hover:border-[var(--brand-gold)] hover:bg-[var(--brand-gold)] hover:text-[var(--brand-blue-dark)] hover:-translate-y-0.5"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="uppercase tracking-[3px] text-white text-xs font-semibold mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <FooterLink key={item.path} item={item} />
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="uppercase tracking-[3px] text-white text-xs font-semibold mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((item) => (
                <FooterLink key={item.path} item={item} />
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="uppercase tracking-[3px] text-white text-xs font-semibold mb-5">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:perceptivebrains@gmail.com"
                  className="group flex items-start gap-3 text-[15px] text-white transition-colors hover:text-white"
                >
                  <Mail className="text-[var(--brand-gold)] shrink-0 mt-0.5" size={16} />
                  <span>perceptivebrains@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+91"
                  className="group flex items-start gap-3 text-[15px] text-white transition-colors hover:text-white"
                >
                  <Phone className="text-[var(--brand-gold)] shrink-0 mt-0.5" size={16} />
                  <span>+91 8559000169</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-[15px] text-white">
                <MapPin className="text-[var(--brand-gold)] shrink-0 mt-0.5" size={16} />
                <span>Chandigarh ,Panchkula, Mohali</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.08] flex flex-col-reverse md:flex-row items-center justify-between gap-5">
          <p className="text-white text-sm text-center md:text-left">
            © {new Date().getFullYear()} Perceptive Brains IP. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white">
              {legalLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="transition-colors hover:text-[var(--brand-gold)]"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="h-9 w-9 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white transition-all duration-200 hover:bg-[var(--brand-gold)] hover:text-[var(--brand-blue-dark)] hover:border-[var(--brand-gold)] hover:-translate-y-0.5"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Footer link with a small arrow that slides in on hover — a quiet, consistent
// micro-interaction rather than a plain color change.
function FooterLink({ item }) {
  return (
    <li>
      <Link
        to={item.path}
        className="group flex items-center gap-1 text-[15px] text-white transition-colors hover:text-[var(--brand-gold)] w-fit"
      >
        <span>{item.name}</span>
        <ArrowUpRight
          size={13}
          className="text-[var(--brand-gold)] opacity-0 -translate-x-1 -translate-y-0.5 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
        />
      </Link>
    </li>
  );
}

export default Footer;