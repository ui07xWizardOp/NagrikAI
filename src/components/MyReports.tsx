import { useState, useEffect } from "react";
import ReportDetail from "./ReportDetail";
import { IssueCard, IssueReport } from "./ui/IssueCard";
import { EmptyState } from "./ui/StateComponents";
import { FileText, Loader2 } from "lucide-react";
import { Report } from "../types";
import { getAuth } from "firebase/auth";

export default function MyReports({
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
      | "karma"
      | "myreports",
  ) => void;
}) {
  const [reports, setReports] = useState<IssueReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    
    // Fallback to local storage if not logged in just in case
    const endpoint = userId ? `/api/reports/me?userId=${userId}` : '/api/reports';

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        const allReports: Report[] = data.reports || [];
        
        let mappedReports: IssueReport[] = [];
        if (userId) {
          mappedReports = allReports.map((r): IssueReport => ({
            id: r.id,
            issueType: r.type,
            wardName: r.ward || "Unknown Ward",
            createdAt: r.date,
            status: r.status.includes("Resolved")
              ? "fixed"
              : r.status.includes("Progress")
                ? "progress"
                : "new",
            severity: (r.severity as 1 | 2 | 3 | 4 | 5) || 1,
            aiConfidence: r.impactScore ? r.impactScore / 100 : 0.85,
            description: r.description,
            image:
              r.imageUrl ||
              "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400",
          }));
        } else {
          // Legacy logic for non-logged in testing
          const myReportIds = JSON.parse(
            localStorage.getItem("my_reports") || "[]",
          );
          mappedReports = allReports
            .filter((r) => myReportIds.includes(r.id))
            .map((r): IssueReport => ({
              id: r.id,
              issueType: r.type,
              wardName: r.ward || "Unknown Ward",
              createdAt: r.date,
              status: r.status.includes("Resolved")
                ? "fixed"
                : r.status.includes("Progress")
                  ? "progress"
                  : "new",
              severity: (r.severity as 1 | 2 | 3 | 4 | 5) || 1,
              aiConfidence: r.impactScore ? r.impactScore / 100 : 0.85,
              description: r.description,
              image:
                r.imageUrl ||
                "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400",
            }));
        }

        setReports(mappedReports);
      })
      .catch((err) => console.error("Failed to fetch reports:", err))
      .finally(() => setLoading(false));
  }, []);

  const filterMapping: Record<string, string[]> = {
    All: ["new", "routed", "progress", "fixed", "disputed"],
    Pending: ["new", "routed", "disputed"],
    "In Progress": ["progress"],
    Resolved: ["fixed"],
  };

  const filteredReports = reports.filter((r) =>
    filterMapping[filter].includes(r.status),
  );

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2 tracking-tight">
              My Reports ({reports.length})
            </h1>
            <p className="text-text-secondary">
              Track the status of civic issues you've reported.
            </p>
          </div>
          <div className="flex gap-2 self-start md:self-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {["All", "Pending", "In Progress", "Resolved"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap ${filter === f ? "bg-text-primary text-surface-canvas" : "bg-surface-card border border-border-default text-text-secondary hover:bg-surface-muted"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </header>

        {loading ? (
          <div className="bg-surface-card border border-border-default rounded-3xl p-12 flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 text-accent animate-spin mb-4" />
            <p className="text-text-secondary font-medium">
              Loading your reports...
            </p>
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="bg-surface-card border border-border-default rounded-3xl">
            <EmptyState
              icon={FileText}
              title="No reports found"
              description={`You don't have any ${filter.toLowerCase()} reports at the moment.`}
              action={{
                label: "Report an Issue",
                onClick: () => setView("capture"),
              }}
            />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredReports.map((report) => (
              <IssueCard
                key={report.id}
                report={report}
                onClick={() => setSelectedReport(report.id)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedReport && (
        <ReportDetail
          reportId={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </>
  );
}
