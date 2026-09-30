"use client";

import { motion } from "framer-motion";
import { Share } from "lucide-react";

export default function AirdropView() {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-3 text-white">
            <motion.div
                className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-500/15"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Share className="h-7 w-7 text-blue-400" />
                </motion.div>
            </motion.div>
            <p className="text-[13px] font-semibold">AirDrop</p>
            <p className="-mt-1 text-[10px] text-neutral-400">Sending to Anjan&apos;s iPhone</p>
            <div className="relative mt-1 h-1 w-48 overflow-hidden rounded-full bg-white/10">
                <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-blue-400"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>
        </div>
    );
}
