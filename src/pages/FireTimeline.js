// src/pages/WildfireCrossword.js
import React, { useMemo, useState } from "react";
// at top of FireTimeline.js
import tunnelImg from "../assets/tunnelfire2.jpg";
import tubbsImg from "../assets/tubbsfire.jpg";
import campImg from "../assets/campfire2.jpeg";
import czuImg from "../assets/czusantacruz.jpg";
import dixieImg from "../assets/dixiefire.jpg";
import parkImg from "../assets/parkfire2.jpg";
import palisadesImg from "../assets/palisadesfire.jpeg";


/**
 * FireTimeline — simple interactive timeline of major wildfires.
 * - Click/Enter a dot to open details below the timeline.
 * - No extra libraries required.
 *
 * Edit the DATA array to add/remove fires.
 */

const DATA = [
  {
    id: "oakland-1991",
    name: "Oakland–Berkeley (Tunnel) Fire",
    date: "1991-10-20",
    year: 1991,
    image: tunnelImg,
    location: "East Bay Hills (CA)",
    acres: "≈1,520",
    impact: "25 lives lost; ~3,300 homes destroyed",
    cause: "Re-ignition of a vegetation fire under Diablo winds",
    blurb:
      "Explosive WUI firestorm driven by downslope Diablo winds; reshaped regional codes and evacuation planning.",
    links: [
      { label: "City of Berkeley Fire", href: "https://www.cityofberkeley.info/fire/" }
    ],
  },
  {
    id: "tubbs-2017",
    name: "Tubbs Fire",
    date: "2017-10-08",
    year: 2017,
    image: tubbsImg,
    location: "Sonoma & Napa (CA)",
    acres: "≈36,800",
    impact: "22 lives lost; ~5,600 structures destroyed",
    blurb:
      "Nighttime wind-driven event; rapid spread into Santa Rosa via the Mark West corridor.",
    links: [{ label: "CAL FIRE Incident Archive", href: "https://www.fire.ca.gov/incidents/" }],
  },
  {
    id: "camp-2018",
    name: "Camp Fire",
    date: "2018-11-08",
    year: 2018,
    image: campImg,
    location: "Butte County (CA)",
    acres: "≈153,000",
    impact: "85 lives lost; ~18,800 structures destroyed",
    blurb:
      "Paradise and neighboring communities devastated; landmark case for evacuation, alerts, and hardened infrastructure.",
    links: [{ label: "CAL FIRE Incident Archive", href: "https://www.fire.ca.gov/incidents/" }],
  },
  {
    id: "dixie-2021",
    name: "Dixie Fire",
    date: "2021-07-13",
    year: 2021,
    image: dixieImg,
    location: "Northern Sierra (CA)",
    acres: "≈963,000",
    impact: "1,300+ structures destroyed; long-duration megafire",
    blurb:
      "Fifth-largest single wildfire in CA history; complex topography, plume-dominated periods, and long perimeter.",
    links: [{ label: "CAL FIRE Incident Archive", href: "https://www.fire.ca.gov/incidents/" }],
  },
  {
    id: "czu-2020",
    name: "CZU Lightning Complex",
    date: "2020-08-16",
    year: 2020,
    image: czuImg,
    location: "San Mateo & Santa Cruz (CA)",
    acres: "≈86,500",
    impact: "1,400+ structures destroyed; Big Basin impacts",
    blurb:
      "Lightning-caused complex during the August 2020 lightning siege; redwood ecosystems and WUI evacuations.",
    links: [{ label: "CAL FIRE Incident Archive", href: "https://www.fire.ca.gov/incidents/" }],
  },
  {
    id: "park-2024",
    name: "Park Fire",
    date: "2024-07-26",
    year: 2024,
    image: parkImg,
    location: "Tehama & Butte (CA)",
    acres: "≈400,000+",
    impact: "Large perimeter, long-duration summer incident",
    blurb:
      "Hot, dry, windy season conditions with long-range spotting; major resource commitment across the North State.",
    links: [{ label: "CAL FIRE Incidents", href: "https://www.fire.ca.gov/incidents/" }],
  },
  {
    id: "palisades-2025",
    name: "Palisades Fire",
    date: "2025-01-05",
    year: 2025,
    image: palisadesImg,
    location: "Los Angeles (CA)",
    acres: "—",
    impact: "Wind-driven WUI fire; mutual-aid deployments",
    blurb:
      "Steep canyons and offshore winds pushed fire toward neighborhoods; example of complex urban-interface operations.",
    links: [{ label: "LA City/County Fire", href: "https://fire.lacounty.gov/" }],
  },
];

export default function FireTimeline() {
  const [activeId, setActiveId] = useState(DATA[DATA.length - 1].id);

  // Sort by date ascending for a left-to-right timeline
  const items = useMemo(() => [...DATA].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  ), []);

  const active = items.find((d) => d.id === activeId) ?? items[0];

  return (
    <div style={{ minHeight: "100vh", background: "transparent" }}>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backdropFilter: "blur(6px)",
          background: "rgba(0,0,0,0.45)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "14px 18px" }}>
          <h1 style={{ margin: 0, color: "#fff", fontSize: 26, fontFamily: "Times New Roman" }}>
            Timeline of Major Fires
          </h1>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "18px" }}>
        {/* Timeline rail */}
        <div
          role="tablist"
          aria-label="Fire timeline"
          style={{
            overflowX: "auto",
            padding: "10px 6px 16px",
            borderBottom: "1px dashed rgba(255,255,255,0.25)",
            marginBottom: 16,
            scrollbarWidth: "thin",
          }}
        >
          <div
            style={{
              display: "grid",
              gridAutoFlow: "column",
              gap: 22,
              alignItems: "center",
              position: "relative",
            }}
          >
            {items.map((d) => {
              const selected = d.id === activeId;
              return (
                <button
                  key={d.id}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveId(d.id)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight") {
                      const i = items.findIndex((x) => x.id === d.id);
                      setActiveId(items[Math.min(i + 1, items.length - 1)].id);
                    } else if (e.key === "ArrowLeft") {
                      const i = items.findIndex((x) => x.id === d.id);
                      setActiveId(items[Math.max(i - 1, 0)].id);
                    }
                  }}
                  style={{
                    cursor: "pointer",
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    outlineOffset: 4,
                  }}
                  title={`${d.year} — ${d.name}`}
                >
                  <div style={{ display: "grid", justifyItems: "center", gap: 6 }}>
                    <span
                      style={{
                        width: selected ? 18 : 14,
                        height: selected ? 18 : 14,
                        borderRadius: "999px",
                        background: selected ? "#fb923c" : "#f59e0b",
                        border: "2px solid #fff",
                        boxShadow: selected
                          ? "0 0 0 6px rgba(251,146,60,0.25)"
                          : "0 0 0 2px rgba(255,255,255,0.15)",
                      }}
                    />
                    <span
                      style={{
                        color: selected ? "#fb923c" : "#e5e7eb",
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      {d.year}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Details panel with right-side image */}
        <article
          aria-live="polite"
          style={{
            border: "1px solid rgba(251,146,60,0.6)",
            background:
              "linear-gradient(180deg, rgba(251,146,60,0.18), rgba(17,24,39,0.6))",
            borderRadius: 14,
            padding: 16,
            color: "#f8fafc",
          }}
        >
          <div
            className="fire-detail"
            style={{
              display: "grid",
              gridTemplateColumns: active.image ? "1fr minmax(240px, 360px)" : "1fr",
              gap: 16,
              alignItems: "start",
            }}
          >
            {/* LEFT: text */}
            <div>
              <header style={{ marginBottom: 8 }}>
                <h2 style={{ margin: "0 0 4px", fontSize: 22, color: "#fff" }}>
                  {active.name}
                </h2>
                <p style={{ margin: 0, color: "#cbd5e1" }}>
                  {fmtDate(active.date)} · {active.location}
                </p>
              </header>

              <p style={{ marginTop: 6 }}>{active.blurb}</p>

              <dl
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px 1fr",
                  gap: "6px 12px",
                  marginTop: 10,
                }}
              >
                <dt style={dtStyle}>Acres</dt>
                <dd style={ddStyle}>{active.acres}</dd>

                {active.impact && (
                  <>
                    <dt style={dtStyle}>Impact</dt>
                    <dd style={ddStyle}>{active.impact}</dd>
                  </>
                )}

                {active.cause && (
                  <>
                    <dt style={dtStyle}>Cause</dt>
                    <dd style={ddStyle}>{active.cause}</dd>
                  </>
                )}
              </dl>

              {active.links?.length > 0 && (
                <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {active.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: "none",
                        color: "#111827",
                        background: "#fde68a",
                        border: "1px solid #f59e0b",
                        borderRadius: 999,
                        padding: "6px 10px",
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: image */}
            {active.image && (
              <figure style={{ margin: 0 }}>
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "4 / 3",
                    overflow: "hidden",
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.15)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
                    background: "rgba(0,0,0,0.3)",
                  }}
                >
                  <img
                    src={active.image}
                    alt={active.name}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
                {active.credit && (
                  <figcaption style={{ fontSize: 12, color: "#cbd5e1", marginTop: 6 }}>
                    {active.credit}
                  </figcaption>
                )}
              </figure>
            )}
          </div>

          {/* mobile stacking rule */}
          <style>{`
            @media (max-width: 720px) {
              .fire-detail { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </article>
      </main>
    </div>
  );
}

const dtStyle = { color: "#fbbf24", fontWeight: 700, fontSize: 13 };
const ddStyle = { margin: 0, fontSize: 14, color: "#f3f4f6" };

function fmtDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return iso;
  }
}
