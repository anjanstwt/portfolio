"use client";

import { motion } from "framer-motion";

export function Pulse({ color = "bg-red-500", delay = 0 }: { color?: string; delay?: number }) {
    return (
        <motion.span
            className={`inline-block h-1.5 w-1.5 rounded-full ${color}`}
            animate={{ opacity: [1, 0.2, 1], scale: [1, 0.85, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, delay, ease: "easeInOut" }}
        />
    );
}

export function Equalizer({ color = "bg-green-400", bars = 4 }: { color?: string; bars?: number }) {
    return (
        <div className="flex h-3.5 items-end gap-0.5">
            {Array.from({ length: bars }).map((_, i) => (
                <motion.span
                    key={i}
                    className={`w-0.5 rounded-full ${color}`}
                    animate={{ height: ["4px", "14px", "6px", "12px", "4px"] }}
                    transition={{
                        duration: 1.1,
                        repeat: Infinity,
                        delay: i * 0.12,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}
