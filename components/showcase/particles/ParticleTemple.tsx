"use client";

import { useEffect, useRef } from "react";

// A Greek temple drawn as a volumetric point cloud: ~60k thin vertical
// strands, each lit only along the z-ranges where it passes through a solid
// (steps, columns, cella, entablature, roof). Density does the shading —
// strands never occlude each other, they just stack up. Above the roof every
// strand keeps going as a fading "rain" of dots; under the base a haze of
// scattered dots pools on the ground plane. Everything is white on the ink
// background; brightness comes from how many strands overlap a pixel.
//
// Strands are rasterised by hand into a transparency buffer (one float per
// device pixel, source-over stacking) and pushed to the canvas as ImageData.
// Doing it in software rather than with canvas strokes keeps the result
// identical across GPU / CPU rasterisers, which disagree about how
// overlapping hairlines accumulate. A second canvas animates a few hundred
// dots rising along the rain.

/* ─── world geometry — one unit is one column spacing ───────────────────── */
const NX = 10; // columns along the long side (runs down-right on screen)
const NY = 8; // columns along the short, pedimented side (runs down-left)
const COL_R = 0.17;
const STEP_H = 0.14; // three-step stylobate
const BASE_TOP = STEP_H * 3;
const COL_TOP = BASE_TOP + 3.6;
const ARCH_TOP = COL_TOP + 0.3; // architrave
const ENT_TOP = ARCH_TOP + 0.34; // frieze
const ROOF_BASE = ENT_TOP + 0.22; // cornice / eaves
const PED_H = 1.25; // ridge height above the eaves
const RAIN_H = 6; // how far the strands reach above the roof

type Rect = { x0: number; x1: number; y0: number; y1: number };
const grow = (r: Rect, d: number): Rect => ({ x0: r.x0 - d, x1: r.x1 + d, y0: r.y0 - d, y1: r.y1 + d });
const inside = (r: Rect, x: number, y: number) => x >= r.x0 && x <= r.x1 && y >= r.y0 && y <= r.y1;

const COLS: Rect = { x0: 0, x1: NX - 1, y0: 0, y1: NY - 1 };
const ENT = grow(COLS, 0.32);
const ROOF = grow(ENT, 0.2);
const CELLA = grow(COLS, -1.3);
const STEPS = [grow(COLS, 0.4), grow(COLS, 0.65), grow(COLS, 0.9)]; // top → bottom
const GROUND = STEPS[2];

// Gabled roof: the ridge runs along x, so height depends on y only. The
// triangular gable ends are what read as the pediments.
const YC = (NY - 1) / 2;
const HALF_W = (ROOF.y1 - ROOF.y0) / 2;
const roofZ = (y: number) => ROOF_BASE + PED_H * Math.max(0, 1 - Math.abs(y - YC) / HALF_W);

/* ─── projection — a stylised dimetric view, near corner at the bottom ──── */
const A = (15 * Math.PI) / 180; // slope of the left (short) face
const B = (19 * Math.PI) / 180; // slope of the right (long) face
const cosA = Math.cos(A), sinA = Math.sin(A), cosB = Math.cos(B), sinB = Math.sin(B);

/* ─── strand weights — alpha per strand, stacked with source-over ───────── */
const W = {
    step: 0.04,
    pool: [0.03, 0.012], // light at the foot of the colonnade: low, then higher
    column: [0.26, 0.13], // lower shaft, upper shaft
    capital: 0.22,
    cella: 0.01,
    architrave: 0.12,
    frieze: 0.1,
    friezeRelief: 0.7,
    roof: 0.05,
    cornice: 0.1,
    tympanum: 0.7,
    rakingEdge: 0.9,
    gableCornice: 0.85,
    acroteria: 0.2,
    through: 0.003,
    rainLine: [0.012, 0.008, 0.004],
    rainDot: [0.1, 0.5], // base + bonus at the roof, fading with height
    roofTop: [0.3, 0.75], // plain / on the tile grid
    groundDot: [0.06, 0.3],
    haze: [0.18, 0.07],
};

// Deterministic RNG so a resize re-renders the same temple, not a reshuffle.
function mulberry32(seed: number) {
    return () => {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

type Riser = { x: number; y0: number; len: number; p: number; v: number };

function paint(canvas: HTMLCanvasElement, width: number, height: number, dpr: number): Riser[] {
    const PW = Math.round(width * dpr);
    const PH = Math.round(height * dpr);
    canvas.width = PW;
    canvas.height = PH;
    const ctx = canvas.getContext("2d");
    if (!ctx) return [];

    const rnd = mulberry32(7);

    // Fit: bound the ground footprint at z=0 and the roof footprint at (most
    // of) the rain height, then scale + centre that box in the canvas.
    const corners = (r: Rect, z: number) =>
        [[r.x0, r.y0], [r.x1, r.y0], [r.x0, r.y1], [r.x1, r.y1]].map(([x, y]) => [
            x * cosB - y * cosA,
            -(x * sinB + y * sinA + z),
        ]);
    const pts = [...corners(GROUND, 0), ...corners(ROOF, ROOF_BASE + PED_H + RAIN_H * 0.55)];
    const minX = Math.min(...pts.map((p) => p[0])), maxX = Math.max(...pts.map((p) => p[0]));
    const minY = Math.min(...pts.map((p) => p[1])), maxY = Math.max(...pts.map((p) => p[1]));
    const s = Math.min((width * 0.9) / (maxX - minX), (height * 0.94) / (maxY - minY));
    const cx = width / 2 - ((minX + maxX) / 2) * s;
    const cy = height / 2 - ((minY + maxY) / 2) * s;

    // CSS-pixel projection; strands snap to an integer device column.
    const px = (x: number, y: number) => (x * cosB - y * cosA) * s + cx;
    const py = (x: number, y: number, z: number) => -(x * sinB + y * sinA + z) * s + cy;
    const column = (v: number) => Math.round(v * dpr - 0.5);

    // Transparency buffer: t = Π(1 - a) over everything drawn on that pixel.
    const t = new Float32Array(PW * PH).fill(1);
    const seg = (c: number, yA: number, yB: number, a: number) => {
        if (c < 0 || c >= PW) return;
        let y0 = Math.round(Math.min(yA, yB) * dpr), y1 = Math.round(Math.max(yA, yB) * dpr);
        if (y0 < 0) y0 = 0;
        if (y1 > PH) y1 = PH;
        const m = 1 - a;
        for (let y = y0, i = y0 * PW + c; y < y1; y++, i += PW) t[i] *= m;
    };
    const spot = (c: number, yCss: number, a: number, size = 1) => {
        const y = Math.round(yCss * dpr);
        const m = 1 - a;
        for (let dy = 0; dy < size; dy++) {
            const yy = y + dy;
            if (yy < 0 || yy >= PH) continue;
            for (let dx = 0; dx < size; dx++) {
                const xx = c + dx;
                if (xx >= 0 && xx < PW) t[yy * PW + xx] *= m;
            }
        }
    };

    /* ground dots — scattered on z=0, thinning out away from the base */
    for (let i = 0; i < 10000; i++) {
        const x = GROUND.x0 - 3 + rnd() * (GROUND.x1 - GROUND.x0 + 6);
        const y = GROUND.y0 - 3 + rnd() * (GROUND.y1 - GROUND.y0 + 6);
        const d = Math.max(0, GROUND.x0 - x, x - GROUND.x1, GROUND.y0 - y, y - GROUND.y1);
        if (rnd() > Math.exp(-(d * d) / 2.2)) continue;
        spot(column(px(x, y)), py(x, y, 0), W.groundDot[0] + rnd() * W.groundDot[1]);
    }

    /* strands */
    const risers: Riser[] = [];
    // Strands per device column go as 1 / (spacing² · s · dpr), so this keeps
    // the per-pixel overlap — and with it the brightness — the same at any
    // canvas size. Works out to ~1.7 CSS px apart at the desktop width.
    const spacing = 0.39 / Math.sqrt(s * dpr);
    const tileGrid = (v: number) => ((v % 0.33) + 0.33) % 0.33 < spacing * 0.9;

    for (let gx = GROUND.x0; gx <= GROUND.x1; gx += spacing) {
        for (let gy = GROUND.y0; gy <= GROUND.y1; gy += spacing) {
            const x = gx + (rnd() - 0.5) * spacing;
            const y = gy + (rnd() - 0.5) * spacing;
            const c = column(px(x, y));
            const Y = (z: number) => py(x, y, z);

            // stepped base — a strand inside the top step is inside all three
            for (let k = 0; k < 3; k++) {
                if (inside(STEPS[k], x, y)) seg(c, Y((2 - k) * STEP_H), Y((3 - k) * STEP_H), W.step);
            }
            // light pooling at the foot of the colonnade
            if (inside(ENT, x, y)) {
                seg(c, Y(0), Y(0.5), W.pool[0]);
                seg(c, Y(0.5), Y(1.2), W.pool[1]);
            }

            // peristyle columns, brighter at the foot, capped with a capital
            const nx = Math.round(x), ny = Math.round(y);
            const onRing = nx >= 0 && nx < NX && ny >= 0 && ny < NY && (nx === 0 || nx === NX - 1 || ny === 0 || ny === NY - 1);
            if (onRing) {
                const d = Math.hypot(x - nx, y - ny);
                if (d < COL_R) {
                    seg(c, Y(BASE_TOP), Y(BASE_TOP + 1.2), W.column[0]);
                    seg(c, Y(BASE_TOP + 1.2), Y(COL_TOP - 0.22), W.column[1]);
                }
                if (d < 0.27) seg(c, Y(COL_TOP - 0.22), Y(COL_TOP), W.capital);
            }

            // cella — the dim inner mass seen between the columns
            if (inside(CELLA, x, y)) seg(c, Y(BASE_TOP), Y(COL_TOP), W.cella);

            // entablature, with a sculpted frieze texture on the outer faces
            if (inside(ENT, x, y)) {
                seg(c, Y(COL_TOP), Y(ARCH_TOP), W.architrave);
                seg(c, Y(ARCH_TOP), Y(ENT_TOP), W.frieze);
                const e = Math.min(x - ENT.x0, ENT.x1 - x, y - ENT.y0, ENT.y1 - y);
                if (e < 0.12 && rnd() < 0.5) spot(c, Y(ARCH_TOP + rnd() * 0.3), W.friezeRelief);
            }

            // roof + pediments, then the rain that rises off the roof surface
            if (inside(ROOF, x, y)) {
                const zr = roofZ(y);
                seg(c, Y(ENT_TOP), Y(zr), W.roof);

                // cornice band around the eaves
                const rim = Math.min(x - ROOF.x0, ROOF.x1 - x, y - ROOF.y0, ROOF.y1 - y);
                if (rim < 0.1) seg(c, Y(ENT_TOP), Y(ROOF_BASE), W.cornice);

                // tympanum relief, raking edge and cornice line on the gable ends
                const e = Math.min(x - ROOF.x0, ROOF.x1 - x);
                if (e < 0.12) {
                    if (rnd() < 0.6) spot(c, Y(ROOF_BASE + rnd() * (zr - ROOF_BASE)), W.tympanum);
                    spot(c, Y(zr), W.rakingEdge, 2);
                    seg(c, Y(ROOF_BASE - 0.04), Y(ROOF_BASE + 0.04), W.gableCornice);
                }

                // acroteria — small ornaments on the four corners and ridge ends
                const corner = Math.min(e, Math.min(y - ROOF.y0, ROOF.y1 - y)) < 0.22;
                const ridgeEnd = e < 0.22 && Math.abs(y - YC) < 0.18;
                if (corner || ridgeEnd) seg(c, Y(zr), Y(zr + 0.32), W.acroteria);

                // faint through-line: ground to the top of the rain
                seg(c, Y(0), Y(zr + RAIN_H), W.through);

                // rain: a faint line fading in three steps, and distinct dots
                // that crowd the roof surface and thin out with height
                const h = RAIN_H * (0.1 + 0.9 * Math.pow(rnd(), 1.5));
                seg(c, Y(zr), Y(zr + h * 0.3), W.rainLine[0]);
                seg(c, Y(zr + h * 0.3), Y(zr + h * 0.65), W.rainLine[1]);
                seg(c, Y(zr + h * 0.65), Y(zr + h), W.rainLine[2]);
                if (rnd() < 0.7) {
                    const n = 2 + Math.floor(rnd() * 6);
                    for (let i = 0; i < n; i++) {
                        const dz = RAIN_H * Math.pow(rnd(), 1.3);
                        const a = W.rainDot[0] + W.rainDot[1] * Math.pow(1 - dz / RAIN_H, 2);
                        spot(c, Y(zr + dz), a, rnd() < 0.25 ? 2 : 1);
                    }
                }

                // the roof surface itself, with a tile grid picked out brighter
                spot(c, Y(zr), tileGrid(x) || tileGrid(y) ? W.roofTop[1] : W.roofTop[0]);

                if (rnd() < 0.012) {
                    risers.push({ x: (c + 0.5) / dpr, y0: Y(zr), len: RAIN_H * s, p: rnd(), v: 0.03 + rnd() * 0.05 });
                }
            }
        }
    }

    // Resolve the buffer to white pixels with alpha = 1 - t.
    const img = ctx.createImageData(PW, PH);
    const data = img.data;
    for (let i = 0, j = 0; i < t.length; i++, j += 4) {
        const v = 1 - t[i];
        if (v <= 0.002) continue;
        data[j] = 232;
        data[j + 1] = 232;
        data[j + 2] = 232;
        data[j + 3] = v * 255;
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.putImageData(img, 0, 0);

    /* ground haze — a soft ellipse under the base, laid over the strands */
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const gx = px((GROUND.x0 + GROUND.x1) / 2, (GROUND.y0 + GROUND.y1) / 2);
    const gy = py((GROUND.x0 + GROUND.x1) / 2, (GROUND.y0 + GROUND.y1) / 2, 0.2);
    const rx = (maxX - minX) * s * 0.5;
    const ry = rx * 0.42;
    ctx.save();
    ctx.translate(gx, gy);
    ctx.scale(1, ry / rx);
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
    g.addColorStop(0, `rgba(255,255,255,${W.haze[0]})`);
    g.addColorStop(0.45, `rgba(255,255,255,${W.haze[1]})`);
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(-rx, -rx, rx * 2, rx * 2);
    ctx.restore();

    return risers;
}

export default function ParticleTemple({ className = "" }: { className?: string }) {
    const wrap = useRef<HTMLDivElement>(null);
    const base = useRef<HTMLCanvasElement>(null);
    const anim = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const el = wrap.current, bc = base.current, ac = anim.current;
        if (!el || !bc || !ac) return;

        let risers: Riser[] = [];
        let dpr = 1;
        let raf = 0;
        let last = 0;
        let visible = false;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const draw = (t: number) => {
            raf = 0;
            if (!visible || reduced) return;
            const dt = last ? Math.min(0.05, (t - last) / 1000) : 0;
            last = t;
            const ctx = ac.getContext("2d");
            if (ctx) {
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                ctx.clearRect(0, 0, ac.width / dpr, ac.height / dpr);
                ctx.fillStyle = "#f2f2f2";
                const size = 1.5 / dpr;
                for (const r of risers) {
                    r.p += r.v * dt;
                    if (r.p > 1) r.p -= 1;
                    // fade in just above the roof, fade out toward the top
                    ctx.globalAlpha = Math.min(1, r.p * 10) * (1 - r.p) * 0.8;
                    ctx.fillRect(r.x - size / 2, r.y0 - r.p * r.len - size / 2, size, size);
                }
                ctx.globalAlpha = 1;
            }
            raf = requestAnimationFrame(draw);
        };
        const start = () => {
            if (!raf && visible) {
                last = 0;
                raf = requestAnimationFrame(draw);
            }
        };

        let timer = 0;
        const render = () => {
            const { width, height } = el.getBoundingClientRect();
            if (!width || !height) return;
            dpr = Math.min(2, window.devicePixelRatio || 1);
            risers = paint(bc, width, height, dpr);
            ac.width = bc.width;
            ac.height = bc.height;
            start();
        };
        const ro = new ResizeObserver(() => {
            window.clearTimeout(timer);
            timer = window.setTimeout(render, 150);
        });
        ro.observe(el);

        // only animate while on screen
        const io = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible) start();
        });
        io.observe(el);

        render();
        return () => {
            ro.disconnect();
            io.disconnect();
            window.clearTimeout(timer);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <div ref={wrap} className={`relative ${className}`} aria-hidden>
            <canvas ref={base} className="absolute inset-0 h-full w-full" />
            <canvas ref={anim} className="absolute inset-0 h-full w-full" />
        </div>
    );
}
