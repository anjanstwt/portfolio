"use client";

import { motion, useAnimate, type Transition } from "motion/react";
import { createContext, useContext, useEffect, useId, useRef, type CSSProperties, type ReactNode } from "react";

import { cn } from "@/lib/utils";

// Liquid UI: pieces that touch merge like goo, pieces that part stretch a
// neck and snap free like a droplet, and text stays crisp throughout.
//
// The goo is an SVG filter — blur the layer, then push its alpha through a
// steep contrast curve so soft overlaps become one hard silhouette. Because
// that filter would also soften text, <Liquid> renders its children twice:
//
//   goo layer    filtered; every colour (text, currentColor icons) is made
//                transparent, so only backgrounds contribute to the goo
//   crisp layer  unfiltered, laid exactly on top; every background, border
//                and shadow is made transparent, so only text and icons show
//
// Both copies get identical props, so they animate in lockstep. The crisp
// layer ignores the pointer, so hovers and clicks land on the goo layer.
//
//   <Liquid blur={8} contrast={18} fill="#e4e4e4">
//     <Liquid.Item x={open ? -60 : 0} y={open ? -30 : 0} transition="bouncy" effect="morph">
//       <Liquid.Blob size={48}>…</Liquid.Blob>
//     </Liquid.Item>
//   </Liquid>

// Which copy of the tree an Item is rendering in. The jelly squash only runs
// in the goo layer, so the shape deforms while the text on top stays true.
const LayerContext = createContext<"goo" | "crisp">("goo");

const TRANSITIONS: Record<string, Transition> = {
    bouncy: { type: "spring", stiffness: 380, damping: 15, mass: 0.9 },
    smooth: { type: "spring", stiffness: 170, damping: 26, mass: 1 },
    snappy: { type: "spring", stiffness: 700, damping: 32, mass: 0.8 },
};

export type LiquidTransition = keyof typeof TRANSITIONS | Transition;
export type LiquidEffect = "move" | "morph" | "melt" | "bend";

interface LiquidProps {
    /** Blur radius in px. Bigger merges pieces from further apart. */
    blur?: number;
    /** Alpha contrast. Higher makes the edge tighter and the neck thinner. */
    contrast?: number;
    /** Default fill for Liquid.Blob children. */
    fill?: string;
    /** Drop shadow under the goo, e.g. "0 12px 30px rgba(0,0,0,.4)". */
    shadow?: string;
    className?: string;
    style?: CSSProperties;
    children: ReactNode;
}

function Liquid({ blur = 8, contrast = 18, fill = "#e4e4e4", shadow, className, style, children }: LiquidProps) {
    const id = `liquid-${useId().replace(/:/g, "")}`;
    // full size so absolutely placed pieces measure against the Liquid box
    const layer = "relative h-full w-full";

    return (
        <div className={cn("relative isolate", className)} style={{ ...style, ["--liquid-fill" as string]: fill }}>
            <svg aria-hidden className="pointer-events-none absolute h-0 w-0">
                <defs>
                    {/* generous region so pieces can travel outside the box without being clipped */}
                    <filter id={id} x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
                        <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="blur" />
                        <feColorMatrix
                            in="blur"
                            type="matrix"
                            values={`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${contrast} ${-contrast / 2}`}
                        />
                    </filter>
                </defs>
            </svg>

            {/* goo layer: shapes only */}
            <div
                className={cn(layer, "text-transparent! [&_*]:text-transparent! [&_*]:[-webkit-text-fill-color:transparent]")}
                style={{ filter: `url(#${id})${shadow ? ` drop-shadow(${shadow})` : ""}` }}
            >
                <LayerContext.Provider value="goo">{children}</LayerContext.Provider>
            </div>

            {/* crisp layer: text and icons only, same tree, same props */}
            <div
                aria-hidden
                className={cn(
                    layer,
                    "pointer-events-none absolute inset-0",
                    "[&_*]:bg-transparent! [&_*]:bg-none! [&_*]:border-transparent! [&_*]:shadow-none! [&_*]:[outline-color:transparent]",
                )}
            >
                <LayerContext.Provider value="crisp">{children}</LayerContext.Provider>
            </div>
        </div>
    );
}

/* ─── item ──────────────────────────────────────────────────────────────── */

interface ItemProps {
    /** Offset from the item's resting place, in px. */
    x?: number;
    y?: number;
    /** How the piece behaves while it travels. */
    effect?: LiquidEffect;
    /** Named spring or a motion transition. */
    transition?: LiquidTransition;
    /** Seconds to wait before moving. */
    delay?: number;
    /** Extra scale on top of the effect, e.g. to bulge an active piece. */
    scale?: number;
    className?: string;
    style?: CSSProperties;
    children: ReactNode;
}

function Item({ x = 0, y = 0, effect = "move", transition = "smooth", delay = 0, scale = 1, className, style, children }: ItemProps) {
    const spring = typeof transition === "string" ? TRANSITIONS[transition] : transition;
    const [scope, animate] = useAnimate();
    const last = useRef({ x, y });
    const layer = useContext(LayerContext);

    // Squash, stretch or lean in the direction of travel whenever the
    // target moves, then settle. Goo layer only: the shape deforms about its
    // centre, so the crisp text on top stays put and undistorted.
    useEffect(() => {
        const dx = x - last.current.x;
        const dy = y - last.current.y;
        last.current = { x, y };
        if (layer !== "goo" || effect === "move" || (dx === 0 && dy === 0) || !scope.current) return;

        const along = Math.hypot(dx, dy);
        const k = Math.min(0.35, along / 260); // bigger hops deform more
        const opts = { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const };
        if (effect === "morph") {
            const horizontal = Math.abs(dx) >= Math.abs(dy);
            animate(
                scope.current,
                horizontal
                    ? { scaleX: [null, 1 + k, 1 - k * 0.5, 1], scaleY: [null, 1 - k * 0.6, 1 + k * 0.3, 1] }
                    : { scaleY: [null, 1 + k, 1 - k * 0.5, 1], scaleX: [null, 1 - k * 0.6, 1 + k * 0.3, 1] },
                opts,
            );
        } else if (effect === "melt") {
            animate(scope.current, { scaleY: [null, 1 + k * 1.4, 1 - k * 0.4, 1], scaleX: [null, 1 - k * 0.4, 1 + k * 0.2, 1] }, opts);
        } else if (effect === "bend") {
            const lean = (dx >= 0 ? 1 : -1) * k * 40;
            animate(scope.current, { rotate: [null, lean, -lean * 0.4, 0], skewX: [null, -lean * 0.5, lean * 0.2, 0] }, opts);
        }
    }, [x, y, effect, delay, animate, scope, layer]);

    return (
        <motion.div
            animate={{ x, y, scale }}
            transition={{ ...spring, delay }}
            className={cn("relative inline-block", className)}
            style={style}
        >
            <div ref={scope} className="origin-center" style={effect === "melt" ? { transformOrigin: "50% 0%" } : undefined}>
                {children}
            </div>
        </motion.div>
    );
}

/* ─── blob ──────────────────────────────────────────────────────────────── */

interface BlobProps {
    /** Diameter (or height, for a pill) in px. */
    size?: number;
    /** Width in px for a pill; defaults to `size` for a circle. */
    width?: number;
    /** Overrides the Liquid fill. */
    fill?: string;
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
}

// A filled circle or pill that takes the Liquid's fill. Put text or icons
// inside; they stay crisp.
function Blob({ size = 48, width, fill, className, style, children }: BlobProps) {
    return (
        <div
            className={cn("flex items-center justify-center rounded-full", className)}
            style={{ width: width ?? size, height: size, background: fill ?? "var(--liquid-fill)", ...style }}
        >
            {children}
        </div>
    );
}

Liquid.Item = Item;
Liquid.Blob = Blob;

export default Liquid;
