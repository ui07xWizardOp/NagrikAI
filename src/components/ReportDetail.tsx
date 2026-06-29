import { useEffect, useState } from "react";
import {
  AlertTriangle,
  MapPin,
  X,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Loader2,
  Check,
} from "lucide-react";
import { Report } from "../types";

export default function ReportDetail({
  reportId,
  onClose,
}: {
  reportId: string;
  onClose: () => void;
}) {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isUpvoting, setIsUpvoting] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const fetchReportDetails = () => {
    fetch("/api/reports")
      .then((res) => res.json())
      .then((data) => {
        const found = data.reports?.find((r: Report) => r.id === reportId);
        setReport(found || null);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchReportDetails();
  }, [reportId]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
          onClick={onClose}
        />
        <div className="bg-surface-canvas rounded-3xl p-12 relative z-10 pointer-events-auto flex flex-col items-center">
          <Loader2 className="animate-spin text-accent mb-4" size={32} />
          <p className="text-text-secondary font-mono uppercase tracking-widest text-xs">
            Loading Details
          </p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
          onClick={onClose}
        />
        <div className="bg-surface-canvas rounded-3xl p-12 relative z-10 pointer-events-auto flex flex-col items-center">
          <AlertTriangle className="text-warning mb-4" size={32} />
          <p className="text-text-secondary mb-4">Report not found.</p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-accent text-white rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const confidence = report.impactScore ? Math.round(report.impactScore) : 85;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 pointer-events-none">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
        onClick={onClose}
      />

      <div className="bg-surface-canvas border border-border-default rounded-3xl w-full max-w-2xl max-h-full overflow-y-auto pointer-events-auto shadow-2xl animate-fade-in relative flex flex-col">
        <header className="sticky top-0 z-20 bg-surface-canvas/90 backdrop-blur-md border-b border-border-default p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-text-muted">
              #{report.id.slice(0, 8)}
            </span>
            <span
              className={`px-2 py-1 text-xs font-bold rounded uppercase tracking-wider ${
                report.status.includes("Resolved")
                  ? "bg-success/10 text-success"
                  : report.status.includes("Verified")
                    ? "bg-accent/10 text-accent"
                    : "bg-warning/10 text-warning"
              }`}
            >
              {report.status}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 bg-surface-muted hover:bg-border-default rounded-full text-text-secondary transition-colors"
          >
            <X size={20} />
          </button>
        </header>

        <div className="p-6 space-y-8">
          <div className="w-full h-64 bg-surface-muted rounded-2xl overflow-hidden relative">
            <img
              src={
                report.imageUrl ||
                "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800"
              }
              alt={report.type}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-surface-card/90 backdrop-blur-sm border border-border-default p-3 rounded-xl flex items-center justify-between shadow-sm">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-text-primary">
                  {report.type}
                </span>
                <span className="text-xs text-text-muted flex items-center gap-1">
                  <MapPin size={12} /> {report.location}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-accent font-mono text-xs font-bold">
                  CONFIDENCE {confidence}%
                </span>
                <span className="text-xs text-text-muted">
                  Severity {report.severity}
                </span>
              </div>
            </div>
          </div>

          <section className="space-y-4">
            <h3 className="text-xs font-bold text-text-subtle uppercase tracking-widest">
              Description
            </h3>
            <p className="text-sm text-text-primary">{report.description}</p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xs font-bold text-text-subtle uppercase tracking-widest">
              Agent Timeline
            </h3>
            <div className="space-y-4 border-l-2 border-border-default ml-2 pl-4">
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-secondary ring-4 ring-surface-canvas" />
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold text-text-primary">
                    Capture & Vision Agent
                  </span>
                  <span className="text-xs font-mono text-text-muted">
                    ✓ Done
                  </span>
                </div>
                <p className="text-xs text-text-secondary">
                  Report logged and categorized as {report.type} with Sev{" "}
                  {report.severity}.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-secondary ring-4 ring-surface-canvas" />
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold text-text-primary">
                    Duplicate Detection Agent
                  </span>
                  <span className="text-xs font-mono text-text-muted">
                    ✓ Done
                  </span>
                </div>
                <p className="text-xs text-text-secondary">
                  Embeddings generated. Checked pgvector for similar civic
                  issues in a 100m radius.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-secondary ring-4 ring-surface-canvas" />
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold text-text-primary">
                    Impact & Verification Agent
                  </span>
                  <span className="text-xs font-mono text-text-muted">
                    ✓ Done
                  </span>
                </div>
                <p className="text-xs text-text-secondary">
                  Calculated impact score: {report.impactScore || 85}/100.
                  Status set to {report.status}.
                </p>
              </div>

              <div className="relative">
                <div
                  className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full ring-4 ring-surface-canvas ${report.status.includes("Routed") || report.status.includes("Resolved") || report.agency ? "bg-secondary" : "bg-accent animate-pulse"}`}
                />
                <div className="flex justify-between items-center mb-1">
                  <span
                    className={`text-sm font-semibold ${report.status.includes("Routed") || report.status.includes("Resolved") || report.agency ? "text-text-primary" : "text-accent"}`}
                  >
                    Jurisdiction & Routing
                  </span>
                  <span className="text-xs font-mono text-text-muted">
                    {report.status.includes("Routed") ||
                    report.status.includes("Resolved") ||
                    report.agency
                      ? "✓ Done"
                      : "Processing..."}
                  </span>
                </div>
                <p className="text-xs text-text-secondary">
                  {report.status.includes("Routed") ||
                  report.status.includes("Resolved") ||
                  report.agency
                    ? `Routed to ${report.agency || "appropriate agency"}`
                    : "Determining appropriate agency for dispatch."}
                </p>
              </div>
            </div>
          </section>

          <section className="bg-warning/5 border border-warning/20 rounded-2xl p-5">
            <h3 className="text-xs font-bold text-warning uppercase tracking-widest flex items-center gap-2 mb-3">
              <ShieldAlert size={14} /> AI Context & Reasoning
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-3">
              <strong className="text-text-primary">Severity Reasoning:</strong>{" "}
              {report.severityReasoning ||
                `This issue was flagged as Severity ${report.severity} based on its type and location.`}
            </p>
            {report.costReasoning && (
              <p className="text-sm text-text-secondary leading-relaxed">
                <strong className="text-text-primary">Repair Agent:</strong>{" "}
                Estimated cost ₹{report.costEstimateLow} - ₹
                {report.costEstimateHigh}. {report.costReasoning}
              </p>
            )}
          </section>

          <section className="space-y-4">
            <h3 className="text-xs font-bold text-text-subtle uppercase tracking-widest">
              Community Comments ({report.comments?.length || 0})
            </h3>
            <div className="space-y-3">
              {report.comments?.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-surface-muted p-4 rounded-xl border border-border-default"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-sm text-text-primary">
                      {comment.author}
                    </span>
                    <span className="text-xs text-text-muted">
                      {new Date(comment.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary">{comment.text}</p>
                </div>
              ))}
              {(!report.comments || report.comments.length === 0) && (
                <p className="text-sm text-text-muted italic">
                  No comments yet. Be the first to add context.
                </p>
              )}
            </div>

            <div className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 bg-surface-canvas border border-border-default rounded-xl px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-accent"
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    commentText.trim() &&
                    !isSubmittingComment
                  ) {
                    setIsSubmittingComment(true);
                    fetch(`/api/reports/${report.id}/comments`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        text: commentText,
                        author: "Community Member",
                      }),
                    })
                      .then((res) => res.json())
                      .then(() => {
                        setCommentText("");
                        fetchReportDetails();
                      })
                      .finally(() => setIsSubmittingComment(false));
                  }
                }}
              />
              <button
                disabled={!commentText.trim() || isSubmittingComment}
                onClick={() => {
                  if (commentText.trim() && !isSubmittingComment) {
                    setIsSubmittingComment(true);
                    fetch(`/api/reports/${report.id}/comments`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        text: commentText,
                        author: "Community Member",
                      }),
                    })
                      .then((res) => res.json())
                      .then(() => {
                        setCommentText("");
                        fetchReportDetails();
                      })
                      .finally(() => setIsSubmittingComment(false));
                  }
                }}
                className="bg-accent hover:bg-accent-hover disabled:opacity-50 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
              >
                Post
              </button>
            </div>
          </section>
        </div>

        <div className="sticky bottom-0 bg-surface-canvas border-t border-border-default p-4 flex gap-3 shrink-0 z-20">
          <button
            onClick={() => {
              const url = window.location.href;
              navigator.clipboard.writeText(url);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="flex-1 bg-surface-muted hover:bg-border-default text-text-primary py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <Check size={18} className="text-success" /> Copied!
              </>
            ) : (
              "Share"
            )}
          </button>
          <button
            onClick={async (e) => {
              if (isUpvoting) return;
              setIsUpvoting(true);
              const upvotedIds = JSON.parse(
                localStorage.getItem("upvoted_reports") || "[]",
              );
              const alreadyUpvoted = upvotedIds.includes(report.id);

              if (!alreadyUpvoted) {
                try {
                  await fetch(`/api/reports/${report.id}/upvote`, {
                    method: "POST",
                  });
                  localStorage.setItem(
                    "upvoted_reports",
                    JSON.stringify([...upvotedIds, report.id]),
                  );
                  fetchReportDetails();
                } catch (error) {
                  console.error("Upvote failed", error);
                }
              }
              setIsUpvoting(false);
            }}
            disabled={isUpvoting}
            className={`flex-1 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 ${JSON.parse(localStorage.getItem("upvoted_reports") || "[]").includes(report.id) ? "bg-success hover:bg-success" : "bg-accent hover:bg-accent-hover"}`}
          >
            {JSON.parse(
              localStorage.getItem("upvoted_reports") || "[]",
            ).includes(report.id) ? (
              <>
                <Check size={18} /> Upvoted ({report.upvotes || 0})
              </>
            ) : (
              `Upvote (${report.upvotes || 0})`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
