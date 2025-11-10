// src/pages/BerkeleyGuide.js
import React from "react";
import ReactMarkdown from "react-markdown";
import "./Infrastructure.theme.css";

/**
 * BerkeleyGuide.js — Markdown summary page for
 * "Berkeleyside’s Guide to Wildfire Season"
 *
 * Based on the 2025 update of Berkeleyside's collaborative wildfire guide
 * (by Kate Rauch & Brian Krans, edited by Zac Farber and Jacob Simas).
 */

const md = `# Berkeleyside’s Guide to Wildfire Season  
**Preparation, Evacuation, Air Quality, and Property Safety for Berkeley Residents**  

*By Kate Rauch & Brian Krans — Updated January 2025 (Cityside / The Oaklandside collaboration)*  

---

## Overview  
Berkeleyside’s wildfire guide helps East Bay residents **prepare, stay informed, and stay safe** during fire season.  
It compiles resources from CAL FIRE, Berkeley and Oakland Fire Departments, FEMA, NOAA, and other agencies to answer the most common questions about **preparation, evacuation, air quality, power outages, and property protection**:contentReference[oaicite:0]{index=0}.

> ⚠️ *Do not rely on this guide during an active emergency.*  
> Always follow official instructions from **AC Alerts**, **Zonehaven**, and **local radio (1610 AM)** for real-time evacuation and safety information.

---

## Preparation
**How to prepare for wildfire season:**
- Create a **Go Bag** with essentials (medications, copies of documents, water, mask, flashlight, charger).
- Plan evacuation routes and **know your Zonehaven evacuation zone**.
- Check Red Flag Warnings and **Extreme Fire Weather** alerts.
- Make plans for **pets, seniors, and those with disabilities**:contentReference[oaicite:1]{index=1}.

### Key Links
- [AC Alerts signup](https://member.everbridge.net/453003085612570/new)  
- [Zonehaven evacuation zones](https://community.zonehaven.com/)  
- [Nixle local alerts](https://www.nixle.com/)  
- [Berkeley wildfire evacuation checklist (PDF)](https://berkeleyca.gov/sites/default/files/2022-02/wildfire-evacuation-checklist.pdf)

---

## Evacuation  
During **Extreme Fire Weather** or **Diablo Winds**, Berkeley Fire recommends preemptive evacuation from the hills.  
Typical questions include:
- What does a **Red Flag Warning** mean?  
- Why should I relocate during **Extreme Fire Weather**?  
- What if I’m **trapped during a fire**?  
- Am I **legally required** to evacuate?:contentReference[oaicite:2]{index=2}

See full evacuation guidance:  
[Fire Warnings & Evacuation Guidance (Berkeleyside)](https://www.berkeleyside.org/berkeley-wildfire-guide-fire-season-2021/fire-warnings-evacuation-guidance-berkeley-california)

---

## Air Quality & Smoke  
Wildfires severely impact Bay Area air quality.  
Learn:
- How to interpret **AQI** and which **masks** protect best  
- How to **seal indoor air leaks** or build DIY air filters  
- Health tips for people with **asthma** or who’ve had **COVID-19**:contentReference[oaicite:3]{index=3}

**Useful links:**
- [AirNow Fire Map](https://fire.airnow.gov/)
- [IQAir Berkeley](https://www.iqair.com/usa/california/berkeley)
- [Bay Area Air Quality Management District](https://www.baaqmd.gov/)

---

## Power Outages  
Power shutoffs (PSPS) prevent fire ignitions during high winds.  
Learn how to:
- Track scheduled outages ([PG&E outage map](https://pgealerts.alerts.pge.com/outages/map/))
- Prepare backup lighting, refrigeration, and medical devices
- Create a **power outage readiness kit**:contentReference[oaicite:4]{index=4}

---

## Property & Defensible Space  
Berkeley residents can harden their homes and maintain defensible space zones:
- Replace flammable plants in **Zone 0 (0–5 ft)** with stone, gravel, or native succulents  
- Use ember-resistant vents and noncombustible roofs  
- Check **local defensible-space regulations** and fire insurance options:contentReference[oaicite:5]{index=5}

*For design ideas:*  
[Berkeley Hills Zone 0 Landscape Design (Berkeleyside)](https://www.berkeleyside.org/2025/06/20/berkeley-hills-zone-0-defensible-space-landscape-design)

---

## Further Reading & Sources  
- CAL FIRE • [Fire.ca.gov](https://www.fire.ca.gov/)  
- Berkeley Fire Department • [cityofberkeley.info/fire](https://www.cityofberkeley.info/fire/)  
- Oakland Fire Department • [oaklandca.gov/fire](https://www.oaklandca.gov/departments/fire)  
- [UC Cooperative Extension: Living with Fire](https://ucanr.edu/sites/fire/)  
- [Wildfire Home Retrofit Guide (UNR Extension)](http://www.readyforwildfire.org/wp-content/uploads/Wildfire_Home_Retrfit_Guide-1.26.21.pdf)  

---

*This page summarizes key points from “Berkeleyside’s Guide to Wildfire Season,” © 2025 Cityside, published in collaboration with The Oaklandside and vetted with CAL FIRE, FEMA, NOAA, and local partners.*  
`;

export default function BerkeleyGuide() {
  return (
    <div className="infra-root doc-ivory" style={{ minHeight: "100vh", background: "#fff" }}>
      <header className="infra-header" style={{ position: "sticky", top: 0, zIndex: 30, backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.85)", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "16px 20px" }}>
          <h1 style={{ margin: 0, fontSize: 28 }}>Berkeley Wildfire Season Guide</h1>
          <p style={{ margin: "6px 0 0", color: "#64748b" }}>
            Adapted from Berkeleyside’s 2025 update for community wildfire readiness
          </p>
        </div>
      </header>

      <main style={{ maxWidth: 960, margin: "0 auto", padding: "20px" }}>
        <article className="markdown-body">
          <ReactMarkdown>{md}</ReactMarkdown>
        </article>
      </main>

      <style>{`
        .markdown-body h1 { font-size: 28px; margin-bottom: 12px; }
        .markdown-body h2 { font-size: 22px; margin: 28px 0 8px; }
        .markdown-body p, .markdown-body li { line-height: 1.6; color: #1f2937; }
        .markdown-body a { color: #0ea5e9; text-decoration: none; }
        .markdown-body a:hover { text-decoration: underline; }
        .markdown-body blockquote { background: #f8fafc; padding: 10px 16px; border-left: 3px solid #0ea5e9; border-radius: 6px; color: #334155; }
      `}</style>
    </div>
  );
}
