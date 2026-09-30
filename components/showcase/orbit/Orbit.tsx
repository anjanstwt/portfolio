/**
 * Orbit — a 1:1 recreation of the orbital line-art diagram.
 * Drawn in a 2000 x 900 coordinate space; every element sits on a
 * horizontal axis at y = 527 (like the reference frame).
 * The svg is transparent — background and grain live in OrbitSection.
 */

const AXIS = 527;

// generate a point on a circle at a given angle (degrees, clockwise, 0 = right)
const polar = (cx: number, cy: number, r: number, deg: number) => {
    const a = (deg * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
};

// arc path from angle a1 to a2 going counter-clockwise (through the left)
const arc = (cx: number, cy: number, r: number, a1: number, a2: number) => {
    const [x1, y1] = polar(cx, cy, r, a1);
    const [x2, y2] = polar(cx, cy, r, a2);
    return `M ${x1} ${y1} A ${r} ${r} 0 1 0 ${x2} ${y2}`;
};

type Dot = { x: number; y: number; r: number; o?: number };

const Dots = ({ dots, fill = "#ffffff" }: { dots: Dot[]; fill?: string }) => (
    <>
        {dots.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={fill} opacity={d.o ?? 1} />
        ))}
    </>
);

export default function Orbit({ className = "" }: { className?: string }) {
    // large left arc
    const L = { cx: 524, cy: AXIS, r: 279 };
    // large central circle (slightly above the axis, as in the reference)
    const C = { cx: 1000, cy: 506, r: 354 };
    // inner orbit around the central sphere
    const I = { cx: 1000, cy: 524, r: 96 };
    // right rings
    const R1 = { cx: 1462, cy: AXIS, r: 87 };
    const R2 = { cx: 1670, cy: 517, r: 205 };

    return (
        <svg
            viewBox="0 0 2000 900"
            preserveAspectRatio="xMidYMid meet"
            className={className}
            role="img"
            aria-label="Orbital diagram"
        >
            <defs>
                {/* arcs fade out towards their open ends (all open ends are on the right) */}
                <linearGradient id="ob-fade-r" gradientUnits="userSpaceOnUse" x1={C.cx - C.r} x2={C.cx + C.r} y1="0" y2="0">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
                    <stop offset="55%" stopColor="#ffffff" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.08" />
                </linearGradient>
                <linearGradient id="ob-fade-left-arc" gradientUnits="userSpaceOnUse" x1={L.cx - L.r} x2={L.cx + L.r} y1="0" y2="0">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
                    <stop offset="70%" stopColor="#ffffff" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
                </linearGradient>
                {/* right big ring fades towards the left */}
                <linearGradient id="ob-fade-l" gradientUnits="userSpaceOnUse" x1={R2.cx - R2.r} x2={R2.cx + R2.r} y1="0" y2="0">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.06" />
                    <stop offset="45%" stopColor="#ffffff" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.45" />
                </linearGradient>

                {/* central sphere shading: bright top, shaded bottom */}
                <linearGradient id="ob-sphere" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="45%" stopColor="#fafafa" />
                    <stop offset="100%" stopColor="#6f6f6f" />
                </linearGradient>

                {/* crescent = disc minus an offset disc */}
                <mask id="ob-crescent">
                    <rect x="1080" y="470" width="140" height="120" fill="#fff" />
                    <circle cx="1115" cy={AXIS} r="50" fill="#000" />
                </mask>
            </defs>

            {/* ---------- faint scattered stars ---------- */}
            <Dots
                dots={[
                    { x: 1500, y: 200, r: 3, o: 0.9 },
                    { x: 1450, y: 740, r: 4, o: 0.9 },
                    { x: 1145, y: 755, r: 3, o: 0.85 },
                    { x: 270, y: 860, r: 2.5, o: 0.85 },
                    { x: 1840, y: 100, r: 1.5, o: 0.5 },
                    { x: 1990, y: 55, r: 1.5, o: 0.5 },
                    { x: 940, y: 892, r: 2, o: 0.4 },
                    { x: 1935, y: 340, r: 1.5, o: 0.4 },
                    { x: 100, y: 700, r: 1.5, o: 0.4 },
                    { x: 1740, y: 780, r: 1.5, o: 0.4 },
                    { x: 1280, y: 120, r: 1.5, o: 0.35 },
                ]}
            />

            {/* ---------- left: lines and dots ---------- */}
            <g stroke="#e6e6e6" strokeWidth="1.6" strokeLinecap="round" opacity="0.85">
                <line x1="40" y1={AXIS} x2="465" y2={AXIS} />
                <line x1="218" y1="492" x2="362" y2="492" />
            </g>
            <Dots
                dots={[
                    { x: 40, y: AXIS, r: 5 },
                    { x: 78, y: AXIS, r: 3 },
                    { x: 465, y: AXIS, r: 5.5 },
                    { x: 510, y: AXIS, r: 3 },
                    { x: 540, y: AXIS, r: 3 },
                    { x: 218, y: 492, r: 2.5 },
                    { x: 362, y: 492, r: 3 },
                ]}
            />

            {/* ---------- left large arc ---------- */}
            <path d={arc(L.cx, L.cy, L.r, -84, 84)} fill="none" stroke="url(#ob-fade-left-arc)" strokeWidth="1.3" />
            <g className="ob-spin-slow" style={{ transformOrigin: `${L.cx}px ${L.cy}px` }}>
                <circle cx={polar(L.cx, L.cy, L.r, -148)[0]} cy={polar(L.cx, L.cy, L.r, -148)[1]} r="3.5" fill="#fff" />
            </g>

            {/* ---------- double rings ---------- */}
            <g fill="none" stroke="#ffffff" strokeWidth="7">
                <circle cx="652" cy={AXIS} r="34" />
                <circle cx="700" cy={AXIS} r="34" />
            </g>

            {/* ---------- central large circle ---------- */}
            <path d={arc(C.cx, C.cy, C.r, -43, 20)} fill="none" stroke="url(#ob-fade-r)" strokeWidth="1.5" />
            <g className="ob-spin" style={{ transformOrigin: `${C.cx}px ${C.cy}px` }}>
                <Dots
                    dots={[
                        { x: 1167, y: 190, r: 3.5 },
                        { x: 715, y: 298, r: 3.5 },
                        { x: 1300, y: 690, r: 5 },
                        { x: 997, y: 860, r: 5.5 },
                    ]}
                />
            </g>

            {/* ---------- inner orbit ---------- */}
            <circle cx={I.cx} cy={I.cy} r={I.r} fill="none" stroke="#ffffff" strokeWidth="1.3" opacity="0.7" />
            <g className="ob-spin-fast" style={{ transformOrigin: `${I.cx}px ${I.cy}px` }}>
                <circle cx={polar(I.cx, I.cy, I.r, -145)[0]} cy={polar(I.cx, I.cy, I.r, -145)[1]} r="5" fill="#fff" />
                <circle cx={polar(I.cx, I.cy, I.r, 48)[0]} cy={polar(I.cx, I.cy, I.r, 48)[1]} r="3" fill="#fff" />
            </g>

            {/* lone dot left of the small sphere */}
            <circle cx="835" cy="520" r="3" fill="#fff" />

            {/* ---------- small sphere with a grey quarter ---------- */}
            <circle cx="893" cy={AXIS} r="20" fill="#ffffff" />
            <path d={`M 893 ${AXIS} L 893 ${AXIS - 20} A 20 20 0 0 1 913 ${AXIS} Z`} fill="#9c9c9c" />

            {/* ---------- central sphere ---------- */}
            <circle cx="995" cy={AXIS} r="42" fill="url(#ob-sphere)" />
            <path d={`M 995 ${AXIS} L 1037 ${AXIS} A 42 42 0 0 1 995 ${AXIS + 42} Z`} fill="#ffffff" opacity="0.38" />

            {/* ---------- crescent ---------- */}
            <circle cx="1153" cy={AXIS} r="37" fill="#ffffff" mask="url(#ob-crescent)" />
            <circle cx="1223" cy={AXIS} r="3" fill="#fff" />

            {/* ---------- thin ring ---------- */}
            <circle cx="1297" cy={AXIS} r="33" fill="none" stroke="#ffffff" strokeWidth="4.5" />

            {/* ---------- right rings ---------- */}
            <circle cx={R1.cx} cy={R1.cy} r={R1.r} fill="none" stroke="#ffffff" strokeWidth="1.3" opacity="0.5" />
            <circle cx={R2.cx} cy={R2.cy} r={R2.r} fill="none" stroke="url(#ob-fade-l)" strokeWidth="1.3" />

            {/* ---------- dotted run ---------- */}
            <Dots
                dots={[
                    { x: 1600, y: 533, r: 3 },
                    { x: 1632, y: 533, r: 5.5 },
                    { x: 1660, y: 533, r: 2 },
                    { x: 1676, y: 533, r: 2 },
                    { x: 1692, y: 533, r: 2 },
                    { x: 1710, y: 533, r: 2 },
                ]}
            />

            {/* ---------- thick grey ring ---------- */}
            <circle cx="1797" cy="522" r="30" fill="none" stroke="#b7b7b7" strokeWidth="20" />

            {/* ---------- right: line and dots ---------- */}
            <line x1="1866" y1="517" x2="2000" y2="517" stroke="#e6e6e6" strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
            <Dots
                dots={[
                    { x: 1866, y: 517, r: 2.5 },
                    { x: 1918, y: 529, r: 3 },
                    { x: 1948, y: 529, r: 5 },
                    { x: 1985, y: 529, r: 2.5 },
                ]}
            />

            <style>{`
                .ob-spin, .ob-spin-slow, .ob-spin-fast { transform-box: view-box; }
                .ob-spin      { animation: ob-rotate 140s linear infinite; }
                .ob-spin-slow { animation: ob-rotate 220s linear infinite reverse; }
                .ob-spin-fast { animation: ob-rotate 60s linear infinite; }
                @keyframes ob-rotate { to { transform: rotate(360deg); } }
                @media (prefers-reduced-motion: reduce) {
                    .ob-spin, .ob-spin-slow, .ob-spin-fast { animation: none; }
                }
            `}</style>
        </svg>
    );
}
