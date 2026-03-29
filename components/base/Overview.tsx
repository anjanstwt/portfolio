'use client';

import { useEffect, useRef } from 'react';
import { user } from '../data/user';
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

import SectionHeading from '../ui/SectionHeading';

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

            ctx.filter = 'grayscale(100%)';
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            ctx.filter = 'none';

            const text = 'Core Builder';
            const fontSize = Math.min(96, canvas.width / 6); // Responsive font size
            ctx.font = `700 ${fontSize}px Iceland, sans-serif`;
            ctx.textBaseline = 'middle';

            ctx.fillStyle = '#09090b'; // match background
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#ffffff'; 

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
        <section className={cn("w-full flex flex-col gap-4", className)}>
            <SectionHeading title="Overview" extra='of me' />

            <div
                className="relative h-64 w-full overflow-hidden rounded-lg border border-neutral-800"
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
                <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center px-6 sm:px-8 bg-black/40">
                    <div className="flex flex-col gap-y-3 text-neutral-200 max-w-sm">
                        {user.map((u, i) => (
                            <UserCapsule key={i} icon={u.icon} data={u.data} link={u.link} />
                        ))}
                    </div>
                </div>

                <canvas ref={canvasRef} className="absolute inset-0 z-20 pointer-events-none" />
            </div>
        </section>
    );
}

function UserCapsule(u: { icon: IconType, data: string, link?: string }) {
    return (
        <div className="flex items-center gap-x-3">
            <div className="flex justify-center items-center bg-neutral-800/80 p-1.5 rounded border border-neutral-700/50">
                <u.icon className="w-4 h-4 text-neutral-300" />
            </div>
            <span className="text-sm text-neutral-300 font-medium drop-shadow-md">{u.data}</span>
        </div>
    )
}

