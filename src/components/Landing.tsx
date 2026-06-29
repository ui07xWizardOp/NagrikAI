import { Camera, Play, MapPin, Eye, Mic, FileText, CheckCircle2, Building2, TrendingUp, ArrowRight, Shield, Lock, Heart, Users, BarChart3, MoreHorizontal, Zap, Sparkles, Fingerprint, ShieldCheck, Activity, Clock, Plus } from "lucide-react";
import PillNav from "./ui/PillNav";
import { ThemeToggle } from "./ui/ThemeToggle";

export default function Landing({
  setView,
}: {
  setView: (v: "login") => void;
}) {
  const navItems = [
    {
      label: "Verify",
      onClick: () => setView("login"),
      icon: <ShieldCheck size={16} />,
    },
    {
      label: "Report",
      onClick: () => setView("login"),
      icon: <Plus size={16} />,
    },
  ];

  return (
    <div className="min-h-screen bg-surface-canvas text-text-primary font-sans relative overflow-x-hidden selection:bg-accent/20 selection:text-indigo-900">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute top-[20%] right-[-5%] w-[40%] h-[40%] rounded-full bg-violet-300/10 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[20%] w-[60%] h-[60%] rounded-full bg-info/10 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="px-5 md:px-8 lg:px-12 py-6 flex items-center justify-between max-w-[1440px] mx-auto w-full z-50 relative">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center text-text-on-accent font-bold text-lg shadow-sm">
              N
            </div>
            <span className="font-bold text-xl tracking-tight text-text-primary">NagrikAI</span>
          </div>

          <div className="hidden lg:block">
            <PillNav
              logo=""
              items={navItems}
              baseColor="transparent"
              pillColor="var(--accent)"
              hoveredPillTextColor="var(--text-on-accent)"
              pillTextColor="var(--text-primary)"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setView("login")}
            className="px-6 py-2.5 bg-gradient-to-r from-accent to-accent-hover text-text-on-accent font-bold rounded-full hover:opacity-90 transition-all duration-200 text-sm shadow-sm hover:shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-canvas"
            aria-label="Launch NagrikAI application"
          >
            Launch App
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-12 md:pt-16 pb-20 md:pb-24 px-5 md:px-8 lg:px-12 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center relative z-10">
        <div className="space-y-6 md:space-y-8 pl-0 lg:pl-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10/80 backdrop-blur-sm text-accent rounded-full text-xs font-bold tracking-widest border border-accent/20/50 uppercase">
            <Sparkles size={14} className="text-accent" />
            AI FOR PUBLIC GOOD
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.95]">
            <span className="text-text-primary block">Smarter Citizens.</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent/80 to-info inline-block pb-2 mt-2">Stronger Cities.</span>
          </h1>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-md font-medium">
            NagrikAI turns a simple photo or voice note into real action. Our AI agents analyze, verify, and route issues to the right authorities—transparently.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button 
              onClick={() => setView("login")} 
              className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-accent to-accent-hover text-text-on-accent rounded-full flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-accent/20 transition-all duration-200 group border border-accent/50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-canvas"
              aria-label="Report a civic issue"
            >
              <div className="bg-surface-card/20 p-2 rounded-full">
                <Camera size={18} className="group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-left pr-2">
                <div className="leading-tight font-bold text-sm">Report an Issue</div>
                <div className="text-[10px] font-medium text-indigo-100 opacity-90 mt-0.5">It takes 30 seconds</div>
              </div>
            </button>
            <button 
              onClick={() => setView("login")} 
              className="w-full sm:w-auto px-6 py-3.5 bg-surface-card/80 backdrop-blur-md border border-border-default text-text-secondary rounded-full flex items-center justify-center gap-3 hover:bg-surface-card hover:shadow-sm transition-all duration-200 group active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-subtle focus-visible:ring-offset-2 focus-visible:ring-offset-surface-canvas"
              aria-label="Watch the NagrikAI story overview video"
            >
              <div className="bg-accent/10 p-2 rounded-full border border-accent/20">
                <Play size={18} className="text-accent group-hover:scale-110 transition-transform fill-indigo-100" />
              </div>
              <div className="text-left pr-2">
                <div className="leading-tight font-bold text-sm">Watch the Story</div>
                <div className="text-[10px] font-medium text-text-secondary mt-0.5">2 min overview</div>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-surface-canvas bg-surface-muted overflow-hidden shadow-sm relative z-[5-i]">
                  <img src={`https://i.pravatar.cc/100?img=${i + 12}`} alt="User" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="text-sm text-text-secondary font-medium">
              Trusted by <span className="text-text-primary font-bold">2.4M+ citizens</span><br/>
              across 250+ cities
            </div>
          </div>
        </div>

        {/* Hero Right: Map Card */}
        <div className="relative h-[450px] sm:h-[550px] lg:h-[640px] bg-surface-card rounded-[24px] md:rounded-[32px] shadow-2xl shadow-accent/20 border border-border-subtle overflow-hidden flex transform hover:-translate-y-1 transition-transform duration-500">
          {/* Internal Sidebar */}
          <div className="w-16 md:w-24 border-r border-border-subtle bg-surface-muted/80 backdrop-blur-sm flex flex-col items-center py-6 md:py-8 gap-6 md:gap-8 z-20">
             {/* Map Card Sidebar items */}
             <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
               <div className="w-12 h-12 rounded-2xl bg-accent/20 text-accent flex items-center justify-center shadow-sm border border-accent/30">
                 <Zap size={22} className="fill-indigo-100" />
               </div>
               <span className="text-[10px] font-bold text-accent">Live</span>
             </div>
             <div className="flex flex-col items-center gap-1.5 cursor-pointer group opacity-50 hover:opacity-100 transition-opacity">
               <div className="w-12 h-12 rounded-2xl text-text-secondary flex items-center justify-center hover:bg-surface-muted/50 transition-colors">
                 <FileText size={22} />
               </div>
               <span className="text-[10px] font-bold text-text-secondary">Reports</span>
             </div>
             <div className="flex flex-col items-center gap-1.5 cursor-pointer group opacity-50 hover:opacity-100 transition-opacity">
               <div className="w-12 h-12 rounded-2xl text-text-secondary flex items-center justify-center hover:bg-surface-muted/50 transition-colors">
                 <Activity size={22} />
               </div>
               <span className="text-[10px] font-bold text-text-secondary">Hotspots</span>
             </div>
             <div className="flex flex-col items-center gap-1.5 cursor-pointer group opacity-50 hover:opacity-100 transition-opacity">
               <div className="w-12 h-12 rounded-2xl text-text-secondary flex items-center justify-center hover:bg-surface-muted/50 transition-colors">
                 <BarChart3 size={22} />
               </div>
               <span className="text-[10px] font-bold text-text-secondary">Analytics</span>
             </div>
             <div className="flex flex-col items-center gap-1.5 cursor-pointer group opacity-50 hover:opacity-100 transition-opacity mt-auto">
               <div className="w-12 h-12 rounded-full border border-border-default text-text-subtle flex items-center justify-center hover:bg-surface-muted transition-colors">
                 <MoreHorizontal size={22} />
               </div>
               <span className="text-[10px] font-bold text-text-secondary">More</span>
             </div>
          </div>

          {/* Map Area */}
          <div className="flex-1 relative bg-surface-canvas overflow-hidden">
            {/* Simulated Map Background */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              {/* Add some curvy lines to simulate roads */}
              <path d="M-100,200 Q150,350 300,100 T800,500" fill="none" stroke="var(--text-subtle)" strokeWidth="12" strokeLinecap="round" />
              <path d="M100,-50 Q250,200 400,250 T900,100" fill="none" stroke="var(--text-subtle)" strokeWidth="6" strokeLinecap="round" />
              <path d="M200,700 Q300,450 500,550 T900,300" fill="none" stroke="var(--text-subtle)" strokeWidth="8" strokeLinecap="round" />
            </svg>

            {/* Location Selector */}
            <div className="absolute top-4 left-4 md:top-8 md:left-8 bg-surface-card/90 backdrop-blur-md border border-border-default shadow-sm rounded-full px-4 md:px-5 py-2 md:py-2.5 flex items-center gap-2 cursor-pointer hover:bg-surface-card transition-colors z-20">
              <MapPin size={16} className="text-text-subtle" />
              <span className="text-xs md:text-sm font-bold text-text-secondary">Bengaluru, India</span>
              <div className="w-4 h-4 ml-3 flex items-center justify-center text-text-subtle">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Markers */}
            <div className="absolute top-[35%] left-[25%] w-8 h-8 rounded-full bg-warning/20 border-2 border-surface-canvas flex items-center justify-center text-warning font-bold text-xs shadow-md z-10">3</div>
            <div className="absolute top-[20%] left-[45%] w-8 h-8 rounded-full bg-info/20 border-2 border-surface-canvas flex items-center justify-center text-info font-bold text-xs shadow-md z-10">7</div>
            <div className="absolute bottom-[25%] left-[30%] w-8 h-8 rounded-full bg-accent/20 border-2 border-surface-canvas flex items-center justify-center text-accent font-bold text-xs shadow-md z-10">2</div>
            <div className="absolute top-[45%] right-[25%] w-8 h-8 rounded-full bg-success/20 border-2 border-surface-canvas flex items-center justify-center text-success font-bold text-xs shadow-md z-10">5</div>
            <div className="absolute bottom-[35%] right-[40%] w-8 h-8 rounded-full bg-danger/20 border-2 border-surface-canvas flex items-center justify-center text-danger font-bold text-xs shadow-md z-10">8</div>
            
            {/* Glowing Marker */}
            <div className="absolute top-[50%] left-[55%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20">
              <div className="absolute w-32 h-32 bg-accent/100/10 rounded-full animate-ping" />
              <div className="absolute w-20 h-20 bg-accent/100/20 rounded-full animate-pulse" />
              <div className="w-12 h-12 bg-gradient-to-b from-accent to-accent-hover rounded-full border-[3px] border-surface-canvas shadow-xl flex items-center justify-center z-10 text-text-on-accent">
                <MapPin size={20} className="fill-indigo-600/50" />
              </div>
            </div>

            {/* Floating Report Card */}
            <div className="hidden sm:block absolute top-4 right-4 md:top-8 md:right-8 w-[240px] md:w-[280px] bg-surface-card/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-sm border border-border-subtle overflow-hidden z-30 transform hover:-translate-y-1 transition-transform duration-300">
              <div className="px-4 py-3 border-b border-border-subtle flex items-center justify-between bg-accent/10/30">
                <div className="flex items-center gap-1.5 text-accent bg-accent/20/50 px-2.5 py-1 rounded-full text-[10px] font-black tracking-wide uppercase">
                  <Sparkles size={12} /> New Report
                </div>
                <span className="text-[10px] text-text-subtle font-bold">2m ago</span>
              </div>
              <div className="p-4 space-y-4">
                <div className="w-full h-28 bg-surface-muted rounded-xl overflow-hidden relative shadow-inner">
                   <img src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=600&h=300" alt="Pothole" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-black text-text-primary text-base leading-tight">Pothole</h4>
                  <p className="text-xs font-medium text-text-secondary mt-1">HSR Layout, Sector 2</p>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <span className="px-2.5 py-1 bg-surface-muted text-text-secondary rounded-md text-[10px] font-bold">Roads & Infrastructure</span>
                  <span className="px-2.5 py-1 bg-danger/10 text-danger rounded-md text-[10px] font-bold">Severity 4/5</span>
                </div>
              </div>
            </div>

            {/* Floating Analytics Card */}
            <div className="hidden md:block absolute bottom-8 right-8 bg-surface-card/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-sm border border-border-subtle p-5 w-[280px] z-30 transform hover:-translate-y-1 transition-transform duration-300">
              <h5 className="text-xs font-bold text-text-subtle mb-2 uppercase tracking-wider">Resolved This Week</h5>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-black text-text-primary tracking-tight">1,248</span>
                <span className="flex items-center gap-0.5 text-xs font-black text-success bg-success/20/50 px-2 py-1 rounded-md">
                  <TrendingUp size={14} /> +18%
                </span>
              </div>
              {/* Mini Chart */}
              <div className="h-16 w-full flex items-end gap-2">
                {[40, 30, 50, 40, 70, 60, 90].map((h, i) => (
                  <div key={i} className="flex-1 bg-success/10 rounded-t-md relative group overflow-hidden" style={{ height: `${h}%` }}>
                    <div className="absolute bottom-0 w-full bg-success rounded-t-md transition-all duration-500" style={{ height: h === 90 ? '100%' : '60%', opacity: h === 90 ? 1 : 0.6 }} />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-3 text-[10px] font-black text-text-subtle uppercase">
                <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span className="text-success">S</span><span className="text-success">S</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="px-5 md:px-8 lg:px-12 pb-20 md:pb-32 max-w-[1440px] mx-auto relative z-10">
        <div className="bg-surface-card rounded-3xl shadow-xl shadow-sm border border-border-subtle p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row lg:justify-between lg:items-center gap-8 lg:gap-0 lg:divide-x divide-border-subtle">
          {[
            { icon: Users, color: "text-accent", bg: "bg-accent/10 border border-accent/20", num: "2.4M+", label: "Active Citizens" },
            { icon: CheckCircle2, color: "text-success", bg: "bg-success/10 border border-success/20", num: "8.7M+", label: "Issues Reported" },
            { icon: Building2, color: "text-info", bg: "bg-info/10 border border-info/20", num: "1,200+", label: "Govt. Agencies" },
            { icon: Clock, color: "text-warning", bg: "bg-warning/10 border border-warning/20", num: "2.3M+", label: "Issues Resolved" },
            { icon: BarChart3, color: "text-accent", bg: "bg-accent/10 border border-accent/20", num: "98.7%", label: "Avg. AI Accuracy" },
          ].map((stat, i) => (
            <div key={i} className={`flex flex-col items-center sm:items-start text-center sm:text-left px-2 sm:px-6 w-full lg:flex-1 lg:first:pl-2 lg:last:pr-2 ${i === 4 ? 'sm:col-span-2 md:col-span-1 lg:col-span-1' : ''}`}>
              <div className="flex items-center justify-center sm:justify-start gap-4 mb-1">
                <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${stat.bg} ${stat.color}`}>
                  <stat.icon size={26} strokeWidth={2.5} />
                </div>
                <div className="text-left">
                  <div className="text-3xl sm:text-2xl xl:text-3xl font-black text-text-primary tracking-tight">{stat.num}</div>
                  <div className="text-xs font-bold text-text-secondary mt-1 uppercase tracking-wider whitespace-nowrap">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 md:py-32 px-5 md:px-8 lg:px-12 bg-surface-card border-y border-border-subtle relative z-10">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-12 md:mb-20 text-center md:text-left">
            <h4 className="text-xs font-black tracking-widest text-accent uppercase mb-4">How It Works</h4>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-6">
              AI Agents. Real Impact.
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl font-medium leading-relaxed mx-auto md:mx-0">
              Nine specialized AI agents work together behind the scenes to ensure every report is accurate, assigned, and acted upon.
            </p>
          </div>

          <div className="relative">
             {/* Dotted connecting line */}
             <div className="absolute top-12 left-10 w-[calc(100%-80px)] h-[2px] border-t-2 border-dashed border-border-default -z-10 hidden lg:block" />
             
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 relative z-10">
                {[
                  { icon: Camera, color: "text-text-secondary", bg: "bg-surface-muted", num: "1", title: "Capture", desc: "Understands your photo, location, voice or text.", time: "0.3s" },
                  { icon: Eye, color: "text-accent", bg: "bg-accent/20", num: "2", title: "Vision", desc: "Analyzes the image and identifies the issue.", time: "2.1s" },
                  { icon: Activity, color: "text-accent", bg: "bg-accent/20", num: "3", title: "Severity", desc: "Assesses the severity and impact.", time: "1.2s" },
                  { icon: MapPin, color: "text-success", bg: "bg-success/20", num: "4", title: "Jurisdiction", desc: "Finds the right government jurisdiction.", time: "0.8s" },
                  { icon: Fingerprint, color: "text-info", bg: "bg-info/20", num: "5", title: "Duplicate", desc: "Checks for duplicates to avoid spam.", time: "1.0s" },
                  { icon: Users, color: "text-accent", bg: "bg-accent/20", num: "+4", title: "More Agents", desc: "Impact, Verification, Recommendation & Routing.", time: "" },
                ].map((agent, i) => (
                  <div key={i} className="flex flex-col items-center text-center relative group">
                    <div className={`w-24 h-24 rounded-full ${agent.bg} ${agent.color} flex items-center justify-center border-8 border-surface-canvas shadow-sm mb-6 group-hover:scale-110 group-hover:shadow-md transition-all duration-300 relative z-10`}>
                      <agent.icon size={32} strokeWidth={2} />
                    </div>
                    <div className="bg-surface-canvas p-6 rounded-3xl border border-border-subtle w-full text-left flex flex-col h-full group-hover:bg-surface-card group-hover:shadow-xl group-hover:shadow-sm group-hover:-translate-y-1 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-3">
                        {agent.num !== "+4" && <span className="text-xs font-black text-text-subtle">{agent.num}.</span>}
                        <h3 className="font-bold text-text-primary">{agent.title}</h3>
                      </div>
                      <p className="text-xs font-medium text-text-secondary leading-relaxed mb-6">{agent.desc}</p>
                      {agent.time && <div className="mt-auto text-[10px] font-black tracking-wider text-text-subtle flex justify-end">{agent.time}</div>}
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="mt-20 text-center">
            <button 
              onClick={() => setView("login")} 
              className="inline-flex items-center gap-2 text-accent font-bold hover:text-accent-hover transition-all duration-200 bg-accent/10 px-6 py-3 rounded-full hover:bg-accent/20 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              aria-label="See all AI agents in action"
            >
              See all agents in action <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Story section */}
      <section className="py-20 md:py-32 px-5 md:px-8 lg:px-12 max-w-[1440px] mx-auto relative z-10">
        <div className="bg-gradient-to-br from-accent/5 via-surface-card to-info/5 rounded-[32px] lg:rounded-[48px] p-8 md:p-12 lg:p-20 border border-border-subtle shadow-2xl shadow-accent/10 grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 overflow-hidden relative">
          
          {/* Decor background SVG city outline */}
          <div className="absolute bottom-0 left-0 w-full opacity-[0.02] pointer-events-none">
            <svg viewBox="0 0 1000 200" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,200 L0,150 L50,150 L50,100 L100,100 L100,180 L150,180 L150,80 L200,80 L200,120 L250,120 L250,60 L300,60 L300,160 L350,160 L350,110 L400,110 L400,190 L450,190 L450,90 L500,90 L500,140 L550,140 L550,50 L600,50 L600,170 L650,170 L650,130 L700,130 L700,70 L750,70 L750,180 L800,180 L800,100 L850,100 L850,150 L900,150 L900,80 L950,80 L950,190 L1000,190 L1000,200 Z" />
            </svg>
          </div>

          <div className="flex flex-col justify-center relative z-10 lg:pr-10 text-center lg:text-left">
            <h4 className="text-xs font-black tracking-widest text-accent uppercase mb-6">The NagrikAI Story</h4>
            <h2 className="text-3xl md:text-4xl lg:text-[3.5rem] font-black tracking-tighter mb-6 md:mb-8 text-text-primary leading-[1.1]">
              From a Report to Real Change.
            </h2>
            <p className="text-base md:text-lg text-text-secondary font-medium leading-relaxed max-w-md mx-auto lg:mx-0 mb-8 md:mb-10">
              Every report you make starts a chain reaction of AI + community + government working together to build better cities.
            </p>
            <div>
              <button 
                onClick={() => setView("login")} 
                className="px-8 py-4 border-2 border-accent/20 bg-surface-card text-accent rounded-full font-bold hover:bg-accent/10 hover:border-accent/30 transition-all duration-200 inline-flex items-center justify-center gap-3 shadow-sm w-full sm:w-auto active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-canvas"
                aria-label="Explore the reporting journey"
              >
                Explore the Journey <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center lg:items-start">
            <div className="relative flex-1">
              {/* Vertical Line */}
              <div className="absolute left-[31px] top-6 bottom-6 w-[2px] bg-accent/20/50" />
              
              <div className="space-y-12">
                {[
                  { icon: Camera, color: "text-accent", bg: "bg-accent/20", title: "You report an issue", desc: "A photo, a voice note, or a text. That's all it takes." },
                  { icon: Zap, color: "text-accent", bg: "bg-accent/20", title: "AI agents analyze & understand", desc: "Our agents extract details, classify, and assess impact." },
                  { icon: CheckCircle2, color: "text-success", bg: "bg-success/20", title: "Community verifies", desc: "Citizens verify and add local context." },
                  { icon: Building2, color: "text-warning", bg: "bg-warning/20", title: "Government acts", desc: "The right department gets notified and takes action." },
                  { icon: Shield, color: "text-info", bg: "bg-info/20", title: "You see it resolved", desc: "Track progress transparently, every step of the way." },
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 sm:gap-8 relative group">
                    <div className={`w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center ${step.bg} ${step.color} border-[6px] border-surface-canvas relative z-10 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon size={24} strokeWidth={2.5} />
                    </div>
                    <div className="pt-2">
                      <h4 className="text-lg font-bold text-text-primary mb-1.5">{step.title}</h4>
                      <p className="text-sm font-medium text-text-secondary leading-relaxed max-w-xs">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Glowing N Map Pin visualization */}
            <div className="hidden md:flex flex-col items-center justify-center w-64 h-full relative">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                 {/* Pedestal */}
                 <div className="absolute bottom-[-100px] w-48 h-16 rounded-[100%] border-4 border-surface-canvas/50 bg-accent/10/50 shadow-2xl shadow-accent/30" style={{ transform: 'rotateX(60deg)' }} />
                 <div className="absolute bottom-[-90px] w-32 h-10 rounded-[100%] bg-accent/20/80" style={{ transform: 'rotateX(60deg)' }} />
                 <div className="absolute bottom-[-85px] w-16 h-6 rounded-[100%] bg-accent/30" style={{ transform: 'rotateX(60deg)' }} />
                 
                 {/* Pin Body */}
                 <div className="w-32 h-32 bg-gradient-to-b from-accent to-accent-hover rounded-t-full rounded-bl-full rounded-br-sm shadow-2xl flex items-center justify-center relative transform rotate-45 mb-12">
                    <div className="w-16 h-16 bg-surface-card rounded-full flex items-center justify-center transform -rotate-45 shadow-inner">
                      <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-accent to-accent-hover">N</span>
                    </div>
                 </div>

                 <div className="absolute w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-20 px-5 md:px-8 lg:px-12 max-w-[1440px] mx-auto border-t border-border-default relative z-10 mt-10">
        <div className="text-center mb-12 md:mb-16 text-xs md:text-sm font-bold tracking-widest text-text-subtle uppercase">
          Built with privacy, transparency, and security at the core.
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {[
            { icon: Shield, title: "Privacy First", desc: "Your data is yours." },
            { icon: Eye, title: "Open & Transparent", desc: "AI decisions you can see." },
            { icon: Lock, title: "Secure by Design", desc: "Enterprise-grade security." },
            { icon: Heart, title: "Made for Everyone", desc: "Accessible. Inclusive. Local." },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-5 group cursor-pointer">
               <div className="text-text-subtle p-3 rounded-2xl bg-surface-card border border-border-subtle shadow-sm group-hover:bg-accent/10 group-hover:text-accent group-hover:border-accent/20 transition-all duration-300">
                 <item.icon size={24} strokeWidth={2} />
               </div>
               <div className="pt-1">
                 <h5 className="font-bold text-text-primary text-base mb-1 group-hover:text-accent transition-colors">{item.title}</h5>
                 <p className="text-sm font-medium text-text-secondary">{item.desc}</p>
               </div>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}

