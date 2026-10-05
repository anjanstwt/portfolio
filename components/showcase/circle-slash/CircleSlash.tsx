import { cn } from "@/lib/utils";

/*
 * Reference frame is 574 x 596. A thin ring with two short gaps, cut by a
 * 45 degree line through its centre. Where the line meets the ring the two
 * strokes melt together with smooth concave fillets, drawn as small filled
 * corner pieces: a quadratic curve whose control point is the crossing itself
 * is tangent to both strokes, which is the "gooey" silhouette.
 */
const CX = 265;
const CY = 322.5;
const R = 127;
const STROKE = 4.5;
/** How far each fillet reaches along the strokes from the crossing. */
const FILLET = 30;

/** Ring gaps as [start, end] in degrees, clockwise from 3 o'clock. */
const GAPS: [number, number][] = [
    [165, 185],
    [334, 354],
];

const LINE = { x1: 72, y1: 130, x2: 452, y2: 515 };

const rad = (deg: number) => (deg * Math.PI) / 180;
const onRing = (a: number): [number, number] => [CX + R * Math.cos(a), CY + R * Math.sin(a)];
const fmt = ([x, y]: [number, number]) => `${x.toFixed(2)} ${y.toFixed(2)}`;

/** Arcs between the gaps: from the end of one gap to the start of the next. */
const RING = GAPS.map(([, end], i) => {
    const nextStart = GAPS[(i + 1) % GAPS.length][0];
    const to = nextStart < end ? nextStart + 360 : nextStart;
    const large = to - end > 180 ? 1 : 0;
    return `M ${fmt(onRing(rad(end)))} A ${R} ${R} 0 ${large} 1 ${fmt(onRing(rad(to)))}`;
}).join(" ");

/*
 * Fillets. The line runs through the centre, so it meets the ring at the two
 * angles of its own direction, perpendicular to the ring. At each crossing
 * there are four corners: along the line in or out, times along the ring
 * clockwise or anticlockwise.
 */
const lineAngle = Math.atan2(LINE.y2 - LINE.y1, LINE.x2 - LINE.x1);
const FILLETS = [lineAngle, lineAngle + Math.PI]
    .flatMap((a) => {
        const p = onRing(a);
        const radial: [number, number] = [Math.cos(a), Math.sin(a)];
        return [1, -1].flatMap((out) =>
            [1, -1].map((turn) => {
                // point along the line, FILLET away from the crossing
                const onLine: [number, number] = [
                    p[0] + out * radial[0] * FILLET,
                    p[1] + out * radial[1] * FILLET,
                ];
                // point along the ring, FILLET away from the crossing
                const onArc = onRing(a + (turn * FILLET) / R);
                return `M ${fmt(onLine)} Q ${fmt(p)} ${fmt(onArc)} L ${fmt(p)} Z`;
            }),
        );
    })
    .join(" ");

/**
 * Colour comes from `currentColor`, so pass a text colour class to theme it
 * (defaults to the muted foreground token, which flips with the theme).
 */
export default function CircleSlash({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 574 596"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            className={cn("pointer-events-none absolute inset-0 size-full text-mute", className)}
        >
            <g fill="none" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="butt">
                <path d={RING} />
                <line x1={LINE.x1} y1={LINE.y1} x2={LINE.x2} y2={LINE.y2} />
            </g>
            <path d={FILLETS} fill="currentColor" stroke="currentColor" strokeWidth={1} strokeLinejoin="round" />
        </svg>
    );
}
