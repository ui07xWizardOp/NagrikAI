import React, { useState, useEffect } from "react";
import { AlertTriangle, Clock, CheckCircle2, MapPin } from "lucide-react";
import { Report } from "../types";

export default function Agency() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reports")
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const text = await r.text();
        try {
          return JSON.parse(text);
        } catch (e) {
          console.error("Failed to parse JSON:", text.slice(0, 50));
          return { reports: [] };
        }
      })
      .then((data) => {
        if (data && data.reports) {
          setReports(
            data.reports.filter((r: Report) => !r.status.includes("Resolved")),
          );
        }
        setLoading(false);
      })
      .catch((e) => {
        console.error("Fetch reports error in Agency:", e);
        setLoading(false);
      });
  }, []);

  const handleResolve = async (id: string) => {
    try {
      const res = await fetch(`/api/reports/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Resolved" }),
      });
      if (res.ok) {
        setReports(reports.filter((r) => r.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8 py-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border-default pb-6 gap-6">
        <div>
          <p className="text-accent font-mono text-xxs uppercase tracking-widest mb-2">
            Internal Dashboard
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-text-primary">
            BBMP SLA Tracker
          </h2>
          <p className="text-sm font-mono text-text-muted mt-2">
            Ward 80, Indiranagar
          </p>
        </div>
        <div className="flex gap-4">
          <div className="bg-surface-card border border-border-default px-4 py-3 rounded-lg flex flex-col items-end">
            <span className="text-xxs text-text-subtle uppercase tracking-widest mb-1">
              Avg Resolution
            </span>
            <span className="text-xl font-black text-text-primary">
              4.2{" "}
              <span className="text-xs text-text-subtle font-normal">days</span>
            </span>
          </div>
          <div className="bg-danger-subtle border border-danger/20 px-4 py-3 rounded-lg flex flex-col items-end">
            <span className="text-xxs text-danger uppercase tracking-widest mb-1">
              SLA Breached
            </span>
            <span className="text-xl font-black text-danger">12</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {loading && (
          <div className="text-xs font-mono text-text-subtle">
            Loading queue...
          </div>
        )}
        {reports.map((report) => {
          const isBreached = report.severity >= 4; // Mock logic for SLA breach

          return (
            <div
              key={report.id}
              className="bg-surface-card border border-border-subtle rounded-lg p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-surface-muted transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`w-2 h-2 rounded-full ${report.severity >= 4 ? "bg-danger" : "bg-warning"}`}
                  ></span>
                  <h3 className="font-bold text-lg uppercase tracking-tight text-text-primary">
                    {report.type}
                  </h3>
                  <span className="px-2 py-0.5 bg-surface-muted text-text-muted text-xxs uppercase font-mono tracking-widest rounded">
                    Sev {report.severity}
                  </span>
                </div>
                {report.imageUrl && (
                  <div className="mb-3 rounded overflow-hidden border border-border-default h-24 w-32 hidden md:block float-right ml-4">
                    <img
                      src={report.imageUrl}
                      alt={report.type}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="text-sm text-text-muted mb-3">
                  {report.description}
                </div>
                <div className="flex items-center gap-4 text-xxs font-mono tracking-widest text-text-subtle">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> {report.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />{" "}
                    {new Date(report.date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex md:flex-col items-center md:items-end gap-4 border-t md:border-t-0 border-border-subtle pt-4 md:pt-0 shrink-0">
                {isBreached ? (
                  <div className="flex items-center gap-2 text-danger bg-danger/10 px-3 py-1.5 rounded text-xs font-bold uppercase tracking-widest">
                    <AlertTriangle size={14} /> SLA Breached
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-success bg-success/10 px-3 py-1.5 rounded text-xs font-bold uppercase tracking-widest">
                    <Clock size={14} /> 48h Remaining
                  </div>
                )}

                <button
                  onClick={() => handleResolve(report.id)}
                  className="bg-accent hover:bg-accent text-text-on-accent px-6 py-2 rounded text-xs font-bold uppercase tracking-widest transition-colors w-full md:w-auto"
                >
                  Resolve
                </button>
              </div>
            </div>
          );
        })}
        {reports.length === 0 && !loading && (
          <div className="text-center py-12 text-text-subtle font-mono text-sm border border-dashed border-border-default rounded-lg">
            NO PENDING REPORTS
          </div>
        )}
      </div>
    </div>
  );
}
