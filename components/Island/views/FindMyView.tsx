"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function FindMyView() {
    return (
        <div className="flex h-full w-full items-center gap-3 px-4 text-white">
            <motion.div
                className="flex h-8 w-8 items-center justify-center rounded-full border border-green-400/40 bg-green-500/20"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
                <MapPin className="h-4 w-4 text-green-400" />
            </motion.div>
            <div className="min-w-0 flex-1">
                <p className="text-[11px] leading-tight font-semibold">Find My</p>
                <p className="truncate text-[10px] leading-tight text-neutral-400">AirPods Pro · Nearby</p>
            </div>
            <span className="font-mono text-[10px] text-green-400">12m</span>
        </div>
    );
}
