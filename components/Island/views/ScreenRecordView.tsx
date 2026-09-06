"use client";

import { motion } from "framer-motion";
import { ScreenShare } from "lucide-react";

export default function ScreenRecordView() {
    return (
        <div className="flex h-full w-full items-center justify-between px-3 text-white">
            <div className="flex items-center gap-2">
                <motion.div
                    className="flex h-5 w-5 items-center justify-center rounded-full border border-red-400/40 bg-red-500/20"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                >
                    <ScreenShare className="h-3 w-3 text-red-400" />
                </motion.div>
                <span className="text-[11px] font-medium">Screen</span>
            </div>
            <span className="font-mono text-[11px] text-red-400">01:24</span>
        </div>
    );
}
