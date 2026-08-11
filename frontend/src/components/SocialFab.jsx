import React, { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from "react-icons/fa";

/**
 * Design tokens
 * ink        #0B1F3A  deep navy   — base surface
 * gold       #C9A24B  brand accent — trigger + active states
 * gold-soft  #E7CA82  gold, lighter — tooltip text
 * line       rgba(255,255,255,.12) — hairlines / dividers
 *
 * One mechanism, every breakpoint: a single trigger FAB in the
 * bottom-right corner opens a vertical "swipe" dropdown of platform
 * stops. No separate desktop-rail / mobile-fab split to keep in sync —
 * one component, one behavior, one place to add a platform.
 */

// Lucide has no WhatsApp mark, so this is a small original glyph
// (bubble + handset) rather than a trace of Meta's logo.
function WhatsAppGlyph({ size = 18, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M12 3a9 9 0 0 0-7.75 13.5L3 21l4.65-1.22A9 9 0 1 0 12 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9 8.7c.15-.55.5-.6.85-.6h.4c.24 0 .43.16.5.4l.5 1.5c.06.2 0 .4-.15.55l-.5.5c-.1.1-.12.25-.05.4.4.9 1.15 1.65 2.05 2.05.15.07.3.05.4-.05l.5-.5c.15-.15.35-.2.55-.15l1.5.5c.24.07.4.26.4.5v.4c0 .35-.05.7-.6.85-1.9.5-4.4-.85-5.7-2.15C8.15 13.1 6.8 10.6 7.3 8.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

const socialLinks = [
  {
    icon: WhatsAppGlyph,
    link: "https://wa.me/918168099183",
    label: "WhatsApp",
    bg: "bg-[#25D366]",
  },
  {
    icon: FaLinkedinIn,
    link: "https://linkedin.com",
    label: "LinkedIn",
    bg: "bg-[#0A66C2]",
  },
  {
    icon: FaTwitter,
    link: "https://twitter.com",
    label: "Twitter",
    bg: "bg-gradient-to-br from-[#1DA1F2] to-[#0C2340]",
  },
  {
    icon: FaFacebookF,
    link: "https://facebook.com",
    label: "Facebook",
    bg: "bg-[#1877F2]",
  },
  {
    icon: FaInstagram,
    link: "https://instagram.com",
    label: "Instagram",
    bg: "bg-gradient-to-br from-[#FEDA75] via-[#D62976] to-[#4F5BD5]",
  },
];

export default function SocialFab() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  // close on outside click / Escape — a dropdown should behave like one
  useEffect(() => {
    function onDown(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
    >
      {/* dropdown stops */}
      <ul className="flex flex-col items-end gap-2.5">
        {socialLinks.map(({ icon: Icon, link, label, bg }, i) => {
          const delay = open ? i * 45 : (socialLinks.length - 1 - i) * 35;
          return (
            <li
              key={label}
              className={`flex items-center gap-3 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open
                  ? "translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none translate-y-3 scale-95 opacity-0"
              }`}
              style={{ transitionDelay: `${delay}ms` }}
            >
              <span className="whitespace-nowrap rounded-full bg-[#0B1F3A] px-3 py-1.5 text-xs font-medium text-[#E7CA82] shadow-lg shadow-black/20">
                {label}
              </span>
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                tabIndex={open ? 0 : -1}
                className={`group flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg shadow-black/30 outline-none ring-1 ring-white/20 transition-transform duration-200 hover:scale-110 focus-visible:ring-2 focus-visible:ring-[#E7CA82] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${bg}`}
              >
                <Icon size={19} className="drop-shadow-sm" />
              </a>
            </li>
          );
        })}
      </ul>

      {/* trigger */}
      <button
        type="button"
        aria-label={open ? "Close social links" : "Open social links"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A24B] text-[#0B1F3A] shadow-[0_16px_32px_rgba(201,162,75,0.4)] transition-transform duration-300 active:scale-95"
      >
        <Plus
          size={22}
          strokeWidth={2.5}
          className={`transition-transform duration-300 ${open ? "rotate-45" : "rotate-0"}`}
        />
      </button>
    </div>
  );
}