# DESIGN_CONSTITUTION.md — The Immutable Laws of NagrikAI Design

> **This document is the supreme law of the NagrikAI design system.**
> Every rule here is immutable. Every other design document is subordinate.
> When a conflict arises, this document wins.
>
> **Version**: 1.0.0 | **Ratified**: 2026-06-27

---

## Preamble

These laws exist because design consistency is the difference between a product that feels crafted and a product that feels assembled. Apple, Linear, Stripe, and Vercel did not become design leaders by accident. They became design leaders by writing down their laws and refusing to break them.

NagrikAI will win the Vibe2Ship hackathon not because it has the most features, but because it feels like a product that has existed for years. That feeling comes from consistency. Consistency comes from laws.

---

## Part I — Color Laws

### Law 1: No Saturated Colors
**All colors must be pastel-softened. No pure RGB primaries. No neon.**

*Reasoning*: Saturated colors trigger the brain's threat response. Pastel colors signal safety. NagrikAI is a civic platform; citizens should feel calm, not alarmed. Swachhata App uses saturated orange; NagrikAI will use peach-400. This single decision changes the entire emotional register of the product.

### Law 2: No Pure Black, No Pure White
**Backgrounds must use `#0B0F14` (dark) or `#FAFAF9` (light), never `#000000` or `#FFFFFF`.**

*Reasoning*: Pure black creates harsh contrast that fatigues the eye. Pure white feels sterile and clinical. The off-black and off-white values are perceptually identical but emotionally warmer.

### Law 3: One Accent Per Screen
**Each screen has exactly one accent color. The accent is used for the primary CTA, active nav item, and focused element only.**

*Reasoning*: Multiple accents compete for attention. When everything is highlighted, nothing is. The accent is a spotlight, not a floodlight.

### Law 4: Color Is Never The Only Signal
**Every color-coded status must be paired with an icon, text label, or shape.**

*Reasoning*: 8% of men and 0.5% of women have color vision deficiency. A red badge without an icon is invisible to them. WCAG 2.1 AA requires this. It is also better design.

### Law 5: Severity Has Its Own Palette
**Severity 1-5 must use the dedicated severity tokens, never the generic status tokens.**

*Reasoning*: A severity-5 pothole is not the same as a "danger" error. Severity is a property of the issue; danger is a property of an action. Mixing them confuses the mental model.

---

## Part II — Typography Laws

### Law 6: Inter Is The Only Font
**All UI text uses Inter. All monospace text uses JetBrains Mono. No exceptions.**

*Reasoning*: Font diversity creates visual noise. Inter is the most legible screen font at small sizes and is used by Linear, Vercel, GitHub, and Notion. Using it signals "we belong to the modern web." Using anything else signals "we made a creative choice" — which is not the goal.

### Law 7: Type Scale Is Fixed
**The type scale is: 11, 12, 13, 14, 16, 18, 20, 24, 30, 36, 48. No other sizes.**

*Reasoning*: A constrained type scale forces hierarchy. If you need a size between 14 and 16, the answer is "use 14 or 16." Not "use 15." This eliminates drift.

### Law 8: Line Height Scales With Size
**Body text uses 1.5 line height. Headings use 1.2. Display text uses 1.1.**

*Reasoning*: Tight line height at small sizes makes text unreadable. Loose line height at large sizes wastes space. The scaling ratio is derived from typographic research.

### Law 9: Never Justify Text
**All text is left-aligned. Never use `text-align: justify`.**

*Reasoning*: Justified text creates "rivers" of white space that disrupt reading. It also breaks on responsive layouts. Left-aligned text is universally more readable.

### Law 10: Monospace For IDs And Coordinates Only
**JetBrains Mono is used exclusively for: report IDs, GPS coordinates, timestamps in technical views, agent names in logs, and code blocks. Never for body text.**

*Reasoning*: Monospace signals "this is machine data." Using it for human text feels wrong. Using it for IDs makes them copy-paste-friendly.

---

## Part III — Layout Laws

### Law 11: The 8px Grid Is Sacred
**Every dimension — padding, margin, gap, width, height — must be a multiple of 8. Exceptions: 4px (hairlines), 12px (tight pairs), 20px (card padding).**

*Reasoning*: A grid creates rhythm. Rhythm creates polish. Arbitrary values (13px, 17px) create visual dissonance that the eye detects even if the mind cannot name it.

### Law 12: Maps Are First-Class Citizens
**Every primary screen either contains a map, links to a map, or is reachable from a map.**

*Reasoning*: NagrikAI is a spatial product. Civic issues have locations. If a screen does not connect to location, it does not belong in NagrikAI.

### Law 13: No More Than Two Columns Of Content
**Desktop layouts may have a sidebar plus one content column. Never two content columns side by side.**

*Reasoning*: Two content columns force the eye to choose. One column with a sidebar provides context without competition. Newspapers use columns because they are scannable; apps are not newspapers.

### Law 14: Sidebar Never Disappears On Desktop
**The sidebar is always visible on desktop (≥1024px). It may collapse to icon-only (64px) but never hides.**

*Reasoning*: Hiding navigation creates disorientation. The sidebar is the user's anchor. Removing it is like removing the frame from a painting.

### Law 15: One Primary Action Per Screen
**Every screen has exactly one primary action, represented by a filled accent-colored button. Secondary actions are ghost buttons. Tertiary actions are in a menu.**

*Reasoning*: Decision fatigue is real. When users face 3 equally-weighted buttons, they hesitate. One dominant action removes the hesitation.

---

## Part IV — Component Laws

### Law 16: Cards Are 12px Radius
**All cards use `border-radius: 12px`. No exceptions.**

*Reasoning*: Radius consistency is the most visible component rule. Mixed radii (8px card next to 16px card) look amateurish. 12px is the sweet spot: friendly but professional.

### Law 17: Buttons Are 8px Radius
**All buttons use `border-radius: 8px`. Icon-only buttons use `border-radius: 9999px` (pill).**

*Reasoning*: Buttons are sharper than cards to create tactile distinction. Pill-shaped icon buttons are universally recognized as circular actions.

### Law 18: Card Padding Is 20px
**All cards have 20px internal padding. Headers and body share this padding. Footers use 16px.**

*Reasoning*: 20px provides breathing room without wasting space. 16px feels cramped for cards. 24px feels wasteful.

### Law 19: Never Put A Card Inside A Card Without Inset Variant
**Nested cards must use the `inset` variant (muted background, no border, inset shadow).**

*Reasoning*: Two bordered cards stacked look like a layout error. The inset variant signals "this is nested content, not a new card."

### Law 20: Focus Rings Are Never Removed
**Every interactive element has a visible focus ring. If the ring looks ugly, redesign the element, not the ring.**

*Reasoning*: Keyboard users depend on focus rings. Removing them is an accessibility violation (WCAG 2.4.7). There is no design justification for removing focus rings.

---

## Part V — AI Visualization Laws

### Law 21: No Chat Bubbles
**The AI never appears as a conversational chat bubble. AI output is shown as a timeline of agent actions, structured data, and confidence badges.**

*Reasoning*: Chat bubbles anthropomorphize the AI and create a conversational expectation NagrikAI cannot fulfill. The AI is a pipeline, not a person. Showing it as a timeline is more honest and more impressive.

### Law 22: Every AI Output Has A Confidence Score
**Any value generated by an AI agent must display a confidence badge (0-100%) next to it.**

*Reasoning*: Confidence scores communicate uncertainty. Hiding uncertainty is dishonest. Showing it builds trust. This is the #1 thing missing from every other AI product.

### Law 23: Every AI Decision Is Reversible
**Any classification, routing, or recommendation made by the AI must have an "Override" button within one tap.**

*Reasoning*: AI makes mistakes. Forcing users to live with AI mistakes is hostile. The override button is the trust contract between NagrikAI and the citizen.

### Law 24: Agent Activity Is Always Visible
**During AI pipeline execution, the agent activity timeline must be visible and updating in real-time. Never show a generic spinner.**

*Reasoning*: A spinner says "wait." An agent timeline says "here is what is happening." The latter reduces perceived wait time by 40% (Nielsen Norman Group research).

### Law 25: The AI Never Says "I"
**AI outputs use passive voice or agent names. Never first-person pronouns.**

*Reasoning*: "I detected a pothole" anthropomorphizes. "Vision Agent detected a pothole" is accurate. The distinction matters because it sets the right expectation: this is a tool, not a friend.

---

## Part VI — Motion Laws

### Law 26: No Animation Exceeds 400ms
**All animations are 200-300ms for interactions, 300-400ms for page transitions. Nothing is longer.**

*Reasoning*: Long animations feel slow. Users wait for animations to finish before acting. 300ms is the perceptual threshold where animation feels "snappy" rather than "instant."

### Law 27: No Linear Easing
**All animations use custom cubic-bezier curves. The default is `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quint).**

*Reasoning*: Linear easing feels mechanical. Easing curves feel natural because they mimic physical motion (acceleration and deceleration).

### Law 28: Respect prefers-reduced-motion
**When `prefers-reduced-motion: reduce` is set, all non-essential animations are disabled.**

*Reasoning*: Some users have vestibular disorders that make animations nauseating. Respecting this preference is an accessibility mandate, not a nicety.

### Law 29: No Infinite Loops Except Loading
**The only animations allowed to loop infinitely are loading spinners and pulsing map markers. Everything else must terminate.**

*Reasoning*: Infinite loops distract. A pulsing button draws the eye forever. A pulse that stops after 3 seconds communicates urgency without becoming ambient noise.

### Law 30: Stagger List Animations By 50ms
**When animating a list of items entering, stagger each item by 50ms. Maximum 5 items staggered; the rest appear instantly.**

*Reasoning*: Staggering creates a "cascade" effect that feels intentional. Staggering too many items takes too long. 5 items × 50ms = 250ms, which is within the 300ms budget.

---

## Part VII — Map Laws

### Law 31: The Map Is Always Interactive
**No static map images. Every map can be panned, zoomed, and clicked.**

*Reasoning*: A static map is a picture. An interactive map is a tool. NagrikAI is a tool.

### Law 32: Maps Use Custom Styling
**Never use default MapLibre or Google Maps styling. Custom style JSON for both light and dark themes.**

*Reasoning*: Default map styles are visually noisy and brand-agnostic. Custom styling makes the map feel like part of NagrikAI, not an embedded third-party widget.

### Law 33: Marker Color Equals Status
**Map markers are colored by report status. Marker size equals severity. Pulsing markers are new (within 24h).**

*Reasoning*: Color-coded markers communicate status at a glance. Size-coded severity adds a second information channel. Pulsing draws attention to what is new.

### Law 34: Never Replace The Map On Mobile
**On mobile, the map may shrink but never disappears. It is always visible and interactive.**

*Reasoning*: The map is the primary navigation tool. Replacing it with a list breaks the spatial mental model. Even on a 375px screen, a 200px-tall map strip is better than no map.

---

## Part VIII — Accessibility Laws

### Law 35: WCAG 2.1 AA Is The Floor
**All text meets 4.5:1 contrast ratio (3:1 for large text). No exceptions.**

*Reasoning*: Accessibility is a legal and ethical mandate. It is also better design — high-contrast text is more readable for everyone, not just visually impaired users.

### Law 36: Touch Targets Minimum 44×44px
**Every interactive element has a minimum 44×44px touch target on mobile.**

*Reasoning*: Apple HIG and WCAG 2.5.5 both require this. Smaller targets cause mis-taps, especially on reports of urgent civic issues where the user may be stressed.

### Law 37: Keyboard Navigation Works For Every Flow
**Every feature is accessible via keyboard. Tab order is logical. Shift+Tab reverses. Enter activates. Escape closes.**

*Reasoning*: Power users (and judges) navigate by keyboard. A demo that requires mouse interaction feels less polished than one that works with keyboard alone.

### Law 38: Alt Text On Every Image
**Every image has descriptive alt text. Decorative images use `alt=""`.**

*Reasoning*: Screen readers depend on alt text. Empty alt text signals "this is decorative, skip it." Missing alt text causes screen readers to read the filename, which is useless.

### Law 39: Never Disable Zoom
**Never set `user-scalable=no` or `maximum-scale=1.0` in the viewport meta tag.**

*Reasoning*: Disabling zoom is an accessibility violation (WCAG 1.4.4). Users with low vision need to zoom. There is no design reason to prevent it.

---

## Part IX — Theme Laws

### Law 40: Dark Mode Is Designed, Not Derived
**Dark mode has its own color values, tuned for dark backgrounds. It is not a CSS invert of light mode.**

*Reasoning*: Colors that work on white do not work on black. Indigo-500 (#6366F1) on white is readable; on black it is too dark. Dark mode uses indigo-400 (#818CF8) for the same semantic role. Deriving dark mode automatically produces bad results.

### Law 41: No Flash Of Wrong Theme
**Theme is determined before first paint. Use a blocking inline script in `<head>` to set the theme class.**

*Reasoning*: A flash of light mode when the user prefers dark (or vice versa) is jarring. It signals "this app does not respect my preferences." The blocking script is a few milliseconds and prevents the flash entirely.

### Law 42: Theme Toggle Is In Settings, Not Sidebar
**Theme switching lives in Settings. It is not a frequent action and should not clutter the sidebar.**

*Reasoning*: The sidebar is for navigation. Theme is a preference. Preferences live in settings. Exception: a small sun/moon icon in the top-right corner is acceptable on desktop.

### Law 43: System Theme Is The Default
**The initial theme follows `prefers-color-scheme`. Users can override, and the override persists.**

*Reasoning*: Respecting the system preference is the least surprising behavior. If the user's OS is in dark mode, they probably want NagrikAI in dark mode.

---

## Part X — Content Laws

### Law 44: Whitespace Is Intentional
**Padding is a design decision, not leftover space. Generous padding (24px+) around primary content.**

*Reasoning*: Whitespace creates focus. Cramped layouts force the eye to work harder. Premium products use more whitespace than budget products because whitespace signals confidence.

### Law 45: Every Screen Answers What-Why-Next
**Every screen answers: What happened? Why does it matter? What should I do?**

*Reasoning*: Without these three answers, the screen is incomplete. A dashboard that shows data without context is noise. A form that asks for input without explaining why is rude.

### Law 46: Empty States Are Onboarding
**Every empty state has an illustration, an explanation, and a CTA. Never show a blank screen.**

*Reasoning*: Empty states are the first thing new users see. A blank screen says "this app has nothing for you." An empty state with a CTA says "here is how to get started."

### Law 47: Loading States Show Progress, Not Just "Wait"
**Loading states use skeletons, progress bars, or agent timelines. Never a generic spinner for >2 seconds.**

*Reasoning*: A spinner communicates nothing. A skeleton communicates "here is what is coming." An agent timeline communicates "here is what is happening right now." The latter two reduce perceived wait time.

### Law 48: Errors Have Recovery Paths
**Every error message explains what went wrong and offers at least one recovery action.**

*Reasoning*: "Error" is useless. "Couldn't classify the photo — try retaking with better lighting" is helpful. The difference is whether the user can act.

---

## Part XI — Anti-Pattern Laws

### Law 49: No Modal Over Modal
**Only one modal can be open at a time. Opening a second modal closes the first.**

*Reasoning*: Stacked modals create confusion about which modal the backdrop click will close. They also create z-index nightmares.

### Law 50: No Toast Spam
**Only one toast visible at a time. Additional toasts queue and appear sequentially.**

*Reasoning*: Multiple toasts stack into a wall of notifications that no one reads. One toast at a time forces prioritization.

### Law 51: No Hover-Only Interactions
**Every hover state has a tap/click equivalent. No feature is accessible only via hover.**

*Reasoning*: Touch devices cannot hover. Half of NagrikAI users will be on mobile. Hover-only tooltips hide information from them.

### Law 52: No Auto-Playing Media
**No audio or video auto-plays. Ever.**

*Reasoning*: Auto-play is universally hated. It is also an accessibility violation (WCAG 1.4.2). There is no justification.

### Law 53: No Emoji In UI
**Use Lucide icons, not emoji. Exception: empty-state illustrations may use stylized emoji.**

*Reasoning*: Emoji render differently on every platform (Apple, Google, Microsoft, Samsung). They look unprofessional in a civic context. Icons are consistent.

### Law 54: No Gradients On Text
**Never apply `background-clip: text` with a gradient. Text must be a solid color.**

*Reasoning*: Gradient text reduces readability, especially at small sizes. It also feels like 2018 startup design, not 2026 civic platform design.

### Law 55: No Drop Shadows On Text
**Never apply `text-shadow`. Text must rely on contrast for legibility.**

*Reasoning*: Text shadows are a band-aid for poor contrast. If you need a shadow to read the text, the color combination is wrong.

---

## Part XII — Performance Laws

### Law 56: First Contentful Paint Under 1.5s
**The first piece of content must paint within 1.5 seconds on a 4G connection.**

*Reasoning*: Users abandon sites that take longer than 3 seconds to load. 1.5s for FCP gives budget for the rest of the page to stream in.

### Law 57: Interactive Under 3s
**The page must be interactive (TTI) within 3 seconds on 4G.**

*Reasoning*: A page that paints but cannot be interacted with feels broken. TTI under 3s keeps users engaged.

### Law 58: No Layout Shift
**Cumulative Layout Shift (CLS) must be 0.1 or lower. Reserve space for images, ads, and dynamic content.**

*Reasoning*: Layout shift is the most frustrating web experience. Users click the wrong thing because the button moved. CLS 0 is the goal; 0.1 is the ceiling.

### Law 59: Images Are WebP or AVIF
**All images use WebP or AVIF format. JPEG and PNG are forbidden for content images.**

*Reasoning*: WebP is 30% smaller than JPEG at equivalent quality. AVIF is 50% smaller. Smaller images load faster.

### Law 60: Lazy Load Below The Fold
**Images and non-critical components below the fold are lazy-loaded.**

*Reasoning*: Loading images the user cannot see yet wastes bandwidth and CPU. Lazy loading prioritizes visible content.

---

## Part XIII — Consistency Laws

### Law 61: The Component Library Is The Law
**If a component exists in the library, use it. If it does not exist, add it. Never one-off a component.**

*Reasoning*: One-off components drift. Library components stay consistent. The library is the single source of truth for UI.

### Law 62: Icons Come From One Set
**All icons use Lucide. Never mix Material Icons, Heroicons, and Lucide in the same project.**

*Reasoning*: Different icon sets have different stroke widths, corner radii, and visual weights. Mixing them looks like a collage.

### Law 63: Naming Is Predictable
**Components are PascalCase (`IssueCard`). Hooks are camelCase prefixed with `use` (`useReport`). Types are PascalCase (`ReportStatus`). Constants are SCREAMING_SNAKE_CASE (`MAX_SEVERITY`).**

*Reasoning*: Predictable naming reduces cognitive load. A developer (or AI agent) can find any file by naming convention alone.

### Law 64: Files Are Small
**No file exceeds 300 lines. If it does, it does too much and must be split.**

*Reasoning*: Large files are hard to navigate, hard to review, and hard to test. 300 lines is the threshold where "I can hold this in my head" becomes "I need to scroll."

### Law 65: Every Component Has A Story
**Every component in the library has a Storybook story showing all variants and states.**

*Reasoning*: Stories are living documentation. They show what a component looks like in every state. They also catch visual regressions.

---

## Part XIV — Trust Laws

### Law 66: Never Hide AI Uncertainty
**If the AI is 60% confident, show 60%. Never round up to make it look more confident.**

*Reasoning*: Hiding uncertainty is lying. Citizens who act on a "90% confident" classification that was actually 60% will lose trust forever when it is wrong.

### Law 67: Show The Reasoning Trace
**Every AI classification includes a 1-sentence reasoning trace visible to the user.**

*Reasoning*: "Pothole (94%)" is informative. "Pothole (94%) — visible depression in road surface with water accumulation" is trustworthy. The reasoning makes the confidence believable.

### Law 68: Never Auto-Send Without Confirmation For Low Severity
**Severity 1-2 reports require citizen confirmation before emailing an agency. Severity 3+ may auto-submit.**

*Reasoning*: Low-severity reports are not urgent. Auto-sending them trains agencies to ignore NagrikAI emails. Reserving auto-send for high severity maintains the signal.

### Law 69: Persist Everything Locally
**Every report draft is saved to local storage. If the network fails, the draft survives.**

*Reasoning*: A citizen who walks to a pothole, takes a photo, and loses it to a network error will not try again. Local persistence is the trust contract that says "your effort is safe."

### Law 70: Show The Audit Trail
**Every report has a public timeline showing every status change, who made it, and when.**

*Reasoning*: Transparency builds trust. If a citizen can see "BBMP marked this as in-progress on June 25 at 14:32," they believe the system is real. If status changes are invisible, the system feels like a black box.

---

## Part XV — The Meta Laws

### Law 71: Consistency Beats Creativity
**When in doubt, use the existing pattern. A boring consistent button is better than a creative inconsistent one.**

*Reasoning*: Creativity is for features, not for UI patterns. Users do not want creative buttons; they want buttons that work like every other button they have ever clicked.

### Law 72: Calm Over Clever
**A calm interface that feels predictable beats a clever interface that surprises.**

*Reasoning*: Surprises are delightful once and annoying thereafter. Calm interfaces are sustainable. NagrikAI is a tool citizens will use repeatedly; it must be calm.

### Law 73: Less Is More
**If a feature does not directly serve the citizen, the agency, or the journalist, cut it.**

*Reasoning*: Feature creep is the death of polish. Every feature adds surface area for bugs and UI confusion. The 15 X-factor features are enough.

### Law 74: The Demo Is The Product
**Every design decision is evaluated through the lens of "will this make the demo better?"**

*Reasoning*: At a hackathon, the demo is the product. A feature that does not demo well might as well not exist. This is not a permanent design philosophy; it is a hackathon philosophy.

### Law 75: Polish The Edges
**The difference between good and great is in the edge cases: empty states, error states, loading states, hover states, focus states, disabled states.**

*Reasoning*: Most teams handle the happy path. Great teams handle every path. Judges notice edge cases because they have seen 100 happy-path demos before yours.

---

## Amendment Process

These laws are immutable for the duration of the Vibe2Ship hackathon (22-29 June 2026). After the hackathon, laws may be amended by the design lead with written justification. No law may be amended during the build.

**Ratified**: 2026-06-27
**Design Lead**: NagrikAI Design OS
**Status**: Active

---

## End of DESIGN_CONSTITUTION.md

This document contains 75 immutable laws across 15 categories. Every other design document is subordinate to these laws. When in doubt, refer here.
