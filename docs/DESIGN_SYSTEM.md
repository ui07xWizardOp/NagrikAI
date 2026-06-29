# Design System

NagrikAI adheres to a strict "Design Constitution" located in the `/design` folder. The codebase implements this design system primarily through Tailwind CSS.

## Styling Technology
- **Framework**: Tailwind CSS v4.
- **Global CSS**: `src/index.css`. This file acts as the bridge between the design documentation and the code.

## Theme Configuration

Instead of standard Tailwind config files, Tailwind v4 uses CSS variables and the `@theme` directive directly in `index.css`.

### Colors
The application uses a semantic color system injected via CSS variables.

```css
:root {
  --background: #f8fafc;
  --surface-card: #ffffff;
  --text-primary: #0f172a;
  --accent: #2563eb;
  /* ... */
}

.dark-mode {
  --background: #000000;
  --surface-card: #09090b;
  --text-primary: #f8fafc;
  --accent: #3b82f6;
  /* ... */
}
```

These variables are mapped to Tailwind utility classes inside the `@theme` block:
```css
@theme {
  --color-surface-card: var(--surface-card);
  --color-text-primary: var(--text-primary);
  /* Usage in components: bg-surface-card text-text-primary */
}
```

### Typography
The project uses two primary font families:
- **Inter**: For all general UI, body text, and reading.
- **JetBrains Mono**: For technical data, agent outputs, IDs, and SLA timers.

Imported in `index.css` via Google Fonts and assigned in `@theme`:
```css
@theme {
  --font-sans: "Inter", ...;
  --font-mono: "JetBrains Mono", ...;
}
```

### Motion and Animation
Animations are critical to the UX, particularly for AI interactions.
- **Tailwind Animations**: Custom animations like `fade-in`, `slide-up`, and `pulse-slow` are defined in `index.css` and applied via classes (e.g., `animate-fade-in`).
- **Framer Motion**: The project dependencies include `motion`, which can be used for more complex, physics-based route transitions or component exits, though simple CSS is preferred for performance where possible.

## Dark Mode Implementation
Theme toggling is handled manually via the `<html class="dark-mode">` attribute.
- The `index.html` script checks `localStorage` on initial load to prevent flashing.
- `Settings.tsx` provides the UI to switch themes, which updates `localStorage` and toggles the class on the `document.documentElement`.
