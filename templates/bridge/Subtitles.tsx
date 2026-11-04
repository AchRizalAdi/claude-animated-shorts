// Burned-in subtitles. Style from user's reference (Ricks Clips "Grave Bell" frame):
// lowercase heavy geometric sans (Montserrat ExtraBold), white fill, black outside stroke,
// hard black drop shadow (no blur), no box, centre x, y-centre ~74 % of frame height.
// 1-2 words per chunk, chunk shown from its first word's start until the next chunk starts.
import React, { useMemo } from "react";
import { AbsoluteFill, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

export type Word = { w: string; s: number; e: number };

const MAX_WORDS = 2, MAX_CHARS = 16, GAP = 0.35;

export const chunkWords = (words: Word[]) => {
  const out: { text: string; s: number; e: number }[] = [];
  let cur: Word[] = [];
  const flush = () => {
    if (!cur.length) return;
    out.push({ text: cur.map((x) => x.w).join(" ").toLowerCase().replace(/[.,!?;:"]+$/g, (m) => (/[?!]/.test(m) ? m[0] : "")), s: cur[0].s, e: cur[cur.length - 1].e });
    cur = [];
  };
  words.forEach((w, i) => {
    const prev = cur[cur.length - 1];
    const joined = [...cur, w].map((x) => x.w).join(" ");
    if (cur.length >= MAX_WORDS || joined.length > MAX_CHARS || (prev && w.s - prev.e > GAP)) flush();
    cur.push(w);
    if (/[.?!,;:]$/.test(w.w)) flush();
  });
  flush();
  return out;
};

const FONT = "SubFont";
const css = `@font-face{font-family:${FONT};src:url(${staticFile("fonts/Montserrat-ExtraBold.ttf")});font-weight:200 900;}`;

export const Subtitles: React.FC<{ words: Word[]; yPct?: number; size?: number }> = ({ words, yPct = 74, size = 84 }) => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const chunks = useMemo(() => chunkWords(words), [words]);
  const t = frame / fps;
  let idx = -1;
  for (let i = 0; i < chunks.length; i++) if (chunks[i].s <= t + 0.02) idx = i; else break;
  if (idx < 0) return null;
  const c = chunks[idx];
  // hide after speech ends + 0.25 s so silence has no stale text
  if (t > c.e + 0.25) return null;
  const k = height / 1920;
  const fs = size * k, sw = fs * 0.2;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <style>{css}</style>
      <div
        style={{
          position: "absolute", left: 0, right: 0, top: `${yPct}%`, transform: "translateY(-50%)", textAlign: "center",
          fontFamily: `${FONT}, Montserrat, Arial Black, sans-serif`, fontWeight: 800, fontSize: fs, lineHeight: 1.05, letterSpacing: "-0.01em",
          color: "#fff", WebkitTextStroke: `${sw}px #000`, paintOrder: "stroke fill", strokeLinejoin: "round",
          textShadow: `${fs * 0.035}px ${fs * 0.045}px 0 #000`,
        } as React.CSSProperties}
      >
        {c.text}
      </div>
    </AbsoluteFill>
  );
};
