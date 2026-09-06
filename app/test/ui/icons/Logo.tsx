import { cn } from "@/lib/utils";

export type LogoVariant =
    | "tilde"
    | "maze"
    | "split"
    | "window"
    | "brackets"
    | "stairs"
    | "spiral"
    | "arch";

interface LogoProps {
    variant?: LogoVariant;
    className?: string;
    /** any CSS colour; defaults to the parent's text colour */
    color?: string;
    /** rendered width in px; height follows the mark's own aspect ratio */
    size?: number;
}

// Standalone files for each mark live in public/logo/*.svg.
// Skewed marks use skewY(-30): verticals stay vertical, horizontals rise to the right.
const MARKS: Record<LogoVariant, { viewBox: [number, number, number, number]; body: React.ReactNode }> = {
    // "~" — home. One cubic wave of constant width with butt terminals.
    tilde: {
        viewBox: [0, 0, 1000, 600],
        body: (
            <path
                d="M110 360 C330 -80 670 680 890 240"
                fill="none"
                stroke="currentColor"
                strokeWidth={140}
                strokeLinecap="butt"
            />
        ),
    },
    // A square spiral, skewed.
    maze: {
        viewBox: [0, 0, 700, 1104],
        body: (
            <path
                d="M50 650 V50 H650 V650 H250 V250 H450 V450"
                fill="none"
                stroke="currentColor"
                strokeWidth={100}
                strokeLinecap="butt"
                strokeLinejoin="miter"
                transform="translate(0 404) skewY(-30)"
            />
        ),
    },
    // A disc cut on the slab angle, the halves slipped along the cut.
    split: {
        viewBox: [0, 0, 1000, 800],
        body: (
            <>
                <defs>
                    <clipPath id="logo-split-upper">
                        <rect x="-1000" y="-2000" width="3000" height="2262" transform="rotate(-34 500 400)" />
                    </clipPath>
                    <clipPath id="logo-split-lower">
                        <rect x="-1000" y="438" width="3000" height="3000" transform="rotate(-34 500 400)" />
                    </clipPath>
                </defs>
                <g clipPath="url(#logo-split-upper)"><circle cx="522" cy="385" r="270" fill="currentColor" /></g>
                <g clipPath="url(#logo-split-lower)"><circle cx="478" cy="415" r="270" fill="currentColor" /></g>
            </>
        ),
    },
    // A square frame with a block floating inside, skewed.
    window: {
        viewBox: [0, 0, 600, 946],
        body: (
            <g fill="currentColor" transform="translate(0 346) skewY(-30)">
                <path fillRule="evenodd" d="M0 0 H600 V600 H0 Z M100 100 V500 H500 V100 Z" />
                <rect x="250" y="250" width="200" height="200" />
            </g>
        ),
    },
    // Two viewfinder corners, skewed.
    brackets: {
        viewBox: [0, 0, 700, 1104],
        body: (
            <g
                fill="none"
                stroke="currentColor"
                strokeWidth={100}
                strokeLinecap="butt"
                strokeLinejoin="miter"
                transform="translate(0 404) skewY(-30)"
            >
                <path d="M50 350 V50 H350" />
                <path d="M350 650 H650 V350" />
            </g>
        ),
    },
    // A stepped band, skewed.
    stairs: {
        viewBox: [0, 0, 500, 889],
        body: (
            <path
                d="M50 600 V400 H250 V200 H450 V0"
                fill="none"
                stroke="currentColor"
                strokeWidth={100}
                strokeLinecap="butt"
                strokeLinejoin="miter"
                transform="translate(0 289) skewY(-30)"
            />
        ),
    },
    // Two-centre spiral, equal band and gap.
    spiral: {
        viewBox: [50, 0, 1000, 900],
        body: (
            <path
                d="M550 400 A100 100 0 0 0 350 400 A200 200 0 0 0 750 400 A300 300 0 0 0 150 400 A400 400 0 0 0 950 400"
                fill="none"
                stroke="currentColor"
                strokeWidth={100}
                strokeLinecap="butt"
            />
        ),
    },
    // A heavy arch with its feet cut on the 30deg slope.
    arch: {
        viewBox: [0, 0, 1000, 760],
        body: (
            <path
                d="M130 700 V400 A370 370 0 0 1 870 400 V619 L730 700 V400 A230 230 0 0 0 270 400 V619 Z"
                fill="currentColor"
            />
        ),
    },
};

export default function Logo({ variant = "tilde", className, color, size = 120 }: LogoProps) {
    const { viewBox, body } = MARKS[variant];
    const [, , w, h] = viewBox;

    return (
        <svg
            width={size}
            height={size * (h / w)}
            viewBox={viewBox.join(" ")}
            color={color}
            xmlns="http://www.w3.org/2000/svg"
            className={cn(className)}
            role="img"
            aria-label="Anjan Suman"
        >
            {body}
        </svg>
    );
}
