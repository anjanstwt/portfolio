"use client";

import { motion } from "framer-motion";
import { Pause, Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { ViewProps } from "../../../types/island.type";

const INITIAL_SECONDS = 60;

function formatTime(total: number) {
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function TimerView({ onClose }: ViewProps) {
    const [seconds, setSeconds] = useState(INITIAL_SECONDS);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;
        const id = setInterval(() => {
            setSeconds((prev) => (prev <= 1 ? INITIAL_SECONDS : prev - 1));
        }, 1000);
        return () => clearInterval(id);
    }, [isPaused]);

    return (
        <div className="flex h-full w-full items-center px-5 pr-6 text-white">
            <motion.button
                type="button"
                onClick={() => setIsPaused((p) => !p)}
                whileTap={{ scale: 0.9 }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#5A3B08]"
                aria-label={isPaused ? "resume" : "pause"}
            >
                {isPaused ? (
                    <Play className="h-4.5 w-4.5 fill-[#FDB100] text-[#FDB100]" />
                ) : (
                    <Pause className="h-4.5 w-4.5 fill-[#FDB100] text-[#FDB100]" />
                )}
            </motion.button>

            <motion.button
                type="button"
                onClick={onClose}
                whileTap={{ scale: 0.9 }}
                className="ml-1.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2a2a2a]"
                aria-label="close"
            >
                <X className="h-4.5 w-4.5 text-white" />
            </motion.button>

            <div className="flex flex-1 items-baseline justify-end gap-2">
                <span className="text-[14px] text-[#FDB100]">Timer</span>
                <span className="font-mono text-[25px] leading-none text-[#FDB100] tabular-nums">
                    {formatTime(seconds)}
                </span>
            </div>
        </div>
    );
}
