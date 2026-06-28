# AI_VISUALIZATION.md — How AI Should Look in NagrikAI

> **The AI is visible, not conversational. This document defines how.**
>
> **Version**: 1.0.0

---

## 1. The Prime Directive

**NagrikAI's AI never appears as a chatbot.** No chat bubbles. No "Hi, I'm your AI assistant!" No conversational pleasantries. The AI is a pipeline of specialist agents that act on the citizen's behalf, and its work is shown as a **timeline of decisions, not a conversation**.

### Why Not Chatbot?

1. **Chatbots set the wrong expectation.** Users expect conversation; NagrikAI delivers action. The gap causes disappointment.
2. **Chatbots hide the pipeline.** A single chat response obscures 9 agents working. A timeline reveals it.
3. **Chatbots anthropomorphize.** "I detected a pothole" implies a person. "Vision Agent detected a pothole" is honest.
4. **Chatbots are the #1 hackathon cliché.** Judges have seen 500 chatbots. They have not seen 500 agent timelines.

---

## 2. The Visual Language of AI

NagrikAI represents AI work through five visual primitives:

### Primitive 1: The Agent Card

Each agent has a card that appears in the timeline when it starts work.

```
┌─────────────────────────────────────────────────┐
│  ●  Vision Agent                          2.1s  │  ← Header (agent color dot + name + duration)
│     gemini-2.5-pro                              │  ← Model name (muted)
├─────────────────────────────────────────────────┤
│                                                 │
│  ●●●  Analyzing photo...                        │  ← Status (thinking pulse while running)
│                                                 │
├─────────────────────────────────────────────────┤
│  ✓  Issue Type: Pothole          94% confidence │  ← Output (when complete)
│  ✓  Severity: 4/5                               │
│  ✓  Area: 0.8 m²                                │
│                                                 │
│  "Visible depression in road surface with       │  ← Reasoning (italic, quoted)
│   water accumulation suggests depth >5cm."      │
│                                                 │
│  [View Full Output]  [Override]                 │  ← Actions
└─────────────────────────────────────────────────┘
```

### Primitive 2: The Confidence Badge

Every AI-generated value has a confidence badge.

```
┌──────────────────┐
│ Pothole  ●94%   │  ← High confidence (mint)
└──────────────────┘

┌──────────────────┐
│ Pothole  ●62%   │  ← Medium confidence (amber)
└──────────────────┘

┌──────────────────┐
│ Other  ●28%     │  ← Low confidence (coral)
└──────────────────┘
```

**Confidence color coding:**
- **80-100%**: mint (`#10B981`)
- **60-79%**: sky (`#0EA5E9`)
- **40-59%**: amber (`#F59E0B`)
- **0-39%**: coral (`#F87171`)

### Primitive 3: The Reasoning Trace

Below every AI output, a collapsible "Why?" panel shows the reasoning.

```tsx
<Collapsible>
  <CollapsibleTrigger className="text-xs text-text-muted hover:text-text-accent">
    ▸ Why this classification?
  </CollapsibleTrigger>
  <CollapsibleContent>
    <p className="text-sm text-text-secondary italic mt-2">
      "Visible depression in road surface with irregular edges, 
      approximately 0.8m wide. Water accumulation suggests depth 
      beyond surface level. Nearby road markings provide scale reference."
    </p>
    <div className="text-xs text-text-subtle mt-2 font-mono">
      Model: gemini-2.5-pro · Tokens: 1,247 · Latency: 2.1s
    </div>
  </CollapsibleContent>
</Collapsible>
```

### Primitive 4: The Override Button

Every AI decision has an "Override" button within one tap.

```tsx
<div className="ai-output-group">
  <span className="text-sm font-medium">Issue Type: Pothole</span>
  <ConfidenceBadge value={0.94} />
  <Button variant="ghost" size="sm">
    <EditIcon className="w-3 h-3" />
    Override
  </Button>
</div>
```

### Primitive 5: The Agent Timeline

The full pipeline, visualized as a vertical timeline.

```
  ●━━━ Capture Agent          ✓ 0.3s
  │
  ●━━━ Vision Agent           ✓ 2.1s
  │    └─ Pothole (94%)
  │
  ●━━━ Severity Agent         ✓ 1.4s
  │    └─ Adjusted: 3 → 4 (school nearby)
  │
  ●━━━ Jurisdiction Agent     ✓ 0.8s
  │    └─ BBMP, Ward 142
  │
  ●━━━ Duplicate Detection    ✓ 0.6s
  │    └─ 2 similar reports found
  │
  ●━━━ Impact Prediction      ✓ 0.5s
  │    └─ In hotspot zone
  │
  ●━━━ Community Verification  ✓ 0.2s
  │    └─ Auto-routed (score: 82)
  │
  ●━━━ Repair Recommendation   ✓ 0.4s
  │    └─ Rs 4,200-5,800
  │
  ●━━━ Government Routing      ✓ 1.2s
  │    └─ Email sent to BBMP
  │
  ●━━━ Pipeline Complete       7.5s total
       └─ Report ID: r_3f8e2a1b
```

---

## 3. AI States

### State 1: Idle (Before Pipeline)

No AI visible. The screen shows the camera capture UI.

### State 2: Thinking (Pipeline Running)

```
┌─────────────────────────────────────────┐
│                                         │
│         NagrikAI is analyzing           │  ← Calm, non-chatbot message
│           your photo...                 │
│                                         │
│  ●━━━ Capture Agent          ●●●        │  ← Active (pulsing)
│  ○━━━ Vision Agent           waiting    │  ← Pending
│  ○━━━ Severity Agent         waiting    │
│  ○━━━ Jurisdiction Agent     waiting    │
│  ○━━━ ... (5 more)                      │
│                                         │
│  ⏱  Est. 8 seconds remaining           │  ← Time estimate
│                                         │
└─────────────────────────────────────────┘
```

### State 3: Partial Complete (Some Agents Done)

```
┌─────────────────────────────────────────┐
│                                         │
│  ●━━━ Capture Agent          ✓ 0.3s     │  ← Complete (checkmark)
│  ●━━━ Vision Agent           ●●●        │  ← Active (pulsing)
│  ○━━━ Severity Agent         waiting    │  ← Pending
│  ○━━━ ... (6 more)                      │
│                                         │
│  ✓  Issue identified: Pothole           │  ← Live output appears
│                                         │
└─────────────────────────────────────────┘
```

### State 4: Complete (All Agents Done)

```
┌─────────────────────────────────────────┐
│                                         │
│  ✓  Report filed successfully           │  ← Success state
│     Report ID: r_3f8e2a1b               │
│                                         │
│  ●━━━ Capture Agent          ✓ 0.3s     │  ← All green
│  ●━━━ Vision Agent           ✓ 2.1s     │
│  ●━━━ Severity Agent         ✓ 1.4s     │
│  ●━━━ Jurisdiction Agent     ✓ 0.8s     │
│  ●━━━ ... (5 more)                      │
│                                         │
│  Total: 7.5s                            │
│                                         │
│  [View Report]  [File Another]          │
│                                         │
└─────────────────────────────────────────┘
```

### State 5: Error (Agent Failed)

```
┌─────────────────────────────────────────┐
│                                         │
│  ●━━━ Capture Agent          ✓ 0.3s     │
│  ●━━━ Vision Agent           ✗ failed   │  ← Red X
│  │    └─ Confidence too low (28%)       │  ← Error reason
│  ⊘━━━ Severity Agent         skipped    │  ← Skipped (greyed)
│  ⊘━━━ ... (6 more)                      │
│                                         │
│  ⚠  Vision Agent couldn't classify      │  ← Error message
│     the photo with enough confidence.   │
│     Try retaking with better lighting.  │
│                                         │
│  [Retry]  [Report Manually]             │  ← Recovery actions
│                                         │
└─────────────────────────────────────────┘
```

---

## 4. Tool Call Visualization

When an agent calls a tool (Maps API, database query, etc.), the tool call appears as a nested card:

```
┌─────────────────────────────────────────┐
│  ●  Jurisdiction Agent          0.8s    │
├─────────────────────────────────────────┤
│  📞 Tool: reverse_geocode               │
│     Input: (12.9719, 77.5937)           │
│     Output: "Indiranagar, Bengaluru"    │
│     Latency: 120ms                      │
│                                         │
│  📞 Tool: get_ward                      │
│     Input: (12.9719, 77.5937)           │
│     Output: ward_id="BLR-W-142"         │
│     Latency: 45ms                       │
│                                         │
│  📞 Tool: get_agency                    │
│     Input: ("BLR-W-142", "pothole")     │
│     Output: agency_id="bbmp"            │
│     Latency: 30ms                       │
│                                         │
├─────────────────────────────────────────┤
│  ✓  Routed to: BBMP                     │
│     Ward: 142 (Indiranagar)             │
│     Confidence: 92%                     │
│                                         │
│  [View Full Output]  [Override]         │
└─────────────────────────────────────────┘
```

---

## 5. Agent Collaboration Visualization

When agents hand off to each other, the handoff is visualized:

```
  ●━━━ Vision Agent           ✓ 2.1s
  │    └─ Output: { issue_type: "pothole", ... }
  │
  │    ↓ passes to
  │
  ●━━━ Severity Agent         ✓ 1.4s
       └─ Input: VisionOutput + location context
```

The arrow shows data flow. The user can click the arrow to see the exact payload passed.

---

## 6. Memory Visualization

If an agent uses memory (past reports, user history), a small "memory" icon appears:

```
┌─────────────────────────────────────────┐
│  ●  Duplicate Detection       0.6s      │
│     🧠 Used memory: 3 similar reports   │  ← Memory indicator
│                                         │
│  Found 2 similar reports within 100m:   │
│  • r_2a1b... (5 days ago, confirmed)    │
│  • r_4c3d... (3 days ago, resolved)     │
│                                         │
│  ✓  Marked as "Community Verified"      │
└─────────────────────────────────────────┘
```

---

## 7. Prediction Visualization

When the Impact Prediction Agent forecasts future issues, the prediction is shown with a confidence interval:

```
┌─────────────────────────────────────────┐
│  ●  Impact Prediction         0.5s      │
│                                         │
│  📊 Hotspot Zone: Indiranagar Ward 142  │
│                                         │
│  Predicted new reports (next 7 days):   │
│  ┌─────────────────────────────┐        │
│  │  ████████████░░░░  12 ± 3   │        │  ← Bar chart with error bar
│  └─────────────────────────────┘        │
│                                         │
│  Confidence: 78%                        │
│  Based on: 47 historical reports        │
│                                         │
│  [View Hotspot Map]                     │
└─────────────────────────────────────────┘
```

---

## 8. Implementation

### Agent Timeline Component

```tsx
function AgentTimeline({ reportId }: { reportId: string }) {
  const { traces, isRunning } = useAgentTraces(reportId)
  
  return (
    <div className="space-y-2">
      <AnimatePresence>
        {traces.map((trace, i) => (
          <motion.div
            key={trace.id}
            initial={{ opacity: 0, x: 16, height: 0 }}
            animate={{ opacity: 1, x: 0, height: 'auto' }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <AgentCard trace={trace} isRunning={isRunning && trace.status === 'running'} />
          </motion.div>
        ))}
      </AnimatePresence>
      
      {isRunning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-4"
        >
          <ThinkingDots />
          <p className="text-sm text-text-muted mt-2">
            NagrikAI is analyzing your photo...
          </p>
          <p className="text-xs text-text-subtle mt-1 font-mono">
            Est. {remainingSeconds}s remaining
          </p>
        </motion.div>
      )}
    </div>
  )
}
```

### Thinking Dots Component

```tsx
function ThinkingDots() {
  return (
    <div className="flex items-center justify-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-accent"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
```

### Confidence Badge Component

```tsx
function ConfidenceBadge({ value }: { value: number }) {
  const color = value >= 0.8 ? 'var(--success)' 
              : value >= 0.6 ? 'var(--info)'
              : value >= 0.4 ? 'var(--warning)'
              : 'var(--danger)'
  
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded"
      style={{ backgroundColor: `${color}20`, color }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
      {Math.round(value * 100)}%
    </span>
  )
}
```

---

## 9. What AI UI Never Does

- ❌ Never shows a chat bubble
- ❌ Never uses "I", "me", "my" (the AI is not a person)
- ❌ Never shows a generic "Loading..." spinner (show agent timeline instead)
- ❌ Never hides confidence scores
- ❌ Never makes an irreversible decision
- ❌ Never shows a full-screen "AI is thinking" overlay (the timeline is enough)
- ❌ Never uses the word "AI" in the UI (it's implied; say "NagrikAI" or "agent")
- ❌ Never shows a robot emoji or illustration (it's a tool, not a character)

---

## End of AI_VISUALIZATION.md

**Next**: Read `AGENTS_UI.md` for the specific UI specification of each of the 9 agents.
