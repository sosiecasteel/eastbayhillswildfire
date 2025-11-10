// src/App.js
import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";

import Forecast from "./pages/Forecast";
import MEK from "./pages/MEK";
import Readings from "./pages/Readings";
import MapPage from "./pages/Map"; // your Map.js default export
import BerkeleyGuide from "./pages/BerkeleyGuide";
import VegetationAnalysis from "./pages/VegetationAnalysis";
import FireTimeline from "./pages/FireTimeline";
import AtAGlanceFire from "./pages/AtAGlanceFire";
import FailureOfPlanning from "./pages/FailureOfPlanning";


import "./App.css";
import flamegirl from "./assets/flamegirl.png";
import november from "./assets/november.png";
import changeisscary from "./assets/changeisscary.png";


function App() {
  const fireItems = [
    {
      title: "Red Flag Warning — Diablo winds overnight",
      date: "Nov 9",
      location: "East Bay Hills",
      summary: "Gusts 35–55 mph, RH < 15%. Consider preemptive relocation from hill zones.",
      badge: "redflag",
      href: "https://www.weather.gov/", // external
      meta: "NWS"
    },
    {
      title: "Prescribed burn scheduled",
      date: "Nov 12",
      location: "EBRPD — Tilden (North)",
      summary: "Expect visible smoke mid-morning; trails signed.",
      badge: "prescribed",
      href: "https://www.ebparks.org/"
    },
    {
      title: "Spot fire contained at 4 acres",
      date: "Nov 7",
      location: "Orinda — Bear Creek corridor",
      summary: "Forward progress stopped; crews in mop-up.",
      badge: "contained",
      href: "https://www.fire.ca.gov/incidents/"
    },
    {
      title: "AQI trending moderate this evening",
      date: "Today",
      location: "Berkeley",
      summary: "Sensitive groups: consider indoor air cleaners; check local sensors.",
      badge: "aqi",
      href: "https://fire.airnow.gov/",
      meta: "AQI map"
    },
    {
      title: "Read: Berkeley Wildfire Season Guide",
      date: "2025",
      summary: "Preparation, evacuation, power shutoffs, and defensible space basics.",
      badge: "info",
      href: "/#/berkeley-guide" // internal route in your HashRouter
    }
  ];
  return (
    <Router>
      <div>
        {/* Top Section with Title and Links */}
        <div className="top-section">
          <Link to="/" className="site-title">FIRE WORLD</Link>
          <div className="nav-links-slim">
            <Link to="/Forecast">Forecast</Link>
            <Link to="/FireTimeline">Timeline</Link>
            <Link to="/MEK">MEK</Link>
            <Link to="/Map">Map</Link>
            <Link to="/Readings">Readings</Link>
          </div>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <div className="main-page">
                <div className="main-content">
                  <img src={flamegirl} alt="flamie" className="flamegirl-image" />
                  <img src={november} alt="nov" className="calendar-image" />
                  <img src={changeisscary} alt="changeis" className="ribbon-image" />

                  <div className="calendar-text-container">
                    <h2>November 2025</h2>
                  </div>
                </div>
                <div className="speech-container">
                  <h1>burn it or watch it burn</h1>
                </div>
                {/* 🔶 Replace the placeholder header with the live card */}
                <div className="ataglance-container ataglance-wide">
                <AtAGlanceFire items={fireItems} />
              </div>
              </div>
              
            }
          />
          <Route path="/Forecast" element={<Forecast />} />
          <Route path="/FireTimeline" element={<FireTimeline />} />
          <Route path="/MEK" element={<MEK />} />
          <Route path="/Readings" element={<Readings />} />
          <Route path="/Map" element={<MapPage />} />
          <Route path="/berkeley-guide" element={<BerkeleyGuide />} />
          <Route path="/VegetationAnalysis" element={<VegetationAnalysis />} />
          <Route path="/failure-of-planning" element={<FailureOfPlanning />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;

