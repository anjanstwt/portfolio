'use client';

import { useEffect, useRef } from 'react';
import { useMotionValueEvent, useScroll } from 'motion/react';

const CELL = 30;
const SPANS = [1, 2, 2, 3, 3, 4, 5];
const TRIGGER_AT = 0.2;
const DURATION = 700; // ms, once triggered the reveal plays out on its own

const DARK = 'rgb(82, 82, 82)'; // neutral-600

type Block = {
    x: number;
    y: number;
    w: number;
    h: number;
    threshold: number;
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export default function PixelDissolve() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const blocksRef = useRef<Block[]>([]);
    const triggeredRef = useRef(false);
    const startTimeRef = useRef<number | null>(null);
    const rafRef = useRef(0);

    const { scrollYProgress } = useScroll();

    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        if (v >= TRIGGER_AT && !triggeredRef.current) {
            triggeredRef.current = true;
            startTimeRef.current = performance.now();
        } else if (v < TRIGGER_AT - 0.02 && triggeredRef.current) {
            triggeredRef.current = false;
            startTimeRef.current = null;
        }
    });

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;

        const buildBlocks = (width: number, height: number) => {
            const cols = Math.ceil(width / CELL);
            const rows = Math.ceil(height / CELL);
            const grid: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));
            const blocks: Block[] = [];

            for (let gy = 0; gy < rows; gy++) {
                for (let gx = 0; gx < cols; gx++) {
                    if (grid[gy][gx]) continue;

                    const spanX = SPANS[Math.floor(Math.random() * SPANS.length)];
                    const spanY = SPANS[Math.floor(Math.random() * SPANS.length)];

                    let w = 1;
                    while (w < spanX && gx + w < cols && !grid[gy][gx + w]) w++;

                    let h = 1;
                    rowScan: while (h < spanY && gy + h < rows) {
                        for (let cx = gx; cx < gx + w; cx++) {
                            if (grid[gy + h][cx]) break rowScan;
                        }
                        h++;
                    }

                    for (let cy = gy; cy < gy + h; cy++) {
                        for (let cx = gx; cx < gx + w; cx++) {
                            grid[cy][cx] = true;
                        }
                    }

                    blocks.push({
                        x: gx * CELL,
                        y: gy * CELL,
                        w: w * CELL,
                        h: h * CELL,
                        threshold: Math.random() * 0.8,
                    });
                }
            }

            blocksRef.current = blocks;
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            buildBlocks(canvas.width, canvas.height);
        };

        resize();
        window.addEventListener('resize', resize);

        const draw = () => {
            let progress = 0;
            if (triggeredRef.current && startTimeRef.current !== null) {
                progress = clamp01((performance.now() - startTimeRef.current) / DURATION);
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = DARK;
            for (const b of blocksRef.current) {
                if (progress < b.threshold) continue;
                ctx.fillRect(b.x, b.y, b.w, b.h);
            }
            rafRef.current = requestAnimationFrame(draw);
        };

        rafRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-10 pointer-events-none"
        />
    );
}
