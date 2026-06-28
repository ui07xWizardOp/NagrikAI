import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";
import { TrendingDown, Activity, Clock, AlertTriangle } from "lucide-react";

export default function Analytics() {
  const resolutionData = [
    { name: "Mon", time: 4.2 },
    { name: "Tue", time: 3.8 },
    { name: "Wed", time: 4.5 },
    { name: "Thu", time: 3.1 },
    { name: "Fri", time: 2.8 },
    { name: "Sat", time: 2.4 },
    { name: "Sun", time: 2.1 },
  ];

  const wardData = [
    { name: "Ward A", resolved: 45, pending: 12 },
    { name: "Ward B", resolved: 32, pending: 8 },
    { name: "Ward C", resolved: 67, pending: 24 },
    { name: "Ward D", resolved: 21, pending: 5 },
    { name: "Ward E", resolved: 89, pending: 31 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2 tracking-tight">Agency SLA Tracker</h1>
          <p className="text-text-secondary">Public dashboard of agency performance and issue resolution metrics.</p>
        </div>
        <div className="px-4 py-2 bg-surface-card border border-border-default rounded-xl shadow-sm flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-sm font-semibold text-text-primary font-mono">LIVE UPDATE</span>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface-card border border-border-default rounded-2xl p-6 shadow-sm relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-5 text-accent transition-transform duration-500 group-hover:scale-110">
            <Clock size={120} />
          </div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-2 relative z-10">Avg Resolution Time</h3>
          <div className="flex items-end gap-3 relative z-10">
            <span className="text-4xl font-black text-text-primary">2.4</span>
            <span className="text-lg text-text-muted font-medium mb-1">days</span>
          </div>
          <div className="mt-4 flex items-center gap-1 text-secondary text-sm font-medium relative z-10">
            <TrendingDown size={16} />
            <span>12% faster this week</span>
          </div>
        </div>

        <div className="bg-surface-card border border-border-default rounded-2xl p-6 shadow-sm relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-5 text-error transition-transform duration-500 group-hover:scale-110">
            <AlertTriangle size={120} />
          </div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-2 relative z-10">SLA Breach Rate</h3>
          <div className="flex items-end gap-3 relative z-10">
            <span className="text-4xl font-black text-text-primary">4.2</span>
            <span className="text-lg text-text-muted font-medium mb-1">%</span>
          </div>
          <div className="mt-4 flex items-center gap-1 text-secondary text-sm font-medium relative z-10">
            <TrendingDown size={16} />
            <span>Down from 6.8%</span>
          </div>
        </div>

        <div className="bg-surface-card border border-border-default rounded-2xl p-6 shadow-sm relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-5 text-highlight transition-transform duration-500 group-hover:scale-110">
            <Activity size={120} />
          </div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-2 relative z-10">Total Issues Resolved</h3>
          <div className="flex items-end gap-3 relative z-10">
            <span className="text-4xl font-black text-text-primary">1,482</span>
          </div>
          <div className="mt-4 text-sm text-text-muted relative z-10">
            In the last 30 days
          </div>
        </div>
        
        <div className="bg-surface-card border border-border-default rounded-2xl p-6 shadow-sm flex flex-col justify-between">
           <div>
             <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">Citizen Trust Score</h3>
             <div className="w-full h-4 bg-surface-muted rounded-full overflow-hidden">
               <div className="h-full bg-accent w-[82%] rounded-full" />
             </div>
             <div className="mt-2 flex justify-between text-xs font-mono text-text-muted">
                <span>POOR</span>
                <span className="text-accent font-bold">82/100</span>
                <span>EXCELLENT</span>
             </div>
           </div>
           <p className="text-xs text-text-secondary mt-4 leading-relaxed">
             Based on resolution quality, speed, and community feedback.
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-surface-card border border-border-default rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-text-primary mb-6">Resolution Time (Days)</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={resolutionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--surface-card)', borderColor: 'var(--border-default)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Line type="monotone" dataKey="time" stroke="var(--accent)" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-surface-card border border-border-default rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-text-primary mb-6">Ward Breakdown</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wardData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--surface-card)', borderColor: 'var(--border-default)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                  cursor={{ fill: 'var(--surface-muted)' }}
                />
                <Bar dataKey="resolved" stackId="a" fill="var(--secondary)" radius={[0, 0, 4, 4]} name="Resolved" />
                <Bar dataKey="pending" stackId="a" fill="var(--warning)" radius={[4, 4, 0, 0]} name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-surface-card border border-border-default rounded-2xl p-6 shadow-sm overflow-hidden">
        <h2 className="text-lg font-semibold text-text-primary mb-6">Performance by Ward</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-default text-xs font-semibold text-text-muted uppercase tracking-wider">
                <th className="pb-3 px-4">Ward</th>
                <th className="pb-3 px-4">Total Reports</th>
                <th className="pb-3 px-4">Avg Resolution</th>
                <th className="pb-3 px-4">SLA Breach %</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {wardData.map((ward, i) => (
                <tr key={i} className="border-b border-border-subtle hover:bg-surface-muted/50 transition-colors">
                  <td className="py-3 px-4 font-medium text-text-primary">{ward.name}</td>
                  <td className="py-3 px-4 text-text-secondary">{ward.resolved + ward.pending}</td>
                  <td className="py-3 px-4 text-text-secondary">{(Math.random() * 2 + 1).toFixed(1)} days</td>
                  <td className="py-3 px-4 text-text-secondary">{((ward.pending / (ward.resolved + ward.pending)) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
