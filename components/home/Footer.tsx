import user from "@/data/user.data";

const GLYPHS: Record<string, string[]> = {
    A: [".###.", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"],
    N: ["#...#", "##..#", "#.#.#", "#..##", "#...#", "#...#", "#...#"],
    J: ["..###", "...#.", "...#.", "...#.", "...#.", "#..#.", ".##.."],
    S: [".####", "#....", "#....", ".###.", "....#", "....#", "####."],
    U: ["#...#", "#...#", "#...#", "#...#", "#...#", "#...#", ".###."],
    M: ["#...#", "##.##", "#.#.#", "#.#.#", "#...#", "#...#", "#...#"],
};

const GLYPH_W = 5;
const GLYPH_H = 7;
const LETTER_GAP = 1;
const WORD_GAP = 3;

function buildCells(text: string) {
    const cells: { x: number; y: number }[] = [];
    let cursor = 0;
    for (const char of text) {
        if (char === " ") {
            cursor += WORD_GAP;
            continue;
        }
        GLYPHS[char].forEach((row, y) => {
            [...row].forEach((bit, x) => {
                if (bit === "#") cells.push({ x: cursor + x, y });
            });
        });
        cursor += GLYPH_W + LETTER_GAP;
    }
    return { cells, width: cursor - LETTER_GAP };
}

const WORDMARK = buildCells(user.name.toUpperCase());

export default function Footer() {
    return (
        <footer className="w-full max-w-212 max-md:max-w-[520px] mx-auto px-4 pt-10 pb-10 text-mute text-xs tracking-widest flex flex-col gap-y-8 select-none">
            <svg
                viewBox={`0 0 ${WORDMARK.width} ${GLYPH_H}`}
                role="img"
                aria-label={user.name}
                shapeRendering="crispEdges"
                className="w-full h-auto text-fg/10"
            >
                {WORDMARK.cells.map(({ x, y }) => (
                    <rect
                        key={`${x}-${y}`}
                        x={x + 0.04}
                        y={y + 0.04}
                        width={0.92}
                        height={0.92}
                        fill="currentColor"
                    />
                ))}
            </svg>

            <div className="flex items-center justify-between gap-4 max-[480px]:flex-col max-[480px]:gap-y-3">
                <span>&copy; {new Date().getFullYear()} {user.name}</span>
                <nav className="flex items-center gap-x-4">
                    {user.contacts.map((contact) => (
                        <a
                            key={contact.kind}
                            href={contact.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-fg transition-colors"
                        >
                            {contact.label}
                        </a>
                    ))}
                </nav>
            </div>
        </footer>
    );
}
