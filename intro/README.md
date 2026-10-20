# 🎨 Hand-Drawn Crayon Birthday Intro ("Something Just Like This" Style)

This is the custom animated intro created for **Ishita ("Malkin")**. It plays hand-drawn crayon text and doodles word-by-word with a playful stop-motion boiling line feel, timed to music, and then lifts the paper away to reveal your main birthday celebration page!

---

## 📁 File Structure

```text
birthday/
├── index.html            <- Your original main page (UNTOUCHED!)
├── stylesheet.css        <- Your main page styles (UNTOUCHED!)
├── effect.js             <- Your main page script (UNTOUCHED!)
├── public_make_you_mine.mp3
├── server.js             <- Serves the website locally
└── intro/
    ├── index.html        <- Intro markup & stop-motion SVG filters
    ├── style.css         <- Crayon typography, paper grain & transitions
    ├── script.js         <- Animation controller & editable config array
    └── README.md         <- This guide!
```

---

## ✏️ How to Edit Text, Timings, Colors & Doodles

Open `intro/script.js`. Right at the top (lines 7 to 95), you will find the **`INTRO_CONFIG`** array:

```javascript
const INTRO_CONFIG = {
  bpm: 125,            // Song BPM for the gentle rhythmic bounce (Make You Mine)
  totalDuration: 26.5, // Total duration in seconds before revealing scrapbook gallery
  mainPageUrl: '../index.html',       // Path to your main birthday page

  scenes: [
    {
      id: 1,
      startTime: 0.0,
      endTime: 3.4,
      text: "Hey Malkin...",
      highlightWord: "Malkin...",
      color: "#E63946",       // Crayon Coral Red
      doodle: "cats_peeking", // The cats peek in from bottom
      bgAccent: "#FFF8F0"
    },
    ...
```

### 1. Replacing Placeholder Lines (Scenes 3 & 4)
In `intro/script.js`, simply edit the `text:` string in Scene 3 and Scene 4:
```javascript
{
  id: 3,
  startTime: 6.8,
  endTime: 10.2,
  text: "Your own custom personal line here!",
  highlightWord: "custom", // The word that gets highlighted with larger size & color
  color: "#3A86FF",
  doodle: "sun_sparkle"
}
```

### 2. Music Architecture (One Continuous Song)
- The entire website uses **one single song** (`public_make_you_mine.mp3`) that starts on the front page and continues without pause or restart across the front page, crayon intro, and scrapbook gallery.
- Intro and gallery animations are synced to this song's BPM (`125` BPM).
- Mute/unmute buttons on every page control the same audio object and stay synchronized.

### 4. Available Crayon Doodles
You can set `doodle:` on any scene to any of the following:
- `"cats_peeking"` — White & ginger cats peeking over the bottom edge with ears wiggling.
- `"sparkles_stars"` — Hand-drawn 5-point crayon stars twinkling on the corners.
- `"sun_sparkle"` — Smiling crayon sunshine with hand-drawn rays.
- `"hearts_flower"` — Crayon hearts floating across the screen.
- `"cats_walking"` — The two cats walking side-by-side with little stepping animation.
- `"balloons_rising"` — Colorful birthday balloons floating up with squiggly strings.
- `"birthday_cake"` — Crayon birthday cake with a flickering candle flame.
- `"final_balloons"` — Balloon swarm lifting the paper away.

---

## 🚀 How to Run Locally & Deploy

### Running locally
In PowerShell or terminal:
```bash
node server.js
```
Open **[http://localhost:8081](http://localhost:8081)**. It automatically opens the intro first!

### Deploying to Netlify / Vercel / GitHub Pages
- **Netlify:** The included `_redirects` file automatically directs `/` to `/intro/index.html 302`.
- **Vercel / GitHub Pages:** Visiting `/intro/` or opening `intro/index.html` starts the intro, and upon completion it seamlessly transitions into the main page (`../index.html`).
