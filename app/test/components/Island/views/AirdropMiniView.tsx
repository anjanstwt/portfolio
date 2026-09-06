"use client";

import { motion } from "framer-motion";
import { Share } from "lucide-react";

export default function AirdropMiniView() {
    return (
        <div className="flex h-full w-full items-center justify-between px-3 text-white">
            <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md border border-blue-400/30 bg-blue-500/20">
                    <Share className="h-3 w-3 text-blue-400" />
                </div>
                <span className="text-[11px] font-medium">AirDrop</span>
            </div>
            <motion.span
                className="text-[10px] text-blue-300"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.4, repeat: Infinity }}
            >
                Sending…
            </motion.span>
        </div>
    );
}
