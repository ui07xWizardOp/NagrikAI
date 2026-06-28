import { Bell, AlertTriangle, Info, CheckCircle, Clock } from "lucide-react";

export default function Alerts() {
  const alerts = [
    {
      id: 1,
      type: "critical",
      title: "Heavy Rainfall Warning",
      message: "Expect severe water logging in low-lying areas of Koramangala and HSR Layout over the next 4 hours.",
      time: "10 mins ago",
      icon: AlertTriangle,
      color: "text-error",
      bg: "bg-error-subtle",
      border: "border-error/20",
    },
    {
      id: 2,
      type: "success",
      title: "Report Resolved",
      message: "The pothole you reported on Outer Ring Road has been fixed by the agency.",
      time: "2 hours ago",
      icon: CheckCircle,
      color: "text-secondary",
      bg: "bg-secondary-subtle",
      border: "border-secondary/20",
    },
    {
      id: 3,
      type: "info",
      title: "Scheduled Maintenance",
      message: "Power outage planned in Ward 45 tomorrow from 10 AM to 2 PM for grid upgrades.",
      time: "5 hours ago",
      icon: Info,
      color: "text-accent",
      bg: "bg-accent-subtle",
      border: "border-accent/20",
    },
    {
      id: 4,
      type: "warning",
      title: "Traffic Alert",
      message: "Major congestion on Silk Board junction due to ongoing metro construction work.",
      time: "Yesterday",
      icon: AlertTriangle,
      color: "text-warning",
      bg: "bg-warning-subtle",
      border: "border-warning/20",
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2 tracking-tight">Alerts</h1>
          <p className="text-text-secondary">Stay updated with civic alerts, issue updates, and community notices.</p>
        </div>
        <button className="text-sm font-medium text-accent hover:underline">
          Mark all as read
        </button>
      </header>

      <div className="bg-surface-card border border-border-default rounded-2xl shadow-sm overflow-hidden">
        <div className="divide-y divide-border-default">
          {alerts.map((alert) => {
            const Icon = alert.icon;
            return (
              <div key={alert.id} className="p-6 hover:bg-surface-muted/50 transition-colors flex gap-4 group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${alert.bg} ${alert.border} ${alert.color}`}>
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-base font-semibold text-text-primary">{alert.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-text-muted font-mono">
                      <Clock size={12} />
                      {alert.time}
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">{alert.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
