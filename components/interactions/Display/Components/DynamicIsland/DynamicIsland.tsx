"use client"

import { cn } from "@/lib/utils";
import { motion, Variant, Variants } from "framer-motion";
import { useState } from "react";

enum DynamicIslandState {
    None = "None",
    Call = "Call",
    Timer = "Timer",
    Dnd = "Dnd",
    VoiceRecording = "VoiceRecording",
    ScreenRecording = "ScreenRecording",
    Music = "Music",
}

export default function DynamicIsland() {

    const [state, setState] = useState<DynamicIslandState>(DynamicIslandState.None);

    const variants: Record<DynamicIslandState, Variant> = {
        [DynamicIslandState.None]: { height: 34, width: 140 },
        [DynamicIslandState.Call]: { height: 32 },
        [DynamicIslandState.Timer]: { height: 32 },
        [DynamicIslandState.Dnd]: { height: 32 },
        [DynamicIslandState.VoiceRecording]: { height: 32 },
        [DynamicIslandState.ScreenRecording]: { height: 32 },
        [DynamicIslandState.Music]: { height: 32 },
    };

    return (
        <div className="h-100 w-200 bg-red-500 flex justify-center items-center">

            <div></div>

            <motion.div
                variants={variants}
                initial={"None"}
                animate={state}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={cn(
                    "bg-white rounded-2xl"
                )}
            >

            </motion.div>
        </div>
    )
}