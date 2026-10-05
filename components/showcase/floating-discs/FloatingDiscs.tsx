import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

const scale = { "--u": "min(0.0839cqw, 0.101cqh)" } as CSSProperties;

type Shape = {
    cx: number;
    cy: number;
    w: number;
    h: number;
    rotate?: number;
    z: number;
};

function place({ cx, cy, w, h, rotate = 0, z }: Shape): CSSProperties {
    return {
        left: `calc(${cx - w / 2} * var(--u))`,
        top: `calc(${cy - h / 2} * var(--u))`,
        width: `calc(${w} * var(--u))`,
        height: `calc(${h} * var(--u))`,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        zIndex: z,
    };
}

const shape = "absolute rounded-[50%]";

export default function FloatingDiscs({ className }: { className?: string }) {
    return (
        <div
            style={scale}
            aria-hidden="true"
            className={cn(
                "pointer-events-none absolute inset-0 overflow-hidden [container-type:size]",
                className,
            )}
        >
            <div
                className="absolute top-1/2 left-1/2 h-[calc(990*var(--u))] w-[calc(1192*var(--u))] -translate-x-1/2 -translate-y-1/2"
            >
                <div
                    style={place({ cx: 663, cy: 672, w: 335, h: 345, z: 1 })}
                    className={cn(
                        shape,
                        "overflow-hidden",
                        "bg-[radial-gradient(90%_90%_at_30%_80%,#d4d4d4_0%,#cbcbcb_45%,#b4b4b4_100%)]",
                        "shadow-[inset_0_0_0_calc(1.5*var(--u))_rgba(255,255,255,0.35)]",
                    )}
                >
                    <div
                        style={{
                            left: "calc(50% - 5 * var(--u))",
                            top: "calc(50% - 27 * var(--u))",
                            width: "calc(205 * var(--u))",
                            height: "calc(235 * var(--u))",
                            filter: "blur(calc(11 * var(--u)))",
                        }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(circle_at_50%_45%,#262626_0%,#202020_55%,#303030_85%,#4a4a4a_100%)]"
                    />
                </div>

                <div
                    style={place({ cx: 552, cy: 345, w: 144, h: 144, z: 1 })}
                    className={cn(
                        shape,
                        "bg-[radial-gradient(circle_at_42%_36%,#3a3a3a_0%,#232323_45%,#161616_100%)]",
                        "shadow-[inset_0_calc(2*var(--u))_calc(4*var(--u))_rgba(255,255,255,0.14)]",
                    )}
                />

                <div
                    style={place({ cx: 800, cy: 568, w: 100, h: 100, z: 2 })}
                    className={cn(
                        shape,
                        "bg-[radial-gradient(circle_at_40%_35%,#363636_0%,#202020_50%,#141414_100%)]",
                        "shadow-[inset_0_calc(1.5*var(--u))_calc(3*var(--u))_rgba(255,255,255,0.12)]",
                    )}
                />

                <div
                    style={place({ cx: 412, cy: 525, w: 360, h: 475, rotate: 16, z: 3 })}
                    className={cn(
                        shape,
                        "bg-[radial-gradient(90%_70%_at_96%_30%,rgba(0,0,0,0.34)_0%,rgba(0,0,0,0)_72%),linear-gradient(100deg,#d2d2d2_0%,#cdcdcd_40%,#b2b2b2_75%,#8f8f8f_100%)]",
                        "shadow-[inset_0_0_0_calc(1.5*var(--u))_rgba(255,255,255,0.4),0_calc(10*var(--u))_calc(22*var(--u))_rgba(0,0,0,0.1)]",
                    )}
                />

                <div
                    style={place({ cx: 831, cy: 399, w: 256, h: 440, rotate: -29, z: 3 })}
                    className={cn(
                        shape,
                        "bg-[radial-gradient(85%_60%_at_24%_98%,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0)_72%),linear-gradient(180deg,#d2d2d2_0%,#cdcdcd_55%,#b9b9b9_100%)]",
                        "shadow-[inset_0_0_0_calc(1.5*var(--u))_rgba(255,255,255,0.4),0_calc(10*var(--u))_calc(22*var(--u))_rgba(0,0,0,0.1)]",
                    )}
                />

                <div
                    style={place({ cx: 548, cy: 812, w: 106, h: 106, z: 4 })}
                    className={cn(
                        shape,
                        "bg-[radial-gradient(circle_at_38%_68%,#d3d3d3_0%,#c9c9c9_55%,#b4b4b4_100%)]",
                        "shadow-[inset_0_calc(-1*var(--u))_calc(2*var(--u))_rgba(255,255,255,0.3),0_calc(6*var(--u))_calc(14*var(--u))_rgba(0,0,0,0.1)]",
                    )}
                />
            </div>
        </div>
    );
}
