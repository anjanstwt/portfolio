"use client";

import { motion } from "framer-motion";
import { BatteryLow } from "lucide-react";

export default function LowBatteryView() {
    return (
        <div className="flex h-full w-full items-center justify-between px-4 text-white">
            <div className="flex items-center gap-2">
                <motion.div
                    animate={{ rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.5 }}
                >
                    <BatteryLow className="h-4 w-4 text-red-400" />
                </motion.div>
                <span className="text-[11px] font-medium">Low Battery</span>
            </div>
            <span className="font-mono text-[11px] text-red-400">10%</span>
        </div>
    );
}
