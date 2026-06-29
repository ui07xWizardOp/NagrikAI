import { ArrowRight, BarChart3, ShieldCheck, Zap } from "lucide-react";

export default function Landing({
  setView,
}: {
  setView: (v: "login") => void;
}) {
  return (
    <div className="min-h-screen bg-surface-canvas text-text-primary animate-fade-in w-full overflow-y-auto">
      {/* Navbar */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-border-default bg-surface-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-accent flex items-center justify-center text-white font-bold">
            N
          </div>
          <span className="font-black text-xl tracking-tight uppercase">
            NagrikAI
          </span>
        </div>
        <button
          onClick={() => setView("login")}
          className="px-5 py-2 bg-text-primary text-surface-canvas font-semibold rounded-full hover:opacity-90 transition-opacity text-sm"
        >
          Login
        </button>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-6 max-w-5xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-bold uppercase tracking-widest border border-accent/20">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Live in Bengaluru
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
          The Operating System <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-highlight">
            For Better Cities.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          NagrikAI transforms standard civic complaints into autonomous,
          AI-driven action plans. Report an issue in 10 seconds, get it resolved
          40% faster.
        </p>

        <div className="pt-4">
          <button
            onClick={() => setView("login")}
            className="bg-accent hover:bg-accent-hover text-text-on-accent px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 mx-auto transition-transform active:scale-95 shadow-lg shadow-accent/20"
          >
            Start Reporting <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-surface-muted border-y border-border-default px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              How it works
            </h2>
            <p className="text-text-secondary">
              Three simple steps powered by 9 collaborative AI agents.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-surface-card p-8 rounded-3xl border border-border-default shadow-sm relative overflow-hidden group">
              <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Multi-modal Capture</h3>
              <p className="text-text-secondary leading-relaxed">
                Take a photo or record a voice note. Our Vision Agent instantly
                analyzes severity, location, and issue type without manual
                forms.
              </p>
            </div>

            <div className="bg-surface-card p-8 rounded-3xl border border-border-default shadow-sm relative overflow-hidden group">
              <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Auto-Verification</h3>
              <p className="text-text-secondary leading-relaxed">
                The Community Agent checks for duplicates, verifies against
                existing data, and calculates a dynamic priority score
                automatically.
              </p>
            </div>

            <div className="bg-surface-card p-8 rounded-3xl border border-border-default shadow-sm relative overflow-hidden group">
              <div className="w-12 h-12 bg-highlight/10 rounded-2xl flex items-center justify-center text-highlight mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">3. SLA Tracking</h3>
              <p className="text-text-secondary leading-relaxed">
                Issues are instantly routed to the right agency with generated
                playbooks. Public SLAs ensure transparency and accountability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Comparison */}
      <section className="py-24 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-16">
          The NagrikAI Advantage
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="p-8 rounded-3xl border border-border-default bg-surface-card opacity-80">
            <h4 className="text-text-muted font-bold tracking-widest uppercase text-sm mb-6">
              Standard App
            </h4>
            <div className="space-y-6">
              <div>
                <div className="text-3xl font-black text-text-primary mb-1">
                  3-5 mins
                </div>
                <div className="text-sm text-text-secondary">
                  Time to file a report
                </div>
              </div>
              <div className="w-full h-px bg-border-default" />
              <div>
                <div className="text-3xl font-black text-text-primary mb-1">
                  Low
                </div>
                <div className="text-sm text-text-secondary">
                  Routing Accuracy
                </div>
              </div>
              <div className="w-full h-px bg-border-default" />
              <div>
                <div className="text-3xl font-black text-text-primary mb-1">
                  12 days
                </div>
                <div className="text-sm text-text-secondary">
                  Avg. Resolution Time
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl border-2 border-accent bg-accent/5 relative overflow-hidden shadow-xl shadow-accent/5">
            <div className="absolute top-0 right-0 px-3 py-1 bg-accent text-white text-xs font-bold rounded-bl-xl">
              NAGRIK.AI
            </div>
            <h4 className="text-accent font-bold tracking-widest uppercase text-sm mb-6">
              NagrikAI
            </h4>
            <div className="space-y-6">
              <div>
                <div className="text-4xl font-black text-text-primary mb-1">
                  &lt; 15 sec
                </div>
                <div className="text-sm font-medium text-text-secondary">
                  Time to file a report
                </div>
              </div>
              <div className="w-full h-px bg-accent/20" />
              <div>
                <div className="text-4xl font-black text-text-primary mb-1">
                  99.4%
                </div>
                <div className="text-sm font-medium text-text-secondary">
                  Agentic Routing Accuracy
                </div>
              </div>
              <div className="w-full h-px bg-accent/20" />
              <div>
                <div className="text-4xl font-black text-text-primary mb-1">
                  2.4 days
                </div>
                <div className="text-sm font-medium text-text-secondary">
                  Avg. Resolution Time
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border-default text-center text-sm text-text-muted">
        <p>
          Built for Vibe2Ship Hackathon 2026. Design Operating System
          implemented.
        </p>
      </footer>
    </div>
  );
}
