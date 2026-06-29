import {
  Award,
  CheckCircle,
  Flag,
  Settings,
  Shield,
  Star,
  Trophy,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Report } from "../types";

export default function Profile({
  setView,
}: {
  setView: (v: "settings") => void;
}) {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    trustScore: 75,
    karmaPoints: 450,
    reportsCount: 0,
    verificationsCount: 0,
  });

  useEffect(() => {
    fetch("/api/reports")
      .then((res) => res.json())
      .then((data) => {
        const allReports: Report[] = data.reports || [];
        const myReportIds = JSON.parse(
          localStorage.getItem("my_reports") || "[]",
        );

        let karma = 450;
        let trust = 75;
        let resolved = 0;

        allReports.forEach((r) => {
          if (r.status.includes("Resolved") && myReportIds.includes(r.id)) {
            karma += 100;
            trust = Math.min(100, trust + 2);
            resolved++;
          }
        });

        setStats({
          trustScore: trust,
          karmaPoints: karma,
          reportsCount: myReportIds.length,
          verificationsCount: resolved, // Simulating verifications
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2 tracking-tight">
            Citizen Profile
          </h1>
          <p className="text-text-secondary">
            Your impact, trust score, and civic achievements.
          </p>
        </div>
        <button
          onClick={() => setView("settings")}
          className="p-2 text-text-muted hover:text-text-primary hover:bg-surface-muted rounded-xl transition-colors"
        >
          <Settings size={24} />
        </button>
      </header>

      {/* Main Profile Card */}
      <div className="bg-surface-card border border-border-default rounded-3xl p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-accent/20 to-highlight/20" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 mt-12">
          {/* Avatar & Score */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-surface-card bg-surface-muted overflow-hidden shadow-lg">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-accent text-white w-10 h-10 rounded-full flex items-center justify-center border-4 border-surface-card shadow-md">
                <Shield size={18} />
              </div>
            </div>
            <div className="text-center mt-2">
              <div className="text-2xl font-black tracking-tight">
                Rohan Kumar
              </div>
              <div className="text-sm font-medium text-accent uppercase tracking-widest mt-1">
                Verified Citizen
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full pt-4">
            <div className="bg-surface-muted/50 rounded-2xl p-4 border border-border-subtle text-center">
              <div className="text-3xl font-black text-text-primary mb-1">
                {stats.trustScore}
              </div>
              <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Trust Score
              </div>
            </div>
            <div className="bg-surface-muted/50 rounded-2xl p-4 border border-border-subtle text-center">
              <div className="text-3xl font-black text-text-primary mb-1">
                {stats.karmaPoints}
              </div>
              <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Karma Points
              </div>
            </div>
            <div className="bg-surface-muted/50 rounded-2xl p-4 border border-border-subtle text-center">
              <div className="text-3xl font-black text-text-primary mb-1">
                {stats.reportsCount}
              </div>
              <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Reports
              </div>
            </div>
            <div className="bg-surface-muted/50 rounded-2xl p-4 border border-border-subtle text-center">
              <div className="text-3xl font-black text-text-primary mb-1">
                {stats.verificationsCount}
              </div>
              <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Verifications
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Trust Score Breakdown */}
        <section className="bg-surface-card border border-border-default rounded-3xl p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Shield className="text-accent" />
            Trust Analysis
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm font-medium mb-2">
                <span>Reporting Accuracy</span>
                <span className="text-accent">99%</span>
              </div>
              <div className="h-2 w-full bg-surface-muted rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full w-[99%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-medium mb-2">
                <span>Verification Quality</span>
                <span className="text-highlight">94%</span>
              </div>
              <div className="h-2 w-full bg-surface-muted rounded-full overflow-hidden">
                <div className="h-full bg-highlight rounded-full w-[94%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-medium mb-2">
                <span>Community Helpfuless</span>
                <span className="text-secondary">88%</span>
              </div>
              <div className="h-2 w-full bg-surface-muted rounded-full overflow-hidden">
                <div className="h-full bg-secondary rounded-full w-[88%]" />
              </div>
            </div>
          </div>
          <div className="mt-8 p-4 bg-accent/5 border border-accent/20 rounded-xl flex items-start gap-3">
            <CheckCircle className="text-accent shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-text-secondary leading-relaxed">
              Your high trust score allows your reports to bypass manual
              moderation and instantly queue for agency resolution.
            </p>
          </div>
        </section>

        {/* Badges & Achievements */}
        <section className="bg-surface-card border border-border-default rounded-3xl p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Trophy className="text-warning" />
            Badges
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center justify-center p-6 border border-border-default rounded-2xl bg-surface-canvas shadow-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-warning/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Award size={32} className="text-warning mb-3" />
              <div className="font-bold text-center">First Responder</div>
              <div className="text-xs text-text-muted text-center mt-1">
                100+ verified reports
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-6 border border-border-default rounded-2xl bg-surface-canvas shadow-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-highlight/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Star size={32} className="text-highlight mb-3" />
              <div className="font-bold text-center">Top 1% Validator</div>
              <div className="text-xs text-text-muted text-center mt-1">
                Perfect accuracy
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-6 border border-border-default rounded-2xl bg-surface-canvas shadow-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Flag size={32} className="text-secondary mb-3" />
              <div className="font-bold text-center">Neighborhood Watch</div>
              <div className="text-xs text-text-muted text-center mt-1">
                Active in Ward 142
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-6 border border-border-subtle border-dashed rounded-2xl bg-surface-muted text-text-muted">
              <Award size={32} className="opacity-50 mb-3" />
              <div className="font-semibold text-center">Locked</div>
              <div className="text-xxs text-center mt-1">
                200 reports needed
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
