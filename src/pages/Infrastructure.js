import React from "react";
import ReactMarkdown from "react-markdown";
import "./Infrastructure.theme.css";
import house from "../assets/houseburning.png"; // adjust path as needed


/**
 * Infrastructure.js – Markdown page that summarizes
 * "Building to Coexist with Fire: Community Risk Reduction Measures for New Development in California"
 *
 * Usage:
 * 1) Install dependency: npm i react-markdown
 * 2) Drop this file into your pages (e.g., src/pages/Infrastructure.js)
 * 3) Add a route to render <Infrastructure />
 *
 * Styling: light, readable typography with a sticky local ToC.
 */

const md = `# Building to Coexist with Fire \n
**Community Risk Reduction Measures (RRMs) for New Development in California**\n\n*Based on Moritz & Butsic (UC ANR Publication 8680, April 2020).*\n\n---\n
## Why this matters\nWhere and how communities are built strongly influences their vulnerability to wildfire losses. Most guidance focuses on structure-level building codes and defensible space, but **community- and subdivision-scale choices** (siting, layout, density, infrastructure) can raise or lower risk dramatically. This page distills key RRMs for your infrastructure and planning briefs.\n\n> Goal: encourage smarter design and construction that allow communities to **coexist with inevitable wildfires** while addressing California's housing needs.\n\n---\n
## Core concepts\n- **Risk** = Hazard (fire behavior likelihood/severity) × Exposure (what's in harm’s way) × Vulnerability (susceptibility/defensibility).\n- **Scale matters:** Decisions at community + subdivision scales shape evacuation, suppression complexity, and ignition potential.\n- **Prefer compact growth:** In-fill and clustered development often lowers flammable edge length and simplifies defense.\n\n---\n
## Design Contexts & RRMs\n
### 1) Landscape Setting\n**RRM 1 — Engage earlier in strategic planning**\nBring fire professionals into *general plan* and growth discussions early (e.g., via LAFCo/economic development teams) so fire constraints guide siting before parcels and layouts are locked.\n\n**RRM 2 — Use hazard maps to concentrate in lower-hazard areas**\nEvaluate multiple layers when siting subdivisions:\n- CAL FIRE **Fire Hazard Severity Zones** (parcel-detailed, standardized weather).\n- **CPUC Statewide Utility Fire Threat** (includes modeled wind/weather; ~2 km).\n- USFS **Wildfire Hazard Potential** (~270 m; percentile weather).\n- **Fire Probability** models (baseline + future scenarios; ~1 km; includes development effects).\n\n**RRM 3 — Leverage major landscape features as buffers**\nSite near lasting, less-flammable features (water bodies, irrigated parks, active agriculture), and **preserve** their protective designations over time. Consider adjacency to existing, more ignition-resistant development; include buffer uses when adjacent neighborhoods are older/more vulnerable.\n\n---\n
### 2) Separation from Wildfire Source\n**RRM 4 — Use nonflammable/shared amenities as defensible space**\nGolf courses, irrigated greenways, vineyards/orchards, wide streets/sidewalks can ring or lace through subdivisions to increase separation. Codify maintenance in HOA/CC&Rs.\n\n**RRM 5 — Employ safe top-of-slope setbacks**\nBecause fire runs uphill, increase **distance from slope edges** (\`30–100 ft\` depending on flame length/building height). Combine with careful downslope vegetation management or engineered barriers (mind erosion/landslide trade-offs).\n\n**RRM 6 — Place homes on the inner side of perimeter roads**\nLet the road + verge act as passive defensible space; reduce perimeter-to-area ratio where feasible. Maintain evacuation alternatives that do not rely solely on perimeter roads.\n\n---\n
### 3) Density Management\n**RRM 7 — Cluster with other homes**\nHigher-density, code-hardened neighborhoods typically have **less flammable vegetation**, shorter edges, and are **easier to defend with fewer resources**. Pair clustering with buffered land uses (commercial, small-scale ag) and strong defensible-space standards to avoid structure-to-structure spread.\n\n---\n
### 4) Protective Infrastructure\n**RRM 8 — Harden public facilities & provide last-resort refuges**\nLocate schools, care facilities, hospitals on **interior sites** and build above WUI code baselines. Consider engineered **refuges of last resort** when full evacuation may fail; design for ember resistance and radiant heat for 30–60 min.\n\n**RRM 9 — Underground power lines**\nReduce wind-driven ignition sources by undergrounding distribution/service in new subdivisions and rebuilt corridors where feasible; weigh lifecycle costs against billion-dollar loss events.\n\n**RRM 10 — Augment water requirements**\nPlan for **pressure drops** and system failures in extremes. Add on-site storage, standardized fittings, testing/maintenance protocols, and consider **exterior sprinklers** (with dedicated supply) where appropriate.\n\n---\n
## Environmental & Planning Trade-offs\n- Favor **compact footprints** and internal open-space pockets with **moist/maintained plantings**; surround larger interior native pockets with defensible space and inward-facing lots.\n- Coordinate biologists, planners, fire agencies **early** to avoid later conflicts and to protect habitat corridors while lowering human risk.\n\n---\n
## Quick briefing one-pagers\n- **Siting priorities:** map overlays (FHSZ, CPUC HFTD, WHP, fire probability) → avoid steep, wind-exposed, fuel-heavy chimneys → prefer adjacency to low-hazard land uses.\n- **Subdivision checklist:** perimeter road strategy; top-of-slope setbacks; clustered blocks; irrigated buffers; dual egress; hydrant spacing + onsite storage; underground utilities in extreme corridors; candidate refuge buildings.\n- **Policy levers:** general plan safety elements; specific plans; subdivision ordinances; CC&Rs for amenity maintenance; undergrounding standards; water/sprinkler specs.\n\n---\n
## References & Further Reading\n- Moritz, M. & Butsic, V. (2020). *Building to Coexist with Fire: Community Risk Reduction Measures for New Development in California*. UC ANR Pub. 8680. DOI: 10.3733/ucanr.8680.\n- FEMA, NFPA, APA PAS 594, Headwaters Economics—planning tools and WUI best practices.\n\n*This page condenses the report for instructional use in your site’s Infrastructure section.*\n`;

// Add this helper inside the component (above the return)
const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const headerOffset = 84; // match your sticky header top offset
  const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
  window.scrollTo({ top: y, behavior: "smooth" });
};

export default function Infrastructure() {
  return (
    <div className="infra-root doc-ivory" style={{ minHeight: "100vh", background: "#feab4b" }}>
      <header className="infra-header" style={{ position: "sticky", top: 0, zIndex: 30, backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.85)", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "16px 20px" }}>
          <h1 style={{ margin: 0, fontSize: 28 }}>Infrastructure – Building to Coexist with Fire</h1>
          <p style={{ margin: "6px 0 0", color: "#64748b" }}>Concise RRMs for siting, layout, density, and infrastructure on fire‑prone landscapes</p>
        </div>
      </header>

      <main style={{ maxWidth: 960, margin: "0 auto", padding: "20px" }}>
        <div className="infra-grid" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 24 }}>
          {/* Local ToC */}
          <nav className="toc" style={{ position: "sticky", top: 84, alignSelf: "start", height: "max-content" }}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 14, color: "#334155" }}>
              {[
                ["Why this matters", "why-this-matters"],
                ["Core concepts", "core-concepts"],
                ["Design Contexts & RRMs", "design-contexts--rrms"],
                ["Environmental & Planning Trade-offs", "environmental--planning-trade-offs"],
                ["Quick briefing one-pagers", "quick-briefing-one-pagers"],
                ["References & Further Reading", "references--further-reading"],
              ].map(([label, hash]) => (
                <li key={hash} style={{ margin: "8px 0" }}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(hash);
                    }}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {label}
                  </a>
                </li>

              ))}
            </ul>
            <img
              src={house}
              alt="Clustered development and fire-safe infrastructure"
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                marginTop: 12,
                borderRadius: 8,
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)"
              }}
            />
          </nav>

          {/* Markdown content */}
          <article className="infra-doc markdown-body">
            <ReactMarkdown
              components={{
                h1: (p) => <h1 id="top" {...p} />,
                h2: (p) => {
                  const id = String(p.children).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                  return <h2 id={id} {...p} />;
                },
              }}
            >
              {md}
            </ReactMarkdown>
          </article>
        </div>
      </main>

      {/* Minimal styles for readable markdown */}
      <style>{`
        .markdown-body h1 { font-size: 28px; margin: 0 0 12px; }
        .markdown-body h2 { font-size: 22px; margin: 28px 0 8px; }
        .markdown-body h3 { font-size: 18px; margin: 20px 0 8px; }
        .markdown-body p, .markdown-body li { line-height: 1.6; color: #1f2937; }
        .markdown-body code, .markdown-body pre { background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 6px; padding: 0 4px; }
        .markdown-body pre { padding: 12px; overflow: auto; }
        .toc a:hover { text-decoration: underline; }
        @media (max-width: 880px) { .infra-grid { grid-template-columns: 1fr; } .toc { display: none; } }
        @media print { .infra-header, .toc { display: none; } .infra-root { background: #fff; } main { padding: 0; } }
      `}</style>
    </div>
  );
}
