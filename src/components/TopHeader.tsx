import { Search, Bell, Plus, ShieldCheck, ChevronDown } from "lucide-react";
import PillNav from "./ui/PillNav";
import { ThemeToggle } from "./ui/ThemeToggle";

export default function TopHeader({
  setView,
}: {
  setView: (v: string) => void;
}) {
  const items = [
    {
      label: "Verify",
      onClick: () => setView("verify"),
      icon: <ShieldCheck size={16} />,
    },
    {
      label: "Report",
      onClick: () => setView("capture"),
      icon: <Plus size={16} />,
    },
  ];

  return (
    <header className="h-16 border-b border-border-default bg-surface-card flex items-center justify-between flex-shrink-0 relative z-40 w-full pl-6 md:pl-8 pr-[100px] md:pr-[120px]">
      {/* Left side */}
      <div className="flex items-center gap-6 w-auto flex-shrink-0">
        <div
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => setView("dashboard")}
        >
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
            <span className="text-text-on-accent font-black text-lg leading-none">
              N
            </span>
          </div>
          <span className="font-black text-xl tracking-tight hidden xl:block text-text-primary leading-none">
            NagrikAI
          </span>
        </div>

        <div className="hidden lg:block">
          <PillNav
            logo=""
            items={items}
            baseColor="transparent"
            pillColor="var(--accent)"
            hoveredPillTextColor="var(--text-on-accent)"
            pillTextColor="var(--text-primary)"
            className="shrink-0"
          />
        </div>
      </div>

      {/* Center - Search */}
      <div className="flex-1 w-full max-w-xl hidden md:flex justify-center px-6">
        <div className="relative group w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent w-4 h-4" />
          <input
            type="text"
            placeholder="Search issues, locations..."
            className="w-full bg-surface-canvas border border-border-default rounded-full pl-10 pr-4 py-2 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center justify-end gap-3 md:gap-6 flex-shrink-0">
        <ThemeToggle />
        <button
          onClick={() => setView("alerts")}
          className="relative text-text-muted hover:text-text-primary transition-all active:scale-95 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-card rounded-md"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-danger rounded-full border-2 border-surface-card" />
        </button>

        <div
          onClick={() => setView("profile")}
          className="flex items-center gap-2 cursor-pointer hover:bg-surface-muted p-1.5 rounded-lg transition-all active:scale-95 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          tabIndex={0}
        >
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan"
            alt="Profile"
            className="w-8 h-8 rounded-full bg-surface-canvas border border-border-default"
          />
          <div className="hidden xl:flex flex-col text-left">
            <span className="text-sm font-semibold text-text-primary leading-tight">
              Rohan Kumar
            </span>
            <span className="text-xxs text-text-muted leading-tight">
              Citizen
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-text-muted hidden xl:block" />
        </div>
      </div>
    </header>
  );
}
