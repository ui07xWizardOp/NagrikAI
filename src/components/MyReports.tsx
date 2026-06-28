import { useState } from "react";
import ReportDetail from "./ReportDetail";
import { IssueCard, IssueReport } from "./ui/IssueCard";
import { EmptyState } from "./ui/StateComponents";
import { FileText } from "lucide-react";

export default function MyReports() {
  const [reports] = useState<IssueReport[]>([
    {
      id: "R-1042",
      issueType: "Pothole",
      wardName: "Koramangala 80ft Road",
      createdAt: "2026-05-12T10:00:00Z",
      status: "fixed",
      severity: 3,
      aiConfidence: 0.95,
      description: "Large pothole in the middle of the road causing traffic slowdowns.",
      image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "R-1043",
      issueType: "Garbage_Dump",
      wardName: "HSR Layout Sector 2",
      createdAt: "2026-05-14T14:30:00Z",
      status: "progress",
      severity: 2,
      aiConfidence: 0.88,
      description: "Uncollected garbage piling up near the park entrance.",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "R-1045",
      issueType: "Broken_Streetlight",
      wardName: "Indiranagar 100ft Road",
      createdAt: "2026-05-15T19:15:00Z",
      status: "new",
      severity: 4,
      aiConfidence: 0.72,
      description: "Streetlight is completely dark, causing safety issues for pedestrians.",
      image: "https://images.unsplash.com/photo-1519782522787-8e67aeb61c47?auto=format&fit=crop&q=80&w=400"
    }
  ]);
  const [filter, setFilter] = useState("All");
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const filterMapping: Record<string, string[]> = {
    "All": ["new", "routed", "progress", "fixed", "disputed"],
    "Pending": ["new", "routed", "disputed"],
    "In Progress": ["progress"],
    "Resolved": ["fixed"]
  };

  const filteredReports = reports.filter(r => filterMapping[filter].includes(r.status));

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2 tracking-tight">My Reports ({reports.length})</h1>
            <p className="text-text-secondary">Track the status of civic issues you've reported.</p>
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

        {filteredReports.length === 0 ? (
          <div className="bg-surface-card border border-border-default rounded-3xl">
            <EmptyState 
              icon={FileText} 
              title="No reports found" 
              description={`You don't have any ${filter.toLowerCase()} reports at the moment.`} 
              action={{ label: "Report an Issue", onClick: () => {} }}
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
        <ReportDetail onClose={() => setSelectedReport(null)} />
      )}
    </>
  );
}
