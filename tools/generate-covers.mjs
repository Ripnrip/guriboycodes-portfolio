#!/usr/bin/env node
/**
 * generate-covers.mjs — deterministic generative SVG covers for the portfolio.
 *
 * Emits 15 covers to assets/covers/bundles/<id>.svg (viewBox 0 0 1200 800).
 * Same bundle id -> same art, forever (seeded PRNG, no Date, no Math.random).
 *
 * Visual language (matches the site + flagship jpg covers):
 *   deep near-black ground, one luminous focal structure, quiet generative
 *   field behind it, layered opacity for depth, soft bloom, film grain.
 *
 * Run:  node tools/generate-covers.mjs
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "assets", "covers", "bundles");

const W = 1200, H = 800;

/* ---------------------------------------------------------------- palette */
const BG = "#07090c";
const BG2 = "#0b0f14";
const INK = "#e7ecf3";
const C = {
  cyan: "#7cd4ff",
  teal: "#5fe3c8",
  violet: "#b39bff",
  amber: "#f5c46b",
  emerald: "#8fd6c4",
  rose: "#ff9ec8",
};

/* ------------------------------------------------------------------- prng */
function xmur3(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rngFor = (id) => mulberry32(xmur3("guri-cover:" + id)());
const rr = (R, a, b) => a + (b - a) * R();
const ri = (R, a, b) => Math.floor(rr(R, a, b + 1));
const pick = (R, arr) => arr[Math.floor(R() * arr.length) % arr.length];

/* ------------------------------------------------------------------ maths */
const f = (n) => {
  const v = Math.round(n * 100) / 100;
  return Object.is(v, -0) ? "0" : String(v);
};
const lerp = (a, b, t) => a + (b - a) * t;
const TAU = Math.PI * 2;

function hexRgb(h) {
  h = h.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function mix(a, b, t) {
  const A = hexRgb(a), B = hexRgb(b);
  return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join("");
}

/* Catmull-Rom -> cubic bezier path (smooth line through points). */
function crPath(pts) {
  if (pts.length < 2) return "";
  let d = `M${f(pts[0].x)} ${f(pts[0].y)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
    d += `C${f(p1.x + (p2.x - p0.x) / 6)} ${f(p1.y + (p2.y - p0.y) / 6)} ${f(p2.x - (p3.x - p1.x) / 6)} ${f(p2.y - (p3.y - p1.y) / 6)} ${f(p2.x)} ${f(p2.y)}`;
  }
  return d;
}
/* Dense sample of the same spline, for placing things along it. */
function crSample(pts, per = 22) {
  const out = [];
  const P = (i) => pts[Math.max(0, Math.min(pts.length - 1, i))];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
    for (let j = 0; j < per; j++) {
      const t = j / per, t2 = t * t, t3 = t2 * t;
      out.push({
        x: 0.5 * (2 * p1.x + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
        y: 0.5 * (2 * p1.y + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
      });
    }
  }
  out.push({ x: pts[pts.length - 1].x, y: pts[pts.length - 1].y });
  return out;
}
function alongArc(samples, t) {
  // arc-length parameterised lookup
  let total = 0;
  const acc = [0];
  for (let i = 1; i < samples.length; i++) {
    total += Math.hypot(samples[i].x - samples[i - 1].x, samples[i].y - samples[i - 1].y);
    acc.push(total);
  }
  const target = t * total;
  for (let i = 1; i < acc.length; i++) {
    if (acc[i] >= target) {
      const u = (target - acc[i - 1]) / (acc[i] - acc[i - 1] || 1);
      return {
        x: lerp(samples[i - 1].x, samples[i].x, u),
        y: lerp(samples[i - 1].y, samples[i].y, u),
      };
    }
  }
  return samples[samples.length - 1];
}
function orbPt(cx, cy, rx, ry, rotDeg, th) {
  const c = Math.cos(th) * rx, s = Math.sin(th) * ry, a = (rotDeg * Math.PI) / 180;
  return { x: cx + c * Math.cos(a) - s * Math.sin(a), y: cy + c * Math.sin(a) + s * Math.cos(a) };
}

/* -------------------------------------------------------- drawing helpers */
/* Luminous stroke: wide blurred pass + hot thin core. */
function glowStroke(id, d, color, { w = 1.3, gw = 7, gop = 0.32, cop = 0.92, hot = 0.55, blur = "bm", cap = "round" } = {}) {
  return (
    `<path d="${d}" fill="none" stroke="${color}" stroke-width="${f(gw)}" stroke-linecap="${cap}" stroke-linejoin="round" opacity="${f(gop)}" filter="url(#${id}-${blur})"/>` +
    `<path d="${d}" fill="none" stroke="${mix(color, "#ffffff", hot)}" stroke-width="${f(w)}" stroke-linecap="${cap}" stroke-linejoin="round" opacity="${f(cop)}"/>`
  );
}
function glowDot(id, x, y, r, color, k = 1, hot = 0.62) {
  return (
    `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r * 3.2)}" fill="${color}" opacity="${f(Math.min(0.55, 0.3 * k))}" filter="url(#${id}-bm)"/>` +
    `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${mix(color, "#ffffff", hot)}" opacity="${f(Math.min(1, 0.92 * k))}"/>`
  );
}
function haze(id, x, y, rx, ry, color, op, blur = "bx") {
  return `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(ry)}" fill="${color}" opacity="${f(op)}" filter="url(#${id}-${blur})"/>`;
}
function line(x1, y1, x2, y2, color, op, w = 1, extra = "") {
  return `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${color}" stroke-width="${f(w)}" opacity="${f(op)}" stroke-linecap="round" ${extra}/>`;
}
function circle(x, y, r, color, op, w = 1, fill = false) {
  return fill
    ? `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${color}" opacity="${f(op)}"/>`
    : `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="none" stroke="${color}" stroke-width="${f(w)}" opacity="${f(op)}"/>`;
}
function roundRectPath(x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  return `M${f(x + r)} ${f(y)}H${f(x + w - r)}A${f(r)} ${f(r)} 0 0 1 ${f(x + w)} ${f(y + r)}V${f(y + h - r)}A${f(r)} ${f(r)} 0 0 1 ${f(x + w - r)} ${f(y + h)}H${f(x + r)}A${f(r)} ${f(r)} 0 0 1 ${f(x)} ${f(y + h - r)}V${f(y + r)}A${f(r)} ${f(r)} 0 0 1 ${f(x + r)} ${f(y)}Z`;
}

/* ------------------------------------------------------- shared scaffold */
function scaffold(id, A, S, R, buildArt) {
  const defs = [];
  const parts = [];

  // background — deep near-black with a whisper of the accent in the low end
  const bgLow = mix(BG2, A, 0.04);
  defs.push(
    `<linearGradient id="${id}-bg" x1="0" y1="0" x2="0.55" y2="1">` +
      `<stop offset="0" stop-color="${BG}"/><stop offset="0.55" stop-color="${mix(BG, BG2, 0.6)}"/><stop offset="1" stop-color="${bgLow}"/>` +
    `</linearGradient>`,
    `<radialGradient id="${id}-vg" cx="0.5" cy="0.44" r="0.85">` +
      `<stop offset="0.5" stop-color="#020407" stop-opacity="0"/>` +
      `<stop offset="0.82" stop-color="#020407" stop-opacity="0.28"/>` +
      `<stop offset="1" stop-color="#020407" stop-opacity="0.66"/>` +
    `</radialGradient>`,
    `<filter id="${id}-bs" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2.2"/></filter>`,
    `<filter id="${id}-bm" x="-120%" y="-120%" width="340%" height="340%"><feGaussianBlur stdDeviation="7"/></filter>`,
    `<filter id="${id}-bl" x="-160%" y="-160%" width="420%" height="420%"><feGaussianBlur stdDeviation="18"/></filter>`,
    `<filter id="${id}-bx" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="38"/></filter>`,
    `<filter id="${id}-grain" x="0" y="0" width="100%" height="100%">` +
      `<feTurbulence type="fractalNoise" baseFrequency="${f(rr(R, 0.72, 0.98))}" numOctaves="2" seed="${ri(R, 1, 900)}" stitchTiles="stitch"/>` +
      `<feColorMatrix type="matrix" values="0 0 0 0 0.86  0 0 0 0 0.9  0 0 0 0 0.98  0 0 0 0.055 0"/>` +
    `</filter>`
  );

  parts.push(`<rect width="${W}" height="${H}" fill="url(#${id}-bg)"/>`);

  // nebula haze — big soft blobs, accent + support + dark depth pockets
  const neb = [];
  neb.push(haze(id, rr(R, 220, 980), rr(R, 90, 330), rr(R, 260, 420), rr(R, 150, 240), A, rr(R, 0.065, 0.105)));
  neb.push(haze(id, rr(R, 150, 1050), rr(R, 380, 700), rr(R, 240, 400), rr(R, 140, 220), S, rr(R, 0.05, 0.08)));
  neb.push(haze(id, rr(R, -60, 260), rr(R, 560, 820), rr(R, 300, 460), rr(R, 180, 260), "#04060a", rr(R, 0.4, 0.6)));
  neb.push(haze(id, rr(R, 940, 1260), rr(R, -40, 220), rr(R, 280, 430), rr(R, 170, 250), "#04060a", rr(R, 0.35, 0.55)));
  parts.push(`<g>${neb.join("")}</g>`);

  // dust field — sparse starlike motes, mostly ink, a few accent
  const dust = [];
  const n = ri(R, 85, 120);
  for (let i = 0; i < n; i++) {
    const x = rr(R, 30, W - 30), y = rr(R, 26, H - 40);
    const r = rr(R, 0.4, 1.5);
    const acc = R() < 0.18;
    const col = acc ? (R() < 0.5 ? A : S) : mix(INK, BG2, rr(R, 0, 0.35));
    const op = acc ? rr(R, 0.2, 0.5) : rr(R, 0.05, 0.28);
    dust.push(`<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${col}" opacity="${f(op)}"/>`);
    if (acc && R() < 0.25) dust.push(`<circle cx="${f(x)}" cy="${f(y)}" r="${f(r * 3)}" fill="${col}" opacity="0.1" filter="url(#${id}-bs)"/>`);
  }
  parts.push(`<g>${dust.join("")}</g>`);

  // motif art
  parts.push(buildArt({ id, A, S, R, defs }));

  // vignette + grounding shade + grain
  parts.push(`<rect width="${W}" height="${H}" fill="url(#${id}-vg)"/>`);
  parts.push(`<rect width="${W}" height="${H}" filter="url(#${id}-grain)"/>`);

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">` +
    `<defs>${defs.join("")}</defs>${parts.join("")}</svg>`
  );
}

/* ================================================================ builders */

/* 1. maia — winding path of nodes converging into one bright doorway */
function artMaia({ id, A, S, R, defs }) {
  const o = [];
  const door = { x: 856, y: 396, w: 88, h: 156, r: 16 };

  defs.push(
    `<radialGradient id="${id}-doorCore" cx="0.5" cy="0.42" r="0.75">` +
      `<stop offset="0" stop-color="${mix(A, "#ffffff", 0.82)}" stop-opacity="0.95"/>` +
      `<stop offset="0.45" stop-color="${mix(A, "#ffffff", 0.3)}" stop-opacity="0.5"/>` +
      `<stop offset="1" stop-color="${A}" stop-opacity="0.05"/>` +
    `</radialGradient>`
  );

  // ambient bloom around the doorway
  o.push(haze(id, door.x + door.w / 2, door.y + door.h / 2, 210, 250, A, 0.13));
  o.push(haze(id, door.x + door.w / 2, door.y + door.h / 2, 90, 120, A, 0.17, "bl"));
  // signal rings radiating from the doorway across the dark (going live)
  for (let i = 0; i < 4; i++) {
    o.push(circle(door.x + door.w / 2, door.y + door.h / 2, 265 + i * 138, A, 0.058 - i * 0.011, 0.9));
  }

  // winding path — meander damping as it approaches the door
  const anchors = [];
  const na = 8;
  for (let i = 0; i < na; i++) {
    const t = i / (na - 1);
    const x = lerp(96, door.x + door.w / 2, Math.pow(t, 0.92));
    const amp = lerp(150, 8, Math.pow(t, 0.8));
    const y = lerp(668, door.y + door.h - 6, Math.pow(t, 1.1)) + Math.sin(t * Math.PI * 2.3 + 0.6) * amp * 0.55 + rr(R, -amp * 0.35, amp * 0.35);
    anchors.push({ x, y });
  }
  anchors[na - 1] = { x: door.x + door.w / 2, y: door.y + door.h - 4 };
  const dPath = crPath(anchors);
  const samples = crSample(anchors, 26);

  // trail echoes (violet, very quiet), then main trail
  o.push(`<path d="${dPath}" transform="translate(0 7)" fill="none" stroke="${S}" stroke-width="1" opacity="0.06"/>`);
  o.push(`<path d="${dPath}" fill="none" stroke="${mix(S, A, 0.4)}" stroke-width="1.2" opacity="0.22"/>`);
  o.push(`<path d="${dPath}" fill="none" stroke="${A}" stroke-width="4" opacity="0.09" filter="url(#${id}-bm)"/>`);

  // nodes converge — density and light increase toward the door
  const nn = 13;
  for (let i = 0; i < nn; i++) {
    const u = i / (nn - 1);
    const t = 1 - Math.pow(1 - u, 1.55);
    const p = alongArc(samples, t * 0.985);
    const rad = lerp(6.2, 2.4, u) + rr(R, -0.5, 0.5);
    const col = mix(S, A, Math.pow(u, 0.7));
    o.push(glowDot(id, p.x, p.y, rad, col, lerp(0.5, 1.2, u), lerp(0.22, 0.5, u)));
    if (i % 3 === 1 && u < 0.85) o.push(circle(p.x, p.y, rad + 4.5, col, 0.22, 0.8));
  }

  // stray cold-start candidates — faded, off the path
  for (let i = 0; i < 4; i++) {
    const p = alongArc(samples, rr(R, 0.03, 0.4));
    o.push(circle(p.x + rr(R, -60, 60), p.y + rr(R, -70, 50), rr(R, 1.6, 2.8), S, rr(R, 0.1, 0.18), 1, true));
  }

  // doorway — the one bright destination
  const dp = roundRectPath(door.x, door.y, door.w, door.h, door.r);
  o.push(`<path d="${dp}" fill="url(#${id}-doorCore)"/>`);
  o.push(glowStroke(id, dp, A, { w: 1.5, gw: 9, gop: 0.4, cop: 0.95, hot: 0.6 }));
  o.push(circle(door.x + door.w / 2, door.y + door.h / 2, 0, A, 0));
  // light pooling at the threshold
  o.push(haze(id, door.x + door.w / 2, door.y + door.h + 14, 84, 18, A, 0.24, "bl"));
  o.push(`<ellipse cx="${f(door.x + door.w / 2)}" cy="${f(door.y + door.h + 9)}" rx="52" ry="6" fill="${mix(A, "#ffffff", 0.35)}" opacity="0.16" filter="url(#${id}-bs)"/>`);
  // faint aura rings around the doorway
  for (let i = 0; i < 3; i++) {
    o.push(`<ellipse cx="${f(door.x + door.w / 2)}" cy="${f(door.y + door.h / 2)}" rx="${f(105 + i * 44)}" ry="${f(128 + i * 50)}" fill="none" stroke="${A}" stroke-width="0.8" opacity="${f(0.1 - i * 0.03)}"/>`);
  }
  return `<g>${o.join("")}</g>`;
}

/* 2. darwin — branching evolutionary tree; pruned branches fade, one blooms */
function artDarwin({ id, A, S, R }) {
  const o = [];
  const dim = [];
  const bright = [];
  let bloomTip = null;

  const brightJoints = [];
  const targetAng = -56; // the surviving lineage leans up-right
  function branch(x, y, ang, len, depth, isBright) {
    const rad = (ang * Math.PI) / 180;
    const ex = x + Math.cos(rad) * len;
    const ey = y + Math.sin(rad) * len;
    const bend = rr(R, -0.18, 0.18) * len;
    const mx = (x + ex) / 2 - Math.sin(rad) * bend;
    const my = (y + ey) / 2 + Math.cos(rad) * bend;
    const t = depth / 6;

    if (isBright) {
      brightJoints.push({ x, y });
    } else {
      dim.push(`<path d="M${f(x)} ${f(y)}Q${f(mx)} ${f(my)} ${f(ex)} ${f(ey)}" fill="none" stroke="${mix("#9aa7b8", S, 0.5)}" stroke-width="${f(lerp(3.2, 0.8, t))}" stroke-linecap="round" opacity="${f(lerp(0.34, 0.13, t))}"/>`);
    }

    if (depth >= 6) {
      if (isBright) { brightJoints.push({ x: ex, y: ey }); bloomTip = { x: ex, y: ey }; }
      else if (R() < 0.4) dim.push(circle(ex, ey, rr(R, 1, 1.8), S, 0.2, 1, true));
      return;
    }
    const kids = depth < 2 ? 2 : R() < 0.55 ? 2 : 3;
    // pick which child continues the bright lineage: nearest to target direction
    const angles = [];
    for (let k = 0; k < kids; k++) {
      const spread = lerp(40, 25, t);
      angles.push(ang + (k - (kids - 1) / 2) * spread * rr(R, 0.75, 1.1) + rr(R, -9, 9));
    }
    let bIdx = -1;
    if (isBright) {
      let best = 1e9;
      angles.forEach((a2, k) => {
        const dd = Math.abs(a2 - targetAng);
        if (dd < best) { best = dd; bIdx = k; }
      });
    }
    for (let k = 0; k < kids; k++) {
      const childBright = isBright && k === bIdx;
      // prune some dim branches — they end early as faded stubs
      if (!childBright && depth >= 2 && R() < 0.22) {
        const pr = (angles[k] * Math.PI) / 180;
        const pl = len * 0.42;
        const px = ex + Math.cos(pr) * pl, py = ey + Math.sin(pr) * pl;
        dim.push(`<path d="M${f(ex)} ${f(ey)}L${f(px)} ${f(py)}" fill="none" stroke="${S}" stroke-width="0.8" stroke-linecap="round" opacity="0.11"/>`);
        dim.push(circle(px, py, 2.2, S, 0.18, 0.8));
        continue;
      }
      branch(ex, ey, angles[k], len * rr(R, 0.7, 0.79), depth + 1, childBright);
    }
  }

  branch(436, 794, -90 + rr(R, -4, 4), 152, 0, true);

  // ground whisper
  o.push(`<path d="M40 726Q600 668 1160 730" fill="none" stroke="${INK}" stroke-width="1" opacity="0.06"/>`);
  o.push(haze(id, 450, 758, 280, 64, S, 0.06, "bl"));
  for (let k = 0; k < 6; k++) {
    o.push(circle(436 + rr(R, -170, 200), rr(R, 690, 740), rr(R, 0.6, 1.4), A, rr(R, 0.08, 0.2), 1, true));
  }

  o.push(`<g>${dim.join("")}</g>`);

  // the golden lineage — one smooth luminous path root -> bloom
  if (brightJoints.length > 1) {
    const bd = crPath(brightJoints);
    bright.push(glowStroke(id, bd, A, { w: 2, gw: 9, gop: 0.3, cop: 0.85, hot: 0.38 }));
    for (const bi of [2, 4]) {
      if (brightJoints[bi]) bright.push(glowDot(id, brightJoints[bi].x, brightJoints[bi].y, 2, A, 0.55, 0.4));
    }
  }
  o.push(`<g>${bright.join("")}</g>`);

  // the bloom — one surviving branch flowers
  if (bloomTip) {
    const { x, y } = bloomTip;
    o.push(haze(id, x, y, 150, 132, A, 0.16));
    o.push(haze(id, x, y, 60, 54, A, 0.28, "bl"));
    const petals = 10;
    for (let k = 0; k < petals; k++) {
      const a = (k / petals) * 360 + rr(R, -6, 6);
      o.push(
        `<ellipse cx="${f(x)}" cy="${f(y)}" rx="18" ry="5.2" transform="rotate(${f(a)} ${f(x)} ${f(y)})" ` +
        `fill="${mix(A, "#ffffff", 0.32)}" opacity="0.5" filter="url(#${id}-bs)"/>`
      );
    }
    o.push(glowDot(id, x, y, 7, A, 1.6));
    o.push(circle(x, y, 25, mix(A, "#ffffff", 0.3), 0.32, 0.9));
    for (let k = 0; k < 11; k++) {
      const a = rr(R, 0, TAU), r2 = rr(R, 28, 72);
      o.push(circle(x + Math.cos(a) * r2, y + Math.sin(a) * r2 * 0.85, rr(R, 0.7, 2), A, rr(R, 0.25, 0.6), 1, true));
    }
  }
  return `<g>${o.join("")}</g>`;
}

/* 3. vireo — flight-recorder trace: layered telemetry waveforms + span bars */
function artVireo({ id, A, S, R, defs }) {
  const o = [];
  const x0 = 96, x1 = 1104;
  const lanes = [176, 266, 356, 460, 552, 642].map((y) => y + rr(R, -8, 8));
  const focal = 2;
  const spikeX = 656;

  function wave(y0, amp, spike = 0) {
    const pts = [];
    const f1 = rr(R, 0.008, 0.014), f2 = rr(R, 0.02, 0.035), f3 = rr(R, 0.05, 0.08);
    const p1 = rr(R, 0, TAU), p2 = rr(R, 0, TAU), p3 = rr(R, 0, TAU);
    for (let x = x0; x <= x1; x += 16) {
      let y = y0 + Math.sin(x * f1 + p1) * amp * 0.6 + Math.sin(x * f2 + p2) * amp * 0.3 + Math.sin(x * f3 + p3) * amp * 0.16;
      if (spike) y -= spike * Math.exp(-Math.pow((x - spikeX) / 30, 2));
      pts.push({ x, y });
    }
    return pts;
  }

  // span bars behind everything (sparse, on a few lanes)
  for (const li of [1, 3, 5]) {
    let x = x0 + rr(R, 0, 120);
    while (x < x1 - 60) {
      const len = rr(R, 42, 150);
      const col = R() < 0.55 ? A : S;
      o.push(`<rect x="${f(x)}" y="${f(lanes[li] - 5)}" width="${f(len)}" height="10" rx="5" fill="${col}" opacity="${f(rr(R, 0.09, 0.18))}"/>`);
      if (R() < 0.3) o.push(glowDot(id, x + 4, lanes[li], 1.6, col, 0.55, 0.35));
      x += len + rr(R, 30, 130);
    }
  }

  // quiet waveform lanes
  lanes.forEach((y, i) => {
    if (i === focal) return;
    const amp = rr(R, 7, 17);
    const col = i % 2 ? S : mix(A, INK, 0.15);
    o.push(`<path d="${crPath(wave(y, amp))}" fill="none" stroke="${col}" stroke-width="1" opacity="${f(rr(R, 0.14, 0.22))}"/>`);
    o.push(line(74, y, 88, y, INK, 0.16, 1));
  });

  // playhead
  o.push(line(spikeX, 132, spikeX, 690, S, 0.13, 1, `stroke-dasharray="2 7"`));

  // focal lane — bright trace with an event spike
  const fy = lanes[focal];
  const fpts = wave(fy, 22, 92);
  o.push(haze(id, spikeX, fy - 50, 190, 100, A, 0.12));
  o.push(glowStroke(id, crPath(fpts), A, { w: 1.6, gw: 9, gop: 0.44, cop: 0.92, hot: 0.36 }));
  o.push(line(74, fy, 88, fy, A, 0.4, 1.4));
  // spike apex dot
  let apex = fpts[0];
  for (const p of fpts) if (p.y < apex.y) apex = p;
  o.push(glowDot(id, apex.x, apex.y, 4.2, A, 1.4));
  o.push(circle(apex.x, apex.y, 10, A, 0.25, 0.9));
  // small data motes drifting near the focal lane
  for (let i = 0; i < 8; i++) {
    o.push(circle(rr(R, 150, 1050), fy + rr(R, -46, 40), rr(R, 0.8, 1.6), A, rr(R, 0.15, 0.4), 1, true));
  }
  return `<g>${o.join("")}</g>`;
}

/* 4. agent0 — agent loop: concentric orbits, a single spark traveling them */
function artAgent0({ id, A, S, R }) {
  const o = [];
  const cx = 566, cy = 404;
  const orbits = [
    { rx: 122, rot: -9 + rr(R, -3, 3) },
    { rx: 189, rot: -7 + rr(R, -3, 3) },
    { rx: 262, rot: -10 + rr(R, -3, 3) },
    { rx: 342, rot: -6 + rr(R, -3, 3) },
  ].map((ob) => ({ ...ob, ry: ob.rx * 0.6 }));

  o.push(haze(id, cx, cy, 200, 130, A, 0.07));

  orbits.forEach((ob, i) => {
    o.push(
      `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(ob.rx)}" ry="${f(ob.ry)}" transform="rotate(${f(ob.rot)} ${f(cx)} ${f(cy)})" ` +
      `fill="none" stroke="${mix("#7f93a6", A, 0.35)}" stroke-width="1" opacity="${f([0.22, 0.17, 0.2, 0.1][i])}"/>`
    );
  });
  // beads of past iterations on the inner orbits
  for (let i = 0; i < 26; i++) {
    const ob = orbits[i % 2 === 0 ? 1 : 0];
    const p = orbPt(cx, cy, ob.rx, ob.ry, ob.rot, rr(R, 0, TAU));
    o.push(circle(p.x, p.y, rr(R, 0.7, 1.3), mix(A, INK, 0.4), rr(R, 0.08, 0.2), 1, true));
  }

  // nucleus — the agent core
  o.push(glowDot(id, cx, cy, 7, A, 1.35));
  o.push(circle(cx, cy, 17, mix(A, "#ffffff", 0.25), 0.42, 1));
  o.push(circle(cx, cy, 33, A, 0.14, 0.8));

  // the spark and its comet tail on orbit 2
  const ob = orbits[2];
  const th0 = -0.62;
  const segs = 30;
  for (let i = 0; i < segs; i++) {
    const a1 = th0 - 1.7 + (1.7 * i) / segs;
    const a2 = th0 - 1.7 + (1.7 * (i + 1)) / segs;
    const p1 = orbPt(cx, cy, ob.rx, ob.ry, ob.rot, a1);
    const p2 = orbPt(cx, cy, ob.rx, ob.ry, ob.rot, a2);
    const u = i / segs;
    o.push(line(p1.x, p1.y, p2.x, p2.y, mix(S, mix(A, "#ffffff", 0.4), u), 0.02 + 0.78 * Math.pow(u, 1.6), 0.4 + 2.4 * Math.pow(u, 1.3)));
  }
  const sp = orbPt(cx, cy, ob.rx, ob.ry, ob.rot, th0);
  o.push(haze(id, sp.x, sp.y, 46, 40, A, 0.25, "bl"));
  o.push(glowDot(id, sp.x, sp.y, 5, A, 1.6));
  // tiny forward flare
  const spf = orbPt(cx, cy, ob.rx, ob.ry, ob.rot, th0 + 0.09);
  o.push(line(sp.x, sp.y, spf.x, spf.y, mix(A, "#ffffff", 0.7), 0.5, 1));

  // ghost sparks — previous loop iterations
  for (const [oi, th] of [[1, 2.4], [3, 3.6]]) {
    const g = orbPt(cx, cy, orbits[oi].rx, orbits[oi].ry, orbits[oi].rot, th + rr(R, -0.4, 0.4));
    o.push(glowDot(id, g.x, g.y, 2.2, S, 0.4));
  }
  return `<g>${o.join("")}</g>`;
}

/* 5. miam — nested rounded rects receding inward (a Mac inside a Mac) */
function artMiam({ id, A, S, R, defs }) {
  const o = [];
  const c0 = { x: 598, y: 408 };
  const vp = { x: 662, y: 372 };
  const nFrames = 6;

  defs.push(
    `<radialGradient id="${id}-screen" cx="0.5" cy="0.46" r="0.8">` +
      `<stop offset="0" stop-color="${mix(A, "#ffffff", 0.72)}" stop-opacity="0.9"/>` +
      `<stop offset="0.5" stop-color="${mix(A, "#ffffff", 0.18)}" stop-opacity="0.42"/>` +
      `<stop offset="1" stop-color="${A}" stop-opacity="0.04"/>` +
    `</radialGradient>`
  );

  // recede guides from outer corners toward the vanishing point
  const w0 = 1016, h0 = 632;
  for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
    o.push(line(c0.x + (sx * w0) / 2, c0.y + (sy * h0) / 2, vp.x, vp.y, S, 0.05, 0.8));
  }

  let inner = null;
  for (let i = 0; i < nFrames; i++) {
    const k = Math.pow(0.775, i);
    const t = i / (nFrames - 1);
    const cx = lerp(c0.x, vp.x, t * 0.62);
    const cy = lerp(c0.y, vp.y, t * 0.62);
    const w = w0 * k, h = h0 * k, r = 30 * k + 8;
    const rot = (i % 2 ? 1 : -1) * (0.3 + i * 0.22);
    const d = roundRectPath(cx - w / 2, cy - h / 2, w, h, r);
    const g = `transform="rotate(${f(rot)} ${f(cx)} ${f(cy)})"`;
    if (i < nFrames - 1) {
      const col = mix(S, A, t * 0.7);
      const op = lerp(0.13, 0.55, Math.pow(t, 1.4));
      o.push(`<g ${g}><path d="${d}" fill="none" stroke="${col}" stroke-width="${f(lerp(1, 1.5, t))}" opacity="${f(op)}"/></g>`);
      if (i === 3) o.push(`<g ${g}><path d="${d}" fill="none" stroke="${A}" stroke-width="5" opacity="0.12" filter="url(#${id}-bm)"/></g>`);
      // parallax glint on one corner of each frame
      const gx = cx - w / 2 + r * 0.4, gy = cy - h / 2 + r * 0.4;
      o.push(`<g ${g}>${circle(gx, gy, 1.4, mix(A, "#ffffff", 0.5), 0.25 + t * 0.3, 1, true)}</g>`);
    } else {
      inner = { cx, cy, w, h, r, d, g };
    }
  }

  // innermost — the live screen
  if (inner) {
    o.push(haze(id, inner.cx, inner.cy, inner.w * 0.85, inner.h * 0.85, A, 0.16));
    o.push(`<g ${inner.g}><path d="${inner.d}" fill="url(#${id}-screen)"/></g>`);
    o.push(`<g ${inner.g}>${glowStroke(id, inner.d, A, { w: 1.4, gw: 8, gop: 0.42, cop: 0.95, hot: 0.55 })}</g>`);
    // glint + dock light
    o.push(line(inner.cx - inner.w * 0.28, inner.cy - inner.h * 0.34, inner.cx + inner.w * 0.18, inner.cy - inner.h * 0.34, "#ffffff", 0.3, 1));
    o.push(glowDot(id, inner.cx, inner.cy + inner.h * 0.36, 1.8, mix(A, "#ffffff", 0.4), 0.9));
  }

  // ambient parallax bloom top-left between outer frames
  o.push(haze(id, 262, 178, 150, 90, S, 0.07, "bl"));
  return `<g>${o.join("")}</g>`;
}

/* 6. cosmos — a gateway: aligned rings, particles filtered as they pass */
function artCosmos({ id, A, S, R, defs }) {
  const o = [];
  const axisY = 402;
  const rings = [
    { x: 452, ry: 66, op: 0.16 },
    { x: 522, ry: 104, op: 0.22 },
    { x: 598, ry: 148, op: 0.3 },
    { x: 680, ry: 198, op: 0.42 },
    { x: 768, ry: 254, op: 0.6 },
  ];

  defs.push(
    `<linearGradient id="${id}-beam" x1="768" y1="0" x2="1128" y2="0" gradientUnits="userSpaceOnUse">` +
      `<stop offset="0" stop-color="${A}" stop-opacity="0"/>` +
      `<stop offset="0.3" stop-color="${A}" stop-opacity="0.38"/>` +
      `<stop offset="0.85" stop-color="${mix(A, "#ffffff", 0.3)}" stop-opacity="0.6"/>` +
      `<stop offset="1" stop-color="${mix(A, "#ffffff", 0.3)}" stop-opacity="0"/>` +
    `</linearGradient>`
  );

  // incoming scattered particles (left, unfiltered) — converging spread
  for (let i = 0; i < 70; i++) {
    const x = rr(R, 48, 445);
    const spread = lerp(235, 92, x / 445);
    const y = axisY + rr(R, -spread, spread);
    const col = R() < 0.25 ? S : mix(INK, S, 0.5);
    o.push(circle(x, y, rr(R, 0.6, 1.7), col, rr(R, 0.08, 0.3), 1, true));
    if (R() < 0.18) o.push(line(x - rr(R, 6, 16), y + rr(R, -2, 2), x, y, col, 0.08, 0.8));
  }
  // between rings — tightening
  for (let i = 0; i < 26; i++) {
    const x = rr(R, 455, 765);
    const spread = lerp(80, 20, (x - 455) / 310);
    o.push(circle(x, axisY + rr(R, -spread, spread), rr(R, 0.7, 1.5), mix(S, A, 0.5), rr(R, 0.15, 0.4), 1, true));
  }
  // rejected particles — deflected off the early rings, fading
  for (let i = 0; i < 6; i++) {
    const x = rr(R, 430, 560);
    const dir = R() < 0.5 ? -1 : 1;
    const y = axisY + dir * rr(R, 90, 150);
    o.push(`<path d="M${f(x)} ${f(y)}q${f(rr(R, 10, 26))} ${f(dir * rr(R, 18, 40))} ${f(rr(R, 26, 50))} ${f(dir * rr(R, 40, 70))}" fill="none" stroke="${S}" stroke-width="0.8" opacity="0.1"/>`);
    o.push(circle(x, y, 1.2, S, 0.16, 1, true));
  }

  // the rings
  o.push(haze(id, 768, axisY, 90, 270, A, 0.09));
  rings.forEach((rg, i) => {
    const rx = rg.ry * 0.2;
    const last = i === rings.length - 1;
    if (last) {
      o.push(
        `<ellipse cx="${f(rg.x)}" cy="${f(axisY)}" rx="${f(rx)}" ry="${f(rg.ry)}" fill="none" stroke="${A}" stroke-width="7" opacity="0.3" filter="url(#${id}-bm)"/>` +
        `<ellipse cx="${f(rg.x)}" cy="${f(axisY)}" rx="${f(rx)}" ry="${f(rg.ry)}" fill="none" stroke="${mix(A, "#ffffff", 0.38)}" stroke-width="1.5" opacity="0.85"/>` +
        `<ellipse cx="${f(rg.x)}" cy="${f(axisY)}" rx="${f(rx * 1.5)}" ry="${f(rg.ry + 14)}" fill="none" stroke="${A}" stroke-width="0.8" opacity="0.1"/>`
      );
    } else {
      o.push(`<ellipse cx="${f(rg.x)}" cy="${f(axisY)}" rx="${f(rx)}" ry="${f(rg.ry)}" fill="none" stroke="${mix(A, S, 0.5)}" stroke-width="1.1" opacity="${f(rg.op)}"/>`);
    }
  });

  // exit beam — aligned but soft, carried by particles
  const beamD = `M768 ${f(axisY)}C880 ${f(axisY - 5)} 1000 ${f(axisY + 3)} 1128 ${f(axisY - 2)}`;
  o.push(`<path d="${beamD}" fill="none" stroke="${A}" stroke-width="10" opacity="0.13" filter="url(#${id}-bm)"/>`);
  o.push(`<path d="${beamD}" fill="none" stroke="url(#${id}-beam)" stroke-width="1.6" stroke-linecap="round" filter="url(#${id}-bs)"/>`);
  for (let i = 0; i < 26; i++) {
    const x = rr(R, 790, 1125);
    const y = axisY + rr(R, -8, 8) + Math.sin(x * 0.02) * 3;
    o.push(circle(x, y, rr(R, 0.7, 1.6), mix(A, "#ffffff", 0.4), rr(R, 0.3, 0.75), 1, true));
    if (R() < 0.45) o.push(line(x - rr(R, 14, 46), y, x, y, A, rr(R, 0.1, 0.26), 0.9));
  }
  o.push(haze(id, 1090, axisY, 60, 26, A, 0.14, "bl"));
  o.push(glowDot(id, 768, axisY, 3, A, 1.1, 0.45));
  return `<g>${o.join("")}</g>`;
}

/* 7. rosicrucian — rose-window radial geometry fused with a knowledge graph */
function artRosicrucian({ id, A, S, R }) {
  const o = [];
  const cx = 588, cy = 392;

  o.push(haze(id, cx, cy, 240, 200, A, 0.07));
  o.push(haze(id, cx, cy, 90, 80, A, 0.14, "bl"));

  // concentric rings
  const rings = [58, 104, 152, 206];
  rings.forEach((r2, i) => {
    o.push(circle(cx, cy, r2, mix(A, INK, 0.25), [0.4, 0.24, 0.16, 0.3][i], i === 3 ? 1.2 : 1));
  });
  o.push(circle(cx, cy, 214, A, 0.14, 0.7));
  o.push(circle(cx, cy, 296, A, 0.05, 0.7));

  // 12 spokes
  const off = rr(R, 0, 0.5);
  for (let k = 0; k < 12; k++) {
    const a = (k / 12) * TAU + off;
    o.push(line(cx + Math.cos(a) * 58, cy + Math.sin(a) * 58, cx + Math.cos(a) * 206, cy + Math.sin(a) * 206, mix(A, INK, 0.4), 0.13, 0.8));
  }
  // gothic tracery — ring of overlapping circles
  for (let k = 0; k < 12; k++) {
    const a = (k / 12) * TAU + off + TAU / 24;
    o.push(circle(cx + Math.cos(a) * 104, cy + Math.sin(a) * 104, 47, mix(A, INK, 0.3), 0.15, 0.9));
  }
  // nodes at tracery centers + rim
  const rimNodes = [];
  for (let k = 0; k < 12; k++) {
    const a = (k / 12) * TAU + off;
    const p = { x: cx + Math.cos(a) * 206, y: cy + Math.sin(a) * 206 };
    rimNodes.push(p);
    o.push(glowDot(id, p.x, p.y, 1.8, A, 0.55));
    const q = { x: cx + Math.cos(a + TAU / 24) * 104, y: cy + Math.sin(a + TAU / 24) * 104 };
    o.push(circle(q.x, q.y, 1.6, A, 0.4, 1, true));
  }

  // knowledge graph — satellites reaching outward, asymmetric
  const sats = [];
  for (let i = 0; i < 10; i++) {
    const a = rr(R, 0, TAU);
    const r2 = rr(R, 258, 425);
    const p = { x: cx + Math.cos(a) * r2, y: cy + Math.sin(a) * r2 * 0.86 };
    if (p.x < 60 || p.x > 1140 || p.y < 50 || p.y > 756) continue;
    sats.push(p);
  }
  sats.forEach((p, i) => {
    // link to nearest rim node
    let best = rimNodes[0], bd = 1e9;
    for (const rn of rimNodes) {
      const dd = Math.hypot(rn.x - p.x, rn.y - p.y);
      if (dd < bd) { bd = dd; best = rn; }
    }
    o.push(line(best.x, best.y, p.x, p.y, S, 0.13, 0.8));
    o.push(glowDot(id, p.x, p.y, i % 3 === 0 ? 2.6 : 1.7, S, i % 3 === 0 ? 0.8 : 0.5));
    if (i % 3 === 0) o.push(circle(p.x, p.y, 6, S, 0.22, 0.8));
  });
  for (let i = 0; i + 1 < sats.length; i += 3) {
    o.push(line(sats[i].x, sats[i].y, sats[i + 1].x, sats[i + 1].y, S, 0.07, 0.7));
  }

  // radiant heart
  o.push(glowDot(id, cx, cy, 8, A, 1.45));
  o.push(circle(cx, cy, 21, mix(A, "#ffffff", 0.3), 0.5, 1));
  o.push(line(cx - 13, cy, cx + 13, cy, mix(A, "#ffffff", 0.7), 0.4, 0.8));
  o.push(line(cx, cy - 13, cx, cy + 13, mix(A, "#ffffff", 0.7), 0.4, 0.8));
  return `<g>${o.join("")}</g>`;
}

/* 8. ethereal — a portal horizon over a sparse 3D starfield */
function artEthereal({ id, A, S, R, defs }) {
  const o = [];
  const vp = { x: 600, y: 430 };

  // starfield with faint perspective streaks
  for (let i = 0; i < 90; i++) {
    const x = rr(R, 40, 1160), y = rr(R, 30, 585);
    const r2 = rr(R, 0.4, 1.7);
    const col = R() < 0.12 ? S : R() < 0.2 ? A : mix(INK, "#9fb0c8", 0.4);
    o.push(circle(x, y, r2, col, rr(R, 0.1, 0.5), 1, true));
    if (R() < 0.12) {
      const dx = x - vp.x, dy = y - vp.y;
      const m = Math.hypot(dx, dy) || 1;
      const s = rr(R, 7, 18);
      o.push(line(x - (dx / m) * s, y - (dy / m) * s, x, y, col, 0.08, 0.7));
    }
  }
  // one quiet shooting star
  defs.push(
    `<linearGradient id="${id}-shoot" x1="0" y1="0" x2="1" y2="0">` +
      `<stop offset="0" stop-color="${S}" stop-opacity="0"/><stop offset="1" stop-color="${mix(S, "#ffffff", 0.6)}" stop-opacity="0.7"/>` +
    `</linearGradient>`
  );
  o.push(`<path d="M170 122L318 96" stroke="url(#${id}-shoot)" stroke-width="1.3" stroke-linecap="round"/>`);
  o.push(glowDot(id, 318, 96, 1.6, S, 0.9));

  // horizon limb
  o.push(haze(id, 600, 636, 560, 90, A, 0.12));
  o.push(`<path d="M-60 820L-60 712Q600 566 1260 712L1260 820Z" fill="#04060a" opacity="0.92"/>`);
  o.push(glowStroke(id, "M-40 708Q600 570 1240 708", A, { w: 1.4, gw: 9, gop: 0.3, cop: 0.7, hot: 0.4, cap: "butt" }));

  // the portal — standing lens above the horizon
  const px = 792, py = 330, prx = 64, pry = 136;
  o.push(haze(id, px, py, 150, 210, A, 0.13));
  o.push(`<ellipse cx="${f(px)}" cy="${f(py)}" rx="${f(prx)}" ry="${f(pry)}" fill="#05070b" opacity="0.88"/>`);
  // inner distorted star-dust
  for (let i = 0; i < 12; i++) {
    const a = rr(R, 0, TAU), rt = Math.sqrt(R());
    o.push(circle(px + Math.cos(a) * prx * 0.75 * rt, py + Math.sin(a) * pry * 0.75 * rt, rr(R, 0.5, 1.3), mix(S, "#ffffff", 0.4), rr(R, 0.25, 0.7), 1, true));
  }
  o.push(
    `<ellipse cx="${f(px)}" cy="${f(py)}" rx="${f(prx)}" ry="${f(pry)}" fill="none" stroke="${A}" stroke-width="8" opacity="0.32" filter="url(#${id}-bm)"/>` +
    `<ellipse cx="${f(px)}" cy="${f(py)}" rx="${f(prx)}" ry="${f(pry)}" fill="none" stroke="${mix(A, "#ffffff", 0.55)}" stroke-width="1.5" opacity="0.92"/>` +
    `<ellipse cx="${f(px)}" cy="${f(py)}" rx="${f(prx * 0.82)}" ry="${f(pry * 0.84)}" fill="none" stroke="${A}" stroke-width="0.9" opacity="0.22"/>`
  );

  // light pillar to the horizon + pooled reflection
  defs.push(
    `<linearGradient id="${id}-pillar" x1="0" y1="0" x2="0" y2="1">` +
      `<stop offset="0" stop-color="${A}" stop-opacity="0.26"/><stop offset="1" stop-color="${A}" stop-opacity="0"/>` +
    `</linearGradient>`
  );
  o.push(`<rect x="${f(px - 15)}" y="${f(py + pry)}" width="30" height="176" fill="url(#${id}-pillar)" filter="url(#${id}-bs)"/>`);
  o.push(haze(id, px, 652, 74, 12, S, 0.2, "bl"));
  return `<g>${o.join("")}</g>`;
}

/* 9. flow — a floating pill radiating soft ripple waves */
function artFlow({ id, A, S, R }) {
  const o = [];
  const cx = 600, cy = 248, pw = 218, ph = 62;

  // ripples — accelerating spacing, fading with distance
  for (let k = 7; k >= 1; k--) {
    const wk = pw + 96 * k * (1 + k * 0.14);
    const hk = ph + 70 * k * (1 + k * 0.12);
    const op = 0.32 * Math.pow(0.7, k - 1);
    const col = k % 2 ? A : mix(A, S, 0.55);
    o.push(`<path d="${roundRectPath(cx - wk / 2, cy - hk / 2, wk, hk, hk / 2)}" fill="none" stroke="${col}" stroke-width="${f(1.15 - k * 0.06)}" opacity="${f(op)}"/>`);
  }
  // ripple shimmer highlights (lower arcs catching light)
  o.push(`<path d="M${f(cx - 170)} ${f(cy + 108)}Q${f(cx)} ${f(cy + 152)} ${f(cx + 170)} ${f(cy + 108)}" fill="none" stroke="${mix(A, "#ffffff", 0.4)}" stroke-width="1.1" opacity="0.2" filter="url(#${id}-bs)"/>`);
  o.push(`<path d="M${f(cx - 305)} ${f(cy + 190)}Q${f(cx)} ${f(cy + 262)} ${f(cx + 305)} ${f(cy + 190)}" fill="none" stroke="${A}" stroke-width="1" opacity="0.1" filter="url(#${id}-bs)"/>`);

  // the pill
  const pd = roundRectPath(cx - pw / 2, cy - ph / 2, pw, ph, ph / 2);
  o.push(haze(id, cx, cy, 200, 90, A, 0.15));
  o.push(`<path d="${pd}" fill="#0a0e14" opacity="0.96"/>`);
  o.push(glowStroke(id, pd, A, { w: 1.5, gw: 9, gop: 0.4, cop: 0.95, hot: 0.55 }));
  // inner glint + sensor
  o.push(`<path d="M${f(cx - 74)} ${f(cy - 16)}Q${f(cx)} ${f(cy - 26)} ${f(cx + 60)} ${f(cy - 16)}" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.22"/>`);
  o.push(glowDot(id, cx + 64, cy + 2, 3.6, S, 1.1));
  o.push(circle(cx + 64, cy + 2, 7.5, S, 0.3, 0.9));
  o.push(circle(cx - 58, cy + 2, 2.2, mix(A, INK, 0.4), 0.4, 1, true));

  // sparkles where ripples catch light
  for (let i = 0; i < 5; i++) {
    const a = rr(R, 0.15, 0.85) * Math.PI;
    const k = ri(R, 2, 5);
    const wk = (pw + 96 * k * (1 + k * 0.14)) / 2;
    const hk = (ph + 70 * k * (1 + k * 0.12)) / 2;
    o.push(glowDot(id, cx + Math.cos(a) * wk * 0.9, cy + Math.sin(a) * hk * 0.92, rr(R, 1, 1.8), A, rr(R, 0.4, 0.8)));
  }
  // calm reflection field below
  for (let i = 0; i < 7; i++) {
    const y = rr(R, 585, 700);
    const x = cx + rr(R, -260, 260);
    o.push(line(x - rr(R, 20, 70), y, x + rr(R, 20, 70), y, mix(A, S, 0.5), rr(R, 0.04, 0.1), 1));
  }
  return `<g>${o.join("")}</g>`;
}

/* 10. scrolltracker — vertical momentum: ribbons of scroll traces */
function artScrollTracker({ id, A, S, R, defs }) {
  const o = [];
  const xs = [150, 318, 452, 560, 748, 936];
  const focal = 3;

  xs.forEach((xb0, i) => {
    const xb = xb0 + rr(R, -22, 22);
    const isF = i === focal;
    const pts = [];
    const ny = 6;
    for (let k = 0; k < ny; k++) {
      const y = lerp(-40, 850, k / (ny - 1));
      pts.push({ x: xb + rr(R, -38, 38) * (isF ? 0.7 : 1), y });
    }
    const d = crPath(pts);
    const gid = `${id}-rb${i}`;
    const col = isF ? A : i % 2 ? S : mix(A, S, 0.5);
    // each quiet ribbon lives on a partial span — a burst of scrolling, then rest
    const t0 = rr(R, 0.04, 0.4);
    const t1 = Math.min(0.97, t0 + rr(R, 0.28, 0.55));
    const peak = isF ? 0.9 : rr(R, 0.22, 0.5) * (i % 3 === 2 ? 0.5 : 1);
    defs.push(
      `<linearGradient id="${gid}" x1="0" y1="-40" x2="0" y2="850" gradientUnits="userSpaceOnUse">` +
        `<stop offset="${f(isF ? 0.02 : t0)}" stop-color="${col}" stop-opacity="0"/>` +
        `<stop offset="${f(isF ? 0.3 : lerp(t0, t1, 0.45))}" stop-color="${col}" stop-opacity="${f(peak)}"/>` +
        `<stop offset="${f(isF ? 0.75 : t1)}" stop-color="${col}" stop-opacity="${f(isF ? 0.3 : 0)}"/>` +
        `<stop offset="1" stop-color="${col}" stop-opacity="0"/>` +
      `</linearGradient>`
    );
    if (isF) {
      o.push(`<path d="${d}" fill="none" stroke="${A}" stroke-width="7" opacity="0.22" filter="url(#${id}-bm)"/>`);
      o.push(`<path d="${d}" fill="none" stroke="url(#${gid})" stroke-width="2.2"/>`);
      // momentum head
      const samples = crSample(pts, 24);
      const head = alongArc(samples, 0.38);
      o.push(haze(id, head.x, head.y, 60, 60, A, 0.2, "bl"));
      // discrete scroll steps trailing just behind the head
      for (let s = 1; s <= 4; s++) {
        const p1 = alongArc(samples, 0.38 + s * 0.035);
        const p2 = alongArc(samples, 0.38 + s * 0.035 + 0.018);
        o.push(line(p1.x, p1.y, p2.x, p2.y, mix(A, "#ffffff", 0.3), 0.55 - s * 0.11, 3 - s * 0.45));
      }
      o.push(glowDot(id, head.x, head.y, 4.6, A, 1.5));
      // velocity streaks above the head
      for (const dx of [-13, 8, 18]) {
        const sy = head.y - rr(R, 26, 44);
        const len = rr(R, 44, 92);
        const sgid = `${id}-vs${dx > 0 ? "p" : "m"}${Math.abs(dx)}`;
        defs.push(
          `<linearGradient id="${sgid}" x1="0" y1="${f(sy - len)}" x2="0" y2="${f(sy)}" gradientUnits="userSpaceOnUse">` +
            `<stop offset="0" stop-color="${A}" stop-opacity="0"/><stop offset="1" stop-color="${A}" stop-opacity="0.55"/>` +
          `</linearGradient>`
        );
        o.push(`<line x1="${f(head.x + dx)}" y1="${f(sy - len)}" x2="${f(head.x + dx)}" y2="${f(sy)}" stroke="url(#${sgid})" stroke-width="1.2" stroke-linecap="round"/>`);
      }
      // position markers along the focal ribbon
      for (const t of [0.16, 0.58, 0.74]) {
        const p = alongArc(samples, t);
        o.push(circle(p.x, p.y, 3.4, A, 0.4, 0.9));
      }
    } else {
      o.push(`<path d="${d}" fill="none" stroke="url(#${gid})" stroke-width="${f(rr(R, 1.1, 2))}"/>`);
      if (R() < 0.6) {
        const samples = crSample(pts, 20);
        const p = alongArc(samples, rr(R, 0.2, 0.8));
        o.push(circle(p.x, p.y, rr(R, 1.8, 2.8), col, 0.3, 0.8));
      }
    }
  });

  // fine parallel velocity wisps in the field, hugging the ribbons
  for (let i = 0; i < 14; i++) {
    const x = pick(R, xs) + rr(R, -50, 50), y = rr(R, 100, 700), len = rr(R, 20, 70);
    o.push(line(x, y - len, x, y, mix(S, INK, 0.4), rr(R, 0.07, 0.16), 0.8));
  }
  return `<g>${o.join("")}</g>`;
}

/* 11. papervault — folded-paper facets in a vault iris, one glowing seam */
function artPaperVault({ id, A, S, R, defs }) {
  const o = [];
  const cx = 600, cy = 424;
  const nW = 14;
  const seamIdx = 9;
  const aSeam = -1.86 + rr(R, -0.12, 0.12); // seam points up and slightly left
  const off = aSeam - ((seamIdx + 1) / nW) * TAU;
  const skew = 0.1, skew2 = 0.055;
  const rIn = 96, rMid = 254, rOut = 334;
  const pt = (a, r2) => ({ x: cx + Math.cos(a) * r2, y: cy + Math.sin(a) * r2 });
  const P = (a, r2) => { const p = pt(a, r2); return `${f(p.x)} ${f(p.y)}`; };
  const angDist = (a, b) => { const d = Math.abs(a - b) % TAU; return d > Math.PI ? TAU - d : d; };

  // cool counter-atmosphere lower-left (support hue kept atmospheric)
  o.push(haze(id, 250, 655, 320, 210, mix(S, "#071019", 0.55), 0.4));

  // facet rings — everything is lit by the seam; light falls off with angle
  function ring(rA, rB, phase, sk, dimK) {
    for (let k = 0; k < nW; k++) {
      const a1 = ((k + phase) / nW) * TAU + off + 0.012;
      const a2 = ((k + 1 + phase) / nW) * TAU + off - 0.012;
      const amid = (a1 + a2) / 2 + sk / 2;
      const prox = Math.pow(Math.max(0, 1 - angDist(amid, aSeam) / Math.PI), 2.4);
      const lum = 0.012 + 0.115 * prox * dimK + rr(R, 0, 0.012);
      o.push(
        `<path d="M${P(a1, rA)}L${P(a2, rA)}L${P(a2 + sk, rB)}L${P(a1 + sk, rB)}Z" ` +
        `fill="${mix(BG2, A, lum)}" stroke="#050709" stroke-opacity="0.5" stroke-width="0.8"/>`
      );
      // lit fold-edge on the side facing the seam
      const edgeA = angDist(a1, aSeam) < angDist(a2, aSeam) ? a1 : a2;
      o.push(`<path d="M${P(edgeA, rA)}L${P(edgeA + sk, rB)}" fill="none" stroke="${mix(A, "#ffffff", 0.22)}" stroke-width="0.9" opacity="${f(0.04 + 0.42 * prox * dimK)}"/>`);
      // faint crease within the facet
      if (R() < 0.55) {
        const ac = lerp(a1, a2, rr(R, 0.3, 0.7));
        o.push(`<path d="M${P(ac, rA + 6)}L${P(ac + sk, rB - 6)}" fill="none" stroke="#030509" stroke-width="0.7" opacity="0.3"/>`);
      }
    }
  }
  ring(rIn, rMid, 0, skew, 1);
  ring(rMid, rOut, skew * nW / TAU, skew2, 0.62);

  // long fold whispers beyond the vault, brighter toward the seam
  for (let k = 0; k < 7; k++) {
    const a = rr(R, 0, TAU);
    const prox = Math.pow(Math.max(0, 1 - angDist(a, aSeam) / Math.PI), 2);
    o.push(line(cx + Math.cos(a) * (rOut + 4), cy + Math.sin(a) * (rOut + 4), cx + Math.cos(a) * rr(R, 430, 545), cy + Math.sin(a) * rr(R, 430, 545), mix(A, INK, 0.45), 0.03 + 0.07 * prox, 0.8));
  }

  // hub — dark, with a rim catching the seam light
  o.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(rIn)}" fill="${mix(BG2, A, 0.022)}"/>`);
  o.push(circle(cx, cy, rIn, mix(A, INK, 0.35), 0.2, 1));
  const arcP1 = pt(aSeam - 0.6, rIn), arcP2 = pt(aSeam + 0.6, rIn);
  o.push(`<path d="M${f(arcP1.x)} ${f(arcP1.y)}A${rIn} ${rIn} 0 0 1 ${f(arcP2.x)} ${f(arcP2.y)}" fill="none" stroke="${mix(A, "#ffffff", 0.3)}" stroke-width="1.4" opacity="0.5" stroke-linecap="round"/>`);
  o.push(circle(cx, cy, 60, mix(A, INK, 0.4), 0.14, 0.9));
  o.push(circle(cx, cy, 32, A, 0.16, 0.8));
  for (let k = 0; k < 3; k++) {
    const a = (k / 3) * TAU + aSeam;
    o.push(circle(cx + Math.cos(a) * 77, cy + Math.sin(a) * 77, 2, A, k === 0 ? 0.5 : 0.2, 1, true));
  }
  o.push(glowDot(id, cx, cy, 3.2, A, 0.8, 0.4));

  // THE seam — a continuous lit fold from hub to beyond the rim
  const s1 = pt(aSeam, rIn), s2 = pt(aSeam + skew, rMid), s3 = pt(aSeam + skew + skew2, rOut + 8);
  const seamD = `M${f(s1.x)} ${f(s1.y)}L${f(s2.x)} ${f(s2.y)}L${f(s3.x)} ${f(s3.y)}`;
  defs.push(
    `<linearGradient id="${id}-leak" x1="${f(s1.x)}" y1="${f(s1.y)}" x2="${f(s3.x)}" y2="${f(s3.y)}" gradientUnits="userSpaceOnUse">` +
      `<stop offset="0" stop-color="${A}" stop-opacity="0.34"/><stop offset="1" stop-color="${A}" stop-opacity="0"/>` +
    `</linearGradient>`
  );
  const l1 = pt(aSeam - 0.022, rIn), l2 = pt(aSeam + 0.022, rIn);
  const l3 = pt(aSeam + skew + skew2 + 0.13, rOut + 78), l4 = pt(aSeam + skew + skew2 - 0.13, rOut + 78);
  o.push(`<path d="M${f(l1.x)} ${f(l1.y)}L${f(l2.x)} ${f(l2.y)}L${f(l3.x)} ${f(l3.y)}L${f(l4.x)} ${f(l4.y)}Z" fill="url(#${id}-leak)" filter="url(#${id}-bs)"/>`);
  o.push(haze(id, s2.x, s2.y, 84, 84, A, 0.2, "bl"));
  o.push(glowStroke(id, seamD, A, { w: 1.7, gw: 11, gop: 0.44, cop: 0.95, hot: 0.55 }));
  for (const t of [0.3, 0.6, 0.9]) {
    o.push(glowDot(id, lerp(s1.x, s3.x, t) + rr(R, -4, 4), lerp(s1.y, s3.y, t) + rr(R, -4, 4), rr(R, 1, 1.9), A, rr(R, 0.6, 1)));
  }
  // dust drifting out of the seam
  for (let k = 0; k < 7; k++) {
    const t = rr(R, 0.35, 1.25);
    const sp = { x: lerp(s1.x, s3.x, t), y: lerp(s1.y, s3.y, t) };
    o.push(circle(sp.x + rr(R, -26, 26), sp.y + rr(R, -26, 20), rr(R, 0.6, 1.5), A, rr(R, 0.2, 0.5), 1, true));
  }
  return `<g>${o.join("")}</g>`;
}

/* 12. my4blocks — four luminous blocks + index-tree filament linking them */
function artMy4Blocks({ id, A, S, R, defs }) {
  const o = [];
  const c = { x: 578, y: 396 };
  const sizes = [150, 124, 120, 134];
  const offs = [
    { x: -156, y: -148 }, { x: 150, y: -144 },
    { x: -148, y: 146 }, { x: 154, y: 150 },
  ];
  const glow = [1.3, 0.5, 0.42, 0.78];
  const rots = [rr(R, -2, 2), rr(R, -2, 2), rr(R, -2, 2), rr(R, -2, 2)];

  defs.push(
    `<linearGradient id="${id}-panel" x1="0" y1="0" x2="0" y2="1">` +
      `<stop offset="0" stop-color="${mix(BG2, A, 0.09)}"/><stop offset="1" stop-color="${mix(BG2, A, 0.02)}"/>` +
    `</linearGradient>`
  );

  // quiet quadrant axes
  o.push(line(c.x, 90, c.x, 720, INK, 0.045, 0.8));
  o.push(line(150, c.y, 1050, c.y, INK, 0.045, 0.8));

  // soft haze behind focal block
  o.push(haze(id, c.x + offs[0].x, c.y + offs[0].y, 170, 150, A, 0.12));

  const corners = [];
  offs.forEach((of, i) => {
    const size = sizes[i];
    const bx = c.x + of.x - size / 2 + rr(R, -6, 6);
    const by = c.y + of.y - size / 2 + rr(R, -6, 6);
    const d = roundRectPath(bx, by, size, size, size * 0.22);
    const g = `transform="rotate(${f(rots[i])} ${f(bx + size / 2)} ${f(by + size / 2)})"`;
    o.push(`<g ${g}><path d="${d}" fill="url(#${id}-panel)" opacity="0.9"/>`);
    o.push(glowStroke(id, d, A, { w: 1.2, gw: 7, gop: 0.3 * glow[i], cop: 0.3 + 0.52 * glow[i], hot: 0.4 }) + `</g>`);
    // inner top light
    o.push(haze(id, bx + size / 2, by + size * 0.3, size * 0.34, size * 0.2, A, 0.11 * glow[i], "bl"));
    // corner facing center
    corners.push({ x: bx + (of.x < 0 ? size - 18 : 18), y: by + (of.y < 0 ? size - 18 : 18) });
    // tiny identity dot per block
    o.push(circle(bx + size - 24, by + 24, 2, mix(A, "#ffffff", 0.3), 0.25 + glow[i] * 0.3, 1, true));
  });

  // index-tree filament — organic amber threads linking the blocks
  const fil = [];
  corners.forEach((p, i) => {
    const mid1 = { x: lerp(c.x, p.x, 0.38) + rr(R, -16, 16), y: lerp(c.y, p.y, 0.38) + rr(R, -16, 16) };
    const mid2 = { x: lerp(c.x, p.x, 0.72) + rr(R, -12, 12), y: lerp(c.y, p.y, 0.72) + rr(R, -12, 12) };
    const pts = [{ x: c.x, y: c.y }, mid1, mid2, p];
    const d = crPath(pts);
    fil.push(glowStroke(id, d, S, { w: 0.9, gw: 5, gop: 0.25, cop: 0.8, hot: 0.4 }));
    fil.push(circle(mid1.x, mid1.y, 1.3, S, 0.55, 1, true));
    fil.push(circle(mid2.x, mid2.y, 1.1, S, 0.45, 1, true));
    // twigs
    for (let k = 0; k < 2; k++) {
      const base = k ? mid1 : mid2;
      const a = rr(R, 0, TAU);
      fil.push(`<path d="M${f(base.x)} ${f(base.y)}q${f(Math.cos(a) * 9)} ${f(Math.sin(a) * 9)} ${f(Math.cos(a) * 17)} ${f(Math.sin(a) * 15)}" fill="none" stroke="${S}" stroke-width="0.7" opacity="0.25"/>`);
    }
  });
  // free roots wandering out of the junction — breaks the symmetry
  for (const a of [rr(R, 2.4, 2.9), rr(R, -0.5, -0.1), rr(R, 3.8, 4.3)]) {
    const rp = [
      { x: c.x, y: c.y },
      { x: c.x + Math.cos(a) * 90 + rr(R, -18, 18), y: c.y + Math.sin(a) * 90 + rr(R, -18, 18) },
      { x: c.x + Math.cos(a) * 210 + rr(R, -30, 30), y: c.y + Math.sin(a) * 210 + rr(R, -30, 30) },
    ];
    fil.push(`<path d="${crPath(rp)}" fill="none" stroke="${S}" stroke-width="0.8" opacity="0.2"/>`);
    fil.push(circle(rp[2].x, rp[2].y, 1.2, S, 0.3, 1, true));
  }
  o.push(`<g>${fil.join("")}</g>`);
  o.push(glowDot(id, c.x, c.y, 3.2, S, 1.25));
  o.push(circle(c.x, c.y, 8.5, S, 0.35, 0.9));
  return `<g>${o.join("")}</g>`;
}

/* 13. artful — gallery frames in perspective, one canvas alive */
function artArtful({ id, A, S, R, defs }) {
  const o = [];
  const vp = { x: 958, y: 398 };
  const topN = 172, botN = 626, xN = 132; // nearest frame reference plane
  const topAt = (x) => vp.y + (topN - vp.y) * ((vp.x - x) / (vp.x - xN));
  const botAt = (x) => vp.y + (botN - vp.y) * ((vp.x - x) / (vp.x - xN));

  // wall/floor seam receding
  o.push(line(40, 706, vp.x, vp.y + 10, INK, 0.07, 1));
  o.push(line(40, 96, vp.x, vp.y - 8, INK, 0.045, 1));

  const frames = [
    { x: 150, w: 196 }, { x: 428, w: 152 }, { x: 648, w: 116 }, { x: 812, w: 88 },
  ];
  const live = 1;

  frames.forEach((fr, i) => {
    const xa = fr.x, xb = fr.x + fr.w;
    const quad = [
      { x: xa, y: topAt(xa) }, { x: xb, y: topAt(xb) },
      { x: xb, y: botAt(xb) }, { x: xa, y: botAt(xa) },
    ];
    const inset = (q, m) => {
      const cxq = (q[0].x + q[1].x + q[2].x + q[3].x) / 4;
      const cyq = (q[0].y + q[1].y + q[2].y + q[3].y) / 4;
      return q.map((p) => ({ x: lerp(p.x, cxq, m), y: lerp(p.y, cyq, m) }));
    };
    const path = (q) => `M${q.map((p) => `${f(p.x)} ${f(p.y)}`).join("L")}Z`;
    const canvas = inset(quad, 0.09);

    // molding: two nested strokes
    o.push(`<path d="${path(quad)}" fill="#080b10" opacity="0.72" stroke="${mix("#8b95a6", A, 0.2)}" stroke-opacity="${f(i === live ? 0.4 : 0.22)}" stroke-width="${f(2.6 - i * 0.4)}"/>`);
    o.push(`<path d="${path(canvas)}" fill="#070a0e" opacity="0.9" stroke="${INK}" stroke-opacity="0.1" stroke-width="0.8"/>`);

    if (i === live) {
      const gid = `${id}-canvas`;
      defs.push(`<clipPath id="${gid}"><path d="${path(canvas)}"/></clipPath>`);
      const cxq = (canvas[0].x + canvas[2].x) / 2, cyq = (canvas[0].y + canvas[2].y) / 2;
      const wq = canvas[1].x - canvas[0].x, hq = canvas[3].y - canvas[0].y;
      const strokes = [];
      strokes.push(haze(id, cxq, cyq, wq * 0.42, hq * 0.3, A, 0.3, "bl"));
      for (let k = 0; k < 46; k++) {
        const sx = cxq + rr(R, -wq * 0.48, wq * 0.48);
        const sy = cyq + rr(R, -hq * 0.44, hq * 0.44);
        const a = rr(R, -0.9, 0.5);
        const len = rr(R, 10, 44);
        const bendk = rr(R, -14, 14);
        const col = mix(A, S, rr(R, 0, 0.85));
        strokes.push(
          `<path d="M${f(sx)} ${f(sy)}q${f(Math.cos(a) * len * 0.5 - Math.sin(a) * bendk)} ${f(Math.sin(a) * len * 0.5 + Math.cos(a) * bendk)} ${f(Math.cos(a) * len)} ${f(Math.sin(a) * len)}" ` +
          `fill="none" stroke="${col}" stroke-width="${f(rr(R, 1, 3.4))}" stroke-linecap="round" opacity="${f(rr(R, 0.16, 0.6))}"/>`
        );
      }
      // a few luminous leads
      for (let k = 0; k < 5; k++) {
        const sx = cxq + rr(R, -wq * 0.3, wq * 0.3);
        const sy = cyq + rr(R, -hq * 0.3, hq * 0.3);
        strokes.push(glowDot(id, sx, sy, rr(R, 1.2, 2.2), A, rr(R, 0.7, 1.1)));
      }
      o.push(`<g clip-path="url(#${gid})">${strokes.join("")}</g>`);
      // spill — the art escapes the frame
      for (let k = 0; k < 8; k++) {
        const sx = canvas[2].x - rr(R, 0, wq * 0.5);
        const sy = canvas[2].y + rr(R, 2, 30);
        const col = mix(A, S, rr(R, 0, 0.7));
        o.push(`<path d="M${f(sx)} ${f(sy)}q${f(rr(R, 4, 14))} ${f(rr(R, 6, 18))} ${f(rr(R, 10, 26))} ${f(rr(R, 14, 30))}" fill="none" stroke="${col}" stroke-width="${f(rr(R, 0.8, 1.8))}" stroke-linecap="round" opacity="${f(rr(R, 0.15, 0.4))}"/>`);
      }
      for (let k = 0; k < 10; k++) {
        o.push(circle(cxq + rr(R, -wq * 0.7, wq * 0.8), canvas[2].y + rr(R, 8, 90), rr(R, 0.7, 1.7), k % 3 ? A : S, rr(R, 0.15, 0.5), 1, true));
      }
      // glow pooling on the floor beneath
      o.push(haze(id, cxq + 8, botAt(cxq) + 42, wq * 0.7, 16, A, 0.14, "bl"));
      // frame halo
      o.push(`<path d="${path(quad)}" fill="none" stroke="${A}" stroke-width="6" opacity="0.12" filter="url(#${id}-bm)"/>`);
    } else {
      // sleeping canvases — faint tonal wash only
      const cxq = (canvas[0].x + canvas[2].x) / 2, cyq = (canvas[0].y + canvas[2].y) / 2;
      o.push(haze(id, cxq, cyq, (canvas[1].x - canvas[0].x) * 0.4, 30, S, 0.045, "bl"));
    }
  });

  // air motes near the live frame
  for (let k = 0; k < 9; k++) {
    o.push(circle(rr(R, 380, 660), rr(R, 200, 620), rr(R, 0.5, 1.3), A, rr(R, 0.1, 0.3), 1, true));
  }
  return `<g>${o.join("")}</g>`;
}

/* 14. ant-zai — vision grid: bounding boxes over drifting glyph strokes */
function artAntZai({ id, A, S, R }) {
  const o = [];

  // faint calibration grid
  for (let x = 100; x <= 1100; x += 100) o.push(line(x, 60, x, 740, INK, 0.042, 0.7));
  for (let y = 140; y <= 700; y += 94) o.push(line(70, y, 1130, y, INK, 0.042, 0.7));

  // glyph-like strokes (never real letters) drifting in loose rows
  function glyph(gx, gy, s, col, op, slant) {
    const parts = [];
    const nSt = ri(R, 2, 4);
    for (let k = 0; k < nSt; k++) {
      const x1 = rr(R, -s, s) * 0.5, y1 = rr(R, -s, s) * 0.6;
      if (R() < 0.5) {
        parts.push(`<path d="M${f(x1)} ${f(y1)}q${f(rr(R, -s, s) * 0.5)} ${f(rr(R, -s, s) * 0.5)} ${f(rr(R, -s, s) * 0.8)} ${f(rr(R, -s, s) * 0.8)}" fill="none" stroke="${col}" stroke-width="1.1" stroke-linecap="round" opacity="${f(op)}"/>`);
      } else {
        parts.push(`<path d="M${f(x1)} ${f(y1)}l${f(rr(R, -s, s) * 0.7)} ${f(rr(R, -s, s) * 0.7)}" fill="none" stroke="${col}" stroke-width="1.1" stroke-linecap="round" opacity="${f(op)}"/>`);
      }
    }
    if (R() < 0.3) parts.push(`<circle cx="${f(rr(R, -s, s) * 0.4)}" cy="${f(rr(R, -s, s) * 0.4)}" r="0.9" fill="${col}" opacity="${f(op)}"/>`);
    return `<g transform="translate(${f(gx)} ${f(gy)}) rotate(${f(slant)})">${parts.join("")}</g>`;
  }

  const rows = [166, 236, 306, 376, 446, 516, 586, 656];
  rows.forEach((ry) => {
    const nG = ri(R, 6, 9);
    const drift = rr(R, -18, 18);
    for (let k = 0; k < nG; k++) {
      const gx = rr(R, 115, 1085) + drift;
      const gy = ry + rr(R, -10, 10);
      const hotG = R() < 0.12;
      const col = hotG ? mix(A, "#ffffff", 0.25) : R() < 0.25 ? S : mix(INK, A, 0.4);
      const op = hotG ? rr(R, 0.45, 0.6) : rr(R, 0.2, 0.4);
      o.push(glyph(gx, gy, rr(R, 10, 17), col, op, rr(R, -8, 4)));
      // motion dashes trailing some glyphs
      if (R() < 0.4) o.push(line(gx - rr(R, 28, 52), gy + 2, gx - rr(R, 12, 20), gy + 2, col, 0.12, 0.9));
    }
  });

  // corner-bracket boxes over quiet detections
  function bracketBox(bx, by, bw, bh, col, op, cl, wd) {
    const s = [];
    const cs = [[bx, by, 1, 1], [bx + bw, by, -1, 1], [bx + bw, by + bh, -1, -1], [bx, by + bh, 1, -1]];
    for (const [px, py, dx, dy] of cs) {
      s.push(`<path d="M${f(px + dx * cl)} ${f(py)}L${f(px)} ${f(py)}L${f(px)} ${f(py + dy * cl)}" fill="none" stroke="${col}" stroke-width="${f(wd)}" opacity="${f(op)}"/>`);
    }
    return s.join("");
  }
  const dets = [
    { x: 208, y: 218, w: 108, h: 46 }, { x: 486, y: 424, w: 88, h: 42 },
    { x: 872, y: 560, w: 120, h: 50 }, { x: 320, y: 606, w: 92, h: 40 },
    { x: 806, y: 148, w: 96, h: 44 },
  ];
  dets.forEach((dt, di) => {
    const strong = di < 2;
    if (strong) o.push(`<rect x="${f(dt.x)}" y="${f(dt.y)}" width="${f(dt.w)}" height="${f(dt.h)}" fill="none" stroke="${A}" stroke-width="0.8" opacity="0.18"/>`);
    o.push(bracketBox(dt.x, dt.y, dt.w, dt.h, mix(A, INK, 0.25), strong ? rr(R, 0.4, 0.5) : rr(R, 0.24, 0.34), 10, 1.2));
    if (strong) o.push(`<rect x="${f(dt.x)}" y="${f(dt.y - 7)}" width="16" height="2.8" rx="1.4" fill="${A}" opacity="0.4"/>`);
  });

  // THE detection — focal box, locked on
  const fb = { x: 600, y: 268, w: 158, h: 68 };
  o.push(haze(id, fb.x + fb.w / 2, fb.y + fb.h / 2, 170, 92, A, 0.14));
  o.push(`<rect x="${f(fb.x)}" y="${f(fb.y)}" width="${f(fb.w)}" height="${f(fb.h)}" fill="${A}" opacity="0.05"/>`);
  o.push(`<rect x="${f(fb.x)}" y="${f(fb.y)}" width="${f(fb.w)}" height="${f(fb.h)}" fill="none" stroke="${A}" stroke-width="5" opacity="0.16" filter="url(#${id}-bm)"/>`);
  o.push(`<rect x="${f(fb.x)}" y="${f(fb.y)}" width="${f(fb.w)}" height="${f(fb.h)}" fill="none" stroke="${A}" stroke-width="1" opacity="0.55"/>`);
  o.push(bracketBox(fb.x, fb.y, fb.w, fb.h, mix(A, "#ffffff", 0.45), 0.95, 13, 1.7));
  o.push(`<rect x="${f(fb.x)}" y="${f(fb.y - 9)}" width="30" height="3.6" rx="1.8" fill="${A}" opacity="0.8"/>`);
  o.push(`<rect x="${f(fb.x + 34)}" y="${f(fb.y - 9)}" width="10" height="3.6" rx="1.8" fill="${A}" opacity="0.3"/>`);
  // the locked glyph, luminous
  o.push(glyph(fb.x + fb.w / 2 - 16, fb.y + fb.h / 2, 16, mix(A, "#ffffff", 0.55), 0.9, -4));
  o.push(glyph(fb.x + fb.w / 2 + 24, fb.y + fb.h / 2 + 2, 13, A, 0.65, -6));
  o.push(glowDot(id, fb.x + fb.w / 2, fb.y + fb.h / 2, 2.2, A, 0.9));

  // scanline through the focal row
  const sy = fb.y + fb.h / 2;
  o.push(line(80, sy, 1120, sy, A, 0.09, 0.9));
  o.push(line(fb.x - 64, sy, fb.x - 8, sy, A, 0.45, 1.2));
  o.push(line(fb.x + fb.w + 8, sy, fb.x + fb.w + 64, sy, A, 0.45, 1.2));
  return `<g>${o.join("")}</g>`;
}

/* 15. hackathons — a globe of arcs connecting city points, accent sparks */
function artHackathons({ id, A, S, R, defs }) {
  const o = [];
  const cx = 594, cy = 428, GR = 234;

  defs.push(`<clipPath id="${id}-globe"><circle cx="${f(cx)}" cy="${f(cy)}" r="${f(GR - 1)}"/></clipPath>`);
  defs.push(
    `<radialGradient id="${id}-sphere" cx="0.38" cy="0.32" r="0.95">` +
      `<stop offset="0" stop-color="${A}" stop-opacity="0.12"/>` +
      `<stop offset="0.55" stop-color="${A}" stop-opacity="0.04"/>` +
      `<stop offset="1" stop-color="#04060a" stop-opacity="0.5"/>` +
    `</radialGradient>`
  );

  // under-shadow, sphere shading, limb
  o.push(haze(id, cx, cy + GR * 0.9, GR * 1.1, 60, "#030508", 0.55));
  o.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(GR)}" fill="url(#${id}-sphere)"/>`);
  o.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(GR)}" fill="none" stroke="${A}" stroke-width="6" opacity="0.2" filter="url(#${id}-bm)"/>`);
  o.push(circle(cx, cy, GR, mix(A, "#ffffff", 0.25), 0.55, 1.2));

  // graticule, gently tilted
  const grat = [];
  for (const rx of [64, 132, 196]) {
    grat.push(`<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(rx)}" ry="${f(GR)}" fill="none" stroke="${A}" stroke-width="0.8" opacity="0.14"/>`);
  }
  for (const dy of [-128, -42, 52, 142]) {
    const rx = Math.sqrt(GR * GR - dy * dy);
    grat.push(`<ellipse cx="${f(cx)}" cy="${f(cy + dy)}" rx="${f(rx)}" ry="${f(rx * 0.16)}" fill="none" stroke="${A}" stroke-width="0.8" opacity="0.12"/>`);
  }
  o.push(`<g clip-path="url(#${id}-globe)"><g transform="rotate(-9 ${f(cx)} ${f(cy)})">${grat.join("")}</g></g>`);

  // cities — stratified around the visible hemisphere, one hub
  const cities = [{ x: cx - GR * 0.3 + rr(R, -14, 14), y: cy - GR * 0.14 + rr(R, -14, 14) }];
  const baseA = rr(R, 0, TAU);
  for (let i = 0; i < 8; i++) {
    const a = baseA + (i / 8) * TAU + rr(R, -0.24, 0.24);
    const r2 = GR * (i % 2 === 0 ? rr(R, 0.42, 0.62) : rr(R, 0.62, 0.86));
    cities.push({ x: cx + Math.cos(a) * r2, y: cy + Math.sin(a) * r2 * 0.92 });
  }
  const hub = cities[0];

  // arcs — great-circle suggestions bowing outward off the surface
  const arcs = [];
  const pairs = [[0, 2], [0, 4], [0, 6], [1, 5], [3, 7], [5, 8]];
  pairs.forEach(([ia, ib], k) => {
    const p1 = cities[ia], p2 = cities[ib];
    const mx = (p1.x + p2.x) / 2, my = (p1.y + p2.y) / 2;
    const chord = Math.hypot(p2.x - p1.x, p2.y - p1.y);
    let dxm = mx - cx, dym = my - cy;
    let m = Math.hypot(dxm, dym);
    if (m < 24) { dxm = -(p2.y - p1.y); dym = p2.x - p1.x; m = Math.hypot(dxm, dym) || 1; if (dym > 0) { dxm = -dxm; dym = -dym; } }
    const push = chord * 0.24 + 30 + rr(R, 0, 16);
    const ctl = { x: mx + (dxm / m) * push + rr(R, -8, 8), y: my + (dym / m) * push + rr(R, -8, 8) };
    const d = `M${f(p1.x)} ${f(p1.y)}Q${f(ctl.x)} ${f(ctl.y)} ${f(p2.x)} ${f(p2.y)}`;
    const focal = k === 0;
    if (focal) arcs.push(glowStroke(id, d, S, { w: 1.3, gw: 7, gop: 0.3, cop: 0.85, hot: 0.45 }));
    else arcs.push(`<path d="${d}" fill="none" stroke="${mix(S, INK, 0.25)}" stroke-width="1" opacity="${f(rr(R, 0.32, 0.5))}"/>`);
    // spark at the arc apex — amber
    const apex = { x: 0.25 * p1.x + 0.5 * ctl.x + 0.25 * p2.x, y: 0.25 * p1.y + 0.5 * ctl.y + 0.25 * p2.y };
    arcs.push(glowDot(id, apex.x, apex.y, focal ? 2.6 : rr(R, 1.3, 2), A, focal ? 1.3 : rr(R, 0.6, 0.9)));
    if (focal || k === 3) {
      arcs.push(line(apex.x - 7, apex.y, apex.x + 7, apex.y, mix(A, "#ffffff", 0.6), 0.5, 0.8));
      arcs.push(line(apex.x, apex.y - 7, apex.x, apex.y + 7, mix(A, "#ffffff", 0.6), 0.5, 0.8));
    }
  });
  o.push(`<g>${arcs.join("")}</g>`);

  // city lights over arcs
  cities.forEach((p, i) => {
    o.push(glowDot(id, p.x, p.y, i === 0 ? 3.6 : rr(R, 1.6, 2.6), S, i === 0 ? 1.4 : rr(R, 0.5, 0.9)));
    if (i === 0) o.push(circle(p.x, p.y, 9, S, 0.35, 0.9));
  });

  // a suggestion of orbit + free sparks
  o.push(`<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(GR * 1.35)}" ry="${f(GR * 0.4)}" transform="rotate(-16 ${f(cx)} ${f(cy)})" fill="none" stroke="${S}" stroke-width="0.8" opacity="0.09"/>`);
  for (let i = 0; i < 4; i++) {
    o.push(glowDot(id, rr(R, 120, 1080), rr(R, 90, 700), rr(R, 0.9, 1.6), A, rr(R, 0.4, 0.7)));
  }
  return `<g>${o.join("")}</g>`;
}

/* ================================================================== emit */

const SPECS = [
  { id: "maia", A: C.cyan, S: C.violet, build: artMaia },
  { id: "darwin", A: C.amber, S: C.violet, build: artDarwin },
  { id: "vireo", A: C.emerald, S: C.cyan, build: artVireo },
  { id: "agent0", A: C.teal, S: C.cyan, build: artAgent0 },
  { id: "miam", A: C.rose, S: C.violet, build: artMiam },
  { id: "cosmos", A: C.violet, S: C.cyan, build: artCosmos },
  { id: "rosicrucian", A: C.amber, S: C.violet, build: artRosicrucian },
  { id: "ethereal", A: C.violet, S: C.rose, build: artEthereal },
  { id: "flow", A: C.cyan, S: C.teal, build: artFlow },
  { id: "scrolltracker", A: C.emerald, S: C.teal, build: artScrollTracker },
  { id: "papervault", A: C.amber, S: C.cyan, build: artPaperVault },
  { id: "my4blocks", A: C.teal, S: C.amber, build: artMy4Blocks },
  { id: "artful", A: C.rose, S: C.amber, build: artArtful },
  { id: "ant-zai", A: C.cyan, S: C.violet, build: artAntZai },
  { id: "hackathons", A: C.violet, S: C.amber, build: artHackathons },
];

mkdirSync(OUT, { recursive: true });
let total = 0;
for (const spec of SPECS) {
  const R = rngFor(spec.id);
  const svg = scaffold(spec.id, spec.A, spec.S, R, spec.build);
  const file = join(OUT, `${spec.id}.svg`);
  writeFileSync(file, svg);
  total += svg.length;
  console.log(`${spec.id.padEnd(14)} ${(svg.length / 1024).toFixed(1).padStart(7)} KB`);
}
console.log(`\n15 covers -> ${OUT}  (total ${(total / 1024).toFixed(0)} KB)`);
