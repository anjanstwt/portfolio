"use client";

import { useEffect, useRef } from "react";

// A stippled ring in white particles on a transparent background, after
// the reference: a round hole with an outer edge that is a larger circle
// offset up and to the left, so the band is thick over the top and left and
// thinner on the right and bottom. The band runs from a blunt, dense end at
// four o'clock counter-clockwise over the top and down the left, greying out
// through the bottom into a sparse tail at half past five, leaving a small
// gap. Dots are solid near the hole and thin out across the outer edge into
// a loose halo. Seeded, so every render is the same ring.

const SIZE = 720; // logical box
const CENTRE = { x: 365, y: 360 };
const INNER = 98; // radius of the hole
const OUTER = 222; // mean outer radius…
const OFFSET = 52; // …plus this much toward the up-left, less toward the down-right
const UP_LEFT = (-135 * Math.PI) / 180;
const HALO = 48; // stray dots beyond the outer edge
const START = (24 * Math.PI) / 180; // four o'clock, screen angle
const SWEEP = (312 * Math.PI) / 180; // counter-clockwise from there
const DOTS = 110000;

function mulberry32(seed: number) {
    return () => {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const smooth = (a: number, b: number, x: number) => {
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
};

// Outer radius at a screen angle: a circle offset toward the up-left.
const outer = (angle: number) => OUTER + OFFSET * Math.cos(angle - UP_LEFT);
// How dense the band is along the sweep: a blunt start, solid over the top
// and left, greying through the bottom, gone at the tail.
const presence = (t: number) => smooth(0, 0.04, t) * (1 - 0.72 * smooth(0.55, 0.9, t)) * (1 - smooth(0.9, 1, t));

function paint(canvas: HTMLCanvasElement, cssW: number, cssH: number, dpr: number) {
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const k = Math.min(canvas.width, canvas.height) / SIZE; // logical → device
    const ox = (canvas.width - SIZE * k) / 2;
    const oy = (canvas.height - SIZE * k) / 2;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#e6e6e6";
    const px = Math.max(1, Math.round(k * 1.05));
    const rnd = mulberry32(19);

    for (let i = 0; i < DOTS; i++) {
        const t = rnd();
        const p = presence(t);
        if (rnd() > p) continue;
        const angle = START - t * SWEEP;
        const th = outer(angle) - INNER;

        // radial placement: solid across the inner three quarters of the
        // band, thinning over the outer edge, with strays in the halo
        let r: number;
        let a: number;
        const u = rnd();
        if (u < 0.88) {
            const v = Math.pow(rnd(), 0.8);
            r = INNER + v * th;
            a = 0.92 * (1 - Math.pow(v, 5)) * (0.55 + 0.45 * p);
        } else {
            const v = Math.pow(rnd(), 2);
            r = INNER + th + v * HALO;
            a = 0.45 * (1 - v) * (0.5 + 0.5 * p);
        }
        r -= rnd() * rnd() * 4; // a whisper of softness on the inner rim

        const x = CENTRE.x + Math.cos(angle) * r;
        const y = CENTRE.y + Math.sin(angle) * r;
        ctx.globalAlpha = Math.min(1, a);
        ctx.fillRect(Math.round(ox + x * k), Math.round(oy + y * k), px, px);
    }
    ctx.globalAlpha = 1;
}

export default function ParticleRing({ className }: { className?: string }) {
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
    }, []);

    return <canvas ref={ref} className={className} style={{ aspectRatio: "1 / 1" }} aria-hidden />;
}
