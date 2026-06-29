import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import { Report } from "../types";
import { AlertTriangle, Clock, MapPin } from "lucide-react";
import L from "leaflet";

function MapUpdater() {
  const map = useMap();
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      map.invalidateSize();
    });
    observer.observe(map.getContainer());
    return () => observer.disconnect();
  }, [map]);
  return null;
}

export default function Hotspots() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeOffset, setTimeOffset] = useState(0);

  useEffect(() => {
    fetch("/api/reports")
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        try {
          return JSON.parse(text);
        } catch (e) {
          console.error(
            "Failed to parse JSON in Hotspots:",
            text.substring(0, 50),
          );
          return { reports: [] };
        }
      })
      .then((data) => {
        if (data && data.reports) {
          setReports(data.reports);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getSeverityColor = (severity: number) => {
    if (severity >= 4) return "var(--danger)";
    if (severity === 3) return "var(--warning)";
    return "var(--accent)";
  };

  return (
    <div className="flex flex-col h-full bg-surface-canvas">
      <div className="px-6 md:px-12 py-8 shrink-0">
        <h2 className="text-3xl font-display font-bold text-text-primary tracking-tight">
          Predictive Hotspots
        </h2>
        <p className="text-text-muted font-mono text-sm mt-2">
          REAL-TIME RISK & SEVERITY MAP
        </p>
      </div>

      <div className="flex-1 relative z-0 min-h-[400px]">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center text-text-subtle font-mono text-sm">
            LOADING MAP DATA...
          </div>
        ) : (
          <MapContainer
            center={[12.9716, 77.5946]}
            zoom={12}
            className="absolute inset-0 h-full w-full z-0 bg-surface-card"
            style={{ height: "100%", width: "100%" }}
            zoomControl={false}
          >
            <MapUpdater />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {reports.map((report) => {
              const lat = report.lat || 12.9716;
              const lng = report.lng || 77.5946;

              const predictiveRadius = Math.max(5, report.severity * 3) + (timeOffset * (report.severity / 5) * 1.5);

              return (
                <CircleMarker
                  key={report.id}
                  center={[lat, lng]}
                  radius={predictiveRadius}
                  pathOptions={{
                    color: getSeverityColor(report.severity),
                    fillColor: getSeverityColor(report.severity),
                    fillOpacity: Math.min(0.8, 0.5 + (timeOffset / 144)),
                  }}
                >
                  <Popup className="custom-popup">
                    <div className="p-2 min-w-[200px] w-auto max-w-[300px] text-text-primary font-sans">
                      <div className="font-bold text-base uppercase tracking-tight mb-1">
                        {report.type}
                      </div>
                      <div className="text-xs text-text-muted mb-2 whitespace-normal break-words">
                        {report.description}
                      </div>
                      <div className="flex justify-between items-center text-xs font-mono mb-1">
                        <span className="text-text-muted">SEVERITY</span>
                        <span className="font-bold text-text-primary">
                          {report.severity}/5
                        </span>
                      </div>
                      <div className="flex justify-between items-start text-xs font-mono">
                        <span className="text-text-muted mt-0.5">AGENCY</span>
                        <span className="font-bold text-text-primary text-right pl-2">
                          {report.agency}
                        </span>
                      </div>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}
          </MapContainer>
        )}

        {/* Floating Legend */}
        <div className="absolute top-6 left-6 z-[1000] bg-surface-card border border-border-default p-4 rounded-lg backdrop-blur-md">
          <div className="text-xxs font-mono text-text-subtle mb-3 uppercase tracking-widest">
            Severity Legend
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-danger shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
              <span className="text-xs text-text-secondary font-mono">
                Critical (4-5)
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-warning shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
              <span className="text-xs text-text-secondary font-mono">
                Moderate (3)
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
              <span className="text-xs text-text-secondary font-mono">
                Minor (1-2)
              </span>
            </div>
          </div>
        </div>

        {/* Predictive Time Slider */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-md px-4">
          <div className="bg-surface-card/90 backdrop-blur-md border border-border-default p-4 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-text-primary uppercase tracking-widest">
                Prediction Window
              </span>
              <span className="text-xs font-mono text-accent font-bold bg-accent/10 px-2 py-0.5 rounded">
                +{timeOffset} Hours
              </span>
            </div>
            <label htmlFor="prediction-window" className="sr-only">
              Prediction Window in Hours
            </label>
            <input
              id="prediction-window"
              type="range"
              min="0"
              max="72"
              step="1"
              value={timeOffset}
              onChange={(e) => setTimeOffset(parseInt(e.target.value))}
              className="w-full accent-accent cursor-pointer"
              aria-label="Predictive Time Slider"
            />
            <div className="flex justify-between text-xxs text-text-muted font-mono mt-1">
              <span>Now</span>
              <span>+24h</span>
              <span>+48h</span>
              <span>+72h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
