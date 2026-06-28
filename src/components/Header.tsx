import {
  Camera,
  Map,
  HomeIcon,
  Flame,
  Shield,
  Trophy,
  Moon,
  Sun,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Header({
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
      | "karma",
  ) => void;
}) {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const isLight =
      document.documentElement.classList.contains("light-mode") ||
      localStorage.getItem("theme") === "light";
    if (isLight) {
      setIsLightMode(true);
      document.documentElement.classList.add("light-mode");
    }
  }, []);

  const toggleTheme = () => {
    setIsLightMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("light-mode");
        localStorage.setItem("theme", "light");
      } else {
        document.documentElement.classList.remove("light-mode");
        localStorage.setItem("theme", "dark");
      }
      return next;
    });
  };

  return (
    <header className="bg-surface-canvas border-b border-border-default sticky top-0 z-10 flex-shrink-0">
      <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => setView("home")}
        >
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
            <span className="font-black text-xl text-text-on-accent">N</span>
          </div>
          <span className="font-bold text-xl tracking-tight uppercase hidden sm:block">
            NagrikAI
          </span>
          <span className="px-2 py-1 bg-surface-muted text-xxs rounded text-text-muted font-mono tracking-widest hidden sm:block">
            VIBE2SHIP 2026
          </span>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-surface-card transition-colors text-text-muted border border-transparent hover:border-border-default"
            title="Toggle high-contrast light mode"
          >
            {isLightMode ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <div className="hidden md:flex flex-col items-end mr-4">
            <span className="text-xxs text-text-subtle uppercase tracking-widest">
              System Status
            </span>
            <span className="text-xs font-mono text-success">● ACTIVE</span>
          </div>
          <div className="h-8 w-[1px] bg-border-default hidden md:block"></div>
          <nav className="flex items-center gap-2 text-text-muted overflow-x-auto no-scrollbar">
            <button
              onClick={() => setView("playbook")}
              className="border border-border-default hover:border-border-strong hover:bg-surface-card px-6 py-2 rounded-full text-xs uppercase tracking-widest transition-colors hidden lg:block text-text-secondary whitespace-nowrap"
            >
              Playbook
            </button>
            <button
              onClick={() => setView("karma")}
              className="border border-border-default hover:border-border-default hover:bg-surface-card px-4 py-2 rounded-full text-xs uppercase tracking-widest transition-colors flex items-center gap-2 text-warning whitespace-nowrap"
            >
              <Trophy size={14} />{" "}
              <span className="hidden sm:inline">Karma</span>
            </button>
            <button
              onClick={() => setView("agency")}
              className="border border-border-default hover:border-border-default hover:bg-surface-card px-4 py-2 rounded-full text-xs uppercase tracking-widest transition-colors flex items-center gap-2 text-accent whitespace-nowrap"
            >
              <Shield size={14} />{" "}
              <span className="hidden sm:inline">Agency</span>
            </button>
            <button
              onClick={() => setView("hotspots")}
              className="border border-border-default hover:border-border-default hover:bg-surface-card px-4 py-2 rounded-full text-xs uppercase tracking-widest transition-colors flex items-center gap-2 text-highlight whitespace-nowrap"
            >
              <Flame size={14} />{" "}
              <span className="hidden sm:inline">Hotspots</span>
            </button>
            <button
              onClick={() => setView("dashboard")}
              className="border border-border-default hover:border-border-default hover:bg-surface-card px-4 py-2 rounded-full text-xs uppercase tracking-widest transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Map size={14} />{" "}
              <span className="hidden sm:inline">Reports</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
