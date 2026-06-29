export default function Playbook() {
  return (
    <div className="space-y-12 py-8 max-w-3xl mx-auto pb-24">
      <div className="space-y-4 border-b border-border-default pb-8">
        <p className="text-accent font-mono text-xs uppercase tracking-widest">
          The North Star Product Intelligence Bible
        </p>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-text-primary">
          Feature Specification
        </h1>
        <p className="text-text-muted text-lg leading-relaxed">
          Move beyond a complaint management system and build an Autonomous
          Civic Intelligence Platform that doesn't simply record issues—it
          understands, predicts, routes, verifies, explains, and follows up
          using specialized AI agents.
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold uppercase tracking-tight text-text-primary">
            Core Product Principles
          </h2>
          <ul className="space-y-3 font-mono text-sm text-text-muted">
            <li className="flex gap-3">
              <span className="text-accent">01.</span> AI should perform work,
              not just answer questions.
            </li>
            <li className="flex gap-3">
              <span className="text-accent">02.</span> Every AI decision must be
              explainable.
            </li>
            <li className="flex gap-3">
              <span className="text-accent">03.</span> Every AI action must
              expose confidence and reasoning.
            </li>
            <li className="flex gap-3">
              <span className="text-accent">04.</span> Human approval is
              required before irreversible actions.
            </li>
            <li className="flex gap-3">
              <span className="text-accent">05.</span> Every workflow should
              involve multiple collaborating agents.
            </li>
            <li className="flex gap-3">
              <span className="text-accent">06.</span> The platform should
              evolve from reactive to proactive civic intelligence.
            </li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold uppercase tracking-tight text-text-primary">
            North Star Features
          </h2>

          <div className="grid gap-6">
            <div className="bg-surface-card border border-border-subtle p-6 rounded-lg space-y-3">
              <h3 className="text-lg font-bold text-accent">
                Autonomous Issue Understanding
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Upload a photo. AI determines Issue type, Severity, Urgency,
                Safety risk, Repair complexity, Estimated repair cost, Suggested
                authority, Confidence, and Reasoning.
              </p>
            </div>

            <div className="bg-surface-card border border-border-subtle p-6 rounded-lg space-y-3">
              <h3 className="text-lg font-bold text-accent">
                Multi-Agent Investigation
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Instead of one AI: Vision Agent → Classification Agent →
                Duplicate Detection → Severity → Policy → Routing → Critic →
                Citizen Dashboard.
              </p>
            </div>

            <div className="bg-surface-card border border-border-subtle p-6 rounded-lg space-y-3">
              <h3 className="text-lg font-bold text-accent">
                Predictive Intelligence
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                "What happens if ignored?" Estimate Traffic disruption, Accident
                probability, Repair cost escalation, Flood likelihood, and
                Citizen impact.
              </p>
            </div>

            <div className="bg-surface-card border border-border-subtle p-6 rounded-lg space-y-3">
              <h3 className="text-lg font-bold text-accent">
                Explainable Decisions
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Every decision answers: Why? Why this department? Why urgent?
                Why duplicate? Why rejected? Displayed explicitly to the user.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold uppercase tracking-tight text-text-primary">
            AI Agent Playbook
          </h2>
          <div className="bg-accent/10 border border-accent/20 p-6 rounded-lg space-y-4">
            <h3 className="text-xl font-bold text-accent flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div> Vision
              Agent
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-mono text-xxs text-text-subtle uppercase tracking-widest mb-2">
                  Responsibilities
                </h4>
                <ul className="text-text-secondary space-y-1">
                  <li>Image enhancement</li>
                  <li>Object detection</li>
                  <li>Classification</li>
                </ul>
              </div>
              <div>
                <h4 className="font-mono text-xxs text-text-subtle uppercase tracking-widest mb-2">
                  Outputs
                </h4>
                <ul className="text-text-secondary space-y-1">
                  <li>Objects & Confidence</li>
                  <li>Bounding boxes</li>
                  <li>Risk assessment</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
