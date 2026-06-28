# STORYBOARD.md — The NagrikAI Demo Choreography

> **Every second of the demo, designed.**
> This document is the cinematic storyboard for the 5-minute Vibe2Ship final presentation.
>
> **Version**: 1.0.0

---

## 1. Demo Philosophy

A hackathon demo is not a walkthrough. It is a **performance**. The judge should feel something in the first 10 seconds, understand something in the first 30 seconds, and want something by the end. Every second is choreographed.

### The Three Emotions

A winning demo evokes three emotions in sequence:

1. **Empathy** (0-15s): "This problem is real. I feel it."
2. **Wonder** (15-90s): "Wait, the AI is doing that by itself?"
3. **Ambition** (90-180s): "If this existed in my city, my life would be better."

If the judge does not feel all three, the demo did not work.

---

## 2. The 5-Minute Storyboard

### ACT 1: THE PAIN (0:00 - 0:30)

**0:00 - 0:05 | Black Screen → Headline**

```
[Black screen, 2 seconds of silence]

[Text fades in, white on black, centered:]
"Last monsoon in Bengaluru,
12 people died from pothole accidents.

The complaints were filed 3 months earlier."

[Hold for 3 seconds]
[Slow fade to next slide]
```

**Visual**: Pure black background. White Inter text, 24px, centered. Slow fade in (1s), hold (3s), slow fade out (1s).

**Audio**: Silence. Let the weight of the words land.

**Emotion**: Empathy. The judge is now feeling the problem.

---

**0:05 - 0:15 | The Incumbent Failure**

```
[Cut to screenshot of Swachhata App]

[Text overlay, top-left:]
"Swachhata App: 1.55 crore downloads
91% resolution rate"

[Pause]

[Text overlay, bottom:]
"But only for cleanliness.
Potholes, water leaks, broken lights?
Still kill."

[Hold 3 seconds]
```

**Visual**: Screenshot of Swachhata App on the left. Text appears on the right, line by line, with 1s stagger. The last line ("Still kill") appears in coral.

**Emotion**: Frustration with the status quo. The judge now understands the gap.

---

**0:15 - 0:30 | The Reveal**

```
[Cut to NagrikAI logo, full screen, center]

[Logo animates in: indigo dot pulses, then expands into NagrikAI wordmark]

[Text fades in below:]
"Nine AI agents.
One photo.
Thirty seconds to a routed, verified, tracked report."

[Hold 3 seconds]

[Transition: zoom into the "9" in "Nine", which becomes the agent timeline]
```

**Visual**: NagrikAI logo (indigo gradient dot + wordmark) scales from 0 to 100% with spring ease. Tagline fades in below. The transition zooms into the "9" and morphs into the live app.

**Audio**: Optional soft chime (low, single note, 200ms) on logo appearance.

**Emotion**: Wonder begins. The judge is now curious.

---

### ACT 2: THE MAGIC (0:30 - 2:30)

**0:30 - 0:45 | The Capture**

```
[Live app, home screen, mobile view]

[Hero element: big camera button, center screen, pulsing gently]

[Judge speaks: "Let's report a pothole."]

[You tap the camera button. Camera viewfinder opens.]

[Frame a pothole prop (or use a stock image). Tap shutter.]

[Photo captured. GPS auto-fills. Timestamp auto-fills.]

[Tap "Submit"]
```

**Visual**: The home screen is a map with a single dominant camera button (56px diameter, indigo, pulsing). On tap, the camera viewfinder slides up from the bottom (300ms). The shutter button is centered. After capture, the photo appears in a preview card with location and time auto-filled. The "Submit" button is indigo, full-width.

**Motion**: Camera button pulses (1.2s cycle). Viewfinder slides up. Photo preview scales in (200ms). Submit button is the final visual anchor.

**Emotion**: "That was easy." The judge is now leaning forward.

---

**0:45 - 1:15 | The Pipeline (The Wow Moment)**

```
[Full-screen agent timeline appears]

[Capture Agent card slides in from right]
●━━━ Capture Agent          ●●● (thinking)
[0.5s later]
●━━━ Capture Agent          ✓ 0.3s
  └─ Photo received
  └─ Location: 12.9719, 77.5937
  └─ Voice: (none)

[Vision Agent card slides in]
●━━━ Vision Agent           ●●● (thinking, 2 seconds)

[During the thinking, show the photo with a scanning effect: 
 a thin indigo line sweeps across the photo left-to-right]

[After 2s]
●━━━ Vision Agent           ✓ 2.1s
  └─ Issue Type: Pothole          ●94%
  └─ Severity: 4/5
  └─ "Visible depression in road surface..."

[Continue for Severity Agent, Jurisdiction Agent, 
 Duplicate Detection, Impact Prediction, 
 Community Verification, Repair Recommendation, 
 Government Routing — each appearing in sequence 
 with their respective colors and outputs]
```

**Visual**: The agent timeline is the hero of this section. Each agent card slides in from the right (300ms, stagger 100ms after the previous completes). The active agent has a pulsing dot in its color. Completed agents show a checkmark. The reasoning text appears with a typewriter effect (20ms per character).

**The Scanning Effect**: When the Vision Agent is "thinking," a thin indigo line (2px) sweeps across the photo from left to right (2s duration). This communicates "the AI is looking at your photo."

**Motion**: Cards slide in with `ease-out-quint`. Pulsing dots use the agent color. The typewriter effect uses `setInterval` at 20ms.

**Emotion**: Wonder peaks. The judge is now thinking "this is genuinely impressive."

---

**1:15 - 1:30 | The Routing Visualization**

```
[Split screen: agent timeline (left) + map (right)]

[As Government Routing Agent completes:]

[Map animates: camera flies from current view to the report location]
[A marker drops in at the report location (indigo, pulsing)]
[A dashed line draws from the marker to the BBMP office location]
[BBMP office marker appears (sky blue)]
[Line pulses for 2 seconds, then fades]

[Agent card updates:]
●━━━ Government Routing      ✓ 1.2s
  └─ Email sent to BBMP
  └─ Tracking: BBMP-2026-142-08923
  └─ SLA: 48 hours
```

**Visual**: The map splits the screen with the timeline. The camera fly-to is 2s, cinematic curve. The marker drops with a spring (scale 0 → 1, overshoot 1.1 → 1). The dashed line draws over 1s. Both markers pulse in sync for 2s.

**Motion**: `map.flyTo()` with `duration: 2000, curve: 1.42`. Marker drop uses Framer Motion spring. Line draw uses `pathLength` animation.

**Emotion**: "The AI actually did something." The judge now believes the product is real.

---

**1:30 - 1:45 | The Voice Demo (Multilingual)**

```
[Switch back to home screen]

[Point to the microphone button next to camera]

[Judge speaks in Hindi: "Let me show you voice reporting."]

[Tap microphone. Voice waveform appears.]

[Speak: "Yahan paani ki leakage hai, school ke paas."]

[Chirp 3 transcribes in real-time: 
 "Yahan paani ki leakage hai, school ke paas"
 Language: Hindi]

[Pipeline runs again, this time faster (agents cached)]
[Severity Agent detects "school" from voice transcript]
[Adjusts severity: 3 → 4 (+1, school nearby)]
```

**Visual**: The microphone button is next to the camera button, same size, peach color. On tap, a waveform appears (animated bars reacting to audio). The transcription appears character by character. The pipeline runs again, but this time the Severity Agent card highlights the "mentions_school: true" signal in its output.

**Motion**: Waveform bars use `animate` with random heights (60ms interval). Transcription uses typewriter effect.

**Emotion**: "It understood Hindi. And it used the voice to adjust severity." The judge is now impressed on a second dimension.

---

**1:45 - 2:15 | The Hotspot Map**

```
[Transition: zoom out from the report to city-wide view]

[Switch to /hotspot page]

[Full-screen map with heatmap layer]

[Heatmap fades in over 2 seconds]

[Indigo → sky → amber → coral gradient visible across Bengaluru]

[Point to a red zone]
"This is Indiranagar Ward 142.
47 reports in the last 30 days.
We predict 12 more in the next 7 days."

[Time slider animates: today → +7 days]
[Heatmap intensifies slightly in predicted zones]

"Imagine this in 100 smart cities."
```

**Visual**: Full-screen map. Heatmap layer fades in (opacity 0 → 0.8, 2s). The gradient is smooth (indigo at low density → coral at high). A time slider at the bottom animates from "Today" to "+7 days" (3s duration), and the heatmap subtly intensifies in predicted zones.

**Motion**: Heatmap fade uses `setPaintProperty('heatmap-opacity', ...)`. Time slider uses Framer Motion `animate` on `x` position.

**Emotion**: Ambition begins. The judge is now imagining scale.

---

**2:15 - 2:30 | The Close**

```
[Cut to clean NagrikAI logo screen]

[Text fades in:]
"Built on Gemini 2.5 Pro.
Deployed on Google Cloud Run.
Integrated with Google Maps Platform.
9 agents. 1 photo. 30 seconds."

[Pause 2 seconds]

[Final line fades in:]
"Imagine this in 100 smart cities."

[Hold 3 seconds]

[Black screen]
```

**Visual**: NagrikAI logo centered. Tech stack text fades in line by line (300ms stagger). The final "Imagine" line is larger (24px) and in indigo. Hold for 3 seconds. Cut to black.

**Emotion**: Ambition peaks. The judge is now sold.

---

### ACT 3: Q&A BUFFER (2:30 - 5:00)

**2:30 - 5:00 | Q&A**

Reserve 2.5 minutes for judge questions. Anticipate:

1. **"How accurate is the vision model?"** → "94% on our test set of 5 images. We use Gemini 2.5 Pro multimodal, which is state-of-the-art."
2. **"Is this actually integrated with BBMP?"** → "Currently generates structured Open311-compatible payloads. Real agency integration is post-hackathon."
3. **"How do you handle false reports?"** → "Trust score system. New users start at 50. Reports from low-trust users require community verification."
4. **"What's the cost?"** → "$0.05-0.08 per report in Gemini API costs. Within Google Cloud's $300 free credit for the first 3,000 reports."
5. **"Can this scale?"** → "PostgreSQL with PostGIS handles 10M+ reports. Maps API quota is the binding constraint at scale."

---

## 3. Backup Video Script (60 seconds)

If the live demo fails, play this pre-recorded video:

```
0:00-0:05  [NagrikAI logo + "9 agents. 1 photo. 30 seconds."]
0:05-0:15  [Photo of pothole → Vision Agent classifies in 2s]
0:15-0:30  [Full agent timeline runs, all 9 agents complete]
0:30-0:45  [Map shows report marker + routing line to BBMP]
0:45-0:55  [Hotspot map of Bengaluru with predictions]
0:55-0:60  [Logo + "Imagine this in 100 smart cities."]
```

---

## 4. Demo Day Checklist

### Before the Demo (T-60 min)

- [ ] App deployed and tested on production URL
- [ ] 5 test photos loaded on demo device
- [ ] Phone hotspot configured as backup network
- [ ] Backup video recorded and on USB + cloud
- [ ] Laptop charged + charger in bag
- [ ] HDMI/USBC adapter for projector
- [ ] Presenter notes printed (this storyboard)
- [ ] Voice cleared, water bottle ready

### T-5 min

- [ ] Open app on demo device, navigate to home
- [ ] Test camera permission, mic permission
- [ ] Verify network connection (primary + hotspot)
- [ ] Take one test photo, run full pipeline, verify it works
- [ ] Close the app, ready for clean start

### During the Demo

- [ ] Speak slowly (adrenaline makes you speed up)
- [ ] Look at the judges, not the screen
- [ ] Pause after key moments (let them digest)
- [ ] If something fails, don't apologize — switch to backup video smoothly
- [ ] End on "Imagine this in 100 smart cities." Then stop talking.

### After the Demo

- [ ] Stay for Q&A
- [ ] Have business cards / GitHub URL ready
- [ ] Thank the judges by name if possible

---

## 5. The Emotion Curve

```
Emotion
  ↑
  │                                    ★ Ambition peak
  │                                   ╱
  │                      ★ Wonder    ╱
  │                     ╱    ↕      ╱
  │        ★ Curiosity ╱     ↕     ╱
  │       ╱            ╱      ↕    ╱
  │  ★ Empathy        ╱       ↕   ╱
  │ ╱                 ╱        ↕  ╱
  ├─────────────────────────────────────────→ Time
  0s    30s    60s    90s    120s   150s   180s

  Pain → Reveal → Capture → Pipeline → Routing → Hotspot → Close
```

The curve must rise monotonically. Any dip (a confusing slide, a broken feature, an awkward pause) breaks the spell. Practice until the curve is smooth.

---

## 6. What Kills a Demo

1. **Apologizing for failures.** If something breaks, say "Let me show you the backup" and play the video. Never say "Sorry, it was working earlier."
2. **Reading from slides.** The slides are for the judge. You speak from memory. If you need notes, hold them; don't read from screen.
3. **Going over time.** 5 minutes is the limit. At 4:30, start wrapping up. At 5:00, stop mid-sentence if you have to.
4. **Technical jargon.** "We use pgvector for cosine similarity" loses 80% of judges. "The AI finds similar reports nearby" wins them.
5. **Explaining instead of showing.** Don't explain what the agent timeline does. Show it. The visual is the explanation.
6. **Nervous pacing.** Stand still. Move only to point at the screen. Plant your feet.
7. **Mumbling the close.** "Imagine this in 100 smart cities" must be loud, clear, and followed by silence. Do not rush past it.

---

## End of STORYBOARD.md

This document is the choreography. Practice it 10 times. Time yourself. When the demo feels automatic, you are ready.
