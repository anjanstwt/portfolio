"use client";

import { useEffect, useRef } from "react";

// The skyline sheet, drawn with white particles only. Density stands in for
// the reference's colour: the sheet's gradient becomes a sprinkle that
// thickens toward the edges, buildings are dotted fills with denser
// outlines, and the histogram is columns of dots. Painted once to a canvas
// (and again on resize) with a seeded RNG, so every render is the same
// picture.

const W = 900; // logical sheet width
const H = 1000; // logical sheet height
const BASE = 760; // ground line for buildings and bars

function mulberry32(seed: number) {
    return () => {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

/* ─── geometry ──────────────────────────────────────────────────────────── */

interface Block {
    x: number;
    w: number;
    h: number;
    depth: number; // 0 = far/dim, 1 = near/bright
}

const BLOCKS: Block[] = (() => {
    const rnd = mulberry32(11);
    const out: Block[] = [];
    for (let i = 0; i < 26; i++) {
        const x = 90 + rnd() * 700;
        const centre = 1 - Math.min(1, Math.abs(x - 450) / 330);
        out.push({ x, w: 26 + rnd() * 64, h: 50 + rnd() * 120 + centre * 150 * rnd(), depth: rnd() });
    }
    return out.sort((a, b) => a.depth - b.depth);
})();

// The spired tower: base, shaft, crown and needle.
const TOWER = [
    { x: 380, w: 150, h: 70 },
    { x: 398, w: 114, h: 190 },
    { x: 415, w: 80, h: 330 },
    { x: 433, w: 44, h: 380 },
    { x: 447, w: 16, h: 420 },
];

const BARS = (() => {
    const rnd = mulberry32(23);
    const out: { x: number; h: number; heavy: boolean }[] = [];
    const n = 96;
    for (let i = 0; i < n; i++) {
        const t = i / (n - 1);
        const bump = Math.exp(-(((t - 0.5) / 0.28) ** 2));
        const trend = 0.25 + 0.75 * t;
        out.push({ x: 100 + i * 7.4, h: 30 + 300 * bump * trend + rnd() * 70, heavy: i % 3 === 0 });
    }
    return out;
})();

const GRID = 64;

/* ─── painters ──────────────────────────────────────────────────────────── */

// Fade toward the bottom of the sheet, where it dissolves into the floor.
const fade = (y: number) => (y < 600 ? 1 : Math.pow(Math.max(0, 1 - (y - 600) / 400), 1.6));

function paintSheet(canvas: HTMLCanvasElement, cssW: number, cssH: number, dpr: number) {
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const k = (cssW * dpr) / W; // logical → device
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#e6e6e6";
    const rnd = mulberry32(7);
    const px = Math.max(1, Math.round(k * 1.1)); // one particle, in device px
    const dot = (x: number, y: number, a: number, size = px) => {
        if (a <= 0.004) return;
        ctx.globalAlpha = Math.min(1, a);
        ctx.fillRect(Math.round(x * k), Math.round(y * k), size, size);
    };
    // Dotted fill of an axis-aligned rect.
    const fill = (x0: number, y0: number, w: number, h: number, spacing: number, a: number) => {
        for (let y = y0; y < y0 + h; y += spacing) {
            for (let x = x0; x < x0 + w; x += spacing) {
                dot(x + (rnd() - 0.5) * spacing * 0.8, y + (rnd() - 0.5) * spacing * 0.8, a * fade(y));
            }
        }
    };
    // Dotted line between two points.
    const line = (x0: number, y0: number, x1: number, y1: number, spacing: number, a: number, size = px) => {
        const len = Math.hypot(x1 - x0, y1 - y0);
        const n = Math.max(1, Math.floor(len / spacing));
        for (let i = 0; i <= n; i++) {
            const t = i / n;
            const y = y0 + (y1 - y0) * t;
            dot(x0 + (x1 - x0) * t, y, a * fade(y), size);
        }
    };
    const outline = (x: number, y: number, w: number, h: number, a: number) => {
        line(x, y, x + w, y, 2, a);
        line(x + w, y, x + w, y + h, 2, a);
        line(x, y + h, x + w, y + h, 2, a);
        line(x, y, x, y + h, 2, a);
    };

    // the sheet: a sprinkle that thickens toward the left and right edges,
    // where the reference is most saturated
    for (let y = 0; y < H; y += 7) {
        for (let x = 0; x < W; x += 7) {
            const edge = 0.5 + 0.5 * Math.abs(x - 450) / 450;
            dot(x + (rnd() - 0.5) * 6, y + (rnd() - 0.5) * 6, 0.14 * edge * fade(y));
        }
    }

    // graph paper
    for (let gy = GRID; gy < H; gy += GRID) line(0, gy, W, gy, 5, 0.35);
    for (let gx = GRID; gx < W; gx += GRID) line(gx, 0, gx, H, 5, 0.35);
    for (let gx = GRID; gx < W; gx += GRID) {
        for (let gy = GRID; gy < H; gy += GRID) {
            if (rnd() < 0.22) dot(gx, gy, 0.9 * fade(gy), px * 2);
        }
    }

    // towers, far to near
    for (const b of BLOCKS) {
        const top = BASE - b.h;
        const d = Math.max(6, b.w * 0.18);
        fill(b.x, top, b.w, b.h, 3.6, 0.16 + 0.22 * b.depth);
        outline(b.x, top, b.w, b.h, 0.45 + 0.4 * b.depth);
        // the shaded side face, sparser
        for (let y = top; y < BASE; y += 5) {
            for (let s = 0; s < d; s += 5) dot(b.x + b.w + s, y - s * 0.8, 0.12 * fade(y));
        }
        line(b.x + b.w, top, b.x + b.w + d, top - d * 0.8, 2, 0.6 + 0.3 * b.depth);
    }

    // the spired tower
    for (const t of TOWER) {
        const top = BASE - t.h;
        fill(t.x, top, t.w, t.h, 2.6, 0.5);
        outline(t.x, top, t.w, t.h, 1);
    }
    line(455, BASE - 420, 455, BASE - 560, 2, 1);
    for (let i = 0; i < 12; i++) dot(455 + (rnd() - 0.5) * 30, BASE - 420 - rnd() * 150, 0.8, px * 2);

    // histogram in front
    for (const b of BARS) {
        line(b.x, BASE - b.h, b.x, BASE, 2.2, 0.75);
        if (b.heavy) line(b.x + 1.6, BASE - b.h, b.x + 1.6, BASE, 2.2, 0.55);
    }
    line(90, BASE + 2, 820, BASE + 2, 3, 0.7);
    ctx.globalAlpha = 1;
}

/* ─── components ────────────────────────────────────────────────────────── */

function useCanvasPainter(paint: (c: HTMLCanvasElement, w: number, h: number, dpr: number) => void) {
    const ref = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        let timer = 0;
        const render = () => {
            const { width, height } = el.getBoundingClientRect();
            if (width && height) paint(el, width, height, Math.min(2, window.devicePixelRatio || 1));
        };
        const ro = new ResizeObserver(() => {
            window.clearTimeout(timer);
            timer = window.setTimeout(render, 120);
        });
        ro.observe(el);
        render();
        return () => {
            ro.disconnect();
            window.clearTimeout(timer);
        };
    }, [paint]);
    return ref;
}

export function SkylineSheet({ className }: { className?: string }) {
    const ref = useCanvasPainter(paintSheet);
    return <canvas ref={ref} className={className} style={{ aspectRatio: `${W} / ${H}` }} aria-hidden />;
}
