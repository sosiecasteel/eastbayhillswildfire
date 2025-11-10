// src/components/AtAGlanceFire.js
import React from "react";

const BADGE_STYLES = {
  redflag:   { bg: "#991b1b", fg: "#fff", label: "Red Flag" },
  prescribed:{ bg: "#065f46", fg: "#fff", label: "Prescribed Burn" },
  incident:  { bg: "#9a3412", fg: "#fff", label: "Active Incident" },
  contained: { bg: "#14532d", fg: "#fff", label: "Contained" },
  aqi:       { bg: "#1f2937", fg: "#fff", label: "Air Quality" },
  info:      { bg: "#334155", fg: "#fff", label: "Info" },
};

function Badge({ kind }) {
  const k = (kind || "info").toLowerCase();
  const s = BADGE_STYLES[k] || BADGE_STYLES.info;
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        background: s.bg,
        color: s.fg,
        letterSpacing: 0.2,
      }}
    >
      {s.label}
    </span>
  );
}

/**
 * items: Array of { title, date, location, summary, href, badge, meta }
 * - badge: one of 'redflag' | 'prescribed' | 'incident' | 'contained' | 'aqi' | 'info'
 * - href: internal ("/#/route") or external ("https://…")
 */
export default function AtAGlanceFire({ items = [] }) {
  return (
    <section
      aria-labelledby="fire-at-a-glance"
      style={{
        borderRadius: 16,
        border: "1px solid #fdba74",
        background:
          "linear-gradient(180deg, #ffedd5 0%, #fed7aa 40%, #fb923c 40%, #fb923c 100%)",
        color: "#0f172a",
        overflow: "hidden",
        boxShadow: "0 12px 28px rgba(249,115,22,0.25)",
      }}
    >
      {/* Header strip */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 14px",
          background: "rgba(0,0,0,0.06)",
          borderBottom: "1px solid #fdba74",
        }}
      >
        <h2
            id="fire-at-a-glance"
            style={{
                margin: 0,
                fontSize: 18,
                fontFamily: "'Times New Roman', sans-serif", // or any other web-safe / imported font
                fontWeight: 1100,
                letterSpacing: "0.5px"
            }}
            >
            At-a-Glance: Fire
            </h2>
      </div>

      {/* Body */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 10,
          padding: 12,
          background: "linear-gradient(180deg, #fff7ed 0%, #ffedd5 100%)",
        }}
      >
        {items.slice(0, 5).map((it, i) => {
          const isExternal = (it.href || "").startsWith("http");
          return (
            <article
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: 10,
                alignItems: "start",
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid #fed7aa",
                background: "#fff",
              }}
            >
              <div style={{ paddingTop: 2 }}>
                <Badge kind={it.badge} />
              </div>

              <div>
                <h3 style={{ margin: "0 0 4px", fontSize: 16, lineHeight: 1.3 }}>
                  <a
                    href={it.href}
                    target={isExternal ? "_blank" : "_self"}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    style={{ color: "#9a3412", textDecoration: "none" }}
                  >
                    {it.title}
                  </a>
                </h3>
                <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>
                  {it.date} {it.location ? `· ${it.location}` : ""}
                  {it.meta ? ` · ${it.meta}` : ""}
                </p>
                {it.summary && (
                  <p style={{ margin: "6px 0 0", fontSize: 14, color: "#1f2937" }}>
                    {it.summary}
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Footer quick links */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          padding: "10px 12px",
          background: "#fb923c",
          borderTop: "1px solid #f97316",
        }}
      >
        <QuickLink href="https://community.zonehaven.com/">Evacuation Zones</QuickLink>
        <QuickLink href="https://fire.airnow.gov/">Fire & Smoke Map</QuickLink>
        <QuickLink href="/#/berkeley-guide">Berkeley Wildfire Guide</QuickLink>
        <QuickLink href="https://www.fire.ca.gov/incidents/">CAL FIRE Incidents</QuickLink>
      </div>
    </section>
  );
}

function QuickLink({ href, children }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : "_self"}
      rel={external ? "noopener noreferrer" : undefined}
      style={{
        fontSize: 13,
        fontWeight: 600,
        color: "#1f2937",
        background: "rgba(255,255,255,0.85)",
        padding: "6px 10px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.9)",
        textDecoration: "none",
      }}
    >
      {children} {external ? "↗" : ""}
    </a>
  );
}
