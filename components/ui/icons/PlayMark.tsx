import { cn } from "@/lib/utils";

// A play triangle drawn as a pinwheeled ring. Built, not traced: an
// equilateral inner triangle, each side's outer edge offset by a constant
// band — thick (0.40 of the side) from the corner to 0.76 of the way along,
// then thin (0.13) to the next corner — with every step cut parallel to the
// side before it. Corners are true arcs, the right pointer blunter than the
// two left corners. Fits a 500 × 533 box; outer contour
// first, then the inner triangle as a hole.
export const PLAY_MARK_PATH =
    "M82.2 42.4 A18.7 18.7 0 0 1 110.2 26.2 L288.4 129.1 A8.8 8.8 0 0 1 292.8 136.7 L292.8 209.8 A8.8 8.8 0 0 0 297.2 217.5 L441.9 301.0 A32.1 32.1 0 0 1 441.9 356.6 L283.8 447.9 A8.8 8.8 0 0 1 274.9 447.9 L211.6 411.3 A8.8 8.8 0 0 0 202.8 411.3 L38.1 506.4 A18.7 18.7 0 0 1 10.0 490.2 L10.0 284.5 A8.8 8.8 0 0 1 14.4 276.8 L77.7 240.2 A8.8 8.8 0 0 0 82.2 232.6 Z " +
    "M143.0 168.5 A17.4 17.4 0 0 0 116.9 183.6 L116.9 390.7 A17.4 17.4 0 0 0 143.0 405.7 L308.3 310.3 A26.7 26.7 0 0 0 308.3 264.0 Z";

interface PlayMarkProps {
    /** Rendered width in px; height follows the mark's own aspect ratio. */
    size?: number;
    /** Any CSS colour; defaults to the parent's text colour. */
    color?: string;
    className?: string;
}

export default function PlayMark({ size = 320, color = "currentColor", className }: PlayMarkProps) {
    return (
        <svg
            viewBox="0 0 500 533"
            width={size}
            height={(size * 533) / 500}
            className={cn("shrink-0", className)}
            aria-hidden="true"
        >
            <path d={PLAY_MARK_PATH} fill={color} fillRule="evenodd" />
        </svg>
    );
}
