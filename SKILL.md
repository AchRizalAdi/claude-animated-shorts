---
name: cartoon-3d-short
description: Make a ~55-70 s vertical cartoon story short in the "2D characters in a colourful 3D world" style (flat bean-head cartoon cards with ink outlines, painted 3D town/world with black ink lines, saturated sky, depth-of-field backgrounds, gliding cameras, voice narration, synthesized SFX + march-style music), rendered with three.js inside Remotion. Proven on "The Bridge That Fell for a Song" (2026-10-31). Use when the user asks for another video "like the bridge video", "like the soldiers/bridge short", "in that cartoon 3D style", a history/science story short with cartoon characters in 3D, or says "use the cartoon short skill".
---

# Cartoon 3D story short (three.js + Remotion)

Proven example: **The Bridge That Fell for a Song**. It is an original 67 s short about the 1831 Broughton bridge and 74 soldiers marching in step.
- Code: `src/videos/bridge/` of your Remotion project (composition `BridgeShort`, 1080x1920, 30 fps).
- Script, voice and sound: `~/bridge-short/`.
- Style research: `references/`.

The style reference is a channel studied privately (`references/`: STYLE_BIBLE.md, reports/*.md, frames/).
- Those videos are private study material. Never upload, publish or send them.
- Never copy their scripts, characters or shots. Story, characters and voice are always OUR OWN.
- Never say the channel's name in a voice-over or description.

User rules that apply:
- **Burned-in subtitles REQUIRED** (dedicated subtitle layer inside the video, overrides the old "no captions" rule). Render as a Remotion HTML overlay above the three.js canvas, driven by `words.json` (1-3 words per chunk, synced to word start, fixed safe-area position). Visual style = the user's reference image (see `references/subtitle-style.md`; ask for it if missing). No other overlay labels; in-world text on props is fine.
- English only.
- Voice: one steady tone.
- Jokes are researched real facts.
- **No music** (SFX + ambience + voice only; set `music` stem to zero / omit `music.py`). Master to −15 LUFS, −1.2 dBTP.
- **Never reskin the bridge world (`templates/bridge/build.ts` + `world.ts`) for non-bridge stories.** Research the real historical/modern places on Google/Wikipedia first, then build isolated **Multi-Set / Era Zones** using real CC0 3D kitbash models (`.glb` Kenney / Quaternius / Poly Pizza) rather than crude primitive box stacks.
- Final export 2K vertical: 1440x2560, `--scale 1.3333`.
- Opus max verifies every check.
- Save after every step.
- "Just do it" once the script is approved.

## Pipeline
1. **Topic, facts, and visual place research.** Pick one surprising true story with a physical cause and effect (it should be visual), plus a simple everyday analogy that explains it.
   - Write the facts with their source at the top of `SCRIPT.md`.
   - Research the actual places, eras, architecture, vehicles, and props on Google/Wikipedia before touching 3D code. List the distinct visual sets needed (e.g. Set A: Historical era, Set B: Analogy stage, Set C: Modern era).
2. **Script** (~3.7 words/s, 55-70 s). Beat formula from the bridge short:
   - **Hook:** the absurd fact in one line ("Seventy-four soldiers knocked down an iron bridge just by walking across it.").
   - **Setting:** year, place, pride.
   - **Action:** escalation over three or four beats, each a little bigger.
   - **Snap:** the moment it breaks.
   - **Deadpan double line:** "Luckily ... / Unluckily ...".
   - **Explanation:** one physics/logic idea through an everyday analogy.
   - **Consequence:** the rule it created.
   - **Callback twist:** the ending.
   - Never describe on screen what the viewer already sees.
   - **Viral storytelling rules** (measured from a 65 s viral reference, see `references/storytelling-viral.md`):
     - Hook = a concrete visual oddity, then sharpen it ("...pink. And not just any pink.").
     - Narrate in **present tense**; past tense only for the hook.
     - Keep people anonymous ("a scientist", "the guards", "a bank clerk"). Names, dates and places go on props, not in the VO.
     - Concrete numbers everywhere (1 pint, 300 lb, 2 seconds). Plant ONE number/motif early and repeat it (15 minutes said 5x) so the twist pays it off.
     - One short in-character quip line (~1.5 s) in the first quarter.
     - Escalate by extreme contrast (biggest inmate vs skinniest guard).
     - Viewer-proxy beat after the surprise ("Wait, what?" / "Well, nobody can explain it.").
     - Turn with "Until one night..." (a mistake or accident reveals the truth). Use a rule-of-three countdown (15 sitting / 20 pacing / rip the bench).
     - "You see," explanation goes late (~80% of the runtime), 2-3 lines max.
     - End hard on the reversal. No outro, no CTA, so the last line loops into the hook.
     - Sentences average ~10 words, ~3.6 words/s.
3. **Voice.** Record or generate `voice.wav`, then make its word timings `words.json` (any speech-to-text with word times).
   - Put them in the project folder, e.g. `projects/<name>/voice/`.
   - Hand-fix the word timings. Everything is timed to words.json.
4. **Shot plan & Scene Staging** in `story.ts`: copy `templates/bridge/` to `src/videos/<name>/` for the shader/post/camera rig ONLY, register a new composition in `src/Root.tsx`, and replace the story/world/build/cast completely.
   - `SHOTS`: id, a/b frames, `set` (which isolated 3D zone is visible in this shot), light day/golden, crowd mode, `tau` story time.
   - **Shot-by-shot staging rule:** Every shot must have a dedicated stage, clear foreground/midground/background composition, and deliberate character choreography (never just 14 camera angles orbiting the same static patch of ground).
   - `XFADE`: crossfades at place/time changes.
   - `FLASH_AT`: a white flash after the hook.
   - `CAMS`: per-shot keys `{f, dur?, cut?, s: f => {pos, look, fov, roll}}`.
   - `KICKS`: impact flip-shakes.
   - `DOF`/`dofAt`: lens blur per beat.
   - `FOREGROUND`: near framing props.
   - Every visual reaction lands 0-3 frames before its word.
5. **World & Multi-Set Architecture (NO single-world clutter, NO primitive box-stacking for complex objects).**
   - **Multi-Set isolation (`world.ts`):** Never cram 1950s huts, analogy props, and modern skyscrapers onto one shared patch of ground where they bleed into each other's backgrounds. Place each era/location in its own spatially separated zone (e.g. `z = 0`, `z = 400`, `z = 800`) OR toggle group `.visible = (shot.set === 'era_a')` per shot so every background is 100% period-accurate and uncluttered.
   - **Asset sourcing:** download missing models/textures from the internet. Prefer CC0 (Kenney, Quaternius, Poly Haven textures/HDRIs, ambientCG). Poly Pizza items are often CC-BY 3.0: allowed, but log author + URL + licence in `projects/<name>/ASSETS.md` and mention credit in the post description. Never use unlicensed/NC assets. Keep a manifest (name, source URL, licence, local path).
   - **3D Kitbash over primitive boxes (`build.ts`):** Do NOT build cars, boats, cranes, temples, or detailed buildings out of raw `THREE.BoxGeometry` / `CylinderGeometry` — primitive box stacks look like cheap blocks. Download and use proper CC0 `.glb` kits (Kenney / Quaternius / Poly Pizza: vehicles, ships, city kits, modular buildings, furniture, nature) and recolour their materials through `shade.ts` (`toonMat` / `untone`) so they get the exact same 2-tone cel shade and `InkPass` outlines as the rest of the world. Reserve procedural geometry strictly for terrain, water, roads, walls, and simple architectural bases with HD painted textures (`paint.ts`).
   - `lights.ts`: LIGHTS plus the LOOK sky/river/cloud palette per light.
   - `shade.ts`: two-tone shading and `untone()`.
   - `paint.ts`: HD Canvas2D painted textures with seams painted in as dark tints.
   - `world.ts`: sky shader, fog = horizon colour, per-shot set visibility, per-frame posing, sun frozen per shot and camera-relative.
6. **Characters & Choreography.**
   - `toon.ts`: the Canvas2D `Pen` drawing API, 600x1000 design canvas, soles at y = 975, bean heads, stick limbs, plum variable-width outline, face library.
   - `cast.ts`: camera-facing billboards, crowds, effect cards, blinks, walk cycles. All billboards go on the `NOINK` layer.
   - **Blocking rule:** Characters must perform shot-specific actions (handing over a contract, bowing in a tatami room, pointing at a chart, carrying a prop) staged specifically for that shot's camera lens—never leave unrelated crowds standing idle in the background of another scene.
   - `cardshade.ts`: cards lit by the scene light, no emissive.
   - **Performance map (mandatory, written BEFORE coding `cast.ts`):** a table in `projects/<name>/BEATS.md`, one row per shot/beat: `frames | script line | set | camera | per-character: expression (Expr) + body mode + gesture/prop + eye-look + motion path | SFX`. Face, gesture and movement must match what the script says at that exact word (shock on the snap, nervous before the reveal, stern when refusing, smile_closed when pleased). No default-neutral idle faces. If `Expr` / `mode` / `Prop` lacks what a beat needs (bow, point, hand-over document, sign, sip tea, facepalm, slump, sweat drop), ADD it to `toon.ts` first. Reactions land 0-3 frames before their word; background characters react too (heads turn toward the speaker or event).
   - **Script ↔ environment match check:** before building, verify every sentence of the script has a believable place in its set, and every set prop is something the script or period research justifies. Mismatch = fix script or set, never ship.
7. **Post** (`Bridge.tsx` + `ink.ts` + `lensblur.ts` + `grade.ts`).
   - Composer order: ink → lens pre → lens main → bloom → NEUTRAL tone map → grade (MSAA 4).
   - Every pixel parameter scales with output height / 1920.
8. **Sound (NO MUSIC — Voice + SFX only)** (`audio/`: timeline.py, sfx_gen.py, sfx.py, dsp.py, mix.py).
   - Event table → synthesized SFX + room/outdoor ambience under the voice. **Never include background music.**
   - Output: mix.wav (48 kHz, exact length, −15 LUFS, −1.2 dBTP), stems and cues.md.
   - Lock the picture's time constants before the sound is made. Any later timing change means re-running the sound.
9. **Look checks.** Run `node scripts/bridge-stills.mjs out/<name>/x_ 100,400 0.5`.
   - Set `BRIDGE_ENTRY=src/sandboxes/<n>/index.tsx` to render a sandbox copy.
   - Make side-by-sides against reference frames with `python scripts/sbs_sheet.py out.jpg --ours ... --ref ...`.
   - Send them to an Opus max verifier: 1-3 images, a ≤200-word verdict.
10. **Final render.**
    - `npx remotion render src/index.ts <Comp> out/<name>/video.mp4 --codec h264 --crf 16 --scale 1.3333`
    - Mux with `-map 0:v:0 -map 1:a:0` (Remotion writes a silent audio track).
    - QA: `python scripts/short_qa.py final.mp4 out/<name>/qa shots.json` checks every frame for black, white, frozen and pop frames, plus loudness and sheets.
    - Fix anything it finds, then run a deep Opus audit.
11. **Deliver.** SendUserFile the final mp4, update memory, write notes.

## Final look values (bridge after 4 verifier rounds; all in `templates/bridge/`)
Start every new short from `templates/bridge/` (copy to `src/videos/<name>/`): the look lives in these values, the
story lives in story.ts / build.ts layout / cast.ts roles. Opus max scores at the end: colour day 7, golden 5-6,
lighting 5-6, ink 6, textures 5-6, characters 7, depth 6-7, composition 6-7 (from 5/3/4/5/4/7/4/6 at the start).
- **Light presets** (`lights.ts`, sun camera-relative and frozen per shot):
  - day: az 75 / el 48, lit [1.58,1.5,1.33], shade [.30,.29,.36], lift [.05,.06,.11] (cool tint ONLY in shade), sky
    top #3e7fd2 → horizon #b8d0ec, fog = horizon, 25→300 m, uSat 1.08, ~15 % blue haze past 60 m.
  - golden: az 6 / el 7 (backlit low sun), key toward #FFB36B ×1.5, violet-blue shade (facade ≈ #444380), sky
    #ffc47c → #8a6f8a, peach fog only past 50 m, sun disc #ffcf9e + bloom, contact blobs + real card shadows.
- **Albedos** (`paint.ts`/`build.ts`): muted brick / cream / ochre / terracotta houses with plinth, cornice, sills,
  hoods, door step, chimney + pot, heights 7 / 8.4 / 9.8 m; warm grey/beige stone (saturation −35 % from "storybook");
  ochre wood deck C* ~51-58 with near-black seams; iron dark and desaturated. Never lemon, never lavender lit faces.
- **Ink** (`ink.ts`): #030303, 5.1 px near (6 m) → 3.3 px far (90 m) at 1080x1920, creases ×0.8 from 35°, depth
  jumps from 1 %, fog tint 0.3 only far; character cards on layer `NOINK` (they carry their own plum ink).
- **Lens** (`lensblur.ts` + `dofAt` in story.ts): cInf px at 1080: hook/river CU 15-16, close-ups 12-14, MS 10-12,
  park 7, golden sway 5, wides/aerials 0. Focus on the eyes of the front row.
- **Post** (`Bridge.tsx`): ink → lens pre → lens main → bloom (thr 1.0, int .5, 6 levels, radius .6) → NEUTRAL tone
  map → grade; MSAA 4. Film grain exists but is OFF (reference measures no grain; it quadruples the file size).
- **Characters** (`toon.ts`/`cast.ts`/`cardshade.ts`): bean heads h/w .94, plum ink #241726, eyes .26 W apart, no blush,
  14 expressions; adults 3.5 head-heights; walk bob 5 %, lean 1-7°, planted 0.8 m stride; blinks 0.5-2.3 s; tight
  contact shadow ~.5 under the feet + sun-direction tail by day; golden rim inner only (never an offset outer copy).
- **Camera** (`story.ts`): cuts on big jumps, smootherstep glides 18-40 f, every hold creeps (no static hold ≥4 f),
  flip kicks decaying over 7 f on impacts, 4-4.6° rolls, foreground props (`FOREGROUND`) in ~1/3 of shots.

## Look targets (measured from the reference; see references/reports/)
- **Ink:**
  - World lines: about 3 px at 1080 wide, near-black #0b0a0c, nearly constant with distance. Silhouettes, depth jumps and normal creases only. No line on wall/floor joins or the horizon. Character cards are never outlined by the world ink.
  - Character ink: dark plum #201628-#2f1d28, thicker on the bottom/shadow side.
- **Colour:**
  - Day median luma ~.57. Non-ink p5 ~.23 (no crushed blacks). Lit chroma C* p90 ~55. Day sky top ~#5e93d9, horizon 1.28x brighter.
  - Golden: peach horizon #ffd08a, violet-blue shadows (never brown), backlit sun.
- **Depth:**
  - DOF on about 1/3 of screen time (CU, MS, inserts), cInf 10-16 px at 1080, focus on the eyes. Establishing and wide shots stay sharp.
  - Fog = horizon colour, 25→420 m day, 20→360 m golden.
  - Bloom only on HDR emissives: threshold 1.0.
- **Camera:**
  - Hard cuts on big jumps. Everything else is a smootherstep glide of 18-40 f, peak ≤ 25 px/f at 720p.
  - Every hold pushes in 0.15-0.35 %/f, with 0.6 %/f on punch words.
  - Rolls of 4-5°.
  - No hand-held float. Impact shakes flip sign every frame and decay over 7 f.
- **Characters:**
  - About 3.5 head-heights tall, legs 1.4 HH.
  - Stick limbs about 0.055 of head width, ink-dot hands.
  - Bean head (h/w ~0.93, narrower chin, pointier crown).
  - No blush or eye highlights. Faces at brightness ~.93.
  - Walk bob 3-7 %, lean 1-7°, planted feet.
  - Blinks every 0.5-2.3 s, lasting 4 f.

## Look-match loop (how the bridge look was reached; reuse for any "make it look like X" pass)
1. **Measure the reference first.** One analysis agent per topic (motion, depth, textures, characters, lighting, outlines, grade), each writing numbers, not adjectives, to `references/reports/<topic>.md`. Shared brief: `compare/CONTEXT.md`. Reports are the source of truth for every agent after.
2. **Sandboxes, one owner per file.** Copy the project folder to `src/videos/<name>_{cam,world,mat,char,post}` with entries `src/sandboxes/<n>/index.tsx` (same `index.tsx` as main, only the import path changed). Ownership used for the bridge:
   - cam: story.ts (camera keys, cuts, kicks, DOF table, foreground props)
   - world: world.ts, lights.ts, shade.ts, grade.ts (sun, sky, fog, river, colour, grade)
   - mat: paint.ts, build.ts (painted textures, buildings, props)
   - char: toon.ts, cast.ts, cardshade.ts (character drawing, posing, card lighting, fx cards)
   - post: ink.ts, Bridge.tsx, lensblur.ts (outline pass, composer, lens blur, bloom)
   Agents only edit their own files in their own sandbox and render stills with `BRIDGE_ENTRY=src/sandboxes/<n>/index.tsx node scripts/bridge-stills.mjs out/<name>/<n>/x_ <frames> 0.5`.
3. **Merge** with `python scripts/bridge_merge.py [cam,world,mat,char,post]` (backs main up to `backup/bridge_<time>/`, copies owned files only). Then `npx tsc --noEmit` (filter to the project folder), then **re-sync every sandbox from main** (`cp -f src/videos/<name>/* src/videos/<name>_<n>/`) before the next round.
4. **Verify** with a fresh Opus max agent: side-by-side sheets (`python scripts/sbs_sheet.py out.jpg --ours a b --ref r1 r2`), score each area out of 10 (colour day / golden, lighting, ink, textures, characters, depth, composition) plus a numbered fix list with frame numbers. Map each fix to the file owner and resume that owner's agent with SendMessage (keeps its context). Bridge scores: round 1 5/3/4/5/4/7/4/6 → round 2 5/4/5/6/4/7/6/6 → round 3 see notes.
5. Contracts between owners live in exported constants (e.g. `NOINK` layer from ink.ts, `dofAt`/`FOREGROUND` from story.ts, `LIGHTS`/`LOOK` from lights.ts). Changing a contract means telling every owner that reads it.

## Gotchas
- Kenney nature-kit materials are teal: recolour them by material name in build.ts.
- Cameras end up inside houses: the sight-line culler in build.ts/world.ts removes anything blocking any camera ray.
- Ink in the same merged effect pass as DOF gets overwritten. Ink must be its own pass before the blur.
- Pixel-sized post parameters must scale with resolution: stills are at 0.5, the final at 1.333. R3F clamps dpr to ≥ 1, so `--scale 0.5` stills still render a 1080x1920 buffer.
- **Disk:** every Remotion bundle copies `public/` (~1.3 GB) into `the temp folder\remotion-webpack-bundle-*` and never deletes it. 60+ GB filled the system drive during the bridge passes and a render died with ENOSPC. Always render with `export TEMP='<big drive>/remotion-tmp' TMP='<big drive>/remotion-tmp'` (bridge-stills.mjs sets it itself) and ask the user before deleting old bundle folders in the shared the temp folder (auto mode blocks the sweep). <big drive>/remotion-tmp fills too (~500 folders / 110 GB after the 4 bridge rounds): when a project is finished and nothing is rendering, delete its `remotion-webpack-bundle-*` and `puppeteer_dev_chrome_profile-*` folders there.
- In JS strings write `"<big drive>/remotion-tmp"`, never `"<big drive>\remotion-tmp"` (`\r` becomes a carriage return).
- Remotion writes a silent audio track: mux with `-map 0:v:0 -map 1:a:0`.
- Sub-agents can't write report files in this harness: ask them for a ≤150-word final message and save it yourself to `out/<name>/<n>/REPORT.md`.
- Scratch `.ts` files inside `out/` break `tsc`: name them `.txt`.
- 2K renders run ~4 fps (≈10 min for 67 s). Stills at 0.5 take 3-8 s each after a ~40 s bundle.
- Film grain at 2.5 % made the 2K file 910 MB instead of ~250 MB and will turn to mush on YouTube; the reference has none. Keep it off.

## Readability traps the verifier caught (check every new prop/shot for these)
- **A swing drawn as one rope that disappears behind the kid reads as a HANGING.** Always two ropes to a wide plank
  with the kid between them (`swingKid` in toon.ts), and a frame whose legs clear the arc (A-frame at each end).
- Props or flotsam closer than ~2 m to a lens become huge cut-off blobs at the frame edge. When a camera moves, re-check
  every prop near its new position (the river cameras moved into the floating hats).
- A foreground bush cut by the frame edge reads as a "green ball"; a foreground prop must be recognisable or gone.
- Flags: red + yellow star/diamond reads as Vietnam's. Use a period-correct flag (St George's cross for England 1831).
- Painted signs lit by a side sun go grey-blue and unreadable: give the sign face an unlit material.
- Golden rim light done as an offset outer copy turns every hat into a picture frame: inner rim only, head/torso only.
- Balcony/railing rails at chest height through characters: put the lens ~2.5 m up so rails cross legs, not torsos.
- Flat holds read as freezes in QA (frozen span ≥12 f): every hold needs a creeping push-in.
