import { useState } from "react";
import {
  Moon,
  Sun,
  Bell,
  Globe,
  Shield,
  LogOut,
  Smartphone,
  Check,
  AlertCircle,
  X,
} from "lucide-react";

import { logout } from "../lib/firebaseAuth";

export default function Settings({
  setView,
}: {
  setView: (v: string) => void;
}) {
  const [theme, setThemeState] = useState<"light" | "dark" | "system">(() => {
    const saved = localStorage.getItem("theme");
    return (saved as "light" | "dark") || "system";
  });
  const [toasts, setToasts] = useState<
    { id: number; message: string; type: "success" | "info" }[]
  >([]);

  const addToast = (message: string, type: "success" | "info" = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const setTheme = (newTheme: "light" | "dark" | "system") => {
    setThemeState(newTheme);
    if (newTheme === "system") {
      localStorage.removeItem("theme");
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    } else {
      localStorage.setItem("theme", newTheme);
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    }
    // Dispatch event to sync ThemeToggle
    window.dispatchEvent(new Event("storage"));
  };
  const [language, setLanguage] = useState("en");
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12 relative">
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

      <header>
        <h1 className="text-3xl font-bold text-text-primary mb-2 tracking-tight">
          Settings
        </h1>
        <p className="text-text-secondary">
          Manage your preferences, appearance, and account.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          {/* Appearance Section */}
          <section className="bg-surface-card border border-border-default rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
              </div>
              <h2 className="text-lg font-semibold text-text-primary">
                Appearance
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setTheme("light")}
                className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${theme === "light" ? "border-accent bg-accent/5" : "border-border-default hover:border-border-hover"}`}
              >
                <div className="w-12 h-12 rounded-full bg-surface-canvas shadow-sm border border-border-default flex items-center justify-center">
                  <Sun size={20} className="text-text-secondary" />
                </div>
                <span className="text-sm font-medium text-text-primary">
                  Light
                </span>
              </button>

              <button
                onClick={() => setTheme("dark")}
                className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${theme === "dark" ? "border-accent bg-accent/5" : "border-border-default hover:border-border-hover"}`}
              >
                <div className="w-12 h-12 rounded-full bg-surface-inverse border border-border-strong flex items-center justify-center">
                  <Moon size={20} className="text-text-subtle" />
                </div>
                <span className="text-sm font-medium text-text-primary">
                  Dark
                </span>
              </button>

              <button
                onClick={() => setTheme("system")}
                className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${theme === "system" ? "border-accent bg-accent/5" : "border-border-default hover:border-border-hover"}`}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-surface-canvas to-surface-inverse border border-border-default flex items-center justify-center">
                  <Smartphone size={20} className="text-text-secondary" />
                </div>
                <span className="text-sm font-medium text-text-primary">
                  System
                </span>
              </button>
            </div>
          </section>

          {/* Language Section */}
          <section className="bg-surface-card border border-border-default rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                <Globe size={18} />
              </div>
              <h2 className="text-lg font-semibold text-text-primary">
                Language & Region
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-text-secondary">
                  Display Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-surface-muted border border-border-default rounded-xl px-4 py-3 text-text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                >
                  <option value="en">English (US)</option>
                  <option value="hi">Hindi (हिंदी)</option>
                  <option value="kn">Kannada (ಕನ್ನಡ)</option>
                  <option value="te">Telugu (తెలుగు)</option>
                </select>
              </div>
            </div>
          </section>

          {/* Notifications Section */}
          <section className="bg-surface-card border border-border-default rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-highlight/10 flex items-center justify-center text-highlight">
                <Bell size={18} />
              </div>
              <h2 className="text-lg font-semibold text-text-primary">
                Notifications
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border border-border-subtle bg-surface-muted/50">
                <div>
                  <h3 className="font-medium text-text-primary">
                    Push Notifications
                  </h3>
                  <p className="text-sm text-text-secondary mt-1">
                    Receive alerts on your device for updates.
                  </p>
                </div>
                <button
                  onClick={() => setPushEnabled(!pushEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${pushEnabled ? "bg-accent" : "bg-border-default"}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${pushEnabled ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-border-subtle bg-surface-muted/50">
                <div>
                  <h3 className="font-medium text-text-primary">
                    Email Updates
                  </h3>
                  <p className="text-sm text-text-secondary mt-1">
                    Weekly digest of community improvements.
                  </p>
                </div>
                <button
                  onClick={() => setEmailEnabled(!emailEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${emailEnabled ? "bg-accent" : "bg-border-default"}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${emailEnabled ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Settings (Account & Privacy) */}
        <div className="space-y-8">
          <section className="bg-surface-card border border-border-default rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-error/10 flex items-center justify-center text-error">
                <Shield size={18} />
              </div>
              <h2 className="text-lg font-semibold text-text-primary">
                Account Security
              </h2>
            </div>

            <div className="space-y-4">
              <button
                onClick={() =>
                  addToast(
                    "Change Password interface not yet available",
                    "info",
                  )
                }
                className="w-full text-left p-3 rounded-xl border border-border-subtle hover:bg-surface-muted transition-colors text-sm font-medium text-text-primary flex items-center justify-between group"
              >
                Change Password
                <span className="text-text-muted group-hover:text-accent transition-colors">
                  →
                </span>
              </button>
              <button
                onClick={() =>
                  addToast(
                    "Two-Factor Authentication interface not yet available",
                    "info",
                  )
                }
                className="w-full text-left p-3 rounded-xl border border-border-subtle hover:bg-surface-muted transition-colors text-sm font-medium text-text-primary flex items-center justify-between group"
              >
                Two-Factor Auth
                <span className="text-text-muted group-hover:text-accent transition-colors">
                  →
                </span>
              </button>
              <button
                onClick={() =>
                  addToast(
                    "Privacy Settings interface not yet available",
                    "info",
                  )
                }
                className="w-full text-left p-3 rounded-xl border border-border-subtle hover:bg-surface-muted transition-colors text-sm font-medium text-text-primary flex items-center justify-between group"
              >
                Privacy Settings
                <span className="text-text-muted group-hover:text-accent transition-colors">
                  →
                </span>
              </button>
            </div>

            <hr className="my-6 border-border-default" />

            <button
              onClick={async () => {
                try {
                  await logout();
                } catch (e) {
                  console.error("Failed to log out", e);
                }
                setView("login");
              }}
              className="w-full py-3 rounded-xl border border-error/20 bg-error/5 text-error font-semibold flex items-center justify-center gap-2 hover:bg-error/10 transition-colors"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </section>

          <div className="text-center">
            <p className="text-xs text-text-muted font-mono">
              NagrikAI Version 1.2.0 (Build 8492)
              <br />
              <a
                href="#"
                className="text-accent hover:underline mt-1 inline-block"
              >
                Terms of Service
              </a>{" "}
              &bull;{" "}
              <a
                href="#"
                className="text-accent hover:underline mt-1 inline-block"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
