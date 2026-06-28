import { useState } from "react";
import Sidebar from "./components/Sidebar";
import TopHeader from "./components/TopHeader";
import Home from "./components/Home";
import Capture from "./components/Capture";
import Dashboard from "./components/Dashboard";
import Playbook from "./components/Playbook";
import Hotspots from "./components/Hotspots";
import Karma from "./components/Karma";
import Agency from "./components/Agency";
import Settings from "./components/Settings";
import Analytics from "./components/Analytics";
import OpenData from "./components/OpenData";
import Alerts from "./components/Alerts";
import Login from "./components/Login";

import Landing from "./components/Landing";
import Profile from "./components/Profile";
import MyReports from "./components/MyReports";

import CommunityVerification from "./components/CommunityVerification";

export default function App() {
  const [view, setView] = useState<
    | "home"
    | "capture"
    | "dashboard"
    | "playbook"
    | "hotspots"
    | "agency"
    | "karma"
    | "analytics"
    | "alerts"
    | "opendata"
    | "settings"
    | "login"
    | "landing"
    | "profile"
    | "myreports"
    | "verify"
  >("landing");

  return (
    <div className="h-screen w-screen bg-surface-canvas text-text-primary font-sans flex overflow-hidden">
      {view !== "login" && view !== "landing" && <Sidebar view={view} setView={setView} />}
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {view !== "login" && view !== "landing" && <TopHeader setView={setView} />}
        
        <main className={`flex-1 overflow-y-auto w-full ${view === "home" ? "p-0" : "p-4 md:p-6 lg:p-8"} ${view === "login" || view === "landing" ? "p-0 md:p-0 lg:p-0 flex flex-col items-center justify-center bg-surface-canvas" : ""}`}>
          {view === "landing" && <Landing setView={setView} />}
          {view === "login" && <Login setView={setView} />}
          {view === "home" && <Home setView={setView} />}
          {view === "capture" && <Capture setView={setView} />}
          {view === "dashboard" && <Dashboard setView={setView} />}
          {view === "myreports" && <MyReports />}
          {view === "playbook" && <Playbook />}
          {view === "verify" && <CommunityVerification />}
          {view === "hotspots" && <Hotspots />}
          {view === "karma" && <Karma />}
          {view === "agency" && <Agency />}
          {view === "profile" && <Profile setView={setView} />}
          {view === "settings" && <Settings setView={setView} />}
          {view === "analytics" && <Analytics />}
          {view === "opendata" && <OpenData />}
          {view === "alerts" && <Alerts />}
        </main>
      </div>
    </div>
  );
}
