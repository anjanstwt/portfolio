import { cn } from "@/lib/utils";

interface EngravedIconProps {
    d: string;
    viewBox?: string;
    size?: number;
    fill?: string;
    className?: string;
}

export default function EngravedIcon({
    d,
    viewBox = "0 0 24 24",
    size = 26,
    fill = "#26282e",
    className,
}: EngravedIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox={viewBox}
            className={cn("shrink-0 overflow-visible", className)}
            style={{
                filter:
                    "drop-shadow(0.6px 0.7px 0.5px rgba(0,0,0,0.8)) drop-shadow(-0.6px -0.7px 0.4px rgba(255,255,255,0.35))",
            }}
        >
            <path d={d} fill={fill} />
        </svg>
    );
}
