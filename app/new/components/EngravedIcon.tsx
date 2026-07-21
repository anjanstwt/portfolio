import { useId } from "react";
import { cn } from "@/lib/utils";

interface EngravedIconProps {
    d: string;
    viewBox?: string;
    size?: number;
    strokeWidth?: number;
    className?: string;
}

export default function EngravedIcon({
    d,
    viewBox = "0 0 24 24",
    size = 26,
    strokeWidth = 0.9,
    className,
}: EngravedIconProps) {
    const filterId = useId();

    return (
        <svg
            width={size}
            height={size}
            viewBox={viewBox}
            fill="none"
            className={cn("shrink-0 overflow-visible", className)}
        >
            <defs>
                <filter id={filterId} x="-60%" y="-60%" width="220%" height="220%" colorInterpolationFilters="sRGB">
                    <feDropShadow dx="-0.4" dy="-0.5" stdDeviation="0.3" floodColor="#000000" floodOpacity="0.9" />
                    <feDropShadow dx="0.4" dy="0.5" stdDeviation="0.25" floodColor="#ffffff" floodOpacity="0.55" />
                </filter>
            </defs>
            <path
                d={d}
                stroke="#3a3d44"
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
                filter={`url(#${filterId})`}
            />
        </svg>
    );
}
