import { cn } from "cn";
import { ReactNode } from "react";

interface BlockHeaderProps {
    left?: ReactNode;
    right?: ReactNode;
    padding?: boolean;
    className?: string;
}

export default function BlockHeader({
    left,
    right,
    padding = false,
    className,
}: BlockHeaderProps) {
    return (
        <div
            className={cn(
                "absolute top-0 left-0 w-full ",
                "flex items-center justify-between",
                padding && "px-3.5 py-3",
                className,
            )}
        >
            <div>{left}</div>
            <div>{right}</div>
        </div>
    );
}
