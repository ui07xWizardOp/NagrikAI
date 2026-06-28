import { motion } from 'motion/react';
import { MapPin, Clock } from 'lucide-react';
import { ConfidenceBadge, SeverityBadge } from './AIComponents';
import React from 'react';

export type IssueReport = {
  id: string;
  issueType: string;
  description: string;
  severity: 1 | 2 | 3 | 4 | 5;
  aiConfidence: number;
  wardName: string;
  createdAt: string;
  status: 'new' | 'routed' | 'progress' | 'fixed' | 'disputed';
  image?: string;
};

export const IssueCard: React.FC<{ report: IssueReport; onClick?: () => void }> = ({ report, onClick }) => {
  // Simple time formatter
  const formatTimeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="bg-surface-card border border-border-default rounded-xl p-5 cursor-pointer shadow-1 hover:shadow-2 transition-shadow relative overflow-hidden group"
    >
      <div className="flex items-start justify-between mb-3 relative z-10">
        <div className="flex flex-wrap gap-2">
          <SeverityBadge level={report.severity} />
          <ConfidenceBadge value={report.aiConfidence} />
        </div>
      </div>
      
      <h3 className="text-base font-semibold text-text-primary capitalize mb-1 relative z-10 group-hover:text-accent transition-colors">
        {report.issueType.replace(/_/g, ' ')}
      </h3>
      
      <p className="text-sm text-text-secondary line-clamp-2 mb-4 relative z-10 leading-relaxed">
        {report.description}
      </p>
      
      <div className="flex items-center justify-between text-xs text-text-muted mt-auto relative z-10 border-t border-border-subtle pt-3">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-medium bg-surface-muted px-2 py-1 rounded">
            <MapPin className="w-3.5 h-3.5" />
            {report.wardName}
          </span>
          <span className="flex items-center gap-1 font-mono">
            <Clock className="w-3.5 h-3.5" />
            {formatTimeAgo(report.createdAt)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
