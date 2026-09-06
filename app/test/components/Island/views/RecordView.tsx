"use client";

import { Mic } from "lucide-react";
import { Pulse } from "./primitives";

export default function RecordView() {
    return (
        <div className="flex h-full w-full items-center justify-center gap-2 text-white">
            <Pulse color="bg-red-500" />
            <span className="text-[11px] font-medium">Recording</span>
            <Mic className="h-3.5 w-3.5 text-red-400" />
        </div>
    );
}
