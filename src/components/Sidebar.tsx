import StaggeredMenu from "./ui/StaggeredMenu";

export default function Sidebar({ view, setView }: { view: string, setView: (v: any) => void }) {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "dashboard", label: "Dashboard" },
    { id: "capture", label: "Report Issue" },
    { id: "hotspots", label: "Live Map" },
    { id: "verify", label: "Verify Reports" },
    { id: "myreports", label: "My Reports" },
    { id: "karma", label: "Community" },
    { id: "analytics", label: "Analytics" },
    { id: "alerts", label: "Alerts" },
    { id: "agency", label: "Agencies" },
    { id: "opendata", label: "Open Data" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <StaggeredMenu
      position="left"
      items={navItems}
      socialItems={[
        { label: 'Twitter', link: 'https://twitter.com' },
        { label: 'GitHub', link: 'https://github.com' }
      ]}
      displaySocials={true}
      displayItemNumbering={true}
      menuButtonColor="var(--text-primary)"
      openMenuButtonColor="var(--text-primary)"
      changeMenuColorOnOpen={true}
      colors={['var(--surface-card)', 'var(--surface-card-muted)']}
      accentColor="var(--accent)"
      activeId={view}
      onItemClick={(id) => setView(id)}
      isFixed={true}
    />
  );
}
