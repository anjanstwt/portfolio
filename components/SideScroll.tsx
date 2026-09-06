'use client';
import { cn } from "@/lib/utils";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
    type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ITEM_COUNT = 30;
const ITEM_WIDTH = 70; // w-24
const GAP = 4; // gap-x-1
const EFFECT_RADIUS = 220; // px either side of center that still feels some effect
const SCALE_MAX = 1.5; // peak scale multiplier for the dead-center card
const GAP_EXTRA_MAX = 16; // px of extra margin added per side at full effect
const ROTATE_MAX = -60; // degrees, peak 3D turn at top scroll speed
const COLOR_REST = "#0f0f10"; // cement
const COLOR_FAST = "#e4e4e4"; // primary-light

function Card({
    index,
    x,
    viewportWidth,
    rotateSignal,
    speedFactor,
}: {
    index: number;
    x: MotionValue<number>;
    viewportWidth: number;
    rotateSignal: MotionValue<number>;
    speedFactor: MotionValue<number>;
}) {
    // This card's own center on screen right now, derived from the shared
    // track offset `x` — not a value the parent hands down directly.
    const distance = useTransform(x, (xVal) => {
        const centerOnScreen = xVal + index * (ITEM_WIDTH + GAP) + ITEM_WIDTH / 2;
        return centerOnScreen - viewportWidth / 2;
    });

    // 0 at the edges of the radius, 1 at distance 0 (dead center). Scale,
    // color, AND rotation all read from this, so only the card currently
    // nearest center is affected, fading out for its neighbors.
    const centeredness = useTransform(
        distance,
        [-EFFECT_RADIUS, -EFFECT_RADIUS / 2, 0, EFFECT_RADIUS / 2, EFFECT_RADIUS],
        [0, 0.4, 1, 0.4, 0],
        { clamp: true }
    );

    // Also gated by scroll speed: at rest speedFactor is 0, so `effect`
    // is 0 everywhere regardless of position — nothing scales or tints
    // until you're actually scrolling.
    const effect = useTransform(
        [centeredness, speedFactor],
        ([c, s]) => (c as number) * (s as number)
    );

    const scale = useTransform(effect, (e) => 1 + (SCALE_MAX - 1) * e);
    const backgroundColor = useTransform(effect, [0, 1], [COLOR_REST, COLOR_FAST]);

    // Extra breathing room around this card, growing with the same
    // `effect` signal as scale — 0 at rest/off-center, up to
    // GAP_EXTRA_MAX per side for the currently focused card.
    const extraMargin = useTransform(effect, (e) => GAP_EXTRA_MAX * e);

    // rotateSignal already carries direction + magnitude from scroll
    // velocity (0 at rest). Scaling it by centeredness (not the combined
    // `effect`) localizes it to this card without double-gating on speed.
    const rotateY = useTransform(
        [rotateSignal, centeredness],
        ([r, c]) => (r as number) * (c as number)
    );

    return (
        <motion.div
            style={{
                scale,
                rotateY,
                backgroundColor,
                width: ITEM_WIDTH,
                marginLeft: extraMargin,
                marginRight: extraMargin,
            }}
            className={cn("h-64 shrink-0 ")}
        />
    );
}

// Drives the card row from an external 0->1 progress value instead of
// owning its own scroll target, so the track can be embedded inside
// another section's scroll timeline (see HeroSection).
export function useSideScrollTrack(progress: MotionValue<number>) {
    const [viewportWidth, setViewportWidth] = useState(0);

    useEffect(() => {
        const updateWidth = () => setViewportWidth(window.innerWidth);
        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    // Move from first item centered to last item centered
    const totalDistance = (ITEM_COUNT - 1) * (ITEM_WIDTH + GAP);
    const startX = viewportWidth / 2 - ITEM_WIDTH / 2;
    const x = useTransform(progress, [0, 1], [startX, startX - totalDistance]);

    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400,
    });
    // Raw direction + magnitude from scroll velocity, 0 at rest. Each card
    // scales this down by its own centeredness, so it only actually shows
    // up on the card currently focused at the middle.
    const rotateSignal = useTransform(smoothVelocity, [-3000, 3000], [-ROTATE_MAX, ROTATE_MAX], {
        clamp: true,
    });

    // 0 at rest, ramping to 1 the faster you scroll, in either direction.
    // Gates each card's scale/color effect so they only show up while moving.
    const speedFactor = useTransform(smoothVelocity, (v) => Math.min(Math.abs(v) / 3000, 1));

    return { x, viewportWidth, rotateSignal, speedFactor };
}

export function CardTrack({
    x,
    viewportWidth,
    rotateSignal,
    speedFactor,
}: {
    x: MotionValue<number>;
    viewportWidth: number;
    rotateSignal: MotionValue<number>;
    speedFactor: MotionValue<number>;
}) {
    return (
        <motion.div style={{ x, gap: "0px 12px" }} className="transform-3d flex">
            {Array.from({ length: ITEM_COUNT }).map((_v, i) => (
                <Card
                    key={i}
                    index={i}
                    x={x}
                    viewportWidth={viewportWidth}
                    rotateSignal={rotateSignal}
                    speedFactor={speedFactor}
                />
            ))}
        </motion.div>
    );
}

export default function SideScroll() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const { x, viewportWidth, rotateSignal, speedFactor } = useSideScrollTrack(scrollYProgress);

    return (
        <section ref={targetRef} className="relative h-[250vh]">
            <div className="perspective-[1000px] transform-3d sticky top-0 h-screen overflow-hidden flex flex-col items-center">
                <div className="transform-3d flex-1 w-full min-h-0 flex items-center">
                    <CardTrack x={x} viewportWidth={viewportWidth} rotateSignal={rotateSignal} speedFactor={speedFactor} />
                </div>
            </div>
        </section>
    )
}
