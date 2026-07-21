import React from "react";

const PHOTO = "data:image/jpeg;base64,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";

const INK = "#182A3A";
const INK_SOFT = "#3E5468";
const MANILA = "#DED2B4";
const MANILA_DEEP = "#CBBB93";
const BRASS = "#9C7A34";
const BRASS_LIGHT = "#B79A55";
const MAROON = "#6E2027";
const PAPER = "#F3ECDA";

export default function KunalAroraProfile() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: MANILA,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        fontFamily: "'Source Serif 4', Georgia, serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=Source+Serif+4:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');
        .kaa-eyebrow {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }
        .kaa-label {
          font-family: 'Inter', sans-serif;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .kaa-body {
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: 14.5px;
          line-height: 1.72;
        }
        .kaa-entry-title {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.01em;
        }
        @media (max-width: 760px) {
          .kaa-grid { grid-template-columns: 1fr !important; }
          .kaa-photo-col { order: -1; }
        }
      `}</style>

      <div
        style={{
          width: "100%",
          maxWidth: "980px",
          background: PAPER,
          border: `1px solid ${MANILA_DEEP}`,
          boxShadow: "0 1px 0 rgba(24,42,58,0.06)",
          position: "relative",
        }}
      >
        {/* top hairline with docket number */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "18px 40px",
            borderBottom: `1px solid ${MANILA_DEEP}`,
          }}
        >
          <span className="kaa-eyebrow" style={{ color: BRASS }}>
            Kutumbh Mitra Foundation &middot; Counsel Profile
          </span>
          <span className="kaa-eyebrow" style={{ color: INK_SOFT }}>
            File No. KMF&#8209;001
          </span>
        </div>

        <div
          className="kaa-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "320px 1fr",
          }}
        >
          {/* Left: photo plate */}
          <div
            className="kaa-photo-col"
            style={{
              padding: "40px",
              borderRight: `1px solid ${MANILA_DEEP}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ position: "relative", width: "100%" }}>
              <div
                style={{
                  border: `1px solid ${BRASS}`,
                  padding: "6px",
                  background: "#fff",
                }}
              >
                <img
                  src={PHOTO}
                  alt="Adv. Kunal Arora"
                  style={{
                    width: "100%",
                    display: "block",
                    filter: "grayscale(0.12) contrast(1.03)",
                  }}
                />
              </div>

              {/* seal badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-22px",
                  right: "-22px",
                  width: "76px",
                  height: "76px",
                }}
              >
                <svg viewBox="0 0 100 100" width="76" height="76">
                  <circle cx="50" cy="50" r="47" fill={PAPER} stroke={BRASS} strokeWidth="2" />
                  <circle cx="50" cy="50" r="39" fill="none" stroke={BRASS} strokeWidth="1" />
                  <path
                    d="M50 30 L50 62 M38 36 L50 30 L62 36 M30 40 h16 M54 40 h16 M34 40 L30 50 L38 50 Z M58 40 L54 50 L62 50 Z M40 66 h20"
                    fill="none"
                    stroke={INK}
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <text
                    x="50"
                    y="80"
                    textAnchor="middle"
                    fontFamily="Inter, sans-serif"
                    fontSize="9"
                    fontWeight="700"
                    letterSpacing="1"
                    fill={MAROON}
                  >
                    G.D.
                  </text>
                </svg>
              </div>
            </div>

            <div style={{ marginTop: "34px", width: "100%" }}>
              <div className="kaa-label" style={{ color: BRASS, marginBottom: "10px" }}>
                Standing
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  "Advocate, High Court of Punjab & Haryana, Chandigarh",
                  "Founder & President, Kutumbh Mitra Foundation",
                  "MBA Graduate",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="kaa-body"
                    style={{
                      color: INK,
                      paddingLeft: "14px",
                      position: "relative",
                      marginBottom: "8px",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "10px",
                        width: "5px",
                        height: "5px",
                        background: MAROON,
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: docket */}
          <div style={{ padding: "40px 44px" }}>
            <div className="kaa-eyebrow" style={{ color: MAROON, marginBottom: "10px" }}>
              Advocate &middot; Researcher &middot; Spiritualist
            </div>
            <h1
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 600,
                fontSize: "40px",
                color: INK,
                margin: "0 0 6px",
                lineHeight: 1.08,
              }}
            >
              Adv. Kunal Arora
              <span style={{ fontSize: "20px", color: BRASS, fontWeight: 500 }}>
                {" "}(G.D.)
              </span>
            </h1>
            <div
              style={{
                width: "56px",
                height: "2px",
                background: MAROON,
                margin: "16px 0 22px",
              }}
            />

            <p className="kaa-body" style={{ color: INK, margin: "0 0 22px" }}>
              Kunal Arora practices before the High Court of Punjab &amp; Haryana
              and founded the Kutumbh Mitra Foundation to carry legal advocacy
              into community work. Trained in both law and management, he pairs
              courtroom rigour with an MBA&rsquo;s eye for organisation &mdash; and, as a
              researcher and spiritualist, treats public service as a discipline
              as much as a duty.
            </p>

            <div
              style={{
                background: MANILA,
                border: `1px solid ${MANILA_DEEP}`,
                padding: "22px 26px",
                marginBottom: "22px",
              }}
            >
              <div className="kaa-label" style={{ color: BRASS, marginBottom: "14px" }}>
                Docket &middot; Prior Service
              </div>
              <div
                className="kaa-entry-title"
                style={{ color: INK, marginBottom: "4px" }}
              >
                Student Leader
              </div>
              <p className="kaa-body" style={{ color: INK_SOFT, margin: 0, fontSize: "13.5px" }}>
                Office of Director, UILS &amp; PRO&ndash;VC (AA), Chandigarh
                University &mdash; work spanning student welfare, youth affairs
                and public relations.
              </p>
            </div>

            <div className="kaa-label" style={{ color: BRASS, marginBottom: "14px" }}>
              Areas of Focus
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px 28px",
              }}
            >
              {[
                ["Legal Advocacy", "Representation before the High Court of Punjab & Haryana."],
                ["Youth Empowerment", "Programmes that build leadership grounded in values."],
                ["Social Welfare", "Community initiatives run through Kutumbh Mitra Foundation."],
                ["Research & Reflection", "Combining scholarship with a spiritual outlook on service."],
              ].map(([title, desc], i) => (
                <div key={i} style={{ borderLeft: `2px solid ${BRASS_LIGHT}`, paddingLeft: "12px" }}>
                  <div className="kaa-entry-title" style={{ color: INK, marginBottom: "3px" }}>
                    {title}
                  </div>
                  <div className="kaa-body" style={{ color: INK_SOFT, fontSize: "13px", lineHeight: 1.55 }}>
                    {desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* footer ribbon */}
        <div
          style={{
            borderTop: `1px solid ${MANILA_DEEP}`,
            padding: "16px 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span className="kaa-label" style={{ color: MAROON }}>
            Empowering Youth &middot; Strengthening Welfare &middot; Leading with Values
          </span>
          <span className="kaa-label" style={{ color: INK_SOFT }}>
            Chandigarh
          </span>
        </div>
      </div>
    </div>
  );
}