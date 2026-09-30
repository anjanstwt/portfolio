"use client";

import { useEffect } from "react";
import { scrollSpeed } from "@/lib/lenisScrollSpeed";

// Lenis freezes its wheel/touch multipliers at construction time (see
// lib/lenisScrollSpeed.ts), so per-page speed tuning has to go through this
// runtime factor instead of passing different ReactLenis options here.
export default function SetLenisSpeed({ factor }: { factor: number }) {
    useEffect(() => {
        scrollSpeed.factor = factor;
        return () => {
            scrollSpeed.factor = 1;
        };
    }, [factor]);

    return null;
}
