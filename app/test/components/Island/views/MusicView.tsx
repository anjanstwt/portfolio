"use client";

import { motion } from "framer-motion";
import { FastForward, Pause, Rewind } from "lucide-react";

function WaveformEqualizer() {
    const bars = 9;
    return (
        <div className="flex h-6 items-center gap-0.75">
            {Array.from({ length: bars }).map((_, i) => (
                <motion.span
                    key={i}
                    className="w-0.75 rounded-full bg-blue-500"
                    animate={{ height: ["6px", "22px", "10px", "18px", "6px"] }}
                    transition={{
                        duration: 1.1,
                        repeat: Infinity,
                        delay: i * 0.08,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}

export default function MusicView() {
    return (
        <div className="flex h-full w-full flex-col justify-between px-7 py-6 text-white">
            <div className="flex items-center gap-3">
                <motion.div
                    layout
                    className="h-12 w-12 shrink-0 rounded-lg bg-linear-to-b from-orange-400 via-rose-300 to-indigo-300"
                    whileHover={{ scale: 1.05, rotate: -2 }}
                />
                <div className="min-w-0 flex-1">
                    <p className="text-[15px] leading-[1.05] font-semibold tracking-tight">Glow</p>
                    <p className="text-[15px] leading-[1.05] font-semibold tracking-tight">Echo</p>
                </div>
                <WaveformEqualizer />
            </div>

            <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-white/90 tabular-nums">00:04</span>
                <div className="relative h-0.75 flex-1 overflow-hidden rounded-full bg-white/25">
                    <div
                        className="absolute inset-y-0 left-0 rounded-full bg-white/90"
                        style={{ width: "4%" }}
                    />
                </div>
                <span className="font-mono text-[10px] text-white/90 tabular-nums">-01:56</span>
            </div>

            <div className="flex items-center justify-center gap-8">
                <motion.button type="button" whileTap={{ scale: 0.9 }} aria-label="previous">
                    <Rewind className="h-5 w-5 fill-white/90 text-white/90" />
                </motion.button>
                <motion.button type="button" whileTap={{ scale: 0.9 }} aria-label="pause">
                    <Pause className="h-6 w-6 fill-white/90 text-white/90" />
                </motion.button>
                <motion.button type="button" whileTap={{ scale: 0.9 }} aria-label="next">
                    <FastForward className="h-5 w-5 fill-white/90 text-white/90" />
                </motion.button>
            </div>
        </div>
    );
}
