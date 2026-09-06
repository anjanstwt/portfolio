"use client";

import { motion } from "framer-motion";
import { Phone, PhoneOff } from "lucide-react";

export default function PhoneView() {
    return (
        <div className="flex h-full w-full items-center gap-3 px-3 text-white">
            <motion.div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-emerald-400 to-emerald-600"
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
                <Phone className="h-5 w-5 text-white" />
            </motion.div>
            <div className="min-w-0 flex-1">
                <p className="text-[12px] leading-tight font-semibold">Mom</p>
                <p className="text-[10px] leading-tight text-neutral-400">mobile · incoming</p>
            </div>
            <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500"
                aria-label="decline"
            >
                <PhoneOff className="h-4 w-4 text-white" />
            </motion.button>
        </div>
    );
}
