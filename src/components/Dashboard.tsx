import React, { useEffect, useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  MapPin,
  IndianRupee,
  Search,
  List,
  Map as MapIcon,
  Bell,
  BellRing,
  Radar,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Report } from "../types";

function MapUpdater() {
  const map = useMap();
  useEffect(() => {
    // Invalidate size after a short delay to ensure the container is fully rendered
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock data for monthly trend
const monthlyTrendData = [
  { name: "Jan", reported: 120, resolved: 80 },
  { name: "Feb", reported: 150, resolved: 100 },
  { name: "Mar", reported: 180, resolved: 140 },
  { name: "Apr", reported: 130, resolved: 150 },
  { name: "May", reported: 190, resolved: 160 },
  { name: "Jun", reported: 210, resolved: 195 },
];

// Fix Leaflet's default icon path issues in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

const ReportImageGallery = ({ report }: { report: Report }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images =
    report.imageUrls && report.imageUrls.length > 0
      ? report.imageUrls
      : report.imageUrl
        ? [report.imageUrl]
        : [];

  if (images.length === 0) return null;

  return (
    <div
      className="mb-6 rounded-lg overflow-hidden border border-border-default h-48 w-full relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      tabIndex={0}
      onKeyDown={(e) => {
        if (images.length <= 1) return;
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
        }
      }}
      aria-label="Image gallery"
      role="region"
    >
      <img
        src={images[currentIndex]}
        alt={`${report.type} image ${currentIndex + 1} of ${images.length}`}
        className="w-full h-full object-cover transition-opacity duration-300"
      />
      {images.length > 1 && (
        <>
          <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex((prev) =>
                  prev > 0 ? prev - 1 : images.length - 1,
                );
              }}
              className="bg-black/50 hover:bg-black/80 text-white rounded-full w-8 h-8 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent flex items-center justify-center"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} className="mr-0.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex((prev) =>
                  prev < images.length - 1 ? prev + 1 : 0,
                );
              }}
              className="bg-black/50 hover:bg-black/80 text-white rounded-full w-8 h-8 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent flex items-center justify-center"
              aria-label="Next image"
            >
              <ChevronRight size={20} className="ml-0.5" />
            </button>
          </div>
          <div
            className="absolute bottom-2 left-0 right-0 flex justify-center gap-1"
            aria-hidden="true"
          >
            {images.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default function Dashboard({
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
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Pending" | "Verified" | "Resolved"
  >("All");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [sortMode, setSortMode] = useState<"date" | "impact">("date");
  const [subscribedReports, setSubscribedReports] = useState<Set<string>>(
    new Set(),
  );

  const [nearbyAlertsEnabled, setNearbyAlertsEnabled] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [alerts, setAlerts] = useState<{ id: string; text: string }[]>([]);
  const lastCheckedTimeRef = useRef<number>(Date.now());
  const previousReportsRef = useRef<Report[]>([]);

  const toggleNearbyAlerts = () => {
    if (!nearbyAlertsEnabled) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setUserLocation({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
            setNearbyAlertsEnabled(true);
            lastCheckedTimeRef.current = Date.now();
            addAlert(
              "Nearby alerts activated. We'll notify you of new issues within 1km.",
            );
          },
          (err) => {
            console.error("Geolocation error:", err);
            addAlert("Failed to get location for nearby alerts.");
          },
        );
      } else {
        addAlert("Geolocation is not supported by your browser.");
      }
    } else {
      setNearbyAlertsEnabled(false);
      setUserLocation(null);
    }
  };

  const addAlert = (text: string) => {
    const id = Date.now().toString();
    setAlerts((prev) => [...prev, { id, text }]);
    setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.id !== id));
    }, 5000);
  };

  const toggleSubscription = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setSubscribedReports((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch("/api/reports");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const text = await res.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          console.error("Failed to parse JSON:", text.substring(0, 50));
          data = { reports: [] };
        }

        try {
          const myReports: string[] = JSON.parse(
            localStorage.getItem("my_reports") || "[]",
          );
          if (previousReportsRef.current.length > 0) {
            data.reports.forEach((newReport: Report) => {
              if (myReports.includes(newReport.id)) {
                const oldReport = previousReportsRef.current.find(
                  (r) => r.id === newReport.id,
                );
                if (oldReport && oldReport.status !== newReport.status) {
                  if (
                    newReport.status.includes("Routed") ||
                    newReport.status.includes("In Progress") ||
                    newReport.status.includes("Acknowledged")
                  ) {
                    if (
                      !oldReport.status.includes("Routed") &&
                      !oldReport.status.includes("In Progress") &&
                      !oldReport.status.includes("Acknowledged")
                    ) {
                      addAlert(
                        `Update! An agency has acknowledged your report: ${newReport.type}`,
                      );
                    }
                  }
                }
              }
            });
          }
        } catch (e) {
          console.error("Push notification check failed:", e);
        }
        previousReportsRef.current = data.reports;

        if (nearbyAlertsEnabled && userLocation) {
          const newReports = data.reports.filter(
            (r: Report) =>
              new Date(r.date).getTime() > lastCheckedTimeRef.current,
          );

          if (newReports.length > 0) {
            lastCheckedTimeRef.current = Date.now();

            const nearby = newReports.filter((r: Report) => {
              if (!r.lat || !r.lng) return false;
              const dist = getDistance(
                userLocation.lat,
                userLocation.lng,
                r.lat,
                r.lng,
              );
              return dist <= 1.0; // 1km radius
            });

            if (nearby.length > 0) {
              addAlert(
                `${nearby.length} new civic issue(s) reported within 1km of your location!`,
              );
            }
          }
        }

        setReports(data.reports);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
    const interval = setInterval(fetchReports, 10000);
    return () => clearInterval(interval);
  }, [nearbyAlertsEnabled, userLocation]);

  const submitComment = async (reportId: string, text: string) => {
    try {
      const res = await fetch(`/api/reports/${reportId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, author: "You" }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const resText = await res.text();
      let data;
      try {
        data = JSON.parse(resText);
      } catch (e) {
        console.error("Failed to parse JSON:", resText.substring(0, 50));
        return;
      }
      if (data && data.success) {
        try {
          const myComments = JSON.parse(
            localStorage.getItem("my_comments") || "[]",
          );
          if (!myComments.includes(reportId)) {
            myComments.push(reportId);
            localStorage.setItem("my_comments", JSON.stringify(myComments));
          }
        } catch (e) {
          console.error("Failed to save comment local storage", e);
        }
        setReports((prev) =>
          prev.map((r) => {
            if (r.id === reportId) {
              return {
                ...r,
                comments: [...(r.comments || []), data.comment],
              };
            }
            return r;
          }),
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const markResolved = async (reportId: string) => {
    try {
      const res = await fetch(`/api/reports/${reportId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Resolved" }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error("Failed to parse JSON:", text.substring(0, 50));
        return;
      }
      if (data && data.success) {
        setReports((prev) =>
          prev.map((r) =>
            r.id === reportId ? { ...r, status: "Resolved" } : r,
          ),
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center space-y-4">
        <div className="flex space-x-1">
          <div className="w-1 h-4 bg-accent animate-pulse"></div>
          <div className="w-1 h-4 bg-accent"></div>
          <div className="w-1 h-4 bg-accent"></div>
        </div>
        <div className="text-xxs font-mono text-text-subtle uppercase tracking-widest">
          Loading Reports...
        </div>
      </div>
    );
  }

  const filteredReports = reports
    .filter((report) => {
      const matchesSearch =
        report.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (report.ward &&
          report.ward.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (report.description &&
          report.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const isVerified = report.status.includes("Verified");
      const isResolved = report.status.includes("Resolved");
      const matchesStatus =
        statusFilter === "All"
          ? true
          : statusFilter === "Verified"
            ? isVerified
            : statusFilter === "Resolved"
              ? isResolved
              : !isVerified && !isResolved;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortMode === "impact") {
        const scoreA = a.impactScore ?? 0;
        const scoreB = b.impactScore ?? 0;
        return scoreB - scoreA;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return (
    <div className="space-y-8 py-8 relative">
      {/* Toast Alerts */}
      {alerts.length > 0 && (
        <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-accent/90 backdrop-blur-sm text-text-on-accent px-4 py-3 rounded-lg shadow-xl shadow-black/50 border border-accent flex items-start gap-3 transform transition-all animate-in slide-in-from-bottom-5"
            >
              <Radar size={18} className="mt-0.5 animate-pulse shrink-0" />
              <p className="text-sm font-sans flex-1">{alert.text}</p>
              <button
                onClick={() =>
                  setAlerts((prev) => prev.filter((a) => a.id !== alert.id))
                }
                className="text-text-on-accent/70 hover:text-text-on-accent"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="xl:col-span-7 flex flex-col gap-6">
          {/* Add New Issue */}
          <div className="bg-gradient-to-br from-accent/5 to-transparent border border-border-default rounded-2xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none transition-all duration-500 group-hover:bg-accent/20 group-hover:scale-110"></div>
            <div className="relative z-10 flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold mb-2 text-text-primary">
                  Report an Issue
                </h3>
                <p className="text-text-muted text-sm">
                  Describe the issue or upload an image. AI will automatically categorize and route it.
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-accent/10 text-accent px-3 py-1.5 rounded-full border border-accent/20 shadow-sm">
                 <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </div>
                <span className="text-xs font-bold tracking-wider uppercase">Intake Agent</span>
              </div>
            </div>
            <div className="flex bg-surface-card rounded-lg overflow-hidden border border-border-default shadow-sm focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-all relative z-10">
              <input
                placeholder="Describe the issue or upload image"
                className="flex-1 bg-transparent px-4 py-3 outline-none text-sm text-text-primary placeholder:text-text-muted cursor-text"
                onFocus={() => setView("capture")}
              />
              <button 
                onClick={() => setView("capture")}
                className="p-3 text-text-muted hover:text-accent transition-colors flex items-center justify-center"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </button>
              <button 
                onClick={() => setView("capture")}
                className="bg-accent hover:bg-accent-hover text-text-on-accent px-5 shrink-0 font-semibold transition-colors flex items-center justify-center group-hover:bg-accent-hover"
                aria-label="Submit issue"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Recent Reports List */}
          <div className="bg-surface-card border border-border-default rounded-2xl shadow-sm flex flex-col">
            <div className="p-6 border-b border-border-default flex justify-between items-center bg-surface-card z-10 shrink-0">
              <h3 className="font-bold text-lg text-text-primary">
                Recent Reports
              </h3>
              <button className="text-xs text-accent font-semibold hover:underline">View all</button>
            </div>
            <div className="p-6 space-y-4 bg-surface-canvas">
              <div className="grid gap-4 md:grid-cols-1">
                {loading ? (
                  <div className="col-span-full flex flex-col items-center justify-center py-12 text-text-subtle bg-surface-card border border-border-default rounded-lg">
                    <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin mb-4"></div>
                    <span className="font-mono text-xs uppercase tracking-widest">Loading Reports...</span>
                  </div>
                ) : (
                  <>
                    {filteredReports.map((report) => (
                  <div key={report.id} className="flex items-center gap-4 py-3 border-b border-border-default last:border-0 hover:bg-surface-canvas rounded-lg px-2 -mx-2 transition-colors cursor-pointer group">
                    <div className="w-12 h-12 rounded-lg bg-surface-muted overflow-hidden shrink-0 border border-border-subtle">
                      {report.imageUrl ? (
                        <img src={report.imageUrl} alt={report.type} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-text-subtle">
                          <MapPin size={20} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <h4 className="font-semibold text-text-primary text-sm group-hover:text-accent transition-colors">{report.type}</h4>
                        {report.status.includes('Verified') && (
                           <div className="inline-flex w-fit items-center gap-1 bg-surface-muted px-1.5 py-0.5 rounded text-xxs text-text-secondary border border-border-default shadow-sm" title="AI Confidence Score">
                             <Radar size={10} className="text-accent shrink-0" />
                             <span className="font-mono shrink-0">98%</span>
                           </div>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-xs text-text-muted">{report.location}</span>
                        <span className="text-xxs text-text-subtle font-mono shrink-0">•</span>
                        <span className="text-xs text-text-muted shrink-0">{new Date(report.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="shrink-0 flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-full text-xxs font-bold uppercase tracking-wider ${
                        report.status.includes('Resolved') ? 'bg-success/10 text-success' :
                        report.status.includes('Verified') ? 'bg-accent/10 text-accent' :
                        'bg-warning/10 text-warning'
                      }`}>
                        {report.status.replace(' Verification', '').replace('Community Verified', 'Verified')}
                      </span>
                    </div>
                  </div>
                ))}
                {filteredReports.length === 0 && (
                  <div className="col-span-full py-12 text-center border border-dashed border-border-default rounded-lg bg-surface-card">
                    <div className="text-text-subtle font-mono text-xs uppercase tracking-widest">
                      No recent reports found.
                    </div>
                  </div>
                )}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-card border border-border-default rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
              <h3 className="text-sm font-semibold mb-6 text-text-secondary uppercase tracking-wider self-start">
                City Health Score
              </h3>
              <div className="relative mb-2">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    fill="transparent"
                    stroke="var(--border-default)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    fill="transparent"
                    stroke="var(--success)"
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset="55.2"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-text-primary">78</span>
                  <span className="text-xxs font-semibold text-text-muted">
                    /100
                  </span>
                </div>
              </div>
              <div className="text-success font-semibold text-xs mt-2">Good</div>
            </div>

            <div className="md:col-span-2 bg-surface-card border border-border-default rounded-2xl p-6 shadow-sm flex flex-col">
              <h3 className="text-sm font-semibold mb-2 text-text-secondary uppercase tracking-wider">
                Top Issue Types
              </h3>
              <div className="flex-1 min-h-[150px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={Object.entries(
                        reports.reduce((acc, report) => {
                          acc[report.type] = (acc[report.type] || 0) + 1;
                          return acc;
                        }, {} as Record<string, number>)
                      ).map(([name, value]: [string, any]) => ({ name, value: Number(value) })).sort((a,b) => b.value - a.value).slice(0, 5)}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {Object.entries(
                        reports.reduce((acc, report) => {
                          acc[report.type] = (acc[report.type] || 0) + 1;
                          return acc;
                        }, {} as Record<string, number>)
                      ).map(([name, value]: [string, any]) => ({ name, value: Number(value) })).sort((a,b) => b.value - a.value).slice(0, 5).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['var(--agent-2)', 'var(--secondary)', 'var(--highlight)', 'var(--agent-6)', 'var(--danger)'][index % 5]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--surface-canvas)', borderColor: 'var(--border-subtle)', borderRadius: '8px' }}
                      itemStyle={{ color: 'var(--text-primary)', fontSize: '12px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="xl:col-span-5 flex flex-col gap-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-surface-card p-4 sm:p-6 rounded-2xl border border-border-default shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2 text-text-secondary">
                  Total Reports
                </div>
                <div className="text-2xl sm:text-3xl font-black mb-1 sm:mb-2 text-text-primary">
                  {reports.length || "12,842"}
                </div>
                <div className="text-success text-xxs sm:text-xs font-semibold">
                  +18% this week
                </div>
              </div>
            </div>
            <div className="bg-surface-card p-4 sm:p-6 rounded-2xl border border-border-default shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2 text-text-secondary">
                  Resolved
                </div>
                <div className="text-2xl sm:text-3xl font-black mb-1 sm:mb-2 text-text-primary">
                  {reports.filter((r) => r.status === "Resolved" || r.status === "Fixed").length || "8,023"}
                </div>
                <div className="text-success text-xxs sm:text-xs font-semibold">
                  +24% this week
                </div>
              </div>
            </div>
            <div className="bg-surface-card p-4 sm:p-6 rounded-2xl border border-border-default shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2 text-text-secondary">
                  In Progress
                </div>
                <div className="text-2xl sm:text-3xl font-black mb-1 sm:mb-2 text-text-primary">
                  {reports.filter((r) => r.status === "In Progress").length || "3,214"}
                </div>
                <div className="text-warning text-xxs sm:text-xs font-semibold">
                  +5% this week
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-danger-subtle border border-danger/20 rounded-xl p-4 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-2">
               <AlertTriangle size={18} className="text-danger" />
               <span className="text-danger-text font-semibold text-sm">Hotspots</span>
            </div>
            <span className="bg-danger text-white text-xs font-bold px-2 py-1 rounded-md">24 High risk areas</span>
          </div>

          {/* Live Map */}
          <div className="bg-surface-card border border-border-default rounded-2xl shadow-sm flex flex-col min-h-[350px] flex-1 overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-border-default flex justify-between items-center bg-surface-card z-10 shrink-0">
              <h3 className="font-bold text-lg text-text-primary">Live Map</h3>
              <button className="text-xs text-text-secondary border border-border-default rounded px-3 py-1 bg-surface-canvas hover:bg-surface-muted flex items-center gap-1 font-semibold">
                All Issues <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
              </button>
            </div>
            <div className="flex-1 w-full relative h-[300px] min-h-[300px]">
              <MapContainer
                center={[12.9716, 77.5946]}
                zoom={12}
                className="h-[300px] w-full z-0"
                style={{ height: "300px", width: "100%" }}
                zoomControl={false}
              >
                <MapUpdater />
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {filteredReports.map(
                  (report) =>
                    report.lat &&
                    report.lng && (
                      <CircleMarker
                        key={report.id}
                        center={[report.lat, report.lng]}
                        radius={6}
                        pathOptions={{
                          color: report.status.includes("Resolved")
                            ? "var(--success)"
                            : report.status.includes("Verified")
                              ? "var(--accent)"
                              : "var(--warning)",
                          fillColor: report.status.includes("Resolved")
                            ? "var(--success)"
                            : report.status.includes("Verified")
                              ? "var(--accent)"
                              : "var(--warning)",
                          fillOpacity: 0.7,
                          weight: 2,
                        }}
                      >
                        <Popup className="custom-popup">
                          <div className="p-1">
                            <h4 className="font-bold text-sm mb-1">
                              {report.type}
                            </h4>
                            <p className="text-xs text-text-muted mb-2">
                              {report.location}
                            </p>
                            <span
                              className={`text-xxs font-bold px-2 py-1 rounded uppercase tracking-wider ${
                                report.status.includes("Resolved")
                                  ? "bg-success-subtle text-success-text"
                                  : "bg-warning-subtle text-warning-text"
                              }`}
                            >
                              {report.status.replace(' Verification', '').replace('Community Verified', 'Verified')}
                            </span>
                          </div>
                        </Popup>
                      </CircleMarker>
                    ),
                )}
              </MapContainer>
            </div>
          </div>

          {/* AI Insights - City Pulse Agent */}
          <div className="bg-surface-card border border-border-default rounded-2xl p-6 shadow-sm flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none transition-all duration-500 group-hover:bg-accent/10"></div>
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">City Pulse Agent</h3>
                <span className="flex items-center gap-1 px-2 py-0.5 bg-accent/10 text-accent rounded-full text-xxs font-bold border border-accent/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                  ANALYZING
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center border border-accent/20">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
            </div>
            
            <div className="space-y-5 relative z-10">
              <div className="group/item">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0 shadow-[0_0_8px_rgba(var(--accent-rgb),0.8)]" />
                  <div>
                    <p className="text-sm text-text-primary font-medium">Pothole reports up 24% in Koramangala this week.</p>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="text-xxs font-mono text-text-subtle bg-surface-muted px-1.5 py-0.5 rounded border border-border-subtle">CONFIDENCE 94%</span>
                      <span className="text-xxs font-mono text-text-subtle flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                        DATA: PW_REPORTS_V2
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group/item">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0 shadow-[0_0_8px_rgba(var(--secondary-rgb),0.8)]" />
                  <div>
                    <p className="text-sm text-text-primary font-medium">Resolution time for streetlights improved by 1.2 days.</p>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="text-xxs font-mono text-text-subtle bg-surface-muted px-1.5 py-0.5 rounded border border-border-subtle">CONFIDENCE 88%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group/item">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-highlight mt-2 shrink-0 shadow-[0_0_8px_rgba(var(--highlight-rgb),0.8)]" />
                  <div>
                    <p className="text-sm text-text-primary font-medium">High-risk water logging detected near Outer Ring Road.</p>
                    <div className="mt-2 flex items-center gap-3">
                       <span className="text-xxs font-mono text-text-subtle bg-surface-muted px-1.5 py-0.5 rounded border border-border-subtle">CONFIDENCE 97%</span>
                       <span className="text-xxs font-mono text-warning bg-warning-subtle px-1.5 py-0.5 rounded border border-warning/20">ACTION RECOMMENDED</span>
                    </div>
                    <div className="mt-2 border-l-2 border-border-default pl-3 ml-1">
                      <p className="text-xs text-text-muted italic">Reasoning: Heavy rainfall predicted in next 4hrs overlapping with existing unresolved drainage blocks.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
