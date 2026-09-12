"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState, type RefObject } from "react";

import Experiences from "../../data/experience.data";
import Projects from "../../data/project.data";
import user from "../../data/user.data";
import { useIslandStore, type IslandTray as TrayKind } from "../../store/island.store";
import type { IslandState } from "../../types/island.type";
import Liquid from "../Gooey/Liquid";

// The gooey tray under the navbar island. Hovering "projects" or
// "experience" in the navbar runs a little sequence in the goo layer:
//
//   drop    a seed blob buds out of the island's underside
//   slide   it slides left to where the row will start
//   sweep   it sweeps right, and a pill buds off it at every slot it passes
//   done    it dissolves into the last pill
//
// Moving the cursor off the island and its pills closes everything.

const SCALE = 1.2; // the island renders with scale-120
const GAP_Y = 8; // clearance between island and tray
const GAP_X = 6; // between pills
const STEP = 190; // ms per pill during the sweep
const SPRING = { type: "spring" as const, stiffness: 260, damping: 26, mass: 1 };
const SEED_SPRING = { type: "spring" as const, stiffness: 220, damping: 24, mass: 1 };

type Stage = "closed" | "drop" | "slide" | "sweep" | "done";

interface Item {
    key: string;
    label: string;
    href: string;
    color?: string;
    /** Opens in a new tab. */
    external?: boolean;
}

const TRAYS: Record<Exclude<TrayKind, null>, { items: Item[]; width: number }> = {
    projects: {
        width: 96,
        items: Projects.map((p) => ({ key: p.slug, label: p.name, href: p.hero ? `/projects/${p.slug}` : "/#projects", color: p.color })),
    },
    experience: {
        width: 140,
        items: Experiences.map((e) => ({ key: e.company, label: e.company, href: "/#experience" })),
    },
    contact: {
        width: 84,
        items: user.contacts.map((c) => ({ key: c.kind, label: c.label, href: c.href, external: true })),
    },
};

interface Props {
    wrap: RefObject<HTMLDivElement | null>;
    state: IslandState;
}

export default function IslandTray({ wrap, state }: Props) {
    const tray = useIslandStore((s) => s.tray);
    const [box, setBox] = useState({ w: 0, h: 0 });
    const [stage, setStage] = useState<Stage>("closed");
    const [revealed, setRevealed] = useState(0);
    // Remembered so the row keeps its items while it closes.
    const [kind, setKind] = useState<Exclude<TrayKind, null>>("projects");

    // Mirror the island's animated size.
    useEffect(() => {
        const el = wrap.current?.firstElementChild as HTMLElement | null;
        if (!el) return;
        const update = () => setBox({ w: el.offsetWidth * SCALE, h: el.offsetHeight * SCALE });
        update();
        const ro = new ResizeObserver(update);
        ro.observe(el);
        return () => ro.disconnect();
    }, [wrap]);

    // Run the sequence whenever a tray opens; unwind when it closes.
    useEffect(() => {
        const open = tray && state === "navbar";
        if (!open) {
            setStage("closed");
            setRevealed(0);
            return;
        }
        setKind(tray);
        setStage("drop");
        setRevealed(0);
        const timers: number[] = [];
        const n = TRAYS[tray].items.length;
        timers.push(window.setTimeout(() => setStage("slide"), 420));
        timers.push(window.setTimeout(() => setStage("sweep"), 900));
        // The seed crosses the row linearly, so slot i is under it at i/(n-1) of the sweep.
        const sweep = n * STEP;
        const at = (i: number) => 900 + (n > 1 ? (i / (n - 1)) * sweep : 0) + 40;
        for (let i = 0; i < n; i++) timers.push(window.setTimeout(() => setRevealed(i + 1), at(i)));
        timers.push(window.setTimeout(() => setStage("done"), 900 + sweep + 120));
        return () => timers.forEach(clearTimeout);
    }, [tray, state]);

    if (!box.w) return null;

    const { items, width: pillW } = TRAYS[kind];
    const n = items.length;
    const pillH = Math.round(box.h * 0.82);
    const seed = pillH;
    const rowW = n * pillW + (n - 1) * GAP_X;
    const cx = box.w / 2;
    const slotX = (i: number) => cx - rowW / 2 + i * (pillW + GAP_X) + pillW / 2; // slot centre
    const trayY = box.h + GAP_Y; // top edge of the row

    // Seed target by stage: hidden inside the island, below it, at the row's
    // left end, then across to its right end, then gone.
    const seedTarget = (() => {
        switch (stage) {
            case "drop":
                return { x: cx - seed / 2, y: trayY, scale: 1 };
            case "slide":
                return { x: slotX(0) - seed / 2, y: trayY, scale: 1 };
            case "sweep":
                return { x: slotX(n - 1) - seed / 2, y: trayY, scale: 1 };
            case "done":
                return { x: slotX(n - 1) - seed / 2, y: trayY, scale: 0 };
            default:
                return { x: cx - seed / 2, y: box.h / 2 - seed / 2, scale: 1 };
        }
    })();
    const seedTransition = stage === "sweep" ? { duration: (n * STEP) / 1000, ease: "linear" as const } : SEED_SPRING;
    const open = stage !== "closed";

    return (
        <div
            aria-hidden={!open}
            className="pointer-events-none absolute left-1/2 top-0 z-0 -translate-x-1/2"
            style={{ width: box.w, height: box.h }}
        >
            <Liquid blur={5} contrast={26} fill="#000" className="absolute inset-0">
                {/* ghost of the island */}
                <div className="absolute inset-0 rounded-full" style={{ background: "var(--liquid-fill)" }} />

                {/* keeps the hover alive while the cursor crosses the gap to the pills */}
                <div
                    className="absolute left-1/2 -translate-x-1/2"
                    style={{ top: box.h - 4, width: rowW + 48, height: GAP_Y + pillH + 16, pointerEvents: open ? "auto" : "none" }}
                />

                {/* the seed */}
                <motion.div
                    className="absolute left-0 top-0 rounded-full"
                    initial={false}
                    animate={seedTarget}
                    transition={seedTransition}
                    style={{ width: seed, height: seed, background: "var(--liquid-fill)" }}
                />

                {/* the pills, budding off the seed as it passes */}
                {items.map((item, i) => {
                    const on = open && revealed > i;
                    return (
                        <motion.div
                            key={item.key}
                            className="absolute top-0"
                            initial={false}
                            animate={{ x: slotX(i) - pillW / 2, y: trayY, scale: on ? 1 : 0.2, opacity: on ? 1 : 0 }}
                            transition={on ? SPRING : { duration: 0.18 }}
                            style={{ width: pillW, height: pillH }}
                        >
                            <Link
                                href={item.href}
                                target={item.external ? "_blank" : undefined}
                                rel={item.external ? "noreferrer" : undefined}
                                tabIndex={on ? 0 : -1}
                                className="flex h-full w-full items-center justify-center gap-2 rounded-full text-[11px] font-medium tracking-tight text-white transition-opacity hover:opacity-80"
                                style={{ background: "var(--liquid-fill)", pointerEvents: on ? "auto" : "none" }}
                            >
                                <span className="truncate">{item.label}</span>
                            </Link>
                        </motion.div>
                    );
                })}
            </Liquid>
        </div>
    );
}
