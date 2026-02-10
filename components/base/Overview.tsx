'use client';

import { useEffect, useRef } from 'react';
import Heading from '../ui/Heading';
import { user } from '../data/user';
import { HorizontalGap, VerticalGap } from '../ui/Gap';
import { Iceland } from 'next/font/google';
import { IconType } from 'react-icons/lib';
import { cn } from '@/lib/utils';

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

export default function Overview({ className }: { className?: string }) {
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

            /* ===============================
               1️⃣ DRAW PIXEL MASK
            =============================== */
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

            ctx.globalCompositeOperation = 'source-in';

            // Image
            ctx.filter = 'grayscale(100%)';
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            ctx.filter = 'none';

            // Perfectly centered Core Builder text
            const text = 'Core Builder';
            ctx.font = '700 96px Iceland, sans-serif';
            ctx.textBaseline = 'middle';

            // Background rectangle - you can change this color
            ctx.fillStyle = 'red'; // Dark background
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Text - different color
            ctx.fillStyle = '#ffffff'; // White text (or any color you want)

            const metrics = ctx.measureText(text);
            const x = (canvas.width - metrics.width) / 2;
            const y = canvas.height / 2;

            ctx.fillText(text, x, y);
            ctx.globalCompositeOperation = 'source-over';

            samplesRef.current = samplesRef.current.filter(s => s.life > 0.05);

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

                        if (d < BASE_RADIUS && Math.random() > 0.6) {
                            pixels.push({ x: px, y: py });
                        }
                    }
                }

                samplesRef.current.unshift({ pixels, life: 1 });
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
        <div 
            className={cn(
                "relative layout-side-border",
                className,
            )}
        >
            <Heading heading="overview" tag="Of me" />

            {/* IMPORTANT: fixed height so canvas can center correctly */}
            <div
                className="relative h-full overflow-hidden"
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
                {/* USER DATA (PAINTED LAYER → CAN BE ERASED) */}
                <div className="relative h-full z-10 pointer-events-none bg-secondary-dark pb-5 ">
                    <VerticalGap className="h-full absolute left-0 border-y-0 border-l-0" />
                    <VerticalGap className="h-full absolute right-0 border-y-0 border-r-0" />
                    <HorizontalGap className="border-x-0 border-t-0" />
                    <HorizontalGap className="border-x-0 absolute bottom-0 border-b-0" />

                    <div className="layout-double-padding flex flex-col gap-y-4 text-neutral-200">
                        {user.map((u, i) => (
                            <UserCapsule
                                key={i}
                                icon={u.icon}
                                data={u.data}
                                link={u.link}
                            />
                        ))}
                    </div>
                </div>

                {/* CANVAS — REVEAL + ERASER */}
                <canvas
                    ref={canvasRef}
                    className="
                        absolute inset-0
                        z-20
                        pointer-events-none
                    "
                />
            </div>
        </div>
    );
}

function UserCapsule(u: { icon: IconType, data: string, link?: string }) {
    return (
        <div className="flex items-center gap-x-4">
            <div
                className='flex justify-center items-center bg-primary-dark p-1 rounded-lg border border-secondary-dark outline outline-primary-dark '
            >
                <u.icon
                    className='flex justify-center items-center '
                />
            </div>
                <span>{u.data}</span>
        </div>
    )
}

