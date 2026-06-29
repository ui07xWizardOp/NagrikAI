import { Camera, MapPin, Navigation, Crosshair } from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import { Report } from "../types";

function MapControls() {
  const map = useMap();
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      map.invalidateSize();
    });
    observer.observe(map.getContainer());
    return () => observer.disconnect();
  }, [map]);

  return (
    <div className="absolute top-4 right-4 md:top-6 md:right-6 z-[1000] flex flex-col gap-2">
      <div className="bg-surface-card/80 backdrop-blur-md border border-border-default rounded-xl shadow-sm overflow-hidden flex flex-col">
        <button
          onClick={(e) => {
            e.stopPropagation();
            map.zoomIn();
          }}
          className="p-2 md:p-3 text-text-primary hover:bg-surface-muted transition-colors border-b border-border-default"
          aria-label="Zoom in"
        >
          <span className="text-xl font-medium leading-none">+</span>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            map.zoomOut();
          }}
          className="p-2 md:p-3 text-text-primary hover:bg-surface-muted transition-colors border-b border-border-default"
          aria-label="Zoom out"
        >
          <span className="text-xl font-medium leading-none">−</span>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            map.locate();
            map.setView([12.9716, 77.5946], 13);
          }}
          className="p-2 md:p-3 text-text-primary hover:bg-surface-muted transition-colors"
          aria-label="Locate me"
        >
          <Crosshair size={18} />
        </button>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          map.setView([12.975, 77.585], 15);
        }}
        className="bg-surface-card/80 backdrop-blur-md border border-border-default p-2 md:p-3 rounded-xl shadow-sm text-text-primary hover:bg-surface-muted transition-colors"
        aria-label="Jump to Hotspot"
      >
        <MapPin size={18} />
      </button>
    </div>
  );
}

const createCustomIcon = (type: string) => {
  const colorClass = type.toLowerCase().includes("pothole")
    ? "bg-accent"
    : type.toLowerCase().includes("garbage")
      ? "bg-danger"
      : "bg-warning";
  const glowClass = type.toLowerCase().includes("pothole")
    ? "bg-accent/20"
    : type.toLowerCase().includes("garbage")
      ? "bg-danger/20"
      : "bg-warning/20";
  return L.divIcon({
    className: "bg-transparent border-none",
    html: `
      <div class="relative cursor-pointer w-full h-full flex items-center justify-center">
        <div class="absolute w-12 h-12 ${glowClass} rounded-full animate-pulse"></div>
        <div class="w-4 h-4 ${colorClass} rounded-full border-2 border-surface-card shadow-md z-10"></div>
      </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
  });
};

export default function Home({
  setView,
}: {
  setView: (
    v:
      | "home"
      | "capture"
      | "dashboard"
      | "playbook"
      | "hotspots"
      | "agency"
      | "karma",
  ) => void;
}) {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reports")
      .then((res) => res.json())
      .then((data) => {
        setReports(data.reports || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative w-full h-full bg-surface-canvas overflow-hidden">
      {/* Real Map Background */}
      <div className="absolute inset-0 z-0 bg-surface-canvas">
        <MapContainer
          center={[12.9716, 77.5946]}
          zoom={13}
          className="absolute inset-0 h-full w-full z-0"
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
        >
          <MapControls />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Map Markers */}
          {reports.map(
            (report) =>
              report.lat &&
              report.lng && (
                <Marker
                  key={report.id}
                  position={[report.lat, report.lng]}
                  icon={createCustomIcon(report.type)}
                >
                  <Tooltip
                    direction="top"
                    offset={[0, -10]}
                    className="border-none bg-surface-card text-text-primary p-2 rounded shadow-md font-sans"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold">
                        {report.type}
                      </span>
                      <span className="text-xs text-text-muted">
                        {report.location}
                      </span>
                    </div>
                  </Tooltip>
                </Marker>
              ),
          )}
        </MapContainer>

        {/* Main Action (FAB) */}
        <div className="absolute bottom-[280px] md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
          <div className="bg-surface-card/90 backdrop-blur-sm border border-border-default px-4 py-2 rounded-full mb-4 shadow-sm text-xs font-semibold text-text-primary flex items-center gap-2 pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Bengaluru
          </div>
          <button
            onClick={() => setView("capture")}
            className="bg-accent hover:bg-accent-hover text-text-on-accent rounded-full p-6 shadow-xl shadow-accent/20 transition-transform active:scale-95 group flex flex-col items-center gap-2 border-4 border-surface-card pointer-events-auto"
            aria-label="Report Issue"
          >
            <Camera className="w-8 h-8" />
          </button>
          <span className="mt-4 font-bold text-text-primary bg-surface-card/80 px-4 py-1 rounded-full backdrop-blur-sm border border-border-default shadow-sm uppercase tracking-wider text-sm pointer-events-auto">
            Report
          </span>
        </div>
      </div>

      {/* Recent Reports Glass Overlay */}
      <div className="absolute bottom-0 left-0 right-0 md:bottom-8 md:left-8 md:right-auto md:w-80 z-10 p-0 md:p-0">
        <div className="bg-surface-card/90 md:bg-surface-card/70 backdrop-blur-xl border-t md:border border-border-default rounded-t-3xl md:rounded-2xl shadow-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text-primary text-sm uppercase tracking-wider">
              Recent Reports
            </h3>
            <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-0.5 rounded-full">
              LIVE
            </span>
          </div>

          <div className="space-y-3">
            {loading ? (
              <div className="py-4 flex justify-center text-text-subtle font-mono text-xs uppercase tracking-widest animate-pulse">
                Loading...
              </div>
            ) : (
              reports.slice(0, 3).map((report) => (
                <div
                  key={report.id}
                  onClick={() => setView("dashboard")}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-surface-muted/50 cursor-pointer transition-colors border border-transparent hover:border-border-default"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${report.type.toLowerCase().includes("pothole") ? "bg-accent/10 border-accent/20 text-accent" : report.type.toLowerCase().includes("garbage") ? "bg-danger/10 border-danger/20 text-danger" : "bg-warning/10 border-warning/20 text-warning"}`}
                  >
                    <MapPin size={14} className="currentColor" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary truncate max-w-[200px]">
                      {report.type}
                    </p>
                    <p className="text-xs text-text-secondary mt-0.5 truncate max-w-[200px]">
                      {report.location}
                    </p>
                  </div>
                </div>
              ))
            )}
            {!loading && reports.length === 0 && (
              <div className="py-4 text-center text-text-subtle font-mono text-xs uppercase tracking-widest">
                No reports yet
              </div>
            )}
          </div>

          <button
            onClick={() => setView("dashboard")}
            className="w-full text-center mt-4 text-xs font-semibold text-text-muted hover:text-accent transition-colors uppercase tracking-widest"
          >
            View All Reports
          </button>
        </div>
      </div>
    </div>
  );
}
