"use client";

import { motion } from "motion/react";
import { Bell, Heart, Plus, Search } from "lucide-react";
import { useCallback, useRef, useState, type PointerEvent } from "react";

import { cn } from "@/lib/utils";
import Liquid from "./Liquid";

const INK = "#e4e4e4";

/* ─── droplet: pull the small piece away and it snaps free ──────────────── */

export function DropletDemo() {
    const box = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    // The small blob rests touching the big one and follows the pointer
    // while it is over the stage; on leave it springs back and re-merges.
    const onMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
        const r = box.current?.getBoundingClientRect();
        if (!r) return;
        const restX = r.width / 2 + 62; // where the small blob sits at rest
        const restY = r.height / 2;
        setOffset({ x: e.clientX - r.left - restX, y: e.clientY - r.top - restY });
    }, []);

    return (
        <div
            ref={box}
            onPointerMove={onMove}
            onPointerLeave={() => setOffset({ x: 0, y: 0 })}
            className="relative h-72 w-full max-w-md cursor-crosshair touch-none select-none overflow-hidden rounded-2xl border border-grub bg-ink"
        >
            <Liquid blur={14} contrast={22} fill={INK} className="absolute inset-0">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Liquid.Blob size={120} className="text-ink">
                        <span className="text-[10px] uppercase tracking-[0.3em]">goo</span>
                    </Liquid.Blob>
                </div>
                <div className="absolute left-1/2 top-1/2" style={{ transform: "translate(calc(-50% + 62px), -50%)" }}>
                    <Liquid.Item x={offset.x} y={offset.y} transition="smooth" effect="morph">
                        <Liquid.Blob size={64} className="text-ink">
                            <span className="text-[10px] uppercase tracking-[0.2em]">pull</span>
                        </Liquid.Blob>
                    </Liquid.Item>
                </div>
            </Liquid>
            <div className="pointer-events-none absolute bottom-4 left-5 text-[10px] uppercase tracking-[0.25em] text-primary-light/40">
                move over the stage
            </div>
        </div>
    );
}

/* ─── menu: a button that opens into three, each budding off the last ───── */

const MENU = [
    { icon: Search, x: -70, y: -14 },
    { icon: Bell, x: -52, y: -66 },
    { icon: Heart, x: 0, y: -84 },
];

export function MenuDemo() {
    const [open, setOpen] = useState(false);
    return (
        <div className="flex h-72 w-full max-w-md items-end justify-center rounded-2xl border border-grub bg-ink pb-10 pl-16">
            <Liquid blur={9} contrast={20} fill={INK}>
                <div className="relative h-16 w-16">
                    {MENU.map(({ icon: Icon, x, y }, i) => (
                        <div key={i} className="absolute left-2 top-2">
                            <Liquid.Item x={open ? x : 0} y={open ? y : 0} transition="bouncy" effect="morph" delay={open ? i * 0.05 : (2 - i) * 0.04}>
                                <Liquid.Blob size={48} className="text-ink">
                                    {/* hidden while folded under the button, so the crisp layer doesn't show it through */}
                                    <Icon size={18} strokeWidth={2.2} className={cn("transition-opacity duration-300", open ? "opacity-100 delay-150" : "opacity-0")} />
                                </Liquid.Blob>
                            </Liquid.Item>
                        </div>
                    ))}
                    <button
                        type="button"
                        aria-label={open ? "close menu" : "open menu"}
                        onClick={() => setOpen((v) => !v)}
                        className="absolute inset-0 rounded-full text-ink"
                        style={{ background: "var(--liquid-fill)" }}
                    >
                        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 20 }} className="flex items-center justify-center">
                            <Plus size={26} strokeWidth={2.4} />
                        </motion.span>
                    </button>
                </div>
            </Liquid>
        </div>
    );
}

/* ─── tabs: the active tab bulges and the neighbours cling to it ────────── */

const TABS = ["work", "play", "rest"];

export function TabsDemo() {
    const [active, setActive] = useState(0);
    return (
        <div className="flex h-72 w-full max-w-md items-center justify-center rounded-2xl border border-grub bg-ink">
            <Liquid blur={7} contrast={18} fill={INK}>
                <div className="flex items-center gap-1.5">
                    {TABS.map((tab, i) => {
                        const on = i === active;
                        return (
                            <Liquid.Item key={tab} y={on ? -10 : 0} scale={on ? 1.12 : 1} transition="bouncy" effect="melt">
                                <button
                                    type="button"
                                    onClick={() => setActive(i)}
                                    className={cn(
                                        "h-11 rounded-full px-6 text-[11px] uppercase tracking-[0.25em] text-ink",
                                        !on && "opacity-90",
                                    )}
                                    style={{ background: "var(--liquid-fill)" }}
                                >
                                    {tab}
                                </button>
                            </Liquid.Item>
                        );
                    })}
                </div>
            </Liquid>
        </div>
    );
}

/* ─── loader: four drops swimming through each other ────────────────────── */

const DROPS = [0, 1, 2, 3];

export function LoaderDemo({ className }: { className?: string }) {
    return (
        <div className={cn("flex h-72 w-full max-w-md items-center justify-center rounded-2xl border border-grub bg-ink", className)}>
            <Loader />
        </div>
    );
}

// Also used as the tile preview: purely time-based, so both layers agree.
export function Loader({ size = 22, spread = 44 }: { size?: number; spread?: number }) {
    return (
        <Liquid blur={8} contrast={20} fill={INK}>
            <div className="relative h-16 w-40">
                {DROPS.map((i) => (
                    <motion.div
                        key={i}
                        className="absolute left-1/2 top-1/2 rounded-full"
                        style={{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2, background: "var(--liquid-fill)" }}
                        animate={{ x: [-spread * 1.5 + i * spread, spread * 1.5 - i * spread, -spread * 1.5 + i * spread] }}
                        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }}
                    />
                ))}
            </div>
        </Liquid>
    );
}
