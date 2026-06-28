import { Camera, MapPin, Navigation, Crosshair } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/HoverCard";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

function MapUpdater() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

export default function Home({
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
  return (
    <div className="relative w-full h-full bg-surface-canvas overflow-hidden">
      {/* Real Map Background */}
      <div className="absolute inset-0 z-0 bg-surface-canvas">
        <MapContainer
          center={[12.9716, 77.5946]}
          zoom={13}
          className="absolute inset-0 h-full w-full z-0"
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
        >
          <MapUpdater />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
        
        
        {/* Mock Map Markers */}
        <div className="absolute top-1/3 left-1/4 z-10">
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="relative cursor-pointer">
                <div className="w-12 h-12 bg-accent/20 rounded-full animate-pulse flex items-center justify-center">
                  <div className="w-4 h-4 bg-accent rounded-full border-2 border-surface-card shadow-md"></div>
                </div>
              </div>
            </HoverCardTrigger>
            <HoverCardContent side="top" className="w-auto p-2">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold">Pothole</span>
                <span className="text-xs text-text-muted">Koramangala, Ward 142</span>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>

        <div className="absolute top-1/2 right-1/3 z-10">
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="relative cursor-pointer">
                <div className="w-8 h-8 bg-warning/20 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-warning rounded-full border-2 border-surface-card shadow-md"></div>
                </div>
              </div>
            </HoverCardTrigger>
            <HoverCardContent side="top" className="w-auto p-2">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold">Streetlight Broken</span>
                <span className="text-xs text-text-muted">Indiranagar</span>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10 flex flex-col gap-2">
          <div className="bg-surface-card/80 backdrop-blur-md border border-border-default rounded-xl shadow-sm overflow-hidden flex flex-col">
            <button className="p-2 md:p-3 text-text-primary hover:bg-surface-muted transition-colors border-b border-border-default">
              <span className="text-xl font-medium leading-none">+</span>
            </button>
            <button className="p-2 md:p-3 text-text-primary hover:bg-surface-muted transition-colors border-b border-border-default">
              <span className="text-xl font-medium leading-none">−</span>
            </button>
            <button className="p-2 md:p-3 text-text-primary hover:bg-surface-muted transition-colors">
              <Crosshair size={18} />
            </button>
          </div>
          <button className="bg-surface-card/80 backdrop-blur-md border border-border-default p-2 md:p-3 rounded-xl shadow-sm text-text-primary hover:bg-surface-muted transition-colors">
            <MapPin size={18} />
          </button>
        </div>

        {/* Main Action (FAB) */}
        <div className="absolute bottom-[280px] md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
          <div className="bg-surface-card/90 backdrop-blur-sm border border-border-default px-4 py-2 rounded-full mb-4 shadow-sm text-xs font-semibold text-text-primary flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Koramangala, Ward 142
          </div>
          <button
            onClick={() => setView("capture")}
            className="bg-accent hover:bg-accent-hover text-text-on-accent rounded-full p-6 shadow-xl shadow-accent/20 transition-transform active:scale-95 group flex flex-col items-center gap-2 border-4 border-surface-card"
          >
            <Camera className="w-8 h-8" />
          </button>
          <span className="mt-4 font-bold text-text-primary bg-surface-card/80 px-4 py-1 rounded-full backdrop-blur-sm border border-border-default shadow-sm uppercase tracking-wider text-sm">
            Report
          </span>
        </div>
      </div>

      {/* Recent Reports Glass Overlay */}
      <div className="absolute bottom-0 left-0 right-0 md:bottom-8 md:left-8 md:right-auto md:w-80 z-10 p-0 md:p-0">
        <div className="bg-surface-card/90 md:bg-surface-card/70 backdrop-blur-xl border-t md:border border-border-default rounded-t-3xl md:rounded-2xl shadow-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text-primary text-sm uppercase tracking-wider">
              Recent Reports
            </h3>
            <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-0.5 rounded-full">
              LIVE
            </span>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-surface-muted/50 cursor-pointer transition-colors border border-transparent hover:border-border-default">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
                <MapPin size={14} className="text-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">Pothole on 80ft Road</p>
                <p className="text-xs text-text-secondary mt-0.5">Ward 142 • 5 mins ago</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-surface-muted/50 cursor-pointer transition-colors border border-transparent hover:border-border-default">
              <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center shrink-0 border border-warning/20">
                <MapPin size={14} className="text-warning" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">Broken Streetlight</p>
                <p className="text-xs text-text-secondary mt-0.5">Ward 87 • 22 mins ago</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-surface-muted/50 cursor-pointer transition-colors border border-transparent hover:border-border-default">
              <div className="w-8 h-8 rounded-full bg-danger/10 flex items-center justify-center shrink-0 border border-danger/20">
                <MapPin size={14} className="text-danger" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">Garbage Dump</p>
                <p className="text-xs text-text-secondary mt-0.5">Ward 112 • 1 hour ago</p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setView("dashboard")}
            className="w-full text-center mt-4 text-xs font-semibold text-text-muted hover:text-accent transition-colors uppercase tracking-widest"
          >
            View All Reports
          </button>
        </div>
      </div>
    </div>
  );
}
