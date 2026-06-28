import { useState } from "react";
import { Check, MapPin, X, AlertTriangle } from "lucide-react";
import { Button } from "./ui/Button";
import { ConfidenceBadge } from "./ui/AIComponents";

export default function CommunityVerification() {
  const [reports, setReports] = useState([
    {
      id: "R-1082",
      type: "Garbage Dump",
      location: "Indiranagar 100ft Road",
      description: "Large pile of uncollected garbage blocking the footpath.",
      confidence: 0.62,
      distance: "0.4 km away",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400",
      status: "pending"
    },
    {
      id: "R-1085",
      type: "Broken Streetlight",
      location: "HAL 2nd Stage",
      description: "Streetlight flickering and turning off repeatedly.",
      confidence: 0.45,
      distance: "1.2 km away",
      image: "https://images.unsplash.com/photo-1519782522787-8e67aeb61c47?auto=format&fit=crop&q=80&w=400",
      status: "pending"
    },
    {
      id: "R-1088",
      type: "Water Leak",
      location: "Domlur Layout",
      description: "Continuous water flow from a broken pipe near the junction.",
      confidence: 0.58,
      distance: "2.1 km away",
      image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&q=80&w=400",
      status: "pending"
    }
  ]);

  const handleVerify = (id: string, action: "confirm" | "dispute") => {
    setReports(reports.map(r => r.id === id ? { ...r, status: action } : r));
  };

  const pendingReports = reports.filter(r => r.status === "pending");

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2 tracking-tight">Community Verification</h1>
          <p className="text-text-secondary">Help the AI verify reports with low confidence in your area.</p>
        </div>
        <div className="px-4 py-2 bg-surface-card border border-border-default rounded-xl shadow-sm inline-flex items-center gap-2 self-start md:self-auto">
          <span className="text-xl font-black text-text-primary">{pendingReports.length}</span>
          <span className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Nearby</span>
        </div>
      </header>

      {pendingReports.length === 0 ? (
        <div className="text-center py-24 bg-surface-card border border-border-default rounded-3xl shadow-sm">
          <div className="w-16 h-16 bg-success-subtle text-success-text rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-2">You're all caught up!</h3>
          <p className="text-text-secondary">No unverified reports near you at the moment.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pendingReports.map(report => (
            <div key={report.id} className="bg-surface-card border border-border-default rounded-2xl overflow-hidden shadow-sm flex flex-col group transition-shadow hover:shadow-2">
              <div className="h-48 relative overflow-hidden">
                <img src={report.image} alt={report.type} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <ConfidenceBadge value={report.confidence} />
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-text-primary leading-tight">{report.type}</h3>
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
