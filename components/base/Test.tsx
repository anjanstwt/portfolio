'use client';

import { useEffect, useRef } from 'react';
import Heading from '../ui/Heading';
import { user } from '../data/user';
import { HorizontalGap, VerticalGap } from '../ui/Gap';
import { Iceland } from 'next/font/google';

const iceland = Iceland({
    subsets: ['latin'],
    weight: ['400'],
});

type Pixel = {
    x: number;
    y: number;
};

type Sample = {
    pixels: Pixel[];
    life: number;
};

export default function Overview() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const samplesRef = useRef<Sample[]>([]);
    const mouseRef = useRef<{ x: number; y: number } | null>(null);
    const rafRef = useRef<number>(0);

    const PIXEL = 8;
    const BASE_RADIUS = 70;
    const DECAY = 0.03;
    const SAMPLE_RATE = 2;

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        const parent = canvas.parentElement!;

        const img = new Image();
        img.src = '/images/city.jpg';

        const resize = () => {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
        };

        resize();
        window.addEventListener('resize', resize);

        let tick = 0;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            /* =====================================
               1️⃣ DRAW PERSISTENT PIXEL MASK
            ===================================== */
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = 'white';

            samplesRef.current.forEach(s => {
                ctx.globalAlpha = s.life;

                s.pixels.forEach(p => {
                    ctx.fillRect(p.x, p.y, PIXEL, PIXEL);
                });

                s.life -= DECAY;
            });

            ctx.globalAlpha = 1;

            /* =====================================
               2️⃣ DRAW IMAGE + TEXT THROUGH MASK
            ===================================== */
            ctx.globalCompositeOperation = 'source-in';

            // Image
            ctx.filter = 'grayscale(100%)';
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            ctx.filter = 'none';

            // Core Builder text (same material)
            ctx.fillStyle = 'white';
            ctx.font = '700 96px Iceland, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(
                'Core Builder',
                canvas.width / 2,
                canvas.height / 2
            );

            ctx.globalCompositeOperation = 'source-over';

            /* =====================================
               3️⃣ CLEANUP OLD SAMPLES
            ===================================== */
            samplesRef.current = samplesRef.current.filter(s => s.life > 0.05);

            /* =====================================
               4️⃣ ADD NEW SAMPLE (ON MOVE)
            ===================================== */
            if (mouseRef.current && tick % SAMPLE_RATE === 0) {
                const { x, y } = mouseRef.current;
                const pixels: Pixel[] = [];

                const minX = Math.floor((x - BASE_RADIUS) / PIXEL) * PIXEL;
                const maxX = Math.floor((x + BASE_RADIUS) / PIXEL) * PIXEL;
                const minY = Math.floor((y - BASE_RADIUS) / PIXEL) * PIXEL;
                const maxY = Math.floor((y + BASE_RADIUS) / PIXEL) * PIXEL;

                for (let px = minX; px <= maxX; px += PIXEL) {
                    for (let py = minY; py <= maxY; py += PIXEL) {
                        const cx = px + PIXEL / 2;
                        const cy = py + PIXEL / 2;
                        const d = Math.hypot(cx - x, cy - y);

                        // randomness ONLY HERE (creation)
                        if (d < BASE_RADIUS && Math.random() > 0.6) {
                            pixels.push({ x: px, y: py });
                        }
                    }
                }

                samplesRef.current.unshift({
                    pixels,
                    life: 1,
                });

                if (samplesRef.current.length > 25) {
                    samplesRef.current.pop();
                }
            }

            tick++;
            rafRef.current = requestAnimationFrame(animate);
        };

        img.onload = animate;

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <div className="relative layout-side-border">
            <Heading heading="overview" tag="Of me" />

            <div
                className="relative h-80 overflow-hidden"
                onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    mouseRef.current = {
                        x: e.clientX - rect.left,
                        y: e.clientY - rect.top,
                    };
                }}
                onMouseLeave={() => {
                    mouseRef.current = null;
                    samplesRef.current = [];
                }}
            >
                {/* TEXT BELOW (ALWAYS VISIBLE) */}
                <div className="relative h-full z-10 pointer-events-none">
                    <VerticalGap className="h-full absolute left-0 border-y-0 border-l-0" />
                    <VerticalGap className="h-full absolute right-0 border-y-0 border-r-0" />
                    <HorizontalGap className="border-x-0 border-t-0" />
                    <HorizontalGap className="border-x-0 absolute bottom-0 border-b-0" />

                    <div className="layout-double-padding flex flex-col gap-y-4 text-neutral-200">
                        {user.map((u, i) => (
                            <div key={i} className="flex items-center gap-x-4">
                                <u.icon />
                                <span>{u.data}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CANVAS — IMAGE + CORE BUILDER AS ONE */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 z-0 pointer-events-none"
                />
            </div>
        </div>
    );
}
