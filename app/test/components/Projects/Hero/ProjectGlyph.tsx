import type { SVGProps } from "react";
import type { ProjectGlyph as Glyph } from "../../../types/project.type";

interface ProjectGlyphProps extends SVGProps<SVGSVGElement> {
    glyph: Glyph;
    /** Paint each shape with its own color instead of inheriting the svg fill. */
    colored?: boolean;
}

// Plain rendering of a project glyph. Used for the ghosted outline behind the
// hero and as the side capsule icon when a project has no raster logo.
export default function ProjectGlyph({ glyph, colored, ...props }: ProjectGlyphProps) {
    return (
        <svg
            fill="currentColor"
            viewBox={`0 0 ${glyph.width} ${glyph.height}`}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            {...props}
        >
            {glyph.shapes.map((shape) => (
                <path key={shape.d} d={shape.d} fill={colored ? shape.color : undefined} />
            ))}
        </svg>
    );
}
