import { useState, useEffect } from "react";
import { Check, MapPin, X, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "./ui/Button";
import { ConfidenceBadge } from "./ui/AIComponents";
import { Report } from "../types";

export default function CommunityVerification() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reports/pending-verification")
      .then((res) => res.json())
      .then((data) => {
        const pending = (data.reports || []).map((r: Report) => ({
          id: r.id,
          type: r.type,
          location: r.location || r.ward,
          description: r.description,
          confidence: r.impactScore ? r.impactScore / 100 : 0.65,
          distance: "Nearby",
          image:
            r.imageUrl ||
            "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400",
          status: "pending",
        }));
        setReports(pending);
      })
      .catch((err) => console.error("Failed to fetch reports:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleVerify = async (id: string, action: "confirm" | "dispute") => {
    const newStatus = action === "confirm" ? "Community Verified" : "Disputed";

    // Optimistic UI update
    setReports(
      reports.map((r) => (r.id === id ? { ...r, status: newStatus } : r)),
    );

    try {
      await fetch(`/api/reports/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (e) {
      console.error(e);
      // Rollback would go here in a real app
    }
  };

  const pendingReports = reports.filter((r) => r.status === "pending");

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2 tracking-tight">
            Community Verification
          </h1>
          <p className="text-text-secondary">
            Help the AI verify reports with low confidence in your area.
          </p>
        </div>
        <div className="px-4 py-2 bg-surface-card border border-border-default rounded-xl shadow-sm inline-flex items-center gap-2 self-start md:self-auto">
          <span className="text-xl font-black text-text-primary">
            {pendingReports.length}
          </span>
          <span className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
            Nearby
          </span>
        </div>
      </header>

      {loading ? (
        <div className="bg-surface-card border border-border-default rounded-3xl p-12 flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 text-accent animate-spin mb-4" />
          <p className="text-text-secondary font-medium">
            Loading unverified reports...
          </p>
        </div>
      ) : pendingReports.length === 0 ? (
        <div className="text-center py-24 bg-surface-card border border-border-default rounded-3xl shadow-sm">
          <div className="w-16 h-16 bg-success-subtle text-success-text rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-2">
            You're all caught up!
          </h3>
          <p className="text-text-secondary">
            No unverified reports near you at the moment.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pendingReports.map((report) => (
            <div
              key={report.id}
              className="bg-surface-card border border-border-default rounded-2xl overflow-hidden shadow-sm flex flex-col group transition-shadow hover:shadow-2"
            >
              <div className="h-48 relative overflow-hidden">
                <img
                  src={report.image}
                  alt={report.type}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <ConfidenceBadge value={report.confidence} />
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-text-primary leading-tight">
                    {report.type}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-text-muted mb-3 font-medium">
                  <MapPin size={14} /> {report.location} • {report.distance}
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-6 italic">
                  "{report.description}"
                </p>
                <div className="mt-auto grid grid-cols-2 gap-3">
                  <Button
                    variant="danger"
                    onClick={() => handleVerify(report.id, "dispute")}
                    className="w-full"
                  >
                    <X size={18} /> Dispute
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleVerify(report.id, "confirm")}
                    className="w-full bg-success hover:opacity-90 text-white border-transparent"
                  >
                    <Check size={18} /> Confirm
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
