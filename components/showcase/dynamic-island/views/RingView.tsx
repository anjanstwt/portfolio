"use client";

import { BellOff } from "lucide-react";
import { Equalizer } from "./primitives";

export default function RingView() {
    return (
        <div className="flex h-full w-full items-center justify-between px-4 text-white">
            <div className="flex items-center gap-2">
                <BellOff className="h-3.5 w-3.5 text-orange-400" />
                <span className="text-[11px] font-medium tracking-tight">Silent Mode</span>
            </div>
            <Equalizer color="bg-orange-400" bars={3} />
        </div>
    );
}
