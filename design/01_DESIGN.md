# DESIGN.md — NagrikAI Master Design Document

> **The root document of the NagrikAI Design Operating System.**
> This document orchestrates the 15 specification files.
>
> **Version**: 1.0.0 | **Generated**: 2026-06-27

---

## 1. Introduction

NagrikAI is an agentic civic intelligence platform. It transforms a citizen photo into a routed, verified, predicted, and tracked civic report using a 9-agent AI pipeline. 

The design of NagrikAI is not merely aesthetic; it is structural. The design must communicate trust, transparency, and competence. It must not look like a typical government portal (which signals bureaucracy) nor a typical AI chat wrapper (which signals hallucination). It must look like a premium civic utility.

This Design OS is composed of 15 specification files. They are the single source of truth for all UI, UX, and frontend engineering decisions for the Vibe2Ship 2026 hackathon.

---

## 2. The 15 Specifications

The Design OS is organized into four pillars: Foundations, Components, Contexts, and Operations.

### Pillar 1: Foundations
The core visual language.
*   **[02_COLORS.md](./02_COLORS.md)**: The pastel-first, dual-theme semantic token system.
*   **[03_TYPOGRAPHY.md](./03_TYPOGRAPHY.md)**: The strict 11-size type scale using Inter and JetBrains Mono.
*   **[11_DESIGN_TOKENS.md](./11_DESIGN_TOKENS.md)**: The master list of spacing, radius, and elevation tokens.
*   **[12_DESIGN_CONSTITUTION.md](./12_DESIGN_CONSTITUTION.md)**: The 75 immutable laws of NagrikAI design.

### Pillar 2: Components
The building blocks of the UI.
*   **[04_COMPONENTS.md](./04_COMPONENTS.md)**: Specifications for buttons, cards, badges, and inputs.
*   **[08_MOTION.md](./08_MOTION.md)**: The animation system, easing curves, and stagger rules.
*   **[09_AI_VISUALIZATION.md](./09_AI_VISUALIZATION.md)**: How to visualize the 9-agent pipeline without chat bubbles.
*   **[10_AGENTS_UI.md](./10_AGENTS_UI.md)**: Specific UI representation for each of the 9 agents.

### Pillar 3: Contexts
Where components are assembled.
*   **[05_PAGES.md](./05_PAGES.md)**: Layouts for the 5 primary routes (Home, Map, Report, Agency, Hotspots).
*   **[06_DASHBOARD.md](./06_DASHBOARD.md)**: Specialized specifications for the Agency Dashboard view.
*   **[07_MAPS.md](./07_MAPS.md)**: MapLibre styling, markers, popups, and heatmaps.

### Pillar 4: Operations
How the design is executed and verified.
*   **[13_STORYBOARD.md](./13_STORYBOARD.md)**: The second-by-second choreography for the 60-second hackathon demo.
*   **[14_DESIGN_QA.md](./14_DESIGN_QA.md)**: The 50-point checklist for verifying implementation.
*   **[15_INSTRUCTIONS.md](./15_INSTRUCTIONS.md)**: Prompts for the AI coding agent to generate the UI.

---

## 3. The Three Vibe Shifts

NagrikAI introduces three "vibe shifts" compared to existing civic tech (like the Swachhata App or FixMyStreet):

### Shift 1: From "Submission" to "Intelligence"
*   **Old vibe**: A generic web form. You submit, it goes into a black box.
*   **New vibe**: The UI reacts instantly. As the image uploads, the AI pipeline visualizes its thinking in real-time. It feels like handing a problem to a team of experts, not dropping it in a suggestion box.

### Shift 2: From "Bureaucratic" to "Premium"
*   **Old vibe**: Cluttered, high-contrast, primary colors (red/green/yellow), small text, cramped margins.
*   **New vibe**: Pastel colors, generous whitespace (8px grid), large readable typography (Inter), glassmorphic overlays. It looks like a tool built by Stripe or Linear.

### Shift 3: From "Static" to "Spatial"
*   **Old vibe**: The map is a small square widget to pick a location.
*   **New vibe**: The map is the canvas. It is styled to match the app theme perfectly. Markers pulse. Heatmaps glow. The city feels alive.

---

## 4. Implementation Strategy

To implement this design system, follow this sequence:

1.  **Configure Tailwind**: Map the semantic tokens (COLORS.md, DESIGN_TOKENS.md) into `tailwind.config.ts`.
2.  **Setup Typography**: Import Inter and JetBrains Mono. Configure the strict 11-size scale.
3.  **Build Primitives**: Implement the core shadcn/ui components (Buttons, Badges, Cards) applying the strict radii and padding rules.
4.  **Build Map Infrastructure**: Setup MapLibre with the custom JSON styles for light and dark modes.
5.  **Build AI Visualizer**: Implement the `AgentTimeline` and `ConfidenceBadge` components.
6.  **Assemble Pages**: Put the pieces together according to the layouts in PAGES.md and DASHBOARD.md.
7.  **Apply Motion**: Add the Framer Motion transitions (MOTION.md) as the final layer of polish.
8.  **QA**: Run through the checklist in DESIGN_QA.md.

---

## 5. Hackathon Constraints

*   **Time**: 7 days.
*   **Focus**: We cannot build everything. We must build the core loop (Capture → AI Pipeline → Result) to perfection.
*   **Faking it**: If an API is too slow for the 60-second demo, mock it in the UI, but keep the UI visualization authentic to the Design OS. The UI is what the judges evaluate for the "Design" criteria (10%).

---

> *"Good design is obvious. Great design is transparent."* — Joe Sparano
> In NagrikAI, great design makes the AI transparent.

---

## End of DESIGN.md
