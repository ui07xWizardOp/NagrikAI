import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2,
  CircleDashed,
  ServerCog,
  AlertTriangle,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./Button";

export function ConfidenceBadge({ value }: { value: number }) {
  let color = "var(--danger)";
  let bgColor = "var(--danger-subtle)";

  if (value >= 0.8) {
    color = "var(--success)";
    bgColor = "var(--success-subtle)";
  } else if (value >= 0.6) {
    color = "var(--info)";
    bgColor = "var(--info-subtle)";
  } else if (value >= 0.4) {
    color = "var(--warning)";
    bgColor = "var(--warning-subtle)";
  }

  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded"
      style={{ backgroundColor: bgColor, color }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {Math.round(value * 100)}%
    </span>
  );
}

const SEVERITY_TOKENS = {
  1: {
    bg: "var(--severity-1-bg)",
    text: "var(--severity-1-text)",
    dot: "var(--severity-1)",
    label: "Low",
  },
  2: {
    bg: "var(--severity-2-bg)",
    text: "var(--severity-2-text)",
    dot: "var(--severity-2)",
    label: "Minor",
  },
  3: {
    bg: "var(--severity-3-bg)",
    text: "var(--severity-3-text)",
    dot: "var(--severity-3)",
    label: "Moderate",
  },
  4: {
    bg: "var(--severity-4-bg)",
    text: "var(--severity-4-text)",
    dot: "var(--severity-4)",
    label: "High",
  },
  5: {
    bg: "var(--severity-5-bg)",
    text: "var(--severity-5-text)",
    dot: "var(--severity-5)",
    label: "Critical",
  },
};

export function SeverityBadge({ level }: { level: 1 | 2 | 3 | 4 | 5 }) {
  const config = SEVERITY_TOKENS[level] || SEVERITY_TOKENS[1];

  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded border border-transparent shadow-sm"
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full shadow-[0_0_4px_currentColor]"
        style={{ backgroundColor: config.dot }}
      />
      Severity {level} · {config.label}
    </span>
  );
}

export function ThinkingDots({ color = "var(--accent)" }: { color?: string }) {
  return (
    <div className="flex items-center justify-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function ReasoningTrace({ text }: { text: string }) {
  return (
    <div className="bg-surface-muted border border-border-default rounded-lg p-3 my-2 text-sm text-text-secondary font-mono leading-relaxed border-l-2 border-l-accent">
      {text}
    </div>
  );
}

export type AgentTrace = {
  id: string;
  agentNumber: number;
  agentName: string;
  model: string;
  status: "running" | "completed" | "failed";
  duration?: number;
  completedAt?: string;
  output?: {
    fields: { label: string; value: string; confidence?: number }[];
    reasoning?: string;
  };
};

const AGENT_TOKENS: Record<number, { text: string; bg: string }> = {
  1: { text: "var(--agent-1)", bg: "var(--agent-1-bg)" },
  2: { text: "var(--agent-2)", bg: "var(--agent-2-bg)" },
  3: { text: "var(--agent-3)", bg: "var(--agent-3-bg)" },
  4: { text: "var(--agent-4)", bg: "var(--agent-4-bg)" },
  5: { text: "var(--agent-5)", bg: "var(--agent-5-bg)" },
  6: { text: "var(--agent-6)", bg: "var(--agent-6-bg)" },
  7: { text: "var(--agent-7)", bg: "var(--agent-7-bg)" },
  8: { text: "var(--agent-8)", bg: "var(--agent-8-bg)" },
  9: { text: "var(--agent-9)", bg: "var(--agent-9-bg)" },
};

function AgentStatusIcon({
  status,
  color,
}: {
  status: AgentTrace["status"];
  color: string;
}) {
  if (status === "running")
    return <CircleDashed className="w-4 h-4 animate-spin" style={{ color }} />;
  if (status === "completed")
    return <CheckCircle2 className="w-4 h-4" style={{ color }} />;
  return <AlertTriangle className="w-4 h-4 text-danger" />;
}

export function AgentCard({
  trace,
  isRunning,
}: {
  trace: AgentTrace;
  isRunning: boolean;
}) {
  const agentTokens = AGENT_TOKENS[trace.agentNumber] || {
    text: "var(--accent)",
    bg: "var(--accent-subtle)",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 16, height: 0 }}
      animate={{ opacity: 1, x: 0, height: "auto" }}
      transition={{ duration: 0.3 }}
      className="bg-surface-card border border-border-default rounded-xl shadow-1 overflow-hidden"
    >
      <div className="flex items-center justify-between p-4 border-b border-border-subtle bg-surface-canvas/50">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
            style={{ backgroundColor: agentTokens.bg }}
          >
            <ServerCog
              className="w-4 h-4"
              style={{ color: agentTokens.text }}
            />
          </div>
          <div>
            <div
              className="text-sm font-semibold flex items-center gap-2"
              style={{ color: agentTokens.text }}
            >
              {trace.agentName}
              <AgentStatusIcon status={trace.status} color={agentTokens.text} />
            </div>
            <div className="text-xxs text-text-muted font-mono tracking-widest uppercase mt-0.5">
              {trace.model}
            </div>
          </div>
        </div>
        {trace.completedAt && trace.duration && (
          <span className="text-xs text-text-muted font-mono px-2 py-1 bg-surface-muted rounded">
            {trace.duration}s
          </span>
        )}
      </div>

      {isRunning && (
        <div className="p-6 flex justify-center">
          <ThinkingDots color={agentTokens.text} />
        </div>
      )}

      {trace.output && (
        <div className="p-4 space-y-3">
          {trace.output.fields.map((field) => (
            <div
              key={field.label}
              className="flex items-start justify-between text-sm py-1 border-b border-border-subtle last:border-0"
            >
              <span className="text-text-secondary font-medium">
                {field.label}
              </span>
              <div className="flex flex-col items-end gap-1 text-right">
                <span className="font-semibold text-text-primary">
                  {field.value}
                </span>
                {field.confidence && (
                  <ConfidenceBadge value={field.confidence} />
                )}
              </div>
            </div>
          ))}

          {trace.output.reasoning && (
            <div className="pt-2">
              <span className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1 block">
                Reasoning Trace
              </span>
              <ReasoningTrace text={trace.output.reasoning} />
            </div>
          )}

          <div className="flex gap-2 pt-3 border-t border-border-subtle mt-2">
            <Button variant="secondary" size="sm" className="w-full text-xs">
              View Output
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs text-warning"
            >
              Override
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export function AgentTimeline({
  traces,
  isRunning,
}: {
  traces: AgentTrace[];
  isRunning: boolean;
}) {
  return (
    <div className="space-y-3">
      <AnimatePresence>
        {traces.map((trace, i) => (
          <motion.div
            key={trace.id}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <AgentCard
              trace={trace}
              isRunning={isRunning && trace.status === "running"}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {isRunning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-6"
        >
          <ThinkingDots />
          <p className="text-sm text-text-muted mt-3 font-medium">
            NagrikAI is analyzing...
          </p>
        </motion.div>
      )}
    </div>
  );
}
