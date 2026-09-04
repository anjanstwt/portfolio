import { cn } from "@/lib/utils";

export type LogoVariant = "hourglass" | "grid-a" | "slab-a" | "as";

interface LogoProps {
    variant?: LogoVariant;
    className?: string;
    color?: string;
    /** rendered width in px; height follows the mark's own aspect ratio */
    size?: number;
}

// Each mark lives on a whole-number grid (see public/logo/*.svg for the standalone files).
const MARKS: Record<LogoVariant, { viewBox: [number, number]; crisp: boolean; body: React.ReactNode }> = {
    // The site mark: an hourglass on an 11x13 grid. Top chamber hollow, bottom chamber full.
    "hourglass": {
        viewBox: [1100, 1300],
        crisp: true,
        body: (
            <>
                <rect x="0" y="0" width="1100" height="200" />
                <rect x="100" y="200" width="200" height="100" />
                <rect x="800" y="200" width="200" height="100" />
                <rect x="200" y="300" width="200" height="100" />
                <rect x="700" y="300" width="200" height="100" />
                <rect x="300" y="400" width="200" height="100" />
                <rect x="600" y="400" width="200" height="100" />
                <rect x="400" y="500" width="300" height="100" />
                <rect x="500" y="600" width="100" height="100" />
                <rect x="400" y="700" width="300" height="100" />
                <rect x="300" y="800" width="500" height="100" />
                <rect x="200" y="900" width="700" height="100" />
                <rect x="100" y="1000" width="900" height="100" />
                <rect x="0" y="1100" width="1100" height="200" />
            </>
        ),
    },
    // "A" on a 10x9 grid, 2-cell stroke, feet step 1 cell outward
    "grid-a": {
        viewBox: [1000, 900],
        crisp: true,
        body: (
            <>
                <rect x="300" y="0" width="400" height="100" />
                <rect x="200" y="100" width="200" height="200" />
                <rect x="600" y="100" width="200" height="200" />
                <rect x="200" y="300" width="600" height="200" />
                <rect x="200" y="500" width="200" height="200" />
                <rect x="600" y="500" width="200" height="200" />
                <rect x="100" y="700" width="300" height="200" />
                <rect x="600" y="700" width="300" height="200" />
            </>
        ),
    },
    // "A" from two slanted slabs with vertical ends and one flat crossbar
    "slab-a": {
        viewBox: [1000, 800],
        crisp: false,
        body: (
            <>
                <path d="M60 480 L500 180 L940 480 L940 720 L500 420 L60 720 Z" />
                <rect x="295" y="560" width="410" height="100" />
            </>
        ),
    },
    // "AS" monogram on a 13x8 grid, 2-cell stroke
    "as": {
        viewBox: [1300, 800],
        crisp: true,
        body: (
            <>
                <rect x="100" y="0" width="400" height="100" />
                <rect x="0" y="100" width="200" height="200" />
                <rect x="400" y="100" width="200" height="200" />
                <rect x="0" y="300" width="600" height="200" />
                <rect x="0" y="500" width="200" height="300" />
                <rect x="400" y="500" width="200" height="300" />
                <rect x="800" y="0" width="500" height="100" />
                <rect x="700" y="100" width="200" height="200" />
                <rect x="700" y="300" width="500" height="100" />
                <rect x="800" y="400" width="500" height="100" />
                <rect x="1100" y="500" width="200" height="200" />
                <rect x="700" y="700" width="500" height="100" />
            </>
        ),
    },
};

export default function Logo({ variant = "hourglass", className, color = "currentColor", size = 120 }: LogoProps) {
    const { viewBox: [w, h], crisp, body } = MARKS[variant];

    return (
        <svg
            width={size}
            height={size * (h / w)}
            viewBox={`0 0 ${w} ${h}`}
            fill={color}
            shapeRendering={crisp ? "crispEdges" : "auto"}
            xmlns="http://www.w3.org/2000/svg"
            className={cn(className)}
            role="img"
            aria-label="Anjan Suman"
        >
            {body}
        </svg>
    );
}
