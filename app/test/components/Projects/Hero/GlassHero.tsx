"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useId } from "react";

import type { ProjectHero } from "../../../types/project.type";
import GlassGlyph from "./GlassGlyph";
import ProjectGlyph from "./ProjectGlyph";

const ENTER = { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const };

// Ghosted outline stroke as a fraction of the glyph's larger side.
const OUTLINE_STROKE = 0.0019;

// Landscape marks (like the matcha logo) get more horizontal room than
// square icons, and sit a little higher on small screens.
const isWide = (hero: ProjectHero) => !!hero.glyph && hero.glyph.width / hero.glyph.height > 1.3;

const rgba = (hex: string, alpha: number) => {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
};

const haloFor = (hero: ProjectHero) =>
    hero.haloColor
        ? `radial-gradient(closest-side, ${rgba(hero.haloColor, 0.22)} 0%, ${rgba(hero.haloColor, 0.07)} 45%, transparent 100%)`
        : "radial-gradient(closest-side, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.18) 45%, transparent 100%)";

export default function GlassHero({ hero }: { hero: ProjectHero }) {
    const reduceMotion = useReducedMotion();
    const wide = isWide(hero);

    return (
        <section className="relative isolate min-h-svh w-full overflow-hidden bg-ink">
            <Sky hero={hero} wide={wide} />
            <Blueprint />

            <motion.div
                initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...ENTER, delay: 0.1 }}
                className={
                    wide
                        ? "pointer-events-none absolute left-1/2 top-[38%] z-10 w-[min(94vw,800px)] -translate-x-1/2 -translate-y-1/2 lg:top-1/2 lg:w-[min(46vw,800px)]"
                        : "pointer-events-none absolute left-1/2 top-1/2 z-10 w-[min(70vw,520px)] -translate-x-1/2 -translate-y-1/2 lg:w-[min(34vw,560px)]"
                }
            >
                <motion.div
                    animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                    className="relative"
                >
                    <div
                        style={{ background: haloFor(hero) }}
                        className={
                            wide
                                ? "absolute -inset-x-[12%] -inset-y-[30%] rounded-full"
                                : "absolute -inset-[18%] rounded-full"
                        }
                    />
                    {hero.glyph ? (
                        <GlassGlyph glyph={hero.glyph} fill={hero.fill} className="relative h-auto w-full" />
                    ) : hero.image ? (
                        <div className="relative aspect-square w-full">
                            <Image src={hero.image} alt="" fill sizes="560px" className="object-contain" />
                        </div>
                    ) : null}
                </motion.div>
            </motion.div>
        </section>
    );
}

function Sky({ hero, wide }: { hero: ProjectHero; wide: boolean }) {
    const { glyph } = hero;

    return (
        <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,black_40%,transparent_78%)]">
                <div className="absolute inset-y-0 left-1/2 w-[14%] bg-white/[0.08]" />
                <div className="absolute inset-y-0 left-[64%] w-[8%] bg-ink/[0.08]" />
                <div className="absolute inset-y-0 left-[72%] w-[28%] bg-white/[0.12]" />
            </div>
            {glyph && <ProjectGlyph
                glyph={glyph}
                fill="none"
                stroke="white"
                strokeWidth={Math.max(glyph.width, glyph.height) * OUTLINE_STROKE}
                className={
                    wide
                        ? "absolute left-1/2 top-[44%] h-auto w-[118vw] -translate-x-1/2 -translate-y-1/2 opacity-[0.14] [mask-image:linear-gradient(to_bottom,black_30%,transparent_85%)] lg:top-[46%]"
                        : "absolute left-1/2 top-1/2 h-auto w-[118vw] -translate-x-1/2 -translate-y-1/2 opacity-[0.14] [mask-image:linear-gradient(to_bottom,black_30%,transparent_85%)]"
                }
            />}
        </div>
    );
}

function Blueprint() {
    const hatchId = `${useId().replace(/:/g, "")}-hatch`;

    return (
        <svg
            viewBox="0 0 1600 1000"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full [mask-image:linear-gradient(to_bottom,black_45%,transparent_88%)]"
        >
            <defs>
                <pattern
                    id={hatchId}
                    width="7"
                    height="7"
                    patternUnits="userSpaceOnUse"
                    patternTransform="rotate(-38)"
                >
                    <line x1="0" y1="0" x2="0" y2="7" stroke="white" strokeOpacity="0.2" />
                </pattern>
            </defs>
            <circle cx="800" cy="500" r="420" fill={`url(#${hatchId})`} />
            <circle cx="800" cy="500" r="420" fill="none" stroke="white" strokeOpacity="0.12" />
            <circle cx="800" cy="500" r="320" fill="white" fillOpacity="0.07" />
            <circle cx="800" cy="500" r="320" fill="none" stroke="white" strokeOpacity="0.35" />
            <circle cx="870" cy="540" r="7" fill="none" stroke="white" strokeOpacity="0.55" />
        </svg>
    );
}
