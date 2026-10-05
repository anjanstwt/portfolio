"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HeightNoteProps {
    children: ReactNode;
    className?: string;
    side?: "left" | "right";
}

export default function HeightNote({ children, className, side = "left" }: HeightNoteProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number | null>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new ResizeObserver(([entry]) => {
            setHeight(Math.round(entry.contentRect.height));
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className={cn("relative", className)}>
            {children}
            <div
                aria-hidden
                className={cn(
                    "pointer-events-none max-[1105px]:hidden absolute inset-y-0 flex items-center gap-2 text-mute",
                    side === "left" ? "right-full mr-3" : "left-full ml-3 flex-row-reverse",
                )}
            >
                <span
                    className={cn(
                        "font-handwriting text-xl leading-none whitespace-nowrap",
                        side === "left" ? "rotate-6 origin-right" : "-rotate-6 origin-left",
                    )}
                >
                    {height === null ? "" : `${height}px`}
                </span>
                <svg
                    viewBox="0 0 16 100"
                    preserveAspectRatio="none"
                    className="h-full w-4 overflow-visible"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path vectorEffect="non-scaling-stroke" d="M2.2 0.9 C 6 0.4, 10.5 0.6, 14 0.2" />
                    <path vectorEffect="non-scaling-stroke" d="M2 99.6 C 6.5 99.2, 10 99.5, 14.2 99" />
                    <path
                        vectorEffect="non-scaling-stroke"
                        d="M8.1 1.2 C 9.2 18, 6.9 36, 8.3 52 C 9.4 68, 7 84, 7.9 98.8"
                    />
                    <path vectorEffect="non-scaling-stroke" d="M5.3 4.6 C 6.3 3.4, 7.3 2.2, 8.1 1.2 C 9 2.3, 9.9 3.4, 11.1 4.3" />
                    <path vectorEffect="non-scaling-stroke" d="M5.1 95.6 C 6.1 96.7, 7 97.8, 7.9 98.8 C 8.9 97.7, 9.9 96.6, 10.9 95.3" />
                </svg>
            </div>
        </div>
    );
}
