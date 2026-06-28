# README.md — NagrikAI Design Operating System

> **The index. Start here.**

---

## What Is This?

This is the **Design Operating System (DOS)** for NagrikAI — a complete, implementation-ready design specification for the Vibe2Ship 2026 hackathon. It is engineered to make design NagrikAI's strongest competitive differentiator.

These documents are not inspiration. They are law. Every component, color, animation, and interaction is specified. Drop these files into your repo and feed them to Cursor, Claude Code, Gemini CLI, or Codex.

---

## Document Index

Read in this order:

| # | Document | Purpose | Lines |
|---|----------|---------|-------|
| 01 | `01_DESIGN.md` | Master design system — philosophy, principles, all foundations | ~800 |
| 02 | `02_COLORS.md` | Complete color token system — pastels, light/dark, 9 agent colors | ~700 |
| 03 | `03_TYPOGRAPHY.md` | Type system — Inter + JetBrains Mono, 11-size scale | ~400 |
| 04 | `04_COMPONENTS.md` | Component library specs — 40+ components | ~1500 |
| 05 | `05_PAGES.md` | Page specifications — every screen | ~800 |
| 06 | `06_DASHBOARD.md` | Dashboard philosophy and layouts | ~400 |
| 07 | `07_MAPS.md` | Map design system — markers, heatmaps, styles | ~600 |
| 08 | `08_MOTION.md` | Animation system — Framer Motion, durations, curves | ~500 |
| 09 | `09_AI_VISUALIZATION.md` | How AI looks — no chatbots, agent timelines | ~600 |
| 10 | `10_AGENTS_UI.md` | UI specs for all 9 agents — colors, icons, outputs | ~700 |
| 11 | `11_DESIGN_TOKENS.md` | All design tokens in one place | ~500 |
| 12 | `12_DESIGN_CONSTITUTION.md` | **The immutable laws** — 75 laws, read first | ~400 |
| 13 | `13_STORYBOARD.md` | Demo choreography — second-by-second | ~500 |
| 14 | `14_DESIGN_QA.md` | 300+ point QA checklist | ~400 |
| 15 | `15_INSTRUCTIONS.md` | Developer implementation guide + AI agent prompts | ~600 |

**Total**: ~8,900 lines of design documentation

---

## Quick Start

### For the Developer (You)

1. **Read `12_DESIGN_CONSTITUTION.md` first.** These 75 laws override everything.
2. **Read `01_DESIGN.md` next.** This is the master system.
3. **Skim `02_COLORS.md` and `03_TYPOGRAPHY.md`.** Reference as you build.
4. **Follow `15_INSTRUCTIONS.md`** for project setup and build order.
5. **Use `14_DESIGN_QA.md`** on Day 6 before submission.

### For AI Coding Agents (Cursor, Claude Code, Gemini CLI)

Paste this prompt at the start of any session:

```
You are building NagrikAI, a civic intelligence platform for the Vibe2Ship hackathon.

Read /design/12_DESIGN_CONSTITUTION.md (the immutable laws) and 
/design/01_DESIGN.md (the master design system) before writing any code.

Then read /design/15_INSTRUCTIONS.md for implementation guidance.

Rules:
1. Next.js 14 App Router + TypeScript + Tailwind + shadcn/ui
2. Use semantic color tokens (text-primary, bg-surface-card), never raw hex
3. Support light and dark mode via next-themes
4. Use Framer Motion for animations (200-300ms, ease-out-quint)
5. Use Lucide icons only
6. Follow the 8px spacing system
7. Every component has hover, focus, disabled states
8. Never exceed 300 lines per file

Build [FEATURE]. Respond with file path + complete code. No explanations.
```

---

## Design Philosophy in 30 Seconds

NagrikAI's design is a synthesis of **Linear + Arc Browser + Notion + Vercel + Apple Maps + Material Design 3**. The result is:

- **Calm**: pastel colors, never saturated. Whitespace is a feature.
- **Trustworthy**: looks like a polished government tool, not a hackathon prototype.
- **Intelligent**: AI is visible as agent timelines, not chatbots. Every AI output has confidence + reasoning + override.
- **Spatial**: maps are first-class. Every screen connects to location.
- **Premium**: smooth transitions, glassmorphism overlays, dual-theme native.

The single differentiator: **the 9-agent activity timeline**. No other civic app shows AI work this transparently.

---

## The 5 Most Important Laws

From `12_DESIGN_CONSTITUTION.md`:

1. **No saturated colors.** All colors are pastel-softened.
2. **Maps are first-class citizens.** Every screen has a map or links to one.
3. **No chat bubbles.** AI is shown as a timeline of agent actions.
4. **Every AI output has a confidence score.** Hiding uncertainty is lying.
5. **Dark mode is designed, not derived.** It has its own color values.

---

## File Structure (Where to Put These)

```
your-nagrikai-repo/
├── design/                    ← Drop these files here
│   ├── README.md             (this file)
│   ├── 01_DESIGN.md
│   ├── 02_COLORS.md
│   ├── 03_TYPOGRAPHY.md
│   ├── 04_COMPONENTS.md
│   ├── 05_PAGES.md
│   ├── 06_DASHBOARD.md
│   ├── 07_MAPS.md
│   ├── 08_MOTION.md
│   ├── 09_AI_VISUALIZATION.md
│   ├── 10_AGENTS_UI.md
│   ├── 11_DESIGN_TOKENS.md
│   ├── 12_DESIGN_CONSTITUTION.md
│   ├── 13_STORYBOARD.md
│   ├── 14_DESIGN_QA.md
│   └── 15_INSTRUCTIONS.md
├── app/                       (Next.js app)
├── components/                (React components)
├── ...
```

---

## The Demo Promise

After implementing this design system, your 5-minute demo will evoke:

1. **Empathy** (0-15s): "This problem is real."
2. **Wonder** (15-90s): "The AI is doing that by itself?"
3. **Ambition** (90-180s): "Imagine this in 100 smart cities."

See `13_STORYBOARD.md` for the second-by-second choreography.

---

## Maintenance

- **During hackathon (7 days)**: These documents are frozen. Do not edit.
- **After hackathon**: Fork into a public repo. Iterate. Share with the community.
- **Version**: 1.0.0
- **Last updated**: 2026-06-27

---

## License

Project-confidential until Vibe2Ship submission (29 June 2026, 2pm IST).
MIT thereafter.

---

**Built for Vibe2Ship 2026. Built to win.**
