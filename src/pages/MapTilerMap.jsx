// src/pages/MapTilerMap.jsx
// src/pages/MapTilerMap.jsx
import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const KEY = process.env.REACT_APP_MAPTILER_KEY || "";

// Base map
const STYLE_URL = KEY
  ? `https://api.maptiler.com/maps/base-v4/style.json?key=${KEY}`
  : "https://demotiles.maplibre.org/style.json";

// --- LANDFIRE WMS (CONUS 250m, 2024) ---
const LF_WMS_BASE = "https://edcintl.cr.usgs.gov/geoserver/landfire/us_250/wms";
const LF_LAYER = "LC24_F13_250"; // switch to LC24_F40_250 for FBFM40
const LF_OPACITY = 0.6;
const LF_WMS_TILE =
  `${LF_WMS_BASE}?service=WMS&version=1.3.0&request=GetMap` +
  `&layers=${encodeURIComponent(LF_LAYER)}` +
  `&styles=&format=image/png&transparent=true` +
  `&crs=EPSG:3857&width=256&height=256&bbox={bbox-epsg-3857}`;

// Optional: OpenWeather wind overlay
const OWM_KEY = process.env.REACT_APP_OPENWEATHER_KEY || "";

function bboxFromGeoJSON(geojson) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  const scan = (coords) => {
    for (const c of coords) {
      if (Array.isArray(c?.[0])) scan(c);
      else if (Array.isArray(c)) {
        const [x, y] = c;
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  };
  if (!geojson) return [minX, minY, maxX, maxY];
  if (geojson.type === "FeatureCollection") geojson.features.forEach(f => scan(f.geometry.coordinates));
  else if (geojson.type === "Feature") scan(geojson.geometry.coordinates);
  else if (geojson.type === "Polygon" || geojson.type === "MultiPolygon") scan(geojson.coordinates);
  return [minX, minY, maxX, maxY];
}

export default function MapTilerMap() {
  const mapEl = useRef(null);
  const mapRef = useRef(null);
  const resizeTimer = useRef(null);

  useEffect(() => {
    if (!mapEl.current || mapRef.current) return;

    if (typeof maplibregl.supported === "function" && !maplibregl.supported()) {
      mapEl.current.innerHTML =
        "<div style='padding:12px;color:#b91c1c;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;'>WebGL not supported.</div>";
      return;
    }

    const map = new maplibregl.Map({
      container: mapEl.current,
      style: STYLE_URL,
      center: [-122.2727, 37.8715],
      zoom: 11,
      hash: false,
      failIfMajorPerformanceCaveat: false,
    });
    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl(), "top-right");

    map.once("load", () => {
      // Wait until the style graph is ready so insertion-by-id works.
      map.once("idle", async () => {
        try {
          // ---------- Determine label anchor layer ----------
          const firstSymbolId =
            (map.getStyle().layers || []).find(l => l.type === "symbol")?.id;

          // ---------- EBH boundary ----------
          const res = await fetch("/data/east-bay-hills.geojson");
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const hills = await res.json();

          if (!map.getSource("east-bay-hills")) {
            map.addSource("east-bay-hills", { type: "geojson", data: hills });
          }

          // ---------- Terrain source & hillshade ----------
          if (!map.getSource("terrain-dem")) {
            map.addSource("terrain-dem", {
              type: "raster-dem",
              url: `https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=${KEY}`,
            });
          }
          map.setTerrain({ source: "terrain-dem", exaggeration: 1.2 });

          if (!map.getLayer("hillshade")) {
            map.addLayer(
              {
                id: "hillshade",
                type: "hillshade",
                source: "terrain-dem",
                paint: {
                  "hillshade-exaggeration": 0.7,
                  "hillshade-highlight-color": "#ffffff",
                  "hillshade-shadow-color": "#000000",
                  "hillshade-accent-color": "#888888",
                },
              },
              firstSymbolId // keep under labels
            );
          }

          // ---------- LANDFIRE raster (above hillshade, below labels) ----------
          if (!map.getSource("landfire-wms")) {
            map.addSource("landfire-wms", {
              type: "raster",
              tiles: [LF_WMS_TILE],
              tileSize: 256,
              attribution: "LANDFIRE © USGS (WMS)",
            });
          }
          if (!map.getLayer("landfire-wms")) {
            map.addLayer(
              {
                id: "landfire-wms",
                type: "raster",
                source: "landfire-wms",
                paint: {
                  "raster-opacity": LF_OPACITY,
                  "raster-resampling": "linear",
                },
              },
              firstSymbolId
            );
          }

          // ---------- Optional OpenWeather wind (below labels) ----------
          if (OWM_KEY && !map.getSource("wind-owm")) {
            map.addSource("wind-owm", {
              type: "raster",
              tiles: [
                `https://tile.openweathermap.org/map/wind_speed/{z}/{x}/{y}.png?appid=${OWM_KEY}`
              ],
              tileSize: 256,
              attribution: "OpenWeather",
            });
          }
          if (OWM_KEY && !map.getLayer("wind-owm")) {
            map.addLayer(
              {
                id: "wind-owm",
                type: "raster",
                source: "wind-owm",
                paint: { "raster-opacity": 0.6 },
              },
              firstSymbolId
            );
          }

          // ---------- EBH outline on top ----------
          if (!map.getLayer("east-bay-hills-outline")) {
            map.addLayer({
              id: "east-bay-hills-outline",
              type: "line",
              source: "east-bay-hills",
              paint: { "line-color": "#000", "line-width": 6, "line-opacity": 0.95 },
              layout: { "line-join": "round", "line-cap": "round" },
            });
          }

          // Fit to polygon
          const [minX, minY, maxX, maxY] = bboxFromGeoJSON(hills);
          if ([minX, minY, maxX, maxY].every(Number.isFinite)) {
            map.fitBounds([[minX, minY], [maxX, maxY]], {
              padding: 40,
              duration: 800,
            });
          }

          // Make the terrain effect obvious
          map.dragRotate.enable();
          map.touchZoomRotate.enableRotation(true);
          map.setPitch(55);
          map.setBearing(20);
        } catch (err) {
          console.error("Map setup error:", err);
        }

        clearTimeout(resizeTimer.current);
        resizeTimer.current = setTimeout(() => map.resize(), 150);
      });
    });

    map.on("error", (e) => console.error("[MapLibre error]", e?.error || e));

    return () => {
      clearTimeout(resizeTimer.current);
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={mapEl}
      style={{
        height: "80vh",
        width: "100%",
        borderRadius: 12,
        overflow: "hidden",
        background: "#f1f5f9",
        border: "1px solid #e2e8f0",
      }}
    />
  );
}

