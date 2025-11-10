import { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  ScaleControl,
  LayersControl,
  WMSTileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const KEY = process.env.REACT_APP_MAPTILER_KEY || "";

// === Base tile layer ===
const TILE_URL = KEY
  ? `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${KEY}`
  : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const ATTRIBUTION = KEY
  ? '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
  : '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>';

// === LANDFIRE WMS base URL ===
const WMS_URL = "https://edcintl.cr.usgs.gov/geoserver/landfire/us_250/wms";

// === Available LANDFIRE layers ===
const LANDFIRE_LAYERS = [
  { id: "LC24_F13_250", label: "FBFM13 – Surface Fuels" },
  { id: "LC24_F40_250", label: "FBFM40 – Detailed Fuels" },
  { id: "LC24_EVT_250", label: "Existing Vegetation Type (EVT)" },
  { id: "LC24_EVC_250", label: "Existing Vegetation Cover (EVC)" },
  { id: "LC24_EVH_250", label: "Existing Vegetation Height (EVH)" },
  { id: "LC24_CC_250",  label: "Canopy Cover (CC)" },
  { id: "LC24_CBD_250", label: "Canopy Bulk Density (CBD)" },
  { id: "LC24_CBH_250", label: "Canopy Base Height (CBH)" },
];

// === Fit map to GeoJSON bounds ===
function FitToGeoJSON({ data }) {
  const map = useMap();
  useEffect(() => {
    if (!data || !window.L) return;
    const layer = new window.L.GeoJSON(data);
    const b = layer.getBounds();
    if (b.isValid()) map.fitBounds(b, { padding: [40, 40] });
  }, [data, map]);
  return null;
}

export default function LeafletMap() {
  const [geojson, setGeojson] = useState(null);
  const [fuelsOpacity, setFuelsOpacity] = useState(0.75);
  const [activeLayer, setActiveLayer] = useState(LANDFIRE_LAYERS[0].id); // default to FBFM13

  const boundaryStyle = useMemo(
    () => ({ color: "#000", weight: 6, opacity: 0.95, fill: false }),
    []
  );

  // Load EBH boundary
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/data/east-bay-hills.geojson");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (alive) setGeojson(data);
      } catch (err) {
        console.error("Failed to load /data/east-bay-hills.geojson:", err);
      }
    })();
    return () => { alive = false; };
  }, []);

  // Build the live legend URL
  const legendURL = `${WMS_URL}?service=WMS&version=1.3.0&request=GetLegendGraphic&format=image/png&layer=${activeLayer}`;

  return (
    <div>
      {/* MAP */}
      <div style={{ height: "80vh", width: "100%", borderRadius: 12, overflow: "hidden" }}>
        <MapContainer
          center={[37.8715, -122.2727]}
          zoom={11}
          zoomControl
          style={{ height: "100%", width: "100%" }}
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Basemap">
              <TileLayer url={TILE_URL} attribution={ATTRIBUTION} />
            </LayersControl.BaseLayer>

            <LayersControl.Overlay checked name={`LANDFIRE — ${activeLayer}`}>
              <WMSTileLayer
                key={activeLayer}
                url={WMS_URL}
                layers={activeLayer}
                format="image/png"
                transparent
                version="1.3.0"
                tiled
                styles=""
                opacity={fuelsOpacity}
                crossOrigin
              />
            </LayersControl.Overlay>
          </LayersControl>

          {geojson && (
            <>
              <GeoJSON data={geojson} style={boundaryStyle} />
              <FitToGeoJSON data={geojson} />
            </>
          )}

          <ScaleControl position="bottomleft" />
        </MapContainer>
      </div>

      {/* CONTROLS BELOW MAP */}
      <div style={{ marginTop: 12, display: "flex", alignItems: "flex-start", gap: 24 }}>
        {/* Opacity control */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: 14, color: "#444" }}>LANDFIRE opacity</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={fuelsOpacity}
            onChange={(e) => setFuelsOpacity(parseFloat(e.target.value))}
          />
          <span style={{ fontVariantNumeric: "tabular-nums" }}>
            {Math.round(fuelsOpacity * 100)}%
          </span>
        </div>

        {/* Layer selector */}
        <div>
          <label style={{ fontSize: 14, color: "#444" }}>LANDFIRE layer</label><br />
          <select
            value={activeLayer}
            onChange={(e) => setActiveLayer(e.target.value)}
            style={{
              padding: "4px 8px",
              fontSize: 14,
              borderRadius: 6,
              border: "1px solid #ccc",
              background: "#fff"
            }}
          >
            {LANDFIRE_LAYERS.map(l => (
              <option key={l.id} value={l.id}>{l.label}</option>
            ))}
          </select>
        </div>

        {/* Legend */}
        <div>
          <strong style={{ display: "block", marginBottom: 4 }}>LANDFIRE Legend</strong>
          <img
            src={legendURL}
            alt={`Legend for ${activeLayer}`}
            style={{
              border: "1px solid #ccc",
              borderRadius: 8,
              background: "#fff",
              maxHeight: 400,
            }}
          />
        </div>
      </div>
    </div>
  );
}
