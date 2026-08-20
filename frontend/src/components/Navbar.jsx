import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight, Menu, X, ArrowRight } from "lucide-react";
import logo from "../assets/PBIP.png";

const serviceGroups = [
  {
    title: "Patents",
    blurb: "Protect the invention itself.",
    items: [
      { name: "Patent search services", path: "/services/patent-search" },
      {
        name: "Patent drafting and filing",
        path: "/services/patent-drafting-filing",
      },
      { name: "Patent prosecution", path: "/services/patent-prosecution" },
    ],
  },
  {
    title: "Trademarks",
    blurb: "Protect the name and identity.",
    items: [
      {
        name: "Trademark registration",
        path: "/services/trademark-registration",
      },
      { name: "Trademark opposition", path: "/services/trademark-opposition" },
      { name: "Trademark renewal", path: "/services/trademark-renewal" },
      { name: "Brand protection", path: "/services/brand-protection" },
    ],
  },
  {
    title: "Copyright & design",
    blurb: "Protect creative and visual work.",
    items: [
      {
        name: "Copyright registration",
        path: "/services/copyright-registration",
      },
      {
        name: "Industrial design registration",
        path: "/services/industrial-design",
      },
      { name: "Design vs patent", path: "/services/design-vs-patent" },
    ],
  },
  {
    title: "Business & strategy",
    blurb: "Turn IP into a business asset.",
    items: [
      {
        name: "IP portfolio management",
        path: "/services/ip-portfolio-management",
      },
      { name: "IP valuation", path: "/services/ip-valuation" },
      { name: "Startup IP services", path: "/services/startup-ip" },
      {
        name: "IP litigation support",
        path: "/services/ip-litigation-support",
      },
    ],
  },
  {
    title: "Web services",
    blurb: "Build and design the site itself.",
    items: [
      { name: "Web development", path: "/services/web-development" },
      { name: "UI/UX design", path: "/services/ui-ux-design" },
    ],
  },
];

// "Services" is rendered manually (as the dropdown trigger) on both desktop and
// mobile, so it's filtered out of every list below instead of sliced by index —
// slicing by a fixed index is what caused it to render twice before.
const navLinks = [
  { name: "Home", path: "/" },
  { name: "About us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Industries", path: "/industry" },
  { name: "Blogs", path: "/resource" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(0);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoClicked, setLogoClicked] = useState(false);
  const closeTimer = useRef(null);
  const logoClickTimer = useRef(null);
  const location = useLocation();

  const homeLink = navLinks.find((item) => item.name === "Home");
  const aboutLink = navLinks.find((item) => item.name === "About us");
  const restLinks = navLinks.filter(
    (item) => !["Home", "About us", "Services"].includes(item.name),
  );

  const isActive = useCallback(
    (path) =>
      path === "/"
        ? location.pathname === "/"
        : location.pathname.startsWith(path),
    [location.pathname],
  );

  // Subtle header compaction on scroll — gives depth without being loud
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setMobileServicesOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Clean up the logo click-pulse timer on unmount
  useEffect(() => {
    return () => clearTimeout(logoClickTimer.current);
  }, []);

  // Small delay before closing the mega-menu so a diagonal mouse path
  // from the trigger into the panel doesn't cause flicker.
  const openMegaMenu = () => {
    clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleCloseMegaMenu = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 150);
  };

  // Brief zoom-pulse on click, on top of the hover zoom + vibration.
  const handleLogoClick = () => {
    clearTimeout(logoClickTimer.current);
    setLogoClicked(true);
    logoClickTimer.current = setTimeout(() => setLogoClicked(false), 360);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled
            ? "bg-[var(--brand-surface)]/85 backdrop-blur-md border-[var(--brand-border)]"
            : "bg-[var(--brand-surface)] border-transparent"
        }`}
      >
        <div className="max-w-8xl mx-auto px-8 lg:px-16 xl:px-20">
          <div
            className={`flex items-center justify-between transition-[height] duration-300 ease-out ${
              scrolled ? "h-16" : "h-20 lg:h-[84px]"
            }`}
          >
            {/* Logo — zooms + vibrates on hover, pulses on click */}
            <Link
              to="/"
              onClick={handleLogoClick}
              className="group/logo flex items-center gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)] focus-visible:ring-offset-2 rounded-lg"
            >
              <img
                src={logo}
                alt="Perceptive Brains IP"
                className={`logo-img w-auto object-contain transition-[height] duration-300 ${
                  scrolled ? "h-9" : "h-12 lg:h-14"
                } ${logoClicked ? "logo-pulse" : ""}`}
              />
              <div>
                <h2 className="text-[22px] lg:text-[24px] font-serif leading-none tracking-tight text-[var(--brand-text)]">
                  Perceptive Brains IP
                </h2>
                <p className="uppercase tracking-[3.5px] text-[10px] font-medium text-[var(--brand-text)]/40 mt-1">
                  Intellectual Property
                </p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-9">
              {homeLink && (
                <NavLink item={homeLink} active={isActive(homeLink.path)} />
              )}
              {aboutLink && (
                <NavLink item={aboutLink} active={isActive(aboutLink.path)} />
              )}

              {/* Services mega-menu */}
              <div
                className="relative"
                onMouseEnter={openMegaMenu}
                onMouseLeave={scheduleCloseMegaMenu}
              >
                <Link
                  to="/services"
                  className="group relative flex items-center gap-1.5 py-2 text-[15px] font-medium tracking-wide text-[var(--brand-text)] transition-colors hover:text-[var(--brand-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)] focus-visible:ring-offset-2 rounded"
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  onClick={() => setServicesOpen(false)}
                >
                  Services
                  <ChevronDown
                    size={15}
                    strokeWidth={2.25}
                    className={`transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-[var(--brand-gold)] transition-all duration-300 ${
                      servicesOpen || isActive("/services") ? "w-full" : "w-0"
                    }`}
                  />
                </Link>

                {/* Panel: left rail of categories, right pane of items — cleaner
                  than a five-column grid, and reads at a glance. */}
                <div
                  className={`absolute right-0 top-full pt-4 w-[620px] z-50 transition-all duration-200 ease-out ${
                    servicesOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="flex bg-[var(--brand-surface)] rounded-2xl border border-[var(--brand-border)] shadow-[0_24px_60px_-20px_rgba(17,27,60,0.28)] overflow-hidden">
                    {/* Rail */}
                    <div className="w-[220px] shrink-0 bg-[var(--brand-blue-dark)] py-3">
                      {serviceGroups.map((group, i) => (
                        <button
                          key={group.title}
                          onMouseEnter={() => setActiveGroup(i)}
                          onFocus={() => setActiveGroup(i)}
                          className={`group/tab w-full flex items-center justify-between gap-2 px-5 py-3 text-left text-sm font-medium transition-colors ${
                            activeGroup === i
                              ? "bg-[var(--brand-surface)]/10 text-[var(--brand-gold)]"
                              : "text-white/70 hover:text-white"
                          }`}
                        >
                          <span>{group.title}</span>
                          <ChevronRight
                            size={14}
                            className={`transition-all duration-200 ${
                              activeGroup === i
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-1 group-hover/tab:opacity-40"
                            }`}
                          />
                        </button>
                      ))}
                    </div>

                    {/* Detail pane */}
                    <div className="flex-1 p-6 min-h-[280px]">
                      {serviceGroups.map((group, i) => (
                        <div
                          key={group.title}
                          className={activeGroup === i ? "block" : "hidden"}
                        >
                          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-gold)] mb-1">
                            {group.title}
                          </p>
                          <p className="text-sm text-gray-400 mb-4">
                            {group.blurb}
                          </p>
                          <ul className="space-y-1">
                            {group.items.map((item) => (
                              <li key={item.path}>
                                <Link
                                  to={item.path}
                                  className="group/link flex items-center justify-between gap-2 rounded-lg -mx-3 px-3 py-2 text-[15px] text-[var(--brand-text)] transition-colors hover:bg-[var(--brand-bg)]"
                                >
                                  <span>{item.name}</span>
                                  <ArrowRight
                                    size={14}
                                    className="text-[var(--brand-gold)] opacity-0 -translate-x-1 transition-all duration-200 group-hover/link:opacity-100 group-hover/link:translate-x-0"
                                  />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Remaining links — Home, About us, Services already rendered above */}
              {restLinks.map((item) => (
                <NavLink
                  key={item.path}
                  item={item}
                  active={isActive(item.path)}
                />
              ))}
            </nav>

            {/* Desktop Button */}
            <div className="hidden lg:block">
              <Link to="/contact">
                <button className="bg-[var(--brand-gold)] text-[var(--brand-text)] text-[15px] font-semibold px-7 py-3.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(195,151,47,0.55)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-text)] focus-visible:ring-offset-2">
                  Get Consultation
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden relative h-10 w-10 flex items-center justify-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)]"
              aria-label="Open menu"
            >
              <Menu size={26} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Mobile drawer — slides in from the right over a dimmed backdrop,
          the modern app-drawer pattern rather than a full-bleed panel. */}
        <div
          className={`fixed inset-0 z-60 lg:hidden transition-opacity duration-300 ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-[var(--brand-blue-dark)]/40 backdrop-blur-[2px]"
          />

          <div
            className={`absolute right-0 top-0 bottom-0 w-[86%] max-w-sm bg-[var(--brand-surface)] shadow-2xl overflow-y-auto transition-transform duration-300 ease-out z-60 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between px-6 h-20 border-b border-[var(--brand-border)]">
              <span className="text-lg font-serif text-[var(--brand-text)]">
                Menu
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="h-9 w-9 flex items-center justify-center rounded-lg text-[var(--brand-text)] hover:bg-[var(--brand-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)]"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <div className="divide-y divide-[var(--brand-border)]">
              {homeLink && (
                <MobileLink
                  item={homeLink}
                  active={isActive(homeLink.path)}
                  onClick={() => setIsOpen(false)}
                />
              )}
              {aboutLink && (
                <MobileLink
                  item={aboutLink}
                  active={isActive(aboutLink.path)}
                  onClick={() => setIsOpen(false)}
                />
              )}

              <div>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full flex items-center justify-between px-6 py-4 text-[16px] font-medium text-[var(--brand-text)] transition-colors hover:bg-[var(--brand-bg)] active:bg-[var(--brand-surface)]"
                  aria-expanded={mobileServicesOpen}
                >
                  Services
                  <ChevronDown
                    size={17}
                    className={`transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ease-out ${
                    mobileServicesOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-4 space-y-5 bg-[var(--brand-bg)]">
                      <Link
                        to="/services"
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center justify-between w-full rounded-lg bg-[var(--brand-surface)] px-4 py-3 text-sm font-semibold text-[var(--brand-text)] transition-colors hover:bg-[var(--brand-gold)] hover:text-white"
                      >
                        View all services
                        <ChevronRight size={16} />
                      </Link>
                      {serviceGroups.map((group) => (
                        <div key={group.title} className="pt-4">
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--brand-gold)] mb-2">
                            {group.title}
                          </p>
                          <div className="space-y-1">
                            {group.items.map((item) => (
                              <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className="block py-1.5 text-sm text-[var(--brand-text)]/70 transition-colors hover:text-[var(--brand-gold)] active:text-[var(--brand-text)]"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Home, About us, Services already rendered above — no duplicates */}
              {restLinks.map((item) => (
                <MobileLink
                  key={item.path}
                  item={item}
                  active={isActive(item.path)}
                  onClick={() => setIsOpen(false)}
                />
              ))}
            </div>

            <div className="p-6">
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                <button className="w-full bg-[var(--brand-gold)] active:bg-[var(--brand-gold-dark)] text-[var(--brand-text)] font-semibold py-3.5 rounded-lg transition-transform duration-150 active:scale-[0.98]">
                  Get Consultation
                </button>
              </Link>
            </div>
          </div>
        </div>

        <style>{`
        /* Logo hover: zoom in + a quick side-to-side vibration. */
        .group\\/logo:hover .logo-img {
          animation: logoHoverVibrate 0.5s ease-in-out;
        }
        @keyframes logoHoverVibrate {
          0%   { transform: scale(1) rotate(0deg); }
          20%  { transform: scale(1.12) rotate(-3deg); }
          40%  { transform: scale(1.12) rotate(3deg); }
          60%  { transform: scale(1.12) rotate(-2deg); }
          80%  { transform: scale(1.12) rotate(2deg); }
          100% { transform: scale(1.08) rotate(0deg); }
        }
        /* Keep the zoom held while the cursor stays on the logo, after the
           vibration settles. */
        .group\\/logo:hover .logo-img {
          transform: scale(1.08);
        }

        /* Logo click: a quick squash-and-pop pulse, layered on top of hover. */
        .logo-pulse {
          animation: logoClickPulse 0.36s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes logoClickPulse {
          0%   { transform: scale(1); }
          35%  { transform: scale(0.9); }
          70%  { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .group\\/logo:hover .logo-img,
          .logo-pulse {
            animation: none;
            transform: none;
          }
        }
      `}</style>
      </header>
      <div aria-hidden="true" className="h-20 lg:h-[84px]" />
    </>
  );
}

// Desktop link with a hairline underline that reflects hover/active state
function NavLink({ item, active }) {
  return (
    <Link
      to={item.path}
      className={`group relative py-2 text-[15px] font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)] focus-visible:ring-offset-2 rounded ${
        active
          ? "text-[var(--brand-gold)]"
          : "text-[var(--brand-text)] hover:text-[var(--brand-gold)]"
      }`}
    >
      {item.name}
      <span
        className={`absolute -bottom-0.5 left-0 h-px bg-[var(--brand-gold)] transition-all duration-300 ${
          active ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
}

// Mobile drawer link with a left accent bar for the active route
function MobileLink({ item, active, onClick }) {
  return (
    <Link
      to={item.path}
      onClick={onClick}
      className={`relative block px-6 py-4 text-[16px] font-medium transition-colors ${
        active
          ? "text-[var(--brand-gold)] bg-[var(--brand-gold)]/5"
          : "text-[var(--brand-text)] hover:bg-[var(--brand-bg)] active:bg-[var(--brand-surface)]"
      }`}
    >
      {active && (
        <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--brand-gold)]" />
      )}
      {item.name}
    </Link>
  );
}
