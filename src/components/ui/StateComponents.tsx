import { AlertTriangle, LucideIcon } from 'lucide-react';
import { Button } from './Button';

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action 
}: { 
  icon: LucideIcon; 
  title: string; 
  description: string; 
  action?: { label: string; onClick: () => void } 
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-surface-muted flex items-center justify-center mb-5 shadow-inner">
        <Icon className="w-8 h-8 text-text-muted" />
      </div>
      <h3 className="text-xl font-bold text-text-primary mb-2 tracking-tight">{title}</h3>
      <p className="text-sm text-text-secondary max-w-sm mb-6 leading-relaxed">{description}</p>
      {action && (
        <Button onClick={action.onClick} variant="primary" className="rounded-full px-6 shadow-2">
          {action.label}
        </Button>
      )}
    </div>
  );
}

export function ErrorState({ 
  icon: Icon = AlertTriangle, 
  title, 
  description, 
  onRetry, 
  onFallback 
}: { 
  icon?: LucideIcon; 
  title: string; 
  description: string; 
  onRetry?: () => void; 
  onFallback?: () => void 
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-danger-subtle flex items-center justify-center mb-5 shadow-inner">
        <Icon className="w-8 h-8 text-danger" />
      </div>
      <h3 className="text-xl font-bold text-text-primary mb-2 tracking-tight">{title}</h3>
      <p className="text-sm text-text-secondary max-w-sm mb-6 leading-relaxed">{description}</p>
      <div className="flex gap-3">
        {onRetry && (
          <Button onClick={onRetry} variant="primary" className="rounded-full px-6 shadow-2">
            Retry
          </Button>
        )}
        {onFallback && (
          <Button variant="secondary" onClick={onFallback} className="rounded-full px-6">
            Report Manually
          </Button>
        )}
      </div>
    </div>
  );
}
