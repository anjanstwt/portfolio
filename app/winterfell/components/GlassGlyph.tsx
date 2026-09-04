import { GLYPH_PATH, GLYPH_SIZE } from "./ServicestackGlyph";

// All dimensions are in the glyph's 32-unit coordinate space.
const BOUNDARY_GAP = 0.75;
const BOUNDARY_LINE = 0.08;
const BEVEL_WIDTH = 0.12;
const PADDING = 2.5;

const FRAME = {
    x: -PADDING,
    y: -PADDING,
    width: GLYPH_SIZE + PADDING * 2,
    height: GLYPH_SIZE + PADDING * 2,
};

export default function GlassGlyph({ className }: { className?: string }) {
    return (
        <svg
            viewBox={`${FRAME.x} ${FRAME.y} ${FRAME.width} ${FRAME.height}`}
            className={className}
            aria-hidden="true"
        >
            <defs>
                <linearGradient id="wf-glass" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="0.45" stopColor="#f7f7fa" stopOpacity="0.96" />
                    <stop offset="1" stopColor="#e9e9f0" stopOpacity="0.82" />
                </linearGradient>
                <radialGradient id="wf-gloss" cx="0.22" cy="0.08" r="0.75">
                    <stop offset="0" stopColor="#ffffff" stopOpacity="0.75" />
                    <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.12" />
                    <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="wf-bevel" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="0.6" stopColor="#ffffff" stopOpacity="0.4" />
                    <stop offset="1" stopColor="#ffffff" stopOpacity="0.05" />
                </linearGradient>
                <linearGradient id="wf-boundary" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
                    <stop offset="0.55" stopColor="#ffffff" stopOpacity="0.45" />
                    <stop offset="1" stopColor="#ffffff" stopOpacity="0.15" />
                </linearGradient>
                <clipPath id="wf-body">
                    <path d={GLYPH_PATH} />
                </clipPath>
                <mask id="wf-boundary-cut" maskUnits="userSpaceOnUse" {...FRAME}>
                    <rect {...FRAME} fill="white" />
                    <path
                        d={GLYPH_PATH}
                        fill="black"
                        stroke="black"
                        strokeWidth={BOUNDARY_GAP * 2}
                        strokeLinejoin="round"
                    />
                </mask>
            </defs>

            {/* thin outline floating a fixed gap outside the glyph */}
            <path
                d={GLYPH_PATH}
                fill="none"
                stroke="url(#wf-boundary)"
                strokeWidth={(BOUNDARY_GAP + BOUNDARY_LINE) * 2}
                strokeLinejoin="round"
                mask="url(#wf-boundary-cut)"
            />

            <g className="drop-shadow-[0_28px_44px_rgba(30,16,90,0.42)]">
                <path d={GLYPH_PATH} fill="url(#wf-glass)" />
                <path d={GLYPH_PATH} fill="url(#wf-gloss)" />
                <path
                    d={GLYPH_PATH}
                    fill="none"
                    stroke="url(#wf-bevel)"
                    strokeWidth={BEVEL_WIDTH * 2}
                    clipPath="url(#wf-body)"
                />
            </g>
        </svg>
    );
}
