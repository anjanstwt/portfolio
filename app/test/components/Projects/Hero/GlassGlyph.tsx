import { useId } from "react";
import type { ProjectGlyph, ProjectHero } from "../../../types/project.type";

// Stroke and padding sizes as fractions of the glyph's larger side, so the
// treatment looks the same on a 16-unit icon and an 800-unit logo.
const BOUNDARY_GAP = 0.0227;
const BOUNDARY_LINE = 0.0025;
const BEVEL_WIDTH = 0.0038;
const PADDING = 0.06;

interface GlassGlyphProps {
    glyph: ProjectGlyph;
    fill: ProjectHero["fill"];
    className?: string;
}

export default function GlassGlyph({ glyph, fill, className }: GlassGlyphProps) {
    const id = useId().replace(/:/g, "");

    const base = Math.max(glyph.width, glyph.height);
    const gap = base * BOUNDARY_GAP;
    const line = base * BOUNDARY_LINE;
    const bevel = base * BEVEL_WIDTH;
    const padding = base * PADDING;

    const frame = {
        x: -padding,
        y: -padding,
        width: glyph.width + padding * 2,
        height: glyph.height + padding * 2,
    };

    const glassId = `${id}-glass`;
    const glossId = `${id}-gloss`;
    const bevelId = `${id}-bevel`;
    const boundaryId = `${id}-boundary`;
    const cutId = `${id}-cut`;
    const bodyId = (index: number) => `${id}-body-${index}`;

    const shadow =
        fill === "glass"
            ? "drop-shadow-[0_28px_44px_rgba(30,16,90,0.42)]"
            : "drop-shadow-[0_28px_44px_rgba(0,0,0,0.5)]";

    return (
        <svg
            viewBox={`${frame.x} ${frame.y} ${frame.width} ${frame.height}`}
            className={className}
            aria-hidden="true"
        >
            <defs>
                {fill === "glass" && (
                    <>
                        <linearGradient id={glassId} x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0" stopColor="#ffffff" />
                            <stop offset="0.45" stopColor="#f3f1ff" stopOpacity="0.96" />
                            <stop offset="1" stopColor="#cdc4f6" stopOpacity="0.82" />
                        </linearGradient>
                        <radialGradient id={glossId} cx="0.22" cy="0.08" r="0.75">
                            <stop offset="0" stopColor="#ffffff" stopOpacity="0.75" />
                            <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.12" />
                            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                        </radialGradient>
                    </>
                )}
                <linearGradient id={bevelId} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="0.6" stopColor="#ffffff" stopOpacity="0.4" />
                    <stop offset="1" stopColor="#ffffff" stopOpacity="0.05" />
                </linearGradient>
                <linearGradient id={boundaryId} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
                    <stop offset="0.55" stopColor="#ffffff" stopOpacity="0.45" />
                    <stop offset="1" stopColor="#ffffff" stopOpacity="0.15" />
                </linearGradient>
                {glyph.shapes.map((shape, index) => (
                    <clipPath key={shape.d} id={bodyId(index)}>
                        <path d={shape.d} />
                    </clipPath>
                ))}
                <mask id={cutId} maskUnits="userSpaceOnUse" {...frame}>
                    <rect {...frame} fill="white" />
                    {glyph.shapes.map((shape) => (
                        <path
                            key={shape.d}
                            d={shape.d}
                            fill="black"
                            stroke="black"
                            strokeWidth={gap * 2}
                            strokeLinejoin="round"
                        />
                    ))}
                </mask>
            </defs>

            {/* thin outline floating a fixed gap outside every shape */}
            <g mask={`url(#${cutId})`}>
                {glyph.shapes.map((shape) => (
                    <path
                        key={shape.d}
                        d={shape.d}
                        fill="none"
                        stroke={`url(#${boundaryId})`}
                        strokeWidth={(gap + line) * 2}
                        strokeLinejoin="round"
                    />
                ))}
            </g>

            <g className={shadow}>
                {glyph.shapes.map((shape, index) => (
                    <g key={shape.d}>
                        <path d={shape.d} fill={fill === "glass" ? `url(#${glassId})` : shape.color} />
                        {fill === "glass" && <path d={shape.d} fill={`url(#${glossId})`} />}
                        <path
                            d={shape.d}
                            fill="none"
                            stroke={`url(#${bevelId})`}
                            strokeWidth={bevel * 2}
                            clipPath={`url(#${bodyId(index)})`}
                        />
                    </g>
                ))}
            </g>
        </svg>
    );
}
