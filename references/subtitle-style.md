# Burned-in subtitle style (user-approved reference, Nov 2026)
Reference: user's screenshot of a 2D-in-3D short (caption "people"). Study only; image kept locally, not in the repo.

- Font: Montserrat ExtraBold (800), OFL, `public/fonts/Montserrat-ExtraBold.ttf` (variable font, google/fonts ofl/montserrat).
- Case: **lowercase**. Trailing punctuation dropped, except ? and !.
- Fill #fff. Outside black stroke = 0.2 x font size (`-webkit-text-stroke` + `paint-order: stroke fill`).
- Hard black drop shadow, offset (0.035, 0.045) x font size, 0 blur.
- No box, no pill, no active-word colour.
- Size 84 px at 1080x1920 (scales with height/1920). Text centre at 74 % of frame height, centred horizontally.
- Chunking: max 2 words / 16 chars. Break on punctuation and on pauses > 0.35 s. Show from the first word's start. Hide 0.25 s after the chunk's last word ends (no stale text over silence).
- Component: `templates/bridge/Subtitles.tsx`, driven by `words.json`. Mount it as the last child of the root `AbsoluteFill`, after the flash. Needs `resolveJsonModule` in tsconfig.
- Check per still: never cover a face or the key prop. If a shot's subject sits at 70-78 %, pass `yPct` per shot (e.g. 80 or 66).
