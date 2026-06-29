import {
  Terminal,
  Copy,
  Download,
  Code,
  Database,
  Search,
  Check,
  AlertCircle,
  X,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function OpenData() {
  const [copied, setCopied] = useState(false);
  const [toasts, setToasts] = useState<
    { id: number; message: string; type: "success" | "info" }[]
  >([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const apiKey = "nk_live_7x89f...a1b2";

  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => {
        setLeads(data.leads || []);
      })
      .catch(console.error)
      .finally(() => setLoadingLeads(false));
  }, []);

  const addToast = (message: string, type: "success" | "info" = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    addToast("API Key copied to clipboard", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12 relative">
      {toasts.length > 0 && (
        <div className="fixed bottom-4 right-4 z-50 space-y-2 flex flex-col items-end pointer-events-none">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className="bg-surface-card border border-border-default shadow-lg rounded-xl p-4 flex items-center gap-3 animate-fade-in pointer-events-auto"
            >
              {toast.type === "success" ? (
                <Check className="text-success" size={18} />
              ) : (
                <AlertCircle className="text-accent" size={18} />
              )}
              <span className="text-sm font-medium text-text-primary">
                {toast.message}
              </span>
              <button
                onClick={() =>
                  setToasts((prev) => prev.filter((t) => t.id !== toast.id))
                }
                className="text-text-muted hover:text-text-primary"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2 tracking-tight">
            Journalist API Portal
          </h1>
          <p className="text-text-secondary">
            Access raw civic data, anomaly detection feeds, and live webhooks
            for reporting.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => {
              if (leads.length === 0) {
                addToast("No data available to export", "info");
                return;
              }
              const headers = ["ID", "Type", "Location", "Severity", "ImpactScore", "Status", "Date"];
              const csvContent = "data:text/csv;charset=utf-8," 
                + headers.join(",") + "\n"
                + leads.map(l => `${l.id},"${l.type}","${l.location}",${l.severity},${l.impactScore},"${l.status}","${l.date}"`).join("\n");
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement("a");
              link.setAttribute("href", encodedUri);
              link.setAttribute("download", `nagrik_ai_export_${new Date().toISOString().split('T')[0]}.csv`);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              addToast("CSV export downloaded successfully", "success");
            }}
            className="px-4 py-2 bg-surface-card border border-border-default hover:bg-surface-muted text-text-primary rounded-xl font-medium transition-colors flex items-center gap-2"
          >
            <Download size={18} />
            CSV Export
          </button>
          <button
            onClick={() => {
              if (leads.length === 0) {
                addToast("No data available to export", "info");
                return;
              }
              const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(leads, null, 2));
              const link = document.createElement("a");
              link.setAttribute("href", dataStr);
              link.setAttribute("download", `nagrik_ai_export_${new Date().toISOString().split('T')[0]}.json`);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              addToast("JSON dump downloaded successfully", "success");
            }}
            className="px-4 py-2 bg-surface-card border border-border-default hover:bg-surface-muted text-text-primary rounded-xl font-medium transition-colors flex items-center gap-2"
          >
            <Database size={18} />
            JSON Dump
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: API Info & Endpoints */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface-card border border-border-default rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Code size={20} className="text-accent" />
              Your API Key
            </h2>
            <div className="flex items-center justify-between p-4 bg-surface-canvas rounded-xl border border-border-strong">
              <code className="font-mono text-accent text-sm">{apiKey}</code>
              <button
                onClick={handleCopy}
                className="text-text-muted hover:text-text-primary transition-colors p-2"
                title="Copy API Key"
              >
                {copied ? (
                  <span className="text-secondary text-sm font-medium">
                    Copied!
                  </span>
                ) : (
                  <Copy size={18} />
                )}
              </button>
            </div>
            <p className="text-xs text-text-muted mt-3">
              Keep this key secret. Do not share it in public repositories.
            </p>
          </div>

          <div className="bg-surface-card border border-border-default rounded-2xl p-0 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border-default flex items-center justify-between">
              <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                <Terminal size={20} className="text-secondary" />
                Available Endpoints
              </h2>
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                />
                <input
                  type="text"
                  placeholder="Search endpoints..."
                  className="pl-9 pr-4 py-2 bg-surface-muted border border-border-default rounded-lg text-sm outline-none focus:border-accent w-64"
                />
              </div>
            </div>

            <div className="divide-y divide-border-default">
              {/* Endpoint 1 */}
              <div className="p-6 hover:bg-surface-muted/50 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs font-mono font-bold rounded">
                    GET
                  </span>
                  <code className="text-text-primary font-mono text-sm">
                    /v1/reports/recent
                  </code>
                </div>
                <p className="text-sm text-text-secondary mb-4">
                  Fetches the latest civic reports with pagination.
                </p>
                <div className="bg-surface-canvas rounded-lg p-4 overflow-x-auto">
                  <pre className="text-xs text-text-secondary font-mono">
                    {`curl -X GET "https://api.nagrik.ai/v1/reports/recent?limit=10" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                  </pre>
                </div>
              </div>

              {/* Endpoint 2 */}
              <div className="p-6 hover:bg-surface-muted/50 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs font-mono font-bold rounded">
                    GET
                  </span>
                  <code className="text-text-primary font-mono text-sm">
                    /v1/hotspots/wards
                  </code>
                </div>
                <p className="text-sm text-text-secondary mb-4">
                  Returns aggregated issue densities per municipal ward.
                </p>
                <div className="bg-surface-canvas rounded-lg p-4 overflow-x-auto">
                  <pre className="text-xs text-text-secondary font-mono">
                    {`curl -X GET "https://api.nagrik.ai/v1/hotspots/wards" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Story Leads */}
        <div className="space-y-6">
          <div className="bg-surface-card border border-border-default rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-text-primary">
                AI Story Leads
              </h2>
              <span className="px-2 py-1 bg-highlight/10 text-highlight text-xxs font-bold uppercase rounded-full border border-highlight/20 tracking-wider">
                Live Feed
              </span>
            </div>

            <div className="space-y-4">
              {loadingLeads ? (
                <div className="p-8 flex flex-col items-center justify-center text-text-muted">
                  <Loader2 className="w-8 h-8 animate-spin mb-4 text-accent" />
                  <p className="text-sm font-medium">
                    Generating live leads...
                  </p>
                </div>
              ) : leads.length === 0 ? (
                <div className="p-4 text-center text-text-muted text-sm border border-border-default rounded-xl">
                  No anomalies detected currently.
                </div>
              ) : (
                leads.map((lead, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border ${lead.theme === "warning" ? "border-warning/20 bg-warning-subtle" : "border-border-default bg-surface-canvas"} relative overflow-hidden group`}
                  >
                    <div
                      className={`absolute top-0 left-0 w-1 h-full ${lead.theme === "warning" ? "bg-warning" : "bg-accent"}`}
                    />
                    <h3 className="text-sm font-semibold text-text-primary mb-2">
                      {lead.title}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed mb-3">
                      {lead.description}
                    </p>
                    <div
                      className={`flex items-center justify-between mt-2 pt-2 border-t ${lead.theme === "warning" ? "border-warning/10" : "border-border-subtle"}`}
                    >
                      <span className="text-xxs font-mono text-text-muted">
                        CONFIDENCE {lead.confidence}%
                      </span>
                      <button
                        onClick={() =>
                          addToast("Loading detailed report...", "info")
                        }
                        className={`text-xs font-medium hover:underline ${lead.theme === "warning" ? "text-warning" : "text-accent"}`}
                      >
                        Investigate →
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-surface-muted border border-border-default rounded-2xl p-6 text-center">
            <Database size={32} className="mx-auto text-text-muted mb-4" />
            <h3 className="text-sm font-semibold text-text-primary mb-2">
              Need Custom Data?
            </h3>
            <p className="text-xs text-text-secondary mb-4">
              Press members can request custom historical data dumps for
              investigative pieces.
            </p>
            <button
              onClick={() => addToast("Opening Data Request Form...", "info")}
              className="w-full py-2 bg-surface-card border border-border-default hover:border-accent text-text-primary text-sm font-medium rounded-xl transition-all"
            >
              Request Data Access
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
