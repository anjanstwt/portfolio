"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { islandDimensions } from "../../data/island.data";
import type { IslandState } from "../../types/island.type";
import { views } from "./views";

type Props = {
    state: IslandState;
    onClose: () => void;
    className?: string;
};

// Mild spring: ~0.45s to settle with a small overshoot. Tune `bounce`
// (0 = no overshoot) and `visualDuration` (seconds) to taste.
const spring = {
    type: "spring" as const,
    visualDuration: 0.45,
    bounce: 0.22,
};

export default function DynamicIsland({ state, onClose, className }: Props) {
    const { width, height, borderRadius } = islandDimensions[state];
    const View = views[state];

    // Dimensions set to "auto" measure the mounted view and animate to its
    // size, so a view that grows (e.g. on hover) morphs the pill in place.
    const contentRef = useRef<HTMLDivElement>(null);
    const [measured, setMeasured] = useState<{ w: number; h: number } | null>(null);
    const fitW = width === "auto";
    const fitH = height === "auto";
    const fit = fitW || fitH;

    useLayoutEffect(() => {
        if (!fit) return;
        const el = contentRef.current;
        if (!el) return;
        // offsetWidth/Height ignore the enter/exit scale transform.
        const update = () => setMeasured({ w: el.offsetWidth, h: el.offsetHeight });
        update();
        const observer = new ResizeObserver(update);
        observer.observe(el);
        return () => observer.disconnect();
    }, [fit, state]);

    const targetWidth = fitW ? measured?.w : width;
    const targetHeight = fitH ? measured?.h : height;

    return (
        <MotionConfig transition={spring}>
            {/* No `layout` prop: it writes an inline transform that would override
                class-based transforms like scale-* passed via className. */}
            <motion.div
                animate={{ width: targetWidth, height: targetHeight, borderRadius }}
                initial={false}
                transition={spring}
                className={cn(
                    "flex justify-center overflow-hidden bg-black text-white shadow-[0_8px_30px_rgba(0,0,0,0.5)] will-change-[width,height]",
                    // Scale from the top edge so a scale-* class (and height growth) never lifts the pill.
                    "origin-top",
                    // Auto-height content anchors to the top so the first row stays put
                    // while the pill springs open; fixed-height views fill and center.
                    fitH ? "items-start" : "items-center",
                    className,
                )}
            >
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                        key={state}
                        ref={contentRef}
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
                        transition={{ duration: 0.32, ease: "easeOut" }}
                        className={cn(fitW ? "w-max" : "w-full", fitH ? "h-max" : "h-full")}
                    >
                        <View onClose={onClose} />
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </MotionConfig>
    );
}
