import React, { useEffect, useState } from "react";
import { Trophy, ShieldCheck, Flame, Star } from "lucide-react";
import { Report } from "../types";

export default function Karma() {
  const [reports, setReports] = useState<Report[]>([]);
  const [myKarma, setMyKarma] = useState(450);
  const [myTrust, setMyTrust] = useState(75);
  const [myBadges, setMyBadges] = useState<string[]>(["First Report"]);
  const [resolvedCount, setResolvedCount] = useState(0);

  useEffect(() => {
    fetch("/api/reports")
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const text = await r.text();
        try {
          return JSON.parse(text);
        } catch (e) {
          console.error(
            "Failed to parse JSON in Karma:",
            text.substring(0, 50),
          );
          return { reports: [] };
        }
      })
      .then((data) => {
        if (!data || !data.reports) return;
        setReports(data.reports);

        let karma = 450;
        let trust = 75;
        let resolved = 0;
        const badges = new Set(["First Report"]);

        try {
          const myReports: string[] = JSON.parse(
            localStorage.getItem("my_reports") || "[]",
          );
          const myComments: string[] = JSON.parse(
            localStorage.getItem("my_comments") || "[]",
          );

          data.reports.forEach((r: Report) => {
            if (r.status.includes("Resolved")) {
              if (myReports.includes(r.id)) {
                karma += 100;
                trust = Math.min(100, trust + 2);
                resolved += 1;
              } else if (myComments.includes(r.id)) {
                karma += 50;
                trust = Math.min(100, trust + 1);
                resolved += 1;
              }
            }
          });

          if (resolved >= 1) badges.add("Problem Solver");
          if (resolved >= 5) badges.add("Civic Hero");
          if (resolved >= 10) badges.add("City Champion");
          if (karma >= 1000) badges.add("Top Contributor");
          if (myReports.length >= 3) badges.add("Active Citizen");
        } catch (e) {
          console.error(e);
        }

        setMyKarma(karma);
        setMyTrust(trust);
        setMyBadges(Array.from(badges));
        setResolvedCount(resolved);
      })
      .catch((err) => console.error("Karma fetch error:", err));
  }, []);

  const users = [
    {
      id: 1,
      name: "Priya S.",
      ward: "Indiranagar Ward 80",
      karma: 1240,
      trust: 98,
      badges: ["Community Verifier", "Pothole Hunter"],
    },
    {
      id: 2,
      name: "Rahul M.",
      ward: "Koramangala Ward 114",
      karma: 980,
      trust: 92,
      badges: ["Pothole Hunter"],
    },
    {
      id: 3,
      name: "Ananya K.",
      ward: "HSR Layout Ward 174",
      karma: 850,
      trust: 89,
      badges: ["Water Saver"],
    },
  ];

  // Insert "You" based on karma
  const allUsers = [
    ...users,
    {
      id: 4,
      name: "You",
      ward: "Indiranagar Ward 80",
      karma: myKarma,
      trust: myTrust,
      badges: myBadges,
    },
  ].sort((a, b) => b.karma - a.karma);

  return (
    <div className="space-y-12 py-8 max-w-3xl mx-auto">
      <div>
        <p className="text-warning font-mono text-xxs uppercase tracking-widest mb-2">
          Gamification Engine
        </p>
        <h2 className="text-4xl font-black uppercase tracking-tighter text-text-primary">
          Civic Karma
        </h2>
        <p className="text-text-muted text-sm mt-4 leading-relaxed max-w-xl">
          Every action builds your trust score. Resolved issues earn you Karma
          and exclusive badges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-warning-subtle to-transparent border border-warning/20 p-6 rounded-lg relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-10 text-warning transition-transform duration-500 group-hover:scale-110">
            <Trophy size={120} />
          </div>
          <h3 className="text-xs font-mono tracking-widest uppercase text-warning mb-2 relative z-10">
            Your Karma
          </h3>
          <div className="text-5xl font-black text-text-primary mb-2 relative z-10">
            {myKarma}
          </div>
          <div className="text-xs text-text-muted font-mono relative z-10">
            {resolvedCount} issues resolved
          </div>
        </div>

        <div className="bg-gradient-to-br from-accent-subtle to-transparent border border-accent/20 p-6 rounded-lg relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-10 text-accent transition-transform duration-500 group-hover:scale-110">
            <ShieldCheck size={120} />
          </div>
          <h3 className="text-xs font-mono tracking-widest uppercase text-accent mb-2 relative z-10">
            Trust Score
          </h3>
          <div className="text-5xl font-black text-text-primary mb-2 relative z-10">
            {myTrust}
            <span className="text-2xl text-text-subtle">/100</span>
          </div>
          <div className="text-xs text-text-muted font-mono relative z-10">
            {100 - myTrust} pts until Auto-Routing
          </div>
        </div>

        <div className="bg-gradient-to-br from-highlight-subtle to-transparent border border-highlight/20 p-6 rounded-lg relative overflow-hidden md:col-span-2 lg:col-span-1 group">
          <div className="absolute -right-4 -bottom-4 opacity-10 text-highlight transition-transform duration-500 group-hover:scale-110">
            <Star size={120} />
          </div>
          <h3 className="text-xs font-mono tracking-widest uppercase text-highlight mb-2 relative z-10">
            Your Badges
          </h3>
          <div className="flex flex-wrap gap-2 mt-4 relative z-10">
            {myBadges.map((b) => (
              <span
                key={b}
                className="px-2 py-1 bg-highlight/10 text-highlight-text text-xs font-bold uppercase tracking-widest rounded border border-highlight/20 shadow-sm"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-bold uppercase tracking-tight text-text-primary">
          Ward Leaderboard
        </h3>
        <div className="bg-surface-card border border-border-default rounded-lg overflow-hidden">
          {allUsers.map((user, i) => (
            <div
              key={user.id}
              className={`p-4 flex items-center justify-between border-b border-border-subtle last:border-0 ${user.name === "You" ? "bg-surface-muted border-l-4 border-l-warning" : ""}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-8 text-center font-mono text-text-subtle text-sm">
                  #{i + 1}
                </div>
                <div>
                  <div className="font-bold text-text-primary flex items-center gap-2">
                    {user.name}
                    {user.trust > 90 && (
                      <ShieldCheck size={14} className="text-accent" />
                    )}
                  </div>
                  <div className="text-xs text-text-subtle font-mono">
                    {user.ward}
                  </div>
                  <div className="flex gap-2 mt-2">
                    {user.badges.map((b) => (
                      <span
                        key={b}
                        className="px-2 py-0.5 bg-surface-muted text-text-secondary text-xxs uppercase tracking-widest rounded border border-border-subtle"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-black text-warning">{user.karma}</div>
                <div className="text-xxs font-mono text-text-subtle uppercase tracking-widest">
                  Points
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
