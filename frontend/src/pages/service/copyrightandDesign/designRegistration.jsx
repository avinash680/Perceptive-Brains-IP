import React, { useEffect, useRef, useState } from "react";

/**
 * Design Registration in India — presented as a Gazette / Certificate of Registration.
 * Palette: Ink Navy, Gazette Cream, Seal Vermilion, Registry Green, Gold Foil.
 * Type: Fraunces (display), IBM Plex Sans (body), IBM Plex Mono (clause data/utility).
 */

const SECTIONS = [
  {
    id: "understanding",
    clause: "Cl. 1",
    title: "Understanding Design Registration",
    body: [
      "Design registration protects the visual appearance of a product — its shape, configuration, pattern, or ornamentation — rather than the way it works or what it's made of.",
      "A registered design gives the owner exclusive commercial use of that appearance, strengthening brand identity and adding a distinct asset to an IP portfolio.",
    ],
  },
  {
    id: "framework",
    clause: "Cl. 2",
    title: "Legal Framework",
    body: [
      "Governed by the Designs Act, 2000 and the Designs Rules, 2001, administered by the Controller General of Patents, Designs and Trade Marks (CGPDTM).",
    ],
    facts: [
      ["Statute", "Designs Act, 2000"],
      ["Rules", "Designs Rules, 2001"],
      ["Authority", "CGPDTM"],
    ],
  },
  {
    id: "eligibility",
    clause: "Cl. 3",
    title: "Eligibility Criteria",
    checklist: [
      "New and original — not disclosed anywhere before the filing date",
      "Consists of shape, configuration, pattern, or ornament applied by an industrial process",
      "Significantly distinguishable from known designs or combinations",
      "Free of scandalous or obscene matter",
      "Not contrary to public order or morality",
    ],
  },
  {
    id: "importance",
    clause: "Cl. 4",
    title: "Why It Matters",
    cards: [
      ["Legal shield", "Grounds to act against unauthorised copying or imitation."],
      ["Market value", "A distinctive, protected look that supports sales and share."],
      ["Deal leverage", "An asset that can be licensed or sold to other companies."],
    ],
  },
  {
    id: "duration",
    clause: "Cl. 5",
    title: "Duration & Renewal",
    duration: true,
    body: [
      "Protection runs for an initial term of ten years from registration, extendable by five more years on payment of the renewal fee. Miss the renewal, and exclusivity lapses.",
    ],
  },
  {
    id: "rights",
    clause: "Cl. 6",
    title: "Rights Conferred",
    checklist: [
      "Exclusive right to apply the design to the registered article",
      "Power to stop others making, using, or selling infringing products",
      "Standing to sue infringers and claim damages",
    ],
  },
  {
    id: "infringement",
    clause: "Cl. 7",
    title: "Infringement",
    warn: true,
    body: [
      "Infringement is unauthorised use, copying, or imitation of a registered design. Owners can seek injunctions, claim damages, and pursue action in the appropriate court — vigilance is the first line of defence.",
    ],
  },
  {
    id: "opposition",
    clause: "Cl. 8",
    title: "Opposition to Registration",
    body: [
      "Third parties may oppose an application — commonly on grounds of lacking novelty or conflicting with an existing registered design. The office examines both the objection and the applicant's response before deciding.",
    ],
  },
  {
    id: "international",
    clause: "Cl. 9",
    title: "International Registration",
    body: [
      "Through the Hague Agreement, a single application can seek design protection across multiple member countries — a strategic route for businesses with global ambitions.",
    ],
  },
  {
    id: "mistakes",
    clause: "Cl. 10",
    title: "Common Mistakes",
    dos: [
      "Prepare complete, accurate representations",
      "Respond to office objections promptly",
      "Engage a qualified design agent early",
    ],
    donts: [
      "Filing with inadequate documentation",
      "Leaving objections unanswered",
      "Delaying filing until after public disclosure",
    ],
  },
  {
    id: "agents",
    clause: "Cl. 11",
    title: "Role of Agents & Attorneys",
    body: [
      "Design agents and attorneys bring IP-law expertise and procedural familiarity — helping applicants meet requirements, answer objections, and move applications through to grant.",
    ],
  },
  {
    id: "early",
    clause: "Cl. 12",
    title: "Benefits of Early Filing",
    body: [
      "Filing early locks in exclusivity before a design reaches the market, strengthens the IP portfolio, and signals discipline to investors and partners — a foundation for future growth.",
    ],
  },
];

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function Seal({ stamped }) {
  const spokes = Array.from({ length: 20 });
  return (
    <div
      style={{
        transform: stamped ? "scale(1) rotate(0deg)" : "scale(2.6) rotate(-18deg)",
        opacity: stamped ? 1 : 0,
        transition: "transform 900ms cubic-bezier(.2,.9,.25,1), opacity 500ms ease",
      }}
    >
      <svg width="168" height="168" viewBox="0 0 168 168" fill="none">
        <circle cx="84" cy="84" r="80" stroke="#A9782F" strokeWidth="1.5" fill="none" />
        <circle cx="84" cy="84" r="70" fill="#BE4B23" />
        <circle cx="84" cy="84" r="70" fill="none" stroke="#F0E9D8" strokeWidth="1" strokeDasharray="2 3" />
        {spokes.map((_, i) => {
          const a = (i / spokes.length) * Math.PI * 2;
          const x1 = 84 + Math.cos(a) * 44;
          const y1 = 84 + Math.sin(a) * 44;
          const x2 = 84 + Math.cos(a) * 62;
          const y2 = 84 + Math.sin(a) * 62;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#F0E9D8"
              strokeWidth="1.2"
              opacity="0.85"
            />
          );
        })}
        <circle cx="84" cy="84" r="42" fill="#BE4B23" stroke="#F0E9D8" strokeWidth="1.4" />
        <text
          x="84"
          y="78"
          textAnchor="middle"
          fontFamily="'IBM Plex Mono', monospace"
          fontSize="10"
          letterSpacing="1.5"
          fill="#F0E9D8"
        >
          REGISTERED
        </text>
        <text
          x="84"
          y="94"
          textAnchor="middle"
          fontFamily="'Fraunces', serif"
          fontSize="13"
          fontWeight="600"
          fill="#F0E9D8"
        >
          DESIGN
        </text>
      </svg>
    </div>
  );
}

export default function DesignRegistrationIndia() {
  const [stamped, setStamped] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStamped(true), 250);
    return () => clearTimeout(t);
  }, []);

  const ids = SECTIONS.map((s) => s.id);
  const active = useActiveSection(ids);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      style={{
        fontFamily: "'IBM Plex Sans', sans-serif",
        background: "#F0E9D8",
        color: "#22201B",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .gazette-bg {
          background-image:
            radial-gradient(circle at 1px 1px, rgba(34,32,27,0.06) 1px, transparent 0);
          background-size: 18px 18px;
        }
        .perforation {
          background-image: radial-gradient(circle, #F0E9D8 3px, transparent 3.2px);
          background-size: 16px 16px;
          background-position: center;
          height: 12px;
        }
        .clause-card {
          transition: border-color 250ms ease, transform 250ms ease, box-shadow 250ms ease;
        }
        .clause-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(28, 37, 65, 0.10);
        }
        .toc-link {
          transition: color 200ms ease, border-color 200ms ease, padding-left 200ms ease;
        }
        ::selection {
          background: #BE4B23;
          color: #F0E9D8;
        }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>

      {/* HERO */}
      <header
        className="gazette-bg"
        style={{
          background: "#1C2541",
          color: "#F0E9D8",
          borderBottom: "6px double #A9782F",
          padding: "56px 24px 40px",
        }}
      >
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 32,
              flexWrap: "wrap",
            }}
          >
            <div style={{ maxWidth: 560 }}>
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 12,
                  letterSpacing: 3,
                  color: "#C9A34E",
                  marginBottom: 18,
                  textTransform: "uppercase",
                }}
              >
                The Designs Act, 2000 · Government of India
              </div>
              <h1
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 600,
                  fontSize: "clamp(38px, 5.5vw, 62px)",
                  lineHeight: 1.05,
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                Certificate of<br />
                <span style={{ fontStyle: "italic", color: "#D98B5F" }}>Design Registration</span>
              </h1>
              <p
                style={{
                  marginTop: 20,
                  fontSize: 17,
                  lineHeight: 1.65,
                  color: "#CBD1DE",
                  maxWidth: 480,
                }}
              >
                A field guide to protecting the shape, pattern, and ornament of
                an article under Indian law — from eligibility to renewal.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
                <button
                  onClick={() => scrollTo("understanding")}
                  style={{
                    background: "#BE4B23",
                    color: "#F0E9D8",
                    border: "none",
                    padding: "12px 22px",
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: "pointer",
                    letterSpacing: 0.3,
                  }}
                >
                  Read the record →
                </button>
              </div>
            </div>
            <div style={{ flexShrink: 0 }}>
              <Seal stamped={stamped} />
            </div>
          </div>

          {/* meta strip */}
          <div
            style={{
              marginTop: 44,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: 1,
              background: "rgba(240,233,216,0.18)",
              border: "1px solid rgba(240,233,216,0.25)",
            }}
          >
            {[
              ["Term", "10 + 5 yrs"],
              ["Authority", "CGPDTM"],
              ["Treaty route", "Hague Agreement"],
              ["Scope", "Shape · Pattern · Ornament"],
            ].map(([k, v]) => (
              <div key={k} style={{ background: "#1C2541", padding: "16px 18px" }}>
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 10.5,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    color: "#9AA3B6",
                    marginBottom: 6,
                  }}
                >
                  {k}
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#F0E9D8" }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="perforation" style={{ background: "#1C2541" }} />

      {/* BODY: TOC + sections */}
      <div
        style={{
          maxWidth: 1040,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "220px 1fr",
          gap: 48,
          padding: "48px 24px 96px",
        }}
      >
        {/* TOC */}
        <nav
          style={{
            position: "sticky",
            top: 24,
            alignSelf: "start",
            display: window.innerWidth < 820 ? "none" : "block",
          }}
        >
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              letterSpacing: 2,
              color: "#8A8672",
              marginBottom: 14,
              textTransform: "uppercase",
            }}
          >
            Index of Clauses
          </div>
          <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {SECTIONS.map((s) => (
              <li key={s.id} style={{ marginBottom: 4 }}>
                <button
                  onClick={() => scrollTo(s.id)}
                  className="toc-link"
                  style={{
                    background: "none",
                    border: "none",
                    borderLeft:
                      active === s.id ? "2px solid #BE4B23" : "2px solid transparent",
                    textAlign: "left",
                    cursor: "pointer",
                    padding: "6px 0 6px 12px",
                    width: "100%",
                    color: active === s.id ? "#1C2541" : "#6B6858",
                    fontWeight: active === s.id ? 600 : 400,
                    fontSize: 13.5,
                    lineHeight: 1.35,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 10.5,
                      color: "#A9782F",
                      marginRight: 8,
                    }}
                  >
                    {s.clause}
                  </span>
                  {s.title}
                </button>
              </li>
            ))}
          </ol>
        </nav>

        {/* Sections */}
        <div>
          {SECTIONS.map((s, i) => (
            <section
              key={s.id}
              id={s.id}
              className="clause-card"
              style={{
                background: "#FBF7EC",
                border: "1px solid #DDD3B8",
                borderRadius: 2,
                padding: "30px 32px",
                marginBottom: 24,
                scrollMarginTop: 24,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 10,
                  marginBottom: 14,
                }}
              >
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 11.5,
                    color: "#BE4B23",
                    letterSpacing: 1,
                  }}
                >
                  {s.clause}
                </span>
                <h2
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontWeight: 600,
                    fontSize: 24,
                    margin: 0,
                    color: "#1C2541",
                  }}
                >
                  {s.title}
                </h2>
              </div>

              {s.body &&
                s.body.map((p, idx) => (
                  <p
                    key={idx}
                    style={{
                      fontSize: 15.5,
                      lineHeight: 1.75,
                      color: "#3A3728",
                      marginBottom: 10,
                    }}
                  >
                    {p}
                  </p>
                ))}

              {s.facts && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px,1fr))",
                    gap: 10,
                    marginTop: 16,
                  }}
                >
                  {s.facts.map(([k, v]) => (
                    <div
                      key={k}
                      style={{
                        border: "1px solid #DDD3B8",
                        padding: "10px 14px",
                        background: "#F0E9D8",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: 10,
                          letterSpacing: 1,
                          textTransform: "uppercase",
                          color: "#8A8672",
                        }}
                      >
                        {k}
                      </div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: "#1C2541" }}>
                        {v}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {s.checklist && (
                <ul style={{ listStyle: "none", margin: "6px 0 0", padding: 0 }}>
                  {s.checklist.map((item, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "flex-start",
                        fontSize: 15,
                        lineHeight: 1.6,
                        color: "#3A3728",
                        padding: "7px 0",
                        borderBottom:
                          idx < s.checklist.length - 1 ? "1px dashed #DDD3B8" : "none",
                      }}
                    >
                      <span
                        style={{
                          color: "#1F6E4A",
                          fontWeight: 700,
                          fontFamily: "'IBM Plex Mono', monospace",
                          flexShrink: 0,
                        }}
                      >
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {s.cards && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))",
                    gap: 14,
                    marginTop: 8,
                  }}
                >
                  {s.cards.map(([t, d]) => (
                    <div
                      key={t}
                      style={{
                        borderTop: "3px solid #BE4B23",
                        background: "#F0E9D8",
                        padding: "16px 16px 18px",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Fraunces', serif",
                          fontWeight: 600,
                          fontSize: 16.5,
                          color: "#1C2541",
                          marginBottom: 6,
                        }}
                      >
                        {t}
                      </div>
                      <div style={{ fontSize: 13.5, color: "#3A3728", lineHeight: 1.55 }}>
                        {d}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {s.duration && (
                <div style={{ marginTop: 18 }}>
                  <div
                    style={{
                      display: "flex",
                      height: 34,
                      border: "1px solid #DDD3B8",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 12,
                    }}
                  >
                    <div
                      style={{
                        width: "67%",
                        background: "#1F6E4A",
                        color: "#F0E9D8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      Initial term · 10 years
                    </div>
                    <div
                      style={{
                        width: "33%",
                        background: "#A9782F",
                        color: "#F0E9D8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      Renewal · +5 years
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#8A8672",
                      marginTop: 6,
                      fontFamily: "'IBM Plex Mono', monospace",
                    }}
                  >
                    Miss the renewal fee at year 10 and exclusivity lapses.
                  </div>
                </div>
              )}

              {s.warn && (
                <div
                  style={{
                    marginTop: 4,
                    borderLeft: "3px solid #BE4B23",
                    background: "#F6E4DA",
                    padding: "10px 14px",
                    fontSize: 13.5,
                    color: "#7A2D14",
                    fontFamily: "'IBM Plex Mono', monospace",
                  }}
                >
                  Remedies: injunction · damages · court action
                </div>
              )}

              {s.dos && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 18,
                    marginTop: 8,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: 11,
                        letterSpacing: 1.5,
                        color: "#1F6E4A",
                        marginBottom: 8,
                      }}
                    >
                      DO
                    </div>
                    {s.dos.map((d, idx) => (
                      <div key={idx} style={{ fontSize: 14, marginBottom: 6, color: "#3A3728" }}>
                        — {d}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: 11,
                        letterSpacing: 1.5,
                        color: "#BE4B23",
                        marginBottom: 8,
                      }}
                    >
                      AVOID
                    </div>
                    {s.donts.map((d, idx) => (
                      <div key={idx} style={{ fontSize: 14, marginBottom: 6, color: "#3A3728" }}>
                        — {d}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          ))}

          {/* closing certificate strip */}
          <div
            style={{
              marginTop: 40,
              border: "1px solid #A9782F",
              padding: "24px 28px",
              background: "#1C2541",
              color: "#F0E9D8",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontStyle: "italic",
                  fontSize: 19,
                }}
              >
                Filed early, protected long.
              </div>
              <div style={{ fontSize: 13, color: "#9AA3B6", marginTop: 4 }}>
                Ten years, renewable by five — the clock starts at filing.
              </div>
            </div>
            <button
              onClick={() => scrollTo("understanding")}
              style={{
                background: "transparent",
                border: "1px solid #A9782F",
                color: "#F0E9D8",
                padding: "10px 18px",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 12.5,
                letterSpacing: 1,
                cursor: "pointer",
              }}
            >
              BACK TO TOP ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}