// ./pages/MEK.js
import React from "react";
import "./MEK.css";

const rows = [
  {
    context: "landscape setting",
    rrm: [
      "engage in strategic planning much earlier",
      "use hazard maps",
      "use major landscape features",
    ],
    scale: ["community and subdivision", "community location", "community location"],
    goal: [
      "address fire risk before other considerations finalized",
      "concentrate in least hazardous areas",
      "buffer against oncoming wildfires",
    ],
  },
  {
    context: "separation from wildfire source",
    rrm: [
      "use nonflammable amenities in design",
      "employ safe setbacks on slopes",
      "concentrate on inner side of roadways",
    ],
    scale: ["subdivision layout", "subdivision layout", "subdivision layout"],
    goal: ["maximize defensible space", "maximize defensible space", "maximize defensible space"],
  },
  {
    context: "density management",
    rrm: ["cluster with other homes"],
    scale: ["subdivision layout"],
    goal: ["reduce collective exposure"],
  },
  {
    context: "protective infrastructure",
    rrm: [
      "harden public facilities and refuges",
      "locate power lines underground",
      "augment water requirements",
    ],
    scale: ["subdivision layout", "subdivision layout", "subdivision layout"],
    goal: [
      "safeguard vulnerable populations; provide fallback for worst-case conditions",
      "reduce ignition potential",
      "ensure redundant supplies; employ exterior sprinklers",
    ],
  },
];

export default function MEK() {
  return (
    <div className="main-page">
    <div className="mek-wrap">
      <h1 className="mek-title">
        Community RRMs for the location and layout of new subdivisions on fire-prone landscapes
      </h1>

      <table className="mek-table" role="table">
        <thead>
          <tr>
            <th scope="col" className="mek-context">Design context</th>
            <th scope="col" className="mek-col">RRM</th>
            <th scope="col" className="mek-col">Scale</th>
            <th scope="col" className="mek-col">Goal</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx}>
              <th scope="row" className="mek-context">{r.context}</th>
              <td>
                <span className="mek-cell-label" aria-hidden="true"></span>
                <ul className="mek-list">{r.rrm.map((x,i)=><li key={i}>{x}</li>)}</ul>
              </td>
              <td>
                <span className="mek-cell-label" aria-hidden="true"></span>
                <ul className="mek-list">{r.scale.map((x,i)=><li key={i}>{x}</li>)}</ul>
              </td>
              <td>
                <span className="mek-cell-label" aria-hidden="true"></span>
                <ul className="mek-list">{r.goal.map((x,i)=><li key={i}>{x}</li>)}</ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}
