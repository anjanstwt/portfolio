import type { SVGProps } from "react";

// Path data lifted from react-icons' LiaServicestack (32x32 viewBox) so the
// glass treatment can layer fills, strokes and masks over the same outline.
export const GLYPH_SIZE = 32;

export const GLYPH_PATH =
    "M 10 6 C 11.544 7.76 12.275797 10.149375 12.216797 12.609375 C 16.184797 14.279375 22.141437 18.73 23.398438 25 L 28 25 C 26.051 14.31 14.918 6.77 10 6 z M 8 13 C 12.67 17.913 8.81 24.582 4 25 L 22.970703 25 C 21.500703 18.289 11.95 13.533 8 13 z";

export function ServicestackGlyph(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            fill="currentColor"
            viewBox={`0 0 ${GLYPH_SIZE} ${GLYPH_SIZE}`}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            {...props}
        >
            <path d={GLYPH_PATH} />
        </svg>
    );
}
