import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from './Card';
import { cn } from '../../lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: number;
    label: string;
    direction: 'up' | 'down' | 'neutral';
  };
  className?: string;
}

export function StatCard({ title, value, icon: Icon, trend, className }: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden group", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider relative z-10">
            {title}
          </h3>
          {Icon && (
            <div className="w-10 h-10 rounded-full bg-surface-muted flex items-center justify-center text-text-muted group-hover:bg-accent-subtle group-hover:text-accent transition-colors">
              <Icon className="w-5 h-5" />
            </div>
          )}
        </div>
        
        <div className="flex items-end gap-3 relative z-10">
          <span className="text-3xl font-bold text-text-primary tracking-tight">
            {value}
          </span>
        </div>
        
        {trend && (
          <div className={cn(
            "mt-4 flex items-center gap-1.5 text-sm font-medium relative z-10",
            trend.direction === 'up' ? 'text-success' : 
            trend.direction === 'down' ? 'text-danger' : 'text-text-muted'
          )}>
            <span className={cn(
              "px-1.5 py-0.5 rounded text-xs",
              trend.direction === 'up' ? 'bg-success-subtle' : 
              trend.direction === 'down' ? 'bg-danger-subtle' : 'bg-surface-muted'
            )}>
              {trend.direction === 'up' ? '+' : trend.direction === 'down' ? '-' : ''}{Math.abs(trend.value)}%
            </span>
            <span className="text-text-secondary font-normal">{trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
