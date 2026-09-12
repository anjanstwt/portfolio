"use client";

import Link from "next/link";
import { useEffect, useState, type RefObject } from "react";

import Liquid from "../Gooey/Liquid";
import type { IslandState } from "../../types/island.type";

const SCALE = 1.2;
const PILL_W = 74;
const INSET = 14;
const GAP = 8;
const FIRST_DELAY = 1400;
const RETURN_DELAY = 450;
const SETTLE = {
    type: "spring" as const,
    stiffness: 240,
    damping: 28,
    mass: 1,
};

interface Props {
    wrap: RefObject<HTMLDivElement | null>;
    state: IslandState;
    name: string;
    /** Which end of the island the pill buds out of. */
    side?: "left" | "right";
}

export default function IslandPopup({ wrap, state, name, side = "right" }: Props) {
    const [box, setBox] = useState({ w: 0, h: 0, r: 20 });
    const [out, setOut] = useState(false);

    useEffect(() => {
        const el = wrap.current?.firstElementChild as HTMLElement | null;
        if (!el) return;
        const update = () =>
            setBox({
                w: el.offsetWidth * SCALE,
                h: el.offsetHeight * SCALE,
                r:
                    (parseFloat(getComputedStyle(el).borderRadius) || 20) *
                    SCALE,
            });
        update();
        const ro = new ResizeObserver(update);
        ro.observe(el);
        return () => ro.disconnect();
    }, [wrap]);

    useEffect(() => {
        if (state !== "navbar") {
            setOut(false);
            return;
        }
        const t = window.setTimeout(
            () => setOut(true),
            out ? 0 : box.w ? RETURN_DELAY : FIRST_DELAY,
        );
        return () => window.clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    if (!box.w) return null;
    const pillH = box.h;
    const travel = PILL_W + INSET + GAP;
    const dir = side === "left" ? -1 : 1;

    return (
        <div
            aria-hidden={!out}
            className="pointer-events-none absolute left-1/2 top-0 z-0 -translate-x-1/2"
            style={{ width: box.w, height: box.h }}
        >
            <Liquid
                blur={5}
                contrast={26}
                fill="#000"
                className="absolute inset-0"
            >
                <div
                    className="absolute inset-0"
                    style={{
                        background: "var(--liquid-fill)",
                        borderRadius: box.r,
                    }}
                />

                <div
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{ [side === "left" ? "left" : "right"]: INSET, height: pillH }}
                >
                    <Liquid.Item
                        x={out ? dir * travel : 0}
                        transition={SETTLE}
                        effect="morph"
                    >
                        <Link
                            href={`/${name}`}
                            tabIndex={out ? 0 : -1}
                            className="flex items-center justify-center rounded-full text-[11px] font-medium tracking-tight text-white transition-opacity hover:opacity-80"
                            style={{
                                width: PILL_W,
                                height: pillH,
                                background: "var(--liquid-fill)",
                                pointerEvents: out ? "auto" : "none",
                            }}
                        >
                            {name}
                        </Link>
                    </Liquid.Item>
                </div>
            </Liquid>
        </div>
    );
}
