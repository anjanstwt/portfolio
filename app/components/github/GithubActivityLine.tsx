"use client";

import { useMemo, useState, type PointerEvent } from "react";
import { cn } from "@/lib/utils";
import { useGithubContributions } from "./useGithubContributions";

interface GithubActivityLineProps {
    username: string;
    className?: string;
    /** Single hue — this is a one-series chart, so color carries no identity. */
    stroke?: string;
    /** Pixel distance between two consecutive days' points. */
    daySpacing?: number;
}

const HEIGHT = 120;
const PAD_Y = 6;

export default function GithubActivityLine({
    username,
    className,
    stroke = "#39d353",
    daySpacing = 4,
}: GithubActivityLineProps) {
    const data = useGithubContributions(username);
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);

    const points = useMemo(() => {
        if (!data || data.length === 0) return null;
        const max = Math.max(1, ...data.map((d) => d.count));
        return data.map((d, i) => ({
            x: i * daySpacing,
            y: HEIGHT - PAD_Y - (d.count / max) * (HEIGHT - PAD_Y * 2),
            ...d,
        }));
    }, [data, daySpacing]);

    if (!points) {
        return (
            <div className={cn("relative", className)}>
                <div className="h-full w-full animate-pulse rounded-md bg-white/5" />
            </div>
        );
    }

    const width = daySpacing * (points.length - 1);

    const linePath = points
        .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
        .join(" ");
    const last = points[points.length - 1];
    const first = points[0];
    const areaPath = `${linePath} L${last.x.toFixed(1)},${HEIGHT} L${first.x.toFixed(1)},${HEIGHT} Z`;

    const hovered = hoverIndex !== null ? points[hoverIndex] : null;

    function handleMove(e: PointerEvent<SVGSVGElement>) {
        const rect = e.currentTarget.getBoundingClientRect();
        const ratio = (e.clientX - rect.left) / rect.width;
        const idx = Math.round(ratio * (points!.length - 1));
        setHoverIndex(Math.min(points!.length - 1, Math.max(0, idx)));
    }

    return (
        <div className={cn("relative overflow-x-auto hide-scrollbar", className)}>
            <svg
                viewBox={`0 0 ${width} ${HEIGHT}`}
                width={width}
                preserveAspectRatio="none"
                className="h-full overflow-visible"
                onPointerMove={handleMove}
                onPointerLeave={() => setHoverIndex(null)}
            >
                <defs>
                    <linearGradient id="github-activity-fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={stroke} stopOpacity={0.35} />
                        <stop offset="100%" stopColor={stroke} stopOpacity={0} />
                    </linearGradient>
                </defs>

                <path d={areaPath} fill="url(#github-activity-fill)" stroke="none" />
                <path
                    d={linePath}
                    fill="none"
                    stroke={stroke}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {hovered && (
                    <>
                        <line
                            x1={hovered.x}
                            x2={hovered.x}
                            y1={0}
                            y2={HEIGHT}
                            stroke="white"
                            strokeOpacity={0.1}
                            strokeWidth={1}
                        />
                        <circle
                            cx={hovered.x}
                            cy={hovered.y}
                            r={3}
                            fill={stroke}
                            stroke="#171717"
                            strokeWidth={1.5}
                        />
                    </>
                )}
            </svg>

            {hovered && (
                <div
                    className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-md bg-black/80 px-2 py-1 text-[10px] text-neutral-100 whitespace-nowrap"
                    style={{
                        left: hovered.x,
                        top: `${(hovered.y / HEIGHT) * 100}%`,
                    }}
                >
                    {hovered.count} contribution{hovered.count === 1 ? "" : "s"} · {hovered.date}
                </div>
            )}
        </div>
    );
}
