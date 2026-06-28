import { AlertTriangle, MapPin, X, CheckCircle2, Clock, ShieldAlert } from "lucide-react";

export default function ReportDetail({ 
  onClose 
}: { 
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 pointer-events-none">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" onClick={onClose} />
      
      <div className="bg-surface-canvas border border-border-default rounded-3xl w-full max-w-2xl max-h-full overflow-y-auto pointer-events-auto shadow-2xl animate-fade-in relative">
        <header className="sticky top-0 z-10 bg-surface-canvas/90 backdrop-blur-md border-b border-border-default p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-text-muted">#r_1042</span>
            <span className="px-2 py-1 bg-warning/10 text-warning text-xs font-bold rounded uppercase tracking-wider">Pending</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-surface-muted hover:bg-border-default rounded-full text-text-secondary transition-colors"
          >
            <X size={20} />
          </button>
        </header>

        <div className="p-6 space-y-8">
          <div className="w-full h-64 bg-surface-muted rounded-2xl overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800" 
              alt="Issue" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-surface-card/90 backdrop-blur-sm border border-border-default p-3 rounded-xl flex items-center justify-between shadow-sm">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-text-primary">Pothole</span>
                <span className="text-xs text-text-muted flex items-center gap-1"><MapPin size={12} /> Koramangala 80ft Road</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-accent font-mono text-xs font-bold">CONFIDENCE 94%</span>
                <span className="text-xs text-text-muted">Severity 4 • 0.8m²</span>
              </div>
            </div>
          </div>

          <section className="space-y-4">
            <h3 className="text-xs font-bold text-text-subtle uppercase tracking-widest">Agent Timeline</h3>
            <div className="space-y-4 border-l-2 border-border-default ml-2 pl-4">
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-secondary ring-4 ring-surface-canvas" />
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold text-text-primary">Capture</span>
                  <span className="text-xs font-mono text-text-muted">✓ 0.3s</span>
                </div>
                <p className="text-xs text-text-secondary">Image uploaded successfully with geotags.</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-secondary ring-4 ring-surface-canvas" />
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold text-text-primary">Vision</span>
                  <span className="text-xs font-mono text-text-muted">✓ 2.1s</span>
                </div>
                <p className="text-xs text-text-secondary">Identified Pothole. Measured area roughly 0.8m².</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-secondary ring-4 ring-surface-canvas" />
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold text-text-primary">Severity</span>
                  <span className="text-xs font-mono text-text-muted">✓ 1.4s</span>
                </div>
                <p className="text-xs text-text-secondary">Assessed high impact due to location on arterial road.</p>
              </div>
              
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-surface-canvas animate-pulse" />
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold text-accent">Routing</span>
                  <span className="text-xs font-mono text-text-muted animate-pulse">Processing...</span>
                </div>
                <p className="text-xs text-text-secondary">Determining appropriate agency for dispatch.</p>
              </div>
            </div>
          </section>

          <section className="bg-warning/5 border border-warning/20 rounded-2xl p-5">
            <h3 className="text-xs font-bold text-warning uppercase tracking-widest flex items-center gap-2 mb-3">
              <ShieldAlert size={14} /> AI Context
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              This issue requires immediate attention due to its presence on a high-traffic road (Severity Level 4). Previous reports in this area took 14 days to resolve. Routing to BBMP Road Works Department.
            </p>
          </section>
        </div>
        
        <div className="sticky bottom-0 bg-surface-canvas border-t border-border-default p-4 flex gap-3">
          <button className="flex-1 bg-surface-muted hover:bg-border-default text-text-primary py-3 rounded-xl font-semibold transition-colors">
            Share
          </button>
          <button className="flex-1 bg-accent hover:bg-accent-hover text-white py-3 rounded-xl font-semibold transition-colors">
            Upvote
          </button>
        </div>
      </div>
    </div>
  );
}
