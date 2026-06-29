import {
  Bell,
  AlertTriangle,
  Info,
  CheckCircle,
  Clock,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Report } from "../types";

export default function Alerts() {
  const [alerts, setAlerts] = useState<any[]>([
    {
      id: "mock-1",
      type: "critical",
      title: "Heavy Rainfall Warning",
      message:
        "Expect severe water logging in low-lying areas of Koramangala and HSR Layout over the next 4 hours.",
      time: "10 mins ago",
      icon: AlertTriangle,
      color: "text-error",
      bg: "bg-error-subtle",
      border: "border-error/20",
      read: false,
    },
    {
      id: "mock-3",
      type: "info",
      title: "Scheduled Maintenance",
      message:
        "Power outage planned in Ward 45 tomorrow from 10 AM to 2 PM for grid upgrades.",
      time: "5 hours ago",
      icon: Info,
      color: "text-accent",
      bg: "bg-accent-subtle",
      border: "border-accent/20",
      read: false,
    },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reports")
      .then((res) => res.json())
      .then((data) => {
        const allReports: Report[] = data.reports || [];
        const myReportIds = JSON.parse(
          localStorage.getItem("my_reports") || "[]",
        );

        const myResolvedReports = allReports.filter(
          (r) => myReportIds.includes(r.id) && r.status.includes("Resolved"),
        );

        const newAlerts = myResolvedReports.map((r) => ({
          id: r.id,
          type: "success",
          title: "Report Resolved",
          message: `Your report regarding a ${r.type} in ${r.ward || r.location.split(",")[0]} has been resolved.`,
          time: new Date(r.date).toLocaleDateString(),
          icon: CheckCircle,
          color: "text-secondary",
          bg: "bg-secondary-subtle",
          border: "border-secondary/20",
          read: false,
        }));

        setAlerts((prev) => [...newAlerts, ...prev]);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const markAllAsRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2 tracking-tight">
            Alerts
          </h1>
          <p className="text-text-secondary">
            Stay updated with civic alerts, issue updates, and community
            notices.
          </p>
        </div>
        <button
          onClick={markAllAsRead}
          className="text-sm font-medium text-accent hover:underline"
        >
          Mark all as read
        </button>
      </header>

      {loading ? (
        <div className="bg-surface-card border border-border-default rounded-3xl p-12 flex flex-col items-center justify-center min-h-[200px]">
          <Loader2 className="w-8 h-8 text-accent animate-spin mb-4" />
          <p className="text-text-secondary font-medium">Loading alerts...</p>
        </div>
      ) : (
        <div className="bg-surface-card border border-border-default rounded-2xl shadow-sm overflow-hidden">
          <div className="divide-y divide-border-default">
            {alerts.length > 0 ? (
              alerts.map((alert) => {
                const Icon = alert.icon;
                return (
                  <div
                    key={alert.id}
                    className={`p-6 hover:bg-surface-muted/50 transition-colors flex gap-4 group ${alert.read ? "opacity-70" : ""}`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${alert.bg} ${alert.border} ${alert.color}`}
                    >
                      <Icon size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-semibold text-text-primary">
                            {alert.title}
                          </h3>
                          {!alert.read && (
                            <span className="w-2 h-2 rounded-full bg-accent shrink-0"></span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-text-muted font-mono">
                          <Clock size={12} />
                          {alert.time}
                        </div>
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {alert.message}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-text-muted">
                No new alerts.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
