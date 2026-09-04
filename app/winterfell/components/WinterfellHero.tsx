"use client";

import { motion, useReducedMotion } from "motion/react";

import GlassGlyph from "./GlassGlyph";
import { ServicestackGlyph } from "./ServicestackGlyph";

const ENTER = { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const };

const HALO =
    "radial-gradient(closest-side, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.18) 45%, transparent 100%)";

export default function WinterfellHero() {
    const reduceMotion = useReducedMotion();

    return (
        <section className="relative isolate min-h-svh w-full overflow-hidden bg-ink">
            <Sky />
            <Blueprint />

            <motion.div
                initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...ENTER, delay: 0.1 }}
                className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[min(70vw,520px)] -translate-x-1/2 -translate-y-1/2 lg:w-[min(34vw,560px)]"
            >
                <motion.div
                    animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                    className="relative"
                >
                    <div
                        style={{ background: HALO }}
                        className="absolute -inset-[18%] rounded-full"
                    />
                    <GlassGlyph className="relative h-auto w-full" />
                </motion.div>
            </motion.div>
        </section>
    );
}

function Sky() {
    return (
        <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,black_40%,transparent_78%)]">
                <div className="absolute inset-y-0 left-1/2 w-[14%] bg-white/[0.08]" />
                <div className="absolute inset-y-0 left-[64%] w-[8%] bg-ink/[0.08]" />
                <div className="absolute inset-y-0 left-[72%] w-[28%] bg-white/[0.12]" />
            </div>
            <ServicestackGlyph
                fill="none"
                stroke="white"
                strokeWidth={0.06}
                className="absolute left-1/2 top-1/2 h-auto w-[110vmin] -translate-x-1/2 -translate-y-1/2 opacity-[0.14] [mask-image:linear-gradient(to_bottom,black_30%,transparent_85%)]"
            />
        </div>
    );
}

function Blueprint() {
    return (
        <svg
            viewBox="0 0 1600 1000"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full [mask-image:linear-gradient(to_bottom,black_45%,transparent_88%)]"
        >
            <defs>
                <pattern
                    id="wf-hatch"
                    width="7"
                    height="7"
                    patternUnits="userSpaceOnUse"
                    patternTransform="rotate(-38)"
                >
                    <line x1="0" y1="0" x2="0" y2="7" stroke="white" strokeOpacity="0.2" />
                </pattern>
            </defs>
            <circle cx="800" cy="500" r="420" fill="url(#wf-hatch)" />
            <circle cx="800" cy="500" r="420" fill="none" stroke="white" strokeOpacity="0.12" />
            <circle cx="800" cy="500" r="320" fill="white" fillOpacity="0.07" />
            <circle cx="800" cy="500" r="320" fill="none" stroke="white" strokeOpacity="0.35" />
            <circle cx="870" cy="540" r="7" fill="none" stroke="white" strokeOpacity="0.55" />
        </svg>
    );
}
