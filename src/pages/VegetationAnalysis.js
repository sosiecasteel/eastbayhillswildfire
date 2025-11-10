import React from "react";
import ReactMarkdown from "react-markdown";
import "./Infrastructure.theme.css";

const md = `# A deep look at plants will guide decisions around preservation, development, habitat restoration and wildfire mitigation 

*By Kate Rauch & Brian Krans — Updated January 2025 (Cityside / The Oaklandside collaboration)*  

---


Filling in gaps in NatureCheck, and much more, is a fine-scale vegetation survey, currently underway. Using state-of-the-art spatial analysis techniques such as LIDAR, a type of aerial imaging, and GIS or satellite imaging, along with computer modeling and some field observations, this project will map vegetation down to half-acre or one-acre segments.
“The products produced will help to complete a detailed wildland fuel and vegetation information base for all Bay Area counties,” said Dina Robertson, EBRPD wildland vegetation program manager working on the project.
Robertson, and consultant Kass Green, described the process:
“First, map makers go to the field with the imagery on iPads to sample the landscape and understand what causes variation in vegetation type. Next, the samples are dropped through a myriad of datasets known to be correlated with vegetation type such as slope, aspect, distance to streams, vegetation height, etc., and machine learning is used to establish relationships between the variables and vegetation type. Finally, the maps are manually edited to correct for errors in the machine learning algorithms.”
Funded largely by a grant from the California Department of Fish and Wildlife, with other contributions, the project includes all of Contra Costa and Alameda counties, both private and public land. The EBRPD is overseeing the project.
“It’s super cool,” Robertson said. “It’s not just the park district, it’s every piece of land private and public. [The results] will all be available to the public on a server.” 
San Mateo and Marin are two counties with completed fine-scale vegetation mapping, which provide a good sense of the East Bay’s project. 
The maps should help decision making around preservation, development, habitat restoration, and wildfire mitigation, Robertson said. 
“Anticipated applications for the project products are many, including watershed and flood management; climate change adaptation; wetland restoration; wildfire planning, prioritization and response; open space acquisition prioritization, wildlife management, and restoring the health of the numerous degraded East Bay forests, grasslands, and natural lands to enhance ecological resilience and reduce fire risk to communities,” said Robertson and Green.

## Vegetation survey will yield detailed wildfire risk maps
Perhaps one of the most keenly anticipated tools in the mapping pipeline is the wildfire risk assessment, which is one layer or application of the fine-scale vegetation project. 
The goal is to complete the wildfire risk map by the end of 2023. 
“The wildfire risk maps and associated data sets will support communities and land owners in prioritization and planning of evacuation routes and wildfire risk reduction activities. The data set will be consistent with similar data sets developed for most of the Bay Area,” Robertson and Green said. 
The maps will be available to the public on a website such as this one. 
Fire risk mapping will also have its own dedicated portal such as this one for Sonoma County.
One of the biggest obstacles to large-scale assessments is funding, Robertson said. At the same time, the availability of this kind of data helps with future spending decisions by providing fact-based information. 
With dead and dying trees; shrinking creeks, lakes and ponds; shrinking wildlife habitat, sea level rise; and a public eager for a diversity of recreational and urban escape opportunities, competition for land management dollars is fierce. 
“It’s all about prioritization,” Robertson said. “Where are we going to spend our time? We need to make sure we’re tackling the highest priorities. … looking at entire landscapes and prioritizing.”


  
`;

export default function VegetationAnalysis() {
  return (
    <div className="infra-root doc-ivory" style={{ minHeight: "100vh", background: "#fff" }}>
      <header className="infra-header" style={{ position: "sticky", top: 0, zIndex: 30, backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.85)", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "16px 20px" }}>
          <h1 style={{ margin: 0, fontSize: 28 }}>Vegetation Analysis</h1>
          <p style={{ margin: "6px 0 0", color: "#64748b" }}>
                fill this in          </p>
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
