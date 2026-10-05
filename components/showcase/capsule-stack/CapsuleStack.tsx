import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

const COUNT = 7;

const scale = {
    "--u": "min(0.05cqw, 0.0928cqh)",
    "--cap-w": "calc(176 * var(--u))",
    "--cap-h": "calc(536 * var(--u))",
    "--cap-r": "calc(88 * var(--u))",
    "--pitch": "calc(150 * var(--u))",
    "--overlap": "calc(var(--cap-w) - var(--pitch))",
} as CSSProperties;

export default function CapsuleStack({
    count = COUNT,
    label,
    className,
    labelClassName,
}: {
    count?: number;
    label?: ReactNode;
    className?: string;
    labelClassName?: string;
}) {
    return (
        <div
            style={scale}
            className={cn(
                "pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden [container-type:size]",
                className,
            )}
        >
            <div
                aria-hidden="true"
                className="relative flex [filter:drop-shadow(0_calc(30*var(--u))_calc(28*var(--u))_rgba(0,0,0,0.1))_drop-shadow(0_calc(110*var(--u))_calc(90*var(--u))_rgba(0,0,0,0.1))]"
            >
                {Array.from({ length: count }, (_, i) => (
                    <div
                        key={i}
                        style={{ zIndex: i + 1 }}
                        className={cn(
                            "relative flex-none overflow-hidden",
                            "h-(--cap-h) w-(--cap-w) rounded-(--cap-r)",
                            i > 0 && "-ml-(--overlap)",
                            "bg-[linear-gradient(180deg,rgba(255,255,255,0.025)_0%,rgba(255,255,255,0)_22%,rgba(0,0,0,0)_78%,rgba(0,0,0,0.12)_100%),linear-gradient(90deg,#2d2d2d_0%,#292929_35%,#222222_70%,#1a1a1a_100%)]",
                            "shadow-[inset_calc(3*var(--u))_0_calc(3*var(--u))_calc(-1*var(--u))_rgba(255,255,255,0.3),inset_calc(-5*var(--u))_0_calc(7*var(--u))_calc(-2*var(--u))_rgba(0,0,0,0.55),inset_0_calc(1*var(--u))_calc(1*var(--u))_rgba(255,255,255,0.05),0_calc(18*var(--u))_calc(30*var(--u))_calc(-12*var(--u))_rgba(0,0,0,0.18)]",
                        )}
                    >
                        {i < count - 1 && (
                            <div className="absolute top-0 left-(--pitch) h-(--cap-h) w-(--cap-w) rounded-(--cap-r) shadow-[calc(-8*var(--u))_0_calc(14*var(--u))_rgba(0,0,0,0.92),calc(-2*var(--u))_0_calc(4*var(--u))_rgba(0,0,0,0.9)]" />
                        )}
                    </div>
                ))}
            </div>

            {label != null && (
                <div
                    style={{ zIndex: count + 1 }}
                    className={cn(
                        "absolute inset-0 flex items-center justify-center",
                        "text-[#f4f4f4] text-[calc(120*var(--u))] leading-none whitespace-nowrap",
                        "[text-shadow:0_calc(2*var(--u))_calc(8*var(--u))_rgba(0,0,0,0.45)]",
                        labelClassName,
                    )}
                >
                    {label}
                </div>
            )}
        </div>
    );
}
